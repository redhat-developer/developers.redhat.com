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

  def rewrite_form_target_urls(drupal_host, export_directory)

    @log.info("Beginning re-write for form action attributes in export directory '#{export_directory}'...")

    Dir.glob("#{export_directory}/**/*.html") do | html_file |

      @log.info("- Processing HTML file '#{html_file}'...")

      doc = File.open(html_file) do | file |
        Nokogiri::HTML(file)
      end

      modified = false
      doc.css("form[action^=\"http://#{drupal_host}\"]").each do | form |
        new_action_value = form.attributes['action'].value.gsub("http://#{drupal_host}",'')
        @log.info("-- Modifying form action '#{form.attributes['action']}' to '#{new_action_value}'")
        form.attributes['action'].value = new_action_value
        modified = true
      end

      if modified
        @log.info("- Modified form target(s) in file '#{html_file}', flushing output to disk")
        html_to_write = File.open(html_file,'w')
        doc.write_to(html_to_write)
        html_to_write.close
      else
        @log.info("- No modifications required to file '#{html_file}'")
      end
    end

    @log.info("Completed re-write of form actions in export directory '#{export_directory}'.")

  end

end


