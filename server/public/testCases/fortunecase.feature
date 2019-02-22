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
    Then make screenshot
    Then scroll paytable by 5
    Then make screenshot
    Then scroll paytable by 10
    Then make screenshot
    Then scroll paytable by 15
    Then make screenshot
    Then scroll paytable by 20
    Then make screenshot
    Then scroll paytable by 25
    Then make screenshot
    Then click "c_cancelButton"

  Scenario: Spin for Pickup Bonus
    When "c_infoButton" is visible
    Then send cheat "[[46,54,9,57,0]]"
    Then click "c_spinButton.parent"
    Then wait 1000
    Then click "c_spinButton.parent"

  Scenario: Activating Pickup Bonus
    When "c_clickToStartText" is visible
    Then wait 4000
    Then make screenshot
    Then click "c_spinButton.parent"

  Scenario: Getting bonus picks is visible
    When "c_btn0" is visible
    Then wait 3000
    Then make screenshot
    Then emit "ButtonEvent.CLICK" to "c_btn0" with data "null"

  Scenario: Pickup Bonus win is visible
    When "c_btnCollect" is visible
    Then wait 1000
    Then make screenshot
    Then click "c_btnCollect.Button6"
    Then wait 1000

  Scenario: Trigger Wheel Bonus
    Then send cheat "[[44,51,36,2,2]]"
    Then click "c_spinButton.parent"
    Then wait 1000
    Then click "c_spinButton.parent"

  Scenario: Open bonus wheel
    When "c_clickToStartText" is visible
    Then wait 1500
    Then make screenshot
    Then click "c_spinButton.parent"

  Scenario: Rotate bonus wheel
    When "c_bonusWheel" is visible
    Then wait 3000
    Then make screenshot
    Then send cheat "[[5740]]"
    Then anywhere click

  Scenario: Get bonus wheel results
    When "c_bonusMoneyAmount" is visible
    Then wait 7000
    Then make screenshot
    Then wait 3000
    Then make screenshot

  Scenario: Trigger 5oak and Mega win
    Then send cheat "[[23,16,3,38,15]]"
    Then click "c_spinButton.parent"

  Scenario: 5OAK
    When "c_fiveOfAKind" is visible
    Then wait 400
    Then make screenshot

  Scenario: Mega win
    When "c_bigWin" is visible
    Then wait 3000
    Then make screenshot
    Then wait 13000
    Then make screenshot

  Scenario: Trigger Wheel Bonus again
    Then send cheat "[[44,51,36,2,2]]"
    Then click "c_spinButton.parent"
    Then wait 1000
    Then click "c_spinButton.parent"

  Scenario: Open bonus wheel again
    When "c_clickToStartText" is visible
    Then wait 1500
    Then click "c_spinButton.parent"

  Scenario: Rotate bonus wheel again
    When "c_bonusWheel" is visible
    Then wait 3000
    Then send cheat "[[5740]]"
    Then anywhere click

  Scenario: Get bonus wheel results again
    When "c_bonusMoneyAmount" is visible
    Then wait 7000
    Then wait 3000
    Then make screenshot
    Then wait 10000

  Scenario: Triggering total win
    Then send cheat "[[51,20,7,25,27],[51,20,7,25,27],[51,20,7,25,27],[51,20,7,25,27],[51,20,7,25,27],[51,20,7,25,27],[51,20,7,25,27],[51,20,7,25,27],[51,20,7,25,27],[51,20,7,25,27],[51,20,7,25,27],[51,20,7,25,27],[51,20,7,25,27],[51,20,7,25,27],[51,20,7,25,27],[51,20,7,25,27],[51,20,7,25,27],[51,20,7,25,27],[51,20,7,25,27],[51,20,7,25,27],[51,20,7,25,27],[51,20,7,25,27]]"
    Then pointer down "c_spinButton.parent"

  Scenario: Show Total win
    When "c_twLoopTop_1" is visible
    Then pointer up "c_spinButton.parent"
    Then wait 3000
    Then make screenshot

  Scenario: Reload game
    Given locales "zh-cn,zh-tw,ja,ko,vi,km,ms,id,th,es,pt,ru,de,sv,it,da,ro"
    Then reload
