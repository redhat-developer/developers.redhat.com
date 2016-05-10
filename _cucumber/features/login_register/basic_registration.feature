Feature: Basic personal registration

  As a visitor on the developers.redhat.com website,
  I want to register,
  So that I can use its services.

  @site_user @logout
  Scenario: Customer verifies their account
    Given I am on the Registration page
    When I complete the registration form
    Then I should be registered and logged in

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

  @accepted_terms @site_user @smoke
  Scenario: Duplicate email validation - Check it is not possible to create new account with email already used for another account
    Given I am on the Registration page
    When I try to register with an existing RHD registered email
    Then I should see a "email" error with "Email already exists. Log In"

  @accepted_terms @site_user @logout
  Scenario: Back Button test after registration should not raise error
    Given I am on the Registration page
    When I complete the registration form
    Then I should be registered and logged in
    And I go back
    Then I should see the Registration page
