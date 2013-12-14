require 'yaml'
require 'aweplug/handlers/synthetic_handler'
require 'awestruct/page'
require 'awestruct/handlers/layout_handler'
require 'awestruct/handlers/tilt_handler'
require 'awestruct/handler_chain'

module JBoss::Developer::Extensions
  class Stacks
    attr_reader :yml

    SYNTHETIC_HANDLER_CHAIN = ::Awestruct::HandlerChain.new(
      ::Awestruct::Handlers::NonInterpolatingTiltMatcher.new(),
      ::Aweplug::Handlers::SyntheticHandler,
      ::Awestruct::Handlers::TiltHandler,
      ::Awestruct::Handlers::LayoutHandler
    )

    def initialize stacks, layout
      case stacks
      when File, Pathname
        @yml = YAML.load_file stacks
      else
        @yml = YAML.load stacks
      end

      @layout = layout
    end

    def execute site
      binding.pry
      yml['availableRuntimes'].each do |runtime|
        # WARNING Hacks below
        case runtime['labels']['runtime-type']
        when 'JPP'
          product = 'portal'
        when 'EAP'
          product = 'eap'
        else
          next
        end
        bom_page = ::Awestruct::Page.new(site,
                     ::Awestruct::Handlers::LayoutHandler.new(site,
                       ::Awestruct::Handlers::TiltHandler.new(site,
                         ::Aweplug::Handlers::SyntheticHandler.new(site, 'p.test Hello World!',
                                                                   "/products/#{product}/boms.html.slim"))))
        bom_page.layout = @layout
        bom_page.output_path = "/products/#{product}/boms/index.html"
        metadata = {:title => 'Bill of Materials'}
        bom_page.send('metadata=', metadata)
        site.pages << bom_page
      end
    end

  end
end
