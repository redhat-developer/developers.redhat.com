When(/^I register a new account$/) do
  @site_user = SiteUser.new
  @site_user.generate
  visit HomePage do |page|
    page.open_register_page
  end
  on RegistrationPage do |page|
    page.fill_in_form(@site_user.details)
    page.accept_all_terms
    page.create_account
    page.thanks_message.should == 'Thanks for Registering!'
  end
end

When(/^I register a new account in oder to download$/) do
  @site_user = SiteUser.new
  @site_user.generate
  on LoginPage do |page|
    page.click_register_link
  end
  on DownloadRegistrationPage do |page|
    page.fill_download_reg_form(@site_user.details)
    page.accept_all_terms
    page.create_account
  end
end

When(/^I complete the registration form, selecting my country as "(.*)"$/) do |country|
  @site_user = SiteUser.new
  @site_user.generate(country)
  on RegistrationPage do |page|
    page.fill_in_form(@site_user.details)
    page.accept_all_terms
    page.create_account
  end
end

Given(/^I am a (Developer.redhat.com||RHD|Customer Portal|Openshift) registered site visitor(?: (with|without) a phone number)?$/) do |persona, phone_number|
  if phone_number == 'without'
    @site_user = SiteUser.new
    @site_user.create('with_missing_phone')
  else
    @site_user = SiteUser.new
    if persona == 'Developer.redhat.com'
      # hardcoded RHD site visitor due to export hold issues.
      @site_user.hardcoded_rhd_user
    else
      @site_user.create(persona.downcase.gsub(' ', '_'))
    end
  end
end

When(/^I try to register with an invalid email address$/) do
  @site_user = SiteUser.new
  @site_user.generate
  @site_user.details[:email] = 'email.co.uk'
  on RegistrationPage do |page|
    page.fill_in_form(@site_user.details)
    page.create_account
  end
end

When(/^I try to register with an existing RHD registered email$/) do
  @site_user = SiteUser.new
  @site_user.generate
  @site_user.details[:email] = 'uk.redhat.test.user+full-site-user@gmail.com'

  on RegistrationPage do |page|
    page.fill_in_form(@site_user.details)
  end
end

When(/^I register a new account using my GitHub account$/) do
  @github_admin = GitHubAdmin.new('rhdScenarioOne', 'P@$$word01')
  @site_user = SiteUser.new
  @site_user.generate
  @github_admin.update_profile("#{@site_user.details[:first_name].upcase} #{@site_user.details[:last_name].upcase}", @site_user.details[:email], @site_user.details[:company_name])
  on RegistrationPage do |page|
    page.click_register_with_github
  end
  on GitHubPage do |page|
    page.login_with('rhdScenarioOne', 'P@$$word01')
    page.authorize_app
  end
end

When(/^I link a GitHub account to my existing account$/) do
  @github_admin = GitHubAdmin.new('rhdScenarioTwo', 'P@$$word01')

  @site_user = SiteUser.new
  @site_user.create('rhd')
  @github_admin.update_profile("#{@site_user.details[:first_name].upcase} #{@site_user.details[:last_name].upcase}", @site_user.details[:email], @site_user.details[:company_name])

  on RegistrationPage do |page|
    page.click_register_with_github
  end

  on GitHubPage do |page|
    page.login_with('rhdScenarioTwo', 'P@$$word01')
    page.authorize_app
  end

  on AdditionalActionPage do |page|
    page.fill_in(@site_user.details)
  end
end

When(/^I register a new account using a GitHub account that contains missing profile information$/) do
  @github_admin = GitHubAdmin.new('rhdalreadyregistered01', 'P@$$word01')
  @site_user = SiteUser.new
  @site_user.generate
  @github_admin.update_profile('', @site_user.details[:email], '')
  on RegistrationPage do |page|
    page.click_register_with_github
  end
  on GitHubPage do |page|
    page.login_with('rhdalreadyregistered01', 'P@$$word01')
    page.authorize_app
  end
end

When(/^I try to register using a GitHub account that contains missing profile information with an existing RHD registered email$/) do
  @github_admin = GitHubAdmin.new('rhdalreadyregistered02', 'P@$$word01')
  @site_user = SiteUser.new
  @site_user.create('rhd')
  @github_admin.update_profile('', @site_user.details[:email], '')
  on RegistrationPage do |page|
    page.click_register_with_github
  end
  on GitHubPage do |page|
    page.login_with('rhdalreadyregistered02', 'P@$$word01')
    page.authorize_app
  end
end

When(/^I complete the registration form$/) do
  @site_user = SiteUser.new
  @site_user.generate
  on RegistrationPage do |page|
    page.fill_in_form(@site_user.details)
    page.accept_all_terms
    page.create_account
  end
end

When(/^I complete the registration with an empty "([^"]*)"$/) do |field|
  @site_user = SiteUser.new
  @site_user.generate
  on RegistrationPage do |page|
    case field
      when 'email field'
        @site_user.details[:email] = ''
        page.fill_in_form(@site_user.details)
      when 'password field'
        @site_user.details[:password] = ''
        page.fill_in_form(@site_user.details)
      when 'password confirm field'
        @site_user.details[:password] = ''
        page.fill_in_form(@site_user.details)
      when 'first name field'
        @site_user.details[:first_name] = ''
        page.fill_in_form(@site_user.details)
      when 'last name field'
        @site_user.details[:last_name] = ''
        page.fill_in_form(@site_user.details)
      when 'company field'
        @site_user.details[:company_name] = ''
        page.fill_in_form(@site_user.details)
      when 'country field'
        @site_user.details[:country] = ''
        page.fill_in_form(@site_user.details)
      else
        fail("#{field} was not a recognised field")
    end
    page.create_account
  end
end

When(/^I complete the registration with my country as "(.*)" with an empty "(.*)"$/) do |country, field|
  @site_user = SiteUser.new
  @site_user.generate(country)
  on RegistrationPage do |page|
    case field
      when 'email field'
        @site_user.details[:email] = ''
        page.fill_in_form(@site_user.details)
      when 'password field'
        @site_user.details[:password] = ''
        page.fill_in_form(@site_user.details)
      when 'password confirm field'
        @site_user.details[:password] = ''
        page.fill_in_form(@site_user.details)
      when 'first name field'
        @site_user.details[:first_name] = ''
        page.fill_in_form(@site_user.details)
      when 'last name field'
        @site_user.details[:last_name] = ''
        page.fill_in_form(@site_user.details)
      when 'company field'
        @site_user.details[:company_name] = ''
        page.fill_in_form(@site_user.details)
      when 'country field'
        @site_user.details[:country] = ''
        page.fill_in_form(@site_user.details)
      when 'state field'
        @site_user.details[:state] = ''
        page.fill_in_form(@site_user.details)
      when 'city field'
        @site_user.details[:city] = ''
        page.fill_in_form(@site_user.details)
      else
        fail("#{field} was not a recognised field")
    end
    page.create_account
  end
end

Then(/^I should be registered and logged in$/) do
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

When(/^I try to enter passwords that do not match$/) do
  @site_user = SiteUser.new
  @site_user.generate
  on RegistrationPage do |page|
    page.enter_password(@site_user.details[:password], '123')
    page.create_account
  end
end

Then(/^I should see a "([^"]*)" error with "([^"]*)"$/) do |field, field_warning|
  on RegistrationPage do |page|
    expect(page.send("#{field.gsub(' ', '_')}_error")).to eq(field_warning)
  end
end

Then(/^I should see the Registration page$/) do
  on RegistrationPage
end

When(/^I try to register with an existing OpenShift registered email$/) do
  @site_user = SiteUser.new
  @site_user.generate
  on RegistrationPage do |page|
    @site_user.details[:email] = 'velias+emailveriftest@redhat.com'
    page.fill_in_form(@site_user.details)
  end
end

Then(/^each term should link to relevant terms and conditions page:$/) do |table|
  on RegistrationPage do |page|
    page.expand_register_choice_email # if the user is on a mobile device
    table.hashes.each do |row|
      case row[:term]
        when 'Red Hat Developer Program'
          page.rhd_developer_terms.attribute_value('href').should include row[:url]
        when 'Red Hat Subscription Agreement'
          page.rhd_subscription_terms.attribute_value('href').should include row[:url]
        when 'Red Hat Portals Terms of Use'
          page.rh_portal_terms.attribute_value('href').should include row[:url]
        else
          fail("#{row[:term]} is not a recognised term")
      end
    end
  end
end

Then(/^I should receive an email containing a verify email link$/) do
  @verification_email = get_email(@site_user.details[:email])
  expect(@verification_email.to_s).to include('first-broker-login?')
end

And(/^I navigate to the verify email link$/) do
  close_and_reopen_browser
  @browser.goto(@verification_email)
end

And(/^I choose to register a new account using my GitHub account$/) do
  on LoginPage do |page|
    page.click_register_link
  end
  @github_admin = GitHubAdmin.new('rhdScenarioOne', 'P@$$word01')
  @site_user = SiteUser.new
  @site_user.generate
  @github_admin.update_profile("#{@site_user.details[:first_name].upcase} #{@site_user.details[:last_name].upcase}", @site_user.details[:email], @site_user.details[:company_name])
  on DownloadRegistrationPage do |page|
    page.click_register_with_github
  end
  on GitHubPage do |page|
    page.login_with('rhdScenarioOne', 'P@$$word01')
    page.authorize_app
  end
  on AdditionalActionPage do |page|
    expect(page.email_field.value).to eq @site_user.details[:email]
  end
end

When(/^I choose to register a new account using a GitHub account that contains missing profile information$/) do
  on LoginPage do |page|
    page.click_register_link
  end
  @github_admin = GitHubAdmin.new('rhdalreadyregistered01', 'P@$$word01')
  @site_user = SiteUser.new
  @site_user.generate
  @github_admin.update_profile('', '', '')
  on DownloadRegistrationPage do |page|
    page.click_register_with_github
  end
  on GitHubPage do |page|
    page.login_with('rhdalreadyregistered01', 'P@$$word01')
    page.authorize_app
  end
end
