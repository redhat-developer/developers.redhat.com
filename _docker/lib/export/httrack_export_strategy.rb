require 'fileutils'
require_relative '../default_logger'
require_relative 'export_html_post_processor'

#
# A class that delegates to Httrack to export a site given the list of URLs.
#
# This implementation will attempt to make use of httracks built-in caching to speed-up exports
# that are run against an already existing export.
#
# Additionally this class will roll-over the httrack cache when a maximum number of permitted updates
# has been reached. Please see DEVELOPER-3821 as to why we roll-over the export cache.
#
# @author rblake@redhat.com
#
class HttrackExportStrategy

  def initialize(process_runner, export_inspector, form_action_rewrite)
    @process_runner = process_runner
    @export_inspector = export_inspector
    @export_post_processor = form_action_rewrite
    @log = DefaultLogger.logger
  end


  #
  # Export the given links, from the specified drupal host into the given export directory
  #
  def export!(links_file, drupal_host, export_directory)

    @export_inspector.verify_all_critical_pages!(links_file)

    cache_updates = check_and_roll_over_cache(export_directory, drupal_host)

    if check_if_update_to_existing_export(export_directory)
      run_update_to_existing_export(export_directory)
    else
      run_new_export(links_file, drupal_host, export_directory)
    end

    write_new_httrack_cache_update(export_directory, cache_updates)

    exported_to = "#{export_directory}/#{determine_export_directory_from_drupal_host(drupal_host)}"
    @export_post_processor.post_process_html_export(drupal_host, exported_to)
    @export_inspector.inspect_export(links_file, exported_to)
    exported_to
  end

  private

  #
  # Determines the maximum number of times we will update the httrack export cache.
  # Returns the default value of 750 unless the user has set the env variable 'drupal.export.max_cache_updates'
  #
  def max_httrack_cache_updates
    user_setting = ENV['drupal.export.max_cache_updates']
    return 750 if user_setting.nil? || user_setting.empty?
    user_setting.to_i > 0 ? user_setting.to_i : 1
  end

  #
  # Writes the number of cache-updates back to the tracking file
  #
  def write_new_httrack_cache_update(export_directory, cache_updates)
    @log.info("Setting cache update count to '#{cache_updates}' of maximum permitted '#{max_httrack_cache_updates}' updates.")
      File.open("#{export_directory}/cache-updates",'w+') do |file|
        file.write(cache_updates)
      end
  end

  #
  # Reads the cache-update counter file to determine how many cache updates we have done so far
  #
  def current_httrack_cache_updates(export_directory)
    cache_update_file = "#{export_directory}/cache-updates"
    return 0 unless File.exist?(cache_update_file)

    cache_updates = File.open(cache_update_file) do |file|
      file.readline
    end

    return 0 if cache_updates.nil? || cache_updates.empty?

    begin
      return cache_updates.to_i
    rescue

    end

    0
  end

  #
  # Rolls over the export cache if we have reached the maximum allowed number of cache updates
  #
  def roll_over_export_cache(export_directory, drupal_host)
    @log.info('Rolling over httrack export cache as maximum cache updates has been reached...')
    htscache_rolled = "#{export_directory}/hts-cache.rolled"
    FileUtils.rm_rf(htscache_rolled) if Dir.exist?(htscache_rolled)
    FileUtils.mv("#{export_directory}/hts-cache", htscache_rolled) if Dir.exist?("#{export_directory}/hts-cache")
    FileUtils.mv("#{export_directory}/index.html","#{export_directory}/index.html.rolled") if File.exist?("#{export_directory}/index.html")

    export = determine_export_directory_from_drupal_host(drupal_host)
    export_rolled = "#{export_directory}/#{export}.rolled"
    FileUtils.rm_rf(export_rolled) if Dir.exist?(export_rolled)
    FileUtils.mv("#{export_directory}/#{export}", export_rolled) if Dir.exist?("#{export_directory}/#{export}")
  end

  #
  # Checks the number of updates that have been performed to the httrack export cache, and
  # if we have exceeded the maximum permissable number of updates, rolls the export over.
  #
  def check_and_roll_over_cache(export_directory, drupal_host)
    current_cache_updates = current_httrack_cache_updates(export_directory)
    max_cache_updates = max_httrack_cache_updates
    @log.info("Export cache has been updated '#{current_cache_updates}' times out of a permitted '#{max_cache_updates}' updates.")

    unless current_cache_updates < max_cache_updates
      roll_over_export_cache(export_directory, drupal_host)
      current_cache_updates = 0
    end

    current_cache_updates + 1
  end

  #
  # Checks for the presence of httrack cache files to see if we can simply update an existing export
  #
  def check_if_update_to_existing_export(export_directory)
    File.exist?("#{export_directory}/hts-cache/doit.log")
  end

  #
  # Runs a new httrack export
  # @return - The directory into which the export has been completed
  #
  def run_new_export(links_file, drupal_host, export_directory)

    @log.info("Running first time export of content from '#{drupal_host}'. Be patient, this will take time...")
    @process_runner.execute!("httrack --list #{links_file.to_path} -O #{export_directory} --disable-security-limits -c50 --max-rate 0 -v +\"http://#{drupal_host}*\" -\"*/node*\" -o0 -N ?html?%h/%p/%n/index.html -N %h/%p/%n.%t --footer \"<!-- -->\"")
    @log.info("Completed export of content from '#{drupal_host}'")

  end

  #
  # Returns the likely export directory for the HTML static dump. Httrack seems to replace the port separatror (:) if any
  # with an underscore
  #
  def determine_export_directory_from_drupal_host(drupal_host)
    drupal_host.gsub(':','_')
  end


  #
  # Runs an update to an existing httrack export
  #
  def run_update_to_existing_export(export_directory)

    @log.info("Running update to existing httrack export in directory '#{export_directory}'. Please be patient...")
    @process_runner.execute!("cd #{export_directory} && httrack --update")
    @log.info("Completed update of existing httrack export in directory '#{export_directory}'")

  end

end