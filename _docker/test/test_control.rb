require 'fileutils'

require_relative 'test_helper'
require_relative 'my_fake_network'
require_relative 'system_call_wrapper'
require_relative '../control'

class TestControl < Minitest::Test

  def test_build_base_docker_images
    system_exec = mock();

    system_exec.expects(:execute_docker).with(:build,'--tag=developer.redhat.com/base','./base')
    system_exec.expects(:execute_docker).with(:build,'--tag=developer.redhat.com/java','./java')
    system_exec.expects(:execute_docker).with(:build,'--tag=developer.redhat.com/ruby','./ruby')

    build_base_docker_images(system_exec)

  end

  def test_build_environment_docker_images

    environment = mock()
    system_exec = mock()

    system_exec.expects(:execute_docker_compose).with(environment, :build)

    build_environment_docker_images(environment, system_exec)
  end


  def test_copy_project_dependencies_for_awestruct_image

    gemfile = mock();
    gemfile_lock = mock();
    target_gemfile = mock();
    target_gemfile_lock = mock();

    File.expects(:open).with('../Gemfile').returns(gemfile)
    File.expects(:open).with('../Gemfile.lock').returns(gemfile_lock)

    FileHelpers.expects(:open_or_new).with('awestruct/Gemfile').returns(target_gemfile)
    FileHelpers.expects(:open_or_new).with('awestruct/Gemfile.lock').returns(target_gemfile_lock)

    FileHelpers.expects(:copy_if_changed).with(gemfile, target_gemfile)
    FileHelpers.expects(:copy_if_changed).with(gemfile_lock, target_gemfile_lock)

    copy_project_dependencies_for_awestruct_image

  end

  def test_build_css_and_js_for_drupal
    status = mock()

    status.expects(:success?).returns(true)
    Open3.expects(:capture2e).with('$(npm bin)/gulp').returns(['out',status])

    build_css_and_js_for_drupal

  end

  def test_should_abort_if_cannot_build_css_and_js_for_drupal
    status = mock()

    status.expects(:success?).returns(false)
    Open3.expects(:capture2e).with('$(npm bin)/gulp').returns(['Oh dear!',status])

    assert_raises(SystemExit){
      build_css_and_js_for_drupal
    }

  end

  def test_load_environment_aborts_execution_if_environment_does_not_exist
    assert_raises(SystemExit){
      load_environment(:environment => nil)
    }
  end

  def test_load_environment_continues_if_environment_exists
      load_environment(:environment => mock())
  end

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