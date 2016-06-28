Feature: Login Page

  As a developers.redhat customer,
  I want to log in the site,
  So that I can use its services.

  @mobile @smoke
  Scenario: A mobile site visitor has the options to log in and register via the mobile menu.
    Given I am on the Home page
    When I tap on Menu menu item
    Then I should see a primary nav bar with the following tabs:
      | Login    |
      | Register |

  @desktop @smoke
  Scenario: A desktop site visitor has the options to log in and register via primary navigation bar.
    Given I am on the Home page
    Then I should see a primary nav bar with the following tabs:
      | Login    |
      | Register |

  @has_username @logout
  Scenario: A customer whom has the correct login credentials can log in using their username
    Given I am on the Login page
    When I log in with a valid username
    Then I should be logged in

  @has_username @logout
  Scenario: A customer whom has the correct login credentials can log in using their email address
    Given I am on the Login page
    When I log in with a valid email address
    Then I should be logged in

  @accepted_terms
  Scenario: A customer has incorrect login credentials (the password is incorrect)
    Given I am on the Login page
    When I log in with an incorrect password
    Then the following error message should be displayed: Invalid login or password.

  @accepted_terms
  Scenario: A customer tries to login with an invalid email address (e.g. xxx@xx)
    Given I am on the Login page
    When I log in with an invalid email address
    Then the following error message should be displayed: Invalid login or password.

  @accepted_terms @logout
  Scenario: Successful logout
    Given I am on the Login page
    When I log in with a valid password
    Then I should be logged in
    And I click the Logout link
    Then I should be logged out

  @password_reset @teardown @nightly
  Scenario: A customer who has forgotten their login details can request a password reset
    Given I am on the Login page
    And I click the forgot password link
    When submit my email address
    Then I should see a confirmation message: "You will receive an email shortly with instructions on how to create a new password. TIP: Check your junk or spam folder if you are unable to find the email."
    And I should receive an email containing a password reset link

  @password_reset @logout @nightly
  Scenario: A customer can successfully reset their password
    Given I am on the Login page
    When I click the forgot password link
    And submit my email address
    When I navigate to the password reset URL
    Then I should see a confirmation message: "You need to change your password to activate your account."
    When I update my password
    Then I should be logged in
