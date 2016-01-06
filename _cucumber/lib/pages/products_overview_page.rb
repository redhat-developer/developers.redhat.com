require_relative 'base_page'
require_relative '../../../_cucumber/lib/helpers/products_helper.rb'
require 'date'

class ProductOverviewPage < BasePage
  set_url "/products{/product}/overview"

  class << self
    include ProductsHelper
  end

  SIDE_NAV_LINKS = ['Overview', 'Get Started', 'Docs and APIs', 'Learn', 'Download', 'Buzz']
  SIDE_NAV_LINKS.each do |el|
   element :"side_nav_#{el.downcase.tr(' ', '_')}_link", :xpath, "//*[@class='side-nav']//a[contains(text(),'#{el}')]"
  end

  # get_products[0].each do |product_id|
  #   element :"#{product_id}_product_overview_page", ".products#{product_id}overview"
  # end
  element :cdk_product_overview_page, ".productscdkoverview"

  # get_products[0].each do |product_id|
  #   element :"#{product_id}_product_overview_page", ".products#{product_id}overview"
  # end
  element :cdk_get_started_page, ".productscdkget-started"
  element :eap_get_started_page, ".productseapget-started"
  element :thank_you_section, '#downloadthankyou'
  element :thank_you_text, '#thank-you'


  def initialize(driver)
    super
  end

  def open(page)
    load(product: page)
    wait_for_ajax
  end

  def terms_and_conditions_agreement_message
    thank_you_text.text =~ /By downloading this product you have agreed with our terms and conditions (on\s+(?:January|February|March|April|May|June|July|August|September|October|November|December)\s+\d{1,2},\s+\d{4}). You will be notified again in \d{3} days after your subscription ends./
  end

end
