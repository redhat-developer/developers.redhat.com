require_relative 'abstract/site_base'

# this is the page class that contains all elements and common methods related to the Getting started on ... page
class GetStartedPage < SiteBase

  element(:download_thankyou) { |b| b.div(id: 'downloadthankyou') }

  value(:thank_you_text) { |p| p.download_thankyou.wait_until(timeout: 30, &:present?).text }

  def loaded?(product)
    @browser.element(css: ".products#{product}get-started").wait_until(timeout: 60, &:present?)
  end

end
