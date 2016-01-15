module Customer

  ACCOUNT = {
      accepted_terms: {
          email: 'accepted_terms_test_user@example.com',
          password: 'P@$$word01',
          name: 'WALTER WHITE'
      },
      not_accepted_terms: {
          email: 'not_accepted_term_test_user@example.com',
          password: 'P@$$word01',
          name: 'JESSE PINKMAN'
      },
      password_reset: {
          email: 'redhat-developers-testers+94hl7e5x0h@redhat.com',
          password: 'P@$$word01',
          name: 'REDHAT TEST-USER'
      }
  }

  def generate_customer
    {
        email: "redhat-developers-testers+#{Faker::Lorem.characters(10)}@redhat.com",
        first_name: Faker::Name.first_name,
        last_name: Faker::Name.last_name,
        password: 'P@$$word01'
    }
  end

  def get_email
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
    try(6) { @email = @gmail.inbox.emails(:unread, from: 'no-reply@redhat.com').last }
    message_body = @email.message.body.raw_source
    url = message_body.scan(/https?:\/\/[\S]+/).first
    # delete all mails and close the gmail session
    @gmail.inbox.find(:from => 'no-reply@redhat.com').each do |email|
      email.delete!
    end
    @gmail.logout
    raise('Test user was not logged out of gmail session!') if @gmail.logged_in?.eql?(true)
    encoded_url = URI.encode(url)
    URI.parse(encoded_url)
    # return valid URI
    p encoded_url
    return encoded_url.gsub('<', '')
  end

  private

  def try(i)
    count = 0; email = nil
    until email != nil || count == i
      p ' . . . waiting for email . . .'
      email = yield
      sleep 10
      count += 1
    end
    if email.eql?(nil)
      raise("Email was not received after #{count}0 seconds")
    end
  end

end

World(Customer)
