/**
 * Created by Phan on 9/6/2016.
 */
function ManagerForDebugHTML(my){
    this.start = function(){
        if(my.currentGameSlot.s_oBonusToRestore.bonus_step == null){
            my.currentGameSlot.manager4Network.callGetSpin(my.currentGameSlot.s_szRealPlayKey !== null ? my.currentGameSlot.s_szRealPlayKey : my.currentGameSlot.s_szFunPlayKey,
                function () {
                    _oInterface.onSpinAborted();
                });
            return;
        }
        switch(my.currentGameSlot.s_oBonusToRestore.bonus_id){
            case 2:
                var aHistory = my.currentGameSlot.s_oBonusToRestore.history;
                var currentIndex = 1;
                if(aHistory!=null){
                    var lastIndex = 0;
                    for (var i = 0; i < aHistory.length; i++) {
                        lastIndex = aHistory[i].select;
                    }
                    currentIndex = lastIndex + 1;
                    if(currentIndex>5) currentIndex = 1;
                }
                console.log("Start calling bonus at " + currentIndex);
                my.currentGameSlot.s_oGame.chooseBonusFreeSpin(currentIndex);
                break;
            default:
                break;
        }
    };
    this.onDoubleUpStep1Received = function(iFinish, iResult, iTotWin){
        Lobby.Utils.printConsoleLog("$onDoubleUpStep1Received");
    };
    this.onBonusFreeSpinStep1Received = function(iFinish, totalFreeSpins, totalMulty, aWheels){
        Lobby.Utils.printConsoleLog("$onBonusFreeSpinStep1Received");
    };
    this.onBonusFreeSpinStepReceived = function(iRemainingFreeSpin, iMultyFS, aWinPosition, aWheels, aTableWin, iTotWin){
        Lobby.Utils.printConsoleLog("$onBonusFreeSpinStep1Received");
    };
    this.onBonusLotionStep1Received = function(iFinish, aWheels){
        Lobby.Utils.printConsoleLog("$onBonusFreeSpinStepReceived");
    };
    this.onSpinReceived = function(aWheels, aWinPosition, aTableWin, _iCurBonus, aBonusPos){
        Lobby.Utils.printConsoleLog("$onSpinReceived");
        if(_iCurBonus > 0){
            my.afterSpinHandle(null, null, true);
            launchBonus(_iCurBonus);
        }else{
            my.afterSpinHandle();
        }

    };
    var launchBonus = function(_iBonusActive){
        switch (_iBonusActive) {
            case 2:
            {

                break;
            }
            case 3:
            {

                break;
            }
            case 4:
            {

                break;
            }
        }
    }
}