Feature: Technologies Page

  In order to find out more about available Red Hat products,
  As generic site visitor,
  I want to be able to view a list of available products Redhat has to offer.

  Scenario: Product landing page should display a list of available products separated by sections.
    Given I am on the Technologies page
    Then I should see a list of available products

  Scenario: Each available product title should link to the relevant product overview page
    Given I am on the Technologies page
    Then each product title should link to the relevant product overview page

  Scenario: If available a product has a Get Started option a 'Get Started' link should be displayed
    Given I am on the Technologies page
    Then each product has a Get Started button
    And the get started buttons should link to the relevant get started page