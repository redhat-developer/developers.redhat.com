@ignore

Feature: Red Hat Container Development Kit (CDK) download

  In order to build container-based applications,
  As a registered develpers.redhat.com site visitor,
  I want to be able to download the redhat CDK.

  @logout
  Scenario: Newly registered site visitor navigates to CDK Download page and clicks on download, should initiate CDK download.
    Given I register a new account
    And I am on the Downloads page
    And I click to download "Red Hat Container Development Kit"
    Then I should see the cdk get started page with a confirmation message "Thank you for downloading Red Hat Container Development Kit (CDK)"

  @basic_login @logout
  Scenario: Unauthorized custom must log in in order to Download CDK
    Given I am on the Downloads page
    When I click to download "Red Hat Container Development Kit"
    And I log in with a valid username
    Then I should see the cdk get started page with a confirmation message "Thank you for downloading Red Hat Container Development Kit (CDK)"
