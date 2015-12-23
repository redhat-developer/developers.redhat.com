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
    gmail = Gmail.new('uk.redhat.test.user@gmail.com', 'P@$$word01')
    try(6) { @email = gmail.inbox.emails(:unread, from: 'no-reply@redhat.com').last }
    message_body = @email.message.body.raw_source
    url = message_body.scan(/https?:\/\/[\S]+/).first
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
