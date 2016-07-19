require 'nokogiri'
require 'net/http'

#
# This class will perform a diff between the sitemap.xml at developers.redhat.com and any given sitemap.xml. This is
# useful to see which pages are in for example a Drupal instance, but not on the current developers.redhat.com site.
#
#
class SitemapDiff

  def initialize
    @developers_sitemap = "http://developers.redhat.com/sitemap.xml"
  end

  def get_sitemap_links(sitemap_location)
    sitemap_content = fetch_sitemap(sitemap_location)
    get_links_from_sitemap(sitemap_content)
  end

  def fetch_sitemap(sitemap_location)
    sitemap_url = URI.parse(sitemap_location)
    sitemap_contents = Net::HTTP.get_response(sitemap_url)
    raise StandardError.new("Failed to fetch sitemap.xml from '#{sitemap_location}'. Got status: '#{sitemap_contents.code}'") if sitemap_contents.code.to_i != 200
    sitemap_contents.body
  end

  def get_links_from_sitemap(sitemap_content)
    document = Nokogiri::XML(sitemap_content)
    links = []
    document.css('url loc').each do | link |
      uri_path = URI.parse(link.content).path
      if uri_path != '/' and uri_path.end_with?('/')
        uri_path = uri_path[0..-2]
      end
      links << uri_path
    end

    links
  end

  def compare_links_in_sitemaps(compared_sitemap, existing_links, sitemap_to_compare)
    links_in_existing_not_in_compared = existing_links - sitemap_to_compare
    links_in_compared_not_in_existing = sitemap_to_compare - existing_links

    puts "=== The following pages are in the sitemap of http://developers.redhat.com/sitemap.xml but not in the sitemap at #{compared_sitemap}: ==="
    links_in_existing_not_in_compared.each do | link |
      puts "- #{link}"
    end

    puts "=== The following pages are in the sitemap at '#{compared_sitemap}' but not in the http://developers.redhat.com/sitemap.xml sitemap: ==="
    links_in_compared_not_in_existing.each do | link |
      puts "- #{link}"
    end

  end

  def compare_existing_sitemap_to(sitemap_to_compare)

    current_sitemap_links = get_sitemap_links(@developers_sitemap)
    compared_sitemap_links = get_sitemap_links(sitemap_to_compare)
    compare_links_in_sitemaps(sitemap_to_compare, current_sitemap_links, compared_sitemap_links)

  end

  private :compare_links_in_sitemaps, :get_links_from_sitemap, :fetch_sitemap, :get_sitemap_links

end

if $0 == __FILE__

  sitemap_to_compare = ARGV[0]
  if sitemap_to_compare.nil? or sitemap_to_compare.empty?
    puts "Usage: ruby sitemap_diff.rb http://<your_sitemap_url>"
    Kernel.exit(1)
  end

  sitemap_diff = SitemapDiff.new
  sitemap_diff.compare_existing_sitemap_to(sitemap_to_compare)
  Kernel.exit(0)

end