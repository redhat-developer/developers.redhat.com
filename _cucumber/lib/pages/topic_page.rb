require_relative 'abstract/site_base'

# this is the page class that contains all elements and common methods related to the Topics page.
class TopicPage < SiteBase
  element(:topics_header)          { |b| b.element(class: 'topics-header') }
  elements(:tertiary_cards)        { |b| b.divs(class: 'tertiary-promo') }
  elements(:white_cards)           { |b| b.elements(css: '#topic-resources > ul > a > li') }

  def open_topic(topic)
    open("/#{topic}")
    topics_header.present?
  end

end
