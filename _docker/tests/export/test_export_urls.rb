require 'minitest/autorun'
require 'mocha/mini_test'

require_relative '../test_helper'
require_relative '../../lib/export/export_urls'

module RedhatDeveloper
  module Export
    module Urls
      class TestExportUrls < Minitest::Test

        include RedhatDeveloper::Export::Urls

        def setup
          clear_env
        end

        def teardown
          clear_env
        end

        def clear_env
          ENV['drupal.export.final_base_url'] = nil
        end

        def test_should_read_env_variable
          ENV['drupal.export.final_base_url'] = 'http://foo.com'
          assert_equal('http://foo.com/', final_base_url_location)
        end

        def test_should_return_default_value
          assert_equal('https://developers.redhat.com/', final_base_url_location)
        end

        def test_should_return_default_value_if_user_value_empty
          ENV['drupal.export.final_base_url'] = ''
          assert_equal('https://developers.redhat.com/', final_base_url_location)
        end

      end
    end
  end
end
