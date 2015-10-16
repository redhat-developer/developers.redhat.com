
Feature: Home Page Smoke Test
  In order to know the developer site has been built correctly
  As a build agent
  I want to be able to see sanity tests pass.

  @wip
  Scenario: All titles present
    Given I am on the home page
    Then I should see the main titles

  Scenario: Visit Product landing page
    Given I am on the products page
    Then I should see all the product sections
    And I should see "16" products
    And I should see "12" products with a learn link

