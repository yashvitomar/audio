Feature: LanguageOptions

    Scenario: User navigates to LanguageOptions
        Given I am a User loading LanguageOptions
        When I navigate to the LanguageOptions
        Then LanguageOptions will load with out errors
        And I can enter text with out errors
        And I can select the button with with out errors
        And I can leave the screen with out errors