@foo
Feature: Playwright docs

  Background: Navigation
    Given Go to the playwright docs website

  Scenario: Search documents
    When Enter search term "checkbox"
    Then Snapshot

