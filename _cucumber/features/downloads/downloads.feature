Feature: Download Page - An authorised customer downloads from available download manager resources.

  As a develpers.redhat.com site visitor,
  I want to be able to register and download the Red Hat products.

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

  @customer
  @logout
  Scenario Outline: Newly registered RHD navigates to product Download page and clicks on download, enters their Company and Country but but does NOT accept Redhat T&C's should not initiate download.
    Given I register a new account
    And I am on the Download Overview page for <product_id>
    When I click to download the latest version of "<name>"
    And I submit my company name and country
    But I don't accept the terms and conditions
    Then I should see the <product_id> download overview page
    And the <product_id> download should not initiate

  Examples: Infrastructure Management content/products
    | product_id | name                                  |
    | devstudio  | JBoss Developer Studio                |
    | eap        | Enterprise Application Server         |
    | datagrid   | JBoss Data Grid                       |
    | fuse       | JBoss Fuse                            |
    | bpmsuite   | JBoss BPM Suite                       |
    | brms       | JBoss Business Rule Management System |
    | datavirt   | Data Virtualization                   |


  @customer
  @logout
  Scenario Outline: Unauthorised customer who has navigated directly to Download overview page clicks on download, registers, enters their Company and Country and accepts Redhat T&C's should initiate download.
    Given I am on the Download Overview page for <product_id>
    When I click to download the latest version of "<name>"
    Then I should be redirected to the Developers.redhat Login Page
    When I click on the Create account link
    And I complete the registration form
    And I navigate to the verify account URL
    And I submit my company name and country
    But I accept the terms and conditions
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

  @customer
  @logout
  Scenario Outline: Unauthorised customer who has navigated directly to Download overview page clicks on download, registers, enters their Company and Country but does NOT accept Redhat T&C's should not initiate download.
    Given I am on the Download Overview page for <product_id>
    When I click to download the latest version of "<name>"
    Then I should be redirected to the Developers.redhat Login Page
    When I click on the Create account link
    And I complete the registration form
    Then I navigate to the verify account URL
    And I submit my company name and country
    And I accept the terms and conditions
    Then I should see the <product_id> download overview page
    And the <product_id> download should not initiate

  Examples: Infrastructure Management content/products
    | product_id | name                                  |
    | devstudio  | JBoss Developer Studio                |
    | eap        | Enterprise Application Server         |
    | datagrid   | JBoss Data Grid                       |
    | fuse       | JBoss Fuse                            |
    | bpmsuite   | JBoss BPM Suite                       |
    | brms       | JBoss Business Rule Management System |
    | datavirt   | Data Virtualization                   |

  @accepted_terms
  @logout
  Scenario Outline: Authorised customer can register who has previosly accepted Redhat T&C's can download redhat CDK.
    Given a registered customer has logged in
    And I am on the Download Overview page for <product_id>
    When I click to download the latest version of "<name>"
    Then the <product_id> download should initiate

  Examples: Infrastructure Management content/products
    | product_id | name                                  |
    | devstudio  | JBoss Developer Studio                |
    | eap        | Enterprise Application Server         |
    | datagrid   | JBoss Data Grid                       |
    | fuse       | JBoss Fuse                            |
    | bpmsuite   | JBoss BPM Suite                       |
    | brms       | JBoss Business Rule Management System |
    | datavirt   | Data Virtualization                   |
