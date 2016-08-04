require_relative 'site_base'

class ForgotPasswordPage < SiteBase

  element(:email_field)     { |el| el.find(id: 'username') }
  action(:click_submit_btn) { |el| el.click_on(xpath: "//input[@value='Submit']" ) }

  def enter_email(email)
    wait_for { title == ('Forgot your password? | Red Hat Developers') }
    email_field.send_keys(email)
    click_submit_btn
    wait_for_ajax
  end

end
