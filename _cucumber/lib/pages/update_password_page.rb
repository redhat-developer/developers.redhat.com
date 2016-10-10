require_relative 'abstract/site_base'

class UpdatePasswordPage < SiteBase
  expected_element(:h1, text: 'Update password')
  #page_title('Update password | Red Hat Developers')

  element(:new_password_field)         { |b| b.text_field(id: 'password-new') }
  element(:new_password_confirm_field) { |b| b.text_field(id: 'password-confirm') }
  element(:submit_btn)                 { |b| b.button(value: 'Submit') }

  action(:click_submit)                { |p| p.submit_btn.click }

  def submit_new_password
    type(new_password_field, 'P@$$word01')
    type(new_password_confirm_field, 'P@$$word01')
    click_submit
  end

end
