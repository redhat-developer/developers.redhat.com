require_relative 'base'
require_relative '../../../_cucumber/lib/helpers/products_helper.rb'

class ProductOverviewPage < Base

  class << self
    include ProductsHelper
  end

  OVERVIEW      = { xpath: "//*[@class='side-nav']//a[contains(text(),'Overview')]" }
  GET_STARTED   = { xpath: "//*[@class='side-nav']//a[contains(text(),'Get Started')]" }
  DOCS_AND_APIS = { xpath: "//*[@class='side-nav']//a[contains(text(),'Docs and APIs')]" }
  LEARN         = { xpath: "//*[@class='side-nav']//a[contains(text(),'Learn')]" }
  DOWNLOAD      = { xpath: "//*[@class='side-nav']//a[contains(text(),'Download')]" }
  BUZZ          = { xpath: "//*[@class='side-nav']//a[contains(text(),'Buzz')]" }

  def initialize(driver)
    super
  end

  def open(page)
    visit("/products/#{page}/overview")
    wait_for_ajax
    wait_for { displayed?(css: ".products#{page}overview") }
  end

  def side_nav_item_displayed?(nav_item)
    case nav_item
      when 'Overview'
        el = OVERVIEW
      when 'Get Started'
        el = GET_STARTED
      when 'Docs and APIs'
        el = DOCS_AND_APIS
      when 'Learn'
        el = LEARN
      when 'Download'
        el = DOWNLOAD
      when 'Buzz'
        el = BUZZ
      else
        raise("#{nav_item} is not a recognised side nav item")
    end
    displayed?(el)
  end

end
