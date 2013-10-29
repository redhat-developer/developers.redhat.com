require 'zurb-foundation'
require 'sections'

Awestruct::Extensions::Pipeline.new do
  # parse AsciiDoc documents and create page variables out of their sections
  extension Awestruct::Extensions::Sections.new

  # Load indexifier
  extension Awestruct::Extensions::Indexifier.new

  helper Awestruct::Extensions::Partial
end

