require 'rubygems'
require 'parallel'
require 'fileutils'
require_relative '../_lib/github'
require 'report_builder'
require 'colorize'
require 'colorized_string'

desc 'Rake task to run acceptance tests, rerunning any failed tests'
task :features do

  # clean up any files/directories that may be hanging around from previous test runs
  cleanup

  # cucumber report config
  ReportBuilder.configure do |config|
    config.json_path = '_cucumber/reports/'
    config.report_path = '_cucumber/reports/rhd_test_report'
    config.report_types = [:json, :html]
    config.report_tabs = [:overview, :features, :errors]
    config.report_title = 'RHD Test Results'
    config.compress_images = true
  end

  if ENV['RHD_TEST_PROFILE']
    profile = ENV['RHD_TEST_PROFILE']
  else
    profile = 'desktop'
  end

  if ENV['CUCUMBER_TAGS'].to_s.empty?
    tags = nil
  else
    tag_arr = []
    if ENV['CUCUMBER_TAGS'].include?(',')
      tag = ENV['CUCUMBER_TAGS'].split(',')
      tag.each do |cuke_tag|
        tag_arr << "--tags #{cuke_tag}"
      end
      tags = tag_arr.join(' ')
    else
      tags = "--tags #{ENV['CUCUMBER_TAGS']}"
    end
  end

  # set build description
  if profile == 'mobile'
    @build_description = 'Mobile Acceptance Tests'
  else
    @build_description = 'Desktop Acceptance Tests'
  end

  if ENV['ghprbActualCommit'].to_s.empty?
    status_code = run(profile, tags)
  else
    puts ColorizedString.new('Sending progress to Github . . . ').blue
    options = {:context => 'Acceptance Tests', :description => "#{@build_description} pending", :target_url => ENV['BUILD_URL']}
    GitHub.update_status($github_org, $github_repo, ENV['ghprbActualCommit'], 'pending', options)
    status_code = run(profile, tags)
    if status_code == 0
      options[:description] = "#{@build_description} finished ok!"
      GitHub.update_status($github_org, $github_repo, ENV['ghprbActualCommit'], 'success', options)
    else
      options[:description] = "#{@build_description} failed"
      puts GitHub.update_status($github_org, $github_repo, ENV['ghprbActualCommit'], 'failure', options)
    end
  end

  puts ColorizedString.new('Generating cucumber report . . . ').blue
  ReportBuilder.build_report

  puts ColorizedString.new("Acceptance tests resulted with status code of #{status_code}").blue
  exit(status_code)
end

task :wip do
  cleanup
  if ENV['RHD_TEST_PROFILE'].to_s.empty?
    profile = 'default'
  else
    profile = ENV['RHD_TEST_PROFILE']
  end
  system("cucumber _cucumber -r _cucumber/features/ --tags @wip --profile #{profile}")
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
  tag_string = tag unless tag.eql?(nil)

  if profile.eql?('slow')
    if tag.eql?(nil)
      system("cucumber _cucumber -r _cucumber/features/ -p #{profile}")
    else
      system("cucumber _cucumber -r _cucumber/features/ -p #{profile} #{tag_string}")
    end
  else
    if tag.eql?(nil)
      system("parallel_cucumber _cucumber/features/ -o \"-p #{profile}\" -n 5")
    else
      system("parallel_cucumber _cucumber/features/ -o \"-p #{profile} #{tag_string}\" -n 5")
    end
  end
  rerun
  $?.exitstatus
end

def rerun
  # rerun attempt one
  if File.exist?('cucumber_failures.log') && File.size('cucumber_failures.log') > 0
    puts ColorizedString.new('. . . . . There were failures during the test run! Attempt one of rerunning failed scenarios . . . . .').red
    system('bundle exec cucumber @cucumber_failures.log -f rerun --out cucumber_failures1.log')
  end
  # rerun attempt two
  if File.exist?('cucumber_failures1.log') && File.size('cucumber_failures1.log') > 0
    puts ColorizedString.new('. . . . . There were failures during first rerun! Attempt two of rerunning failed scenarios . . . . .').red
    system('bundle exec cucumber @cucumber_failures1.log')
  end
  $?.exitstatus
end

def cleanup
  puts ColorizedString.new('. . . . Deleting old reports and screenshots  . . . .').blue
  File.delete('cucumber_failures.log') if File.exist?('cucumber_failures.log')
  File.delete('cucumber_failures1.log') if File.exist?('cucumber_failures1.log')
  FileUtils.rm_rf('_cucumber/reports')
  Dir.mkdir('_cucumber/reports')
  FileUtils.rm_rf('_cucumber/screenshots')
  Dir.mkdir('_cucumber/screenshots')
end
