require 'cgi'
require 'nokogiri'
require_relative '../default_logger'

#
# This class is used to post-process an httrack export of a site. It will recursively
# search the passed directory and look for any .html files.
#
# The primary reason for this thing existing is that we wish to maintain a trailing URL structure when the site is exported
# e.g. http://developers.redhat.com/containers/ and not http://developers.redhat.com/containers.html
#
# Default out-of-the-box, we can only do the latter with Httrack, hence all of this post-processing logic to get us to the former!
#
class ExportHtmlPostProcessor

  def initialize(process_runner)
    @log = DefaultLogger.logger
    @process_runner = process_runner
  end

  #
  # Locates the link back to the index of the site. This is required so that we can re-write the search
  # form target to be relative to the current page.
  #
  def locate_index_link_href(html_document, html_page)
      home_link = html_document.css("#home-link")
      raise StandardError.new("Unable to locate link to index.html on page '#{html_page}'") if home_link.empty?
      raise StandardError.new("Found more than one link with id 'home-link' on page '#{html_page}'") if home_link.length > 1
      home_link.first.attributes['href'].value
  end

  #
  # Performs post-processing on the HTML export to make it fit the requiring site structure.
  #
  def post_process_html_export(drupal_host, export_directory)
    relocate_index_html(export_directory)
    rewrite_links_for_trailing_slash_url_structure(export_directory)
    rewrite_form_target_urls(drupal_host, export_directory)
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
  # Moves the index/index.html file up one directory so that the home-page is served by default when browsing
  # to the root of the directory
  #
  def relocate_index_html(export_directory)
    FileUtils.mv("#{export_directory}/index/index.html", "#{export_directory}/index.html")
    FileUtils.rm_rf("#{export_directory}/index")
    @process_runner.execute!("sed -i'' -e s:'\\.\\.\\/':'':g #{export_directory}/index.html")
    @log.info("Moved #{export_directory}/index/index.html to #{export_directory}/index.html.")
  end

  #
  # Re-writes the action attribute of any form on the page where the action is pointing to the host from
  # which we have exported the HTML content
  #
  def rewrite_form_target_urls(drupal_host, export_directory)

    @log.info("Beginning re-write for form action attributes in export directory '#{export_directory}'...")

    Dir.glob("#{export_directory}/**/*.html") do | html_file |

      @log.info("- Processing HTML file '#{html_file}'...")

      doc = File.open(html_file) do | file |
        Nokogiri::HTML(file)
      end

      modified = false
      doc.css("form[action^=\"http://#{drupal_host}\"]").each do | form |

        home_link_href = locate_index_link_href(doc, html_file)
        new_action_value = "#{home_link_href}search/"

        @log.info("-- Modifying form action '#{form.attributes['action']}' to '#{new_action_value}'")
        form.attributes['action'].value = new_action_value
        modified = true
      end

      if modified
        @log.info("- Modified form target(s) in file '#{html_file}', flushing output to disk")
        File.open(html_file,'w') do | file |
          file.write(doc.to_html)
        end
      else
        @log.info("- No modifications required to file '#{html_file}'")
      end
    end

    @log.info("Completed re-write of form actions in export directory '#{export_directory}'.")

  end

  private :locate_index_link_href, :rewrite_links_for_trailing_slash_url_structure, :rewrite_form_target_urls, :relocate_index_html

end


