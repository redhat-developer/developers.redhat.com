@desktop
@downloads
@download_test
@product_download

Feature: Product Download Page - An authorised customer can download CDK via download manager when acepting Red Hat T&C's.

  As a develpers.redhat.com site visitor,
  I want to be able to register and download the Red Hat products.

  @logout
  Scenario: Newly registered site visitor navigates to product Download page and clicks on download, accepts Redhat T&C's should initiate download.
    Given I register a new account
    And I am on the Product Download page for cdk
    When I click to download the featured download of "Red Hat Container Development Kit"
    Then I should see the cdk get started page with a confirmation message "Thank you for downloading Red Hat Container Development Kit"

  @basic_login @logout
  Scenario: Unauthorized customer must log in in order to Download CDK
    Given I am on the Product Download page for cdk
    When I click to download the featured download of "Red Hat Container Development Kit"
    And I log in with a valid username
    Then I should see the cdk get started page with a confirmation message "Thank you for downloading Red Hat Container Development Kit"
