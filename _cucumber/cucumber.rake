require 'rubygems'
require 'parallel'
require 'fileutils'
require_relative '../_lib/github'

task :features do
  cleanup
  p ". . . . HOST TO TEST = #{ENV['HOST_TO_TEST']} . . . ."

  unless ENV['PARALLEL_TEST'].eql?('false') || ENV['CUCUMBER_TAGS'].eql?('@wip')
    profile = 'parallel'
  end

  if ENV['CUCUMBER_TAGS'].to_s.empty?
    tags = nil
  else
    tags = ENV['CUCUMBER_TAGS']
  end

  if ENV['ghprbActualCommit'].to_s.empty?
    status_code = run(profile, tags)
  else
    p 'Sending progress to Github . . . '
    options = {:context => 'Acceptance Tests', :description => 'Acceptance Tests pending', :target_url => ENV['BUILD_URL']}
    GitHub.update_status($github_org, $github_repo, ENV['ghprbActualCommit'], "pending", options)
    status_code = run(profile, tags)
    if status_code == 0
      options[:description] = 'Acceptance Tests finished ok!'
      GitHub.update_status($github_org, $github_repo, ENV['ghprbActualCommit'], "success", options)
    else
      options[:description] = 'Acceptance Tests failed'
      puts GitHub.update_status($github_org, $github_repo, ENV['ghprbActualCommit'], "failure", options)
    end
  end
  puts "Acceptance tests resulted with status code of #{status_code}"
  exit(status_code)
end

task :wip do
  cleanup
  system('cucumber _cucumber -r _cucumber/features/ --tags @wip')
end

task :debugger do
  cleanup
  system('cucumber _cucumber -r _cucumber/features/ --tags @debug')
end

task :debug, :times do |task, args|
  puts "Executing scenario tagged with @debug #{args[:times]} times"
  args[:times].to_i.times { Rake::Task[:debugger].execute }
end

def run(profile, tag)
  unless tag.eql?(nil)
    tag_string = "--tags #{tag}"
  end

  if profile.eql?('parallel')
    if tag.eql?(nil)
      system("parallel_cucumber _cucumber/features/ -o \"-p #{profile}\"")
    else
      system("parallel_cucumber _cucumber/features/ -o \"-p #{profile} #{tag_string}\"")
    end
  else
    if tag.eql?(nil)
      system("cucumber _cucumber -r _cucumber/features/ -p #{profile}")
    else
      system("cucumber _cucumber -r _cucumber/features/ -p #{profile} #{tag_string}")
    end
  end
  $?.exitstatus
end

def cleanup
  p '. . . . Deleting old reports and screenshots  . . . .'
  FileUtils.rm_rf('_cucumber/reports')
  Dir.mkdir('_cucumber/reports')
  FileUtils.rm_rf('_cucumber/screenshots')
  Dir.mkdir('_cucumber/screenshots')
end
