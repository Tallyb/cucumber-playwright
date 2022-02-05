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
    # Next step is commented out as it will fail on CI, you need to manually upload your base screenshot.
    # So, uncomment it locally to generate your file, upload it to your repo and then commit the step uncommented.
    # Then the screen matches the base image with timeout of 1000
