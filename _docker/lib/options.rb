require_relative 'rhd_environments'

class Options

  def self.parse(args)
    tasks = {}
    tasks[:environment_name] = 'drupal-dev'
    # Defaults for acceptance tests unless overridden
    ENV['RHD_TEST_PROFILE'] = 'desktop'
    ENV['ACCEPTANCE_TEST_DESCRIPTION'] = 'Drupal:FE Acceptance Tests'
    ENV['RHD_DOCKER_DRIVER'] = 'docker_chrome'

    opts_parse = OptionParser.new do |opts|
      opts.banner = 'Usage: control.rb [options]'
      opts.separator 'Specific options:'

      opts.on('-e ENVIRONMENT', String, 'The environment in which to operate (default: drupal-dev)') do | environment |
        tasks[:environment_name] = environment
      end

      opts.on('--rollback-site-to EXPORT_TO_USE', String, 'Rollback the current site to the specified export archive') do | export |
        tasks[:build] = true
        tasks[:docker_pull] = false
        tasks[:awestruct_command_args] = ['--rm', 'rollback', "#{export}"]
        tasks[:supporting_services] = []
      end

      opts.on('--backup [BACKUP_NAME]', String, 'Take a backup of the environment') do |backup|
        tasks[:build] = true
        tasks[:docker_pull] = false
        tasks[:awestruct_command_args] = ['--rm', 'backup', "#{backup}"]
        tasks[:supporting_services] = []
      end

      opts.on('--export [EXPORT_LOCATION]', String, 'Export all content from Drupal within the environment and rsync it to EXPORT_LOCATION') do | export_location |
        tasks[:build] = true
        tasks[:docker_pull] = false
        tasks[:export] = true
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
        tasks[:docker_pull] = false
      end

      opts.on('-b', '--build', 'Build the containers') do |b|
        tasks[:decrypt] = true
        tasks[:unit_tests] = unit_test_tasks
        tasks[:build] = true
        tasks[:supporting_services] = []
        tasks[:docker_pull] = false
      end

      opts.on('-g', '--generate', 'Run awestruct (clean gen)') do |r|
        tasks[:decrypt] = true
        tasks[:awestruct_command_args] = %w(--rm --service-ports awestruct)
        tasks[:supporting_services] = []
        tasks[:docker_pull] = false
      end

      opts.on('-p', '--preview', 'Run awestruct (clean preview)') do |r|
        tasks[:decrypt] = true
        tasks[:awestruct_command_args] = ['--rm', '--service-ports', 'awestruct', "rake git_setup clean preview[docker]"]
        tasks[:supporting_services] = []
      end

      opts.on('--run-the-stack', 'build, restart and preview') do |rts|
        tasks[:decrypt] = true
        tasks[:unit_tests] = unit_test_tasks
        tasks[:build] = true
        tasks[:kill_all] = true
        #tasks[:awestruct_command_args] = %w(--rm --service-ports awestruct)
      end

      opts.on('--no-decrypt','Do not attempt to decrypt the secrets file (secrets are set in the environment)') do
        tasks[:decrypt] = false
      end

      opts.on('--no-pull','Do not attempt to pull the :latest version of the drupal-data image from Docker Hub') do
        tasks[:docker_pull] = false
      end


      #
      # Required during the transition to Drupal PR building. As the Drupal PR job is a downstream of the current
      # PR job, we don't want to kill any environment that is currently running.
      #
      opts.on('--no-kill','Do not attempt to stop the currently running environment (if any)') do
        tasks[:kill_all] = false
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
    environment = RhdEnvironments.new(File.expand_path('../environments',File.dirname(__FILE__))).load_environment(tasks[:environment_name])

    #
    # Abort immediately with an error code if we cannot load the environment specified by the user.
    #
    if environment.nil?
      Kernel.exit(1);
    end

    tasks[:environment] = environment

    #
    # Unless specified explicitly by the --no-pull option, we determine if we should pull the drupal-data image based upon
    # the defaults set by the environment in which we are running.
    #
    if tasks[:docker_pull].nil?
      tasks[:docker_pull] = environment.pull_drupal_data_image?
    end

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
