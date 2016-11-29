@desktop
@dm

Feature: Download page - EAP featured download.

  @logout @clear_download
  Scenario: 1. Newly registered site visitor navigates to the Download page and clicks on download latest product, upgrades account, and accepts Redhat T&C's should initiate the product download.
    Given I register a new account
    And I am on the Downloads page
    When I click to download "Enterprise Application Platform"
    Then I should be asked to fill in mandatory information with a message "We need you to provide some additional information in order to continue."
    And I complete the additional action required page and proceed
    Then I should see the cdk get started page with a confirmation message "Thank you for downloading Enterprise Application Platform"
    And the download should initiate

  @logout @clear_download
  Scenario: 2. Site visitor navigates to the Download page and clicks on download latest product, and registers a new account, the download should initiate.
    Given I am on the Downloads page
    And I click to download "Enterprise Application Platform"
    When I register a new account in oder to download
    Then I should see the cdk get started page with a confirmation message "Thank you for downloading Enterprise Application Platform"
    And the download should initiate

  @logout @clear_download
  Scenario: 3. Unauthorized site visitor with phone number on record is asked to login in order to download
    Given I am a RHD registered site visitor with a phone number
    And I am on the Downloads page
    And I click to download "Enterprise Application Platform"
    And I log in with a valid username
    Then I should see the cdk get started page with a confirmation message "Thank you for downloading Enterprise Application Platform"
    And the download should initiate

  @logout @clear_download
  Scenario: 4. Unauthorized site visitor without phone number on record is asked to login in, add their phone number in order to download
    Given I am a RHD registered site visitor without a phone number
    And I am on the Downloads page
    And I click to download "Enterprise Application Platform"
    And I log in with a valid username
    Then I should be asked to fill in mandatory information with a message "We need you to provide some additional information in order to continue."
    And I complete the additional action required page and proceed
    Then I should see the cdk get started page with a confirmation message "Thank you for downloading Enterprise Application Platform"
    And the download should initiate

  @logout @clear_download
  Scenario: 5. Logged in user who accepted RHD T&C already tries to download - is not asked to login nor accept T&C, download starts immediatelly
    Given I am a RHD registered site visitor
    And I have previously logged in
    And I am on the Downloads page
    When I click to download "Enterprise Application Platform"
    Then I should see the cdk get started page with a confirmation message "Thank you for downloading Enterprise Application Platform"
    And the download should initiate

  @slow @delete_user @github_teardown @logout @clear_download
  Scenario: 6. User starts download and registers using Social login providers which provides all mandatory information (first name, last name, email, email is unique in RHD so new account is created directly). User is asked to fill in company and country together with RHD T&C acceptance, then download starts
    Given I am on the Downloads page
    When I click to download "Enterprise Application Platform"
    When I choose to register a new account using my GitHub account
    And I complete the additional action required page and proceed
    Then I should see the cdk get started page with a confirmation message "Thank you for downloading Enterprise Application Platform"

  @slow @logout @delete_user @github_teardown @clear_download
  Scenario: 7. User starts download and registers using Social login providers which doesn't provide some mandatory informations (first name, last name, email). User is asked to fill in all user profile mandatory informations (email, fistt name, last name, company and country) together with RHD T&C acceptance, then download starts
    Given I am on the Downloads page
    When I click to download "Enterprise Application Platform"
    And I choose to register a new account using a GitHub account that contains missing profile information
    And I complete the additional action required page and proceed
    Then I should see the cdk get started page with a confirmation message "Thank you for downloading Enterprise Application Platform"
    And the download should initiate

  @logout @clear_download
  Scenario: 8. User starts download and login with active OpenShift.com account (simple user account) which is not in RHD yet. User is asked to fill in first name, last name, company and country, to accept RHD T&C, then download starts
    Given I am on the Downloads page
    When I click to download "Enterprise Application Platform"
    And I log in with an active OpenShift account
    And I complete the additional action required page and proceed
    Then I should see the cdk get started page with a confirmation message "Thank you for downloading Enterprise Application Platform"
    And the download should initiate

  @logout @clear_download
  Scenario: 9. User starts download and login with active Red Hat Customer Portal account (full user account)
    Given I am on the Downloads page
    When I click to download "Enterprise Application Platform"
    And I log in with a active Customer portal account
    And I complete the additional action required page and proceed
    Then I should see the cdk get started page with a confirmation message "Thank you for downloading Enterprise Application Platform"
    And the download should initiate
