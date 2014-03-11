require 'json'
require 'aweplug/handlers/synthetic_handler'
require 'aweplug/helpers/searchisko'
require 'aweplug/cache/yaml_file_cache'
require 'awestruct/page'
require 'awestruct/handlers/layout_handler'
require 'awestruct/handlers/tilt_handler'
require 'awestruct/handler_chain'

module JBoss::Developer::Extensions
  class UpstreamProjects
    def execute site
      if site.cache.nil?
        site.send('cache=', Aweplug::Cache::YamlFileCache.new)
      end
      searchisko = Aweplug::Helpers::Searchisko.new({:base_url => site.dcp_base_url,
                                                     :authenticate => false,
                                                     :cache => site.cache,
                                                     :logger => site.profile == 'developement'})
      page = site.pages.find {|p| p.relative_source_path =~ /projects\.html\.slim/}

      page.send('projects=', JSON.load(searchisko.get('search?sys_type=project_info&size=500&field=_source').body)['hits'])
    end
  end
end
