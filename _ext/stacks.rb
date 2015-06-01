require 'yaml'
require 'aweplug/handlers/synthetic_handler'
require 'aweplug/helpers/searchisko'
require 'aweplug/helpers/git_metadata'
require 'aweplug/cache/file_cache'
require 'awestruct/page'
require 'awestruct/handlers/layout_handler'
require 'awestruct/handlers/tilt_handler'
require 'awestruct/handler_chain'
require 'parallel'

module JBoss::Developer::Extensions
  class Stacks 
    include Aweplug::Helper::Git::Commit::Metadata

    attr_reader :yml

    def initialize stacks, layout, repo, push_to_searchisko = true
      @yml = YAML.load_file File.join(repo, stacks) 
      @layout = layout
      @push_to_searchisko = push_to_searchisko
      @seen_boms = []
      @seen_archetypes = []
    end

    def execute site
      if (site.cache.nil?)
        site.send('cache=', Aweplug::Cache::FileCache.new)
      end
      searchisko = Aweplug::Helpers::Searchisko.new({:base_url => site.dcp_base_url,
                                                     :authenticate => true,
                                                     :searchisko_username => ENV['dcp_user'],
                                                     :searchisko_password => ENV['dcp_password'],
                                                     :cache => site.cache,
                                                     :logger => site.log_faraday,
                                                     :searchisko_warnings => site.searchisko_warnings})
      yml['availableRuntimes'].each do |runtime|
        # WARNING Hacks below
        case runtime['labels']['runtime-type']
        when 'JPP'
          product = 'portal'
        when 'EAP'
          product = 'eap'
        else
          next
        end

        (process_boms runtime, site, product, searchisko) unless runtime['boms'].nil?
        (process_archetype runtime, site, product, searchisko) unless runtime['archetypes'].nil?
      end
    end

    def process_boms(runtime, site, product, searchisko)
      @bom_page_content ||= %q!.content[data-slug="#{page.bom['id']}"]
  p
    -if page.metadata['replaced_bom']
      = partial 'bom-replaced_advise.html.slim', {'parent' => page, 'groupId' => page.bom['bom']['groupId'], 'artifactId' => page.bom['bom']['artifactId'], 'replaced_bom' => page.metadata['replaced_bom'], 'replaced_bom_url' => page.metadata['replaced_bom_url']}    
  p
    = page.bom['bom']['description']
  h3 Import code
  asciidoc:
    Place the following into your `pom.xml` file of your project.

    [NOTE]
    ====
    The suggested version of this BOM is shown by default, but you may
    choose other versions given your environment.
    ====
  h3 Versions
  dl.tabs.vertical[data-tab]
    - i = 0
    -for ver in page.bom['allVersions']
      - i = i + 1
      dd class=('active' if ver == page.bom['bom']['recommendedVersion'])
        a(href="#panel#{i}") #{ver}
  .tabs-content
    - i = 0
    -for ver in page.bom['allVersions']
      - i = i + 1
      section.content class=('active' if ver == page.bom['bom']['recommendedVersion']) id="panel#{i}"
        .tab-content
          pre
            code
              |
                &lt;dependencyManagement>
                  &lt;dependencies>
                      &lt;dependency>
                          &lt;groupId>#{page.bom['bom']['groupId']}&lt;/groupId>
                          &lt;artifactId>#{page.bom['bom']['artifactId']}&lt;/artifactId>
                          &lt;version>#{ver}&lt;/version>
                          &lt;type>pom&lt;/type>
                          &lt;scope>import&lt;/scope>
                      &lt;/dependency>
                  &lt;/dependencies>
                &lt;/dependencyManagement>
  = javascripts("developer-materials-bom", true) do
    script src="#{site.base_url}/javascripts/bomadvise.js"!
      runtime['boms'].each do |bom|
        if @seen_boms.include? bom['id']
          next
        else
          @seen_boms << bom['id']
        end
        bom_page = ::Awestruct::Page.new(site,
                     ::Awestruct::Handlers::LayoutHandler.new(site,
                       ::Awestruct::Handlers::TiltHandler.new(site,
                         ::Aweplug::Handlers::SyntheticHandler.new(site, @bom_page_content,
                                                                   "/products/#{product}/boms.html.slim"))))
        bom_page.layout = @layout
        bom_page.output_path = "/boms/#{product}/#{bom['id']}/index.html"
        site.pages << bom_page
        bom['allVersions'] = yml['availableBomVersions'].select{ |b| b['bom']['id'] == bom['bom']['id'] }.collect{ |b| b['version']}
        # This is wrong, it's commits for stacks, not the BOM
        # bom['bom']['contributors'] = @commits.collect {|c| c[:author]}.uniq
        commits = []
        if site.boms["#{bom['bom']['groupId']}|#{bom['bom']['artifactId']}"]
          bom_info = site.boms["#{bom['bom']['groupId']}|#{bom['bom']['artifactId']}"]
          commits = commit_info(bom_info['repo'], Pathname.new(bom_info['location']), bom_info.reject {|k,v| k == 'location' || k == 'repo' || k == 'replacedBy'})  # DEVELOPER-320
        end
        #Collect the bom_id of replaced bom
        replaced_bom_id = nil
        if bom_info and bom_info['replacedBy']
          ga = bom_info['replacedBy'].split(':')
          replaced_bom_id = yml['availableBoms'].select{ |b| b['groupId'] == ga[0] and b['artifactId'] == ga[1] }.collect{ |b| b['id']}[0]
        end
        metadata = {
          :title => bom['bom']['name'], 
          :summary=> bom['bom']['description'], 
          :commits => commits,
          :boms => [],
          :contributors_email => commits.collect { |c| c[:author_email] }.uniq,
          :contributors => commits.collect { |c| c[:author] }.uniq,
          :searchisko_type => 'jbossdeveloper_bom',
          :searchisko_id => bom['id']
        }
        metadata[:replaced_bom] = bom_info['replacedBy'] if bom_info
        metadata[:replaced_bom_url] = "../#{replaced_bom_id}/" if replaced_bom_id
        metadata[:published] = DateTime.parse(commits.first[:date]) unless commits.empty?
        metadata[:author] = commits.last[:author] if commits.last
        unless metadata[:current_branch] == 'HEAD'
          git_ref = metadata[:current_branch]
        else
          git_ref = metadata[:current_tag] || 'HEAD'
        end
        metadata[:download] = "#{metadata[:github_repo_url]}/archive/#{git_ref}.zip"
        metadata[:browse] = "#{metadata[:github_repo_url]}/tree/#{git_ref}"
        metadata[:scm] = 'github'

        bom_dcp = {
          :sys_last_activity_date => commits.collect {|c| DateTime.parse c[:date]}.first,
          :sys_contributors => metadata[:contributors_email],
          :author => metadata[:author],
          :sys_activity_dates => commits.collect {|c| DateTime.parse c[:date]},
          :sys_created => commits.collect {|c| DateTime.parse c[:date]}.last,
          :sys_title => bom['bom']['name'],
          :sys_url_view => "#{site.base_url}#{site.ctx_root.nil? ? '/' : '/' + site.ctx_root + '/'}#{bom_page.output_path}",
          :sys_description => bom['bom']['description'],
          :groupId => bom['bom']['groupId'],
          :artifactId => bom['bom']['artifactId'],
          :recommendedVersion => bom['bom']['recommendedVersion'],
          :versions => bom['allVersions']
        }

        #metadata[:boms] << bom
        unless !@push_to_searchisko || !site.push_to_searchisko
          searchisko.push_content(metadata[:searchisko_type], metadata[:searchisko_id], bom_dcp.to_json)
        end
        bom_page.send('metadata=', metadata)
        bom_page.send('bom=', bom)
        # Add the status and issues
        bom_page.send('status=', 'red')
      end
    end

    def process_archetype(runtime, site, product, searchisko)
      @archetype_page_content ||= %q!.content[data-slug="#{page.archetype['id']}"]
  p
    = page.archetype['archetype']['description']
  h3 Usage command
  asciidoc:
    To use the archetype to generate a new project, you should run:

    [NOTE]
    ====
    The suggested version of this archetype is shown by default, but you may
    choose other versions given your environment.
    ====
  h3 Versions
  .section-auto-sample-vtabs[data-section='vertical-tabs']
    -for ver in page.archetype['allVersions']
      section class=('active' if ver == page.archetype['archetype']['recommendedVersion'])
        p.title
          a[href='#'] #{ver}
          .content
            pre
              code
                |
                   mvn archetype:generate \
                    -DarchetypeGroupId=#{page.archetype['archetype']['groupId']} \
                    -DarchetypeArtifactId=#{page.archetype['archetype']['artifactId']} \
                    -DarchetypeVersion=#{ver}!
      runtime['archetypes'].each do |archetype|
        if @seen_archetypes.include? archetype['id']
          next
        else
          @seen_archetypes << archetype['id']
        end
        archetype_page = ::Awestruct::Page.new(site,
                           ::Awestruct::Handlers::LayoutHandler.new(site,
                             ::Awestruct::Handlers::TiltHandler.new(site,
                               ::Aweplug::Handlers::SyntheticHandler.new(site, @archetype_page_content,
                                                                         "/products/#{product}/boms.html.slim"))))
        commits = []
        if site.archetypes["#{archetype['archetype']['groupId']}|#{archetype['archetype']['artifactId']}"]
          archetype_info = site.archetypes["#{archetype['archetype']['groupId']}|#{archetype['archetype']['artifactId']}"]
          commits = commit_info(archetype_info['repo'], Pathname.new(archetype_info['location']), archetype_info.reject {|k,v| k == 'location' || k == 'repo'})  # DEVELOPER-320
        end

        archetype_page.layout = @layout
        archetype_page.output_path = "/archetypes/#{product}/#{archetype['archetype']['id']}/index.html"
        archetype['allVersions'] = yml['availableArchetypeVersions'].select {|b| b['archetype']['id'] == archetype['archetype']['id']}.collect {|b| b['version']}
        archetype['archetype']['contributors'] = commits.collect {|c| c[:author_email]}.uniq
        metadata = {
          :title => archetype['archetype']['name'], 
          :summary=> archetype['archetype']['description'], 
          :commits => commits,
          :archetypes => [],
          :contributors => commits.collect { |c| c[:author] }.uniq,
          :contributors_email => commits.collect { |c| c[:author_email] }.uniq,
          :searchisko_type => 'jbossdeveloper_archetype',
          :searchisko_id => archetype['id']
        }
        metadata[:published] = DateTime.parse(commits.first[:date]) unless commits.empty?
        metadata[:author] = commits.last[:author] if commits.last
        unless metadata[:current_branch] == 'HEAD'
          git_ref = metadata[:current_branch]
        else
          git_ref = metadata[:current_tag] || 'HEAD'
        end
        metadata[:download] = "#{metadata[:github_repo_url]}/archive/#{git_ref}.zip"
        metadata[:browse] = "#{metadata[:github_repo_url]}/tree/#{git_ref}"
        metadata[:scm] = 'github'

        archetype_dcp = {
          :sys_last_activity_date => commits.collect {|c| DateTime.parse c[:date]}.first,
          :sys_contributors => metadata[:contributors_email],
          :author => metadata[:author],
          :sys_activity_dates => commits.collect {|c| DateTime.parse c[:date]},
          :sys_created => commits.collect {|c| DateTime.parse c[:date]}.last,
          :sys_title => archetype['archetype']['name'],
          :sys_url_view => "#{site.base_url}#{site.ctx_root.nil? ? '/' : '/' + site.ctx_root + '/'}#{archetype_page.output_path}",
          :sys_description => archetype['archetype']['description'],
          :groupId => archetype['archetype']['groupId'],
          :artifactId => archetype['archetype']['artifactId'],
          :recommendedVersion => archetype['archetype']['recommendedVersion'],
          :versions => archetype['allVersions']
        }
        unless !@push_to_searchisko || !site.push_to_searchisko
          searchisko.push_content(metadata[:searchisko_type], metadata[:searchisko_id] , archetype_dcp.to_json)
        end
        archetype_page.send('metadata=', metadata)
        archetype_page.send('archetype=', archetype)

        # Add the status and issues
        archetype_page.send('status=', 'red')
        site.pages << archetype_page
      end
    end
  end
end

