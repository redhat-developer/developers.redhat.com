require_relative 'keycloak/keycloak_admin'
require_relative 'it_services/it_admin'

# this class is a wrapper for the i.t and keycloak admin classes and is used to create and manipulate test data for test scenarios.
class SiteUser
  attr_reader :details

  def create(user)
    @details = send("create_new_#{user}_user")
  end

  def generate(country = nil)
    @details = generate_customer_credentials(country)
  end

  def deactivate(email)
    ItAdmin.new.disable_user(email)
  end

  def link_social_account(email)
    KeyCloakAdmin.new.link_social_provider(email, 'github', '20190656', 'rhdsociallogin')
  end

  def hardcoded_rhd_user
    @details = {
        email: 'redhat-developers-testers+sid_31250_e082k@redhat.com',
        first_name: 'Wendell',
        last_name: 'Braun',
        full_name: 'WENDELL BRAUN',
        password: 'P@$$word01',
    }
  end

  protected

  def create_new_rhd_user
    KeyCloakAdmin.new.register_new_user
  end

  def create_new_openshift_user
    ItAdmin.new.create_simple_user
  end

  def create_new_customer_portal_user
    ItAdmin.new.create_full_user
  end

  def create_new_with_missing_phone_user
    KeyCloakAdmin.new.user_with_missing_phone_number
  end

  def github_account_credentials
    {
        identity_provider: 'github',
        user_id: '20190656',
        user_name: 'rhdsociallogin',
        git_password: 'P@$$word01'
    }
  end

  def generate_customer_credentials(country = nil)
    if country.nil?
      c = ['Czech Republic', 'United Kingdom'].sample
    else
      c = country
    end
    case c
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
    @details = {
        email: "redhat-developers-testers+sid_#{$session_id}_#{Faker::Lorem.characters(5)}@redhat.com",
        greeting: %w(Mr. Mrs. Ms. Miss Dr. Hr Sr.).sample,
        first_name: Faker::Name.first_name,
        last_name: Faker::Name.last_name,
        password: Faker::Internet.password,
        company_name: Faker::Company.name,
        address_line_one: Faker::Address.street_address,
        city: city,
        state: state,
        postal_code: Faker::Address.postcode,
        country: c,
        phone_number: '0191 1111111'
    }
  end

end
