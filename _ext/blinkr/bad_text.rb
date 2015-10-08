require 'blinkr/error'

module JBoss
  module Developer
    module Blinkr
      class BadText

        PATTERNS = [ /Lorem/, /Todo/, /todo/ ]

        def initialize config
          @config = config
        end

        def collect page
          _collect page.response.effective_url, page.body, page.errors
        end

        def _collect url, node, errors
          if node.text?
            PATTERNS.each do |pattern|
              if pattern.match(node.text)
                errors << Blinkr::Error.new({:severity => :warning,
                                             :category => 'Content',
                                             :type => 'Bad Text Detected',
                                             :url => url,
                                             :title => "#{node.text} (line #{node.line})",
                                             :code => nil,
                                             :message => 'mock text',
                                             :detail => nil,
                                             :snippet => node.to_s,
                                             :icon => 'fa-strikethrough'
                                           })
              end
            end
          else
            node.children.each do |child|
              _collect url, child, errors
            end
          end
        end
      end
    end
  end
end

