@foo
Feature: Playwright docs

  Background: Navigation
    Given Go to the playwright website

  Scenario: Change theme
    Given A cat fact is recieved
    When Change theme to "light" mode
    Then Compare screen "light mode"
    Then We see "light" mode
    When Change theme to "dark" mode
    Then Compare screen "dark mode"
