require 'minitest/autorun'
require_relative '../../_docker/lib/rhd_environments'
require_relative 'test_helper'

class TestRhdEnvironments < MiniTest::Test

  def setup
    @rhd_environments = RhdEnvironments.new(File.expand_path('test-environments',File.dirname(__FILE__)))
  end

  def test_invalid_environment_is_not_loaded
    assert_equal(nil, @rhd_environments.load_environment('invalid-environment'))
  end

  def test_non_existent_environment_is_not_loaded
    assert_equal(nil, @rhd_environments.load_environment('no-such-environment'))
  end

  def test_matching_environment_is_loaded
    environment = @rhd_environments.load_environment('valid-environment')
    assert_equal('valid-environment', environment.environment_name)
  end
end