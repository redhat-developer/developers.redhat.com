# this class contains a set of methods that are used to update and get github profile information using the github api rest endpoint.
class GitHubAdmin

  def initialize(username, password)
    @client = Octokit::Client.new(login: username, password: password)
  end

  def update_profile(name, email, company)
    @client.update_user(name: name, email: email, company: company, location: 'Newcastle Upon Tyne', hireable: false)
  end

  def authorizations
    @client.authorizations
  end

  def authorization_id
    get_id = authorizations
    get_id[0]['id']
  end

  def remove_authorization(app_id)
    @client.delete_authorization(app_id)
  end

  def cleanup
    auths = authorizations
    app_id = authorization_id
    remove_authorization(app_id) unless auths.empty?
  end

end
