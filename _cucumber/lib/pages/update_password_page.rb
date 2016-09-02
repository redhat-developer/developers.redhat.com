require_relative 'abstract/site_base'

class UpdatePasswordPage < SiteBase
  #page_title('Update password | Red Hat Developers')

  element(:new_password_field)         { |el| el.find(id: 'password-new') }
  element(:new_password_confirm_field) { |el| el.find(id: 'password-confirm') }
  action(:click_submit)                { |el| el.click_on(xpath: "//input[@value='Submit']") }

  def submit_new_password
    new_password_field.send_keys 'P@$$word01'
    new_password_confirm_field.send_keys 'P@$$word01'
    click_submit
  end

end
