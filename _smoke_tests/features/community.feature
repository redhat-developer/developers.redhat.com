@javascript
Feature: Smoke Test
  In order to see other projects in the Red Hat community
  As generic site visitor
  I want to be able to see a list of community projects.

  Scenario: Sanity check
    Given I am on the community page
    Then I should see the community page title
    And I should see at least "3" promoted links
    And I should see at least "70" community links
    And I should see some well known projects such as "Hibernate Tools", "Infinispan" and "Seam"

