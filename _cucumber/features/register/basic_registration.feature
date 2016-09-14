Feature: Basic personal registration

  As a visitor on the developers.redhat.com website,
  I want to register,
  So that I can use its services.

  @logout
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
      | Country                                     |
      | Red Hat Developer Program subscription date |
      | Privacy & Subscriptions status              |

  @logout
  Scenario: Back Button test after registration should not raise error
    Given I am on the Registration page
    When I complete the registration form
    Then I should be registered and logged in
    When I go back
    Then I should see the Registration page

  Scenario: Password validation
    Given I am on the Registration page
    When I try to enter passwords that do not match
    Then I should see a "password confirm field" error with "Passwords don't match"

  Scenario: Email format validation - Check it is not possible to register with email address not matching format
    Given I am on the Registration page
    When I try to register with an invalid email address
    Then I should see a "email field" error with "Please enter a valid email address."

  Scenario: Duplicate email validation - Check it is not possible to create new account with an email already registered on RHD.
    Given I am on the Registration page
    When I try to register with an existing RHD registered email
    Then I should see a "email field" error with "User account for this email already exists. Log In"

  Scenario: Duplicate email validation - Check it is not possible to create new account with an email already registered on OpenShift.com.
    Given I am on the Registration page
    When I try to register with an existing OpenShift registered email
    Then I should see a "email field" error with "User account for this email already exists. Log In"

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

  Scenario: Terms should link to relevant terms and conditions page
    Given I am on the Registration page
    Then each term should link to relevant terms and conditions page:
      | term                           | url                                  |
      | Red Hat Developer Program      | terms-and-conditions                 |
      | Red Hat Subscription Agreement | http://www.redhat.com/licenses/      |
      | Red Hat Portals Terms of Use   | https://access.redhat.com/help/terms |
