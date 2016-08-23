require_relative 'abstract/site_base'

class ForgotPasswordPage < SiteBase
  expected_element(:h1, text: 'Forgot your password?')
  #page_title('Forgot your password? | Red Hat Developers')

  element(:email_field)     { |b| b.text_field(id: 'username') }
  element(:submit_btn)      { |b| b.button(value: 'Submit') }

  def enter_email(email)
    type(email_field, email)
    submit_btn.when_present.click
  end

end
