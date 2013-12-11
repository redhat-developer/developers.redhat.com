module JBoss
  module Developer
    module Utilities

      def download_manager_path(product, version) 
        "#{site.download_manager_file_base_url}/#{product}/#{version}"
      end

      def product_documentation_url(product)
        product_metadata = site._common['products'][product]['product']
        if product_metadata['documentation_url']
          product_metadata['documentation_url']
        else
          product_path = product_metadata['abbreviated_name'].gsub(/ /, '_')
          "#{site.product_documentation_base_url}#{product_path}"
        end
      end

      def product_forum_url(product)
        product_metadata = site._common['products'][product]['product']
        if product_metadata['forum_url']
          product_metadata['forum_url']
        else
          "#{site.product_forum_base_url}jboss#{product}"
        end
      end

    end
  end
end
