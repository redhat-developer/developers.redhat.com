require 'test/unit'
require './lib/misc/options.rb'

class TestOptions < Test::Unit::TestCase
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

      tasks = Options.parse (["-r"])
      assert(tasks[:set_ports])

      tasks = Options.parse (["--run-the-stack"])
      assert(tasks[:set_ports])
    end

    def test_set_build
      tasks = Options.parse (["-b"])
      assert(tasks[:build])

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
      assert_equal(['--no-deps', '--rm', '--service-ports', 'awestruct', 'rake clean gen[docker]'], tasks[:awestruct_command_args])
    end

    def test_features_task
      tasks = Options.parse (["--features"])
      assert(tasks[:build])
      assert_equal(["--no-deps", "--rm", "--service-ports", "awestruct", "bundle exec rake features"], tasks[:features_task])
    end

    def test_run_docker_nightly
      tasks = Options.parse (["--docker-nightly"])
      assert_not_equal(["--no-deps", "--rm", "--service-ports", "awestruct", "bundle exec rake features"], tasks[:features_task])
      assert_equal(["--no-deps", "--rm", "--service-ports", "awestruct", "bundle exec rake create_pr_dirs[docker-nightly,build,docker-nightly] clean deploy[staging_docker]"], tasks[:awestruct_command_args])
      assert(tasks[:kill_all])
      assert(tasks[:set_ports])
      assert(tasks[:build])
      assert_equal(tasks[:supporting_services], %w(-d elasticsearch mysql searchisko searchiskoconfigure))
    end

    def test_run_stage_pr
      tasks = Options.parse (["--stage-pr", "6"])
      assert(tasks[:kill_all])
      assert(tasks[:build])
      assert(tasks[:set_ports])
      assert_equal(tasks[:supporting_services], %w(-d elasticsearch mysql searchisko searchiskoconfigure))
    end

    def test_run_the_stack
      tasks = Options.parse (["--run-the-stack"])
      assert(tasks[:kill_all])
      assert_equal(tasks[:supporting_services], %w(-d elasticsearch mysql searchisko searchiskoconfigure))
      assert_equal(['--no-deps', '--rm', '--service-ports', 'awestruct', 'rake git_setup clean preview[docker]'], tasks[:awestruct_command_args])
    end

    def test_docker_url
      tasks = Options.parse (["-d", "SOMETHING"])
      assert_equal("SOMETHING",tasks[:docker])
    end
end

