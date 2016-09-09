@desktop
@downloads
@product_download
@download_test

Feature: Product Download Page - An authorised customer can download RHEL via download manager when acepting Red Hat T&C's.

  As a develpers.redhat.com site visitor,
  I want to be able to register and download the Red Hat products.

  @logout
  Scenario: Newly registered site visitor navigates to product Download page and clicks on download, accepts Redhat T&C's should initiate download.
    Given I register a new account
    And I am on the Product Download page for rhel
    When I click to download the featured download of "Red Hat Enterprise Linux"
    Then I should see the rhel get started page with a confirmation message "Thank you for downloading Red Hat Enterprise Linux"

  @basic_login @logout
  Scenario: Unauthorized custom must log in in order to Download RHEL
    Given I am on the Product Download page for rhel
    When I click to download the featured download of "Red Hat Enterprise Linux"
    And I log in with a valid username
    Then I should see the rhel get started page with a confirmation message "Thank you for downloading Red Hat Enterprise Linux"
