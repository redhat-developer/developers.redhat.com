require_relative 'base'

class AdditionalInformation < Base

  ALERT_BOX         = { css: '.warning' }
  EMAIL             = { id: 'email' }
  PASSWORD          = { id: 'user.attributes.pwd' }
  CONFIRM_PASSWORD  = { id: 'password-confirm' }
  FIRST_NAME        = { id: 'firstName' }
  LAST_NAME         = { id: 'lastName' }
  COMPANY           = { id: 'user.attributes.company' }
  COUNTRY           = { id: 'user.attributes.country' }
  SUBMIT            = { xpath: "//input[@value='Submit']" }

  def initialize(driver)
    super
    verify_page('Additional Action Required ')
  end

  def feedback
    wait_for { displayed?(ALERT_BOX) }
    text_of(ALERT_BOX)
  end

  def fill_in(email, password, first_name, last_name, company, country)
    wait_for { displayed?(EMAIL) }
    type(EMAIL, email) unless email.nil?
    enter_password(password, password)
    type(FIRST_NAME, first_name) unless first_name.nil?
    type(LAST_NAME, last_name) unless last_name.nil?
    type(COMPANY, company) unless company.nil?
    select(COUNTRY, country) unless country.nil?
  end

  def enter_password(password, confirm_password)
    type(PASSWORD, password )
    type(CONFIRM_PASSWORD, confirm_password)
  end

  def select_country(country)
    select(COUNTRY, country)
  end

  def click_submit
    click_on(SUBMIT)
    wait_for_ajax
  end

end
