class TestRunner

  def cleanup
    p 'Deleting old reports and logs . . . . . '
    FileUtils.rm_rf('_cucumber/reports')
    File.delete('rerun.txt') if File.exist?('rerun.txt')
    File.delete('cucumber_failures.log') if File.exist?('cucumber_failures.log')
    File.new('cucumber_failures.log', 'w')
    Dir.mkdir('_cucumber/reports')
  end

  def run(profile, tag)

    unless tag.eql?(nil)
      tag_string = "--tags #{tag}"
    end

    #cleanup the previous run reports
    cleanup

    p ". . . . . running tests using #{profile} profile . . . . ."
    p ". . . . . executing scenarios tagged with #{tag} . . . . ." unless tag.eql?(nil)

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
    if tag.eql?('@wip')
      $?.exitstatus
    else
    rerun(profile)
    end
  end

  def rerun(profile)
    if profile.eql?('parallel')
      unless File.size('cucumber_failures.log').eql?(0)
        p '. . . . . There were failures during the parallel test run, rerunning failed scenarios . . . . .'
        system('bundle exec cucumber @cucumber_failures.log -f pretty')
      end
    else
      unless File.size('rerun.txt').eql?(0)
        p '. . . . . There were failures during the test run, rerunning failed scenarios . . . . .'
        system('bundle exec cucumber @rerun.txt -f pretty')
      end
    end
    $?.exitstatus
  end

end
