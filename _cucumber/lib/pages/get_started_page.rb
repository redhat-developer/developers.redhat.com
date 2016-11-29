require_relative 'abstract/site_base'

class GetStartedPage < SiteBase

  element(:download_thankyou)  { |b| b.div(id: 'downloadthankyou') }

  value(:thank_you_text)  { |p| p.download_thankyou.wait_until(timeout: 30, &:present?).text }

  def loaded?(product)
    @browser.element(css: ".products#{product}get-started")
  end

end
