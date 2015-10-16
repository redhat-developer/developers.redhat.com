Feature: Home Page Smoke Test

  In order to know the developer site has been built correctly
  As a build agent
  I want to be able to see sanity tests pass.

  @smoke
  Scenario: All titles present
    Given I am on the Home page
    Then I should see a primary nav bar with the following links:
      | Solutions |
      | Products  |
      | Downloads |
      | Resources |
      | Community |
      | Events    |
      | Blogs     |
