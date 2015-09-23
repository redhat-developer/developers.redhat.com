class Options
  def self.parse(args)
    options = {:build => false, :restart => false, :drupal => false,
               :stage_pr => false,
               :awestruct => {:gen => false, :preview => false}}

    opts_parse = OptionParser.new do |opts|
      opts.banner = 'Usage: control.rb [options]'
      opts.separator 'Specific options:'

      docker_message = "Docker client connection info (i.e. tcp://example.com:1000). "\
                       "DOCKER_HOST used if parameter not provided"
      opts.on('-d', '--docker CONNECTION_INFO', String, docker_message) do |d|
        options[:docker] = d
      end

      opts.on('-r', '--restart', 'Restart the containers') do |r|
        options[:restart] = r
      end

      opts.on('-b', '--build', 'Build the containers') do |b|
        options[:build] = b
      end

      opts.on('-g', '--generate', 'Run awestruct (clean gen)') do |r|
        options[:awestruct][:gen] = true
      end

      opts.on('-p', '--preview', 'Run awestruct (clean preview)') do |r|
        options[:awestruct][:preview] = true
      end

      opts.on('-u', '--drupal', 'Start up and enable drupal') do |u|
        options[:drupal] = true
      end

      opts.on('--stage-pr PR_NUMBER', Integer, 'build for PR Staging') do |pr|
        options[:stage_pr] = pr
      end

      # No argument, shows at tail.  This will print an options summary.
      opts.on_tail('-h', '--help', 'Show this message') do
        puts opts
        exit
      end
    end

    opts_parse.parse! args
    options
  end
end

