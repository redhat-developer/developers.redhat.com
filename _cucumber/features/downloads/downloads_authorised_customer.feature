@downloads

Feature: Download Page - Authorised customer, has accepted Redhat terms

  In order to try out Red Hat software,
  As a registered develpers.redhat.com site visitor,
  I want to be able to download redhat products.

  Scenario: Authorised customer should see a list of available downloads from RedHat.
    Given an authorised customer is on the site who has accepted RedHat Terms
    When they are on on the Downloads page
    Then they should see the Downloads page title
    And a list of products available for download
    And the 'Download Latest' links for available products

  Scenario: Authorised customer should see a list of 'Other developer resources'
    Given an authorised customer is on the site who has accepted RedHat Terms
    When they are on on the Downloads page
    Then the following 'Other developer resources' links should be displayed:
      | Red Hat Docker Repository |
      | Container development kit |
      | Building Linux RPMs       |
      | Developing with OpenShift |

  @wip
  Scenario Outline: Authorized customer can download RedHat products via Download Manager
    Given an authorised customer is on the site who has accepted RedHat Terms
    When they are on on the Downloads page
    Then each <product> can be downloaded

  Examples: Infrastructure Management content/products
    | product   |
    | devstudio |
#    | eap       |
#    | datagrid  |
#    | fuse      |
#    | bpmsuite  |
#    | brms      |
#    | datavirt  |
