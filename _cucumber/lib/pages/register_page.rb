require_relative 'base'

class Registration < Base

  EMAIL_FIELD                  = { id: 'email' }
  EMAIL_ERROR                  = { id: 'email-error' }
  PASSWORD_FIELD               = { id: 'password' }
  PASSWORD_ERROR               = { id: 'password-error' }
  PASSWORD_CONFIRM_FIELD       = { id: 'password-confirm' }
  PASSWORD_CONFIRM_ERROR       = { id: 'password-confirm-error' }
  FIRST_NAME_FIELD             = { id: 'firstName' }
  FIRST_NAME_ERROR             = { id: 'firstName-error' }
  LAST_NAME_FIELD              = { id: 'lastName' }
  LAST_NAME_ERROR              = { id: 'lastName-error' }
  COMPANY_FIELD                = { id: 'user.attributes.company' }
  COMPANY_FIELD_ERROR          = { id: 'user.attributes.company-error' }
  COUNTRY                      = { id: 'user.attributes.country' }
  COUNTRY_ERROR                = { id: 'user.attributes.country-error' }
  GREETING_FIELD               = { id: 'user.attributes.greeting' }
  ADDRESS_LINE_ONE_FIELD       = { id: 'user.attributes.addressLine1' }
  CITY                         = { id: 'user.attributes.addressCity' }
  POSTAL_CODE_FIELD            = { id: 'user.attributes.addressPostalCode' }
  PHONE_NUMBER_FIELD           = { id: 'user.attributes.phoneNumber' }
  FINISH_BTN                   = { xpath: "//input[@value='Create my account']" }
  CREATE_ACCOUNT_AND_DOWNLOAD  = { xpath: "//input[@value='CREATE ACCOUNT & DOWNLOAD']" }
  CONFIRMATION                 = { id: 'kc-content' }
  PASSWORD_CONFIRM_FIELD_ERROR = { id: 'password-confirm-error' }
  REGISTRATION_CONFIRMATION    = { id: 'registration-confirmation' }
  ACCEPT_ALL_TERMS             = { id: 'tac-checkall' }
  ACCEPT_TERMS                 = { css: '.fulluser-ttac' }

  def initialize(driver)
    super
    verify_page('Register | Red Hat Developers')
  end

  def fill_in_form(first_name, last_name, email, company, country, password, password_confirm)
    type(EMAIL_FIELD, email)
    type(PASSWORD_FIELD, password)
    type(PASSWORD_CONFIRM_FIELD, password_confirm)
    type(FIRST_NAME_FIELD, first_name)
    type(LAST_NAME_FIELD, last_name)
    type(COMPANY_FIELD, company)
    select(COUNTRY, country) unless country.nil?
  end

  def field_validation(selector)
    case selector
      when 'email'
        el = EMAIL_ERROR
      when 'password'
        el = PASSWORD_ERROR
      when 'password confirm'
        el = PASSWORD_CONFIRM_ERROR
      when 'first name'
        el = FIRST_NAME_ERROR
      when 'last name'
        el = LAST_NAME_ERROR
      when 'company'
        el = COMPANY_FIELD_ERROR
      when 'country'
        el = COUNTRY_ERROR
    end
    wait_for { displayed?(el) }
    text_of(el)
  end

  def create_account
    click_on(FINISH_BTN)
  end

end
