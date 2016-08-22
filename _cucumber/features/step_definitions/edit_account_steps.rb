And(/^the following newly registered details should be added to my profile:$/) do |table|
  on EditAccountPage do |page|
    table.raw.each do |row|
      element = row.first
      keycloak_admin = KeyCloak.new
      case element
        when 'Username'
          expect(page.username.attribute('value')).to eq $site_user[:email].gsub('@redhat.com', '').gsub('+', '-').gsub('_', '')
        when 'Email'
          expect(page.email.attribute('value')).to eq $site_user[:email]
        when 'First Name'
          expect(page.first_name.attribute('value').downcase).to eq $site_user[:first_name].downcase
        when 'Last name'
          expect(page.last_name.attribute('value').downcase).to eq $site_user[:last_name].downcase
        when 'Company'
          expect(page.company.attribute('value').downcase).to eq $site_user[:company_name].downcase
        when 'Country'
          expect(page.country).to eq $site_user[:country]
        when 'Red Hat Developer Program subscription date'
          reg_date = keycloak_admin.get_registration_date($site_user[:email])
          expect(page.agreement_date.attribute('value')).to eq reg_date
        when 'Privacy & Subscriptions status'
          status = keycloak_admin.get_subscription_status($site_user[:email])
          expect(page.receive_newsletter.selected?).to be status
        else
          raise("#{element} was not a recognised field")
      end
    end
  end
end

And(/^the following additional information should be added to my profile:$/) do |table|
  on EditAccountPage do |page|
    table.raw.each do |row|
      element = row.first
      keycloak_admin = KeyCloak.new
      case element
        when 'Username'
          expect(page.username.attribute('value')).to eq $site_user[:email]
        when 'Email'
          expect(page.email.attribute('value')).to eq $site_user[:email]
        when 'First Name'
          expect(page.first_name.attribute('value')).to eq $site_user[:first_name]
        when 'Last name'
          expect(page.last_name.attribute('value')).to eq $site_user[:last_name]
        when 'Company'
          expect(page.company.attribute('value')).to eq $site_user[:company_name]
        when 'Country'
          expect(page.country).to eq $site_user[:country]
        when 'Red Hat Developer Program subscription date'
          reg_date = keycloak_admin.get_registration_date($site_user[:email])
          expect(page.agreement_date.attribute('value')).to eq reg_date
        when 'Privacy & Subscriptions status'
          status = keycloak_admin.get_subscription_status($site_user[:email])
          expect(page.receive_newsletter.selected?).to be status
        else
          raise("#{element} was not a recognised field")
      end
    end
  end
end
