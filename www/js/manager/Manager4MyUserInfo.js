/**
 * Created by nguyendat on 7/7/15.
 */

//{
//    "bean_type": "BeanResultWithBeanBasic",
//    "core_result_code": 0,
//    "total_page": 0,
//    "bean": {
//    "bean_type": "BeanItemInfoUser",
//        "id": 9,
//        "ts_created": 1434438330006,
//        "ts_last_modified": 1436263986891,
//        "name": "Dat Nguyen",
//        "info": "",
//        "accessToken": "fb-4310fb8e-b032-4199-b9ab-a487ed5d9349",
//        "facebookUID": "1430660893922629",
//        "level": 1,
//        "coin": 17991,
//        "rank": 11,
//        "totalExp": 0,
//        "expBar": 0,
//        "role": 0,
//        "status": 1,
//        "freeGift": 1,
//        "gift": 1,
//        "HoldEm": {
//        "bestHand": "Fap-Hand",
//            "biggestWin": 100000000,
//            "biggestJackpot": -2000000,
//            "playHand": 12,
//            "percentWin": 99.1,
//            "maxWinInARow": 10
//    },
//    "Slot": {
//        "numOfJackpot": 0,
//            "biggestWin": 0,
//            "numOfBonus": 0,
//            "totalSpin": 373,
//            "percentWin": 23,
//            "numOfFreeSpin": 0
//    }
//}
//}

var Manager4MyUserInfo = new function () {
    var myUserInfo = null;
    var that = this;
    var isGetMyUserInfo = false;

    var delay4ContinousGettingUserInfo =
        Phaser.Timer.SECOND * 2 * 60; // 2 minutes
    var timerLoopForGettingUserInfo = null;
    /**
     * Get user info from server
     * @param resultFunc
     * @param my
     * @param isGetStatisticData
     */
    this.getMyUserInfoFromSV = function (resultFunc, my, isGetStatisticData) {
        //Thanh, khi mat ket noi mang, chi show popup profile khi da co du lieu moi
        var exit = function (resultAsBoolean, dataReturnFromServer) {
            isGetMyUserInfo = false;
            // 2016-03-03: Phuoc: fix bug khi login th�nh c�ng nh?ng g?p l?i maintenance khi g?i getMyProfile
            if (resultFunc) {
                //if(result) {
                resultFunc(myUserInfo, dataReturnFromServer);
                //}
                //else{
                //    resultFunc(null);
                //}
            }
        };
        if (isGetMyUserInfo) {
            if(LobbyConfig.isTestAlgorithmMode){
                if (resultFunc) {
                    resultFunc(myUserInfo, null);
                }
            }
            return;
        }
        isGetMyUserInfo = true;

        var callbackReload = function (data, result) {
            if (result) {
                myUserInfo = data;
                // 2016-03-03: Phuoc: fix bug khi login thành công nhưng gặp lỗi maintenance khi gửi getMyProfile
                exit(true, data);
            }
            else {
                // 2016-03-03: Phuoc: fix bug khi login thành công nhưng gặp lỗi maintenance khi gửi getMyProfile
                exit(false, data);
            }
            // 2016-07-23: Phuoc: reload achievement không phụ thuộc vào việc reload profile, khi có hành động nào có thể
            // làm đổi achievement thì tự call reload achievement
            //// 2016-07-23: Phuoc: lúc get my profile in-game thì isGetStatisticData == false, khi đó thì không cần
            //// reload achievement
            //if (isGetStatisticData === true) {
            //    LobbyC.MainMenu.reloadAchievementNotification();
            //}
        };
        LobbyRequest.User.reloadProfile(callbackReload, my, isGetStatisticData);
    };
    /**
     * Init timer get user info
     * @param my
     * @param callbackFunc
     */
    this.startTimerGetUserInfo = function (my, callbackFunc) {
        if (timerLoopForGettingUserInfo != null) {
            return;
        }
        if(LobbyConfig.isTestAlgorithmMode){
            return;
        }
        Lobby.Utils.printConsoleLog("startTimerGetUserInfo");

        timerLoopForGettingUserInfo =
            my.time.events.loop(
                delay4ContinousGettingUserInfo,
                function () {
                    that.getMyUserInfoFromSV(
                        function (userInfo) {
                            Lobby.Utils.printConsoleLog("...");
                            if (callbackFunc != null &&
                                userInfo != null) {
                                callbackFunc(userInfo);
                            }
                        }
                    );
                },
                this
            );
    };
    /**
     * Stop timer getting user info
     * @param my
     */
    this.stopTimerGetUserInfo = function (my) {
        if (timerLoopForGettingUserInfo != null) {
            Lobby.PhaserJS.clearTimer(my,timerLoopForGettingUserInfo);
            timerLoopForGettingUserInfo = null;
        }
        Lobby.Utils.printConsoleLog("stopTimerGetUserInfo");
    };
    this.resetUserData = function(){
        myUserInfo = null;
    }
};