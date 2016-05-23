#For instructions on usage see the README file
require "minitest/reporters"
require 'rake/testtask'
require 'net/http'
require 'uri'
require 'json'
require 'date'
require 'tmpdir'

require_relative './_lib/reaper'
require_relative './_lib/github'
require_relative './_lib/jenkins'
require_relative './_lib/jira'

load './_cucumber/cucumber.rake'

$github_org = "redhat-developer"
$github_repo = "developers.redhat.com"
$resources = ['stylesheets', 'javascripts', 'images']
$use_bundle_exec = true
$install_gems = ['awestruct -v "~> 0.5.3"', 'rb-inotify -v "~> 0.9.0"']
$awestruct_cmd = nil
$remote = ENV['DEFAULT_REMOTE'] || 'origin'
task :default => :preview

def wrap_with_progress(sha, rake_task, target_url, context, description, args)
  begin
    options = {:context => context, :description => "#{description} pending", :target_url => target_url}
    GitHub.update_status($github_org, $github_repo, sha, "pending", options)
    rake_task.invoke(*args.to_a)
    options[:description] = "#{description} finished ok!"
    GitHub.update_status($github_org, $github_repo, sha, "success", options)
  rescue => e
    puts e
    options[:description] = "#{description} failed"
    puts GitHub.update_status($github_org, $github_repo, sha, "failure", options)
  end
end

desc 'Setup the environment to run Awestruct'
task :test => :clear_status do |task, args|
  if ENV['ghprbActualCommit'].to_s.empty?
    Rake::Task[:internal_test_task].invoke(args)
  else
    wrap_with_progress(ENV['ghprbActualCommit'], Rake::Task[:internal_test_task], ENV["BUILD_URL"], "Unit Tests", 'Unit testing', args)
  end
end

Rake::TestTask.new do |t|
  t.name = :internal_test_task
  t.libs = ["_docker/lib"]
  t.warning = false
  t.verbose = true
  t.test_files = FileList['_docker/tests/**/*.rb', '_tests/*.rb'] #Let's add more files here!
end

desc 'Setup the environment to run Awestruct'
task :setup, [:env] => [:init, :bundle_install, :git_setup] do |task, args|
  # Don't execute any more tasks, need to reset env
  exit 0
end

task :bundle_install, [:env] do |task, args|
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
end

desc 'Update the environment to run Awestruct'
task :update => [:init, :git_setup] do
  # Don't execute any more tasks, need to reset env
  exit 0
end

desc 'Initialize any git submodules'
task :git_setup do
  system 'git submodule foreach \'git fetch --tags\''
  system 'git submodule update --init'
end

desc 'Build and preview the site locally in development mode'
task :preview, [:profile] => :check do |task, args|
  profile = args[:profile] || 'development'
  run_awestruct "-P #{profile} -a -s --force -q --auto --livereload -b 0.0.0.0"
end

desc 'Build and preview the site locally in development mode without live reload to allow test to work'
task :preview_no_reload, [:profile] => :check do |task, args|
  profile = args[:profile] || 'development'
  run_awestruct "-P #{profile} -a -s --force -q --auto -b 0.0.0.0"
end

desc 'Generate the site using the defined profile, or development if none is given'
task :gen, [:profile] => :check do |task, args|
  run_awestruct "-P #{args[:profile] || 'development'} -g --force -q -w"
end

desc "Push local commits to #{$remote}/master"
task :push, [:profile, :tag_name] => :init do |task, args|
  if !args[:tag_name].nil?
    msg "Pushing tags"
    system "git push --tags #{$remote} master"
  end
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

desc 'Clears all status to pending'
task :clear_status do |task, args|
  if ENV['ghprbActualCommit'].to_s != ''
    msg "clearing all status for #{ENV['ghprbActualCommit']}"
    GitHub.all_status_to_pending($github_org, $github_repo, ENV['ghprbActualCommit'], ENV['BUILD_URL'])
  end
end

task :deploy, [:profile, :tag_name] => [:check, :tag, :push]  do |task, args|
  msg "running deploy task with #{args}"
  if ENV['ghprbActualCommit'].to_s.empty?
    Rake::Task[:internal_deploy_task].invoke(*args.to_a)
  else
    wrap_with_progress(ENV['ghprbActualCommit'], Rake::Task[:internal_deploy_task], "#{ENV['site_base_path']}/#{ENV['site_path_suffix']}", "Site Preview", 'Site preview deployement', args)
  end
end

desc 'Generate the site and deploy using the given profile'
task :internal_deploy_task, [:profile, :tag_name] do |task, args|
  msg "running internal deploy task with #{args}"
  msg "SEARCHISKO_HOST_PORT: #{ENV['SEARCHISKO_HOST_PORT']}"
  # Delay awestruct failing the build until after we rsync files, if we are staging.
  # Allows errors to be viewed
  begin
    run_awestruct "-P #{args[:profile]} -g --force -w"
  rescue
    msg 'awestruct_failed, exit'
    exit 1
  end

  $config ||= config args[:profile]

  LOCAL_CDN_PATH = Pathname.new('_tmp').join('cdn') # HACK!!
  local_site_path = '_site' # HACK!!

  # Update the resources on the CDN.
  if $config['cdn_http_base']
    cdn_host = $config.deploy.cdn_host
    cdn_path = $config.deploy.cdn_path

    if args[:tag_name]
      local_originals_path = LOCAL_CDN_PATH.join(args[:tag_name])
    else
      if ENV['site_path_suffix']
        local_originals_path = LOCAL_CDN_PATH.join("#{ENV['site_path_suffix']}").join("originals")
      else
        local_originals_path = LOCAL_CDN_PATH.join("originals")
      end
    end

    # Collect our original resources, for others to use
    FileUtils.mkdir_p local_originals_path
    $resources.each do |r|
      src = Pathname.new(local_site_path).join(r)
      FileUtils.cp_r src, local_originals_path if File.exist? src
    end

    rsync(local_path: LOCAL_CDN_PATH, host: cdn_host, remote_path: cdn_path)
  end

  # Deploy the site
  # If we are running a non-site root build (e.g. Pull Request) we alter where the site is copied too, and we don't delete
  if ENV['site_path_suffix']
    site_path = "#{$config.deploy.path}/#{ENV['site_path_suffix']}"
    delete = false
  else
    site_path = $config.deploy.path
    delete = true
  end
  site_host = $config.deploy.host
  rsync(local_path: local_site_path, host: site_host, remote_path: site_path, delete: delete, excludes: $resources + ['.snapshot'])
end

desc 'Clean out generated site and temporary files'
task :clean, :spec do |task, args|
  msg 'running clean'
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

desc 'Comment to any mentioned JIRA issues that the changes can now be viewed. Close the issue, if it is in the resolved state already.'
task :comment_and_close_jiras, [:job, :build_number, :deploy_url] do |task, args|
  jenkins = Jenkins.new
  jira = JIRA.new

  # Read the changes
  changes = jenkins.read_changes(args[:job], args[:build_number])

  # Comment on any JIRAs
  jira.comment_issues(changes[:issues], "Successfully deployed to #{args[:deploy_url]} at #{Time.now}")
end

desc 'Comment to any mentioned JIRA issues that the changes can now be viewed. Close the issue, if it is in the resolved state already.'
task :list_jiras, [:job, :build_number] do |task, args|
  jenkins = Jenkins.new

  # Read the changes
  changes = jenkins.read_changes(args[:job], args[:build_number])

  msg changes[:issues]
end

desc 'Comment to any mentioned JIRA issues that the changes can now be viewed.'
task :comment_jiras_from_git_log, [:deploy_url, :not_on] do |task, args|
  jira = JIRA.new
  git = Git.new

  # Comment on any JIRAs
  jira.comment_issues(git.extract_issues('HEAD', args[:not_on]), "Successfully deployed to #{args[:deploy_url]} at #{Time.now}")
end

desc 'Link pull requests to JIRAs.'
task :link_pull_requests_from_git_log, [:pull_request, :not_on] do |task, args|
  jira = JIRA.new
  git = Git.new

  # Link pull requests to JIRA
  linked_issues = jira.link_pull_requests_if_unlinked(git.extract_issues('HEAD', args[:not_on]), args[:pull_request])
  # Add links to JIRA to pull requests
  GitHub.link_issues($github_org, $github_repo, args[:pull_request], linked_issues)
  msg "Successfully commented JIRA issue list on https://github.com/#{$github_org}/#{$github_repo}/pull/#{args[:pull_request]}"
end

desc 'Remove staged pull builds for pulls closed more than 7 days ago in docker'
task :reap_old_pulls_docker do |task|
  reap = GitHub.list_closed_pulls($github_org, $github_repo)
  Reaper.kill_and_remove_prs(reap)
end

desc "Kill a particular pull request, helpful as docker compose wont stop 'run' commands"
task :reap_pr_docker, [:pr] do |task, args|
  pr = args[:pr]
  puts "Going to kill #{pr}"
  as_array = [pr]
  Reaper.kill_and_remove_prs(as_array)
end


desc 'Remove staged pull builds for pulls closed more than 7 days ago'
task :reap_old_pulls, [:pr_prefix] do |task, args|
  reap = GitHub.list_closed_pulls($github_org, $github_repo)
  msg "There are #{reap.size} issues to reap"
  $staging_config ||= config 'staging'
  Dir.mktmpdir do |empty_dir|
    reap.each do |p|
      msg "Reaping staging and cdn for Pull ##{p}"
      # Clear the path on the html staging server
      rsync(local_path: empty_dir, host: $staging_config.deploy.host, remote_path: "#{$staging_config.deploy.path}/#{args[:pr_prefix]}/#{p}", delete: true, ignore_non_existing: true)
      # Clear the path on the cdn
      rsync(local_path: empty_dir, host: $staging_config.deploy.cdn_host, remote_path: "#{$staging_config.deploy.cdn_path}/#{args[:pr_prefix]}/#{p}", delete: true, ignore_non_existing: true)
    end
  end
end

desc 'Make sure Pull Request dirs exist'
task :create_pr_dirs, [:pr_prefix, :build_prefix, :pull] do |task, args|
  msg 'running create_pr_dirs'
  $staging_config ||= config 'staging'
  Dir.mktmpdir do |empty_dir|
    rsync(local_path: empty_dir, host: $staging_config.deploy.host, remote_path: "#{$staging_config.deploy.path}/#{args[:pr_prefix]}")
    rsync(local_path: empty_dir, host: $staging_config.deploy.host, remote_path: "#{$staging_config.deploy.path}/#{args[:pr_prefix]}/#{args[:pull]}")
    rsync(local_path: empty_dir, host: $staging_config.deploy.host, remote_path: "#{$staging_config.deploy.path}/#{args[:pr_prefix]}/#{args[:pull]}/#{args[:build_prefix]}")
    rsync(local_path: empty_dir, host: $staging_config.deploy.cdn_host, remote_path: "#{$staging_config.deploy.cdn_path}/#{args[:pr_prefix]}")
    rsync(local_path: empty_dir, host: $staging_config.deploy.cdn_host, remote_path: "#{$staging_config.deploy.cdn_path}/#{args[:pr_prefix]}/#{args[:pull]}")
    rsync(local_path: empty_dir, host: $staging_config.deploy.cdn_host, remote_path: "#{$staging_config.deploy.cdn_path}/#{args[:pr_prefix]}/#{args[:pull]}/#{args[:build_prefix]}")
  end
end

desc 'Generate a wraith config file'
task :generate_wraith_config, [:old, :new, :pr_prefix, :build_prefix, :pull, :build] do |task, args|
  require 'yaml/store'

  cfg = '_wraith/configs/config.yaml'
  FileUtils.cp '_wraith/configs/template_config.yaml', cfg
  config = YAML::Store.new(cfg)

  new_path = "#{args[:new]}/#{args[:pr_prefix]}/#{args[:pull]}/#{args[:build_prefix]}/#{args[:build]}"

  config.transaction do
    config['domains']['production'] = args[:old]
    config['domains']['pull-request'] = new_path
    config['sitemap'] = "#{new_path}/sitemap.xml"
  end
end

desc 'Run wraith'
task :wraith, [:old, :new, :pr_prefix, :build_prefix, :pull, :build] => :generate_wraith_config do |task, args|
  $staging_config ||= config 'staging'
  Dir.chdir("_wraith")
  unless system "bundle exec wraith capture config"
    exit 1
  end
  wraith_base_path = "#{args[:pr_prefix]}/#{args[:pull]}/wraith"
  wraith_path = "#{wraith_base_path}/#{args[:build]}"
  Dir.mktmpdir do |empty_dir|
    rsync(local_path: empty_dir, host: $staging_config.deploy.host, remote_path: "#{$staging_config.deploy.path}/#{wraith_base_path}")
  end
  rsync(local_path: 'shots', host: $staging_config.deploy.host, remote_path: "#{$staging_config.deploy.path}/#{wraith_path}")
  GitHub.comment_on_pull($github_org, $github_repo, args[:pull], "Visual diff: #{args[:new]}/#{wraith_path}/gallery.html")
end

def create_subdirectories_for_rync(path_to_create)
    empty_dir = Dir.mktmpdir

    ordered = path_to_create.split("/").select{|x| x != ""}

    builtupPath = ""
    ordered.each do |p|
      builtupPath += "/#{p}"
      rsync(local_path: empty_dir, host: $staging_config.deploy.host, remote_path: "#{$staging_config.deploy.path}#{builtupPath}")
    end
    builtupPath
end

desc 'Run blinkr'
task :blinkr, [:host_to_test, :report_path, :report_host, :verbose] do |task, args|
  host_to_test = args[:host_to_test]
  puts "host_to_test: #{host_to_test}"
  report_path = args[:report_path]
  puts "report_path: #{report_path}"
  report_host = args[:report_host]
  puts "report_host: #{report_host}"
  sha = ENV['ghprbActualCommit']
  should_update_status = sha.to_s != ""
  puts "should_update_status:#{should_update_status}"
  options = {:context => 'Blinkr', :description => 'Blinkr pending', :target_url => ENV["BUILD_URL"]}

  begin
    if should_update_status
      puts "adding pending to status"
      GitHub.update_status($github_org, $github_repo, sha, "pending", options)
    end

    $staging_config ||= config 'staging'
    verbose_switch = args[:verbose] == 'verbose' ? '-v' : ''
    FileUtils.rm_rf("_tmp/blinkr")
    FileUtils.mkdir_p("_tmp/blinkr")

    unless system "bundle exec blinkr -c _config/blinkr.yaml -u #{host_to_test} #{verbose_switch}"
      options[:description] = "Blinkr failed (bundle error)"
      if should_update_status
        puts "adding error to status"
        puts GitHub.update_status($github_org, $github_repo, sha, "error", options)
      end
      exit 1
    end

    if report_path.to_s != "" && report_host.to_s != ""
      report_filename = File.basename YAML::load_file('_config/blinkr.yaml')['report']
      report_path = create_subdirectories_for_rync(report_path)
      rsync(local_path: '_tmp/blinkr', host: $staging_config.deploy.host, remote_path: "#{$staging_config.deploy.path}#{report_path}")
      options[:target_url] = "#{report_host}/#{report_path}/#{report_filename}"
    end

    # TODO: At some point, when we don't have any errors, we'll want to parse the json or something and look for errors, then we can send a fail to the status
    options[:description] = "Blinkr report successful"

    if should_update_status
      puts "adding success to status"
      puts GitHub.update_status($github_org, $github_repo, sha, "success", options)
    end
  rescue => e
    puts e
    options[:description] = "Blinkr failed (#{e.message})"
    if should_update_status
      puts "adding error to status"
      puts GitHub.update_status($github_org, $github_repo, sha, "error", options)
    end
  end
end

# Execute Awestruct
def run_awestruct(args)

  if ENV['site_base_path']
    base_url = ENV['site_base_path']

    unless ENV['site_path_suffix'].to_s.empty?
      base_url = "#{base_url}/#{ENV['site_path_suffix']}"
    end
  end

  args ||= "" # Make sure that args is initialized

  unless base_url.to_s.empty?
    args << " --url " + base_url
  end
  msg "Executing awestruct with args #{args}"
  unless system "#{$use_bundle_exec ? 'bundle exec ' : ''}awestruct #{args}"
    raise "Error executing awestruct"
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

def rsync(local_path:, host:, remote_path:, delete: false, excludes: [], dry_run: false, verbose: false, ignore_non_existing: false)
  unless File.exist?(ENV['HOME']+'/.ssh/id_rsa')
    abort("#{ENV['HOME']}+'/.ssh/id_rsa' does not exists. Rsync will fail")
  end
  msg "Deploying #{local_path} to #{host}:#{remote_path} via rsync"
  cmd = "rsync --partial --archive --checksum --compress --omit-dir-times #{'--quiet' unless verbose} #{'--verbose' if verbose} #{'--dry-run' if dry_run} #{'--ignore-non-existing' if ignore_non_existing} --chmod=Dg+sx,ug+rw,Do+rx,o+r --protocol=28 #{'--delete ' if delete} #{excludes.collect { |e| "--exclude " + e}.join(" ")} #{local_path}/ #{host}:#{remote_path}"
  msg "Rsync command: #{cmd}" if verbose
  unless open3(cmd) == 0
    msg "error executing rsync, exiting"
    exit 1
  end
end

def open3(cmd)
  require 'open3'
  Open3.popen3( cmd ) do |_, stdout, stderr, wait_thr|
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
    wait_thr.value
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
    require 'erb'
    data = YAML.load( ERB.new(File.read( yaml_path ), nil, '<>').result )
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

class Git
  def extract_issues(branch, not_on)
    # Read the changes
    changes = `git --no-pager log #{branch} --not #{not_on}`
    changes.scan(JIRA::KEY_PATTERN).flatten.uniq
  end
end
