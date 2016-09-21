@desktop
@downloads
@download_test

Feature: Enterprise Application Platform download

  @logout
  Scenario: 1. Newly registered site visitor navigates to the Download page and clicks on download latest product, upgrades account, and accepts Redhat T&C's should initiate the product download.
    Given I register a new account
    And I am logged in
    When I am on the Downloads page
    And I click to download "Enterprise Application Platform"
    Then I should see the eap get started page with a confirmation message "Thank you for downloading Enterprise Application Platform"

  @basic_login @logout
  Scenario: 2. Logged out user who accepted RHD T&C already tries to download - is asked to login then download starts
    Given I am on the Downloads page
    And I click to download "Enterprise Application Platform"
    And I log in with a valid username
    Then I should see the eap get started page with a confirmation message "Thank you for downloading Enterprise Application Platform"

  @logout @basic_login
  Scenario: 3. Logged in user who accepted RHD T&C already tries to download - is not asked to login nor accept T&C, download starts immediatelly
    Given I have previously logged in
    And I am on the Downloads page
    When I click to download "Enterprise Application Platform"
    Then I should see the eap get started page with a confirmation message "Thank you for downloading Enterprise Application Platform"

  @nightly @delete_user @github_teardown @logout
  Scenario: 4. User starts download and registers using Social login providers which provides all mandatory informations (first name, last name, email, email is unique in RHD so new account is created directly). User is asked to fill in company and country together with RHD T&C acceptance, then download starts
    Given I am on the Downloads page
    When I click to download "Enterprise Application Platform"
    Then I should see the Log in page with the message "We're sorry, but this content is for members only"
    When I choose to register a new account using my GitHub account
    And I create a new password
    And select my country of residence
    And I click accept all terms and conditions
    And I click on the Submit button
    Then I should see the eap get started page with a confirmation message "Thank you for downloading Enterprise Application Platform"

  @nightly @logout @delete_user @github_teardown
  Scenario: User starts download and registers using Social login providers which doesn't provide some mandatory informations (first name, last name, email). User is asked to fill in all user profile mandatory informations (email, fistt name, last name, company and country) together with RHD T&C acceptance, then download starts
    Given I am on the Downloads page
    When I click to download "Enterprise Application Server"
    Then I should see the Log in page with the message "We're sorry, but this content is for members only"
    When I choose to register a new account using a GitHub account that contains missing profile information
    And I complete the required additional information
    Then I should see the eap get started page with a confirmation message "Thank you for downloading Enterprise Application Platform"

  @logout
  Scenario: 6. User starts download and login with active OpenShift.com account (simple user account) which is not in RHD yet. User is asked to fill in first name, last name, company and country, to accept RHD T&C, then download starts
    Given I am on the Downloads page
    When I click to download "Enterprise Application Platform"
    And I log in with an active OpenShift.com account
    Then I should be asked to fill in mandatory information with a message "We need you to provide some additional information in order to continue."
    And I complete the required additional information
    Then I should see the eap get started page with a confirmation message "Thank you for downloading Enterprise Application Platform"

  @logout @delete_user @ignore
  Scenario: 7. User starts download and login with active Red Hat Customer Portal account (full user account)
    Given I am on the Downloads page
    When I click to download "Enterprise Application Server"
    And I log in with a active Customer portal account
    Then I should be asked to fill in mandatory information with a message "We need you to provide some additional information in order to continue."
    When I accept the RHD terms and conditions
    And I fill in my country and company
    And I accept all terms and proceed
    Then I should see the eap get started page with a confirmation message "Thank you for downloading Enterprise Application Platform"
