require 'aweplug/helpers/searchisko'
require 'parallel'

module JBoss
  module Developer
    class Connectors

      def initialize

      end

      def execute site
        # Run this after the GoogleSpreadsheet extension for connectors
        searchisko = Aweplug::Helpers::Searchisko.new({:base_url => site.dcp_base_url, 
                                                       :authenticate => true, 
                                                       :searchisko_username => ENV['dcp_user'], 
                                                       :searchisko_password => ENV['dcp_password'], 
                                                       :cache => site.cache,
                                                       :logger => site.log_faraday,
                                                       :searchisko_warnings => site.searchisko_warnings})
        Parallel.each(site.fuse_connectors, in_threads: 40) do |connector|
          searchisko_hash = connector.collect { |(key, value)|
            case key
            when 'name'
              ['sys_title', value]
            when 'short_description'
              ['sys_description', value]
            when 'long_description'
              ['sys_content', value]
            else
              [key, value]
            end
          }.merge({'sys_url_view' => "#{site.base_url}/products/fuse/connectors#!id=#{connector['id']}",}).to_h
          
          searchisko.push_content('jbossdeveloper_fuse_connectors', 
                          connector[:id], 
                          searchisko_hash.to_json)
        end
      end

    end
  end
end
