require_relative 'base_page'

class LoginPage < BasePage

  element :title, '.centered-title'
  element :login_with_existing_account, '#social-email'
  element :login_with_github_account, '#social-github'
  element :login_with_stackoverflow_account, '#social-stackoverflow'
  element :login_with_linkedin_account, '#social-linkedin'
  element :login_more_options_link, '#login-more-options-link'
  element :register_link, '#kc-registration-button'

  def initialize(driver)
    super
  end

  def open
    nav_bar = PrimaryNav.new(@driver)
    nav_bar.login_link.click
    page_loaded?
  end

  def page_loaded?
    wait_for_ajax
    wait_for_login_with_existing_account
  end

end
