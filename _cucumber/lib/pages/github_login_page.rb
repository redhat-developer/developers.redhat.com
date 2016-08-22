require_relative 'site_base'

class GitHubPage < SiteBase

  element(:username_field)           { |el| el.find(id: 'login_field' ) }
  element(:password_field)           { |el| el.find(id: 'password' ) }
  element(:authorize_app_btn)        { |el| el.find(name: 'authorize') }

  action(:click_sign_in)             { |el| el.click_on(css: '#login .btn-primary') }

  def login_with(username, password)
    wait_for { username_field.displayed? }
    username_field.send_keys(username)
    password_field.send_keys(password)
    click_sign_in
  end

  def authorize_app
    wait_for(10) {authorize_app_btn.displayed? }
    authorize_app_btn.click
  end

end
