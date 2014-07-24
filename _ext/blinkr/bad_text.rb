require 'ostruct'

module JBoss
  module Developer
    module Blinkr
      class BadText

        PATTERNS = [ /Lorem/, /Todo/, /todo/ ]

        def initialize config
          @config = config
        end

        def collect page
          _collect page.body, page.errors
        end

        def _collect node, errors
          if node.text?
            PATTERNS.each do |pattern|
              if pattern.match(node.text)
                errors << OpenStruct.new({ :severity => 'warning', :category => 'Content', :type => 'Bad text detected',  :title => %Q{"#{node.text}" (line #{node.line})}, :message => 'mock text', :snippet => node.to_s, :icon => 'fa-strikethrough' })
              end
            end
          else
            node.children.each do |child|
              _collect child, errors
            end
          end
        end
      end
    end
  end
end

