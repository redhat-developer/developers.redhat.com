@products

Feature: Home Page Smoke Test

  In order to find out more about available Red Hat products,
  As generic site visitor,
  I want to be able to view a list of available products Redhat has to offer.

  Scenario: Product landing page should display a list of available products separated by sections.
    Given I am on the Technologies page
    Then I should see the Technologies page title
    And I should see the following main products sections:
      | INFRASTRUCTURE                   |
      | CLOUD PRODUCTS                   |
      | MOBILE                           |
      | JBOSS DEVELOPMENT AND MANAGEMENT |
      | INTEGRATION AND AUTOMATION       |
    And I should see a list of available products
    And I should see a description of available products

  Scenario: Each available product title should link to the relevant product overview page
    Given I am on the Technologies page
    Then each product title should link to the relevant product overview page

  Scenario: Each available product should contain a 'Get started' link
    Given I am on the Technologies page
    Then I should see a 'Get started' button for each available product

  Scenario: If available a product has a learn more option a 'Learn now' link should be displayed
    Given I am on the Technologies page
    When products have a Learn link available
    Then I should see a 'Learn' link for each product

  Scenario: If available a product has Docs and API's then a 'Docs and API's' link should be displayed
    Given I am on the Technologies page
    When the products have Docs and API's available
    Then I should see a 'Docs and APIs' link for each product

  Scenario: If available a product has Downloads available then a 'DOWNLOADS' link should be displayed
    Given I am on the Technologies page
    When the products have Downloads available
    Then I should see a 'Downloads' link for each product
