@foo
Feature: Playwright docs
  As a normal user
  I want to select which background theme I like
  So that I get to browse more comfortably

  Background: Navigation
    Given I go to the playwright website

  Scenario Outline: Changing theme to <theme> mode
    When I change the theme to "<theme>" mode
    Then I see the background color "<color>"
    And Snapshot "theme <theme>"

    Examples:
      | theme | color              |
      | light | rgb(255, 255, 255) |
      | dark  | rgb(36, 37, 38)    |