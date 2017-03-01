/**
 * Created by Quan Do on 7/13/2015.
 */

var ScheduleManager = new function () {
    var intervalGetRealTimeNotification;
    var intervalShowRecentWinner;
    var intervalGetAndCollectAchievement;

    var intervalGetAdditionalInfo;
    var intervalCollectCoinForTest;
    var intervalCollectFreeCoinForTest;
    var timestampArray = {};

    var that = this;

    var isCollectingAchievement = false;

    var listInterval = [];

    var mainInterval;
    var minInterval = 100;

    this.setInterval = function(callback, interval){
        var interval = {
            callback: callback,
            interval: interval,
            isScheduleInterval: true,
            currentTime: 0
        };
        listInterval.push(interval);

        return interval;
    };
    this.clearInterval = function(interval){
        Lobby.Utils.removeObjectInArray(interval, listInterval);
    };
    this.startTimer = function(){
        mainInterval = window.setInterval(function(){
            for(var i = 0; i < listInterval.length; ++i){
                listInterval[i].currentTime += minInterval;
                if(listInterval[i].currentTime >= listInterval[i].interval){
                    listInterval[i].currentTime = 0;
                    if(listInterval[i].callback) {
                        listInterval[i].callback();
                    }
                }
            }
        },minInterval);
    };
    /**
     * Init timestampArray
     */
    this.init = function () {
        timestampArray.realTimeNotification = {
            timestamp: LobbyConfig.scheduleRealTimeNotification,
            count: 10, // limit number of record
            array: []
        };
        timestampArray.purchaseNotification = {
            array: []
        };
        timestampArray.getAdditionalInfo = {
            timestamp:LobbyConfig.scheduleAdditionalInfo
        };
    };

    /**
     * by Dat
     * @param my
     */
    this.getAdditionalInfo = function(my){
        LobbyRequest.User.getAdditionalInfo(function(isSuccess,data, response){
            if(isSuccess) LobbyC.MainMenu.parseAdditionalInfo(data);
            //if(!LobbyUserData.dataTutorial.isPlayingTutorial && LobbyConfig.additionalInfo.dailyStreakBonus.canCollect && !my.isShowingPopupDailyBonusStreak){
            //    my.showPopupDailyBonusStreak(false);
            //}

        });
    };

    /**
     * Interval for get additional info, eg: daily bonus streak, collect coin streak
     * @param my
     */
    this.initScheduleGetAdditionalInfo = function(my){

        if(LobbyConfig.isTestAlgorithmMode) return;
        

        //if(!LobbyConfig.isTestStrategy) return;
        intervalGetAdditionalInfo = this.setInterval(function(){
            that.getAdditionalInfo(my);
        }, timestampArray.getAdditionalInfo.timestamp);

    };
    /**
     * Init schedule for get real time notification
     * @param my
     */
    this.initScheduleGetRealTimeNotification = function (my) {
        Lobby.Utils.printConsoleLog("timestampArray.realTimeNotification.timestamp: " + timestampArray.realTimeNotification.timestamp);
        Lobby.Utils.logCurrentTime("Start schedule at : ");

        intervalGetRealTimeNotification = this.setInterval(function () {
                that.forceGetRealTimeNotification(my);
            },
            timestampArray.realTimeNotification.timestamp
        );
        this.forceGetRealTimeNotification(my);
    };
    /**
     * Init schedule for showing new recent winner
     * @param my
     */
    this.initScheduleShowNewRecentWinner = function (my) {
        intervalShowRecentWinner = this.setInterval(function () {
            // 2016-05-23: Phuoc: nếu đang ở trong game thì không show recent winner
            if (my.playingGame === LobbyConstant.isInGame) {
                return;
            }

            // 2016-05-23: Phuoc: nếu đang play recent winner animation thì không play nữa
            //console.log("my._isShowingRecentWinnerAnimation: ", my._isShowingRecentWinnerAnimation);
            if (my._isShowingRecentWinnerAnimation) {
                return;
            }

            if (my.arrayWinner === undefined || my.arrayWinner.length == 0) {
                return;
            }

            my.showRecentWinner(my.arrayWinner[0]);
            //my.arrayWinner.splice(0, 1);
            Lobby.Utils.splice1Item(my.arrayWinner,0);
        }, 7000);
    };
    /**
     * Stop  real time noti and recent winner schedule
     * @param my
     */
    this.stopSchedule = function (my) {
        Lobby.Utils.logCurrentTime("Stop schedule at : ");
        listInterval = [];
        //clearInterval(intervalGetRealTimeNotification);
        //clearInterval(intervalShowRecentWinner);
        //clearInterval(intervalGetAdditionalInfo);
        //if(LobbyConfig.isTestAlgorithmMode) clearInterval(intervalGetAndCollectAchievement);
        //Lobby.PhaserJS.clearInterval(intervalCollectCoinForTest);
        //if(Lobby.Utils.objectNotNull(intervalCollectFreeCoinForTest)) {
        //    Lobby.PhaserJS.clearInterval(intervalCollectFreeCoinForTest);
        //}
        Lobby.PhaserJS.clearInterval(mainInterval);
        //if(my.magicItem) {
        //    my.magicItem.LuckySymbol.stopTimer();
        //}
    };
    /**
     * Handle when callback real time notification
     * @param isSuccess
     * @param data data of recent winner
     * @param my
     */
    var serverRealTimeNotificationCallback = function (isSuccess, data, my) {
        if (isSuccess) {
            var tmpArray = [];
            timestampArray.realTimeNotification.array = [];
            timestampArray.purchaseNotification.array = [];

            var list_realTime = data.member[0];
            if (my._recentWinnerList == undefined
                || my._recentWinnerList.length == 0) {
                my._recentWinnerList = list_realTime.bean.member;
            } else {
                my.arrayWinner = [];

                for (var indexOfNewRecentWinnerList = 0; indexOfNewRecentWinnerList < list_realTime.bean.member.length; ++indexOfNewRecentWinnerList) {
                    var isExist = false;
                    var indexOfCurrentRecentWinnerList = my._recentWinnerList.length; while (indexOfCurrentRecentWinnerList--) {
                        if (list_realTime.bean.member[indexOfNewRecentWinnerList].id == my._recentWinnerList[indexOfCurrentRecentWinnerList].id) {
                            isExist = true;
                            break;
                        }
                    }
                    //for (var  = 0; indexOfCurrentRecentWinnerList < ; ++) {}
                    if (!isExist && list_realTime.bean.member[indexOfNewRecentWinnerList].user_info != null) {
                        my.arrayWinner.push(list_realTime.bean.member[indexOfNewRecentWinnerList]);
                    }
                }
                // 2016-05-21: Phuoc: sort lại list recent winner
                my.arrayWinner.sort(function (recentWinnerBeanDataA, recentWinnerBeanDataB) {
                    return recentWinnerBeanDataA.id - recentWinnerBeanDataB.id;
                });
                my._recentWinnerList = list_realTime.bean.member;
            }

            var list_Purchase = data.member[1];

            if (list_Purchase.bean.member.length > 0) {
                timestampArray.purchaseNotification.array = list_Purchase.bean.member;
            }
            for (var j = 0; j < list_realTime.bean.member.length; j++) {
                var element = list_realTime.bean.member[j];
                if (element.user_id != null && element.user_id != undefined && element.user_id > 0) {
                    if (tmpArray.length == 6) {
                        break;
                    }
                    tmpArray.push(element);
                }
            }
            Lobby.Utils.sortArrayObjectDescending(
                tmpArray,
                'ts_last_modified'
            );

            for (var i = 0; i < tmpArray.length; i++) {
                timestampArray.realTimeNotification.array.push(tmpArray[i]);
            }

            /**
             * Update user profile ui & inbox
             */
            var userProfileData = data.member[2];

            if (!Lobby.Utils.objectIsNull(userProfileData)) {
                // 2016-05-10: Phuoc: khi mua thành công thì server sẽ trả về thông báo trong API get recent winner,
                // lúc này nếu nhận được thông báo thì reload achievement notification
                my.reloadAchievementNotification();
                my.updateUserInfoUIFromUserInfo(userProfileData.bean);
            }

            var listInbox = data.member[3];
            if (!Lobby.Utils.objectIsNull(listInbox)) {
                //my.callbackInbox(listInbox.bean);
            }

            var beanIP = data.member[4];
            if (!Lobby.Utils.objectIsNull(beanIP)) {
                LobbyConfig.currentUserIp = beanIP.bean.info;
            }
        }
    };
    /**
     * Force get real time notification
     * @param my
     */
    this.forceGetRealTimeNotification = function (my) {
        LobbyRequest.System.getRealTimeNotificationWithUserInfo(
            timestampArray.realTimeNotification.count,
            serverRealTimeNotificationCallback,
            my
        );
    };
};
