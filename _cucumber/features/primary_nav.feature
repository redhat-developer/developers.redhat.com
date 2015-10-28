@smoke

Feature: Home Page Smoke Test

  In order to know the developer site has been built correctly
  As a build agent
  I want to be able to see sanity tests pass.

  Scenario Outline: All titles present
    Given I am on the <page> page
    Then I should see a primary nav bar with the following tabs:
      | Solutions |
      | Products  |
      | Downloads |
      | Resources |
      | Community |
      | Events    |
      | Blogs     |

  Examples: developers.redhat.com primary navigation bar links
    | page      |
    | Solutions |
    | Products  |
    | Downloads |
    | resources |
    | Community |
    | Events    |