class PrimaryNav < Base

  PRIMARY_NAV_BAR = '.primary-nav'

  def links(link)
    within(PRIMARY_NAV_BAR) do
      case link.downcase
        when 'solutions'
          page.has_link?(link, href: BASE_URL+'/solutions/')
        when 'products'
          page.has_link?(link, href: BASE_URL+'/products/')
        when 'downloads'
          page.has_link?(link, href: BASE_URL+'/downloads/')
        when 'resources'
          page.has_link?(link, href: BASE_URL+'/resources/')
        when 'community'
          page.has_link?(link, href: BASE_URL+'/projects/')
        when 'events'
          page.has_link?(link, href: BASE_URL+'/events/')
        when 'blogs'
          page.has_link?(link, href: 'http://developerblog.redhat.com')
        else
          raise "#{link} was not found, check the feature file for a typo"
      end
    end
  end

end
