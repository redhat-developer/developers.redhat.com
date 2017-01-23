Given(/^I log in with (an|a) (valid|incorrect) password$/) do |_arg, negate|
  on LoginPage do |page|
    if negate.eql?('valid')
      page.login_with(@site_user.details[:email], @site_user.details[:password])
    else
      page.login_with(@site_user.details[:email], 'incorrect')
    end
  end
end

Given(/^I log in with (an|a) (valid|incorrect) username$/) do |_arg, negate|
  on LoginPage do |page|
    if negate.eql?('valid')
      page.login_with(@site_user.details[:username], @site_user.details[:password])
    else
      page.login_with('fail', 'password')
    end
  end
end

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

Given(/^I log in with (an|a) (valid|invalid) email address$/) do |_arg, negate|
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
    @site_user.create('customer_portal')
  else
    @site_user.create('customer_portal')
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
    @browser.refresh
    visit HomePage
    expect(@current_page.logged_in?).to eq "#{@site_user.details[:first_name].upcase} #{@site_user.details[:last_name].upcase}"
    @current_page.toggle_menu_close
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

Then(/^I can log back into RHD using my newly created password$/) do
  @current_page.open_login_page
  on LoginPage do |page|
    page.login_with(@site_user.details[:email], 'NewPa$$word')
    expect(page.logged_in?).to eq "#{@site_user.details[:first_name].upcase} #{@site_user.details[:last_name].upcase}"
  end
end
