@ignore

Feature: Login Page

  As a developers.redhat customer,
  I want to log in the site,
  So that I can use its services.

  @accepted_terms @logout
  Scenario: A customer has correct login credentials
    Given I am on the Login page
    When I log in with a valid password
    Then I should be logged in

  @accepted_terms
  Scenario: A customer has incorrect login credentials (the password is incorrect)
    Given I am on the Login page
    When I log in with an incorrect password
    Then the following error message should be displayed: Invalid login or password.

  @accepted_terms
  Scenario: A customer tries to login with an invalid email address (e.g. xxx@xx)
    Given I am on the Login page
    When I log in with an invalid email
    Then the following error message should be displayed: Invalid login or password.

  @accepted_terms @logout
  Scenario: Successful logout
    Given I am on the Login page
    When I log in with a valid password
    Then I should be logged in
    And I click the Logout link
    Then I should be logged out

  @password_reset @teardown @ignore
  Scenario: A customer who has forgotten their login details can request a password reset
    Given I am on the Login page
    And I click the forgot password link
    When submit my email address
    Then I should see a confirmation message: "You will receive an email shortly with instructions on how to create a new password. TIP: Check your junk or spam folder if you are unable to find the email."
    And I should receive an email containing a password reset link

  @password_reset @logout @ignore
  Scenario: A customer can successfully reset their password
    Given I am on the Login page
    When I click the forgot password link
    And submit my email address
    When I navigate to the password reset URL
    Then I should see a confirmation message: "You need to change your password to activate your account."
    When I update my password
    Then I should be logged in
