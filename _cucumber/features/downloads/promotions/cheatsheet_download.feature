@desktop
@downloads
@download_test

Feature: User can download promotional cheat sheets

  @basic_login @logout
  Scenario Outline: Sanity check to verify that cheat sheets are downloadable (not a physical download)
    Given I am on the promotion page for the "<url>"
    When I click on the Download Now button
    And I log in with a valid username
    Then the file should be downloadable

    Examples: Cheat Sheets
      | url                |
      | docker-cheatsheet  |
      | mongodb-cheatsheet |
