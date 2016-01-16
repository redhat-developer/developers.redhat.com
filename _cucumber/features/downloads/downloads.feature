Feature: Download Page - An authorised customer downloads from available download manager resources.

  As a develpers.redhat.com site visitor,
  I want to be able to register and download the Red Hat products.

  Scenario Outline: Unauthorized user attempts to download RedHat products via Download Manager
    Given I am on the Downloads page
    When I click 'Download Latest' for <product>
    Then I should be redirected to the Developers.redhat Login Page

  Examples: Infrastructure Management content/products
    | product   |
    | devstudio |
    | eap       |
    | datagrid  |
    | fuse      |
    | bpmsuite  |
    | brms      |
    | datavirt  |

  @customer
  @logout
  Scenario Outline: : Newly registered RHD navigates to Download tab and clicks on 'Download latest'
    Given I register a new account
    And I am on the Download Overview page for <product_id>
    When I click to download the latest version of "<name>"
    Then I submit my company name and country
    And I accept the terms and conditions
    Then I should see the <product_id> get started page with a confirmation message Thank you for downloading <name>
    And the <product_id> download should initiate

  Examples: Infrastructure Management content/products
    | product_id | name                                  |
    | devstudio  | JBoss Developer Studio                |
    | eap        | Enterprise Application Server         |
    | datagrid   | JBoss Data Grid                       |
    | fuse       | JBoss Fuse                            |
    | bpmsuite   | JBoss BPM Suite                       |
    | brms       | JBoss Business Rule Management System |
    | datavirt   | Data Virtualization                   |

#  @customer
#  @logout
#  Scenario: Newly registered RHD navigates to CDK Download page and clicks on download, upgrades account, but does NOT accept Redhat T&C's should not initiate CDK download.
#    Given I register a new account
#    And I am on the Download Overview page for cdk
#    When I click to download the latest version of "Red Hat Container Development Kit (CDK) 2"
#    And I upgrade my account and don't accept the terms and conditions
#    Then I should see the cdk download overview page
#    And the cdk download should not initiate
#
#  @customer
#  @logout
#  Scenario: Unauthorised customer who has navigated directly to CDK Download overview page clicks on download, registers, upgrades account, and accepts Redhat T&C's should initiate CDK download.
#    Given I am on the Download Overview page for cdk
#    When I click to download the latest version of "Red Hat Container Development Kit (CDK) 2"
#    Then I should be redirected to the Developers.redhat Login Page
#    When I click on the Create account link
#    And I complete the registration form
#    And I navigate to the verify account URL
#    And I upgrade my account and accept the terms and conditions
#    Then I should see the cdk get started page with a confirmation message Thank you for downloading Red Hat Container Development Kit (CDK)
#    And the cdk download should initiate
#
#  @customer
#  @logout
#  Scenario: Unauthorised customer who has navigated directly to CDK Download overview page clicks on download, registers, upgrades account, but does NOT accept Redhat T&C's should not initiate CDK download.
#    Given I am on the Download Overview page for cdk
#    When I click to download the latest version of "Red Hat Container Development Kit (CDK) 2"
#    Then I should be redirected to the Developers.redhat Login Page
#    When I click on the Create account link
#    And I complete the registration form
#    And I navigate to the verify account URL
#    And I upgrade my account but don't accept the terms and conditions
#    Then I should see the cdk download overview page
#    And the cdk download should not initiate
#
#  @accepted_terms
#  @logout
#  Scenario: Authorised customer can register who has previosly accepted Redhat T&C's can download redhat CDK.
#    Given a registered customer has logged in
#    And I am on the Download Overview page for cdk
#    When I click to download the latest version of "Red Hat Container Development Kit (CDK) 2"
#    Then the cdk download should initiate
#
#  @customer
#  @logout
#  Scenario: Unauthorised customer who has navigated directly to EA Download overview page clicks on download, registers, upgrades account, but does NOT accept Redhat T&C's should not initiate CDK download.
#    Given I am on the Download Overview page for eap
#    When I click to download the latest version of "Download JBoss EAP 6.4.0.GA"
#    Then I should be redirected to the Developers.redhat Login Page
#    When I click on the Create account link
#    And I complete the registration form
#    And I navigate to the verify account URL
#    Then I submit my company name and country
#    And I accept the terms and conditions
#    Then I should see the eap get started page with a confirmation message Thank you for downloading Enterprise Application Server
#    And the eap download should initiate
