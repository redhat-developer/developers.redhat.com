require_relative 'site_base'

class LoginPage < SiteBase
  page_title('Log In | Red Hat Developers')

  value(:loaded?)                  { |el| el.wait_until_displayed(id: 'username') }
  element(:username_field)         { |el| el.find(id: 'username') }
  element(:password_field)         { |el| el.find(id: 'password') }

  value(:error_message)            { |el| el.text_of(id: 'kc-feedback') }

  action(:click_login_button)      { |el| el.click_on(id: 'kc-login') }
  action(:click_register_link)     { |el| el.click_on(link: 'Register') }
  action(:click_password_reset)    { |el| el.click_on(link: 'Forgot Password?') }
  action(:click_login_with_github) { |el| el.click_on(id: 'social-github') }

  def login_with(username, password)
    username_field.send_keys(username)
    password_field.send_keys(password)
    click_login_button
    wait_for_ajax
  end

end
