require 'rubygems'
require 'cucumber'
require 'cucumber/rake/task'
require 'parallel'
require 'fileutils'
require_relative './rake/test_runner'

desc 'Run all scenarios. To run tests in non parallel mode set environment variable ENV[PARALLEL_TEST]=false'
task :features do |t, args|

  puts " . . . Running features against #{ENV['HOST_TO_TEST']}  . . . "

  if ENV['ghprbActualCommit'].to_s != ''
    p '. . . . sending progress to github . . . . '
    wrap_with_progress(ENV['ghprbActualCommit'], Rake::Task[:internal_features_task], ENV['BUILD_URL'], 'Acceptance Tests', 'Acceptance tests', args)
  else
    Rake::Task[:internal_test_task].invoke(args)
  end

  runner = TestRunner.new

  unless ENV['PARALLEL_TEST'].eql?('false') || ENV['CUCUMBER_TAGS'].eql?('@wip')
    profile = 'parallel'
  end

  if ENV['CUCUMBER_TAGS'].to_s.empty?
    tags = nil
  else
    tags = ENV['CUCUMBER_TAGS']
  end

  exit_status = runner.run(profile, tags)
  exit(exit_status)
end

task :internal_features_task => [:features]

task :wip do |t|
  system('cucumber _cucumber -r _cucumber/features/ --tags @wip')
end

task :debugger do |t|
  system('cucumber _cucumber -r _cucumber/features/ --tags @debug')
end

task :debug, :times do |task, args|
  puts "Executing scenario tagged with @debug #{args[:times]} times"
  args[:times].to_i.times { Rake::Task[:debugger].execute }
end
