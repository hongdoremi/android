//RANDOMICALLY GET A FLOAT NUMBER BETWEEN TWO VALUES
function randomFloatBetween(minValue, maxValue, precision) {
    if (typeof (precision) === 'undefined') {
        precision = 2;
    }
    return parseFloat(Math.min(minValue + (Math.random() * (maxValue - minValue)), maxValue).toFixed(precision));
}

//FORMAT FLOAT NUMBER WITH FIXED DECIMALS
//(123456789.12345).formatMoney(2, '.', ',');
Number.prototype.formatDecimal = function (c, d, t) {
    var n = this,
        c = isNaN(c = Math.abs(c)) ? 2 : c,
        d = d === undefined ? "." : d,
        t = t === undefined ? "," : t,
        s = n < 0 ? "-" : "",
        i = parseInt(n = Math.abs(+n || 0).toFixed(c)) + "",
        j = (j = i.length) > 3 ? j % 3 : 0;
    return s + (j ? i.substr(0, j) + t : "") + i.substr(j).replace(/(\d{3})(?=\d)/g,
            "$1" + t) + (c ? d + Math.abs(n - i).toFixed(c).slice(2) : "");
};
/**
 * MANAGER NETWORK FOR SLOT GAME
 * @param my: Phaser Game Object
 * @constructor
 */
function Manager4Network(my) {
    var that = this;
    /**
     * Check if current Game Slot is valid (not null,...)
     * @returns {boolean} true if valid
     */
    this.checkValidCurrentGameSlot = function () {
        return (Lobby.Utils.objectNotNull(my.currentGameSlot));

    };
    /**
     * POST METHOD
     * @param link: link API
     * @param data: data request
     * @param callback: callback from Server - 3 callback:{beforeSend,success,error,functionName}
     */
    this.post = function(
        link,
        data,
        callback,
        callbackError
    ) {
        var start = new Date().getTime();
        $.ajax({
            url: link,
            data: data,
            cache: false,
            timeout: LobbyConstant.TIMEOUT_4_REQUEST,
            beforeSend: function () {

                if (!that.checkValidCurrentGameSlot()) {
                    return;
                }
                // this is where we append a loading image
                my.currentGameSlot.showBlock();

                if (Lobby.Utils.objectNotNull(callback) ||
                    Lobby.Utils.objectNotNull(callback.beforeSend)) {
                    callback.beforeSend();
                }
            },
            success: function (oXmlDoc) {
                if (!that.checkValidCurrentGameSlot()) {
                    return;
                }

                if(LobbyConfig.isDebug) {
                    var functionName = "";
                    if(Lobby.Utils.objectNotNull(callback) &&
                    Lobby.Utils.objectNotNull(callback.functionName)){
                        functionName = callback.functionName;
                    }
                    var xmlText = new XMLSerializer().serializeToString(oXmlDoc);
                    that.trace("-----------------------"+functionName+": " + xmlText);
                    xmlText = null;
                }

                var haveError = that.handleError(oXmlDoc, callbackError);
                if (haveError) {
                    if(LobbyConfig.isTestAlgorithmMode) {
                        var textForLogFile = "" + "spin or bonus result fail" + " -> at " + Lobby.Utils.getCurrentTimestampAndConvert2String();
                        Manager4DebugTestAlgorithm.addDebug2Log(textForLogFile);
                        if(LobbyConfig.isShowDetailLogForTestAlgorithmMode) {
                            console.log(textForLogFile);
                        }
                    }
                    return;
                }
                if(LobbyConfig.isTestAlgorithmMode) {
                    var duration = (new Date().getTime() - start);
                    var textForLogFile = "" + "spin or bonus result success duration" + Lobby.Utils.tsToStringByHourMinute(duration,":") + " -> at " + Lobby.Utils.getCurrentTimestampAndConvert2String();
                    Manager4DebugTestAlgorithm.addDebug2Log(textForLogFile);
                    if(LobbyConfig.isShowDetailLogForTestAlgorithmMode) {
                        console.log(textForLogFile);
                    }
                }

                if(Lobby.Utils.objectNotNull(my.currentGameSlot) &&
                    Lobby.Utils.objectNotNull(my.currentGameSlot.hideBlock) ) {
                    my.currentGameSlot.hideBlock();
                }

                if (Lobby.Utils.objectNotNull(callback) ||
                    Lobby.Utils.objectNotNull(callback.success)) {
                    callback.success(oXmlDoc);
                }
            },
            error: function (msg, url, line) {
                if (Lobby.Utils.objectNotNull(callback) ||
                    Lobby.Utils.objectNotNull(callback.success)) {
                    callback.error(msg, url, line);
                }

                if (!that.checkValidCurrentGameSlot()) {
                    return;
                }

                if (Lobby.Utils.objectNotNull(my.currentGameSlot) &&
                    Lobby.Utils.objectNotNull(my.currentGameSlot.hideBlock)) {
                    my.currentGameSlot.hideBlock();
                }
                that.trace('msg = ' + msg + ', url = ' + url + ', line = ' + line);
            }
        });
    };

    var ERROR_CODE = {
        WRONG_STEP: 14,
        WRONG_PARAM: 5,
        SPIN_TOO_FAST: 26,
        SERVER_MAINTENANCE: 20,
        LOGGED_SOMEWHERE_ELSE: 18,
        NOT_ENOUGH_MONEY: 10,
        COMMON_ERROR: 0
    };

    /**
     * HANDLE ERROR WHEN CALL API
     * @param oXmlDoc: XML Document received
     * @returns {boolean} true if Error
     */
    this.handleError = function (oXmlDoc, callbackError) {
        if (oXmlDoc == null || oXmlDoc == undefined) {
            //alert("Network connection was lost");
            my.currentGameSlot.s_oGame.generateLosingWheel();
            return true;
        }
        var errorCode = 0;
        if (oXmlDoc.getElementsByTagName("error") != null && oXmlDoc.getElementsByTagName("error").length > 0 &&
            oXmlDoc.getElementsByTagName("error")[0].getAttribute("code") != null &&
            oXmlDoc.getElementsByTagName("error")[0].getAttribute("code") != undefined) {
            errorCode = parseInt(oXmlDoc.getElementsByTagName("error")[0].getAttribute("code"));
        } else {
            errorCode = -1;
        }
        switch (errorCode) {
            case -1:
                break;
            case ERROR_CODE.WRONG_STEP:
                //Wrong step
                my.forceToStopBonus();
                return true;
                break;
            case ERROR_CODE.WRONG_PARAM:
                //Wrong parameter;
                my.forceToStopBonus();
                return true;
                break;
            case ERROR_CODE.SPIN_TOO_FAST:
                if (Lobby.Utils.objectNotNull(my.currentGameSlot.GameConstant) &&
                    my.currentGameSlot.GameConstant.viewNetworkResponseXml) this.trace("Error :" + errorCode);
                //alert("You spin too fast");
                //alert("Network problem (Error code = " + errorCode + ")");
                if(my.currentGameSlot.s_oGame) {
                    my.currentGameSlot.s_oGame.generateLosingWheel();
                }
                return true;
            case ERROR_CODE.SERVER_MAINTENANCE:
                if (Lobby.Utils.objectNotNull(my.currentGameSlot.GameConstant) &&
                    my.currentGameSlot.GameConstant.viewNetworkResponseXml) this.trace("Error :" + errorCode);
                //alert("Server maintenance");
                //alert("Network problem (Error code = " + errorCode + ")");
                //my.currentGameSlot.s_oGame.generateLosingWheel();
                my.forceToGoToLobby(LobbyLanguageConstant.SERVER_MAINTENANCE);
                return true;
            case ERROR_CODE.LOGGED_SOMEWHERE_ELSE:
                if (Lobby.Utils.objectNotNull(my.currentGameSlot.GameConstant) &&
                    my.currentGameSlot.GameConstant.viewNetworkResponseXml) this.trace("Error :" + errorCode);
                //alert("Your account has been logged in from another location. Please reload the game.");
                //alert("Network problem (Error code = " + errorCode + ")");
                //my.currentGameSlot.s_oGame.generateLosingWheel();
                my.forceToGoToLobby(LobbyLanguageConstant.LOGGED_SOMEWHERE_ELSE);
                return true;
            case ERROR_CODE.NOT_ENOUGH_MONEY:
                if (Lobby.Utils.objectNotNull(my.currentGameSlot.GameConstant) &&
                    my.currentGameSlot.GameConstant.viewNetworkResponseXml) this.trace("Error :" + errorCode);
                //alert("You don't have enough money");
                //alert("Sorry but you do not have enough credit. Please top up. Thank you");
                if(LobbyConfig.isTestAlgorithmMode){
                    //alert("ERROR_CODE.NOT_ENOUGH_MONEY");
                }
                my.currentGameSlot.s_oGame.generateLosingWheel();
                return true;
            case ERROR_CODE.COMMON_ERROR:
                if (Lobby.Utils.objectNotNull(my.currentGameSlot.GameConstant) &&
                    my.currentGameSlot.GameConstant.viewNetworkResponseXml) this.trace("Error :" + errorCode);
                //alert("Unspecified error. Error code: " + errorCode);
                //alert("Network problem (Error code = " + errorCode + ")");
                //my.currentGameSlot.s_oGame.generateLosingWheel();
                //my.forceToGoToLobby();
                if(Lobby.Utils.objectNotNull(callbackError)){
                    callbackError();
                }else{
                    my.forceToGoToLobby();
                }
                return true;
            default:
                if (Lobby.Utils.objectNotNull(my.currentGameSlot.GameConstant) &&
                    my.currentGameSlot.GameConstant.viewNetworkResponseXml) this.trace("Error :" + errorCode);
                //alert("Unspecified error. Error code: " + errorCode);
                //alert("Network problem (Error code = " + errorCode + ")");
                //my.currentGameSlot.s_oGame.generateLosingWheel();
                //my.forceToGoToLobby();
                if(Lobby.Utils.objectNotNull(callbackError)){
                    callbackError();
                }else{
                    my.forceToGoToLobby();
                }
                return true;
        }

        if(LobbyConfig.isTestAlgorithmMode) {
            if(errorCode !== -1) {
                var textForLogFile = "spin or bonus result fail with code " + errorCode + " -> at " + Lobby.Utils.getCurrentTimestampAndConvert2String();
                Manager4DebugTestAlgorithm.addDebug2Log(textForLogFile);
                if (LobbyConfig.isShowDetailLogForTestAlgorithmMode) {
                    console.log(textForLogFile);
                }
            }
        }

        return false;
    };

///////////////////API CALLS////////////////////////////


    /**
     * Deprecated
     */
    this.callGetFunPlayKey = function () {
        var oAjaxData = {};
        oAjaxData.iid = "vista";

        that.post(
            "http://rslotservice.viosl.com/onlinecasino/common/getfunplaykey",
            oAjaxData,
            {
                beforeSend:function () {
                },
                success:function (oXmlDoc) {

                    that.trace("data: " + oXmlDoc);
                    //var oXmlDoc = $.parseXML( data );
                    var szKey = oXmlDoc.getElementsByTagName("string")[0].childNodes[0].nodeValue;
                    my.currentGameSlot.onGetFunPlayKeyReceived(szKey);
                    that.trace("szKey: " + szKey);
                },
                error:function (msg, url, line) {
                }
            },
            function(){

            }

        );
    };
    /**
     * Reload Profile When Access Token invalid
     */
    this.alertInvalidAccessToken = function () {
        //alert("Network problem (Error code = 22)");
        Manager4MyUserInfo.getMyUserInfoFromSV(null, my, false);
    };

    this.trace = function (szMsg) {
        if (Lobby.Utils.objectNotNull(my.currentGameSlot.GameConstant) &&
            my.currentGameSlot.GameConstant.viewNetworkResponseXml) {
            console.log(szMsg);
        }
    };
    /**
     * Authorize account for current user
     */
    this.callRealPlay = function () {
        var oAjaxData = {};

        var token = "";
        token = "proxy@playpalace@36d9486a-d94a-4370-ad9d-21359f474e94";//bonus random
        //token = "proxy@playpalace@3d09953b-7fa5-4ce0-8e1d-25fe97e369cf";//bonus fs
        //token = "proxy@playpalace@7dff037f-dd88-4060-909e-2711a7273ef0";//dat account


        if(Lobby.Utils.objectNotNull(my._userData)) {
          token = my._userData.profile.accessToken;
        }

        if (token === undefined) {
            this.alertInvalidAccessToken();
            return;
        }

        //proxy@playpalace@3b150b2d-30c6-4941-ae1c-571d508d4f67
        //token = "proxy@playpalace@3d09953b-7fa5-4ce0-8e1d-25fe97e369cf";//bonus fs
        //token = "proxy@playpalace@1f39ce98-06cd-401c-9cbb-0feafd7520a2";//normal
        //token = "proxy@playpalace@053016c3-9c11-4ed7-92d1-312b8922debe";//bonus 2


        oAjaxData.accessToken = token;
        //oAjaxData.vendorid = "2";

        if (Lobby.Utils.objectNotNull(my.currentGameSlot.GameConstant) &&
            my.currentGameSlot.GameConstant.viewNetworkResponseXml) {
            console.log("authorization oAjaxData", oAjaxData);
        }
        that.post(
            my.currentGameSlot.GameConstant.domainName.gameService.authorization,
            oAjaxData,
            {
                functionName:"callRealPlay",
                beforeSend:function () {
                },
                success:function (oXmlDoc) {

                    var szKey = oXmlDoc.getElementsByTagName("string")[0].childNodes[0].nodeValue;
                    // 2016-03-18: handle error in authorizationByToken API
                    if (szKey == 'false') {
                        that.alertInvalidAccessToken();
                        return;
                    }

                    my.currentGameSlot.onGetRealPlayKeyReceived(szKey);
                    //this.trace("szKey: " + szKey);
                },
                error:function (msg, url, line) {
                    LobbyC.MainMenu.showServerErroPopup(function () {
                        that.callRealPlay();
                    }, true);
                }
            },
            function (){
                LobbyC.MainMenu.showServerErroPopup(function () {
                    that.callRealPlay();
                }, true);
            }
        );
    };

    /**
     * Request User's balance
     * @param szKey: string - key
     */
    this.callGetBalance = function (szKey) {
        var oAjaxData = {};
        oAjaxData.key = szKey;
        if (Lobby.Utils.objectNotNull(my.currentGameSlot.GameConstant) &&
            my.currentGameSlot.GameConstant.viewNetworkResponseXml) {
            console.log("callGetBalance oAjaxData", oAjaxData);
        }

        that.post(
            my.currentGameSlot.GameConstant.domainName.gameService.getBalance,
            oAjaxData,
            {
                functionName:"callGetBalance",
                beforeSend: function () {
                },
                success: function (oXmlDoc) {

                    //CHECK IF RETURN ERROR
                    if (oXmlDoc.getElementsByTagName("BALANCE")[0].childNodes[0] !== undefined && oXmlDoc.getElementsByTagName("BALANCE")[0].childNodes[0].nodeValue === "ERR") {
                        that.trace("ERROR");
                    } else {

                        for (var i = 0; i < oXmlDoc.getElementsByTagName("BALANCE")[0].attributes.length; i++) {
                            switch (oXmlDoc.getElementsByTagName("BALANCE")[0].attributes[i].name) {
                                case "CUR":
                                {
                                    var szCurrency = oXmlDoc.getElementsByTagName("BALANCE")[0].attributes[i].value;
                                    break;
                                }
                            }
                        }

                        var szCredit = parseFloat(oXmlDoc.getElementsByTagName("BALANCE")[0].childNodes[0].nodeValue);
                        my.currentGameSlot.onBalanceReceived(szCredit, szCurrency);
                    }


                },
                error: function (msg, url, line) {
                    LobbyC.MainMenu.showServerErroPopup(function(){
                        that.callGetBalance();
                    }, true);
                }
            },
        function(){
            LobbyC.MainMenu.showServerErroPopup(function(){
                that.callGetBalance();
            }, true);
        });
    };
    /**
     * Request get bets info
     * @param szKey: string - key
     */
    this.callGetBets = function (szKey) {
        var oAjaxData = {};
        oAjaxData.key = szKey;
        oAjaxData.ts = my.currentGameSlot.s_iTimeStamp = Date.now();
        if(LobbyConfig.isTestAlgorithmMode){
            oAjaxData.iiu = true;
        }
        if (Lobby.Utils.objectNotNull(my.currentGameSlot.GameConstant) &&
            my.currentGameSlot.GameConstant.viewNetworkResponseXml) {
            console.log("callGetBets oAjaxData", oAjaxData);
        }
        that.post(
            my.currentGameSlot.GameConstant.domainName.gameService.getBet,
            oAjaxData,
            {
                functionName:"callGetBets",
                beforeSend: function () {
                },
                success: function (oXmlDoc) {

                    my.currentGameSlot.onBetsReceived(oXmlDoc);

                },
                error: function (msg, url, line) {
                    LobbyC.MainMenu.showServerErroPopup(function(){
                        that.callGetBets();
                    }, true);
                }
        },
        function(){
            LobbyC.MainMenu.showServerErroPopup(function(){
                that.callGetBets();
            }, true);
        });
    };
    /**
     * Request get Spin info for test
     * @param szKey: string - key
     */
    this.callGetSpinForTest = function (szKey) {

        if(!LobbyConfig.isTestAlgorithmMode){
            this.callGetSpin(szKey);
            return;
        }

        var missingCoin = LobbyC.GameSlot.currentGameSlot.s_iTotBet - Helper.Number.unFormatNumber(LobbyC.MainMenu._userCoinText.text);
        if(LobbyConfig.isNoStopBaseOnUICoinAndTotalBet){
            missingCoin = -10;
        }

        if (missingCoin > 0) {
            my.testSpin(null,null,null,null,true);
        }else{
            //var remainEXP = LobbyC.MainMenu._userData.profile.remaining_exp;
            //if(remainEXP <= LobbyC.GameSlot.currentGameSlot.s_iTotBet*10) {
            //    var log = "Wait2sedond for spin";
            //    if(LobbyConfig.isShowDetailLogForTestAlgorithmMode){
            //        console.log(log);
            //    }
            //    Manager4DebugTestAlgorithm.addDebug2Log(log);
            //
            //    setTimeout(function(){
            //        that.callGetSpin(szKey, my.callbackSpinForTest);
            //    },1500);
            //}else{
                this.callGetSpin(szKey, my.callbackSpinForTest);
            //}
        }
    };
    /**
     * Request get Spin info
     * @param szKey: string - key
     */
    this.callGetSpin = function (szKey, callback) {
        var oAjaxData = {};
        oAjaxData.key = szKey;
        oAjaxData.bet = my.currentGameSlot.s_iMp;
        oAjaxData.lineBet = my.currentGameSlot.s_iLines;
        //if(LobbyConfig.isTestStrategy) oAjaxData.lineBet = LobbyC.GameSlot.currentPayLine;
        oAjaxData.multiply = my.currentGameSlot.s_iMultiply;
        if(LobbyConfig.isTestAlgorithmMode){
            oAjaxData.iiu = true;
        }
        //oAjaxData.lottoBall = my.currentGameSlot.s_iLottoBall;
        oAjaxData.ts = my.currentGameSlot.s_iTimeStamp;
        if(LobbyConfig.isTestAlgorithmMode) {
            oAjaxData.magicItemType = LobbyC.MainMenu.simulateStrategy.currentMagicItem?
                LobbyC.MainMenu.simulateStrategy.currentMagicItem.id : LobbyConstant.MAGIC_ITEM_TYPE_DEFAULT;
        }else {
            oAjaxData.magicItemType = LobbyConfig.additionalInfo.magicItem.currentActiveItem;
        }
        if (Lobby.Utils.objectNotNull(my.currentGameSlot.GameConstant) &&
            my.currentGameSlot.GameConstant.viewNetworkResponseXml) {
            console.log("callGetSpin oAjaxData", oAjaxData);
        }

        if(LobbyConfig.isTestAlgorithmMode) {
            var headerCoin = LobbyC.MainMenu._userCoinText.text;
            var textForLogFile = "" + "before spin key:" + oAjaxData.key + "|header coin:"+ headerCoin +"|"+ "totalbet:" + (oAjaxData.bet*oAjaxData.lineBet) +"|"+ "bet:"+oAjaxData.bet+"|"+"lineBet:"+oAjaxData.lineBet +"|"+ "multiply:"+oAjaxData.multiply +"|"+ "ts:"+oAjaxData.ts + " -> at " + Lobby.Utils.getCurrentTimestampAndConvert2String();
            Manager4DebugTestAlgorithm.addDebug2Log(textForLogFile);
            if(LobbyConfig.isShowDetailLogForTestAlgorithmMode) {
                console.log(textForLogFile);
            }
        }
        that.post(
            my.currentGameSlot.GameConstant.domainName.gameService.spin,
            oAjaxData,
            {
                functionName:"callGetSpin",
                beforeSend: function () {
                },
                success: function (oXmlDoc) {
                    if(LobbyConfig.isTestAlgorithmMode){
                        my.parseDebugInfo(oXmlDoc);
                        if (callback) {
                            callback(oAjaxData.bet * oAjaxData.lineBet);
                        }
                    }
                    if(Lobby.Utils.objectNotNull(my.currentGameSlot) &&
                        Lobby.Utils.objectNotNull(my.currentGameSlot.onSpinReceived) ) {

                        if(LobbyConfig.isTestAlgorithmMode){
                            var remainEXP = LobbyC.MainMenu._userData.profile.remaining_exp;
                            if(remainEXP <= LobbyC.GameSlot.currentGameSlot.s_iTotBet*10) {
                                var delayTime = 2500;
                                var log = "Wait2sedond for spin in " + delayTime;
                                if(LobbyConfig.isShowDetailLogForTestAlgorithmMode){
                                    console.log(log);
                                }
                                Manager4DebugTestAlgorithm.addDebug2Log(log);
                                if(LobbyC.MainMenu.simulateStrategy &&
                                    LobbyC.MainMenu.simulateStrategy.currentMagicItem  &&
                                    LobbyC.MainMenu.simulateStrategy.currentMagicItem.readXML) {
                                    LobbyC.MainMenu.simulateStrategy.currentMagicItem.readXML(oXmlDoc, function () {
                                        setTimeout(function () {
                                            my.currentGameSlot.onSpinReceived(oXmlDoc);
                                        }, delayTime);
                                    });
                                }else{
                                    setTimeout(function () {
                                        my.currentGameSlot.onSpinReceived(oXmlDoc);
                                    }, delayTime);
                                }
                            }else{
                                if(LobbyC.MainMenu.simulateStrategy &&
                                    LobbyC.MainMenu.simulateStrategy.currentMagicItem  &&
                                    LobbyC.MainMenu.simulateStrategy.currentMagicItem.readXML) {
                                    LobbyC.MainMenu.simulateStrategy.currentMagicItem.readXML(oXmlDoc, function () {
                                        my.currentGameSlot.onSpinReceived(oXmlDoc);
                                    });
                                }else{
                                    my.currentGameSlot.onSpinReceived(oXmlDoc);
                                }
                            }
                        }else {
                            LobbyC.MainMenu.handleMagicItemUsed(oXmlDoc);
                            my.currentGameSlot.onSpinReceived(oXmlDoc);
                        }

                        //LobbyC.MainMenu.handleMagicItemUsed(oXmlDoc);
                        //my.currentGameSlot.onSpinReceived(oXmlDoc);

                    }
                },
                error: function (msg, url, line) {
                    LobbyC.MainMenu.showServerErroPopup(function(){
                        that.callGetSpin(szKey);
                    }, true);
                }
            },
        function(){
            LobbyC.MainMenu.showServerErroPopup(function(){
                that.callGetSpin(szKey);
            }, true);
        });
    };

    this.callBonusForTest = function (iStep, iParam){

        this.callBonus(iStep,iParam);
    };

    /**
     * Request get Bonus info
     * @param iStep: int - step bonus
     * @param iParam: int - param bonus
     */
    this.callBonus = function (iStep, iParam) {
        my.gameSlotData.receivedBonusData = false;

        var oAjaxData = {};
        if (my.currentGameSlot.s_szRealPlayKey !== null) {
            oAjaxData.key = my.currentGameSlot.s_szRealPlayKey;
        } else {
            oAjaxData.key = my.currentGameSlot.s_szFunPlayKey;
        }

        oAjaxData.bonus = my.currentGameSlot.s_szBonusKey;
        oAjaxData.step = iStep;
        oAjaxData.param = iParam;
        oAjaxData.ts = my.currentGameSlot.s_iTimeStamp;
        if(LobbyConfig.isTestAlgorithmMode){
            oAjaxData.iiu = true;
        }
        if (Lobby.Utils.objectNotNull(my.currentGameSlot.GameConstant) &&
            my.currentGameSlot.GameConstant.viewNetworkResponseXml) {
            console.log("callBonus oAjaxData", oAjaxData);
        }



        if(LobbyConfig.isTestAlgorithmMode) {
            var textForLogFile = "" + "before callbonus bonus:" + oAjaxData.bonus + +"|"+"step:"+oAjaxData.step+"|"+"param:"+oAjaxData.param +"|"+"ts:"+oAjaxData.ts + " -> at " + Lobby.Utils.getCurrentTimestampAndConvert2String();
            Manager4DebugTestAlgorithm.addDebug2Log(textForLogFile);
            if(LobbyConfig.isShowDetailLogForTestAlgorithmMode) {
                console.log(textForLogFile);
            }
        }

        that.post(
            my.currentGameSlot.GameConstant.domainName.gameService.bonusGame,
            oAjaxData,
            {
                functionName:"callBonus",
                beforeSend: function () {
                },
                success: function (oXmlDoc) {
                    if(LobbyConfig.isTestAlgorithmMode){
                        my.parseDebugInfo(oXmlDoc);
                    }
                    my.gameSlotData.receivedBonusData = true;
                    my.currentGameSlot.onBonusReceived(oXmlDoc);

                },
                error: function (msg, url, line) {
                    LobbyC.MainMenu.showServerErroPopup(function(){
                        that.callBonus(iStep, iParam);
                    }, true);
                }
            },
        function(){
            LobbyC.MainMenu.showServerErroPopup(function(){
                that.callBonus(iStep, iParam);
            }, true);
        });
    }
}
