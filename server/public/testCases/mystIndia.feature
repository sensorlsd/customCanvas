Feature: FortuneCase screenshots


  # Running all steps and generating screenshots
  Scenario: Wait for loading bar
    When "c_loading" is visible
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
    Then scroll paytable by 28
    Then make screenshot
    Then scroll paytable by 35
    Then make screenshot
    Then scroll paytable by 40
    Then make screenshot
    Then click "c_cancelButton"
    
    Scenario: Cheat for Pickup Bonus
    Then send cheat "[[82,40,11,41,45]]"
    Then click "c_spinButton.parent"
    Then wait 1000
    Then click "c_spinButton.parent"
    
    Scenario: Getting click to start
    When "c_clickToStartText" is visible
    Then wait 1500
    Then make screenshot
    Then click "c_spinButton.parent"
    
    Scenario: First bonus screenshot
      When "c_cookieBtn_0" is visible
      Then wait 2000
      Then make screenshot
      Then send cheat "[[1]]"
      Then click "c_cookieBtn_0"
      Then wait 3000
       Then send cheat "[[1]]"
      Then click "c_cookieBtn_1"
      Then wait 3000
       Then send cheat "[[1]]"
      Then click "c_cookieBtn_2"
      Then wait 3000
       Then send cheat "[[1]]"
      Then click "c_cookieBtn_3"
      Then wait 3000
       Then send cheat "[[1]]"
      Then click "c_cookieBtn_4"
      
    Scenario: closing bonus
      When "c_collectBtn" is visible
      Then wait 3000
      Then make screenshot
      Then click "c_collectBtn"
      Then wait 3000
      
       
       Scenario: Trigger 5oak and Mega win
    Then send cheat "[[22,9,59,7,6]]"
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
    
    Scenario: trigger free games
      Then send cheat "[[12,16,22,62,5]]"
      Then click "c_spinButton.parent"
      
      Scenario: capture free games
        When "c_clickToStartText" is visible
        Then wait 2000
        Then make screenshot
        Then click "c_spinButton.parent"
        Then wait 1000
        Then make screenshot
        Then send cheat "[[10,7,16,2,0]]"
        
        Scenario: extra free games
          When "c_FreeGamesExtra" is visible
          Then wait 1000
          Then make screenshot
          Then pointer down "c_spinButton.parent"
          
          Scenario: Show Total win
    When "c_totalWinText" is visible
    Then pointer up "c_spinButton.parent"
    Then wait 3000
    Then make screenshot
    
    Scenario: Reload game
    Given locales "zh-cn,zh-tw,ja,ko,vi,km,ms,id,th,es,pt,ru,de,sv,it,da,ro"
    Then reload
     
        
    