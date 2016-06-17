require 'fileutils'
require 'net/http'
require 'nokogiri'

require_relative '../default_logger'

#
# Fetches a sitemap.xml from the passed Drupal host and generates a list of links from that
# document to be fetched as part of the site export process.
#
# @author rblake@redhat.com
#
class DrupalPageUrlListGenerator

  def initialize(drupal_host, export_directory)
    @drupal_host = drupal_host
    @export_directory = export_directory
    @log = DefaultLogger.logger
  end

  #
  # Makes an HTTP get to fetch the contents of the sitemap.xml
  #
  def fetch_sitemap_contents
    sitemap_url = URI.parse("http://#{@drupal_host}/sitemap.xml")
    @log.info("Fetching sitemap content from '#{sitemap_url.to_s}'...")

    sitemap_contents = Net::HTTP.get_response(sitemap_url)
    raise StandardError.new("Failed to fetch sitemap.xml from '#{sitemap_url.to_s}'. Got status: '#{sitemap_contents.code}'") if sitemap_contents.code.to_i != 200

    @log.info("Successfully fetched sitemap from '#{sitemap_url.to_s}'")
    sitemap_contents.body
  end

  #
  # Parses the contents of the sitemap into a list of links
  #
  def parse_sitemap(sitemap_contents)
    document = Nokogiri::XML(sitemap_contents)
    links = []
    document.css('url loc').each do | link |
      links << link.content
    end

    # Ensure that we also grab robots.txt which will not appear in the sitemap.xml
    links << "http://#{@drupal_host}/robots.txt"
  end

  #
  # Writes the list of links to the url-list.txt file
  #
  def write_links_to_file(links)

    links_file = "#{@export_directory}/url-list.txt"
    @log.info("Writing '#{links.length}' links to '#{links_file}'")

    FileUtils.rm("#{links_file}", :force => true)
    FileUtils.touch("#{links_file}")

    File.open("#{links_file}", 'w+') do | file |
      file.puts(links)
      @log.info("Successfully wrote '#{links.length}' links to '#{links_file}'")
      file
    end

  end

  #
  # Generates the list of links to be fetched from the remote Drupal instance. The list of
  # links will be stored as url-list.txt inside the export directory
  #
  def generate_page_url_list!
    sitemap_content = fetch_sitemap_contents
    links = parse_sitemap(sitemap_content)
    write_links_to_file(links)
  end


  private :fetch_sitemap_contents, :parse_sitemap, :write_links_to_file

end