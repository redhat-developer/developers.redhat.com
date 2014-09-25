require 'uri'
require 'aweplug/helpers/cdn'
require 'aweplug/helpers/resources'
require 'aweplug/helpers/png'
require 'compass'
require 'asciidoctor'
require 'asciidoctor/extensions'
require 'pathname'

module JBoss
  module Developer
    # Setup our Asciidoctor postprocessor for images
    module Asciidoctor
      class CdnImagePreprocessor < ::Asciidoctor::Extensions::Preprocessor
        def initialize site
          super
          @site = site
        end

        def process document, reader
          lines = []
          reader.lines.each do |line|
            if line.include? 'image:'
              match_data = line.match(/image([:]+)(.*?)\[(.*?)\]/)
              if match_data.captures[1].start_with? 'http' # looking for urls
                lines << line
                next
              else
                final_path = Pathname.new File.join(document.base_dir, match_data.captures[1])
                site_base = Pathname.new(@site.dir)
                # try the timo location
                if !final_path.exist?
                  final_path = Pathname.new File.join(document.base_dir, '_ticket-monster', 'tutorial', match_data.captures[1])
                end
                if !final_path.exist? # Can't find it, just use whatever is there
                  lines << line
                  next
                end
                final_location = final_path.relative_path_from(site_base).to_s
              end
              resource = Aweplug::Helpers::Resources::SingleResource.new @site.dir, @site.cdn_http_base, @site.cdn_out_dir, @site.minify, @site.cdn_version 
              lines << "image#{match_data.captures.first}#{resource.path(final_location)}[#{match_data.captures.last}]"
            else
              lines << line
            end
          end
          ::Asciidoctor::Reader.new lines
        end
      end

      class ExtensionGroup < ::Asciidoctor::Extensions::Group
        def initialize site
          @site = site
        end
        def activate registry
          if @site.cdn_http_base
            registry.preprocessor CdnImagePreprocessor.new(@site)
          end
        end
      end
    end

    # Public: Awestruct Transformer that adds the "external-link" class to
    # external HTML links.
    class LinkTransformer
      def transform site, page, content
        if page.output_extension == ".html"
          doc = Nokogiri::HTML(content)
          altered = false
          doc.css('a').each do |a|
            url = a['href']
            if (external?(url, site.base_url) && !(has_non_text_child? a))
              classes = (a['class'] || "").split(/\s+/)

              unless classes.include? 'external-link'
                classes << 'external-link'
              end

              a['class'] = classes.uniq.join ' '
              altered = true
            end
          end
          content = doc.to_html if altered
        end
        content
      end

      private

      def external? url, base_url
        url && !url.start_with?(base_url) && url !~ /^((https?:)?\/\/)(.*?)?\.jboss.org/ && url =~ /^((https?:)?\/\/)/
      end

      def has_non_text_child? a
        return true if a.xpath('.//img', './/button', './/i').size > 0
        false
      end
    end

    module Extensions
      class AsciidoctorExtensionRegister
        def execute site
          ::Asciidoctor::Extensions.register :jbossdeveloper, ::JBoss::Developer::Asciidoctor::ExtensionGroup.new(site)
        end
      end
    end

    module Utilities

      def js_compress( input )
        if site.minify
          # Require this late to prevent people doing devel needing to set up a JS runtime
          require 'uglifier'
          Uglifier.new(:mangle => false).compile(input)
        else
          input
        end
      end

      def download_manager_path(product, version) 
        "#{site.download_manager_file_base_url}/#{product}/#{version}/download"
      end

      def truncate_para(p, max_length = 150)
        out = ""
        i = 0
        p.gsub(/<\/?[^>]*>/, "").scan(/[^\.!?,]+[\.!?,]/).map(&:strip).each do |s|
          i += s.length
          if i > max_length
            break
          else
            out << s
          end
        end
        out
      end

      def primary_section_class(key, value)
        unless page.primary_section.nil?
          "active" if page.primary_section == key
        else
          unless value.path.nil?
            "active" if page.output_path.match(/^#{value.path}\/index.html$/)
          else
           "active" if  page.output_path.match(/^\/#{key}\/index.html$/)
          end
        end
      end

      def secondary_section_class(key, value)
        unless page.secondary_section.nil?
          "active" if page.secondary_section == key
        else
          unless value.path.nil?
            "active" if page.output_path.match(/^#{value.path}\/index.html$/)
          else
            "active" if page.output_path.match(/^\/#{key}\/index.html$/)
          end
        end
      end

      class CompassConfigurator

        SPRITES_DIR = "sprites"
        SPRITES_PATH = Pathname.new("images").join(SPRITES_DIR)

        def initialize
          
        end

        def execute(site)
          if site.cdn_http_base
            cdn = Aweplug::Helpers::CDN.new(SPRITES_DIR, site.cdn_out_dir, site.version)
            if File.exists? Aweplug::Helpers::CDN::EXPIRES_FILE
              FileUtils.cp(Aweplug::Helpers::CDN::EXPIRES_FILE, cdn.tmp_dir.join(".htaccess"))
            end
            FileUtils.mkdir_p cdn.tmp_dir
            # Load this late, we don't want to normally require pngquant
            Compass.configuration.generated_images_dir = cdn.tmp_dir.to_s
            if Aweplug::Helpers::CDN::ENV_PREFIX.nil?
              Compass.configuration.http_generated_images_path = "#{site.cdn_http_base}/#{SPRITES_DIR}"
            else
              Compass.configuration.http_generated_images_path = "#{site.cdn_http_base}/#{Aweplug::Helpers::CDN::ENV_PREFIX}/#{SPRITES_DIR}"
            end
            # Run sprites through pngquant on creation
            Compass.configuration.on_sprite_saved { |filename| Aweplug::Helpers::PNGFile.new(filename).compress! }
          else
            Compass.configuration.generated_images_dir = SPRITES_PATH.to_s
            Compass.configuration.http_generated_images_path = "#{site.base_url}/#{SPRITES_PATH}"
          end
        end

      end

    end
  end
end

# Hack for our own purposes with QuickStarts
module Kramdown
  module Parser
    class QuickStartParser 
      def add_link(el, href, title, alt_text = nil)
        if el.type == :a
          if href =~ /README\.md/
            el.attr['href'] = '../index.html' + "##{URI.parse(href).fragment}"
          elsif href =~ /CONTRIBUTING\.md/
            el.attr['href'] = 'contributing/index.html' + "##{URI.parse(href).fragment}"
          else
            el.attr['href'] = href
          end 
        else
          # TODO something needs to be done about images too
          el.attr['src'] = href
          el.attr['alt'] = alt_text
          el.children.clear
        end
        el.attr['title'] = title if title
        @tree.children << el
      end
    end
  end
end 

class DateTime
  def pretty
    a = (Time.now-self.to_time).to_i

    case a
    when 0 then 'just now'
    when 1 then 'a second ago'
    when 2..59 then a.to_s+' seconds ago' 
    when 60..119 then 'a minute ago' #120 = 2 minutes
    when 120..3540 then (a/60).to_i.to_s+' minutes ago'
    when 3541..7100 then 'an hour ago' # 3600 = 1 hour
    when 7101..82800 then ((a+99)/3600).to_i.to_s+' hours ago' 
    when 82801..172000 then 'a day ago' # 86400 = 1 day
    when 172001..518400 then ((a+800)/(60*60*24)).to_i.to_s+' days ago'
    when 518400..1036800 then 'a week ago'
    when 1036800..4147200 then ((a+180000)/(60*60*24*7)).to_i.to_s+' weeks ago'
    else self.strftime("%F")
    end
  end
end

