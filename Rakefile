# This file is a rake build file. The purpose of this file is to simplify
# setting up and using Awestruct. It's not required to use Awestruct, though it
# does save you time (hopefully). If you don't want to use rake, just ignore or
# delete this file.
#
# If you're just getting started, execute this command to install Awestruct and
# the libraries on which it depends:
#
#  rake setup
#
# The setup task installs the necessary libraries according to which Ruby
# environment you are using. If you want the libraries kept inside the project,
# execute this command instead:
#
#  rake setup[local]
#
# IMPORTANT: To install gems, you'll need development tools on your machine,
# which include a C compiler, the Ruby development libraries and some other
# development libraries as well.
#
# There are also tasks for running Awestruct. The build will auto-detect
# whether you are using Bundler and, if you are, wrap calls to awestruct in
# `bundle exec`.
#
# To run in Awestruct in development mode, execute:
#
#  rake
#
# To clean the generated site before you build, execute:
#
#  rake clean preview
#
# To deploy using the production profile, execute:
#
#  rake deploy
#
# To get a list of all tasks, execute:
#
#  rake -T
#
# Now you're Awestruct with rake!

$sprites = ['images/branding/product-logos', 'images/design/get-involved', 'images/design/get-started', 'images/design/theme-dark', 'images/design/theme-light', 'images/icons']
$use_bundle_exec = true
$install_gems = ['awestruct -v "~> 0.5.3"', 'rb-inotify -v "~> 0.9.0"']
$awestruct_cmd = nil
task :default => :preview

desc 'Setup the environment to run Awestruct'
task :setup, [:env] => :init do |task, args|
  next if !which('awestruct').nil?

  if File.exist? 'Gemfile'
    if args[:env] == 'local'
      require 'fileutils'
      FileUtils.remove_file 'Gemfile.lock', true
      FileUtils.remove_dir '.bundle', true
      system 'bundle install --binstubs=_bin --path=.bundle'
    else
      system 'bundle install'
    end
  else
    if args[:env] == 'local'
      $install_gems.each do |gem|
        msg "Installing #{gem}..."
        system "gem install --bindir=_bin --install-dir=.bundle #{gem}"
      end
    else
      $install_gems.each do |gem|
        msg "Installing #{gem}..."
        system "gem install #{gem}"
      end
    end
  end
  msg 'Run awestruct using `awestruct` or `rake`'
  # Don't execute any more tasks, need to reset env
  exit 0
end

desc 'Update the environment to run Awestruct'
task :update => [:init, :bundler_update, :git_update, :regen_sprites] do
  # Don't execute any more tasks, need to reset env
  exit 0
end

desc 'Update bundler environment'
task :bundler_update do
  if File.exist? 'Gemfile'
    system 'bundle update'
  else
    system 'gem update awestruct'
  end 
end

desc 'Update and initialize any git submodules'
task :git_update do
  system 'git submodule update --init'
end

desc 'Regenerate sprites'
task :regen_sprites do
  $sprites.each do |p|
    sprite(p)
  end
end

desc 'Build and preview the site locally in development mode'
task :preview, [:profile] => :check do |task, args|
  run_awestruct "-P #{args[:profile] || 'development'} -a -s --force"
end

desc 'Generate the site using the defined profile, or development if none is given'
task :gen, [:profile] => :check do |task, args|
  run_awestruct "-P #{args[:profile] || 'development'} -g --force"
end

desc 'Push local commits to origin/master'
task :push do
  system 'git push --tags origin master'
end

desc 'Tag the source files'
task :tag, :tag_name do |task, args|
  system "git tag #{args[:tag_name]}" unless args[:tag_name].nil?
end

desc 'Generate the site and deploy using the given profile'
task :deploy, [:profile, :tag_name] => [:check, :tag, :push] do |task, args| 
  run_awestruct "-P #{args[:profile]} -g --force"
  require 'yaml'
  require 'shellwords'

  config = YAML.load_file('_config/site.yml')
  profile = config['profiles'][args[:profile]]

  # Deploy the site
  deploy_config = profile['deploy']
  site_host = Shellwords.escape(deploy_config['host'])
  site_path = Shellwords.escape(deploy_config['path'])
  local_site_path = '_site' # HACK!!
  
  rsync(local_site_path, site_host, site_path, true)

  # Update the resources on the CDN
  if config['cdn_http_base'] || profile['cdn_http_base']
    cdn_host = Shellwords.escape(deploy_config['cdn_host'])
    cdn_path = Shellwords.escape(deploy_config['cdn_path'])
    local_cdn_path = '_tmp/cdn' # HACK!!

    rsync(local_cdn_path, cdn_host, cdn_path)
  end
end

desc 'Clean out generated site and temporary files'
task :clean, :spec do |task, args|
  require 'fileutils'
  dirs = ['.awestruct', '.sass-cache', '_site']
  if args[:spec] == 'all'
    dirs << '_tmp'
  end
  dirs.each do |dir|
    FileUtils.remove_dir dir unless !File.directory? dir
  end
end

# Perform initialization steps, such as setting up the PATH
task :init do
  # Detect using gems local to project
  if File.exist? '_bin'
    ENV['PATH'] = "_bin#{File::PATH_SEPARATOR}#{ENV['PATH']}"
    ENV['GEM_HOME'] = '.bundle'
  end
end

desc 'Check to ensure the environment is properly configured'
task :check => :init do
  if !File.exist? 'Gemfile'
    if which('awestruct').nil?
      msg 'Could not find awestruct.', :warn
      msg 'Run `rake setup` or `rake setup[local]` to install from RubyGems.'
      # Enable once the rubygem-awestruct RPM is available
      #msg 'Run `sudo yum install rubygem-awestruct` to install via RPM. (Fedora >= 18)'
      exit 1
    else
      $use_bundle_exec = false
      next
    end
  end

  begin
    require 'bundler'
    Bundler.setup
  rescue LoadError
    $use_bundle_exec = false
  rescue StandardError => e
    msg e.message, :warn
    if which('awestruct').nil?
      msg 'Run `rake setup` or `rake setup[local]` to install required gems from RubyGems.'
    else
      msg 'Run `rake update` to install additional required gems from RubyGems.'
    end
    exit e.status_code
  end
end

desc 'Generate site from Travis CI and publish site.'
task :travis do

  # Default values
  profile = 'filemgmt'
  deploy_url=ENV['master_deploy_url'].to_s

  # if this is a pull request, do a simple build of the site and stop
  if ENV['TRAVIS_PULL_REQUEST'].to_s.to_i > 0
    puts 'Pull request detected. Executing build only.'
    system "bundle exec awestruct -P #{profile} -g"
    next
  end

  if ENV['TRAVIS_BRANCH'].to_s.scan(/^production$/).length > 0

    puts 'Building production branch build.'
    profile = 'filemgmt'
    deploy_url=ENV['production_deploy_url'].to_s

  elsif ENV['TRAVIS_BRANCH'].to_s.scan(/^master$/).length > 0

    puts 'Building staging(master) branch build.'
    profile = 'filemgmt'
    deploy_url=ENV['master_deploy_url'].to_s

  else

    puts ENV['TRAVIS_BRANCH'].to_s + ' branch is not configured for Travis builds - skipping.'
    next

  end

  # Build execution
  system "bundle exec awestruct -P #{profile} -g"

  # Deploying
  puts "Deploying build result to #{deploy_url}"
  system "rsync --protocol=29 -r -l -i --no-p --no-g --chmod=Dg+sx,ug+rw _site/* #{deploy_url}"
end


# Execute Awestruct
def run_awestruct(args)
  system "#{$use_bundle_exec ? 'bundle exec ' : ''}awestruct #{args}" 
end

# A cross-platform means of finding an executable in the $PATH.
# Respects $PATHEXT, which lists valid file extensions for executables on Windows
#
#  which 'awestruct'
#  => /usr/bin/awestruct
def which(cmd, opts = {})
  unless $awestruct_cmd.nil? || opts[:clear_cache]
    return $awestruct_cmd
  end

  $awestruct_cmd = nil
  exts = ENV['PATHEXT'] ? ENV['PATHEXT'].split(';') : ['']
  ENV['PATH'].split(File::PATH_SEPARATOR).each do |path|
    exts.each do |ext|
      candidate = File.join path, "#{cmd}#{ext}"
      if File.executable? candidate
        $awestruct_cmd = candidate
        return $awestruct_cmd
      end
    end
  end
  return $awestruct_cmd
end

# Print a message to STDOUT
def msg(text, level = :info)
  case level
  when :warn
    puts "\e[31m#{text}\e[0m"
  else
    puts "\e[33m#{text}\e[0m"
  end
end

def rsync(local_path, host, remote_path, delete = false)
  msg "Deploying #{local_path} to #{host}:#{remote_path} via rsync"
  open3 "rsync -Pqacz --chmod=Dg+sx,ug+rw --protocol=28 #{delete ? '--delete' : ''} #{local_path}/ #{host}:#{remote_path}"
end

def sprite(path)
  system "compass sprite --force \"#{path}/*.png\""
end

def open3(cmd)
  require 'open3'
  Open3.popen3( cmd ) do |_, stdout, stderr|
    threads = []
    threads << Thread.new(stdout) do |i|
      while ( ! i.eof? )
        msg i.readline
      end
    end
    threads << Thread.new(stderr) do |i|
      while ( ! i.eof? )
        msg i.readline, :error
      end
    end
    threads.each{|t|t.join}
  end
end

