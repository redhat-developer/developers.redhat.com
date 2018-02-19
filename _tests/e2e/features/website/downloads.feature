@desktop
Feature: Download page

  Scenario Outline: OS detection for Red Hat Development Suite
    Given I am on the Downloads page
    Then I should see "<product>" download field should contain version and operating system
    Examples:
      | product                                 |
      | Red Hat Development Suite               |
      | Red Hat Container Development Kit (CDK) |
