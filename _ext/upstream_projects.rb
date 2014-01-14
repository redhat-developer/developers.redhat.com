require 'json'
require 'aweplug/handlers/synthetic_handler'
require 'aweplug/helpers/searchisko'
require 'awestruct/page'
require 'awestruct/handlers/layout_handler'
require 'awestruct/handlers/tilt_handler'
require 'awestruct/handler_chain'

module JBoss::Developer::Extensions
  class UpstreamProjects
    def execute site
      searchisko = Aweplug::Helpers::Searchisko.new({:base_url => site.dcp_base_url,
                                                     :authenticate => false,
                                                     :logger => site.profile == 'developement'})
      page = site.pages.find {|p| p.relative_source_path =~ /projects\.html\.slim/}

      page.send('projects=', JSON.load(searchisko.get('project').body)['hits'])
    end
  end
end
