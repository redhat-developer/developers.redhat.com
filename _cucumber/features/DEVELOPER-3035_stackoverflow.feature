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

  Scenario: Scrolling page loads next set of 10 results.
    Given I am on the Stack Overflow page
    Then I should see a list of 10 results
    When I scroll to the bottom of the page
    Then I should see a list of 20 results
