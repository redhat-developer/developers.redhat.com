class KeyCloak

  def initialize
    request_body_map = {:username => 'automated-tests-user', :password => 'fadsd356erRe', :grant_type => 'password', :client_id => 'automated-tests'}
    request_header = {:content_type => 'application/x-www-form-urlencoded'}
    endpoint = 'https://developers.stage.redhat.com/auth/realms/master/protocol/openid-connect/token'
    response = RestClient::Request.execute(:url => endpoint, :method => :post, :headers => request_header, :payload => request_body_map, :verify_ssl => false)
    @access_token = JSON.parse(response)['access_token']
  end

  def get_user_by(email)
    email_address = CGI.escape(email)
    data = RestClient::Request.execute(:method => :get, :url => "https://developers.stage.redhat.com/auth/admin/realms/rhd/users?email=#{email_address}", :headers => {'Authorization' => "Bearer #{@access_token}"}, :verify_ssl => false)
    JSON.parse(data)
  end

  def get_social_logins(email)
    user = get_user_by(email)
    user_id = user[0]['id']
    data = RestClient::Request.execute(:method => :get, :url => "https://developers.stage.redhat.com/auth/admin/realms/rhd/users/#{user_id}/federated-identity", :headers => {'Authorization' => "Bearer #{@access_token}"}, :verify_ssl => false)
    JSON.parse(data)
  end

  def remove_social_provider(email)
    user = get_user_by(email)
    user_id = user[0]['id']
    user_social_logins = get_social_logins(email)
    identity_provider = user_social_logins[0]['identityProvider']
    RestClient::Request.execute(:method => :delete, :url => "https://developers.stage.redhat.com/auth/admin/realms/rhd/users/#{user_id}/federated-identity/#{identity_provider}", :headers => {'Authorization' => "Bearer #{@access_token}"}, :verify_ssl => false)
  end

  def delete_user(email)
    user = get_user_by(email)
    user_id = user[0]['id']
    puts "User ID was: #{user_id}"
    RestClient::Request.execute(:method => :delete, :url => "https://developers.stage.redhat.com/auth/admin/realms/rhd/users/#{user_id}", :headers => {'Authorization' => "Bearer #{@access_token}"}, :verify_ssl => false)
  end

end