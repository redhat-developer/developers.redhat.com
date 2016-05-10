require 'uri'
require 'aweplug/helpers/cdn'
require 'aweplug/helpers/resources'
require 'aweplug/helpers/png'
require 'aweplug/helpers/drupal_service'
require 'awestruct/util/exception_helper'
require 'compass'
require 'asciidoctor'
require 'asciidoctor/extensions'
require 'pathname'
require 'fileutils'

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

    class HighValueInteractionDataPreparer
      def execute site
        res = []
        site.high_value_interactions.each do |n, act|
          begin
            res << {:from => URI.parse(act['from']).path, :to => act['to']}
          rescue URI::InvalidURIError
            res << {:from => act[:from], :to => act['to']}
          end
        end
        site.high_value_interactions = res
      end
    end

    class DrupalTransformer
      def initialize(site)
        @drupal = Aweplug::Helpers::Drupal8Service.default site
      end

      def transform site, page, content
        if page.output_extension.include?('htm')
          resp = nil
          begin
            resp = @drupal.send_page page, content
            raise "Drupal POST request error for #{page.output_path}" unless resp.success?
          rescue Exception => e
            begin
              resp = @drupal.send_page page, content
            rescue Exception => e
              ::Awestruct::ExceptionHelper.log_building_error e, page.relative_source_path
              puts "Error making second drupal request to '#{page.output_path}'."
            end
          end
        end
        content # Don't mess up the content locally in _site
      end
    end

    # Public: Awestruct Transformer that adds the "external-link" class to
    # external HTML links and the "high-value class to high value interactions.
    class LinkTransformer
      def transform site, page, content
        if page.output_extension == ".html"
          doc = Nokogiri::HTML(content)
          altered = false
          doc.css('a').each do |a|
            url = a['href']

            # Add external links
            unless page.metadata.nil? # check to see if we're a demo or quickstart
              if (url && !url.start_with?('http') && !url.start_with?('#') && !url.start_with?('mailto'))
                found_page = has_page_by_uri? site, page, url

                # If we haven't found the page, start trying to make substitions for the url
                unless found_page
                  if (url.include?('.md') || url.include?('README'))
                    if has_page_by_uri? site, page, File.join(site.base_url, 'quickstarts', page.metadata[:product] || '', url)
                      a['href'] = File.join(site.base_url, 'quickstarts', page.metadata[:product] || '', url.gsub(/README\.(md|html)/, 'index.html'))
                    else # We don't have it at all, so we'll go to github
                      if (page.metadata[:browse].include?('blob') || page.metadata[:browse].include?('tree'))
                        a['href'] = File.join page.metadata[:browse], url
                      # We want to link to the master branch
                      else
                        a['href'] = File.join page.metadata[:browse], '/blob/master', url
                      end
                    end
                    altered = true
                  end
                end
              end
            end

            if (external?(url, site.base_url) && !(has_non_text_child? a))
              classes = (a['class'] || "").split(/\s+/)

              unless classes.include? 'external-link'
                classes << 'external-link'
              end

              a['class'] = classes.uniq.join ' '
              altered = true
            end
            # Add high-value-interaction class
            site.high_value_interactions.each do |act|
              if (act[:from] == page.output_path || "#{act[:from]}index.html" == page.output_path) && url == act[:to]
                classes = (a['class'] || "").split(/\s+/)
                unless classes.include? 'high-value-interaction'
                  classes << 'high-value-interaction'
                end

                a['class'] = classes.uniq.join ' '
                altered = true
              end
            end
          end
          # if doc.xpath('@style|.//@style')
          #   altered = true
          #   doc.xpath('@style|.//@style').remove
          # end
          content = doc.to_html if altered
        end
        content
      end

      private

      def external? url, base_url
        url && !url.start_with?(base_url) && url !~ /^((https?:)?\/\/)(.*?)?\.redhat.com/ && url =~ /^((https?:)?\/\/)/
      end

      def has_page_by_uri? site, page, url
        fixed_url = url
        fixed_url = "#{fixed_url}index.html" if fixed_url.end_with? '/'
        fixed_url = "#{fixed_url}/index.html" unless fixed_url.end_with? 'html'

        site.pages.find do |p|
          begin
            File.join(site.base_url, p.output_path.gsub(/\s+/, '+')) == File.join(site.base_url, page.output_path.gsub(/\s+/, '+'), fixed_url)
          rescue
            false
          end
        end
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

# Pulling in for easy testing
require 'logger'
require 'aweplug/helpers/faraday'
require 'logger'
require 'json'
require 'uri'

module Aweplug
  module Helpers
    # Public: A helper class for using drupal services.
    class Drupal8Service

      def self.default site
        Aweplug::Helpers::Drupal8Service.new({:base_url => site.drupal_base_url,
                                          :drupal_user => ENV['drupal_user'],
                                          :drupal_password => ENV['drupal_password']})
      end

      # Public: Initialization of the object, keeps a Faraday connection cached.
      #
      # opts - symbol keyed hash, see Aweplug::Helpers::Faraday.default for
      #        other options. Current keys used:
      #        :base_url - base url for the searchisko instance
      #        :drupal_username - Username to use for auth
      #        :drupal_password - Password to use for auth
      #
      # Returns a new instance of Searchisko.
      def initialize opts={}
        unless [:drupal_user, :drupal_password].all? {|required| opts.key? required}
          raise 'Missing drupal credentials'
        end
        FileUtils.mkdir_p '_tmp'
        @logger = Logger.new('_tmp/drupal8.log', 'daily')
        opts.merge({:no_cache => true, :logger => @logger})
        @faraday = Aweplug::Helpers::FaradayHelper.default(opts[:base_url], opts)
        @faraday.basic_auth(opts[:drupal_user], opts[:drupal_password])
        @faraday.builder.delete(Faraday::Response::RaiseError) #remove response status checking since data not in the cache isn't necessarily an error.
        @base_url = opts[:base_url]
        #session_info = JSON.parse (login opts[:drupal_user], opts[:drupal_password]).body
        #@cookie = "#{session_info['session_name']}=#{session_info['sessid']}"
        #@token = token opts[:drupal_user], opts[:drupal_password]
      end

      def send_page page, content
        path = page.output_path.chomp('/index.html')
        path = path[1..-1] if path.starts_with? '/'
        drupal_type = page.drupal_type || 'page'
        payload = {:title => [{:value => (page.title || page.site.title || path.gsub('/', ''))}],
                   :_links => {:type => {:href => File.join(@base_url, '/rest/type/node/', drupal_type)}},
                   :body => [{:value => content,
                              :summary => page.description,
                              :format => "full_html"}],
                   #:field_output_path => [{:value => path}],
                    :path => {:alias => File.join('/', path)}
                  }

        if drupal_type == 'rhd_solution_overview'
          payload[:field_solution_name] = [{:value => page.solution.name }]
          payload[:field_solution_tag_line] = [{:value => page.solution.long_description }]
        end
        # TODO: cache this so we know to update or create
        post 'entity', 'node', payload
      end

      # Public: Makes an HTTP GET to host/endpoint/#{path} and returns the
      # result from the Faraday request.
      #
      # endpoint  - String containing endpoint to the service.
      # path      - String containing the rest of the path.
      # params    - Hash containing query string parameters.
      #
      # Example
      #
      #   drupal.get 'api', 'node/7'
      #   # => Faraday Response Object
      #
      # Returns the Faraday Response for the request.
      def get endpoint, path, params = {}
        response = @faraday.get URI.escape(endpoint + "/" + path) do |req|
          req.headers['Content-Type'] = 'application/json'
          req.headers['Accept'] = 'application/json'
          #req.headers['X-CSRF-Token'] = @token
          #req.headers['Cookie'] = @cookie if @cookie
          req.params = params
        end
        unless response.success?
          $LOG.warn "Error making drupal GET request to #{path}. Status: #{response.status}." if $LOG.warn?
        end
        response
      end

      # Public: Perform an HTTP POST to drupal.
      #
      # endpoint  - String containing endpoint to the service.
      # path      - String containing the rest of the path.
      # params    - Hash containing query string parameters.
      #
      # Examples
      #
      #   drupal.post "api", "node", {title: 'Hello', type: 'page'}
      #   # => Faraday Response
      def post endpoint, path, params = {}
        resp = @faraday.post do |req|
          req.url endpoint + "/" + path
          req.headers['Content-Type'] = 'application/hal+json'
          req.headers['Accept'] = 'application/hal+json'
          #req.headers['X-CSRF-Token'] = @token if @token
          #req.headers['Cookie'] = @cookie if @cookie
          unless params.is_a? String
            req.body = params.to_json
          else
            req.body = params
          end
          if @logger
            @logger.debug "request body: #{req.body}"
          end
        end
        resp
      end

      #private

      #def login username, password
        #post 'content', 'user/login', {:username => username, :password => password}
      #end

      #def token username, password
        #JSON.parse((post 'content', 'user/token', {:username => username, :password => password}).body)['token']
      #end
    end
  end
end

# Hack for our own purposes with QuickStarts
module Kramdown
  module Parser
    class QuickStartParser 
      def add_link(el, href, title, alt_text = nil)
        if el.type == :a
          if href =~ /^http[s]?:/
            el.attr['href'] = href # If the link is absolute let it go
          elsif href =~ /CONTRIBUTING\.md/
            el.attr['href'] = href.gsub('CONTRIBUTING.md', 'contributing/index.html')
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

