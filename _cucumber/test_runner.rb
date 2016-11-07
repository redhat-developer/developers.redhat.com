require 'report_builder'

class TestRunner

  def cleanup(profile)

    FileUtils.rm_rf("_cucumber/reports/#{profile}")
    FileUtils.mkdir_p("_cucumber/reports/#{profile}")

    FileUtils.rm_rf("_cucumber/screenshots/#{profile}")
    FileUtils.mkdir_p("_cucumber/screenshots/#{profile}")

    FileUtils.rm_rf("_cucumber/tmp/#{profile}")
    FileUtils.mkdir_p("_cucumber/tmp/#{profile}")

  end

  def run(profile, tag)

    tag_string = tag unless tag.eql?(nil)

    if profile.eql?('slow')
      if tag.eql?(nil)
        command = system("cucumber _cucumber -r _cucumber/features/ -p #{profile}")
      else
        command = system("cucumber _cucumber -r _cucumber/features/ -p #{profile} #{tag_string}")
      end
    else
      if tag.eql?(nil)
        command = system "bundle exec parallel_cucumber _cucumber/features/ -o \"-p #{profile}\" -n 10"
      else
        command = system("parallel_cucumber _cucumber/features/ -o \"-p #{profile} #{tag_string}\" -n 10")
      end
    end
    rerun(profile) unless command == true
    $?.exitstatus
  end

  def rerun(profile)
    puts ('. . . . . There were failures during the test run! Attempt one of rerunning failed scenarios . . . . .')
    command = system('bundle exec cucumber --profile rerun_failures')
    unless command == true
      puts ('. . . . . There were failures during the rerun! Attempt two of rerunning failed scenarios . . . . .')
      system("bundle exec cucumber @_cucumber/tmp/#{profile}/rerunner.txt")
    end
    $?.exitstatus
  end

  def generate_report(profile)
    ReportBuilder.configure do |config|
      config.json_path = "_cucumber/reports/#{profile}"
      config.report_path = "_cucumber/reports/#{profile}/rhd_#{profile}_test_report"
      config.report_types = [:json, :html]
      config.report_tabs = [:overview, :features, :errors]
      config.report_title = "RHD #{profile.capitalize} Test Report"
      config.compress_images = true
    end
    ReportBuilder.build_report
  end

end
