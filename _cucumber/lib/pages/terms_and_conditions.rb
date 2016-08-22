require_relative 'abstract/site_base'

class TermsAndConditions < SiteBase

  ACCEPT_TERMS_AND_CONDITIONS     = { xpath: "//input[@value='Accept']" }
  NOT_ACCEPT_TERMS_AND_CONDITIONS = { xpath: "//input[@value='Not Accept']"  }
  SUBSCRIPTION_TEXT               = { id: 'subscription-text' }

  def click_accept_tcs
    wait_for { displayed?(ACCEPT_TERMS_AND_CONDITIONS) }
    click_on(ACCEPT_TERMS_AND_CONDITIONS)
  end

  def click_not_accept_tcs
    wait_for { displayed?(NOT_ACCEPT_TERMS_AND_CONDITIONS) }
    click_on(NOT_ACCEPT_TERMS_AND_CONDITIONS)
  end

end
