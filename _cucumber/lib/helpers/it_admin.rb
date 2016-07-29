class ItAdmin

  def initialize
    @email = "redhat-developers-testers_#{Faker::Lorem.characters(10)}@redhat.com"
    @username = Faker::Lorem.characters(10)
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
    @locale = 'en_US'
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
        :username => @email,
        :password => @password,
        :first_name => @first_name,
        :last_name => @last_name,
        :full_name => @full_name,
        :company_name => @company_name,
        :country => 'United Kingdom'
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
        :userType => 'P',
        :login => @username,
        :active => true,
        :password => @password,
        :system => 'WEB',

        :personalInfo => {
            :company => @company_name,
            :firstName => @first_name,
            :title => 'Test Engineer',
            :greeting => @greeting,
            :lastName => @last_name,
            :email => @email,
            :emailConfirmed => true,
            :phoneNumber => @phone_number,
            :password => @password,
            :locale => @locale
        },

        :site => {
            :active => true,
            :defaultSite => true,
            :system => 'WEB',
            :siteType => 'MARKETING',
            :address => {
                :address_line_one => @address_line_one,
                :country => @country,
                :postalCode => @postal_code,
                :city => @city,
                :poBox => false
            }
        }
    }

    begin
      RestClient::Request.execute(
          :method => :post,
          :url => 'http://servicejava.edge.stage.ext.phx2.redhat.com/svcrest/user/v3/createwithoutwelcome',
          :payload => @account_details.to_json,
          :verify_ssl => false,
          :headers => {
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
        :country => 'United Kingdom',
    }
  end

end
