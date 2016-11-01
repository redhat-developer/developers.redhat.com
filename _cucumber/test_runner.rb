require 'report_builder'

class TestRunner

  def cleanup
    FileUtils.rm_rf('_cucumber/reports')
    FileUtils.rm_rf('_cucumber/screenshots')
    FileUtils.rm_rf('_cucumber/tmp')
    Dir.mkdir('_cucumber/reports')
    Dir.mkdir('_cucumber/screenshots')
    Dir.mkdir('_cucumber/tmp')
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
    rerun unless command == true
    $?.exitstatus
  end

  def rerun
    puts ('. . . . . There were failures during the test run! Attempt one of rerunning failed scenarios . . . . .')
    command = system('bundle exec cucumber --profile rerun_failures')
    unless command == true
      puts ('. . . . . There were failures during the rerun! Attempt two of rerunning failed scenarios . . . . .')
      system('bundle exec cucumber @_cucumber/tmp/rerunner.txt')
    end
    $?.exitstatus
  end

  def generate_report
    ReportBuilder.configure do |config|
      config.json_path = '_cucumber/reports/'
      config.report_path = '_cucumber/reports/rhd_test_report'
      config.report_types = [:json, :html]
      config.report_tabs = [:overview, :features, :errors]
      config.report_title = 'RHD Test Results'
      config.compress_images = true
    end
    ReportBuilder.build_report
  end

end
