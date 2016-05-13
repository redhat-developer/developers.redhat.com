require_relative 'base'

class ExtendedRegistration < Base

  REGISTRATION_HINT            = { css: '.download-show' }
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
    wait_for { displayed?(REGISTRATION_HINT) }
    verify_page('Register | Red Hat Developers')
  end

  def registration_hint
    wait_for { displayed?(REGISTRATION_HINT) }
    text_of(REGISTRATION_HINT)
  end

  def fill_in_extended_form(email, password, password_confirmation, greeting, first_name, last_name, company, address_line_one, city, postal_code, country, phone_number)
    type(EMAIL_FIELD, email)
    type(PASSWORD_FIELD, password)
    type(PASSWORD_CONFIRM_FIELD, password_confirmation)
    select(GREETING_FIELD, greeting)
    type(FIRST_NAME_FIELD, first_name)
    type(LAST_NAME_FIELD, last_name)
    type(COMPANY_FIELD, company)
    type(ADDRESS_LINE_ONE_FIELD, address_line_one)
    type(CITY, city)
    type(POSTAL_CODE_FIELD, postal_code)
    select(COUNTRY, country)
    type(PHONE_NUMBER_FIELD, phone_number)
  end

  def click_create_account_and_download
    click_on(CREATE_ACCOUNT_AND_DOWNLOAD)
  end

  def checkall_tac
    click_on(ACCEPT_ALL_TERMS)
  end

end
