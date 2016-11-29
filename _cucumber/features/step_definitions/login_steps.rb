Given(/^I log in with (an|a) (valid|incorrect) password$/) do |arg, negate|
  on LoginPage do |page|
    if negate.eql?('valid')
      page.login_with(@site_user.details[:email], @site_user.details[:password])
    else
      page.login_with(@site_user.details[:email], 'incorrect')
    end
  end
end

Given(/^I log in with (an|a) (valid|incorrect) username$/) do |arg, negate|
  on LoginPage do |page|
    if negate.eql?('valid')
      page.login_with(@site_user.details[:username], @site_user.details[:password])
    else
      page.login_with('fail', 'password')
    end
  end
end

Given(/^I have previously logged in$/) do
  visit HomePage do |page|
    page.open_login_page
  end
  on LoginPage do |page|
    page.login_with(@site_user.details[:email], @site_user.details[:password])
  end
  expect(@current_page.logged_in?).to eq(@site_user.details[:full_name])
end

When(/^I am logged into RHD$/) do
  visit HomePage do |page|
    page.open_login_page
    on LoginPage do |page|
      page.login_with(@site_user.details[:username], @site_user.details[:password])
      expect(page.logged_in?).to eq "#{@site_user.details[:first_name].upcase} #{@site_user.details[:last_name].upcase}"
    end
  end
end

Given(/^I am logged in to RHD using my portal account$/) do
  visit HomePage do |page|
    page.open_login_page
  end
  on LoginPage do |page|
    page.login_with(@site_user.details[:email], @site_user.details[:password])
  end
  on AdditionalInformationPage do |page|
    page.fulluser_tac_accept
    page.click_submit
    expect(page.logged_in?).to eq(@site_user.details[:full_name])
  end
end

Given(/^I log in with (an|a) (valid|invalid) email address$/) do |arg, negate|
  on LoginPage do |page|
    if negate.eql?('valid')
      page.login_with(@site_user.details[:email], @site_user.details[:password])
    else
      page.login_with('testUser.com', 'P@$$word01')
    end
  end
end

When(/^I log in with an active OpenShift account$/) do
  @site_user = SiteUser.new
  @site_user.create('openshift')

  on LoginPage do |page|
    page.login_with(@site_user.details[:email], @site_user.details[:password])
  end
end

When(/^I log in with a (active|deactivated) Customer portal account$/) do |negate|
  @site_user = SiteUser.new
  if negate == 'active'
    @site_user.create('openshift')
  else
    @site_user.create('openshift')
    @site_user.deactivate(@site_user.details[:email])
  end
  on LoginPage do |page|
    page.login_with(@site_user.details[:email], @site_user.details[:password])
  end
end

When(/^I log in with an account that is already linked to my Github account$/) do

  @site_user = SiteUser.new
  @site_user.create('rhd')
  @site_user.link_social_account(@site_user.details[:email])
  on LoginPage do |page|
    page.click_login_with_github
  end
  on GitHubPage do |page|
    page.login_with('rhdsociallogin', 'P@$$word01')
  end
end

Then(/^I should be logged in$/) do
  begin
    expect(@current_page.logged_in?).to eq "#{@site_user.details[:first_name].upcase} #{@site_user.details[:last_name].upcase}"
    @current_page.toggle_menu_close
  rescue
    visit HomePage
    expect(@current_page.logged_in?).to eq "#{@site_user.details[:first_name].upcase} #{@site_user.details[:last_name].upcase}"
    @current_page.toggle_menu_close
  end
end

Then(/^I should still be be logged in on the Home page$/) do
  expect(@current_page.logged_in?).to eq @site_user.details[:full_name]
  on HomePage do |page|
    expect(page.title).to eq('Red Hat Developers')
  end
end

Then(/^I should be logged out$/) do
  expect(@current_page.logged_out?).to be true
end

And(/^the following error message should be displayed: (.*)$/) do |message|
  on LoginPage do |page|
    expect(page.error_message).to eq(message)
  end
end

And(/^I click the forgot password link$/) do
  on LoginPage do |page|
    page.click_password_reset
  end
end

Then(/^I should be redirected to the RHD Log in page$/) do
  on LoginPage do |page|
    expect(page.title).to eq 'Login | Red Hat Developers'
  end
end

When(/^I click on the Create account link$/) do
  on LoginPage do |page|
    page.click_register_link
  end
end

Then(/^I should see the Log in page with the message "([^"]*)"$/) do |title|
  on LoginPage
  expect(@browser.text).to include(title)
end

Then(/^I can log back into RHD using my newly created password$/) do
  @current_page.open_login_page
  on LoginPage do |page|
    page.login_with(@site_user.details[:email], 'NewPa$$word')
    expect(page.logged_in?).to eq "#{@site_user.details[:first_name].upcase} #{@site_user.details[:last_name].upcase}"
  end
end
