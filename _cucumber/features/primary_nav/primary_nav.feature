Feature: Site navigation menu

  Scenario Outline: Search field is visible within the site header.
    Given I am on the <page> page
    Then the search field should be displayed within the site header
    And the max characters for the search box should be "128" characters.
    And I should placeholder text within the search field "Enter your search term"

    Examples: of developers.redhat.com pages
      | page         |
      | Home         |
      | Technologies |
      | Resources    |
      | Downloads    |

  Scenario: Clicking on the Search button in the Nav bar should not do anything when no search term is entered.
    Given I am on the Home page
    And the search box is empty
    When I click on the search button
    Then nothing will happen and no search will be initiated

  @desktop
  Scenario: Primary navigation menu is visible
    Given I am on the Home page
    Then I should see a primary nav bar with the following tabs:
      | Topics       |
      | Technologies |
      | Community    |
      | Help         |
      | Downloads    |

  @mobile
  Scenario: Primary navigation is hidden behind a menu when on mobile devices
    Given I am on the Home page
    When I tap on Menu menu item
    Then I should see a primary nav bar with the following tabs:
      | Topics       |
      | Technologies |
      | Community    |
      | Help         |
      | Downloads    |

  @desktop
  Scenario: Hovering over the TOPICS menu should display additional sub-menu with options
    Given I am on the Home page
    When I click on the Topics menu item
    Then I should see the following "Topics" sub-menu items:
      | Containers              |
      | DevOps                  |
      | Enterprise Java         |
      | Internet of Things      |
      | Microservices           |
      | Mobile                  |
      | Web and API Development |
      | .NET                    |

  @desktop
  Scenario: TOPICS sub-menu items should link to retrospective pages
    Given I am on the Home page
    When I click on the Topics menu item
    Then each Topics sub-menu item should contain a link to its retrospective page:
      | name                    | href                           |
      | Containers              | topics/containers              |
      | Mobile                  | topics/mobile                  |
      | DevOps                  | topics/devops                  |
      | Web and API Development | topics/web-and-api-development |
      | Enterprise Java         | topics/enterprise-java         |
      | .NET                    | topics/dotnet                  |
      | Internet of Things      | topics/iot                     |
      | Microservices           | topics/microservices           |

  @mobile
  Scenario: Tapping TOPICS from drop down menu on Mobile/Tablet should display additional topics
    Given I am on the Home page
    When I tap on Topics menu item
    Then I should see the following "Topics" sub-menu items:
      | Containers              |
      | Mobile                  |
      | DevOps                  |
      | Web and API Development |
      | Enterprise Java         |
      | .NET                    |
      | Internet of Things      |

  @products @desktop
  Scenario: Hovering over the TECHNOLOGIES menu should display additional sub-menu with available products
    Given I am on the Home page
    When I click on the Technologies menu item
    Then I should see the following "Technologies" sub-menu items:
      | INFRASTRUCTURE                         |
      | CLOUD                                  |
      | MOBILE                                 |
      | ACCELERATED DEVELOPMENT AND MANAGEMENT |
      | INTEGRATION AND AUTOMATION             |
      | DEVELOPER TOOLS                        |
      | RUNTIMES                               |
    And the sub-menu should include a list of available technologies

  @products @desktop
  Scenario: TECHNOLOGIES sub-menu headings should link to retrospective section of the technologies page
    Given I am on the Home page
    When I click on the Technologies menu item
    Then each Technologies sub-menu heading should contain a link to its retrospective section of the technologies page:
      | INFRASTRUCTURE                         |
      | CLOUD                                  |
      | MOBILE                                 |
      | ACCELERATED DEVELOPMENT AND MANAGEMENT |
      | INTEGRATION AND AUTOMATION             |
      | DEVELOPER TOOLS                        |
      | RUNTIMES                               |

  @products @desktop
  Scenario: TECHNOLOGIES sub-menu headings should link to retrospective section of the technologies page
    Given I am on the Home page
    When I click on the Technologies menu item
    Then each available technology should link to their retrospective product overview page

  @mobile
  Scenario: Tapping TECHNOLOGIES from drop down menu on Mobile/Tablet should display additional technologies
    Given I am on the Home page
    When I tap on Technologies menu item
    Then I should see the following "Technologies" sub-menu items:
      | INFRASTRUCTURE                         |
      | CLOUD                                  |
      | MOBILE                                 |
      | ACCELERATED DEVELOPMENT AND MANAGEMENT |
      | INTEGRATION AND AUTOMATION             |
      | DEVELOPER TOOLS                        |
      | RUNTIMES                               |

  @desktop
  Scenario: Hovering over the COMMUNITIES menu should display additional sub-menu with options
    Given I am on the Home page
    When  I click on the Community menu item
    Then I should see the following Community sub-menu items and their description:
      | name                    | description                                                     |
      | Developers Blog         | Insights & news on Red Hat developer tools, platforms and more  |
      | Events                  | Find the latest conferences, meetups, and virtual seminars      |
      | Open Source Communities | Community Projects that Red Hat participates in                 |
      | Content Contributors    | Share your knowledge. Contribute content to Red Hat Developers. |

  @products @desktop
  Scenario: COMMUNITIES sub-menu items should link to retrospective pages
    Given I am on the Home page
    When  I click on the Community menu item
    Then each Communities sub-menu item should contain a link to its retrospective page:
      | name                    | href                  |
      | Developers Blog         | blog                  |
      | Events                  | events                |
      | Open Source Communities | projects              |
      | Content Contributors    | community/contributor |

  @mobile
  Scenario: Tapping COMMUNITY from drop down menu on Mobile/Tablet should display additional communities
    Given I am on the Home page
    When I tap on Community menu item
    Then I should see the following "Community" sub-menu items:
      | Developers Blog         |
      | Events                  |
      | Open Source Communities |
      | Content Contributors    |

  @desktop
  Scenario: Hovering over the HELP menu should display additional sub-menu with options
    Given I am on the Home page
    When  I click on the Help menu item
    Then I should see the following Help sub-menu items and their description:
      | name               | description                                                                                         |
      | Resources          | Important technical resources for you in all shapes and sizes: blogs, books, code, videos and more. |
      | Forums             | We've extended our popular JBoss.org forums to cover our entire Red Hat portfolio for you.          |
      | Stack Overflow Q&A | You already use Stack Overflow, so we'll help you use it to find your best answers.                 |

  @products @desktop
  Scenario: HELP sub-menu items should link to retrospective pages
    Given I am on the Home page
    When I click on the Help menu item
    Then each Help sub-menu item should contain a link to its retrospective page:
      | name               | href           |
      | Resources          | resources      |
      | Forums             | forums         |
      | Stack Overflow Q&A | stack-overflow |

  @mobile
  Scenario: Tapping HELP from drop down menu on Mobile/Tablet should display additional help
    Given I am on the Home page
    When I tap on Help menu item
    Then I should see the following "Help" sub-menu items:
      | Resources          |
      | Forums             |
      | Stack Overflow Q&A |

#  @kc @logout
#  Scenario: Log Out link should only be visible when user is logged-in
#    Given I am a RHD registered site visitor
#    And I am on the Login page
#    When I log in with a valid password
#    Then I should see the Log Out link
#    And I click the Logout link
#    Then I should not see the Log Out link
#
#  @kc @logout
#  Scenario: Register and Login links should only be visible when user is not logged-in
#    Given I am a RHD registered site visitor
#    And I am on the Login page
#    When I log in with a valid password
#    And I click the Logout link
#    Then I should see the Login and Register links
#
#  # backend no yet ready for this scenario
#  @later @kc
#  Scenario: RHD registered user with no first and last name on record should see username n the site header
#    Given I am an RHD registered user with no first and last name on record
#    When I log in with a valid username
#    Then I should be logged in
#    And I should see my username in the site header
