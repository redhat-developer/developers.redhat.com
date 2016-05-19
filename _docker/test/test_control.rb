require 'fileutils'

require_relative 'test_helper'
require_relative 'my_fake_network'
require_relative 'system_call_wrapper'
require_relative '../control'

class TestControl < Minitest::Test

  def test_returns_true_when_supporting_service_in_list
    supporting_services = %w"drupal mysql searchisko drupalmysql"
    assert_equal(true, check_supported_service_requested(supporting_services, 'drupal'))
  end

  def test_returns_false_when_supporting_service_not_in_list
    supporting_services = %w"mysql searchisko"
    assert_equal(false, check_supported_service_requested(supporting_services, 'drupal'))
  end

  def test_returns_false_when_supporting_service_list_is_empty
    assert_equal(false, check_supported_service_requested([], 'drupal'))
  end

  def test_returns_false_when_supporint_service_list_is_nil
    assert_equal(false, check_supported_service_requested(nil, 'drupal'))
  end

  def test_kill_current_environment_with_file_and_network
    # Setup for the test
    network = MyFakeNetwork.new(1)
    Docker::Network.stubs(:get).with("rhdpr1_default").returns network
    FileUtils.cp(File.join(File.dirname(__FILE__), 'docker-compose.yml.test'), 'docker-compose.yml')
    ENV['COMPOSE_PROJECT_NAME'] = 'rhdpr1'
    wrapper = SystemCallWrapper.new(network)

    stdout_assert = "Killing and removing docker services...\n"
    assert_output(stdout_assert) do
      wrapper.kill_current_environment
    end

    FileUtils.safe_unlink 'docker-compose.yml'
    assert network.deleted?, 'Network was not deleted'
  end

  def test_kill_current_environment_without_file_with_network
    # Setup for the test
    network = MyFakeNetwork.new(1)
    Docker::Network.stubs(:get).with("rhdpr1_default").returns network
    ENV['COMPOSE_PROJECT_NAME'] = 'rhdpr1'
    wrapper = SystemCallWrapper.new(network)

    assert_output('') do
      wrapper.kill_current_environment
    end

    refute network.deleted?, 'Network was deleted when it should not have been'
  end

  def test_kill_current_environment_with_file_without_network
    # Setup for the test
    network = MyFakeNetwork.new(1)
    Docker::Network.stubs(:get).with("rhdpr1_default").raises Docker::Error::NotFoundError
    ENV['COMPOSE_PROJECT_NAME'] = 'rhdpr1'
    FileUtils.cp(File.join(File.dirname(__FILE__), 'docker-compose.yml.test'), 'docker-compose.yml')
    wrapper = SystemCallWrapper.new(network)

    wrapper.kill_current_environment

    FileUtils.safe_unlink 'docker-compose.yml'
    refute network.deleted?, 'Network was deleted when it should not have been'
  end

end