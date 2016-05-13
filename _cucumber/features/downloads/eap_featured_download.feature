@ignore
@downloads
@product_download
Feature: Product Download Page - An authorised customer can download EAP via download manager when acepting Red Hat T&C's.

  As a develpers.redhat.com site visitor,
  I want to be able to register and download the Red Hat products.

  @site_user @logout
  Scenario: Newly registered site visitor navigates to product Download page and clicks on download, accepts Redhat T&C's should initiate download.
    Given I register a new account
    And I am on the Product Download page for eap
    When I click to download the featured download of "Enterprise Application Server"
    And I accept the terms and conditions
    Then I should see the eap get started page with a confirmation message "Thank you for downloading Enterprise Application Server"

  @site_user @logout
  Scenario: Newly registered site visitor navigates to product Download page and clicks on download, but but does NOT accept Redhat T&C's should not initiate download.
    Given I register a new account
    And I am on the Product Download page for eap
    When I click to download the featured download of "Enterprise Application Server"
    But I don't accept the terms and conditions
    Then I should see the eap download overview page

  @accepted_terms @site_user @logout
  Scenario: Authorised 'simple site' visitor can download eap without needing to accept T&C's again.
    Given a registered visitor has logged in
    And I am on the Product Download page for eap
    When I click to download the featured download of "Enterprise Application Server"
    Then I should see the eap get started page with a confirmation message "Thank you for downloading Enterprise Application Server"
