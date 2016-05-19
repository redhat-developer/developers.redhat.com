require 'minitest/autorun'
require 'climate_control'
require_relative '../lib/options.rb'
require_relative 'test_helper.rb'

class TestOptions < Minitest::Test
  def test_add
    assert_equal (4+1), 5
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

    tasks = Options.parse (['--drupal'])
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

  def test_set_build
    tasks = Options.parse (["-b"])
    assert(tasks[:build])
    refute(tasks[:should_start_supporting_services])

    tasks = Options.parse (["--run-the-stack"])
    assert(tasks[:build])
  end

  def test_kill
    tasks = Options.parse (["-r"])
    assert(tasks[:kill_all])

    tasks = Options.parse (["--run-the-stack"])
    assert(tasks[:kill_all])
  end

  def test_supporting_services
    tasks = Options.parse (["-r"])
    assert_equal(tasks[:supporting_services], %w(-d mysql searchisko drupal drupalmysql))

    tasks = Options.parse (["--run-the-stack"])
    assert_equal(tasks[:supporting_services], %w(-d mysql searchisko drupal drupalmysql))

    tasks = Options.parse (['-u'])
    assert_includes tasks[:supporting_services], 'drupal'
    assert_includes tasks[:supporting_services], 'drupalmysql'
  end

  def test_awestruct_command
    tasks = Options.parse (["--stage-pr", "6"])
    assert_equal(["--rm", "--service-ports", "awestruct", "bundle exec rake create_pr_dirs[pr,build,6] clean deploy[staging_docker]"], tasks[:awestruct_command_args])
    tasks = Options.parse (["--run-the-stack"])
    assert_equal(['--rm', '--service-ports', 'awestruct', 'rake git_setup clean preview[docker]'], tasks[:awestruct_command_args])
    tasks = Options.parse (["-p"])
    assert_equal(['--rm', '--service-ports', 'awestruct', 'rake git_setup clean preview[docker]'], tasks[:awestruct_command_args])
    tasks = Options.parse (["-g"])
    assert_equal(['--rm', '--service-ports', 'awestruct', 'rake git_setup clean gen[docker]'], tasks[:awestruct_command_args])

    tasks = Options.parse %w(-p -u)
    # If we're using drupal, we don't need to do a preview in awestruct
    ['--rm', '--service-ports', 'awestruct', "rake git_setup clean gen[drupal]"].each do |commands|
      assert_includes tasks[:awestruct_command_args], commands
    end

    tasks = Options.parse %w(-g -u)
    ['--rm', '--service-ports', 'awestruct', "rake git_setup clean gen[drupal]"].each do |commands|
      assert_includes tasks[:awestruct_command_args], commands
    end
  end

  def test_acceptance_test_target_task
    ClimateControl.modify PARALLEL_TEST: 'true', RHD_JS_DRIVER: 'docker_chrome', RHD_DEFAULT_DRIVER: 'mechanize' do
      tasks = Options.parse (["--acceptance_test_target=http://example.com"])
      assert(tasks[:build])
      assert_equal('http://example.com', ENV['HOST_TO_TEST'])
      assert_equal('true', ENV['PARALLEL_TEST'])
      assert_equal('docker_chrome', ENV['RHD_JS_DRIVER'])
      assert_equal('mechanize', ENV['RHD_DEFAULT_DRIVER'])
      assert_equal(["--rm", "--service-ports", "awestruct_acceptance_test", "bundle exec rake features HOST_TO_TEST=#{ENV['HOST_TO_TEST']} RHD_JS_DRIVER=#{ENV['RHD_DOCKER_DRIVER']}"], tasks[:acceptance_test_target_task])
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

  def test_run_docker_nightly
    tasks = Options.parse (["--docker-nightly"])
    refute_equal(["--no-deps", "--rm", "--service-ports", "awestruct", "bundle exec rake acceptance_test_target"], tasks[:acceptance_test_target_task])
    assert_equal(["--rm", "--service-ports", "awestruct", "bundle exec rake create_pr_dirs[docker-nightly,build,docker-nightly] clean deploy[staging_docker]"], tasks[:awestruct_command_args])
    assert(tasks[:kill_all])
    assert_equal(tasks[:unit_tests], expected_unit_test_tasks)
    assert(tasks[:build])
    assert_equal(tasks[:supporting_services], %w(-d mysql searchisko drupal drupalmysql))
  end

  def test_run_stage_pr
    tasks = Options.parse (["--stage-pr", "6"])
    assert(tasks[:kill_all])
    assert_equal(["--rm", "--service-ports", "awestruct", "bundle exec rake create_pr_dirs[pr,build,6] clean deploy[staging_docker]"], tasks[:awestruct_command_args])
    assert(tasks[:build])
    assert_equal(tasks[:unit_tests], expected_unit_test_tasks)
    assert_equal(tasks[:supporting_services], %w(-d mysql searchisko drupal drupalmysql))
  end

  def test_run_the_stack
    tasks = Options.parse (["--run-the-stack"])
    assert(tasks[:kill_all])
    assert(tasks[:decrypt])
    assert_equal(tasks[:unit_tests], expected_unit_test_tasks)
    assert_equal(tasks[:supporting_services], %w(-d mysql searchisko drupal drupalmysql))
    assert_equal(['--rm', '--service-ports', 'awestruct', 'rake git_setup clean preview[docker]'], tasks[:awestruct_command_args])

    tasks = Options.parse %w(-u --run-the-stack)
    assert_equal(['--rm', '--service-ports', 'awestruct', 'rake git_setup clean gen[drupal]'], tasks[:awestruct_command_args])
  end

  def test_test_task
    tasks = Options.parse(["-t"])
    assert(tasks[:build])
    assert(tasks[:decrypt])
    assert_equal(tasks[:unit_tests], expected_unit_test_tasks)
  end

  def test_docker_url
    tasks = Options.parse (["-d", "SOMETHING"])
    assert_equal("SOMETHING",tasks[:docker])
  end

  def test_drupal
    tasks = Options.parse (['-u'])
    assert_includes tasks, :drupal
    assert_equal tasks[:drupal], true

    assert_includes tasks, :supporting_services
    assert_includes tasks[:supporting_services], 'drupal'
    assert_includes tasks[:supporting_services], 'drupalmysql'
  end

  def test_drupal_nightly
    tasks = Options.parse (['--drupal-nightly'])
    assert_includes tasks, :drupal
    assert_equal tasks[:drupal], true

    refute(tasks[:decrypt])
    assert(tasks[:kill_all])
    assert_includes tasks, :supporting_services
    assert_includes tasks[:supporting_services], 'drupal'
    assert_includes tasks[:supporting_services], 'drupalmysql'
  end

  private def expected_unit_test_tasks
    ['--no-deps', '--rm', 'awestruct_unit_tests', 'bundle exec rake test']
  end
end
