require 'zurb-foundation'
require 'sections'
require 'common_dir.rb'

Awestruct::Extensions::Pipeline.new do
  # parse AsciiDoc documents and create page variables out of their sections
  extension Awestruct::Extensions::Sections.new

  # Load indexifier
  extension Awestruct::Extensions::Indexifier.new

  extension Awestruct::Extensions::CommonDir.new

  helper Awestruct::Extensions::Partial
end

