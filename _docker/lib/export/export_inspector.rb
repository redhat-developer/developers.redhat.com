#
# The purpose of this class is to inspect an export directory to ensure that all pages that should be there, are in fact there.
#
# @author rblake@redhat.com
#
class ExportInspector

  #
  # Determines the filesystem path at which the .html page export should exist
  #
  def determine_expected_filesystem_path(url)
    first_slash = url.index('/', 'http://'.length)
    page_path = url[first_slash..url.length]
    if page_path == '/'
      '/index.html'
    else
      "#{page_path}.html"
    end
  end

  #
  # Checks to see if the path exists at the expected path in the export directory
  #
  def check_if_path_exists(url, expected_file_path, export_directory)
    expected_path = "#{export_directory}#{expected_file_path}"
    exists = FileTest.exist?(expected_path)
    unless exists
      puts "WARNING: Cannot locate export of '#{url}' at expected path: '#{expected_path}'"
    end
    exists
  end

  #
  # Inspects the export to see if everything is there as expected.
  #
  def inspect_export(url_list, export_directory)

    puts "================================ EXPORT SUMMARY ================================"

    total_pages = 0
    missing_pages = 0

    File.open(url_list,'r') do | file |
      file.each_line do | line |

        url = line.strip
        expected_file_system_path = determine_expected_filesystem_path(url)
        exists = check_if_path_exists(url, expected_file_system_path, export_directory)

        total_pages += 1
        unless exists
          missing_pages += 1
        end
      end
    end

    if missing_pages > 0
      puts "WARNING: Of '#{total_pages}' pages, '#{missing_pages}' are not found in the export."
    end

  end

  private :determine_expected_filesystem_path, :check_if_path_exists


end