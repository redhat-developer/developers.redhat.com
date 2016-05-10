@ignore

Feature: Red Hat Enterprise Linux download

  In order to build container-based applications,
  As a registered develpers.redhat.com site visitor,
  I want to be able to download Red Hat Enterprise Linux.

  @site_user @logout
  Scenario: Newly registered site visitor navigates to the Download page and clicks on download latest RHEL, upgrades account, and accepts Redhat T&C's should initiate the Red Hat Enterprise Linux download.
    Given I register a new account
    And I am on the Downloads page
    And I click to download "Red Hat Enterprise Linux"
    When I upgrade my account and accept the terms and conditions
    Then I should see the rhel get started page with a confirmation message "Thank you for downloading Red Hat Enterprise Linux"

  @site_user @logout
  Scenario: Newly registered site visitor navigates to the Download page and clicks on download latest RHEL, upgrades account, but does NOT accept Redhat T&C's should not initiate RHEL download and show warning about accepting T&C's.
    Given I register a new account
    And I am on the Downloads page
    And I click to download "Red Hat Enterprise Linux"
    When I upgrade my account and don't accept the terms and conditions
    Then I should see an alert box with the following warning "You must agree to Red Hat Developer Program Terms and Conditions!"

  @site_user @logout
  Scenario: Newly registered site visitor navigates to the Download page and clicks on download latest RHEL, upgrades account, but then cancels the RHEL download.
    Given I register a new account
    And I am on the Downloads page
    And I click to download "Red Hat Enterprise Linux"
    When I click on the cancel download button
    Then I should see the rhel download overview page

  @site_user @logout
  Scenario: Unauthorised site visitor who has navigated the Download page clicks on download RHEL, registers, upgrades account, and accepts Redhat T&C's should initiate RHEL download.
    Given I am on the Downloads page
    When I click to download "Red Hat Enterprise Linux"
    Then I should be redirected to the RHD Log in page
    When I click on the Create account link
    Then I should see the extended registration page with a message "Thank you for your interest in this download"
    And I complete the extended registration form and accept the terms and conditions
    Then I should see the rhel get started page with a confirmation message "Thank you for downloading Red Hat Enterprise Linux"
