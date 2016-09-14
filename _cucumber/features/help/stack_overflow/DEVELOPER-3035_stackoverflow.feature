Feature: DEVELOPER-3035 - SO: Main page: Initial Impl

  Scenario: Results should be displayed with Votes, answers and views section
    Given I am on the Stack Overflow page
    Then I should see a list of 10 results
    And each results should contain an activity summary:
      | Votes   |
      | Answers |
      | Views   |

  Scenario: Results should contain summary of question that links to the question page on Stack Overflow
    Given I am on the Stack Overflow page
    Then I should see a list of 10 results
    And each question should contain a question summary
    And each question should link to the relevant question on Stack Overflow

  Scenario: Results should contain a 'Latest answer' section that links to the specific answer on Stack Overflow.
    Given I am on the Stack Overflow page
    When a question contains an answer
    Then I should see a "Latest answer" section
    And a "Read full question at Stack Overflow" link that links to that question on Stack Overflow in a new window

  Scenario: When a result does not contain a 'Latest answer' it should not contain a 'Latest Answer' section.
    Given I am on the Stack Overflow page
    When a question does not contain an answer
    Then I should not see a "Latest answer" section

  Scenario: Results should contain a "Started link" and the author of question.
    Given I am on the Stack Overflow page
    Then I should see a list of 10 results
    And each question should display how long ago the question was asked

  Scenario: When there are ten (or more) pages of answers - pagination with ellipsis should be displayed.
    Given I am on the Stack Overflow page
    Then I should see a list of 10 results
    And I should see pagination with "5" pages with ellipsis
    And the following links should be available:
      | Next |
      | Last |
    And the following links should be unavailable:
      | First    |
      | Previous |

  Scenario: When there is more than one page of answers - clicking on the ‘Next’ link takes me to the next set of answers.
    Given I am on the Stack Overflow page
    Then I should see a list of 10 results
    Then I should see pagination with "5" pages with ellipsis
    When I click on the pagination "Next" link
    Then I should see page "2" of the results
    And the following links should be available:
      | First    |
      | Previous |
      | Next     |
      | Last     |

  Scenario: User has previously clicked on the 'Next' link - clicks on the ‘Previous’ link takes them back to the previous set of answers.
    Given I am on the Stack Overflow page
    Then I should see a list of 10 results
    When I am on page "2" of the results
    When I click on the pagination "Previous" link
    Then I should see page "1" of the results
    And the following links should be available:
      | Next |
      | Last |
    And the following links should be unavailable:
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
    When there is only "1" page of results
    Then I should not see pagination with page numbers

  @later
  Scenario: When there are only two pages of answers -  I should see pagination with two pages
    Given I am on the Stack Overflow page
    When there is only "2" pages of results
    Then I should see pagination with "2" pages
    And the following links should be enabled:
      | Next |
      | Last |
    And the following links should be disabled:
      | First    |
      | Previous |
