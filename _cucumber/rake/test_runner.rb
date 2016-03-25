class TestRunner

  def cleanup
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

    cleanup

    if profile.eql?('parallel')
      if tag.eql?(nil)
        system("parallel_cucumber _cucumber/features/ -o \"-p #{profile}\" -n 8")
      else
        system("parallel_cucumber _cucumber/features/ -o \"-p #{profile} #{tag_string}\" -n 8")
      end
    else
      if tag.eql?(nil)
        system('cucumber _cucumber -r _cucumber/features/')
      else
        system('cucumber _cucumber -r _cucumber/features/')
      end
    end
      $?.exitstatus
  end

end
