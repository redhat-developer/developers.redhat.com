require_relative 'abstract/site_base'

class GetStartedPage < SiteBase

  element(:download_thankyou)  { |b| b.div(id: 'downloadthankyou') }

  value(:thank_you_text)  { |p| p.download_thankyou.when_present.text }

  def loaded?(product)
    @browser.element(css: ".products#{product}get-started").wait_until_present
  end

end
