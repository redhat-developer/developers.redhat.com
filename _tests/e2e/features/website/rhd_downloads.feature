#@desktop
#Feature: Download page - CDK featured download.

#  @pr
#  Scenario: 1. Logged in user who accepted RHD T&C already tries to download - is not asked to login nor accept T&C, download starts immediately
#    Given I am a Developers.redhat.com registered site visitor
#    And I have logged into my account
#    When I am on the Downloads page
#    When I click to download "Red Hat Container Development Kit (CDK)"
#    Then a single download should initiate on the Red Hat Container Development Kit (CDK) Hello-World overview page
#
#  @pr
#  Scenario: 2. Unauthenticated site visitor must login in order to download RHD protected downloads
#    Given I am a Developers.redhat.com registered site visitor
#    And I am on the Downloads page
#    When I click to download "Red Hat Container Development Kit (CDK)"
#    Then the Login page is displayed
#    And I log in with my email address
#    Then a single download should initiate on the Red Hat Container Development Kit (CDK) Hello-World overview page
#
#  @dm
#  Scenario: 3. Site visitor navigates to the Download page and clicks on download latest product, and selects to register new account should display extended registration form.
#    Given I am on the Downloads page
#    And I click to download "Red Hat Container Development Kit (CDK)"
#    When click to register a new account
#    Then I should see the registration form with terms and conditions
#
#  @dm
#  Scenario: 4. Registered site visitor navigates to the Download page and clicks on download latest product, upgrades account, and accepts Redhat T&C's should initiate the product download.
#    Given I am a RHD registered site visitor
#    And I am on the Downloads page
#    When I click to download "Red Hat Container Development Kit (CDK)"
#    And I log in with my email address
#    And I complete the additional action required page, and proceed
#    Then a single download should initiate on the Red Hat Container Development Kit (CDK) Hello-World overview page
#
#  # email is taking ~1hr to receive - impossible to test
#  @dm
#  Scenario: 5. Site visitor navigates to the Download page and clicks on download latest product, and registers a new account, the download should initiate.
#    Given I am on the Downloads page
#    And I click to download "Red Hat Container Development Kit (CDK)"
#    When I register a new account
#    And I verify my email address
#    Then a single download should initiate on the Red Hat Container Development Kit (CDK) Hello-World overview page
#
#  @dm
#  Scenario: 6. User starts download and login with active OpenShift.com account (simple user account) which is not in RHD yet. User is asked to fill in first name, last name, company and country, to accept RHD T&C, then download starts
#    Given I am an OpenShift registered site visitor
#    And I am on the Downloads page
#    When I click to download "Red Hat Container Development Kit (CDK)"
#    And I log in with my email address
#    And I complete the additional action required page, accept terms and proceed
#    Then a single download should initiate on the Red Hat Container Development Kit (CDK) Hello-World overview page
#
#  @dm
#  Scenario: 7. User starts download and login with active Red Hat Customer Portal account (full user account)
#    Given I have an active Customer portal account
#    And I am on the Downloads page
#    When I click to download "Red Hat Container Development Kit (CDK)"
#    And I log in with my email address
#    And I complete the additional action required page, accept terms and proceed
#    Then a single download should initiate on the Red Hat Container Development Kit (CDK) Hello-World overview page
#
#  @dm
#  Scenario: 8. User starts download and logs in using Social login providers which provides all mandatory information (first name, last name, email, email is unique in RHD so new account is created directly). User is asked to fill in company and country together with RHD T&C acceptance, then download starts
#    Given I have a GitHub account
#    And I am on the Downloads page
#    When I click to download "Red Hat Container Development Kit (CDK)"
#    And I log in using my Github account
#    And I complete the additional action required page, accept terms and proceed
#    Then a single download should initiate on the Red Hat Container Development Kit (CDK) Hello-World overview page
