Feature: Log in using my RHD registered details.

  As a developers.redhat customer,
  I want to log in the site,
  So that I can use its services.

  Scenario: Clicking on the Login link within the primary navigation bar should take a site-visitor to the RHD login page.
    Given I am on the "Home" page
    When I click on the "Login" link within the primary nav bar
    Then the Login page is displayed

  Scenario: User can navigate directly to the login page via /login.
    Given I navigate directly to the "Login" page
    Then the Login page is displayed

  @kc @logout
  Scenario: A customer whom has the correct login credentials can log in using their username
    Given I am a RHD registered site visitor
    And I am on the "Login" page
    When I log in with a valid username
    Then I should be logged in

  @kc @logout
  Scenario: A customer whom has the correct login credentials can log in using their email address
    Given I am a RHD registered site visitor
    And I am on the "Login" page
    When I log in with a valid email address
    Then I should be logged in

  @kc
  Scenario: A customer has incorrect login credentials (the password is incorrect)
    Given I am a RHD registered site visitor
    And I am on the "Login" page
    When I log in with an incorrect password
    Then the following error message should be displayed: Invalid login or password.

  @kc
  Scenario: A customer tries to login with an invalid email address (e.g. xxx@xx)
    Given I am on the "Login" page
    When I log in with an invalid email address
    Then the following error message should be displayed: Invalid login or password.

  @kc @logout
  Scenario: A customer can successfully reset their password
    Given I am a RHD registered site visitor
    And I am on the "Login" page
    When I request a password reset
    And I navigate to the password reset link
    Then I should be logged in

  @kc @logout
  Scenario: New User can login with active OpenShift.com account (simple user account)
    Given I am an OpenShift registered site visitor
    And I am on the "Login" page
    When I log using my OpenShift account
    Then I should be asked to agree to the Red Hat Developer Program Terms & Conditions
    And I accept Red Hat Developer Program Terms & Conditions and Red Hat Subscription Agreement and proceed
    Then I should be logged in

  @kc @logout
  Scenario: New User can login with active Red Hat Customer Portal account (full user account).
    Given I have an active Customer portal account
    And I am on the "Login" page
    When I log in with Customer portal account
    Then I should be asked to agree to the Red Hat Developer Program Terms & Conditions
    And I accept Red Hat Developer Program Terms & Conditions and Red Hat Subscription Agreement and proceed
    Then I should be logged in

  # returns 500 error from I.T backend
  # @kc
  # Scenario: User can't login with deactivated Red Hat Customer Portal account (full user account)
    #Given I am on the "Login" page
    # And I have an deactivated Customer portal account
    #When I log in with Customer portal account
    #Then the following error message should be displayed: Your Red Hat user account is disabled, contact Customer Service at customerservice@redhat.com please.
