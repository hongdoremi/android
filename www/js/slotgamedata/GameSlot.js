/**
 * Created by Duy on 7/6/2016.
 */
var settings;
var Manager4Sound;
var ManagerForDebug;
/**
 * FIRST CALSS TO BE CALLED WHEN USER GO TO SLOT GAME, MANAGER SLOT GAME PHASER STATE
 */
LobbyC.GameSlot = (function (my) {
    my.currentGameId = "";
    my.currentGameSlot = null;
    my.currentSoundTrack = "";
    my.loaderUI = null;
    my.gameSlotData = {
        finishLoadingBonus: false,
        receivedBonusData: false,
        arrayPositionReelStart: {
            easeInBack: {
                reel1: [211.3, 206.5, 199.6, 191.1, 181.9, 172.6, 164, 156.9, 152, 150, 151.7, 157.7, 168.9, 186.1,
                    209.8, 240.9, 280, 328, 385.6, 453.5, 532.5, 623.2, 726.5, 843, 843, -338.5],
                reel2: [841.26, 836.54, 829.57, 821.10, 811.86, 802.59, 794.03, 786.92, 782, 780, 781.67, 787.75,
                    798.96, 816.06, 839.77, 870.85, -350, -302, -244.4, -176.5, -97.5, -6.8, 96.5, 213, 213, 291.75]
            }
        },
        arrayPositionReelStop: {
            easeOutBack: {
                reel1: [-247.2, -106.5, 7.8, 98, 166.6,
                    216.2, 249.3, 268.3, 275.7, 274, 265.7, 253.4, 239.5, 226.4, 216.8],
                reel2: [382.8, 523.5, 637.8, 728, 796.6,
                    846.2, -380.7, -361.8, -354.3, -356, -364.2, -376.6, -390.5, -403.6, -413.2]
            },
            easeOutElastic: {
                reel1: [98.3, 435, 326.5, 148.6, 134.4, 204.6,
                    234, 214.4, 195.4, 197.3, 205.9, 208, 205.1, 203.2, 203.8
                ],
                reel2: [731.3, 1068, 959.5, 781.6, 767.4, 837.6,
                    867, 847.4, 828.4, 830.3, 838.9, 841, 838.1, 836.2, 836.8]
            }
        },
        movingReelSpeed : 79.15
    };
    my.scaleGameSlot = 1920/LobbyConfig.realWidth;

    var loader;
    var isWaitToAutoSpinAfterReload;

    var iCount;
    var iDelay;
    var bUpdate;
    //var isClearAlgorithmTestLogUI;



    /**
     * Initialize
     * @param gameId: current Game ID
     * @param userData: Object - User data
     * @param gameSlotGroup: Group - parent group contains slot game group
     * @returns {{}|*} Object - current Slot Game
     */
    my.init = function (gameId, userData, gameSlotGroup) {
        bUpdate = true;
        gameSlotGroup = null;

        my.managerForAutoGameSlot = new ManagerForAutoGameSlot(my);
        my.currentGameId = gameId;
        my._userData = userData;

        if(!Lobby.Utils.isIOS() &&
            !Lobby.Utils.isWeb()) {
            window.navigationbar.hideNavigationBar();
        }
        if (Lobby.Utils.objectIsNull(gameSlotGroup)) {
            gameSlotGroup = my.add.group();
            my.world.sendToBack(gameSlotGroup);
            var group = my.add.group();
            Lobby.PhaserJS.scaleGroupForOptimize(gameSlotGroup,true);
            if(LobbyConfig.isDestroyWorldFromMainMenu2GameSlot) {
                LobbyC.MainMenu.popupManager = my.add.group();
                ManagerForEvent.setIsBlockBackButton(false);
                LobbyC.MainMenu.showNewHeader(group);
                group.scale.setTo(LobbyConfig.scaleRatioEntireGame);
            }
            if(Lobby.Utils.objectNotNull(LobbyC.MainMenu) &&
                Lobby.Utils.objectNotNull(LobbyC.MainMenu.uiHeader)) {
                LobbyC.MainMenu.uiHeader.visible = true;
                LobbyC.MainMenu.btnFriend.visible = false;
                LobbyC.MainMenu.btnInfo.visible = true;
                LobbyC.MainMenu._maskBackBtn.visible = true;
                LobbyC.MainMenu.hideHeader();
            }
        }
        LobbyC.MainMenu.isClickedButtonInHeader = false;
        my.gameSlotGroup = gameSlotGroup;


        switch (my.currentGameId) {
            case"deepblue":
                settings = new SettingsDB();
                Manager4Sound = new Manager4SoundDBClass();
                break;
            case "goldenegg":
                settings = new SettingsGE();
                Manager4Sound = new Manager4SoundGEClass();
                break;
            case "nezha":
                settings = new SettingsLN();
                Manager4Sound = new Manager4SoundLNClass();
                break;
            case "pharaoh":
                settings = new SettingsPO();
                Manager4Sound = new Manager4SoundPOClass();
                break;
            case "boxing":
                settings = new SettingsBO();
                Manager4Sound = new Manager4SoundBOClass();
                break;
            case "romanempire":
                settings = new SettingsRE();
                Manager4Sound = new Manager4SoundREClass();
                break;
            //   break;
        }
        my.currentPayLine = settings.NUM_PAYLINES;
        Manager4Sound.listSoundInGame = [];
        return my.currentGameSlot;
    };
    if (LobbyConfig.isDebug || LobbyConfig.isTestAlgorithmMode) {
        my.render = function (){
            if(LobbyConfig.isTestAlgorithmMode){
                var betMode = "MINIUM";
                if(LobbyConfig.isMediumBet) betMode = "MEDIUM";
                else if(LobbyConfig.isMaxBet) betMode = "MAXIMUM";
                else if(Lobby.Utils.objectNotNull(LobbyConfig.expectedBet)) betMode = "EXPECTED "+LobbyConfig.expectedBet;
                if(LobbyConfig.isFixedBet) betMode += " FIX";
                else betMode += " SOFT";
                var testServerLocal = Lobby.Utils.getParameterFromCurrentURL("testServerLocal");
                var testGame = LobbyConfig.testGame;
                my.game.debug.text("LEVEL:" + ((my._userData.profile.level + 1).toString() || '--'), 2, 14, "#00ff00");
                my.game.debug.text("BET MODE: " + betMode, 2, 28, "#00ff00");
                my.game.debug.text("TEST GAME: " + LobbyConfig.testGame, 2, 42, "#00ff00");
                if(typeof(testServerLocal) !== "undefined")my.game.debug.text("SERVER:" + testServerLocal || '--', 2, 56, "#00ff00");
            }else {
                my.game.debug.text("FPS:" + my.time.fps || '--', 2, 14, "#00ff00");
            }
        };
    }
    /**
     * Preload state function of Phaser
     */
    my.preload = function () {
        if (LobbyConfig.isDebug) {
            my.time.advancedTiming = true;
        }
        loader = new Phaser.Loader(my);
        loader.onLoadComplete.addOnce(my.createGame);
        switch (my.currentGameId) {
            case "deepblue":
                ManagerForImage.loadSprite(loader, 'bg-loading', 'img/slotgamedata/deepblue/sprites/bg-loading.jpg?' + LobbyConfig.versionDisplay, true);
                ManagerForImage.loadSprite(loader, 'pre-loader', 'img/slotgamedata/deepblue/sprites/preloader_anim.png?' + LobbyConfig.versionDisplay, true);
                break;
            case "goldenegg":
                ManagerForImage.loadSprite(loader, 'bg-loading', 'img/slotgamedata/goldenegg/sprites/bg-loading.jpg?' + LobbyConfig.versionDisplay, true);
                ManagerForImage.loadSprite(loader, 'pre-loader', 'img/slotgamedata/goldenegg/sprites/preloader_anim.png?' + LobbyConfig.versionDisplay, true);
                break;
            case "nezha":
                ManagerForImage.loadSprite(loader, 'bg-loading', 'img/slotgamedata/legendofnezha/sprites/bg-loading.jpg?' + LobbyConfig.versionDisplay, true);
                ManagerForImage.loadSprite(loader, 'pre-loader', 'img/slotgamedata/legendofnezha/sprites/preloader_anim.png?' + LobbyConfig.versionDisplay, true);
                break;
            case "pharaoh":
                ManagerForImage.loadSprite(loader, 'bg-loading', 'img/slotgamedata/pharaoh/sprites/bg-loading.jpg?' + LobbyConfig.versionDisplay, true);
                ManagerForImage.loadSprite(loader, 'pre-loader', 'img/slotgamedata/pharaoh/sprites/preloader_anim.png?' + LobbyConfig.versionDisplay, true);
                break;
            case "boxing":
                ManagerForImage.loadSprite(loader, 'bg-loading', 'img/slotgamedata/boxing/sprites/bg-loading.jpg?' + LobbyConfig.versionDisplay, true);
                ManagerForImage.loadSprite(loader, 'pre-loader', 'img/slotgamedata/boxing/sprites/preloader_anim.png?' + LobbyConfig.versionDisplay, true);
                break;
            case "romanempire":
                ManagerForImage.loadSprite(loader, 'bg-loading', 'img/slotgamedata/romanempire/sprites/bg-loading.jpg?' + LobbyConfig.versionDisplay, true);
                ManagerForImage.loadSprite(loader, 'pre-loader', 'img/slotgamedata/romanempire/sprites/preloader_anim.png?' + LobbyConfig.versionDisplay, true);
                break;
            default:
                return;
        }
        loader.start();

        if(LobbyConfig.isTestAlgorithmMode) {
            my.createGroupTestAlgorithmUI();
            //isClearAlgorithmTestLogUI = false;
        }
    };
    my.createDownloadName = function(){
        var downloadName = LobbyConfig.browserID + LobbyConfig.testGame +"_";
        if(LobbyConfig.expectedBet) downloadName += LobbyConfig.expectedBet + "_bet";
        else if(LobbyConfig.isMaxBet) downloadName += "max_bet";
        else if(LobbyConfig.isMediumBet) downloadName += "medium_bet";
        else downloadName += "minium_bet";
        if(LobbyConfig.isFixedBet) downloadName+="_fix";
        else downloadName+="_soft";
        if(LobbyConfig.isAutoLogin){
            my.fileExtension = 1;
        }
        downloadName += "_" + (my.fileExtension ? my.fileExtension : 1);
        return downloadName;
    };
    /**
     * Create test pay line group
     */
    my.createTestPayLineGroup = function(){
        //return;
        //if(my.groupEditPayLine!=null) my.groupEditPayLine.destroy();
        //my.currentPayLine = settings.NUM_PAYLINES;
        //my.groupEditPayLine = my.add.group();
        //var payLine = my.add.text(
        //    LobbyConfig.width - 200,
        //    LobbyConfig.height - 200,
        //    "Pay Line : " + my.currentPayLine,
        //    {
        //        font: "40px " + ConstantFontName.FONT_NAME_PassionOne_Regular,
        //        fill: "#ffffff"
        //    },
        //    my.groupEditPayLine
        //);
        //my.groupEditPayLine.payLineText = payLine;
        //var editPayLineBtn = Lobby.PhaserJS.createSpriteRectangleExt(
        //    my,
        //    LobbyConfig.width - 70,
        //    payLine.position.y+50,
        //    function () {
        //    },
        //    function () {
        //    },
        //    function () {
        //    },
        //    my.groupEditPayLine,
        //    LobbyConfig.isDebug,
        //    'popup_shop_coin_icon',
        //    function () {
        //        if(LobbyC.MainMenu.getCurrentUserProfileData().level+1 < LobbyConfig.unlockFeatureByLevelInfo.choosePayLine) {
        //            LobbyC.MainMenu.showNotificationPopup("More level","You need to reach level " + LobbyConfig.unlockFeatureByLevelInfo.choosePayLine +" to unlock this feature.");
        //            return;
        //        }
        //
        //            var payLine;
        //            if(Lobby.Utils.isWeb() ) {
        //                payLine = parseInt(window.prompt("PayLine must be positive and less than or equal "+settings.NUM_PAYLINES,"" + my.currentPayLine));
        //                if(isNaN(payLine) || payLine<0||payLine>settings.NUM_PAYLINES) return;
        //                my.currentPayLine = payLine;
        //                my.groupEditPayLine.payLineText.text = "Pay Line : " + my.currentPayLine;
        //            }
        //            else{
        //                navigator.notification.prompt("PayLine must be positive and less than or equal "+settings.NUM_PAYLINES, function(r){
        //                    payLine = parseInt(r.input1);
        //                    if(isNaN(payLine) || payLine<0||payLine>settings.NUM_PAYLINES) return;
        //                    my.currentPayLine = payLine;
        //                    my.groupEditPayLine.payLineText.text = "Pay Line : " + my.currentPayLine;
        //                },null,null,my.currentPayLine);
        //            }
        //
        //
        //    }
        //);
        ////editPayLineBtn.scale.setTo(1000,1000);
        //my.groupEditPayLine.scale.setTo(LobbyConfig.scaleRatioEntireGame);



    };
    /**
     * Deprecated
     * @param state
     * @param group
     * @param customScale
     */
    my.loadBGLoading = function(state,group,customScale){
        var bg = my.loadBG('bg-loading',group,customScale);
        if(my.currentGameId == "deepblue" && Lobby.Utils.is3x4Device()) {
            bg.x +=100;
        }
        return bg;
    };
    /**
     * Load BG function - manage to scale BG on multiple resolutions
     * @param id: sprite ID in cache
     * @param group: group contains
     * @param customScale: custom scale Value
     * @returns {*} a new Sprite that has been scale
     */
    my.loadBG = function(id,group,customScale){
        var bg = my.add.sprite(0,0, id, null, group);
        if(Lobby.Utils.objectIsNull(customScale)) customScale = 1;
        //if(ManagerForScale.is3x4resolution()){
        //    my.scaleCenterGroup(bg,1,bg);
        //    //bg.anchor.setTo(0.5,0.5);
        //    //bg.scale.setTo(ManagerForScale.getScale()*customScale);
        //    //bg.x+=(LobbyConfig.width*(my.scaleGameSlot))/2;
        //    //bg.y+=(LobbyConfig.height*(my.scaleGameSlot))/2;
        //
        //}else{
        bg.scale.setTo(customScale);
        //}
        return bg;
    };
    /**
     * Method help to scale Group in center for resolutions
     * @param group: group need to scale
     * @param customScale: custom scale Value
     */
    my.scaleCenterGroup = function(group,customScale,groupSize){
        //return;
        //if(ManagerForScale.is3x4resolution()){
        //    if(Lobby.Utils.objectIsNull(customScale)) customScale = 1;
        //
        //    var scale = ManagerForScale.getScale()*customScale;
        //    group.scale.setTo(scale);
        //
        //    var anchor = {x:0, y:0};
        //    if(Lobby.Utils.objectNotNull(group.anchor)){
        //        anchor = group.anchor;
        //    }
        //    my.adjustGroupPositionAfterScale(group,scale,groupSize,anchor);
        //
        //}

    };
    /**
     * Method help to scale Group in center for resolutions
     * @param group: group need to scale
     * @param customScale: custom scale Value
     */
    my.adjustGroupPositionAfterScale = function(group,scaleRatio,groupSize,groupAnchor){
        //return;
        if(ManagerForScale.is3x4resolution()){

            var anchor = {x:0, y:0};
            if(Lobby.Utils.objectNotNull(groupAnchor)){
                anchor = groupAnchor;
            }

            var width = 1920;//group.width;
            var height = 1080;//group.height;
            if(Lobby.Utils.objectNotNull(groupSize)){
                width = groupSize.width;
                height = groupSize.height;
            }
            var moveRatioX = width*(scaleRatio-1);
            var moveRatioY = height*(scaleRatio-1);
            var xMove = (0.5-anchor.x)*moveRatioX;
            var yMove = (0.5-anchor.y)*moveRatioY;
            group.x -= xMove;//settings.REEL_OFFSET_X;///my.scaleGameSlot;
            group.y -= yMove;//settings.REEL_OFFSET_Y;///my.scaleGameSlot;
        }

    };
    /**
     * Create Game function
     */
    my.createGame = function () {
        LobbyC.MainMenu.hideHeader();

        settings.DISABLE_SOUND_MOBILE = Lobby.Utils.getFromLocalStorage("backgroundMusic") != "1" ;
        my.currentSoundTrack = "";

        if(Lobby.Utils.isFunction(my.createGame)) {
            loader.onLoadComplete.remove(my.createGame, my);
        }
        //new CTweenController();
        var oData = {
            min_reel_loop: 1, //NUMBER OF REEL LOOPS BEFORE SLOT STOPS
            reel_delay: 0, //NUMBER OF FRAMES TO DELAY THE REELS THAT START AFTER THE FIRST ONE
            time_show_win: 2000, //DURATION IN MILLISECONDS OF THE WINNING COMBO SHOWING
            time_show_all_win: 800  //DURATION IN MILLISECONDS OF ALL WINNING COMBO
        };
        switch (my.currentGameId) {
            case"deepblue":
                my.currentGameSlot = new CMainDB(my, oData);
                break;
            case "goldenegg":
                my.currentGameSlot = new CMainGE(my, oData);
                break;
            case "nezha":
                my.currentGameSlot = new CMainLN(my, oData);
                break;
            case "pharaoh":
                my.currentGameSlot = new CMainPO(my, oData);
                break;
            case "boxing":
                my.currentGameSlot = new CMainBO(my, oData);
                break;
            case "romanempire":
                my.currentGameSlot = new CMainRE(my, oData);
                break;
            default:
                return;
        }
        //ManagerForDebug = new ManagerForDebugHTML(my);
        my.currentGameSlot._loadImages();
        my.currentGameSlot._initSounds();

        my.load.onLoadStart.add(my.currentGameSlot.loadStart, my);
        my.load.onFileComplete.add(my.currentGameSlot._onImagesLoaded, my);
        my.load.onLoadComplete.add(my.currentGameSlot.allResourcesLoaded, my);
        my.load.start();

        iCount = 0;
        iDelay = 1;
    };
    /**
     * Get current game bet per line array that user level allow to change
     * @returns {Array.<T>}
     */
    my.getCurrentGameAvailableBetPerLineArray = function(){
        var maxBetPerLine = my.getCurrentMaxBetPerLine();
        var currentBetArray = my.arrayBet.slice(0,my.arrayBet.indexOf(maxBetPerLine)+1);
        return currentBetArray;
    };
    /**
     * Return current game bet per line array
     */
    my.getGameBetPerLineArray = function(){
        var betArray = [];
        //if(LobbyConfig.isTestAlgorithmMode){
        //
        //    var nezhaArray = [];
        //    if(LobbyConfig.testGame){
        //        for (var i = 0; i < LobbyConfig.listBetSlotGame.length; i++) {
        //            if (LobbyConfig.listBetSlotGame[i].payLine == 30) {
        //                var value = LobbyConfig.listBetSlotGame[i].betSizePerLine * 30;
        //                if(LobbyC.MainMenu.getSlotCellByName(LobbyConfig.testGame).gameData.min_level > LobbyConfig.listBetSlotGame[i].levelRestriction &&
        //                    betArray.indexOf(LobbyConfig.listBetSlotGame[i].betSizePerLine) < 0)
        //                {
        //                    nezhaArray.push(LobbyConfig.listBetSlotGame[i].betSizePerLine);
        //                }
        //            }
        //        }
        //    }
        //}
        var tempDict = {};
        var gameId = my.getCurrentGameIdAsInt();
        var configList = LobbyConfig.payLineConfig[gameId];
        for(var i = 0;i<configList.length;i++){
            tempDict[configList[i].maxBetPerLine] = 0;
        }
        for(var key in tempDict){
            if(tempDict.hasOwnProperty(key)){
                betArray.push(parseInt(key));
            }
        }
        //if(LobbyConfig.isTestAlgorithmMode){
        //    return betArray.concat(nezhaArray);
        //}

        return betArray;
    };
    /**
     * #Thanh
     * Get current nearest bet allow base on current magic item type.
     * Return null if no nearest bet found
     */
    my.getNearestLowerBetLimitBaseOnCurrentMagicItem = function(){
        //var magicItemType = LobbyConfig.additionalInfo.magicItem.currentActiveItem;
        var magicItemType = 1;
        var magicItemLimit = LobbyConstant.MAGIC_ITEM_MONEY_LIMIT[magicItemType];
        return magicItemLimit;
    };
    /**
     * #Thanh
     * Reset current bet per line to allow limit
     * @param nearestLowerLimit
     */
    my.resetCurrentBetToAllowLimit = function(){
        var gameId = my.getCurrentGameIdAsInt();
        var magicItemLimit = my.getNearestLowerBetLimitBaseOnCurrentMagicItem();
        var configList = LobbyConfig.payLineConfig[gameId];
        var currentLevel =  LobbyC.MainMenu.getCurrentUserProfileData().level+1;
        my.nearestLowerLimit = {};
        for(var i = 0;i<configList.length;i++){
            if ((magicItemLimit !== null && configList[i].maxBetPerLine > magicItemLimit ) || configList[i].level > currentLevel) {
                break;
            }
            my.nearestLowerLimit.maxBetPerLine = configList[i].maxBetPerLine;
            my.nearestLowerLimit.maxPayLine = configList[i].maxPayLine;
            my.nearestLowerLimit.level = configList[i].level;
            my.nearestLowerLimit.thatLevel = currentLevel;
            my.nearestLowerLimit.gameId = gameId;
        }
        my.resetBetPerLineTo(my.nearestLowerLimit);
    };

    /**
     * #Thanh
     * Reset current bet to a limit
     * @param nearestLowerLimit
     */
    my.resetBetPerLineTo = function(nearestLowerLimit){
        my.nearestLowerLimit = nearestLowerLimit;
        var currentGame = LobbyC.GameSlot.getCurrentGame();
        if(currentGame!=null){
            currentGame.s_oGame.getFooter().reloadPayLine(null);
            currentGame.s_oGame.getFooter().reloadBet(nearestLowerLimit.maxBetPerLine);
        }
    };

    /**
     * Get nearest lower limit of current level
     * @returns {null|*}
     */
    my.getNearestLowerLimit = function(level){
        var currentLevel = level ? level : LobbyC.MainMenu.getCurrentUserProfileData().level+1;
        var gameId = my.getCurrentGameIdAsInt();
        var magicItemLimit = my.getNearestLowerBetLimitBaseOnCurrentMagicItem();
        if(Lobby.Utils.objectNotNull(my.nearestLowerLimit) &&
            my.nearestLowerLimit.thatLevel == currentLevel &&
            my.nearestLowerLimit.gameId == gameId &&
            (magicItemLimit === null || my.nearestLowerLimit.maxBetPerLine <= magicItemLimit)) {
            return my.nearestLowerLimit;
        }
        var configList = LobbyConfig.payLineConfig[gameId];
        my.nearestLowerLimit = {};
        for(var i = 0;i<configList.length;i++){
            if ((magicItemLimit !== null && configList[i].maxBetPerLine > magicItemLimit ) || configList[i].level > currentLevel) {
                break;
            }
            my.nearestLowerLimit.maxBetPerLine = configList[i].maxBetPerLine;
            my.nearestLowerLimit.maxPayLine = configList[i].maxPayLine;
            my.nearestLowerLimit.level = configList[i].level;
            my.nearestLowerLimit.thatLevel = currentLevel;
            my.nearestLowerLimit.gameId = gameId;
        }
        return my.nearestLowerLimit;
    };

    /**
     * Return current max bet per line for current level
     */
    my.getCurrentMaxBetPerLine = function(level){
        var info = my.getNearestLowerLimit(level);
        return info.maxBetPerLine;
    };
    /**
     * Return current max payline for current level
     */
    my.getCurrentMaxPayLine = function(){
        if(LobbyConfig.isTestAlgorithmMode && !LobbyConfig.isTestStrategyInAlgorithmMode){
            return settings.NUM_PAYLINES;
        }
        var info = my.getNearestLowerLimit();
        return info.maxPayLine;
    };
    my.getCurrentMinPayLine = function(){
        var gameId = my.getCurrentGameIdAsInt();
        var i = 0;
        var gamePayLineConfigList = LobbyConfig.payLineConfig[gameId];
        while(gamePayLineConfigList[i].maxPayLine == 0){
            i++;
        }

        var config = gamePayLineConfigList[i];
        return config.maxPayLine;
    };
    my.isLevelAllowToChangePayLine = function(){
        var currentLevel = LobbyC.MainMenu.getCurrentUserProfileData().level;
        return currentLevel + 1 >=  LobbyConfig.unlockFeatureByLevelInfo.choosePayLine;
    };
    /**
     * Get current game id as int, game id get from server in featureConfig/getAll
     */
    my.getCurrentGameIdAsInt = function(){
        if(my.currentGameSlot!=null) return my.currentGameSlot.GameConstant.gameIdInt;
        return -1;
    };
    /**
     * Get current game name
     */
    my.getCurrentGameName = function(){
        if(my.currentGameSlot!=null) return my.currentGameSlot.GameConstant.nameGame;
        return -1;
    };
    /**
     * Update function of Phaser
     */
    my.update = function () {
        if(!bUpdate){
            return;
        }
        //if(iCount >= iDelay) {
        //    iCount = 0;
        if (my.currentGameSlot && Lobby.Utils.objectNotNull(my.currentGameSlot._update)) {
            my.currentGameSlot._update();
        }
        if (Lobby.Utils.objectNotNull(my.loaderUI)) {
            try {
                my.loaderUI.update();
            } catch (ex) {
                if(LobbyConfig.isDebug) console.log(ex);
            }
        }
        //}
        //iCount++;
    };
    /**
     * Function called to prepare to go to Game
     */
    my.prepareGoToGame = function () {
        LobbyC.MainMenu.showHeader();

        if(my.currentGameSlot._oFooter){
            my.currentGameSlot._oFooter.group.parent.bringToTop(my.currentGameSlot._oFooter.group);
        }

        if(LobbyConfig.isTestStrategy) {
            LobbyC.MainMenu.magicItem.checkAndShowMagicItem(my.currentGameSlot._oFooter.group.parent);
        }

        //TEST BUTTON
        if(LobbyConfig.isTestStrategy) {
            my.maxPayLineButton = LobbyC.MainMenu.createTestButton(100, 150, "Max Payline - Off", my.currentGameSlot._oFooter.group.parent, function () {
                my.maxPayLineButton.isActive = !my.maxPayLineButton.isActive;
                my.maxPayLineButton.textBtn.text = my.maxPayLineButton.isActive ? "Max Payline - On" : "Max Payline - Off";
                my.currentGameSlot.s_iLines = my.maxPayLineButton.isActive ? settings.NUM_PAYLINES : my.currentPayLine;
                my.currentGameSlot._oFooter.reloadPayLine(my.currentGameSlot.s_iLines);
            }, LobbyConfig.isTestStrategy);
            my.maxPayLineButton.isActive = false;

            my.createAutoTestAlgorithm();
        }

        if(LobbyConfig.isTestAlgorithmMode && LobbyConfig.isAutoTest){
            my.testSpin(null,null,null,true);
        }
    };
    /**
     *
     */
    my.createAutoTestAlgorithm = function(){
        my.managerForAutoGameSlot.init(my.currentGameSlot._oFooter.group.parent);
    };
    my.autoFixBet = function(){
        if(my.managerForAutoGameSlot.autoChangeBetInfo && my.managerForAutoGameSlot.autoChangeBetInfo.isActive) {
            switch(my.managerForAutoGameSlot.autoChangeBetInfo.type){
                case "med":
                    my.currentGameSlot._oFooter.changeBetToMedium();
                    break;
                case "max":
                    my.currentGameSlot._oFooter.changeBetToMax();
                    break;
                case "expected":
                    my.currentGameSlot._oFooter.changeBetToExpectdBet(my.managerForAutoGameSlot.autoChangeBetInfo.bet);
                    break;
            }
        }
        if(my.managerForAutoGameSlot.autoDecreaseBet){
            while(my._userData.profile.coin < my.currentGameSlot.s_iTotBet){
                if(my.currentGameSlot.s_iMp == my.arrayBet[0]){
                    break;
                }else{
                    my.currentGameSlot._oFooter.adjustBet(-1);
                }
            }
        }
    };
    /**
     * Function called when begin loading bonus resources
     */
    my.onBeginLoadingBonus = function () {
        my.currentGameSlot.s_oGame.resetTestBonusResult();
        LobbyC.MainMenu.hideHeader();
        LobbyC.MainMenu.destroyCurrentCoinAnimation();
        LobbyC.MainMenu.isShowLevelUpPopup = false;
        if(LobbyC.MainMenu.updateHeaderCoinTween) {
            LobbyC.MainMenu.updateHeaderCoinTween.stop();
            var userCoin = my._userData.profile.coin;
            LobbyC.MainMenu._userCoinText.text = Helper.Number.formatNumber(userCoin>0?userCoin:0);
        }
    };
    /**
     * Function called after loading all bonus resources
     */
    my.onFinishLoadingBonus = function () {
        if(Lobby.Utils.objectNotNull(my.loaderUI)) {
            my.loaderUI.destroy();
        }
        LobbyC.MainMenu.updateUserInfoFromSV(function(){
        }, function(){

        }, false);
        LobbyC.MainMenu.showHeader();
        if(my.managerForAutoGameSlot.autoPlayBonus) {
            var stepBonus = Math.max(my.currentGameSlot.s_oGame.getStepBonus(), 1);
            if(stepBonus == 4){
                stepBonus = 5;
            }
            my.time.events.add(1000, function(){
                my.currentGameSlot.manager4Network.callBonus(stepBonus, 1);
            });
        }
    };
    my.callAutoPlayBonus = function(finish, arraySelected, select){
        if(my.managerForAutoGameSlot.autoPlayBonus) {
            if (!finish) {
                var stepBonus = my.currentGameSlot.s_oGame.getStepBonus();
                var param = -1;
                if(Lobby.Utils.objectNotNull(select)){
                    param = select;
                }else if(Lobby.Utils.objectNotNull(arraySelected)) {
                    param = my.getRandomParam(arraySelected);
                }
                if(param != -1) {
                    my.time.events.add(1000, function () {
                        my.currentGameSlot.manager4Network.callBonus(stepBonus, param);
                    });
                }
            }
        }
    };
    /**
     * Clear cache and slot game data before go to lobby
     */
    my.shutdown = function () {
        //ManagerForSound.clearSlotGameMusicCache(my);
        if(Lobby.Utils.objectNotNull(my.groupLogs)){
            my.groupLogs.destroy();
        }
        ManagerForImage.clearAllDataCache(my);
        bUpdate = false;

        try {
            my.currentGameSlot.gotoMenu();
        }catch(ex){

        }
        my.currentGameSlot = null;
        my.currentgameId = "";
        settings = null;
        my.gameSlotData.receivedBonusData = false;

        //my.cache.destroy();

        if (Lobby.Utils.objectNotNull(Manager4Sound.listSoundInGame)) {
            var i = Manager4Sound.listSoundInGame.length; while (i--) {
                ManagerForSound.stop(my, Manager4Sound.listSoundInGame[i]);
                ManagerForSound.unloadSound(my, Manager4Sound.listSoundInGame[i]);
            }
            //for (var i = 0; i < Manager4Sound.listSoundInGame.length; i++) {}
        }
        Manager4Sound = null;

        LobbyC.MainMenu.magicItem.destroyItemInGameSlot();

        if (Lobby.Utils.objectNotNull(my.gameSlotGroup)) {
            my.gameSlotGroup.destroy();
        }
    };
    /**
     * Check if User can spin
     * @returns {boolean}: true - User can spin
     */
    my.checkCanSpin = function () {
        if (Lobby.Utils.objectIsNull(my._userData) ||
            Lobby.Utils.objectIsNull(LobbyC.MainMenu) ||
            Lobby.Utils.objectIsNull(LobbyC.MainMenu._userCoinText)) {
            return true;
        }
        //if(!my.currentGameSlot.s_oGame._isCanSpin)
        //{
        //    if(my.currentGameSlot.s_oGame.isAutoSpin() &&
        //        Manager4State.getCurrentState() == my.currentGameSlot.GameConstant.State.MainGame){
        //        isWaitToAutoSpinAfterReload = true;
        //    }
        //    return false;
        //}

        if (LobbyC.MainMenu.isShowLevelUpPopup || my.currentGameSlot.s_oGame.getState() == settings.GAME_STATE_SPINNING) {
            return false;
        }

        my.autoFixBet();

        var missingCoin = my.currentGameSlot.s_iTotBet - Helper.Number.unFormatNumber(LobbyC.MainMenu._userCoinText.text);

        if (missingCoin > 0) {
            if(LobbyConfig.isTestStrategy
                && Lobby.Utils.objectNotNull(my.managerForAutoGameSlot)
                && my.managerForAutoGameSlot.autoCollectFCG
                ){
                my.managerForAutoGameSlot.onOutOfMoney();
                return false;
            }
            if (LobbyC.MainMenu.numberOfPopupLevelUp > 0) return;
            LobbyC.MainMenu.showMissingCoinOrCrownPopUp(LobbyConstant.BUY_MISSING_COIN_OR_CROWN_POPUP_TYPE_COIN, missingCoin);
            my.currentGameSlot.s_oGame.setAutoSpin(false);
            my.currentGameSlot.s_oGame.resetAfterSpin();
            my.currentGameSlot.s_oGame.setState(settings.GAME_STATE_IDLE);
            return false;
        }
        return true;
    };
    /**
     * Show popup slot Game's Info
     * @param scale4ReduceResolution: float
     */
    my.showGameInfo = function (scale4ReduceResolution) {
        if (my.currentGameSlot.s_iTotBet) {
            LobbyC.MainMenu.showPopupInfoSlotGame(my.arrayBet,
                my.currentGameSlot.s_iLines,
                my.currentGameSlot.s_iMp,
                my.currentGameSlot.infoPageArray,
                scale4ReduceResolution);
        }
    };



// START TEST ALGORITHM UI
    /**
     * Create group that show spin info (Test state)
     */
    my.createGroupTestAlgorithmUI = function(){
        if(!LobbyConfig.isTestAlgorithmMode){
            return;
        }
        my.groupLogs = my.add.group();
        my.currentDebugInfo = {};
        my.currentIndex = 0;
        //if(LobbyConfig.isShowLogOnScreenTestAlgorithmMode) {

        my.groupLogs.numberOfSpin = my.add.text(0, 250 + ManagerForScale.incrementHeight(), "", {
            font: "40px DIN-Bold",
            //font: "100px PassionOne-Regular",
            fill: "#FFFFFF",
            stroke: '#000000',
            strokeThickness: 5,
            align: "center"
        }, my.groupLogs);
        //my.groupLogs.width = 200;
        //my.groupLogs.height = 850;
        my.groupLogs.info = my.add.group();
        my.groupLogs.info.visible = false;
        my.groupLogs.add(my.groupLogs.info);
        my.groupLogs.info.x = 0;
        my.groupLogs.info.y = 280 + ManagerForScale.incrementHeight();
        my.game.kineticScrolling.start(my.groupLogs.info,
            true,
            false,
            50,
            0,
            0,
            0,
            my,
            null,
            null,
            null,
            null,
            null,
            {
                minX: ManagerForScale.incrementHeight(),
                minY: 350 + ManagerForScale.incrementHeight(),
                maxX: LobbyConfig.width + ManagerForScale.incrementHeight(),
                maxY: 750 + ManagerForScale.incrementHeight()
            });
        //}

        //my.groupLogs.info.scale.setTo(1/LobbyConfig.scaleRatioEntireGame);

        var _oButEditLevel = Lobby.PhaserJS.createSpriteRectangleExt(
            my,
            LobbyConfig.width - 70,
            170,
            function () {
            },
            function () {
            },
            function () {
            },
            my.groupLogs,
            LobbyConfig.isDebug,
            'popup_profile_edit_name',
            function () {
                //if(!LobbyConfig.isAutoTest) {
                try {
                    var nextLevel = parseInt(window.prompt("next stop level ", "" + my.nextStopLevel4TestAlgorithm));
                    if (isNaN(nextLevel)) {
                        return;
                    }
                    my.nextStopLevel4TestAlgorithm = nextLevel;
                    my.groupLogs.textNextLevel.text = "Stop Level : " + my.nextStopLevel4TestAlgorithm;
                } catch (e) {

                }
                //}
            }
        );
        if(!LobbyConfig.isAutoTest) {
            my.nextStopLevel4TestAlgorithm = my._userData.profile.level + 2;
        }else {
            if(LobbyConfig.isAutoChangeAccountWhenReachLevel30 === true){
                //if(Lobby.Utils.objectNotNull(LobbyConfig.simulateType)){
                    //if(LobbyConfig.simulateType == LobbyConfig.SIMULATE_ACCOUNT_TYPE_MAX_BET_SOFT ||
                    //    LobbyConfig.simulateType == LobbyConfig.SIMULATE_ACCOUNT_TYPE_MAX_BET_FIX ||
                    //    LobbyConfig.simulateType == LobbyConfig.SIMULATE_ACCOUNT_TYPE_LEVEL18_BET_SOFT ||
                    //    LobbyConfig.simulateType == LobbyConfig.SIMULATE_ACCOUNT_TYPE_LEVEL18_BET_FIX) {
                        my.nextStopLevel4TestAlgorithm = 30;
                    //}else{
                    //    my.nextStopLevel4TestAlgorithm = 25;
                    //}
                //}else {
                //    my.nextStopLevel4TestAlgorithm = 30;
                //}
            }else{
                my.nextStopLevel4TestAlgorithm = 1000000;
            }
        }
        my.nextStopOneLevel4TestAlgorithm = my._userData.profile.level+2;
        var nextLevel = my.add.text(
            _oButEditLevel.x - 250,
            _oButEditLevel.y,
            "Stop Level : " + my.nextStopLevel4TestAlgorithm,
            {
                font: "40px " + ConstantFontName.FONT_NAME_PassionOne_Regular,
                fill: "#000000"
            },
            my.groupLogs
        );
        my.groupLogs.textNextLevel = nextLevel;

        var btnShowLog = Lobby.PhaserJS.createSpriteRectangleExt(
            my,
            _oButEditLevel.x,
            _oButEditLevel.y - 70,
            function () {
            },
            function () {
            },
            function () {
            },
            my.groupLogs,
            LobbyConfig.isDebug,
            'popup_stardom_1',
            function () {
                my.groupLogs.info.visible = !my.groupLogs.info.visible;
            }
        );

        //var btnAllowExportExcel = Lobby.PhaserJS.createSpriteRectangleExt(
        //       my,
        //    _oButEditLevel.x - 70,
        //    _oButEditLevel.y - 70,
        //       function () {
        //       },
        //       function () {
        //       },
        //       function () {
        //       },
        //       my.groupLogs,
        //       LobbyConfig.isDebug,
        //       'popup_stardom_2',
        //       function () {
        //           my.allowDeleteTableAfterExportExcel = ! my.allowDeleteTableAfterExportExcel;
        //           if(my.allowDeleteTableAfterExportExcel) btnAllowExportExcel.alpha = 1;
        //           else btnAllowExportExcel.alpha = 0.5;
        //       }
        //   );
        var btnExportExcel = Lobby.PhaserJS.createSpriteRectangleExt(
            my,
            _oButEditLevel.x - 40,
            _oButEditLevel.y - 40,
            function () {
            },
            function () {
            },
            function () {
            },
            my.groupLogs,
            LobbyConfig.isDebug,
            'arrow_tutorial',
            function () {
                var endLevel = parseInt(window.prompt("Which level you want to end?", my._userData.profile.level + 1));
                my.fileExtension = parseInt(window.prompt("Extension number?", 1));
                Manager4ExportExcel.exportTable(LobbyConfig.testData4ExportExcel, endLevel);
                if(LobbyC.MainMenu.simulateStrategy &&
                    LobbyC.MainMenu.simulateStrategy.currentMagicItem){
                    LobbyC.MainMenu.simulateStrategy.currentMagicItem.export();
                }
                window.setTimeout(function () {
                    Manager4DebugTestAlgorithm.export2LogFile();
                },5000);
            }
        );
        if(LobbyConfig.isAutoLogin){
            my.fileExtension = Lobby.Utils.getRandomInRange(0,1000);
        }

        btnExportExcel.scale.setTo(0.3,0.3);
        btnExportExcel.angle = 180;
        btnExportExcel.anchor.setTo(0.5,0.5);

        var exportExcelText = my.add.text(
            btnExportExcel.x-150,
            btnExportExcel.y - 50,
            "Export excel\nlevel up",
            {
                font: "40px " + ConstantFontName.FONT_NAME_PassionOne_Regular,
                fill: "#ffffff"
            },
            my.groupLogs
        );

        var btnDownloadLog = Lobby.PhaserJS.createSpriteRectangleExt(
            my,
            btnExportExcel.x-200,
            btnExportExcel.y,
            function () {
            },
            function () {
            },
            function () {
            },
            my.groupLogs,
            LobbyConfig.isDebug,
            'arrow_tutorial',
            function () {
                Manager4DebugTestAlgorithm.export2LogFile();
            }
        );
        btnDownloadLog.scale.setTo(0.3,0.3);
        btnDownloadLog.angle = 180;
        btnDownloadLog.anchor.setTo(0.5,0.5);
        btnDownloadLog.tint = 0xAA0000;
        var btnDownloadLogText = my.add.text(
            btnDownloadLog.x-150,
            btnDownloadLog.y - 50,
            "Export spin\n     log",
            {
                font: "40px " + ConstantFontName.FONT_NAME_PassionOne_Regular,
                fill: "#ffffff"
            },
            my.groupLogs
        );
        if(Lobby.Utils.objectNotNull(LobbyConfig.expectedBet)){
            //var arrayBetAvailable = my.getArrayBetAvailable();
            //if(isNaN(LobbyConfig.expectedBet)||arrayBetAvailable.indexOf(LobbyConfig.expectedBet)<0){
            //    alert("Please enter right bet, the available bets are "+arrayBetAvailable.join(","));
            //    LobbyConfig.expectedBet = null;
            //}
            var selectIndexBet = Lobby.PhaserJS.createSpriteRectangleExt(
                my,
                btnDownloadLog.x-200,
                btnDownloadLog.y - 40,
                function () {
                },
                function () {
                },
                function () {
                },
                my.groupLogs,
                LobbyConfig.isDebug,
                'popup_profile_edit_name',
                function () {
                    //TO DO prompt select bet here

                    var expectedBet = prompt("Please enter expected bet here.");
                    //if(isNaN(expectedBet)|| arrayBetAvailable.indexOf(expectedBet)<0){
                    //    alert("Please enter right bet, the available bets are "+arrayBetAvailable.join(","));
                    //}
                    //else
                    LobbyConfig.expectedBet = parseInt(expectedBet);
                }
            );
            selectIndexBet.tint = 0xAA0000;
            var selectIndexBetText = my.add.text(
                selectIndexBet.x-150,
                selectIndexBet.y - 10,
                "Select bet",
                {
                    font: "40px " + ConstantFontName.FONT_NAME_PassionOne_Regular,
                    fill: "#ffffff"
                },
                my.groupLogs
            );
        }
        my.isStopAutoSpinTest = false;
        var _oButStop = Lobby.PhaserJS.createSpriteRectangleExt(
            my,
            _oButEditLevel.x-50,
            _oButEditLevel.y+ 60,
            function () {
            },
            function () {
            },
            function () {
            },
            my.groupLogs,
            LobbyConfig.isDebug,
            'btn_close_popup',
            function () {
                my.isStopAutoSpinTest = true;
            }
        );
        my.groupLogs.scale.setTo(LobbyConfig.scaleRatioEntireGame);

        my.numberOfBonus = 0;
        my.numberOfSpin = 0;
        my.totalBonusCount = 0;
        my.totalSpinInFreeSpin = 0;
        my.tsForRealTest = 0;

        my.tsForRealTestStrategy = 0;

        var today = Lobby.Utils.getCurrentTimestamp();
        my.previousTimestampLevelUp = today;

        //LobbyConfig.testData4ExportExcel =
        //[[
        //    "Totalbet","level","MoneyLevelUp","Achievement",
        //    "Bonus time","NumberOfSpin","NumberEnterBonus",
        //    "PreviousMoney","CurrentMoney","FreeCoins",
        //    "SimulateTime",
        //    "RealTime"]];
        my.previousCoin = my._userData.profile.coin;
        my.numberOfSpinFailContinously = 0;
        //my.usedBet = {};
        LobbyConfig.freeCoinVideo = 0;
        my.numberOfTimeNoMoney = 0;

    };
    my.getTimeSimulateForBonus = function(bonusId,step){

        if(step === 0){
            return 0;
        }
        switch (my.currentGameId) {
            case "deepblue":
                switch (bonusId){
                    case settings.BONUS_TYPE_FREESPIN:{
                        if(step == 1) {
                            return 15000; // time for play palace 15s
                        }
                        break;
                    }
                    case settings.BONUS_TYPE_FS_WITH_TRIGGER:{
                        my.totalSpinInFreeSpin++;
                        return LobbyConfig.timeBetween2SpinUI;
                    }
                }
                break;
            case "goldenegg":
                switch (bonusId) {
                    case settings.BONUS_TYPE_FREESPIN:
                    {
                        if (step == 1) {
                            return 15000; // time for play palace 15s
                        }
                        break;
                    }
                    case settings.BONUS_TYPE_FS_WITH_TRIGGER:
                    {
                        my.totalSpinInFreeSpin++;
                        return LobbyConfig.timeBetween2SpinUI;
                    }
                }
                break;
            case "nezha":
                switch (bonusId){
                    case settings.BONUS_TYPE_FREESPIN:{
                        my.totalSpinInFreeSpin++;
                        return LobbyConfig.timeBetween2SpinUI;
                    }
                    case settings.BONUS_TYPE_PALACE:{
                        if(step == 1) {
                            return 16000; // time for play palace 16s
                        }
                        break;
                    }
                    case settings.BONUS_TYPE_BATTLE:{
                        if(step == 1) {
                            return 23000; // time for play palace 23s
                        }
                        break;
                    }

                }
                break;
            case "pharaoh":
                switch (bonusId){
                    case settings.BONUS_TYPE_FREESPIN:{
                        my.totalSpinInFreeSpin++;
                        return LobbyConfig.timeBetween2SpinUI;
                    }
                    case settings.BONUS_TYPE_OPEN_DOOR:{
                        if(step == 1) {
                            return 16000; // time for play palace 16s
                        }
                        break;
                    }
                }
                break;
            case "boxing":
                switch (bonusId) {
                    case settings.BONUS_TYPE_FREESPIN:
                    {
                        my.totalSpinInFreeSpin++;
                        return LobbyConfig.timeBetween2SpinUI;
                    }
                }
                break;
            case "romanempire":
                switch (bonusId) {
                    case settings.BONUS_TYPE_FS_WITH_TRIGGER:
                    {
                        if(step == 1) {
                            return 16000; // time for play palace 16s
                        }
                        break;
                    }
                }
                break;
            //   break;
        }
        return 0;
    };
    my.increaseNumberOfBonus = function(bonusId,step){

        if(step === 0){
            return 0;
        }
        switch (my.currentGameId) {
            case "deepblue":
                switch (bonusId){
                    case settings.BONUS_TYPE_FREESPIN:{
                        break;
                    }
                    case settings.BONUS_TYPE_FS_WITH_TRIGGER:{
                        if(step === 1) {
                            my.numberOfBonus++;
                        }
                        break;
                    }
                }
                break;
            case "goldenegg":
                switch (bonusId) {
                    case settings.BONUS_TYPE_FREESPIN:
                    {
                        break;
                    }
                    case settings.BONUS_TYPE_FS_WITH_TRIGGER:
                    {
                        if(step === 1) {
                            my.numberOfBonus++;
                        }
                        break;
                    }
                }
                break;
            case "nezha":
                switch (bonusId){
                    case settings.BONUS_TYPE_FREESPIN:
                    case settings.BONUS_TYPE_PALACE:
                    case settings.BONUS_TYPE_BATTLE:{
                        if(step === 1) {
                            my.numberOfBonus++;
                        }
                        break;
                    }

                }
                break;
            case "pharaoh":
                switch (bonusId){
                    case settings.BONUS_TYPE_FREESPIN:
                    case settings.BONUS_TYPE_OPEN_DOOR:{
                        if(step === 1) {
                            my.numberOfBonus++;
                        }
                        break;
                    }
                }
                break;
            case "boxing":
                switch (bonusId) {
                    case settings.BONUS_TYPE_FREESPIN:
                    {
                        if(step === 1) {
                            my.numberOfBonus++;
                        }
                        break;
                    }
                }
                break;
            case "romanempire":
                switch (bonusId) {
                    case settings.BONUS_TYPE_FS_WITH_TRIGGER:
                    {
                        if(step === 1) {
                            my.numberOfBonus++;
                        }
                        break;
                    }
                }
                break;
            //   break;
        }
        return 0;
    };
    /**
     * get random param for test
     * @returns {*}
     */
    my.getRandomParam = function(arrayOfSelected){
        if(!LobbyConfig.isTestAlgorithmMode && !my.managerForAutoGameSlot.autoPlayBonus){
            return 0;
        }
        // param = 1,2,3,4
        var params = [];
        for(var param = 1; param <= 4; param++) {
            var haveParam = true;
            var i = arrayOfSelected.length;
            while (i--) {
                if (arrayOfSelected[i] == param) {
                    haveParam = false;
                    break;
                }
            }
            if (haveParam) {
                params.push(param);
            }
        }
        if(params.length == 0){
            return 0;
        }
        return params[Lobby.Utils.getRandomInRange(0,params.length-1)];
    };
    /**
     * show new spin info to screen (Test state)
     * @param win: spin Win
     * @param totalbet: spin total bet
     */
    my.addInfoToGroupLogs = function(win, totalbet,previousIsBonus,bonusType,step,winBonus,bonusName){
        if(LobbyConfig.isTestAlgorithmMode){
            if(Lobby.Utils.objectIsNull(previousIsBonus)){
                previousIsBonus = false;
            }

            var bonusInfo = "";
            if(previousIsBonus === true){
                bonusInfo += "Bonus Type: " + bonusType + ", ";
                bonusInfo += "Name: " + (bonusName?bonusName:"bonus") + ", ";
                bonusInfo += "Step : " + step + "\n";
                if(Lobby.Utils.objectNotNull(winBonus)){
                    win = winBonus;
                }
            }else{
                bonusInfo = "\n";
            }

            //my.currentIndex++;
            //if(LobbyConfig.isShowLogOnScreenTestAlgorithmMode) {
            var text = my.add.text(my.groupLogs.info.width, 0, "", {
                font: "30px DIN-Bold",
                //font: "100px PassionOne-Regular",
                fill: "#FFFFFF",
                stroke: '#000000',
                strokeThickness: 5,
                align: "center"
            }, my.groupLogs.info);
            text.x += my.currentIndex > 0 ? 50 : 0;
            //}

            my.currentIndex++;

            //if(LobbyConfig.isShowLogOnScreenTestAlgorithmMode) {
            my.groupLogs.numberOfSpin.text = "TOTAL SPINS:  " + my.currentIndex;
            text.text =
                my.currentIndex  + "\n" +
                "Balance:"+ Lobby.Utils.formatNumberWithCommas(my.currentGameSlot.s_iCredit)  + "" +
                bonusInfo +
                ", TOTAL BET: " + Lobby.Utils.formatNumberWithCommas(totalbet) + ", " +
                "WIN: " + Lobby.Utils.formatNumberWithCommas(win) + ", " +
                "RTP: " + Lobby.Utils.formatNumberWithCommas(my.currentDebugInfo.rtp) + "\n" +
                "USER COIN : " + Lobby.Utils.formatNumberWithCommas(my._userData.profile.coin) + "\n" +
                "USER'S REMAINING EXP: " + Lobby.Utils.formatNumberWithCommas(my._userData.profile.remaining_exp) + "\n" +
                "USER'S CURRENT EXP: " + Math.floor(my._userData.profile.expBar * 100).toString() + "% " + "\n" +
                "USER'S TOTAL CREDITS: " + Lobby.Utils.formatNumberWithCommas(my.currentDebugInfo.totalCredit) + "\n" +
                "GAME'S TOTAL CREDITS : " + Lobby.Utils.formatNumberWithCommas(my.currentDebugInfo.totalGameCreditGamePlay) + "\n" +
                "USER'S TOTAL DEBITS: " + Lobby.Utils.formatNumberWithCommas(my.currentDebugInfo.totalDebit) + "\n" +
                "GAME'S TOTAL DEBITS: " + Lobby.Utils.formatNumberWithCommas(my.currentDebugInfo.totalGameDebitGamePlay) + "\n" +
                "USER'S TOTAL LOSE: " + Lobby.Utils.formatNumberWithCommas(my.currentDebugInfo.totalLose) + "\n" +
                "GAME'S TOTAL LOSE: " + Lobby.Utils.formatNumberWithCommas(my.currentDebugInfo.totalLoseGamePlay) + "\n" +
                "USER'S TOTAL WIN: " + Lobby.Utils.formatNumberWithCommas(my.currentDebugInfo.totalWin) + "\n" +
                "GAME'S TOTAL WIN: " + Lobby.Utils.formatNumberWithCommas(my.currentDebugInfo.totalWinGamePlay) + ".";
            text.lineSpacing = -10;
            my.game.kineticScrolling.limit.maxX = my.groupLogs.info.width;
            //}

            var text = "TOTAL SPINS:  " + my.currentIndex + "\n" +
                "Balance:"+ Lobby.Utils.formatNumberWithCommas(my.currentGameSlot.s_iCredit)  + ""+
                bonusInfo +
                my.currentIndex + ", TOTAL BET: " + Lobby.Utils.formatNumberWithCommas(totalbet) + ", " +
                "WIN: " + Lobby.Utils.formatNumberWithCommas(win) + ", " +
                "RTP: " + Lobby.Utils.formatNumberWithCommas(my.currentDebugInfo.rtp) + "\n" +
                "USER COIN : " + Lobby.Utils.formatNumberWithCommas(my._userData.profile.coin) + "\n" +
                "USER'S REMAINING EXP: " + Lobby.Utils.formatNumberWithCommas(my._userData.profile.remaining_exp) + "\n" +
                "USER'S CURRENT EXP: " + Math.floor(my._userData.profile.expBar * 100).toString() + "% " + "\n" +
                "USER'S TOTAL CREDITS: " + Lobby.Utils.formatNumberWithCommas(my.currentDebugInfo.totalCredit) + "\n" +
                "GAME'S TOTAL CREDITS : " + Lobby.Utils.formatNumberWithCommas(my.currentDebugInfo.totalGameCreditGamePlay) + "\n" +
                "USER'S TOTAL DEBITS: " + Lobby.Utils.formatNumberWithCommas(my.currentDebugInfo.totalDebit) + "\n" +
                "GAME'S TOTAL DEBITS: " + Lobby.Utils.formatNumberWithCommas(my.currentDebugInfo.totalGameDebitGamePlay) + "\n" +
                "USER'S TOTAL LOSE: " + Lobby.Utils.formatNumberWithCommas(my.currentDebugInfo.totalLose) + "\n" +
                "GAME'S TOTAL LOSE: " + Lobby.Utils.formatNumberWithCommas(my.currentDebugInfo.totalLoseGamePlay) + "\n" +
                "USER'S TOTAL WIN: " + Lobby.Utils.formatNumberWithCommas(my.currentDebugInfo.totalWin) + "\n" +
                "GAME'S TOTAL WIN: " + Lobby.Utils.formatNumberWithCommas(my.currentDebugInfo.totalWinGamePlay) + ".";

            if(LobbyConfig.isShowDetailLogForTestAlgorithmMode) {
                console.log(text);
            }

            var textForLogFile =
                "TOTAL SPINS:" + my.currentIndex + "|" +
                "Balance:"+ Lobby.Utils.formatNumberWithCommas(my.currentGameSlot.s_iCredit)  + "|"+
                bonusInfo +
                my.currentIndex + "|"+"TOTAL BET:" + Lobby.Utils.formatNumberWithCommas(totalbet) + "|" +
                "WIN: " + Lobby.Utils.formatNumberWithCommas(win) + "|" +
                "RTP: " + Lobby.Utils.formatNumberWithCommas(my.currentDebugInfo.rtp) + "|"+
                "USER COIN : " + Lobby.Utils.formatNumberWithCommas(my._userData.profile.coin) + "|" +
                "USER'S REMAINING EXP: " + Lobby.Utils.formatNumberWithCommas(my._userData.profile.remaining_exp) + "|" +
                "USER'S CURRENT EXP: " + Math.floor(my._userData.profile.expBar * 100).toString() + "% " + "|" +
                "USER'S TOTAL CREDITS: " + Lobby.Utils.formatNumberWithCommas(my.currentDebugInfo.totalCredit) + "|" +
                "GAME'S TOTAL CREDITS : " + Lobby.Utils.formatNumberWithCommas(my.currentDebugInfo.totalGameCreditGamePlay) + "|" +
                "USER'S TOTAL DEBITS: " + Lobby.Utils.formatNumberWithCommas(my.currentDebugInfo.totalDebit) + "|" +
                "GAME'S TOTAL DEBITS: " + Lobby.Utils.formatNumberWithCommas(my.currentDebugInfo.totalGameDebitGamePlay) + "|" +
                "USER'S TOTAL LOSE: " + Lobby.Utils.formatNumberWithCommas(my.currentDebugInfo.totalLose) + "|" +
                "GAME'S TOTAL LOSE: " + Lobby.Utils.formatNumberWithCommas(my.currentDebugInfo.totalLoseGamePlay) + "|" +
                "USER'S TOTAL WIN: " + Lobby.Utils.formatNumberWithCommas(my.currentDebugInfo.totalWin) + "|" +
                "GAME'S TOTAL WIN: " + Lobby.Utils.formatNumberWithCommas(my.currentDebugInfo.totalWinGamePlay) + ""
                + " -> at " + Lobby.Utils.getCurrentTimestampAndConvert2String();
            Manager4DebugTestAlgorithm.addDebug2Log(textForLogFile);


        }


    };
    /**
     * check can stop auto test spin
     * @param isCallBonus     store for next auto spin
     * @param param             store for next auto spin
     * @returns {boolean}
     */
    my.checkForStopAutospin = function(isCallBonus,param){
        if(LobbyConfig.testGame &&
            LobbyConfig.testGame != my.currentGameId &&
            my._userData.profile.level+1 >= LobbyC.MainMenu.getSlotCellByName(LobbyConfig.testGame).gameData.min_level){

            my.time.events.add(100, function(){
                LobbyC.MainMenu.returnToMainMenu(true, function(){
                    setTimeout(function() {
                        LobbyC.MainMenu.showGame(LobbyConfig.testGame);
                    }, 100);
                })
            });

            return true;
        }
        if(
            my._userData.profile.level+1 >= my.getNextLevelToStopAutospin()
            || my.isStopAutoSpinTest === true){
            my.currentGameSlot.s_oInterface.enableSpin();
            my.currentGameSlot.s_oInterface.showSpinBtn();
            my.isStopAutoSpinTest = false;
            my.paramWhenStop = {};
            my.paramWhenStop.param = param;
            my.paramWhenStop.isCallBonus = isCallBonus;
            my.paramWhenStop.gameId = my.currentGameId;
            if(my._userData.profile.level+2 > my.nextStopLevel4TestAlgorithm) {
                my.nextStopLevel4TestAlgorithm = my._userData.profile.level + 2;
                my.groupLogs.textNextLevel.text = "Stop Level : " + my.nextStopLevel4TestAlgorithm;

            }

            Manager4ExportExcel.exportTable(LobbyConfig.testData4ExportExcel);
            if(LobbyC.MainMenu.simulateStrategy &&
                LobbyC.MainMenu.simulateStrategy.currentMagicItem){
                LobbyC.MainMenu.simulateStrategy.currentMagicItem.export();
            }
            Manager4DebugTestAlgorithm.export2LogFile();
            if(LobbyConfig.isAutoLogin == true){ // auto change account after 5s
                window.setTimeout(function () {
                    if(Lobby.Utils.objectNotNull(LobbyConfig.simulateType)){
                        if(LobbyConfig.isFixedSimulateType){
                            LobbyConfig.browserID = Lobby.Utils.getRandomInRange(0,10000) +  "_";
                        }else {
                            LobbyConfig.simulateType++;
                            if (LobbyConfig.simulateType > 11) {
                                LobbyConfig.simulateType = 1;
                                LobbyConfig.browserID = Lobby.Utils.getRandomInRange(0, 10000) + "_";
                            }
                        }
                        var newURL = Lobby.Network.replaceParameterInCurrentURLWithValue("simulateType",LobbyConfig.simulateType);
                        newURL = Lobby.Network.replaceParameterInURLWithValue(newURL,"browserID",LobbyConfig.browserID);
                        window.location.href = newURL;
                    }
                },10000);

            }
            //isClearAlgorithmTestLogUI = true;
            return true;
        }else{
            return false;
        }
    };
    /**
     * return next level to stop game(check level need 2 stop to switch to game we need)
     */
    my.getNextLevelToStopAutospin = function(){
        if(!LobbyConfig.isTestAlgorithmMode){
            return 0;
        }
        return my.nextStopLevel4TestAlgorithm;
    };
    /**
     * get array bets from game nezha to test game
     * @returns {Array.<T>}
     */
    my.getArrayBetFromNezhaToTestGame = function(){
        var nezhaGameArrayNeeded = [];
        var testGameArray = my.getArrayBetByPayLine(my.getGamePayLine(LobbyConfig.testGame), LobbyConfig.testGame);
        testGameArray.splice(0,0,{value: 300 * 15, game: "nezha"});
        for (var i = 0; i < LobbyConfig.listBetSlotGame.length; i++) {
            if (LobbyConfig.listBetSlotGame[i].payLine == 30) {
                var value = LobbyConfig.listBetSlotGame[i].betSizePerLine;
                var level = LobbyC.MainMenu.getSlotCellByName(LobbyConfig.testGame).gameData.min_level;
                var payLine = level >= 3 ? 30 : 15;
                if(level > LobbyConfig.listBetSlotGame[i].levelRestriction &&
                    testGameArray.indexOf({value: value * payLine, game: "nezha"}) < 0)
                {
                    nezhaGameArrayNeeded.push({value: value * payLine, game: "nezha"});
                }
            }
        }
        for(var i = nezhaGameArrayNeeded.length - 1; i >= 0; --i){
            testGameArray.splice(1,0,nezhaGameArrayNeeded[i]);
        }

        return testGameArray;
    };
    /**
     * get Game PayLine by ID
     * @returns {Array.<T>}
     */
    my.getGamePayLine = function(gameID){
        var temp;
        switch (gameID) {
            case"deepblue":
                temp = new SettingsDB();
                break;
            case "goldenegg":
                temp = new SettingsGE();
                break;
            case "nezha":
                temp = new SettingsLN();
                break;
            case "pharaoh":
                temp = new SettingsPO();
                break;
            case "boxing":
                temp = new SettingsBO();
                break;
            case "romanempire":
                temp = new SettingsRE();
                break;
            //   break;
        }
        var payline = temp.NUM_PAYLINES;
        temp = null;
        return payline;
    };
    /**
     * get array title excel file game slots
     */
    my.getArrayTitleTotalBet = function(array){
        var newArray = [];
        for(var key in array){
            newArray.push("Total Bet " + key  + "(" + array[key].game + ")");
        }
        return newArray;
    };
    /**
     * get array title excel file game slots
     */
    my.getArrayTotalBet = function(){
        if(LobbyConfig.testGame){
            return my.getArrayBetFromNezhaToTestGame();
        }else {
            var arrayTotalBetTitle = [];
            arrayTotalBetTitle.push({
                value: LobbyConfig.listBetSlotGame[i].betSizePerLine * 15,
                game: my.currentGameId
            });
            for (var i = 0; i < LobbyConfig.listBetSlotGame.length; i++) {
                if (settings.NUM_PAYLINES == LobbyConfig.listBetSlotGame[i].payLine) {
                    arrayTotalBetTitle.push({
                            value: LobbyConfig.listBetSlotGame[i].betSizePerLine * settings.NUM_PAYLINES,
                            game: my.currentGameId
                        });
                }
            }
            return arrayTotalBetTitle;
        }
    };
    /**
     * Get array of all total bet available for current game
     */
    my.getArrayBetAvailable = function(){
        var allArrayBet = [];
        for (var i = 0; i < LobbyConfig.listBetSlotGame.length; i++) {
            if (settings.NUM_PAYLINES == LobbyConfig.listBetSlotGame[i].payLine) {
                allArrayBet.push(LobbyConfig.listBetSlotGame[i].betSizePerLine*settings.NUM_PAYLINES);
            }
        }
        return allArrayBet;
    };
    /**
     * Get array of all total bet available by game payline
     */
    my.getArrayBetByPayLine = function(payline, gameID){
        var allArrayBet = [];
        for (var i = 0; i < LobbyConfig.listBetSlotGame.length; i++) {
            if (payline == LobbyConfig.listBetSlotGame[i].payLine) {
                allArrayBet.push({
                    value: LobbyConfig.listBetSlotGame[i].betSizePerLine * payline,
                    game: gameID
                });
            }
        }
        return allArrayBet;
    };
    /**
     * Create used bet from array to bet
     */
    my.createUsedBet = function(){
        if(!LobbyConfig.isTestAlgorithmMode){
            return;
        }
        if(!my.arrayBet || my.arrayBet.length == 0){
            my.arrayBet = my.getArrayTotalBet();
        }
        my.usedBet = {};
        for (var i = 0; i < my.arrayBet.length; i++) {
            my.usedBet[my.arrayBet[i].value] = {};
            my.usedBet[my.arrayBet[i].value].value = 0;
            my.usedBet[my.arrayBet[i].value].game = my.arrayBet[i].game
        }
    };
    /**
     * Reload used bet from array to bet
     */
    my.reloadUsedBet = function(){
        if(!LobbyConfig.isTestAlgorithmMode){
            return;
        }
        for(var key in my.usedBet){
            my.usedBet[key].value = 0;
        }
    };
    /**
     * Parse used bet to info
     */
    my.parseUsedBet = function(){
        var usedBetInfo = [];
        for(var key in my.usedBet){
            usedBetInfo.push(my.usedBet[key].value);
        }
        return usedBetInfo;
    };
    /***
     * Calculate # of spin if 9k bet
     */
    my.calculate9kBet = function(){
        var sum = 0;
        var firstBet = 9000;
        //for (var i = 0; i < my.arrayBet.length; i++) {
        //    var totalBet =  my.arrayBet[i];
        //    sum += (totalBet/firstBet)*my.usedBet[my.arrayBet[i] * my.currentGameSlot.s_iLines].value;
        //}
        for(var key in my.usedBet){
            var totalBet =  key;
            sum += (totalBet/firstBet)*my.usedBet[key].value;
        }

        return Lobby.Utils.floatToIntOptimize(sum);
    };
    /**
     * Reload User's profile after spin and bonus
     */
    my.reloadProfileForTestSpin = function (isCallBonus,param,previousIsBonus,bonusType,step,winBonus,bonusName) {
        if(!LobbyConfig.isTestAlgorithmMode){
            return;
        }

        LobbyC.MainMenu.updateUserInfoFromSV(
            function () {
                LobbyC.MainMenu.updateUserInfoUIFromLocal();
                my.addInfoToGroupLogs(my.currentGameSlot.s_iCurWin, my.currentGameSlot.s_iTotBet,previousIsBonus,bonusType,step,winBonus,bonusName);
                //console.log("current level " + my._userData.profile.level+1);
                if(my._userData.profile.level+1 >= my.nextStopOneLevel4TestAlgorithm){
                    var currentCoin = my._userData.profile.coin;

                    var today = Lobby.Utils.getCurrentTimestamp();
                    var durationLevelUp = today - my.previousTimestampLevelUp;
                    my.previousTimestampLevelUp = today;

                    var usedBet = "(";

                    var averageTotalBet = 0;
                    var numberOfBet = 0;
                    var keysUsedBet = [];
                    for(var key in my.usedBet){
                        usedBet = usedBet + parseInt(key) + " " + my.usedBet[key].value + "lan;";
                        numberOfBet += parseInt(my.usedBet[key].value);
                        averageTotalBet += (parseInt(key)*parseInt(my.usedBet[key].value));
                    }
                    averageTotalBet /= numberOfBet;
                    usedBet+= ")";

                    var currentCoinWithoutHoursBonus = currentCoin - LobbyConfig.totalCoinOfCollectBonusHourWithoutReset;

                    var log =
                        "Pass level " + my.nextStopOneLevel4TestAlgorithm +
                        " coinRewardLevelUp:" + LobbyC.MainMenu.levelUpRewardCoin +
                        " crownRewardLevelUp:" + LobbyC.MainMenu.levelUpRewardCrown + "\n"+
                        " numberOfCollectBonusHour:" + LobbyConfig.numberOfCollectBonusHour +
                        " totalCoinOfCollectBonusHour:" + LobbyConfig.totalCoinOfCollectBonusHour + "\n"+

                        (LobbyC.MainMenu.simulateStrategy ? (
                        " numberOfCollectFreeCoinGift:" + LobbyC.MainMenu.simulateStrategy.freeCoinGift.currentCollected +
                        " totalCoinOfCollectFreeCoinGift:" + LobbyC.MainMenu.simulateStrategy.freeCoinGift.currentCoinReward + "\n"+
                        " numberOfCollectDailyBonusStreak:" + LobbyC.MainMenu.simulateStrategy.dailyBonusStreak.currentCollected +
                        " totalCoinOfCollectDailyBonusStreak:" + LobbyC.MainMenu.simulateStrategy.dailyBonusStreak.currentCoinReward + "\n"+
                        " numberOfCollectDailyChallenge:" + LobbyC.MainMenu.simulateStrategy.dailyChallenge.currentCollected +
                        " totalCoinOfCollectDailyChallenge:" + LobbyC.MainMenu.simulateStrategy.dailyChallenge.currentCoinReward + "\n"+
                        " numberOfCollectLuckyWheel:" + LobbyC.MainMenu.simulateStrategy.luckyWheel.currentCollected +
                        " totalCoinOfCollectLuckyWheel:" + LobbyC.MainMenu.simulateStrategy.luckyWheel.currentCoinReward + "\n"+
                        " numberOfCollectDailyBonusLuckySpins:" + LobbyC.MainMenu.simulateStrategy.dailyBonusSpin.currentCollected +
                        " totalCoinOfCollectDailyBonusLuckySpins:" + LobbyC.MainMenu.simulateStrategy.dailyBonusSpin.currentCoinReward + "\n"
                        ) : "") +

                        " numberOfCollectAchivement:" + LobbyConfig.numberOfCollectAchivement + "\n" +
                        " totalCoinOfCollectAchivement:" + LobbyConfig.totalCoinOfCollectAchivement + "(" + LobbyConfig.numberOfCollectAchivement + " lan)" +
                        " totalCrownOfCollectAchivement:" + LobbyConfig.totalCrownOfCollectAchivement + "\n"+
                        " totalBet:" + my.currentGameSlot.s_iTotBet + usedBet + "\n"+
                        " average totalBet:" + averageTotalBet + "\n"+
                        " numberOfSpin :" +my.numberOfSpin  +
                        " numberOfBonus:" + my.numberOfBonus  + "\n"+
                        " -> at " + Lobby.Utils.getCurrentTimestampAndConvert2String() + "\n"+
                        " totalFreeCoin Video :" + LobbyConfig.freeCoinVideo.toString() + "\n"+
                        " duration:" + Lobby.Utils.tsToStringByHourMinute(durationLevelUp) + "\n"+
                        " duration for real:" + Lobby.Utils.tsToStringByHourMinute(my.tsForRealTest) + "\n"+
                        " coin:" + currentCoin + "\n"+
                        " coin without bonus 30min:" + currentCoinWithoutHoursBonus + "\n"+
                        " ts Do Nothing:" + Lobby.Utils.tsToStringByHourMinute(LobbyConfig.tsDoNothing) + "\n"+
                        " ts Do Nothing Simulate:" + Lobby.Utils.tsToStringByHourMinute(LobbyConfig.tsDoNothingSimulate) + "\n"+
                        " ts Watch Video:" + Lobby.Utils.tsToStringByHourMinute(LobbyConfig.tsWatchVideo) +"\n"+
                        " total Bonus count: "+ my.totalBonusCount +
                        " # of Spins in FS: "+ my.totalSpinInFreeSpin;

                    var textForLogFile =
                        "Pass level " + my.nextStopOneLevel4TestAlgorithm +"|"+
                        "coinRewardLevelUp:" + LobbyC.MainMenu.levelUpRewardCoin+"|"+
                        "crownRewardLevelUp:" + LobbyC.MainMenu.levelUpRewardCrown +"|"+
                        "numberOfCollectBonusHour:" + LobbyConfig.numberOfCollectBonusHour +
                        "totalCoinOfCollectBonusHour:" + LobbyConfig.totalCoinOfCollectBonusHour +"|"+

                        (LobbyC.MainMenu.simulateStrategy ? (
                            " numberOfCollectFreeCoinGift:" + LobbyC.MainMenu.simulateStrategy.freeCoinGift.currentCollected  +
                            " totalCoinOfCollectFreeCoinGift:" + LobbyC.MainMenu.simulateStrategy.freeCoinGift.currentCoinReward  +"|"+
                            " numberOfCollectDailyBonusStreak:" + LobbyC.MainMenu.simulateStrategy.dailyBonusStreak.currentCollected +
                            " totalCoinOfCollectDailyBonusStreak:" + LobbyC.MainMenu.simulateStrategy.dailyBonusStreak.currentCoinReward  +"|"+
                            " numberOfCollectDailyChallenge:" + LobbyC.MainMenu.simulateStrategy.dailyChallenge.currentCollected +
                            " totalCoinOfCollectDailyChallenge:" + LobbyC.MainMenu.simulateStrategy.dailyChallenge.currentCoinReward  +"|"+
                            " numberOfCollectLuckyWheel:" + LobbyC.MainMenu.simulateStrategy.luckyWheel.currentCollected +
                            " totalCoinOfCollectLuckyWheel:" + LobbyC.MainMenu.simulateStrategy.luckyWheel.currentCoinReward  +"|"+
                            " numberOfCollectDailyBonusLuckySpins:" + LobbyC.MainMenu.simulateStrategy.dailyBonusSpin.currentCollected  +
                            " totalCoinOfCollectDailyBonusLuckySpins:" + LobbyC.MainMenu.simulateStrategy.dailyBonusSpin.currentCoinReward  +"|"
                        ) : "") +

                        "numberOfCollectAchivement:" + LobbyConfig.numberOfCollectAchivement +
                        "totalCoinOfCollectAchivement:" + LobbyConfig.totalCoinOfCollectAchivement + "(" + LobbyConfig.numberOfCollectAchivement + " lan)" +
                        "totalCrownOfCollectAchivement:" + LobbyConfig.totalCrownOfCollectAchivement +"|"+
                        "totalBet:" + my.currentGameSlot.s_iTotBet + usedBet +"|"+
                        "average totalBet:" + averageTotalBet +"|"+
                        "numberOfSpin :" +my.numberOfSpin  +"|"+
                        "numberOfBonus:" + my.numberOfBonus  +"|"+
                        "-> at " + Lobby.Utils.getCurrentTimestampAndConvert2String() +"|"+
                        "totalFreeCoin Video :" + LobbyConfig.freeCoinVideo.toString() +"|"+
                        "duration:" + Lobby.Utils.tsToStringByHourMinute(durationLevelUp) +"|"+
                        "duration for real:" + Lobby.Utils.tsToStringByHourMinute(my.tsForRealTest) +"|"+
                        "coin:" + currentCoin +"|"+
                        "coin without bonus 30min:" + currentCoinWithoutHoursBonus +"|"+
                        "ts Do Nothing:" + Lobby.Utils.tsToStringByHourMinute(LobbyConfig.tsDoNothing) +"|"+
                        "ts Do Nothing Simulate:" + Lobby.Utils.tsToStringByHourMinute(LobbyConfig.tsDoNothingSimulate) +"|"+
                        "ts Watch Video:" + Lobby.Utils.tsToStringByHourMinute(LobbyConfig.tsWatchVideo)
                        + " -> at " + Lobby.Utils.getCurrentTimestampAndConvert2String();

                    Manager4DebugTestAlgorithm.addDebug2Log(textForLogFile);

                    //LobbyC.GameSlot.getCurrentGame().s_oGame.getFooter().fixToTestBet();

                    //my.testData4ExportExcel =
                    //    [["Totalbet","level","MoneyLevelUp","Achievement","Bonus time","NumberOfSpin","NumberEnterBonus","PreviousMoney","CurrentMoney","FreeCoins",
                    // "SimulateTime()",
                    // "RealTime()"
                    var previousLevel = my.nextStopOneLevel4TestAlgorithm - 2;
                    while(previousLevel < my._userData.profile.level){
                        var reward = Helper.Level.getCoinAndCrownBonusWhenLevelUp(previousLevel, previousLevel + 1);
                        var coinsBonus = reward.coin;
                        var crownBonus = reward.crown;
                        if(LobbyConfig.isTestAlgorithmMode && Lobby.Utils.objectIsNull(LobbyConfig.testData4ExportExcel)){

                            var titleTable = [
                                    "level","Ave Total Bet","Level bonus","Ach. Bonus","Ach. Names","Ach. Collect",
                                    "30-min Bonus","30-min Bonus Collect","# of spins make","# of time get game bonus",
                                    "Initial wallet ($)","End Lvl wallet ($)","Video Bonus(30 minute between 2 videos)",
                                    "Time nxt lvl (min)",
                                    "# of out of money",
                                    "Total 30-minBonus",
                                    "End Lvl wallet(no bonus 30min)",
                                    "Simulate time",
                                    "Time Stamp Do nothing",
                                    "Time Stamp Do nothing simulate",
                                    "Time Stamp Watch Video",
                                    "Expected total Bet"
                                ];

                            if(LobbyC.MainMenu.simulateStrategy){
                                titleTable.splice(8, 0, LobbyC.MainMenu.simulateStrategy.dailyBonusWheel.name);
                                titleTable.splice(8, 0, LobbyC.MainMenu.simulateStrategy.dailyBonusSpin.name);
                                titleTable.splice(8, 0, LobbyC.MainMenu.simulateStrategy.luckyWheel.name);
                                titleTable.splice(8, 0, LobbyC.MainMenu.simulateStrategy.dailyChallenge.name);
                                titleTable.splice(8, 0, LobbyC.MainMenu.simulateStrategy.dailyBonusStreak.name);
                                titleTable.splice(8, 0, LobbyC.MainMenu.simulateStrategy.freeCoinGift.name);
                            }


                            titleTable = titleTable.concat(my.getArrayTitleTotalBet(my.usedBet));
                            var afterBetHeader = [
                                "Max tt bet current lvl",
                                "Total bonus step count",
                                "# of Spins in FS",
                                "Total Bet",
                                "# of spin if 9k bet",
                                "RTP coin"];
                            titleTable = titleTable.concat(afterBetHeader);

                            LobbyConfig.testData4ExportExcel =[titleTable];
                        }
                        var totalBet;
                        if(Lobby.Utils.objectNotNull(LobbyConfig.TotalBetForCurrentLevel)){
                            totalBet = LobbyConfig.TotalBetForCurrentLevel + usedBet;
                        }else
                            totalBet = my.currentGameSlot.s_iTotBet.toString() + usedBet;
                        var pushInfo =
                            [
                                //level
                                (previousLevel + 1),
                                //AverageTotalBet
                                Lobby.Utils.floatToIntOptimize(averageTotalBet).toString(),
                                //Level bonus
                                coinsBonus.toString(),
                                //Ach. Bonus
                                LobbyConfig.totalCoinOfCollectAchivement,
                                //Ach. Names
                                LobbyConfig.achievementCollectedName.join(" | "),
                                //Ach. Collect
                                LobbyConfig.numberOfCollectAchivement,
                                //30-min Bonus
                                LobbyConfig.totalCoinOfCollectBonusHour.toString(),
                                //30-min Bonus number of collected
                                LobbyConfig.numberOfCollectBonusHour.toString(),
                                //# of spins make
                                my.numberOfSpin.toString(),
                                //# of time get game bonus
                                my.numberOfBonus.toString(),
                                //Initial wallet ($)
                                my.previousCoin.toString(),
                                //End Lvl wallet ($)
                                currentCoin.toString(),
                                //Video Bonus
                                LobbyConfig.freeCoinVideo.toString(),
                                //Time nxt lvl (min)
                                Lobby.Utils.tsToStringByHourMinute(my.tsForRealTest,":"),
                                //# of out of money
                                my.numberOfTimeNoMoney,
                                //Total 30-minBonus
                                LobbyConfig.totalCoinOfCollectBonusHourWithoutReset,
                                //Ti�?n lúc sau(ko bonus 30min),
                                currentCoinWithoutHoursBonus.toString(),
                                //Simulate time
                                Lobby.Utils.tsToStringByHourMinute(durationLevelUp,":"),
                                //Time Stamp Do nothing
                                Lobby.Utils.tsToStringByHourMinute(LobbyConfig.tsDoNothing,":"),
                                //Time Stamp Do nothing
                                Lobby.Utils.tsToStringByHourMinute(LobbyConfig.tsDoNothingSimulate,":"),
                                //Time Stamp Watch Video
                                Lobby.Utils.tsToStringByHourMinute(LobbyConfig.tsWatchVideo,":"),
                                //Total bet
                                totalBet
                                //my.currentGameSlot.s_iTotBet.toString() + usedBet,                                                            //total bet
                                //averageTotalBet.toString(),                                                            //average total bet
                                //(previousLevel + 1) + " -"+(previousLevel+2).toString() + "lv",                                    //level
                                //coinsBonus.toString(),                                                       //MoneyLevelUp
                                //LobbyConfig.totalCoinOfCollectAchivement ,
                                //LobbyConfig.numberOfCollectAchivement,   //Achievement
                                //LobbyConfig.totalCoinOfCollectBonusHour.toString() + "(" + (LobbyConfig.numberOfCollectBonusHour) +"lan)",                                                               //Bonus time
                                //my.numberOfSpin.toString(),                                                                         //NumberOfSpin
                                //my.numberOfBonus.toString(),                                                                        //NumberEnterBonus
                                //my.previousCoin.toString(),                                                                         //PreviousMoney
                                //currentCoin.toString(),                                                                             //CurrentMoney
                                //currentCoinWithoutHoursBonus.toString(),                                                            //CurrentMoney Without HourBonus
                                //LobbyConfig.freeCoinVideo.toString(),                                                                                                //FreeCoins
                                //Lobby.Utils.tsToStringByHourMinute(durationLevelUp,":"),                                            //SimulateTime(hour)
                                ////Lobby.Utils.tsToStringByHourMinute(durationLevelUp,":","m"),                                            //SimulateTime(minute)
                                ////Lobby.Utils.tsToStringByHourMinute(durationLevelUp,":","s"),                                            //SimulateTime(second)
                                //Lobby.Utils.tsToStringByHourMinute(my.tsForRealTest,":") ,                                     //RealTime(hour)
                                ////Lobby.Utils.tsToStringByHourMinute(my.tsForRealTest,":","m"),                                     //RealTime(minute)
                                ////Lobby.Utils.tsToStringByHourMinute(my.tsForRealTest,":","s")                                      //RealTime(second)
                                //my.numberOfTimeNoMoney,                                                                        // number of time can't spin
                                //LobbyConfig.tsDoNothing,                                                                       //Time Stamp Do nothing
                                //LobbyConfig.tsWatchVideo                                                                                            //Ti�?n lúc sau(ko bonus 30min)
                            ];

                        if(LobbyC.MainMenu.simulateStrategy){
                            pushInfo.splice(8, 0, LobbyC.MainMenu.simulateStrategy.dailyBonusWheel.currentCoinReward);
                            pushInfo.splice(8, 0, LobbyC.MainMenu.simulateStrategy.dailyBonusSpin.currentCoinReward);
                            pushInfo.splice(8, 0, LobbyC.MainMenu.simulateStrategy.luckyWheel.currentCoinReward);
                            pushInfo.splice(8, 0, LobbyC.MainMenu.simulateStrategy.dailyChallenge.currentCoinReward);
                            pushInfo.splice(8, 0, LobbyC.MainMenu.simulateStrategy.dailyBonusStreak.currentCoinReward);
                            pushInfo.splice(8, 0, LobbyC.MainMenu.simulateStrategy.freeCoinGift.currentCoinReward);
                        }

                        var tempUserBet = my.parseUsedBet();
                        pushInfo = pushInfo.concat(tempUserBet);
                        var afterBetValue =[
                            //Max tt bet current lvl
                            LobbyConfig.lastTotalBet,
                            //Total bonus step count
                            my.totalBonusCount,
                            my.totalSpinInFreeSpin,
                            //Total Bet
                            Lobby.Utils.floatToIntOptimize(averageTotalBet) * my.numberOfSpin,
                            //# of spin if 9k bet
                            my.calculate9kBet(),
                            Math.floor(my.currentDebugInfo.totalLose*my.currentDebugInfo.rtp - my.currentDebugInfo.totalWin)
                        ];
                        pushInfo = pushInfo.concat(afterBetValue);
                        //pushInfo = pushInfo.concat(LobbyConfig.lastTotalBet);
                        //pushInfo = pushInfo.concat(my.totalBonusCount);
                        //pushInfo = pushInfo.concat(Lobby.Utils.floatToIntOptimize(averageTotalBet) * my.numberOfSpin);

                        LobbyConfig.testData4ExportExcel.push(pushInfo);

                        //Reset
                        LobbyConfig.totalCoinOfCollectAchivement = 0;
                        LobbyConfig.numberOfCollectAchivement = 0;
                        LobbyConfig.achievementCollectedName = [];
                        LobbyConfig.totalCoinOfCollectBonusHour = 0;
                        my.previousCoin = currentCoin;
                        LobbyConfig.freeCoinVideo = 0;
                        my.numberOfTimeNoMoney = 0;
                        LobbyConfig.tsDoNothing = 0;
                        LobbyConfig.tsDoNothingSimulate = 0;
                        LobbyConfig.tsWatchVideo = 0;
                        previousLevel++;

                        if(LobbyC.MainMenu.simulateStrategy){
                            LobbyC.MainMenu.simulateStrategy.resetAfterLevelUp();
                        }
                    }

                    console.log(log);
                    my.nextStopOneLevel4TestAlgorithm = my._userData.profile.level+2;
                    my.numberOfBonus = 0;
                    my.numberOfSpin = 0;
                    my.totalBonusCount = 0;
                    my.totalSpinInFreeSpin = 0;
                    my.tsForRealTest = 0;
                    LobbyConfig.numberOfCollectBonusHour = 0;
                    LobbyConfig.totalCoinOfCollectBonusHour = 0;
                    LobbyConfig.numberOfCollectAchivement = 0;
                    LobbyConfig.achievementCollectedName = [];
                    LobbyConfig.totalCoinOfCollectAchivement = 0;
                    LobbyConfig.totalCrownOfCollectAchivement = 0;
                    LobbyConfig.tsDoNothing = 0;
                    LobbyConfig.tsDoNothingSimulate = 0;
                    LobbyConfig.tsWatchVideo = 0;
                    //adjust bet to min,max or medium
                    //LobbyC.GameSlot.getCurrentGame().s_oGame.getFooter().fixToTestBet();
                    my.previousCoin = my._userData.profile.coin;
                    my.numberOfSpinFailContinously = 0;
                    //my.usedBet = {};
                    my.reloadUsedBet();
                    LobbyConfig.freeCoinVideo = 0;
                    my.numberOfTimeNoMoney = 0;

                    if(LobbyC.MainMenu.simulateStrategy){
                        LobbyC.MainMenu.simulateStrategy.resetAfterLevelUp();
                        LobbyC.MainMenu.simulateStrategy.checkAndCollectDailyChanllenge();
                    }
                }
                if(LobbyC.MainMenu.simulateStrategy){
                    LobbyC.MainMenu.simulateStrategy.checkAndPlayLuckyWheel(my._userData.profile.crown, function(){
                        if(!my.checkForStopAutospin(isCallBonus,param)){
                            my.testSpin(isCallBonus, param, bonusType,null,null,false);
                        }
                    });
                }else{
                    if(!my.checkForStopAutospin(isCallBonus,param)){
                        my.testSpin(isCallBonus, param, bonusType,null,null,false);
                    }
                }
            },
            function () {
            },
            false // isGetStatisticData
        );
    };

    my.addTime2RealTimeEstimate = function(time){
        my.tsForRealTest += time;

        if(LobbyC.MainMenu.simulateStrategy){
            LobbyC.MainMenu.simulateStrategy.updateTime(time);
            LobbyConfig.durationFromLastWatchVideo += time;
            Manager4DebugTestAlgorithm.checkForWatchVideo();
        }
        else {
            LobbyConfig.durationFromLastCollectBonusHours += time;
            LobbyConfig.durationFromLastWatchVideo += time;

            Manager4DebugTestAlgorithm.checkForCollectFreeCoinGift4Test();
            Manager4DebugTestAlgorithm.checkForWatchVideo();
        }
    };

    my.getMinWaitingTimeForVideoAnd30MinuteBonus = function(){

        var timeLeft4Bonus30Minute = LobbyConfig.time4CollectCoinOnProduction - LobbyConfig.durationFromLastCollectBonusHours;
        if(LobbyC.MainMenu.simulateStrategy){
            timeLeft4Bonus30Minute = LobbyC.MainMenu.simulateStrategy.freeCoinGift.remainingTime;
        }
        var timeLeft4WatchVideo = LobbyConfig.time4WatchVideoOnProduction - LobbyConfig.durationFromLastWatchVideo;

        var time4Wait = 60000; //1 minute
        if(timeLeft4WatchVideo < timeLeft4Bonus30Minute &&
            timeLeft4WatchVideo > 0 &&
            (LobbyConfig.numberOfCollectFreecoinForTest < LobbyConfig.maxNumberShowFreeVideo)){
            time4Wait = timeLeft4WatchVideo;
        }else{
            time4Wait = timeLeft4Bonus30Minute;
        }

        if(time4Wait<0){
            time4Wait = 0;
        }
        return time4Wait;
    };

    /**
     * Play test spin (test state)
     * @param isCallBonus: is Win Bonus
     */
    my.testSpin = function(isCallBonus,param,bonusType,isClickSpinBtn,wasFail,shouldCheckForStopAutoSpin){
        if(LobbyConfig.isTestAlgorithmMode) {
            if(isClickSpinBtn === true){
                var log = "Pass level " + (my._userData.profile.level+1) + " -> at " + Lobby.Utils.getCurrentTimestampAndConvert2String() + " coin:" + my._userData.profile.coin;
                console.log(log);
                my.isStopAutoSpinTest = false;
            }

            if(shouldCheckForStopAutoSpin !== false){
                if(my.checkForStopAutospin(isCallBonus,param)) {
                    return;
                }
            }

            if(Lobby.Utils.objectNotNull(my.paramWhenStop)){
                if(my.currentGameId === my.paramWhenStop.gameId){
                    isCallBonus = my.paramWhenStop.isCallBonus;
                    param = my.paramWhenStop.param;
                }
                my.paramWhenStop = null;
            }
            //if(isClearAlgorithmTestLogUI){
            //    Lobby.PhaserJS.destroyAllChild(my.groupLogs);
            //    my.game.kineticScrolling.limit.maxX = 50;
            //    isClearAlgorithmTestLogUI = false;
            //}
            my.currentGameSlot.s_oInterface.hideGui();
            my.currentGameSlot.s_oInterface.disableSpin();
            my.currentGameSlot.s_oInterface.hideSpinBtn();

            my.callbackSpinForTest = function(totalbet){
                var currentBet = totalbet;
                if(Lobby.Utils.objectIsNull(my.usedBet[currentBet])){
                    my.usedBet[currentBet] = {};
                    my.usedBet[currentBet].value = 1;
                    my.usedBet[currentBet].game = my.currentGameId;
                }else{
                    my.usedBet[currentBet].value++;
                    var log = "Increase spin counter for " + currentBet + " from " + (my.usedBet[currentBet].value - 1) + " to " + my.usedBet[currentBet].value +
                        "... " + " -> at " + Lobby.Utils.getCurrentTimestampAndConvert2String();
                    if(LobbyConfig.isShowDetailLogForTestAlgorithmMode){
                        console.log(log);
                    }
                    Manager4DebugTestAlgorithm.addDebug2Log(log);
                }
            };

            if(Lobby.Utils.objectIsNull(param)){
                param = 0;
            }
            if(my.currentGameSlot.s_oBonusToRestore){
                my.currentGameSlot.s_oGame.restorePreviousBonusResult();
                if(my.currentGameSlot.s_oGame.getStepBonus() == 0){
                    param = 0;
                }else{
                    param = my.currentGameSlot.s_oGame.getRandomParamFromPreviousBonusResult();
                }
                var stepBonus = my.currentGameSlot.s_oGame.getStepBonus();
                if(bonusType == null) bonusType = my.currentGameSlot.s_oBonusToRestore.bonus_id;
                my.addTime2RealTimeEstimate(my.getTimeSimulateForBonus(bonusType,stepBonus));
                my.increaseNumberOfBonus(bonusType,stepBonus);
                //if(stepBonus == 1){
                //    //var log = "BONUS -> at " + Lobby.Utils.getCurrentTimestampAndConvert2String();
                //    my.numberOfBonus++;
                //    //console.log(log);
                //}
                my.totalBonusCount++;
                my.currentGameSlot.manager4Network.callBonus(stepBonus, param);
                my.currentGameSlot.s_oBonusToRestore = null;
            }else if(isCallBonus){
                var stepBonus = my.currentGameSlot.s_oGame.getStepBonus();
                my.addTime2RealTimeEstimate(my.getTimeSimulateForBonus(bonusType,stepBonus));
                my.increaseNumberOfBonus(bonusType,stepBonus);
                //if(stepBonus == 1){
                //    //var log = "BONUS -> at " + Lobby.Utils.getCurrentTimestampAndConvert2String();
                //    my.numberOfBonus++;
                //    //console.log(log);
                //}
                my.totalBonusCount++;
                my.currentGameSlot.manager4Network.callBonus(stepBonus, param);
            }else {
                my.currentGameSlot.s_oGame.resetTestBonusResult();
                if(wasFail !== true) { // success
                    //if(!isClickSpinBtn){
                    // count for used bet
                    //}
                    LobbyC.GameSlot.getCurrentGame().s_oGame.getFooter().fixToTestBet();
                    if(my.wasFailCache === true){
                        my.wasFailCache = false;
                    }
                    my.addTime2RealTimeEstimate(LobbyConfig.timeBetween2SpinUI);
                    my.numberOfSpin++;
                    my.numberOfSpinFailContinously = 0;
                    my.currentGameSlot.manager4Network.callGetSpinForTest(my.currentGameSlot.s_szRealPlayKey !== null ? my.currentGameSlot.s_szRealPlayKey : my.currentGameSlot.s_szFunPlayKey);
                }else{ // spin fail
                    //my.tsForRealTest -= LobbyConfig.timeBetween2SpinUI;
                    //my.numberOfSpin--;
                    //if(my.wasFailCache !== true){
                    //    my.numberOfTimeNoMoney++;
                    //}
                    //spin failed so decrease time spin 50%
                    //LobbyConfig.tsDoNothing += LobbyConfig.timeBetween2SpinUI/4;
                    //my.addTime2RealTimeEstimate(LobbyConfig.timeBetween2SpinUI/4);

                    my.numberOfSpinFailContinously++;
                    LobbyC.GameSlot.getCurrentGame().s_oGame.getFooter().decreaseBet();
                    //console.log("can't spin anymore so we descrease bet to " + my.currentGameSlot.s_iTotBet);
                    my.wasFailCache = true;
                    var conditionForSpinFail = 8;
                    if(LobbyConfig.isFixedBet) conditionForSpinFail = 1;
                    if(my.numberOfSpinFailContinously >= conditionForSpinFail){ // Giam bet 8 lan. Neu truong hop fixed bet. Sua so 8 thanh so 1


                        // spin fail 8 times we delay to wait for hour bonus
                        if(my.numberOfSpinFailContinously >= (conditionForSpinFail+1)){
                            // spin fail 8 times we delay to wait for hour bonus
                            if(my.numberOfSpinFailContinously == (conditionForSpinFail+1)){
                                my.numberOfTimeNoMoney++;
                            }
                            var waitingTime = my.getMinWaitingTimeForVideoAnd30MinuteBonus();

                            LobbyConfig.tsDoNothing += waitingTime;
                            LobbyConfig.tsDoNothingSimulate += waitingTime*LobbyConfig.timeBetween2SpinLocalServer/LobbyConfig.timeBetween2SpinUI;
                            my.addTime2RealTimeEstimate(waitingTime);
                            var log = "Wait... " + " -> at " + Lobby.Utils.getCurrentTimestampAndConvert2String();
                            if(LobbyConfig.isShowDetailLogForTestAlgorithmMode){
                                console.log(log);
                            }
                            Manager4DebugTestAlgorithm.addDebug2Log(log);
                        }

                        var delayTime = 5000; //5s
                        LobbyC.MainMenu.updateUserInfoFromSV(
                            function () {
                            },
                            function () {
                            },
                            false // isGetStatisticData
                        );

                        setTimeout(function(){
                            my.currentGameSlot.manager4Network.callGetSpinForTest(my.currentGameSlot.s_szRealPlayKey !== null ? my.currentGameSlot.s_szRealPlayKey : my.currentGameSlot.s_szFunPlayKey);
                        },delayTime);


                    }else{
                        my.currentGameSlot.manager4Network.callGetSpinForTest(my.currentGameSlot.s_szRealPlayKey !== null ? my.currentGameSlot.s_szRealPlayKey : my.currentGameSlot.s_szFunPlayKey);

                    }
                }
            }
        }
    };

// END TEST ALGORITHM UI




    /**
     * Parse Spin Info from XMLDOC to Object (Test state)
     * @param oXmlDoc: XmlDoc received
     */
    my.parseDebugInfo = function(oXmlDoc){
        if(Lobby.Utils.objectNotNull(oXmlDoc.getElementsByTagName('debug')[0])) {
            my.currentDebugInfo.rtp = parseFloat(oXmlDoc.getElementsByTagName('debug')[0].getAttribute('rtp'));
            my.currentDebugInfo.totalCredit = parseFloat(oXmlDoc.getElementsByTagName('debug')[0].getAttribute('totalCredit'));
            my.currentDebugInfo.totalGameCreditGamePlay = parseFloat(oXmlDoc.getElementsByTagName('debug')[0].getAttribute('totalGameCreditGamePlay'));
            my.currentDebugInfo.totalDebit = parseFloat(oXmlDoc.getElementsByTagName('debug')[0].getAttribute('totalDebit'));
            my.currentDebugInfo.totalGameDebitGamePlay = parseFloat(oXmlDoc.getElementsByTagName('debug')[0].getAttribute('totalGameDebitGamePlay'));
            my.currentDebugInfo.totalLose = parseFloat(oXmlDoc.getElementsByTagName('debug')[0].getAttribute('totalLose'));
            my.currentDebugInfo.totalLoseGamePlay = parseFloat(oXmlDoc.getElementsByTagName('debug')[0].getAttribute('totalLoseGamePlay'));
            my.currentDebugInfo.totalWin = parseFloat(oXmlDoc.getElementsByTagName('debug')[0].getAttribute('totalWin'));
            my.currentDebugInfo.totalWinGamePlay = parseFloat(oXmlDoc.getElementsByTagName('debug')[0].getAttribute('totalWinGamePlay'));
        }
    };
    /**
     * Handle when level up
     */
    my.onLevelUp = function(){
        var currentGame = LobbyC.GameSlot.getCurrentGame();
        if(currentGame!=null){
            currentGame.s_oGame.getFooter().reloadPayLine(null);
            currentGame.s_oGame.getFooter().reloadBet(null);
        }
    };
    /**
     * Event when received spin from game
     * @param aWheels
     * @param aWinPosition
     * @param aTableWin
     * @param iBonus
     * @param aBonusPos
     */
    my.onSpinReceived = function (aWheels, aWinPosition, aTableWin, iBonus, aBonusPos) {


    };
    /**
     * Event handle when button event appeared
     * @param type
     * @param btn
     */
    my.onBonusButtonShow = function(type,btn){
        if(!my.managerForAutoGameSlot.autoGoToBonus) return;
        switch (type){
            case "doubleup":
                //my.currentGameSlot.getGame().getInterface()._onStartDoubleUp();
                break;
            case "freespin":
                my.currentGameSlot.getGame().getInterface()._onStartFreeSpin();
                break;
            case "gamebonus":
                my.currentGameSlot.getGame().getInterface().callFunctionBonus();
                break;
        }
    };
    my.onBonusButtonHide = function(type,btn){
        if(!my.managerForAutoGameSlot.autoGoToBonus) return;
        switch (type){
            case "doubleup":
                break;
            case "freespin":
                break;
        }
    };
    /**
     * Event when received free spin from game
     * @param iRemainingFreeSpin
     * @param iMultyFS
     * @param aWinPosition
     * @param aWheels
     * @param aTableWin
     * @param iTotWin
     */
    my.onBonusFreeSpinStepReceived = function(iRemainingFreeSpin, iMultyFS, aWinPosition, aWheels, aTableWin,iTotWin){
        //if(LobbyConfig.isTestPayLine) my.logPayLine(aWinPosition);
    };
    /**
     * Function call before each spin
     */
    my.beforeSpinHandle = function () {
        my.currentGameSlot.s_iCurWin = 0;
    };
    my.logPayLine = function(aWinPosition){
        console.log("SPIN RECEIVED");
        if(aWinPosition.length == 0) console.log("No win payline");
        for(var i =0;i<aWinPosition.length;i++){
            console.log("PayLine "+aWinPosition[i].line +" mul "+aWinPosition[i].mul+" pos "+aWinPosition[i].pos+ " win "+aWinPosition[i].win);
        }
    };
    /**
     * Function call before enter each normal spin, after beforeSpinHandle
     */
    my.beforeEnterNormalSpinHandle = function () {
        if(Lobby.Utils.objectIsNull(LobbyC.MainMenu._userData)){
            return;
        }
        var userCoin = LobbyC.MainMenu._userData.profile.coin;
        if(LobbyUserData.dataTutorial && LobbyUserData.dataTutorial.isPlayingTutorial){
            userCoin = 100000;
        }
        LobbyC.MainMenu._userCoinText.text = Helper.Number.formatNumber(userCoin>0?userCoin:0);
        LobbyC.MainMenu.playAnimationCoinForHeader(-my.currentGameSlot.s_iTotBet, 1000, null);
    };
    /**
     * Function call after Spin and after Finish Bonus
     */
    my.afterSpinHandle = function (callback, isFromBonus, isStopSpin) {
        if(!isFromBonus) {
            LobbyC.MainMenu.showWinMagicItemAfterSpin();
            my.checkAndShowMegaWinBigWin(my.currentGameSlot.s_iCurWin, my.currentGameSlot.s_iTotBet, function () {
                LobbyC.MainMenu.isClickedButtonInHeader = false;
            });
            setTimeout(function () {
                if (LobbyC.MainMenu.playingGame === LobbyConstant.isInGame && Lobby.Utils.objectNotNull(callback)) {
                    callback();
                }
            }, 100);
        }
        my.reloadProfileAfterSpin(isFromBonus, callback);
    };
    /**
     * Reload User's profile after spin and bonus
     */
    my.reloadProfileAfterSpin = function (isFromBonus, callback) {
        // coin nay set lai khi da tru cho totalbet
        //if(Lobby.Utils.objectNotNull(my._userData)) {
        //    my._userData.profile.coin = Helper.Number.unFormatNumber(LobbyC.MainMenu._userCoinText.text);
        //}
        my.userCoinBeforeCollect = my.currentGameSlot.s_iCredit;
        LobbyC.MainMenu.updateUserInfoFromSV(
            function () {
                if(isFromBonus) {
                    callback();
                }
            },
            function () {
                if (my.currentGameSlot.s_oGame.isAutoSpin() &&
                    Manager4State.getCurrentState() == my.currentGameSlot.GameConstant.State.MainGame) {
                    my.currentGameSlot.s_oGame.onSpin();
                }
            },
            false // isGetStatisticData
        );
    };
    /**
     * Check and show Big/Mega win
     * @param win: User's current Win
     * @param totalBet: User's bet
     * @param callback: callback after show Big/Mega Win
     */
    my.checkAndShowMegaWinBigWin = function (win, totalBet, callback) {
        if(LobbyC.MainMenu.isClickedButtonInHeader){
            return;
        }
        if (win >= totalBet * LobbyConfig.megaWinRate) {
            /**
             * Show megawin and bigwin here
             */
            LobbyC.MainMenu.isClickedButtonInHeader = true;
            LobbyC.MainMenu.showPopupMegaWin(win, callback)
        }
        else if (win >= totalBet * LobbyConfig.bigWinRate) {
            /**
             * Show bigwin here
             */
            LobbyC.MainMenu.isClickedButtonInHeader = true;
            LobbyC.MainMenu.showPopupBigWin(win, callback)
        } else {
            if (Lobby.Utils.objectNotNull(callback)) callback();
        }
    };
    /**
     * Get current slot game Object
     * @returns {{}|*} Object
     */
    my.getCurrentGame = function () {
        return my.currentGameSlot;
    };
    /**
     * Turn on the music in game
     */
    my.turnOnMusic = function () {
        settings.DISABLE_SOUND_MOBILE = false;
        Manager4Sound.playBackgroundMusic();
    };
    /**
     * Turn off all the music in game
     */
    my.turnOffMusic = function () {
        Manager4Sound.turnOffAllBackgroundMusic();
        if (Lobby.Utils.objectNotNull(Manager4Sound.listSoundInGame)) {
            var i = Manager4Sound.listSoundInGame.length; while (i--) {
                ManagerForSound.stop(my, Manager4Sound.listSoundInGame[i]);
                //ManagerForSound.unloadSound(my, Manager4Sound.listSoundInGame[i]);
            }
            //for (var i = 0; i < Manager4Sound.listSoundInGame.length; i++) {}
        }
        settings.DISABLE_SOUND_MOBILE = true;
    };
    /**
     * Force User to stop Bonus and return to Main Game When there's something wrong with Bonus Info(wrong step or wrong params)
     */
    my.forceToStopBonus = function(){
        LobbyC.MainMenu.showNotificationPopup(
            undefined,
            LobbyLanguageConstant.CANNOT_CONNECT_TO_SERVER,
            function(){
                //LobbyC.MainMenu.isShowingConnectionLost = false;
                LobbyC.MainMenu.showHeader();

                my.currentGameSlot.s_oGame.forceToCloseBonus();
                //LobbyC.MainMenu.returnToMainMenu();
            },
            function(){
                //LobbyC.MainMenu.isShowingConnectionLost = false;
                LobbyC.MainMenu.showHeader();

                my.currentGameSlot.s_oGame.forceToCloseBonus();
                //LobbyC.MainMenu.returnToMainMenu();
            }
        );
    };
    /**
     * Force User to return Lobby when there's something wrong with network or server
     */
    my.forceToGoToLobby = function(title){
        if(Lobby.Utils.objectIsNull(title))
            title = LobbyLanguageConstant.CANNOT_CONNECT_TO_SERVER;
        LobbyC.MainMenu.showNotificationPopup(
            undefined,
            LobbyLanguageConstant.CANNOT_CONNECT_TO_SERVER,
            function(){
                //LobbyC.MainMenu.isShowingConnectionLost = false;
                //my.prepareGoToGame();
                //my.currentGameSlot.s_oGame.forceToCloseBonus();
                //LobbyC.MainMenu.returnToMainMenu();
                LobbyC.MainMenu.clearDataAndLogOut();
            },
            function(){
                //LobbyC.MainMenu.isShowingConnectionLost = false;
                //my.prepareGoToGame();
                //my.currentGameSlot.s_oGame.forceToCloseBonus();
                //LobbyC.MainMenu.returnToMainMenu();
                LobbyC.MainMenu.clearDataAndLogOut();
            }
        );
    };
    /**
     * Get Path of current Game -> Using for load resources of dowloaded game
     * @param gameId: game ID
     * @returns {string} path of game
     */
    my.getGamePath = function (gameId) {
        return Lobby.Network.getShortDocumentFolder()+ "img/slotgamedata/" + gameId + "/";
    };
    /**
     * get Prefix Path of current Game's image resources -> Using for load resources of dowloaded game
     * @returns {*} string - Prefix Path of current Game's image resources
     */
    my.getPrefixPath = function(){
        if(ManagerForDownloadGameSlot.isForceNoDownload){
            return "";
        }
        if(!Lobby.Utils.isWeb() && my.currentGameId != "nezha")
            return Lobby.Network.getShortDocumentFolder();
        return "";
    };
    /**
     * get Prefix Path of current Game's sound resources -> Using for load resources of dowloaded game
     * @returns {*}string - Prefix Path of current Game's sound resources
     */
    my.getPrefixPathSound = function(){
        if(ManagerForDownloadGameSlot.isForceNoDownload){
            return "";
        }
        if(!Lobby.Utils.isWeb() && my.currentGameId != "nezha")
            return Lobby.Network.getDocumentFolder();
        return "";
    };
    return my;
}(LobbyC.GameSlot || {}));
