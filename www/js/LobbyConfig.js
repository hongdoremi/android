(function () {

    var root = this;

    'use strict';

    function define() {

        var LobbyConfig = {};

        LobbyConfig.isDestroyWorldFromMainMenu2GameSlot = false;
        LobbyConfig.isDestroyWorldFromGameSlot2MainMenu = false;
        LobbyConfig.fixRatioBetweenHeightAndWidthDevice = 0.5;
        LobbyConfig.scaleRatioEntireGame = 0.7;
        //LobbyConfig.scaleRatioEntireGame = 1;
        LobbyConfig.scaleRatioEntireGame = 0.6;
        //LobbyConfig.scaleRatioEntireGame = 0.1;
        LobbyConfig.width = 1600;//1600;
        LobbyConfig.height = 900;//900;
        LobbyConfig.realWidth = 1600 * LobbyConfig.scaleRatioEntireGame;//1600;
        LobbyConfig.realHeight = 900 * LobbyConfig.scaleRatioEntireGame;//900;
        LobbyConfig.realExtraWidth = LobbyConfig.realWidth;//1600;
        LobbyConfig.realExtraHeight = LobbyConfig.realHeight;//900;
        LobbyConfig.deviceWidth = 0;
        LobbyConfig.deviceHeight = 0;


         //Enable/Disable login html, must be set to false if want to debug html popup
        //LobbyConfig.enableLoginHtml = false;
        LobbyConfig.enableLoginHtml = true;
        //Enable debug html popup, skip init popup html when init main menu
        //LobbyConfig.debugHtml = true;
        LobbyConfig.debugHtml = false;
        //LobbyConfig.enablePopupHtml = false;
        LobbyConfig.enablePopupHtml = true;


        LobbyConfig.serverMaintenance = 60000;
        LobbyConfig.delaySwitchToInstallPage = 10000;
        LobbyConfig.reloadTime = 60000;
        LobbyConfig.settingVersion = "";
        LobbyConfig.timeout4Click1Button = 1500; //1,5s
        LobbyConfig.op = "";
        LobbyConfig.maxSendCoin = 50000;
        LobbyConfig.minSendCoin = 1000;
        LobbyConfig.loginToken = "";
        LobbyConfig.loginFrom = "fb";
        LobbyConfig.facebookAppDomain = "https://apps.facebook.com/playpalace/";
        LobbyConfig.facebookAppMainDomain = "https://apps.facebook.com/";
        LobbyConfig.checkFaceBook = "login=fb";
        LobbyConfig.currentUserIp = "127.0.0.1";
        LobbyConfig.stopRequestAjax = false;
        LobbyConfig.levelUpThumbnailLink = "http://uat-pp-resource.playpalace.com/ppwebstatic/web_pp_img_share/level_up.png";
        LobbyConfig.versionDisplay = "1.0.100";
        LobbyConfig.downloadServerUrl = "https://scmw.spiralworks-cloud.com/ppwebstatic/html_gameslot_resource/";
        LobbyConfig.downloadGameInfo = {};
        LobbyConfig.downloadGameInfo["nezha"] = {
            version: "2016-08-15-01",
            isDownloading:false,
            isDownloaded:false,
            isDownloadingBeHide:false,
            isRuningAnim4DownloadBehide:false,
            downloadGroup : null,
            currentVersion:"",
            gameName : "Legend of Nezha"
        };
        LobbyConfig.downloadGameInfo["deepblue"] = {
            version: "2016-08-27-01",
            isDownloading:false,
            isDownloaded:false,
            isDownloadingBeHide:false,
            isRuningAnim4DownloadBehide:false,
            downloadGroup : null,
            currentVersion:"",
            gameName : "Deep blue",
            md5:"ec57b7288a0743692b1599be59b58bb0"
        };
        LobbyConfig.downloadGameInfo["goldenegg"] = {
            version: "2016-09-06-01",
            isDownloading:false,
            isDownloaded:false,
            isDownloadingBeHide:false,
            isRuningAnim4DownloadBehide:false,
            downloadGroup : null,
            currentVersion:"",
            gameName : "Golden egg",
            md5:"2263a987847e5e77e504f0eaa5321bf4"
        };
        LobbyConfig.downloadGameInfo["pharaoh"] = {
            version: "2016-08-15-01",
            isDownloading:false,
            isDownloaded:false,
            isDownloadingBeHide:false,
            isRuningAnim4DownloadBehide:false,
            downloadGroup : null,
            currentVersion:"",
            gameName : "Pharaoh",
            md5:"a22bcc305d2ef85626bdf8b860977c39"
        };
        LobbyConfig.downloadGameInfo["boxing"] = {
            version: "2016-08-15-01",
            isDownloading:false,
            isDownloaded:false,
            isDownloadingBeHide:false,
            isRuningAnim4DownloadBehide:false,
            downloadGroup : null,
            currentVersion:"",
            gameName : "Boxing",
            md5:"0e620c93acd57ec37663a83b712e8e87"
        };
        LobbyConfig.downloadGameInfo["romanempire"] = {
            version: "2016-08-15-01",
            isDownloading:false,
            isDownloaded:false,
            isDownloadingBeHide:false,
            isRuningAnim4DownloadBehide:false,
            downloadGroup : null,
            currentVersion:"",
            gameName : "Roman empire",
            md5:"7caa0d00d67f2213f314f37073661f4c"
        };
        /**
         * Coin animation header delay
         */
        LobbyConfig.delayTimeShowCoinFlareAnimation = Phaser.Timer.SECOND * 60 * 3;
        LobbyConfig.delayTimeShowCrownAnimAfterCoinAnim = LobbyConfig.delayTimeShowCoinFlareAnimation + Phaser.Timer.SECOND * 2;
        //LobbyConfig.delayTimeShowCrownAnimAfterCoinAnim = Phaser.Timer.SECOND*3;

        /* ------------------------------- PRO with PRO Server START ------------------------------- */
        /**
         * Production server
         */
        //LobbyConfig.googleAnalyticCode = "UA-68504082-1";
        //LobbyConfig.AppDomain = "https://fb.playpalace.com";
        //LobbyConfig.webVersionFullUrl = "https://www.playpalace.com";
        //LobbyConfig.webGameVersionFullUrl = LobbyConfig.webVersionFullUrl + "/lobby-phaser/";
        //LobbyConfig.webGameVersionFullUrlUnity = LobbyConfig.webVersionFullUrl + "/lobby/";
        //LobbyConfig.hostNameOfWebVersion = "fb.playpalace.com";
        //LobbyConfig.hostNameOfWebVersion2 = "fb.playpalace.com";
        //LobbyConfig.domainGame = LobbyConfig.AppDomain + "/lobby-phaser/";
        //LobbyConfig.webServiceFullUrl = LobbyConfig.AppDomain + "/lobby-server-pp";
        //LobbyConfig.botAvatar = LobbyConfig.AppDomain + "/lobby-server-pp/img/bot-avatar.png";
        //LobbyConfig.facebookAppID = "812251312202279";
        //LobbyConfig.usingSSL = true;
        //LobbyConfig.allowLoadingFacebookResource = true;
        //LobbyConfig.printConsoleLog = false;
        //LobbyConfig.isProduction = true;
        //LobbyConfig.trialPay = "ZVR4440R4";
        //LobbyConfig.appBundleID_android = "com.playpalace";
        //LobbyConfig.appBundleID_IOS = "1078814848";
        /* ------------------------------- PRO with PRO Server END ------------------------------- */

        /**
         * PM1 server for production
         */
        //LobbyConfig.googleAnalyticCode = "UA-68504082-2";
        //LobbyConfig.AppDomain = "https://fb.playpalace.com";
        //LobbyConfig.webVersionFullUrl = "https://scmw-web.spiralworks-cloud.com";
        //LobbyConfig.webGameVersionFullUrl = LobbyConfig.webVersionFullUrl + "/lobby-ui-pp";
        //LobbyConfig.hostNameOfWebVersion = "fb.playpalace.com";
        //LobbyConfig.hostNameOfWebVersion2 = "fb.playpalace.com";
        //LobbyConfig.domainGame = LobbyConfig.AppDomain + "/lobby-ui-m1";
        //LobbyConfig.webServiceFullUrl = LobbyConfig.AppDomain + "/lobby-server-m1";
        //LobbyConfig.botAvatar = LobbyConfig.AppDomain + "/lobby-server-m1/img/bot-avatar.png";
        //LobbyConfig.facebookAppID = "858535744240502";
        //LobbyConfig.usingSSL = true;
        //LobbyConfig.allowLoadingFacebookResource = true;


        /**
         * Test server
         */

        //Localhost
        //LobbyConfig.googleAnalyticCode = "UA-68504082-2";
        //LobbyConfig.AppDomain = "http://localhost:8080";
        //LobbyConfig.webVersionFullUrl = "http://localhost:8080";
        //LobbyConfig.webGameVersionFullUrl = LobbyConfig.webVersionFullUrl + "/lobby-ui";
        //LobbyConfig.hostNameOfWebVersion = "http://localhost:8080";
        //LobbyConfig.hostNameOfWebVersion2 = "http://localhost:8080";
        //LobbyConfig.facebookAppID = "822586904502053";
        //LobbyConfig.domainGame = LobbyConfig.AppDomain + "/lobby-ui";
        //LobbyConfig.webServiceFullUrl = LobbyConfig.AppDomain + "/Fbmobile-Lobby-WebService-1.0.1";
        //LobbyConfig.usingSSL = false;
        //LobbyConfig.allowLoadingFacebookResource = false;
        //LobbyConfig.printConsoleLog = true;

        //LocalHostDat
        //LobbyConfig.googleAnalyticCode = "UA-68504082-2";
        //LobbyConfig.AppDomain = "http://localhost:8888";
        //LobbyConfig.webVersionFullUrl = "http://localhost";
        //LobbyConfig.webGameVersionFullUrl = LobbyConfig.webVersionFullUrl + "/lobby-ui";
        //LobbyConfig.hostNameOfWebVersion = "http://localhost";
        //LobbyConfig.hostNameOfWebVersion2 = "http://localhost";
        //LobbyConfig.facebookAppID = "822586904502053";
        //LobbyConfig.domainGame = LobbyConfig.AppDomain + "/lobby-ui";
        //LobbyConfig.webServiceFullUrl = LobbyConfig.AppDomain + "/Fbmobile-Lobby-WebService-1.0.1";
        //LobbyConfig.usingSSL = false;
        //LobbyConfig.allowLoadingFacebookResource = false;
        //LobbyConfig.printConsoleLog = true;

        /* ------------------------------- DEV with DEV Server START ------------------------------- */
        ////Dev
        //LobbyConfig.googleAnalyticCode = "UA-68504082-2";
        //LobbyConfig.GamePlayAppDomain = "https://scmw.spiralworks-cloud.com";
        //LobbyConfig.AppDomain = "https://scmw.spiralworks-cloud.com";
        //LobbyConfig.webVersionFullUrl = "https://scmw-web.spiralworks-cloud.com";
        //LobbyConfig.webGameVersionFullUrl ="file:///android_asset/www/index.html";
        //LobbyConfig.webGameVersionFullUrlUnity = "file:///android_asset/www/index.html";
        //LobbyConfig.hostNameOfWebVersion = "scmw-web.spiralworks-cloud.com";
        //LobbyConfig.hostNameOfWebVersion2 = "scmw.spiralworks-cloud.com";
        //LobbyConfig.facebookAppID = "822586904502053";
        //LobbyConfig.domainGame = LobbyConfig.AppDomain + "/lobby-server-pp/";
        //LobbyConfig.trialPay = "ZVR4440R4";
        //LobbyConfig.isProduction = true;
        //
        ////Cors Web Server
        //LobbyConfig.webServiceFullUrl = LobbyConfig.AppDomain + "/lobby-server-pp";
        //LobbyConfig.usingSSL = true;
        //LobbyConfig.allowLoadingFacebookResource = true;
        //LobbyConfig.printConsoleLog = true;
        //LobbyConfig.appBundleID_android = "com.lobbyteam.playpalace.unity";
        //LobbyConfig.appBundleID_IOS = "1109211273";
        /* ------------------------------- DEV with DEV Server END ------------------------------- */

        // Cors Local Server
        //LobbyConfig.webServiceFullUrl = LobbyConfig.AppDomain + "/lobby-server-pp-local";
        //LobbyConfig.usingSSL = false;
        //LobbyConfig.allowLoadingFacebookResource = false;

        /* ------------------------------- localhost with UAT Server ------------------------------- */
        //LobbyConfig.googleAnalyticCode = "UA-68504082-2";
        //LobbyConfig.GamePlayAppDomain = "https://scmw.spiralworks-cloud.com";
        //LobbyConfig.AppDomain = "https://scmw.spiralworks-cloud.com";
        //LobbyConfig.webVersionFullUrl = "http://localhost";
        ////LobbyConfig.webGameVersionFullUrl = LobbyConfig.webVersionFullUrl + "/lobby-ui/";
        ////LobbyConfig.webGameVersionFullUrlUnity = LobbyConfig.webVersionFullUrl + "/lobby-unity/";
        //LobbyConfig.webGameVersionFullUrl = "file:///android_asset/www/index.html";
        //LobbyConfig.webGameVersionFullUrlUnity =  "file:///android_asset/www/index.html";
        //LobbyConfig.hostNameOfWebVersion = "scmw-web.spiralworks-cloud.com";
        //LobbyConfig.hostNameOfWebVersion2 = "scmw.spiralworks-cloud.com";
        //LobbyConfig.facebookAppID = "822586904502053";
        //LobbyConfig.domainGame = LobbyConfig.AppDomain + "/lobby-server-pp-local/";
        //LobbyConfig.trialPay = "ZVR4440R4";
        //LobbyConfig.isProduction = false;
        //LobbyConfig.printConsoleLog = true;
        //
        //LobbyConfig.webServiceFullUrl = LobbyConfig.AppDomain + "/lobby-server-pp-local";
        //LobbyConfig.usingSSL = false;
        //LobbyConfig.allowLoadingFacebookResource = false;
        //LobbyConfig.appBundleID_android = "com.lobbyteam.playpalace.unity";
        //LobbyConfig.appBundleID_IOS = "1109211273";
        /* ------------------------------- localhost with UAT Server ------------------------------- */
        /* ------------------------------- localhost with PHONEGAP UAT Server ------------------------------- */
        //LobbyConfig.googleAnalyticCode = "UA-68504082-2";
        //LobbyConfig.GamePlayAppDomain = "https://scmw.spiralworks-cloud.com";
        //LobbyConfig.AppDomain = "https://scmw.spiralworks-cloud.com";
        //LobbyConfig.webVersionFullUrl = "http://localhost";
        ////LobbyConfig.webGameVersionFullUrl = LobbyConfig.webVersionFullUrl + "/lobby-ui/";
        ////LobbyConfig.webGameVersionFullUrlUnity = LobbyConfig.webVersionFullUrl + "/lobby-unity/";
        //LobbyConfig.webGameVersionFullUrl = "file:///android_asset/www/index.html";
        //LobbyConfig.webGameVersionFullUrlUnity = "file:///android_asset/www/index.html";
        //LobbyConfig.hostNameOfWebVersion = "scmw-web.spiralworks-cloud.com";
        //LobbyConfig.hostNameOfWebVersion2 = "scmw.spiralworks-cloud.com";
        //LobbyConfig.facebookAppID = "822586904502053";
        //LobbyConfig.domainGame = LobbyConfig.AppDomain + "/lobby-server-pp-phonegap/";
        //LobbyConfig.trialPay = "ZVR4440R4";
        ////LobbyConfig.isProduction = false;
        //LobbyConfig.printConsoleLog = true;
        //
        //LobbyConfig.webServiceFullUrl = LobbyConfig.AppDomain + "/lobby-server-pp-phonegap";
        //LobbyConfig.usingSSL = false;
        //LobbyConfig.allowLoadingFacebookResource = false;
        //LobbyConfig.appBundleID_android = "com.lobbyteam.playpalace.unity";
        //LobbyConfig.appBundleID_IOS = "1109211273";
        /* ------------------------------- localhost with PHONEGAP UAT Server ------------------------------- */

        /* ------------------------------- localhost with STRATEGIES Server ------------------------------- */
        LobbyConfig.googleAnalyticCode = "UA-68504082-2";
        LobbyConfig.GamePlayAppDomain = "https://scmw.spiralworks-cloud.com";
        LobbyConfig.AppDomain = "https://scmw.spiralworks-cloud.com";
        LobbyConfig.webVersionFullUrl = "http://localhost";
        //LobbyConfig.webGameVersionFullUrl = LobbyConfig.webVersionFullUrl + "/lobby-ui/";
        //LobbyConfig.webGameVersionFullUrlUnity = LobbyConfig.webVersionFullUrl + "/lobby-unity/";
        LobbyConfig.webGameVersionFullUrl = "file:///android_asset/www/index.html";
        LobbyConfig.webGameVersionFullUrlUnity = "file:///android_asset/www/index.html";
        LobbyConfig.hostNameOfWebVersion = "scmw-web.spiralworks-cloud.com";
        LobbyConfig.hostNameOfWebVersion2 = "scmw.spiralworks-cloud.com";
        LobbyConfig.facebookAppID = "822586904502053";
        LobbyConfig.domainGame = LobbyConfig.AppDomain + "/lobby-server-pp-strategies/";
        LobbyConfig.trialPay = "ZVR4440R4";
        //LobbyConfig.isProduction = false;
        LobbyConfig.printConsoleLog = true;

        LobbyConfig.webServiceFullUrl = LobbyConfig.AppDomain + "/lobby-server-pp-strategies";
        LobbyConfig.usingSSL = false;
        LobbyConfig.allowLoadingFacebookResource = false;
        LobbyConfig.appBundleID_android = "com.lobbyteam.playpalace.unity";
        LobbyConfig.appBundleID_IOS = "1109211273";
        /* ------------------------------- localhost with PHONEGAP UAT Server ------------------------------- */



        var getParameterFromCurrentURL = function(sParam) {
            var getUrlParameter = function getUrlParameter(sParam) {
                var sPageURL = decodeURIComponent(window.location.search.substring(1)),
                    sURLVariables = sPageURL.split('&'),
                    sParameterName,
                    i;

                for (i = 0; i < sURLVariables.length; i++) {
                    sParameterName = sURLVariables[i].split('=');

                    if (sParameterName[0] === sParam) {
                        return sParameterName[1] === undefined ? true : sParameterName[1];
                    }
                }
            };

            return getUrlParameter(sParam);
        };
        var testServerLocal = Lobby.Utils.getParameterFromCurrentURL("testServerLocal");
        if(testServerLocal === "quan"){

            /* ------------------------------- localhost with PHONEGAP Simulation Server may quan ------------------------------- */
            LobbyConfig.googleAnalyticCode = "UA-68504082-2";
            LobbyConfig.GamePlayAppDomain = "http://192.168.0.12:8080";
            LobbyConfig.AppDomain = "http://192.168.0.12:8080";
            LobbyConfig.webVersionFullUrl = "http://192.168.0.12";
            //LobbyConfig.webGameVersionFullUrl = LobbyConfig.webVersionFullUrl + "/lobby-ui/";
            //LobbyConfig.webGameVersionFullUrlUnity = LobbyConfig.webVersionFullUrl + "/lobby-unity/";
            LobbyConfig.webGameVersionFullUrl = "file:///android_asset/www/index.html";
            LobbyConfig.webGameVersionFullUrlUnity = "file:///android_asset/www/index.html";
            LobbyConfig.hostNameOfWebVersion = "192.168.0.12";
            LobbyConfig.hostNameOfWebVersion2 = "192.168.0.12";
            LobbyConfig.facebookAppID = "822586904502053";
            LobbyConfig.domainGame = LobbyConfig.AppDomain + "/lobby-server-pp/";
            LobbyConfig.trialPay = "ZVR4440R4";
            //LobbyConfig.isProduction = false;
            LobbyConfig.printConsoleLog = true;

            LobbyConfig.webServiceFullUrl = LobbyConfig.AppDomain + "/lobby-server-pp";
            LobbyConfig.usingSSL = false;
            LobbyConfig.allowLoadingFacebookResource = false;
            /* ------------------------------- localhost with PHONEGAP UAT Server ------------------------------- */
        }else if(testServerLocal === "dat"){
            /* ------------------------------- localhost with PHONEGAP Simulation Server may dat ------------------------------- */
            LobbyConfig.googleAnalyticCode = "UA-68504082-2";
            LobbyConfig.GamePlayAppDomain = "http://192.168.0.19:8080";
            LobbyConfig.AppDomain = "http://192.168.0.19:8080";
            LobbyConfig.webVersionFullUrl = "http://192.168.0.19";
            //LobbyConfig.webGameVersionFullUrl = LobbyConfig.webVersionFullUrl + "/lobby-ui/";
            //LobbyConfig.webGameVersionFullUrlUnity = LobbyConfig.webVersionFullUrl + "/lobby-unity/";
            LobbyConfig.webGameVersionFullUrl = "file:///android_asset/www/index.html";
            LobbyConfig.webGameVersionFullUrlUnity = "file:///android_asset/www/index.html";
            LobbyConfig.hostNameOfWebVersion = "192.168.0.19";
            LobbyConfig.hostNameOfWebVersion2 = "192.168.0.19";
            LobbyConfig.facebookAppID = "822586904502053";
            LobbyConfig.domainGame = LobbyConfig.AppDomain + "/lobby-server-pp/";
            LobbyConfig.trialPay = "ZVR4440R4";
            //LobbyConfig.isProduction = false;
            LobbyConfig.printConsoleLog = true;

            LobbyConfig.webServiceFullUrl = LobbyConfig.AppDomain + "/lobby-server-pp";
            LobbyConfig.usingSSL = false;
            LobbyConfig.allowLoadingFacebookResource = false;
            /* ------------------------------- localhost with PHONEGAP UAT Server ------------------------------- */
        }
        

        LobbyConfig.useManagerForPopUp = false;
        LobbyConfig.botAvatar = LobbyConfig.AppDomain + "/lobby-server-pp/img/bot-avatar.png";
        //LobbyConfig.botAvatar = LobbyConfig.AppDomain + "/ppwebstatic/web_pp_img_share/default-avatar.png";
        LobbyConfig.version = "1.0.0.2015052501";
        LobbyConfig.resourceVersion = "";
        LobbyConfig.crownGameUnlocked = [];
        LobbyConfig.isFb = false;
        LobbyConfig.bonusCoinPerLevel = 0;
        LobbyConfig.bonusCrownPerLevel = 0;
        LobbyConfig.roundNumber = 0;
        LobbyConfig.numberOfGameSlotCellPerPage = 10;
        LobbyConfig.dailyStreakInfo = [];
        LobbyConfig.freeCoinGiftInfo = {};
        LobbyConfig.additionalInfo = {};

        LobbyConfig.scheduleServerNotification = 24 * 60 * 1000;
        //LobbyConfig.scheduleRealTimeNotification = 24 * 60 * 1000;
        LobbyConfig.scheduleRealTimeNotification = 10 * 1000;
        LobbyConfig.scheduleReloadFrequency = 24 * 60 * 1000;
        LobbyConfig.scheduleAdditionalInfo = 1*60*1000;

        LobbyConfig.isDebug = false;
        //LobbyConfig.isDebug = true;
        //LobbyConfig.isTestStrategy = true;
        LobbyConfig.isTestStrategy = false;
        LobbyConfig.isTestPacketStrategy = false;
        //LobbyConfig.isTestPacketStrategy = true;
        LobbyConfig.isTestAlgorithmMode = false;
        //LobbyConfig.isTestAlgorithmMode = true;
        //LobbyConfig.isTestStrategyInAlgorithmMode = true;
        LobbyConfig.isTestStrategyInAlgorithmMode = false;
        LobbyConfig.isShowDetailLogForTestAlgorithmMode = false;
        //LobbyConfig.isShowDetailLogForTestAlgorithmMode = true;
        //LobbyConfig.isMaxBet = true;
        LobbyConfig.isMaxBet = false;
        //LobbyConfig.isMediumBet = true;
        LobbyConfig.isMediumBet = false;


        LobbyConfig.autoTestLastCollectInfo = null;
        // use for test algorithm
        if(LobbyConfig.isTestAlgorithmMode) {
            LobbyConfig.timeBetween2SpinUI = 5000;
            LobbyConfig.timeBetween2SpinLocalServer = 1300;//Tinh thoi gian nezha khi chay 4 tai khoan cung luc
            LobbyConfig.ratioTimeBetweenRealAndSimulate = LobbyConfig.timeBetween2SpinUI / LobbyConfig.timeBetween2SpinLocalServer;
            LobbyConfig.time4CollectCoinOnProduction = 1800000; //30 minute
            LobbyConfig.time4WatchVideoOnProduction = 1800000; // 30 minute
            LobbyConfig.timerScheduleCollectCoinForTest = LobbyConfig.time4CollectCoinOnProduction / (LobbyConfig.ratioTimeBetweenRealAndSimulate);
            LobbyConfig.timerScheduleCollectFreeCoinForTest = 60000; //1minute
            LobbyConfig.maxNumberShowFreeVideo = 20; //1minute
            LobbyConfig.testGame = "nezha";
            LobbyConfig.isAutoTest = false;

            LobbyConfig.scaleRatioEntireGame = 0.2;
            LobbyConfig.realWidth = 1600 * LobbyConfig.scaleRatioEntireGame;//1600;
            LobbyConfig.realHeight = 900 * LobbyConfig.scaleRatioEntireGame;//900;

            LobbyConstant.TEST_ACCOUNT_TYPE_NORMAL = 0;
            LobbyConfig.testAccountType = LobbyConstant.TEST_ACCOUNT_TYPE_NORMAL;
            if(LobbyConfig.isTestStrategyInAlgorithmMode){
                LobbyConstant.TEST_ACCOUNT_TYPE_NEW_STRATEGY_NORMAL_USER = 1;
                LobbyConstant.TEST_ACCOUNT_TYPE_NEW_STRATEGY_PAID_USER = 2;
                LobbyConstant.TEST_ACCOUNT_TYPE_NEW_STRATEGY_MAGIC_ITEM_100_PERCENT_WIN = 3;
                LobbyConstant.TEST_ACCOUNT_TYPE_NEW_STRATEGY_MAGIC_ITEM_LUCKY_SPIN_10_PERCENT = 4;
                LobbyConstant.TEST_ACCOUNT_TYPE_NEW_STRATEGY_MAGIC_ITEM_LUCKY_SPIN_20_PERCENT = 5;
                LobbyConstant.TEST_ACCOUNT_TYPE_NEW_STRATEGY_MAGIC_ITEM_DOUBLE_EXP = 6;
                LobbyConstant.TEST_ACCOUNT_TYPE_NEW_STRATEGY_MAGIC_ITEM_LUCKY_SYMBOL = 7;
                LobbyConstant.TEST_ACCOUNT_TYPE_NEW_STRATEGY_LUCKY_WHEEL = 8;

                LobbyConfig.testAccountType = LobbyConstant.TEST_ACCOUNT_TYPE_NEW_STRATEGY_NORMAL_USER;
            }
        }
        LobbyConfig.PACKAGE_TYPE = {
           APPLE_PACKAGE_TYPE_UNKNOWN : 0,
       APPLE_PACKAGE_TYPE_COIN : 10,
       APPLE_PACKAGE_TYPE_COIN_1 : 11, // 400,000
       APPLE_PACKAGE_TYPE_COIN_2 : 12, // 880,000
       APPLE_PACKAGE_TYPE_COIN_3 : 13, // 2,400,000
       APPLE_PACKAGE_TYPE_COIN_4 : 14, // 7,200,000
       APPLE_PACKAGE_TYPE_COIN_5 : 15, // 24,000,000
       APPLE_PACKAGE_TYPE_COIN_6 : 16, // 70,000,000
       APPLE_PACKAGE_TYPE_COIN_7 : 17, // 200,000,000
       APPLE_PACKAGE_TYPE_CROWN : 20,
       APPLE_PACKAGE_TYPE_CROWN_1 : 21,
       APPLE_PACKAGE_TYPE_CROWN_2 : 22,
       APPLE_PACKAGE_TYPE_CROWN_3 : 23,
       APPLE_PACKAGE_TYPE_SPECIAL_OFFER : 30,
       APPLE_PACKAGE_TYPE_BOOSTER_1 : 41,
       APPLE_PACKAGE_TYPE_BOOSTER_2 : 42
        };

        LobbyConfig.MessageList = {
            Type: { Gift: 0,FreeGift: 1,SystemGift: 2,RequestKey: 3, Promote1: 4, Promote2: 5, Promote3: 6, VipUp: 7,ReferenceCode:8,TopPlayerGift:9,PlayWithFriendWithBenefit:10}
        };
        LobbyConfig.ShareFb = {
            LevelUp: {
                link_fb: "https://apps.facebook.com/playpalace/",
                picture_url: LobbyConfig.webVersionFullUrl + "/ppwebstatic/web_pp_img_share/level_up.png",
                name: "Level up",
                caption: "level up",
                info: "Congratulation"
            },
            GameUnlock: {
                link_fb: "https://apps.facebook.com/playpalace/",
                picture_url: "http://i.imgur.com/kRaxe.jpg",
                name: "Game unlock",
                caption: "Game unlock",
                info: "4"
            }
        };
        LobbyConfig.TrackGame = {
            Type: {Enter: 1,Exit: 0}
        };
        LobbyConfig.FanPage = "https://www.facebook.com/pplobby";
        LobbyConfig.PageTerm = "https://www.playpalace.com/term";
        LobbyConfig.PagePrivacy = "https://www.playpalace.com/privacy";
        LobbyConfig.listGameInfo = [];
        LobbyConfig.gamePromote = null;
        LobbyConfig.initGameUrl = function (data) {
            LobbyConfig.GameList.Domain = {};
            for (var i = 0; i < data.member.length; i++) {
                var game = data.member[i];
                switch (game.name) {
                    case "slot":
                        LobbyConfig.GameList.Domain.Slots = game.info;
                        break;
                    case "keno":
                        LobbyConfig.GameList.Domain.Keno = game.info;
                        break;
                    case "texas":
                        LobbyConfig.GameList.Domain.Texas = game.info;
                        break;
                }
            }
            LobbyConfig.GameList.RouletteAmerican = LobbyConfig.GameList.Domain.Slots + "?plogo=none&gameid=rouletteAmerican&fun=0&hidelobby=1&op="
                + LobbyConfig.op + "&token=";
            LobbyConfig.GameList.RouletteEuropean = LobbyConfig.GameList.Domain.Slots + "?plogo=none&gameid=rouletteeuropean&fun=0&hidelobby=1&op="
                + LobbyConfig.op + "&token=";
            LobbyConfig.GameList.RoulettePro = LobbyConfig.GameList.Domain.Slots + "?plogo=none&gameid=roulettepro&fun=0&hidelobby=1&op="
                + LobbyConfig.op + "&token=";
            LobbyConfig.GameList.BlackJack = LobbyConfig.GameList.Domain.Slots + "?plogo=none&gameid=blackjack&fun=0&hidelobby=1&op="
                + LobbyConfig.op + "&token=";
            LobbyConfig.GameList.JackOrBetter = LobbyConfig.GameList.Domain.Slots + "?plogo=none&gameid=jacksorbetter&fun=0&hidelobby=1&op="
                + LobbyConfig.op + "&token=";
            LobbyConfig.GameList.TexasMahjong = LobbyConfig.GameList.Domain.Texas + "?op=playpalace&token=";
            LobbyConfig.GameList.KenoSuper = LobbyConfig.GameList.Domain.Keno + "?areaid=8&plogo=none&ticket=";
            LobbyConfig.GameList.KenoAsia = LobbyConfig.GameList.Domain.Keno + "?areaid=9&plogo=none&ticket=";
        };
        LobbyConfig.GameList = {};
        LobbyConfig.ProductIdForBuyCoinSpecial = [
            LobbyConfig.AppDomain + "/callback-server-for-facebook/3600000coins.html" //6$
        ];
        LobbyConfig.ProductIdForBuyCoin = [
            LobbyConfig.AppDomain + "/callback-server-for-facebook/40000000coins.html",
            LobbyConfig.AppDomain + "/callback-server-for-facebook/20000000coins.html",
            LobbyConfig.AppDomain + "/callback-server-for-facebook/8000000coins.html",
            LobbyConfig.AppDomain + "/callback-server-for-facebook/4000000coins.html",
            LobbyConfig.AppDomain + "/callback-server-for-facebook/2000000coins.html",
            LobbyConfig.AppDomain + "/callback-server-for-facebook/800000coins.html",
            LobbyConfig.AppDomain + "/callback-server-for-facebook/400000coins.html"

            //LobbyConfig.AppDomain + "/callback-server-for-facebook-m1/40000000coins.html",
            //LobbyConfig.AppDomain + "/callback-server-for-facebook-m1/20000000coins.html",
            //LobbyConfig.AppDomain + "/callback-server-for-facebook-m1/8000000coins.html",
            //LobbyConfig.AppDomain + "/callback-server-for-facebook-m1/4000000coins.html",
            //LobbyConfig.AppDomain + "/callback-server-for-facebook-m1/2000000coins.html",
            //LobbyConfig.AppDomain + "/callback-server-for-facebook-m1/800000coins.html",
            //LobbyConfig.AppDomain + "/callback-server-for-facebook-m1/400000coins.html"
        ];
        LobbyConfig.ProductPackage = [
            LobbyConfig.AppDomain + "/callback-server-for-facebook/starter-pack.html",
            LobbyConfig.AppDomain + "/callback-server-for-facebook/30-day-coin-pack.html"
            //LobbyConfig.AppDomain + "/callback-server-for-facebook-m1/starter-pack.html",
            //LobbyConfig.AppDomain + "/callback-server-for-facebook-m1/30-day-coin-pack.html"
        ];
        LobbyConfig.ProductIdForVip = [
            LobbyConfig.AppDomain + "/callback-server-for-facebook/vip.html"
            //LobbyConfig.AppDomain + "/callback-server-for-facebook-m1/vip.html"
        ];
        LobbyConfig.ProductIdForBuyKey = [
            LobbyConfig.AppDomain + "/callback-server-for-facebook/3keys.html",
            LobbyConfig.AppDomain + "/callback-server-for-facebook/18keys.html",
            LobbyConfig.AppDomain + "/callback-server-for-facebook/45keys.html",
            LobbyConfig.AppDomain + "/callback-server-for-facebook/120keys.html"
            //LobbyConfig.AppDomain + "/callback-server-for-facebook-m1/3keys.html",
            //LobbyConfig.AppDomain + "/callback-server-for-facebook-m1/18keys.html",
            //LobbyConfig.AppDomain + "/callback-server-for-facebook-m1/45keys.html",
            //LobbyConfig.AppDomain + "/callback-server-for-facebook-m1/120keys.html"
        ];
        LobbyConfig.ProductIdForF2PPlayer = [
            LobbyConfig.AppDomain + "/callback-server-for-facebook/dynamic-pack-f2p-1.html",
            LobbyConfig.AppDomain + "/callback-server-for-facebook/dynamic-pack-f2p-2.html",
            LobbyConfig.AppDomain + "/callback-server-for-facebook/dynamic-pack-f2p-3.html"
            //LobbyConfig.AppDomain + "/callback-server-for-facebook-m1/dynamic-pack-f2p-1.html",
            //LobbyConfig.AppDomain + "/callback-server-for-facebook-m1/dynamic-pack-f2p-2.html",
            //LobbyConfig.AppDomain + "/callback-server-for-facebook-m1/dynamic-pack-f2p-3.html"
        ];
        LobbyConfig.ProductIdForP2PPlayer = [
            LobbyConfig.AppDomain + "/callback-server-for-facebook/dynamic-pack-p2p-1.html",
            LobbyConfig.AppDomain + "/callback-server-for-facebook/dynamic-pack-p2p-2.html",
            LobbyConfig.AppDomain + "/callback-server-for-facebook/dynamic-pack-p2p-3.html"
            //LobbyConfig.AppDomain + "/callback-server-for-facebook-m1/dynamic-pack-p2p-1.html",
            //LobbyConfig.AppDomain + "/callback-server-for-facebook-m1/dynamic-pack-p2p-2.html",
            //LobbyConfig.AppDomain + "/callback-server-for-facebook-m1/dynamic-pack-p2p-3.html"
        ];
        LobbyConfig.DynamicProductId = [
            LobbyConfig.AppDomain + "/callback-server-for-facebook/dynamic_product.html"
            //LobbyConfig.AppDomain + "/callback-server-for-facebook-m1/dynamic_product.html"
        ];
        LobbyConfig.ProductIdForBuyCrown = [
            LobbyConfig.AppDomain + "/callback-server-for-facebook/120crowns.html",
            LobbyConfig.AppDomain + "/callback-server-for-facebook/55crowns.html",
            LobbyConfig.AppDomain + "/callback-server-for-facebook/10crowns.html"
        ];
        LobbyConfig.CrownList = {
            0: {
                originalCoin: "",
                percent: "OVER 20% FREE",
                totalCoin: "120 Crowns",
                realMoney: "$19.99",
                specialType: "1",
                spriteName: "popup_shop_crown_3",
                totalCoinAsNumber: 120,
                realMoneyAsNumber: 20
            },
            1: {
                originalCoin: "",
                percent: "OVER 10% FREE",
                totalCoin: "55 Crowns",
                realMoney: "$9.99",
                specialType: "0",
                spriteName: "popup_shop_crown_2",
                totalCoinAsNumber: 55,
                realMoneyAsNumber: 10
            },
            2: {
                originalCoin: "",
                percent: "",
                totalCoin: "10 Crowns",
                realMoney: "$1.99",
                specialType: "1",
                spriteName: "popup_shop_crown_1",
                totalCoinAsNumber: 10,
                realMoneyAsNumber: 2
            }
        };

        LobbyConfig.CoinList = {
            0: {
                originalCoin: "$40,000,000",
                percent: "OVER 400% FREE",
                totalCoin: "200,000,000",
                realMoney: "$99.99",
                specialType: "1",
                spriteName: "popup_shop_coins_3",
                totalCoinAsNumber: 200000000,
                realMoneyAsNumber: 100
            },
            1: {
                originalCoin: "$20,000,000",
                percent: "OVER 250% FREE",
                totalCoin: "70,000,000",
                realMoney: "$49.99",
                specialType: "0",
                spriteName: "popup_shop_coins_3",
                totalCoinAsNumber: 70000000,
                realMoneyAsNumber: 50
            },
            2: {
                originalCoin: "$8,000,000",
                percent: "OVER 200% FREE",
                totalCoin: "24,000,000",
                realMoney: "$19.99",
                specialType: "2",
                spriteName: "popup_shop_coins_3",
                totalCoinAsNumber: 24000000,
                realMoneyAsNumber: 20
            },
            3: {
                originalCoin: "$4,000,000",
                percent: "OVER 80% FREE",
                totalCoin: "7,200,000",
                realMoney: "$9.99",
                specialType: "0",
                spriteName: "popup_shop_coins_2",
                totalCoinAsNumber: 7200000,
                realMoneyAsNumber: 10
            },
            4: {
                originalCoin: "$2,000,000",
                percent: "OVER 20% FREE",
                totalCoin: "2,400,000",
                realMoney: "$4.99",
                specialType: "0",
                spriteName: "popup_shop_coins_2",
                totalCoinAsNumber: 2400000,
                realMoneyAsNumber: 5
            },
            5: {
                originalCoin: "$800,000",
                percent: "OVER 10% FREE",
                totalCoin: "880,000",
                realMoney: "$1.99",
                specialType: "0",
                spriteName: "popup_shop_coins_1",
                totalCoinAsNumber: 880000,
                realMoneyAsNumber: 2
            },
            6: {
                originalCoin: "$400,000",
                percent: "",
                totalCoin: "400,000",
                realMoney: "$0.99",
                specialType: "0",
                spriteName: "popup_shop_coins_1",
                totalCoinAsNumber: 400000,
                realMoneyAsNumber: 1
            },
            7: {
                originalCoin: "",
                percent: "GET FREE COINS",
                totalCoin: "Free Coins",
                realMoney: "Free Coins",
                specialType: "1",
                spriteName: "popup_shop_trial_pay"
            }
        };

        LobbyConfig.LevelUpBonusCoins = {};
        LobbyConfig.commingSoonGameId = [
            "magicquest",
            "candylicious",
            "fruitilicious",
            "bikinibeach",
            "kpop",
            "littlemonsters",
            "mafia",
            "sherlock",
            "4beauties"
        ];
        LobbyConfig.availableGame = [
            "nezha",
            "deepblue",
            "goldenegg",
            "boxing",
            "pharaoh",
            "romanempire"
        ];
        LobbyConfig.hiddenGameId = [
            "zeus"
        ];
        LobbyConfig.ProductManager = {
            currentProduct : {},
            Android: {
                versionApp: "1.0.107",
                versionCode: "30",
                SpecialOffer: {id: "playpalace.product.50000coinsonce",alias: "400,000 coins",type:LobbyConstant.GOOGLE_PACKAGE_TYPE_SPECIAL_OFFER},
                Vip: {id: "playpalace.product.vip4once",alias: "VIP",type:LobbyConstant.GOOGLE_PACKAGE_TYPE_UNKNOWN},
                P1: {id: "playpalace.product.40000000coinsonce",alias: "40,000,000 coins",type:LobbyConstant.GOOGLE_PACKAGE_TYPE_COIN_7},
                P2: {id: "playpalace.product.20000000coinsonce",alias: "20,000,000 coins",type:LobbyConstant.GOOGLE_PACKAGE_TYPE_COIN_6},
                P3: {id: "playpalace.product.8000000coinsonce",alias: "8,000,000 coins",type:LobbyConstant.GOOGLE_PACKAGE_TYPE_COIN_5},
                P4: {id: "playpalace.product.4000000coinsonce",alias: "4,000,000 coins",type:LobbyConstant.GOOGLE_PACKAGE_TYPE_COIN_4},
                P5: {id: "playpalace.product.2000000coinsonce",alias: "2,000,000 coins",type:LobbyConstant.GOOGLE_PACKAGE_TYPE_COIN_3},
                P6: {id: "playpalace.product.800000coinsonce",alias: "800,000coins",type:LobbyConstant.GOOGLE_PACKAGE_TYPE_COIN_2},
                P7: {id: "playpalace.product.400000coinsonce",alias: "400,000coins",type:LobbyConstant.GOOGLE_PACKAGE_TYPE_COIN_1},
                Crown3: {id: "playpalace.product.10crownsonce",alias: "10crowns",type:LobbyConstant.GOOGLE_PACKAGE_TYPE_CROWN_1},
                Crown2: {id: "playpalace.product.55crownsonce",alias: "55 Crowns",type:LobbyConstant.GOOGLE_PACKAGE_TYPE_CROWN_2},
                Crown1: {id: "playpalace.product.120crownsonce",alias: "120crowns",type:LobbyConstant.GOOGLE_PACKAGE_TYPE_CROWN_3}
                ,BoosterP1: {id:"com.playpalace.product.android.uat.cordova.booster.package1",alias:"BOOSTER LEVEL UP BONUS - 3 DAYS",type:LobbyConstant.GOOGLE_PACKAGE_TYPE_BOOSTER_1}
                ,BoosterP2: {id:"com.playpalace.product.android.uat.cordova.booster.package2",alias:"BOOSTER LEVEL UP BONUS - 7 DAYS",type:LobbyConstant.GOOGLE_PACKAGE_TYPE_BOOSTER_2}
                ,LuckyWheelP1:{id:"com.playpalace.product.android.uat.cordova.luckywheel.package1",alias:"LUCKY WHEEL PACKAGE 1",type:LobbyConstant.GOOGLE_PACKAGE_TYPE_LUCKY_WHEEL_1}
                ,LuckyWheelP2:{id:"com.playpalace.product.android.uat.cordova.luckywheel.package2",alias:"LUCKY WHEEL PACKAGE 2",type:LobbyConstant.GOOGLE_PACKAGE_TYPE_LUCKY_WHEEL_2}
                ,LuckyWheelP3:{id:"com.playpalace.product.android.uat.cordova.luckywheel.package3",alias:"LUCKY WHEEL PACKAGE 3",type:LobbyConstant.GOOGLE_PACKAGE_TYPE_LUCKY_WHEEL_3}
                ,PiggyBankP1:{id:"com.playpalace.product.android.uat.cordova.piggybank.package1",alias:"PIGGY BANK",type: LobbyConstant.GOOGLE_PACKAGE_TYPE_PIGGY_BANK_1}
                ,MagicItem100PercentWin:{id:"com.playpalace.product.android.uat.cordova.magicitem.package1",alias:"MAGIC ITEM 100% WIN",type: LobbyConstant.GOOGLE_PACKAGE_TYPE_MAGIC_ITEM_100_PERCENT_WIN}
                ,MagicItem10PercentLuckySpin:{id:"com.playpalace.product.android.uat.cordova.magicitem.package2",alias:"MAGIC ITEM 10& LUCKY SPIN",type: LobbyConstant.GOOGLE_PACKAGE_TYPE_MAGIC_ITEM_LUCKY_SPIN_10_PERCENT}
                ,MagicItem20PercentLuckySpin:{id:"com.playpalace.product.android.uat.cordova.magicitem.package3",alias:"MAGIC ITEM 20& LUCKY SPIN",type: LobbyConstant.GOOGLE_PACKAGE_TYPE_MAGIC_ITEM_LUCKY_SPIN_20_PERCENT}
                ,MagicItemDoubleExp:{id:"com.playpalace.product.android.uat.cordova.magicitem.package4",alias:"MAGIC ITEM DOUBLE EXP",type: LobbyConstant.GOOGLE_PACKAGE_TYPE_MAGIC_ITEM_DOUBLE_EXP}
                ,MagicItemLuckySymbol:{id:"com.playpalace.product.android.uat.cordova.magicitem.package5",alias:"MAGIC ITEM LUCKY SYMBOL",type: LobbyConstant.GOOGLE_PACKAGE_TYPE_MAGIC_ITEM_LUCKY_SYMBOL}
            },
            IOs: {
                SpecialOffer: {id: "playpalace.product.50000coinstest",alias: "400,000 coins",type: LobbyConstant.APPLE_PACKAGE_TYPE_SPECIAL_OFFER},
                Vip: {id: "playpalace.product.vip4once",alias: "VIP",type: LobbyConstant.APPLE_PACKAGE_TYPE_UNKNOWN},
                P1: {id: "playpalace.product.40000000coinstest",alias: "40,000,000 coins",type: LobbyConstant.APPLE_PACKAGE_TYPE_COIN_7},
                P2: {id: "playpalace.product.20000000coinstest",alias: "20,000,000 coins",type: LobbyConstant.APPLE_PACKAGE_TYPE_COIN_6},
                P3: {id: "playpalace.product.8000000coinstest",alias: "8,000,000 coins" ,type: LobbyConstant.APPLE_PACKAGE_TYPE_COIN_5},
                P4: {id: "playpalace.product.4000000coinstest",alias: "4,000,000 coins",type: LobbyConstant.APPLE_PACKAGE_TYPE_COIN_4},
                P5: {id: "playpalace.product.2000000coinstest",alias: "2,000,000 coins",type: LobbyConstant.APPLE_PACKAGE_TYPE_COIN_3},
                P6: {id: "playpalace.product.800000coinstest",alias: "800,000coins",type: LobbyConstant.APPLE_PACKAGE_TYPE_COIN_2},
                P7: {id: "playpalace.product.400000coinstest",alias: "400,000coins",type: LobbyConstant.APPLE_PACKAGE_TYPE_COIN_1},
                Crown3: {id: "playpalace.product.10crownstest",alias: "10crowns",type: LobbyConstant.APPLE_PACKAGE_TYPE_CROWN_1},
                Crown2: {id: "playpalace.product.55crownstest",alias: "55 Crowns",type: LobbyConstant.APPLE_PACKAGE_TYPE_CROWN_2},
                Crown1: {id: "playpalace.product.120crownstest",alias: "120crowns",type: LobbyConstant.APPLE_PACKAGE_TYPE_CROWN_3}
                ,BoosterP1: {id:"com.playpalace.product.ios.uat.cordova.booster.package1",alias:"BOOSTER LEVEL UP BONUS - 3 DAYS",type: LobbyConstant.APPLE_PACKAGE_TYPE_BOOSTER_1}
                ,BoosterP2: {id:"com.playpalace.product.ios.uat.cordova.booster.package2",alias:"BOOSTER LEVEL UP BONUS - 7 DAYS",type: LobbyConstant.APPLE_PACKAGE_TYPE_BOOSTER_2}
                ,LuckyWheelP1:{id:"com.playpalace.product.ios.uat.cordova.luckywheel.package1",alias:"LUCKY WHEEL PACKAGE 1",type: LobbyConstant.APPLE_PACKAGE_TYPE_LUCKY_WHEEL_1}
                ,LuckyWheelP2:{id:"com.playpalace.product.ios.uat.cordova.luckywheel.package2",alias:"LUCKY WHEEL PACKAGE 2",type: LobbyConstant.APPLE_PACKAGE_TYPE_LUCKY_WHEEL_2}
                ,LuckyWheelP3:{id:"com.playpalace.product.ios.uat.cordova.luckywheel.package3",alias:"LUCKY WHEEL PACKAGE 3",type: LobbyConstant.APPLE_PACKAGE_TYPE_LUCKY_WHEEL_3}
                ,PiggyBankP1:{id:"com.playpalace.product.ios.uat.cordova.piggybank.package1",alias:"PIGGY BANK",type: LobbyConstant.APPLE_PACKAGE_TYPE_PIGGY_BANK_1}
                ,MagicItem100PercentWin:{id:"com.playpalace.product.ios.uat.cordova.magicitem.package1",alias:"MAGIC ITEM 100% WIN",type: LobbyConstant.APPLE_PACKAGE_TYPE_MAGIC_ITEM_100_PERCENT_WIN}
                ,MagicItem10PercentLuckySpin:{id:"com.playpalace.product.ios.uat.cordova.magicitem.package2",alias:"MAGIC ITEM 10& LUCKY SPIN",type: LobbyConstant.APPLE_PACKAGE_TYPE_MAGIC_ITEM_LUCKY_SPIN_10_PERCENT}
                ,MagicItem20PercentLuckySpin:{id:"com.playpalace.product.ios.uat.cordova.magicitem.package3",alias:"MAGIC ITEM 20& LUCKY SPIN",type: LobbyConstant.APPLE_PACKAGE_TYPE_MAGIC_ITEM_LUCKY_SPIN_20_PERCENT}
                ,MagicItemDoubleExp:{id:"com.playpalace.product.ios.uat.cordova.magicitem.package4",alias:"MAGIC ITEM DOUBLE EXP",type: LobbyConstant.APPLE_PACKAGE_TYPE_MAGIC_ITEM_DOUBLE_EXP}
                ,MagicItemLuckySymbol:{id:"com.playpalace.product.ios.uat.cordova.magicitem.package5",alias:"MAGIC ITEM LUCKY SYMBOL",type: LobbyConstant.APPLE_PACKAGE_TYPE_MAGIC_ITEM_LUCKY_SYMBOL}
            },
            //android va ios co id production giong nhau
            Production: {
                versionApp: "1.0.106",
                versionCode: "30",
                SpecialOffer: {id: "playpalace.product.50000coinsonce",alias: "400,000 coins"},
                Vip: {id: "playpalace.product.vip4once",alias: "VIP"},
                P1: {id: "playpalace.product.40000000coinsonce",alias: "40000000coins"},
                P2: {id: "playpalace.product.20000000coinsonce",alias: "20000000coins"},
                P3: {id: "playpalace.product.8000000coinsonce",alias: "8000000coins"},
                P4: {id: "playpalace.product.4000000coinsonce",alias: "4000000coins"},
                P5: {id: "playpalace.product.2000000coinsonce",alias: "2000000coins"},
                P6: {id: "playpalace.product.800000coinsonce",alias: "800000coins"},
                P7: {id: "playpalace.product.400000coinsonce",alias: "400000coins"},
                Crown3: {id: "playpalace.product.10crownsonce",alias: "10crowns"},
                Crown2: {id: "playpalace.product.55crownsonce",alias: "55 Crowns"},
                Crown1: {id: "playpalace.product.120crownsonce",alias: "120crowns"}
            },
            PaymentType: {
                PaymentApproved: 0,
                PaymentCancel: 1,
                PaymentError: 2,
                PaymentRefund: 3,
                PaymentPurchase: 5,
                PaymentStoreReady: 6,
                InAppPurchaseProductVersion: 6
            }
        };

        LobbyConfig.LuckyWheelItemsInfo = [
            {
                numberOfSpins: 10,
                crownRequired: 100
            },
            {
                numberOfSpins: 20,
                crownRequired: 180
            },
            {
                numberOfSpins: 30,
                crownRequired: 240
            }
        ];

        LobbyConfig.popupName = {
            popupProfile: "popupProfile",
            popupShop: "popupShop",
            popupFriend: "popupFriend",
            popupSetting: "popupSetting",
            popupAchievement: "popupAchievement",
            popupInfoSlotGame: "popupInfoSlotGame"
        };
        LobbyConfig.megaWinRate = 10.0;
        LobbyConfig.bigWinRate = 5.0;
        LobbyConfig.publicKey = "-----BEGIN PUBLIC KEY-----" +
            "MIGfMA0GCSqGSIb3DQEBAQUAA4GNADCBiQKBgQDQt603/E9cT77TsUfxv1Kd/uPF" +
            "phqTd06W+TymIixOxqLXIzrSZijgC8KubgP4dpq8hBKRmGaTZ7twdwQwvBXYO66u" +
            "l8fWvPKWpt+wgvgnD0bhdDHlGQq8rCSQDl/mK9crppMecC6fKFQYGEI/gly+O9gv" +
            "praH43QuQpnUBJQ3pQIDAQAB" +
            "-----END PUBLIC KEY-----";
        LobbyConfig.listBetSlotGame = [];
        LobbyConfig.listSlotGameDownloadedBeHideButNotYetDownloadFromUser = [];
        return LobbyConfig;
    }

    if (typeof (LobbyConfig) === 'undefined') {
        window.LobbyConfig = define();
    }
    else {
        console.log("LobbyConfig already defined.");
    }


    if(LobbyConfig.isTestAlgorithmMode) {
        LobbyConfig.getBetLevel3Unlock = function(game){
          switch (game){
              case "deepblue":{
                  return 75000;
                  break;
              }
              case "goldenegg":{
                  break;
              }
              case "nezha":{
                  return 45000;
                  break;
              }
              case "pharaoh":{
                  break;
              }
              case "boxing":{
                  break;
              }
              case "romanempire":{
                  break;
              }
          }
        };
        LobbyConfig.getBetLevel10Unlock = function(game){
          switch (game){
              case "deepblue":{
                  return 375000;
                  break;
              }
              case "goldenegg":{
                  break;
              }
              case "nezha":{
                  return 240000;
                  break;
              }
              case "pharaoh":{
                  break;
              }
              case "boxing":{
                  break;
              }
              case "romanempire":{
                  break;
              }
          }
        };
        LobbyConfig.getBetLevel18Unlock = function(game){
          switch (game){
              case "deepblue":{
                  return 625000;
                  break;
              }
              case "goldenegg":{
                  break;
              }
              case "nezha":{
                  return 1200000;
                  break;
              }
              case "pharaoh":{
                  break;
              }
              case "boxing":{
                  break;
              }
              case "romanempire":{
                  break;
              }
          }
        };

          LobbyConfig.SIMULATE_ACCOUNT_TYPE_MIN_BET = 1;
          LobbyConfig.SIMULATE_ACCOUNT_TYPE_MEDIUM_BET_SOFT = 2;
          LobbyConfig.SIMULATE_ACCOUNT_TYPE_MAX_BET_SOFT = 3;
          LobbyConfig.SIMULATE_ACCOUNT_TYPE_MEDIUM_BET_FIX = 4;
          LobbyConfig.SIMULATE_ACCOUNT_TYPE_MAX_BET_FIX = 5;
          LobbyConfig.SIMULATE_ACCOUNT_TYPE_LEVEL3_BET_SOFT = 6;
          LobbyConfig.SIMULATE_ACCOUNT_TYPE_LEVEL3_BET_FIX = 7;
          LobbyConfig.SIMULATE_ACCOUNT_TYPE_LEVEL10_BET_SOFT = 8;
          LobbyConfig.SIMULATE_ACCOUNT_TYPE_LEVEL10_BET_FIX = 9;
          LobbyConfig.SIMULATE_ACCOUNT_TYPE_LEVEL18_BET_SOFT = 10;
          LobbyConfig.SIMULATE_ACCOUNT_TYPE_LEVEL18_BET_FIX = 11;

          LobbyConfig.setSimulateAccountType = function(type,game) {
              switch (type) {
                  case LobbyConfig.SIMULATE_ACCOUNT_TYPE_MIN_BET:
                  { // min bet
                      LobbyConfig.isMaxBet = false;
                      LobbyConfig.isMediumBet = false;
                      LobbyConfig.isFixedBet = false;
                      break;
                  }
                  case LobbyConfig.SIMULATE_ACCOUNT_TYPE_MEDIUM_BET_SOFT:
                  { // medium bet soft
                      LobbyConfig.isMaxBet = false;
                      LobbyConfig.isMediumBet = true;
                      LobbyConfig.isFixedBet = false;
                      break;
                  }
                  case LobbyConfig.SIMULATE_ACCOUNT_TYPE_MAX_BET_SOFT:
                  { // max bet soft
                      LobbyConfig.isMaxBet = true;
                      LobbyConfig.isMediumBet = false;
                      LobbyConfig.isFixedBet = false;
                      break;
                  }
                  case LobbyConfig.SIMULATE_ACCOUNT_TYPE_MEDIUM_BET_FIX:
                  { // medium bet fix
                      LobbyConfig.isMaxBet = false;
                      LobbyConfig.isMediumBet = true;
                      LobbyConfig.isFixedBet = true;
                      break;
                  }
                  case LobbyConfig.SIMULATE_ACCOUNT_TYPE_MAX_BET_FIX:
                  { // max bet fix
                      LobbyConfig.isMaxBet = true;
                      LobbyConfig.isMediumBet = false;
                      LobbyConfig.isFixedBet = true;
                      break;
                  }
                  case LobbyConfig.SIMULATE_ACCOUNT_TYPE_LEVEL3_BET_SOFT:
                  { // bet level 3 unlock soft
                      LobbyConfig.isMaxBet = false;
                      LobbyConfig.isMediumBet = false;
                      LobbyConfig.isFixedBet = false;
                      LobbyConfig.expectedBet = LobbyConfig.getBetLevel3Unlock(game);
                      break;
                  }
                  case LobbyConfig.SIMULATE_ACCOUNT_TYPE_LEVEL3_BET_FIX:
                  { // bet level 3 unlock fix
                      LobbyConfig.isMaxBet = false;
                      LobbyConfig.isMediumBet = false;
                      LobbyConfig.isFixedBet = true;
                      LobbyConfig.expectedBet = LobbyConfig.getBetLevel3Unlock(game);
                      break;
                  }
                  case LobbyConfig.SIMULATE_ACCOUNT_TYPE_LEVEL10_BET_SOFT:
                  { // bet level 10 unlock soft
                      LobbyConfig.isMaxBet = false;
                      LobbyConfig.isMediumBet = false;
                      LobbyConfig.isFixedBet = false;
                      LobbyConfig.expectedBet = LobbyConfig.getBetLevel10Unlock(game);
                      break;
                  }
                  case LobbyConfig.SIMULATE_ACCOUNT_TYPE_LEVEL10_BET_FIX:
                  { // bet level 10 unlock fix
                      LobbyConfig.isMaxBet = false;
                      LobbyConfig.isMediumBet = false;
                      LobbyConfig.isFixedBet = true;
                      LobbyConfig.expectedBet = LobbyConfig.getBetLevel10Unlock(game);
                      break;
                  }
                  case LobbyConfig.SIMULATE_ACCOUNT_TYPE_LEVEL18_BET_SOFT:
                  { // bet level 18 unlock soft
                      LobbyConfig.isMaxBet = false;
                      LobbyConfig.isMediumBet = false;
                      LobbyConfig.isFixedBet = false;
                      LobbyConfig.expectedBet = LobbyConfig.getBetLevel18Unlock(game);
                      break;
                  }
                  case LobbyConfig.SIMULATE_ACCOUNT_TYPE_LEVEL18_BET_FIX:
                  { // bet level 18 unlock fix
                      LobbyConfig.isMaxBet = false;
                      LobbyConfig.isMediumBet = false;
                      LobbyConfig.isFixedBet = true;
                      LobbyConfig.expectedBet = LobbyConfig.getBetLevel18Unlock(game);
                      break;
                  }
              }
        };

    }

})(this);
