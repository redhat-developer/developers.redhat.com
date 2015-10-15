class Options
  def self.parse(args)
    tasks = {supporting_services: %w(-d)}

    opts_parse = OptionParser.new do |opts|
      opts.banner = 'Usage: control.rb [options]'
      opts.separator 'Specific options:'

      docker_message = "Docker client connection info (i.e. tcp://example.com:1000). "\
                       "DOCKER_HOST used if parameter not provided"
      opts.on('-d', '--docker CONNECTION_INFO', String, docker_message) do |d|
        tasks[:docker] = d
      end

      opts.on('-r', '--restart', 'Restart the containers') do |r|
        tasks[:decrypt] = true
        tasks[:set_ports] = true
        tasks[:kill_all] = true
        tasks[:supporting_services] += %w(elasticsearch mysql searchisko searchiskoconfigure)
      end

      opts.on('-b', '--build', 'Build the containers') do |b|
        tasks[:decrypt] = true
        tasks[:set_ports] = true
        tasks[:build] = true
      end

      opts.on('-g', '--generate', 'Run awestruct (clean gen)') do |r|
        tasks[:decrypt] = true
        tasks[:awestruct_command_args] = ['--no-deps', '--rm', '--service-ports', 'awestruct',
                                          "rake clean gen[#{tasks[:drupal].nil? ? 'docker':'drupal'}]"]
      end

      opts.on('-p', '--preview', 'Run awestruct (clean preview)') do |r|
        tasks[:decrypt] = true
        tasks[:awestruct_command_args] = ['--no-deps', '--rm', '--service-ports', 'awestruct',
                                          "rake git_setup clean preview[#{tasks[:drupal].nil? ? 'docker':'drupal'}]"]
      end

      opts.on('-u', '--drupal', 'Start up and enable drupal') do |u|
        tasks[:drupal] = true
        tasks[:supporting_services] += %w(drupal drupalmysql)
        tasks[:awestruct_command_args] = ['--no-deps', '--rm', '--service-ports', 'awestruct', 'rake git_setup clean gen[drupal]']
      end

      opts.on('--stage-pr PR_NUMBER', Integer, 'build for PR Staging') do |pr|
        tasks[:awestruct_command_args] = ["--no-deps", "--rm", "--service-ports", "awestruct", "bundle exec rake create_pr_dirs[docker-pr,build,#{pr}] clean deploy[staging_docker]"]
        tasks[:kill_all] = true
        tasks[:build] = true
        tasks[:set_ports] = true
        tasks[:supporting_services] += %w(elasticsearch mysql searchisko searchiskoconfigure)
      end

      opts.on('--acceptance_test_target[=HOST_TO_TEST]', String, 'runs the cucumber features. If you do not specify HOST_TO_TEST then http://localhost:32768 is used') do |f|
        ENV['HOST_TO_TEST'] = f ||= 'http://localhost:32768'
        tasks[:acceptance_test_target_task] = ["--no-deps", "--rm", "--service-ports", "awestruct", "bundle exec rake acceptance_test_target"]
        tasks[:build] = true
        tasks[:set_ports] = true
      end

      opts.on('--docker-nightly', 'build for PR Staging') do |pr|
        tasks[:awestruct_command_args] = ["--no-deps", "--rm", "--service-ports", "awestruct", "bundle exec rake create_pr_dirs[docker-nightly,build,docker-nightly] clean deploy[staging_docker]"]
        tasks[:kill_all] = true
        tasks[:build] = true
        tasks[:set_ports] = true
        tasks[:supporting_services] += %w(elasticsearch mysql searchisko searchiskoconfigure)
      end

      opts.on('--run-the-stack', 'build, restart and preview') do |rts|
        tasks[:decrypt] = true
        tasks[:set_ports] = true
        tasks[:build] = true
        tasks[:kill_all] = true
        tasks[:supporting_services] += %w(elasticsearch mysql searchisko searchiskoconfigure)
        tasks[:awestruct_command_args] = ['--no-deps', '--rm', '--service-ports', 'awestruct',
                                          "rake git_setup clean preview[#{tasks[:drupal].nil? ? 'docker':'drupal'}]"]
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

    #Flag to see if anything was set it supporting_services
    tasks[:should_start_supporting_services] = tasks[:supporting_services].size > 1
    tasks
  end
end

