class GitHubAdmin

  def initialize(username, password)
    @client = Octokit::Client.new(:login => username, :password => password)
  end

  def generate_user_for_session(country=nil, session_id)

    country_ = ['Czech Republic', 'United Kingdom'].sample if country == nil

    case country
      when 'United States'
        state = 'Washington'
        city = 'Washington DC'
      when 'Canada'
        state = 'Ontario'
        city = 'Ottawa'
      when 'Mexico'
        state = 'Mexico'
        city = 'Mexico City'
      when 'Ukraine'
        state = nil
        city = 'Kiev'
      else
        state = nil
        city = nil
    end


    {
        email: "redhat-developers-testers+sid_#{session_id}_#{Faker::Lorem.characters(5)}@redhat.com",
        first_name: 'RED HAT',
        last_name: 'TEST',
        company_name: 'RED HAT',
        country: country_,
        city: city,
        state: state

    }

  end

  def update_profile(name, email, company)
    @client.update_user(:name => name, :email => email, :company => company, :location => 'Newcastle Upon Tyne', :hireable => false)
  end

  def get_authorizations
    @client.authorizations
  end

  def get_authorization_id
    get_id = get_authorizations
    get_id[0]['id']
  end

  def remove_authorization(app_id)
    @client.delete_authorization(app_id)
  end

  def cleanup
    authorizations = get_authorizations
    unless authorizations.empty?
      app_id = get_authorization_id
      remove_authorization(app_id)
    end
  end

end
