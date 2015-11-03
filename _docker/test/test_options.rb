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
    end

    def test_set_ports
      tasks = Options.parse (["-b"])
      assert(tasks[:set_ports])
      assert_equal(tasks[:unit_tests], ['--no-deps', '--rm', 'awestruct', 'bundle exec rake test'])

      tasks = Options.parse (["-r"])
      assert(tasks[:set_ports])

      tasks = Options.parse (["--run-the-stack"])
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
      assert_equal(tasks[:supporting_services], %w(-d elasticsearch mysql searchisko searchiskoconfigure))

      tasks = Options.parse (["--run-the-stack"])
      assert_equal(tasks[:supporting_services], %w(-d elasticsearch mysql searchisko searchiskoconfigure))
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
    end

    def test_acceptance_test_target_task_default_value
      ClimateControl.modify HOST_TO_TEST: nil, AWESTRUCT_HOST_PORT: '32768' do
        tasks = Options.parse (["--acceptance_test_docker"])
        assert(tasks[:build])
        assert_equal(tasks[:unit_tests], ['--no-deps', '--rm', 'awestruct', 'bundle exec rake test'])
        refute(tasks[:set_ports])
        assert_equal(nil, ENV['HOST_TO_TEST'])
        assert_equal(["--no-deps", "--rm", "--service-ports", "awestruct_acceptance", "bundle exec rake features"], tasks[:acceptance_test_target_task])
      end
    end

    def test_acceptance_test_target_task
      tasks = Options.parse (["--acceptance_test_target=http://example.com"])
      assert(tasks[:build])
      assert_equal(tasks[:unit_tests], ['--no-deps', '--rm', 'awestruct', 'bundle exec rake test'])
      assert_equal('http://example.com', ENV['HOST_TO_TEST'])
      refute(tasks[:set_ports])
      assert_equal(["--no-deps", "--rm", "--service-ports", "awestruct", "bundle exec rake features"], tasks[:acceptance_test_target_task])
    end

    def test_run_docker_nightly
      tasks = Options.parse (["--docker-nightly"])
      refute_equal(["--no-deps", "--rm", "--service-ports", "awestruct", "bundle exec rake acceptance_test_target"], tasks[:acceptance_test_target_task])
      assert_equal(["--no-deps", "--rm", "--service-ports", "awestruct", "bundle exec rake create_pr_dirs[docker-nightly,build,docker-nightly] clean deploy[staging_docker]"], tasks[:awestruct_command_args])
      assert(tasks[:kill_all])
      assert_equal(tasks[:unit_tests], ['--no-deps', '--rm', 'awestruct', 'bundle exec rake test'])
      assert(tasks[:set_ports])
      assert(tasks[:build])
      assert_equal(tasks[:supporting_services], %w(-d elasticsearch mysql searchisko searchiskoconfigure))
    end

    def test_run_stage_pr
      tasks = Options.parse (["--stage-pr", "6"])
      assert(tasks[:kill_all])
      assert(tasks[:build])
      assert_equal(tasks[:unit_tests], ['--no-deps', '--rm', 'awestruct', 'bundle exec rake test'])
      assert(tasks[:set_ports])
      assert_equal(tasks[:supporting_services], %w(-d elasticsearch mysql searchisko searchiskoconfigure))
    end

    def test_run_the_stack
      tasks = Options.parse (["--run-the-stack"])
      assert(tasks[:kill_all])
      assert_equal(tasks[:unit_tests], ['--no-deps', '--rm', 'awestruct', 'bundle exec rake test'])
      assert_equal(tasks[:supporting_services], %w(-d elasticsearch mysql searchisko searchiskoconfigure))
      assert_equal(['--no-deps', '--rm', '--service-ports', 'awestruct', 'rake git_setup clean preview[docker]'], tasks[:awestruct_command_args])
    end

    def test_test_task
      tasks = Options.parse(["-t"])
      assert(tasks[:build])
      assert(tasks[:set_ports])
      assert(tasks[:decrypt])
      assert_equal(tasks[:unit_tests], ['--no-deps', '--rm', 'awestruct', 'bundle exec rake test'])
    end

    def test_docker_url
      tasks = Options.parse (["-d", "SOMETHING"])
      assert_equal("SOMETHING",tasks[:docker])
    end
end

