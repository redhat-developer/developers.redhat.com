@products
Feature: Forums: Product forums landing page
 
 @wip
  Scenario: Product forums landing page should display a list of available products separated by sections.
    Given I am on the Product forums page
    Then I should see the following products sections:
      | ACCELERATED DEVELOPMENT AND MANAGEMENT |
      | INFRASTRUCTURE                         |
      | INTEGRATION AND AUTOMATION             |
    And I should see a list of the available products
    And I should see a description of the available products

  Scenario: Each available product title should link to the relevant product forum page
    Given I am on the Product forums page
    Then each product title should link to the relevant product forum page
