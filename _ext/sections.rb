require 'asciidoctor'

module Awestruct
  module Extensions
    # Public: Parses (AsciiDoc files currently) and pulls out h2 sections 
    # (and their contents), setting them as first class page variables.
    #
    # Examples
    #
    # extension Awestruct::Extensions::Sections.new
    class Sections
      # Internal: Looks for all AsciiDoc files and pulls out the sections, 
      # adding them to the page variable.
      #
      # site - The awestruct site variable
      def execute site
        site.pages.each do |page|
          if page.content_syntax =~ /^a(sc)?(ii)?(d(oc)?)?$/
            sections = Asciidoctor.load(page.raw_content).sections
            Hash[sections.map {|s| [s.id, s.render]}.flatten.each_slice(2).to_a].each_pair do |key, value|
              page.send "#{key}=", value
            end 
          end
        end
      end
    end
  end
end

