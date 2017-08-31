Feature: Basic personal registration

  As a visitor on the developers.redhat.com website,
  I want to register,
  So that I can use its services.

  Scenario: Clicking on the Register link within the primary navigation bar should take a site-visitor to the RHD registration page.
    Given I am on the "Home" page
    When I click on the "Register" link within the primary nav bar
    Then the Register page is displayed

  Scenario: User can navigate directly to the register page via /register.
    Given I navigate directly to the "Register" page
    Then the Register page is displayed


  @kc @logout
  Scenario: A site visitor can log into the site by completing registration process.
    Given I am on the "Register" page
    When I complete the registration form
    And I verify my email address
    Then I should be logged in

  @kc
  Scenario: Duplicate email validation - Check it is not possible to create new account with an email already registered on RHD.
    Given I am on the "Register" page
    When I try to register with an existing RHD registered email
    Then I should see an email field error with "User account for this email already exists. Log In"

  @kc
  Scenario: Duplicate email validation - Check it is not possible to create new account with an email already registered on OpenShift.com.
    Given I am on the "Register" page
    When I try to register with an existing OpenShift registered email
    Then I should see an email field error with "User account for this email already exists. Log In"
