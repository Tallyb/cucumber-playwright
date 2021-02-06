@foo
Feature: Playwright 1

  Background: Navigation
    Given Go to the playwright website

  Scenario: search documents
    When Change theme to "light" mode
    Then Snapshot
    When Change theme to "dark" mode
    Then Snapshot

