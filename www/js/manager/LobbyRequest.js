/**
 * Created by Quan Do on 7/7/2015.
 */

var LobbyRequest = {

    User: {
        /**
         * Receive gift from list of user
         * @param idListGift long list
         * @param callback
         */
        receiveGiftFromUserList: function (idListGift, callback) {
            var postData = {};
            postData.loginToken = LobbyConfig.loginToken;

            var URL = "";
            if (Lobby.Utils.isIOS()) {
                postData["idListGift"] = idListGift.toString();
                URL = LobbyConfig.webServiceFullUrl + "/user/gift/acceptGiftListV2";
            }else{
                postData["idListGift[]"] = idListGift;
                URL = LobbyConfig.webServiceFullUrl + "/user/gift/acceptGiftList";
            }
            Lobby.Network.post(
                URL,
                postData,
                function (isSuccess, data, response) {
                    callback(isSuccess, data, response);
                }
            );
        },
        /**
         * Receive gift from a user
         * @param id long
         * @param callback
         */
        receiveGiftFromUser: function (id, callback) {
            var postData = {};
            postData.loginToken = LobbyConfig.loginToken;
            postData.id = id;
            Lobby.Network.post(LobbyConfig.webServiceFullUrl + "/user/gift/accept",
                postData,
                function (isSuccess, data, response) {
                    callback(isSuccess, data, response);
                }
            );
        },
        /**
         * Send gift to list of user
         * @param listUserId long
         * @param giftType int, default 1
         * @param callback
         */
        sendGiftToUserList: function (listUserId, giftType, callback) {
            if (Lobby.Utils.objectIsNull(giftType)) giftType = 1;
            var postData = {};
            postData.loginToken = LobbyConfig.loginToken;

            var URL = "";
            if (Lobby.Utils.isIOS()) {
                postData["listUserId"] = listUserId.toString();
                URL = LobbyConfig.webServiceFullUrl + "/user/gift/sendToUserListV2";
            }else{
                postData["listUserId[]"] = listUserId;
                URL = LobbyConfig.webServiceFullUrl + "/user/gift/sendToUserList";
            }
            postData.giftType = giftType;
            Lobby.Network.post(URL,
                postData,
                function (isSuccess, data, response) {
                    callback(isSuccess, data, response);
                }
            );
        },
        /**
         * Save in app billing for ios
         * @param appStoreReceipt receipt of app store
         * @param transactionReceipt receipt of transaction
         * @param productType int
         * @param mobilePlatform default = 1
         * @param callback
         */
        saveInAppBillingIOSNew: function (appStoreReceipt, transactionReceipt, productType, mobilePlatform, callback) {
            var postData = {};
            postData.loginToken = LobbyConfig.loginToken;
            postData.appStoreReceipt = appStoreReceipt;
            postData.transactionReceipt = transactionReceipt;
            postData.productType = productType;
            postData.mobilePlatform = mobilePlatform;
            Lobby.Network.post(LobbyConfig.webServiceFullUrl + "/user/payment/ios/verify",
                postData,
                function (isSuccess, data, response) {
                    callback(isSuccess, data, response);
                }
            );
        },
        /**
         * Save in app billing for android
         * @param transactionSignature signature of transaction
         * @param transactionReceipt receipt of transaction
         * @param productType int
         * @param callback
         */
        saveInAppBillingAndroidNew: function (transactionReceipt, transactionSignature, productType, callback) {
            var postData = {};
            postData.loginToken = LobbyConfig.loginToken;
            postData.mobilePlatform = LobbyConstant.MOBILE_PLATFORM;
            postData.transactionReceipt = transactionReceipt;
            postData.transactionSignature = transactionSignature;
            postData.productType = productType;
            Lobby.Network.post(LobbyConfig.webServiceFullUrl + "/user/payment/android/verify",
                postData,
                function (isSuccess, data, response) {

                    callback(isSuccess, data, response);
                }
            );
        },

        /**
         * 2016-11-23: Phuoc: simulate strategy feature
         *
         * @param token
         * @param simulatorAPIType
         * @param numberOfDailyBonusStreakDay
         * @param numberOfTimesCollectFreeCoinGift
         * @param accountType
         * @param productType
         * @param callback
         */
        simulateStrategyFeature: function (token,
                                           simulatorAPIType,
                                           numberOfDailyBonusStreakDay,
                                           numberOfTimesCollectFreeCoinGift,
                                           productType,
                                           callback) {
            var postData = {
                token: token,
                simulatorAPIType: simulatorAPIType,
                numberOfDailyBonusStreakDay: numberOfDailyBonusStreakDay,
                numberOfTimesCollectFreeCoinGift: numberOfTimesCollectFreeCoinGift,
                productType: productType
            };
            Lobby.Network.post(LobbyConfig.webServiceFullUrl + "/TVex8xrDzmFT7fnV/x53Ks63rReBbGaz4",
                postData,
                function (isSuccess, data, response) {
                    callback(isSuccess, data, response);
                }
            );
        },

        /**
         * get Daily Challenge Info
         * @param callback function
         * @param my context
         */
        getDailyChallengeInfo: function (callback, my) {
            var postData = {
                loginToken: LobbyConfig.loginToken
            };
            Lobby.Network.post(LobbyConfig.webServiceFullUrl + "/user/dailyChallenge/getInfo", postData,
                function (isSuccess, data, response) {
                    if (LobbyConfig.isDebug) {
                        Lobby.Utils.printConsoleLog("Get DailyChallenge Info", isSuccess, data);
                    }
                    if (isSuccess) {
                        callback(data);
                    }
                    else {
                        my.handleFailResultNewStrategy(response, null, true, false);
                    }
                }
            );
        },
        /**
         * Collect daily chanllenge
         * @param callback
         */
        collectDailyChallenge: function (callback) {
            var postData = {};
            postData.loginToken = LobbyConfig.loginToken;
            Lobby.Network.post(LobbyConfig.webServiceFullUrl + "/user/dailyChallenge/collect",
                postData,
                function (isSuccess, data, response) {
                    callback(isSuccess, data, response);
                }
            );
        },
        /**
         * Open lucky box
         * @param luckyBoxType
         * @param callback
         */
        openLuckyBox: function (luckyBoxType, callback) {
            var postData = {};
            postData.loginToken = LobbyConfig.loginToken;
            postData.luckyBoxType = luckyBoxType;
            Lobby.Network.post(LobbyConfig.webServiceFullUrl + "/user/luckyBox/open",
                postData,
                function (isSuccess, data, response) {
                    callback(isSuccess, data, response);
                }
            );
        },
        /**
         * Spin lucky wheel
         * @param callback
         */
        spinLuckyWheel: function (callback) {
            var postData = {};
            postData.loginToken = LobbyConfig.loginToken;
            Lobby.Network.post(LobbyConfig.webServiceFullUrl + "/user/luckyWheel/spin",
                postData,
                function (isSuccess, data, response) {
                    callback(isSuccess, data, response);
                }
            );
        },
        /**
         * Buy lucky wheel using crown
         * @param packageType: package type
         * @param callback
         */
        buyLuckyWheelUsingCrow: function (packageType, callback) {
            var postData = {};
            postData.loginToken = LobbyConfig.loginToken;
            postData.packageType = packageType;
            Lobby.Network.post(LobbyConfig.webServiceFullUrl + "/user/luckyWheel/buySpinUsingCrown",
                postData,
                function (isSuccess, data, response) {
                    callback(isSuccess, data, response);
                }
            );
        },
        /**
         * Collect daily bonus lucky spin
         * @param callback
         */
        collectDailyBonusLuckySpin: function (callback) {
            var postData = {};
            postData.loginToken = LobbyConfig.loginToken;
            Lobby.Network.post(LobbyConfig.webServiceFullUrl + "/user/dailyBonusLuckySpin/collect",
                postData,
                function (isSuccess, data, response) {
                    callback(isSuccess, data, response);
                }
            );
        },
        /**
         * Get daily bonus
         * @param callback function
         * @param my context
         */
        collectDailyBonusWheel: function (callback, my) {
            var postData = {
                loginToken: LobbyConfig.loginToken
            };
            Lobby.Network.post(
                LobbyConfig.webServiceFullUrl + "/user/dailyBonusWheel/collect",
                postData,
                function (isSuccess, data) {
                    callback(isSuccess, data);
                }
            );
        },
        /**
         * Sumbit reference code of user to server
         * @param referenceCode
         * @param callback
         */
        submitReferenceCode: function (referenceCode, callback) {
            var postData = {};
            postData.referenceCode = referenceCode;
            postData.loginToken = LobbyConfig.loginToken;
            Lobby.Network.post(LobbyConfig.webServiceFullUrl + "/user/inputReferenceCode",
                postData,
                function (isSuccess, data, response) {
                    callback(isSuccess, data, response);
                }
            );
        },

        /**
         * Get infor about all feature config
         * @param callback
         */
        getAllFeatureConfig: function (callback) {
            var postData = {
                loginToken: LobbyConfig.loginToken
            };
            Lobby.Network.post(LobbyConfig.webServiceFullUrl + "/user/featureConfig/getAll",
                postData,
                function (isSuccess, data, response) {
                    callback(isSuccess, data, response);
                }
            );
        },
        /**
         * Collect daily bonus streak
         * @param callback
         */
        collectDailyBonusStreak: function (callback) {
            var postData = {
                loginToken: LobbyConfig.loginToken
            };
            Lobby.Network.post(LobbyConfig.webServiceFullUrl + "/user/dailyBonusStreak/collect",
                postData,
                function (isSuccess, data, response) {
                    callback(isSuccess, data, response);
                }
            );
        },
        /**
         * Collect free coin gift new
         * @param callback
         */
        collectFreeCoinGift: function (callback) {
            var postData = {
                loginToken: LobbyConfig.loginToken
            };
            Lobby.Network.post(LobbyConfig.webServiceFullUrl + "/user/freeCoinGift/collect",
                postData,
                function (isSuccess, data, response) {
                    callback(isSuccess, data, response);
                }
            );
        },
        /**
         * Get additional info for new popup can collect reward or not
         * @param callback
         */
        getAdditionalInfo: function (callback) {
            var postData = {
                loginToken: LobbyConfig.loginToken
            };
            Lobby.Network.post(LobbyConfig.webServiceFullUrl + "/user/getAdditionalInfo",
                postData,
                function (isSuccess, data, response) {
                    callback(isSuccess, data, response);
                }
            );
        },
        /**
         * verify google play bill with server
         * @param postData      billing info
         * @param callback      callback when done
         */
        saveInAppBilling: function (postData, callback) {
            postData.loginToken = LobbyConfig.loginToken;
            postData.androidVersionCode = LobbyConfig.ProductManager.Android.versionCode;
            postData.androidVersionName = LobbyConfig.ProductManager.Android.versionApp;
            Lobby.Network.post(LobbyConfig.webServiceFullUrl + "/user/iapc_ad/callNew", postData,
                function (isSuccess, data, response) {
                    callback(isSuccess, data, response);
                });
        },
        /**
         * verify ios bill with server
         * @param postData      billing info
         * @param callback      callback when done
         */
        saveInAppBillingIos: function (postData, callback) {
            postData.loginToken = LobbyConfig.loginToken;
            Lobby.Network.post(LobbyConfig.webServiceFullUrl + "/user/verifyIOSPayment", postData,
                function (isSuccess, data) {
                    callback(isSuccess, data);
                });
        },
        /**
         * Function get profile with multi users in request
         * @param list
         * @param callback
         * @param my
         */
        getUserInfoByIdList: function (list, callback, my) {
            var postData = {
                id: list,
                loginToken: LobbyConfig.loginToken
            };
            if (LobbyConfig.isDebug) {
                Lobby.Utils.printConsoleLog("getUserInfoByIdList Request info ", postData);
            }
            Lobby.Network.post(LobbyConfig.webServiceFullUrl + "/user/me/getUserInfoWithIdList", postData,
                function (isSuccess, data) {
                    if (LobbyConfig.isDebug) {
                        Lobby.Utils.printConsoleLog("getUserInfoByIdList result :", isSuccess, data);
                    }
                    if (isSuccess) {
                        callback(data);
                    }
                    else {
                        my.hideLoadingAnimation();
                        LobbyRequest.Utils.checkResultCode(
                            data,
                            my,
                            undefined,
                            "Error, Please try again later !"
                        );
                        callback(data, false);
                    }
                }
            );

        },

        /**
         * Send free gift to multi users
         * @param list
         * @param callback
         * @param my
         */
        sendFreeGiftList: function (list, callback, my) {
            var string = "";
            for (var i = 0; i < list.length; i++) {
                string += (list[i] + ",");
            }
            var requestKeyPostData = {
                userList: string,
                loginToken: LobbyConfig.loginToken
            };
            Lobby.Network.post(LobbyConfig.webServiceFullUrl + "/user/me/sendFreeGiftToUserList", requestKeyPostData,
                function (isSuccess, data) {
                    if (isSuccess) {
                        callback(data, true);
                    }
                    else {
                        LobbyRequest.Utils.checkResultCode(
                            data,
                            my,
                            undefined,
                            "Send free gift fail!"
                        );
                        callback(data, false);
                    }
                }
            );
        },

        /**
         * Send free gift to multi users
         * @param list
         * @param callback
         * @param my
         */
        sendInviteFriend: function (list, callback, my) {
            var string = "";
            for (var i = 0; i < list.length; i++) {
                string += (list[i] + ",");
            }
            var requestKeyPostData = {
                listFacebookUID: string,
                loginToken: LobbyConfig.loginToken
            };
            Lobby.Network.post(LobbyConfig.webServiceFullUrl + "/user/me/inviteFriends", requestKeyPostData,
                function (isSuccess, data) {
                    if (isSuccess) {
                        callback(data, true);
                    }
                    else {
                        LobbyRequest.Utils.checkResultCode(
                            data,
                            my,
                            undefined,
                            "Send free gift fail!"
                        );
                        callback(data, false);
                    }
                }
            );
        },


        /**
         * Unlock Game Slot By Crown
         */
        unlockGameSlotByCrown: function (slotGameInfoId, callback, my) {
            my.showLoadingAnimation();
            var requestKeyPostData = {
                slotGameInfoId: slotGameInfoId,
                loginToken: LobbyConfig.loginToken
            };
            Lobby.Network.post(LobbyConfig.webServiceFullUrl + "/user/me/unlockGameSlot", requestKeyPostData,
                function (isSuccess, data) {
                    my.hideLoadingAnimation();
                    if (isSuccess) {
                        callback(true, data);
                    }
                    else {
                        LobbyRequest.Utils.checkResultCode(
                            data,
                            my,
                            undefined,
                            "Unlock Game Slot fail!"
                        );
                        callback(false, data);
                    }
                }
            );
        },


        /**
         * Request key to multi users
         * @param arrayFacebookUID
         * @param callback
         * @param my
         */
        //requestKeyList: function (arrayFacebookUID, callback, my) {
        //    var string = "";
        //    for (var i = 0; i < arrayFacebookUID.length; i++) {
        //        string += arrayFacebookUID[i] + ",";
        //    }
        //    var requestKeyPostData = {
        //        userList: string,
        //        loginToken: LobbyConfig.loginToken
        //    };
        //    Lobby.Network.post(
        //        LobbyConfig.webServiceFullUrl + "/user/me/requestKeySecretGiftToUserList",
        //        requestKeyPostData,
        //        function (isSuccess, data) {
        //            if (isSuccess) {
        //                callback(data, true);
        //            }
        //            else {
        //                LobbyRequest.Utils.checkResultCode(
        //                    data,
        //                    my,
        //                    undefined,
        //                    "Request key list fail !"
        //                );
        //                callback(data, false);
        //            }
        //        }
        //    );
        //},
        //
        //acceptGiftList: function (callback, my, idList, idType) {
        //    var postData = {
        //        idList: idList,
        //        idType: idType,
        //        loginToken: LobbyConfig.loginToken
        //    };
        //    Lobby.Network.post(LobbyConfig.webServiceFullUrl + "/user/me/acceptGiftList", postData,
        //        function (isSuccess, data) {
        //            Lobby.Utils.printConsoleLog("Result accept gift", isSuccess, data);
        //            if (isSuccess) {
        //                callback(data);
        //            }
        //            else {
        //                LobbyRequest.Utils.checkResultCode(
        //                    data,
        //                    my,
        //                    undefined,
        //                    "Accept gift failed !"
        //                );
        //            }
        //        }
        //    );
        //
        //},

        /**
         *
         * @param callback
         * @param my
         * @param isGetStatisticData
         */
        // 2016-07-18: Phuoc: method này chỉ được call từ Manager4MyUserInfo.getMyUserInfoFromSV
        reloadProfile: function (callback, my, isGetStatisticData) {
            //Lobby.Utils.printStackTrace();
            if (Lobby.Utils.objectIsNull(isGetStatisticData)) {
                Lobby.Utils.printConsoleLog("%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%% Force isGetStatisticData = true");
                isGetStatisticData = true;
            }
            var postData = {
                loginToken: LobbyConfig.loginToken,
                platform: LobbyConstant.platformMobile,
                androidVersionCode: LobbyConfig.ProductManager.Android.versionCode,
                androidVersionName: LobbyConfig.ProductManager.Android.versionApp,
                getStatisticData: isGetStatisticData
            };
            Lobby.Network.post(LobbyConfig.webServiceFullUrl + "/user/me",
                postData,
                function (isSuccess, data) {
                    if (my != null) {
                        //my.hideLoadingAnimation();
                    }
                    if (isSuccess) {
                        callback(data, true);
                    }
                    else {
                        if (my != null) {
                            LobbyRequest.Utils.checkResultCode(
                                data,
                                my,
                                undefined,
                                "Can't get user profile ! Please try again later !",
                                true
                            );
                        }
                        callback(data, false);
                    }
                }
            );
        },

        /**
         * Deprecated
         * @param callback
         * @param my
         */
        checkCollectCoin: function (callback, my) {
            var postData = {
                loginToken: LobbyConfig.loginToken
            };
            Lobby.Network.post(LobbyConfig.webServiceFullUrl + "/user/me/check/collect_coin",
                postData,
                function (isSuccess, data) {
                    callback(isSuccess, data);
                }
            );
        },
        /**
         * Get friend list
         * @param callback function
         * @param my context
         */
        getFriendList: function (callback, my) {
            var postData = {
                page: 0,
                loginToken: LobbyConfig.loginToken
            };
            Lobby.Network.post(LobbyConfig.webServiceFullUrl + "/user/me/friend_list", postData,
                function (isSuccess, data) {
                    callback(isSuccess, data);
                }
            );
        },
        /**
         * Deprecated
         * @param callback
         */
        trackingUser: function (callback) {
            var postData = {
                fullParam: window.location.search,
                loginToken: LobbyConfig.loginToken
            };
            Lobby.Network.post(LobbyConfig.webServiceFullUrl + "/user/me/referralTracking/create", postData,
                function (isSuccess, data) {
                    if (callback != null) {
                        callback(isSuccess, data);
                    }
                }
            );
        },
        /**
         * Deprecated
         * @param facebookUID
         * @param my
         * @param freeGiftSprite
         * @param sendFreeGiftBtn
         */
        sendFreeGift: function (facebookUID, my, freeGiftSprite, sendFreeGiftBtn) {
            var sendGiftPostData = {
                uid: facebookUID,
                loginToken: LobbyConfig.loginToken
            };
            Lobby.Network.post(LobbyConfig.webServiceFullUrl + "/user/me/send_free_gift", sendGiftPostData,
                function (isSuccessServerBrumob, data) {
                    my.hideLoadingAnimation();
                    if (isSuccessServerBrumob) {
                        if (Lobby.Utils.objectNotNull(sendFreeGiftBtn) && Lobby.Utils.objectNotNull(freeGiftSprite)) {
                            Lobby.PhaserJS.tryLoadTexture(freeGiftSprite,
                                "popup-profile-send-free-gift-btn", my);
                            sendFreeGiftBtn.visible = false;
                        }

                        my.showNotificationPopup(my.selectlanguage.popup_gift_success.text,
                            my.selectlanguage.popup_gift_send_free_gift_success.text);

                        var index = my._footerGroupItems.children.length;
                        while (index--) {
                            var item = my._footerGroupItems.children[index];
                            if (item.userData.profile.facebookUID == facebookUID) {
                                item.userData.profile.freeGift = 1;
                                item.userData.profile.time_left_send_free_gift = new Date().getTime() + data.timeLeft;
                            }
                        }
                        //for (var index = 0; index < my._footerGroupItems.children.length; ++index) {}
                        my.updateUserInfoFromSV();
                    }
                    else {
                        LobbyRequest.Utils.checkResultCode(
                            data,
                            my,
                            undefined,
                            "Send free gift fail !"
                        );
                    }
                }
            );
        },
        /**
         * get bonus coin
         * @param callback function
         * @param my context
         * @param isShowAnim boolen - check if should show animation
         */
        getBonusCoin: function (callback, my, isShowAnim) {
            var postData = {
                loginToken: LobbyConfig.loginToken
            };
            Lobby.Network.post(LobbyConfig.webServiceFullUrl + "/user/me/collect_coin",
                postData,
                function (isSuccess, data) {
                    if (isSuccess) {
                        callback(data, true, isShowAnim);
                    }
                    else {
                        LobbyRequest.Utils.checkResultCode(
                            data,
                            my,
                            undefined,
                            "Fail to get bonus coins !"
                        );
                        callback(data, false, isShowAnim);
                        my.hideLoadingAnimation();
                    }
                }
            );
        },

        /**
         * Deprecated
         * @param callback function
         * @param my context
         */
        getSecretGiftInfo: function (callback, my) {
            var postData = {
                loginToken: LobbyConfig.loginToken
            };
            Lobby.Network.post(LobbyConfig.webServiceFullUrl + "/user/me/secretGiftInfo",
                postData,
                function (isSuccess, data) {
                    if (isSuccess) {
                        callback(data);
                    }
                    else {
                        LobbyRequest.Utils.checkResultCode(
                            data,
                            my,
                            undefined,
                            "Fail to get secret gift info !"
                        );
                        my.hideLoadingAnimation();
                    }
                }
            );
        },
        /**
         * Deprecated
         * @param callback
         * @param my
         */
        openTheBox: function (callback, my) {
            var postData = {
                loginToken: LobbyConfig.loginToken
            };
            Lobby.Network.post(LobbyConfig.webServiceFullUrl + "/user/me/openSecretGift",
                postData,
                function (isSuccess, data) {
                    if (isSuccess) {
                        callback(data);
                    }
                    else {
                        LobbyRequest.Utils.checkResultCode(
                            data,
                            my,
                            undefined,
                            "Open the box fail !"
                        );
                        my.hideLoadingAnimation();
                    }
                }
            );
        },
        /**
         * Deprecated
         * @param callback
         * @param my
         */
        openTheSafe: function (callback, my) {
            var postData = {
                loginToken: LobbyConfig.loginToken
            };
            Lobby.Network.post(LobbyConfig.webServiceFullUrl + "/user/me/openTheSafe",
                postData,
                function (isSuccess, data) {
                    if (isSuccess) {
                        callback(data);
                    }
                    else {
                        LobbyRequest.Utils.checkResultCode(
                            data,
                            my,
                            undefined,
                            "Open the safe fail !"
                        );
                    }
                }
            );
        },
        /**
         * Request data for leaderboard
         * @param type
         * @param sortBy
         * @param game
         * @param callback
         * @param my
         */
        starDom: function (type, sortBy, game, callback, my) {
            var postData = {
                type: type,
                sortBy: sortBy,
                game: game,
                loginToken: LobbyConfig.loginToken
            };
            Lobby.Network.post(LobbyConfig.webServiceFullUrl + "/user/me/stardom", postData,
                function (isSuccess, data) {
                    if (data.reload) {
                        if (data.ts_reload > my._userData.profile.ts_reload ||
                            my._userData.profile.ts_reload === undefined) {
                            my.showNotificationPopup("", "Reload in secs");
                            //location.reload(true);
                            Lobby.Utils.reloadGame();
                        }
                    }
                    if (isSuccess) {
                        callback(data);
                    }
                    else {
                        LobbyRequest.Utils.checkResultCode(
                            data,
                            my,
                            undefined,
                            "Get stardom fail !",
                            false,
                            "call_from_stardom"
                        );
                        callback([]);
                        my.hideLoadingAnimation();
                    }
                }
            );
        },
        /**
         * Request data for leaderboard
         * @param type
         * @param callback
         * @param my
         */
        getLeaderboard: function (type, callback, my) {
            var postData = {
                type: type,
                loginToken: LobbyConfig.loginToken
            };
            Lobby.Network.post(LobbyConfig.webServiceFullUrl + "/user/me/getLeaderboard", postData,
                function (isSuccess, data) {
                    if (data.reload) {
                        if (data.ts_reload > my._userData.profile.ts_reload ||
                            my._userData.profile.ts_reload === undefined) {
                            my.showNotificationPopup("", "Reload in secs");
                            //location.reload(true);
                            Lobby.Utils.reloadGame();
                        }
                    }
                    if (isSuccess) {
                        callback(data);
                    }
                    else {
                        LobbyRequest.Utils.checkResultCode(
                            data,
                            my,
                            undefined,
                            "Get stardom fail !",
                            false,
                            "call_from_stardom"
                        );
                        callback([]);
                        my.hideLoadingAnimation();
                    }
                }
            );
        },
        /**
         * Accept gift
         * @param callback function
         * @param my context
         * @param id gift id
         */
        //acceptSingleGift: function (callback, my, id) {
        //    var postData = {
        //        id: id,
        //        loginToken: LobbyConfig.loginToken
        //    };
        //    Lobby.Network.post(LobbyConfig.webServiceFullUrl + "/user/me/accept_gift", postData,
        //        function (isSuccess, data) {
        //            if(LobbyConfig.isDebug) {
        //                Lobby.Utils.printConsoleLog("acceptSingleGift Result accept gift", isSuccess, data);
        //            }
        //            if (isSuccess) {
        //                callback(data);
        //            }
        //            else {
        //                LobbyRequest.Utils.checkResultCode(
        //                    data,
        //                    my,
        //                    undefined,
        //                    "Accept gift failed !"
        //                );
        //            }
        //        }
        //    );
        //},
        /**
         * Acceprt request key
         * @param callback function
         * @param my context
         * @param id
         */
        acceptRequestKey: function (callback, my, id) {
            my.showLoadingAnimation();
            var postData = {
                id: id,
                loginToken: LobbyConfig.loginToken
            };
            Lobby.Network.post(LobbyConfig.webServiceFullUrl + "/user/me/accept_request_key_secretGift", postData,
                function (isSuccess, data) {
                    my.hideLoadingAnimation();
                    if (isSuccess) {
                        callback(data);
                    }
                    else {
                        LobbyRequest.Utils.checkResultCode(
                            data,
                            my,
                            undefined,
                            "Accept request key failed !"
                        );
                    }
                }
            );
        },
        /**
         * Get list slot game and process data
         * @param callback callback when complete
         * @param my
         * @param skipLoading is skip loading animation
         * @param callBackFail callback when fail
         */
        getListSlotsGameAndProcessData: function (callback, my, skipLoading, callBackFail) {
            LobbyRequest.User.getListSlotsGame(function (data) {
                    Lobby.Utils.sortArrayObjectAscending(
                        data.member,
                        'min_level'
                    );
                    var i;
                    var minLevel = 1000;
                    LobbyConfig.crownGameUnlocked = [];
                    for (i = 0; i < LobbyConfig.listGameInfo.length; i++) {
                        if (LobbyConfig.listGameInfo[i].premium_type == 0 && LobbyConfig.listGameInfo[i].min_crown > 0 && LobbyConfig.listGameInfo[i].is_unlocked == true) {
                            LobbyConfig.crownGameUnlocked.push(LobbyConfig.listGameInfo[i]);
                        }
                    }
                    LobbyConfig.listGameInfo = [];
                    for (i = 0; i < data.member.length; i++) {
                        data.member[i].game_id = data.member[i].game_id.replace(LobbyConstant.PREFIX_GAME_MOBILE, "");
                        if (data.member[i].promote_game == 1 &&
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

                    if (callback != undefined) {
                        callback(data);
                    }
                },
                my,
                skipLoading,
                callBackFail
            );
        },
        /**
         * Get list slot game
         * @param callback
         * @param my
         * @param skipLoading is skip loading animation
         * @param callBackFail
         */
        getListSlotsGame: function (callback, my, skipLoading, callBackFail) {
            //"bean_type": "BeanItemInfoSlotGameInfo",
            //    "id": 1,
            //    "ts_created": 1436414803087,
            //    "ts_last_modified": 1437550307606,
            //    "name": "2014 Soccer",
            //    "info": "",
            //    "order_id": 1,
            //    "game_id": "soccer",
            //    "rtp": 95,
            //    "max_line": 30,
            //    "min_line": 5,
            //    "promote_game": 0,
            //    "jackpot": 100000,
            //    "min_level": 36
            if (skipLoading !== true) {
                my.showLoadingAnimation();
            }
            var postData = {
                loginToken: LobbyConfig.loginToken,
                platform: LobbyConstant.platformMobile
            };
            var url = "/user/me/game/slot/listAll";
            Lobby.Network.post(LobbyConfig.webServiceFullUrl + url, postData,
                function (isSuccess, data) {
                    if (skipLoading !== true) {
                        my.hideLoadingAnimation();
                    }
                    if (isSuccess) {
                        callback(data);
                    }
                    else {
                        if (Lobby.Utils.objectNotNull(callBackFail)) {
                            callBackFail();
                        }
                        LobbyRequest.Utils.checkResultCode(
                            data,
                            my,
                            undefined,
                            LobbyLanguageConstant.CANNOT_CONNECT_TO_SERVER
                        );
                    }
                }
            );
        },
        /**
         * Deprecated
         * @param callback
         * @param my
         */
        getListSlotsGamePromote: function (callback, my) {
            var postData = {
                type: 'promote',
                loginToken: LobbyConfig.loginToken
            };
            Lobby.Network.post(LobbyConfig.webServiceFullUrl + "/user/me/game/slot/listAllWithType", postData,
                function (isSuccess, data) {
                    if (isSuccess) {
                        callback(data);
                    }
                    else {
                        my.hideLoadingAnimation();
                        LobbyRequest.Utils.checkResultCode(
                            data,
                            my,
                            undefined,
                            LobbyLanguageConstant.CANNOT_CONNECT_TO_SERVER
                        );
                    }
                }
            );
        },
        /**
         * Get inbox list
         * @param callback
         * @param my
         * @param skipLoadingAnimation
         */
        getListInbox: function (callback, my, skipLoadingAnimation) {
            var postData = {
                accept: 0,
                loginToken: LobbyConfig.loginToken
            };
            if (LobbyConfig.isDebug) {
                console.log("getListInbox skipLoadingAnimation: ", skipLoadingAnimation, skipLoadingAnimation !== true);
            }
            if (skipLoadingAnimation !== true) {
                my.showLoadingAnimation();
            }
            Lobby.Network.post(LobbyConfig.webServiceFullUrl + "/user/gift/getAll", postData,
                function (isSuccess, data) {
                    if (skipLoadingAnimation !== true) {
                        my.hideLoadingAnimation();
                    }
                    if (isSuccess) {
                        callback(data);
                    }
                    else {
                        LobbyRequest.Utils.checkResultCode(
                            data,
                            my,
                            undefined,
                            LobbyLanguageConstant.CANNOT_CONNECT_TO_SERVER
                        );
                        callback(null);
                    }
                }
            );
        },
        /**
         * Deprecated
         * @param callback
         */
        getNumberInboxInitSession: function (callback) {
            var postData = {
                accept: 0,
                loginToken: LobbyConfig.loginToken
            };
            Lobby.Network.post(LobbyConfig.webServiceFullUrl + "/user/me/gift_list", postData,
                function (isSuccess, data) {
                    if (isSuccess) {
                        callback(data);
                    }
                    else {
                        if (LobbyConfig.isDebug) {
                            Lobby.Utils.printConsoleLog("getNumberInboxInitSession False to get numberOfmessage!");
                        }
                        callback(null);
                    }
                }
            );
        },
        /**
         * Deprecated
         * @param baseUrl
         * @param type
         * @param callback
         * @param my
         */
        trackGamePlay: function (baseUrl, type, callback, my) {
            Lobby.Utils.printConsoleLog("Track game url", baseUrl);
            var game_name = LobbyRequest.Utils.getUrlParameter('gameid', baseUrl);
            var postData = {
                fullUrl: baseUrl,
                name: game_name,
                type: type,
                loginToken: LobbyConfig.loginToken
            };
            Lobby.Network.post(LobbyConfig.webServiceFullUrl + "/user/me/statistic/createWhenEnterAndExitGame",
                postData,
                function (isSuccess, data) {
                    //Lobby.Utils.printConsoleLog("Track game data", data);
                    //if (isSuccess) {
                    //}
                    //else {
                    //}
                }
            );
        },
        /**
         * Authorize a session
         * @param callback
         */
        authorizeSession: function (callback) {
            //callback(false, null);
            console.log("authorizeSession");
            Lobby.Network.get(LobbyConfig.webServiceFullUrl + "/user/authorize",
                function (isSuccess, data) {
                    if (isSuccess) {
                        if (LobbyConfig.isDebug) {
                            Lobby.Utils.printConsoleLog("authorizeSession debug tslogin", data);
                        }
                        LobbyConfig.loginToken = data.ts_login;
                    }
                    callback(isSuccess, data);
                }
            );
        },
        /**
         * Login with facebook account
         * @param token facebook token
         * @param callback
         */
        loginUsingAccountFacebook: function (token, callback) {
            var postData = {
                token: token,
                version: LobbyConfig.version
            };
            Lobby.Network.post(LobbyConfig.webServiceFullUrl + "/user/login", postData,
                function (isSuccess, data) {
                    callback(isSuccess, data);
                }
            );
        },
        /**
         * Sign up an account
         * @param username username of account
         * @param pass password of account
         * @param referenceCode of user
         * @param callback
         */
        signUpPlayPalaceAccount: function (username, pass, referenceCode, callback) {
            var postData = {
                username: username,
                password: pass,
                version: LobbyConfig.version,
                referenceCode: referenceCode
            };
            Lobby.Network.post(LobbyConfig.webServiceFullUrl + "/user/sign_up", postData,
                function (isSuccess, data, beanResult) {
                    callback(isSuccess, data, beanResult);
                }
            );
        },
        /**
         * Login account
         * @param username username of account
         * @param pass password of account
         * @param callback
         */
        loginPlayPalaceAccount: function (username, pass, callback) {
            var postData = {
                username: username,
                password: pass,
                version: LobbyConfig.version
            };
            Lobby.Network.post(LobbyConfig.webServiceFullUrl + "/user/login_web", postData,
                function (isSuccess, data, resultBean) {
                    callback(isSuccess, data, resultBean);
                }
            );
        },
        /**
         * Login server with password local from guest account
         * @param userNameLocal
         * @param passwordLocal
         * @param callback
         */
        loginServerPPWithLocalAccount: function (userNameLocal, passwordLocal, callback) {
            var postData = {
                username: userNameLocal,
                password: passwordLocal,
                version: LobbyConfig.version
            };

            Lobby.Network.post(LobbyConfig.webServiceFullUrl + "/user/local/login", postData,
                function (isSuccess, data, resultBean) {
                    callback(isSuccess, data, resultBean);
                }
            );
        },
        /**
         * Create a guest account
         * @param callback
         */
        generateLocalAccount: function (callback) {
            var postData = {};
            Lobby.Network.post(LobbyConfig.webServiceFullUrl + "/user/local/signUp", postData,
                function (isSuccess, data, resultBean) {
                    callback(isSuccess, data, resultBean);
                }
            );
        },
        /**
         * Redeem pre tutorial reward
         * @param callback
         */
        redeemPreTutorialReward: function (callback) {
            var postData = {loginToken: LobbyConfig.loginToken};
            Lobby.Network.post(LobbyConfig.webServiceFullUrl + "/user/me/redeemPreTutorialReward", postData,
                function (isSuccess, data, resultBean) {
                    callback(isSuccess, data, resultBean);
                }
            );
        },
        /**
         * Redeem tutorial reward
         * @param callback
         */
        redeemTutorialReward: function (callback) {
            var postData = {loginToken: LobbyConfig.loginToken};
            Lobby.Network.post(LobbyConfig.webServiceFullUrl + "/user/me/redeemTutorialReward", postData,
                function (isSuccess, data, resultBean) {
                    callback(isSuccess, data, resultBean);
                }
            );
        },
        /**
         * Finish tutorial request
         * @param callback
         */
        finishTutorial: function (callback) {
            var postData = {loginToken: LobbyConfig.loginToken};
            Lobby.Network.post(LobbyConfig.webServiceFullUrl + "/user/me/completeTutorial", postData,
                function (isSuccess, data, resultBean) {
                    callback(isSuccess, data, resultBean);
                }
            );
        },
        /**
         * Check if allow special offer
         * @param callback
         */
        checkSpecialOffer: function (callback) {
            var postData = {};
            Lobby.Network.post(LobbyConfig.webServiceFullUrl + "/user/me/checkSpecialOffer", postData,
                function (isSuccess, data, resultBean) {
                    callback(isSuccess, data, resultBean);
                }
            );
        },
        /**
         * Deprecated
         * @param username
         * @param callback
         */
        sendValidateToken: function (username, callback) {
            var postData = {
                username: username,
                version: LobbyConfig.version
            };
            Lobby.Network.post(LobbyConfig.webServiceFullUrl + "/user/resend_activate_code", postData,
                function (isSuccess, data) {
                    callback(isSuccess, data);
                }
            );
        },
        /**
         * Set prefer language
         * @param language
         * @param callback
         */
        setPreferLanguage: function (language, callback) {
            var postData = {
                language: language,
                loginToken: LobbyConfig.loginToken
            };
            Lobby.Network.post(LobbyConfig.webServiceFullUrl + "/user/me/set_prefer_language", postData,
                function (isSuccess, data) {
                    callback(isSuccess, data);
                    //alert("SUCCESS!!!!!!!!!!!!!");
                }
            );
        },
        /**
         * Un used in mobile version
         * @param webBackground
         * @param callback
         */
        setWebBackground: function (webBackground, callback) {
            var postData = {
                webBackground: webBackground,
                loginToken: LobbyConfig.loginToken
            };
            Lobby.Network.post(LobbyConfig.webServiceFullUrl + "/user/me/setWebBackground", postData,
                function (isSuccess, data) {
                    callback(isSuccess, data);
                }
            );
        },
        /**
         * Un used
         * @param productPackageType
         * @param callback
         * @param my
         * @param skipPopup
         */
        checkIfUserCanBuyProductPackage: function (productPackageType, callback, my, skipPopup) {
            var postData = {
                productPackageType: productPackageType,
                loginToken: LobbyConfig.loginToken
            };
            Lobby.Network.post(LobbyConfig.webServiceFullUrl + "/user/me/productPackage/check/allowBuy", postData,
                function (isSuccess, data) {
                    if (!isSuccess) {
                        LobbyRequest.Utils.checkResultCode(
                            data,
                            my,
                            "Warning",
                            "You have already purchased this package before!",
                            skipPopup
                        );
                    }
                    callback(isSuccess, data);
                }
            );
        },
        /**
         * Start log out
         * @param callback
         * @param my
         */
        logout: function (callback, my) {
            Lobby.Network.get(LobbyConfig.webServiceFullUrl + "/user/logout",
                function (isSuccess, data) {
                    callback(isSuccess, data);
                }
            );
        },
        /**
         * Track a payment
         * @param shopData
         * @param callback
         */
        trackPayment: function (shopData, callback) {
            var arrayProduct = LobbyConfig.ProductIdForBuyCoin
                .concat(LobbyConfig.ProductPackage)
                .concat(LobbyConfig.ProductIdForVip)
                .concat(LobbyConfig.ProductIdForBuyKey)
                .concat(LobbyConfig.ProductIdForF2PPlayer)// 2015-11-09: Toan
                .concat(LobbyConfig.ProductIdForP2PPlayer);
            for (var i = 0; i < arrayProduct.length; i++) {
                if (arrayProduct[i] == shopData.productId) {
                    shopData.productId = i;
                    break;
                }
            }
            if (isNaN(shopData.productId)) {
                shopData.productId = -1;
            }

            var postData = {
                errorCode: shopData.errorCode,
                productId: shopData.productId,
                loginToken: LobbyConfig.loginToken
            };
            if (LobbyConfig.isDebug) {
                Lobby.Utils.printConsoleLog("trackPayment Data to post ", postData);
            }
            Lobby.Network.post(LobbyConfig.webServiceFullUrl + "/user/trackPayment", postData,
                function (isSuccess, data) {
                    callback(isSuccess, data);
                }
            );
        },
        /**
         * Collect comeback bonus
         * @param callback
         * @param my
         */
        collectComebackBonus: function (callback, my) {
            var postData = {
                loginToken: LobbyConfig.loginToken
            };
            my.showLoadingAnimation();
            Lobby.Network.post(LobbyConfig.webServiceFullUrl + "/user/comebackBonusMobile/collect", postData,
                function (isSuccess, data, response) {
                    Lobby.Utils.printConsoleLog(data);
                    my.hideLoadingAnimation();
                    if (isSuccess) {
                        callback(data);
                    }
                    else {
                        my.handleFailResultNewStrategy(response, null, true, false);
                        callback(null);
                    }
                }
            );
        },
        /**
         * Get achievement list
         * @param callback
         * @param my
         * @param isShowAndHideLoadingAnimation is should show loading animation
         */
        // later: code lai truong hop if !success cua cac method achievement
        getAchievementList: function (callback, my, isShowAndHideLoadingAnimation) {
            //Lobby.Utils.printStackTrace();
            var postData = {
                loginToken: LobbyConfig.loginToken
            };
            if (isShowAndHideLoadingAnimation) {
                my.showLoadingAnimation();
            }
            Lobby.Network.post(
                LobbyConfig.webServiceFullUrl + "/user/achievement/listAllOfCurrentUser",
                postData,
                function (isSuccess, data) {
                    if (isShowAndHideLoadingAnimation) {
                        my.hideLoadingAnimation();
                    }
                    if (isSuccess) {
                        callback(data);
                    }
                    else {
                        LobbyRequest.Utils.checkResultCode(
                            data,
                            my,
                            undefined,
                            LobbyLanguageConstant.CANNOT_CONNECT_TO_SERVER
                        );
                        callback(null);
                    }
                }
            );
        },
        /**
         * Get achievement list
         * @param callback
         * @param my
         * @param isShowAndHideLoadingAnimation is should show loading animation
         */
        // later: code lai truong hop if !success cua cac method achievement
        getFreecoinVideo: function (callback, my, isShowAndHideLoadingAnimation) {
            if (!LobbyConfig.isTestAlgorithmMode) {
                return;
            }
            if (
                !Lobby.Utils.stringContainString(LobbyConfig.AppDomain, "http://192.168.0.")
            ) {
                // collect freecoin without see real video just work on local server
                return;
            }
            //Lobby.Utils.printStackTrace();
            var postData = {
                loginToken: LobbyConfig.loginToken
            };
            Lobby.Network.post(
                LobbyConfig.webServiceFullUrl + "/user/snB5mBScj69sEd3B",
                postData,
                function (isSuccess, data) {
                    if (isSuccess) {
                        callback(data);
                    }
                    else {
                        LobbyRequest.Utils.checkResultCode(
                            data,
                            my,
                            undefined,
                            LobbyLanguageConstant.CANNOT_CONNECT_TO_SERVER
                        );
                        callback(null);
                    }
                }
            );
        },
        /**
         * Collect specific achievement
         * @param achievementId id of achievement
         * @param callback success
         * @param my
         */
        collectAchievement: function (achievementId, callback, my, isShowLoadingAnimation) {
            if (Lobby.Utils.objectIsNull(isShowLoadingAnimation)) isShowLoadingAnimation = true;
            var postData = {
                achievementId: achievementId,
                loginToken: LobbyConfig.loginToken
            };
            if (isShowLoadingAnimation) my.showLoadingAnimation();
            Lobby.Network.post(
                LobbyConfig.webServiceFullUrl + "/user/me/collectAchievement",
                postData,
                function (isSuccess, data) {
                    if (isShowLoadingAnimation) my.hideLoadingAnimation();
                    if (isSuccess) {
                        callback(data);
                    }
                    else {
                        LobbyRequest.Utils.checkResultCode(
                            data,
                            my,
                            undefined,
                            LobbyLanguageConstant.CANNOT_CONNECT_TO_SERVER
                        );
                        callback(null);
                    }
                }
            );
        },
        /**
         * Get purchase amount
         * @param callback
         */
        getPurchaseAmount: function (callback) {
            var postData = {
                loginToken: LobbyConfig.loginToken
            };
            Lobby.Network.post(LobbyConfig.webServiceFullUrl + "/user/me/getPurchaseAmount", postData,
                function (isSuccess, data) {
                    if (isSuccess) {
                        callback(isSuccess, data);
                    }
                }
            );
        },
        /**
         * Get api token
         * @param callback
         */
        getAPIToken: function (callback) {
            var postData = {
                loginToken: LobbyConfig.loginToken
            };
            Lobby.Network.post(LobbyConfig.webServiceFullUrl + "/user/generateAPIToken", postData,
                function (isSuccess, data, response) {
                    callback(isSuccess, data, response);
                }
            );
        },
        /**
         * Upload user name
         * @param my
         * @param newName
         * @param callback
         */
        updateUserName: function (my, newName, callback) {
            var postData = {
                name: newName,
                loginToken: LobbyConfig.loginToken
            };
            my.showLoadingAnimation();
            Lobby.Network.post(LobbyConfig.webServiceFullUrl + "/user/updateName", postData,
                function (isSuccess, data) {
                    my.hideLoadingAnimation();
                    if (isSuccess || data == LobbyConstant.ERROR_MESSAGE_REACH_LIMITE_CHANGE_NAME) {
                        callback(isSuccess, data);
                    } else {
                        LobbyRequest.Utils.checkResultCode(
                            data,
                            my,
                            undefined,
                            LobbyLanguageConstant.CANNOT_CONNECT_TO_SERVER
                        );
                    }
                });
        },
        /**
         * Upload an avatar with token
         * @param apiToken
         * @param userId
         * @param avatarData
         * @param callBack
         */
        uploadAvatarWithAPIToken: function (apiToken, userId, avatarData, callBack) {
            var formData = new FormData();
            formData.append("userId", userId);
            formData.append("apiToken", apiToken);
            formData.append("avatar", avatarData);
            Lobby.Network.uploadFileNew(LobbyConfig.webServiceFullUrl + "/user/updateAvatarUsingAPIToken", formData,
                function (isSuccess, data, response) {
                    callBack(isSuccess, data, response);
                }
            );
        },
        /**
         * Get all data require
         * @param callback
         */
        getAllData: function (callback) {
            var postData = {
                loginToken: LobbyConfig.loginToken,
                androidVersionCode: LobbyConfig.ProductManager.Android.versionCode,
                androidVersionName: LobbyConfig.ProductManager.Android.versionApp,
                platformGetMyProfile: LobbyConstant.platformMobile,
                getStatisticData: true,
                platformSpecialOffer: 2
            };
            Lobby.Network.post(LobbyConfig.webServiceFullUrl + "/user/getAllData", postData,
                function (isSuccess, data) {
                    if (isSuccess) {
                        callback(data);
                    }
                    else {
                        callback(null, data);
                    }
                }
            );
        },
    },

    Utils: {
        /**
         * Check and show popup for result code
         * @param data
         * @param my
         * @param title
         * @param body
         * @param skipPopup
         * @param caller
         */
        checkResultCode: function (data, my, title, body, skipPopup, caller) {
            my = LobbyC.MainMenu;
            if (data.reload) {
                if (data.ts_reload > my._userData.profile.ts_reload ||
                    my._userData.profile.ts_reload == undefined) {
                    my.showNotificationPopup("", "Reload in secs");
                    //location.reload(true);
                    Lobby.Utils.reloadGame();
                }
            }
            switch (data) {
                case LobbyConstant.ERROR_MESSAGE_NOT_LOGIN:
                    if (Lobby.Utils.objectNotNull(LobbyC.MainMenu.isLogOut) && my.isLogOut) return;
                    my.showReloadNotificationPopup();
                    break;
                case LobbyConstant.ERROR_MESSAGE_SERVER_ERROR:
                    my.showServerErroPopup();
                    break;
                case LobbyConstant.ERROR_MESSAGE_SERVER_MAINTAIN:
                    my.showServerMaintainPopup();
                    break;
                case LobbyConstant.ERROR_MESSAGE_USER_REJECTED_APP:
                    my.showNotificationPopup(undefined, "User account doest not exist. Please reload game !");
                    break;
                case LobbyConstant.ERROR_MESSAGE_LOGIN_SOME_WHERE:
                    var callback = function () {
                        my.isShowingLoginSomeWhere = false;
                        my.clearDataAndLogOut();
                    };
                    if (my.isShowingLoginSomeWhere) {
                        return;
                    }
                    //my.prepare4HidingGame(false);
                    //my._maskBackBtn.frame = 2;
                    //my._headerMask.visible = false;
                    //var iframeGame = $('#iframe-game');
                    //iframeGame.css("padding-top", "6%");
                    //var currentUrl = document.getElementById('iframe-game').src;
                    //LobbyRequest.User.trackGamePlay(currentUrl, LobbyConfig.TrackGame.Type.Exit, null, my);
                    //document.getElementById('iframe-game').src = "about:blank";
                    //iframeGame.onload = function () {
                    //};
                    //my._maskBackBtn.alpha = 0;
                    //my._maskBackBtn.visible = false;

                    LobbyConfig.stopRequestAjax = true;
                    ScheduleManager.stopSchedule(my);
                    Manager4MyUserInfo.stopTimerGetUserInfo(my);

                    if (Lobby.Utils.objectNotNull(my.globalBannerSlotPopup)) {
                        my.closePopupWithAnimateDownNew(my.globalBannerSlotPopup);
                    }
                    my.showNotificationPopup(
                        my.selectlanguage.popup_gift_warning.text,
                        my.selectlanguage.login_some_where.text,
                        callback,
                        callback
                    );
                    my.isShowingLoginSomeWhere = true;
                    break;
                case LobbyConstant.ERROR_MESSAGE_FACEBOOK_ERROR:
                    if (!Lobby.Utils.objectIsNull(caller)) {
                        switch (caller) {
                            case "call_from_stardom":
                                var callbackForFacebookError = function () {
                                    //location.reload(true);
                                };
                                my.showNotificationPopup(
                                    my.selectlanguage.popup_gift_warning.text,
                                    my.selectlanguage.cant_get_data_FB.text,
                                    callbackForFacebookError
                                );
                                break;
                        }
                    }
                    break;
                case LobbyConstant.ERROR_MESSAGE_TOKEN_EXPIRED:
                    var callbackForFacebookTokenExpired = function () {
                        my.clearDataAndLogOut();
                    };
                    my.showNotificationPopup(
                        my.selectlanguage.popup_gift_warning.text,
                        my.selectlanguage.FB_token_expired.text,
                        callbackForFacebookTokenExpired
                    );
                    break;
                default:
                    //if(Lobby.Utils.objectNotNull(skipPopup)){
                    if (!skipPopup) {
                        var errorCode = "";
                        if (Lobby.Utils.objectNotNull(data) && Lobby.Utils.objectNotNull(data.core_result_code)) {
                            errorCode += (" " + data.core_result_code);
                        }
                        my.showNotificationPopup(title, body + errorCode);
                    }
                    //}
                    break;
            }
        },
        /**
         * check if a param exists within an URL and return it
         * @param sParam
         * @param baseUrl
         * @returns {boolean}
         */
        getUrlParameter: function (sParam, baseUrl) {
            var sPageURL = decodeURIComponent(baseUrl),
                sURLVariables = sPageURL.split('&'),
                sParameterName,
                i;

            for (i = 0; i < sURLVariables.length; i++) {
                sParameterName = sURLVariables[i].split('=');

                if (sParameterName[0] === sParam) {
                    return sParameterName[1] === undefined ? true : sParameterName[1];
                }
            }
        },
        /**
         * Get param from current url
         * @param sParam
         * @returns {boolean}
         */
        getUrlParameterExt: function (sParam) {
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
        }
        //},
        //
        //getTierPlayerConfig: function (callback, my) {
        //    var postData = {
        //    };
        //    Lobby.Network.post(LobbyConfig.webServiceFullUrl + "/tier/listTierUser",
        //        postData,
        //        function (isSuccess, data) {
        //            if (my != null) {
        //                my.hideLoadingAnimation();
        //            }
        //            if (isSuccess) {
        //                callback(data, true);
        //            }
        //            else {
        //                if (my != null) {
        //                    LobbyRequest.Utils.checkResultCode(
        //                        data,
        //                        my,
        //                        undefined,
        //                        "Can't get user profile !, please try again later !",
        //                        true
        //                    );
        //                }
        //                callback(data, false);
        //            }
        //        }
        //    );
        //},

    },

    System: {

        /**
         * Deprecated
         * @param callback
         */
        getAllConfig: function (callback) {
            var postData = {
                loginToken: LobbyConfig.loginToken
            };
            Lobby.Network.post(LobbyConfig.webServiceFullUrl + "/server/config/getAll", postData,
                function (isSuccess, data) {
                    if (isSuccess) {
                        callback(data);
                    }
                    else {
                        callback(null);
                    }
                }
            );
        },
        /**
         * Get all product
         * @param callback
         */
        getAllProduct: function (callback) {
            var postData = {
                loginToken: LobbyConfig.loginToken
            };
            Lobby.Network.post(LobbyConfig.webServiceFullUrl + "/server/config/getAll", postData,
                function (isSuccess, data) {
                    callback(isSuccess, data);
                }
            );
        },
        /**
         * Get real time noti with user info
         * @param data
         * @param callback
         * @param my
         */
        getRealTimeNotificationWithUserInfo: function (data, callback, my) {
            //Lobby.Utils.printConsoleLog("+++++++++++++++++++++++++++++++++++ call getRealTimeNotificationWithUserInfo");
            //Lobby.Utils.printStackTrace();
            var postData = {
                count: data,
                loginToken: LobbyConfig.loginToken,
                platform: LobbyConstant.platformMobile
                //gameId: (game_name!=undefined && undefined!=null)?game_name:'',
                //locationCall: 'game',
                //type: type
            };
            Lobby.Network.post(
                LobbyConfig.webServiceFullUrl + "/server/real-time-notification/getTopWithUserInfo",
                postData,
                function (isSuccess, data) {
                    if (!isSuccess) {
                        LobbyRequest.Utils.checkResultCode(
                            data,
                            my,
                            undefined,
                            "Fail to get notification, please try again later !",
                            true
                        );
                    }
                    if (data.reload) {
                        if (data.ts_reload > my._userData.profile.ts_reload ||
                            my._userData.profile.ts_reload == undefined) {
                            my.showNotificationPopup("", "Reload in secs");
                            //location.reload(true);
                            Lobby.Utils.reloadGame();
                        }
                    }
                    callback(isSuccess, data, my);
                }
            );
        },
        /**
         * Deprecated
         * @param callback
         */
        getAllLinkGame: function (callback) {
            var postData = {
                loginToken: LobbyConfig.loginToken
            };
            Lobby.Network.post(LobbyConfig.webServiceFullUrl + "/server/config/getLinkGame",
                postData,
                function (isSuccess, data) {
                    if (isSuccess) {
                        callback(data);
                    }
                    else {
                        callback(null);
                    }
                }
            );
        },

        /**
         * Get all product
         * @param callback
         */
        getAllProductDynamic: function (callback) {
            var postData = {
                loginToken: LobbyConfig.loginToken
            };
            Lobby.Network.post(LobbyConfig.webServiceFullUrl + "/user/tier/listTierUser", postData,
                function (isSuccess, data) {
                    callback(isSuccess, data);
                }
            );
        },
        /**
         * Deprecated
         * @param callback
         */
        getAllLevelCoinsBonus: function (callback) {
            var postData = {
                loginToken: LobbyConfig.loginToken
            };
            Lobby.Network.post(LobbyConfig.webServiceFullUrl + "/user/level/listAll", postData,
                function (isSuccess, data) {
                    callback(isSuccess, data);
                }
            );
        }
    }

};
