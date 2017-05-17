require 'aweplug/helpers/drupal_service'

# TODO: Farad
module JBoss
  module Developer
    class DrupalVideos

      def initialize site
        @drupal = Aweplug::Helpers::Drupal8Service.default site
      end


      def execute site
        require 'pry'
        binding.pry
        puts "test"
      end

    end
  end
end
