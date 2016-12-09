# this module contains a method that uses gmail api in order connect to a mailbox and wait for an email to arrive, delete emails etc.
module Email
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

    try(7) { @email = @gmail.inbox.emails(:unread, to: email_address).last }

    message_body = @email.message.body.raw_source
    url = message_body.scan(/https?:\/\/[\S]+/).first
    # delete all mails and close the gmail session
    @gmail.inbox.find(to: email_address).each(&:delete!)
    @gmail.logout
    fail('Test user was not logged out of gmail session!') if @gmail.logged_in?.eql?(true)
    encoded_url = URI.encode(url)
    URI.parse(encoded_url)
    # return valid URI
    encoded_url.gsub('<', '')
  end

  private

  def try(i)
    count = 0
    email = nil
    until !email.nil? || count == i
      puts ' . . . waiting for email . . .'
      email = yield
      sleep 10
      count += 1
    end
    fail("Email was not received after #{count}0 seconds") if email.eql?(nil)
  end
end
World(Email)
