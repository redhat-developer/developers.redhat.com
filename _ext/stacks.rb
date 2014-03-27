require 'yaml'
require 'aweplug/handlers/synthetic_handler'
require 'aweplug/helpers/searchisko'
require 'aweplug/helpers/git_metadata'
require 'aweplug/cache/yaml_file_cache'
require 'awestruct/page'
require 'awestruct/handlers/layout_handler'
require 'awestruct/handlers/tilt_handler'
require 'awestruct/handler_chain'

module JBoss::Developer::Extensions
  class Stacks 
    include Aweplug::Helper::Git::Commit::Metadata

    attr_reader :yml

    def initialize stacks, layout, repo
      @yml = YAML.load_file File.join(repo, stacks) 
      @layout = layout
      @commits = commit_info repo, Pathname.new(File.join repo, stacks) 
    end

    def execute site
      if (site.cache.nil?)
        site.send('cache=', Aweplug::Cache::YamlFileCache.new)
      end
      searchisko = Aweplug::Helpers::Searchisko.new({:base_url => site.dcp_base_url,
                                                     :authenticate => true,
                                                     :searchisko_username => ENV['dcp_user'],
                                                     :searchisko_password => ENV['dcp_password'],
                                                     :cache => site.cache,
                                                     :logger => site.log_faraday})
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

        (process_boms runtime, site, product, searchisko) unless runtime['archetypes'].nil?
        (process_archetype runtime, site, product, searchisko) unless runtime['archetypes'].nil?
      end
    end

    def process_boms(runtime, site, product, searchisko)
      bom_page_content = %q!.content[data-slug="#{page.bom['id']}"]
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
  .section-auto-sample-vtabs[data-section='vertical-tabs']
    -for ver in page.bom['allVersions']
      section class=('active' if ver == page.bom['bom']['recommendedVersion'])
        p.title
          a[href='#'] #{ver}
          .content
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
                  &lt;/dependencyManagement>!
      runtime['boms'].each do |bom|
        bom_page = ::Awestruct::Page.new(site,
                     ::Awestruct::Handlers::LayoutHandler.new(site,
                       ::Awestruct::Handlers::TiltHandler.new(site,
                         ::Aweplug::Handlers::SyntheticHandler.new(site, bom_page_content,
                                                                   "/products/#{product}/boms.html.slim"))))
        bom_page.layout = @layout
        bom_page.output_path = "/boms/#{product}/#{bom['bom']['id']}/index.html"
        site.pages << bom_page
        bom['allVersions'] = yml['availableBomVersions'].select {|b| b['bom']['id'] == bom['bom']['id']}.collect {|b| b['version']}
        # This is wrong, it's commits for stacks, not the BOM
        # bom['bom']['contributors'] = @commits.collect {|c| c[:author]}.uniq
        metadata = {
          :title => bom['bom']['name'], 
          :summary=> bom['bom']['description'], 
          :commits => @commits, 
          :boms => [],
          :contributors => bom['bom']['contributors'],
          :author => bom['bom']['author']
        }

        bom_dcp = {
          :sys_type => 'jbossdeveloper_bom',
          :sys_content_provider => 'jboss-developer',
          :sys_content_type => 'bom',
          :sys_content_id => bom['id'],
          :sys_updated => @commits.collect {|c| DateTime.parse c[:date]}.first,
          :sys_contributors => @commits.collect {|c| c[:author]}.uniq,
          :sys_activity_dates => @commits.collect {|c| DateTime.parse c[:date]},
          :sys_created => @commits.collect {|c| DateTime.parse c[:date]}.last,
          :sys_title => bom['bom']['name'],
          :sys_url_view => "#{site.base_url}#{site.ctx_root.nil? ? '/' : '/' + site.ctx_root + '/'}#{bom_page.output_path}",
          :sys_description => bom['bom']['description'],
          :groupId => bom['bom']['groupId'],
          :artifactId => bom['bom']['artifactId'],
          :recommendedVersion => bom['bom']['recommendedVersion'],
          :versions => bom['allVersions']
        }
        #metadata[:boms] << bom
        unless site.profile =~ /development/
          searchisko.push_content(bom_dcp[:sys_type], bom_dcp[:sys_content_id], bom_dcp.to_json)
        end
        bom_page.send('metadata=', metadata)
        bom_page.send('bom=', bom)
        # Add the status and issues
        bom_page.send('status=', 'red')
      end
    end

    def process_archetype(runtime, site, product, searchisko)
      archetype_page_content = %q!.content[data-slug="#{page.archetype['id']}"]
  p
    = page.archetype['archetype']['description']
  h3 Import code
  asciidoc:
    Place the following into your `pom.xml` file of your project.

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
                  &lt;dependencyManagement>
                    &lt;dependencies>
                        &lt;dependency>
                            &lt;groupId>#{page.archetype['archetype']['groupId']}&lt;/groupId>
                            &lt;artifactId>#{page.archetype['archetype']['artifactId']}&lt;/artifactId>
                            &lt;version>#{ver}&lt;/version>
                            &lt;type>pom&lt;/type>
                            &lt;scope>import&lt;/scope>
                        &lt;/dependency>
                    &lt;/dependencies>
                  &lt;/dependencyManagement>!
      runtime['archetypes'].each do |archetype|
        archetype_page = ::Awestruct::Page.new(site,
                           ::Awestruct::Handlers::LayoutHandler.new(site,
                             ::Awestruct::Handlers::TiltHandler.new(site,
                               ::Aweplug::Handlers::SyntheticHandler.new(site, archetype_page_content,
                                                                         "/products/#{product}/boms.html.slim"))))
        archetype_page.layout = @layout
        archetype_page.output_path = "/archetypes/#{product}/#{archetype['archetype']['id']}/index.html"
        archetype['allVersions'] = yml['availableArchetypeVersions'].select {|b| b['archetype']['id'] == archetype['archetype']['id']}.collect {|b| b['version']}
        archetype['archetype']['contributors'] = @commits.collect {|c| c[:author]}.uniq
        metadata = {
          :title => archetype['archetype']['name'], 
          :summary=> archetype['archetype']['description'], 
          :commits => @commits, 
          :boms => [],
          :contributors => archetype['archetype']['contributors'],
          :author => archetype['archetype']['author']
        }

        archetype_dcp = {
          :sys_type => 'jbossdeveloper_archetype',
          :sys_content_provider => 'jboss-developer',
          :sys_content_type => 'archetype',
          :sys_content_id => archetype['id'],
          :sys_updated => @commits.collect {|c| DateTime.parse c[:date]}.first,
          :sys_contributors => archetype['archetype']['contributors'],
          :sys_activity_dates => @commits.collect {|c| DateTime.parse c[:date]},
          :sys_created => @commits.collect {|c| DateTime.parse c[:date]}.last,
          :sys_title => archetype['archetype']['name'],
          :sys_url_view => "#{site.base_url}#{site.ctx_root.nil? ? '/' : '/' + site.ctx_root + '/'}#{archetype_page.output_path}",
          :sys_description => archetype['archetype']['description'],
          :groupId => archetype['archetype']['groupId'],
          :artifactId => archetype['archetype']['artifactId'],
          :recommendedVersion => archetype['archetype']['recommendedVersion'],
          :versions => archetype['allVersions']
        }
        unless site.profile =~ /development/
          searchisko.push_content(archetype_dcp[:sys_type], archetype_dcp[:sys_content_id], archetype_dcp.to_json)
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
