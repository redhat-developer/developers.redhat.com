Feature: DEVELOPER-1934 - Resources update: Implementation

  Scenario: On first visit to the Resources page - all results should be displayed
    Given I am on the Resources page
    Then none of the product filters should be checked
    And I should see text "Showing "1-10" of "191" results"

  Scenario:  On first visit to the Resources page - most recent item should be at the top
    Given I am on the Resources page
    Then I should see "10" results ordered by Most Recent first

  @wip
  Scenario Outline: User can filter results by resource type, Blog, Book, Code Artifact, Video
    Given I am on the Resources page
    When I click to filter results by "<filter type>"
    Then the results should be filtered by <result>

    Examples: Filter types and results.
      | filter type | result     |
      | Blog Posts  | Blog posts |
#      | Book          | Books                                                              |
#      | Code Artifact | Quickstarts, Demos, archetypes, BOMs and early access quick starts |
#      | Get Started   | Tutorials                                                          |
#      | Video         | Videos                                                             |

  Scenario Outline: Resource filters link states
    Given I am on the Resources page
    And I click to filter results by "<filter type>"
    When I hover over the <filter type> filter type
    Then the the remove filter icon should be displayed

    Examples: Filter types and results.
      | filter type   |
      | Blog          |
      | Book          |
      | Code Artifact |
      | Get Started   |
      | Video         |

  Scenario Outline: Clicking on the remove filter icon should replay results without filter.
    Given I am on the Resources page
    And I click to filter results by "<filter type>"
    And I hover over the <filter type> filter type
    When I click to remove the filter
    Then the default set of results are displayed

    Examples: Filter types and results.
      | filter type   |
      | Blog          |
      | Book          |
      | Code Artifact |
      | Get Started   |
      | Video         |

  Scenario: It should not be possible to filter by more than one type, if a different filter type is selected the results should display the new type.
    Given I am on the Resources page
    When I click to filter results by "Book"
    And the results for "Book" are displayed
    When I click to filter results by "Video"
    Then the results for "Video" are displayed
    And the results displayed should not contain "Book"

  Scenario: Keyword(s) text field should have maximum character set to 128
    Given I am on the Resources page
    Then the max characters on the Keyword field should be set to "128"

  Scenario: Quoted keywords should filter by items containing the full search string.
    Given I am on the Resources page
    When I enter "Red Hat Container Development Kit" into the Keyword's box
    Then the results displayed should contain "Red Hat Container Development Kit"

  Scenario: Non quoted keywords should filter by items containing any of the search items delimited by space.
    Given I am on the Resources page
    When I enter "Red Hat Container Development Kit" into the Keyword's box
    Then the results displayed should contain "Java Containers"

  Scenario: Results must contain Contributor/Author - Make this not clickable for v1.
    Given I am on the Resources page
    When I enter "Quickstart" into the Keyword's box
    Then some of the results should contain a single author
    And the author should not be clickable

  Scenario: Results must contain a relevant tag that relates to the product.
    Given I am on the Resources page
    When I enter "Containers" into the Keyword's box
    Then some of the results should contain a "Containers" tag
    And the tag should not be clickable

  Scenario: Filter by product should display results related to that product
    Given I am on the Resources page
    When select "Red Hat Container Development Kit" from the product filter
    Then all of the results displayed should contain a "Red Hat Container Development Kit" label

  Scenario: When the custom publish date is selected then a "start and end date" selector should appear
    Given I am on the Resources page
    When I change the Publish date drop down menu to "Custom"
    Then the following fields should be displayed:
      | Start Date |
      | End date   |

  Scenario: All videos should show a thumbnail.
    Given I am on the Resources page
    When I click to filter results by "Video"
    Then all of the results should contain a thumbnail

  Scenario Outline: When filtering by resource type only items filtered by "Video" should contain a thumbnail.
    Given I am on the Resources page
    When I click to filter results by "<filter type>"
    Then all of the results <result> contain a thumbnail

    Examples: Filter types and results.
      | filter type   | result     |
      | Video         | should     |
      | Blog          | should not |
      | Book          | should not |
      | Code Artifact | should not |
      | Get Started   | should not |

  Scenario: Only Videos should contain a thumbnail.
    Given I am on the Resources page
    Then only Videos should contain a thumbnail

  Scenario Outline: Selecting drop down menu options from Publish Date should filter results.
    Given I am on the Resources page
    When I select "<option>" from the Publish Date drop down
    Then the results should be filtered by <option>

    Examples: Publish Date drop down menu options
      | option       |
      | ALL          |
      | Last 7 days  |
      | Last 30 days |
      | This month   |
      | This year    |

  Scenario: When there are no results an appropriate message should be displayed.
    Given I am on the Resources page
    When I enter "bfehwfbhbn" into the Keyword's box
    Then I should see a message "No results found."
    And there will be no results displayed

  Scenario: When no results message has previously been displayed, and then I search for a valid resource, the results are displayed and the message is removed.
    Given I am on the Resources page
    And I enter "bfehwfbhbn" into the Keyword's box
    Then I should see a message "No results found."
    When I enter "containers" into the Keyword's box
    Then I should not see a message "No results found."
    And the results should contain the label "containers"

  Scenario: Result pagination on first visit
    Given I am on the Resources page
    Then I should see pagination with "9" pages with ellipsis
    And the following links should be enabled:
      | Next |
      | Last |
    And the ellipsis should not be clickable
    And the following links should be disabled:
      | First    |
      | Previous |

  @manual
  Scenario: I filter results that return two pages of results: should display pagination with two pages
    Given I am on the Resources page
    When I enter "?" into the Keyword's box
    Then I should see pagination with "2" pages
    And the following links should be enabled:
      | Next |
      | Last |
    But the following links should be disabled:
      | First    |
      | Previous |

  @manual
  Scenario: I filter results that returns eight pages of results: should not display pagination with ellipsis
    Given I am on the Resources page
    When I search for "?"
    Then I should see pagination with "5" pages without ellipsis
    And the following links should be enabled:
      | Next |
      | Last |
    And the following links should be disabled:
      | First    |
      | Previous |

  Scenario: Clicking on the ‘Next’ link takes me to the next set of results.
    Given I am on the Resources page
    When I click on the "Next" link
    Then I should see page "2" of the results
    And the following links should be enabled:
      | First    |
      | Previous |
      | Next     |
      | Last     |

  Scenario: Clicking on the ‘Previous’ link takes me back to the previous set of results.
    Given I am on the Resources page
    And I am on page "2" of the results
    When I click on the "Previous" link
    Then I should see page "1" of the results
    And the following links should be enabled:
      | Next |
      | Last |
    And the following links should be disabled:
      | First    |
      | Previous |
