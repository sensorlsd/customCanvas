Feature: FortuneCase screenshots
    
Scenario: Api during loading
    When api is available
    When event "ExternalEvent.GAME_LOADED" is dispatched
    Then call api "playButtonClick"
    Then wait 1000
    
Scenario: Check game controls
    Then expect api call "getTurboMode" to have value "undefined"
    Then expect api call "isAutoSpinsActive" to have value "false"
    Then expect api call "isContinuousSpinsActive" to have value "false"
    Then expect api call "isUntilFeature" to have value "false"
    
Scenario: Check currency
    Then expect api call "getCurrency" to have value "USD"
    Then expect api call "getCurrencySymbol" to have value "$"
    Then expect api call "getBalance" to have value "10000"
    Then expect api call "getCoinValue" to have value "0.02"
    Then expect api call "getTotalBet" to have value "1"
    Then call api "decreaseBet"
    Then expect api call "getTotalBet" to have value "0.5"
    Then call api "increaseBet"
    Then expect api call "getTotalBet" to have value "1"
    Then call api "showPaytable"
    Then wait 1000
    Then call api "hidePaytable"
    Then call api "spin"
    
    Then call api "pause"
    Then wait 4000
    Then call api "unpause"
    When event "ExternalEvent.ROUND_ENDED" is dispatched