require_relative '../default_logger'
require_relative '../../lib/process_runner'
require_relative 'cron_invoker'
require_relative 'drupal_page_url_list_generator'
require_relative 'httrack_export_strategy'
require_relative 'static_export_rsync'
require_relative 'export_inspector'
require_relative 'export_archiver'
require_relative 'export_archive_pruner'
require_relative 'export_html_post_processor'

#
# Class that acts as a controller of the export process from Drupal
#
# @author rblake@redhat.com
#
class Export

  def initialize(drupal_host, export_directory, cron_invoker, page_url_list_generator, export_strategy, rsync_handler, rsync_destination)

    @log = DefaultLogger.logger
    @drupal_host = drupal_host
    @export_directory = export_directory
    @cron_invoker = cron_invoker
    @page_url_list_generator = page_url_list_generator
    @export_strategy = export_strategy
    @rsync_handler = rsync_handler
    @rsync_destination = rsync_destination

  end

  #
  # Co-ordinates and runs the export
  #
  def export!
    @cron_invoker.invoke_cron!
    url_list = @page_url_list_generator.generate_page_url_list!
    export_directory = @export_strategy.export!(url_list, @drupal_host, @export_directory)

    @page_url_list_generator.save_sitemap(@page_url_list_generator.fetch_sitemap_contents,
                                          File.join(export_directory, 'sitemap.xml'))

    if !@rsync_destination.nil? and !@rsync_destination.empty?
      @rsync_handler.rsync_static_export(export_directory, @rsync_destination, true)
    else
      @log.info('No rsync destination specified. Not performing rsync of export.')
    end

  end

end

@DEFAULT_EXPORT_LOCATION = "/export"
@DEFAULT_EXPORT_ARCHIVE_LOCATION = "/export/export-archives"

if $0 == __FILE__

  drupal_host = ARGV[0]
  rsync_location = ARGV[1]
  if drupal_host == ''
    puts 'Usage: export.rb <drupal_host> [rsync_location]'
    Kernel.exit!(1)
  end

  process_runner = ProcessRunner.new
  cron_invoker = CronInvoker.new(drupal_host)
  page_url_list_generator = DrupalPageUrlListGenerator.new(drupal_host, @DEFAULT_EXPORT_LOCATION)
  export_strategy = HttrackExportStrategy.new(process_runner, ExportInspector.new, ExportHtmlPostProcessor.new(process_runner))
  rsync_handler = StaticExportRsync.new(process_runner, ExportArchiver.new(@DEFAULT_EXPORT_ARCHIVE_LOCATION, ExportArchivePruner.new(@DEFAULT_EXPORT_ARCHIVE_LOCATION)))
  log = DefaultLogger.logger

  begin
    log.info("Beginning export of content from Drupal at '#{drupal_host}'...")
    export = Export.new(drupal_host, @DEFAULT_EXPORT_LOCATION, cron_invoker, page_url_list_generator, export_strategy, rsync_handler, rsync_location)
    export.export!
    log.info("Export of content from Drupal at '#{drupal_host}' complete.")
    Kernel.exit!(0)
  rescue => error
    log.error("Failed to export content from Drupal at '#{drupal_host}'")
    raise
  end

end