require 'rubygems'
require 'cucumber'
require 'cucumber/rake/task'
require 'parallel'
require 'fileutils'
require 'set'
require_relative './rake/test_runner'

desc 'Run all scenarios. To run tests in non parallel mode set environment variable ENV[PARALLEL_TEST]=false'
task :features do |t, args|

  if ENV['ghprbActualCommit'].to_s != ''
    p '. . . . sending progress to github . . . . '
    wrap_with_progress(ENV['ghprbActualCommit'], Rake::Task[:internal_features_task], ENV['BUILD_URL'], 'Acceptance Tests', 'Acceptance tests', args)
  else
    Rake::Task[:internal_test_task].invoke(args)
  end

  runner = TestRunner.new

  if ENV['PARALLEL_TEST'].eql?('false') || ENV['CUCUMBER_TAGS'].eql?('@wip')
    profile = 'features'
  else
    profile = 'parallel'
  end

  known_good_cucumber_tags = %w(@wip @smoke @cdk_beta @ignore)
  if ENV['CUCUMBER_TAGS'].to_s.empty?
    tags = nil
  else
    if ENV['CUCUMBER_TAGS'].include?(',')
      tags = ENV['CUCUMBER_TAGS'].split(',')
      expected_tags = known_good_cucumber_tags.to_set
      actual_tags = tags.to_set
      unless actual_tags.subset?(expected_tags)
        raise("Expected tag string '#{tags}' was not found within known good cucumber tags. \n
               Expected tags were #{known_good_cucumber_tags} \n
               If required it can be added to the known good cucumber tags in #{File.dirname(__FILE__)}/cucumber.rake")
      end
      tags = tags.join(',')
    else
      tags = ENV['CUCUMBER_TAGS']
      unless known_good_cucumber_tags.include?(tags)
        raise("Expected tag '#{tags}' was not found within known good cucumber tags. \n
               Expected tags were #{known_good_cucumber_tags} \n
               If required it can be added to the known good cucumber tags in #{File.dirname(__FILE__)}/cucumber.rake")
      end
    end
  end

  exit_status = runner.run(profile, tags)
  p "exit status was #{exit_status}"
  exit(exit_status)
end

task :internal_features_task => [:features]
