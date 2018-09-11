require 'minitest/autorun'
require_relative '../../_docker/lib/rhd_environment'
require_relative 'test_helper'

class TestRhdEnvironment < MiniTest::Test

  def setup
    @original_compose_project_name = ENV['COMPOSE_PROJECT_NAME']
    ENV['COMPOSE_PROJECT_NAME'] = ''
    @environments_directory = File.expand_path('test-environments',File.dirname(__FILE__))
    @environment = RhdEnvironment.new("#{@environments_directory}/valid-environment")
  end

  def teardown
    ENV['COMPOSE_PROJECT_NAME'] = @original_compose_project_name
    ENV['DRUPAL_HOST_IP'] = nil
    ENV['DRUPAL_HOST_PORT'] = nil
    ENV['SEARCHISKO_HOST_IP'] = nil
    ENV['SEARCHISKO_HOST_PORT'] = nil
    ENV['ghprbPullId'] = nil

    FileUtils.rm("#{@environments_directory}/valid-environment/test.txt", :force => true)
    FileUtils.rm("#{@environments_directory}/drupal-pull-request/rhd.settings.yml", :force => true)
  end

  def test_drupal_pr_environment_preselects_drupal_port
    ENV['ghprbPullId'] = '1205'
    @environment.environment_name = 'drupal-pull-request'
    @environment.initialize_environment

    assert_equal(36205, ENV['DRUPAL_HOST_PORT'].to_i)

  end

  def test_should_get_docker_host_for_drupal_dev
    @environment.environment_name = 'drupal-dev'
    assert_equal('docker', @environment.get_docker_host)
  end

  def test_should_get_docker_host_for_drupal_pr
    @environment.environment_name = 'drupal-pull-request'
    assert_equal('rhdp-jenkins-slave.lab4.eng.bos.redhat.com', @environment.get_docker_host)
  end

  def test_should_get_docker_host_for_drupal_staging
    @environment.environment_name = 'drupal-staging'
    assert_equal('rhdp-drupal.stage.redhat.com', @environment.get_docker_host)
  end

  def test_should_get_docker_host_for_drupal_staging
    @environment.environment_name = 'drupal-production'
    assert_equal('rhdp-drupal.redhat.com', @environment.get_docker_host)
  end


  def test_drupal_pr_environment_does_not_preselect_port_if_required_env_variable_empty
    ENV['ghprbPullId'] = ''
    @environment.environment_name = 'drupal-pull-request'
    @environment.initialize_environment

    assert_equal(nil, ENV['DRUPAL_HOST_PORT'])
  end

  def test_should_pull_drupal_data_image_for_drupal_dev
    @environment.environment_name = 'drupal-dev'
    assert(@environment.pull_drupal_data_image?)
  end

  def test_should_pull_drupal_data_image_for_drupal_pr
    @environment.environment_name = 'drupal-pull-request'
    assert(@environment.pull_drupal_data_image?)
  end

  def test_should_not_pull_drupal_data_for_staging
    @environment.environment_name = 'drupal-staging'
    refute(@environment.pull_drupal_data_image?)
  end

  def test_should_not_pull_drupal_data_for_production
    @environment.environment_name = 'drupal-production'
    refute(@environment.pull_drupal_data_image?)
  end


  def test_drupal_pr_environment_does_not_preselect_port_if_required_env_variable_missing
    @environment.environment_name = 'drupal-pull-request'
    @environment.initialize_environment

    assert_equal(nil, ENV['DRUPAL_HOST_PORT'])
  end

  def test_non_drupal_pr_environment_does_not_preselect_drupal_port
    ENV['ghprbPullId'] = '1205'
    @environment.environment_name = 'drupal-production'
    @environment.initialize_environment

    assert_equal(nil, ENV['DRUPAL_HOST_PORT'])
  end

  def test_create_file
    assert_equal(false, File.exist?("#{@environments_directory}/valid-environment/test.txt"))
    @environment.create_file('test.txt')
    assert_equal(true, File.exist?("#{@environments_directory}/valid-environment/test.txt"))
  end

  def test_create_template_resources

    @environment.environment_name = 'drupal-pull-request'
    @environment.environment_directory = File.expand_path('test-environments/drupal-pull-request',File.dirname(__FILE__))

    assert_equal(true, File.exist?("#{@environments_directory}/drupal-pull-request/rhd.settings.php"))
    assert_equal(true, File.exist?("#{@environments_directory}/drupal-pull-request/rhd.settings.yml.erb"))
    assert_equal(false, File.exist?("#{@environments_directory}/drupal-pull-request/rhd.settings.yml"))

    @environment.create_template_resources

    assert_equal(true, File.exist?("#{@environments_directory}/drupal-pull-request/rhd.settings.php"))
    assert_equal(true, File.exist?("#{@environments_directory}/drupal-pull-request/rhd.settings.yml.erb"))
    assert_equal(true, File.exist?("#{@environments_directory}/drupal-pull-request/rhd.settings.yml"))
  end

  def test_create_template_resources_does_nothing_for_non_pr_environment

    @environment.environment_directory = File.expand_path('test-environments/drupal-pull-request',File.dirname(__FILE__))

    assert_equal(true, File.exist?("#{@environments_directory}/drupal-pull-request/rhd.settings.php"))
    assert_equal(true, File.exist?("#{@environments_directory}/drupal-pull-request/rhd.settings.yml.erb"))
    assert_equal(false, File.exist?("#{@environments_directory}/drupal-pull-request/rhd.settings.yml"))

    @environment.create_template_resources

    assert_equal(true, File.exist?("#{@environments_directory}/drupal-pull-request/rhd.settings.php"))
    assert_equal(true, File.exist?("#{@environments_directory}/drupal-pull-request/rhd.settings.yml.erb"))
    assert_equal(false, File.exist?("#{@environments_directory}/drupal-pull-request/rhd.settings.yml"))

  end

  def test_template_resources

    ENV['DRUPAL_HOST_IP'] = '10.20.30.40'
    ENV['DRUPAL_HOST_PORT'] = '80'
    ENV['SEARCHISKO_HOST_IP'] = '11.21.31.41'
    ENV['SEARCHISKO_HOST_PORT'] = '8080'

    @environment.environment_name = 'drupal-pull-request'
    @environment.environment_directory = File.expand_path('test-environments/drupal-pull-request',File.dirname(__FILE__))

    @environment.create_template_resources

    assert_equal(true, File.exist?("#{@environments_directory}/drupal-pull-request/rhd.settings.php"))
    assert_equal(true, File.exist?("#{@environments_directory}/drupal-pull-request/rhd.settings.yml"))

    @environment.template_resources

    assert_equal(true, File.exist?("#{@environments_directory}/drupal-pull-request/rhd.settings.yml"))

    assert_equal(false, File.open("#{@environments_directory}/drupal-pull-request/rhd.settings.yml").grep(/10.20.30.40$/).empty?)
    assert_equal(false, File.open("#{@environments_directory}/drupal-pull-request/rhd.settings.yml").grep(/80$/).empty?)
    assert_equal(false, File.open("#{@environments_directory}/drupal-pull-request/rhd.settings.yml").grep(/11.21.31.41$/).empty?)
    assert_equal(false, File.open("#{@environments_directory}/drupal-pull-request/rhd.settings.yml").grep(/8080$/).empty?)

  end

  def test_create_file_already_existing
    FileUtils.touch("#{@environments_directory}/valid-environment/test.txt")
    assert_equal(true, File.exist?("#{@environments_directory}/valid-environment/test.txt"))

    mtime = File.mtime("#{@environments_directory}/valid-environment/test.txt")

    @environment.create_file('test.txt')

    assert_equal(true, File.exist?("#{@environments_directory}/valid-environment/test.txt"))
    refute_same(mtime, File.mtime("#{@environments_directory}/valid-environment/test.txt"))
  end

  def test_get_docker_compose_project_name_no_env_variable
    assert_equal('validenvironment',@environment.get_compose_project_name)
  end

  def test_get_docker_compose_project_name_env_variable

      ENV['COMPOSE_PROJECT_NAME'] = 'rhdpr1'
      assert_equal('rhdpr1', @environment.get_compose_project_name)
      assert_equal('valid-environment', @environment.environment_name)
  end

  def test_supporting_services_drupal_dev_local_dcp
    @environment.environment_name = 'drupal-dev-local-dcp'
    assert_equal(%w(apache mysql searchisko drupalmysql drupal), @environment.get_supporting_services)
  end

  def test_supporting_services_drupal_dev
    @environment.environment_name = 'drupal-dev'
    assert_equal(%w(apache drupalmysql drupal), @environment.get_supporting_services)
  end

  def test_supporting_services_drupal_pull_request
    @environment.environment_name = 'drupal-pull-request'
    assert_equal(%w(drupalmysql drupal), @environment.get_supporting_services)
  end

  def test_supporting_services_drupal_staging
    @environment.environment_name = 'drupal-staging'
    assert_equal(%w(drupal), @environment.get_supporting_services)
  end

  def test_supporting_services_drupal_production
    @environment.environment_name = 'drupal-production'
    assert_equal(%w(drupal), @environment.get_supporting_services)
  end

  def test_is_drupal_environment_for_prod
    @environment.environment_name = "drupal-production"
    assert_equal(true, @environment.is_drupal_environment?)
  end

  def test_is_drupal_environment_for_dev
    @environment.environment_name = "drupal-dev"
    assert_equal(true, @environment.is_drupal_environment?)
  end

  def test_is_drupal_environment_for_pull_request
    @environment.environment_name = "drupal-pull-request"
    assert_equal(true, @environment.is_drupal_environment?)
  end

  def test_is_drupal_environment_for_staging
    @environment.environment_name = "drupal-staging"
    assert_equal(true, @environment.is_drupal_environment?)
  end

  def test_is_not_drupal_environment
    @environment.environment_name = "awestruct-pull-request"
    assert_equal(false, @environment.is_drupal_environment?)
  end

  def test_valid_environment_is_valid
    assert_equal(true, @environment.is_valid_environment?)
  end

  def test_invalid_environment_is_not_valid
    assert_equal(false, RhdEnvironment.new("#{@environments_directory}/invalid-environment").is_valid_environment?)
  end

  def test_get_docker_compose_file
    assert_equal("#{@environments_directory}/valid-environment/docker-compose.yml",
                 @environment.get_docker_compose_file)
  end

  def test_requires_proxy_awestruct_dev
    @environment.environment_name = 'awestruct-dev'
    assert_equal(false, @environment.requires_proxy?)
  end

  def test_requires_proxy_awestruct_pr
    @environment.environment_name = 'awestruct-pull-request'
    assert_equal(false, @environment.requires_proxy?)
  end

  def test_requires_proxy_drupal_dev
    @environment.environment_name = 'drupal-dev'
    assert_equal(false, @environment.requires_proxy?)
  end

  def test_requires_proxy_drupal_pr
    @environment.environment_name = 'drupal-pull-request'
    assert_equal(false, @environment.requires_proxy?)
  end

  def test_requires_proxy_drupal_staging
    @environment.environment_name = 'drupal-staging'
    assert_equal(true, @environment.requires_proxy?)
  end

  def test_requires_proxy_drupal_production
    @environment.environment_name = 'drupal-production'
    assert_equal(true, @environment.requires_proxy?)
  end

  def test_get_http_proxy_non_proxy_environment
    @environment.environment_name = 'drupal-dev'
    assert_equal(nil, @environment.get_http_proxy)
  end

  def test_get_https_proxy_non_proxy_environment
    @environment.environment_name = 'drupal-dev'
    assert_equal(nil, @environment.get_https_proxy)
  end

  def test_get_http_proxy_drupal_production
    @environment.environment_name = 'drupal-production'
    assert_equal('proxy01.util.phx2.redhat.com:8080', @environment.get_http_proxy)
  end

  def test_get_http_proxy_drupal_staging
    @environment.environment_name = 'drupal-staging'
    assert_equal('proxy01.util.phx2.redhat.com:8080', @environment.get_http_proxy)
  end

  def test_get_https_proxy_drupal_production
    @environment.environment_name = 'drupal-production'
    assert_equal('proxy01.util.phx2.redhat.com:8080', @environment.get_http_proxy)
  end

  def test_get_https_proxy_drupal_staging
    @environment.environment_name = 'drupal-staging'
    assert_equal('proxy01.util.phx2.redhat.com:8080', @environment.get_https_proxy)
  end

end