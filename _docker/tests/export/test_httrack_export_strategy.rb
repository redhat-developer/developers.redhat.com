require 'fileutils'
require 'minitest/autorun'
require 'mocha/mini_test'

require_relative '../../../_docker/tests/test_helper'
require_relative '../../lib/export/httrack_export_strategy'

class TestHttrackExportStrategy < MiniTest::Test

  def setup

    @drupal_host = 'drupal:8080'
    @export_directory = Dir.mktmpdir
    @process_runner = mock()
    @export_inspector = mock()
    @export_post_processor = mock()
    @httrack_export_strategy = HttrackExportStrategy.new(@process_runner, @export_inspector, @export_post_processor)
    @url_list_file = File.open("#{@export_directory}/url-list.txt", 'w')

  end

  def teardown
    FileUtils.rm_rf(@export_directory)
    ENV['drupal.export.max_cache_updates'] = nil
  end

  def cache_update_count
    File.open("#{@export_directory}/cache-updates") do |file|
      file.readline.to_i
    end
  end

  def write_cache_update_count(count)
    File.open("#{@export_directory}/cache-updates", 'w+') do |file|
      file.write(count)
    end
  end

  def test_correctly_handles_rollover_after_previous_rollover

    Dir.mkdir("#{@export_directory}/hts-cache.rolled")
    FileUtils.touch("#{@export_directory}/hts-cache.rolled/old-export.txt")
    Dir.mkdir("#{@export_directory}/drupal_8080.rolled")
    FileUtils.touch("#{@export_directory}/index.html.rolled")

    Dir.mkdir("#{@export_directory}/hts-cache")
    Dir.mkdir("#{@export_directory}/drupal_8080")
    FileUtils.touch("#{@export_directory}/index.html")
    FileUtils.touch("#{@export_directory}/hts-cache/new-export.txt")

    ENV['drupal.export.max_cache_updates'] = '1'
    write_cache_update_count(1)

    assert(Dir.exist?("#{@export_directory}/hts-cache"))
    assert(Dir.exist?("#{@export_directory}/drupal_8080"))
    assert(File.exist?("#{@export_directory}/index.html"))
    assert(Dir.exist?("#{@export_directory}/hts-cache.rolled"))
    assert(Dir.exist?("#{@export_directory}/drupal_8080.rolled"))
    assert(File.exist?("#{@export_directory}/index.html.rolled"))
    assert(File.exist?("#{@export_directory}/hts-cache.rolled/old-export.txt"))

    @export_inspector.expects(:verify_all_critical_pages!).with(@url_list_file)
    @process_runner.expects(:execute!).with("httrack --list #{@url_list_file.path} -O #{@export_directory} --disable-security-limits -c50 --max-rate 0 -v +\"http://#{@drupal_host}*\" -\"*/node*\" -o0 -N ?html?%h/%p/%n/index.html -N %h/%p/%n.%t --footer \"<!-- -->\"")
    @export_post_processor.expects(:post_process_html_export).with(@drupal_host, "#{@export_directory}/drupal_8080")
    @export_inspector.expects(:inspect_export).with(@url_list_file, "#{@export_directory}/drupal_8080")

    export_dir = @httrack_export_strategy.export!(@url_list_file, 'drupal:8080', @export_directory)
    assert_equal("#{@export_directory}/drupal_8080", export_dir)
    assert_equal(1, cache_update_count)

    assert(Dir.exist?("#{@export_directory}/hts-cache.rolled"))
    assert(Dir.exist?("#{@export_directory}/drupal_8080.rolled"))
    assert(File.exist?("#{@export_directory}/index.html.rolled"))
    refute(File.exist?("#{@export_directory}/hts-cache.rolled/old-export.txt"))
    assert(File.exist?("#{@export_directory}/hts-cache.rolled/new-export.txt"))

  end

  def test_correctly_handles_rollover_if_no_existing_directory_structure
    ENV['drupal.export.max_cache_updates'] = '1'
    write_cache_update_count(1)

    @export_inspector.expects(:verify_all_critical_pages!).with(@url_list_file)
    @process_runner.expects(:execute!).with("httrack --list #{@url_list_file.path} -O #{@export_directory} --disable-security-limits -c50 --max-rate 0 -v +\"http://#{@drupal_host}*\" -\"*/node*\" -o0 -N ?html?%h/%p/%n/index.html -N %h/%p/%n.%t --footer \"<!-- -->\"")
    @export_post_processor.expects(:post_process_html_export).with(@drupal_host, "#{@export_directory}/drupal_8080")
    @export_inspector.expects(:inspect_export).with(@url_list_file, "#{@export_directory}/drupal_8080")

    export_dir = @httrack_export_strategy.export!(@url_list_file, 'drupal:8080', @export_directory)
    assert_equal("#{@export_directory}/drupal_8080", export_dir)
    assert_equal(1, cache_update_count)

    refute(Dir.exist?("#{@export_directory}/hts-cache.rolled"))
    refute(Dir.exist?("#{@export_directory}/drupal_8080.rolled"))
  end

  def test_correctly_handles_zero_cache_update_count
    ENV['drupal.export.max_cache_updates'] = '0'

    @export_inspector.expects(:verify_all_critical_pages!).with(@url_list_file)
    @process_runner.expects(:execute!).with("httrack --list #{@url_list_file.path} -O #{@export_directory} --disable-security-limits -c50 --max-rate 0 -v +\"http://#{@drupal_host}*\" -\"*/node*\" -o0 -N ?html?%h/%p/%n/index.html -N %h/%p/%n.%t --footer \"<!-- -->\"")
    @export_post_processor.expects(:post_process_html_export).with(@drupal_host, "#{@export_directory}/drupal_8080")
    @export_inspector.expects(:inspect_export).with(@url_list_file, "#{@export_directory}/drupal_8080")

    export_dir = @httrack_export_strategy.export!(@url_list_file, 'drupal:8080', @export_directory)
    assert_equal("#{@export_directory}/drupal_8080", export_dir)
    assert_equal(1, cache_update_count)
  end

  def test_correctly_handles_non_numeric_cache_update_count

    ENV['drupal.export.max_cache_updates'] = 'foo'

    @export_inspector.expects(:verify_all_critical_pages!).with(@url_list_file)
    @process_runner.expects(:execute!).with("httrack --list #{@url_list_file.path} -O #{@export_directory} --disable-security-limits -c50 --max-rate 0 -v +\"http://#{@drupal_host}*\" -\"*/node*\" -o0 -N ?html?%h/%p/%n/index.html -N %h/%p/%n.%t --footer \"<!-- -->\"")
    @export_post_processor.expects(:post_process_html_export).with(@drupal_host, "#{@export_directory}/drupal_8080")
    @export_inspector.expects(:inspect_export).with(@url_list_file, "#{@export_directory}/drupal_8080")

    export_dir = @httrack_export_strategy.export!(@url_list_file, 'drupal:8080', @export_directory)
    assert_equal("#{@export_directory}/drupal_8080", export_dir)
    assert_equal(1, cache_update_count)
  end

  def test_correctly_handles_negative_cache_update_count

    ENV['drupal.export.max_cache_updates'] = '-1'

    @export_inspector.expects(:verify_all_critical_pages!).with(@url_list_file)
    @process_runner.expects(:execute!).with("httrack --list #{@url_list_file.path} -O #{@export_directory} --disable-security-limits -c50 --max-rate 0 -v +\"http://#{@drupal_host}*\" -\"*/node*\" -o0 -N ?html?%h/%p/%n/index.html -N %h/%p/%n.%t --footer \"<!-- -->\"")
    @export_post_processor.expects(:post_process_html_export).with(@drupal_host, "#{@export_directory}/drupal_8080")
    @export_inspector.expects(:inspect_export).with(@url_list_file, "#{@export_directory}/drupal_8080")

    export_dir = @httrack_export_strategy.export!(@url_list_file, 'drupal:8080', @export_directory)
    assert_equal("#{@export_directory}/drupal_8080", export_dir)
    assert_equal(1, cache_update_count)

  end

  def test_should_roll_over_cache_if_updates_equal_to_permitted

    ENV['drupal.export.max_cache_updates'] = '1'

    Dir.mkdir("#{@export_directory}/hts-cache")
    Dir.mkdir("#{@export_directory}/drupal_8080")
    FileUtils.touch("#{@export_directory}/index.html")
    write_cache_update_count(1)

    assert(Dir.exist?("#{@export_directory}/hts-cache"))
    assert(Dir.exist?("#{@export_directory}/drupal_8080"))
    assert(File.exist?("#{@export_directory}/index.html"))
    refute(Dir.exist?("#{@export_directory}/hts-cache.rolled"))
    refute(Dir.exist?("#{@export_directory}/drupal_8080.rolled"))
    refute(File.exist?("#{@export_directory}/index.html.rolled"))

    @export_inspector.expects(:verify_all_critical_pages!).with(@url_list_file)
    @process_runner.expects(:execute!).with("httrack --list #{@url_list_file.path} -O #{@export_directory} --disable-security-limits -c50 --max-rate 0 -v +\"http://#{@drupal_host}*\" -\"*/node*\" -o0 -N ?html?%h/%p/%n/index.html -N %h/%p/%n.%t --footer \"<!-- -->\"")
    @export_post_processor.expects(:post_process_html_export).with(@drupal_host, "#{@export_directory}/drupal_8080")
    @export_inspector.expects(:inspect_export).with(@url_list_file, "#{@export_directory}/drupal_8080")

    export_dir = @httrack_export_strategy.export!(@url_list_file, 'drupal:8080', @export_directory)
    assert_equal("#{@export_directory}/drupal_8080", export_dir)
    assert_equal(1, cache_update_count)

    assert(Dir.exist?("#{@export_directory}/hts-cache.rolled"))
    assert(Dir.exist?("#{@export_directory}/drupal_8080.rolled"))
    assert(File.exist?("#{@export_directory}/index.html.rolled"))

  end


  def test_should_roll_over_cache_if_max_updates_exceeded

      ENV['drupal.export.max_cache_updates'] = '1'

      Dir.mkdir("#{@export_directory}/hts-cache")
      Dir.mkdir("#{@export_directory}/drupal_8080")
      write_cache_update_count(2)

      assert(Dir.exist?("#{@export_directory}/hts-cache"))
      assert(Dir.exist?("#{@export_directory}/drupal_8080"))
      refute(Dir.exist?("#{@export_directory}/hts-cache.rolled"))
      refute(Dir.exist?("#{@export_directory}/drupal_8080.rolled"))

      @export_inspector.expects(:verify_all_critical_pages!).with(@url_list_file)
      @process_runner.expects(:execute!).with("httrack --list #{@url_list_file.path} -O #{@export_directory} --disable-security-limits -c50 --max-rate 0 -v +\"http://#{@drupal_host}*\" -\"*/node*\" -o0 -N ?html?%h/%p/%n/index.html -N %h/%p/%n.%t --footer \"<!-- -->\"")
      @export_post_processor.expects(:post_process_html_export).with(@drupal_host, "#{@export_directory}/drupal_8080")
      @export_inspector.expects(:inspect_export).with(@url_list_file, "#{@export_directory}/drupal_8080")

      export_dir = @httrack_export_strategy.export!(@url_list_file, 'drupal:8080', @export_directory)
      assert_equal("#{@export_directory}/drupal_8080", export_dir)
      assert_equal(1, cache_update_count)

      assert(Dir.exist?("#{@export_directory}/hts-cache.rolled"))
      assert(Dir.exist?("#{@export_directory}/drupal_8080.rolled"))
  end


  def test_should_run_first_time_export

    @export_inspector.expects(:verify_all_critical_pages!).with(@url_list_file)
    @process_runner.expects(:execute!).with("httrack --list #{@url_list_file.path} -O #{@export_directory} --disable-security-limits -c50 --max-rate 0 -v +\"http://#{@drupal_host}*\" -\"*/node*\" -o0 -N ?html?%h/%p/%n/index.html -N %h/%p/%n.%t --footer \"<!-- -->\"")
    @export_post_processor.expects(:post_process_html_export).with(@drupal_host, "#{@export_directory}/drupal_8080")
    @export_inspector.expects(:inspect_export).with(@url_list_file, "#{@export_directory}/drupal_8080")

    export_dir = @httrack_export_strategy.export!(@url_list_file, 'drupal:8080', @export_directory)
    assert_equal("#{@export_directory}/drupal_8080", export_dir)
    assert_equal(1, cache_update_count)
  end

  def test_should_update_existing_export

    Dir.mkdir("#{@export_directory}/hts-cache")
    FileUtils.touch("#{@export_directory}/hts-cache/doit.log")
    write_cache_update_count(1)

    @export_inspector.expects(:verify_all_critical_pages!).with(@url_list_file)
    @process_runner.expects(:execute!).with("cd #{@export_directory} && httrack --update")
    @export_post_processor.expects(:post_process_html_export).with(@drupal_host, "#{@export_directory}/drupal_8080")
    @export_inspector.expects(:inspect_export).with(@url_list_file, "#{@export_directory}/drupal_8080")

    export_dir = @httrack_export_strategy.export!(@url_list_file, 'drupal:8080', @export_directory)
    assert_equal("#{@export_directory}/drupal_8080", export_dir)
    assert_equal(2, cache_update_count)
  end

  def test_should_run_first_time_export_with_no_host_port

    @export_inspector.expects(:verify_all_critical_pages!).with(@url_list_file)
    @process_runner.expects(:execute!).with("httrack --list #{@url_list_file.path} -O #{@export_directory} --disable-security-limits -c50 --max-rate 0 -v +\"http://developer-drupal.web.stage.ext.phx2.redhat.com*\" -\"*/node*\" -o0 -N ?html?%h/%p/%n/index.html -N %h/%p/%n.%t --footer \"<!-- -->\"")
    @export_post_processor.expects(:post_process_html_export).with('developer-drupal.web.stage.ext.phx2.redhat.com', "#{@export_directory}/developer-drupal.web.stage.ext.phx2.redhat.com")
    @export_inspector.expects(:inspect_export).with(@url_list_file, "#{@export_directory}/developer-drupal.web.stage.ext.phx2.redhat.com")

    export_dir = @httrack_export_strategy.export!(@url_list_file, 'developer-drupal.web.stage.ext.phx2.redhat.com', @export_directory)
    assert_equal("#{@export_directory}/developer-drupal.web.stage.ext.phx2.redhat.com", export_dir)
    assert_equal(1, cache_update_count)
  end

  def test_should_update_existing_export_with_no_host_port

    Dir.mkdir("#{@export_directory}/hts-cache")
    FileUtils.touch("#{@export_directory}/hts-cache/doit.log")
    write_cache_update_count(1)

    @export_inspector.expects(:verify_all_critical_pages!).with(@url_list_file)
    @process_runner.expects(:execute!).with("cd #{@export_directory} && httrack --update")
    @export_post_processor.expects(:post_process_html_export).with('developer-drupal.web.stage.ext.phx2.redhat.com', "#{@export_directory}/developer-drupal.web.stage.ext.phx2.redhat.com")
    @export_inspector.expects(:inspect_export).with(@url_list_file, "#{@export_directory}/developer-drupal.web.stage.ext.phx2.redhat.com")

    export_dir = @httrack_export_strategy.export!(@url_list_file, 'developer-drupal.web.stage.ext.phx2.redhat.com', @export_directory)
    assert_equal("#{@export_directory}/developer-drupal.web.stage.ext.phx2.redhat.com", export_dir)
    assert_equal(2, cache_update_count)

  end

  def test_should_fail_export_process_if_critical_links_missing
    @export_inspector.expects(:verify_all_critical_pages!).with(@url_list_file).raises(StandardError, 'There are critical links missing!')

    assert_raises(StandardError, 'There are critical links missing!') {
      @httrack_export_strategy.export!(@url_list_file, 'developer-drupal.web.stage.ext.phx2.redhat.com', @export_directory)
    }
  end


end