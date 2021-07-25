@foo
Feature: Playwright docs
  As a normal user

  Background: Navigation
    Given Go to playwright website

  Scenario Outline: Changing theme to required mode
    When Change the theme to "<ThemeOne>"
    Then Snapshot "<ThemeOne>"
    When Change the theme to "<ThemeTwo>"
    Then Snapshot "<ThemeTwo>"

    Examples:
      | ThemeOne | ThemeTwo |
      | light    | dark     |
      | dark     | light    |