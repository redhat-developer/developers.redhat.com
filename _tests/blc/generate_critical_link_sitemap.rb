require 'builder'

# This class is used to generate a local sitemap.xml containing RHDP critical links
class SiteMapGenerator

  def initialize(host_to_test, test_dir)
    @host_to_test = host_to_test
    @test_dir = test_dir
    @critical_links = []
    File.open("#{@test_dir}/critical-links.txt", 'r').each_line do |line|
      temp = line.chop.split("\t")
      @critical_links << temp[0]
    end
  end

  def generate_sitemap
    puts 'Generating sitemap.xml file . . . .'
    xml_str = ''
    time = Time.new
    builder = Builder::XmlMarkup.new(:target => xml_str, :indent => 2)
    builder.instruct!
    builder.urlset(:xmlns => 'http://www.sitemaps.org/schemas/sitemap/0.9') {
      @critical_links.each do |url|
        builder.url {
          builder.loc("#{@host_to_test}/#{url}")
          builder.lastmod(time.strftime('%Y-%m-%dT%H:%M:%S+00:00'))
        }
      end
    }
    save_file(xml_str)
  end

  protected

  def save_file(xml)
    File.open("#{@test_dir}/critical-links-sitemap.xml", 'w+') do |f|
      f.write(xml)
    end
  end

end

def execute(sitemap_generator)
  sitemap_generated = sitemap_generator.generate_sitemap
  Kernel.exit(sitemap_generated ? 0 : 1)
end

if $PROGRAM_NAME == __FILE__
  host_to_test = ARGV[0]
  if host_to_test.nil? || host_to_test.empty?
    puts 'Please specify the host to test as the first argument to this script e.g. ruby generate_criitical_link_sitemap.rb https://developers.redhat.com'
    Kernel.exit(1)
  end
  generate_sitemap = SiteMapGenerator.new(host_to_test, "#{__dir__}")
  execute(generate_sitemap)
end
