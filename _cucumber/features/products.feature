Feature: Home Page Smoke Test
  In order to know the developer site has been built correctly
  As a build agent
  I want to be able to see sanity tests pass.

  Scenario: Visit Product landing page
    Given I am on the Products page
    Then I should see the Products page title
    And I should see the following main products sections:
      | INFRASTRUCTURE MANAGEMENT        |
      | CLOUD PRODUCTS                   |
      | JBOSS DEVELOPMENT AND MANAGEMENT |
      | INTEGRATION AND AUTOMATION       |
    And I should see "16" products
    And I should see "12" products with a learn link