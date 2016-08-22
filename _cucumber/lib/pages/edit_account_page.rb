require_relative 'site_base'

class EditAccountPage < SiteBase
  page_url('/auth/realms/rhd/account/')

  value(:loaded?)               { |el| el.wait_until_displayed(id: 'accounts-sidenav') }
  element(:email)               { |el| el.find(id: 'email') }
  element(:username)            { |el| el.find(id: 'username') }
  element(:first_name)          { |el| el.find(id: 'firstName') }
  element(:last_name)           { |el| el.find(id: 'lastName') }
  element(:company)             { |el| el.find(id: 'user.attributes.company') }
  element(:country_dropdown)    { |el| el.find(id: 'user.attributes.country') }
  element(:agreement_date)      { |el| el.find(id: 'user.attributes.rhdTacSignDate') }
  element(:receive_newsletter)  { |el| el.find(id: 'user.attributes.newsletter') }

  def country
    default_dropdown_item(country_dropdown)
  end

end
