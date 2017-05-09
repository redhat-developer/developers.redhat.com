#
# Small module that can be used a a mixin, primarily for working with URLs provided by the user for
# the export process
#
# @author rblake@redhat.clom
module RedhatDeveloper
  module Export
    module Urls
      #
      # Returns the URL at which this export will be hosted. By default this will be https://developers.redhat.com unless the
      # user has set an environment variable to alter this for another environment e.g. staging
      #
      def final_base_url_location
        user_provided_value = ENV['drupal.export.final_base_url']
        user_provided_value = 'https://developers.redhat.com' if user_provided_value.nil? || user_provided_value.empty?
        return user_provided_value.end_with?('/') ? user_provided_value : "#{user_provided_value}/"
      end
    end
  end
end