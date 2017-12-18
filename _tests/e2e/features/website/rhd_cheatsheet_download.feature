@dm

Feature: User can download promotional cheat sheets

  Scenario: Unauthorised user can login and download cheatsheets via download button.
    Given I am a Developers.redhat.com registered site visitor
    And I am on the promotion page for the "advanced-linux-commands"
    When I click on the Log in to Download "Advanced Linux Cheatsheet" button
    And I log in with my email address
    Then the pdf download should initiate

  Scenario: Authorised user can download cheatsheets via download button without logging in.
    Given I am a Developers.redhat.com registered site visitor
    And I have logged into my account
    And I am on the promotion page for the "advanced-linux-commands"
    When I click on the Download "Advanced Linux Cheatsheet" button
    Then the pdf download should initiate
