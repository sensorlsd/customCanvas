Feature: Title Shot localization


  # Running all steps and generating screenshots
  Scenario: Wait for loading bar
    When "c_loaderBar" is visible
    Then wait 500
    

  Scenario: Wait for play button
    When "c_playBtn" is visible
    
    Then click "c_playBtn.button"
    Then wait 1000

  Scenario: Open Paytable
    When "c_paytableBtn" is visible
   
    Then click "c_paytableBtn"
    Then wait 200
    Then click "c_nextBtn"
    Then wait 200
    Then click "c_nextBtn"
    Then wait 200
    Then click "c_nextBtn"
    Then wait 200
    Then click "c_nextBtn"
    Then wait 200
    Then click "c_nextBtn"
    Then wait 200
    Then click "c_closeBtn"
    
   Scenario: spin 
     
     Then send cheat "[[0,10,20,41,78,58,12,0,0,0,0,0,3,3,0,0,2,9,0,4,0,0,3,0,0,0,0,0,0,0,3,0,0,1],[51,10],[8],[8]]"
     Then emit "mousedown" to "c_spinController" with data "{}"
     Then emit "mouseup" to "c_spinController" with data "{}"
     Then wait 1000
     Then emit "mousedown" to "c_spinController" with data "{}"
     Then emit "mouseup" to "c_spinController" with data "{}"
     Then wait 1000
     Then emit "mousedown" to "c_spinController" with data "{}"
     Then emit "mouseup" to "c_spinController" with data "{}"
     Then wait 1000
     Then emit "mousedown" to "c_spinController" with data "{}"
     Then emit "mouseup" to "c_spinController" with data "{}"
     #c_spinController.emit('mousedown')
     
    
       
    
    
    
    
    
    
    
    
    
    
    
    
    
    
    
    
    
    
    
    
   