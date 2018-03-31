@kc
# blocked by DEVELOPER-4770
Feature: Basic personal registration

  As a visitor on the developers.redhat.com website,
  I want to register,
  So that I can use its services.

  Scenario: A site visitor can log into the site by completing registration process.
    Given I am on the Registration page
    When I complete the registration form
    And I verify my email address
    Then I should be registered and logged in

  Scenario: Duplicate email validation - Check it is not possible to create new account with an email already registered on RHD.
    Given I am on the Registration page
    When I try to register with an existing RHD registered email
    Then I should see an email field error with "User account for this email already exists. Log In"

  Scenario: Duplicate email validation - Check it is not possible to create new account with an email already registered on OpenShift.com.
    Given I am on the Registration page
    When I try to register with an existing OpenShift registered email
    Then I should see an email field error with "User account for this email already exists. Log In"

  Scenario: A site visitor can log into the site by completing registration process.
    Given I am on the Registration page
    When I complete the registration form
    Then I should be taken to a page informing me that I need to verify my email in order to continue

