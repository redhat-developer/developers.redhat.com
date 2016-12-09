require_relative 'abstract/site_base'

# this is the page class that contains all elements and common methods related to the Home page.
class HomePage < SiteBase
  page_url('/')
  expected_element(:element, class: 'homepage-main')
  # page_title('Red Hat Developers')
end
