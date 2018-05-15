require 'nokogiri'

module JBoss
  module Developer
    module Awestruct
      module Extensions
        # Public: An Awestruct extension to parse XML files from a given
        # directory. It also allows for further processing of an XML file
        # similar to a SAX parser.
        #
        # Examples
        #
        #   read_xml_file_extension = JBoss::Developer::Awestruct::Extensions::ReadXmlFiles.new('_directory_of_files', 'my_schema.xsd')
        #   read_xml_file_extension.add_handler(:tag_name, TagHandler.new)
        #   extension read_xml_file_extension
        class ReadXmlFiles 
          # Public: Initializes the internal state of the extension.
          #
          # directory - A String specifying the directory containing the XML
          #             files to load. The directory must be relative to the
          #             main site directory.
          # schema_file - A String specifying name of the schema file.
          #
          # Returns nothing.
          def initialize(directory, schema_file)
            @directory = directory
            @schema_file = schema_file
            @handlers = {};
          end

          # Public: Add a handler for the given node name.
          #
          # element_symbol - The name of the node the handler processes, will 
          #                  be turned into a symbol internally.
          # handler - An instance of a handler -- a class that responds to process_node(node, site)
          #
          # Returns nothing.
          def add_handler(element_symbol, handler)
            @handlers[element_symbol.to_sym] ||= []
            @handlers[element_symbol.to_sym] << handler
          end
          
          # Internal: Awestruct calls this method during site generation.
          #
          # site - This must be the site object provided by awestruct.
          #
          # Returns nothing.
          def execute(site)
            if (@schema_file)
              xsd = Nokogiri::XML::Schema(File.read(File.join(site.dir, @directory, @schema_file)))
            end
            Dir[File.join(site.dir, @directory, '*.xml')].each do |file|
              # Validate the xml document against the schema
              if (xsd)
                errors = xsd.validate(file)
                unless errors.empty?
                  errors.each do |error|
                    $LOG.info error
                  end
                  raise "XML Validation errors (see above) for file #{file}"
                end
              end
              Nokogiri::XML::Reader(File.read(file)).each do |node|
                @handlers[node.name.to_sym].each {|handler| handler.process_node(node, site)} unless @handlers[node.name.to_sym].nil?
              end
            end
          end

          # Internal: Called by the awestruct engine to add directories that
          # are being watched for changes.
          #
          # watched_dirs - The list of directories currently being watched.
          #
          # Returns nothing.
          def watch(watched_dirs)
            watched_dirs << @directory
          end
        end
      end
    end
  end
end

