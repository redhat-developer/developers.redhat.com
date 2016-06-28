class KeyCloak

  def initialize
    request_body_map = {:username => 'automated-tests-user@redhat.com', :password => 'P@$$word01', :grant_type => 'password', :client_id => 'admin-cli'}
    request_header = {:content_type => 'application/x-www-form-urlencoded'}
    endpoint = 'https://developers.stage.redhat.com/auth/realms/master/protocol/openid-connect/token'
    response = RestClient::Request.execute(:url => endpoint, :method => :post, :headers => request_header, :payload => request_body_map, :verify_ssl => false)
    @access_token = JSON.parse(response)['access_token']
    @email = "rhd-autotest+sid_#{$session_id}_#{Faker::Lorem.characters(5)}@redhat.com"
    @greeting = %w(Mr. Mrs. Ms. Miss Dr. Hr Sr.).sample
    @first_name = Faker::Name.first_name
    @last_name = Faker::Name.last_name
    @password = 'P@$$word01'
    @company_name = Faker::Company.name
    @address_line_one = Faker::Address.street_address
    @city = Faker::Address.city_prefix
    @postal_code = Faker::Address.postcode
    @country = 'UK'
    @phone_number = '0191 1111111'
    @full_name = "#{@first_name} #{@last_name}".upcase
  end

  def register_new_user
    @account_details = {
        :enabled => true,
        :emailVerified => true,
        :attributes => {:company => [@company_name], :country => [@country], :pwd => [@password], "tcacc-1246".to_sym => ['y'], "tcacc-1010".to_sym => ['y'], "tcacc-6".to_sym => ['y']},
        :requiredActions => [],
        :username => @email,
        :email => @email,
        :firstName => @first_name,
        :lastName => @last_name,
    }
    begin
      RestClient::Request.execute(
          :method => :post,
          :url => 'https://developers.stage.redhat.com/auth/admin/realms/rhd/users',
          :payload => @account_details.to_json,
          :verify_ssl => false,
          :headers => {
              :Authorization => "Bearer #{@access_token}",
              :content_type => :json,
              :accept => :json
          },
      )
    rescue => e
      raise("Failed to create a new user: Exception was #{e}")
    end

    return {
        :email => @email,
        :username => @email.gsub('@redhat.com', '').gsub('+', '-').gsub('_', ''),
        :password => @password,
        :first_name => @first_name,
        :last_name => @last_name,
        :full_name => @full_name,
        :company_name => @company_name,
        :country => 'United Kingdom'
    }
  end

  def get_user_by(email)
    email_address = CGI.escape(email)
    data = RestClient::Request.execute(:method => :get, :url => "https://developers.stage.redhat.com/auth/admin/realms/rhd/users?email=#{email_address}", :headers => {'Authorization' => "Bearer #{@access_token}"}, :verify_ssl => false)
    JSON.parse(data)
  end

  def get_registration_date(email)
    date = get_user_attribute(email, 'rhdTacSignDateFormatted').to_date
    format_date(date.to_s)
  end

  def get_subscription_status(email)
    status = get_user_attribute(email, 'rhdSubscrValid')
    boolean(status)
  end

  def get_user_attribute(email, attribute)
    data = get_user_by(email)
    data[0]['attributes'][attribute].first
  end

  def get_social_logins(email)
    user = get_user_by(email)
    user_id = user[0]['id']
    data = RestClient::Request.execute(:method => :get, :url => "https://developers.stage.redhat.com/auth/admin/realms/rhd/users/#{user_id}/federated-identity", :headers => {'Authorization' => "Bearer #{@access_token}", :content_type => 'application/x-www-form-urlencoded'}, :verify_ssl => false)
    JSON.parse(data)
  end

  def link_social_provider(email, identity_provider, user_id, user_name)
    user = get_user_by(email)
    rhd_user_id = user[0]['id']

    @details = {

        :identityProvider => identity_provider,
        :userId => user_id,
        :userName => user_name

    }

    begin
      RestClient::Request.execute(
          :method => :post,
          :url => "https://developers.stage.redhat.com/auth/admin/realms/rhd/users/#{rhd_user_id}/federated-identity/#{identity_provider}",
          :payload => @details.to_json,
          :verify_ssl => false,
          :headers => {
              :Authorization => "Bearer #{@access_token}",
              :content_type => :json,
              :accept => :json
          },
      )
    rescue => e
      raise("Failed to link social provider. Exception was #{e}")
    end
  end

  def unlink_social_provider(email)
    user = get_user_by(email)
    user_id = user[0]['id']
    user_social_logins = get_social_logins(email)
    identity_provider = user_social_logins[0]['identityProvider']
    begin
      RestClient::Request.execute(:method => :delete, :url => "https://developers.stage.redhat.com/auth/admin/realms/rhd/users/#{user_id}/federated-identity/#{identity_provider}", :headers => {'Authorization' => "Bearer #{@access_token}"}, :verify_ssl => false)
    rescue => e
      raise("Failed to unlink social provder for email '#{email}'. Response from keycloak admin was #{e}")
    end
  end

  def delete_user(email)
    user = get_user_by(email)
    user_id = user[0]['id']
    begin
      RestClient::Request.execute(:method => :delete, :url => "https://developers.stage.redhat.com/auth/admin/realms/rhd/users/#{user_id}", :headers => {'Authorization' => "Bearer #{@access_token}"}, :verify_ssl => false)

    rescue => e
      raise("Failed to delete user with email '#{email}'. Response from keycloak admin was #{e}")
    end
    puts "Deleted user ID was: #{user_id}, and email was #{email}"
  end

  private

  def format_date(date)
    d = Date.parse(date)
    day = d.day
    month = d.strftime("%b")
    year = d.year
    "#{month} #{day}, #{year}"
  end

  def boolean(str)
    str == 'true'
  end

end
