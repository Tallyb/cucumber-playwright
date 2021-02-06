@foo
Feature: Playwright docs

  Background: Navigation
    Given Go to the playwright website

  Scenario: Change theme
    When Change theme to "light" mode
    Then Snapshot
    When Change theme to "dark" mode
    Then Snapshot

