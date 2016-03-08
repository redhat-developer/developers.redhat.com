require_relative 'base_page'
require 'cgi'

class LoginPage < BasePage

  element :title, '.centered-title'
  element :username_field, '#username'
  element :password_field, '#password'
  element :login_button, '#kc-login'
  element :cancel_button, '#kc-cancel'
  element :github_account, '#social-github'
  element :stackoverflow_account, '#social-stackoverflow'
  element :linkedin_account, '#social-linkedin'
  element :more_options_link, '#login-more-options-link'
  element :register_link, '#kc-registration-button'
  element :error_message, '#kc-feedback-wrapper'
  element :forgot_password_link, "a:contains('Forgot Password')"

  def initialize(driver)
    super
  end

  def open
    Home.new(@driver).open
    open_login_register('login')
    begin
      loaded?('Login | Red Hat Developers')
    rescue
      login_link.click
      loaded?('Login | Red Hat Developers')
    end
  end

  def with_existing_account(username, password)
    username_field.set(username)
    password_field.set(password)
    login_button.click
    wait_for_ajax
  end

end
