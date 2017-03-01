/**
 * Created by Duy on 10/13/2016.
 */

LobbyC.LuckyWheel = (function (my) {
    my.groupLuckyWheel = null;

    my.wheel = null;

    my.init = function (userData) {
        my._userData = userData;
        my.wheel = {
            ui: null,
            info: []
        };

        my.luckyWheelSpins = LobbyConfig.additionalInfo.luckyWheel.remainingSpin;

        if(!Lobby.Utils.isIOS() &&
            !Lobby.Utils.isWeb()) {
            window.navigationbar.hideNavigationBar();
        }
        my.groupLuckyWheel = my.add.group();
        my.world.sendToBack(my.groupLuckyWheel);
        Lobby.PhaserJS.scaleGroupForOptimize(my.groupLuckyWheel,true);
        if(LobbyConfig.isDestroyWorldFromMainMenu2GameSlot) {
            LobbyC.MainMenu.popupManager = my.add.group();
            ManagerForEvent.setIsBlockBackButton(false);
            LobbyC.MainMenu.showNewHeader(my.groupLuckyWheel);
            my.groupLuckyWheel.scale.setTo(LobbyConfig.scaleRatioEntireGame);
        }
        if(Lobby.Utils.objectNotNull(LobbyC.MainMenu) &&
            Lobby.Utils.objectNotNull(LobbyC.MainMenu.uiHeader)) {
            LobbyC.MainMenu.uiHeader.visible = true;
            LobbyC.MainMenu.btnFriend.visible = false;
            LobbyC.MainMenu.btnInfo.visible = false;
            LobbyC.MainMenu._maskBackBtn.visible = true;
            LobbyC.MainMenu.hideHeader();
        }
    };

    my.preload = function () {
        var background = my.add.sprite(0,0,"background-loading", null, my.groupLuckyWheel);

        //TEST
        my.createLuckyWheelUI();
        return;

        //Show Loading Image
        var loader = new CLoaderUI(my, my.groupLuckyWheel);
        loader.createLoader(1920/2, 980,"");

        //Preload UI and Sound
        //my.load.image(
        //    'loading-bar-background',
        //    'img/loading screen/loading-bar-ready.png' + LobbyConfig.resourceVersion
        //    //'img/loading screen/loading-bar-background.png'+ LobbyConfig.resourceVersion
        //);
        my.load.onLoadStart.addOnce(my.loadStart, my);
        my.load.onFileComplete.add(my.fileComplete, my);
        my.load.onLoadComplete.addOnce(my.loadComplete, my);
    };

    /**
     * Function call when start loading resources
     */
    my.loadStart = function () {
        Lobby.Utils.printConsoleLog('load LuckyWheel Start');
    };
    /**
     * Function call when a resource loaded
     * @param progress: current loading progress
     * @param cacheKey
     * @param success
     * @param totalLoaded
     * @param totalFiles
     */
    my.fileComplete = function (progress, cacheKey, success, totalLoaded, totalFiles) {
        if (progress > 98) {
            loader.setProgressText(100);
            return;
        }
        loader.setProgressText(progress);
    };
    /**
     * Function call when all resources loaded
     */
    my.loadComplete = function () {
        my.createLuckyWheelUI();
        if(Lobby.Utils.objectNotNull(my.loaderUI)) {
            my.loaderUI.destroy();
            my.loaderUI = null;

        }
        if(Lobby.Utils.isFunction(my.loadComplete)) {
            my.load.onLoadComplete.remove(my.loadComplete, my);
        }
    };

    my.initPackage = function(){
        var buyPackage = function(_package){
            var callbackBuy = function(){
                if (!Lobby.Utils.isWeb()){
                    if(cordova.platformId == "android") ManagerForPurchase.buyItem(LobbyC.MainMenu, LobbyConfig.ProductManager.Android[_package]);
                    else  ManagerForPurchase.buyItem(LobbyC.MainMenu, LobbyConfig.ProductManager.IOs[_package]);
                }
                else LobbyC.MainMenu.showNotificationPopup("Error","Platform not supported.");
            };

            callbackBuy();

        };

        LobbyC.MainMenu.createTestButton(50,150,"LuckyWheelP1",my.groupLuckyWheel,function(){
            buyPackage("LuckyWheelP1");
        },LobbyConfig.isTestPacketStrategy);
        LobbyC.MainMenu.createTestButton(50,250,"LuckyWheelP2",my.groupLuckyWheel,function(){
            buyPackage("LuckyWheelP2");
        },LobbyConfig.isTestPacketStrategy);
        LobbyC.MainMenu.createTestButton(50,350,"LuckyWheelP3",my.groupLuckyWheel,function(){
            buyPackage("LuckyWheelP3");
        },LobbyConfig.isTestPacketStrategy);
    };

    my.createLuckyWheelUI = function () {
        Lobby.PhaserJS.destroyAllChild(my.groupLuckyWheel);

        my.add.sprite(0,0,"background_red", null, my.groupLuckyWheel);


        my.initPackage();


        my.initWheelInfo();
        my.wheel.ui = Lobby.PhaserJS.createWheel(my,
            {
                posX: 800,
                posY: 450,
                spriteName: "spin_bg",
                parent: my.groupLuckyWheel
            },
            my.wheel.info,
            Phaser.Easing.Quadratic.Out
        );
        my.wheel.ui.scale.setTo(1/LobbyConfig.scaleRatioEntireGame);

        //DEBUG TEXT
        var text = my.add.text(200, 200, "0", {
            font: "60px PassionOne-Regular",
            fill: '#000000'
        }, my.groupLuckyWheel);

        my.reloadLuckyWheelSpins = function(luckyWheelSpin){
            my.luckyWheelSpins = luckyWheelSpin;
            my.wheel.remainingText.text = LobbyConfig.additionalInfo.luckyWheel.remainingSpin;
        };

        my.onLuckyWheelInfoReceived = function(data){
            var value = (data.coin_reward != 0 ? data.coin_reward: data.crown_reward);

            //DEBUG TEXT
            text.text = Lobby.Utils.formatCoinNumber(value) + ((data.crown_reward == 0) ? " coins" : " crown");

            my.wheel.ui.spinWheel(value, function(){
            }, function(){
                if(LobbyConfig.isDebug){
                    console.log("REWARD: " + value);
                }
                LobbyC.MainMenu.updateUserInfoFromSV();
                my.wheel.isSpining = false;
            }, 5000);
        };

        my.wheel.btnSpin = Lobby.PhaserJS.createSpriteRectangle(my,
            my.wheel.ui.x,
            my.wheel.ui.y,
            function(){
                if(my.wheel.isSpining){
                    return;
                }
                //TEST
                if(my.luckyWheelSpins <= 0){
                    my.showPopupBuySpins();
                }else {
                    my.wheel.isSpining = true;
                    LobbyRequest.User.spinLuckyWheel(function(isSuccess,data, response){
                        if(!isSuccess){
                            my.handleFailResultNewStrategy(response,null,true,false);
                            return;
                        }
                        LobbyConfig.additionalInfo.luckyWheel.coinReward = data.coin_reward;
                        LobbyConfig.additionalInfo.luckyWheel.crownReward = data.crown_reward;
                        LobbyConfig.additionalInfo.luckyWheel.remainingSpin = data.remaining_spin;

                        my.reloadLuckyWheelSpins(LobbyConfig.additionalInfo.luckyWheel.remainingSpin);
                        my.onLuckyWheelInfoReceived(data);
                    });
                }
            },
            function(){

            },
            function(){

            },
            false,
            my.groupLuckyWheel,
            LobbyConfig.isDebug,
            "btn-spin"
        );
        my.wheel.btnSpin.anchor.setTo(0.5);

        my.wheel.btnBuy = Lobby.PhaserJS.createSpriteRectangle(my,
            LobbyConfig.width - 200,
            LobbyConfig.height - 150,
            function(){
                //Show popup buy spins
                my.showPopupBuySpins();
            },
            function(){

            },
            function(){

            },
            false,
            my.groupLuckyWheel,
            LobbyConfig.isDebug,
            "btn-spin"
        );
        my.wheel.btnBuy.anchor.setTo(0.5);

        my.wheel.remainingText = my.add.text(200, LobbyConfig.height - 150, '0', {
            font: "60px PassionOne-Regular",
            fill: '#000000'
        }, my.groupLuckyWheel);
        var posY = 200;
        for(var i = 0;i<LobbyConfig.luckyWheelRewardInfo.length;i++){
            my.add.text(1050,posY,LobbyConfig.luckyWheelRewardInfo[i].name + ":"+LobbyConfig.luckyWheelRewardInfo[i].info,{
                font: "35px PassionOne-Regular",
                fill: '#fefefe'
            },my.groupLuckyWheel);
            posY +=50;
        }

        my.wheel.remainingText.text = LobbyConfig.additionalInfo.luckyWheel.remainingSpin;
        my.wheel.remainingText.anchor.setTo(0.5);
        //TEST
        my.reloadLuckyWheelSpins(my.luckyWheelSpins);

        LobbyC.MainMenu.showHeader();

        if(LobbyConfig.isTestAlgorithmMode && LobbyC.MainMenu.simulateLuckyWheel){
            LobbyC.MainMenu.simulateLuckyWheel.autoSpin();
        }
    };

    my.showPopupBuySpins = function(){
        if(LobbyConfig.enablePopupHtml
            && Lobby.Utils.objectNotNull(LobbyC.MainMenu.popupHtml)){
            LobbyC.MainMenu.popupHtml.showBuySpinsPopupHtml();
            //***************RETURN*****************
            return;
        }
    };

    my.initWheelInfo = function(){
        var aWheelValue = [];

        if(LobbyConfig.luckyWheelRewardInfo){
            aWheelValue.push(LobbyConfig.luckyWheelRewardInfo[0].reward);
            aWheelValue.push(LobbyConfig.luckyWheelRewardInfo[5].reward);
            aWheelValue.push(LobbyConfig.luckyWheelRewardInfo[2].reward);
            aWheelValue.push(LobbyConfig.luckyWheelRewardInfo[1].reward);
            aWheelValue.push(LobbyConfig.luckyWheelRewardInfo[0].reward);
            aWheelValue.push(LobbyConfig.luckyWheelRewardInfo[4].reward);
            aWheelValue.push(LobbyConfig.luckyWheelRewardInfo[0].reward);
            aWheelValue.push(LobbyConfig.luckyWheelRewardInfo[3].reward);
            aWheelValue.push(LobbyConfig.luckyWheelRewardInfo[2].reward);
            aWheelValue.push(LobbyConfig.luckyWheelRewardInfo[1].reward);
        }else {
            aWheelValue.push(200000);
            aWheelValue.push(5);
            aWheelValue.push(600000);
            aWheelValue.push(400000);
            aWheelValue.push(200000);
            aWheelValue.push(3000000);
            aWheelValue.push(200000);
            aWheelValue.push(1000000);
            aWheelValue.push(600000);
            aWheelValue.push(400000);
        }

        my.wheel.info = [];
        for(var i = 0; i < aWheelValue.length; i++){
            my.wheel.info.push({
                angle: i * 360/aWheelValue.length,
                value: aWheelValue[i]
            });
        }
    };
    my.update = function(){
        if(Lobby.Utils.objectNotNull(my.loaderUI)) {
            my.loaderUI.update();
        }
    };
    my.shutdown = function () {
        //ManagerForImage.clearAllDataCache(my);
        //
        //if (Lobby.Utils.objectNotNull(Manager4Sound.listSoundInGame)) {
        //    var i = Manager4Sound.listSoundInGame.length; while (i--) {
        //        ManagerForSound.stop(my, Manager4Sound.listSoundInGame[i]);
        //        ManagerForSound.unloadSound(my, Manager4Sound.listSoundInGame[i]);
        //    }
        //}
        //Manager4Sound = {};
        my.wheel = null;
        if (Lobby.Utils.objectNotNull(my.groupLuckyWheel)) {
            my.groupLuckyWheel.destroy();
        }
    };
    return my;
}(LobbyC.LuckyWheel || {}));
