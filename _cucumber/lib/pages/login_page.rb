require_relative 'base_page'

class LoginPage < BasePage

  element :title, '.centered-title'
  element :login_with_existing_account, '#social-email'
  element :username_field, '.username-input'
  element :password_field, '#password'
  element :login_button, '#kc-login'
  element :cancel_button, '#kc-cancel'
  element :login_with_github_account, '#social-github'
  element :login_with_stackoverflow_account, '#social-stackoverflow'
  element :login_with_linkedin_account, '#social-linkedin'
  element :login_more_options_link, '#login-more-options-link'
  element :register_link, '#kc-registration-button'

  def initialize(driver)
    super
  end

  def open
    Home.new(@driver).open
    nav_bar = PrimaryNav.new(@driver)
    nav_bar.login_link.click
    page_loaded?
  end

  def page_loaded?
    wait_for_ajax
    wait_for_login_with_existing_account
  end

  def login_with(terms)
    if terms == 'accepted_terms'
      data = CUSTOMER[:user_accepted_terms]
      login(data[:email], data[:password])
    else
      data = CUSTOMER[:user_not_accepted_terms]
      login(data[:email], data[:password])
    end
  end

  private

  def login(username, password)
    login_with_existing_account.click
    wait_for_username_field
    username_field.set username
    password_field.set password
    login_button.click
    nav_bar = PrimaryNav.new(@driver)
    nav_bar.wait_until_logout_link_visible(10)
  end

end
