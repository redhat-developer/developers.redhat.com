Feature: OneBox for On-Site Search

  Scenario: User searches for a string that is associated with a Product OneBox
    Given I am on the "Search" page
    When I search for "containers"
    Then I should see a OneBox for "Red Hat Container Development Kit" at the top of the results

  Scenario: User selects the Title of the product on a Product OneBox
    Given I am provided with a "containers" OneBox
    When I select the OneBox Title
    Then I should see the "Red Hat Container Development Kit" Overview page

  Scenario: User selects the View Downloads button on a Product OneBox
    Given I am provided with a "containers" OneBox
    When I select the View Downloads button
    Then I should see the "Red Hat Container Development Kit" Download page

  @desktop
  Scenario: User selects the Hello World! molecule (icon and/or text) on a Product OneBox
    Given I am provided with a "containers" OneBox
    When I select the oneBox "Hello World!" link
    Then I should see the "Red Hat Container Development Kit" Hello-world page

  @desktop
  Scenario: User selects the Docs and APIs molecule (icon and/or text) on a Product OneBox
    Given I am provided with a "containers" OneBox
    When I select the oneBox "Docs and APIs" link
    Then I should see the "Red Hat Container Development Kit" Docs-and-apis page

  @desktop
  Scenario: User selects the Help molecule (icon and/or text) on a Product OneBox
    Given I am provided with a "containers" OneBox
    When I select the oneBox "Help" link
    Then I should see the "Red Hat Container Development Kit" Help page

  Scenario: User searches for a term that does not have a corresponding OneBox
    Given I am on the "Search" page
    When I search for "Red Hat Container Development Kit"
    Then I should not see a OneBox for "Red Hat Container Development Kit" at the top of the results