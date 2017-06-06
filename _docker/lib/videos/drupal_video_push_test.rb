require 'yaml'
require 'faraday'
require 'logger'
require 'uri'
require 'yaml'
require 'nokogiri'

class DrupalVideoPushTest

  def initialize arg
    @opts = YAML.load_file('./drupal_site_info.yml')[arg]
    @faraday = Faraday.new(:url => "#{@opts['host']}:#{@opts['port']}") do |faraday|
      faraday.request :url_encoded
      faraday.response :logger
      faraday.adapter Faraday.default_adapter
    end

  end

  def find_videos
    parse_sitemap(fetch_sitemap)
  end

  def fetch_sitemap

    resp = @faraday.get('sitemap.xml')
    resp.body
  end

  def parse_sitemap(file)
    sitemap_xml = Nokogiri::XML(file)
    sitemap_ar = []
    sitemap_xml.xpath('//ns:url', {'ns' => 'http://www.sitemaps.org/schemas/sitemap/0.9'}).each do |url|
      loc = url.element_children.find {|k| k.name == 'loc'}.text.strip
      sitemap_ar << loc
    end
    video_urls = sitemap_ar.reject! do |v|
      !v.include?('video')
    end
    video_urls
  end


end


if $PROGRAM_NAME == __FILE__
  input = ARGV[0]
  # Complexity is through the roof...total hack but it works...
  pr_sitemap = DrupalVideoPushTest.new(input).find_videos.collect {|v| v.gsub(/.*\/video/, '/video')}
  prod_sitemap = DrupalVideoPushTest.new('drupal_prod').find_videos.collect {|v| v.gsub(/.*\/video/, '/video')}


  missing = prod_sitemap.collect {|v|
    if pr_sitemap.find {|e| v.include?(e)}
      nil
    else
      v
    end
  }.reject! do |empty| empty.nil? end

  puts "\nThe following videos exist in production but not in #{input}:"
  puts missing

end