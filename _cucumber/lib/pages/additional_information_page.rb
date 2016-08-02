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
  ACCEPT_ALL_TERMS  = { id: 'tac-checkall' }
  FULL_USER_TAC1  = { id: 'user.attributes.tcacc-6' }
  FULL_USER_TAC2    = { id: 'user.attributes.tcacc-1246' }

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

  def accept_terms
    wait_for { displayed?(ACCEPT_ALL_TERMS) }
    click_on(ACCEPT_ALL_TERMS)
  end

  def fulluser_tac_accept
    wait_for { displayed?(FULL_USER_TAC1) }
    click_on(FULL_USER_TAC1)
    click_on(FULL_USER_TAC2)
  end

end
