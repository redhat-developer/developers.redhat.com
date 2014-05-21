require 'zurb-foundation'
require 'common_dir'
require 'aweplug/extensions/kramdown_quickstart'
require 'aweplug/extensions/sections'
require 'aweplug/extensions/asciidoc_example'
require 'aweplug/extensions/vimeo'
require 'aweplug/helpers/vimeo'
require 'aweplug/helpers/resources'
require 'aweplug/helpers/identity'
require 'jboss_developer'
require 'nav'
require 'stacks'
require 'product'
require 'mktg_ops'

Awestruct::Extensions::Pipeline.new do
  
  # Needs to at the top, to set up site.identity_manager
  extension Aweplug::Identity::Extension.new

  # parse AsciiDoc documents and create page variables out of their sections
  extension Aweplug::Extensions::Sections.new
  extension Aweplug::Extensions::Video::Vimeo.new('vimeo', 'video')

  extension Aweplug::Extensions::Kramdown::Quickstart.new(repository: '_eap-quickstarts', 
                                                          layout: 'get-started-item', 
                                                          output_dir: '/quickstarts/eap',
                                                          product: 'eap')

  extension Aweplug::Extensions::Kramdown::Quickstart.new(repository: '_brms-quickstarts', 
                                                          layout: 'get-started-item', 
                                                          output_dir: '/quickstarts/brms',
                                                          product: 'brms')

  extension Aweplug::Extensions::Kramdown::Quickstart.new(repository: '_jdg-quickstarts', 
                                                          layout: 'get-started-item', 
                                                          output_dir: '/quickstarts/datagrid',
                                                          product: 'datagrid')

  extension Aweplug::Extensions::Kramdown::Quickstart.new(repository: '_jon-quickstarts', 
                                                          layout: 'get-started-item', 
                                                          output_dir: '/quickstarts/operationsnetwork',
                                                          product: 'operationsnetwork')

  extension Aweplug::Extensions::Kramdown::Quickstart.new(repository: '_picketlink-quickstarts', 
                                                          layout: 'get-started-item', 
                                                          output_dir: '/quickstarts/picketlink')

  extension Aweplug::Extensions::Kramdown::Quickstart.new(repository: '_portal-quickstarts', 
                                                          layout: 'get-started-item', 
                                                          output_dir: '/quickstarts/portal',
                                                          product: 'portal')

  extension Aweplug::Extensions::Kramdown::Quickstart.new(repository: '_sandbox-quickstarts', 
                                                          layout: 'get-started-item', 
                                                          output_dir: '/quickstarts/sandbox')

  extension Aweplug::Extensions::Kramdown::Quickstart.new(repository: '_wfk-quickstarts', 
                                                          layout: 'get-started-item', 
                                                          output_dir: '/quickstarts/wfk',
                                                          product: 'eap')

  extension JBoss::Developer::Extensions::Stacks.new 'stacks.yaml', 'get-started-item', '_jdf-stack'
  extension JBoss::Developer::Extensions::AsciidoctorExtensionRegister.new
  
  extension Aweplug::Extensions::AsciidocExample.new(repository: '_ticket-monster', 
                                                     directory: 'tutorial', 
                                                     layout:'get-started-item', 
                                                     output_dir: 'ticket-monster', 
                                                     additional_excludes: ['ticket-monster.asciidoc'], 
                                                     additional_metadata_keys: ['thumbnail'],
                                                     push_to_searchisko: true)

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

