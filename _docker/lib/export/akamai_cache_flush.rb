require 'json'
require 'uri'
require 'net/http'
require 'akamai/edgegrid'
require 'inifile'

require_relative '../default_logger'

module RedhatDeveloper
  module Export
    #
    # This class takes a list of URLs and sends a request to the Akamai FastPurge API to request that those
    # URLs be invalidated from the Akamai cache.
    #
    # Please see the following page for details of the FastPurge API: https://developer.akamai.com/api/core_features/fast_purge/v3.html#postinvalidateurl
    #
    # @author rblake@redhat.com
    #
    class AkamaiCacheFlush

       def initialize(edgerc)
         @log = DefaultLogger.logger
         @edgerc = edgerc
         @akamai_profile = 'default'
         @fast_purge_api_endpoint = ''
       end

       def invalidate_cache_for_urls(urls=[])

         if urls.nil? || urls.empty?
           @log.info('Nothing has changed. There are no URLs to invalidate from the Akamai cache.')
           return false
         end

         unless should_attempt_cache_invalidate
           @log.info('Cache invalidation is currently disabled for this environment.')
           return false
         end

         @log.info("Requesting cache invalidation for '#{urls.size}' URLs...")

         api_client = akamai_client
         if api_client.nil?
           @log.error('Unable to instantiate Akamai client. Aborting cache clearance.')
           return false
         end

         invalidate_request = Net::HTTP::Post.new(@fast_purge_api_endpoint, {'Content-Type' => 'application/json'})
         invalidate_request.body = {objects: urls}.to_json
         @log.info("\tSending the following JSON object to Akamai invalidate endpoint: '#{invalidate_request.body}'")

         invalidated = false

         begin
           invalidate_response = api_client.request(invalidate_request)
           # Akamai responds with a 201 created HTTP status if the invalidate request is accepted
           if invalidate_response.code == 201
             @log.info("Received response '201' from Akamai. Cache invalidate request is being processed.")
             invalidated = true
           else
             @log.warn("Received response code '#{invalidate_response.code}' from Akamai. Expected response code '201'. Cache invalidate may have failed.")
           end
         rescue => e
            puts e
            @log.error("Failed to invoke Akamai API for cache invalidation. Content will only be invalidated when TTL expires.")
         end


         invalidated

       end

      private

      #
      # Loads the Akamai client using the ~/.edgerc configuration file. Please see the following for more information
      # on how this works:
      #
      # https://developer.akamai.com/legacy/introduction/Conf_Client.html
      #
      def akamai_client

        unless File.exist?(@edgerc)
          @log.warn("\t The configuration file '#{@edgerc}' does not exist or cannot be read.")
          return nil
        end

        config = IniFile.load(@edgerc)

        if(config[@akamai_profile].empty?)
          @log.warn("\t The configuration file '#{@edgerc}' does not contain a '[#{@akamai_profile}]' profile.")
          return nil
        end

        api_config = config[@akamai_profile]
        api_endpoint = URI("https://#{api_config['host']}")

        #
        # Currently we only support clearing the 'production' cache as we do not have a staging cache.
        #
        @fast_purge_api_endpoint = "#{api_endpoint.to_s}/ccu/v3/invalidate/url/production"

        api_client = Akamai::Edgegrid::HTTP.new(
            address = api_endpoint.host,
            port = api_endpoint.port
        )
        api_client.setup_edgegrid(
           client_token: api_config['client_token'],
           client_secret: api_config['client_secret'],
           access_token: api_config['access_token']
        )
        api_client.open_timeout = 20
        api_client.read_timeout = 20
        api_client

      end


      #
      # Reads the environment variable 'drupal.export.attempt_invalidate_cache' to see if the cache invalidation
      # process is currently enabled.
      #
       def should_attempt_cache_invalidate
         attempt_invalidate_cache = ENV['drupal.export.attempt_invalidate_cache']
         invalidate = false

         unless attempt_invalidate_cache.nil? || attempt_invalidate_cache.empty?
           invalidate = true if attempt_invalidate_cache =~ /true/
         end
         invalidate
       end

    end
  end
end