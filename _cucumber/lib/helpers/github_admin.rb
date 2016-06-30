class GitHubAdmin

  def initialize(username, password)
    @client = Octokit::Client.new(:login => username, :password => password)
  end

  def generate_user

    {
        email: "redhat-tester-rhd_automated-tester-#{Faker::Lorem.characters(10)}@redhat.com",
        first_name: 'RED HAT',
        last_name: 'TEST',
        company_name: 'RED HAT',
        country: ['United States', 'Czech Republic', 'United Kingdom'].sample,

    }

  end

  def rhd_registered_user
    {
        email: 'redhat-developers-testers+rhdalreadyregistered01@redhat.com',
        password: 'P@$$word01',
        name: 'RED HAT TEST',
        first_name: 'RED HAT',
        last_name: 'TEST',
        username: 'redhat-developers-testers+rhdalreadyregistered01@redhat.com',
        company_name: 'RED HAT',
        country: 'Hong Kong',
        register_date: 'Jun 17, 2016',
        newsletter: false

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
