@downloads
@ignore
@kc
@dm

Feature: User can download promotional cheat sheets

  @logout @clear_download
  Scenario: Verify that users can download cheatsheets via download button.
    Given I am a registered site visitor
    And I am on the promotion page for the "linux-cheatsheet"
    When I click on the Download Now button for "Linux Cheatsheet"
    And I log in with a valid username
    Then the pdf download should initiate

  @logout @clear_download
  Scenario: Verify that users can download cheatsheets via cheat sheet image.
    Given I am a registered site visitor
    And I am on the promotion page for the "mongodb-cheatsheet"
    When I click on the promotional image for "MongoDB Shell Cheat Sheet"
    And I log in with a valid username
    Then the pdf download should initiate