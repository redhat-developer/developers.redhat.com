class PrimaryNav < Base

  PRIMARY_NAV_BAR = '.primary-nav'

  def links(link)
    page.within(PRIMARY_NAV_BAR) do
      case link
        when 'Solutions'
          page.has_link?('Solutions', href: BASE_URL+'/solutions/')
        when 'Products'
          page.has_link?('Products', href: BASE_URL+'/products/')
        when 'Downloads'
          page.has_link?('Downloads', href: BASE_URL+'/downloads/')
        when 'Resources'
          page.has_link?('Resources', href: BASE_URL+'/resources/')
        when 'Community'
          page.has_link?('Community', href: BASE_URL+'/projects/')
        when 'Events'
          page.has_link?('Events', href: BASE_URL+'/events/')
        when 'Blogs'
          page.has_link?('Blogs', href: 'http://developerblog.redhat.com')
        else
          raise "#{link} was not found, check the feature file for a typo"
      end
    end
  end

end
