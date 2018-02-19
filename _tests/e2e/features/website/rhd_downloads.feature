@desktop
@dm
# create PR for David to investigate
Feature: Download page

  Scenario: OS detection for Red Hat Development Suite
    Given I am on the Downloads page
    Then I should see "Red Hat Development Suite" download field should contain version and operating system

  Scenario: Logged in user whom has previously accepted RHDP T&C can download OS specific download item
    Given I am a Developers.redhat.com registered site visitor
    And I have logged into my account
    When I am on the Downloads page
    When I click to download "Red Hat Container Development Kit (CDK)"
    Then a single download should initiate on the Red Hat Development Suite Hello-World overview page

  Scenario: Logged in user whom has previously accepted RHDP T&C can download non OS specific download item
    Given I am a Developers.redhat.com registered site visitor
    And I have logged into my account
    When I am on the Downloads page
    When I click to download "Enterprise Application Platform"
    Then a single download should initiate on the Enterprise Application Platform Hello-World overview page

  Scenario: Unauthenticated site visitor must login in order to download RHD protected downloads
    Given I am a Developers.redhat.com registered site visitor
    And I am on the Downloads page
    When I click to download "Enterprise Application Platform"
    Then the Login page is displayed
    And I log in with my email address
    Then a single download should initiate on the Enterprise Application Platform Hello-World overview page

  Scenario: Site visitor navigates to the Download page and clicks on download latest product, and selects to register new account should display extended registration form.
    Given I am on the Downloads page
    And I click to download "Red Hat Container Development Kit (CDK)"
    Then the Login page is displayed
    When I click to register a new account
    Then I should see the registration form with terms and conditions

  Scenario: Site visitor navigates to the Download page and clicks on download latest product, and registers a new account, the download should initiate.
    Given I am on the Downloads page
    And I click to download "Enterprise Application Platform"
    When I register a new account
    And I verify my email address
    Then a single download should initiate on the Enterprise Application Platform Hello-World overview page

  Scenario: User starts download and login with active OpenShift.com account (simple user account) which is not in RHD yet. User is asked to fill in first name, last name, company and country, to accept RHD T&C, then download starts
    Given I am an OpenShift registered site visitor
    And I am on the Downloads page
    When I click to download "Enterprise Application Platform"
    And I log in with my email address
    And I complete the additional action required page, accept terms and proceed
    Then a single download should initiate on the Enterprise Application Platform Hello-World overview page

  Scenario: User starts download and login with active Red Hat Customer Portal account (full user account) should provide additional information
    Given I have an active Customer portal account
    And I am on the Downloads page
    When I click to download "Enterprise Application Platform"
    And I log in with my email address
    And I complete the additional action required page, accept terms and proceed
    Then a single download should initiate on the Enterprise Application Platform Hello-World overview page

  Scenario: User starts download and logs in using Social login providers which provides all mandatory information (first name, last name, email, email is unique in RHD so new account is created directly). User is asked to fill in company and country together with RHD T&C acceptance, then download starts
    Given I have a GitHub account
    And I am on the Downloads page
    When I click to download "Enterprise Application Platform"
    And I log in using my Github account
    And I complete the additional action required page, accept terms and proceed
    And I verify my email address
    Then a single download should initiate on the Enterprise Application Platform Hello-World overview page
