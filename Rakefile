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
$resources = ['stylesheets', 'javascripts', 'images']
$use_bundle_exec = true
$install_gems = ['awestruct -v "~> 0.5.3"', 'rb-inotify -v "~> 0.9.0"']
$awestruct_cmd = nil
$remote = ENV['DEFAULT_REMOTE'] || 'origin'
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
  run_awestruct "-P #{args[:profile] || 'development'} -a -s --force -q"
end

desc 'Generate the site using the defined profile, or development if none is given'
task :gen, [:profile] => :check do |task, args|
  run_awestruct "-P #{args[:profile] || 'development'} -g --force -q"
end

desc "Push local commits to #{$remote}/master"
task :push => :init do
  system "git push --tags #{$remote} master"
end

desc 'Tag the source files'
task :tag, [:profile, :tag_name] do |task, args|
  $config ||= config args[:profile]
  if $config['require_tag'] && args[:tag_name].nil?
    msg "Must specify tag_name", :warn
    exit 1
  end
  if !args[:tag_name].nil?
    msg "Tagging '#{args[:tag_name]}'"
    system "git tag #{args[:tag_name]}" 
  end
end

desc 'Generate the site and deploy using the given profile'
task :deploy, [:profile, :tag_name] => [:check, :tag, :push] do |task, args| 
  run_awestruct "-P #{args[:profile]} -g --force -q"

  $config ||= config args[:profile]

  LOCAL_CDN_PATH = Pathname.new('_tmp').join('cdn') # HACK!!
  local_site_path = '_site' # HACK!!

  if args[:tag_name]
    local_tagged_path = LOCAL_CDN_PATH.join(args[:tag_name])
    # Collect our resources into a tagged group, for others to use
    FileUtils.mkdir_p local_tagged_path
    $resources.each do |r|
      FileUtils.cp_r Pathname.new(local_site_path).join(r), local_tagged_path
    end
  end
  
  # Update the resources on the CDN
  if $config['cdn_http_base']
    cdn_host = $config.deploy.cdn_host
    cdn_path = $config.deploy.cdn_path
    rsync(local_path: LOCAL_CDN_PATH, host: cdn_host, remote_path: cdn_path)
  end

  if !$config['robots']
    $resources << 'robots.txt'
  end

  # Deploy the site
  site_host = $config.deploy.host
  site_path = $config.deploy.path
  
  
  rsync(local_path: local_site_path, host: site_host, remote_path: site_path, delete: true, excludes: $resources)

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
task :init, [:profile] do
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
    msg 'Pull request detected. Executing build only.'
    system "bundle exec awestruct -P #{profile} -g"
    next
  end

  if ENV['TRAVIS_BRANCH'].to_s.scan(/^production$/).length > 0

    msg 'Building production branch build.'
    profile = 'filemgmt'
    deploy_url=ENV['production_deploy_url'].to_s

  elsif ENV['TRAVIS_BRANCH'].to_s.scan(/^master$/).length > 0

    msg 'Building staging(master) branch build.'
    profile = 'filemgmt'
    deploy_url=ENV['master_deploy_url'].to_s

  else

    msg ENV['TRAVIS_BRANCH'].to_s + ' branch is not configured for Travis builds - skipping.'
    next

  end

  # Build execution
  system "bundle exec awestruct -P #{profile} -g"

  # Deploying
  msg "Deploying build result to #{deploy_url}"
  system "rsync --protocol=29 -r -l -i --no-p --no-g --chmod=Dg+sx,ug+rw _site/* #{deploy_url}"
end


# Execute Awestruct
def run_awestruct(args)
  unless system "#{$use_bundle_exec ? 'bundle exec ' : ''}awestruct #{args}"
    exit 0
  end
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

def rsync(local_path:, host:, remote_path:, delete: false, excludes: [])
  msg "Deploying #{local_path} to #{host}:#{remote_path} via rsync"
  cmd = "rsync -PqaczO --chmod=Dg+sx,ug+rw --protocol=28 #{'--delete ' if delete} #{excludes.collect { |e| "--exclude " + e}.join(" ")} #{local_path}/ #{host}:#{remote_path}"
  open3 cmd
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

def config(profile = nil)
  load_site_yaml "_config/site.yml", profile
end

def load_site_yaml(yaml_path, profile = nil)
  require 'awestruct/astruct'
  require 'awestruct/page'
  config = Awestruct::AStruct.new
  if ( File.exist?( yaml_path ) )
    require 'yaml'    
    data = YAML.load( File.read( yaml_path ) )
    if ( profile )
      profile_data = {}
      data.each do |k,v|
        if ( ( k == 'profiles' ) && ( ! profile.nil? ) )
          profile_data = ( v[profile] || {} )
        else
          config.send( "#{k}=", merge_data( config.send( "#{k}" ), v ) )
        end
      end if data
      config.profile = profile
      profile_data.each do |k,v|
        config.send( "#{k}=", merge_data(config.send( "#{k}" ), v ) )
      end
    else
      data.each do |k,v|
        config.send( "#{k}=", v )
      end if data
    end
  end
  config
end

def merge_data(existing, new)
  if existing.kind_of? Hash
    result = existing.inject({}) do |merged, (k,v)|
      if new.has_key? k
        if v.kind_of? Hash
          merged[k] = merge_data(v, new.delete(k))
        else
          merged[k] = new.delete(k)
        end
      else
        merged[k] = v
      end
      merged
    end
    result.merge new
  else
    new
  end
end

