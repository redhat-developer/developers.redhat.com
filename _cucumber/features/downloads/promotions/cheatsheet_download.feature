@desktop
@downloads
@download_test

Feature: User can download promotional cheat sheets

  @basic_login @logout @wip
  Scenario Outline: Verify that users can download cheatsheets
    Given I am on the promotion page for the "<cheat sheet>"
    When I click on the Download Now button
    And I log in with a valid username
    Then the "<file name>" download should initiate

    Examples: Cheat Sheets
      | cheat sheet        | file name                     |
      #| docker-cheatsheet  | Docker_Cheat_Sheet.pdf        |
      | mongodb-cheatsheet | MongoDB_Shell_Cheat_Sheet.pdf |

