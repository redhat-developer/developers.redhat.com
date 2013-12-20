require 'zurb-foundation'
require 'common_dir'
require 'aweplug/extensions/kramdown_quickstart'
require 'aweplug/extensions/sections'
require 'jboss_developer'
require 'nav'
require 'stacks'

Awestruct::Extensions::Pipeline.new do
  # parse AsciiDoc documents and create page variables out of their sections
  extension Aweplug::Extensions::Sections.new

  extension Aweplug::Extensions::Kramdown::Quickstart.new '_eap-quickstarts', 'get-started-item', '/quickstarts/eap'

  extension JBoss::Developer::Extensions::Stacks.new 'stacks.yaml', 'get-started-item', '_jdf-stack'

  # Load indexifier
  extension Awestruct::Extensions::Indexifier.new [/google4775292ed26aeefd.html/]

  extension JBoss::Developer::Extensions::Nav.new
 
  extension JBoss::Developer::Extensions::CommonDir.new

  helper Awestruct::Extensions::Partial
  helper JBoss::Developer::Utilities
end

