@kc
Feature: User Profile Edit

  @logout
  Scenario: User cannot edit their username on RHD
    Given I am a RHD registered site visitor
     And I am logged into RHD
    When I am on the Edit Details page
    Then the username field should be disabled

  @logout
  Scenario: User cannot edit their rhd registered email
    Given I am a RHD registered site visitor
    And I am logged into RHD
    When I am on the Edit Details page
    Then the email field should be readonly

  @logout
  Scenario: Edit Account page required field validation
    Given I am a RHD registered site visitor
     And I am logged into RHD
    When I am on the Edit Details page
     And I clear all required field
    Then I should see the following validation errors:
      | field      | message                  |
      | First name | First name is required   |
      | Last name  | Last name is required    |
      | Company    | Company name is required |

  @logout
  Scenario: First name field should accept no more than 45 characters
    Given I am a RHD registered site visitor
     And I am logged into RHD
    When I am on the Edit Details page
     And I enter 50 characters into the "first name" field
    Then I should see a "first name field" validation error "Please enter no more than 45 characters."

  @logout
  Scenario: Company field should accept no more than 45 characters
    Given I am a RHD registered site visitor
     And I am logged into RHD
    When I am on the Edit Details page
     And I enter 50 characters into the "last name" field
    Then I should see a "last name field" validation error "Please enter no more than 45 characters."

  @logout
  Scenario: Last name field should accept no more than 45 characters
    Given I am a RHD registered site visitor
     And I am logged into RHD
    When I am on the Edit Details page
     And I enter 50 characters into the "last name" field
    Then I should see a "last name field" validation error "Please enter no more than 45 characters."

  @logout
  Scenario: User can edit their RHD user profile first name, last name, company and country.
    Given I am a RHD registered site visitor
     And I am logged into RHD
    When I am on the Edit Details page
     And I change my details
    Then I should see a success message "Your account has been updated."
     And my logged in name should be updated to reflect this change
     And the following newly registered details should be added to my profile:
       | Username                                    |
       | Email                                       |
       | First Name                                  |
       | Last name                                   |
       | Company                                     |
       | Red Hat Developer Program subscription date |
       | Privacy & Subscriptions status              |

  @logout
  Scenario: RHD user profile change is propagated to Customer portal
    Given I am a RHD registered site visitor
     And I am logged into RHD
    When I am on the Edit Details page
     And I change my details
    Then I should see a success message "Your account has been updated."
     And the customer portal should be updated

  @logout @github_logout @delete_user @later
  Scenario: User unlinks Social account from RHD account
    Given I am on the Login page
    When I log in with an account that is already linked to my Github account
    Then I should be logged in
     And I am on the Social Login page
     And I unlink my social account
    Then I should not have any social accounts associated with me

  @logout @github_teardown @delete_user
  Scenario: User links new social account to existing RHD account
    Given I am a RHD registered site visitor
     And I am logged into RHD
    And I am on the Social Login page
    When I click to link my github account
     And log into GitHub
    Then my account should be linked

  @logout
  Scenario: User can successfully change their password
    Given I am a RHD registered site visitor
     And I am logged into RHD
     And I am on the Change Password page
    When I change my password
     And I click the Logout link
    Then I can log back into RHD using my newly created password

  @logout
  Scenario: User enters passwords that do not match
    Given I am a RHD registered site visitor
     And I am logged into RHD
     And I am on the Change Password page
    When I enter passwords which don't match
    Then I should see a "password confirm field" validation error "Passwords don't match"

  @logout
  Scenario: User enters passwords less than six characters
    Given I am a RHD registered site visitor
    When I am logged into RHD
     And I am on the Change Password page
     And I enter passwords containing less than six characters
    Then I should see a "new password field" validation error "Please enter at least 6 characters."

  @logout
  Scenario: User attempts to change password without entering their current password
    Given I am a RHD registered site visitor
    When I am logged into RHD
     And I am on the Change Password page
     And I enter matching passwords, leaving my previous password empty
    Then I should see a "password field" validation error "Current password is required"
