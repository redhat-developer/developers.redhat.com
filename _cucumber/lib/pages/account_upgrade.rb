require_relative 'base'

class UpgradeAccount < Base

  USER_ACCOUNT_UPGRADE   = { id: 'user-account' }
  ADDRESS_LINE_ONE_FIELD = { id: 'user-account:address1' }
  CITY_FIELD             = { id: 'user-account:city' }
  POSTAL_CODE_FIELD      = { id: 'user-account:postalCode' }
  PHONE_NUMBER_FIELD     = { id: 'user-account:phone' }
  PASSWORD_FIELD         = { id: 'user-account:password' }
  CONFIRM_PASSWORD_FIELD = { id: 'user-account:passwordConfirmation' }
  AGREE_TO_ALL_TERMS     = { css: '.selectAllCheckboxes' }
  UPGRADE_ACCOUNT_BTN    = { xpath: "//input[@value='Upgrade My Account']" }
  CANCEL_BTN             = { xpath: "//input[@value='Cancel Download']" }
  ALERT_BOX              = { css: '.warning' }

  def initialize(driver)
    super
    wait_for { displayed?(USER_ACCOUNT_UPGRADE) }
    verify_page('Additional Information Required | Red Hat Developers')
  end

  def upgrade_account_with(address_line_one, city, postal_code, phone_number, password, confirm_password)
    type(ADDRESS_LINE_ONE_FIELD, address_line_one)
    type(CITY_FIELD, city)
    type(POSTAL_CODE_FIELD, postal_code)
    type(PHONE_NUMBER_FIELD, phone_number)
    type(PASSWORD_FIELD, password)
    type(CONFIRM_PASSWORD_FIELD, confirm_password)
  end

  def click_agree_to_all_terms
    click_on(AGREE_TO_ALL_TERMS)
  end

  def click_finish_btn
    click_on(UPGRADE_ACCOUNT_BTN)
  end

  def click_cancel_btn
    click_on(CANCEL_BTN)
  end

  def alert_box
    wait_for { displayed?(ALERT_BOX) }
    text_of(ALERT_BOX)
  end

end
