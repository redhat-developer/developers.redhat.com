require 'nokogiri'
require 'yaml'
require 'digest'

module JBoss::Developer::MktgOps

  # Wrapper for a YAML Store that handles assets
  class AssetStore

    def initialize site
      # Configure our output file
      @yml = YAML::Store.new Pathname.new(site.config.output_dir).join("mktg_ops.yml")
      @yml.transaction do
        @yml[:assets] ||= {}
        @yml[:external_links] ||= {}
      end
    end

    # Public: Add an asset
    # src - a hash with these required attributes: 
    #         - :url
    #         - :type 'internal' | 'external'
    #       and these optional attributes:
    #         - :title
    #         - :description
    #         - :target_product
    def add_asset src
      if src && !src.empty?
        e = {}.merge(src).delete_if {|k, v| v == nil || v.empty? }
        id = Digest::MD5.hexdigest(src[:url])
        if src[:type] == "asset"
          @yml[:assets][id] = e
        else
          @yml[:external_links][id] = e
        end
      end
    end

    def transaction
      @yml.transaction do 
        yield
        @yml.commit
      end

    end

  end
 
  # Generates a asset list for marketing operations.  Defaults to /assets.yml
  # Ignores images, css, robots, atoms, javascript files.
  # Add a _config/assets.yml file to add files that for one reason or
  # another won't be hanging off of site (e.g. they're in .htaccess)
  class Assets

    def initialize
      @excluded_files = [ '/.htaccess', '/favicon.ico' ,'/robots.txt', '/stylesheets', '/javascripts'].to_set
      @excluded_extensions = ['.atom', '.scss', '.css', '.png', '.jpg', '.gif', '.js', '.rb' ].to_set
    end

    def execute( site )
      # Only enable if we running in metrics mode
      if site.metrics 

        store = AssetStore.new site
      
        # Add additional excludes from _config/assets.yml
        if site.assets
          if site.assets["excluded_files"]
            @excluded_files.merge(site.assets.excluded_files)
          end
          if site.assets["excluded_extensions"]
            @excluded_extensions.merge(site.assets.excluded_extensions)
          end
        end

        # Go through all of the site's pages and add asset metadata
        store.transaction do
          site.pages.each do |page|
            store.add_asset({
                :url => "#{site.base_url}#{page.output_path}", 
                :type => 'asset', 
                :title => page.title, 
                :description => page.description, 
                :target_product => page.target_product,
                :solution_code => "JBOSS",
                :lang => "en_US"
            }) if valid_asset_entry( page )
          end 
        end if site.pages

        # Generate assets pages for stuff in _config/assets.yml
        store.transaction do
          site.assets.pages.each do |entry|
            store.add_asset({
                :url => entry.url, 
                :type => 'asset', 
                :title => entry.title, 
                :description => entry.description, 
                :target_product => entry.target_product,
                :solution_code => "JBOSS",
                :lang => "en_US"
            })
          end 
        end if site.assets
      end
    end

    private

    def valid_asset_entry page
      if @excluded_files.member?(page.output_path) || @excluded_extensions.member?(page.output_extension) || page.assets_exclude
        false
      else
        true
      end
    end

  end

  class LinkInstrumentation

    def initialize
    end

    def transform(site, page, input)
      # Only enable if we running in metrics mode
      if site.metrics && page.output_extension == ".html"
        @store ||= AssetStore.new site
        if !@whitelist
          @whitelist = site.external_link_whitelist ? Array.new(site.external_link_whitelist) : []
          @whitelist << site.base_url if site.base_url
        end
        doc = Nokogiri::HTML(input)
        @store.transaction do
          doc.css('a').each do |a|
            url = a['href']
            if include? url
              @store.add_asset({
                :url => url, 
                :type => 'external_link', 
                :title => a['title'] 
              })
              a['onclick'] ||= "" << "app.mktg_ops.track(this);return false;"
            end
          end
        end
        doc.to_html
      else
        input
      end
    end

    private

    def external? url, base_url
      url && !url.start_with?(base_url) && url =~ /^((https?:)?\/\/)/
    end

    def include? url
      url && url =~ /^((https?:)?\/\/)/ && @whitelist.find_index {|n| url.start_with? n} == nil
    end

  end
end
