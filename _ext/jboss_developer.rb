require 'aweplug/helpers/cdn'

module JBoss
  module Developer
    module Utilities

      def download_manager_path(product, version) 
        "#{site.download_manager_file_base_url}/#{product}/#{version}/download"
      end

      class CompassConfigurator

        SPRITES_DIR = "sprites"
        CDN_SPRITES_DIR = Pathname.new("_tmp").join("cdn", SPRITES_DIR)

        def initialize
          FileUtils.mkdir_p CDN_SPRITES_DIR
          if File.exists? Aweplug::Helpers::CDN::EXPIRES_FILE
            FileUtils.cp(Aweplug::Helpers::CDN::EXPIRES_FILE, CDN_SPRITES_DIR.join(".htaccess"))
          end
        end

        def execute(site)
          if site.cdn_http_base
            Compass.configuration.generated_images_dir = CDN_SPRITES_DIR.to_s
            Compass.configuration.http_generated_images_path = "#{site.cdn_http_base}/#{SPRITES_DIR}"
          end
        end

      end

    end
  end
end

