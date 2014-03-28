require 'awestruct/util/exception_helper'
require 'awestruct/page'
require 'awestruct/handlers/string_handler'

# Generates a asset list for marketing operations.  Defaults to /assets.yml
# Ignores images, css, robots, atoms, javascript files.
# Add a _config/assets.yml file to add files that for one reason or
# another won't be hanging off of site (e.g. they're in .htaccess)
module JBoss::Developer
  module Extensions
    class Assets

      def initialize
        @excluded_files = [ '/.htaccess', '/favicon.ico' ,'/robots.txt', '/stylesheets', '/javascripts'].to_set
        @excluded_extensions = ['.atom', '.scss', '.css', '.png', '.jpg', '.gif', '.js', '.rb' ].to_set
      end

      def execute( site )

        if site.profile != "development"
        
          # Configure our output file
          
          yml = YAML::Store.new Pathname.new(site.config.output_dir).join("assets.yml")


          # Add additional excludes from _config/assets.yml
          if site.assets
            if site.assets["excluded_files"]
              @excluded_files.merge(site.assets.excluded_files)
            end
            if site.assets["excluded_extensions"]
              @excluded_extensions.merge(site.assets.excluded_extensions)
            end
          end

          # Go through all of the site's pages and add sitemap metadata
          entries = site.pages
          entries.each { |entry| create_asset_data( yml, entry ) if valid_asset_entry( entry ) } if entries

          # Generate assets pages for stuff in _config/assets.yml
          site.assets.pages.each do |entry|
            yml.transaction do
              if entry.output_path =~ /^(.*)[\/](index.html)$/
                id = ($1 == "" ? "_root" : $1.gsub(/\//, "_"))
                e = yml[id]
                e["solution_code"] = "JBOSS"
                e["asset_title"] = entry.title  if e.title
                e["product"]  = entry.target_product if e.target_product
                e["lang"] = "en_US"
                e["description"] = entry.description if e.description 
                e["url"] = site.base_url + entry["output_path"]
              end
            end
          end if site.assets
        end

      end

      protected

      def create_asset_data( yml, src )
        yml.transaction do
          # id is url with replaced with _.
          # If if the path ends in /index.html, this is removed
          if src.output_path =~ /^[\/]?(.*)[\/](index.html)$/
            id = ($1 == "" ? "_root" : $1.gsub(/\//, "_"))
            e = yml[id] ||= {}
            e["solution_code"] = "JBOSS"
            e["asset_title"] = src.title if src.title
            e["product"] = src.target_product if src.target_product
            e["lang"] = "en_US"
            e["description"] = src.description if src.description
            e["url"] = src.site.base_url + src.output_path
          end
        end
      end

      def valid_asset_entry( page )
        if @excluded_files.member?(page.output_path) || @excluded_extensions.member?(page.output_extension) || page.assets_exclude
          false
        else
          true
        end
      end

    end
  end
end
