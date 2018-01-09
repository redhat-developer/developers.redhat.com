Feature: Site navigation menu

  Scenario: Clicking on the Login link within the primary navigation bar should take a site-visitor to the RHD login page.
    Given I am on the Home page
    When I click on the "Login" link within the primary nav bar
    Then the Login page is displayed

  Scenario: Clicking on the Register link within the primary navigation bar should take a site-visitor to the RHD registration page.
    Given I am on the Home page
    When I click on the "Register" link within the primary nav bar
    Then the Register page is displayed

  @desktop
  Scenario: TOPICS sub-menu items should link to retrospective pages
    Given I am on the Home page
    When I scroll to the "Topics" menu item
    Then I should see the following "Topics" sub-menu items:
      | Containers              |
      | DevOps                  |
      | Enterprise Java         |
      | Internet of Things      |
      | Microservices           |
      | Mobile                  |
      | Secure Programming      |
      | Web and API Development |
      | .NET Core               |

  @mobile
  Scenario: Tapping TOPICS from drop down menu on Mobile/Tablet should display additional topics
    Given I am on the Home page
    When I tap on the "Topics" menu item
    Then I should see the following "Topics" sub-menu items:
      | Containers              |
      | DevOps                  |
      | Enterprise Java         |
      | Internet of Things      |
      | Microservices           |
      | Mobile                  |
      | Secure Programming      |
      | Web and API Development |
      | .NET Core               |


  @desktop
  Scenario: Hovering over the TECHNOLOGIES menu should display additional sub-menu with available products
    Given I am on the Home page
    When I scroll to the "Technologies" menu item
    Then I should see the following "Technologies" sub-menu items:
      | INFRASTRUCTURE                         |
      | CLOUD                                  |
      | MOBILE                                 |
      | ACCELERATED DEVELOPMENT AND MANAGEMENT |
      | INTEGRATION AND AUTOMATION             |
      | DEVELOPER TOOLS                        |
      | LANGUAGES AND COMPILERS                |

  @desktop
  Scenario: COMMUNITIES sub-menu items should link to retrospective pages
    Given I am on the Home page
    When I scroll to the "Community" menu item
    Then I should see the following "Community" sub-menu items:
      | Developers Blog         |
      | Events                  |
      | Open Source Communities |
      | Content Contributors    |
    Then each "Community" sub-menu item should contain a link to its retrospective page:
      | blog                  |
      | events                |
      | projects              |
      | community/contributor |

  @mobile
  Scenario: Tapping COMMUNITY from drop down menu on Mobile/Tablet should display additional communities
    Given I am on the Home page
    When I tap on the "Community" menu item
    Then I should see the following "Community" sub-menu items:
      | Developers Blog         |
      | Events                  |
      | Open Source Communities |
      | Content Contributors    |
    Then each "Community" sub-menu item should contain a link to its retrospective page:
      | blog                  |
      | events                |
      | projects              |
      | community/contributor |

  @desktop
  Scenario: Hovering over the HELP menu should display additional sub-menu with options
    Given I am on the Home page
    When I scroll to the "Help" menu item
    Then I should see the following "Help" sub-menu items:
      | Resources          |
      | Forums             |
      | Stack Overflow Q&A |
    Then each "Help" sub-menu item should contain a link to its retrospective page:
      | resources      |
      | forums         |
      | stack-overflow |

  @mobile
  Scenario: Tapping HELP from drop down menu on Mobile/Tablet should display additional help
    Given I am on the Home page
    When I tap on the "Help" menu item
    Then I should see the following "Help" sub-menu items:
      | Resources          |
      | Forums             |
      | Stack Overflow Q&A |

  Scenario: Tapping Downloads should display downloads page
    Given I am on the Home page
    When I tap on the "Downloads " menu item
    Then I am taken to the Downloads page

  @desktop
  Scenario: Footer contains a Additional links without dropdown links
    Given I am on the Home page
    When I scroll to the footer section
    Then the footer Related Sites section should contain the following links:
      | Red Hat OpenShift.io     |
      | Red Hat OpenShift Online |
      | Red Hat Store            |
      | Red Hat Jobs             |
    And the footer Services section should contain the following links:
      | Customer Portal                      |
      | Developer Training and Certification |
      | Consulting Services                  |
    And the footer Communication section should contain the following links:
      | Report a website issue    |
      | Report a security problem |

  @mobile
  Scenario: Footer contains a Additional links with dropdown links
    Given I am on the Home page
    When I scroll to the footer section
    And I collapse the footer section
    Then the footer Related Sites section should contain the following links:
      | Red Hat OpenShift.io     |
      | Red Hat OpenShift Online |
      | Red Hat Store            |
      | Red Hat Jobs             |
    And the footer Services section should contain the following links:
      | Customer Portal                      |
      | Developer Training and Certification |
      | Consulting Services                  |
    And the footer Communication section should contain the following links:
      | Report a website issue    |
      | Report a security problem |

