require 'net/http'
require_relative '../default_logger'

#
# Simple class that invokes the Cron endpoint on the configured drupal_host
#
# @author rblake@redhat.com
#
class CronInvoker

  def initialize(drupal_host)
    @log = DefaultLogger.logger
    @drupal_host = drupal_host
  end


  #
  # Invokes the cron endpoint on the configured Drupal instance. This will raise a StandardError if there is a problem
  # making the HTTP request or the response status is not 204 (Drupal returns no-content status when invoking cron).
  #
  def invoke_cron!
    drupal_cron_url = URI.parse("http://#{@drupal_host}/cron/rhd")
    @log.info("Invoking cron on host '#{drupal_cron_url}'. Please be patient this may take a while...")

    drupal_cron_request = Net::HTTP::Get.new(drupal_cron_url.to_s)

    drupal_cron_response = Net::HTTP.start(drupal_cron_url.host, drupal_cron_url.port) do | http |
      http.read_timeout = 180
      http.request(drupal_cron_request)
    end

    raise StandardError.new("Failed to invoke cron at URL '#{drupal_cron_url}'. Got response code '#{drupal_cron_response.code}'") if drupal_cron_response.code.to_i != 204

    @log.info("Successfully invoked cron at URL '#{drupal_cron_url}'")
  end

end