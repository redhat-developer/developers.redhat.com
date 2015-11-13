@downloads

Feature: Download Page - Unauthorised customer

  In order to try out Red Hat software,
  As generic site visitor,
  I want to be able to see a list of available downloads.

  Scenario: Authorised customer should see a list of available downloads from RedHat.
    Given an authorised customer is on the site who has accepted RedHat Terms
    When they are on on the Downloads page
    Then they should see the Downloads page title
    And a list of products available for download
    And the 'Download Latest' links for available products

  Scenario: Unauthorised customer should see a list of 'Other developer resources'
    Given an authorised customer is on the site who has accepted RedHat Terms
    When they are on on the Downloads page
    Then the following "Other developer resources" links should be displayed:
      | Red Hat Docker Repository |
      | Container development kit |
      | Building Linux RPMs       |
      | Developing with OpenShift |

  @wip
  Scenario Outline: Unauthorized user attempts to download RedHat products via Download Manager
    Given an authorised customer is on the site who has accepted RedHat Terms
    And they are on on the Downloads page
    When they click 'Download Latest' for <product>

  Examples: Infrastructure Management content/products
    | product   |
    | devstudio |
    | eap       |
    | datagrid  |
    | fuse      |
    | bpmsuite  |
    | brms      |
    | datavirt  |
