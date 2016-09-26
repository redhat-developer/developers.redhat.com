require_relative 'abstract/site_base'

class EditAccountPage < SiteBase
  page_url('/auth/realms/rhd/account/')
  expected_element(:h2, text: 'Edit Account')
  #page_title('Edit Account | Red Hat Developers')

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

  action(:click_save_btn)             { |p| p.save_btn.when_present.click }
  action(:click_side_nav_toggle)      { |p| p.side_nav_toggle.click }
  action(:click_social)               { |p| p.social_login.when_present.click }
  action(:click_password)             { |p| p.password.when_present.click }

  value(:email_field_error)           { |b| b.element(id: 'email-error').when_present.text }
  value(:first_name_field_error)      { |b| b.element(id: 'firstName-error').when_present.text }
  value(:last_name_field_error)       { |b| b.element(id: 'lastName-error').when_present.text }
  value(:company_field_error)         { |b| b.element(id: 'user.attributes.company-error').when_present.text }
  value(:country_field_error)         { |b| b.element(id: 'user.attributes.country-error').when_present.text}
  value(:side_nav_open?)              { |p| p.side_nav_open.present? }
  value(:alert_box_message)           { |p| p.alert_box.when_present.text }
  value(:username_field_disabled?)    { |p| p.username_field.disabled? }
  value(:email_field_value)           { |p| p.email_field.when_present.attribute_value('value') }

  def country
    country_dropdown.selected_options[0].text
  end

  def select_country(country)
    country_dropdown.select(country)
  end

  def edit_profile(first_name, last_name, company)
    type(first_name_field, first_name) unless first_name == nil
    type(last_name_field, last_name)   unless last_name == nil
    type(company_field, company)       unless company == nil
  end

  def profile_name_updated?(rhd_name)
    toggle_menu if is_mobile?
    wait_for(10, 'User profile name was not updated after 10 seconds!') { name == rhd_name }
    name == rhd_name
  end

  def toggle_side_nav
    click_side_nav_toggle unless side_nav_open?
    wait_for { side_nav_open? }
  end

  def select_menu_option(option)
    toggle_side_nav
    case option
      when 'social'
        click_social
      when 'password'
        click_password
      else
        raise("#{option} is not a recognised side nav item")
    end
  end

end

class SocialLoginPage < EditAccountPage
  page_url('/auth/realms/rhd/account/identity')
  expected_element(:h2, text: 'Social Login')
  #page_title('Social Login | Red Hat Developers')

  element(:add_github_btn)           { |b| b.link(id: 'add-github') }
  element(:remove_github_btn)        { |b| b.link(id: 'remove-github') }

  action(:click_add_github_btn)      { |p| p.add_github_btn.when_present.click }
  action(:click_remove_github_btn)   { |p| p.remove_github_btn.when_present.click }

  value(:remove_github_btn_present?) { |p| p.remove_github_btn.present? }

end

class ChangePasswordPage < EditAccountPage
  page_url('/auth/realms/rhd/account/password')
  expected_element(:h2, text: 'Change Password')
  #page_title('Change Password | Red Hat Developers')

  element(:current_password_field)      { |b| b.text_field(id: 'password') }
  element(:new_password_field)          { |b| b.text_field(id: 'password-new') }
  element(:password_confirm_field)      { |b| b.text_field(id: 'password-confirm') }
  element(:save_password_btn)           { |b| b.button(value: 'Save') }

  action(:click_save_password_btn)      { |p| p.save_password_btn.when_present.click }

  value(:new_password_field_error)      { |b| b.element(id: 'password-new-error').when_present.text }
  value(:password_confirm_field_error)  { |b| b.element(id: 'password-confirm-error').when_present.text }

  def change_password(current_password, new_password, password_confirm)
    type(current_password_field, current_password)
    type(new_password_field, new_password)
    type(password_confirm_field, password_confirm)
    click_save_password_btn
  end

end
