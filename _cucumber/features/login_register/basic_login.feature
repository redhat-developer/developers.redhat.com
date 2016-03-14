Feature: Login Page

  As a developers.redhat customer,
  I want to log in the site,
  So that I can use its services.

  @accepted_terms
  @logout
  @javascript
  Scenario: A customer has correct login credentials
    Given I am on the Login page
    When I try to log in with a valid password
    Then the login attempt should be successful

  @accepted_terms
  @javascript
  Scenario: A customer has incorrect login credentials (the password is incorrect)
    Given I am on the Login page
    When I try to log in with an incorrect password
    Then the following error message should be displayed: Invalid login or password.

  @accepted_terms
  @javascript
  Scenario: A customer tries to login with an invalid email address (e.g. xxx@xx)
    Given I am on the Login page
    When I try to log in with an invalid email
    Then the following error message should be displayed: Invalid login or password.

  @accepted_terms
  @logout
  @javascript
  Scenario: Successful logout
    Given a registered visitor has logged in
    And they are on the Home page
    When they click the Logout link
    Then they should be logged out

  @password_reset
  @teardown
  @javascript
  Scenario: A customer who has forgotten their login details can request a password reset
    Given I am on the Login page
    When I request a password reset
    Then I should see a confirmation message: "You will receive an email shortly with instructions on how to create a new password. TIP: Check your junk or spam folder if you are unable to find the email."
    And I should receive an email containing a password reset link

  @password_reset
  @logout
  @javascript
  Scenario: A customer can successfully reset their password
    Given I am on the Login page
    And I request a password reset
    And I navigate to the password reset URL
    Then I should see a verification message: "You need to change your password to activate your account."
    When I update my password
    Then I should be logged in
