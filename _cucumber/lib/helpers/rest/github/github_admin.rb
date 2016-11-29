class GitHubAdmin

  def initialize(username, password)
    @client = Octokit::Client.new(:login => username, :password => password)
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
