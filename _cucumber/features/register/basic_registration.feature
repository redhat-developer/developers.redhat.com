@kc
Feature: Basic personal registration

  As a visitor on the developers.redhat.com website,
  I want to register,
  So that I can use its services.

  @logout
  Scenario: A site visitor can log into the site by completing registration process.
    Given I am on the Registration page
    When I complete the registration form
    And I verify my email address
    Then I should be registered and logged in
    When I am on the Edit Details page
    And the following newly registered details should be added to my profile:
      | Username                                    |
      | Email                                       |
      | First Name                                  |
      | Last name                                   |

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
      | first name field       | First name is required   |
      | last name field        | Last name is required    |
      | country field          | Country is required      |