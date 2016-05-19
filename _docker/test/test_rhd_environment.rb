require 'minitest/autorun'
require_relative '../../_docker/lib/rhd_environment'
require_relative 'test_helper'

class TestRhdEnvironment < MiniTest::Test

  def setup
    @environments_directory = File.expand_path('test-environments',File.dirname(__FILE__))
    @environment = RhdEnvironment.new("#{@environments_directory}/valid-environment")
  end

  def test_supporting_services_awestruct_dev
    @environment.environment_name = 'awestruct-dev'
    assert_equal(%w(searchisko mysql), @environment.get_supporting_services)
  end

  def test_supporting_services_awestruct_pull_request
    @environment.environment_name = 'awestruct-pull-request'
    assert_equal(%w(searchisko mysql), @environment.get_supporting_services)
  end

  def test_supporting_services_drupal_dev
    @environment.environment_name = 'drupal-dev'
    assert_equal(%w(drupal drupalmysql searchisko mysql), @environment.get_supporting_services)
  end

  def test_supporting_services_drupal_pull_request
    @environment.environment_name = 'drupal-pull-request'
    assert_equal(%w(drupal drupalmysql searchisko mysql), @environment.get_supporting_services)
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
    assert_equal("#{@environments_directory}/valid-environment/docker-compose.yml", @environment.get_docker_compose_file)
  end

end