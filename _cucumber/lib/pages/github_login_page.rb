require_relative 'abstract/site_base'

class GitHubPage < SiteBase

  element(:username_field)    { |b| b.text_field(id: 'login_field' ) }
  element(:password_field)    { |b| b.text_field(id: 'password' ) }
  element(:sign_in_btn)       { |b| b.button(css: '#login .btn-primary') }
  element(:authorize_app_btn) { |b| b.button(name: 'authorize') }

  action(:click_sign_in)      { |p| p.sign_in_btn.when_present.click }
  action(:authorize_app)      { |p| p.authorize_app_btn.when_present.click }

  def login_with(username, password)
    type(username_field, username)
    type(password_field, password)
    click_sign_in
  end

end
