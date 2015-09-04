@javascript
Feature: Smoke Test
  In order to try out Red Hat software
  As generic site visitor
  I want to be able to see a list of available downloads.

  Scenario: Sanity check
    Given I am on the downloads page
    Then I should see the download page title
    And I should see "15" download links

