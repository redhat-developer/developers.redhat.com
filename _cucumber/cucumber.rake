require 'rubygems'
require 'cucumber'
require 'cucumber/rake/task'
require 'parallel'
require 'fileutils'

Cucumber::Rake::Task.new(:wip) do |t|
  t.cucumber_opts = '_cucumber -r _cucumber/features/ --profile wip'
end

task :cleanup do
  puts '======== Deleting old reports and logs ========='
  FileUtils.rm_rf('_cucumber/reports')
  File.delete('cucumber_failures.log') if File.exist?('cucumber_failures.log')
  File.new('cucumber_failures.log', 'w')
  Dir.mkdir('_cucumber/reports')
end

task :parallel_features do
  result = system "parallel_cucumber _cucumber/features/ -o \"-p parallel\" -n 20"
  result
end

task :parallel_smoke do
  system "parallel_cucumber _cucumber/features/ -o \"-p parallel_smoke\" -n 20"
end

task :rerun do
  if File.size('cucumber_failures.log') == 0
    puts '========= No failures. Everything Passed ========='
  else
    puts '========= Re-running Failed Scenarios ========='
    exit_code = system 'bundle exec cucumber @cucumber_failures.log -f pretty'
    result = $?.success?
    fail ('Cucumber tests failed') if exit_code == false && result == false
  end
end

task :features => [:cleanup, :parallel_features, :rerun] do |t, args|
  if ENV['ghprbActualCommit'].to_s != ''
    puts "==== sending progress to github"
    wrap_with_progress(ENV['ghprbActualCommit'], Rake::Task[:internal_features_task], ENV["BUILD_URL"], "Acceptance Tests", 'Acceptance tests', args)
  else
    Rake::Task[:internal_test_task].invoke(args)
  end
end

task :internal_features_task => [:cleanup, :parallel_features, :rerun]

task :smoke => [:cleanup, :parallel_smoke, :rerun]


task :cuke_sniffer do
  sh 'bundle exec cuke_sniffer --out html reports/cuke_sniffer.html'
end

task :rubocop do
  sh 'bundle exec rubocop features/'
end

task :police => [:cleanup, :cuke_sniffer]
