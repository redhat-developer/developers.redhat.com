@ignore

Feature: Red Hat Container Development Kit (CDK) download

  In order to build container-based applications,
  As a registered develpers.redhat.com site visitor,
  I want to be able to download the redhat CDK.

  @customer @logout @javascript
  Scenario: Newly registered RHD navigates to CDK Download page and clicks on download, upgrades account, who accepts Redhat T&C's should initiate CDK download.
    Given I register a new account
    When I am on the Download Overview page for cdk
    And I click to download the featured download of "Red Hat Container Development Kit (CDK)"
    When I upgrade my account and accept the terms and conditions
    Then I should see the cdk get started page with a confirmation message Thank you for downloading Red Hat Container Development Kit (CDK)
    And the download should initiate

  @customer @logout @javascript
  Scenario: Newly registered RHD navigates to CDK Download page and clicks on download, upgrades account, but does NOT accept Redhat T&C's should not initiate CDK download.
    Given I register a new account
    And I am on the Download Overview page for cdk
    When I click to download the featured download of "Red Hat Container Development Kit (CDK)"
    And I upgrade my account and don't accept the terms and conditions
    Then I should see the cdk download overview page
    And the download should not initiate

  @customer @logout @javascript
  Scenario: Unauthorised customer who has navigated directly to CDK Download overview page clicks on download, registers, upgrades account, and accepts Redhat T&C's should initiate CDK download.
    Given I am on the Download Overview page for cdk
    When I click to download the featured download of "Red Hat Container Development Kit (CDK)"
    Then I should be redirected to the Developers.redhat Login Page
    When I click on the Create account link
    And I complete the registration form
    And I navigate to the verify account URL
    And I upgrade my account and accept the terms and conditions
    Then I should see the cdk get started page with a confirmation message Thank you for downloading Red Hat Container Development Kit (CDK)
    And the download should initiate

  @customer @logout @javascript
  Scenario: Unauthorised customer who has navigated directly to CDK Download overview page clicks on download, registers, upgrades account, but does NOT accept Redhat T&C's should not initiate CDK download.
    Given I am on the Download Overview page for cdk
    When I click to download the featured download of "Red Hat Container Development Kit (CDK)"
    Then I should be redirected to the Developers.redhat Login Page
    When I click on the Create account link
    And I complete the registration form
    And I navigate to the verify account URL
    And I upgrade my account but don't accept the terms and conditions
    Then I should see the cdk download overview page
    And the download should not initiate

  @customer @logout @javascript
  Scenario: Authorised customer can register who has previosly accepted Redhat T&C's can download redhat CDK.
    Given a registered customer has logged in
    And I am on the Download Overview page for cdk
    When I click to download the featured download of "Red Hat Container Development Kit (CDK)"
    Then the download should initiate
