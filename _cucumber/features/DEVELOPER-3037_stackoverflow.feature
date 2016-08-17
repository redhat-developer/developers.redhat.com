Feature: DEVELOPER-3037 - SO: Main page: Add pagination to results

  Scenario: Answers per page options should be: 10, 25, 50 and 100.
    Given I am on the Stack Overflow page
    And the answers per page options should be:
      | 10  |
      | 25  |
      | 50  |
      | 100 |
 
  Scenario: When there are ten (or more) pages of answers - pagination with ellipsis should be displayed.
    Given I am on the Stack Overflow page
    Then I should see pagination with "5" pages with ellipsis
    And the following links should be enabled:
      | Next |
      | Last |
    And the following links should be disabled:
      | First    |
      | Previous |
 
 @later
  Scenario: When there is more than one page of answers - clicking on the ‘Next’ link takes me to the next set of answers.
    Given I am on the Stack Overflow page
    When I click on the pagination "Next" link
    Then I should see page "2" of the answers
    And the following links should be enabled:
      | First    |
      | Previous |
      | Next     |
      | Last     |
 
  Scenario: User has previously clicked on the 'Next' link - clicks on the ‘Previous’ link takes them back to the previous set of answers.
    Given I am on the Stack Overflow page
    And I am on page "2" of the results
    When I click on the pagination "Previous" link
    Then I should see page "1" of the results
    And the following links should be enabled:
      | Next |
      | Last |
    And the following links should be disabled:
      | First    |
      | Previous |
 
  @later
  Scenario: When there are only five pages of answers - pagination should not be displayed with ellipsis
    Given I am on the Stack Overflow page
    When there are only five pages of answers
    Then I should see pagination with "5" pages without ellipsis
    And the following links should be enabled:
      | Next |
      | Last |
    And the following links should be disabled:
      | First    |
      | Previous |
 
  @later
  Scenario: When there are only one page of answers - no pagination should be dispalyed
    Given I am on the Stack Overflow page
    When there is only "1" page of answers
    Then I should not see pagination with page numbers
 
  @later
  Scenario: When there are only two pages of answers -  I should see pagination with two pages
    Given I am on the Stack Overflow page
    When there is only "2" pages of answers
    Then I should see pagination with "2" pages
    And the following links should be enabled:
      | Next |
      | Last |
    And the following links should be disabled:
      | First    |
      | Previous | 
