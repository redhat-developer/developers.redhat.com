require 'fileutils'
require 'json'

require_relative 'test_helper'
require_relative 'my_fake_network'
require_relative 'system_call_wrapper'
require_relative '../control'

class TestControl < Minitest::Test

  def setup
    @previous_cdn_prefix = ENV['cdn_prefix']
  end

  def teardown
    ENV['SEARCHISKO_HOST_IP'] = nil
    ENV['SEARCHISKO_HOST_PORT'] = nil
    ENV['DRUPAL_HOST_IP'] = nil
    ENV['DRUPAL_HOST_PORT'] = nil
    ENV['cdn_prefix'] = @previous_cdn_prefix
  end

  def test_bind_drupal_container_details_into_environment

    environment = mock()
    supporting_services = %w(drupal)

    expects(:check_supported_service_requested).with(supporting_services, 'drupal').returns(true)
    expects(:determine_docker_host_for_container_ports).returns('127.0.0.1')
    expects(:get_host_mapped_port_for_container).with(environment, 'drupal', '80/tcp').returns('80')

    bind_drupal_container_details_into_environment(environment, supporting_services)

    assert_equal('127.0.0.1', ENV['DRUPAL_HOST_IP'])
    assert_equal('80', ENV['DRUPAL_HOST_PORT'])
  end

  def test_does_not_bind_drupal_container_details_if_not_required
    environment = mock()
    expects(:check_supported_service_requested).with([], 'drupal').returns(false)
    bind_drupal_container_details_into_environment(environment, [])
  end


  def test_bind_searchisko_container_details_into_environment
    environment = mock()
    supporting_services = %w(searchisko)

    expects(:check_supported_service_requested).with(supporting_services, 'searchisko').returns(true)
    expects(:determine_docker_host_for_container_ports).returns('127.0.0.1')
    expects(:get_host_mapped_port_for_container).with(environment, 'searchisko', '8080/tcp').returns('8080')

    bind_searchisko_container_details_into_environment(environment, supporting_services)

    assert_equal('127.0.0.1', ENV['SEARCHISKO_HOST_IP'])
    assert_equal('8080', ENV['SEARCHISKO_HOST_PORT'])
  end


  def test_wait_for_supporting_service_to_start

    environment = mock()
    service_name = 'drupal'
    service_port = '80/tcp'
    service_url = 'user/login'

    expects(:determine_docker_host_for_container_ports).returns('127.0.0.1')
    expects(:get_host_mapped_port_for_container).with(environment, 'drupal', service_port).returns('80')

    response = mock()
    response.expects(:code).returns('200')

    Net::HTTP.expects(:get_response).with do | uri |
      assert_equal('http://127.0.0.1/user/login', uri.to_s)
    end.returns(response)

    drupal_host, drupal_port = wait_for_supporting_service_to_start(environment, service_name, service_port, service_url)
    assert_equal('127.0.0.1', drupal_host)
    assert_equal('80', drupal_port)
  end

  def test_wait_for_searchisko_to_start

    environment = mock()
    supporting_services = %w(searchisko)

    expects(:wait_for_supporting_service_to_start).with(environment, 'searchisko','8080/tcp','v2/rest/search/events').returns(%w(127.0.0.1 8080))

    wait_for_searchisko_to_start(environment, supporting_services)
  end

  def test_wait_for_searchisko_to_start_if_not_required
    environment = mock()
    wait_for_searchisko_to_start(environment, [])
  end

  def test_wait_for_drupal_to_start_if_not_required
    environment = mock()
    wait_for_searchisko_to_start(environment, [])
  end

  def test_wait_for_drupal_to_start
    environment = mock()
    supporting_services = %w(drupal)

    expects(:wait_for_supporting_service_to_start).with(environment, 'drupal','80/tcp','user/login').returns(%w(127.0.0.1 8080))

    wait_for_drupal_to_start(environment, supporting_services)
  end

  def test_get_host_mapped_port_for_container

    container_json = '{"NetworkSettings": {"Ports": {"8080/tcp": [{"HostIp": "0.0.0.0","HostPort": "8080"}]}}}'

    environment = mock()
    container = mock()
    container.expects(:json).returns(JSON.parse(container_json))

    container_name = 'searchisko'
    container_port = '8080/tcp'

    expects(:get_docker_container).with(environment, "#{container_name}_1").returns(container)

    assert_equal('8080', get_host_mapped_port_for_container(environment, container_name, container_port))

  end

  def test_get_docker_container

    container_name = 'searchisko_1'
    environment = mock()
    environment.expects(:get_compose_project_name).returns('foo')

    container_json = '{"NetworkSettings": {"Ports": [8080]}}'

    container = mock()
    container.expects(:json).returns(JSON.parse(container_json))
    Docker::Container.expects(:get).with('foo_searchisko_1').returns(container)

    assert_equal(container, get_docker_container(environment, container_name))

  end

  def test_determine_docker_host_for_container_ports_with_docker_host_alias

      host_ip = '10.20.30.40'
      # won't execute if docker defined.
      # Socket.expects(:gethostname).returns('localhost')
      # Resolv.expects(:getaddress).with('localhost').returns(host_ip)

      docker_machine_ip = '192.168.0.1'
      Resolv.expects(:getaddress).with('docker').returns(docker_machine_ip)

      assert_equal(docker_machine_ip, determine_docker_host_for_container_ports)
  end

  def test_determine_docker_host_for_container_ports_with_no_docker_host_alias

    host_ip = '10.20.30.40'

    Socket.expects(:gethostname).returns('localhost')
    Resolv.expects(:getaddress).with('localhost').returns(host_ip)
    Resolv.expects(:getaddress).with('docker').raises(StandardError.new('No docker alias here!'))

    assert_equal(host_ip, determine_docker_host_for_container_ports)
  end


  def test_start_and_wait_for_supporting_services

    environment = mock()
    environment.expects(:template_resources)
    supporting_services = %w(drupal)

    system_exec = mock()
    system_exec.expects(:execute_docker_compose).with(environment, :up, %w(-d --no-recreate).concat(supporting_services))
    expects(:bind_drupal_container_details_into_environment).with(environment, supporting_services)
    expects(:bind_searchisko_container_details_into_environment).with(environment, supporting_services)
    expects(:wait_for_searchisko_to_start)
    expects(:wait_for_drupal_to_start)

    start_and_wait_for_supporting_services(environment, supporting_services, system_exec)

  end

  def test_start_and_wait_for_supporting_services_nil_service_list

    environment = mock()
    system_exec = mock()
    start_and_wait_for_supporting_services(environment, nil, system_exec)

  end

  def test_start_and_wait_for_supporting_services_empty_service_list
    environment = mock()
    system_exec = mock()
    start_and_wait_for_supporting_services(environment, [], system_exec)
  end


  def test_build_environment_resources

    environment = mock()
    system_exec = mock()

    environment.expects(:is_drupal_environment?).returns(false)
    environment.expects(:environment_name).returns('foo')

    expects(:copy_project_dependencies_for_awestruct_image)
    expects(:build_css_and_js_for_drupal).never
    expects(:build_base_docker_images).with(environment, system_exec)
    expects(:build_environment_docker_images).with(environment, system_exec)

    build_environment_resources(environment, system_exec)

  end

  def test_build_environment_resources_for_drupal_environment

    environment = mock()
    system_exec = mock()

    environment.expects(:is_drupal_environment?).returns(true)
    environment.expects(:environment_name).returns('foo')

    expects(:build_css_and_js_for_drupal)
    expects(:copy_project_dependencies_for_awestruct_image)
    expects(:build_base_docker_images).with(environment, system_exec)
    expects(:build_environment_docker_images).with(environment, system_exec)

    build_environment_resources(environment, system_exec)

  end

  def test_build_base_docker_images

    environment = mock()
    environment.expects(:requires_proxy?).returns(false)

    system_exec = mock()

    system_exec.expects(:execute_docker).with(:build,%w(--tag=developer.redhat.com/base:2.0.0 ./base))
    system_exec.expects(:execute_docker).with(:build,%w(--tag=developer.redhat.com/java:2.0.0 ./java))
    system_exec.expects(:execute_docker).with(:build,%w(--tag=developer.redhat.com/ruby:2.0.0 ./ruby))

    build_base_docker_images(environment, system_exec)

  end

  def test_build_base_docker_images_proxy_environment

    environment = mock()

    environment.expects(:requires_proxy?).returns(true)
    environment.expects(:get_http_proxy).returns('http://foo.com')
    environment.expects(:get_https_proxy).returns('http://bar.com')

    system_exec = mock()

    system_exec.expects(:execute_docker).with(:build,%w(--tag=developer.redhat.com/base:2.0.0 --build-arg http_proxy=http://foo.com --build-arg https_proxy=http://bar.com ./base))
    system_exec.expects(:execute_docker).with(:build,%w(--tag=developer.redhat.com/java:2.0.0 --build-arg http_proxy=http://foo.com --build-arg https_proxy=http://bar.com ./java))
    system_exec.expects(:execute_docker).with(:build,%w(--tag=developer.redhat.com/ruby:2.0.0 --build-arg http_proxy=http://foo.com --build-arg https_proxy=http://bar.com ./ruby))

    build_base_docker_images(environment, system_exec)

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

    status.expects(:success?).returns(true).twice
    Open3.expects(:capture2e).with('npm install').returns(['out',status])
    Open3.expects(:capture2e).with('$(npm bin)/gulp').returns(['out',status])

    build_css_and_js_for_drupal

  end

  def test_create_proxy_environment_docker_build_args

    environment = mock()
    environment.expects(:get_http_proxy).returns('http://foo.com')
    environment.expects(:get_https_proxy).returns('http://bar.com')

    assert_equal(%w(--build-arg http_proxy=http://foo.com --build-arg https_proxy=http://bar.com), create_proxy_environment_docker_build_args(environment))
  end

  def test_should_abort_if_cannot_build_css_and_js_running_npm_install

    status = mock()

    status.expects(:success?).returns(false)
    Open3.expects(:capture2e).with('npm install').returns(['out',status])

    assert_raises(SystemExit){
      build_css_and_js_for_drupal
    }
  end

  def test_should_abort_if_cannot_build_css_and_js_for_drupal_running_gulp
    status = mock()

    status.expects(:success?).twice.returns(true).then.returns(false)
    Open3.expects(:capture2e).with('npm install').returns(['out',status])
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

  def test_returns_false_when_supporting_service_list_is_nil
    assert_equal(false, check_supported_service_requested(nil, 'drupal'))
  end

  def test_kill_current_environment_with_network

    network = MyFakeNetwork.new(1)
    wrapper = SystemCallWrapper.new(network)
    environment = mock()
    environment.expects(:environment_name).returns('foo').at_least_once
    environment.expects(:get_compose_project_name).returns('rhdpr1')

    Docker::Network.stubs(:get).with('rhdpr1_default').returns network

    wrapper.kill_current_environment(environment)
    assert network.deleted?, 'Network was not deleted'
  end


  def test_kill_current_environment_without_network

    network = MyFakeNetwork.new(1)
    wrapper = SystemCallWrapper.new(network)
    environment = mock()
    environment.expects(:environment_name).returns('foo').at_least_once
    environment.expects(:get_compose_project_name).returns('rhdpr1')

    Docker::Network.stubs(:get).with('rhdpr1_default').raises Docker::Error::NotFoundError
    wrapper.kill_current_environment(environment)

    refute network.deleted?, 'Network was deleted when it should not have been'
  end

end
