@smoke
Feature: Site navigation menu

  Scenario Outline: Primary navigation menu is visible
    Given I am on the <page> page
    Then I should see a primary nav bar with the following tabs:
      | Topics       |
      | Technologies |
      | Community    |
      | Resources    |
      | Downloads    |

  Examples: developers.redhat.com primary navigation bar links
    | page         |
    | Home         |
    | Technologies |
    | Resources    |
    | Downloads    |

  @wip
  Scenario Outline: Hovering over the TOPICS menu should display additional sub-menu with options
    Given I am on the <page> page
    When I hover over the Topics menu item
    Then I should see the following Topics sub-menu items:
      | Containers              |
      | Mobile                  |
      | DevOps                  |
      | Web and API Development |
      | Enterprise Java         |

  Examples: developers.redhat.com primary navigation bar links
    | page         |
    | Home         |
    | Technologies |
    | Resources    |
    | Downloads    |

  @products
  Scenario Outline: Hovering over the TECHNOLOGIES menu should display additional sub-menu with available products
    Given I am on the <page> page
    When I hover over the Technologies menu item
    Then I should see the following sub-menu items:
      | INFRASTRUCTURE |
      | CLOUD          |
      | MOBILE         |
      | MIDDLEWARE     |
    And the sub-menu should include a list of available technologies

  Examples: developers.redhat.com primary navigation bar links
    | page         |
    | Home         |
    | Technologies |
    | Resources    |
    | Downloads    |

  Scenario Outline: Hovering over the COMMUNITIES menu should display additional sub-menu with options
    Given I am on the <page> page
    When I hover over the Community menu item
    Then I should see the following sub-menu items and their description:
      | name                    | description                                                     |
      | Developers Blog         | Insights & news on Red Hat developer tools, platforms and more  |
      | Events                  | Find the latest conferences, meetups, and virtual seminars      |
      | Open Source Communities | Community Projects that Red Hat participates in                 |
      | Content Contributors    | Share your knowledge. Contribute content to Red Hat Developers. |

  Examples: developers.redhat.com primary navigation bar links
    | page         |
    | Home         |
    | Technologies |
    | Resources    |
    | Downloads    |
