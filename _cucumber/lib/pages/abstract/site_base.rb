require_relative 'driver_base'

class SiteBase < DriverBase

  value(:search_field_visible?) { |el| el.displayed?(css: '.accounts .search-wrapper .user-search') }
  element(:search_box)          { |el| el.find(css: '.accounts .search-wrapper .user-search') }
  action(:click_search_button)  { |el| el.click_on(id: 'search-button') }

  element(:login_link)          { |el| el.find(css: '.login') }
  element(:logout_link)         { |el| el.find(css: '.logout') }
  element(:register_link)       { |el| el.find(css: '.register') }
  element(:logged_in_name)      { |el| el.find(css: '.logged-in-name') }
  element(:mobile_menu)         { |el| el.find(css: '.nav-toggle')}

  value(:is_mobile?)            { |el| el.displayed?(css: '.nav-toggle') }
  value(:logged_in)             { |el| el.displayed?(css: '.logged-in') }
  value(:mobile_menu_open?)     { |el| el.displayed?(css: '.nav-open') }
  value(:sub_nav_open?)         { |el| el.displayed?(css: '.sub-nav-open' ) }

  value(:kc_feedback)           { |el| el.text_of(css: '.kc-feedback-text') }

  def search_for(search_string)
    enter_search_term(search_string)
    press_return
    wait_for_ajax
  end

  def enter_search_term(search_string)
    search_box.send_keys(search_string)
  end

  def logged_in?
    wait_for_ajax
    if is_mobile?
      toggle_menu
    end
    wait_for(30) { logged_in }
    wait_for { logged_in_name.text != '' }
    logged_in_name.text
  end

  def logged_out?
    wait_for_ajax
    if is_mobile?
      toggle_menu
    end
    wait_for(30) { register_link.displayed? }
    register_link.displayed?
  end

  def click_login
    if is_mobile?
      toggle_menu
    end
    wait_for(30) { login_link.displayed? }
    login_link.click
  end

  def click_logout
    if is_mobile?
      toggle_menu
    end
    logout_link.click
    wait_for_ajax
  end

  def click_register
    if is_mobile?
      toggle_menu
    end
    wait_for(30) { register_link.displayed? }
    register_link.click
  end

  def toggle_menu
    unless mobile_menu_open?
      mobile_menu.click
    end
    wait_for { mobile_menu_open? }
  end

  def toggle_menu_and_tap(menu_item)
    mobile_menu.click
    wait_for { mobile_menu_open? }
    click_on_nav_menu(menu_item)
  end

  def navigate_to(link)
    wait_for_ajax
    if is_mobile?
      toggle_menu
      click_login if link == 'login'
      click_register if link == 'registration'
      logged_in_name.click if link == 'edit details'
    else
      click_login if link == 'login'
      click_register if link == 'registration'
      logged_in_name.click if link == 'edit details'
    end
    wait_for_ajax
  end

  def click_on_nav_menu(menu_item)
    if is_mobile?
      toggle_menu
    end
    wait_for { displayed?(xpath: "//nav[@class='mega-menu']//ul/li/*[contains(text(),'#{menu_item.capitalize}')]") }
    click_on(xpath: "//nav[@class='mega-menu']//ul/li/*[contains(text(),'#{menu_item.capitalize}')]")
  end

  def hover_over_nav_menu(menu_item)
    hover_on(xpath: "//nav[@class='mega-menu']//ul/li/*[contains(text(),'#{menu_item.capitalize}')]")
  end

  def menu_item_present?(menu_item)
    if is_mobile?
      toggle_menu
    end
    case menu_item
      when 'login'
        login_link.displayed?
      when 'register'
        register_link.displayed?
      else
        displayed?(xpath: "//nav[@class='mega-menu']//ul/li/*[contains(text(),'#{menu_item.capitalize}')]")
    end
  end

  def sub_menu_items(menu_item, resolution)
    wait_for { sub_nav_open? } if resolution == 'mobile'
    text_of(xpath: "//*[@id='sub-nav-#{menu_item.downcase}']")
  end

  def get_href_for(link)
    href = find(partial_link_text: link)
    href.attribute('href')
  end

end
