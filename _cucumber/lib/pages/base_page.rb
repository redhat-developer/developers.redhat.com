class BasePage < SitePrism::Page
  include Capybara::DSL

  attr_reader :driver

  primary_nav_actions = %i[register login logout]
  primary_nav_actions.each do |action|
    element :"#{action}_link", ".#{action}"
  end

  primary_nav_tabs = %i[Topics Technologies Community Resources Downloads]
  primary_nav_tabs.each do |tab|
    element :"primary_nav_#{tab.downcase}_link", :xpath, "//nav[@class='mega-menu']//ul/li/*[contains(text(),'#{tab.capitalize}')]"
  end

  element :nav_toggle, '.nav-toggle'
  element :nav_open, '.nav-open'
  element :logged_in?, '.logged-in'
  element :logged_in_name_link, '.logged-in-name'
  element :p_title, '.hero'
  element :loading_spinner, '.results loading'
  element :verification_message, '#kc-feedback-wrapper'
  element :logged_in_state, '.login'
  element :login_divider, '.login-divider'
  elements :sub_nav_topics, '#sub-nav-topics a'
  elements :sub_nav_technologies, '#sub-nav-technologies .sub-nav-group .heading'
  elements :sub_nav_community, '#sub-nav-community a'
  elements :community_description, '.page-description'
  elements :sub_technologies_links, '#sub-nav-technologies .sub-nav-group a'

  def initialize(driver)
    @driver = driver
  end

  def verify_page(page_title)
    wait_for_ajax
    page.has_title?(page_title).should == true
  end

  def logged_in?
    visible?(true, '.logged-in-name') && visible?(true, '.logout')
  end

  def logged_out?
    visible?(true, '.login') && visible?(true, '.register') && visible?(false, '.logout')
  end

  def hover_over_nav_menu(tab)
    find(:xpath, "//*[@class='has-sub-nav']//a[contains(text(),'#{tab}')]").hover
  end

  def toggle_menu
    nav_toggle.click unless has_nav_open?
    sleep(1.5) #for menu to drop down
  end

  def toggle_menu_and_tap(link)
    link = link.downcase
    toggle_menu
    case link
      when 'login', 'register', 'logout'
        send("#{link}_link").click
      else
        send("primary_nav_#{link}_link").click
    end
  end

  def open_login_register(link)
    if has_nav_toggle?
      toggle_menu_and_tap(link)
    else
      send("#{link}_link").click
    end
  end

  def physical_logout
    unless logged_out?.eql?(true)
      if has_nav_toggle?
        toggle_menu
      end

      if logged_in?.eql?(true)
        logout_link.click
      end
    end
    logged_out?.should.eql?(true)
  end

  def visible?(negate, css_selector)
    page.has_css?(css_selector, :visible => negate)
  end

  private

  def wait_for_ajax(timeout = 60, message = nil)
    end_time = ::Time.now + timeout
    unless Capybara.current_driver == :mechanize
      until ::Time.now > end_time
        return if finished_all_ajax_requests?
        sleep 0.5
      end
      message = "Timed out after #{timeout} waiting for ajax requests to complete" unless message
      raise(message)
    end
  end

  def finished_all_ajax_requests?
    page.execute_script("return window.jQuery != undefined && jQuery.active == 0")
  end

end
