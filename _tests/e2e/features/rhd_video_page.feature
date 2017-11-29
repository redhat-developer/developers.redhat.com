Feature: Video Details

  @watch
  Scenario: User navigates to a video page
    Given I am on the video page
    And I should see the speaker's name and the publish date
    # And display it left-aligned with the video
    And display sharing icons
    And display the short description
    And display “Show More” link underneath expanded details view

  @watch
  Scenario: User selects “Show More” in the description section
    Given I am on the video page
    When I click on “Show More” underneath the short description
    Then display the long description
    # And display the Speaker’s Name with a short bio underneath the long description
    # And display tags underneath the Speaker’s bio
    And display “Show Less” link underneath expanded details view

  @watch
  Scenario: User selects “Show Less” in the description section
    Given I am on the video page
    When I click on “Show More” underneath the short description
    When I click on “Show Less” underneath the expanded details view
    And display the short description

  @watch
  Scenario: User navigates to a video that is accompanied by a slide deck
    Given I am on the video page with a SlideShare deck
    Then display the slide deck side-by-side to the video
    And display “Note: Slides do not auto-advance” beneath the slides

  @watch
  Scenario: User navigates to a video that is provided with a transcript
    Given I am on the video page with a video transcript
    Then display the transcript underneath the description


