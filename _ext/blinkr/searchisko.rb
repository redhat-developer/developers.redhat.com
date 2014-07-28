module JBoss
  module Developer
    module Blinkr
      class Searchisko

        DEFAULT_PATH = 'searchisko_warnings.json'
        TMPL = File.expand_path('searchisko.html.slim', File.dirname(__FILE__))
        
        def initialize config
          @config = config
          @searchisko_warnings_url = @config.searchisko_warnings || URI.join(@config.base_url + '/', DEFAULT_PATH)
        end

        def analyze context, typhoeus
          resp = Typhoeus.get(@searchisko_warnings_url)
          if resp.success?
            context.searchisko_warnings = JSON.parse(resp.body)
          elsif resp.timed_out?
            puts "Error loading #{@searchisko_warnings_url}. Server timed out."
          elsif resp.code == 0
            puts "Error loading #{@searchisko_warnings_url}. #{resp.return_message}."
          else
            puts "Error loading #{@searchisko_warnings_url}. HTTP request failed: #{resp.code.to_s}"
          end
        end

        def append context
          warnings_count = context.searchisko_warnings.inject(0) { |sum, push| sum + push['body']['warnings'].length }
          Slim::Template.new(TMPL).render(OpenStruct.new({ :warnings => context.searchisko_warnings, :warnings_count => warnings_count }))
        end

      end
    end
  end
end

