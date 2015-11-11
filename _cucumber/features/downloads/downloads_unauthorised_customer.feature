@downloads

Feature: Download Page Smoke Test

  In order to try out Red Hat software,
  As generic site visitor,
  I want to be able to see a list of available downloads.

  Scenario: Unauthorised customer should see a list of available downloads from RedHat.
    Given an unauthorised customer is on the site
    When they are on on the Downloads page
    Then they should see the Downloads page title
    And a list of products available for download
    And the 'Download Latest' links for available products

  Scenario: Unauthorised customer should see a list of 'Other developer resources'
    Given an unauthorised customer is on the site
    When they are on on the Downloads page
    Then the following "Other developer resources" links should be displayed:
      | Red Hat Docker Repository |
      | Container development kit |
      | Building Linux RPMs       |
      | Developing with OpenShift |

  Scenario Outline: Unauthorized user attempts to download RedHat's Infrastructure Management content/products
    Given an unauthorised customer is on the site
    And they are on on the Downloads page
    When they attempt to download <product>
    Then they should be redirected to the Red Hat Customer Portal login Page

  Examples: Infrastructure Management content/products
    | product                              |
    | Red Hat Enterprise Linux Atomic Host |
    | Red Hat Enterprise Linux             |
    | Red Hat Satellite                    |
    | Red Hat Developer Toolset            |
    | Red Hat Software Collections         |

  Scenario: Unauthorized user attempts to download RedHat's Cloud content/products
    Given an unauthorised customer is on the site
    And they are on on the Downloads page
    When they attempt to download OpenShift Enterprise by Red Hat
    Then they should be redirected to the Red Hat Customer Portal login Page

  Scenario: Unauthorized user attempts to download RedHat Mobile content/products
    Given an unauthorised customer is on the site
    And they are on on the Downloads page
    When they attempt to download Red Hat Mobile Application Platform
    Then they should be redirected to the Red Hat Customer Portal login Page

  Scenario Outline: Unauthorized user attempts to download RedHat's JBOSS Development and management content/products
    Given an unauthorised customer is on the site
    When they are on on the Downloads page
    When they attempt to download <product>
    Then they should be redirected to the Red Hat Customer Portal login Page

  Examples: JBOSS Development and management content/products
    | product                                       |
    | Red Hat Enterprise Linux Atomic Host          |
    | Red Hat JBoss Enterprise Application Platform |
    | Red Hat JBoss Data Grid                       |
    | Red Hat JBoss Web Server                      |

  Scenario Outline: Unauthorized user attempts to download RedHat's Integration and Automation content/products
    Given an unauthorised customer is on the site
    When they are on on the Downloads page
    When they attempt to download <product>
    Then they should be redirected to the Red Hat Customer Portal login Page

  Examples: Integration and Automation content/products
    | product                           |
    | Red Hat JBoss Fuse                |
    | Red Hat JBoss BPM Suite           |
    | Red Hat JBoss BRMS                |
    | Red Hat JBoss Data Virtualization |
    | Red Hat JBoss A-MQ                |
