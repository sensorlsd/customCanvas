Feature: FortuneCase screenshots


  # Running all steps and generating screenshots
  Scenario: Wait for loading bar
    When "c_loaderBar" is visible
    Then wait 500
    Then make screenshot

  Scenario: Wait for play button
    When "c_playBtn" is visible
    Then make screenshot
    Then click "c_playBtn.button"
    Then wait 1000

  Scenario: Open Paytable
    When "c_infoButton" is visible
    Then make screenshot
    Then click "c_infoButton"
    Then wait 200
    Then make screenshot

  Scenario: Scroll Paytable
    When "c_cancelButton" is visible
    Then wait 1000
    Then make screenshot
    Then scroll paytable by 7
    Then make screenshot
    Then scroll paytable by 14
    Then make screenshot
    Then scroll paytable by 21
    Then make screenshot
    Then click "c_cancelButton"

  Scenario: Trigger Free Games
    Then send cheat "[[12,72,25,42,26]]"
    Then click "c_spinButton.parent"
    Then wait 1000
    Then click "c_spinButton.parent"

  Scenario: Getting click to start
    When "c_clickToStartText" is visible
    Then wait 1500
    Then make screenshot
    Then click "c_spinButton.parent"

  Scenario: Getting free games screen
    When "c_freeGamesText" is visible
    Then wait 3000
    Then make screenshot
    Then click "c_spinButton.parent"
    Then wait 5000

  Scenario: Gettin free games re-trigget
    Then send cheat "[[32,14,3,2,0]]"
    When "c_freeGamesText" is visible
    Then wait 3000
    Then make screenshot

  Scenario: Triggering total win
    Then send cheat "[[1,2,3,4,5],[1,2,3,4,5],[1,2,3,4,5],[1,2,3,4,5],[1,2,3,4,5],[1,2,3,4,5],[1,2,3,4,5],[1,2,3,4,5],[1,2,3,4,5],[1,2,3,4,5],[1,2,3,4,5],[1,2,3,4,5],[1,2,3,4,5],[1,2,3,4,5],[1,2,3,4,5],[1,2,3,4,5],[1,2,3,4,5],[1,2,3,4,5]]"
    Then pointer down "c_spinButton.parent"

  Scenario: Show Total win
    When "c_FreeGamesTotalWin" is visible
    Then pointer up "c_spinButton.parent"
    Then wait 3000
    Then make screenshot
    Then wait 2000
    Then anywhere click
    Then wait 6000
    
  Scenario: Trigger 5oak and Mega win
    Then send cheat "[[40,4,1,2,2]]"
    Then click "c_spinButton.parent"

  Scenario: 5OAK
    When "c_fiveOfAKind" is visible
    Then wait 400
    Then make screenshot

  Scenario: Mega win and Big Win
    When "c_bigWin" is visible
    Then wait 3000
    Then make screenshot
    Then wait 13000
    Then make screenshot

  Scenario: Reload game
    Given locales "zh-cn,zh-tw,ja,ko,vi,km,ms,id,th,es,pt,ru,de,sv,it,da,ro"
    Then reload
