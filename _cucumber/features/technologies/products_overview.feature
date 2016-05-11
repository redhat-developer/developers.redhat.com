@products
Feature: Product overview page

  In order to find out more about available Red Hat products,
  As generic site visitor,
  I want to be able to select a product and view more information on a product overview page.

  @smoke
  Scenario Outline: Side nav on products overview page
    Given I am on the Product Overview page for each <product id>
    Then I should see a side-nav with the following options:
      | Overview      |
      | Get Started   |
      | Docs and APIs |
      | Learn         |
      | Download      |
      | Buzz          |

    Examples: Red Hat products
      | product id |
      | rhel       |
      | eap        |
      | devstudio  |
      | eap        |
      | fuse       |
