Feature: Search Page
  As a site visitor,
  I want to have the option to search for developer related content.
  So that I can find specific information.

  Scenario Outline: Search field is visible within the site header.
    Given I am on the <page> page
    Then the search field should be displayed within the site header
    And the max characters for the search box should be "128" characters.
    And I should placeholder text within the search field "Filter by keyword"

  Examples: of developers.redhat.com pages
    | page         |
    | Home         |
    | Technologies |
    | Resources    |
    | Downloads    |

  @javascript @wip
  Scenario: Search field is hidden within the site header on search page.
    Given I am on the Home page
    When I search for "Containers"
    Then the search results page is displayed
    And the search field should not be displayed within the site header

  @javascript @wip
  Scenario: I search for developer related content - I will see all entries ordered by Most recent.
    Given I am on the Home page
    When I search for "EAP"
    Then I should see "5" results containing "EAP"
    And the results will be ordered by most recent first

  # Query: Needs approval by Tiffany
  Scenario: I search for developer related content - I will see all entries ordered by Title.
    Given I am on the Home page
    When I search for "Fuse"
    Then I should see "5" results containing "Fuse"
    And the results will be ordered by title

  @javascript @wip
  Scenario: Search results should be listed with tags
    Given I am on the Home page
    When I search for "Containers"
    Then I should see "5" results containing "Container"
    # And tags related to "Containers" # Skipping - not all items are tagged with "containers"

  @javascript @wip
  Scenario: I search for something should return *no* entries, such as "bfehwfbhbn"
    Given I am on the Home page
    When I search for "bfehwfbhbn"
    Then I should see a message "No results found"
    And below a I should see a message "Please try different keywords"
    And there will be no results displayed

  @javascript
  Scenario: I search for something that returns one page of results only should display no pagination
    Given I am on the Home page
    When I search for "burlington"
    Then I should not see pagination with page numbers

  @javascript
  # the pagination is not working. For example try to click on page 2, 3 or 4 manually in the browser.
  Scenario: I search for something that returns two pages of results only should display pagination with two pages
    Given I am on the Home page
    When I search for "hamilton"
    Then I should see pagination with "2" pages
    And the following links should be enabled:
      | Next |
      | Last |
    And the following links should be disabled:
      | First    |
      | Previous |

  @javascript @wip
  Scenario: I search for something that returns ten (or more) pages of results should display pagination with ellipsis
    Given I am on the Home page
    When I search for "code"
    Then I should see pagination with "5" pages with ellipsis
    And the ellipsis should not be clickable
    And the following links should be enabled:
      | Next |
      | Last |
    And the following links should be disabled:
      | First    |
      | Previous |

  # I can't find anything that has 5 pages
  # Scenario: I search for something that returns five pages of results should not display pagination with ellipsis
  #   Given I am on the Home page
  #   When I search for "?"
  #   Then I should see pagination with "5" pages without ellipsis
  #   And the following links should be enabled:
  #     | Next |
  #     | Last |
  #   And the following links should be disabled:
  #     | First    |
  #     | Previous |

  @javascript @wip
  Scenario: When I search for something displaying more than one page of results - clicking on the ‘Next’ link takes me to the next set of results.
    Given I have previously searched for "code"
    When I click on the "Next" link
    Then I should see page "2" of the results
    And the following links should be enabled:
      | First    |
      | Previous |
      | Next     |
      | Last     |

  @javascript @wip
  Scenario: When I previously clicked on the 'Next' link - clicking on the ‘Previous’ link takes back to the previous set of results.
    Given I have previously searched for "code"
    And I am on page "2" of the results
    When I click on the "Previous" link
    Then I should see page "1" of the results
    And the following links should be enabled:
      | Next |
      | Last |
    And the following links should be disabled:
      | First    |
      | Previous |

  @javascript
  Scenario: Search box is displayed within the search page
    Given I have previously searched for "code"
    When I search for "Containers"
    Then I should see "10" results containing "container"
    And the results will be ordered by most recent first

  @javascript @wip
  Scenario: Clicking on the Search button in the Nav bar should not do anything when no search term is entered.
    Given I am on the Home page
    And the search box is empty
    When I click on the search button
    Then nothing will happen and no search will be initiated

  @javascript @wip
  Scenario: Clicking on the Search button on the search page should not do anything when no search term is entered.
    Given I have previously searched for "code"
    And the search box is empty
    When I click on the search button
    Then nothing will happen and no search will be initiated

  @manual
  Scenario: Search page should be bookmarkable
    Given I am on the Search page
    And I search for "Containers"
    When I bookmark the page
    Then the bookmark should be added to my bookmarks
    And the search criteria is added to the URL

  @manual
  Scenario: Revisiting a previously bookmarked search should redisplay the search page including the search query.
    Given I visit a previous search from a bookmark
    Then the Search page should be displayed
    And the search query is replayed.


