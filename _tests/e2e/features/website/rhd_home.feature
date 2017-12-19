Feature:

  In order to verify our proxies site is served correctly. "Red Hat Developers" string is expected to be contained when accessing main site (GET /).

  Scenario: "Red Hat Developers" is included in main site
    Given I am on the Home page
    Then the HTML title is prefixed with the text "Red Hat Developers"
