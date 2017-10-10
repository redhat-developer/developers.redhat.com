Feature: Site footer menu

  @desktop
  Scenario Outline: Footer contains a "Report a website issue" link
    Given I am on the <page> page
    When I click on the Communicate footer item
    Then the footer should contain a "Report a website issue" link
    
    Examples: Subset of site pages to check
      | page         |
      | Home         |
      | Downloads    |
      | Resources    |
