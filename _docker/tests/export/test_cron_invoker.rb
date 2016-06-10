require 'net/http'
require 'minitest/autorun'
require 'mocha/mini_test'

require_relative '../../../_docker/lib/export/cron_invoker'
require_relative '../../../_docker/tests/test_helper'

class TestCronInvoker < Minitest::Test

  def setup
    @drupal_host = 'drupal:8080'
    @cron_invoker = CronInvoker.new(@drupal_host)
  end

  def test_should_invoke_cron

    drupal_response = mock()
    drupal_response.expects(:code).returns(204)

    http_client = mock()
    http_client.expects(:read_timeout=).with(180)
    http_client.expects(:request).with do | http_get |
      assert_equal('http://drupal:8080/cron/rhd', http_get.path)
    end

    Net::HTTP.expects(:start).with('drupal',8080).yields(http_client).returns(drupal_response)

    @cron_invoker.invoke_cron!

  end

  def test_should_raise_error_if_non_204_response

    drupal_response = mock()
    drupal_response.expects(:code).returns(404).twice

    http_client = mock()
    http_client.expects(:read_timeout=).with(180)
    http_client.expects(:request).with do | http_get |
      assert_equal('http://drupal:8080/cron/rhd', http_get.path)
    end

    Net::HTTP.expects(:start).with('drupal',8080).yields(http_client).returns(drupal_response)

    assert_raises(StandardError) {
      @cron_invoker.invoke_cron!
    }

  end

end