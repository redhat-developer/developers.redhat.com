module JBoss
  module Developer
    module Extensions
      class LowerCasePaths

        def initialize

        end

        def execute site
          site.pages.each do |page|
            page.output_path = page.output_path.downcase 
          end
        end

      end
    end
  end
end

