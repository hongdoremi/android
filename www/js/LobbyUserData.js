/**
 * Created by Phuoc Tran on 10/24/2015.
 */
(function () {

    var root = this;

    'use strict';

    function define() {

        var LobbyUserData = {};
        LobbyUserData.comebackBonus = null;
        LobbyUserData.checkLoginSameDay = 0;
        LobbyUserData.checkLoginNotFacebookAccount = null;
        LobbyUserData.lastTimeLogin = 0;
        LobbyUserData.dataTutorial = {
            name : "",
            isCanGetPreRewardTutorial : false,
            isCanPlayTutorial : false,
            isCanSpinTutorial : false,
            currentStep : 0,
            isPlayingTutorial : false,
            isFirstLogin : 0,
            isCreateUserFromThisDevice : 0,
            infoSpin : "",
            isClickSpin : false,
            isCompleteSuccessTutorialRequest : 0
        };
        return LobbyUserData;
    }

    if (typeof (LobbyUserData) === 'undefined') {
        window.LobbyUserData = define();
    }
    else {
        console.log("LobbyUserData already defined.");
    }

})(this);