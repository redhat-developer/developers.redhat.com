Feature: OneBox for On-Site Search

  Scenario Outline: User searches for a string that is associated with a Product OneBox
    Given I am on the "Search" page
    When I search for "<search term>"
    Then I should see a OneBox for "<product>" at the top of the results

    Examples:
      | search term   | product                                       |
      | containers    | Red Hat Container Development Kit             |
      | red hat linux | Red Hat Enterprise Linux                      |
      | data grid     | Red Hat JBoss Data Grid                       |
      | eap           | Red Hat JBoss Enterprise Application Platform |
      | web server    | Red Hat JBoss Web Server                      |
      | rhamt         | Red Hat Application Migration Toolkit         |
      | development   | Red Hat Development Suite                     |
      | DTS           | Red Hat Developer Toolset                     |
      | JBDS          | Red Hat JBoss Developer Studio                |
      | SCL           | Red Hat Software Collections                  |
      | amq           | Red Hat JBoss AMQ                             |
      | JDV           | Red Hat JBoss Data Virtualization             |
      | fuse          | Red Hat JBoss Fuse                            |
      | bpm suite     | Red Hat JBoss BPM Suite                       |
      | brms          | Red Hat JBoss BRMS                            |
      | rhmap         | Red Hat Mobile Application Platform           |
      | OSO           | Red Hat OpenShift Container Platform          |
      | openjdk       | OpenJDK                                       |
      | .net          | .NET Core for Red Hat Enterprise Linux        |


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