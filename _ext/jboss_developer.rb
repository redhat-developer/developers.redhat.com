require 'aweplug/helpers/cdn'

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
            Compass.configuration.generated_images_dir = CDN_SPRITES_PATH.to_s
            Compass.configuration.http_generated_images_path = "#{site.cdn_http_base}/#{SPRITES_DIR}"
          else
            Compass.configuration.generated_images_dir = SPRITES_PATH.to_s
            Compass.configuration.http_generated_images_path = "#{site.base_url}/#{SPRITES_PATH}"
          end
        end

      end

    end
  end
end

