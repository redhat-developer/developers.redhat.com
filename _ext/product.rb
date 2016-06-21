require 'json'
require 'aweplug/helpers/searchisko'
require 'aweplug/helpers/video'
require 'aweplug/cache/file_cache'
require 'asciidoctor'

module JBoss
  module Developer
    module Extensions
      # Post-process product metadata from product.yml, applying conventions
      class Product
        include Aweplug::Helpers::Video

        def initialize push_to_searchisko: true
          @default_guide_formats = {"html" => {}, "html-single" => {}, "pdf" => {}, "epub" => {}}
          @default_download_assets = {
            "installer" => {"type" => "jar"},
            "zip" => {"name" => "ZIP", },
            "sha1" => {"name" => "SHA1", "type" => "sha1"},
            "md5" => {"name" => "MD5", "type" => "md5"}, 
            "release_notes" => {"name" => "Release Notes", "icon" => "fa fa-pencil", "type" => "txt"},
            "source" => {},
            "docker-tar" => {"icon" => "fa fa-docker", "type" => "tar", "name" => "Image"},
            "docker-src" => {"icon" => "fa fa-docker", "name" => "Build file"},
            "docker-readme" => {"name" => "README", "icon" => "fa fa-pencil", "type" => "txt"}
          }
          @default_locale = "en_US"
          @default_download_artifact_type = "zip"
          @push_to_searchisko = push_to_searchisko
        end


        def execute(site)
          @searchisko = Aweplug::Helpers::Searchisko.new({:base_url => site.dcp_base_url, 
                                                          :authenticate => true, 
                                                          :searchisko_username => ENV['dcp_user'], 
                                                          :searchisko_password => ENV['dcp_password'], 
                                                          :cache => site.cache,
                                                          :logger => site.log_faraday,
                                                          :searchisko_warnings => site.searchisko_warnings})
          if site.cache.nil?
            site.send('cache=', Aweplug::Cache::FileCache.new)
          end
          articles = []
          solutions = []
          site.products = {}
          # This has been updated for DCP2 → http://dcp2-searchisko.rhcloud.com/v2/rest/search?sys_type=forumthread&agg=per_project_counts&size=1
          # forum_counts = Hash[JSON.load(@searchisko.search({sys_type:'forumthread', size:1, agg:'per_project_counts'}).body)['aggregations']['per_project_counts']['per_project_counts_filter']['per_project_counts_buckets']['buckets'].map(&:values).map(&:flatten)]
          site.pages.each do |page|
            if !page.product.nil? && page.relative_source_path.start_with?('/products')
              product = page.product
              id = page.parent_dir
              if not site.products.has_key? id
                # Set the product id to the parent dir
                product.id = id
                product.dcp_project_code = @searchisko.normalize('project_by_jbossdeveloper_product_code', id) { |normalized| normalized['project_code'] }
                if product.current_version
                  # Set the product's current major.minor version
                  product.current_minor_version = product.current_version[/^([0-9]*\.[0-9]*)/, 1]
                end
                docs(product, site)
                downloads(product, site)
                
                product.buzz_tags ||= product.id
                add_video product.vimeo_album, site, product: id, push_to_searchisko: @push_to_searchisko if product.vimeo_album
                add_video product.youtube_album, site, product: id, push_to_searchisko: @push_to_searchisko if product.youtube_album
                unless site.featured_videos[id].nil?
                  res = []
                  site.featured_videos[id].values.each do |url|
                    res << add_video(url, site, product: id, push_to_searchisko: @push_to_searchisko)
                  end
                  product.featured_videos = res.flatten.reject {|v| v.nil?}
                end

                # Add a flag if product has a connectors page
                if File.exists?('./products/' + id + '/connectors.adoc')
                  product.send('has_connectors_page=', true)
                end
                if File.exists?('./products/' + id + '/buzz.html.slim')
                  product.send('has_buzz_page=', true)
                end
                if File.exists?('./products/' + id + '/learn.html.slim')
                  product.send('has_learn_page=', true)
                end
                if File.exists?('./products/' + id + '/community.html.slim') || File.exists?('./products/' + id + '/community.adoc')
                  product.send('has_community_page=', true)
                end
                if File.exists?('./products/' + id + '/download.adoc')
                  product.send('has_download_page=', true)
                end
                if File.exists?('./products/' + id + '/resources.adoc')
                  product.send('has_resources_page=', true)
                end
                if File.exists?('./products/' + id + '/updates.adoc')
                  product.send('has_updates_page=', true)
                end
                if File.exists?('./products/' + id + '/docs-and-apis.adoc')
                  product.send('has_docsandapis_page=', true)
                end
                if File.exists?('./products/' + id + '/updates.adoc')
                  product.send('has_updates_page=', true)
                end
                if File.exists?('./products/' + id + '/help.html.slim')
                  product.send('has_help_page=', true)
                end


                # Add a flag if the product get-started has a partial to include for the set up section
                if File.exists?('_partials/product-get-started-partial-' + id + '-setup.html.slim')
                  product.send('has_setup_partial=', true)
                end

                # Add a flag if the product get-started has a partial to include for the install section
                if File.exists?('_partials/product-get-started-partial-' + id + '-install.html.slim')
                  product.send('has_install_partial=', true)
                end

                # Add a flag if the product get-started has a partial to include for the build section
                if File.exists?('_partials/product-get-started-partial-' + id + '-build.html.slim')
                  product.send('has_build_partial=', true)
                end

                if product.key? 'index'
                  product['index']['desc'] = ::Asciidoctor::Document.new(product['index']['desc'] || product['description']).convert
                else
                  # Used 1 to alert people they're lacking info, 2 for backwards compat
                  product['index'] = {}
                  product['index']['desc'] = ''
                  product['index']['action_links'] = []
                end

                # Store the product in the global product map
                site.products[product.id] = product
                page.send('featured_items=', product['featured_items'])
              end
            end
          end
        end

        def downloads(product, site)
          # Process the downloads declared for the product
          a = {}
          if product.downloads
            product.downloads.each do |k, v|
              download = OpenStruct.new(v)
              download.version ||= k.gsub(/_/, ' ').to_s
              download.minor_version = download.version[/^([0-9]*\.[0-9]*)/, 1]
              download.description ||= product.abbreviated_name
              download.release_date = download.release_date ? download.release_date : Date.today
              download.assets ||= @default_download_assets.clone
              b = {}
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
                    artifact.url ||= "#{site.download_manager_file_base_url}#{artifact.filename}"
                    artifact.icon ||= artifact_attr m, "icon", "fa fa-download"
                    c << artifact
                  end
                else
                  artifact = OpenStruct.new(w)
                  artifact.size = asset.size
                  artifact.type ||= artifact_attr l, "type", "zip"
                  artifact.name = asset.name
                  artifact.classifier ||= artifact_classifier l, l, artifact.type
                  artifact.filename ||= "jboss-#{product.id}-#{download.version}#{artifact.classifier}.#{artifact.type}"
                  if l == 'release_notes' && product.guides.has_key?('Release_Notes')
                    # Special case for release notes
                    artifact.url ||= "#{product.documentation_url}/#{download.minor_version}/html/#{release_notes_dir_name(download.version)}"
                  else
                    artifact.url ||= "#{site.download_manager_file_base_url}#{artifact.filename}"
                  end
                  artifact.icon ||= artifact_attr l, "icon", "fa fa-download"
                  c << artifact
                end
                asset.artifacts = c
                b[asset.key] = asset 
              end
              download.assets = b
              a[download.version] = download
            end
            product.default_download_artifact_type ||=  @default_download_artifact_type
            product.downloads = Hash[a.sort_by{|k, v| v.release_date}.reverse]
            if product.current_version
              product.current_download = product.downloads[product.current_version]
            elsif product.downloads.size > 0 
              product.current_download = product.downloads.values[0]
              product.current_version = product.current_download.version
            end
            product.current_download.assets.each do |asset|
              if asset[1].key == product.default_download_artifact_type
                product.default_download_artifact ||= asset[1].artifacts[0]
              end
            end

            early_access_releases = []

            # Identify any Betas that need highlighting
            if product.beta_version
              early_access_releases << product.downloads[product.beta_version]
            end

            if product.alpha_version
              early_access_releases << product.downloads[product.alpha_version]
            end

            if product.downloads.size > 0 && product.current_download
              candidates = []
              candidates << product.downloads.select { |k, v| v.release_date > product.current_download.release_date }
              unless candidates.empty?
                early_access_releases << candidates
                early_access_releases.flatten!
              end
            end

            unless early_access_releases.empty? || early_access_releases.first.empty?
              product.latest_release = early_access_releases.sort_by {|ver| ver['release_date']}.first.values.first
              product.latest_release.alpha = true if product.latest_release.version.downcase.include? 'alpha'
              product.latest_release.beta = true if product.latest_release.version.downcase.include? 'beta'
            end

            product.older_downloads = product.downloads.clone
            product.older_downloads.delete(product.current_download.version) unless product.current_download.nil?
            product.older_downloads.delete(product.latest_release.version) unless product.latest_release.nil?
          end
        end

        def artifact_attr(key, attr, default)
          if @default_download_assets.has_key?(key) && @default_download_assets[key].has_key?(attr)
            @default_download_assets[key][attr]
          else
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
          key = key['name'] if not key.instance_of? String # Hack to deal with regen issues
          key.gsub(/_/, ' ').split.map(&:capitalize).join(' ')
        end

        def release_notes_dir_name(version)
          version[/^([0-9]*\.[0-9]*\.[0-9])/, 1] + "_Release_Notes"
        end

        def docs(product, site)
          product.documentation_path ||= product.name.gsub(/ /, "_")
          product.documentation_minor_version ||= product.current_minor_version
          # Set the documentation url to the default value, if not set
          product.documentation_url ||= site.product_documentation_base_url + product.documentation_path
          # Process the guides declared for the product
          a = {} 
          product.guide_base_url ||= "#{product.documentation_url}/#{product.documentation_minor_version}"
          if product.guides
            product.guides.each do |k, v|
              guide = OpenStruct.new(v)
              guide.name ||= k.gsub(/_/, ' ')
              # We do some special magic for release notes, to avoid the guide name needing continual updates
              if k == "Release_Notes" && product.current_version
                guide.dir_name = release_notes_dir_name(product.current_version)
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
