@downloads
@product_download

Feature: Download Page - An authorised customer downloads from available download manager resources.

  As a develpers.redhat.com site visitor,
  I want to be able to register and download the Red Hat products.

  @customer @javascript @logout
  Scenario: Newly registered RHD navigates to Download tab and clicks on 'Download latest'
    Given I register a new account
    And I am on the Download Overview page for eap
    When I click to download the featured download of "Enterprise Application Server"
    Then I submit my company name and country
    And I accept the terms and conditions
    Then I should see the eap get started page with a confirmation message Thank you for downloading Enterprise Application Server
    And the eap download should initiate

  @customer @javascript @logout
  Scenario: Newly registered RHD navigates to product Download page and clicks on download, enters their Company and Country but but does NOT accept Redhat T&C's should not initiate download.
    Given I register a new account
    And I am on the Download Overview page for eap
    When I click to download the featured download of "Enterprise Application Server"
    And I submit my company name and country
    But I don't accept the terms and conditions
    Then I should see the eap download overview page
    And the eap download should not initiate

  @accepted_terms @javascript @logout
  Scenario: Authorised customer can register who has previosly accepted Redhat T&C's can download redhat CDK.
    Given a registered customer has logged in
    And I am on the Download Overview page for bpmsuite
    When I click to download the featured download of "JBoss BPM Suite"
    Then the bpmsuite download should initiate
