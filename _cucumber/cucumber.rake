require 'rubygems'
require 'parallel'
require 'fileutils'

task :cleanup do
  p '. . . . Deleting old reports and logs . . . .'
  FileUtils.rm_rf('_cucumber/reports')
  File.delete('rerun.txt') if File.exist?('rerun.txt')
  File.delete('cucumber_failures.log') if File.exist?('cucumber_failures.log')
  File.new('cucumber_failures.log', 'w')
  Dir.mkdir('_cucumber/reports')
end

task :suite do
  unless ENV['PARALLEL_TEST'].eql?('false') || ENV['CUCUMBER_TAGS'].eql?('@wip')
    profile = 'parallel'
  end

  if ENV['CUCUMBER_TAGS'].to_s.empty?
    tags = nil
  else
    tags = ENV['CUCUMBER_TAGS']
  end
  status_code = run(profile, tags)
  raise('Cucumber tests failed!') if status_code != 0
end

task :features do |t, args|
  if ENV['ghprbActualCommit'].to_s.empty?
    Rake::Task[:internal_features_task].invoke(args)
  else
    p 'Sending progress to Github . . . '
    wrap_with_progress(ENV['ghprbActualCommit'], Rake::Task[:internal_features_task], ENV['BUILD_URL'], 'Acceptance Tests', 'Acceptance tests', args)
  end
end

task :internal_features_task => [:cleanup, :suite]

task :wip do
  system('cucumber _cucumber -r _cucumber/features/ --tags @wip')
end

task :debugger do
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
