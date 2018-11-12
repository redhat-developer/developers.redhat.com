require 'cgi'
require 'nokogiri'
require 'fileutils'
require 'uri'
require 'typhoeus'
require_relative '../default_logger'
require_relative 'export_urls'

#
# This class is used to post-process an httrack export of a site. It performs primarily 2 tasks:
#
# 1: Post process the HTML to improve site structure
# 2: Add in static resources e.g. robots.txt, .htaccess files that are not included by the httrack export process
#
# The primary reason for this thing existing is that we wish to maintain a trailing URL structure when the site is exported
# e.g. https://developers.redhat.com/containers/ and not https://developers.redhat.com/containers.html
#
# Default out-of-the-box, we can only do the latter with Httrack, hence all of this post-processing logic to get us to the former!
#
class ExportHtmlPostProcessor

  include RedhatDeveloper::Export::Urls

  def initialize(process_runner, static_file_directory)
    @log = DefaultLogger.logger
    @process_runner = process_runner
    @static_file_directory = static_file_directory
    @documentation_link_suffixes = %w(.html .pdf .epub)
    @additional_static_resources = []
  end

  #
  # Locates the link back to the index of the site. This is required so that we can re-write the search
  # form target to be relative to the current page.
  #
  def locate_index_link_href(html_document, html_page)
    home_link = html_document.css('#home-link')
    raise StandardError.new("Unable to locate link to index.html on page '#{html_page}'") if home_link.empty?
    raise StandardError.new("Found more than one link with id 'home-link' on page '#{html_page}'") if home_link.length > 1
    home_link.first.attributes['href'].value
  end

  #
  # Copies in the static resources that should be part of the export directory structure.
  #
  def copy_static_resources(export_directory)
    @log.info("Copying static resources from '#{@static_file_directory}' to '#{export_directory}'...")
    FileUtils.cp_r("#{@static_file_directory}/.", export_directory)

    @additional_static_resources.uniq!
    fetch_additional_static_resources(export_directory)
    @log.info("Completed copy of static resources from '#{@static_file_directory}'.")
  end

  def fetch_additional_static_resources(export_directory)
    hydra = Typhoeus::Hydra.new

    @additional_static_resources.each do |i|
      unless File.exists?(File.join(export_directory, URI.parse(i).path))
        url = URI.parse(i.to_s)
        url.query = nil
        request = Typhoeus::Request.new(url, followlocation: true)

        request.on_complete do |response|
          # Make the directory
          FileUtils.mkdir_p(File.join(export_directory, File.dirname(URI.parse(i).path)))

          # return the whole path with resource name, including any prepended path
          path = File.join(export_directory, URI.parse(i).path)

          @log.info "Retrieving file \"#{File.basename(path)}\" for static export"
          File.write(path, response.body)
        end
        hydra.queue(request)
      end
    end
    hydra.run
  end

  #
  # Performs post-processing on the HTML export to make it fit the requiring site structure.
  #
  def post_process_html_export(drupal_host, export_directory)
    relocate_index_html(export_directory)
    rewrite_links_for_trailing_slash_url_structure(export_directory)
    post_process_html_dom(drupal_host, export_directory)
    copy_static_resources(export_directory)
  end

  #
  # Uses sed to re-write links within the HTML pages of the export to:
  #
  # 1: Point to the newly located index.html
  # 2: Remove the index.html part of any link within the export that points to a page within the export
  #
  def rewrite_links_for_trailing_slash_url_structure(export_directory)

    # These should be executed as a single command, but I cannot get that to work for love nor money
    @process_runner.execute!("find #{export_directory} -name '*.html' -type f -print0 | xargs -0 sed -i'' -e s:'index\\/index.html':'':g")
    @process_runner.execute!("find #{export_directory} -name '*.html' -type f -print0 | xargs -0 sed -i'' -e s:'\\/index.html':'\\/':g")
    @process_runner.execute!("find #{export_directory} -name '*.html' -type f -print0 | xargs -0 sed -i'' -e s:'index.html':'\\.\\/':g")
  end

  #
  # See https://issues.jboss.org/browse/DEVELOPER-3500 and DEVELOPER-4614
  #
  # After Httrack has run there is some mark-up in the exported HTML that identifies the host from which it mirrored the site. This is a minor
  # security issue, as we're leaking the host name of Drupal outside our controlled network.
  #
  # I attempted to turn off this mark-up generation in Drupal, but as with most things, Drupal just ignores you.
  #
  # Anyways, here we remove the <link rel="shortlink"/> , <link rel="revision"/> and <meta name="Generator"/> mark-up from the DOM.
  # We are also modifying meta tags and links so they have the proper location for images and canonical refs.
  # We are intentionally not messing with script tags.
  #
  # @return true if the DOM was modified, false otherwise
  #
  def remove_drupal_host_identifying_markup?(host, html_doc)
    modified = false
    remove_elements = 'link[rel="shortlink"],link[rel="revision"],meta[name="Generator"]'

    html_doc.css(remove_elements).each do |element|
      element.remove
      modified = true
    end

    html_doc.css("meta[content*='#{host}']").each do |element|
      content = element['content']
      @additional_static_resources << content.gsub('https', 'http') # remove ssl for this part
      if content.index('//')
        new_url = URI.parse(final_base_url_location + content[content.index('/', content.index('//') + 3)..-1])
        new_url.query = nil
        element['content'] = new_url.to_s
      else
        new_url = URI.parse(final_base_url_location + content)
        new_url.query = nil
        element['content'] = new_url.to_s
      end
      modified = true
    end

    html_doc.css("link[href*='#{host}']").each do |element|
      href = element['href']
      if href.index('//')
        new_url = URI.parse(final_base_url_location + href[href.index('/', href.index('//') + 3)..-1])
        new_url.query = nil
        element['href'] = new_url.to_s
      else
        new_url = URI.parse(final_base_url_location + href)
        new_url.query = nil
        element['href'] = new_url.to_s
      end
      modified = true
      end

    html_doc.css("*[data-disqus-thread-link*='#{host}']").each do |element|
      disqus_link = element['data-disqus-thread-link']
      if disqus_link.index('//')
        new_url = URI.parse(final_base_url_location + disqus_link[disqus_link.index('/', disqus_link.index('//') + 3)..-1])
        new_url.query = nil
        element['data-disqus-thread-link'] = new_url.to_s
      else
        new_url = URI.parse(final_base_url_location + disqus_link)
        new_url.query = nil
        element['data-disqus-thread-link'] = new_url.to_s
      end
      modified = true
    end

    @log.info("\tRemoved Drupal host identifying markup.") if modified
  end


  #
  # This method gives us the chance to make any amendments to the DOM within all HTML files contained
  # within the export
  #
  def post_process_html_dom(drupal_host, export_directory)

    Dir.glob("#{export_directory}/**/*.html") do |html_file|
      @log.info("Post-processing HTML DOM in file '#{html_file}'...")

      html_doc = File.open(html_file) do |file|
        Nokogiri::HTML(file)
      end

      hide_drupal = remove_drupal_host_identifying_markup?(drupal_host, html_doc)
      rewrite_forms = rewrite_form_target_urls?(drupal_host, html_doc, html_file)
      rewrite_keycloak_src = rewrite_keycloak_src(html_doc, html_file)

      if hide_drupal || rewrite_forms || rewrite_keycloak_src
        @log.info("DOM in file '#{html_file}' has been modified, writing new file to disk.")
        File.open(html_file, 'w') do |file|
          file.write(html_doc.to_html)
        end
      end

      rewrite_error_page(html_doc, html_file)
    end
  end

  #
  # Re-writes the relative links on the error pages to be absolute so that they work from any part of the site
  # hierarchy.
  #
  def rewrite_error_page(html_doc, html_file)
    return unless html_file.end_with?('/404-error/index.html') || html_file.end_with?('/general-error/index.html')
    home_link = locate_index_link_href(html_doc, html_file)
    final_base_url = final_base_url_location

    @log.info("\t Re-writing absolute links starting '#{home_link}' to have absolute prefix '#{final_base_url}' on error page #{html_file}...")
    new_content = File.read(html_file).gsub(home_link, final_base_url)
    File.open(html_file, 'w') do |write|
      write.puts(new_content)
    end
  end

  #
  # Moves the index/index.html file up one directory so that the home-page is served by default when browsing
  # to the root of the directory
  #
  def relocate_index_html(export_directory)
    
    if File.exists?("#{export_directory}/index/index.html") 
      FileUtils.mv("#{export_directory}/index/index.html", "#{export_directory}/index.html")
      FileUtils.rm_rf("#{export_directory}/index")
      @process_runner.execute!("sed -i'' -e s:'\\.\\.\\/':'':g #{export_directory}/index.html")
      @log.info("Moved #{export_directory}/index/index.html to #{export_directory}/index.html.")
    else 
      @log.warn("Failed to move #{export_directory}/index/index.html to #{export_directory}/index.html. source file missing")
    end

  end

  #
  # Re-writes the action attribute of any form on the page where the action is pointing to the host from
  # which we have exported the HTML content
  #
  def rewrite_form_target_urls?(drupal_host, html_doc, html_file_name)

    forms_to_modify = html_doc.css("form[action^=\"http://#{drupal_host}\"]")
    forms_to_modify.each do |form|
      home_link_href = locate_index_link_href(html_doc, html_file_name)
      new_action_value = "#{home_link_href}search/"

      @log.info("\tModifying form action '#{form.attributes['action']}' to '#{new_action_value}'")
      form.attributes['action'].value = new_action_value
    end
    forms_to_modify.size > 0

  end

  #
  # The src of keycloak is being rewritten somewhere, not really sure where or how, this fixes it
  #
  def rewrite_keycloak_src(html_doc, html_file_name)
    src_to_modify = html_doc.css('script[src*=keycloak]')
    modified = false
    src_to_modify.each do |src|
      @log.info("\tModifying keycloak link #{src_to_modify.attr('src')} to '/auth/js/keycloak.js'")
      src.attributes['src'].value = '/auth/js/keycloak.js'
      modified = true
    end
    modified
  end

  private :final_base_url_location, :locate_index_link_href,
          :rewrite_links_for_trailing_slash_url_structure,
          :rewrite_form_target_urls?, :relocate_index_html,
          :remove_drupal_host_identifying_markup?,
          :post_process_html_dom, :rewrite_keycloak_src, :fetch_additional_static_resources

end


