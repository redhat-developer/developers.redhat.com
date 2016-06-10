Feature: DEVELOPER-3035 - SO: Main page: Initial Impl
 
  Scenario: Results should be displayed with Votes, answers and views section
    Given I am on the Stack Overflow page
    Then I should see a list of 10 results
    And each results should contain an activity summary:
      | Votes   |
      | Answers |
      | Views   |
 
 @wip
  Scenario: Results should contain summary of question that links to the question page on Stack Overflow
    Given I am on the Stack Overflow page
    Then each question should contain a question summary
    And it should link to the question on Stack Overflow
 
Scenario: Results should contain a 'Best answer' section that links to the specific answer on Stack Overflow.
    Given I am on the Stack Overflow page
    When a question contains an answer
    Then I should see an answer summary
    And the answer should link to that question on Stack Overflow in a new window
    And I should see a "Read the full answer on Stack Overflow" link
 
  Scenario: When a result does not contain a 'Best answer' it should not contain a 'Best Answer' section.
    Given I am on the Stack Overflow page
    When a question does not contain an answer
    Then I should not see an answer summary
    And I should not see a "Read the full answer on Stack Overflow" link
 
  Scenario: Results should contain a "Started link" and the author of question.
    Given I am on the Stack Overflow page
    Then I should see "Asked X minutes ago"
    And the name of the author which links to the Authors profile on Stack Overflow
 
  Scenario: Scrolling page loads next set of 10 results.
    Given I am on the Stack Overflow page
    When I scroll to the bottom of the page
    Then I should see "20" results
