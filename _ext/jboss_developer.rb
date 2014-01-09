module JBoss
  module Developer
    module Utilities

      def download_manager_path(product, version) 
        "#{site.download_manager_file_base_url}/#{product}/#{version}"
      end

    end
  end
end
