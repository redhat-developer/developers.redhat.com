require_relative 'abstract/site_base'

class LoginPage < SiteBase
  expected_element(:h1, text: 'Log In')
  #page_title('Log In | Red Hat Developers')

  element(:heading)                { |b| b.h1(text: 'Log In') }
  element(:username_field)         { |b| b.text_field(id: 'username') }
  element(:password_field)         { |b| b.text_field(id: 'password') }
  element(:kc_feedback)            { |b| b.element(id: 'kc-feedback') }
  element(:login_button)           { |b| b.button(id: 'kc-login') }
  element(:register_link)          { |b| b.link(text: 'Register') }
  element(:password_reset)         { |b| b.link(text: 'Forgot Password?') }
  element(:login_with_github)      { |b| b.link(id: 'social-github') }

  value(:error_message)            { |p| p.kc_feedback.when_present.text }

  action(:click_login_button)      { |p| p.login_button.click }
  action(:click_register_link)     { |b| b.register_link.click }
  action(:click_password_reset)    { |b| b.password_reset.click }
  action(:click_login_with_github) { |b| b.login_with_github.when_present.click }

  def login_with(username, password)
    type(username_field, username)
    type(password_field, password)
    click_login_button
  end

end
