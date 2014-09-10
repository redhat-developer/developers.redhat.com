require 'yaml'
require 'parallel'

module JBoss
  module Developer
    module Extensions
      class CommonDir

        def initialize(data_dir="_common")
          @data_dir = data_dir
        end

        def execute(site)
          # Locate all _common (or other, as specified) directories
          common_dirs = File.join(site.dir, "**", @data_dir )
          dir_map = {}
          common_map = {}
          # Iterate over all _common directories (e.g./products/eap/_common)
          Dir[ common_dirs ].each do |entry|
            if ( File.directory?( entry ) )
              parent_dir = /^#{site.dir}\/(.*)\/#{@data_dir}$/.match(entry)[1]
              # identify their relative path from the root of the app (e.g /products/eap)

              # create the overall map for _site
              t = common_map
              parent_dir.split(/\//).each do |dir|
                t[dir] ||= {}
                t = t[dir]
                t['parent_dir'] = dir
              end

              # create a temporary map, indexed by path, for use when we attach to a page
              dir_map[parent_dir] = t

              # Iterate over each file in the _common directory
              Dir[ "#{entry}/*" ].each do |chunk|
                File.basename( chunk ) =~ /^([^\.]+)/
                key = $1.to_sym
                if chunk =~ /ya?ml$/
                  # If it's a yaml file, load it, and store it in the map for later attachment to pages. The top level variable name is the file name                
                  t[key] = YAML.load_file chunk
                else
                  # Otherwise, use awestruct to load the page
                  t[key] = site.engine.load_page( chunk )
                end
              end

            end


            # Iterate over all pages
            Parallel.each(site.pages, in_threads: 40) do |page|
              # Check if there is a _common directory in the hierarchy of directories above this one
              dir_map.each do |parent, vars| 
                if page.source_path =~ /^#{site.dir}\/#{parent}/
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
end

