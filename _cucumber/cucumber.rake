require 'rubygems'
require 'cucumber'
require 'cucumber/rake/task'
require 'parallel'
require 'fileutils'
require_relative './rake/test_runner'

Cucumber::Rake::Task.new(:wip) do |t|
  t.cucumber_opts = '_cucumber -r _cucumber/features/ --profile wip'
end

desc 'Run all scenarios. To run tests in non parallel mode set environment variable ENV[PARALLEL_TEST]=false'
task :features do |t, args|

  if ENV['ghprbActualCommit'].to_s != ''
    p '. . . . sending progress to github . . . . '
    wrap_with_progress(ENV['ghprbActualCommit'], Rake::Task[:internal_features_task], ENV['BUILD_URL'], 'Acceptance Tests', 'Acceptance tests', args)
  else
    Rake::Task[:internal_test_task].invoke(args)
  end

  runner = TestRunner.new

  if ENV['PARALLEL_TEST'].eql?('false')
    profile = 'features'
  else
    profile = 'parallel'
  end

  exit_status = runner.run(profile)
  p "exit status was #{exit_status}"
  exit(exit_status)
end

task :internal_features_task => [:features]
