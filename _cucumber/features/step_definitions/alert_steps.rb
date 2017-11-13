# Given(/^I am on a "([^"]*)" referred page as "([^"]*)"$/) do |referrer, url|
#   if referrer.eql?('JBoss')
#     on SiteBase do |page|
#       page.open("/#{url}?referrer=jbd")
#     end
#   else
#     fail("Referrer #{referrer} was not recognized")
#   end
# end
#
# Then(/^I should see a "([^"]*)" alert$/) do |msg|
#   on SiteBase do |page|
#     if msg.eql?('Referrer')
#       fail("#{msg} was not visible") unless page.referral_alert.present?
#     else
#       fail("Alert type #{msg} was not recognized")
#     end
#   end
# end
