require_relative 'abstract/site_base'

# this is the page class that contains all elements and common methods related to the Edit Account tab on Edit Account Page.
class EditAccountPage < SiteBase
  page_url('/auth/realms/rhd/account/')
  expected_element(:h2, text: 'Edit Account')
  # page_title('Edit Account | Red Hat Developers')

  element(:side_nav_toggle)           { |b| b.li(class: 'side-nav-toggle') }
  element(:side_nav_open)             { |b| b.ul(css: 'side-nav side-nav-open') }
  element(:email_field)               { |b| b.text_field(id: 'email') }
  element(:username_field)            { |b| b.text_field(id: 'username') }
  element(:first_name_field)          { |b| b.text_field(id: 'firstName') }
  element(:last_name_field)           { |b| b.text_field(id: 'lastName') }
  element(:company_field)             { |b| b.text_field(id: 'user.attributes.company') }
  element(:agreement_date)            { |b| b.text_field(id: 'user.attributes.rhdTacSignDate') }
  element(:receive_newsletter)        { |b| b.checkbox(id: 'user.attributes.newsletter') }
  element(:save_btn)                  { |b| b.button(value: 'Save') }
  element(:alert_box)                 { |b| b.div(class: 'alert-box') }

  action(:click_save_btn)             { |p| p.save_btn.click }
  action(:click_side_nav_toggle)      { |p| p.side_nav_toggle.click }
  action(:click_social)               { |p| p.social_login.click }
  action(:click_password)             { |p| p.password.click }

  value(:password_field_error)        { |b| b.element(id: 'password-error').text }
  value(:email_field_error)           { |b| b.element(id: 'email-error').text }
  value(:first_name_field_error)      { |b| b.element(id: 'firstName-error').text }
  value(:last_name_field_error)       { |b| b.element(id: 'lastName-error').text }
  value(:company_field_error)         { |b| b.element(id: 'user.attributes.company-error').text }
  value(:country_field_error)         { |b| b.element(id: 'user.attributes.country-error').text }
  value(:side_nav_open?)              { |p| p.side_nav_open.present? }
  value(:alert_box_message)           { |p| p.alert_box.text }
  value(:username_field_disabled?)    { |p| p.username_field.disabled? }
  value(:email_field_value)           { |p| p.email_field.attribute_value('value') }

  def country
    country_dropdown.selected_options[0].text
  end

  def select_country(country)
    country_dropdown.select(country)
  end

  def edit_profile(first_name, last_name, company)
    type(first_name_field, first_name) unless first_name.nil?
    type(last_name_field, last_name)   unless last_name.nil?
    type(company_field, company)       unless company.nil?
  end

  def profile_name_updated?(rhd_name)
    toggle_menu if is_mobile?
    wait_for(30, 'Profile name was not updated after 30 seconds!') { nav.text == rhd_name }
  end

  def toggle_side_nav
    click_side_nav_toggle unless side_nav_open?
    wait_for(6, 'Side nav was not opened after 6 seconds') { side_nav_open? }
  end

  def select_menu_option(option)
    toggle_side_nav
    case option
      when 'social'
        click_social
      when 'password'
        click_password
      else
        fail("#{option} is not a recognised side nav item")
    end
  end

end

# this is the page class that contains all elements and common methods related to the Social Logins tab on Edit Account Page.
class SocialLoginPage < EditAccountPage
  page_url('/auth/realms/rhd/account/identity')
  expected_element(:h2, text: 'Social Login')
  # page_title('Social Login | Red Hat Developers')

  element(:add_github_btn)           { |b| b.link(id: 'add-github') }
  element(:remove_github_btn)        { |b| b.link(id: 'remove-github') }

  action(:click_add_github_btn)      { |p| p.add_github_btn.click }
  action(:click_remove_github_btn)   { |p| p.remove_github_btn.click }

  value(:remove_github_btn_present?) { |p| p.remove_github_btn.present? }

end

# this is the page class that contains all elements and common methods related to the Change Password tab on Edit Account Page.
class ChangePasswordPage < EditAccountPage
  page_url('/auth/realms/rhd/account/password')
  expected_element(:h2, text: 'Change Password')
  # page_title('Change Password | Red Hat Developers')

  element(:current_password_field)      { |b| b.text_field(id: 'password') }
  element(:new_password_field)          { |b| b.text_field(id: 'password-new') }
  element(:password_confirm_field)      { |b| b.text_field(id: 'password-confirm') }
  element(:save_password_btn)           { |b| b.button(value: 'Save') }

  action(:click_save_password_btn)      { |p| p.save_password_btn.click }

  value(:new_password_field_error)      { |b| b.element(id: 'password-new-error').text }
  value(:password_confirm_field_error)  { |b| b.element(id: 'password-confirm-error').text }

  def change_password(current_password, new_password, password_confirm)
    type(current_password_field, current_password)
    type(new_password_field, new_password)
    type(password_confirm_field, password_confirm)
    click_save_password_btn
  end

end
