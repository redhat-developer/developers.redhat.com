require 'nokogiri'

module JBoss
  module Developer
    module Awestruct
      module Extensions
        # Public: An Awestruct extension to load XML files from a given
        # directory.
        #
        # Examples
        #
        #   extension JBoss::Developer::Awestruct::Extensions::LoadXmlFiles.new('_directory_of_files', 'my_schema.xsd')
        class LoadXmlFiles
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
          end

          # Internal: Awestruct calls this method during site generation.
          #
          # site - This must be the site object provided by awestruct.
          #
          # Returns nothing.
          def execute(site)
            section_name = @directory.delete('_')
            section_data = {}
            if (@schema_file)
              xsd = Nokogiri::XML::Schema(File.read(File.join(site.dir, @directory, @schema_file)))
            end
            Dir[File.join(site.dir, @directory, '*.xml')].each do |file|
              doc = Nokogiri::XML(File.read(file))
              # Validate the xml document against the schema
              if (xsd)
                errors = xsd.validate(doc)
                unless errors.empty?
                  errors.each do |error|
                    $LOG.info error
                  end
                  raise "XML Validation errors (see above) for file #{file}"
                end
              end

              section_data[File.basename(file, '.xml')] = doc
            end
            site.send("#{section_name}=", section_data)
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

