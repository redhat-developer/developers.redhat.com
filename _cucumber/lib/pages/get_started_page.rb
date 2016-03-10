require_relative 'base_page'
require_relative '../../../_cucumber/lib/helpers/products_helper.rb'

class DownloadConfirmationSection < SitePrism::Section
  element :tc_when_signed, '#tcWhenSigned'
  element :thank_you_text, '#thank-you'
end

class GetStartedPage < BasePage
  set_url "/products{/product}/get-started"

  class << self
    include ProductsHelper
  end

  get_products[0].each do |product_id|
    element :"#{product_id}_get_started_page", ".products#{product_id}get-started"
  end

  def initialize(driver)
    super
    wait_for_ajax
  end

  section :thank_you_section, DownloadConfirmationSection, '.downloadthankyou'

  def terms_and_conditions_agreement_message
    thank_you_text.text =~ /By downloading this product you have agreed with our terms and conditions (on\s+(?:January|February|March|April|May|June|July|August|September|October|November|December)\s+\d{1,2},\s+\d{4}). You will be notified again in \d{3} days after your subscription ends./
  end

end
