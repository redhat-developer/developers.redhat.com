require 'cgi'
require 'nokogiri'
require_relative '../default_logger'

#
# This class is used to post-process an httrack export of a site. It will recursively
# search the passed directory and look for any .html files. Within those HTML files, it
# look for any <form> elements and rewrite the 'target' attribute if it is set to the host from
# from which the site was originally exported, setting the target to be relative to the export instead.
#
class FormActionRewrite

  def initialize
    @log = DefaultLogger.logger
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
        new_action_value = home_link_href.gsub('index.html','search.html')

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

  private :locate_index_link_href

end


