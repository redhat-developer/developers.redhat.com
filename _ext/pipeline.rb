require 'zurb-foundation'
require 'common_dir'
require 'aweplug/extensions/kramdown_quickstart'
require 'aweplug/extensions/sections'
require 'aweplug/extensions/asciidoc_example'
require 'aweplug/extensions/vimeo'
require 'aweplug/helpers/vimeo'
require 'aweplug/helpers/resources'
require 'jboss_developer'
require 'nav'
require 'stacks'
require 'product'
require 'mktg_ops'

Awestruct::Extensions::Pipeline.new do
  # parse AsciiDoc documents and create page variables out of their sections
  extension Aweplug::Extensions::Sections.new
  extension Aweplug::Extensions::Video::Vimeo.new('vimeo', 'video')

  extension Aweplug::Extensions::Kramdown::Quickstart.new(repository: '_eap-quickstarts', layout: 'get-started-item', 
                                                          output_dir: '/quickstarts/eap')

  extension Aweplug::Extensions::Kramdown::Quickstart.new(repository: '_brms-quickstarts', layout: 'get-started-item', 
                                                          output_dir: '/quickstarts/brms')

  extension Aweplug::Extensions::Kramdown::Quickstart.new(repository: '_jdg-quickstarts', layout: 'get-started-item', 
                                                          output_dir: '/quickstarts/jdg')

  extension Aweplug::Extensions::Kramdown::Quickstart.new(repository: '_jon-quickstarts', layout: 'get-started-item', 
                                                          output_dir: '/quickstarts/jon')

  extension Aweplug::Extensions::Kramdown::Quickstart.new(repository: '_picketlink-quickstarts', layout: 'get-started-item', 
                                                          output_dir: '/quickstarts/picketlink')

  extension Aweplug::Extensions::Kramdown::Quickstart.new(repository: '_portal-quickstarts', layout: 'get-started-item', 
                                                          output_dir: '/quickstarts/portal')

  extension Aweplug::Extensions::Kramdown::Quickstart.new(repository: '_sandbox-quickstarts', layout: 'get-started-item', 
                                                          output_dir: '/quickstarts/sandbox')

  extension Aweplug::Extensions::Kramdown::Quickstart.new(repository: '_wfk-quickstarts', layout: 'get-started-item', 
                                                          output_dir: '/quickstarts/wfk')

  extension JBoss::Developer::Extensions::Stacks.new 'stacks.yaml', 'get-started-item', '_jdf-stack'
  
  extension Aweplug::Extensions::AsciidocExample.new(repository: '_ticket-monster', directory: 'tutorial', layout:'get-started-item', 
                                                     output_dir: 'ticket-monster', additional_excludes: ['ticket-monster.asciidoc'])

  # Load indexifier
  extension Awestruct::Extensions::Indexifier.new [/google4775292ed26aeefd.html/]

  extension JBoss::Developer::Extensions::Nav.new
 
  extension JBoss::Developer::Extensions::CommonDir.new
  # Must be loaded after CommonDir
  extension JBoss::Developer::Extensions::Product.new

  # Pushes compass: config from site.yml -> compass
  extension JBoss::Developer::Utilities::CompassConfigurator.new

  # Generate a sitemap.xml
  extension Awestruct::Extensions::Sitemap.new
  # Generate a assets.yml
  extension JBoss::Developer::MktgOps::Assets.new

  helper Awestruct::Extensions::Partial
  helper JBoss::Developer::Utilities
  helper Aweplug::Helpers::Vimeo
  helper Aweplug::Helpers::Resources

  transformer JBoss::Developer::MktgOps::LinkInstrumentation.new
end

