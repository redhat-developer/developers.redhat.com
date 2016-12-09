require_relative 'abstract/site_base'

# this is the page class that contains all elements and common methods related to the GitHub login page
class GitHubPage < SiteBase

  element(:username_field)    { |b| b.text_field(name: 'login') }
  element(:password_field)    { |b| b.text_field(name: 'password') }
  element(:sign_in_btn)       { |b| b.button(value: 'Sign in') }
  element(:authorize_app_btn) { |b| b.button(name: 'authorize') }

  action(:click_sign_in)      { |p| p.sign_in_btn.click }
  action(:authorize_app)      { |p| p.authorize_app_btn.click }

  def login_with(username, password)
    type(username_field, username)
    type(password_field, password)
    click_sign_in
  end

end
