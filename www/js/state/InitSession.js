LobbyC.InitSession = (function (my) {
    my._loadingText = null;
    my._loadingTextValue = null;
    my._loadingBarBackgroundDone = null;
    //my._loadingBarThumb = null;
    my._userData = {
        isFacebookUser: false,
        authResponse: null,
        invitableFriendList: null,
        profile: null,
        friendList: null,
        canGetBonus: false,
        timeLeftToGetBonus: 0,
        secretGift: {
            box: 0,
            key: 0,
            blueStone: 0,
            greenStone: 0,
            purpleStone: 0,
            keyToday: 0,
            keyRequire: 3,
            maxBox: 50,
            boxRequire: 1,
            maxBlueStone: 50,
            maxPurpleStone: 50,
            maxGreenStone: 50,
            blueStoneRequire: 2,
            greenStoneRequire: 1,
            purpleStoneRequire: 2
        }
    };
    my._avatarList = [];
    my._avatarInvitableList = [];
    my._starDomAvatarList = [];

    /**
     * Show maintenance message and reload game after  LobbyConfig.serverMaintenance time
     */
    my.showMaintenanceMessageOnLoadingScreen = function () {
        my._loadingText.setText("Server maintenance. Please check back later ...");
        my.showLoadingScreenReloadBtn();
      my.time.events.add(LobbyConfig.serverMaintenance,
        function () {
                //location.reload(true);
            Lobby.Utils.reloadGame();
            }, this);
    };

    /**
     * Show maintenance message and reload game after  LobbyConfig.serverMaintenance time
     */
    my.showForceUpdatVersionOnLoadingScreen = function () {
        my._loadingText.setText("Your version app is out of date. Please update to the lastest version.");
        //my.showLoadingScreenReloadBtn();

    };

    /**
     * Get user data from server and set up
     */
    my.getUserDataServerBrumobV2 = function () {
        var callbackConfig = function (data) {
            if (data != null) {
                Lobby.Utils.printConsoleLog('Config data', data);
                var length = data.member.length;

                var i = length; while (i--) {
                    switch (data.member[i].name) {
                        case "version":
                            LobbyConfig.settingVersion = data.member[i].info;
                            break;
                        case "operator_code":
                            LobbyConfig.op = data.member[i].info;
                            break;
                        case "reload_real_time_notification_interval":
                            LobbyConfig.scheduleRealTimeNotification = parseInt(data.member[i].info);
                            break;
                        case "reload_server_notification_interval":
                            LobbyConfig.scheduleServerNotification = parseInt(data.member[i].info);
                            break;
                        case "friend_update_frequency":
                            LobbyConfig.scheduleReloadFrequency = parseInt(data.member[i].info);
                            break;
                        case "bot_avatar_link_list":
                            var arrayTmp = [35, 36, 37, 50, 51, 52];
                            var arrayAvatar = [];
                            for (var j = 0; j < arrayTmp.length; j++) {
                                var item = {
                                    key: 'user-avatar-' + arrayTmp[j],
                                    value: LobbyConfig.webServiceFullUrl + "/" + "photos/user-avatar/full-" + arrayTmp[j]
                                };
                                arrayAvatar.push(item);
                            }
                            var callBackBotAvatar = function () {

                            };
                            ResourceLoader.loadAvatarArrayAndCallBackWhenEverythingDone
                            (arrayAvatar, callBackBotAvatar, "list-avatar-bot");
                            break;
                        case "COIN_REWARD_AFTER_LEVEL_UP":
                            LobbyConfig.bonusCoinPerLevel = parseInt(data.member[i].info);
                            Lobby.Utils.printConsoleLog("Config bonus coin per level", LobbyConfig.bonusCoinPerLevel);
                            break;
                        case "CROWN_REWARD_AFTER_LEVEL_UP":
                            LobbyConfig.bonusCrownPerLevel = parseInt(data.member[i].info);
                            Lobby.Utils.printConsoleLog("Config crown coin per level", LobbyConfig.bonusCrownPerLevel);
                            break;
                        case "TIME_TO_SHOW_OFFER":
                            LobbyConstant.TIME_TO_SHOW_OFFER = parseInt(data.member[i].info);
                            Lobby.Utils.printConsoleLog("Config TIME_TO_SHOW_OFFER", LobbyConstant.TIME_TO_SHOW_OFFER);
                            break;
                        case "COIN_FOR_SHOW_OFFER":
                            LobbyConstant.COIN_FOR_SHOW_OFFER = parseInt(data.member[i].info);
                            Lobby.Utils.printConsoleLog("Config COIN_FOR_SHOW_OFFER", LobbyConstant.COIN_FOR_SHOW_OFFER);
                            break;
                        case "sample_wheel_mega_win_in_tutorial":
                            LobbyUserData.dataTutorial.infoSpin = data.member[i].info;
                            break;
                    }
                }
                //for (var i = 0; i < length; i++) {
                //
                //}
            }
        };

        var callBackGetSlotGameInfo = function (data) {
            var i;
            var minLevel = 1000;
            LobbyConfig.crownGameUnlocked = [];
            for (i = 0; i < LobbyConfig.listGameInfo.length; i++) {
                if (LobbyConfig.listGameInfo[i].premium_type === 0 && LobbyConfig.listGameInfo[i].min_crown > 0 && LobbyConfig.listGameInfo[i].is_unlocked === true) {
                    LobbyConfig.crownGameUnlocked.push(LobbyConfig.listGameInfo[i]);
                }
            }
            LobbyConfig.listGameInfo = [];
            for (i = 0; i < data.member.length; i++) {
                data.member[i].game_id = data.member[i].game_id.replace(LobbyConstant.PREFIX_GAME_MOBILE, "");
                if (data.member[i].promote_game === 1 &&
                    data.member[i].min_level < minLevel) {
                    LobbyConfig.gamePromote = data.member[i];
                    minLevel = data.member[i].min_level;
                }

                LobbyConfig.listGameInfo.push(data.member[i]);
                //LobbyConfig.listGameInfo.push({
                //    game_id: data.member[i].game_id,
                //    id: data.member[i].id,
                //    min_level: data.member[i].min_level
                //})
            }


            LobbyRequest.User.getListSlotsGameAndProcessData(
                function () {
                },
                my,
                true
            );
        };

        var callBackGetBetInfo = function (data) {
            LobbyConfig.listBetSlotGame = [];
            for (var i = 0; i < data.length; i++) {
                var bet = {};
                bet.id = data[i].id;
                bet.betSize = data[i].bet_size;
                bet.betSizePerLine = data[i].bet_size_per_line;
                bet.payLine = data[i].payline;
                bet.levelRestriction = data[i].level_restriction;
                LobbyConfig.listBetSlotGame.push(bet);
            }

        };

        var callBackGetAllData = function (data,errorCode) {
            Lobby.Utils.printConsoleLog("dataReturnFromServer: ", data);
            if (data === LobbyConstant.ERROR_MESSAGE_SERVER_MAINTAIN) {
                my.showMaintenanceMessageOnLoadingScreen();
                return;
            }
            if (data != null) {
                var listSize = data.list_size;
                var members = data.member;
                my.setProgressAnimation(80);
                for (var i = 0; i < listSize; i++) {
                    switch (members[i].bean_type) {
                        case LobbyConstant.API_COMBINATION_BEAN_NAME_GET_MY_PROFILE:
                            my._userData.profile = members[i].bean;
                            if (!my._userData.profile.role === 0) {
                                my._userData = {
                                    friendList: [],
                                    invitableFriendList: [],
                                    profile: members[i].bean
                                };
                            }
                            break;
                        case LobbyConstant.API_COMBINATION_BEAN_NAME_CHECK_COLLECT_COIN:
                            if (members[i].bean.timeLeft === 0) {
                                my._userData.canGetBonus = true;
                                my._userData.timeLeftToGetBonus = 0;
                            }
                            else {
                                my._userData.timeLeftToGetBonus = members[i].bean.timeLeft;
                            }
                            my._userData.defaultTimeLeft = members[i].bean.defaultTimeLeft;
                            my._userData.timeEndStateInitSession = my.time.time;

                            my._userData.coinBonus = members[i].bean.coin_reward;
                            break;
                        case LobbyConstant.API_COMBINATION_BEAN_NAME_GET_ALL_CONFIG:
                            callbackConfig(members[i].bean);
                            Manager4Product.getListProductFromData(members[i].bean);
                            break;
                        case LobbyConstant.API_COMBINATION_BEAN_NAME_GET_LINK_GAME:
                            break;
                        case LobbyConstant.API_COMBINATION_BEAN_NAME_GET_LEVEL_CONFIG:
                            var length = members[i].bean.member.length;
                            for (var j = 0; j < length; j++) {
                                LobbyConfig.LevelUpBonusCoins[members[i].bean.member[j].level_id] = members[i].bean.member[j];
                            }
                            break;
                        case LobbyConstant.API_COMBINATION_BEAN_NAME_GET_ALL_LIST_SLOT_GAME_INFO:
                            callBackGetSlotGameInfo(members[i].bean);
                            break;
                        case LobbyConstant.API_COMBINATION_BEAN_NAME_GET_LIST_BET_SIZE_RESTRICTION:
                            callBackGetBetInfo(members[i].bean.member);
                            break;
                    }
                }
                my.getFeatureConfigInfoAndCollectDataInfo(function(){
                    my.checkFolderExists(function(){
                        my.setProgressAnimation(90);
                        my.checkDownload(function(){
                            my.setProgressAnimation(91);
                            ScheduleManager.init();
                            // 2016-08-08: Phuoc: clearWorld phải set là false, nếu không sẽ bị lỗi chớp màn hình trước khi vào
                            // MainMenu

                            //dat comment out 4 test
                            my.state.start(
                                'Preloader',
                                false, // clearWorld
                                false, // clearCache
                                my._userData,
                                my._avatarList
                            );

                        });
                    });
                });


            }
            else {
                if(errorCode === LobbyConstant.ERROR_CODE_FORCE_CLIENT_UPDATE_APP_LOBBY){
                    //dat
                    //check if app version is too old, update to new app version
                    my.showForceUpdatVersionOnLoadingScreen();
                }else {
                    Lobby.Utils.reloadGame();
                }
                //var oldURL = (window.location != window.parent.location)
                //    ? document.referrer
                //    : document.location;
                //if (LobbyConfig.loginFrom === "fb") {
                //    top.window.location = LobbyConfig.AppDomain + "/callback-server-for-facebook/login?" + "redirectURL=" + oldURL;
                //}
                //else {
                //    top.window.location = LobbyConfig.webServiceFullUrl + "/";
                //}
            }
        };
        LobbyRequest.User.getAllData(callBackGetAllData);
    };
    /**
     * Use to login server, if failed, check for reason and show popup
     */
    my.loginServerLobby = function () {
        Lobby.Utils.printConsoleLog("loginServerLobby");
        if (LobbyConfig.loginFrom === "fb" || !Lobby.Utils.objectIsNull(my._userData.authResponse)) {
            if (!Lobby.Utils.objectIsNull(my._userData.authResponse)) {
                var token = my._userData.authResponse.accessToken;
                LobbyRequest.User.loginUsingAccountFacebook(token, function (isSuccess, data) {
                    Lobby.Utils.printConsoleLog("loginServerLobby Data login", data);
                    if (isSuccess) {
                        Lobby.Utils.printConsoleLog("loginServerLobby debug tslogin", data);
                        LobbyConfig.loginToken = data.ts_login;
                        LobbyUserData.comebackBonus = data.comeback_bonus_gift;
                        LobbyUserData.checkLoginSameDay = data.check_loggedin_in_day;
                        LobbyUserData.lastTimeLogin = data.timestamp_last_login;


                        my.setupDataTutorial(data);
                        my.getUserDataServerBrumobV2();
                        //my.getUserDataServerBrumob();
                        if (Lobby.Utils.objectNotNull(data.extra_info)) {
                            if (Lobby.Utils.objectNotNull(data.extra_info.info)) {
                                LobbyConfig.currentUserIp = data.extra_info.info;
                                Lobby.Utils.printConsoleLog("Current user ip " + LobbyConfig.currentUserIp);
                            }
                        }
                    }
                    else {
                        switch (data) {
                            case LobbyConstant.ERROR_MESSAGE_SERVER_MAINTAIN:
                                my.showMaintenanceMessageOnLoadingScreen();
                                break;
                            case LobbyConstant.ERROR_MESSAGE_TOKEN_EXPIRED:
                                my._loadingText.setText("Your facebook token has been expired! Please reload app!");
                                my.showLoadingScreenReloadBtn();
                              my.time.events.add(LobbyConfig.reloadTime,
                                function () {
                                        //location.reload(true);
                                    Lobby.Utils.reloadGame();
                                    }, this);
                                break;
                            case LobbyConstant.ERROR_MESSAGE_FACEBOOK_ERROR:
                                my._loadingText.setText("Can not connect to facebook. Please check back later ...");
                                my.showLoadingScreenReloadBtn();
                              my.time.events.add(LobbyConfig.reloadTime,
                                function () {
                                        //location.reload(true);
                                    Lobby.Utils.reloadGame();
                                    }, this);
                                break;
                            default :
                                my._loadingText.setText(LobbyLanguageConstant.CANNOT_CONNECT_TO_SERVER);
                                my.showLoadingScreenReloadBtn();
                              my.time.events.add(LobbyConfig.reloadTime,
                                function () {
                                        //location.reload(true);
                                    Lobby.Utils.reloadGame();
                                    },this );
                                break;
                        }
                    }
                });
            }
        }
        else {
            var callbackAuthorize = function (isSuccess, data) {
                Lobby.Utils.printConsoleLog("Authorize user :", isSuccess, data);
                if (isSuccess) {
                    my._userData.profile = data;
                    if (LobbyUserData.checkLoginNotFacebookAccount === null && my._userData.profile.facebookUID === null) {
                        LobbyUserData.checkLoginNotFacebookAccount = data.check_loggedin_in_day;
                    }
                    if (my._userData.profile.role === 0 && !my._userData.isFacebookUser) {
                        //my.login(0);
                        my.loginV2();
                    }
                    else {
                        my.getUserDataServerBrumobV2();
                    }

                    my.setupDataTutorial(data);
                }
                else {
                    if (my._userData.authResponse != null && my._userData.authResponse != undefined) {
                        my.getUserDataServerBrumobV2();
                    }
                    else {
                        var login_result = LobbyRequest.Utils.getUrlParameterExt("login_result");
                        Lobby.Utils.printConsoleLog(login_result);
                        switch (data) {
                            case LobbyConstant.ERROR_MESSAGE_LOGIN_SOME_WHERE:
                                if (login_result != null && login_result != undefined && login_result === "fb" || LobbyConfig.isFb) {
                                    //my.login(0);
                                    my.loginV2();
                                }
                                else {
                                    Lobby.Utils.reloadGame();
                                    //top.window.location = LobbyConfig.domainGame;
                                }
                                break;
                            case LobbyConstant.ERROR_MESSAGE_NOT_LOGIN:
                                if (login_result != null && login_result != undefined && login_result === "fb" || LobbyConfig.isFb) {
                                    my.loginV2();
                                }
                                else {
                                    Lobby.Utils.reloadGame();
                                    //top.window.location = LobbyConfig.domainGame;
                                }
                                break;
                            case LobbyConstant.ERROR_MESSAGE_SERVER_MAINTAIN:
                                my.showMaintenanceMessageOnLoadingScreen();
                                break;
                            default :
                                my._loadingText.setText(LobbyLanguageConstant.CANNOT_CONNECT_TO_SERVER);
                                my.showLoadingScreenReloadBtn();
                              my.time.events.add(LobbyConfig.reloadTime,
                                function () {
                                        //location.reload(true);
                                    Lobby.Utils.reloadGame();
                                    }, this);
                                break;
                        }
                    }
                }
            };
            LobbyRequest.User.authorizeSession(callbackAuthorize);
        }
    };
    /**
     * Get list invitable friend
     * @param callback callback when complete
     * @param accesstoken accessToken for request
     */
    my.getInvitableFriends = function (callback, accesstoken) {
        if (my._userData.isFacebookUser) {
            FacebookController.getFriendList(function (isSuccess, data) {
                my._userData.invitableFriendList = data;
                callback();
            }, accesstoken);
        }
    };
    /**
     * Get feature config and check can collect coin gift, daily reward, and other new popup feature here
     * @param callback
     */
    my.getFeatureConfigInfoAndCollectDataInfo = function (callback){

        Lobby.Utils.printConsoleLog("getFeatureConfigInfoAndCollectDataInfo");


        //if(!LobbyConfig.isTestStrategy) {
        //    callback();
        //    return;
        //}
        /**
         * Reset autoTestLastCollectInfo
         * @type {null}
         */
        LobbyConfig.autoTestLastCollectInfo = null;

        Lobby.Utils.printConsoleLog("getFeatureConfigInfoAndCollectDataInfo");
        var handleAdditionalInfo = function(isSuccess,data, response){
            if(isSuccess) {
                LobbyC.MainMenu.parseAdditionalInfo(data,false);
            }
            callback();
        };
        var callBackHandleFeatureConfig = function(isSuccess,data, response){
            /**
             * Handle daily streak info
             */
            if(!isSuccess) {
                my.handleFailResultNewStrategy(response,null,true,false);
                return;
            }
            LobbyC.MainMenu.parseFeatureConfig(data);

            LobbyRequest.User.getAdditionalInfo(handleAdditionalInfo);
        };
        LobbyRequest.User.getAllFeatureConfig(callBackHandleFeatureConfig);
    };
    //my.login = function (counter) {
    //    if (counter < 5) {
    //        FacebookController.login(function (isSuccess, dataAfterCallLogin, accesstoken) {
    //            if (isSuccess) {
    //                my.setProgressAnimation(20);
    //                my._userData.isFacebookUser = true;
    //                my._userData.authResponse = dataAfterCallLogin.authResponse;
    //
    //                my.loginServerLobby();
    //                //var callback = function () {
    //                //    my.loginServerLobby();
    //                //};
    //                //my.getInvitableFriends(callback, accesstoken);
    //            }
    //            else {
    //                try {
    //                    ++counter;
    //                    FacebookController.logout(function (isSuccess, dataAfterCallLogout) {
    //                        if (isSuccess) {
    //                            my.login(counter);
    //                        }
    //                        else {
    //                            Lobby.Utils.printConsoleLog(dataAfterCallLogout);
    //                        }
    //                    });
    //                }
    //                catch (err) {
    //                    Lobby.Utils.printConsoleLog("Ops ...");
    //                    Lobby.Utils.printConsoleLog(Lobby.Utils.formatJSON(err))
    //                }
    //            }
    //        });
    //    }
    //};
    /**
     * Login facebook
     */
    my.loginV2 = function () {
        FacebookController.login(function (isSuccess, dataAfterCallLogin, accesstoken) {
            // 2016-07-26: Phuoc: nếu login facebook bị lỗi thì quay về state login
            if(Lobby.Utils.objectNotNull(dataAfterCallLogin.errorMessage) || dataAfterCallLogin === "unknown" ||
                isSuccess === false){
                var errorMessage = dataAfterCallLogin.errorMessage;
                if(Lobby.Utils.objectIsNull(errorMessage)){
                    errorMessage = dataAfterCallLogin;
                }
                if(errorMessage.indexOf("CONNECTION_FAILURE") < 0){
                    if (!isSuccess) {
                        if(LobbyConfig.enableLoginHtml){
                            LobbyC.Login.LoginHtml.goBackToLoginFromGame();
                        }
                        else my.state.start(
                            "Login",
                            true,
                            false,
                            my._userData,
                            my._avatarList
                        );
                    }
                }else{
                    my._loadingText.setText(LobbyLanguageConstant.CANNOT_CONNECT_TO_SERVER);
                    //my.showLoadingScreenReloadBtn();
                    my.time.events.add(LobbyConfig.reloadTime,
                        function () {
                            //location.reload(true);
                            Lobby.Utils.reloadGame();
                        }, this);
                }
                return;
            }
            my.setProgressAnimation(20);
            my._userData.isFacebookUser = true;
            my._userData.authResponse = dataAfterCallLogin.authResponse;

            my.loginServerLobby();
        });
    };
    /**
     * Set progress animation for loading view
     * @param progress percent to set
     */
    my.setProgressAnimation = function (progress) {
        my._loadingText.setText(my._loadingTextValue);//my._loadingText.setText(my._loadingTextValue + progress + "%");
        my._loadingBarBackgroundDone.width = my._loadingBarBackgroundDone.originalWidth * progress / 100;
        //my._loadingBarThumb.x = my._loadingBarBackground.x - 432 / 2 + 420 * progress / 100;
    };
    /**
     * Check and create folder to store downloaded game slot
     * @param callback callback when completed
     */
    my.checkFolderExists = function(callback){
        if(Lobby.Utils.isWeb()){
            callback();
            return;
        }
        resolveLocalFileSystemURL(Lobby.Network.getDocumentFolder(), function (entry) {
        var errorGetDir = function(er){
            if(LobbyConfig.isDebug) console.log("Error while getting dir "+ er);
            callback();
        };

        entry.getDirectory("img",{create:true}, function(dirEntry){
            dirEntry.getDirectory("slotgamedata",{create:true}, function(dataEntry){
                callback();
            },errorGetDir);
        },errorGetDir);
        });
    };
    /**
     * Check if game is download
     * @param callback callback when completed
     */
    my.checkDownload = function(callback){
        if(Lobby.Utils.isWeb()){
            callback();
            return;
        }
        my.checkDownloadNextGame(0,callback);
    };
    /**
     * Check download next game
     * @param t position of game in array
     * @param callback callback when completed
     */
    my.checkDownloadNextGame = function(t, callback){
        if(t === LobbyConfig.availableGame.length) {
            callback();
            return;
        }

        var game = LobbyConfig.availableGame[t];
        if(game === "nezha") {
            LobbyConfig.downloadGameInfo[game].isDownloaded = true;
            t++;
            my.checkDownloadNextGame(t,callback);
            return;
        }
        var exists = function(entry){
            LobbyConfig.downloadGameInfo[game].isDownloaded = true;
            t++;
            if(!Lobby.Utils.isWeb()){
                if(Lobby.Utils.objectIsNull(entry)){
                    my.checkDownloadNextGame(t,callback);
                    return;
                }
                entry.file(function(file) {
                    var reader = new FileReader();

                    reader.onloadend = function(e) {
                        if(ManagerForDownloadGameSlot.forceUpdateNewVersion) LobbyConfig.downloadGameInfo[game].currentVersion = "errrrr";
                        else LobbyConfig.downloadGameInfo[game].currentVersion = this.result.trim();
                        //if(LobbyConfig.downloadGameInfo[game].currentVersion != LobbyConfig.downloadGameInfo[game].version){
                        //    ManagerForDownloadGameSlot.deleteBundleGame(game,function(){
                        //        LobbyConfig.downloadGameInfo[game].isDownloaded = false;
                        //        my.checkDownloadNextGame(t,callback);
                        //    },function(er){
                        //        console.log(er);
                        //    });
                        //}else{
                        //    my.checkDownloadNextGame(t,callback);
                        //}
                        my.checkDownloadNextGame(t,callback);
                    };
                    reader.readAsText(file);
                });
            }
            else my.checkDownloadNextGame(t,callback);
        };
        var notExists = function(){
            LobbyConfig.downloadGameInfo[game].isDownloaded = false;
            t++;
            my.checkDownloadNextGame(t,callback);
        };
        ManagerForDownloadGameSlot.checkIfGameExists(game,exists,notExists)
    };
    /**
     * Create loading animation
     */
    my.loadingAnimation = function () {

        var group = my.add.group();
        var backgroundLoading = my.add.sprite(
            LobbyConfig.width/2,
            LobbyConfig.height/2,
            'background-loading',
            null,
            group
        );
        backgroundLoading.anchor.setTo(0.5,0.5);

        group.add(backgroundLoading);

        //real background size is 1920 so we need to scale down from 1920 to lobbyWidth
        backgroundLoading.scale.setTo(LobbyConfig.width*ManagerForScale.getScale()/1920);//getScale());
        //ManagerForScale.scaleGroupAndRePositionBackground(backgroundLoading,false);


        var _loadingBarBackground = my.add.sprite(
            0,
            600,
            "loading-bar-background",
            null,
            group
        );
        _loadingBarBackground.anchor.x = 0.5;
        _loadingBarBackground.x = LobbyConfig.width / 2;
        _loadingBarBackground.y+= ManagerForScale.zeroIncrementHeight(_loadingBarBackground.y);
        var loadingTextFontStyle = {
            //font: "25px Helvetica-Medium",
            font: "35px " + ConstantFontName.FONT_NAME_PassionOne_Regular,
            fill: "#FFFFFF",
            stroke: "#333",
            strokeThickness: 1,
            align: "center"
        };
        var _loadingTextValue = "Connecting server";
        my._loadingTextValue = _loadingTextValue;

        var _loadingText = my.add.text(0, -20, my._loadingTextValue, loadingTextFontStyle, group);// my.add.text(0, -20, my._loadingTextValue + "0%", loadingTextFontStyle);
        _loadingText.anchor.x = 0.5;
        _loadingText.x = LobbyConfig.width / 2;
        _loadingText.y = 730;
        _loadingText.y +=  ManagerForScale.zeroIncrementHeight(_loadingText.y);
        //_loadingText.x*=LobbyConfig.scaleRatioEntireGame;
        //_loadingText.y*=LobbyConfig.scaleRatioEntireGame;
        my._loadingText = _loadingText;


        var _loadingBarBackgroundDone = my.add.sprite(
            0,
            0,
            'loading-bar-background-done',
            null,
            group
        );
        my._loadingBarBackgroundDone = _loadingBarBackgroundDone;

        //my._loadingBarBackground.alpha = 0; // T� th�m
        _loadingBarBackgroundDone.position = {
            x: _loadingBarBackground.x - _loadingBarBackground.width / 2 + 17,
            y: _loadingBarBackground.y + 3
        };
        _loadingBarBackgroundDone.originalWidth = _loadingBarBackgroundDone.width - 5;
        _loadingBarBackgroundDone.width = 0;

        window.loadingText = _loadingText;
        window.loadingBarBackgroundDone = _loadingBarBackgroundDone;
        //window.loadingBarthumb = my._loadingBarThumb;
        //window.loadingBarBackground = my._loadingBarBackground;

        /**
         * Reload button in case user can't connect to server
         */
        var loadingScreenReloadBtn = Lobby.PhaserJS.createSpriteRectangleExt(
            my,
            400,
            500,
            function () {
                my.loadingScreenReloadBtn.frame = 1;
                //location.reload(true);
                Lobby.Utils.reloadGame();
            },
            function () {
                my.loadingScreenReloadBtn.frame = 2;
            },
            function () {
                my.loadingScreenReloadBtn.frame = 0;
            },
            group,
            LobbyConfig.isDebug,
            'loading-reload-btn'
        );
        my.loadingScreenReloadBtn = loadingScreenReloadBtn;
        loadingScreenReloadBtn.anchor.x = 0.5;
        loadingScreenReloadBtn.x = LobbyConfig.width / 2;
        loadingScreenReloadBtn.y = 730 + 220;
        loadingScreenReloadBtn.alpha = 0;
        loadingScreenReloadBtn.visible = false;


        var loadingViewInitSession = group;
        loadingViewInitSession.backgroundLoading = backgroundLoading;
        loadingViewInitSession._loadingBarBackground = _loadingBarBackground;
        loadingViewInitSession._loadingBarBackgroundDone = _loadingBarBackgroundDone;
        loadingViewInitSession._loadingText = _loadingText;
        window.loadingViewInitSession = loadingViewInitSession;

        Lobby.PhaserJS.scaleGroupForOptimize(group,false);

    };

    if (LobbyConfig.isDebug) {
        my.render = function () {
            my.game.debug.text("FPS:" + my.time.fps || '--', 2, 14, "#00ff00");
        };
    }
    /**
     * Create loading animation and start getting info from server
     */
    my.preload = function () {
        if (LobbyConfig.isDebug || LobbyConfig.isTestAlgorithmMode) {
            my.time.advancedTiming = true;
        }
        my.loadingAnimation();
        Lobby.Utils.printConsoleLog("**********************************************************************");
        Lobby.Utils.printConsoleLog("******************** Benchmark: Begin loading API ********************");
        Lobby.Utils.printConsoleLog("**********************************************************************");

        Lobby.Utils.printConsoleLog("Login from host name : " + window.location.hostname);
        //var hostname = window.location.hostname;
        //if (hostname.startsWith(LobbyConfig.hostNameOfWebVersion)) {
        //    LobbyConfig.loginFrom = LobbyConstant.LoginFrom.facebook;
        //}
        //else {
        //    LobbyConfig.loginFrom = LobbyConstant.LoginFrom.web;
        //}

        my._userData = {
            isFacebookUser: false,
            authResponse: null,
            invitableFriendList: null,
            profile: null,
            friendList: null,
            canGetBonus: false,
            timeLeftToGetBonus: 0,
            secretGift: {
                box: 0,
                key: 0,
                blueStone: 0,
                greenStone: 0,
                purpleStone: 0,
                keyToday: 0,
                keyRequire: 3,
                maxBox: 50,
                boxRequire: 1,
                maxBlueStone: 50,
                maxPurpleStone: 50,
                maxGreenStone: 50,
                blueStoneRequire: 2,
                greenStoneRequire: 1,
                purpleStoneRequire: 2
            }
        };

        if (
            LobbyConfig.loginFrom === LobbyConstant.LoginFrom.facebook) {
            //my.login(0);
            my.loginV2();
        }
        else if (LobbyConfig.loginFrom === LobbyConstant.LoginFrom.guest) {
            my.getUserDataServerBrumobV2();
            //my.getUserDataServerBrumob();
        }
        else {
            my.loginServerLobby();
        }
    };
    /**
     *  init scroll view and popup manager group
     */
    my.create = function () {
        LobbyC.MainMenu.popupManager = my.add.group();
        ManagerForEvent.setIsBlockBackButton(false);
        ManagerForPopUp.init();

        my.game.kineticScrolling = my.game.plugins.add(Phaser.Plugin.KineticScrolling);
        my.game.pageViewMain = my.game.plugins.add(Phaser.Plugin.PageView);
        my.game.pageViewInfoPopup = my.game.plugins.add(Phaser.Plugin.PageView);
    };
    /**
     * Show loading screen reload btn
     */
    my.showLoadingScreenReloadBtn = function () {
        my.loadingScreenReloadBtn.alpha = 1;
        my.loadingScreenReloadBtn.visible = true;
    };
    /**
     * Set up data for tutorial
     * @param data data from server
     */
    my.setupDataTutorial = function (data) {
        var isFirstLogin = false;
        if(!LobbyConfig.isTestAlgorithmMode) {
            LobbyUserData.dataTutorial.name = data.name;
            LobbyUserData.dataTutorial.isCanPlayTutorial = data.allow_play_tutorial;
            LobbyUserData.dataTutorial.isCanGetPreRewardTutorial = data.allow_get_pre_tutorial_reward;
            LobbyUserData.dataTutorial.isCanSpinTutorial = data.allow_get_tutorial_spin_reward;
            isFirstLogin = data.first_login;
        }
        if (isFirstLogin === true) {
            LobbyUserData.dataTutorial.isFirstLogin = 1;
            Lobby.Utils.setToLocalStorage(LobbyConstant.Constant4Tutorial.keyStoringIsCreateUserFromThisDevice + LobbyUserData.dataTutorial.name,
                LobbyUserData.dataTutorial.isFirstLogin);
        }
        Lobby.Utils.setToLocalStorage(LobbyConstant.Constant4Tutorial.keyStoringFirstLogin + LobbyUserData.dataTutorial.name,
            LobbyUserData.dataTutorial.isFirstLogin);
    };
    return my;
}(LobbyC.InitSession || {}));
