module SiteUser

  def generate_user

    {
        email: "rhd-autotest+sid_#{$session_id}_#{Faker::Lorem.characters(5)}@redhat.com",
        greeting: %w(Mr. Mrs. Ms. Miss Dr. Hr Sr.).sample,
        first_name: Faker::Name.first_name,
        last_name: Faker::Name.last_name,
        password: Faker::Internet.password,
        company_name: Faker::Company.name,
        address_line_one: Faker::Address.street_address,
        city: Faker::Address.city_prefix,
        postal_code: Faker::Address.postcode,
        country: ['United States', 'Czech Republic', 'United Kingdom'].sample,
        phone_number: '0191 1111111'

    }

  end

  def github_account_holder
      {
          identity_provider: 'github',
          user_id: '20190656',
          user_name: 'rhdsociallogin',
          git_password: 'P@$$word01'
      }
  end

  def get_email(email_address)
    tries ||= 10
    begin
      @gmail = Gmail.connect!('uk.redhat.test01.user@gmail.com', '$tumpjumperRedH@tTe$t01')
    rescue => e
      if (tries -= 1) > 0
        puts "Failed to access gmail with exception: #{e}"
        sleep(1.5)
        retry
      else
        raise('Test user was not logged into gmail after 10 attempts!')
      end
    end

    try(7) {
      @email = @gmail.inbox.emails(:unread, to: email_address).last
    }

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
      puts ' . . . waiting for email . . .'
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
