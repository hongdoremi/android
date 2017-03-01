/**
 * Created by tuynu on 9/24/2016.
 */
/**
 * URL PARAMETER
 *  @param testServerLocal: string - name of the local Server ("quan" or "dat")
 *  @param tokenDebugAPI: string -  token debug - using for call api test strategy
 *  @param isAutoTest: boolen - auto go to game and play
 *  @param testGame: string -  test game Id ("nezha", "deepblue", ...)
 *  @param simulateType: number - Id of this simulate type
 *  @param browserID: number - identity number for current browser - to distinguishn from others browser
 *  @param isFixedSimulateType: boolen - set simulateType changeable status (true : simulateType won't change when browser reload)
 *  @param isAutoLogin: boolen - auto login to lobby
 *  @param isMaxBet: boolen - (true: this is max bet test)
 *  @param isMediumBet: boolen - (true: this is max bet test)
 *  @param isFixedBet: boolen - (true: the bet wont reduce when player lack of money)
 *  @param expectedBet: number - number of expected bet
 *  @param isNoStopBaseOnUICoinAndTotalBet: boolen - (true: when player lack of money, check that base on server not client)
 *  @param testAccountType: number - Id of this test Strategy type
 *  @param autoLoginAccountType: number - auto login with special account; 0 if login guest, 1 if login pp account
 *  @param isAutoExportBK : boolean - true:auto export bk file after 10 minute
 *
 * URL Auto login
 *  - Auto login
 *
 *  URl Test Strategy Example:
 *      - Normal user: URL/?testServerLocal=quan&tokenDebugAPI=qFKzQjnTX9x37FvV&isAutoTest=true
 *      - Paid user: URL/?testServerLocal=quan&tokenDebugAPI=qFKzQjnTX9x37FvV&isAutoTest=true&testAccountType=2
 *      - 100% win: URL/?testServerLocal=quan&tokenDebugAPI=qFKzQjnTX9x37FvV&isAutoTest=true&testAccountType=3
 *      - Lucky Spin 10: URL/?testServerLocal=quan&tokenDebugAPI=qFKzQjnTX9x37FvV&isAutoTest=true&testAccountType=4
 *      - Lucky Spin 20: URL/?testServerLocal=quan&tokenDebugAPI=qFKzQjnTX9x37FvV&isAutoTest=true&testAccountType=5
 *      - Double EXP: URL/?testServerLocal=quan&tokenDebugAPI=qFKzQjnTX9x37FvV&isAutoTest=true&testAccountType=6
 *      - Lucky Symbol: URL/?testServerLocal=quan&tokenDebugAPI=qFKzQjnTX9x37FvV&isAutoTest=true&testAccountType=7
 *      - Lucky Wheel: URL/?testServerLocal=quan&tokenDebugAPI=qFKzQjnTX9x37FvV&isAutoTest=true&testAccountType=8
 */

var Manager4DebugTestAlgorithm = new function () {
    var arrayOfLog = [];
    var log = "";
    var that = this;

    this.addDebug2Log = function(debugLine){
        arrayOfLog.push([debugLine]);
        log += (debugLine+"\n");
    };

    this.export2LogFile = function(name, isExportBKFile){
        //Manager4ExportExcel.exportTable(arrayOfLog);

        var textFile = null;
        var makeTextFile = function (text) {
                var data = new Blob([text], {type: 'text/plain'});

                // If we are replacing a previously generated file we need to
                // manually revoke the object URL to avoid memory leaks.
                if (textFile !== null) {
                    window.URL.revokeObjectURL(textFile);
                }

                textFile = window.URL.createObjectURL(data);

                // returns a URL you can use as a href
                return textFile;
            };

        var bkFileEnd = "";
        if(isExportBKFile === true){
            bkFileEnd = "_BK";
        }

        var link = document.createElement('a');
        link.setAttribute('download', (Lobby.Utils.objectNotNull(name) ? name : LobbyC.GameSlot.createDownloadName()) +"_log"+bkFileEnd+".txt");
        link.href = makeTextFile(log);
        document.body.appendChild(link);

        // wait for the link to be added to the document
        window.requestAnimationFrame(function () {
            var event = new MouseEvent('click');
            link.dispatchEvent(event);
            document.body.removeChild(link);
        });

    };
    /**
     * By Dat
     * @param my
     */
    this.initGetDailyBonus4Test = function(my){
        if(!LobbyConfig.isTestAlgorithmMode) return;
        Manager4Spin.getSpinFromSV(
            function (spinInfo) {
                if(Lobby.Utils.objectNotNull(spinInfo)) {
                    //if(LobbyConfig.isDebug) {
                    console.log("Auto Collecting daily bonus with " + spinInfo.total_coin + " coins" + " -> at " + Lobby.Utils.getCurrentTimestampAndConvert2String());
                    //}
                    LobbyC.MainMenu.updateUserInfoFromSV(
                        function () {
                        },
                        function () {
                        },
                        false // isGetStatisticData
                    );

                }
            }
        );
    };
    /**
     * Init schedule for get and collect achievement for test algorithm
     * @param my
     */
    this.initScheduleGetAndCollectAchievement4Test = function(my){
        if(!LobbyConfig.isTestAlgorithmMode) return;
        var callbackLoop = function(achievementData){
            if(achievementData === null) {
                console.log("Collecting achievement failed");
                isCollectingAchievement = false;
                return;
            }

            LobbyRequest.User.getAchievementList(
                function (data) {
                    if(data == null) return;
                    my._currentAchievementListOfUser = data.member;
                    var achievementList = data.member;
                    for(var i = 0;i<achievementList.length;i++){
                        var achievement = achievementList[i];
                        if(achievement.is_complete && !achievement.is_collected){
                            var bonus;
                            if(achievement.crown_reward == 0) {
                                bonus = achievement.coin_reward + " coins";
                                LobbyConfig.totalCoinOfCollectAchivement+=achievement.coin_reward;
                            }
                            else {
                                bonus = achievement.crown_reward + " crowns";
                                LobbyConfig.totalCrownOfCollectAchivement += achievement.crown_reward;
                            }

                            LobbyConfig.achievementCollectedName.push(achievement.name);
                            LobbyConfig.numberOfCollectAchivement++;

                            var logAchiment = "Auto Collecting achievement  " + achievement.achievement_id + " " + achievement.name + " " + bonus + " -> at " + Lobby.Utils.getCurrentTimestampAndConvert2String();
                            if(LobbyConfig.isShowDetailLogForTestAlgorithmMode) {
                                console.log(logAchiment);
                            }
                            Manager4DebugTestAlgorithm.addDebug2Log(logAchiment);

                            isCollectingAchievement = true;
                            LobbyRequest.User.collectAchievement(
                                achievement.achievement_id,
                                function(achivementInfo){
                                    LobbyC.MainMenu.updateUserInfoFromSV(
                                        function () {
                                        },
                                        function () {
                                        },
                                        false // isGetStatisticData
                                    );
                                    callbackLoop(achivementInfo);
                                },
                                my,
                                false
                            );
                            return;
                        }
                    }
                    isCollectingAchievement = false;
                    //console.log("All achievement has been collected.");

                },
                my, false);
        };
        setInterval(function () {
            if (isCollectingAchievement) return;
            callbackLoop({});
        },
        15000);
    };

    /**
     * By Dat
     * Init schedule for collect coin for test
     * @param my
     */
    this.initScheduleCollectFreeCoinGift4Test = function(my){
        if(!LobbyConfig.isTestAlgorithmMode){
            return;
        }
        that.getFreeCoinGift4Test();
    };

    /**
     * by Dat
     */
    this.getFreeCoinGift4Test = function(){
        LobbyRequest.User.getFreecoinVideo(
            function (data) {
                if (data !== null) {
                    LobbyC.MainMenu.updateUserInfoFromSV(
                        function () {
                        },
                        function () {
                        },
                        false // isGetStatisticData
                    );
                    var log = "COLLECTED BONUS COIN: 50000 -> at " + Lobby.Utils.getCurrentTimestampAndConvert2String();
                    if(LobbyConfig.isShowDetailLogForTestAlgorithmMode) {
                        console.log(log);
                    }
                    Manager4DebugTestAlgorithm.addDebug2Log(log);

                    LobbyConfig.numberOfCollectBonusHour++;
                    LobbyConfig.totalCoinOfCollectBonusHour += 50000;
                    LobbyConfig.totalCoinOfCollectBonusHourWithoutReset += 50000;
                }

            });
    };

    /**
     * By Dat
     */
    this.checkForCollectFreeCoinGift4Test = function(){
        if(!LobbyConfig.isTestAlgorithmMode){
            return;
        }
        var my = LobbyC.MainMenu;
        if(Lobby.Utils.objectNotNull(LobbyConfig.durationFromLastCollectBonusHours) &&
            LobbyConfig.durationFromLastCollectBonusHours >= LobbyConfig.time4CollectCoinOnProduction){
            LobbyConfig.durationFromLastCollectBonusHours = 0;


            that.getFreeCoinGift4Test();
        }
    };
    /**
     * By Dat
     * Init schedule for collect coin for test
     * @param my
     */
    this.initScheduleCollectVideoCoinForTest = function(my){
        if(!LobbyConfig.isTestAlgorithmMode){
            return;
        }
        LobbyConfig.numberOfCollectFreecoinForTest = 0;
        ManagerForAdvertise.showVideoForTest(null);

    };
    /**
     * By Dat
     * check and watch video
     */
    this.checkForWatchVideo = function(){
        if(Lobby.Utils.objectNotNull(LobbyConfig.durationFromLastWatchVideo) &&
            LobbyConfig.durationFromLastWatchVideo >= LobbyConfig.time4WatchVideoOnProduction){
            ManagerForAdvertise.showVideoForTest(null);
        }
    };
    this.callAPIFreeCoinGift = function(numberOfFreeCoinGift,referenceKey,resultCallBack){
        var previousIsTestAlgorithmMode = LobbyConfig.isTestAlgorithmMode;
        LobbyConfig.isTestAlgorithmMode = true;
        var callback = function(isSuccess,data,response){
            resultCallBack(isSuccess,data,response);
        };
        var token  =  "";
        if(Lobby.Utils.objectNotNull(referenceKey)) token = referenceKey;
        else{
            token = Lobby.Utils.getParameterFromCurrentURL("tokenDebugAPI");
        }
        var postData = {
            token: token,
            simulatorAPIType:  LobbyConstant.SIMULATOR_API_TYPE_COLLECT_FREE_COIN_GIFT_REWARD,
            numberOfDailyBonusStreakDay: 0,
            numberOfTimesCollectFreeCoinGift: numberOfFreeCoinGift,
            productType: 0
        };
        this.callAutoAPIToServer4Test(postData,LobbyConstant.SIMULATOR_API_TYPE_COLLECT_FREE_COIN_GIFT_REWARD,callback);
        LobbyConfig.isTestAlgorithmMode = previousIsTestAlgorithmMode;
    };
    this.callAPILuckySpinDaily = function(referenceKey,resultCallBack){
        var previousIsTestAlgorithmMode = LobbyConfig.isTestAlgorithmMode;
        LobbyConfig.isTestAlgorithmMode = true;
        var callback = function(isSuccess,data,response){
            if(Lobby.Utils.objectNotNull(resultCallBack)) {
                resultCallBack(isSuccess, data, response);
            }
        };
        var token  =  "";
        if(Lobby.Utils.objectNotNull(referenceKey)) token = referenceKey;
        else{
            token = Lobby.Utils.getParameterFromCurrentURL("tokenDebugAPI");
        }
        var postData = {
            token: token,
            simulatorAPIType:  LobbyConstant.SIMULATOR_API_TYPE_COLLECT_DAILY_BONUS_LUCKY_SPIN_REWARD,
            productType: 0
        };
        this.callAutoAPIToServer4Test(postData,null,callback);
        LobbyConfig.isTestAlgorithmMode = previousIsTestAlgorithmMode;
    };
    this.callAPIDailyBonusStreak = function(numberOfDailyBonusStreak,referenceKey,resultCallBack){
        var previousIsTestAlgorithmMode = LobbyConfig.isTestAlgorithmMode;
        LobbyConfig.isTestAlgorithmMode = true;
        var callback = function(isSuccess,data,response){
            if(Lobby.Utils.objectNotNull(resultCallBack)) {
                resultCallBack(isSuccess, data, response);
            }
        };
        var token  =  "";
        if(Lobby.Utils.objectNotNull(referenceKey)) token = referenceKey;
        else{
            token = Lobby.Utils.getParameterFromCurrentURL("tokenDebugAPI");
        }
        var postData = {
            token: token,
            numberOfDailyBonusStreakDay: numberOfDailyBonusStreak,
            simulatorAPIType:  LobbyConstant.SIMULATOR_API_TYPE_COLLECT_DAILY_BONUS_STREAK_REWARD,
            productType: 0
        };

        this.callAutoAPIToServer4Test(postData,null,callback);

        LobbyConfig.isTestAlgorithmMode = previousIsTestAlgorithmMode;
    };
    this.simulateVideo = function(callback){
        var postData = {
            token: Lobby.Utils.getParameterFromCurrentURL("tokenDebugAPI"),
            simulatorAPIType: LobbyConstant.SIMULATOR_API_TYPE_VIEW_VIDEO,
            productType: 0
        };
        this.callAutoAPIToServer4Test(postData,LobbyConstant.SIMULATOR_API_TYPE_VIEW_VIDEO,callback);
    };
    /**
     * by Dat
     */
    this.callAutoAPIToServer4Test = function(postData, simulatorAPIType,resultCallBack){
        //if(!LobbyConfig.isTestStrategy){
        //    return;
        //}
        if(!LobbyConfig.isTestAlgorithmMode){
            return;
        }

        //var postData = {
        //    token: Lobby.Utils.getParameterFromCurrentURL("tokenDebugAPI"),
        //    simulatorAPIType: simulatorAPIType,
        //    numberOfDailyBonusStreakDay: 0,
        //    numberOfTimesCollectFreeCoinGift: 0,
        //    productType: 0
        //};
        //switch (simulatorAPIType) {
        //    case LobbyConstant.SIMULATOR_API_TYPE_VIEW_VIDEO:
        //        break;
        //    case LobbyConstant.SIMULATOR_API_TYPE_COLLECT_DAILY_BONUS_STREAK_REWARD:
        //        postData.numberOfDailyBonusStreakDay = 1;
        //        break;
        //    case LobbyConstant.SIMULATOR_API_TYPE_COLLECT_FREE_COIN_GIFT_REWARD:
        //        postData.numberOfDailyBonusStreakDay = 0;
        //        break;
        //    case LobbyConstant.SIMULATOR_API_TYPE_COLLECT_DAILY_BONUS_LUCKY_SPIN_REWARD:
        //        break;
        //    case LobbyConstant.SIMULATOR_API_TYPE_COLLECT_DAILY_BONUS_WHEEL_REWARD:
        //        break;
        //    case LobbyConstant.SIMULATOR_API_TYPE_RESET_DAILY_CHALLENGE:
        //        break;
        //    case LobbyConstant.SIMULATOR_API_TYPE_BUY_BOOSTER_PACKAGE:
        //        postData.productType = LobbyConstant.GOOGLE_PACKAGE_TYPE_BOOSTER_1;
        //        //postData.productType = LobbyConstant.GOOGLE_PACKAGE_TYPE_BOOSTER_2;
        //        break;
        //    case LobbyConstant.SIMULATOR_API_TYPE_BUY_PIGGY_BANK:
        //        postData.productType = LobbyConstant.GOOGLE_PACKAGE_TYPE_PIGGY_BANK_1;
        //        break;
        //    case LobbyConstant.SIMULATOR_API_TYPE_BUY_MAGIC_ITEM:
        //        postData.productType = LobbyConstant.GOOGLE_PACKAGE_TYPE_MAGIC_ITEM_100_PERCENT_WIN;
        //        //postData.productType = LobbyConstant.GOOGLE_PACKAGE_TYPE_MAGIC_ITEM_LUCKY_SPIN_10_PERCENT;
        //        //postData.productType = LobbyConstant.GOOGLE_PACKAGE_TYPE_MAGIC_ITEM_LUCKY_SPIN_20_PERCENT;
        //        //postData.productType = LobbyConstant.GOOGLE_PACKAGE_TYPE_MAGIC_ITEM_DOUBLE_EXP;
        //        //postData.productType = LobbyConstant.GOOGLE_PACKAGE_TYPE_MAGIC_ITEM_LUCKY_SYMBOL;
        //        break;
        //    case LobbyConstant.SIMULATOR_API_TYPE_BUY_LUCKY_WHEEL:
        //        postData.productType = LobbyConstant.GOOGLE_PACKAGE_TYPE_LUCKY_WHEEL_1;
        //        //postData.productType = LobbyConstant.GOOGLE_PACKAGE_TYPE_LUCKY_WHEEL_2;
        //        //postData.productType = LobbyConstant.GOOGLE_PACKAGE_TYPE_LUCKY_WHEEL_3;
        //        break;
        //}
        var callback = function (isSuccess, data, response) {
            console.log(arguments);
            if(isSuccess){
                LobbyC.MainMenu.updateUserInfoFromSV(
                    function () {

                    },
                    function () {
                    },
                    false // isGetStatisticData
                );
            }
            if(Lobby.Utils.objectNotNull(resultCallBack)){
                resultCallBack(isSuccess,data,response);
            }
        };
        var token = Lobby.Utils.getParameterFromCurrentURL("tokenDebugAPI");
        if(!Lobby.Utils.isWeb()) token = postData.token;
        LobbyRequest.User.simulateStrategyFeature(
            token,
            postData.simulatorAPIType,
            postData.numberOfDailyBonusStreakDay,
            postData.numberOfTimesCollectFreeCoinGift,
            postData.productType,
            callback
        );
    };
    /**
     * By Duy
     */
    this.startSimulateStrategy = function(my, callbackPlayGame){
        if(!LobbyConfig.isTestAlgorithmMode || !LobbyConfig.isTestStrategyInAlgorithmMode){
            return;
        }

        if(LobbyConfig.testAccountType == LobbyConstant.TEST_ACCOUNT_TYPE_NEW_STRATEGY_LUCKY_WHEEL) {
            //Info to export;
            my.simulateLuckyWheel = {
                package10: {
                    type: 10,
                    productType: LobbyConstant.GOOGLE_PACKAGE_TYPE_LUCKY_WHEEL_1,
                    crownRequired: 100,
                    moneyRequired: 20,
                    aInfo: []
                },
                package20: {
                    type: 20,
                    productType: LobbyConstant.GOOGLE_PACKAGE_TYPE_LUCKY_WHEEL_2,
                    crownRequired: 180,
                    moneyRequired: 36,
                    aInfo: []
                },
                package30: {
                    type: 30,
                    productType: LobbyConstant.GOOGLE_PACKAGE_TYPE_LUCKY_WHEEL_3,
                    crownRequired: 240,
                    moneyRequired: 48,
                    aInfo: []
                },
                luckyWheelInfo: {
                    totalCoin: 0,
                    totalCrown: 0
                },
                maxSpin: 1200,
                currentSpin: 0
            };

            my.simulateLuckyWheel.pushInfo = function(_package, data){
                if(my.simulateLuckyWheel.currentSpin % _package.type == 0){
                    _package.aInfo.push({
                        totalCoin: 0,
                        totalCrown: 0
                    });
                }
                _package.aInfo[_package.aInfo.length - 1].totalCoin += data.coin_reward;
                _package.aInfo[_package.aInfo.length - 1].totalCrown += data.crown_reward;
            };

            my.simulateLuckyWheel.calculateMoneyToBuyCrown = function(packageCrown){
                var totalMoney = 0;
                var remain = packageCrown;
                var crownInfo;
                for(var key in LobbyConfig.CrownList){
                    crownInfo = LobbyConfig.CrownList[key];
                    while(remain >= crownInfo.totalCoinAsNumber){
                        totalMoney += crownInfo.realMoneyAsNumber;
                        remain -= crownInfo.totalCoinAsNumber;
                    }
                }
                if(remain > 0){
                    totalMoney += crownInfo.realMoneyAsNumber;
                }
                return totalMoney;
            };

            my.simulateLuckyWheel.calculateMoneyToBuyCoin = function(packageCrown){
                var totalMoney = 0;
                var remain = packageCrown;
                var coinInfo;
                for(var key in LobbyConfig.CoinList){
                    if(Lobby.Utils.objectNotNull(LobbyConfig.CoinList[key].realMoneyAsNumber)) {
                        coinInfo = LobbyConfig.CoinList[key];
                        while (remain >= coinInfo.totalCoinAsNumber) {
                            totalMoney += coinInfo.realMoneyAsNumber;
                            remain -= coinInfo.totalCoinAsNumber;
                        }
                    }
                }
                if(remain > 0){
                    totalMoney += coinInfo.realMoneyAsNumber;
                }
                return totalMoney;
            };

            my.simulateLuckyWheel.calculateMoneyToBuyReward = function(coinReward, crownReward){
                return my.simulateLuckyWheel.calculateMoneyToBuyCoin(coinReward) +
                    my.simulateLuckyWheel.calculateMoneyToBuyCrown(crownReward);
            };

            my.simulateLuckyWheel.autoSpin = function(){
                LobbyC.LuckyWheel.wheel.isSpining = true;
                LobbyRequest.User.spinLuckyWheel(function(isSuccess,data, response){
                    if(!isSuccess){
                        my.simulateLuckyWheel.buy(true, function(){
                            my.simulateLuckyWheel.autoSpin();
                        });
                        return;
                    }
                    LobbyC.MainMenu.updateUserInfoFromSV();

                    LobbyConfig.additionalInfo.luckyWheel.coinReward = data.coin_reward;
                    LobbyConfig.additionalInfo.luckyWheel.crownReward = data.crown_reward;
                    LobbyConfig.additionalInfo.luckyWheel.remainingSpin = data.remaining_spin;

                    my.simulateLuckyWheel.luckyWheelInfo.totalCoin += data.coin_reward;
                    my.simulateLuckyWheel.luckyWheelInfo.totalCrown += data.crown_reward;

                    var textForLogFile = (my.simulateLuckyWheel.currentSpin + 1) + ". LUCKY SPIN" + " | " +
                        "Coin reward: " + data.coin_reward + " | " +
                        "Crown reward: " + data.crown_reward + " | " +
                        "Total Coin: " + my.simulateLuckyWheel.luckyWheelInfo.totalCoin + " | " +
                        "Total Crown: " + my.simulateLuckyWheel.luckyWheelInfo.totalCrown;

                    Manager4DebugTestAlgorithm.addDebug2Log(textForLogFile);

                    my.simulateLuckyWheel.pushInfo(my.simulateLuckyWheel.package10, data);
                    my.simulateLuckyWheel.pushInfo(my.simulateLuckyWheel.package20, data);
                    my.simulateLuckyWheel.pushInfo(my.simulateLuckyWheel.package30, data);

                    LobbyC.LuckyWheel.reloadLuckyWheelSpins(LobbyConfig.additionalInfo.luckyWheel.remainingSpin);

                    my.simulateLuckyWheel.currentSpin++;
                    if(my.simulateLuckyWheel.currentSpin == my.simulateLuckyWheel.maxSpin){
                        my.simulateLuckyWheel.export();
                        return;
                    }
                    if(LobbyConfig.additionalInfo.luckyWheel.remainingSpin == 0) {
                        my.simulateLuckyWheel.buy(true, function(){
                            my.simulateLuckyWheel.autoSpin();
                        });
                    }else{
                        my.simulateLuckyWheel.autoSpin();
                    }
                });
            };

            my.simulateLuckyWheel.export = function(){
                var titleTable = ["STT", "Spin", "Coin Reward", "Crown Reward",
                    "Package's Price as Crown", "Package's Price as Real Money",
                    "Package's Price as Real Money (Shop)", "Reward's Price as Real Money (Shop)"];

                my.simulateLuckyWheel.getArrayInfoToExport = function(_package){
                    var array = [titleTable];
                    for(var i = 0; i < _package.aInfo.length; ++i){
                        array.push([
                            i + 1,
                            _package.type,
                            _package.aInfo[i].totalCoin,
                            _package.aInfo[i].totalCrown,
                            _package.crownRequired,
                            _package.moneyRequired,
                            my.simulateLuckyWheel.calculateMoneyToBuyCrown(_package.crownRequired),
                            my.simulateLuckyWheel.calculateMoneyToBuyReward(_package.aInfo[i].totalCoin, _package.aInfo[i].totalCrown)
                        ])
                    }
                    return array;
                };


                Manager4ExportExcel.exportTable(
                    my.simulateLuckyWheel.getArrayInfoToExport(my.simulateLuckyWheel.package10),
                    null, true, null, "LuckyWheel_10"
                );
                Manager4ExportExcel.exportTable(
                    my.simulateLuckyWheel.getArrayInfoToExport(my.simulateLuckyWheel.package20),
                    null, true, null, "LuckyWheel_20"
                );
                Manager4ExportExcel.exportTable(
                    my.simulateLuckyWheel.getArrayInfoToExport(my.simulateLuckyWheel.package30),
                    null, true, null, "LuckyWheel_30"
                );

                Manager4DebugTestAlgorithm.export2LogFile("LuckyWheel");
            };

            my.simulateLuckyWheel.buy = function(isOnlyBuy, callback){
                var postData = {
                    simulatorAPIType: LobbyConstant.SIMULATOR_API_TYPE_BUY_LUCKY_WHEEL,
                    productType: LobbyConstant.GOOGLE_PACKAGE_TYPE_LUCKY_WHEEL_2
                };
                Manager4DebugTestAlgorithm.callAutoAPIToServer4Test(postData, LobbyConstant.SIMULATOR_API_TYPE_BUY_LUCKY_WHEEL, function (isSuccess, data, response) {
                    if (isSuccess) {
                        if(!isOnlyBuy){
                            my.prepareToChangeStateFromMainMenu();
                            my.state.start(
                                LobbyConstant.stateName.LuckyWheel,
                                LobbyConfig.isDestroyWorldFromMainMenu2GameSlot,
                                false,
                                my._userData
                            );
                        }
                    }
                    if(callback){
                        callback();
                    }
                });
            };
            my.simulateLuckyWheel.buy();
        }else {
            var createPropertySimulate = function (prop) {
                prop.totalCoinReward = 0;
                prop.totalCrownReward = 0;
                prop.totalCollected = 0;

                prop.currentCoinReward = 0;
                prop.currentCrownReward = 0;
                prop.currentCollected = 0;
                prop.onCollected = function (isSuccess, data) {
                    if (isSuccess) {
                        prop.totalCollected++;
                        prop.currentCollected++;

                        var coin = data.coin_reward ? data.coin_reward : 0;
                        prop.totalCoinReward += coin;
                        prop.currentCoinReward += coin;

                        var crown = data.crown_reward ? data.crown_reward : 0;
                        prop.totalCrownReward += crown;
                        prop.currentCrownReward += crown;

                        console.log(prop.name +
                            " (totalCoin: " + prop.totalCoinReward +
                            "; totalCrown: " + prop.totalCrownReward +
                            "; totalCollected: " + prop.totalCollected + ")");
                    }
                };
                prop.resetAfterLevelUp = function () {
                    prop.currentCoinReward = 0;
                    prop.currentCrownReward = 0;
                    prop.currentCollected = 0;
                }
            };

            var createPropertyMagicItemSimulate = function (prop) {
                prop.remain = 0;
                prop.array = [];
                prop.simulateType = LobbyConstant.SIMULATOR_API_TYPE_BUY_MAGIC_ITEM;
                if (prop.id == LobbyConstant.MAGIC_ITEM_TYPE_DOUBLE_EXP) {
                    prop.startTimer = function () {
                        if (prop.interval) {
                            Lobby.PhaserJS.clearInterval(prop.interval);
                        }
                        prop.interval = ScheduleManager.setInterval(function () {
                            prop.remain -= 1000;
                            if (prop.remain <= 60 * 1000) {
                                prop.buy();
                                Lobby.PhaserJS.clearInterval(prop.interval);
                            }
                        }, 1000);
                    }
                } else {
                    prop.currentSpin = 0;
                    prop.readXML = function (oXmlDoc, callback) {
                        var magicItem = oXmlDoc.getElementsByTagName('magicitem')[0];
                        if (magicItem) {
                            var remaining = magicItem.getAttribute('remainingMagicItem');
                            if (remaining) {
                                prop.remain = parseInt(remaining);
                            }
                            var info = {
                                win: parseFloat(oXmlDoc.getElementsByTagName('win')[0].childNodes[0].nodeValue),
                                totalBet: parseFloat(oXmlDoc.getElementsByTagName('spin')[0].getAttribute('totalbet'))
                            };
                            info.userGet = info.win - info.totalBet;
                            info.level = my._userData.profile.level + 1;

                            var magicItemWin = parseFloat(magicItem.getAttribute('win'));
                            if (Lobby.Utils.objectNotNull(magicItemWin)) {
                                var numberSymbolWin = parseInt(magicItem.getAttribute('numberOfLuckySymbolWin'));
                                if (Lobby.Utils.objectNotNull(numberSymbolWin)) {
                                    info.numberSymbolWin = numberSymbolWin;
                                }
                                info.magicItemWin = magicItemWin;
                            }

                            prop.add(info, callback);
                        } else {
                            console.log("BUG");
                            if (callback) {
                                callback();
                            }
                        }
                    };
                    if (prop.id == LobbyConstant.MAGIC_ITEM_TYPE_LUCKY_SYMBOL) {
                        prop.startTimer = function () {
                            if (prop.interval) {
                                Lobby.PhaserJS.clearInterval(prop.interval);
                            }
                            prop.interval = ScheduleManager.setInterval(function () {
                                prop.remain -= 1000;
                                if (prop.remain <= 60 * 1000) {
                                    prop.buy();
                                    Lobby.PhaserJS.clearInterval(prop.interval);
                                }
                            }, 1000);
                        };
                        prop.add = function (info, callback) {
                            if (prop.currentSpin % prop.numberRow == 0) {
                                if (prop.array.length > 0) {
                                    var totalWin = 0;

                                    for (var i = 0; i < prop.array[prop.array.length - 1].length; ++i) {
                                        var info = prop.array[prop.array.length - 1][i];
                                        totalWin += info.magicItemWin;
                                    }
                                    prop.array[prop.array.length - 1].totalWin = totalWin;
                                }
                                var array = [];
                                prop.array.push(array);
                            }
                            prop.array[prop.array.length - 1].push(info);
                            prop.currentSpin++;
                            if (prop.remain == 0) {
                                prop.buy(callback);
                            } else {
                                if (callback) {
                                    callback();
                                }
                            }
                        };
                        prop.export = function () {
                            if (prop.array.length > 0 && prop.array[0].length == prop.numberRow) {
                                var exportData = [];
                                var titleTable = [];
                                titleTable.push("STT");
                                var totalInfo = [];
                                totalInfo.push("TOTAL");

                                var total = 0;
                                var count = 0;
                                var averageAll = 0;
                                var minAll = 10000000;
                                var maxAll = 0;
                                for (var j = 0; j < prop.numberRow; j++) {
                                    var pushInfo = [];
                                    pushInfo.push(j + 1);
                                    for (var i = 0; i < prop.array.length; ++i) {
                                        if (i == 0 && j == 0) {
                                            titleTable.push("Reward Coin");
                                            titleTable.push("Lucky Symbol Count");
                                            titleTable.push("Level");
                                            titleTable.push("");
                                            exportData = [titleTable];
                                        }
                                        if (prop.array[i].length - 1 < j) {
                                            break;
                                        }
                                        pushInfo.push(prop.array[i][j].magicItemWin);
                                        pushInfo.push(prop.array[i][j].numberSymbolWin);
                                        pushInfo.push(prop.array[i][j].level);
                                        pushInfo.push("");

                                        if (j == 0 && prop.array[i].length == prop.numberRow) {
                                            totalInfo.push(prop.array[i].totalWin);
                                            totalInfo.push("");
                                            totalInfo.push("");
                                            totalInfo.push("");

                                            var userGet = prop.array[i].totalGet;
                                            total += userGet;
                                            count++;
                                            if (minAll > userGet) {
                                                minAll = userGet;
                                            }
                                            if (maxAll < userGet) {
                                                maxAll = userGet;
                                            }
                                        }
                                    }
                                    exportData.push(pushInfo);
                                }
                                exportData.push(totalInfo);
                                exportData.splice(1, 0, ["Max All", maxAll]);
                                exportData.splice(1, 0, ["Min All", minAll]);
                                exportData.splice(1, 0, ["Average All", total / count]);
                                Manager4ExportExcel.exportTable(exportData, null, true, prop.name);
                            }
                        };
                    } else {
                        prop.add = function (info, callback) {
                            if (prop.currentSpin % prop.numberRow == 0) {
                                if (prop.array.length > 0) {
                                    var totalWin = 0;
                                    var totalBet = 0;
                                    var totalGet = 0;

                                    var aWin = [];
                                    var aBet = [];
                                    var aGet = [];

                                    for (var i = 0; i < prop.array[prop.array.length - 1].length; ++i) {
                                        var info = prop.array[prop.array.length - 1][i];
                                        totalWin += info.win;
                                        totalBet += info.totalBet;
                                        totalGet += info.userGet;

                                        aWin.push(info.win);
                                        aBet.push(info.totalBet);
                                        aGet.push(info.userGet);
                                    }
                                    if (prop.id == LobbyConstant.MAGIC_ITEM_TYPE_100_PERCENT_WIN) {
                                        prop.array[prop.array.length - 1].totalWin = totalWin;
                                        prop.array[prop.array.length - 1].totalBet = totalBet;
                                        prop.array[prop.array.length - 1].totalGet = totalGet;
                                    } else {
                                        prop.array[prop.array.length - 1].average = {
                                            win: totalWin / prop.numberRow,
                                            bet: totalBet / prop.numberRow,
                                            get: totalGet / prop.numberRow
                                        };
                                        prop.array[prop.array.length - 1].min = {
                                            win: Math.min.apply(null, aWin),
                                            bet: Math.min.apply(null, aBet),
                                            get: Math.min.apply(null, aGet)
                                        };
                                        prop.array[prop.array.length - 1].max = {
                                            win: Math.max.apply(null, aWin),
                                            bet: Math.max.apply(null, aBet),
                                            get: Math.max.apply(null, aGet)
                                        };
                                    }
                                    aWin = null;
                                    aBet = null;
                                    aGet = null;
                                }
                                var array = [];
                                prop.array.push(array);
                            }
                            prop.array[prop.array.length - 1].push(info);
                            prop.currentSpin++;
                            if (prop.remain == 0) {
                                if (prop.limit == -1 || prop.currentSpin < prop.limit) {
                                    prop.buy(callback);
                                } else {
                                    LobbyC.GameSlot.nextStopLevel4TestAlgorithm = my._userData.profile.level + 1;
                                    if (callback) {
                                        callback();
                                    }
                                }
                            } else {
                                if (callback) {
                                    callback();
                                }
                            }
                        };
                        prop.export = function () {
                            if (prop.array.length > 0 && prop.array[0].length == prop.numberRow) {
                                var exportData = [];
                                var titleTable = [];
                                titleTable.push("STT");
                                var totalInfo = null;

                                var averageInfo = null;
                                var minInfo = null;
                                var maxInfo = null;

                                if (prop.id == LobbyConstant.MAGIC_ITEM_TYPE_100_PERCENT_WIN) {
                                    totalInfo = [];
                                    totalInfo.push("TOTAL");
                                } else {
                                    averageInfo = [];
                                    averageInfo.push("AVERAGE");
                                    minInfo = [];
                                    minInfo.push("MIN");
                                    maxInfo = [];
                                    maxInfo.push("MAX");
                                }

                                var total = 0;
                                var count = 0;
                                var averageAll = 0;
                                var minAll = 10000000;
                                var maxAll = 0;
                                var push = function (aInfo, win, bet, get) {
                                    aInfo.push(win);
                                    aInfo.push(bet);
                                    aInfo.push(get);
                                    aInfo.push("");
                                    aInfo.push("");
                                };
                                for (var j = 0; j < prop.numberRow; j++) {
                                    var pushInfo = [];
                                    pushInfo.push(j + 1);
                                    for (var i = 0; i < prop.array.length; ++i) {
                                        if (i == 0 && j == 0) {
                                            titleTable.push("Winning Coin");
                                            titleTable.push("Total Bet");
                                            titleTable.push("User Get");
                                            titleTable.push("Level");
                                            titleTable.push("");
                                            exportData = [titleTable];
                                        }
                                        if (prop.array[i].length - 1 < j) {
                                            break;
                                        }
                                        pushInfo.push(prop.array[i][j].win);
                                        pushInfo.push(prop.array[i][j].totalBet);
                                        pushInfo.push(prop.array[i][j].userGet);
                                        pushInfo.push(prop.array[i][j].level);
                                        pushInfo.push("");

                                        if (j == 0 && prop.array[i].length == prop.numberRow) {
                                            if (totalInfo) {
                                                push(totalInfo, prop.array[i].totalWin, prop.array[i].totalBet, prop.array[i].totalGet);
                                                var userGet = prop.array[i].totalGet;
                                                total += userGet;
                                                count++;
                                                if (minAll > userGet) {
                                                    minAll = userGet;
                                                }
                                                if (maxAll < userGet) {
                                                    maxAll = userGet;
                                                }
                                            } else {
                                                push(averageInfo, prop.array[i].average.win, prop.array[i].average.bet, prop.array[i].average.get);
                                                push(minInfo, prop.array[i].min.win, prop.array[i].min.bet, prop.array[i].min.get);
                                                push(maxInfo, prop.array[i].max.win, prop.array[i].max.bet, prop.array[i].max.get);

                                                total += prop.array[i].average.get;
                                                count++;

                                                if (minAll > prop.array[i].min.get) {
                                                    minAll = prop.array[i].min.get;
                                                }
                                                if (maxAll < prop.array[i].max.get) {
                                                    maxAll = prop.array[i].max.get;
                                                }
                                            }
                                        }
                                    }
                                    exportData.push(pushInfo);
                                }
                                push = null;
                                if (totalInfo) {
                                    exportData.push(totalInfo);
                                } else {
                                    exportData.push(averageInfo);
                                    exportData.push(minInfo);
                                    exportData.push(maxInfo);
                                }
                                exportData.splice(1, 0, ["Max All", maxAll]);
                                exportData.splice(1, 0, ["Min All", minAll]);
                                exportData.splice(1, 0, ["Average All", total / count]);
                                Manager4ExportExcel.exportTable(exportData, null, true, prop.name);
                            }
                        };
                    }
                }
                prop.buy = function (callback) {
                    var postData = {
                        simulatorAPIType: prop.simulateType,
                        productType: prop.productType
                    };
                    Manager4DebugTestAlgorithm.callAutoAPIToServer4Test(postData, prop.simulateType, function (isSuccess, data, response) {
                        if (isSuccess) {
                            prop.remain = data[prop.propertyAPI];
                            if (prop.startTimer) {
                                prop.startTimer();
                            }
                        }
                        if (callback) {
                            callback();
                        }
                    });
                };
                prop.buy();
            };

            my.simulateStrategy = {
                currentTS: 0,
                loginDays: 0,
                dailyBonusStreak: {
                    name: "Daily Bonus Streak"
                },
                freeCoinGift: {
                    name: "Free Coin Gift",
                    collectFreeCoinTimes: 0,
                    currentWaitingTime: 0,
                    remainingTime: 0,
                    waitingTime: [0, 60 * 60 * 1000, 30 * 60 * 1000, 15 * 60 * 1000]
                },
                dailyBonusSpin: {
                    name: "Daily Bonus Spin"
                },
                dailyBonusWheel: {
                    name: "Daily Bonus Wheel"
                },
                dailyChallenge: {
                    name: "Daily Challenge"
                },
                luckyWheel: {
                    name: "Lucky Wheel"
                },
                piggyBank: {
                    name: "Piggy Pank"
                },
                boosterPackage: {
                    name: "Booster Package"
                },
                magicItem: {
                    win100: {
                        name: "100%_win",
                        productType: LobbyConstant.GOOGLE_PACKAGE_TYPE_MAGIC_ITEM_100_PERCENT_WIN,
                        id: LobbyConstant.MAGIC_ITEM_TYPE_100_PERCENT_WIN,
                        limit: -1,
                        numberRow: 10,
                        propertyAPI: "magic_item_100_percent_win_reward"
                    },
                    spin10: {
                        name: "lucky_spin_10%",
                        productType: LobbyConstant.GOOGLE_PACKAGE_TYPE_MAGIC_ITEM_LUCKY_SPIN_10_PERCENT,
                        id: LobbyConstant.MAGIC_ITEM_TYPE_LUCKY_SPIN_TYPE_1,
                        limit: 1000,
                        numberRow: 10,
                        propertyAPI: "magic_item_lucky_spin_type_1_reward"
                    },
                    spin20: {
                        name: "lucky_spin_20%",
                        productType: LobbyConstant.GOOGLE_PACKAGE_TYPE_MAGIC_ITEM_LUCKY_SPIN_20_PERCENT,
                        id: LobbyConstant.MAGIC_ITEM_TYPE_LUCKY_SPIN_TYPE_2,
                        limit: 1000,
                        numberRow: 10,
                        propertyAPI: "magic_item_lucky_spin_type_2_reward"
                    },
                    symbol: {
                        name: "lucky_symbol",
                        productType: LobbyConstant.GOOGLE_PACKAGE_TYPE_MAGIC_ITEM_LUCKY_SYMBOL,
                        id: LobbyConstant.MAGIC_ITEM_TYPE_LUCKY_SYMBOL,
                        limit: -1,
                        numberRow: 720,
                        propertyAPI: "magic_item_lucky_symbol_duration_time_reward"
                    },
                    doubleEXP: {
                        name: "double_exp",
                        productType: LobbyConstant.GOOGLE_PACKAGE_TYPE_MAGIC_ITEM_DOUBLE_EXP,
                        id: LobbyConstant.MAGIC_ITEM_TYPE_DOUBLE_EXP,
                        propertyAPI: "magic_item_double_exp_duration_time_reward"
                    }
                },
                currentMagicItem: {},
                currentAchievementTS: 0
            };

            //Create all necessary simulate object
            for (var key in my.simulateStrategy) {
                if (my.simulateStrategy[key] && my.simulateStrategy[key].name) {
                    createPropertySimulate(my.simulateStrategy[key]);
                }
            }

            //Check this account is magic item -> if so, create magic item simulate object
            switch (LobbyConfig.testAccountType) {
                case LobbyConstant.TEST_ACCOUNT_TYPE_NEW_STRATEGY_MAGIC_ITEM_100_PERCENT_WIN:
                    my.simulateStrategy.currentMagicItem = my.simulateStrategy.magicItem.win100;
                    break;
                case LobbyConstant.TEST_ACCOUNT_TYPE_NEW_STRATEGY_MAGIC_ITEM_LUCKY_SPIN_10_PERCENT:
                    my.simulateStrategy.currentMagicItem = my.simulateStrategy.magicItem.spin10;
                    break;
                case LobbyConstant.TEST_ACCOUNT_TYPE_NEW_STRATEGY_MAGIC_ITEM_LUCKY_SPIN_20_PERCENT:
                    my.simulateStrategy.currentMagicItem = my.simulateStrategy.magicItem.spin20;
                    break;
                case LobbyConstant.TEST_ACCOUNT_TYPE_NEW_STRATEGY_MAGIC_ITEM_DOUBLE_EXP:
                    my.simulateStrategy.currentMagicItem = my.simulateStrategy.magicItem.doubleEXP;
                    break;
                case LobbyConstant.TEST_ACCOUNT_TYPE_NEW_STRATEGY_MAGIC_ITEM_LUCKY_SYMBOL:
                    my.simulateStrategy.currentMagicItem = my.simulateStrategy.magicItem.symbol;
                    break;
                default:
                    my.simulateStrategy.currentMagicItem = null;
                    break;
            }

            if (my.simulateStrategy.currentMagicItem) {
                createPropertyMagicItemSimulate(my.simulateStrategy.currentMagicItem);
            }

            //Reset data after level up
            my.simulateStrategy.resetAfterLevelUp = function () {
                for (var key in my.simulateStrategy) {
                    if (my.simulateStrategy[key] && my.simulateStrategy[key].resetAfterLevelUp) {
                        my.simulateStrategy[key].resetAfterLevelUp();
                    }
                }
            };

            //Function reset all data after play one day
            my.simulateStrategy.resetAfterOneDay = function () {
                my.simulateStrategy.currentTS = 0;
                my.simulateStrategy.loginDays++;
                my.simulateStrategy.freeCoinGift.collectFreeCoinTimes = 0;

                var numberOfDailyBonusStreak = ((my.simulateStrategy.loginDays-1)%7 + 1);
                var postData = {
                    simulatorAPIType: LobbyConstant.SIMULATOR_API_TYPE_VIEW_VIDEO,
                    numberOfDailyBonusStreakDay: numberOfDailyBonusStreak,
                    numberOfTimesCollectFreeCoinGift: my.simulateStrategy.freeCoinGift.collectFreeCoinTimes,
                    productType: 0
                };
                //Call bonus streak
                postData.simulatorAPIType = LobbyConstant.SIMULATOR_API_TYPE_COLLECT_DAILY_BONUS_STREAK_REWARD;
                Manager4DebugTestAlgorithm.callAutoAPIToServer4Test(postData, null, my.simulateStrategy.dailyBonusStreak.onCollected);
                //Call daily bonus spin
                //Call collect free coin gift
                postData.simulatorAPIType = LobbyConstant.SIMULATOR_API_TYPE_COLLECT_DAILY_BONUS_LUCKY_SPIN_REWARD;
                Manager4DebugTestAlgorithm.callAutoAPIToServer4Test(postData, null, my.simulateStrategy.dailyBonusSpin.onCollected);
                my.simulateStrategy.checkAndCollectFreeCoinGift(0);
                //Call daily bonus wheel
                if (my._userData.isFacebookUser) {
                    postData.simulatorAPIType = LobbyConstant.SIMULATOR_API_TYPE_COLLECT_DAILY_BONUS_WHEEL_REWARD;
                    Manager4DebugTestAlgorithm.callAutoAPIToServer4Test(postData, null, my.simulateStrategy.dailyBonusWheel.onCollected);
                }
                //Reset Daily Challenge
                postData.simulatorAPIType = LobbyConstant.SIMULATOR_API_TYPE_RESET_DAILY_CHALLENGE;
                Manager4DebugTestAlgorithm.callAutoAPIToServer4Test(postData, null, null);

                //Buy Booster Package
                if (LobbyConfig.testAccountType == LobbyConstant.TEST_ACCOUNT_TYPE_NEW_STRATEGY_PAID_USER &&
                    (my.simulateStrategy.loginDays - 1) % 7 == 0) {
                    postData.simulatorAPIType = LobbyConstant.SIMULATOR_API_TYPE_BUY_BOOSTER_PACKAGE;
                    postData.productType = LobbyConstant.GOOGLE_PACKAGE_TYPE_BOOSTER_2;
                    Manager4DebugTestAlgorithm.callAutoAPIToServer4Test(postData, null, my.simulateStrategy.boosterPackage.onCollected);
                }
            };

            my.simulateStrategy.checkAndCollectFreeCoinGift = function (time) {
                my.simulateStrategy.freeCoinGift.remainingTime -= time;
                if (my.simulateStrategy.freeCoinGift.remainingTime <= 0) {
                    var postData = {
                        simulatorAPIType: LobbyConstant.SIMULATOR_API_TYPE_VIEW_VIDEO,
                        numberOfDailyBonusStreakDay: my.simulateStrategy.loginDays,
                        numberOfTimesCollectFreeCoinGift: my.simulateStrategy.freeCoinGift.collectFreeCoinTimes,
                        productType: 0
                    };
                    postData.simulatorAPIType = LobbyConstant.SIMULATOR_API_TYPE_COLLECT_FREE_COIN_GIFT_REWARD;
                    Manager4DebugTestAlgorithm.callAutoAPIToServer4Test(postData, null, my.simulateStrategy.freeCoinGift.onCollected);
                    my.simulateStrategy.freeCoinGift.collectFreeCoinTimes++;

                    var index = Math.min(my.simulateStrategy.freeCoinGift.collectFreeCoinTimes, 3);
                    var waitingTime = my.simulateStrategy.freeCoinGift.waitingTime[index];
                    my.simulateStrategy.freeCoinGift.currentWaitingTime = waitingTime;
                    my.simulateStrategy.freeCoinGift.remainingTime = waitingTime;
                }
            };

            my.simulateStrategy.checkAndCollectAchievement = function (timer) {
                my.simulateStrategy.currentAchievementTS += timer;
                if (my.simulateStrategy.currentAchievementTS >= 1 * 60 * 1000) {
                    my.simulateStrategy.currentAchievementTS = 0;
                    var callback = function () {
                        LobbyRequest.User.getAchievementList(
                            function (data) {
                                if (data == null) return;
                                my._currentAchievementListOfUser = data.member;
                                var achievementList = data.member;
                                var totalCollected = 0;
                                var currentCollected = 0;
                                for (var i = 0; i < achievementList.length; i++) {
                                    var achievement = achievementList[i];
                                    if (achievement.is_complete && !achievement.is_collected) {
                                        totalCollected++;
                                        var bonus;
                                        if (achievement.crown_reward == 0) {
                                            bonus = achievement.coin_reward + " coins";
                                            LobbyConfig.totalCoinOfCollectAchivement += achievement.coin_reward;
                                        }
                                        else {
                                            bonus = achievement.crown_reward + " crowns";
                                            LobbyConfig.totalCrownOfCollectAchivement += achievement.crown_reward;
                                        }

                                        LobbyConfig.achievementCollectedName.push(achievement.name);
                                        LobbyConfig.numberOfCollectAchivement++;

                                        var logAchiment = "Auto Collecting achievement  " + achievement.achievement_id + " " + achievement.name + " " + bonus + " -> at " + Lobby.Utils.getCurrentTimestampAndConvert2String();
                                        if (LobbyConfig.isShowDetailLogForTestAlgorithmMode) {
                                            console.log(logAchiment);
                                        }
                                        Manager4DebugTestAlgorithm.addDebug2Log(logAchiment);

                                        var collect = function (i) {
                                            LobbyRequest.User.collectAchievement(
                                                achievement.achievement_id,
                                                function (achivementInfo) {
                                                    if (achivementInfo != null) {
                                                        LobbyC.MainMenu.updateUserInfoFromSV(
                                                            function () {
                                                            },
                                                            function () {
                                                            },
                                                            false // isGetStatisticData
                                                        );
                                                        currentCollected++;
                                                        if (currentCollected >= totalCollected) {
                                                            callback(achivementInfo);
                                                        }
                                                    }
                                                },
                                                my,
                                                false
                                            );
                                        };
                                        collect(i);
                                        return;
                                    }
                                }
                            },
                            my, false);
                    };
                    callback();
                }
            };

            my.simulateStrategy.checkAndCollectDailyChanllenge = function () {
                LobbyRequest.User.getDailyChallengeInfo(function (data) {
                    if (data && data.can_collect) {
                        LobbyRequest.User.collectDailyChallenge(function (isSuccess, _data, response) {
                            if (!isSuccess) {
                                return;
                            }
                            my.simulateStrategy.dailyChallenge.onCollected(isSuccess, data);
                            LobbyC.MainMenu.updateUserInfoFromSV();
                        });
                    }
                }, my);

                if (LobbyConfig.testAccountType == LobbyConstant.TEST_ACCOUNT_TYPE_NEW_STRATEGY_PAID_USER) {
                    var postData = {
                        simulatorAPIType: LobbyConstant.SIMULATOR_API_TYPE_BUY_PIGGY_BANK,
                        numberOfDailyBonusStreakDay: my.simulateStrategy.loginDays,
                        numberOfTimesCollectFreeCoinGift: my.simulateStrategy.freeCoinGift.collectFreeCoinTimes,
                        productType: LobbyConstant.GOOGLE_PACKAGE_TYPE_PIGGY_BANK_1
                    };
                    Manager4DebugTestAlgorithm.callAutoAPIToServer4Test(postData, null, my.simulateStrategy.piggyBank.onCollected);
                }
            };

            my.simulateStrategy.checkAndPlayLuckyWheel = function (crown, callback) {
                if (crown >= 100) {
                    var i = crown >= 180 ? (crown > 240 ? 2 : 1) : 0;
                    LobbyRequest.User.buyLuckyWheelUsingCrow(LobbyConstant.APPLE_PACKAGE_TYPE_LUCKY_WHEEL_1 + i, function (isSuccess, data, response) {
                        if (!isSuccess) {
                            if (callback) {
                                callback();
                            }
                            return;
                        }
                        console.log("Dang quay Lucky Wheel..............");
                        LobbyConfig.additionalInfo.luckyWheel.coinReward = data.coin_reward;
                        LobbyConfig.additionalInfo.luckyWheel.crownReward = data.crown_reward;
                        LobbyConfig.additionalInfo.luckyWheel.remainingSpin = data.remaining_spin;

                        LobbyC.MainMenu.updateUserInfoFromSV();

                        LobbyC.LuckyWheel.reloadLuckyWheelSpins(LobbyConfig.additionalInfo.luckyWheel.remainingSpin);
                        var remainingSpin = LobbyConfig.additionalInfo.luckyWheel.remainingSpin;
                        while (remainingSpin > 0) {
                            LobbyRequest.User.spinLuckyWheel(function (isSuccess, data, response) {
                                if (!isSuccess) {
                                    remainingSpin = 0;
                                    return;
                                }
                                LobbyConfig.additionalInfo.luckyWheel.coinReward = data.coin_reward;
                                LobbyConfig.additionalInfo.luckyWheel.crownReward = data.crown_reward;
                                LobbyConfig.additionalInfo.luckyWheel.remainingSpin = data.remaining_spin;
                                my.simulateStrategy.luckyWheel.onCollected(isSuccess, data);
                                LobbyC.GameSlot.addTime2RealTimeEstimate(5000);
                            });
                        }
                        console.log("Ket thuc quay Lucky Wheel..............");
                        if (callback) {
                            callback();
                        }
                    });
                } else if (callback) {
                    callback();
                }
            };

            my.simulateStrategy.updateTime = function (time) {
                my.simulateStrategy.currentTS += time;

                if (my.simulateStrategy.currentTS >= 86400000) {
                    my.simulateStrategy.resetAfterOneDay();
                } else {
                    my.simulateStrategy.checkAndCollectFreeCoinGift(time);
                    my.simulateStrategy.checkAndCollectAchievement(time);
                }
            };
            Manager4DebugTestAlgorithm.initScheduleCollectVideoCoinForTest();
            my.simulateStrategy.resetAfterOneDay();
            createPropertySimulate = null;
            createPropertyMagicItemSimulate = null;
            if(callbackPlayGame){
                callbackPlayGame();
            }
        }
    };
};