@ignore
Feature: Red Hat Container Development Kit (CDK) download

  In order to build container-based applications,
  As a registered develpers.redhat.com site visitor,
  I want to be able to download the redhat CDK.

  @site_user @javascript @logout
  Scenario: Newly registered site visitor navigates to CDK Download page and clicks on download, upgrades account, and accepts Redhat T&C's should initiate CDK download.
    Given I register a new account
    And I am on the Downloads page
    And I click to download "Red Hat Container Development Kit (CDK)"
    When I upgrade my account and accept the terms and conditions
    Then I should see the cdk get started page with a confirmation message "Thank you for downloading Red Hat Container Development Kit (CDK)"

  @site_user @javascript @logout
  Scenario: Newly registered site visitor navigates to CDK Download page and clicks on download, upgrades account, but does NOT accept Redhat T&C's should not initiate CDK download.
    Given I register a new account
    And I am on the Downloads page
    And I click to download "Red Hat Container Development Kit (CDK)"
    When I upgrade my account and don't accept the terms and conditions
    Then I should see an alert box with the following warning "You must agree to Red Hat Developer Program Terms and Conditions!"

  @site_user @javascript @logout
  Scenario: Newly registered site visitor navigates to CDK Download page and clicks on download, upgrades account, but then cancels the CDK download.
    Given I register a new account
    And I am on the Downloads page
    And I click to download "Red Hat Container Development Kit (CDK)"
    When I click on the cancel download button
    Then I should see the cdk download overview page

  @site_user @javascript @logout
  Scenario: Unauthorised site visitor who has navigated directly to CDK Download overview page clicks on download, registers, upgrades account, and accepts Redhat T&C's should initiate CDK download.
    Given I am on the Downloads page
    When I click to download "Red Hat Container Development Kit (CDK)"
    Then I should be redirected to the RHD Log in page
    When I click on the Create account link
    Then I should see the extended registration page with a message "Thank you for your interest in this download"
    And I complete the extended registration form and accept the terms and conditions
    Then I should see the cdk get started page with a confirmation message "Thank you for downloading Red Hat Container Development Kit (CDK)"
