@javascript
Feature: Smoke Test
  In order to find out more about Red Hat software solutions
  As generic site visitor
  I want to be able to see a list of available solutions.

  Scenario: All titles present
    Given I am on the solutions page
    Then I should see the solutions title
    And I should see "5" solution types

