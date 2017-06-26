@smoke
Feature: JBoss redirect to RHD

  Scenario Outline: Being redirected from a JBoss Developers page should show an alert message saying as such
    Given I am on a "JBoss" referred page as "<url>"
    Then I should see a "Referrer" alert

    Examples: referred pages with an alert
      | url                       |
      | products                  |
      | products/fuse/overview    |
      | resources/#!              |
      | downloads                 |
      | topics/devops             |
      | topics/dotnet             |
      | about                     |
      | community/contributor     |
      | events                    |
      | articles/no-cost-rhel-faq |