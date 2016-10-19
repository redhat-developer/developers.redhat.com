require_relative 'abstract/site_base'

class HomePage < SiteBase
  page_url('/')
  expected_element(:element, class: 'homepage-main')
  #page_title('Red Hat Developers')
end
