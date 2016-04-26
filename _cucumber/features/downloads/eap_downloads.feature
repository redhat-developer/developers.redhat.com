@ignore
Feature: Red Hat JBoss Enterprise Application Platform download

  In order to build container-based applications,
  As a registered develpers.redhat.com site visitor,
  I want to be able to download the redhat Red Hat JBoss Enterprise Application Platform.

  @site_user @javascript @logout
  Scenario: Newly registered site visitor navigates to the Download page and clicks on download latest EAP, accepts Redhat T&C's should initiate EAP download.
    Given I register a new account
    And I am on the Downloads page
    And I click to download "Enterprise Application Server"
    When I accept the terms and conditions
    Then I should see the eap get started page with a confirmation message "Thank you for downloading Enterprise Application Server"

  @site_user @javascript @logout
  Scenario: Newly registered site visitor navigates to the Download page and clicks on download latest EAP, but does NOT accept Redhat T&C's should not initiate EAP download.
    Given I register a new account
    And I am on the Downloads page
    When I click to download "Enterprise Application Server"
    But I don't accept the terms and conditions
    Then I should see the eap download overview page

  @site_user @javascript @logout
  Scenario: Unauthorised site visitor who has navigated to the Download page clicks on download latest EAP, registers, and accepts Redhat T&C's should initiate EAP download.
    Given I am on the Downloads page
    When I click to download "Enterprise Application Server"
    Then I should be redirected to the RHD Log in page
    And I click on the Create account link
    Then I should see the extended registration page with a message "Thank you for your interest in this download"
    When I complete the registration form and accept the terms and conditions
    Then I should see the eap get started page with a confirmation message "Thank you for downloading Enterprise Application Server"
