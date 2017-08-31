Given(/^I have previously logged in$/) do
  visit LoginPage do |page|
    page.login_with(@site_user.details[:email], @site_user.details[:password])
    expect(page.logged_in?).to eq(@site_user.details[:full_name])
  end
end

When(/^I am logged into RHD$/) do
  visit LoginPage do |page|
    page.login_with(@site_user.details[:email], @site_user.details[:password])
    expect(page.logged_in?).to eq "#{@site_user.details[:first_name].upcase} #{@site_user.details[:last_name].upcase}"
  end
end

Then(/^I should be logged out$/) do
  expect(@current_page.logged_out?).to be true
end


Then(/^I can log back into RHD using my newly created password$/) do
  visit LoginPage do |page|
    page.login_with(@site_user.details[:email], 'NewPa$$word')
    expect(page.logged_in?).to eq "#{@site_user.details[:first_name].upcase} #{@site_user.details[:last_name].upcase}"
  end
end
