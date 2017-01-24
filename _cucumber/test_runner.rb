require 'report_builder'
require 'colorize'
require 'colorized_string'
require_relative 'merge_cucumber_json_reports'
require 'fileutils'

# This class contains methods for the cucumber.rake file in order to execute the full suite of acceptance tests
class TestRunner

  def initialize
    @cucumber_dir = File.dirname(__FILE__)
  end

  def cuke_sniffer
    puts ColorizedString.new('. . . . . Executing Cuke Sniffer used to root out smells in your cukes . . . . .').blue
    FileUtils.rm_rf("#{@cucumber_dir}/reports/cuke_sniffer")
    FileUtils.mkdir_p("#{@cucumber_dir}/reports/cuke_sniffer")
    sh "cd #{@cucumber_dir}/features"
    sh "bundle exec cuke_sniffer --out html #{@cucumber_dir}/reports/cuke_sniffer/cuke_sniffer.html"
  end

  def code_analyzer
    puts ColorizedString.new('. . . . . Executing RuboCop the Ruby static code analyzer. This task will enforce many of the guidelines outlined in the community Ruby Style Guide. . . . . .').blue
    system("cd #{@cucumber_dir} && rubocop")
    $?.exitstatus
  end

  def cleanup(profile)
    FileUtils.rm_rf("#{@cucumber_dir}/reports/#{profile}")
    FileUtils.mkdir_p("#{@cucumber_dir}/reports/#{profile}")

    FileUtils.rm_rf("#{@cucumber_dir}/screenshots/#{profile}")
    FileUtils.mkdir_p("#{@cucumber_dir}/screenshots/#{profile}")

    FileUtils.rm_rf("#{@cucumber_dir}/tmp/#{profile}")
    FileUtils.mkdir_p("#{@cucumber_dir}/tmp/#{profile}")
  end

  def run(profile, tag=nil)
    tag_string = tag unless tag.eql?(nil)
    if tag.eql?(nil)
      command = system("parallel_cucumber #{@cucumber_dir}/features/ -o \"-p #{profile}\" -n 10")
    else
      command = system("parallel_cucumber #{@cucumber_dir}/features/ -o \"-p #{profile} #{tag_string}\" -n 10")
    end
    rerun(profile) unless command == true
    $?.exitstatus
  end

  def rerun(profile)
    puts ColorizedString.new('. . . . . There were failures during the test run! Attempt one of rerunning failed scenarios . . . . .').red
    command = system("cd #{@cucumber_dir} && bundle exec cucumber --profile rerun_failures")
    unless command == true
      puts ColorizedString.new('. . . . . There were failures during first rerun! Attempt two of rerunning failed scenarios . . . . .').red
      system("bundle exec cucumber @#{@cucumber_dir}/tmp/#{profile}/rerunner.txt -f json -o #{@cucumber_dir}/reports/#{profile}/rerun2.json")
    end
    $?.exitstatus
  end

  def wip
    system("bundle exec cucumber #{@cucumber_dir} --tags @wip")
  end

  def generate_report(profile)
    ReportBuilder.configure do |config|
      config.json_path = "#{@cucumber_dir}/reports/#{profile}"
      config.report_path = "#{@cucumber_dir}/reports/#{profile}/rhd_#{profile}_test_report"
      config.report_types = [:json, :html]
      config.report_tabs = [:overview, :features, :errors]
      config.report_title = "RHD #{profile.capitalize} Test Report"
      config.compress_images = true
    end
    ReportBuilder.build_report
  end
end
