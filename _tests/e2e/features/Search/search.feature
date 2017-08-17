Feature: Search Page

  As a site visitor,
  I want to have the option to search for developer related content.
  So that I can find specific information.

  Scenario: Site-nav search can be triggered using search button
    Given I am on the "Home" page
    When I enter "Hello world" into the site-nav search bar
    And I trigger the search via the search-button
    Then the search page is displayed

  Scenario: Site-nav search can be triggered by enter key
    Given I am on the "Home" page
    When I enter "Hello world" into the site-nav search bar
    And I trigger the search via the enter-key
    Then the search page is displayed

  Scenario: Search field is hidden within the site header on search page.
    Given I am on the "Home" page
    When I search for "Hello World" via the site-nav search bar
    Then the search page is displayed
    And the search field should not be displayed within the site header

    # Bug: DEVELOPER-4319 - currently failing as spaces are appended with +
    # Scenario: Typing multiple words such as "eap 7 download" in the search box from the search header should retain the spaces.
    #    Given I am on the "Home" page
    #    When I search for "Foobar" via the site-nav search bar
    #    Then the search page is displayed
    #    And the search field should contain "eap 7 download"

  Scenario: Search field is hidden within the site header on search page.
    Given I am on the "Home" page
    When I search for "Hello World" via the site-nav search bar
    Then the search page is displayed
    And the search field should not be displayed within the site header

  Scenario: User sees appropriate messaging upon direct navigation to search page
    Given I navigate directly to search page with ""
    Then I should see a message that no search term was entered

  Scenario: Search can be triggered using search button
    Given I am on the "Search" page
    When I enter "Hello world" into the search bar
    And click on the search-button
    Then search results are displayed

  Scenario: Search can be triggered by enter key
    Given I am on the "Search" page
    When I enter "Hello world" into the search bar
    And I trigger the search via the enter-key
    Then search results are displayed

  Scenario: Default result sorting should be 'Relevance'
    Given I am on the "Search" page
    Then the results should be sorted by "Relevance"

  Scenario: User can select to sort results by 'Most Recent'
    Given I am on the "Search" page
    When I search for "Containers"
    And I sort results by "Most Recent"
    Then the results should be sorted by "Most Recent"

  Scenario: Show 'Load More' link if more than 10 results are returned from the DCP.
    Given I am on the "Search" page
    And I search for "Containers"
    Then I should see a Load More link

  Scenario: Do not show 'Load More' link if less than 10 results are returned from the DCP.
    Given I am on the "Search" page
    When I search for "Foobar"
    And there are 10 or less results available
    Then I should not see a Load More link

  Scenario: I search for something should return *no* entries, such as "bfehwfbhbn"
    Given I am on the "Home" page
    When I search for "bfehwfbhbn" via the site-nav search bar
    And the search page is displayed
    Then I should see a message "0 results found for bfehwfbhbn"

  Scenario: Blog posts are searchable
    Given I am on the "Home" page
    When I search for "Red Hat JBoss Data Grid 7.0 is out" via the site-nav search bar
    And the search page is displayed
    Then the results should contain "Red Hat JBoss Data Grid 7.0 is out"

  Scenario: StackOverflow posts are searchable
    Given I am on the "Home" page
    When I search for "Dockerizing Node.js Apps" via the site-nav search bar
    And the search page is displayed
    Then the results should contain "Dockerizing Node.js Apps"

  Scenario Outline: DEVELOPER-3077 - Topics should be listed first in results
    Given I am on the "Home" page
    When I search for "<topic>" via the site-nav search bar
    And the search page is displayed
    Then the related topic page for "<url>" should be the first result

    Examples: of Red hat Topics
      | topic                   | url                     |
      | Containers              | containers              |
#      | Mobile                  | mobile                  |DEVELOPER-4317: Mobile Topic page is not included at the top of search results
      | DevOps                  | devops                  |
      | Web and API Development | web-and-api-development |
      | Enterprise Java         | enterprise-java         |
      | .NET                    | dotnet                  |
      | Microservices           | microservices           |
      | Internet of Things      | iot                     |

  Scenario: DEVELOPER-3078 - User searches on /search for 'red hat developers', the first result should be for https://developers.redhat.com/about.
    Given I am on the "Home" page
    When I search for "red hat developers" via the site-nav search bar
    And the search page is displayed
    Then first result should be the RHD About Us page

#  Ignored due to bug: DEVELOPER-4318 - Searching for 'enterprise linux' should return 'RHEL' product pages first
#  Scenario: DEVELOPER-3079 - Searching for 'enterprise linux' should return 'RHEL' product pages first
#    Given I am on the "Home" page
#    When I search for "enterprise linux" via the site-nav search bar
#    And the search page is displayed
#    Then the "rhel" product overview page should be the first result

  Scenario: User can filter results by: Content Type.
    Given I have searched for "Java"
    When I filter results by "Stack Overflow" from "Content Type"
    Then I should see a tag for "Stack Overflow"
    Then the results should be updated and contain a "Stack Overflow" label

  Scenario: User can filter results by: Product.
    Given I have searched for "Red Hat"
    When I filter results by "Red Hat Container Development Kit" from "Product"
    Then I should see a tag for "Red Hat Container Development Kit"
    Then the results should be updated and contain "Red Hat Container Development Kit"

  Scenario: User can filter results by: Topic.
    Given I have searched for "Containers"
    When I filter results by ".NET" from "Topic"
    Then I should see a tag for ".NET"
    Then the results should be updated and contain ".NET"

  Scenario Outline: Cross Site Scripting (XSS): Navigating directly to search page with url that contains malicious scripts
    Given I navigate directly to search page with "<script>"
    Then the search page is displayed
    And I should not see an alert

    Examples: Script alert
      | script                           |
      | Richfaces%205%20-%20Javascript   |
      | %3Cscript%3Ealert                |
      | "><script>alert("XSS")</script>& |

  Scenario Outline: Cross Site Scripting (XSS): Searching via search box using a query that contains malicious scripts
    Given I am on the "Search" page
    When I search for "<script>"
    And search results are displayed
    Then I should not see an alert

    Examples: Script alert
      | script                           |
      | Richfaces%205%20-%20Javascript   |
      | %3Cscript%3Ealert                |
      | "><script>alert("XSS")</script>& |


  Scenario: User can re-search using different search term and results are updated.
    Given I am on the "Home" page
    When I search for "Hello World" via the site-nav search bar
    Then the search page is displayed
    And the results should contain "Hello World"
    When I search for "Java"
    Then the results should be updated and contain "Java"

