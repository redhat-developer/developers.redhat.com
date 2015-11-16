require_relative 'base_page.rb'

class PrimaryNav < BasePage

  element :login_link, '.login'
  element :register, '.register'
  element :logged_in_name, '.logged-in-name'
  element :logout_link, '.logout'

  PRIMARY_NAV_TABS   = %i[Solutions Products Downloads Resources Community Events Blogs]

  PRIMARY_NAV_TABS.each do |tab|
    element :"primary_nav_#{tab.downcase}_link", :xpath, "//nav[@class='primary-nav']//ul/li/*[contains(text(),'#{tab}')]"
  end

  def initialize(driver)
    super
  end

end
