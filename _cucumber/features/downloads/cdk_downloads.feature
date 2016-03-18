@ignore

Feature: Red Hat Container Development Kit (CDK) download

  In order to build container-based applications,
  As a registered develpers.redhat.com site visitor,
  I want to be able to download the redhat CDK.

  @site_user
  @logout
  @javascript
  Scenario: Newly registered site visitor navigates to CDK Download page and clicks on download, upgrades account, and accepts Redhat T&C's should initiate CDK download.
    Given I register a new account
    When I am on the Product Download page for cdk
    And I click to download the featured download of "Red Hat Container Development Kit (CDK)"
    When I upgrade my account and accept the terms and conditions
    Then I should see the cdk get started page with a confirmation message "Thank you for downloading Red Hat Container Development Kit (CDK)"
    And the download should initiate

  @site_user
  @logout
  @javascript
  Scenario: Newly registered site visitor navigates to CDK Download page and clicks on download, upgrades account, but does NOT accept Redhat T&C's should not initiate CDK download.
    Given I register a new account
    When I am on the Product Download page for cdk
    When I click to download the featured download of "Red Hat Container Development Kit (CDK)"
    And I upgrade my account and don't accept the terms and conditions
    Then I should see the cdk download overview page
    And the download should not initiate

  @site_user
  @logout
  @javascript
  Scenario: Unauthorised site visitor who has navigated directly to CDK Download overview page clicks on download, registers, upgrades account, and accepts Redhat T&C's should initiate CDK download.
    Given I am on the Product Download page for cdk
    When I click to download the featured download of "Red Hat Container Development Kit (CDK)"
    Then I should be redirected to the RHD Log in page
    When I click on the Create account link
    And I complete the registration form
    And I upgrade my account and accept the terms and conditions
    Then I should see the cdk get started page with a confirmation message "Thank you for downloading Red Hat Container Development Kit (CDK)"
    And the download should initiate

  @site_user
  @logout
  @javascript
  Scenario: Unauthorised site visitor who has navigated directly to CDK Download overview page clicks on download, registers, upgrades account, but does NOT accept Redhat T&C's should not initiate CDK download.
    Given I am on the Product Download page for cdk
    When I click to download the featured download of "Red Hat Container Development Kit (CDK)"
    Then I should be redirected to the RHD Log in page
    When I click on the Create account link
    And I complete the registration form
    And I upgrade my account but don't accept the terms and conditions
    Then I should see the cdk download overview page
    And the download should not initiate

  @site_user
  @logout
  @javascript
  Scenario: Authorised 'full site user' who has previously accepted Redhat T&C's can download redhat CDK.
    Given a registered visitor has logged in
    And I am on the Product Download page for cdk
    When I click to download the featured download of "Red Hat Container Development Kit (CDK)"
    Then the download should initiate

  @site_user
  @logout
  @javascript
  Scenario: Authorised 'simple site user' who has previously downloaded EAP, should be prompted to accept Redhat T&C's before proceeding to the cdk download.
    Given an authorized customer has previously downloaded eap
    And I am on the Product Download page for cdk
    When I click to download the featured download of "Red Hat Container Development Kit (CDK)"
    And I upgrade my account and accept the terms and conditions
    Then I should see the cdk get started page with a confirmation message "Thank you for downloading Red Hat Container Development Kit (CDK)"
    And the download should initiate
