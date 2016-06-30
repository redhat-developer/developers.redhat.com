require 'minitest/autorun'
require 'climate_control'
require_relative '../lib/options.rb'
require_relative 'test_helper.rb'

class TestOptions < Minitest::Test
  def test_add
    assert_equal (4+1), 5
  end

  def test_export_with_no_explicit_destination
    tasks = Options.parse(['--export'])
    assert(tasks[:build])
    assert_equal(['--rm','export'], tasks[:awestruct_command_args])
  end

  def test_export_with_specified_destination
    tasks = Options.parse(['--export','foo@bar:/tmp/foo'])
    assert(tasks[:build])
    assert_equal(['--rm','export','foo@bar:/tmp/foo'], tasks[:awestruct_command_args])
  end


  def test_loads_awestruct_pull_request_environment_by_default
    tasks = Options.parse(['-t'])
    rhd_environment = tasks[:environment]
    assert_equal('awestruct-pull-request', rhd_environment.environment_name)
  end

  def test_loads_specified_environment
    tasks = Options.parse(['-e awestruct-dev'])
    rhd_environment = tasks[:environment]
    assert_equal('awestruct-dev', rhd_environment.environment_name)
  end

  def test_decrypt

    tasks = Options.parse (["-b"])
    assert(tasks[:decrypt])

    tasks = Options.parse (["-p"])
    assert(tasks[:decrypt])

    tasks = Options.parse (["-r"])
    assert(tasks[:decrypt])

    tasks = Options.parse (["-p"])
    assert(tasks[:decrypt])

    tasks = Options.parse (["-g"])
    assert(tasks[:decrypt])

    tasks = Options.parse (["--run-the-stack"])
    assert(tasks[:decrypt])

    tasks = Options.parse (['-u'])
    assert(tasks[:decrypt])

    tasks = Options.parse (['-t'])
    assert(tasks[:decrypt])

    tasks = Options.parse %w(-d 127.0.0.1)
    assert_nil(tasks[:decrypt])

    tasks = Options.parse %w(--stage-pr 1)
    assert_nil(tasks[:decrypt])

    tasks = Options.parse %w(--acceptance_test_target 127.0.0.1)
    assert_nil(tasks[:decrypt])

    tasks = Options.parse %w(--docker-nightly)
    assert_nil(tasks[:decrypt])

  end

  def test_backup_with_no_backup_name
    tasks = Options.parse (["--backup"])
    assert(tasks[:build])
    assert_equal(['--rm', 'backup',''], tasks[:awestruct_command_args])
    assert_equal(%w(), tasks[:supporting_services])
  end

  def test_backup_with_supplied_backup_name
    tasks = Options.parse (["--backup", "my-backup-name"])
    assert(tasks[:build])
    assert_equal(['--rm', 'backup', 'my-backup-name'], tasks[:awestruct_command_args])
    assert_equal(%w(), tasks[:supporting_services])
  end

  def test_set_build
    tasks = Options.parse (["-b"])
    assert(tasks[:build])
    assert_equal([], tasks[:supporting_services])
    assert_equal(nil, tasks[:awestruct_command_args])
  end

  def test_kill
    tasks = Options.parse (["-r"])
    assert(tasks[:kill_all])
    assert_equal(tasks[:supporting_services], %w(mysql searchisko))
    assert_equal(nil, tasks[:awestruct_command_args])
  end

  def test_kill_awestruct_dev
    tasks = Options.parse (['-e awestruct-dev',"-r"])
    assert(tasks[:kill_all])
    assert_equal(tasks[:supporting_services], %w(mysql searchisko))
    assert_equal(nil, tasks[:awestruct_command_args])
  end

  def test_kill_drupal_dev
    tasks = Options.parse (['-e drupal-dev',"-r"])
    assert(tasks[:kill_all])
    assert_equal(tasks[:supporting_services], %w(mysql searchisko drupalmysql drupal))
    assert_equal(nil, tasks[:awestruct_command_args])
  end

  def test_kill_drupal_pull_request
    tasks = Options.parse (['-e drupal-pull-request',"-r"])
    assert(tasks[:kill_all])
    assert_equal(tasks[:supporting_services], %w(mysql searchisko drupalmysql drupal))
    assert_equal(nil, tasks[:awestruct_command_args])
  end

  def test_kill_drupal_staging
    tasks = Options.parse (['-e drupal-staging',"-r"])
    assert(tasks[:kill_all])
    assert_equal(tasks[:supporting_services], %w(drupal))
    assert_equal(nil, tasks[:awestruct_command_args])
  end

  def test_kill_drupal_production
    tasks = Options.parse (['-e drupal-production',"-r"])
    assert(tasks[:kill_all])
    assert_equal(tasks[:supporting_services], %w(drupal))
    assert_equal(nil, tasks[:awestruct_command_args])
  end

  def test_supporting_services
    tasks = Options.parse (["-r"])
    assert_equal(tasks[:supporting_services], %w(mysql searchisko))

    tasks = Options.parse (["--run-the-stack"])
    assert_equal(tasks[:supporting_services], %w(mysql searchisko))
  end

  def test_awestruct_command_drupal_dev
    tasks = Options.parse ['-e drupal-dev', '-p']
    # If we're using drupal, we don't need to do a preview in awestruct
    %w(--rm --service-ports awestruct).each do |commands|
      assert_includes tasks[:awestruct_command_args], commands
    end

    tasks = Options.parse ['-e drupal-dev', '-g']
    %w(--rm --service-ports awestruct).each do |commands|
      assert_includes tasks[:awestruct_command_args], commands
    end
  end

  def test_awestruct_command_drupal_pull_request_environment
    tasks = Options.parse ['-e drupal-pull-request', '-p']
    # If we're using drupal, we don't need to do a preview in awestruct
    %w(--rm --service-ports awestruct).each do |commands|
      assert_includes tasks[:awestruct_command_args], commands
    end

    tasks = Options.parse ['-e drupal-pull-request', '-g']
    ['--rm', '--service-ports', 'awestruct'].each do |commands|
      assert_includes tasks[:awestruct_command_args], commands
    end
  end

  def test_awestruct_command_awestruct_dev_environment
    tasks = Options.parse (['-e awestruct-dev', "--stage-pr", "6"])
    assert_equal(["--rm", "--service-ports", "awestruct", "bundle exec rake create_pr_dirs[pr,build,6] clean deploy[staging_docker]"], tasks[:awestruct_command_args])
    tasks = Options.parse (['-e awestruct-dev',"--run-the-stack"])
    assert_equal(['--rm', '--service-ports', 'awestruct'], tasks[:awestruct_command_args])
    tasks = Options.parse (['-e awestruct-dev',"-p"])
    assert_equal(['--rm', '--service-ports', 'awestruct', 'rake git_setup clean preview[docker]'], tasks[:awestruct_command_args])
    tasks = Options.parse (['-e awestruct-dev',"-g"])
    assert_equal(['--rm', '--service-ports', 'awestruct'], tasks[:awestruct_command_args])
  end

  def test_awestruct_command
    tasks = Options.parse (["--stage-pr", "6"])
    assert_equal(["--rm", "--service-ports", "awestruct", "bundle exec rake create_pr_dirs[pr,build,6] clean deploy[staging_docker]"], tasks[:awestruct_command_args])
    tasks = Options.parse (["--run-the-stack"])
    assert_equal(['--rm', '--service-ports', 'awestruct'], tasks[:awestruct_command_args])
    tasks = Options.parse (["-p"])
    assert_equal(['--rm', '--service-ports', 'awestruct','rake git_setup clean preview[docker]'], tasks[:awestruct_command_args])
    tasks = Options.parse (["-g"])
    assert_equal(['--rm', '--service-ports', 'awestruct'], tasks[:awestruct_command_args])
  end

  def test_acceptance_test_target_task
    ClimateControl.modify PARALLEL_TEST: 'true', RHD_JS_DRIVER: 'docker_chrome', RHD_DEFAULT_DRIVER: 'mechanize' do
      tasks = Options.parse (["--acceptance_test_target=http://example.com"])
      assert(tasks[:build])
      assert_equal('http://example.com', ENV['HOST_TO_TEST'])
      assert_equal('true', ENV['PARALLEL_TEST'])
      assert_equal('docker_chrome', ENV['RHD_JS_DRIVER'])
      assert_equal('mechanize', ENV['RHD_DEFAULT_DRIVER'])
      assert_equal(["--rm", "--service-ports", "acceptance_tests", "bundle exec rake features HOST_TO_TEST=#{ENV['HOST_TO_TEST']} RHD_JS_DRIVER=#{ENV['RHD_DOCKER_DRIVER']}"], tasks[:acceptance_test_target_task])
    end
  end

  def test_run_pr_reap
    tasks = Options.parse (["--docker-pr-reap"])
    refute(tasks[:acceptance_test_target_task])
    assert_equal(["--no-deps", "--rm", "--service-ports", "awestruct", "bundle exec rake reap_old_pulls[pr]"], tasks[:awestruct_command_args])
    refute(tasks[:kill_all])
    refute(tasks[:unit_tests], expected_unit_test_tasks)
    assert(tasks[:build])
    assert_empty(tasks[:supporting_services])
  end

  def test_run_pr_reap_drupal
    tasks = Options.parse (['-e drupal-pull-request', "--docker-pr-reap"])
    refute(tasks[:acceptance_test_target_task])
    assert_equal(["--no-deps", "--rm", "--service-ports", "awestruct", "bundle exec rake reap_old_pulls[pr]"], tasks[:awestruct_command_args])
    refute(tasks[:kill_all])
    refute(tasks[:unit_tests], expected_unit_test_tasks)
    assert(tasks[:build])
    assert_empty(tasks[:supporting_services])
  end

  def test_run_docker_nightly
    tasks = Options.parse (['-e drupal-pull-request',"--docker-nightly"])
    refute_equal(["--no-deps", "--rm", "--service-ports", "awestruct", "bundle exec rake acceptance_test_target"], tasks[:acceptance_test_target_task])
    assert_equal(["--rm", "--service-ports", "awestruct", "bundle exec rake create_pr_dirs[docker-nightly,build,docker-nightly] clean deploy[staging_docker]"], tasks[:awestruct_command_args])
    assert(tasks[:kill_all])
    assert_equal(tasks[:unit_tests], expected_unit_test_tasks)
    assert(tasks[:build])
    assert_equal(tasks[:supporting_services], %w(mysql searchisko drupalmysql drupal))
  end

  def test_run_stage_pr
    tasks = Options.parse (["--stage-pr", "6"])
    assert(tasks[:kill_all])
    assert_equal(["--rm", "--service-ports", "awestruct", "bundle exec rake create_pr_dirs[pr,build,6] clean deploy[staging_docker]"], tasks[:awestruct_command_args])
    assert(tasks[:build])
    assert_equal(tasks[:unit_tests], expected_unit_test_tasks)
    assert_equal(tasks[:supporting_services], %w(mysql searchisko))
  end

  def test_run_stage_pr_drupal

    tasks = Options.parse (['-e drupal-pull-request',"--stage-pr", "6"])
    assert(tasks[:kill_all])
    assert_equal(["--rm", "--service-ports", "awestruct", "bundle exec rake create_pr_dirs[pr,build,6] clean deploy[staging_docker]"], tasks[:awestruct_command_args])
    assert(tasks[:build])
    assert_equal(tasks[:unit_tests], expected_unit_test_tasks)
    assert_equal(tasks[:supporting_services], %w(mysql searchisko drupalmysql drupal))
  end

  def test_run_the_stack_with_no_decrypt
    tasks = Options.parse (['-e awestruct-dev', '--run-the-stack', '--no-decrypt'])
    assert(tasks[:kill_all])
    refute(tasks[:decrypt])
    assert_equal(tasks[:unit_tests], expected_unit_test_tasks)
    assert_equal(%w(mysql searchisko), tasks[:supporting_services])
    assert_equal(%w(--rm --service-ports awestruct), tasks[:awestruct_command_args])
  end

  def test_run_tests_with_no_decrypt
    tasks = Options.parse (['-e awestruct-dev', '-t', '--no-decrypt'])
    refute(tasks[:kill_all])
    refute(tasks[:decrypt])
    assert_equal(tasks[:unit_tests], expected_unit_test_tasks)
    assert_equal(%w(), tasks[:supporting_services])
  end


  def test_run_the_stack_awestruct_dev
    tasks = Options.parse (['-e awestruct-dev', "--run-the-stack"])
    assert(tasks[:kill_all])
    assert(tasks[:decrypt])
    assert_equal(tasks[:unit_tests], expected_unit_test_tasks)
    assert_equal(%w(mysql searchisko), tasks[:supporting_services])
    assert_equal(%w(--rm --service-ports awestruct), tasks[:awestruct_command_args])
  end

  def test_run_the_stack_drupal_dev
    tasks = Options.parse (['-e drupal-dev', "--run-the-stack"])
    assert(tasks[:kill_all])
    assert(tasks[:decrypt])
    assert_equal(tasks[:unit_tests], expected_unit_test_tasks)
    assert_equal(%w(mysql searchisko drupalmysql drupal), tasks[:supporting_services])
    assert_equal(['--rm', '--service-ports', 'awestruct'], tasks[:awestruct_command_args])
  end

  def test_run_the_stack_drupal_pull_request

    tasks = Options.parse (['-e drupal-pull-request', "--run-the-stack"])

    assert(tasks[:kill_all])
    assert(tasks[:decrypt])
    assert_equal(tasks[:unit_tests], expected_unit_test_tasks)
    assert_equal(%w(mysql searchisko drupalmysql drupal), tasks[:supporting_services])
    assert_equal(['--rm', '--service-ports', 'awestruct'], tasks[:awestruct_command_args])
  end


  def test_run_the_stack_awestruct_pull_request
    tasks = Options.parse (['-e awestruct-pull-request', "--run-the-stack"])
    assert(tasks[:kill_all])
    assert(tasks[:decrypt])
    assert_equal(tasks[:unit_tests], expected_unit_test_tasks)
    assert_equal(%w(mysql searchisko), tasks[:supporting_services])
    assert_equal(['--rm', '--service-ports', 'awestruct'], tasks[:awestruct_command_args])
  end

  def test_test_task
    tasks = Options.parse(["-t"])
    assert(tasks[:build])
    assert(tasks[:decrypt])
    assert_equal(tasks[:unit_tests], expected_unit_test_tasks)
    assert_equal(nil, tasks[:awestruct_command_args])
  end

  def test_run_tests_awestruct_dev
    tasks = Options.parse(['-e awestruct-dev', "-t"])
    assert(tasks[:build])
    assert(tasks[:decrypt])
    assert_equal(tasks[:unit_tests], expected_unit_test_tasks)
    assert_equal(nil, tasks[:awestruct_command_args])
  end

  def test_docker_url
    tasks = Options.parse (["-d", "SOMETHING"])
    assert_equal("SOMETHING",tasks[:docker])
  end

  private def expected_unit_test_tasks
    ['--no-deps', '--rm', 'unit_tests']
  end
end
