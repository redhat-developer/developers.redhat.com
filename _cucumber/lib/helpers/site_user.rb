module SiteUser

  ACCOUNT = {
      accepted_terms: {
          email: 'uk.redhat.test.user+accepted-terms@gmail.com',
          password: 'P@$$word01',
          name: 'TEST USER-ACCEPTED-TERMS'
      },
      not_accepted_terms: {
          email: 'uk.redhat.test.user+not-accepted-terms@gmail.com',
          password: 'P@$$word01',
          name: 'TEST USER-NOT-ACCEPTED-TERMS'
      },
      password_reset: {
          email: %w(redhat-developers-testers+94hl7e5x0h@redhat.com redhat-developers-testers+94hl7e5x0h@redhat.com redhat-developers-testers+309mnmdlbk@redhat.com redhat-developers-testers+16w9dg8gbh@redhat.com redhat-developers-testers+fbdtyoup2g@redhat.com redhat-developers-testers+0c454lss3r@redhat.com redhat-developers-testers+s01kvdw5oh@redhat.com redhat-developers-testers+0enem3f750@redhat.com redhat-developers-testers+s6vbvqai66@redhat.com redhat-developers-testers+zmqgdx7ie3@redhat.com redhat-developers-testers+k0k481z5d7@redhat.com").sample,
          password: 'P@$$word01',
          name: 'TEST USER'
      },
      full_site_user: {
          email: 'uk.redhat.test.user+full-site-user@gmail.com',
          password: 'P@$$word01',
          name: 'FULL-SITE USER'
      },
  }

  def generate_user

    {
        email: "redhat-developers-testers+#{Faker::Lorem.characters(10)}@redhat.com",
        greeting: %w(Mr. Mrs. Ms. Miss Dr. Hr Sr.).sample,
        first_name: Faker::Name.first_name,
        last_name: Faker::Name.last_name,
        password: Faker::Internet.password,
        company_name: Faker::Company.name,
        address_line_one: Faker::Address.street_address,
        city: Faker::Address.city_prefix,
        postal_code: Faker::Address.postcode,
        country: ['United States', 'Czech Republic', 'China', 'France', 'Germany', 'Hong Kong', 'India', 'Indonesia', 'Japan', 'Spain', 'United Kingdom'].sample,
        phone_number: '0191 1111111'

    }

  end

  def get_email(email_address)
    tries = 0
    begin
      tries += 1
      @gmail = Gmail.connect('uk.redhat.test.user@gmail.com', 'RedH@tTe$t01')
    rescue Net::IMAP::NoResponseError => ex
      if tries < 10
        p "Error: #{ex.message}. Retrying..."
        sleep 1 * tries
        retry
      else
        raise('Test user was not logged into gmail after 10 attempts!')
      end
    end
    try(6) { @email = @gmail.inbox.emails(:unread, to: email_address).last }
    message_body = @email.message.body.raw_source
    url = message_body.scan(/https?:\/\/[\S]+/).first
    # delete all mails and close the gmail session
    @gmail.inbox.find(:to => email_address).each do |email|
      email.delete!
    end
    @gmail.logout
    raise('Test user was not logged out of gmail session!') if @gmail.logged_in?.eql?(true)
    encoded_url = URI.encode(url)
    URI.parse(encoded_url)
    # return valid URI
    return encoded_url.gsub('<', '')
  end

  private

  def try(i)
    count = 0; email = nil
    until email != nil || count == i
      email = yield
      sleep 10
      count += 1
    end
    if email.eql?(nil)
      raise("Email was not received after #{count}0 seconds")
    end
  end

end

World(SiteUser)
