require_relative '../default_logger'

#
# A class that delegates to Httrack to export a site given the list of URLs.
#
# This implementation will attempt to make use of httracks built-in caching to speed-up exports
# that are run against an already existing export.
#
# @author rblake@redhat.com
#
class HttrackExportStrategy

  def initialize(process_runner, export_inspector)
    @process_runner = process_runner
    @export_inspector = export_inspector
    @log = DefaultLogger.logger
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
    @process_runner.execute!("httrack --list #{links_file.to_path} -O #{export_directory} --disable-security-limits -c50 --max-rate 0 -v +\"http://#{drupal_host}*\" -\"*/node*\" -o0")
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

  #
  # Export the given links, from the specified drupal host into the given export directory
  #
  def export!(links_file, drupal_host, export_directory)

    if check_if_update_to_existing_export(export_directory)
      run_update_to_existing_export(export_directory)
    else
      run_new_export(links_file, drupal_host, export_directory)
    end

    exported_to = "#{export_directory}/#{determine_export_directory_from_drupal_host(drupal_host)}"
    @export_inspector.inspect_export(links_file, exported_to)
    exported_to
  end

  private :run_new_export, :run_update_to_existing_export, :check_if_update_to_existing_export

end