@kc
Feature: User Profile Edit

  Scenario: User can edit their RHD user profile first name, last name, company and country.
    Given I am a RHD registered site visitor
    And I have logged into my account
    When I am on the Edit Account page
    And I update my profile
    Then my details should be updated

  # account is not propagated to customer portal
  @ignore
  Scenario: RHD user profile change is propagated to Customer portal
    Given I am a RHD registered site visitor
    And I have logged into my account
    When I am on the Edit Account page
    And I update my profile
    Then my details should be updated
    And the customer portal should be updated

  Scenario: User unlink's Social account from RHD account
    Given I am a RHD registered site vistor with a linked social account
    And I have logged into my account
    When I am on the Social Login Account page
    And I unlink my social account
    Then I should not have any social accounts associated with me

  # unexpected error occurs when linking social account
  @ignore
  Scenario: User links new social account to existing RHD account
    Given I am a RHD registered site vistor with a social account
    And I have logged into my account
    When I am on the Social Login Account page
    When I link my social account
    And I log in using my social account
    Then my account should be linked

  Scenario: User can successfully change their password
    Given I am a RHD registered site visitor
    And I have logged into my account
    And I am on the Password Account page
    When I change my password
    And I Logout
    And I log back into RHD using my newly created password
    Then I should be logged in
