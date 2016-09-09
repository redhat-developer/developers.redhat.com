require_relative 'abstract/site_base'

class PromotionsPage < SiteBase

  element(:download_btn)             { |b| b.link(text: 'DOWNLOAD NOW') }
  element(:download_retry_link)      { |b| b.link(text: 'Click here') }
  element(:promo_image)              { |b| b.element(class: 'microsite-graphic') }

  action(:click_download_btn)        { |p| p.download_btn.when_present.click }
  action(:click_download_retry_link) { |p| p.download_retry_link.when_present.click }

  def go_to_promotion(promo)
    open("/promotions/#{promo}")
  end

  def get_download
    promo_image.when_present
    response = RestClient.head @browser.url
    content_length = response.headers[:content_length]
    content_type   = response.headers[:content_type]
    return content_length, content_type
  end

end
