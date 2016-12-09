Given(/^I am on a "([^"]*)" referred page as "([^"]*)"$/) do |referrer, url|
  if referrer.eql?('JBoss')
    @browser.goto("#{$host_to_test}/#{url}?referrer=jbd")
  else
    fail("Referrer #{referrer} was not recognized")
  end
end

Then(/^I should see a "([^"]*)" alert$/) do |msg|
  on SiteBase do |page|
    if msg.eql?('Referrer')
      expect(page.referral_alert.present?).to eq true
    else
      fail("Alert type #{msg} was not recognized")
    end
  end
end
