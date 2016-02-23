Feature: Download Page Smoke Test

  In order to try out Red Hat software
  As generic site visitor
  I want to be able to see a list of available downloads.

  @smoke
  Scenario: Sanity check
    Given I am on the Downloads page
    Then I should see the Downloads page title
    And I should see "15" download latest links
