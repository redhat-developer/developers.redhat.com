Feature: Site navigation menu

  Scenario: Clicking on the Login link within the primary navigation bar should take a site-visitor to the RHD login page.
    Given I am on the Home page
    When I click on the "Login" link within the primary nav bar
    Then the Login page is displayed

  Scenario: Clicking on the Register link within the primary navigation bar should take a site-visitor to the RHD registration page.
    Given I am on the Home page
    When I click on the "Register" link within the primary nav bar
    Then the Register page is displayed

