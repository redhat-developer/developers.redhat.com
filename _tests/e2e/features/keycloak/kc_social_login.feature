#@kc
#Feature: Log in using preferred social provider
#
#  As a developers.redhat customer,
#  I want to log in the site using my preferred social provider,
#  So that I can use its services.
#
#  # fails with Unexpected error when authenticating with identity provider
#  @ignore
#  Scenario: User can login with Social Login provider for already linked account
#    Given I am on the Login page
#    When I log in with an account that is already linked to my Github account
#    Then I should be logged in
