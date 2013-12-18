require 'yaml'
require 'aweplug/handlers/synthetic_handler'
require 'aweplug/helpers/searchisko'
require 'aweplug/helpers/git_commit_metadata'
require 'awestruct/page'
require 'awestruct/handlers/layout_handler'
require 'awestruct/handlers/tilt_handler'
require 'awestruct/handler_chain'
require 'pry' # debugging

module JBoss::Developer::Extensions
  class Stacks
    include Aweplug::Helper::Git::Commit::Metadata

    attr_reader :yml

    SYNTHETIC_HANDLER_CHAIN = ::Awestruct::HandlerChain.new(
      ::Awestruct::Handlers::NonInterpolatingTiltMatcher.new(),
      ::Aweplug::Handlers::SyntheticHandler,
      ::Awestruct::Handlers::TiltHandler,
      ::Awestruct::Handlers::LayoutHandler
    )

    def initialize stacks, layout, repo
      @yml = YAML.load_file File.join(repo, stacks)
      @layout = layout
      @commits = commit_info repo, Pathname.new(File.join repo, stacks)
    end

    def execute site
      yml['availableRuntimes'].each do |runtime|
        searchisko = Aweplug::Helpers::Searchisko.new({:base_url => site.dcp_base_url,
                                                       :authenticate => true,
                                                       :searchisko_username => ENV['dcp_user'],
                                                       :searchisko_password => ENV['dcp_password'],
                                                       #:adapter => :excon,
                                                       :logger => site.profile == 'developement'})
        # WARNING Hacks below
        case runtime['labels']['runtime-type']
        when 'JPP'
          product = 'portal'
        when 'EAP'
          product = 'eap'
        else
          next
        end
        bom_page = ::Awestruct::Page.new(site,
                     ::Awestruct::Handlers::LayoutHandler.new(site,
                       ::Awestruct::Handlers::TiltHandler.new(site,
                         ::Aweplug::Handlers::SyntheticHandler.new(site, 'p.test Hello World!',
                                                                   "/products/#{product}/boms.html.slim"))))
        bom_page.layout = @layout
        bom_page.output_path = "/products/#{product}/boms/index.html"
        metadata = {:title => 'Bill of Materials'}
        bom_page.send('metadata=', metadata)
        site.pages << bom_page
        runtime['boms'].each do |bom|
          bom_dcp = {
            :sys_type => 'bom',
            :sys_content_provider => 'jboss-developer',
            :sys_content_type => 'jboss-developer-bom',
            :sys_content_id => bom['id'],
            :sys_updated => @commits.collect {|c| DateTime.parse c[:date]}.first,
            #:sys_project => '',
            :sys_contributors => @commits.collect {|c| c[:author]}.uniq,
            :sys_activity_dates => @commits.collect {|c| DateTime.parse c[:date]},
            :sys_created => @commits.collect {|c| DateTime.parse c[:date]}.last,
            :sys_title => bom['bom']['name'],
            :sys_url_view => "#{site.base_url}#{site.ctx_root.nil? ? '/' : '/' + site.ctx_root + '/'}#{bom_page.output_path}",
            :sys_description => bom['bom']['description'],
            #:sys_content => '',
            #:sys_content_content-type => '',
            :groupId => bom['bom']['groupId'],
            :artifactId => bom['bom']['artifactId'],
            :recommendedVersion => bom['bom']['recommendedVersion'],
            :versions => yml['availableBomVersions'].select {|b| b['bom']['id'] == bom['bom']['id']}.collect {|b| b['version']}
          }
          unless site.profile =~ /development/
            searchisko.push_content(bom_dcp[:sys_type], bom_dcp[:sys_content_id], bom_dcp.to_json)
          end
        end
      end
    end

  end
end
