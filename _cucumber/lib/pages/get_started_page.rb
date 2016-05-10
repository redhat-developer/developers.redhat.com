require_relative 'base'
require_relative '../../../_cucumber/lib/helpers/products_helper.rb'

class GetStartedPage < Base

  class << self
    include ProductsHelper
  end

  TC_WHEN_SIGNED    = { id: '#tcWhenSigned' }
  THANK_YOU_TEXT    = { id: 'thank-you' }
  THANK_YOU_SECTION = { css: '.downloadthankyou' }

  def initialize(driver)
    super
    verify_page('Get Started')
  end

  def loaded?(product_id)
    wait_for(60) { get_started_page_for(product_id) }
  end

  def get_started_page_for(product)
    displayed?(css: ".products#{product}get-started")
  end

  def terms_and_conditions_agreement_message
    text = text_of(THANK_YOU_TEXT)
    text =~ /By downloading this product you have agreed with our terms and conditions (on\s+(?:January|February|March|April|May|June|July|August|September|October|November|December)\s+\d{1,2},\s+\d{4}). You will be notified again in \d{3} days after your subscription ends./
  end

  def thank_you_text
    wait_for(60) { displayed?(THANK_YOU_TEXT) }
    text_of(THANK_YOU_TEXT)
  end

end
