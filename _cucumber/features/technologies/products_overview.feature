Feature: Product overview page

  In order to find out more about available Red Hat products,
  As generic site visitor,
  I want to be able to select a product and view more information on a product overview page.

  @products @smoke
  Scenario Outline: Side nav on products overview page
    Given I am on the Product Overview page for each <product id>
    Then I should see a side-nav with the following options:
      | Overview      |
      | Docs and APIs |
      | Learn         |
      | Download      |
      | Help          |

    Examples: Red Hat products
      | product id |
      | datagrid   |
      | eap        |
      | webserver  |
      | cdk        |
      | devsuite   |
      | devstudio  |
      | rhel       |
      | amq        |
      | brms       |
      | bpmsuite   |
      | datavirt   |
      | fuse       |
      | openshift  |
