require_relative 'abstract/site_base'

# this is the page class that contains all elements and common methods related to the Forgot Password page
class ForgotPasswordPage < SiteBase
  expected_element(:h1, text: 'Forgot your password?')
  # page_title('Forgot your password? | Red Hat Developers')

  element(:email_field)     { |b| b.text_field(id: 'username') }
  element(:submit_btn)      { |b| b.button(value: 'Submit') }

  def enter_email(email)
    type(email_field, email)
    submit_btn.click
  end

end
