Feature: Home Page Smoke Test

  In order to find out more about available Red Hat products,
  As generic site visitor,
  I want to be able to view a list of available products Redhat has to offer.

  Scenario: Product landing page should display a list of available products separated by sections.
    Given I am on the Products page
    Then I should see the Products page title
    And I should see the following main products sections:
      | INFRASTRUCTURE MANAGEMENT        |
      | CLOUD PRODUCTS                   |
      | JBOSS DEVELOPMENT AND MANAGEMENT |
      | INTEGRATION AND AUTOMATION       |
    And I should see a list of available products

  @wip
  Scenario: If available a product should have a 'Learn now' link
    Given I am on the Products page
    When a product has a learn link
    #Then I should see a learn link for that product

  Scenario: Each available product should contain a 'Get started' link
    Given I am on the Products page
    Then I should see a 'Get started' button for each available product



