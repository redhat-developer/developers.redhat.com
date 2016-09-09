Feature: Red Hat JBoss Enterprise Application Platform download

  In order to build container-based applications,
  As a registered develpers.redhat.com site visitor,
  I want to be able to download the redhat Red Hat JBoss Enterprise Application Platform.

  @logout
  Scenario: Newly registered site visitor navigates to the Download page and clicks on download latest EAP, accepts Redhat T&C's should initiate EAP download.
    Given I register a new account
    And I am on the Downloads page
    And I click to download "Enterprise Application Server"
    Then I should see the eap get started page with a confirmation message "Thank you for downloading Enterprise Application Server"

  @basic_login @logout
  Scenario: Unauthorized custom must log in in order to Download CDK
    Given I am on the Downloads page
    When I click to download "Enterprise Application Server"
    And I log in with a valid username
    Then I should see the eap get started page with a confirmation message "Thank you for downloading Enterprise Application Server"
