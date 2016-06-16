@nightly

Feature: Social registration

  As a visitor on the developers.redhat.com website,
  I want to register using my Github account,
  So that I can use RHD services.

  @keycloak_teardown @github_teardown @logout
  Scenario: 1 - Registration using GitHub login which contains all mandatory information (first name, last name, unique email)
    Given I am on the Registration page
    When I register a new account using my GitHub account
    Then I should see the pre-filled details from Github in the additional details form
    And I create a new password
    And select my country of residence
    And I click accept all terms and conditions
    When I click on the Submit button
    Then I should be registered and logged in
    When I am on the Edit Details page
    And the following newly registered details should be added to my profile:
      | Username                                    |
      | Email                                       |
      | First Name                                  |
      | Last name                                   |
      | Company                                     |
      | Country                                     |
      | Red Hat Developer Program subscription date |
      | Privacy & Subscriptions status              |

  @keycloak_social_teardown @github_teardown @logout
  Scenario: 2 - Registration using GitHub login which contains all mandatory information (first name, last name, but email already exists). User links GitHub account to existing account
    Given I am on the Registration page
    When I try to link a GitHub account to an existing account
    Then I should see a warning that the email is already registered
    When I click on the Send Verification email button
    Then I should receive an email containing a verify email link
    And I navigate to the verify email link
    Then I should be registered and logged in
    When I am on the Edit Details page
    And my registered details should visible be on my profile:
      | Username                                    |
      | Email                                       |
      | First Name                                  |
      | Last name                                   |
      | Company                                     |
      | Country                                     |
      | Red Hat Developer Program subscription date |
      | Privacy & Subscriptions status              |

  @keycloak_teardown @github_teardown @logout
  Scenario: 3 - Registration using GitHub login which contains all mandatory information (first name, last name, but email already exists). User changes email to create new account.
    Given I am on the Registration page
    When I try to link a GitHub account to an existing account
    Then I should see a warning that the email is already registered
    And I select to Choose another email
    And I complete the required additional information with a new email address
    Then I should be registered and logged in
    When I am on the Edit Details page
    And the following newly registered details should be added to my profile:
      | Username                                    |
      | Email                                       |
      | First Name                                  |
      | Last name                                   |
      | Company                                     |
      | Country                                     |
      | Red Hat Developer Program subscription date |
      | Privacy & Subscriptions status              |

  @keycloak_teardown @logout @github_teardown
  Scenario: 4 - Registration using GitHub login which doesn't contain some mandatory information (first name, last name), email is unique. User is asked to fill in mandatory info during login.
    Given I am on the Registration page
    When I register a new account using a GitHub account that contains missing profile information
    Then I should be asked to fill in mandatory information with a message "We need you to provide some additional information in order to continue."
    And I complete the required additional information
    Then I should be registered and logged in
    When I am on the Edit Details page
    And the following newly registered details should be added to my profile:
      | Username                                    |
      | Email                                       |
      | First Name                                  |
      | Last name                                   |
      | Company                                     |
      | Country                                     |
      | Red Hat Developer Program subscription date |
      | Privacy & Subscriptions status              |

  @keycloak_social_teardown @logout @github_teardown
  Scenario: 5 - Registration using GitHub login which doesn't contain some mandatory the information (first name, last name), email already exists. User links social provider to existing account
    Given I am on the Registration page
    When I try to register using a GitHub account that contains missing profile information with an existing RHD registered email
    And I complete the required additional information
    Then I should see a warning that the email is already registered
    And I click on the Send Verification email button
    Then I should receive an email containing a verify email link
    And I navigate to the verify email link
    Then I should be registered and logged in
    When I am on the Edit Details page
    And my registered details should visible be on my profile:
      | Username                                    |
      | Email                                       |
      | First Name                                  |
      | Last name                                   |
      | Company                                     |
      | Country                                     |
      | Red Hat Developer Program subscription date |
      | Privacy & Subscriptions status              |

  @keycloak_social_teardown @logout @github_teardown
  Scenario: 6 - Registration using GitHub login which doesn't contain some mandatory information (first name, last name), email that already exists. User changes email to create new account.
    Given I am on the Registration page
    When I try to register using a GitHub account that contains missing profile information with an existing RHD registered email
    Then I should be asked to fill in mandatory information with a message "We need you to provide some additional information in order to continue."
    And I complete the required additional information
    Then I should see a warning that the email is already registered
    And I select to Choose another email
    And I complete the required additional information with a new email address
    Then I should be registered and logged in
    When I am on the Edit Details page
    And the following newly registered details should be added to my profile:
      | Username                                    |
      | Email                                       |
      | First Name                                  |
      | Last name                                   |
      | Company                                     |
      | Country                                     |
      | Red Hat Developer Program subscription date |
      | Privacy & Subscriptions status              |
