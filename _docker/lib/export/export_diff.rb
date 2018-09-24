require 'nokogiri'
require 'time'

require_relative '../default_logger'

module RedhatDeveloper
  module Export

    #
    # Uses the sitemap.xml of the current export and a previous export to determine a list of URLs that have changed
    # content between runs of the export process.
    #
    # @author rblake@redhat.com
    #
    class ExportDiff
      def initialize(export_archive_directory)
        @export_archive_directory = export_archive_directory
        @log = DefaultLogger.logger
      end

      #
      # Builds an array of URLs that have changed since the previous export. A URL is deemed to have changed if the <lastmod>
      # entry for the URL in the current sitemap.xml is after the <lastmod> entry for the URL in the sitemap.xml of the previous
      # export.
      #
      # The previous export is determined by looking within the export archive directory and selecting the most recently archived
      # export. If no archives exist or the sitemap.xml within the archive cannot be read, then the process will return an
      # empty array of changed content. Additionally if the current sitemap.xml is malformed, then again an empty array is returned.
      #
      def modified_content_urls(export_directory)
        @log.info('Checking to see if any page content has changed since last run of the export...')
        current_sitemap = load_current_sitemap(export_directory)
        return [] if current_sitemap.nil?

        previous_sitemap = load_previous_sitemap
        return [] if previous_sitemap.nil?

        content = check_for_modified_content(current_sitemap, previous_sitemap)
        @log.info("A total of '#{content.size}' pages have changed their content since the last run of the export.")
        content
      end

      private

      def load_current_sitemap(export_directory)
        sitemap_xml_path = "#{ export_directory }/sitemap.xml"
        current_sitemap = load_sitemap_xml(sitemap_xml_path)
        if current_sitemap.nil?
          @log.warn("Unable to locate sitemap.xml for current export at expected location '#{sitemap_xml_path}'. Cannot generate list of URLs to clear from cache.")
        end

        @log.info("\tUsing current sitemap.xml at location '#{sitemap_xml_path}'.")
        current_sitemap
      end

      def load_previous_sitemap
        previous_export_directory = Dir.glob("#{ @export_archive_directory }/export-*").sort.select{ |directory| File.exist?("#{ directory }/sitemap.xml") }.last

        if previous_export_directory.nil?
          @log.warn("Unable to perform export comparison as there appear to be no previous exports within the export archive directory '#{ @export_archive_directory }'.")
          return nil
        end

        @log.info("\tUsing sitemap.xml from previous export archived at '#{ previous_export_directory }' to determine any modified content.")
        load_sitemap_xml("#{ previous_export_directory }/sitemap.xml")
      end

      def load_sitemap_xml(sitemap_xml_path)
        return nil unless File.exist?(sitemap_xml_path)

        xml_document = nil

        begin
          xml_document = Nokogiri::XML(File.open(sitemap_xml_path))
          if xml_document.css('url').size == 0
            log.warn("A sitemap.xml exists at '#{ sitemap_xml_path }' but it contains 0 <url> entries and cannot be used to determine content that has changed.")
            return nil
          end
        rescue
          @log.error("Failed to parse or open sitemap.xml at path '#{ sitemap_xml_path }'.")
          return nil
        end

        xml_document
      end


      def build_lastmod_hash(sitemap)
        url_modification_dates = {}
        sitemap.css('url').each do |url|
          location = url.css('loc')
          unless location.empty?
            last_modification_time = url.css('lastmod')
            url_modification_dates[location.first.text] = last_modification_time.empty? ? Time.now.to_s : last_modification_time.first.text
          end
        end

        url_modification_dates
      end


      def check_for_modified_content(current_sitemap, previous_sitemap)

        previous_urls = build_lastmod_hash(previous_sitemap)
        current_urls = build_lastmod_hash(current_sitemap)

        modified_urls = []

        current_urls.keys.each do |url|
          current_timestamp = current_urls[url]
          previous_timestamp = previous_urls[url]

          if previous_timestamp.nil?
            @log.info("\tURL '#{ url }' did not exist in the previous export and is new content. No cache clear required.")
            next
          end

          if Time.parse(current_timestamp) > Time.parse(previous_timestamp)
            @log.info("\tContent of URL '#{ url }' has changed. <lastmod> in current sitemap '#{ current_timestamp }', <lastmod> in previous sitemap '#{ previous_timestamp }'.")
            modified_urls.push(url)
          end

        end
        modified_urls

      end
    end
  end
end
