Feature:

  In order to keep my product stable
  As a developer or product manager
  I want to make sure that everything works as expected

  Scenario: Demo Search
    Given I am on the "Home" page
    When I search for "Foobar"
    Then the search page is displayed
    Then the search field should contain "Foobar"
