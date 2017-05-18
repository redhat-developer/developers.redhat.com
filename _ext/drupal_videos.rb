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
        $LOG.verbose "Adding video action:"
        dan = @drupal.post('entity', 'node', payload)
        $LOG.verbose "Video Action status response: #{dan.body}"
      end

      def create_payload
        file = File.read('_ext/temp.json')
        data_hash = JSON.parse(file)

        data_hash

      end
    end
  end
end
