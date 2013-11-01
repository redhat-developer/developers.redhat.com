require 'yaml'

module Awestruct
  module Extensions
    class CommonDir

      def initialize(data_dir="_common")
        @data_dir = data_dir
      end

      def execute(site)
        # Locate all _common (or other, as specified) directories
        common_dirs = File.join(site.dir, "**", @data_dir )
        dir_map = {}
        # Iterate over all _common directories (e.g./products/eap/_common)
        Dir[ common_dirs ].each do |entry|
          if ( File.directory?( entry ) )
            parent_dir = /^#{site.dir}\/(.*)\/#{@data_dir}$/.match(entry)[1]
            # identify their relative path from the root of the app (e.g /products/eap)
            var_map = {}
            dir_map[parent_dir] = var_map
            # Iterate over each file in the _common directory
            Dir[ "#{entry}/*" ].each do |chunk|
              File.basename( chunk ) =~ /^([^\.]+)/
              key = $1.to_sym
              if chunk =~ /ya?ml$/
                # If it's a yaml file, load it, and store it in the map for later attachment to pages. The top level variable name is the file name                
                var_map[key] = YAML.load_file chunk
              else
                # Otherwise, use awestruct to load the page
                var_map[key] = site.engine.load_page( chunk )
              end
            end
          end

          # Iterate over all pages
          site.pages.each do |page|
            # Check if there is a _common directory in the hierarchy of directories above this one
            dir_map.each do |parent_dir, vars| 
              if page.source_path =~ /^#{site.dir}\/#{parent_dir}/
                # If there is, attach each file to the page
                vars.each do |key, data|
                  page.send "#{key}=", data
                end
              end
            end
          end
        end
      end

    end
  end
end

