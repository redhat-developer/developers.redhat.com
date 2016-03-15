Feature: Download Page - Unauthorised customer

  In order to try out Red Hat software,
  As generic site visitor,
  I want to be able to see a list of available downloads.

  @downloads
  @javascript
  Scenario: Unauthorised customer should see a list of available downloads from Red Hat.
    Given I am on the Downloads page
    Then I should see the Downloads page title
    And a list of products available for download
    And the 'Download Latest' links for available products

  Scenario: Unauthorised customer should see a list of 'Other developer resources'
    Given I am on the Downloads page
    Then the following 'Other developer resources' links should be displayed:
      | Building Linux RPMs       |
      | Developing with OpenShift |
