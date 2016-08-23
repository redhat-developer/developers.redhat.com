Feature: Red Hat Enterprise Linux download

  In order to build container-based applications,
  As a registered develpers.redhat.com site visitor,
  I want to be able to download Red Hat Enterprise Linux.

  @logout
  Scenario: Newly registered site visitor navigates to the Download page and clicks on download latest RHEL, upgrades account, and accepts Redhat T&C's should initiate the Red Hat Enterprise Linux download.
    Given I register a new account
    And I am logged in
    When I am on the Downloads page
    And I click to download "Red Hat Enterprise Linux"
    Then I should see the rhel get started page with a confirmation message "Thank you for downloading Red Hat Enterprise Linux"

  @basic_login @logout
  Scenario: Unauthorized custom must log in in order to Download RHEL.
    Given I am on the Downloads page
    When I click to download "Red Hat Enterprise Linux"
    And I log in with a valid username
    Then I should see the rhel get started page with a confirmation message "Thank you for downloading Red Hat Enterprise Linux"
