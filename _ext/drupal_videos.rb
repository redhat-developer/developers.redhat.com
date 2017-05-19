require 'aweplug/helpers/drupal_service'

# TODO: Farad
module JBoss
  module Developer
    class DrupalVideos

      def initialize site
        @drupal = Aweplug::Helpers::Drupal8Service.default site
      end


      def execute site
        payload = create_payload
        $LOG.verbose "Adding video:"
        dan = @drupal.post('entity', 'node', payload)
        $LOG.verbose "Video Action status response: #{dan.body}"
      end

      # Migrate payload builder over from /home/dcoughlin/RubymineProjects/JbossDeveloperTestApp/lib/Drupal_Tag_Formatter.rb
      def create_payload
        file = File.read('_ext/temp.json')
        data_hash = JSON.parse(file)

        data_hash

      end

      # Migrate tag_matcher over from /home/dcoughlin/RubymineProjects/JbossDeveloperTestApp/lib/Drupal_Tag_Formatter.rb
      def tag_matcher

      end

      # Migrate taxonomy_layout over from /home/dcoughlin/RubymineProjects/JbossDeveloperTestApp/lib/Drupal_Tag_Formatter.rb
      def parse_taxonomy

      end

    end
  end
end
