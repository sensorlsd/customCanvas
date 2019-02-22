Feature: FortuneCase screenshots


  # Running all steps and generating screenshots
  Scenario: Wait for loading bar
    When "c_loading" is visible
    Then wait 500
    
    
  Scenario: Wait for play button
    When "c_playBtn" is visible
    
    Then click "c_playBtn.button"
    Then wait 1000
    
    Scenario: Open Paytable
    When "c_infoButton" is visible
    
    Then click "c_infoButton"
    Then wait 200
    