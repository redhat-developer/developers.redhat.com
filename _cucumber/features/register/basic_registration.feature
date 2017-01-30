Feature: Basic personal registration

  As a visitor on the developers.redhat.com website,
  I want to register,
  So that I can use its services.

  @logout @kc
  Scenario Outline: United States, Canada and Mexico customer must be prompted to enter state and city.
    Given I am on the Registration page
    When I complete the registration form, selecting my country as "<country>"
    Then I should be registered and logged in
    When I am on the Edit Details page
    And the following newly registered details should be added to my profile:
      | Username                                    |
      | Email                                       |
      | First Name                                  |
      | Last name                                   |
      | Company                                     |
      | Red Hat Developer Program subscription date |
      | Privacy & Subscriptions status              |

    Examples: countries whom are required to enter city and state
      | country       |
      | United States |
      | Canada        |
      | Mexico        |

  @kc
  Scenario Outline: United States, Canada and Mexico customer must be prompted to enter state - validation message
    Given I am on the Registration page
    When I complete the registration with my country as "<country>" with an empty "state field"
    Then I should see a "state field" error with "State/Province is required"

    Examples: countries whom are required to enter city and state
      | country       |
      | United States |
      | Canada        |
      | Mexico        |

  @kc
  Scenario Outline: United States, Canada and Mexico customer must be prompted to enter city - validation message
    Given I am on the Registration page
    When I complete the registration with my country as "<country>" with an empty "city field"
    Then I should see a "city field" error with "City is required"

    Examples: countries whom are required to enter city and state
      | country       |
      | United States |
      | Canada        |
      | Mexico        |

  @kc
  Scenario: Customer from Ukraine must be prompted to enter city - validation message
    Given I am on the Registration page
    When I complete the registration with my country as "Ukraine" with an empty "city field"
    Then I should see a "city field" error with "City is required"

  @logout @kc
  Scenario: Customers from Ukraine must be prompted to enter city when registering.
    Given I am on the Registration page
    When I complete the registration form, selecting my country as "Ukraine"
    Then I should be registered and logged in
    When I am on the Edit Details page
    And the following newly registered details should be added to my profile:
      | Username                                    |
      | Email                                       |
      | First Name                                  |
      | Last name                                   |
      | Company                                     |
      | Red Hat Developer Program subscription date |
      | Privacy & Subscriptions status              |

  @logout
  Scenario: User can register by navigating directly to the /register page
    Given I navigate to the "/register" page
    When I complete the registration form
    Then I should be registered and logged in
    When I am on the Edit Details page
    And the following newly registered details should be added to my profile:
      | Username                                    |
      | Email                                       |
      | First Name                                  |
      | Last name                                   |
      | Company                                     |
      | Red Hat Developer Program subscription date |
      | Privacy & Subscriptions status              |

  @logout @kc
  Scenario: Site visitor completes the registration form accepting terms by clicking "accept all terms and conditions"
    Given I am on the Registration page
    When I complete the registration form
    Then I should be registered and logged in
    When I am on the Edit Details page
    And the following newly registered details should be added to my profile:
      | Username                                    |
      | Email                                       |
      | First Name                                  |
      | Last name                                   |
      | Company                                     |
      | Red Hat Developer Program subscription date |
      | Privacy & Subscriptions status              |

  # deprecated
  @logout @ignore @kc
  Scenario: Back Button test after registration should not raise error
    Given I am on the Registration page
    When I complete the registration form
    Then I should be registered and logged in
    When I go back
    Then I should see the Registration page

  @kc
  Scenario: Password validation
    Given I am on the Registration page
    When I try to enter passwords that do not match
    Then I should see a "password confirm field" error with "Passwords don't match"

  @kc
  Scenario: Email format validation - Check it is not possible to register with email address not matching format
    Given I am on the Registration page
    When I try to register with an invalid email address
    Then I should see a "email field" error with "Please enter a valid email address."

  @kc
  Scenario: Duplicate email validation - Check it is not possible to create new account with an email already registered on RHD.
    Given I am on the Registration page
    When I try to register with an existing RHD registered email
    Then I should see a "email field" error with "User account for this email already exists. Log In"

  @kc
  Scenario: Duplicate email validation - Check it is not possible to create new account with an email already registered on OpenShift.com.
    Given I am on the Registration page
    When I try to register with an existing OpenShift registered email
    Then I should see a "email field" error with "User account for this email already exists. Log In"

  @kc
  Scenario Outline: Basic registration field level validation
    Given I am on the Registration page
    When I complete the registration with an empty "<field>"
    Then I should see a "<field>" error with "<error>"

    Examples: Registration form fields
      | field                  | error                    |
      | email field            | Email is required        |
      | password field         | Password is required     |
      | password confirm field | Type in password again   |
      | first name field       | First name is required   |
      | last name field        | Last name is required    |
      | company field          | Company name is required |
      | country field          | Country is required      |

  @kc
  Scenario: Terms should link to relevant terms and conditions page
    Given I am on the Registration page
    Then each term should link to relevant terms and conditions page:
      | term                           | url                                  |
      | Red Hat Developer Program      | terms-and-conditions                 |
      | Red Hat Subscription Agreement | http://www.redhat.com/licenses/      |
      | Red Hat Portals Terms of Use   | https://access.redhat.com/help/terms |
