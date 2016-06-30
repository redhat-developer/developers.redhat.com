require_relative 'base'

class Registration < Base

  REGISTER_WITH_EMAIL_SECTION  = { id: 'login-choice-email' }
  EXPAND_REGISTER_WITH_EMAIL   = { id: 'register-expand-choice-email' }
  REGISTER_WITH_SOCIAL_SECTION = { id: 'login-choice-social' }
  EXPAND_REGISTER_WITH_SOCIAL  = { id: 'register-expand-choice-social' }
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
  TERMS_WRAPPER                = { class: 'tac-all-wrapper' }
  ACCEPT_ALL_TERMS             = { id: 'tac-checkall' }
  DEVELOPER_TERMS              = { id: 'user.attributes.tcacc-1246' }
  REDHAT_SUBSCRIPTION_TERMS    = { id: 'user.attributes.tcacc-6'}
  REDHAT_PORTAL_TERMS          = { id: 'user.attributes.tcacc-1010' }
  GITHUB_BTN                   = { id: 'social-github' }

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

  def expand_register_choice_email
    if displayed?(EXPAND_REGISTER_WITH_EMAIL)
      click_on(EXPAND_REGISTER_WITH_EMAIL)
      wait_for { displayed?(REGISTER_WITH_EMAIL_SECTION) }
    end
  end

  def expand_register_choice_social
    if displayed?(EXPAND_REGISTER_WITH_SOCIAL)
      click_on(EXPAND_REGISTER_WITH_SOCIAL)
      wait_for { displayed?(REGISTER_WITH_SOCIAL_SECTION) }
    end
  end

  def create_account
    click_on(FINISH_BTN)
  end

  def click_register_with_github
    if displayed?(EXPAND_REGISTER_WITH_SOCIAL)
      click_on(EXPAND_REGISTER_WITH_SOCIAL)
    end
    wait_for { displayed?(GITHUB_BTN) }
    click_on(GITHUB_BTN)
  end

  def terms_and_conditions_section
    find(TERMS_WRAPPER)
  end

  def accept_terms(term)
    case term
      when 'all'
        click_on(ACCEPT_ALL_TERMS)
      when 'developer'
        click_on(DEVELOPER_TERMS)
      when 'red hat'
        click_on(REDHAT_SUBSCRIPTION_TERMS)
      when 'portal'
        click_on(REDHAT_PORTAL_TERMS)
      else
        raise("#{term} is not a recognised condition")
    end
  end

end
