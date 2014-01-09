module JBoss::Developer::Extensions
  # Post-process product metadata from product.yml, applying conventions
  class Product
    
    def initialize
      @default_guide_formats = {"html" => {}, "html-single" => {}, "pdf" => {}, "epub" => {}}
    end


    def execute(site)
      site.products = {}
      site.pages.each do |page|
        if page.product
          product = page.product
          id = page.parent_dir
          if not site.products[id] 
            # Set the product id to the parent dir
            product.id = id
            # Set the forum url to the default value, if not set
            product.forum_url ||= site.product_forum_base_url + "jboss" + product.id
            # Set the documentation url to the default value, if not set
            product.documentation_url ||= site.product_documentation_base_url + "/" + product.abbreviated_name.gsub(/ /, '_')
            # Set the download manager url to the default value, if not set
            product.download_manager_current_version_url ||= "#{site.download_manager_file_base_url}/#{product.id}/#{product.current_version}/"
            if product.current_version
              # Set the product's current major.minor version
              product.current_minor_version = product.current_version[/^([0-9]*\.[0-9]*)/, 1]
            end
            # Process the guides declared for the product
            a = []
            if product.guides
              product.guides.each do |k, v|
                guide = OpenStruct.new(v)
                guide.name ||= k.gsub(/_/, ' ')
                # We do some special magic for release notes, to avoid the guide name needing continual updates
                if k == "Release_Notes"
                  guide.dir_name = product.current_version[/^([0-9]*\.[0-9]*\.[0-9])/, 1] + "_Release_Notes"
                else
                  guide.dir_name = k
                end
                guide.formats ||= @default_guide_formats.clone
                b = []
                guide.formats.each do |l, w|
                  format = OpenStruct.new(w)
                  format.name ||= l
                  format.url ||= "#{product.documentation_url}/#{product.current_minor_version}/#{format.name}/#{guide.dir_name}"
                  b << format
                end
                guide.formats = b
                a << guide
              end
            end
            product.guides = a
            # Store the product in the global product map
            site.products[product.id] = product
          end
        end
      end
    end
  end
end

