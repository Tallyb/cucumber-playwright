@foo
Feature: Playwright docs

  Background: Navigation
    Given Go to the playwright website

  Scenario: Change theme
    When Change theme to "light" mode
    Then Snapshot
    Then We see "light" mode
    When Change theme to "dark" mode
    Then Snapshot

  Scenario: Change theme and compare image
    When Change theme to "light" mode
    Then We see "light" mode
    And the screen matches the base image with timeout of 2000
