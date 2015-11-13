@downloads

Feature: Download Page - Unauthorised customer

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

  Scenario Outline: Unauthorized user attempts to download RedHat products via Download Manager
    Given an unauthorised customer is on the site
    And they are on on the Downloads page
    When they click 'Download Latest' for <product>
    Then they should be redirected to the Developers.redhat Login Page

  Examples: Infrastructure Management content/products
    | product   |
    | devstudio |
    | eap       |
    | datagrid  |
    | fuse      |
    | bpmsuite  |
    | brms      |
    | datavirt  |
