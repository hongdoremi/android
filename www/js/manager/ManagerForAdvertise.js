/**
 * Created by Phan on 9/1/2016.
 */
var ManagerForAdvertise = new function(){
    var that = this;

    /**
     * disable button get freecoin
     * @param my
     */
    this.blurBtnFreeCoin = function (my) {
        if (my.popupContainer.popupShop != ""
            && Lobby.Utils.objectNotNull(my.popupContainer.popupShop.btnFreeCoin)) {
            my.popupContainer.popupShop.btnFreeCoin.tint = 0x777777;
            my.popupContainer.popupShop.btnFreeCoin.textBtn.tint = 0x958E8E;
        }
    };

    /**
     * set up advertise and init handle
     * @param my
     */
    this.setup = function(my){
        if (Lobby.Utils.isWeb())
            return;
        //Setup adcolony
        var setupAddColony = function () {
            var appId = "app5da0b1d06a614b8a8f";
            var fullScreenAdZoneId = "0";
            var rewardedVideoAdZoneId = "vz9536a932b875420fb0";
            var customId = my._userData.profile.id;
            //android
            if (!Lobby.Utils.isIOS()) {
                appId = "app5da0b1d06a614b8a8f";
                fullScreenAdZoneId = "0";
                rewardedVideoAdZoneId = "vz9536a932b875420fb0";
            } else {
                //ios
                appId = "app3dbef1d2bd0543e189";
                fullScreenAdZoneId = "0";
                rewardedVideoAdZoneId = "vz96f47c283dbb4a6dab";
                customId = customId.toString();
            }
            window.adcolony.setUp(appId, fullScreenAdZoneId, rewardedVideoAdZoneId, customId);
        };
        setupAddColony();

        var isShowLoadingAnimation = false;
        var blurBtnFreeCoin = function () {
            if (my.popupContainer.popupShop != ""
                && Lobby.Utils.objectNotNull(my.popupContainer.popupShop.btnFreeCoin)) {
                my.popupContainer.popupShop.btnFreeCoin.tint = 0x777777;
                my.popupContainer.popupShop.btnFreeCoin.textBtn.tint = 0x958E8E;
            }
        };

        window.adcolony.onRewardedVideoAdLoaded = function () {
            //alert('onRewardedVideoAdLoaded');
            if (my.popupContainer.popupShop != ""
                && Lobby.Utils.objectNotNull(my.popupContainer.popupShop.btnFreeCoin)) {
                my.popupContainer.popupShop.btnFreeCoin.tint = 0xFFFFFF;
                my.popupContainer.popupShop.btnFreeCoin.textBtn.tint = 0xFFFFFF;
            }
        };
        window.adcolony.onRewardedVideoAdShown = function () {
            //turn off music
            my.pauseBackgroundMusic();
            window.name = "off";
            if (my.playingGame === LobbyConstant.isInGame) {
                LobbyC.GameSlot.turnOffMusic();
            }else{
                my.pauseBackgroundMusic();
            }
            blurBtnFreeCoin();
            //alert('onRewardedVideoAdShown');
        };
        window.adcolony.onRewardedVideoAdHidden = function () {
            //alert('onRewardedVideoAdHidden');
            //turn on music
            isShowLoadingAnimation = true;
            my.showLoadingAnimation();
            ManagerForOrientation.resetOrientation(true,false,my);
            setTimeout(function()
            {
                if(isShowLoadingAnimation)
                    my.hideLoadingAnimation();
            }, 5000);

            window.name = "on";
            if (my._userSetting.backgroundMusic == "1") {
                if(my.playingGame === LobbyConstant.isInGame){
                    LobbyC.GameSlot.turnOnMusic();
                }else{
                    my.resumeBackGroundMusic();
                }
            }

            blurBtnFreeCoin();
        };
        window.adcolony.onRewardedVideoAdCompleted = function () {
            blurBtnFreeCoin();
            isShowLoadingAnimation = false;
            my.hideLoadingAnimation();
            //alert('onRewardedVideoAdCompleted');
            //var reload
            if(!LobbyConfig.isTestAlgorithmMode) {
                my.showNotificationPopup(
                    my.selectlanguage.popup_gift_success.text,
                    my.selectlanguage.free_coin.received + " 50,000" + my.selectlanguage.popup_voucher_description.text2,
                    function (event) {

                        var x = event.clientX;
                        var y = event.clientY;
                        var posOfMouse = Lobby.Utils.posHTMLToPosLobby({x: x, y: y});

                        my.playAllAnimationCoinAndUpdateHeader(0, null, null, posOfMouse);
                        LobbyC.MainMenu.updateUserInfoFromSV(
                            function () {

                            },
                            function () {
                            },
                            false // isGetStatisticData
                        );
                    }
                );
            }else{
                var log = "Free Coin see advertise 50,000" + " -> at " + Lobby.Utils.getCurrentTimestampAndConvert2String();
                console.log(log);
            }
        };
    };

    /**
     * show freecoin video
     * @param my
     */
    this.showVideo = function(my){
        window.adcolony.showRewardedVideoAd();
        setTimeout(function(){
            if(!window.adcolony.isShowingRewardedVideoAd()){
                LobbyC.MainMenu.adcolonySetupEvents();
                that.blurBtnFreeCoin(my);
                if(!LobbyConfig.isTestAlgorithmMode) {
                    my.showNotificationPopup(my.selectlanguage.free_coin.title,
                        my.selectlanguage.free_coin.play_fail);
                }
            }
        }, 3000);
    };

    /**
     * get freecoin without show video :just for simulate on web
     */
    this.showVideoForTest = function(callback){
        if(!LobbyConfig.isTestAlgorithmMode){
            return;
        }
        if(LobbyConfig.numberOfCollectFreecoinForTest >= LobbyConfig.maxNumberShowFreeVideo){
            if(LobbyConfig.durationFromLastWatchVideo >= 10*60*60*1000){
                LobbyConfig.numberOfCollectFreecoinForTest = 0;
            }
            return;
        }

        LobbyConfig.durationFromLastWatchVideo = 0;

        // call get free coin
        Manager4DebugTestAlgorithm.simulateVideo(
            function(isSuccess){
                if(isSuccess === true) {
                    LobbyC.MainMenu.updateUserInfoFromSV(
                        function () {
                        },
                        function () {
                        },
                        false // isGetStatisticData
                    );
                    var log = "Free Coin see advertise 50,000" + " -> at " + Lobby.Utils.getCurrentTimestampAndConvert2String();
                    if (LobbyConfig.isShowDetailLogForTestAlgorithmMode) {
                        console.log(log);
                    }
                    Manager4DebugTestAlgorithm.addDebug2Log(log);

                    if (Lobby.Utils.objectNotNull(callback)) {
                        callback();
                    }
                    LobbyConfig.freeCoinVideo += 50000;
                    LobbyConfig.tsWatchVideo += 30000;
                    LobbyConfig.numberOfCollectFreecoinForTest++;
                }
            }
        );
    }
};