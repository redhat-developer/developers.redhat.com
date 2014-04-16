require 'json'
require 'aweplug/helpers/searchisko'

module JBoss
  module Developer
    module Extensions
      # Post-process product metadata from product.yml, applying conventions
      class Product
        
        def initialize
          @default_guide_formats = {"html" => {}, "html-single" => {}, "pdf" => {}, "epub" => {}}
          @default_download_assets = {
            "installer" => {"type" => "jar"},
            "zip" => {"name" => "ZIP", },
            "sha1" => {"name" => "SHA1", "type" => "sha1"},
            "md5" => {"name" => "MD5", "type" => "md5"}, 
            "release_notes" => {"name" => "Release Notes", "icon" => "fa fa-pencil", "type" => "txt"},
            "source" => {}
          }
          @default_locale = "en_US"
          @default_download_artifact_type = "zip"
        end


        def execute(site)
          articles = []
          solutions = []
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
                if product.current_version
                  # Set the product's current major.minor version
                  product.current_minor_version = product.current_version[/^([0-9]*\.[0-9]*)/, 1]
                end
                docs(product, site)
                downloads(product, site)
                articles << articles(product, site)
                solutions << solutions(product, site)
                if page.source_path.include? 'community'
                  page.send('upstream_projects=', product['upstream_projects'])
                end
                
                # Store the product in the global product map
                site.products[product.id] = product
              end
            end
          end
          File.open(Pathname.new(site.output_dir).join('rht_articles.json'), 'w') { |f| f.write( articles.flatten.reject{ |a| a.nil? }.to_json) }
          File.open(Pathname.new(site.output_dir).join('rht_solutions.json'), 'w') { |f| f.write( solutions.flatten.reject{ |s| s.nil? }.to_json) }
        end

        def articles(product, site)
          product.articles.collect { |a| {'url' => "https://api.access.redhat.com/rs/articles#{a[a.rindex("/"), a.length]}", 'product' => product.id } } unless product.articles.nil?
        end

        def solutions(product, site)
          product.solutions.collect { |a| {'url' => "https://api.access.redhat.com/rs/solutions#{a[a.rindex("/"), a.length]}", 'product' => product.id}} unless product.solutions.nil?
        end

        def downloads(product, site)
          # Process the downloads declared for the product
          a = {}
          if product.downloads
            product.downloads.each do |k, v|
              download = OpenStruct.new(v)
              download.version ||= k.gsub(/_/, ' ').to_s
              download.description ||= product.abbreviated_name
              download.release_date = download.release_date ? download.release_date : Date.today
              download.assets ||= @default_download_assets.clone
              b = []
              download.assets.each do |l, w|
                asset = OpenStruct.new(w)
                asset.key = l
                asset.name ||= artifact_attr l, "name", key_to_name(l) 
                c = []
                if asset.artifacts
                  asset.artifacts.each do |m, x|
                    artifact = OpenStruct.new(x)
                    artifact.type ||= artifact_attr m, "type", "zip"
                    artifact.classifier ||= artifact_classifier l, m, artifact.type
                    artifact.name ||=  artifact_attr m, "name", key_to_name(m)
                    artifact.filename ||= "jboss-#{product.id}-#{download.version}#{artifact.classifier}.#{artifact.type}"
                    artifact.url = "#{site.download_manager_file_base_url}/#{artifact.filename}"
                    artifact.icon ||= artifact_attr m, "icon", "fa fa-download"
                    c << artifact
                  end
                else
                  artifact = OpenStruct.new
                  artifact.size = asset.size
                  artifact.type ||= artifact_attr l, "type", "zip"
                  artifact.name = asset.name
                  artifact.classifier ||= artifact_classifier l, l, artifact.type
                  artifact.filename ||= "jboss-#{product.id}-#{download.version}#{artifact.classifier}.#{artifact.type}"
                  if l == 'release_notes' && product.guides.has_key?('Release_Notes')
                    # Special case for release notes
                    artifact.url = product.guides['Release_Notes'].formats['html'].url
                  else
                    artifact.url = "#{site.download_manager_file_base_url}/#{artifact.filename}"
                  end
                  artifact.icon ||= artifact_attr l, "icon", "fa fa-download"
                  c << artifact
                end
                asset.artifacts = c
                b << asset 
              end
              download.assets = b
              a[download.version] = download
            end
            product.downloads = Hash[a.sort_by{|k, v| v.release_date}.reverse]
            if product.current_version
              product.current_download = product.downloads[product.current_version]
            elsif product.downloads.size > 0 
              product.current_download = product.downloads.values[0]
              product.current_version = product.current_download.version
            end
            product.older_downloads = product.downloads.clone
            product.older_downloads.delete(product.current_version)
            product.default_download_artifact_type ||=  @default_download_artifact_type
            product.current_download.assets.each do |asset|
              if asset.key == product.default_download_artifact_type
                product.default_download_artifact ||= asset.artifacts[0]
              end
            end
          end
        end

        def artifact_attr(key, attr, default)
          if @default_download_assets.has_key?(key) && @default_download_assets[key].has_key?(attr)
            @default_download_assets[key][attr]
          else default
            default
          end
        end

        def artifact_classifier c1, c2, type
          c1 = c1.empty? ? nil : c1
          c2 = c2.empty? ? nil : c2
          # Remove classifiers that are identical to the type
          c1 = c1 == type ? nil : c1
          c2 = c2 == type ? nil : c2

          if c1 == nil && c2 == nil
            ""
          elsif c1 == c2
            # Only display a classifier once if they are identical
            "-#{c1.downcase}"
          elsif c2 == nil
            "-#{c1.downcase}"
          elsif c1 == nil
            "-#{c2.downcase}"
          else
            "-#{c1.downcase}-#{c2.downcase}"
          end
        end

        def key_to_name(key)
          key.gsub(/_/, ' ').split.map(&:capitalize).join(' ')
        end

        def docs(product, site)
          product.documentation_path ||= product.name.gsub(/ /, "_")
          product.documentation_minor_version ||= product.current_minor_version
          # Set the documentation url to the default value, if not set
          product.documentation_url ||= site.product_documentation_base_url + "/" + product.documentation_path
          # Process the guides declared for the product
          a = {} 
          product.guide_base_url ||= "#{product.documentation_url}/#{product.documentation_minor_version}"
          if product.guides
            product.guides.each do |k, v|
              guide = OpenStruct.new(v)
              guide.name ||= k.gsub(/_/, ' ')
              # We do some special magic for release notes, to avoid the guide name needing continual updates
              if k == "Release_Notes" && product.current_version
                guide.dir_name = product.current_version[/^([0-9]*\.[0-9]*\.[0-9])/, 1] + "_Release_Notes"
              else
                guide.dir_name = k
              end
              guide.formats ||= @default_guide_formats.clone
              guide.locale ||= @default_locale
              b = {}
              guide.formats.each do |l, w|
                format = OpenStruct.new(w)
                format.name ||= l
                if ["pdf", "epub"].include? format.name
                  format.url ||= "#{product.guide_base_url}/#{format.name}/#{guide.dir_name}/#{product.documentation_path}-#{product.documentation_minor_version}-#{guide.dir_name}-#{guide.locale.gsub(/_/, "-")}.#{format.name}"
                else 
                  format.url ||= "#{product.guide_base_url}/#{format.name}/#{guide.dir_name}"
                end
                b[l] = format
              end
              guide.formats = b
              a[k] = guide
            end
          end
          product.guides = a
        end
      end
    end
  end
end
