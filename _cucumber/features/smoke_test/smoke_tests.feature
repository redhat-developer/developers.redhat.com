@smoke
@prod
Feature: Sanity checks of production

  Scenario Outline: Page load performance
    Given I am on the <page> page
    Then the page should load within "6" seconds

    Examples: login/register pages
      | page           |
      | Home           |
      | Login          |
      | Registration   |
      | Technologies   |
      | Downloads      |
      | Stack overflow |
      | Resources      |
      | Product forums |

  Scenario Outline: Verify Production page load of Topics
    Given I navigate to the "/<url>" page
    Then the page should load within "6" seconds

    Examples: urls
      | url                            |
      | topics/containers              |
      | topics/mobile                  |
      | topics/devops                  |
      | topics/web-and-api-development |
      | topics/enterprise-java         |
      | topics/dotnet                  |
      | topics/iot                     |

  Scenario Outline: Verify Production page load of Technologies
    Given I am on the Product Overview page for each <product id>
    Then the page should load within "6" seconds

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

  Scenario: Search page with results should be loaded within 6 seconds.
    Given I navigate to the "/search/?q=containers" page
    Then the page should load within "6" seconds

  Scenario: DEVELOPER-3669: Create site test which verifies "Red Hat Developers" is included in main site
    Given I am on the Home page
    Then the page should contain "Red Hat Developers"
