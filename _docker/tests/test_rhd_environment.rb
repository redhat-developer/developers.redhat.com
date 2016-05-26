require 'minitest/autorun'
require_relative '../../_docker/lib/rhd_environment'
require_relative 'test_helper'

class TestRhdEnvironment < MiniTest::Test

  def setup
    ENV['COMPOSE_PROJECT_NAME'] = ''
    @environments_directory = File.expand_path('test-environments',File.dirname(__FILE__))
    @testing_directory = File.expand_path('test-environments/testing',File.dirname(__FILE__))
    @environment = RhdEnvironment.new("#{@environments_directory}/valid-environment", @testing_directory)
  end

  def teardown
    ENV['COMPOSE_PROJECT_NAME'] = ''
    ENV['DRUPAL_HOST_IP'] = ''
    ENV['DRUPAL_HOST_PORT'] = ''
    ENV['SEARCHISKO_HOST_IP'] = ''
    ENV['SEARCHISKO_HOST_PORT'] = ''

    FileUtils.rm("#{@environments_directory}/valid-environment/test.txt", :force => true)
    FileUtils.rm("#{@environments_directory}/drupal-pull-request/rhd.settings.php", :force => true)
  end

  def test_get_testing_docker_compose_file
    assert_equal("#{@testing_directory}/docker-compose.yml", @environment.get_testing_docker_compose_file)
  end

  def test_create_template_resources
    @environment.environment_name = 'drupal-pull-request'
    @environment.environment_directory = File.expand_path('test-environments/drupal-pull-request',File.dirname(__FILE__))

    assert_equal(false, File.exist?("#{@environments_directory}/drupal-pull-request/rhd.settings.php"))
    @environment.create_template_resources
    assert_equal(true, File.exist?("#{@environments_directory}/drupal-pull-request/rhd.settings.php"))
  end

  def test_create_template_resources_not_drupal_pull_request
    assert_equal(false, File.exist?("#{@environments_directory}/valid-environment/rhd.settings.php"))
    @environment.create_template_resources
    assert_equal(false, File.exist?("#{@environments_directory}/valid-environment/rhd.settings.php"))
  end

  def test_create_file
    assert_equal(false, File.exist?("#{@environments_directory}/valid-environment/test.txt"))
    @environment.create_file('test.txt')
    assert_equal(true, File.exist?("#{@environments_directory}/valid-environment/test.txt"))
  end

  def test_template_resources

    ENV['DRUPAL_HOST_IP'] = '10.20.30.40'
    ENV['DRUPAL_HOST_PORT'] = '80'
    ENV['SEARCHISKO_HOST_IP'] = '11.21.31.41'
    ENV['SEARCHISKO_HOST_PORT'] = '8080'

    @environment.environment_name = 'drupal-pull-request'
    @environment.environment_directory = File.expand_path('test-environments/drupal-pull-request',File.dirname(__FILE__))

    assert_equal(false, File.exist?("#{@environments_directory}/drupal-pull-request/rhd.settings.php"))

    @environment.create_template_resources
    @environment.template_resources

    assert_equal(true, File.exist?("#{@environments_directory}/drupal-pull-request/rhd.settings.php"))

    assert_equal(false, File.open("#{@environments_directory}/drupal-pull-request/rhd.settings.php").grep(/10.20.30.40$/).empty?)
    assert_equal(false, File.open("#{@environments_directory}/drupal-pull-request/rhd.settings.php").grep(/80$/).empty?)
    assert_equal(false, File.open("#{@environments_directory}/drupal-pull-request/rhd.settings.php").grep(/11.21.31.41$/).empty?)
    assert_equal(false, File.open("#{@environments_directory}/drupal-pull-request/rhd.settings.php").grep(/8080$/).empty?)

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

  def test_supporting_services_awestruct_dev
    @environment.environment_name = 'awestruct-dev'
    assert_equal(%w(mysql searchisko), @environment.get_supporting_services)
  end

  def test_supporting_services_awestruct_pull_request
    @environment.environment_name = 'awestruct-pull-request'
    assert_equal(%w(mysql searchisko), @environment.get_supporting_services)
  end

  def test_supporting_services_drupal_dev
    @environment.environment_name = 'drupal-dev'
    assert_equal(%w(mysql searchisko drupalmysql drupal), @environment.get_supporting_services)
  end

  def test_supporting_services_drupal_pull_request
    @environment.environment_name = 'drupal-pull-request'
    assert_equal(%w(mysql searchisko drupalmysql drupal), @environment.get_supporting_services)
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
    assert_equal(false, RhdEnvironment.new("#{@environments_directory}/invalid-environment", @testing_directory).is_valid_environment?)
  end

  def test_get_docker_compose_file
    assert_equal("#{@environments_directory}/valid-environment/docker-compose.yml", @environment.get_docker_compose_file)
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