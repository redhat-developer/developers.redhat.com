require_relative 'base_page.rb'

class UpdateCountryAndCompany < BasePage

  element :country_field, :xpath, '//*[@id="user-account:country"]'
  element :company_field, :xpath, '//*[@id="user-account:company"]'
  element :submit_btn, :xpath, '//*[@id="user-account:submit"]'

  def initialize(driver)
    loaded?('Company and Country | Red Hat Developers')
  end

  def with(company, country)
    company_field.set company
    country_field.select country
    page.has_button?('Submit', disabled: false)
    submit_btn.click
    wait_for_ajax
  end

end
