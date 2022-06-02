@foo
Feature: Playwright docs

  Background: Navigation
    Given Go to the playwright website

  Scenario: Change theme
    Given A cat fact is recieved
    When Change theme to "light" mode
    # And Screen matches the base image "Light Mode"
    Then We see "light" mode
    When Change theme to "dark" mode
# And Screen matches the base image "Dark Mode"
