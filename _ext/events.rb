require 'aweplug/helpers/searchisko'
require 'parallel'
require 'date'

module JBoss
  module Developer
    class Events

      # def initialize
      #
      # end

      def execute site
        searchisko = Aweplug::Helpers::Searchisko.default site, 0

        Parallel.each(site.events, in_threads: (site.build_threads || 0)) do |(id, data)|

        searchisko_hash = data.collect do |(key, value)|

          case key
            when 'start_date'
              ['start_date', DateTime.parse(value)]
            when 'end_date'
              ['end_date', DateTime.parse(value)]
            when 'title'
              [:sys_title, value]
            when 'description'
              [:sys_description, value]
            when 'on_homepage'
              [:featured, value]
            when 'image'
              [:image, value]
            # Hacked together
            when 'type'
              [:sys_url_view, value]
            when 'more_details'
              [:event_url, value]
            else
              [key, value]
          end
        end.to_h
        
        # Add identifier and other required fields for Searchisko Content Object
        searchisko_hash.merge!({:sys_url_view => "#{site.base_url}/events/event#!id=#{id}"})
        
        unless !site.push_to_searchisko || site.profile =~ /development/
          searchisko.push_content('jbossdeveloper_event',
                                  id,
                                  searchisko_hash.to_json)
        end
      end
    end

  end
end
end
