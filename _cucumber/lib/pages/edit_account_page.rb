require_relative 'abstract/site_base'

class EditAccountPage < SiteBase
  page_url('/auth/realms/rhd/account')
  expected_element(:h2, text: 'Edit Account')
  #page_title('Edit Account | Red Hat Developers')

  element(:email)               { |b| b.text_field(id: 'email') }
  element(:username)            { |b| b.text_field(id: 'username') }
  element(:first_name)          { |b| b.text_field(id: 'firstName') }
  element(:last_name)           { |b| b.text_field(id: 'lastName') }
  element(:company)             { |b| b.text_field(id: 'user.attributes.company') }
  element(:country_dropdown)    { |b| b.select_list(id: 'user.attributes.country') }
  element(:agreement_date)      { |b| b.text_field(id: 'user.attributes.rhdTacSignDate') }
  element(:receive_newsletter)  { |b| b.checkbox(id: 'user.attributes.newsletter') }

  def country
    country_dropdown.selected_options[0].text
  end

end
