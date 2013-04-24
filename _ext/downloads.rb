module JBoss
  module Developer
    module Awestruct
      module Extensions
        # Public: An Awestruct extension to load YAML files from a given 
        # directory.
        #
        # Examples
        #
        #   extension JBoss::Developer::Awestruct::Extenions::LoadYamlFile.new('_my_yaml_files')
        class LoadYamlFile
          # Public: Initializes the internal state of the extension.
          #
          # directory - A String specifying the directory containing the YAML 
          #             files to load. The directory must be relative to the
          #             main site directory.
          #
          # Returns nothing.
          def initialize(directory)
            @directory = directory
          end

          # Internal: Awestruct calls this method during site generation.
          #
          # site - This must be the site object provided by awestruct.
          #
          # Returns nothing.
          def execute(site)
            Dir[File.join(site.dir, @directory, '*.yml')].each do |file|
              site.engine.load_yaml(file)
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

