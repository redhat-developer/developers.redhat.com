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
        if tasks[:drupal].nil?
          tasks[:awestruct_command_args] = ['--no-deps', '--rm', '--service-ports', 'awestruct', "rake git_setup clean preview[docker]"]
        else
          tasks[:awestruct_command_args] = ['--rm', '--service-ports', 'awestruct', "rake git_setup clean preview[drupal]"]
        end
      end

      opts.on('-p', '--preview', 'Run awestruct (clean preview)') do |r|
        tasks[:decrypt] = true
        if tasks[:drupal].nil?
          tasks[:awestruct_command_args] = ['--no-deps', '--rm', '--service-ports', 'awestruct', "rake git_setup clean preview[docker]"]
        else
          tasks[:awestruct_command_args] = ['--rm', '--service-ports', 'awestruct', "rake git_setup clean preview[drupal]"]
        end
      end

      opts.on('-u', '--drupal', 'Start up and enable drupal') do |u|
        tasks[:drupal] = true
        tasks[:supporting_services] += %w(drupal drupalmysql)
        tasks[:awestruct_command_args] = ['--rm', '--service-ports', 'awestruct', 'rake git_setup clean gen[drupal]']
      end

      opts.on('--stage-pr PR_NUMBER', Integer, 'build for PR Staging') do |pr|
        tasks[:awestruct_command_args] = ["--no-deps", "--rm", "--service-ports", "awestruct", "bundle exec rake create_pr_dirs[docker-pr,build,#{pr}] clean deploy[staging_docker]"]
        tasks[:kill_all] = true
        tasks[:build] = true
        tasks[:set_ports] = true
        tasks[:supporting_services] += %w(elasticsearch mysql searchisko searchiskoconfigure)
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
        if tasks[:drupal].nil?
          tasks[:awestruct_command_args] = ['--no-deps', '--rm', '--service-ports', 'awestruct', "rake git_setup clean preview[docker]"]
        else
          tasks[:awestruct_command_args] = ['--rm', '--service-ports', 'awestruct', "rake git_setup clean preview[drupal]"]
        end
      end

      # No argument, shows at tail.  This will print an options summary.
      opts.on_tail('-h', '--help', 'Show this message') do
        puts opts
        exit
      end
    end

    opts_parse.parse! args
    tasks
  end
end
