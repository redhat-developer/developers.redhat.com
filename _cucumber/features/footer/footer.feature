Feature: Site footer menu

  Scenario Outline: Footer contains a "Report a website issue" link
    Given I am on the <page> page
    Then the footer should contain a "Report a website issue" link
    
    Examples: Subset of site pages to check
      | page         |
      | Home         |
      | Downloads    |
      | Resources    |
