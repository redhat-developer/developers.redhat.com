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

      tasks = Options.parse %w(--acceptance_test_docker)
      assert(tasks[:decrypt])

      tasks = Options.parse %w(--acceptance_test_target 127.0.0.1)
      assert_nil(tasks[:decrypt])

      tasks = Options.parse %w(--docker-nightly)
      assert_nil(tasks[:decrypt])

    end

    def test_set_ports
      tasks = Options.parse (["-b"])
      assert(tasks[:set_ports])
      assert_equal(tasks[:unit_tests], expected_unit_test_tasks)

      tasks = Options.parse (["-r"])
      assert(tasks[:set_ports])

      tasks = Options.parse (["--run-the-stack"])
      assert(tasks[:set_ports])

      tasks = Options.parse %w(-u)
      assert(tasks[:set_ports])
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
      assert_equal(tasks[:supporting_services], %w(-d mysql searchisko searchiskoconfigure))

      tasks = Options.parse (["--run-the-stack"])
      assert_equal(tasks[:supporting_services], %w(-d mysql searchisko searchiskoconfigure))

      tasks = Options.parse (['-u'])
      assert_includes tasks[:supporting_services], 'drupal'
      assert_includes tasks[:supporting_services], 'drupalpgsql'
    end

    def test_awestruct_command
      tasks = Options.parse (["--stage-pr", "6"])
      assert_equal(["--no-deps", "--rm", "--service-ports", "awestruct", "bundle exec rake create_pr_dirs[docker-pr,build,6] clean deploy[staging_docker]"], tasks[:awestruct_command_args])
      tasks = Options.parse (["--run-the-stack"])
      assert_equal(['--no-deps', '--rm', '--service-ports', 'awestruct', 'rake git_setup clean preview[docker]'], tasks[:awestruct_command_args])
      tasks = Options.parse (["-p"])
      assert_equal(['--no-deps', '--rm', '--service-ports', 'awestruct', 'rake git_setup clean preview[docker]'], tasks[:awestruct_command_args])
      tasks = Options.parse (["-g"])
      assert_equal(['--no-deps', '--rm', '--service-ports', 'awestruct', 'rake git_setup clean gen[docker]'], tasks[:awestruct_command_args])

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
      tasks = Options.parse (["--acceptance_test_target=http://example.com"])
      assert(tasks[:build])
      assert_equal(tasks[:unit_tests], expected_unit_test_tasks)
      assert_equal('http://example.com', ENV['HOST_TO_TEST'])
      assert_equal('false', ENV['PARALLEL_TEST'])
      refute(tasks[:set_ports])
      assert_equal(["--no-deps", "--rm", "awestruct", "bundle exec rake features PARALLEL_TEST=#{ENV['PARALLEL_TEST']}"], tasks[:acceptance_test_target_task])
    end

    def test_acceptance_test_target_task_at_docker
      assert_raises OptionParser::InvalidArgument do 
        tasks = Options.parse (["--acceptance_test_target=http://docker:8888"])
      end
    end

    def test_run_pr_reap
      tasks = Options.parse (["--docker-pr-reap"])
      refute(tasks[:acceptance_test_target_task])
      assert_equal(["--no-deps", "--rm", "--service-ports", "awestruct", "bundle exec rake reap_old_pulls[pr]"], tasks[:awestruct_command_args])
      refute(tasks[:kill_all])
      refute(tasks[:unit_tests], expected_unit_test_tasks)
      assert(tasks[:set_ports])
      assert(tasks[:build])
      assert_empty(tasks[:supporting_services])
    end

    def test_run_docker_nightly
      tasks = Options.parse (["--docker-nightly"])
      refute_equal(["--no-deps", "--rm", "--service-ports", "awestruct", "bundle exec rake acceptance_test_target"], tasks[:acceptance_test_target_task])
      assert_equal(["--no-deps", "--rm", "--service-ports", "awestruct", "bundle exec rake create_pr_dirs[docker-nightly,build,docker-nightly] clean deploy[staging_docker]"], tasks[:awestruct_command_args])
      assert(tasks[:kill_all])
      assert_equal(tasks[:unit_tests], expected_unit_test_tasks)
      assert(tasks[:set_ports])
      assert(tasks[:build])
      assert_equal(tasks[:supporting_services], %w(-d mysql searchisko searchiskoconfigure))
    end

    def test_run_stage_pr
      tasks = Options.parse (["--stage-pr", "6"])
      assert(tasks[:kill_all])
      assert(tasks[:build])
      assert_equal(tasks[:unit_tests], expected_unit_test_tasks)
      assert(tasks[:set_ports])
      assert_equal(tasks[:supporting_services], %w(-d mysql searchisko searchiskoconfigure))
    end

    def test_run_the_stack
      tasks = Options.parse (["--run-the-stack"])
      assert(tasks[:kill_all])
      assert(tasks[:decrypt])
      assert_equal(tasks[:unit_tests], expected_unit_test_tasks)
      assert_equal(tasks[:supporting_services], %w(-d mysql searchisko searchiskoconfigure))
      assert_equal(['--no-deps', '--rm', '--service-ports', 'awestruct', 'rake git_setup clean preview[docker]'], tasks[:awestruct_command_args])

      tasks = Options.parse %w(-u --run-the-stack)
      assert_equal(['--rm', '--service-ports', 'awestruct', 'rake git_setup clean gen[drupal]'], tasks[:awestruct_command_args])
    end

    def test_acceptance_test_target_task_default_value
      ClimateControl.modify HOST_TO_TEST: nil, AWESTRUCT_HOST_PORT: '32768' do
        tasks = Options.parse (["--acceptance_test_docker", "true"])
        assert(tasks[:kill_all])
        assert_equal(tasks[:unit_tests], expected_unit_test_tasks)
        assert(tasks[:decrypt])
        assert(tasks[:set_ports])
        assert_equal('true', ENV['PARALLEL_TEST'])
        assert(tasks[:build])
        assert_equal(tasks[:supporting_services], %w(-d mysql searchisko searchiskoconfigure))
        assert_equal(tasks[:awestruct_up_service], %w(-d awestruct_preview_no_reload))
        refute(tasks[:awestruct_command_args])
        assert_equal(["--rm", "awestruct_acceptance", "bundle exec rake features PARALLEL_TEST=#{ENV['PARALLEL_TEST']}"], tasks[:acceptance_test_target_task])
      end
    end

    def test_test_task
      tasks = Options.parse(["-t"])
      assert(tasks[:build])
      assert(tasks[:set_ports])
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
      assert_includes tasks[:supporting_services], 'drupalpgsql'
    end

    def test_drupal_nightly
      tasks = Options.parse (['--drupal-nightly'])
      assert_includes tasks, :drupal
      assert_equal tasks[:drupal], true

      refute(tasks[:decrypt])
      assert(tasks[:kill_all])
      assert_includes tasks, :supporting_services
      assert_includes tasks[:supporting_services], 'drupal'
      assert_includes tasks[:supporting_services], 'drupalpgsql'
    end

    private def expected_unit_test_tasks
      ['--no-deps', '--rm', 'awestruct_acceptance', 'bundle exec rake test']
    end
end
