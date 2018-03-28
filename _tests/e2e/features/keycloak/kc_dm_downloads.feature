@desktop
@dm
Feature: Download page

  Scenario: Site visitor navigates to the Download page and clicks on download latest product, and selects to register new account should display extended registration form.
    Given I am on the Downloads page
    And I click to download "Red Hat Enterprise Linux"
    Then the Login page is displayed
    When I click to register a new account
    Then I should see the registration form with terms and conditions

  # Internal Server Error -> https://developers.stage.redhat.com/download-manager/file/devsuite-2.2.0-GA-bundle-installer-mac.zip
  @stage @dev_suite
  Scenario: Authenticated site user can download OS specific version of Red Hat Development Suite
    Given I am a RHD registered site visitor
    And I have logged into my account
    When I am on the Downloads page
    When I click to download "Red Hat Development Suite"
    And I confirm my details, and proceed
    Then I should see the "devsuite" Hello-World overview page with Thank you for downloading "Red Hat Development Suite"
    And a single download should initiate

  @stage
  Scenario: Authenticated site user can download RHD protected downloads
    Given I am a RHD registered site visitor
    And I have logged into my account
    When I am on the Downloads page
    When I click to download "Red Hat Enterprise Linux"
    And I confirm my details, and proceed
    Then I should see the "rhel" Hello-World overview page with Thank you for downloading "Red Hat Enterprise Linux"
    And a single download should initiate

  Scenario: Unauthenticated site visitor must login in order to download RHD protected downloads
    Given I am a RHD registered site visitor
    And I am on the Downloads page
    When I click to download "Red Hat Enterprise Linux"
    Then the Login page is displayed
    And I log in with my email address
    And I confirm my details, and proceed
    Then I should see the "rhel" Hello-World overview page with Thank you for downloading "Red Hat Enterprise Linux"
    And a single download should initiate

  # Randomly results in an internal Server Error ->  # https://developers.stage.redhat.com/download-manager/rest/keycloak
  @stage
  Scenario: User starts download and login with active OpenShift.com account (simple user account) which is not in RHD yet. User is asked to fill in first name, last name, company and country, to accept RHD T&C, then download starts
    Given I am an OpenShift registered site visitor
    And I am on the Downloads page
    When I click to download "Red Hat Enterprise Linux"
    And I log in with my email address
    And I complete the additional action required page, accept terms and proceed
    Then I should see the "rhel" Hello-World overview page with Thank you for downloading "Red Hat Enterprise Linux"
    And a single download should initiate

  # Randomly results in an internal Server Error ->  # https://developers.stage.redhat.com/download-manager/rest/keycloak
  @stage
  Scenario: User starts download and login with active Red Hat Customer Portal account (full user account) should provide additional information
    Given I have an active Customer portal account
    And I am on the Downloads page
    When I click to download "Red Hat Enterprise Linux"
    And I log in with my email address
    And I complete the additional action required page, accept terms and proceed
    Then I should see the "rhel" Hello-World overview page with Thank you for downloading "Red Hat Enterprise Linux"
    And a single download should initiate

  # Email verification link is not always received
  @stage @dm_reg
  Scenario: Site visitor registers new account in order to download based on Red Hat Terms and Conditions Model: RHD supportable user profile
    Given I am on the Downloads page
    And I click to download "Red Hat Enterprise Linux"
    When I register a new account with "RHD supportable user profile"
    And I verify my email address
    Then I should see the "rhel" Hello-World overview page with Thank you for downloading "Red Hat Enterprise Linux"
    And a single download should initiate

  # Email verification link is not always received
  @stage @dm_reg
  Scenario: Site visitor registers new account in order to download based on Red Hat Terms and Conditions Model: JBoss/Red Hat Developer Subscription
    Given I am on the Downloads page
    And I click to download "Red Hat JBoss Fuse"
    When I register a new account with "JBoss/Red Hat Developer Subscription"
    And I verify my email address
    Then I should see the "rhel" Hello-World overview page with Thank you for downloading "Red Hat JBoss Fuse"
    And a single download should initiate

  # Email verification link is not always received
  @stage @dm_reg
  Scenario: Site visitor registers new account in order to download based on Red Hat Terms and Conditions Model: RHD full user profile
    Given I am on the Downloads page
    And I click to download "Red Hat JBoss Developer Studio"
    When I register a new account with "RHD full user profile"
    And I verify my email address
    Then I should see the "rhel" Hello-World overview page with Thank you for downloading "Red Hat JBoss Developer Studio"
    And a single download should initiate
