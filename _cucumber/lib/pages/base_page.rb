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
  element :nav_search_field, '.user-search'

  elements :sub_nav_topics, '#sub-nav-topics a'
  elements :sub_nav_technologies, '#sub-nav-technologies .sub-nav-group .heading'
  elements :sub_nav_community, '#sub-nav-community a'
  elements :community_description, '.page-description'
  elements :sub_technologies_links, '#sub-nav-technologies .sub-nav-group a'

  def initialize(driver)
    @driver = driver
  end

  def loaded?(title)
    wait_for_ajax unless page.title.include?('not available') || page.title.include?('Problem loading page')
    raise("Expected page title to be #{title}, but was #{page.title}") unless page.has_title?(title).eql?(true)
  end

  def title
    page.find('h2').text
  end

  def logged_in?
    visible?(true, '.logged-in') && visible?(true, '.logout') && visible?(false, '.register') && visible?(false, '.login')
  end

  def logged_out?
    visible?(false, '.logged-in') && visible?(false, '.logout') && visible?(true, '.login') && visible?(true, '.register')
  end

  def hover_over_nav_menu(tab)
    find(:xpath, "//*[@class='has-sub-nav']//a[contains(text(),'#{tab}')]").hover
  end

  def toggle_menu
    wait_until_nav_toggle_visible(6)
    nav_toggle.click unless has_nav_open?
    wait_until_nav_open_visible(6)
    sleep(1.5) #for menu to drop down
  end

  def toggle_menu_and_tap(link)
    link = link.downcase
    toggle_menu
    case link
      when 'login', 'register', 'logout'
        send("wait_until_#{link}_link_visible")
        send("#{link}_link").click
      else
        send("wait_until_primary_nav_#{link}_link_visible")
        send("primary_nav_#{link}_link").click
    end
  end

  def open_login_register(link)
    if has_nav_toggle?
      toggle_menu_and_tap(link)
    else
      send("#{link}_link").click
      wait_for_ajax
    end
  end

  def physical_logout
    unless page.title.include?('not available') || page.title.include?('Problem loading page')
      try(3) {
        if has_nav_toggle?
          toggle_menu
        end
        if logged_in?.eql?(true)
          logout_link.click
          wait_for_ajax
        end
        logged_out?
      }
    end
  end

  def wait_for_ajax(message = nil)
    if Capybara.app_host.eql?('http://0.0.0.0:4242/') || Capybara.app_host.include?('docker')
      timeout = 120
    else
      timeout = 60
    end

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

  private

  def finished_all_ajax_requests?
    page.execute_script("return window.jQuery != undefined && jQuery.active == 0")
  end

  def try(i)
    count = 0; logged_out = false
    until logged_out == true || count == i
      logged_out = yield
      sleep(3)
      count += 1
    end
    if logged_out.eql?(false)
      raise("User was not logged out after #{count} attempts")
    end
  end

  def visible?(negate, css_selector)
    page.has_css?(css_selector, :visible => negate)
  end

end
