@smoke
Feature: Site navigation menu

  @mobile
  Scenario: A customer has correct login credentials can log in on mobile/tablet devices.
    Given I am on the Home page
    When I tap on Menu menu item
    Then I should see a primary nav bar with the following tabs:
      | Login     |
      | Register  |

  @mobile
  @accepted_terms
  @mobile_logout
  Scenario: A customer has correct login credentials can log in on mobile/tablet devices.
    Given I am on the Home page
    And I tap on Login menu item
    When I try to log in with a valid password
    And I tap on Menu menu item
    Then the login attempt should be successful

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

  @mobile
  Scenario Outline: Primary navigation is hidden behind a menu when on mobile devices
    Given I am on the <page> page
    When I tap on Menu menu item
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

  @mobile
  Scenario Outline: Tapping TOPICS from drop down menu on Mobile/Tablet should display additional topics
    Given I am on the <page> page
    When I tap on Topics menu item
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
    Then I should see the following Technologies sub-menu items:
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

  @mobile
  Scenario Outline: Tapping TECHNOLOGIES from drop down menu on Mobile/Tablet should display additional technologies
    Given I am on the <page> page
    When I tap on Technologies menu item
    Then I should see the following Technologies sub-menu items:
      | INFRASTRUCTURE |
      | CLOUD          |
      | MOBILE         |
      | MIDDLEWARE     |

  Examples: developers.redhat.com primary navigation bar links
    | page         |
    | Home         |
    | Technologies |
    | Resources    |
    | Downloads    |

  Scenario Outline: Hovering over the COMMUNITIES menu should display additional sub-menu with options
    Given I am on the <page> page
    When I hover over the Community menu item
    Then I should see the following Community sub-menu items and their description:
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

  @mobile
  Scenario Outline: Tapping COMMUNITY from drop down menu on Mobile/Tablet should display additional communities
    Given I am on the <page> page
    When I tap on Community menu item
    Then I should see the following Community sub-menu items:
      | Developers Blog         |
      | Events                  |
      | Open Source Communities |
      | Content Contributors    |

  Examples: developers.redhat.com primary navigation bar links
    | page         |
    | Home         |
    | Technologies |
    | Resources    |
    | Downloads    |
