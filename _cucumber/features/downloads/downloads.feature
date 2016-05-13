Feature: Download Page - Unauthorised customer

  In order to try out Red Hat software,
  As generic site visitor,
  I want to be able to see a list of available downloads.

  @downloads
  Scenario: Most popular downloads should be displayed at the top of downloads page
    Given I am on the Downloads page
    Then a "MOST POPULAR" Downloads section with the following Downloads:
      | Red Hat Enterprise Linux                      |
      | Red Hat JBoss Enterprise Application Platform |
      | Red Hat JBoss Developer Studio                |
      | Red Hat JBoss Fuse                            |
    And a 'DOWNLOAD' button for each Most Popular Download

  @downloads
  Scenario: Unauthorised customer should see a list of available downloads from Red Hat.
    Given I am on the Downloads page
    Then I should see a list of products available for download
    And a 'DOWNLOAD' button for each available product Download
