class ItAdmin

  def initialize
    @email = "redhat-developers-testers_#{Faker::Lorem.characters(10)}@redhat.com"
    @greeting = %w(Mr. Mrs. Ms. Miss Dr. Hr Sr.).sample
    @first_name = Faker::Name.first_name
    @last_name = Faker::Name.last_name
    @password = 'P@$$word01'
    @company_name = Faker::Company.name
    @address_line_one = Faker::Address.street_address
    @city = Faker::Address.city_prefix
    @postal_code = Faker::Address.postcode
    @country = %w(US CZ UK).sample
    @phone_number = '0191 1111111'
    @full_name = "#{@first_name} #{@last_name}".upcase
  end

  def create_simple_user
    @account_details = {
        :disabled => false,
        :emailAddress => @email,
        :emailVerified => true,
        :joinDate => Time.now.to_i
    }
    begin
      RestClient::Request.execute(
          :method => :post,
          :url => 'http://servicejava.edge.stage.ext.phx2.redhat.com/svcrest/simpleuser/suser/thirdparty?system=rhd',
          :payload => @account_details.to_json,
          :headers => {
              :content_type => :json,
              :accept => :json
          },
      )
    rescue => e
      raise("Failed to create a new simple user: Exception was #{e}")
    end
    change_password(@email, @password)

    return {
        :email => @email,
        :password => @password
    }
  end

  def change_password(email, password)
    email_address = CGI.escape(email)
    begin
      RestClient::Request.execute(
          :method => :put,
          :url => "http://servicejava.edge.stage.ext.phx2.redhat.com/svcrest/simpleuser/pwd/login=#{email_address}?password=#{password}",
          :headers => {
              :content_type => :json,
              :accept => :json
          },
      )
    rescue => e
      raise e
    end
  end

  def create_full_user
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
        :username => @email.gsub('@redhat.com', '').gsub('+', '-'),
        :password => @password,
        :first_name => @first_name,
        :last_name => @last_name,
        :full_name => @full_name,
        :company_name => @company_name,
        :country => @country,
    }
  end

end
