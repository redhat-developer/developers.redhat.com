Feature: Site navigation menu

  Scenario: Clicking on the Login link within the primary navigation bar should take a site-visitor to the RHD login page.
    Given I am on the Home page
    When I click on the "Login" link within the primary nav bar
    Then the Login page is displayed

  Scenario: Clicking on the Register link within the primary navigation bar should take a site-visitor to the RHD registration page.
    Given I am on the Home page
    When I click on the "Register" link within the primary nav bar
    Then the Register page is displayed

  Scenario Outline: Footer contains a "Related Sites" section
    Given I am on the <page> page
    Then the footer Related Sites section should contain the following links:
      | Red Hat OpenShift.io     |
      | Red Hat OpenShift Online |
      | Red Hat Store            |
      | Red Hat Jobs             |

    Examples: pages
      | page   |
      | Home   |
      | Search |

  Scenario Outline: Footer contains a "Services" section
    Given I am on the <page> page
    Then the footer Services section should contain the following links:
      | Red Hat OpenShift.io     |
      | Red Hat OpenShift Online |
      | Red Hat Store            |
      | Red Hat Jobs             |

    Examples: pages
      | page   |
      | Home   |
      | Search |

  Scenario Outline: Footer contains a "Communication" section
    Given I am on the <page> page
    Then the footer Communication section should contain the following links:
      | Report a website issue    |
      | Report a security problem |

    Examples: pages
      | page   |
      | Home   |
      | Search |

