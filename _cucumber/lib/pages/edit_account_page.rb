require_relative 'base'

class EditAccount < Base

  SIDE_NAV                     = { class: 'side-nav' }
  USERNAME_FIELD               = { id: 'username'}
  EMAIL_FIELD                  = { id: 'email' }
  FIRST_NAME_FIELD             = { id: 'firstName' }
  LAST_NAME_FIELD              = { id: 'lastName' }
  COMPANY_FIELD                = { id: 'user.attributes.company' }
  COUNTRY                      = { id: 'user.attributes.country' }
  RHD_TAC_SIGN_DATE            = { id: 'user.attributes.rhdTacSignDate' }
  NEWSLETTER_CHECKBOX          = { id: 'user.attributes.newsletter' }

  def initialize(driver)
    super
    wait_for(12) { displayed?(SIDE_NAV) && displayed?(USERNAME_FIELD) }
    verify_page('Edit Account')
  end

  def email
    find(EMAIL_FIELD)
  end

  def username
    find(USERNAME_FIELD)
  end

  def first_name
    find(FIRST_NAME_FIELD)
  end

  def last_name
    find(LAST_NAME_FIELD)
  end

  def company
    find(COMPANY_FIELD)
  end

  def country
    default_dropdown_item(COUNTRY)
  end

  def agreement_date
    find(RHD_TAC_SIGN_DATE)
  end

  def receive_newsletter?
    find(NEWSLETTER_CHECKBOX).selected?
  end

end
