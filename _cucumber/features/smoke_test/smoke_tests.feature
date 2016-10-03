Feature: Sanity checks of production

  Scenario: Verify Home page load
    Given I navigate to the "/register" page
    Then the page should load within "6" seconds

  Scenario Outline: Verify Production page load of Topics
    Given I navigate to the "/<url>" page
    Then the page should load within "6" seconds

    Examples: urls
      | url                     |
      | containers              |
      | mobile                  |
      | devops                  |
      | web-and-api-development |
      | enterprise-java         |
      | dotnet                  |
      | iot                     |

  Scenario: Verify Production page load of Technologies
    Given I navigate to the "/products" page
    Then the page should load within "6" seconds
