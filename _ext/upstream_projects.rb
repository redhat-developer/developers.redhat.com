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
                                                     :authenticate => true,
                                                     :searchisko_username => ENV['dcp_user'],
                                                     :searchisko_password => ENV['dcp_password'],
                                                     :logger => site.profile == 'developement'})
      content = 
%q!ul.large-block-grid-3.small-block-grid-2
  - for project in page.projects
    li.upstream.solution
      a.image-link href='#'
        img src=''
      a.solution-name-link href='#'
        h3.solution-name =project['data']['name']
      span.update-date =project['id']
      p =page['code']
      a.upstream-download href='#'
        i.upstream-download-alt Download
      .upstream-more-content
        p.product-links
        ul.external-links
      a.upstream-toggle-more href='#'
        span.view-more
          | View More
          i.icon-plus-sign-alt
        span.view-less
          | View Less
          i.icon-minus-sign-alt
!

      upstream_page = ::Awestruct::Page.new(site, ::Awestruct::Handlers::LayoutHandler.new(site,
                         ::Awestruct::Handlers::TiltHandler.new(site,
                           ::Aweplug::Handlers::SyntheticHandler.new(site, content, '/projects/upstream.html.slim'))))
      upstream_page.layout = 'base'
      upstream_page.output_path = '/projects/upstream/index.html'
      upstream_page.send('projects=', JSON.load(searchisko.get('project').body)['hits'])
      site.pages << upstream_page
    end
  end
end
