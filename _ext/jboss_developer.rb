require 'uri'
require 'aweplug/helpers/cdn'
require 'aweplug/helpers/png'
require 'compass'

module JBoss
  module Developer
    module Utilities

      def download_manager_path(product, version) 
        "#{site.download_manager_file_base_url}/#{product}/#{version}/download"
      end

      def truncate_para(p, max_length = 150)
        out = ""
        i = 0
        p.gsub(/<\/?[^>]*>/, "").scan(/[^\.!?,]+[\.!?,]/).map(&:strip).each do |s|
          i += s.length
          if i > max_length
            break
          else
            out << s
          end
        end
        out
      end

      class CompassConfigurator

        SPRITES_DIR = "sprites"
        CDN_SPRITES_PATH = Pathname.new("_tmp").join("cdn").join(SPRITES_DIR)
        SPRITES_PATH = Pathname.new("images").join(SPRITES_DIR)

        def initialize
          FileUtils.mkdir_p CDN_SPRITES_PATH
          FileUtils.mkdir_p SPRITES_PATH
          if File.exists? Aweplug::Helpers::CDN::EXPIRES_FILE
            FileUtils.cp(Aweplug::Helpers::CDN::EXPIRES_FILE, CDN_SPRITES_PATH.join(".htaccess"))
          end
        end

        def execute(site)
          if site.cdn_http_base
            # Load this late, we don't want to normally require pngquant
            Compass.configuration.generated_images_dir = CDN_SPRITES_PATH.to_s
            Compass.configuration.http_generated_images_path = "#{site.cdn_http_base}/#{SPRITES_DIR}"
            # Run sprites through pngquant on creation
            Compass.configuration.on_sprite_saved { |filename| Aweplug::Helpers::PNGFile.new(filename).compress! }
          else
            Compass.configuration.generated_images_dir = SPRITES_PATH.to_s
            Compass.configuration.http_generated_images_path = "#{site.base_url}/#{SPRITES_PATH}"
          end
        end

      end

    end
  end
end

# Hack for our own purposes with QuickStarts
module Kramdown
  module Parser
    class QuickStartParser 
      def add_link(el, href, title, alt_text = nil)
        if el.type == :a
          if href =~ /README\.md/
            el.attr['href'] = '../index.html' + "##{URI.parse(href).fragment}"
          elsif href =~ /CONTRIBUTING\.md/
            el.attr['href'] = 'contributing/index.html' + "##{URI.parse(href).fragment}"
          else
            el.attr['href'] = href
          end 
        else
          # TODO something needs to be done about images too
          el.attr['src'] = href
          el.attr['alt'] = alt_text
          el.children.clear
        end
        el.attr['title'] = title if title
        @tree.children << el
      end
    end
  end
end

