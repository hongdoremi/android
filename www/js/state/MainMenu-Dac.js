LobbyC.MainMenu = (function (my) {
    my._achievementNotificationText = null;
    my._inboxNotificationText = null;
    my.functionInterval = null;
    var clockClick = false;
    var clockText;

    var interval = 50;
    /**
     * create Timer UI for time bonus
     * @param timeStamp: current TimeStamp
     */
    my.addTimer = function (timeStamp) {
        my.currentHourCollectBonus = my._userData.timeLeftToGetBonus;
        if(Lobby.Utils.objectNotNull(my.functionInterval)){
            Lobby.PhaserJS.clearInterval(my.functionInterval);
            timeStamp =my.currentHourCollectBonus;
        }
      if(Lobby.Utils.objectNotNull(my.groupHourBonus)){
        my.groupHourBonus.destroy();
        my.groupHourBonus = null;
      }

        // var group = my.add.group();
        var childGroup = my.add.group();
        my.groupHourBonus = childGroup;

        var timeBonus = my.add.sprite(316, 93.5, "new-footer-time-bonus", null, my.uiFooter);
        var timeBonusLoadingBar = my.add.sprite(319, 97, "new-footer-time-bonus-loading-bar", null, childGroup);

        my.uiFooter.add(childGroup);

        var startX = timeBonusLoadingBar.width;
        var myMask = my.add.graphics(0, 0);
        var deltaXForMask = 5;

        myMask.beginFill(0xffffff, 1);
        myMask.drawRect(
            timeBonusLoadingBar.x-deltaXForMask,
            timeBonusLoadingBar.y,
            timeBonusLoadingBar.width,
            timeBonusLoadingBar.height
        );
        myMask.endFill();

        childGroup.add(myMask);
        childGroup.mask = myMask;


        Lobby.PhaserJS.clearInterval(my.functionInterval);
        var loop = function () {
            if (timeStamp > 0) {
                //var xMaskPosition = endX + (startX - endX) *  timeStamp * 1000/my._userData.defaultTimeLeft;
                //myMask.x =
                myMask.clear();
                // myMask.beginFill();
                myMask.beginFill(0xffffff, 1);
                myMask.drawRect(
                    timeBonusLoadingBar.x-deltaXForMask,//+timeBonusLoadingBar.width*(timeStamp * 1000/my._userData.defaultTimeLeft),
                    timeBonusLoadingBar.y,
                    timeBonusLoadingBar.width * (timeStamp * 1000) / my._userData.defaultTimeLeft,
                    timeBonusLoadingBar.height
                );
                myMask.endFill();

                var minute = Math.floor(timeStamp / 60);
                var second = Math.ceil(timeStamp - (minute * 60));
                my.clock.text = my.selectlanguage.footer_collect_time_bonus_in_lable.text;
                my.clock.cancollect = false;
                clockText.text = ((minute < 10) ? "0" + minute : minute) + ":" + ((second < 10) ? "0" + second : second);

                timeStamp -= interval / 1000;
              my.currentHourCollectBonus = timeStamp;
                //my._userData.timeLeftToGetBonus = timeStamp;

            }
            else {
                Lobby.PhaserJS.clearInterval(my.functionInterval);
              my.functionInterval = null;
                my._userData.timeLeftToGetBonus = 0;
                timeBonus.visible = false;
                timeBonusLoadingBar.visible = false;

                my.clock.text = my.selectlanguage.footer_collect_lable.text;
                my.clock.cancollect = true;
                clockText.text = Lobby.Utils.formatNumberWithCommas(my._userData.coinBonus);
                clockClick = false;
                myMask = startX;
            }
        };
        loop();
        my.functionInterval = ScheduleManager.setInterval(loop, interval);
        //my.functionInterval = window.setInterval(loop, interval);
    };
    /**
     * Create notification UI for inbox and achievement
     * @param x: x Position
     * @param y: y Position
     * @returns {*}
     */
    my.createNotification = function (x, y) {
        // Notification Group
        var notificationGroup = my.add.group(my.uiFooter);
        var notificationBackground = my.add.sprite(
            x,
            y,
            "new_footer_bg_notification",
            null,
            notificationGroup);
        var notificationText = my.add.text(
            0,
            0,
            "0",
            {
                font: "35px " + ConstantFontName.FONT_NAME_PassionOne_Bold,
                fill: "#ffffff",
                align: "center"
            },
            notificationGroup
        );
        notificationText.anchor.setTo(0.5, 0.5);
        notificationText.position = {
            x: notificationBackground.x +
            notificationBackground.width / 2,
            y: notificationBackground.y + notificationBackground.height / 2
        };
        return notificationGroup;
    };
    /**
     * Update notification for Inbox
     * @param numberOfNoti: number of Inbox notifications
     */
    my.updateInboxNotification = function (numberOfNoti) {
        if (my._inboxNotificationText.children[1] !== undefined) {
            my._inboxNotificationText.children[1].text = numberOfNoti;
        }
        if (numberOfNoti == 0) {
            my._inboxNotificationText.visible = false;
        }
        else {
            my._inboxNotificationText.visible = true;
        }
    };
    /**
     * Request Server and reload number of Inbox notifications
     * @param skipLoadingAnimation: boolen - true if skip show loading animation
     */
    my.reloadInboxNotification = function (skipLoadingAnimation) {
        if (my._userData.isFacebookUser || LobbyConfig.isTestStrategy) {
            LobbyRequest.User.getListInbox(
                function (data) {
                    my.updateInboxNotification(data.member.length);
                },
                my,
                skipLoadingAnimation
            );
        }
    };
    /**
     * Update notification for Achievement
     * @param numberOfNoti: number of Achievement notifications
     */
    my.updateAchievementNotification = function (numberOfNoti) {
        // 2016-05-10: Phuoc: fix lỗi null khi gọi method trong InitSession
        if (Lobby.Utils.objectIsNull( my._achievementNotificationText ) ||
            Lobby.Utils.objectIsNull(my._achievementNotificationText.children)) {
            return;
        }
        if (my._achievementNotificationText.children[1] !== undefined) {
            my._achievementNotificationText.children[1].text = numberOfNoti;
        }
        if (numberOfNoti == 0) {
            my._achievementNotificationText.visible = false;
        }
        else {
            my._achievementNotificationText.visible = true;
        }
    };
    /**
     * Request Server and reload number of Achievement notifications
     */
    my.reloadAchievementNotification = function () {
        Lobby.Utils.printConsoleLog("************************************ Call reloadAchievementNotification");
        //Lobby.Utils.printStackTrace();
        LobbyRequest.User.getAchievementList(
            function (data) {
                if (Lobby.Utils.objectIsNull(data)) {
                    return;
                }
                my._currentAchievementListOfUser = data.member;
                var numberOfNoti = 0;

                var i = data.member.length; while (i--) {
                    //if (data.member[i].is_complete && !data.member[i].is_collected && data.member[i].achievement_type !== 0) {
                    //    numberOfNoti++;
                    //}

                    if (data.member[i].is_complete && !data.member[i].is_collected) {
                        numberOfNoti++;
                    }
                }
                //for (i = 0; i < ; ++i) {}
                my.updateAchievementNotification(numberOfNoti);
            },
            my, false);
    };
    /**
     * Create and show Lobby Footer
     * @param mainMenu: group contain Main Lobby
     */
    my.showNewFooter = function (mainMenu) {

        //if(LobbyConfig.isTestAlgorithmMode){
        //    return;
        //}
        var group = my.add.group();
        my.uiFooter = group;

        mainMenu.add(my.uiFooter);

        var backgroundFooter = my.add.sprite(0, 3, "new_footer_background", null, group);

        /**
         * Achiements
         */

        my.achievement = my.add.text(
            150,
            77,
            my.selectlanguage.footer_achievement_lable.text,
            {
                font: "30px PassionOne-Regular",
                fill: "#FFFFFF"
            },
            group);
        my.achievement.anchor.x = 0.5;
        my.achievement.inputEnabled = true;
        var btnAchievements =
            Lobby.PhaserJS.createRectangle(
                my,
                10,
                60,
                250,
                70,
                function () {
                    my.getAchievementListFromServerAndShowAchievementPopUp();
                },
                group);

        var achievementNotification = my.createNotification(
            my.achievement.x - 100,
            my.achievement.y - 50
        );
        my._achievementNotificationText = achievementNotification;
        my._achievementNotificationText.visible = false;
        my.reloadAchievementNotification();
        /**
         * Gift
         */
        my.gifts = my.add.text(backgroundFooter.width - 160, 77, my.selectlanguage.footer_gift_lable.text, {
            font: "30px PassionOne-Regular",
            fill: "#FFFFFF"
        }, group);
        my.gifts.anchor.x = 0.5;
        my.gifts.inputEnabled = true;
        var btnGifts =
            Lobby.PhaserJS.createRectangle(
                my,
                backgroundFooter.width - 250,
                60,
                250,
                70, function () {
                    my.showPopupFriendNew("inbox",false);
                },
                group);

        var inboxNotification = my.createNotification(
            my.gifts.x + 55,
            my.gifts.y - 50
        );
        my._inboxNotificationText = inboxNotification;
        my._inboxNotificationText.visible = false;
        my.reloadInboxNotification(
            true //skipLoadingAnimation
        );

        /**
         * CLOCK
         */

        //group to hold the string
        var childGroup = my.add.group();
        group.add(childGroup);
        childGroup.position = {
            x: backgroundFooter.width / 2,
            y: 53
        };
        var currentTime = my.time.time;
        my._userData.timeEndStateInitSession = my.time.time;
        var timeLeft = (my._userData.timeLeftToGetBonus - (currentTime - my._userData.timeEndStateInitSession)) / 1000;
        timeLeft = Math.floor(timeLeft);
        my._userData.timeLeftToGetBonus = timeLeft;
        my.clock = my.add.text(0, 0, my.selectlanguage.footer_collect_lable.text, {
            font: "27px PassionOne-Regular",
            fill: "#EAC90B",
            align: "center"
        }, childGroup);
        my.clock.y -= my.clock.height;
        my.clock.anchor.x = 0.5;
        clockText = my.add.text(0, my.clock.y + 30, "1,000,000", {
            font: "45px PassionOne-Regular",
            fill: "#FFFFFF"
        }, childGroup);

        // clockText.position = {
        //     anchor: clock.x - clockText.text.length / 2 * 4.4,
        //     // x: "center",
        //     y: clock.y + clockText.height - 25
        // };


        clockText.anchor.x = 0.5;

        my.callbackCollectBonusCoin = function (data, result, isShowAnim) {
            clockClick = false;
            if (result) {
                //my.playCoinDropSound();
                if(LobbyConfig.isTestAlgorithmMode){

                    var log = "COLLECTED BONUS COIN: " + data.coin + " -> at " + Lobby.Utils.getCurrentTimestampAndConvert2String();
                    if(LobbyConfig.isShowDetailLogForTestAlgorithmMode) {
                        console.log(log);
                    }
                    Manager4DebugTestAlgorithm.addDebug2Log(log);

                    LobbyConfig.numberOfCollectBonusHour++;
                    LobbyConfig.totalCoinOfCollectBonusHour += 50000;
                    LobbyConfig.totalCoinOfCollectBonusHourWithoutReset += 50000;
                }
                if(isShowAnim) {
                    my.playAnimationCoinForHeader(data.coin, 2000);
                    my._userData.profile.coin += data.coin;
                    my.roundMoney();
                }else{
                    my._userData.profile.coin += data.coin;
                    var userCoin = my._userData.profile.coin;
                    my._userData.profile.coin = userCoin>0?userCoin:0;
                    my.roundMoney();
                    my._userCoinText.text = Lobby.Utils.formatNumberWithCommas(my._userData.profile.coin);
                }
                //my._userCoinText.text = Lobby.Utils.formatNumberWithCommas(my._userData.profile.coin);
                my._userData.timeLeftToGetBonus = data.defaultTimeLeft;
                my._userData.defaultTimeLeft = data.defaultTimeLeft;
                var index = my._footerGroupItems.children.length; while (index--) {
                    var item = my._footerGroupItems.children[index];
                    if (item.isCurrentUser) {
                        item.coinText.text = Lobby.Utils.formatCoinNumber(my._userData.profile.coin);
                    }
                }
                //for (var index = 0; index < ; ++index) {}
                my._userData.coinBonus = data.coin;
            }
            else {
                my._userData.timeLeftToGetBonus = data.defaultTimeLeft;
                my._userData.defaultTimeLeft = data.defaultTimeLeft;
            }
            my.addTimer(Math.floor(my._userData.timeLeftToGetBonus / 1000), clockText);
        };

        my.addTimer(timeLeft, clockText);
        var btnCollect =
            Lobby.PhaserJS.createRectangle(
                my,
                330,
                20,
                250,
                120,
                function () {
                    if (my._userData.timeLeftToGetBonus == 0 && !LobbyConfig.isTestAlgorithmMode) {
                        if (!clockClick) {
                            clockClick = true;
                            var fromPos = {
                                x: my.input.activePointer.x,
                                y: my.input.activePointer.y
                            };
                            my.createCoinAnimation(fromPos);
                            LobbyRequest.User.getBonusCoin(my.callbackCollectBonusCoin, my, true);
                            my.reloadHeader();
                        }
                    }
                },
                group);

        /**
         * New free coin strategy
         */

        if(LobbyConfig.isTestStrategy) {
            my.freeCoinInterval = null;
            my.uiFooter.groupFreeCoinGift = my.add.group();
            my.uiFooter.add(my.uiFooter.groupFreeCoinGift);
            my.uiFooter.groupFreeCoinGift.position.x+=800;
            var currentProgressText = my.add.text(100, 0, 0, {
                font: "27px PassionOne-Regular",
                fill: "#EAC90B",
                align: "center"
            }, my.uiFooter.groupFreeCoinGift);
            my.uiFooter.groupFreeCoinGift.currentProgressText = currentProgressText;
            //var freeCoinBonusProgressBar = my.add.sprite(
            //    0,
            //    0,
            //    'new_header_level_mask',
            //    null,
            //    my.uiFooter.groupFreeCoinGift
            //);
            //var freeCoinBonusProgressBarFade = my.add.sprite(
            //    0,
            //    0,
            //    'new_header_level_mask',
            //    null,
            //    my.uiFooter.groupFreeCoinGift
            //);
            //freeCoinBonusProgressBarFade.alpha = 0.5;
            //my.uiFooter.groupFreeCoinGift.freeCoinBonusProgressBar = freeCoinBonusProgressBar;
            var waitingTimeText = my.add.text(100, 40, 0, {
                font: "27px PassionOne-Regular",
                fill: "#EAC90B",
                align: "center"
            }, my.uiFooter.groupFreeCoinGift);
            my.uiFooter.groupFreeCoinGift.waitingTimeText = waitingTimeText;

            var btnCollectFreeCoinGift = my.createButtonGreenPopup(my.uiFooter.groupFreeCoinGift,
                //background.width/2-140,
                //background.height-150,
                0,
                60,
                "Collect",
                0.4,
                function(){
                    my.showLoadingAnimation();
                    LobbyRequest.User.collectFreeCoinGift(function(isSuccess,data, response){
                        my.hideLoadingAnimation();
                        if(isSuccess){
                            my.showNotificationPopup("Collect free coin gift","Success, received " + data.coin_reward + " free coins.");
                            LobbyConfig.additionalInfo.freeCoinGiftBonus.coinReward = data.next_coin_reward;
                            LobbyConfig.additionalInfo.freeCoinGiftBonus.numberOfTimeCollectFreeCoin = parseInt(data.number_of_times_collect_free_coin_gift);
                            LobbyConfig.additionalInfo.freeCoinGiftBonus.waitingTime = parseInt(my.getCoinInfoCollectWaitingTime(data.coin_reward));
                            LobbyConfig.additionalInfo.freeCoinGiftBonus.canCollect = false;
                        }else{
                            my.handleFailResultNewStrategy(response,null,true,true);
                        }
                        my.uiFooter.groupFreeCoinGift.reloadFreeCoinGift();
                    })
                },
                45,
                true);
            btnCollectFreeCoinGift.scale.setTo(0.4,0.4);
            btnCollectFreeCoinGift.visible = false;
            my.uiFooter.groupFreeCoinGift.btnCollectFreeCoinGift = btnCollectFreeCoinGift;
            my.uiFooter.groupFreeCoinGift.updateTimer = function(){
                if(LobbyConfig.additionalInfo.freeCoinGiftBonus.waitingTime <= 0){
                    LobbyConfig.additionalInfo.freeCoinGiftBonus.canCollect = true;
                    Lobby.PhaserJS.clearInterval(my.freeCoinInterval);
                    my.uiFooter.groupFreeCoinGift.reloadFreeCoinGift();
                    return;
                }
                var time = Helper.Time.milisecondTimeToNormalTime( LobbyConfig.additionalInfo.freeCoinGiftBonus.waitingTime,true);
                LobbyConfig.additionalInfo.freeCoinGiftBonus.waitingTime -= 1000;
                my.uiFooter.groupFreeCoinGift.waitingTimeText.text = LobbyConfig.additionalInfo.freeCoinGiftBonus.coinReward +" in " + time.hour+":"+time.minute+":"+time.second;
            };


            my.uiFooter.groupFreeCoinGift.reloadFreeCoinGift = function(){
                //var index = (my.getCoinInfoCollectIndex(LobbyConfig.additionalInfo.freeCoinGiftBonus.coinReward) );
                var index = (LobbyConfig.additionalInfo.freeCoinGiftBonus.numberOfTimeCollectFreeCoin );
                var progress = index/Object.keys(LobbyConfig.freeCoinGiftInfo).length;
                if(progress>1) progress = 1;
                //my.uiFooter.groupFreeCoinGift.freeCoinBonusProgressBar.scale.setTo(progress);
                my.uiFooter.groupFreeCoinGift.currentProgressText.text = "Current progress " + progress.toFixed(2);

                if(LobbyConfig.additionalInfo.freeCoinGiftBonus.canCollect){
                    my.uiFooter.groupFreeCoinGift.waitingTimeText.text = LobbyConfig.additionalInfo.freeCoinGiftBonus.coinReward;
                    if(Lobby.Utils.objectNotNull(my.freeCoinInterval)){
                        my.time.events.remove(my.freeCoinInterval);
                        my.freeCoinInterval = null;
                    }
                    btnCollectFreeCoinGift.visible = true;
                }else{
                    btnCollectFreeCoinGift.visible = false;
                    my.uiFooter.groupFreeCoinGift.updateTimer();
                    if(my.freeCoinInterval==null) my.freeCoinInterval = ScheduleManager.setInterval( function(){
                        my.uiFooter.groupFreeCoinGift.updateTimer();
                    },1000);
                    //if(my.freeCoinInterval==null) my.freeCoinInterval = window.setInterval( function(){
                    //    my.uiFooter.groupFreeCoinGift.updateTimer();
                    //},1000);
                }
            };

            my.uiFooter.groupFreeCoinGift.reloadFreeCoinGift();
        }



        group.position = {
            x: (LobbyConfig.width - backgroundFooter.width) / 2,
            y: LobbyConfig.height - backgroundFooter.height
        };
        group.position.y+=ManagerForScale.doubleIncrementHeight();
        my._footerGroupItems = my.add.group();
        group.add(my._footerGroupItems);
    };

    /**
     * Destroy function
     */
    my.destroyNewFooter = function () {
        my.uiFooter.destroy(true);
    };
    return my;

}(LobbyC.MainMenu || {}));
