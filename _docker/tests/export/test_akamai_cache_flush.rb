require 'minitest/autorun'
require 'mocha/mini_test'
require 'json'

require_relative '../test_helper'
require_relative '../../lib/export/akamai_cache_flush'

class TestAkamaiCacheFlush < MiniTest::Test

  def setup
    @edgerc = "#{__dir__}/test_akamai_cache_flush/edgerc"
    @akamai_cache_flush = RedhatDeveloper::Export::AkamaiCacheFlush.new(@edgerc)
    @original_env_value = ENV['drupal.export.attempt_invalidate_cache']
  end

  def enable_cache_invalidation
    ENV['drupal.export.attempt_invalidate_cache'] = 'true'
  end

  def test_does_not_attempt_cache_flush_with_no_changed_urls
    enable_cache_invalidation
    refute(@akamai_cache_flush.invalidate_cache_for_urls([]))
  end

  def test_does_not_attempt_cache_flush_when_disabled
    refute(@akamai_cache_flush.invalidate_cache_for_urls(%w(foo bar)))
  end

  def test_does_not_attempt_cache_flush_if_edgerc_missing
    enable_cache_invalidation
    @akamai_cache_flush = RedhatDeveloper::Export::AkamaiCacheFlush.new("/a/fake/edgerc/location")
    refute(@akamai_cache_flush.invalidate_cache_for_urls(%w(foo bar)))
  end

  def test_does_not_attempt_cache_flush_if_missing_default_section_in_edgerc
    enable_cache_invalidation
    @akamai_cache_flush = RedhatDeveloper::Export::AkamaiCacheFlush.new("#{__dir__}/test_akamai_cache_flush/bad-edgerc")
    refute(@akamai_cache_flush.invalidate_cache_for_urls(%w(foo bar)))
  end

  def test_sends_cache_invalidation_request
    enable_cache_invalidation

    akamai_client = mock()
    Akamai::Edgegrid::HTTP.expects(:new).with('a-fake-akamai-endpoint.com', 443).returns(akamai_client)

    akamai_client.expects(:setup_edgegrid).with(:client_token => 'AFakeClientToken', :client_secret => 'AFakeClientSecret', :access_token => 'AFakeAccessToken')
    akamai_client.expects(:open_timeout=).with(20)
    akamai_client.expects(:read_timeout=).with(20)

    urls_to_invalidate = %w(https://developers.redhat.com/products https://developers.redhat.com/fish)

    invalidate_response = mock()

    akamai_client.expects(:request).with do |request|
      assert_equal('POST',request.method)
      assert_equal('https://a-fake-akamai-endpoint.com/ccu/v3/invalidate/url/production', request.path)
      assert_equal('application/json', request['Content-Type'])

      urls = JSON.parse(request.body)['objects']
      assert_equal(2,urls.size)
      urls_to_invalidate.each {|url| assert(urls.include?(url)) }
    end.returns(invalidate_response)

    invalidate_response.expects(:code).returns(201)

    assert(@akamai_cache_flush.invalidate_cache_for_urls(urls_to_invalidate))
  end

  def test_should_fail_if_akamai_responds_with_non_201_http_status_code

    enable_cache_invalidation

    akamai_client = mock()
    Akamai::Edgegrid::HTTP.expects(:new).with('a-fake-akamai-endpoint.com', 443).returns(akamai_client)

    akamai_client.expects(:setup_edgegrid).with(:client_token => 'AFakeClientToken', :client_secret => 'AFakeClientSecret', :access_token => 'AFakeAccessToken')
    akamai_client.expects(:open_timeout=).with(20)
    akamai_client.expects(:read_timeout=).with(20)

    urls_to_invalidate = %w(https://developers.redhat.com/products https://developers.redhat.com/fish)

    invalidate_response = mock()

    akamai_client.expects(:request).with do |request|
      assert_equal('POST',request.method)
      assert_equal('https://a-fake-akamai-endpoint.com/ccu/v3/invalidate/url/production', request.path)
      assert_equal('application/json', request['Content-Type'])

      urls = JSON.parse(request.body)['objects']
      assert_equal(2,urls.size)
      urls_to_invalidate.each {|url| assert(urls.include?(url)) }
    end.returns(invalidate_response)

    invalidate_response.expects(:code).times(2).returns(403)

    refute(@akamai_cache_flush.invalidate_cache_for_urls(urls_to_invalidate))
  end

  def teardown
    ENV['drupal.export.attempt_invalidate_cache'] = @original_env_value
  end

end