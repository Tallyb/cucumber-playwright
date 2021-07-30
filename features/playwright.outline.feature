@foo
Feature: Playwright multi docs


  Background: Navigation
    Given Go to the playwright website

  Scenario Outline: Changing theme to required mode
    When Change theme to "<ThemeOne>" mode
    Then Snapshot "<ThemeOne>"
    When Change theme to "<ThemeTwo>" mode
    Then Snapshot "<ThemeTwo>"

    Examples:
      | ThemeOne | ThemeTwo |
      | light    | dark     |
      | dark     | light    |
