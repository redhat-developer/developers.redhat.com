Feature: White Card Count

  @desktop
  Scenario Outline: Verify that White Cards are present on Topics pages
    Given I am on the "<topic>" Topic page
    Then I should see at least 16 Resource Cards

    Examples: topics
      | topic                   |
      | containers              |
      | devops                  |
      | enterprise-java         |
      | iot                     |
      | microservices           |
      | mobile                  |
      | security                |
      | web-and-api-development |
      | dotnet                  |
