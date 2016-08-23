require_relative 'rhd_environments'

class Options

  def self.parse(args)
    tasks = {}
    tasks[:environment_name] = 'awestruct-pull-request'

    opts_parse = OptionParser.new do |opts|
      opts.banner = 'Usage: control.rb [options]'
      opts.separator 'Specific options:'

      docker_message = "Docker client connection info (i.e. tcp://example.com:1000). "\
                       "DOCKER_HOST used if parameter not provided"
      opts.on('-d', '--docker CONNECTION_INFO', String, docker_message) do |d|
        tasks[:docker] = d
      end

      opts.on('-e ENVIRONMENT', String, 'The environment in which to operate') do | environment |
        tasks[:environment_name] = environment
      end

      opts.on('--rollback-site-to EXPORT_TO_USE', String, 'Rollback the current site to the specified export archive') do | export |
        tasks[:build] = true
        tasks[:awestruct_command_args] = ['--rm', 'rollback', "#{export}"]
        tasks[:supporting_services] = []
      end

      opts.on('--backup [BACKUP_NAME]', String, 'Take a backup of the environment') do |backup|
        tasks[:build] = true
        tasks[:awestruct_command_args] = ['--rm', 'backup', "#{backup}"]
        tasks[:supporting_services] = []
      end

      opts.on('--export [EXPORT_LOCATION]', String, 'Export all content from Drupal within the environment and rsync it to EXPORT_LOCATION') do | export_location |
        tasks[:build] = true
        tasks[:awestruct_command_args] = ['--rm', 'export']
        if !export_location.nil? && !export_location.empty?
          tasks[:awestruct_command_args] << export_location
        end
      end


      opts.on('-r', '--restart', 'Restart the containers') do |r|
        tasks[:decrypt] = true
        tasks[:kill_all] = true
      end

      opts.on('-t', '--unit-test', 'Run the unit tests') do |b|
        tasks[:unit_tests] = unit_test_tasks
        tasks[:decrypt] = true
        tasks[:build] = true
        tasks[:supporting_services] = []
      end


      opts.on('-b', '--build', 'Build the containers') do |b|
        tasks[:decrypt] = true
        tasks[:unit_tests] = unit_test_tasks
        tasks[:build] = true
        tasks[:supporting_services] = []
      end

      opts.on('-g', '--generate', 'Run awestruct (clean gen)') do |r|
        tasks[:decrypt] = true
        tasks[:awestruct_command_args] = %w(--rm --service-ports awestruct)
        tasks[:supporting_services] = []
      end

      opts.on('-p', '--preview', 'Run awestruct (clean preview)') do |r|
        tasks[:decrypt] = true
        tasks[:awestruct_command_args] = ['--rm', '--service-ports', 'awestruct', "rake git_setup clean preview[docker]"]
        tasks[:supporting_services] = []
      end

      opts.on('--stage-pr PR_NUMBER', Integer, 'build for PR Staging') do |pr|
        tasks[:awestruct_command_args] = ["--rm", "--service-ports", "awestruct", "bundle exec rake create_pr_dirs[pr,build,#{pr}] clean deploy[staging_docker]"]
        tasks[:kill_all] = true
        tasks[:build] = true
        tasks[:unit_tests] = unit_test_tasks
      end

      opts.on('--acceptance_test_target HOST_TO_TEST', String, 'runs the cucumber features against the specified HOST_TO_TEST') do |host|

        ENV['HOST_TO_TEST'] = host

        if ENV['RHD_TEST_PROFILE'].to_s.empty?
          ENV['RHD_TEST_PROFILE']= 'parallel'
        end

        if ENV['RHD_DOCKER_DRIVER'].to_s.empty?
          ENV['RHD_DOCKER_DRIVER'] = 'docker_chrome'
        end

        if ENV['RHD_BROWSER_SCALE'].to_s.empty?
          ENV['RHD_BROWSER_SCALE'] = '2'
        end

        tasks[:kill_all] = false
        tasks[:build] = true
        tasks[:scale_grid] = "#{ENV['RHD_DOCKER_DRIVER']}=#{ENV['RHD_BROWSER_SCALE']}"
        tasks[:supporting_services] = [ENV['RHD_DOCKER_DRIVER']]
        tasks[:acceptance_test_target_task] = ['--rm', '--service-ports','acceptance_tests', "bundle exec rake features HOST_TO_TEST=#{ENV['HOST_TO_TEST']} RHD_JS_DRIVER=#{ENV['RHD_DOCKER_DRIVER']} RHD_TEST_PROFILE=#{ENV['RHD_TEST_PROFILE']}"]
      end

      opts.on('--docker-pr-reap', 'Reap Old Pull Requests') do |pr|
        tasks[:awestruct_command_args] = ["--no-deps", "--rm", "--service-ports", "awestruct", "bundle exec rake reap_old_pulls[pr]"]
        tasks[:supporting_services] = []
        tasks[:build] = true
      end

      opts.on('--docker-nightly', 'build for docker nightly') do |pr|
        tasks[:awestruct_command_args] = ["--rm", "--service-ports", "awestruct", "bundle exec rake create_pr_dirs[docker-nightly,build,docker-nightly] clean deploy[staging_docker]"]
        tasks[:kill_all] = true
        tasks[:build] = true
        tasks[:unit_tests] = unit_test_tasks
      end

      opts.on('--run-the-stack', 'build, restart and preview') do |rts|
        tasks[:decrypt] = true
        tasks[:unit_tests] = unit_test_tasks
        tasks[:build] = true
        tasks[:kill_all] = true
        tasks[:awestruct_command_args] = %w(--rm --service-ports awestruct)
      end

      opts.on('--no-decrypt','Do not attempt to decrypt the secrets file (secrets are set in the environment)') do
        tasks[:decrypt] = false
      end


      # No argument, shows at tail.  This will print an options summary.
      opts.on_tail('-h', '--help', 'Show this message') do
        puts opts
        exit
      end
    end

    if args.empty?
     args += ['-h'] #Show the help
    end

    opts_parse.parse! args

    testing_directory = File.expand_path('../environments/testing',File.dirname(__FILE__))
    environment = RhdEnvironments.new(File.expand_path('../environments',File.dirname(__FILE__)), testing_directory).load_environment(tasks[:environment_name])
    tasks[:environment] = environment

    #
    # Set the list of supporting services to be started from the environment, unless the options above explicitly set it first
    # For example: the reap-pr option doesn't require any supporting services, so we don't want to set them here from the
    # environment.
    #
    if !tasks[:supporting_services]
      tasks[:supporting_services] = environment.get_supporting_services
    end
    tasks
  end

  def self.unit_test_tasks
    %w(--no-deps --rm unit_tests)
  end

end
