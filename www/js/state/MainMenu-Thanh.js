
LobbyC.MainMenu = (function (my) {
    'use strict';
    /**
     * #Thanh
     * Check and show popup inform which feature has been unlocked!
     * @param currentLevel
     * @param oldLevel
     */
    my.checkAndShowPopupFeatureUnlocked = function (currentLevel, oldLevel) {
        var popupUnlockInfoArray = [];
        if (my.isFeatureUnlocked(LobbyConfig.unlockFeatureByLevelInfo.dailyChallenge, currentLevel, oldLevel)) {
            popupUnlockInfoArray.push(my.createPopupUnlockInfo("Pass DAILY CHALLENGE  to get coin !!!", "popup_unlock_info_daily_challenge"));
        }

        if (my.isFeatureUnlocked(LobbyConfig.unlockFeatureByLevelInfo.piggyBank, currentLevel, oldLevel)) {
            popupUnlockInfoArray.push(my.createPopupUnlockInfo("You’ve unlock PIGGY BANK !!!", "popup_unlock_info_piggy_bank"));
        }

        if (my.isFeatureUnlocked(LobbyConfig.unlockFeatureByLevelInfo.choosePayLine, currentLevel, oldLevel)) {
            popupUnlockInfoArray.push(my.createPopupUnlockInfo("You’ve unlock PAY LINE !!!", "popup_unlock_info_pay_line"));
        }

        if (popupUnlockInfoArray.length > 0) {
            my.showPopupUnlockNew(popupUnlockInfoArray);
        }

    };
    /**
     * #Thanh
     * Check if feature at level has been unlocked and not unlock before
     * @param levelToUnlock
     * @param currentLevel
     * @param oldLevel
     */
    my.isFeatureUnlocked = function(levelToUnlock,currentLevel,oldLevel){
        return (currentLevel>=levelToUnlock && oldLevel < levelToUnlock);
    };
    /**@Deprecated
     * #Thanh
     * Use to show popup inform that feature has been unlocked!
     * @param type
     * @param callback
     * @param isUsePopupManager
     */
    my.showPopupFeatureUnlocked = function(type,currentLevel,oldLevel,callback){
        var unlockType = "";
        switch(type){
            case LobbyConstant.API_BONUS_NAME_UFBL_DAILY_CHANLLENGE:
                unlockType =  " daily challenge!";
                break;
            case LobbyConstant.API_BONUS_NAME_UFBL_PIGGY_BANK:
                unlockType = " piggy bank!";
                break;
            case LobbyConstant.API_BONUS_NAME_UFBL_CHOOSE_PAY_LINE:
                unlockType = " choose payline!";
                break;
        }
        my.showNotificationPopup("Feature Unlocked","You have unlocked feature " + unlockType,function(){
            if(callback) callback();
        });
    };


    my.addTimerClock = function(x,y,parentGroup, loopPerTimer, updateFunction ,fontSize,fontColor,backgroundColor,backgroundWidth,backgroundHeight){
        if(Lobby.Utils.objectIsNull(parentGroup)) parentGroup = my.world;
        if(Lobby.Utils.objectIsNull(updateFunction)) updateFunction = Lobby.Utils.nullFunction;
        if(Lobby.Utils.objectIsNull(fontSize)) fontSize = 50;
        if(Lobby.Utils.objectIsNull(loopPerTimer)) loopPerTimer = 1000;
        if(Lobby.Utils.objectIsNull(fontColor)) fontColor = "#fefefe";
        if(Lobby.Utils.objectIsNull(backgroundColor)) backgroundColor = 0x0;
        var group = my.add.group();
        parentGroup.add(group);
        if(backgroundColor !== 0x0){
            Lobby.PhaserJS.createRectangleWithColor(this,x,y,backgroundWidth,backgroundHeight,backgroundColor,group);
        }

        var style = {
            font: fontSize+ "px PassionOne-Regular",
            fill: fontColor
        };
        var clockText = my.add.text(x,y,"",style,group);
        clockText.startTimeMs = 0;
        clockText.updateFunction = updateFunction;
        clockText.timingEventList = [];
        var compare = function(a,b){
            return a.time - b.time;
        };
        clockText.addTimingEvent = function(time,callback){
            clockText.timingEventList.push({time:time,callback:callback});
            clockText.timingEventList.sort(compare);
        };
        clockText.removeTimingEvent = function(time){
            for(var i = 0;i<clockText.timingEventList.length;i++){
                if(clockText.timingEventList[i].time === time) {
                    clockText.timingEventList.splice(i,1);
                    break;
                }
            }
        };
        clockText.getTimeInMs = function(){
            return clockText.startTimeMs;
        };
        clockText.checkUpdate = function(timeObject){

        };
        clockText.setTimeInMs = function(timeInMs){
            clockText.startTimeMs = timeInMs;
            var timeObject = Helper.Time.milisecondTimeToNormalTime(clockText.startTimeMs,true);
            clockText.text = Helper.Time.timeToStringNormalTime(timeObject,true);
            clockText.checkUpdate(timeObject);
        };
        clockText.updateTime = function(){
            var startTimeMs = clockText.startTimeMs + loopPerTimer;
            clockText.setTimeInMs(startTimeMs);
            clockText.updateFunction(clockText.startTimeMs);
        };
        //var interval = my.time.events.loop(loopPerTimer, update, this);
        var interval = window.setInterval(function(){
            clockText.updateTime();
        },loopPerTimer);
        group.onDestroy.add(function() {
                //interval.destroy();
                window.clearInterval(interval);
            });
        return clockText;
    };
    my.addTimerDebug = function(x,y,group,updateFunction){
        if(Lobby.Utils.objectIsNull(parentGroup)) parentGroup = my.world;
        if(Lobby.Utils.objectIsNull(updateFunction)) updateFunction = Lobby.Utils.nullFunction;
        var _update = group.update;
        group.update = function(){
            if(_update) _update();
            my.debug.text( 0, 100, 380 );
            updateFunction();
        };
        //var interval = my.time.events.loop(loopPerTimer, update, this);
        //parentGroup.onDestroy.add(function() {
        //    interval.destroy();
        //});

    };

    my.createGroupBoosterPackage = function(group){
        my.remainTime = my.add.text(380, 100, "", {
            font: "25px PassionOne-Regular",
            fill: "#FFFFFF"
        }, group);
        my.remainTime.visible = false;
        my.booster = {};
        my.booster.setActive = function(isActive){
            my.remainTime.visible = isActive;
            //if(isActive) {
            //    my.levelBar.tint = 0xff0000;
            //
            //}
            //else {
            //    my.levelBar.tint = 0xfefefe;
            //}
        };
        if(Lobby.Utils.objectNotNull(my.booster) && my.booster.interval === undefined) my.booster.interval = null;
        my.booster.updateTimer = function(){
            if(LobbyConfig.additionalInfo.booster.remainingTimeOfBoosterLevelUpBonus>0){
                LobbyConfig.additionalInfo.booster.remainingTimeOfBoosterLevelUpBonus-=1000;
                var time = Helper.Time.milisecondTimeToNormalTime(LobbyConfig.additionalInfo.booster.remainingTimeOfBoosterLevelUpBonus);
                my.remainTime.text = "Booster: " + time.hour+":"+time.minute+":"+time.second;
            }else{
                my.booster.setActive(false);
                Lobby.PhaserJS.clearInterval(my.booster.interval);
                my.booster.interval = null;
            }
        };
        my.booster.startTimer = function(){
            if(LobbyConfig.isTestAlgorithmMode){
                return;
            }
            my.booster.setActive(LobbyConfig.additionalInfo.booster.remainingTimeOfBoosterLevelUpBonus>0 );
            if(LobbyConfig.additionalInfo.booster.remainingTimeOfBoosterLevelUpBonus>0 && my.booster.interval==null) my.booster.interval = ScheduleManager.setInterval( function(){
                my.booster.updateTimer();
            },1000);
            //if(LobbyConfig.additionalInfo.booster.remainingTimeOfBoosterLevelUpBonus>0 && my.booster.interval==null) my.booster.interval = window.setInterval( function(){
            //    my.booster.updateTimer();
            //},1000);
        };
        my.booster.startTimer();
    };
    my.createRequestUserDataFromUserId = function(userId){
        return {id:userId,fbId:my.getFacebookUIDBasedOnId(userId)};
    };
    my.getFacebookUIDBasedOnId = function(userId){
        if(Lobby.Utils.objectIsNull(my.facebookIDMap)){
            return null;
        }
        var facebookUID = my.facebookIDMap[userId];
        if(Lobby.Utils.objectIsNull(facebookUID)) return null;
        return facebookUID;
    };
    my.parseDataFriendListNew = function(friendList){
        for(var i = 0;i<friendList.length;i++){
           my.parseDataFriend(friendList[i]);
        }
    };
    my.parseDataFriend = function(friendInfo){
        if(Lobby.Utils.objectIsNull(my.facebookIDMap)) my.facebookIDMap = {};
        my.facebookIDMap[friendInfo.id] = friendInfo.facebookUID;
    };

    my.handleResultBuyPackageNew = function(data,isShowPopup){
        if(Lobby.Utils.objectIsNull(isShowPopup)) isShowPopup = true;
        var productType = data.product_type;
        var rewardString = "";
        var handleMagicItem = function(){
            my.reloadMagicItemBuyBtn();
            if(LobbyC.MainMenu.magicItem) {
                var group = null;
                if(my.currentGameSlot && my.currentGameSlot._oFooter){
                    group = my.currentGameSlot._oFooter.group;
                }
                LobbyC.MainMenu.magicItem.checkAndShowMagicItem(group);
            }
            rewardString += Lobby.Utils.formatJSON(data);
        };
        switch(productType){
            case LobbyConstant.APPLE_PACKAGE_TYPE_BOOSTER_1:
            case LobbyConstant.APPLE_PACKAGE_TYPE_BOOSTER_2:
                var remainTime = data.booster_level_up_bonus_duration_time_reward;
                LobbyConfig.additionalInfo.booster.remainingTimeOfBoosterLevelUpBonus += remainTime;
                var time  = Helper.Time.milisecondTimeToNormalTime(remainTime,true);
                rewardString =  my.selectlanguage.purchased.reward + time.hour+":"+time.minute+":"+time.second  + my.selectlanguage.popup_user_game_unlock.text9;
                if(Lobby.Utils.objectNotNull(my.booster)) my.booster.startTimer();
                //LobbyConfig.additionalInfo.
                break;
            case LobbyConstant.APPLE_PACKAGE_TYPE_LUCKY_WHEEL_1:
            case LobbyConstant.APPLE_PACKAGE_TYPE_LUCKY_WHEEL_2:
            case LobbyConstant.APPLE_PACKAGE_TYPE_LUCKY_WHEEL_3:
                var numberOfSpin = data.spin_of_lucky_wheel_reward;
                rewardString =  my.selectlanguage.purchased.reward + numberOfSpin  + my.selectlanguage.popup_user_game_unlock.text10;
                LobbyConfig.additionalInfo.luckyWheel.remainingSpin+=numberOfSpin;
                LobbyC.LuckyWheel.reloadLuckyWheelSpins();
                break;
            case LobbyConstant.APPLE_PACKAGE_TYPE_PIGGY_BANK_1:
                var coin = Lobby.Utils.formatNumberWithCommas(data.coin_reward);
                rewardString =  my.selectlanguage.purchased.reward + coin  ;
                if(Lobby.Utils.objectNotNull(my.piggyBankCoin)) my.piggyBankCoin.text = 0;
                break;
            case  LobbyConstant.APPLE_PACKAGE_TYPE_MAGIC_ITEM_100_PERCENT_WIN:
                LobbyConfig.additionalInfo.magicItem.currentActiveItem = LobbyConstant.MAGIC_ITEM_TYPE_100_PERCENT_WIN;
                //TO DO update
                LobbyConfig.additionalInfo.magicItem.remainItem100Win += data.magic_item_100_percent_win_reward;

                handleMagicItem();
                break;
            case LobbyConstant.APPLE_PACKAGE_TYPE_MAGIC_ITEM_LUCKY_SPIN_10_PERCENT:
                LobbyConfig.additionalInfo.magicItem.currentActiveItem = LobbyConstant.MAGIC_ITEM_TYPE_LUCKY_SPIN_TYPE_1;
                LobbyConfig.additionalInfo.magicItem.remainItem10LuckySpin += data.magic_item_lucky_spin_type_1_reward;
                handleMagicItem();
                break;
            case LobbyConstant.APPLE_PACKAGE_TYPE_MAGIC_ITEM_LUCKY_SPIN_20_PERCENT:
                LobbyConfig.additionalInfo.magicItem.currentActiveItem = LobbyConstant.MAGIC_ITEM_TYPE_LUCKY_SPIN_TYPE_2;
                LobbyConfig.additionalInfo.magicItem.remainItem20LuckySpin += data.magic_item_lucky_spin_type_2_reward;
                handleMagicItem();
                break;
            case LobbyConstant.APPLE_PACKAGE_TYPE_MAGIC_ITEM_DOUBLE_EXP:
                LobbyConfig.additionalInfo.magicItem.currentActiveItem = LobbyConstant.MAGIC_ITEM_TYPE_DOUBLE_EXP;
                LobbyConfig.additionalInfo.magicItem.remainTimeDoubleExp+= data.magic_item_double_exp_duration_time_reward;
                LobbyC.MainMenu.magicItem.DoubleExp.restart();
                handleMagicItem();
                break;
            case LobbyConstant.APPLE_PACKAGE_TYPE_MAGIC_ITEM_LUCKY_SYMBOL:
                LobbyConfig.additionalInfo.magicItem.currentActiveItem = LobbyConstant.MAGIC_ITEM_TYPE_LUCKY_SYMBOL;
                LobbyConfig.additionalInfo.magicItem.remainTimeLuckySymbol+= data.magic_item_lucky_symbol_duration_time_reward;
                LobbyC.MainMenu.magicItem.LuckySymbol.restart();
                handleMagicItem();
                break;

                break;
            default:  //Cac package cu bao gom ca coin va cron
                // Toan kiem tra xem user mua coin hay crown
                var coin_reward = (data ["coin_reward"]) == null ? 0 : (data["coin_reward"]);
                coin_reward = Lobby.Utils.floatToIntOptimize(coin_reward);
                var crown =(data["crown_reward"]) == null ? 0 : (data["crown_reward"]);
                var amountBonusToShowInPopup = coin_reward;
                var  isCrownReward = false;
                if (amountBonusToShowInPopup == 0)
                {
                    isCrownReward = true;
                    amountBonusToShowInPopup = crown;
                }


                rewardString = my.selectlanguage.purchased.reward + Lobby.Utils.formatNumberWithCommas(amountBonusToShowInPopup);
                if (isCrownReward)
                {
                    rewardString += " " + my.selectlanguage.popup_user_game_unlock.text5;
                }

                break;
        }
        var reloadData = function(){
            my.updateUserInfoFromSV(
                function () {

                },
                function () {
                },
                false // isGetStatisticData
            );
        };
        if(isShowPopup) {
            my.showNotificationPopup(
                my.selectlanguage.purchased.approved,
                rewardString,
                function ()
                {
                    reloadData();
                },
                function(){
                    reloadData();
                });
        }else{
           reloadData();
        }
    };
    my.parseFeatureConfig = function(data){
        for(var t = 0;t<data.member.length;t++){
            var type = data.member[t].bean_type;
            var info = data.member[t].member;
            switch(type){
                case LobbyConstant.API_FEATURE_BEAN_TYPE_DAILY_BONUS_STREAK :
                    var streakInfoBeanList = info;
                    LobbyConfig.dailyStreakInfo = [];
                    for(var i = 0;i<streakInfoBeanList.length;i++){
                        var streakInfo = {};
                        streakInfo.name = streakInfoBeanList[i].name;
                        streakInfo.info = parseInt(streakInfoBeanList[i].value);
                        LobbyConfig.dailyStreakInfo.push(streakInfo);
                    }
                    break;
                case LobbyConstant.API_FEATURE_BEAN_TYPE_FREE_COIN_GIFT :
                    var freeCoinGiftBeanList = info;
                    LobbyConfig.freeCoinGiftInfo = {};
                    for(var i = 0;i<freeCoinGiftBeanList.length;i+=1){
                        var name = freeCoinGiftBeanList[i].name;


                        if(name.indexOf(LobbyConstant.FREE_COIN_GIFT.NAME_PREFIX)>-1){
                            if(Lobby.Utils.objectIsNull(LobbyConfig.freeCoinGiftInfo[name])) LobbyConfig.freeCoinGiftInfo[name] = {};
                            LobbyConfig.freeCoinGiftInfo[name].coinReward = parseInt(freeCoinGiftBeanList[i].value);
                        }else if(name.indexOf(LobbyConstant.FREE_COIN_GIFT.WAITING_TIME_PREFIX)>-1){
                            var level = name.replace(LobbyConstant.FREE_COIN_GIFT.WAITING_TIME_PREFIX,"");
                            if(Lobby.Utils.objectIsNull(LobbyConfig.freeCoinGiftInfo[LobbyConstant.FREE_COIN_GIFT.NAME_PREFIX+level])) LobbyConfig.freeCoinGiftInfo[LobbyConstant.FREE_COIN_GIFT.NAME_PREFIX+level] = {};
                            LobbyConfig.freeCoinGiftInfo[LobbyConstant.FREE_COIN_GIFT.NAME_PREFIX+level].waitingTime = parseInt(freeCoinGiftBeanList[i].value);
                        }
                    }
                    break;
                case LobbyConstant.API_FEATURE_BEAN_TYPE_UNLOCK_BY_LEVEL:
                    var unlockFeatureByLevelBeanList = info;
                    LobbyConfig.unlockFeatureByLevelInfo = {};
                    for(var i = 0;i<unlockFeatureByLevelBeanList.length;i++){
                        switch(unlockFeatureByLevelBeanList[i].name){
                            case LobbyConstant.API_BONUS_NAME_UFBL_CHOOSE_PAY_LINE:
                                LobbyConfig.unlockFeatureByLevelInfo.choosePayLine = parseInt(unlockFeatureByLevelBeanList[i].value);
                                break;
                            case LobbyConstant.API_BONUS_NAME_UFBL_DAILY_CHANLLENGE:
                                LobbyConfig.unlockFeatureByLevelInfo.dailyChallenge = parseInt(unlockFeatureByLevelBeanList[i].value);
                                break;
                            case LobbyConstant.API_BONUS_NAME_UFBL_PIGGY_BANK:
                                LobbyConfig.unlockFeatureByLevelInfo.piggyBank = parseInt(unlockFeatureByLevelBeanList[i].value);
                                break;
                            default:
                                break;
                        }
                    }

                    break;
                case LobbyConstant.API_FEATURE_BEAN_TYPE_LUCKY_WHEEL :
                    var luckyWheelRewardBeanList = info;
                    LobbyConfig.luckyWheelRewardInfo = [];
                    for(var i = 0;i<luckyWheelRewardBeanList.length;i++){
                        var info = {};
                        info.name = luckyWheelRewardBeanList[i].name;
                        info.info = luckyWheelRewardBeanList[i].value;
                        info.reward = parseInt(luckyWheelRewardBeanList[i].value);
                        LobbyConfig.luckyWheelRewardInfo.push(info);
                    }
                    break;
                case LobbyConstant.API_FEATURE_BEAN_TYPE_DAILY_CHALLENGE :
                    var dailyChallengeBeanList = info;
                    LobbyConfig.dailyChallengeInfo = {};
                    for(var i = 0;i<dailyChallengeBeanList.length;i++){
                        var dailyInfo = {};

                        dailyInfo.id = dailyChallengeBeanList[i].id;
                        dailyInfo.name = dailyChallengeBeanList[i].name;
                        dailyInfo.info = dailyChallengeBeanList[i].info;
                        dailyInfo.is_activated = dailyChallengeBeanList[i].is_activated;
                        dailyInfo.type = dailyChallengeBeanList[i].daily_challenge_task_type;
                        dailyInfo.goal = dailyChallengeBeanList[i].daily_challenge_task_goal;

                        LobbyConfig.dailyChallengeInfo[dailyInfo.id] = dailyInfo;
                    }
                    break;
                case LobbyConstant.API_FEATURE_BEAN_TYPE_BOOSTER:
                    var boosterInfoBeanList = info;
                    LobbyConfig.boosterInfo = {};
                    for(i = 0;i<boosterInfoBeanList.length;i++){
                        switch (boosterInfoBeanList[i].name){
                            case LobbyConstant.API_FEATURE_BEAN_TYPE_BOOSTER_FACTOR_1:
                                LobbyConfig.boosterInfo.multiFactor1 =  boosterInfoBeanList[i].value;
                                break;
                            case LobbyConstant.API_FEATURE_BEAN_TYPE_BOOSTER_FACTOR_2:
                                LobbyConfig.boosterInfo.multiFactor2 =  boosterInfoBeanList[i].value;
                                break;
                            default:
                                break;
                        }
                    }
                    break;
                case  LobbyConstant.API_FEATURE_BEAN_TYPE_MOBILE_SLOT_GAME_CONFIG:
                    var slotGameConfigBeanList = info;
                    LobbyConfig.slotGameConfig = {};
                    for(i = 0;i<slotGameConfigBeanList.length;i++){
                        var slotGameConfig = slotGameConfigBeanList[i];
                        LobbyConfig.slotGameConfig[slotGameConfig.name] = slotGameConfig.id;
                    }
                    break;
                case  LobbyConstant.API_FEATURE_BEAN_TYPE_MOBILE_SLOT_GAME_PAY_LINE_CONFIG:
                    var payLineConfigBeanList = info;
                    LobbyConfig.payLineConfig = {};
                    for(i = 0;i<payLineConfigBeanList.length;i++){
                        var payLineConfig = payLineConfigBeanList[i];
                        if(Lobby.Utils.objectIsNull(LobbyConfig.payLineConfig[payLineConfig.game_id])) LobbyConfig.payLineConfig[payLineConfig.game_id] = [];
                        var config = {};
                        config.maxPayLine = payLineConfig.max_payline;
                        config.maxBetPerLine = payLineConfig.max_bet_per_line;
                        config.level = payLineConfig.level_id;
                        LobbyConfig.payLineConfig[payLineConfig.game_id].push(config);
                    }
                    var sort = function(a,b){
                        if(a.level < b.level) return -1;
                        if(a.level > b.level) return 1;
                        return 0;
                    };
                    for(var key in LobbyConfig.payLineConfig){
                        if(LobbyConfig.payLineConfig.hasOwnProperty(key)){
                            LobbyConfig.payLineConfig[key].sort(sort);
                        }
                    }
                    break;
            }
        }
    };
    my.handleFailResultNewStrategy = function (data, callbackFail, isShowFailPopup, isReloadAdditionalInfo) {
        var title = "";
        var body = "";
        switch (data.core_result_code) {
            case ResultCodeConstant.RESULT_CODE_DAILY_BONUS_STREAK_IS_ALREADY_COLLECTED:
                title = "Daily bonus";
                body = "Daily bonus streak is already collected!";
                break;
            case ResultCodeConstant.RESULT_CODE_FREE_COIN_GIFT_NOT_READY :
                title = "Free coin";
                body = "Free coin gift not ready!";
                break;
            case ResultCodeConstant.RESULT_CODE_ALREADY_SEND_GIFT_FROM_REFERENCE_CODE :
                title = "Reference code";
                body = "Already send gift from refenrence code";
                break;
            case ResultCodeConstant.RESULT_CODE_REFERENCE_CODE_NOT_EXIT:
                title = "Reference code";
                body = "Reference code not exists!";
                break;
            case ResultCodeConstant.RESULT_CODE_REFERENCE_CODE_MAX_TIME_REFER:
                title = "Reference code";
                body = "Reference code reach max time!";
                break;
            case ResultCodeConstant.RESULT_CODE_REFERENCE_CODE_YOUR_OWN_CODE:
                title = "Reference code";
                body = "Can not enter your own reference code!";
                break;
            case ResultCodeConstant.RESULT_CODE_DAILY_BONUS_LUCKY_SPIN_IS_ALREADY_COLLECTED:
                title = "Daily bonus";
                body = "Daily bonus lucky spin is already collected!";
                break;
            case ResultCodeConstant.RESULT_CODE_NOT_ENOUGH_LEVEL_TO_USE_THIS_FEATURE :
                title ="Level";
                body = "Not enough level to use this feature!";
                break;
            case ResultCodeConstant.RESULT_CODE_INVALID_QUANTITY_OF_SPIN_FOR_LUCKY_WHEEL :
                title = "Lucky Wheel";
                body = "Invalid quantity of spin for lucky wheel!";
                break;
            case ResultCodeConstant.RESULT_CODE_NOT_ENOUGH_CROWN_TO_BUY_SPIN_OF_LUCKY_WHEEL:
                title = "Lucky Wheel";
                body = "Not enough crown to buy spin of lucky wheel!";
                break;
            case ResultCodeConstant.RESULT_CODE_INVALID_LUCKY_BOX_TYPE :
                title = "Lucky box";
                body = "Invalid lucky box type!";
                break;
            case ResultCodeConstant.RESULT_CODE_INVALID_QUANTITY_LUCKY_BOX :
                title = "Lucky box";
                body = "Invalid quantity lucky box!";
                break;
            case ResultCodeConstant.RESULT_CODE_TYPE_LEADERBOARD_NON_SUPPORT :
                title = "Leaderboard";
                body = "Type leaderboard not support!";
                break;
            case ResultCodeConstant.RESULT_CODE_TYPE_DAILY_CHALLENGE_REWARD_IS_ALREADY_COLLECTED :
                title = "Daily Challenge";
                body = "Reward is already collected!";
                break;
            case ResultCodeConstant.RESULT_CODE_TYPE_DAILY_CHALLENGE_IS_INCOMPLETE :
                title = "Daily Challenge";
                body = "Challenge is incomplete!";
                break;
            default:
                LobbyRequest.Utils.checkResultCode(
                    data,
                    my,
                    undefined,
                    "Accept gift failed !"
                );
                return;
        }
        if(isShowFailPopup){
            my.showNotificationPopup(title,body);
        }
        if(isReloadAdditionalInfo){
            LobbyRequest.User.getAdditionalInfo(function(isSuccess,dataF, response){
                if(isSuccess) my.parseAdditionalInfo(dataF);
            })
        }
        if(Lobby.Utils.objectNotNull(callbackFail)) callbackFail();
    };
    my.parseLuckyBoxData = function (data) {
        LobbyConfig.additionalInfo.luckyBox = {};
        LobbyConfig.additionalInfo.luckyBox.coinReward = data.coin_reward;
        LobbyConfig.additionalInfo.luckyBox.crownReward = data.crown_reward;
        LobbyConfig.additionalInfo.luckyBox.spinOfLuckyWheelReward = data.spin_of_lucky_wheel_reward;
        LobbyConfig.additionalInfo.luckyBox.remainingLuckyBoxType1 = data.remaining_lucky_box_type1;
        LobbyConfig.additionalInfo.luckyBox.remainingLuckyBoxType2 = data.remaining_lucky_box_type2;
        LobbyConfig.additionalInfo.luckyBox.remainingLuckyBoxType3 = data.remaining_lucky_box_type3;
    };
    my.showPopupLuckyBox = function () {
        if (!LobbyConfig.isTestStrategy) return;
        var group = my.add.group();
        var background = my.add.sprite(0, 0, "popup_notification_background", null);
        group.add(background);
        background.scale.setTo(2.0, 2.0);
        var textStyle = {
            font: "30px " + ConstantFontName.FONT_NAME_PassionOne_Regular,
            fill: "#fefefe",
            align: "center",
            wordWrap: true,
            wordWrapWidth: 900
        };
        var popupTitle = my.add.text(
            background.width / 2,
            50,
            "Lucky Box",
            textStyle,
            group
        );

        popupTitle.anchor = {x: 0.5, y: 0.5};


        var exitBtn = my.createButtonExitPopup(group,
            900,
            10);


        var ruleText = my.add.text(
            background.width / 2 - 160,
            400,
            "",
            textStyle,
            group
        );
        ruleText.text += " Box1: " + LobbyConfig.additionalInfo.luckyBox.remainingLuckyBoxType1 + "."
            + " Box2: " + LobbyConfig.additionalInfo.luckyBox.remainingLuckyBoxType2 + "."
            + " Box3: " + LobbyConfig.additionalInfo.luckyBox.remainingLuckyBoxType3 + ".";
        var rewardText = my.add.text(
            background.width / 2 - 160,
            300,
            "Reward: ",
            textStyle,
            group
        );
        rewardText.visible = false;
        var handleCollectBox = function (isSuccess, data, response) {
            my.hideLoadingAnimation();
            if (isSuccess) {
                my.parseLuckyBoxData(data);
                rewardText.text = "Reward: ";
                if (data.coin_reward > 0) rewardText.text += data.coin_reward + " coins. ";
                if (data.crown_reward > 0) rewardText.text += data.crown_reward + " crowns. ";
                if (data.spin_of_lucky_wheel_reward > 0) rewardText.text += data.spin_of_lucky_wheel_reward + " luck wheel.";
                LobbyConfig.additionalInfo.luckyWheel.remainingSpin += data.spin_of_lucky_wheel_reward;
                rewardText.visible = true;
                ruleText.text = " Box1: " + LobbyConfig.additionalInfo.luckyBox.remainingLuckyBoxType1 + "."
                    + " Box2: " + LobbyConfig.additionalInfo.luckyBox.remainingLuckyBoxType2 + "."
                    + " Box3: " + LobbyConfig.additionalInfo.luckyBox.remainingLuckyBoxType3 + ".";
            } else {
                my.handleFailResultNewStrategy(response, null, true, false);
            }
        };


        var openBox1 = my.createButtonGreenPopup(group,
            0,
            450,
            "open box 1",
            0.7,
            function () {
                my.showLoadingAnimation();
                LobbyRequest.User.openLuckyBox(1, handleCollectBox);
            },
            45,
            true);
        var openBox2 = my.createButtonGreenPopup(group,
            openBox1.x + 150,
            450,
            "open box 2",
            0.7,
            function () {
                my.showLoadingAnimation();
                LobbyRequest.User.openLuckyBox(2, handleCollectBox);
            },
            45,
            true);
        var openBox3 = my.createButtonGreenPopup(group,
            openBox2.x + 150,
            450,
            "open box 3",
            0.7,
            function () {
                my.showLoadingAnimation();
                LobbyRequest.User.openLuckyBox(3, handleCollectBox);
            },
            45,
            true);


        Lobby.PhaserJS.centerWorld(group);
        Lobby.PhaserJS.scaleGroupForOptimize(group, true);

        if (LobbyConfig.useManagerForPopUp) {
            // pop up queue
            ManagerForPopUp.addPopUpToQueue(
                ManagerForPopUp.createPopUpData(
                    my,
                    group
                ),
                true // isShow
            );
        } else {
            my.openPopupWithAnimateUpNew(group);
        }
    };
    my.createTestButton = function (x, y, title, group, callback, condition) {
        if (!condition) return;
        var testButton = my.createButtonGreenPopup(group,
            x,
            y,
            title,
            1,
            function () {
                callback();
            });
        testButton.anchor = {x: 0.5, y: 0.5};
        return testButton;
    };
    my.createSpinCell = function (x, y, width, height, columnGroup, resetDistance) {
        var textStyle = {
            font: "45px " + ConstantFontName.FONT_NAME_PassionOne_Regular,
            fill: "#fefefe",
            align: "center",
            wordWrap: true,
            wordWrapWidth: 900
        };
        var value = my.add.text(
            x,
            y,
            Math.floor(Helper.Number.getRandomArbitrary(1, 9)),
            textStyle,
            columnGroup
        );
        value.orgPosition = {x: x, y: y};
        value.width = width;
        value.height = height;
        value.finishFlag = false;
        value.resetDistance = resetDistance;
        return value;
    };
    my.createSpinColumn = function (x, y, cellWidth, cellHeight, group, numberOfCell, spaceBetweenLine) {
        var columnGroup = my.add.group();
        group.add(columnGroup);
        columnGroup.position.x = x;
        columnGroup.position.y = y;
        columnGroup.spinList = [];
        var spaceBetweenRow = 10;
        var position = {x: x, y: 0};
        for (var i = 0; i < numberOfCell; i++) {
            var spinCell = my.createSpinCell(position.x, position.y, cellWidth, cellHeight, columnGroup, (cellHeight) * numberOfCell + spaceBetweenLine * (numberOfCell - 1));
            columnGroup.spinList.push(spinCell);
            position.y -= cellHeight + spaceBetweenRow;
        }
        for (var i = 0; i < numberOfCell; i++) {
            var spinCell = columnGroup.spinList[i];
            spinCell.resetDistance = columnGroup.spinList[numberOfCell - 1].position.y;
        }
        columnGroup.finishValue = -1;
        columnGroup.finishFlag = false;
        columnGroup.moveDown = function (d) {
            if (this.finishFlag) return;
            for (var i = 0; i < numberOfCell; i++) {
                var spinCell = this.spinList[i];
                if (spinCell.finishFlag && spinCell.position.y >= 0) {
                    this.finishFlag = true;
                    spinCell.position.y = 0;
                    return;
                }

                spinCell.position.y += d;
                if (spinCell.position.y > spinCell.height) {
                    spinCell.position.y = spinCell.resetDistance;
                    if (this.finishValue != -1) {
                        spinCell.text = this.finishValue;
                        spinCell.finishFlag = true;
                    } else {
                        spinCell.text = Math.floor(Helper.Number.getRandomArbitrary(1, 9));
                    }
                }
            }
        };
        columnGroup.finish = function (value) {
            columnGroup.finishValue = value;
        };
        return columnGroup;
    };
    my.createSpinGroup = function (group) {
        var spinGroup = my.add.group();
        group.add(spinGroup);
        spinGroup.position.x = group.width / 2.0 + 50;
        spinGroup.position.y = group.height / 2.0 - 10;
        var background = my.add.sprite(0, 0, "popup_notification_background", null);
        background.scale.setTo(0.7, 0.4);
        spinGroup.add(background);
        spinGroup.columnList = [];
        var spaceBetweenColumn = 0;
        var cellWidth = 50;
        var cellHeight = 100;
        var position = {x: 15, y: 15};
        for (var i = 0; i < 3; i++) {
            var column = my.createSpinColumn(position.x, position.y, cellWidth, cellHeight, spinGroup, 3, spaceBetweenColumn);
            spinGroup.columnList.push(column);
            position.x += cellWidth + spaceBetweenColumn;
        }
        spinGroup.isPlaying = false;
        spinGroup.moveDownSpeed = 600 / 60.0;
        spinGroup.update = function () {
            if (this.isPlaying) {
                for (var i = 0; i < this.columnList.length; i++) {
                    this.columnList[i].moveDown(this.moveDownSpeed);
                }
            }
        };
        spinGroup.finish = function (reelValue) {
            for (var i = 0; i < this.columnList.length; i++) {
                this.columnList[i].finish(reelValue[i]);
            }
        };
        return spinGroup;
        //Lobby.PhaserJS.centerItemInBackground(spinGroup,group);
    };
    my.parseBoosterInfo = function(info){
        LobbyConfig.additionalInfo.booster = {};
        LobbyConfig.additionalInfo.booster.remainingTimeOfBoosterLevelUpBonus = info.remaining_time_of_booster_level_up_bonus;
        //if(my.booster != null) my.booster.startTimer();
    };
    my.reloadAndCheckAdditionalInfo = function(){
        if(my.booster != null && LobbyConfig.additionalInfo.booster.remainingTimeOfBoosterLevelUpBonus  > 0) my.booster.startTimer();
        my.magicItem.updateUI();
        if(!LobbyUserData.dataTutorial.isPlayingTutorial && LobbyConfig.additionalInfo.dailyStreakBonus.canCollect && !my.isShowingPopupDailyBonusStreak){
            my.showPopupDailyBonusStreak(false);
        }
    };
    my.parseAdditionalInfo = function (data,isReloadUI) {
        if(Lobby.Utils.objectIsNull(isReloadUI)) isReloadUI = true;
        for (var t = 0; t < data.member.length; t++) {
            var info = data.member[t].bean;
            switch (info.bean_type) {
                case LobbyConstant.API_BONUS_BEAN_TYPE_DAILY_BONUS_STREAK:
                    LobbyConfig.additionalInfo.dailyStreakBonus = {};
                    LobbyConfig.additionalInfo.dailyStreakBonus.canCollect = info.can_collect;
                    LobbyConfig.additionalInfo.dailyStreakBonus.dailyStreak = info.daily_streak;
                    LobbyConfig.additionalInfo.dailyStreakBonus.coinReward = info.coin_reward;
                    break;
                case LobbyConstant.API_BONUS_BEAN_TYPE_FREE_COIN_GIFT:
                    LobbyConfig.additionalInfo.freeCoinGiftBonus = {};
                    LobbyConfig.additionalInfo.freeCoinGiftBonus.canCollect = info.can_collect;
                    LobbyConfig.additionalInfo.freeCoinGiftBonus.coinReward = info.coin_reward;
                    LobbyConfig.additionalInfo.freeCoinGiftBonus.waitingTime = parseInt(info.waiting_time);
                    LobbyConfig.additionalInfo.freeCoinGiftBonus.numberOfTimeCollectFreeCoin = parseInt(info.number_of_times_collect_free_coin_gift);
                    break;
                case LobbyConstant.API_BONUS_BEAN_TYPE_REFERENCE_CODE:
                    LobbyConfig.additionalInfo.referenceCode = {};
                    LobbyConfig.additionalInfo.referenceCode.code = info.reference_code;
                    LobbyConfig.additionalInfo.referenceCode.numberOfUsed = info.number_of_times_reference_code_is_used;
                    break;
                case LobbyConstant.API_BONUS_BEAN_TYPE_DAILY_BONUS_LUCKY_SPIN:
                    LobbyConfig.additionalInfo.dailyBonusLuckySpin = {};
                    LobbyConfig.additionalInfo.dailyBonusLuckySpin.canCollect = info.can_collect;
                    LobbyConfig.additionalInfo.dailyBonusLuckySpin.coinReward = info.coin_reward;
                    LobbyConfig.additionalInfo.dailyBonusLuckySpin.crownReward = info.crown_reward;
                    LobbyConfig.additionalInfo.dailyBonusLuckySpin.reelValues = info.reel_values;
                    break;
                case LobbyConstant.API_BONUS_BEAN_TYPE_LUCKY_WHEEL:
                    LobbyConfig.additionalInfo.luckyWheel = {};
                    LobbyConfig.additionalInfo.luckyWheel.coinReward = info.coin_reward;
                    LobbyConfig.additionalInfo.luckyWheel.crownReward = info.crown_reward;
                    LobbyConfig.additionalInfo.luckyWheel.remainingSpin = info.remaining_spin;
                    break;
                case LobbyConstant.API_BONUS_BEAN_TYPE_LUCKY_BOX:
                    my.parseLuckyBoxData(info);
                    break;
                case LobbyConstant.API_BONUS_BEAN_TYPE_PIGGY_BANK:
                    LobbyConfig.additionalInfo.piggyBank = {};
                    LobbyConfig.additionalInfo.piggyBank.coin = info.piggy_bank_coin;
                    break;
                case LobbyConstant.API_BONUS_BEAN_TYPE_BOOSTER:
                   my.parseBoosterInfo(info);
                    break;
                case LobbyConstant.API_BONUS_BEAN_TYPE_COMEBACK_BONUS:
                    LobbyConfig.additionalInfo.comebackBonus = {};
                    LobbyConfig.additionalInfo.comebackBonus.canCollect = info.can_collect;
                    LobbyConfig.additionalInfo.comebackBonus.coin = info.coin_reward;
                    LobbyConfig.additionalInfo.comebackBonus.crown = info.crown_reward;
                    break;
                case LobbyConstant.API_BONUS_BEAN_TYPE_MAGIC_ITEM:
                    my.magicItem.reloadInfo(info);
                    break;
                default:
                    break;
            }
        }
        if(isReloadUI) my.reloadAndCheckAdditionalInfo();
    };
    my.showPopupDailyLuckySpin = function () {
        if (!LobbyConfig.isTestStrategy) return;
        var group = my.add.group();
        var background = my.add.sprite(0, 0, "popup_notification_background", null);
        group.add(background);
        background.scale.setTo(2.0, 1.8);
        var textStyle = {
            font: "30px " + ConstantFontName.FONT_NAME_PassionOne_Regular,
            fill: "#fefefe",
            align: "center",
            wordWrap: true,
            wordWrapWidth: 900
        };
        var popupTitle = my.add.text(
            background.width / 2,
            50,
            "Daily bonus lucky spin ",
            textStyle,
            group
        );

        popupTitle.anchor = {x: 0.5, y: 0.5};


        var exitBtn = my.createButtonExitPopup(group,
            900,
            10);

        Lobby.PhaserJS.centerWorld(group);
        Lobby.PhaserJS.scaleGroupForOptimize(group, true);

        var coinRewardText = my.add.text(
            background.width / 2 - 310,
            400,
            "Coin reward: ",
            textStyle,
            group
        );
        coinRewardText.visible = false;

        var crownRewardText = my.add.text(
            background.width / 2 + 100,
            400,
            "Crown reward: ",
            textStyle,
            group
        );
        crownRewardText.visible = false;

        var spinGroup = my.createSpinGroup(group);


        var infoBtn = my.createButtonGreenPopup(group,
            0,
            150,
            "Rule",
            0.7,
            function () {
                my.showNotificationPopup("Rule","   Total coins reward sum value of 3 column x 3000 coins \n1 crown bonus = all column have the same value");
            },
            45,
            true);
        infoBtn.anchor = {x: 0.5, y: 0.5};
        var spinBtn = my.createButtonGreenPopup(group,
            730,
            150,
            "Spin",
            0.7,
            function () {
                spinGroup.isPlaying = true;
                spinBtn.visible = false;
                LobbyRequest.User.collectDailyBonusLuckySpin(function (isSuccess, data, response) {
                    if (isSuccess) {
                        coinRewardText.text += " " + data.coin_reward;
                        crownRewardText.text += " " + data.crown_reward;
                        var reelValue = data.reel_values;
                        spinGroup.finish(reelValue.split(','));
                        coinRewardText.visible = true;
                        crownRewardText.visible = true;
                    }
                    else {
                        my.handleFailResultNewStrategy(response, null, true, false);
                    }
                });
            },
            45,
            true);

        spinBtn.anchor = {x: 0.5, y: 0.5};


        if (LobbyConfig.useManagerForPopUp) {
            // pop up queue
            ManagerForPopUp.addPopUpToQueue(
                ManagerForPopUp.createPopUpData(
                    my,
                    group
                ),
                true // isShow
            );
        } else {
            my.openPopupWithAnimateUpNew(group);
        }

    };
    my.getCoinInfoCollectWaitingTime = function (coinReward) {
        //for (var key in dictionary) {
        //    if (dictionary.hasOwnProperty(key)) {
        //        keys.push(key);
        //    }
        //}
        for (var key in  LobbyConfig.freeCoinGiftInfo) {
            if (LobbyConfig.freeCoinGiftInfo.hasOwnProperty(key) && LobbyConfig.freeCoinGiftInfo[key].coinReward == coinReward) {
                return LobbyConfig.freeCoinGiftInfo[key].waitingTime;
            }
        }
        // Parse wrong coin reward error;
        return null;
    };

    /**
     * add item to popup shop
     * @param parentGroup: group parent (coin group or crown group )
     * @param position : position of item
     * @param callback : callback after click buy button
     * @param index : index of product in group
     * @param singleObj : object product, define in LobbyConfig.CoinList and LobbyConfig.CrownList
     */
    my.createCellPopupDailyBonusStreak =
        function (parentGroup, position, callback, index, singleObj) {
        var group = my.add.group();
        var panel = my.add.sprite(0, 0, singleObj.isOld?"day_item_bg_not_pass":singleObj.isStreak?"day_item_streak_red":"day_item_bg", null);
        group.add(panel);

        var oldColor = "#81609F";

        if(singleObj.isStreak) {

            var shiny = my.add.sprite(0, 0, "day_item_shiny");
            Lobby.PhaserJS.center(shiny, panel);
            shiny.x = Math.floor(shiny.x);
            group.add(shiny);

            var tween1 = my.add.tween(shiny).to( { angle: 180 }, 2000, "Linear", true,0,-1);
            var tween2 = my.add.tween(shiny.scale).to( { x:0.7,y:0.7 }, 700, "Linear", true, 0, -1, true);
            var tween3 = my.add.tween(shiny).to( { alpha:0.7}, 700, "Linear", true, 0, -1, true);

            group.onClosePopup = function(){
                tween1.stop();
                tween2.stop();
                tween3.stop();

            };
        }

        var coinText = my.add.text(
            0,
            30,
            //Lobby.Utils.formatNumberWithCommas("15000"),
            //Lobby.Utils.formatNumberWithCommas("$"+LobbyUserData.amountBonusF2P[0]),
            singleObj.totalCoin,
            {
                font: "34px PassionOne-Bold",
                fill: singleObj.isOld?oldColor:"#FFFF00",
                wordWrap: true,
                wordWrapWidth: 300
            },
            group
        );
        coinText.anchor.x = 0.5;
        coinText.x = panel.width/2;
        if(singleObj.isStreak){
            coinText.y = panel.height-50;
        }

        var dayText = my.add.text(
            0,
            panel.height-20,
            //Lobby.Utils.formatNumberWithCommas("15000"),
            //Lobby.Utils.formatNumberWithCommas("$"+LobbyUserData.amountBonusF2P[0]),
            singleObj.dayText,
            {
                font: "25px PassionOne-Bold",
                fill: "#FFF",
                wordWrap: true,
                wordWrapWidth: 500
            },
            group
        );
        dayText.anchor.x = 0.5;
        dayText.anchor.y = 0.5;
        dayText.x = panel.width/2;
        if(singleObj.isStreak){
            dayText.y = 45;
            dayText.x = 45;
            dayText.angle = -45;
        }

        var spriteName = singleObj.spriteName+(singleObj.isOld?"_not_pass":"");
        var spriteLevelPurchase = my.add.sprite(0, 0, spriteName);
        Lobby.PhaserJS.center(spriteLevelPurchase, panel);
        spriteLevelPurchase.x = Math.floor(spriteLevelPurchase.x);
        group.add(spriteLevelPurchase);

            if(index == 1){
                spriteLevelPurchase.x += 10;
                spriteLevelPurchase.y += 10;
            }
        //oldColor = 0x82609F;
        //if(singleObj.isOld) {
        //    spriteLevelPurchase.tint = oldColor;
        //    panel.tint = oldColor;
        //}
        if(!singleObj.isOld && !singleObj.isStreak) {
            //var checkIcon = my.add.sprite(0, dayText.y-20, "day_item_check");
            //checkIcon.anchor = {x: 0.5, y: 0.5};
            //group.add(checkIcon);
            //checkIcon.x = checkIcon.width / 2 + 5;

            var checkAnim = my.add.sprite(0, dayText.y-20, "day_item_pass_day");
            checkAnim.anchor = {x: 0.5, y: 0.5};
            group.add(checkAnim);
            checkAnim.x = checkAnim.width / 2 - 25;
            checkAnim.animations.add('active',Lobby.PhaserJS.getSpriteSheetIndexArray(0, 31));
            checkAnim.animations.play("active", 20, true);
            checkAnim.scale.setTo(0.8,0.8);
        }
        group.position = position;
        parentGroup.add(group);
        return group;
    };
    my.showPopupDailyBonusStreak = function (isTest) {
        //return;
        //if (!LobbyConfig.isTestStrategy) return;
        //var demo = my.add.group();
        //var maskDemo = my.add.sprite(0, 0, "daily_bonus_streak_demo", null);
        //demo.add(maskDemo);


        var group = my.add.group();
        var titleAnim = null;
        var dailyBonusStreakCell = null;

        var background = my.add.sprite(0, 180, "daily_bonus_streak_bg", null);
        //Lobby.PhaserJS.centerItemInBackground(background,maskDemo);
        //background.anchor = {x:0,y:0};
        group.add(background);
        //background.scale.setTo(1.5, 1.5);
        var currentStreak = LobbyConfig.additionalInfo.dailyStreakBonus.dailyStreak;
        var textStyle = {
            font: "30px " + ConstantFontName.FONT_NAME_PassionOne_Regular,
            fill: "#fefefe",
            align: "center",
            wordWrap: true,
            wordWrapWidth: 900
        };

        if(isTest === true) {
            var exitBtn = my.createButtonExitPopup(
                group,
                650,
                10, null, function () {
                    //my.playAllAnimationCoinAndUpdateHeader(
                    //    LobbyConfig.additionalInfo.dailyStreakBonus.coinReward,
                    //    1000, function () {
                    //    }, null, false, true);

                    //stop title star animation
                    titleAnim.stop();
                    if (Lobby.Utils.objectNotNull(dailyBonusStreakCell) &&
                        Lobby.Utils.objectNotNull(dailyBonusStreakCell.onClosePopup)) {
                        dailyBonusStreakCell.onClosePopup();
                    }
                });
        }


        var listDay = my.add.group();
        group.add(listDay);
        listDay.x = 55;
        listDay.y = 350;

        var dayPositionX = 0;
        var dailyBonusStreakInfo = null;
        //currentStreak = 3;
        for (var i = 0; i < LobbyConfig.dailyStreakInfo.length; i++) {
            var spriteName = "day_item_coin_1";
            if(i >= 6){
                spriteName = "day_item_coin_5";
            }else if(i >= 4){
                spriteName = "day_item_coin_4";
            }else if(i >= 2){
                spriteName = "day_item_coin_3";
            }else if(i >= 1){
                spriteName = "day_item_coin_2";
            }
            if(i+1 == currentStreak) {
                dailyBonusStreakInfo =  {
                    dayText: "DAY " + (i + 1),
                    totalCoin: LobbyConfig.dailyStreakInfo[i].info / 1000 + ",000",
                    spriteName: spriteName,
                    isOld: (i + 1 > currentStreak),
                    isStreak: (i + 1 == currentStreak)
                };
                dailyBonusStreakInfo.xPosition = dayPositionX;
                dailyBonusStreakInfo.index = i;
            }else{
                var dayCell = my.createCellPopupDailyBonusStreak(
                    listDay,
                    {x: dayPositionX, y: 0},
                    null,
                    i,
                    {
                        dayText: "DAY " + (i + 1),
                        totalCoin: LobbyConfig.dailyStreakInfo[i].info / 1000 + ",000",
                        spriteName: spriteName,
                        isOld: (i + 1 > currentStreak),
                        isStreak: (i + 1 == currentStreak)
                    }
                );

            }

            dayPositionX += (167+11);
        }
        if(dailyBonusStreakInfo !== null){
            dailyBonusStreakCell = my.createCellPopupDailyBonusStreak(
                listDay,
                {x: dailyBonusStreakInfo.xPosition, y: 0},
                null,
                dailyBonusStreakInfo.index,
                dailyBonusStreakInfo
            );
        }

        //LobbyConfig.additionalInfo.dailyStreakBonus.coinReward

        var isClosePopup = false;
        var btnCollect = my.createButtonGreenPopup(
            group,
            //background.width/2-140,
            //background.height-150,
            background.width / 2 - 140,
            background.height + 60,
            "COLLECT",
            1,
            function () {
                if(isClosePopup){
                    return;
                }
                isClosePopup = true;
                //my.showLoadingAnimation()
                LobbyRequest.User.collectDailyBonusStreak(function (isSuccess, data, response) {
                    //my.hideLoadingAnimation();
                    if (isSuccess) {
                        //my.showNotificationPopup("Collect daily bonus", "Success");
                        my.playAllAnimationCoinAndUpdateHeader(
                            0,
                            1000,
                            function() {
                        }, null, false, true);
                        LobbyC.MainMenu.updateUserInfoFromSV(
                            function () {

                            },
                            function () {
                            },
                            false // isGetStatisticData
                        );

                    } else {
                        my.handleFailResultNewStrategy(response, null, true, false);
                    }
                    //stop title star animation
                    titleAnim.stop();
                    if(Lobby.Utils.objectNotNull(dailyBonusStreakCell) &&
                        Lobby.Utils.objectNotNull(dailyBonusStreakCell.onClosePopup)) {
                        dailyBonusStreakCell.onClosePopup();
                    }
                    if (LobbyConfig.useManagerForPopUp) {
                        ManagerForPopUp.forceClosePopUp(my, group);
                    } else {
                        my.closePopupWithAnimateDownNew(group);
                    }
                });
                my.isShowingPopupDailyBonusStreak = false;
            },
            55,
            true);

        var logo = my.add.sprite(0, -80, "daily_bonus_streak_logo", null);
        Lobby.PhaserJS.centerX(logo,background.width);
        logo.x += 15;
        group.add(logo);


        titleAnim = new SpriteAnimation(
            my,
            group,
            {x:710,y:200},
            {x:1,y:1},
            'daily_bonus_streak_title_anim_',
            3,
            90,
            true);
        titleAnim.play(20,function(){
        });

        if(!LobbyConfig.additionalInfo.dailyStreakBonus.canCollect) btnCollect.visible = false;
        //btnCollect.anchor = {x:0.5,y:0.5};
        Lobby.PhaserJS.centerWorld(group);
        group.y += 40;
        Lobby.PhaserJS.scaleGroupForOptimize(group, true);
        //group.visible = false;
        //return;

        my.isShowingPopupDailyBonusStreak = true;
        if (LobbyConfig.useManagerForPopUp) {
            // pop up queue
            ManagerForPopUp.addPopUpToQueue(
                ManagerForPopUp.createPopUpData(
                    my,
                    group
                ),
                true // isShow
            );
        } else {
            my.openPopupWithAnimateUpNew(group);
        }
    };
    my.showPopupTest = function () {

        var group = my.add.group();
        var background = my.add.sprite(0, 0, "popup_notification_background", null);
        group.add(background);
        var textStyle = {
            font: "40px " + ConstantFontName.FONT_NAME_PassionOne_Regular,
            fill: "#fefefe",
            align: "center",
            wordWrap: true,
            wordWrapWidth: 900
        };

        var btnExit = my.createButtonExitPopup(group, background.width - 70, -15);
        /***
         * User id
         */
        var userId = my._userData.profile.id;
        var userIdText = my.add.text(
            0,
            0,
            userId,
            textStyle,
            group
        );
        Lobby.PhaserJS.center(userIdText, background);
        if (my._userData.profile.test_user == true) {
            /***
             * Pay to play date since last purchased
             */
            var numberOfDaySinceLastShowF2PPopup = 0;
            var tsLastShowF2PString =
                Lobby.Utils.getFromLocalStorage(LobbyConstant.keyForStoringDataPopupsPromotion.tsLastShowF2P + my._userData.profile.id);
            if (Lobby.Utils.objectNotNull(tsLastShowF2PString)) {
                var tsLastShowF2P = parseInt(tsLastShowF2PString);
                var timespan = new Date() - tsLastShowF2P;
                numberOfDaySinceLastShowF2PPopup = timespan / (3600 * 24 * 1000);
            }

            var daySinceLastOpenF2PPopup = my.add.text(
                background.width - 70,
                background.height - 100,
                numberOfDaySinceLastShowF2PPopup.toFixed(3),
                textStyle,
                group
            );
            daySinceLastOpenF2PPopup.anchor.x = 1;
            var resetDaySincleLastOpenF2PPopup = function () {
                var oneDay = 3600 * 24 * 1000;
                var today = new Date() - oneDay * 4;
                Lobby.Utils.setToLocalStorage(LobbyConstant.keyForStoringDataPopupsPromotion.tsLastShowF2P + my._userData.profile.id,
                    today);
                my.showNotificationPopup("Free2Play reset", "NUMBER OF SHOW F2P CONSECUTIVE RESET", null)

            };
            var btnReset = my.createButtonGreenPopup(group,
                //background.width/2-140,
                //background.height-150,
                0,
                background.height - 120,
                "Reset",
                0.7,
                resetDaySincleLastOpenF2PPopup,
                45,
                true);

            if(LobbyConfig.isTestPacketStrategy){
                var btnBuyPopup = my.createButtonGreenPopup(group,
                    //background.width/2-140,
                    //background.height-150,
                    0,
                    background.height - 30,
                    "Test Booster",
                    0.7,
                    function () {
                        my.showNotificationPopupV2("Booster Packages", "Buy booster package test", function () {

                            if (!Lobby.Utils.isWeb()) {
                                if (cordova.platformId == "android") ManagerForPurchase.buyItem(my, LobbyConfig.ProductManager.Android["BoosterP1"]);
                                else  ManagerForPurchase.buyItem(my, LobbyConfig.ProductManager.IOs["BoosterP1"]);
                            }
                            else my.showNotificationPopup("Error", "Platform not supported.");
                        }, function (isXButton) {
                            if(isXButton !== true) {
                                if (!Lobby.Utils.isWeb()) {
                                    if (cordova.platformId == "android") ManagerForPurchase.buyItem(my, LobbyConfig.ProductManager.Android["BoosterP2"]);
                                    else  ManagerForPurchase.buyItem(my, LobbyConfig.ProductManager.IOs["BoosterP2"]);
                                }
                                else my.showNotificationPopup("Error", "Platform not supported.");
                            }
                        }, "Buy BoosterP1", "Buy BoosterP2");
                    },
                    45,
                    true);
            }
            var buyPackage = function (_package) {
                var callbackBuy = function () {
                    if (!Lobby.Utils.isWeb()) {
                        if (cordova.platformId == "android") ManagerForPurchase.buyItem(LobbyC.MainMenu, LobbyConfig.ProductManager.Android[_package]);
                        else  ManagerForPurchase.buyItem(LobbyC.MainMenu, LobbyConfig.ProductManager.IOs[_package]);
                    }
                    else LobbyC.MainMenu.showNotificationPopup("Error", "Platform not supported.");
                };


                callbackBuy();

            };
            LobbyC.MainMenu.createTestButton(0, background.height + 50, "LuckyWheelP1", group, function () {
                buyPackage("LuckyWheelP1");
            }, LobbyConfig.isTestPacketStrategy);
            LobbyC.MainMenu.createTestButton(0, background.height + 150, "LuckyWheelP2", group, function () {
                buyPackage("LuckyWheelP2");
            }, LobbyConfig.isTestPacketStrategy);
            LobbyC.MainMenu.createTestButton(0, background.height + 300, "LuckyWheelP3", group, function () {
                buyPackage("LuckyWheelP3");
            }, LobbyConfig.isTestPacketStrategy);
            LobbyC.MainMenu.createTestButton(0, background.height + 450, "PiggyBankP1", group, function () {
                buyPackage("PiggyBankP1");
            }, LobbyConfig.isTestPacketStrategy);
            if (!Lobby.Utils.isIOS()
                && ManagerForPurchase.WasInitPurchase() === false)
                ManagerForPurchase.initProduct(my);
            //background.anchor = {x:0.5,y:0.5}
        }
        LobbyC.MainMenu.createTestButton(0, 25, "TestToken", group, function () {
            LobbyC.MainMenu.popupHtml.showSumbitTokenKey();
        }, LobbyConfig.isTestStrategy);

        Lobby.PhaserJS.centerWorld(group);
        Lobby.PhaserJS.scaleGroupForOptimize(group, true);

        if (LobbyConfig.useManagerForPopUp) {
            // pop up queue
            ManagerForPopUp.addPopUpToQueue(
                ManagerForPopUp.createPopUpData(
                    my,
                    group
                ),
                true // isShow
            );
        } else {
            my.openPopupWithAnimateUpNew(group);
        }
    };


    my.dWidth = 385;
    my.dHeight = 250;
    /**
     * calculate anchor
     * @param width: un use
     * @param height: un use
     * @returns {{x: number, y: number}}
     */
    my.calculateAnchor = function (width, height) {
        //var x = 0.5;
        //var y = 0;
        //
        //y = y + (0.5) * ((height - my.dHeight) / my.dHeight);
        //return {x: x, y: y};
        return {x: 0.5, y: 0.57}
    };
    /**
     * reload avatar header
     */
    my.reloadHeaderAvatar = function () {
        var callbackReloadAvatarProfile = function (avatarData) {
            if (!Lobby.PhaserJS.tryLoadAvatar(my.userAvatarHeader, avatarData.avatarURL, my)) {
                //avatarData.avatarScale = 0.17;
                Lobby.PhaserJS.createSpriteWithCircleMask(my.userAvatarHeader, avatarData.avatarURL, 100, my);
                my.userAvatarHeader.width = 100;
                my.userAvatarHeader.height = 100;
            } else {
                my.userAvatarHeader.width = 100;
                my.userAvatarHeader.height = 100;
            }
        };
        my.createAvatar(my._userData.profile, callbackReloadAvatarProfile);
    };
    /**
     * create avatar from user data
     * @param user_data: user data
     * @param callback: callback after create and loaded avatar
     */
    my.createAvatar = function (user_data, callback) {
        var avatarURL = "popup_profile_profile_avatar", valueURL = "";
        var avatarScale = 1;

        if (user_data.role != 1) {
            if (user_data.name.startsWith("local")) {
                user_data.name = "Anonymous";
            }
            else {
                if (user_data.facebookUID != null && user_data.facebookUID != "") {
                    avatarURL = 'user-avatar-' + user_data.facebookUID;
                    valueURL = "https://graph.facebook.com/" + user_data.facebookUID +
                        "/picture?type=normal&width=100&height=100";
                    //avatarScale = 1;
                }
                else if (user_data.url_full_avatar != "" && user_data.url_full_avatar != null) {
                    avatarURL = 'user-avatar-' + user_data.id;
                    valueURL = user_data.url_full_avatar;
                    avatarScale = 0.34;
                }
                else {
                    valueURL == "";
                    //valueURL = LobbyConfig.botAvatar;
                    avatarScale = 0.1;
                }
            }
        }
        else {
            avatarURL = 'user-avatar-bot';
            if (user_data.url_full_avatar != "" && user_data.url_full_avatar != null) {
                valueURL = LobbyConfig.webServiceFullUrl + "/" + user_data.url_full_avatar;
            }
            else {
                //valueURL = LobbyConfig.botAvatar;
                valueURL == "";
            }
            avatarScale = 0.1;
        }

        //if(Lobby.Utils.isIOS()
        //  && fromChangeAvatar == true){
        //  avatarURL = avatarURL + '-' + LobbyC.Login.numberOfChangeAvatar;
        //}
        ResourceLoader.loadAvatar(avatarURL, valueURL, callback, {avatarURL: avatarURL, avatarScale: avatarScale});
    };
    /**
     * play animation coin and update header
     * @param bonus : number of coin
     * @param duration : duration play animation fly coin
     * @param callback : callback after run amtion
     * @param pos : star of animation
     * @param isShowHeaderOnly : is show header only?
     * @param isReloadHeader : is reload header>
     */
    my.playAllAnimationCoinAndUpdateHeader = function (bonus, duration, callback, pos, isShowHeaderOnly, isReloadHeader) {
        if (Lobby.Utils.objectIsNull(duration)) duration = 2000;
        if (Lobby.Utils.objectIsNull(bonus)) bonus = 0;
        if (Lobby.Utils.objectIsNull(isShowHeaderOnly)) isShowHeaderOnly = false;
        if (Lobby.Utils.objectIsNull(isReloadHeader)) isReloadHeader = true;
        if (isShowHeaderOnly) {
            my.playAnimationCoinForHeader(bonus, duration, function () {
                if (isReloadHeader)
                    my.reloadHeader(false);
                if (!Lobby.Utils.objectIsNull(callback)) callback();
            });
            return;
        }
        my.createCoinAnimation(pos, null, null, null, function () {
            my.playAnimationCoinForHeader(bonus, duration, function () {
                if (isReloadHeader)
                    my.reloadHeader(false);
                if (!Lobby.Utils.objectIsNull(callback)) callback();
            });
        }, null);
    };
    /**
     * play animation flying crown
     * @param pos : star pos
     */
    my.playAnimationFlyingCrown = function (pos) {
        my.createCrownAnimation(pos, null, function () {
            my.reloadHeader(false);
        });
    };
    /**
     * play animation coin for header
     * @param bonus : number of coin
     * @param duration : duration
     * @param callback : callback after complete animation
     */
    my.playAnimationCoinForHeader = function (bonus, duration, callback) {
        if (Lobby.Utils.objectIsNull(my._userData)) {
            return;
        }

        if (Lobby.Utils.objectIsNull(duration)) duration = 5000;
        var from = Helper.Number.unFormatNumber(my._userCoinText.text);
        if (from + bonus < 0) {
            bonus = 0;
        }
        if (parseInt(bonus) == 0) return;

        if (LobbyConfig.isTestAlgorithmMode) { //no coin animation if in test mode
            var userCoin = from + bonus;
            userCoin = userCoin > 0 ? userCoin : 0;
            my._userCoinText.text = Helper.Number.formatNumber(userCoin);
            if (!Lobby.Utils.objectIsNull(callback)) {
                callback();
            }
            return;
        }

        if ((from != 0 || LobbyUserData.dataTutorial.isPlayingTutorial == true) && Math.abs(bonus - from) > 5) {
            if (bonus > 0) {
                my.playCoinTextIncreaseSound();
            } else {
                my.playCoinTextDecreaseSound();
            }
        }

        var tween = my.add.tween(my._userCoinText).to({
            text: []
        }, duration, Phaser.Easing.Quadratic.Out, true).interpolation(function (v, k) {
            Phaser.Math.bezierInterpolation(v, k);

            return Helper.Number.formatNumber(from + k * bonus);
        });
        tween.onComplete.add(function () {
            my.updateHeaderCoinTween = null;
            //my._soundIncreaseCoinText.stop();
            ManagerForSound.stop(my, 'increase-coin-text');
            ManagerForSound.stop(my, 'decrease-coin-text');
            if (!Lobby.Utils.objectIsNull(callback)) {
                callback();
            }
        }, this);

        my.updateHeaderCoinTween = tween;
    };
    /**
     * call to server to get data and show profile popup
     */
    my.showPopupProfile = function () {
        if (Lobby.Utils.objectIsNull(my.isShowPopupProfile)) {
            my.isShowPopupProfile = false;
        }
        //if (my.isShowPopupProfile) {
        //    //return;
        //}

        my.showLoadingAnimation();
        var isHideloadingAnimation = true;
        var timeOutGetUserProfile = my.time.events.add(15000,
            function () {
                if (isHideloadingAnimation == true
                    && my.isShowPopupProfile == false) {
                    //my.hideLoadingAnimation();
                    my.showPopUpProfileLocal(my._userData);
                }
            }, this);
        my.updateUserInfoFromSV(
            function (isSuccess) {
                //my.hideLoadingAnimation();
                if (isSuccess) {
                    //my.roundMoney();
                    Lobby.PhaserJS.clearTimer(my, timeOutGetUserProfile);
                    isHideloadingAnimation = false;
                    if (my.isShowPopupProfile == false)
                        my.showPopUpProfileLocal(my._userData);
                } else {
                    //Thanh, khi lay profile that bai show profile cu neu co
                    Lobby.PhaserJS.clearTimer(my, timeOutGetUserProfile);
                    isHideloadingAnimation = false;
                    if (my.isShowPopupProfile == false && my._userData != null)
                        my.showPopUpProfileLocal(my._userData);
                }
            }
        );
    };
    /**
     * create avatar group for profile popup
     * @param groupWillNotDestroy : group will not destroy after close popup profile
     * @param userData
     * @param avatarScale
     * @param positionAvatar
     */
    my.createAvatarGroup = function (groupWillNotDestroy, userData, avatarScale, positionAvatar) {
        /**
         * avatar
         * @type {string}
         */
        var group = groupWillNotDestroy.groupWillDestroy;
        var avatarGroup = my.add.group();
        avatarGroup.position.x = positionAvatar.x;
        avatarGroup.position.y = positionAvatar.y;
        group.add(avatarGroup);
        var avatarURL = "popup_profile_profile_avatar", valueURL = "";
        var avatar = my.add.sprite(
            0,
            0,
            //0,
            //0,
            "popup_profile_profile_avatar",
            null,
            avatarGroup
        );
        avatar.anchor.x = 0;
        avatar.anchor.y = 0;
        avatar.scale.setTo(1, 1);

        if (!Lobby.PhaserJS.createSpriteWithCircleMask(avatar, avatarURL, null, my)) {
            Lobby.PhaserJS.maskCircleGroup(avatarGroup, 280, my);
        }
        ;

        if (userData.profile.role != 1) {
            if (userData.profile.name.startsWith("local")
            //|| userData.profile.role == 2
            ) {
                userData.profile.name = "Anonymous";
            }
            else {
                if (userData.profile.facebookUID != null && userData.profile.facebookUID != "") {
                    avatarURL = 'user-avatar-' + userData.profile.facebookUID + "profile";
                    valueURL = "https://graph.facebook.com/" + userData.profile.facebookUID +
                        "/picture?type=normal&width=320&height=320";
                    avatarScale = 0.62;
                }
                else if (userData.profile.url_full_avatar != "" && userData.profile.url_full_avatar != null) {
                    avatarURL = 'user-avatar-' + userData.profile.id;
                    valueURL = userData.profile.url_full_avatar;
                    avatarScale = 1.1;
                }
            }
        }
        else {
            avatarURL = 'user-avatar-bot';
            valueURL = LobbyConfig.botAvatar;
        }
        var callbackReloadAvatarProfile = function () {
            try {
                if (Lobby.Utils.objectIsNull(avatar) ||
                    Lobby.Utils.objectIsNull(avatarURL)) {
                    return;
                }
                if (!Lobby.PhaserJS.tryLoadAvatar(avatar, avatarURL, my, true)) {
                    Lobby.PhaserJS.createSpriteWithCircleMask(avatar, avatarURL, null, my);
                    //avatarScale = 2.5 * 0.93;
                } else {

                }
            } catch (e) {
            }

            Lobby.PhaserJS.scaleAspectSize(avatar, {width: 280, height: 280});

            my.hideLoadingAnimation();
            groupWillNotDestroy.add(groupWillNotDestroy.groupWillDestroy);
            my.openPopupWithAnimateRightNew(groupWillNotDestroy);
        };
        groupWillNotDestroy.visible = false;
        groupWillNotDestroy.groupWillDestroy.visible = false;
        ResourceLoader.loadAvatar(avatarURL, valueURL, callbackReloadAvatarProfile);

        var vipBorderKey = "crown-vip-border";
        if (userData.profile.type != undefined
            && userData.profile.type != 0) {
            //if(true){
            var vipBorder = my.add.sprite(
                //pos.cameraPosX,
                //pos.cameraPosY-120,
                avatar.parent.position.x - 17,
                avatar.parent.position.y - 47,
                vipBorderKey,
                null,
                group
            );
        }


    };

    /**
     * show profile popup local form user data
     * @param userData
     */
    my.showPopUpProfileLocal = function (userData) {

        var groupWillNotDestroy;
        var isCreateNewPopup = true;
        if (Lobby.Utils.objectNotNull(my.popupContainer.popupProfile)
            && my.popupContainer.popupProfile != "") {
            groupWillNotDestroy = my.popupContainer.popupProfile;
            groupWillNotDestroy.x = 0;
            isCreateNewPopup = false;
        } else {
            groupWillNotDestroy = my.add.group();
            groupWillNotDestroy.name = LobbyConfig.popupName.popupProfile;
            groupWillNotDestroy.isScaled = false;
            my.popupContainer.popupProfile = groupWillNotDestroy;
        }
        var group = my.add.group();
        groupWillNotDestroy.groupWillDestroy = group;
        //groupWillNotDestroy.add(group);
        //if(Lobby.Utils.objectIsNull(my.isShowPopupProfile)){
        //    my.isShowPopupProfile = false;
        //}
        //if(my.isShowPopupProfile){
        //    return;
        //}
        my.isShowPopupProfile = true;

        var percentWinRatio;
        if (Lobby.Utils.objectIsNull(userData)
            || Lobby.Utils.objectIsNull(userData.profile)
            || Lobby.Utils.objectIsNull(userData.profile.Slot)) {
            my.isShowPopupProfile = false;
            percentWinRatio = 0;
        } else if (Lobby.Utils.objectNotNull(userData.profile.Slot.percentWin)) {
            percentWinRatio = userData.profile.Slot.percentWin;
        } else {
            percentWinRatio = 0;
        }
        //var percentWinRatio = (userData.profile.Slot.percentWin != undefined) ? userData.profile.Slot.percentWin : 0;
        percentWinRatio = Math.round(percentWinRatio * 100) / 100;
        var remainExpPoint = userData.profile.remaining_exp;
        remainExpPoint = Helper.Number.formatNumber(remainExpPoint);
        //remainExpPoint = Helper4Number.formatNumber(remainExpPoint);
        var purpleText = {
            font: "40px " + ConstantFontName.FONT_NAME_PassionOne_Regular,
            fill: "#EB76E4"
        };

        var popupBackgroundIdentified = "popup_profile_background";

        var backgroundTop;
        if (isCreateNewPopup) {
            backgroundTop = my.add.sprite(
                -50,
                0,
                popupBackgroundIdentified,
                null,
                groupWillNotDestroy
            );
            backgroundTop.scale.setTo(100 / 70); // reduce resolution 70%
            my.popupContainer.popupProfile.backgroundTop = backgroundTop;

            var btnExit = my.createButtonExitPopup(
                groupWillNotDestroy,
                my.popupContainer.popupProfile.backgroundTop.width - 70,
                42,
                1,
                function () {
                },
                function () {
                    my.isShowPopupProfile = false;
                });
            btnExit.anchor.x = 0.5;
            btnExit.anchor.y = 0.5;
        }

        var avatarScale = 2.5 * 0.93;
        var xCenter = my.popupContainer.popupProfile.backgroundTop.position.x + my.popupContainer.popupProfile.backgroundTop.width / 2;
        var pos = {
            avatarPosX: xCenter - 34,
            avatarPosY: 230 + 3,
            cameraPosX: xCenter - 130,
            cameraPosY: 325,
            namePosX: xCenter + 10,
            namePosY: 460,
            rankPosX: xCenter - 50,
            rankPosY: 490,
            starPosX: 0,
            starPosY: 40,
            remainPosX: xCenter + 10,
            remainPosY: 600,
            perPosX: xCenter + 10,
            perPosY: 730
        };
        /**
         * button section
         */

        my.createAvatarGroup(
            groupWillNotDestroy,
            userData,
            avatarScale, {
                x: pos.avatarPosX / 2,
                y: pos.avatarPosY / 2
            });

        /**
         * button change avatar
         */
        if ((userData.profile.facebookUID == null || userData.profile.facebookUID == "") && LobbyConfig.loginFrom != LobbyConstant.LoginFrom.guest) {
            if (Lobby.Utils.isIOS())
                my.getImageFromFile.clickInput(groupWillNotDestroy);
            var btnCapture = Lobby.PhaserJS.createSpriteRectangleExt(
                my,
                pos.cameraPosX,
                pos.cameraPosY,
                function () {
                    my.getImageFromFile.clickInput(groupWillNotDestroy);
                },
                function () {
                    if (Lobby.Utils.isIOS() || Lobby.Utils.isWeb())
                        my.getImageFromFile.displayInput(groupWillNotDestroy, btnCapture);
                },
                function () {
                    if (Lobby.Utils.isIOS() || Lobby.Utils.isWeb())
                        my.getImageFromFile.hideInput();
                },
                group, LobbyConfig.isDebug,
                "popup_profile_take_photo",
                null, null
            );
        }

        /**
         * name text
         */
        var textStyle;
        // 2016-05-10: Phuoc: nếu là tiếng Malay thì set stype riêng
        if (my.currentlanguageCode == 4) {
            textStyle = {
                font: "35px " + ConstantFontName.FONT_NAME_PassionOne_Regular,
                fill: "#fefefe"
            };
        } else {
            textStyle = {
                font: "40px " + ConstantFontName.FONT_NAME_PassionOne_Regular,
                fill: "#fefefe"
            };
        }
        var nameText = my.add.text(
            pos.namePosX,
            pos.namePosY,
            (userData.profile.name.length > 12) ? Lobby.Utils.trimText(userData.profile.name,
                12) : userData.profile.name,
            {
                font: "45px " + ConstantFontName.FONT_NAME_PassionOne_Regular,
                fill: "#fefefe"
            },
            group
        );
        nameText.anchor.x = 0.5;
        nameText.anchor.y = 0.5;

        if (my.isLoginWithAccountFacebook()) {
            var facebookIcon = my.add.sprite(
                100,
                320,
                "popup_profile_facebook_icon", null,
                group
            );
            facebookIcon.scale.setTo(1.2, 1.2);
        }

        /**
         * button change name
         */
        if ((userData.profile.facebookUID == null || userData.profile.facebookUID == "") && LobbyConfig.loginFrom != LobbyConstant.LoginFrom.guest) {
            var btnEditName = Lobby.PhaserJS.createSpriteRectangleExt(
                my,
                pos.namePosX + 180,
                pos.namePosY,
                function () {
                    my.resizeButtonAndTextAnimationScaleDown(btnEditName);
                    my.time.events.add(150,
                        function () {
                            btnEditName.frame = 0;
                            my.closePopupWithAnimateLeftNew(groupWillNotDestroy);
                            if (LobbyConfig.enablePopupHtml)
                                my.popupHtml.showEditNamePopupHtml(my, userData.profile.name);
                            else my.showEditNamePopup(userData.profile.name);

                        }, this);

                },
                function () {
                    my.resizeButtonAndTextAnimationScaleUp(btnEditName);
                    btnEditName.frame = 0;
                },
                function () {
                    my.resizeButtonAndTextAnimationScaleUp(btnEditName);
                    btnEditName.frame = 0;
                },
                group, LobbyConfig.isDebug,
                "popup_profile_edit_name",
                null, null
            );
            btnEditName.anchor.x = 0.5;
            btnEditName.anchor.y = 0.5;
        }

        //var text_level = my.add.text(
        //    (backgroundTop.width / 2) - 12,
        //    50,
        //    my.selectlanguage.popup_profile_level.text, {
        //        font: "16px Helvetica-Bold",
        //        fill: "#ffc500"
        //    }, group);
        /**
         * level text
         */
        //var level = my.add.text(
        //    200,
        //    200,
        //    userData.profile.level + 1, whiteText,
        //    group);
        //level.y = sendFreeGift.y - 5;
        //level.y = 0;
        //Lobby.PhaserJS.centerX(level, backgroundTop.width);
        //level.x += 7;

        //var coinText = my.add.text(
        //    nameText.x + 40,
        //    nameText.y + nameText.height + 3,
        //    Lobby.Utils.formatNumberWithCommas(Math.round(userData.profile.coin)), {
        //        font: "25px Helvetica-Bold",
        //        fill: "#ffc500"
        //    }, group);
        /* star */
        // 2016-05-10: Phuoc: chỉnh vị trí
        var levelAndVipTypeGroup = my.add.group(group);
        levelAndVipTypeGroup.y = pos.rankPosY;
        var starLevel = my.add.sprite(
            //pos.rankPosX - 60, pos.rankPosY,
            0,
            0,
            "new_header_start_for_level_and_vip", null,
            levelAndVipTypeGroup
        );
        //starLevel.anchor.x = 0.5;
        //starLevel.anchor.y = 0.6;
        starLevel.scale.setTo(0.5);
        var levelAndVipTypeString = userData.profile.level + 1;
        var levelVipUser = (Lobby.Utils.objectNotNull(userData.profile.type) ? userData.profile.type : 0);
        switch (levelVipUser) {
            case 1:
                levelAndVipTypeString += ": Silver";
                break;
            case 2:
                levelAndVipTypeString += ": Gold";
                break;
            case 3:
                levelAndVipTypeString += ": Pink Diamond";
                break;
            case 4:
                levelAndVipTypeString += ": Blue Sapphire";
                break;
            case 5:
                levelAndVipTypeString += ": Green Emerald";
                break;
            default:
                break;
        }
        var levelAndVipTypeText =
            my.add.text(
                starLevel.x + starLevel.width + 10,
                starLevel.y + 5,
                levelAndVipTypeString,
                purpleText,
                levelAndVipTypeGroup);
        Lobby.PhaserJS.centerXItemInBackground(levelAndVipTypeGroup, my.popupContainer.popupProfile.backgroundTop);
        //levelAndVipTypeText.anchor.x = 0;
        //levelAndVipTypeText.anchor.y = 0.5;
        /**
         * percent win
         * @type {number}
         */
        var percentWin = my.add.text(
            pos.perPosX,
            pos.perPosY,
            my.selectlanguage.popup_profile_Slot_Win.text + percentWinRatio + "%",
            textStyle,
            group
        );
        percentWin.anchor.x = 0.5;
        percentWin.anchor.y = 0.5;
        /**
         * remain exp
         * @type {number}
         */
        var remainExp = my.add.text(
            pos.remainPosX,
            pos.remainPosY,
            remainExpPoint + my.selectlanguage.popup_profile_to_level_up_lable.text,
            purpleText,
            group
        );
        remainExp.align = "center";
        remainExp.anchor.x = 0.5;
        remainExp.anchor.y = 0.5;
        if (!groupWillNotDestroy.isScaled) {
            Lobby.PhaserJS.scaleGroupForOptimize(groupWillNotDestroy, false);
            groupWillNotDestroy.isScaled = true;
        }
    };

    /**
     * Show header coin animation
     */
        // 2016-05-12: Thanh
    my.showHeaderCoinAnimation = function (pos, group) {
        var coinAnim = my.coinFlareHeaderAnimation;
        if (Lobby.Utils.objectIsNull(coinAnim)) {
            coinAnim = my.add.sprite(pos.x + 5, pos.y, 'header-coin-animation');
            coinAnim.anchor = {x: 0.5, y: 0.5};
            //  In the texture atlas the jellyfish uses the frame names blueJellyfish0000 to blueJellyfish0032
            //  So we can use the handy generateFrameNames function to create this for us.
            coinAnim.animations.add('shine', Phaser.Animation.generateFrameNames('anim', 0, 29, '', 4), 30, true);
            coinAnim.blendMode = PIXI.blendModes.ADD;
            coinAnim.scale.setTo(0.83, 0.83);
            group.add(coinAnim);
            my.coinFlareHeaderAnimation = coinAnim;
        }
        coinAnim.animations.play('shine', 24, false, false);
    };
    /**
     * Crown animation section
     */
    my.showHeaderCrownAnimation = function (pos, group) {
        my.showHeaderStarAnimation(pos, group);
        my.showHeaderCrownFlareAnimation(pos, group, true);
    };
    /**
     * show star animation in crown sprite ( button show popup shop )
     * @param pos : postion of crown sprite
     * @param group
     */
    my.showHeaderStarAnimation = function (pos, group) {
        var crownStarAnim = my.add.sprite(pos.x + 5, pos.y, 'body-slotgame-star-animation-on-crown');
        crownStarAnim.anchor = {x: 0.5, y: 0.5};
        crownStarAnim.angle += 37;
        crownStarAnim.animations.add('shine', Phaser.Animation.generateFrameNames('StarOnCrownAnimation', 0, 35, '', 4), 30, true);
        crownStarAnim.blendMode = PIXI.blendModes.ADD;
        crownStarAnim.scale.setTo(0.74, 0.74);
        //crownFlareAnim.scale.setTo(1,1);
        group.add(crownStarAnim);
        //crownStarAnim.events.onAnimationComplete.add(function(){my.showHeaderCrownFlareAnimation(pos,group);},this);
        crownStarAnim.animations.play('shine', 26, false, true);
    };
    /**
     * show flare animation in crown sprite ( button show popup shop )
     * @param pos : postion of crown sprite
     * @param group
     */
    my.showHeaderCrownFlareAnimation = function (pos, group, isShowRepeat) {
        var crownFlareAnim = my.add.sprite(pos.x, pos.y + 5, 'body-slotgame-crown-animation');
        crownFlareAnim.anchor = {x: 0.5, y: 0.5};
        crownFlareAnim.angle += 37;
        crownFlareAnim.animations.add('shine', Phaser.Animation.generateFrameNames('CrownAnimation', 0, 19, '', 4), 30, true);
        crownFlareAnim.blendMode = PIXI.blendModes.ADD;
        crownFlareAnim.scale.setTo(0.8, 0.8);
        //crownFlareAnim.scale.setTo(1,1);
        group.add(crownFlareAnim);
        if (isShowRepeat) {
            crownFlareAnim.events.onAnimationComplete.add(function () {
                //crownFlareAnim.animations.play('shine',24,false,true,true);
                my.showHeaderCrownFlareAnimation(pos, group, false);
            }, this);
        }
        crownFlareAnim.animations.play('shine', 24, false, true);

    };
    /**
     * Pop up level up
     */
    my.showPopupLevelUp = function (oldLevel, currentLevel, coin, crown, callback, callbackAnimation) {
        my.isShowLevelUpPopup = true;
        my.numberOfPopupLevelUp++;
        var group = my.add.group();
        var background = my.add.sprite(0, 0, "popup_levelup_bg");
        group.add(background);
        var w = background.width;
        var h = background.height;
        /**
         * light ray
         */
        var lightray = my.add.sprite(
            0,
            0,
            "popup_levelup_lightray",
            null,
            group
        );
        lightray.anchor.x = 0.5;
        lightray.anchor.y = 0.5;
        my.add.tween(lightray).to({angle: 360}, 3500, Phaser.Easing.Default, true, 0, -1, false);
        //Lobby.PhaserJS.centerParent(lightray, background);
        //lightray.y -= 100;
        lightray.y += 240;
        lightray.x += 420;


        /**
         * Collect button
         */

            //var collectBtn = Lobby.PhaserJS.createSpriteRectangleExt(
            //    my,
            //    50,
            //    h - 150,
            //    function () {
            //        my.resizeButtonAndTextAnimationScaleDown(collectBtn);
            //        var interval = setInterval(function () {
            //            clearInterval(interval);
            //            my.playAllAnimationCoinAndUpdateHeader(coin, 1000, function () {
            //                if (Lobby.Utils.objectNotNull(callback)) callback();
            //            }, null, true);
            //            my.closePopupWithAnimateDownNew(group);
            //        }, 150);
            //
            //    },
            //    function () {
            //        my.resizeButtonAndTextAnimationScaleUp(collectBtn);
            //    },
            //    function () {
            //        my.resizeButtonAndTextAnimationScaleUp(collectBtn);
            //    },
            //    group, LobbyConfig.isDebug,
            //    "popup-levelup-collect-btn"
            //);
        my.data4RewardCoinPopupLvup.coin = coin;
        my.data4RewardCoinPopupLvup.callback = callback;
        var collectCoin = function(){
            if (Lobby.Utils.objectNotNull(my.data4RewardCoinPopupLvup.callback)) my.data4RewardCoinPopupLvup.callback();
            var isLoadHeader = true;
            if (my.numberOfPopupLevelUp <= 1) {
                my.isCollectedRewardFromPopupLvUp = true;
                isLoadHeader = false;
                my.numberOfPopupLevelUp = 1;
            }
            my.numberOfPopupLevelUp--;
            my._userCrownText.text = Lobby.Utils.formatNumberWithCommas(my._userData.profile.crown);
            my.playAllAnimationCoinAndUpdateHeader(coin, 1000, function() {
                my.isShowLevelUpPopup = false;
                if (callbackAnimation) {
                    callbackAnimation();
                }
            }, null, false, isLoadHeader);
            my.data4RewardCoinPopupLvup = {};

            if (LobbyConfig.useManagerForPopUp) {
                ManagerForPopUp.forceClosePopUp(my, group);
            } else {
                my.closePopupWithAnimateDownNew(group);
            }
        };
        var collectBtn = my.createButtonGreenPopup(
            group,
            50,
            h - 150,
            my.selectlanguage.ok.text,
            1,
            function () {
                collectCoin();
            },
            50
        );
        //collectBtn.textBtn.position.x = 190;
        //Lobby.PhaserJS.centerXParent(collectBtn,background);
        /**
         * Colect and share button
         */
        if (my._userData.profile.facebookUID != null && my._userData.profile.facebookUID != "") {
            var collectShareBtn = Lobby.PhaserJS.createSpriteRectangleExt(
                my,
                370,
                h - 150,
                function () {
                    //if (!FacebookController.isInFBCanvas()) {
                    //    my.showUnfinishedJobMessage("");
                    //    return;
                    //}
                    if (Lobby.Utils.objectNotNull(my.data4RewardCoinPopupLvup.callback)) my.data4RewardCoinPopupLvup.callback();
                    var isLoadHeader = true;
                    if (my.numberOfPopupLevelUp <= 1) {
                        my.isCollectedRewardFromPopupLvUp = true;
                        isLoadHeader = false;
                        my.numberOfPopupLevelUp = 1;
                    }
                    my.numberOfPopupLevelUp--;
                    my.data4RewardCoinPopupLvup = {};
                    my.resizeButtonAndTextAnimationScaleDown(collectShareBtn);
                    my.time.events.add(150,
                        function () {

                            var options = new Object();
                            if (Lobby.Utils.isIOS()) {
                                options.share_feedBrowser = true;
                            }
                            options.method = "share";
                            options.link = LobbyConfig.facebookAppDomain;
                            options.href = LobbyConfig.facebookAppDomain;
                            options.picture = LobbyConfig.levelUpThumbnailLink;
                            options.name = "Congratulation";
                            options.description = my._userData.profile.name + " leveled up to level " + (my._userData.profile.level + 1) + ".";

                            my._userCrownText.text = Lobby.Utils.formatNumberWithCommas(my._userData.profile.crown);
                            my.playAllAnimationCoinAndUpdateHeader(coin, 1000, function() {
                                my.isShowLevelUpPopup = false;
                                if (callbackAnimation) {
                                    callbackAnimation();
                                }
                            }, null, false, isLoadHeader);

                            if (LobbyConfig.useManagerForPopUp) {
                                ManagerForPopUp.forceClosePopUp(my, group);
                            } else {
                                my.closePopupWithAnimateDownNew(group);
                            }

                            FacebookController.showDialog(
                                options,
                                function (result) {
                                },
                                function (error) {
                                }
                            );

                        }, this);
                    //my.playAllAnimationCoinAndUpdateHeader(coin,1000,function(){
                    //    if(Lobby.Utils.objectNotNull(callback)) callback();
                    //},null,true);
                    //my.closePopupWithAnimateDownNew(group);
                },
                function () {
                    my.resizeButtonAndTextAnimationScaleUp(collectShareBtn);
                },
                function () {
                    my.resizeButtonAndTextAnimationScaleUp(collectShareBtn);
                },
                group,
                LobbyConfig.isDebug,
                'popup_levelup_collectshare_btn',
                null,
                null
            );
        } else {
            collectBtn.position.x = 420;
            //collectBtn.textBtn.position.x = 420;
        }
        //Lobby.PhaserJS.centerXParent(collectShareBtn,background);
        /**
         * Level number
         */
        var levelNumber = my.add.bitmapText(0,
            260,
            "popup-levelup-number-bmp",
            currentLevel.toString(),
            50);
        group.add(levelNumber);
        Lobby.PhaserJS.centerXParent(levelNumber, background);

        /**
         * coin
         */
        var coinNumber = my.add.text(
            0,
            475,
            coin,
            {
                font: "40px " + ConstantFontName.FONT_NAME_PassionOne_Regular,
                fill: "#fefefe"
            },
            group
        );
        Lobby.PhaserJS.centerXParent(coinNumber, background);
        //coinNumber.x -= 50;
        coinNumber.anchor = {
            x: 0.5,
            y: 0.5
        };
        var crownNumber = my.add.text(
            0,
            475,
            crown,
            {
                font: "40px " + ConstantFontName.FONT_NAME_PassionOne_Regular,
                fill: "#fefefe"
            },
            group
        );
        Lobby.PhaserJS.centerXParent(crownNumber, background);
        crownNumber.x += 240;
        crownNumber.anchor = {
            x: 0.5,
            y: 0.5
        };
        Lobby.PhaserJS.centerWorld(group);
        Lobby.PhaserJS.scaleGroupForOptimize(group, true);

        if (LobbyConfig.useManagerForPopUp) {
            // pop up queue
            ManagerForPopUp.addPopUpToQueue(
                ManagerForPopUp.createPopUpData(
                    my,
                    group
                ),
                true // isShow
            );
        } else {
            my.openPopupWithAnimateUpNew(group, null, null, true);
        }
        if(LobbyC.GameSlot.managerForAutoGameSlot){
            LobbyC.GameSlot.managerForAutoGameSlot.autoClosePopupWhenLevelUp(collectCoin);
        }
        LobbyC.GameSlot.onLevelUp();
    };
    /**
     * Created by Phan on 5/3/2016.
     */
    var localGroup;

    /**
     *get image from file
     */

    my.getImageFromFile = {
        /**
         * get image
         */
        getImageFromBrowser: function () {
            if (Lobby.Utils.isIOS() || Lobby.Utils.isWeb()) {
                // Because unity is currently bad at JavaScript we can't use standard
                // JavaScript idioms like closures so we have to use global variables :(
                window.becauseUnitysBadWithJavacript_getImageFromBrowser =
                    window.becauseUnitysBadWithJavacript_getImageFromBrowser || {
                        busy: false,
                        initialized: false,
                        rootDisplayStyle: null,  // style to make root element visible
                        root_: null,             // root element of form
                        ctx_: null,              // canvas for getting image data;
                    };
                var g = window.becauseUnitysBadWithJavacript_getImageFromBrowser;
                if (g.busy) {
                    // Don't let multiple requests come in
                    //return;
                }
                g.busy = true;
                if (!g.initialized) {
                    g.initialized = true;
                    g.ctx = window.document.createElement("canvas").getContext("2d");

                    // Append a form to the page (more self contained than editing the HTML?)
                    g.root = window.document.createElement("div");


                    var top = '28%';
                    var left = '2%';
                    if (Lobby.Utils.is3x4Device()) {
                        top = '40%';
                        left = '6%';
                    }
                    g.root.innerHTML = [
                        '<style>                                                    ',
                        '.getimage {                                                ',
                        '    position: absolute;                                    ',
                        '    left: 0;                                               ',
                        '    top: 0;                                                ',
                        '    display: -webkit-flex;                                 ',
                        '    display: flex;                                         ',
                        '    -webkit-flex-flow: column;                             ',
                        '    flex-flow: column;                                     ',
                        '    -webkit-justify-content: center;                       ',
                        '    -webkit-align-content: center;                         ',
                        '    -webkit-align-items: center;                           ',
                        '    justify-content: center;                               ',
                        '    align-content: center;                                 ',
                        '    align-items: center;                                   ',
                        '                                                           ',
                        '    z-index: 2;                                            ',
                        '    color: white;                                          ',
                        '    background-color: rgba(0,0,0,0.8);                     ',
                        '    font: sans-serif;                                      ',
                        '    font-size: x-large;                                    ',
                        '}                                                          ',
                        // '.getimage a,                                               ',
                        '.getimage label {                                          ',
                        '   font-size: x-large;                                     ',
                        '   background-color: #666;                                 ',
                        '   border-radius: 0.5em;                                   ',
                        '   border: 1px solid black;                                ',
                        '   padding: 0.5em;                                         ',
                        '   margin: 0.25em;                                         ',
                        '   outline: none;                                          ',
                        '   display: inline-block;                                  ',
                        '}                                                          ',
                        '.getimage input {                                          ',
                        '    display: none;                                         ',
                        '}                                                          ',
                        '</style>                                                   ',
                        '<div id="getimage" class="getimage" style="z-index:1000;opacity: 0; left:' + left + '; top:' + top + ' ;position: absolute";opacity: 0>                                     ',
                        '    <div>                                                  ',
                        '      <label style="height: 20px;width:20px ;" for="photo"></label>  ',
                        '      <input id="photo" type="file" accept="image/*"/><br/>',
                        // '      <a>cancel</a>                                        ',
                        '    </div>                                                 ',
                        '</div>                                                     ',
                    ].join('\n');


                    //var btnChangePhoto = g.root.querySelector(".getimage");
                    //btnChangePhoto.css("top", top);
                    //btnChangePhoto.css("left", left);

                    var input = g.root.querySelector("input");
                    input.addEventListener('change', getPic);

                    // prevent clicking in input or label from canceling
                    input.addEventListener('click', preventOtherClicksAndClear);
                    var label = g.root.querySelector("label");
                    label.addEventListener('click', preventOtherClicks);

                    // clicking cancel or outside cancels
                    //var cancel = g.root.querySelector("a");  // there's only one
                    //cancel.addEventListener('click', handleCancel);
                    var getImage = g.root.querySelector(".getimage");
                    getImage.addEventListener('click', handleCancel);

                    // remember the original style
                    g.rootDisplayStyle = g.root.style.display;

                    window.document.body.appendChild(g.root);

                    if (Lobby.Utils.isIOS()) {
                        //if (!Lobby.Utils.isIpad()) {
                        document.body.onfocus = function () {
                            if (my.ClickChangeAvatar == true) {
                                my.ClickChangeAvatar = false;
                                rotateScreenToPortraitToLandscape();
                            }
                        };
                        //}
                    }

                } else {
                    var btn = document.getElementById("getimage");
                    btn.style.display = 'block';
                }
                // make it visible
                //g.root.style.display = g.rootDisplayStyle;
            } else {
                if (my.isClickChangeAvatar) {
                    return;
                }
                my.isClickChangeAvatar = true;
                var options = {
                    destinationType: Camera.DestinationType.DATA_URL,
                    sourceType: Camera.PictureSourceType.PHOTOLIBRARY,
                    allowEdit: true,
                    encodingType: Camera.EncodingType.JPEG,
                    targetWidth: 255,
                    targetHeight: 255,
                    mediaType: Camera.MediaType.PICTURE,
                    popoverOptions: CameraPopoverOptions,
                    saveToPhotoAlbum: false
                };

                window.navigator.camera.getPicture(function (imageData) {
                    my.isClickChangeAvatar = false;
                    var dataUrl;
                    var data = "data:image/jpeg;base64," + imageData;

                    var canvas = document.createElement("canvas");
                    canvas.width = 255;
                    canvas.height = 255;

                    var img = new window.Image();
                    img.src = data;

                    window.URL.revokeObjectURL(img.src);
                    if (img.width != img.height || img.height != 255) {
                        var xOffset = 0, yOffset = 0;
                        var width = img.width;
                        var height = img.height;

                        if (width > height) {
                            xOffset = (width - height) / 2;
                            width = height;
                        } else if (height > width) {
                            yOffset = (height - width) / 2;
                            height = width;
                        }
                        var ctx = canvas.getContext("2d");
                        ctx.drawImage(img, xOffset, yOffset, width, height, 0, 0, 255, 255);

                        dataUrl = canvas.toDataURL();
                    } else {
                        dataUrl = data;
                    }

                    var blob = dataURItoBlob(dataUrl);
                    //return;
                    //Old
                    if (Lobby.Utils.isIOS()) {
                        getAPITokenAndUploadAvatar(blob);
                    } else {
                        uploadAvt(blob);
                    }
                    // free the canvas memory (could probably be zero)
                    canvas.width = 1;
                    canvas.height = 1;
                }, function (err) {
                    // error
                    my.isClickChangeAvatar = false;
                    if (error.indexOf("cancel") > -1) {
                        return;
                    }
                    my.showNotificationPopup("", my.selectlanguage.cant_get_image.text);
                }, options);
            }
            function preventOtherClicks(evt) {
                my.ClickChangeAvatar = true;
                evt.stopPropagation();
            }

            function preventOtherClicksAndClear(evt) {
                my.ClickChangeAvatar = true;
                evt.stopPropagation();
                evt.target.value = null;
            }

            function rotateScreenToPortraitToLandscape() {
                ManagerForOrientation.resetOrientation(false, true, my);
            }

            function getPic(evt) {
                rotateScreenToPortraitToLandscape();
                evt.stopPropagation();
                var fileInput = evt.target.files;
                if (!fileInput || !fileInput.length) {
                    return sendError("no image selected");
                }
                //resize(fileInput[0]);
                //return;
                var picURL = window.URL.createObjectURL(fileInput[0]);
                var img = new window.Image();
                img.addEventListener('load', handleImageLoad);
                img.addEventListener('error', handleImageError);
                img.src = picURL;
            }

            function handleCancel(evt) {
                hide();
                evt.stopPropagation();
                evt.preventDefault();
                sendError("cancelled");
            }

            function handleImageError(evt) {
                sendError("Could not get image");
                my.showNotificationPopup("", my.selectlanguage.cant_get_image.text);
            }

            function handleImageLoad(evt) {
                var img = evt.target;
                window.URL.revokeObjectURL(img.src);
                var xOffset = 0, yOffset = 0;
                var width = img.width;
                var height = img.height;
                if (width > height) {
                    xOffset = (width - height) / 2;
                    width = height;
                } else if (height > width) {
                    yOffset = (height - width) / 2;
                    height = width;
                }
                g.ctx.canvas.width = 255;
                g.ctx.canvas.height = 255;
                g.ctx.drawImage(img, xOffset, yOffset, width, height, 0, 0, g.ctx.canvas.width, g.ctx.canvas.height);

                var dataUrl = g.ctx.canvas.toDataURL();
                var blob = dataURItoBlob(dataUrl);
                //return;
                //Old
                if (Lobby.Utils.isIOS()) {
                    getAPITokenAndUploadAvatar(blob);
                } else {
                    uploadAvt(blob);
                }
                //New

                // free the canvas memory (could probably be zero)
                g.ctx.canvas.width = 1;
                g.ctx.canvas.height = 1;


                g.busy = false;
            }

            function sendError(msg) {
                sendResult("error: " + msg);
            }

            function hide() {
                my.hideLoadingAnimation();
                if (Lobby.Utils.isIOS()) {
                    document.getElementById("getimage").style.display = 'none';
                }
            }

            function sendResult(result) {
                hide();
                g.busy = false;

            }

            function getAPITokenAndUploadAvatar(avatar) {
                var uploadAvatar = function (isSuccess, dataFromGetAPIToken, response) {
                    if (isSuccess) {
                        LobbyRequest.User.uploadAvatarWithAPIToken(dataFromGetAPIToken.api_token, my._userData.profile.id, avatar,
                            function (isSuccess, dataFromUploadAvatar, response) {
                                if (Lobby.Utils.objectNotNull(response)) {
                                    my._userData.profile = dataFromUploadAvatar;
                                    hide();
                                    my.closePopupWithAnimateLeftNew(localGroup, null, function () {
                                        handleResultAvtCode(response.core_result_code);
                                    });
                                }
                            })
                    } else {
                        hide();
                        my.closePopupWithAnimateLeftNew(localGroup, null, function () {
                            handleResultAvtCode(response.core_result_code);
                        });
                        if (Lobby.Utils.isIOS()) {
                            g.busy = false;
                        }
                    }
                };
                my.showLoadingAnimation();

                LobbyRequest.User.getAPIToken(uploadAvatar);
            }

            function uploadAvt(img) {
                my.showLoadingAnimation();

                var formData = new FormData();
                formData.append("avatar", img);
                formData.append("loginToken", LobbyConfig.loginToken);
                var timeoutFromClient = function () {
                    if (LobbyConfig.isDebug) console.log("Time out");
                };
                $.ajax({
                        type: "POST",
                        url: LobbyConfig.webServiceFullUrl + "/user/updateAvatar",
                        data: formData,
                        processData: false,
                        contentType: false,
                        xhrFields: {
                            withCredentials: true
                        },
                        success: function (response) {
                            hide();
                            my._userData.profile = response.bean;
                            my.closePopupWithAnimateLeftNew(localGroup, null, function () {
                                handleResultAvtCode(response.core_result_code);
                            });

                            if (Lobby.Utils.isIOS()) {
                                g.busy = false;
                            }
                        },
                        error: function (request, status, error) {
                            hide();
                            my.closePopupWithAnimateLeftNew(localGroup, null, function () {
                                my.showNotificationPopup(my.selectlanguage.popup_profile_Change_Avatar.title, my.selectlanguage.popup_profile_Change_Avatar.fail);
                            });

                            if (Lobby.Utils.isIOS()) {
                                g.busy = false;
                            }
                        }

                    })
                    .done(function (data, textStatus, jqXHR) {
                        if (LobbyConfig.isDebug) console.log("Ajax done", data, textStatus, jqXHR);
                        hide();
                        if (Lobby.Utils.isIOS()) {
                            g.busy = false;
                        }
                    })
                    .always(function (data, textStatus, jqXHR) {
                        if (LobbyConfig.isDebug) console.log("Ajax always data", data, textStatus, jqXHR);
                        hide();
                        if (Lobby.Utils.isIOS()) {
                            g.busy = false;
                        }
                    });

            }

            function handleResultAvtCode(code) {
                if (code == 0) {
                    //if(Lobby.Utils.isIOS() == false)
                    LobbyC.Login.numberOfChangeAvatar++;
                    ResourceLoader.resetAvatarKey();
                    my.reloadHeaderAvatar(true);
                    my.showNotificationPopup(my.selectlanguage.popup_profile_Change_Avatar.title, my.selectlanguage.popup_profile_Change_Avatar.success, function () {

                    });
                }
                else  my.showNotificationPopup(my.selectlanguage.popup_profile_Change_Avatar.title, my.selectlanguage.popup_profile_Change_Avatar.fail);
            }

            function dataURItoBlob(dataURI) {
                // convert base64/URLEncoded data component to raw binary data held in a string
                var byteString;
                if (dataURI.split(',')[0].indexOf('base64') >= 0)
                    byteString = atob(dataURI.split(',')[1]);
                else
                    byteString = unescape(dataURI.split(',')[1]);

                // separate out the mime component
                var mimeString = dataURI.split(',')[0].split(':')[1].split(';')[0];

                // write the bytes of the string to a typed array
                var ia = new Uint8Array(byteString.length);
                var i = byteString.length;
                while (i--) {
                    ia[i] = byteString.charCodeAt(i);
                }
                //for (var i = 0; i < ; i++) {
                //
                //}

                return new Blob([ia], {type: mimeString});
            }
        },
        clickInput: function (group) {
            localGroup = group;
            my.getImageFromFile.getImageFromBrowser();
            if (Lobby.Utils.isWeb()) {
                document.getElementById("photo").click();
            }
        },
        displayInput: function (group, sprite) {
            if (Lobby.Utils.objectNotNull(group))
                localGroup = group;
            my.getImageFromFile.getImageFromBrowser();
            var btn = document.getElementById("getimage");
            btn.style.display = 'block';
            //var newX,newY;
            //    newX = sprite.position.x;
            //    newY = sprite.position.y;
            //    btn.style.marginTop = newY.toString()  + "px";
            //    btn.style.marginLeft =  newX.toString() + "px";
        },
        hideInput: function () {
            if (Lobby.Utils.objectNotNull(document.getElementById("getimage")))
                document.getElementById("getimage").style.display = 'none';
        }


    };

    /**
     * show edit name popup
     * @param oldName : old name
     */
    my.showEditNamePopup = function (oldName) {

        var title = my.selectlanguage.popup_edit_name.title;
        var body = oldName;
        var group = my.add.group();
        var background = my.add.sprite(0, 0, "popup_changename_bg");
        group.add(background);
        var whiteText = {
            font: "40px " + ConstantFontName.FONT_NAME_PassionOne_Regular,
            fill: "#fefefe"
        };
        var textTitle = my.add.text(
            0,
            50,
            title,
            whiteText,
            group
        );
        //var btnExit = Lobby.PhaserJS.createSpriteRectangleExt(
        //    my,
        //    background.width - 70,
        //    -15,
        //    function () {
        //
        //        my.closePopupWithAnimateDownNew(group);
        //        //group.setAll("visible", false);
        //        //group.setAll("exists", false);
        //    },
        //    function () {
        //        btnExit.frame = 0;
        //    },
        //    function () {
        //        btnExit.frame = 0;
        //    },
        //    group, LobbyConfig.isDebug,
        //    "btn-close-new"
        //);

        var btnExit = my.createButtonExitPopup(group, background.width - 70, -15);
        Lobby.PhaserJS.centerX(textTitle, background.width);
        var textMessage = my.add.text(
            0,
            120,
            body,
            whiteText,
            group
        );
        Lobby.PhaserJS.centerXParent(textMessage, background);
        //var btnOk = Lobby.PhaserJS.createSpriteRectangleExt(
        //    my,
        //    background.width - 350,
        //    320,
        //    function () {
        //        if (editNameText.text != "..." && editNameText.text != "") {
        //            var interval = setInterval(function () {
        //                clearInterval(interval);
        //                my.closePopupWithAnimateDownNew(group);
        //            }, 250);
        //        }
        //        handleName($('#change-name').val());
        //    },
        //    function () {
        //    },
        //    function () {
        //    },
        //    group,
        //    LobbyConfig.isDebug,
        //    "popup-confirm-btn"
        //);
        var btnOk = my.createButtonGreenPopup(
            group,
            background.width - 350,
            320,
            my.selectlanguage.send.text,
            1,
            function () {
                if (editNameText.text != "..." && editNameText.text != "") {
                    if (LobbyConfig.useManagerForPopUp) {
                        ManagerForPopUp.forceClosePopUp(my, group);
                    } else {
                        my.closePopupWithAnimateDownNew(group);
                    }
                }
                //handleName($('#change-name').val());
                handleName(editNameText.text);
            },
            50
        );
        //var btnCancel = Lobby.PhaserJS.createSpriteRectangleExt(
        //    my,
        //    50,
        //    320,
        //    function () {
        //        var interval = setInterval(function () {
        //            clearInterval(interval);
        //            my.closePopupWithAnimateDownNew(group);
        //            //group.setAll("visible", false);
        //            //group.setAll("exists", false);
        //        }, 250);
        //    },
        //    function () {
        //    },
        //    function () {
        //    },
        //    group,
        //    LobbyConfig.isDebug,
        //    "popup-cancel-btn"
        //);
        var btnCancel = my.createButtonPurplePopup(
            group,
            70,
            320,
            my.selectlanguage.cancel.text,
            1,
            function () {
                if (LobbyConfig.useManagerForPopUp) {
                    ManagerForPopUp.forceClosePopUp(my, group);
                } else {
                    my.closePopupWithAnimateDownNew(group);
                }
            },
            50
        );
        /**
         * edit input field
         */
        //$('#change-name').val("...");
        var editNameText = my.add.text(
            0,
            0,
            "...",
            whiteText,
            group
        );
        Lobby.PhaserJS.center(editNameText, background);
        var blinkingText = my.add.text(
            editNameText.x + editNameText.width,
            editNameText.y,
            "",
            whiteText,
            group
        );
        //binking.anchor.x=0;
        var isTyping = false;
        //Lobby.PhaserJS.center(binking,background);
        var blinkingAnimationEditName = function () {
        };
        var editNameInputRegion = Lobby.PhaserJS.createInputRegion(
            my,
            editNameText.x,
            editNameText.y,
            background.width - 50,
            editNameText.height,
            function () {
                //if (!isTyping) {
                //    $('#change-name').val("");
                //    editNameText.text = "";
                //    blinkingAnimationEditName();
                //    isTyping = true;
                //}
                //else {
                //    blinkingAnimationEditName();
                //}
                Helper4Input.Input.createGroupInputText(false,
                    function (textFromCallBack) {
                        editNameText.text = textFromCallBack;
                    }, my);
            },
            function () {
            },
            function () {
            }, group, LobbyConfig.isDebug
        );

        Lobby.PhaserJS.center(editNameInputRegion, background);
        editNameInputRegion.position = {
            x: editNameInputRegion.position.x - (background.width - 50) / 2,
            y: editNameInputRegion.position.y - 20
        };
        Lobby.PhaserJS.centerWorld(group);
        Lobby.PhaserJS.scaleGroupForOptimize(group, true);

        if (LobbyConfig.useManagerForPopUp) {
            // pop up queue
            ManagerForPopUp.addPopUpToQueue(
                ManagerForPopUp.createPopUpData(
                    my,
                    group
                ),
                true // isShow
            );
        } else {
            my.openPopupWithAnimateUpNew(group);
        }

        var handleName = function (newName) {
            if (newName == "" || newName == "..." || newName.replace(/ /g, '') == "") {
                my.showNotificationPopup(my.selectlanguage.popup_edit_name.title, my.selectlanguage.popup_edit_name.fail);
                return;
            }
            my.showLoadingAnimation();
            var postData = {
                name: newName,
                loginToken: LobbyConfig.loginToken
            };
            Lobby.Network.post(LobbyConfig.webServiceFullUrl + "/user/updateName", postData,
                function (isSuccess, data) {
                    my.hideLoadingAnimation();
                    if (isSuccess) {
                        my.showNotificationPopup(my.selectlanguage.popup_edit_name.title, my.selectlanguage.popup_edit_name.success);
                        my.changeName(newName);
                    } else {
                        switch (data) {
                            case LobbyConstant.ERROR_MESSAGE_REACH_LIMITE_CHANGE_NAME:
                                my.showNotificationPopup(my.selectlanguage.popup_edit_name.title, my.selectlanguage.popup_edit_name.reachLimit);
                                break;
                            default:
                                //alert("Error occured!");
                                break;
                        }
                    }
                });

        }
    }


    return my;

}(LobbyC.MainMenu || {}));

