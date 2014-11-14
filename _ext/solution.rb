require 'json'

module JBoss
  module Developer
    module Extensions
      # Post-process solution metadata from solution.yml, applying conventions
      class Solution

        def execute(site)

          site.solutions = {}
          site.pages.each do |page|
            if !page.solution.nil? && page.relative_source_path.start_with?('/solutions')
              solution = page.solution
              solution.id = page.parent_dir

              page.output_path = '/' + solution.id + "/index.html"
              
              if File.exists?('_partials/solution-partial-' + solution.id + '.html.slim')
                solution.has_partial = true
              end

              #Find slider images (if any)
              solution.slider_images = Dir["#{File.join('images/solutions/' + solution.id, 'slider-image')}*"].sort
              
              site.solutions[solution.id] = solution
            end
          end
        end
      end

    end
  end
end
