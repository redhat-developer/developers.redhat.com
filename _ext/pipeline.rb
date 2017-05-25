require 'tilt'
require 'tilt/kramdown'
require 'slim'

require 'common_dir'
require 'aweplug/extensions/kramdown_quickstart'
require 'aweplug/extensions/sections'
require 'aweplug/extensions/asciidoc_example'
require 'aweplug/extensions/drupal_extension'
require 'aweplug/extensions/video'
require 'aweplug/helpers/video'
require 'aweplug/helpers/resources'
require 'aweplug/transformers/asciidoc_cdn_transformer'
require 'aweplug/extensions/kramdown_demo'
require 'aweplug/extensions/google_spreadsheet'
require 'aweplug/extensions/books'
require 'jboss_developer'
require 'nav'
require 'stacks'
require 'product'
require 'solution'
require 'mktg_ops'
require 'disqus'
require 'disqus_more'
require 'lower_case_paths'
require 'customer_portal'
require 'connectors'
require 'events'
require 'vault'
require 'aweplug/helpers/define'
require 'active_support' # HACK for autosupport required by duration
require 'slim/include'

Awestruct::Extensions::Pipeline.new do
  # At the top, so that all passwords, logins and keys are available
  extension JBoss::Developer::Vault.new

  # parse AsciiDoc documents and create page variables out of their sections
  extension Aweplug::Extensions::Sections.new

  extension Aweplug::Extensions::GoogleSpreadsheet.new(assign_to: 'our_picks',
                                                       key: '1al_cs2glMaSBymmNFCiy1OboxAD6jv3YAwB1FrMVffE',
                                                       worksheet_title: 'Our Picks',
                                                       col_labels: true,
                                                       by: 'row')

  extension Aweplug::Extensions::GoogleSpreadsheet.new(assign_to: 'book_isbns',
                                                       key: '1QdE32458GN8v-sDGOqoBx5RJ3X44P_W-umxsCHMxL0g',
                                                       worksheet_title: 'Books',
                                                       col_labels: true,
                                                       by: 'row')


  extension Aweplug::Extensions::Books.new("site.book_isbns.collect { |i,b| b }", false)

  extension Aweplug::Extensions::GoogleSpreadsheet.new(assign_to: 'customer_portal_articles',
                                                       key: '1440-gFstcyCyFhXISvTIlzrmXZo7Ligs-hla5z9eSQA',
                                                       worksheet_title: 'Customer Portal Articles',
                                                       col_labels: true,
                                                       by: 'row')

  extension Aweplug::Extensions::GoogleSpreadsheet.new(assign_to: 'customer_portal_solutions',
                                                       key: '1440-gFstcyCyFhXISvTIlzrmXZo7Ligs-hla5z9eSQA',
                                                       worksheet_title: 'Customer Portal Solutions',
                                                       col_labels: true,
                                                       by: 'row')

  extension JBoss::Developer::CustomerPortal.new

  extension Aweplug::Extensions::Kramdown::Quickstart.new(repository: '_eap-quickstarts',
                                                          layout: 'get-started-item',
                                                          output_dir: '/quickstarts/eap',
                                                          excludes: ['_eap-quickstarts/template'],
                                                          push_to_searchisko: site.push_to_searchisko,
                                                          product: 'eap')

  extension Aweplug::Extensions::Kramdown::Quickstart.new(repository: '_brms-quickstarts',
                                                          layout: 'get-started-item',
                                                          output_dir: '/quickstarts/brms',
                                                          push_to_searchisko: site.push_to_searchisko,
                                                          product: 'brms')

  extension Aweplug::Extensions::Kramdown::Quickstart.new(repository: '_jdg-quickstarts',
                                                          layout: 'get-started-item',
                                                          output_dir: '/quickstarts/datagrid',
                                                          push_to_searchisko: site.push_to_searchisko,
                                                          product: 'datagrid')

  extension Aweplug::Extensions::Kramdown::Quickstart.new(repository: '_jon-quickstarts',
                                                          layout: 'get-started-item',
                                                          output_dir: '/quickstarts/operationsnetwork',
                                                          push_to_searchisko: site.push_to_searchisko,
                                                          product: 'operationsnetwork')

  extension Aweplug::Extensions::Kramdown::Quickstart.new(repository: '_picketlink-quickstarts',
                                                          layout: 'get-started-item',
                                                          experimental: true,
                                                          push_to_searchisko: site.push_to_searchisko,
                                                          output_dir: '/quickstarts/picketlink')

  extension Aweplug::Extensions::Kramdown::Quickstart.new(repository: '_portal-quickstarts',
                                                          layout: 'get-started-item',
                                                          output_dir: '/quickstarts/portal',
                                                          push_to_searchisko: site.push_to_searchisko,
                                                          product: 'portal')

  extension Aweplug::Extensions::Kramdown::Quickstart.new(repository: '_sandbox-quickstarts',
                                                          layout: 'get-started-item',
                                                          experimental: true,
                                                          push_to_searchisko: site.push_to_searchisko,
                                                          output_dir: '/quickstarts/sandbox')

  extension Aweplug::Extensions::Kramdown::Quickstart.new(repository: '_wfk-quickstarts',
                                                          layout: 'get-started-item',
                                                          output_dir: '/quickstarts/wfk',
                                                          push_to_searchisko: site.push_to_searchisko,
                                                          product: 'wfk')

  extension Aweplug::Extensions::Kramdown::Quickstart.new(repository: '_fuse-quickstarts',
                                                          layout: 'get-started-item',
                                                          output_dir: '/quickstarts/fuse',
                                                          subdirectory: true,
                                                          push_to_searchisko: site.push_to_searchisko,
                                                          excludes: ['_fuse-quickstarts/template','_fuse-quickstarts/switchyard'],
                                                          product: 'fuse')

  extension Aweplug::Extensions::Kramdown::Quickstart.new(repository: '_unifiedpush-quickstarts',
                                                          layout: 'get-started-item',
                                                          output_dir: '/quickstarts/unifiedpush',
                                                          push_to_searchisko: site.push_to_searchisko,
                                                          product: 'unifiedpush')

  extension JBoss::Developer::Extensions::Stacks.new 'stacks.yaml', 'get-started-item', '_jdf-stack', site.push_to_searchisko
  extension JBoss::Developer::Extensions::AsciidoctorExtensionRegister.new

  extension Aweplug::Extensions::AsciidocExample.new(repository: '_ticket-monster',
                                                     directory: 'tutorial',
                                                     layout:'get-started-item',
                                                     output_dir: 'ticket-monster',
                                                     additional_excludes: ['ticket-monster.asciidoc'],
                                                     additional_metadata_keys: ['thumbnail'],
                                                     push_to_searchisko: site.push_to_searchisko)

  extension JBoss::Developer::Extensions::Nav.new

  extension JBoss::Developer::Extensions::CommonDir.new

  extension JBoss::Developer::Extensions::Solution.new

  # Must be loaded after CommonDir
  extension JBoss::Developer::Extensions::Product.new push_to_searchisko: site.push_to_searchisko

  # Demos reference products, so it needs to be done further down the pipeline
  extension Aweplug::Extensions::Kramdown::Demo.new(url: 'https://raw.githubusercontent.com/jboss-developer/jboss-developer-demos/master/demos.yaml',
                                                    layout: 'get-started-item',
                                                    output_dir: '/demos',
                                                    push_to_searchisko: site.push_to_searchisko)



  # Load indexifier
  extension Awestruct::Extensions::Indexifier.new [/google4775292ed26aeefd.html/]

  # Pushes compass: config from site.yml -> compass
  extension JBoss::Developer::Utilities::CompassConfigurator.new

  # Generate a sitemap.xml
  extension Awestruct::Extensions::Sitemap.new
  # Generate a assets.yml
  extension JBoss::Developer::MktgOps::Assets.new

  extension Awestruct::Extensions::Disqus.new

  helper Awestruct::Extensions::Partial
  helper JBoss::Developer::Utilities
  helper Aweplug::Helpers::Resources
  helper Aweplug::Helpers::Define

  extension Aweplug::Extensions::GoogleSpreadsheet.new(assign_to: 'high_value_interactions',
                                                       key: '1gas_1NM3lLIkCS1s3RF_D1F_BfCss4dXCX6ycwFdaFE',
                                                       worksheet_title: 'www.jboss.org',
                                                       col_labels: true,
                                                       by: 'row')
  extension JBoss::Developer::HighValueInteractionDataPreparer.new

  transformer JBoss::Developer::LinkTransformer.new
  transformer Aweplug::Transformer::AsciidocCdnTransformer.new
  transformer(JBoss::Developer::DrupalTransformer.new(site)) if site.drupal_base_url
end

