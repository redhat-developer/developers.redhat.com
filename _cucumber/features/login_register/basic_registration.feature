Feature: Basic personal registration

  As a visitor on the developers.redhat.com website,
  I want to register,
  So that I can use its services.

  @site_user @logout
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

  @accepted_terms @site_user @logout
  Scenario: Back Button test after registration should not raise error
    Given I am on the Registration page
    When I complete the registration form
    Then I should be registered and logged in
    When I go back
    Then I should see the Registration page

  @site_user @smoke
  Scenario: Password validation
    Given I am on the Registration page
    When I try to enter passwords that do not match
    Then I should see a "password confirm" error with "Passwords don't match"

  @site_user @smoke
  Scenario: Email format validation - Check it is not possible to register with email address not matching format
    Given I am on the Registration page
    When I try to register with an invalid email address
    Then I should see a "email" error with "Please enter a valid email address."

  @site_user @smoke
  Scenario: Duplicate email validation - Check it is not possible to create new account with an email already registered on RHD.
    Given I am on the Registration page
    When I try to register with an existing RHD registered email
    Then I should see a "email" error with "Email already exists. Log In"

  @site_user
  Scenario: Duplicate email validation - Check it is not possible to create new account with an email already registered on OpenShift.com.
    Given I am on the Registration page
    When I try to register with an existing OpenShift registered email
    Then I should see a "email" error with "Email already exists. Log In"

  @site_user @smoke
  Scenario Outline: Basic registration field level validation
    Given I am on the Registration page
    When I complete the registration with an empty "<field>"
    Then I should see a "<field>" error with "<error>"

    Examples: Registration form fields
      | field            | error                    |
      | email            | Email is required        |
      | password         | Password is required     |
      | password confirm | Type in password again   |
      | first name       | First name is required   |
      | last name        | Last name is required    |
      | company          | Company name is required |
      | country          | Country is required      |

  Scenario: Customer completes registration form accepting terms by clicking accept for each term and condition.
    Given I am on the Registration page
    Then I should see the following terms and conditions checkboxes:
      | I have read and agree to the Red Hat Developer Program Terms & Conditions and agree to use the Red Hat Subscriptions(s) for development purposes only. |
      | I have read and agree to the Red Hat Subscription Agreement.                                                                                           |
      | I have read and agree to the Red Hat Portals Terms of Use and Export Control Agreement.                                                                |

  Scenario: Terms should link to relevant terms and conditions page
    Given I am on the Registration page
    Then each term should link to relevant terms and conditions page:
      | term                           | url                                  |
      | Red Hat Developer Program      | terms-and-conditions                 |
      | Red Hat Subscription Agreement | http://www.redhat.com/licenses/      |
      | Red Hat Portals Terms of Use   | https://access.redhat.com/help/terms |
