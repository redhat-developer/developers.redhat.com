require 'uri/http'
require_relative '../default_logger'

#
# The purpose of this class is to inspect an export directory to ensure that all pages that should be there, are in fact there.
# If a page is missing from the export, then an exception is raised causing the export process to fail.
#
# The raising of an exception can be overridden if the 'drupal.export.fail_on_missing' system property is set to 'false'. This
# should only be used in situations where you want the export to continue even if there is content missing e.g. you're having a very
# bad time of things with Drupal.
#
# @author rblake@redhat.com
#
class ExportInspector

  def initialize(critical_links_file = "#{File.dirname(__FILE__)}/critical-pages.txt")
    @critical_links_file = critical_links_file
    @log = DefaultLogger.logger
  end

  #
  # Determines the filesystem path at which the .html page export should exist
  #
  def determine_expected_filesystem_path(url)
    uri = URI.parse url
    page_path = uri.path
    if page_path == '/'
      '/index.html'
    else
      "#{page_path}/index.html"
    end
  end

  #
  # Determines if the process should fail if content is missing from the export
  #
  def should_fail_on_missing_content
    fail_on_missing = ENV['drupal.export.fail_on_missing']
    fail = true

    unless fail_on_missing.nil? || fail_on_missing.empty?
      fail = false if fail_on_missing =~ /false/
    end
    fail
  end

  #
  # Checks to see if the path exists at the expected path in the export directory
  #
  def check_if_path_exists(url, expected_file_path, export_directory)
    expected_path = File.join export_directory, expected_file_path
    exists = File.exist?(expected_path)
    unless exists
      puts("WARNING: Cannot locate export of '#{url}' at expected path: '#{expected_path}'")
    end
    exists
  end

  #
  # ensures that critical pages are in the URL list to be exported
  #
  def verify_all_critical_pages!(links_file)

    @log.info('Checking all critical pages are present in sitemap.xml and export...')
    critical_pages = []
    File.open(@critical_links_file, 'r').each_line do |line|
      critical_pages << line.chomp
      @log.info("\tChecking for presence of critical page '#{critical_pages.last}'...")
    end

    File.open(links_file, 'r').each_line do |line|
      critical_pages.delete_if do |critical_link|
        line.chomp.end_with?(critical_link)
      end
    end

    if critical_pages.size > 0
      raise StandardError, "The export list or sitemap.xml did not contain all critical pages. Missing critical pages  are #{critical_pages}. Failing export process."
    end

    @log.info('All critical links are present in sitemap.xml and export.')

  end

  #
  # Inspects the export to see if everything is there as expected.
  #
  def inspect_export(url_list, export_directory)

    puts '================================ EXPORT SUMMARY ================================'

    total_pages = 0
    missing_pages = 0

    File.open(url_list, 'r') do |file|
      file.each_line do |line|

        url = line.strip
        expected_file_system_path = determine_expected_filesystem_path(url)
        exists = check_if_path_exists(url, expected_file_system_path, export_directory)

        total_pages += 1
        unless exists
          missing_pages += 1
        end
      end
    end

    if missing_pages > 0
      puts "WARNING: Of '#{total_pages}' pages, '#{missing_pages}' are not found in the export."

      if should_fail_on_missing_content
        raise StandardError, "There are '#{missing_pages}' pages missing from the site export (see warnings for missing content). Failing export process."
      end

    end


  end

  private :determine_expected_filesystem_path, :check_if_path_exists, :should_fail_on_missing_content


end
