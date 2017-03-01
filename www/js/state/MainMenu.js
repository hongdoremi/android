LobbyC.MainMenu = (function (my) {
    var checkPopupF2pAndP2pAppearInLobby = 0;
    my.checkPopupF2pAndP2pAppearInGame = 0;
    my.loader = null;
    my._userSetting = {
        backgroundMusic: "1",
        soundEffect: "1",
        friendRequest: "1",
        imageQuality: true
    };
    my.uiBody = null;
    my.uiFooter = null;
    my._backgroundMusic = null;
    my._coinDropSound = null;
    my._popUpSound = null;
    my._spinSound = null;
    my.isOpenBannerSlot = false;
    my.canDisableGame = false;
    my.isShowingPopup = false;
    my.isShowLoading = false;

    my._isShowingRecentWinnerAnimation = false;
    my._recentWinnerList = [];

    my.playingGame = LobbyConstant.isNotInGame;
    my.isCompleteFirstTimeLoadFriend = false;
    my.isFirstTimeClickShowPopupFriend = false;

    my.isCollectedRewardFromPopupLvUp = true;
    my.data4RewardCoinPopupLvup = {};
    my.numberOfPopupLevelUp = 0;
    my.ListGameInfoBeforeShowListPopupLevelUp = [];

    my.numberOFPopupGetMoreCoinShowed = 0;
    my.isCanShowPopupGetMoreCoin = true;

    my.callBackShowPopupPromotion = {
        ShowComebackBonus: null,
        ShowStarterPack: null,
        ShowGetMoreCoin: null,
        ShowFreeToPlay: null,
        ShowPayToPlay: null,
        ShowDailySpin: null
    };

    my.isFirstTimeLoadState = false;

    my.isInLobby = false;
    /**
     * Set up userData, and get friend list for the first time load
     * @param userData
     * @param isFirstTimeLoadState
     * @param callback
     */
    my.init = function (userData, isFirstTimeLoadState, callback) {
        my.input.maxPointers = 1;
        my.isFirstTimeLoadState = isFirstTimeLoadState;
        my._userData = userData;
        my.numberOfCurrentPopup = 0;
        my.adcolonySetupEvents();
        my.isShowingConnectionLost = false;
        my.isInLobby = true;
        // 2016-07-23: Phuoc: khi tạo footer thì đã reload achievement rồi nên không reload ở đây nữa -> comment out
        //// 2016-07-23: Phuoc: move từ InitSession vào MainMenu, để khi restart state MainMenu thì sẽ tự reload achievement
        //LobbyC.MainMenu.reloadAchievementNotification();

        // 2016-07-22: Phuoc: chỉ lấy friend list trong lần đầu tiên load state
        if (isFirstTimeLoadState) {
            var callback = function () {
                if (my._userData.profile.role === 0) { // user fb role
                    var callBackGetFriendList = function (isSuccess, data) {
                        if (Lobby.Utils.objectNotNull(LobbyC.MainMenu.isLogOut) && LobbyC.MainMenu.isLogOut) return;
                        if (!isSuccess) {
                            Lobby.Utils.printConsoleLog("Get friend list from server failed. Debug info: ", arguments);
                            my.hideLoadingAnimation();
                            if (data === LobbyConstant.ERROR_MESSAGE_NOT_LOGIN) {
                                my.showNotificationPopup(
                                    my.selectlanguage.popup_gift_warning.text,
                                    my.selectlanguage.FB_token_expired.text,
                                    function () {
                                        my.clearDataAndLogOut();
                                    }
                                );
                            }
                            return;
                        }
                        my.isCompleteFirstTimeLoadFriend = true;
                        my._userData.friendList = data.member;
                        my.parseDataFriendListNew(data.member);
                        my.lastTimeGetFriend = new Date().getTime();
                        if (my.isFirstTimeClickShowPopupFriend) {
                            //my.showPopupFriendNew("friends", false);
                            //my.hideLoadingAnimation();
                        }
                    };
                    LobbyRequest.User.getFriendList(callBackGetFriendList, my);
                }
            };

            if (my._userData.isFacebookUser) {
                FacebookController.getFriendList(function (isSuccess, data) {
                    my._userData.invitableFriendList = data;
                    callback();
                }, my._userData.authResponse.accessToken);
            }
        }

        //var listFriend = my._userData.friendList.slice();
        //var currentTime = new Date().getTime();
        //for (var i = 0; i < listFriend.length; i++) {
        //    var index = listFriend[i];
        //    index.time_left_request_secret_key = currentTime + index.time_left_request_secret_key;
        //    index.time_left_send_coin = currentTime + index.time_left_send_coin;
        //    index.time_left_send_free_gift = currentTime + index.time_left_send_free_gift;
        //}
        my.roundMoney();

        // 2016-07-23: Phuoc: đoạn sau không cần -> comment out
        //if (my._userData.profile.role != 2) {
        //    my.updateUserInfoFromSV();
        //}

        my.selectlanguage = my.arrayLanguage.en;
        if (LobbyConfig.enablePopupHtml && !LobbyConfig.debugHtml) {
            my.popupHtml = new ManagerForHtmlPopup(my);
        }
        if (Lobby.Utils.objectNotNull(callback)) {
            callback();
        }
    };
    /**
     * Update game slot cell, check if is download
     * @param callback
     */
    my.updateBody = function (callback) {
        LobbyConfig.listGameInfo = [];
        LobbyRequest.User.getListSlotsGameAndProcessData(
            function () {
                for (var i = 0; i < my.slotCellList.length; i++) {
                    my.slotCellList[i].updateCell();
                }
                callback();
            },
            my,
            true,
            callback
        );
    };
    my.getSlotCellByName = function (name) {
        for (var i = 0; i < my.slotCellList.length; i++) {
            if (name == my.slotCellList[i].gameData.game_id) return my.slotCellList[i];
        }
    };
    my.createButtonTest = function(groupMainMenu){
        //my.showMissingCoinOrCrownPopUp(
        //    LobbyConstant.BUY_MISSING_COIN_OR_CROWN_POPUP_TYPE_COIN,
        //    1
        //);

        //setTimeout(function () {
        //    var arrayGameUnlock = [];
        //    for (var index = 0; index < LobbyConfig.listGameInfo.length; ++index) {
        //        if (index === 0 || index === 1 || true) {
        //            arrayGameUnlock.push(LobbyConfig.listGameInfo[index]);
        //            //break;
        //        }
        //    }
        //    my.showUnlockCabinetPopupNew(
        //        my._userData.profile.name,
        //        my._userData.profile.level,
        //        arrayGameUnlock[0],
        //        arrayGameUnlock
        //    );
        //}, 2000);

        //my.showPopupLevelUp(
        //    5,
        //    6,
        //    10000,
        //    1,
        //    function () {
        //
        //    }
        //);

        //my.showPopupShop();
        //my.showGetMoreCoinsPopup();
        //my.showF2PPopup();
        //my.showP2PPopup();


        //my.showNotificationPopup(
        //    "",
        //    my.selectlanguage.popup_shop_transaction_cancelled.text,
        //    function () {
        //    }
        //);

        //my.showNewPopUpSetting();


        /**
         * Test function start
         */
/*
         my.test = function (callback, parent) {

         var group = my.add.group();
         parent.add(group);
         group.update = function () {
         //console.log(my.game.kineticScrolling.isMoving);
         };
         var test = Lobby.PhaserJS.createSpriteRectangleExt(
         my,
         0,
         100,
         function () {
         test.frame = 0;

         if (callback != null) callback();


         },
         function () {
         test.frame = 0;
         },
         function () {
         test.frame = 0;
         },
         group, LobbyConfig.isDebug,
         "popup_info_decrease_button",
         null,
         null
         );


         };
         //////
        var group = my.add.group();
        Lobby.PhaserJS.scaleGroupForOptimize(group, true);
        my.test(function () {
            var popupUnlockInfoArray = [];
            var popupUnlockInfo = null;
            popupUnlockInfo = my.createPopupUnlockInfo(my.selectlanguage.you_have_unlocked_a_new_game.text,'gameSlot_' + 55,true,true,null,true,{x:1.2,y:1.2});
            popupUnlockInfoArray.push(popupUnlockInfo);
            popupUnlockInfo = my.createPopupUnlockInfo(my.selectlanguage.you_have_unlocked_a_new_game.text,'gameSlot_' + 41,true,true,null,true,{x:1.2,y:1.2});
            popupUnlockInfoArray.push(popupUnlockInfo);
            popupUnlockInfo = my.createPopupUnlockInfo(my.selectlanguage.you_have_unlocked_a_new_game.text,'gameSlot_' + 42,true,true,null,true,{x:1.2,y:1.2});
            popupUnlockInfoArray.push(popupUnlockInfo);
            var callback = function(){
                my.checkAndShowPopupFeatureUnlocked(15,1);
            };

            if (popupUnlockInfoArray.length > 0) {
                my.showPopupUnlockNew(popupUnlockInfoArray,callback);
            }
            //my.showInGameNotificationPopUp("abc","You have unlock featured!",function(){
            //    alert("xyz");
            //},null,"OK");
            //if (LobbyConfig.isAutoFinishAllProduct === true) {
            //    LobbyConfig.isAutoFinishAllProduct = false;
            //} else {
            //    LobbyConfig.isAutoFinishAllProduct = true;
            //}
            //if (LobbyConfig.isAutoFinishAllProduct) {
            //    my.showNotificationPopup(
            //        "auto finish product on",
            //        "auto finish product on",
            //        function (event) {
            //        }
            //    );
            //} else {
            //    my.showNotificationPopup(
            //        "auto finish product off",
            //        "auto finish product off",
            //        function (event) {
            //        }
            //    );
            //}
         //ManagerForPurchase.initOldProductList();
         //var data = {};
         //data.product_type = LobbyConstant.GOOGLE_PACKAGE_TYPE_BOOSTER_1;
         ////data.product_type = LobbyConstant.GOOGLE_PACKAGE_TYPE_BOOSTER_2 ;
         ////data.product_type = LobbyConstant.GOOGLE_PACKAGE_TYPE_LUCKY_WHEEL_1 ;
         ////data.product_type = LobbyConstant.GOOGLE_PACKAGE_TYPE_LUCKY_WHEEL_2 ;
         ////data.product_type = LobbyConstant.GOOGLE_PACKAGE_TYPE_LUCKY_WHEEL_3 ;
         ////data.product_type = LobbyConstant.GOOGLE_PRODUCT_TYPE_PIGGY_BANK_1 ;
         //data.coin_reward = 1700000;
         //data.crown_reward = 100;
         //data.booster_level_up_bonus_duration_time_reward = 259200000;
         //data.spin_of_lucky_wheel_reward = 12;
         //
         //my.handleResultBuyPackageNew(data,true);

         //var list = [1,2,3,4];
         //LobbyRequest.User.sendGiftToUserList(list,1,function(isSuccess,data,response){
         //    console.log(isSuccess);
         //});
         //my.showPopupDailyLuckySpin();
         //my.popupHtml.showSumbitReferenceCodePopupHtml();
         //ManagerForAdvertise.showVideo(my);
         //ManagerForEvent.onMemoryError();
         // my.showNotificationPopup(
         //     my.selectlanguage.popup_gift_success.text,
         //     "Received 50,000 coins",
         //     function (event) {
         //         var x = event.clientX;
         //         var y = event.clientY;
         //         var posOfMouse = Lobby.Utils.posHTMLToPosLobby({x:x,y:y});
         //
         //         //alert(x);
         //         //alert(y);
         //             my.playAllAnimationCoinAndUpdateHeader(0,null,null,posOfMouse);
         //         LobbyC.MainMenu.updateUserInfoFromSV(
         //             function () {
         //
         //             },
         //             function () {
         //             },
         //             false // isGetStatisticData
         //         );
         //     }
         // );

         //my.state.start('GameSlot', false, false, "nezha", my._userData,my.gameSlotGroup);
         //my.showGame("nezha");

         //my.showPopupMegaWin(10000,null);


         //var arrayGameUnlock = [];
         //var game = {
         //    id:44,
         //    game_id:"deepblue"
         //};
         //arrayGameUnlock.push(game);
         //my.showUnlockCabinetPopupNew("deepblue",2,game,arrayGameUnlock);
         //my.showPopupBigWin(10000,null,false,group);
         //my.initRecentWinnerGroup();
         //my.showRecentWinner();
         //my.showPopupLevelUp(0,7,250000,1);
         //my.showSpin();
         //var spinInfo = {
         //    coin: 100,
         //    factor: 123,
         //    level_bonus: 3,
         //    number_of_friend: 20,
         //    vip_benefit: 1,
         //    total_coin: 9999
         //};
         //my.showPopupSpin(
         //    spinInfo,
         //    function () {
         //        //my.closePopupWithAnimateDownNew(group);
         //    });
         //my.showLoadingAnimation();
         //my.updateUserInfoFromSVWithCoinAnim(
         //    function (isSuccess) {
         //        my.hideLoadingAnimation();
         //        if (isSuccess) {
         //            //my.roundMoney();
         //            //my.showPopUpProfile(my._userData);
         //        }
         //    }
         //);
         //my.showHeaderCoinAnimation(group);
         //my.updateUserInfoFromSVWithCoinAnim()
         },group);

         /**
         * End test function
         */
        // debug
        my.createTestButton(500, 150, "Simulator", groupMainMenu, function () {
            var simulatorAPIType = LobbyConstant.SIMULATOR_API_TYPE_VIEW_VIDEO;
            Manager4DebugTestAlgorithm.callAutoAPIToServer4Test(simulatorAPIType);
        }, LobbyConfig.isTestStrategy);

        //my.showSpin();

    };
    /**
     * Create footer, body, header,
     */
    my.create = function () {
        LobbyC.MainMenu.isLogOut = false;
        my.game.stage.disableVisibilityChange = true;
        my.isShowLevelUpPopup = false;
        if (!Lobby.Utils.isIOS() && !Lobby.Utils.isWeb()) {
            window.navigationbar.hideNavigationBar();
            StatusBar.hide();
        }

        if (!my.isFirstTimeLoadState) {
            my.playingGame = LobbyConstant.isNotInGame;
            my.numberOfCurrentPopup = 0;

            if (Lobby.Utils.objectNotNull(my.uiBody)) {
                my.uiBody.visible = true;
            }
            my._maskBackBtn.visible = false;
            my.uiFooter.visible = true;
            my.canDisableGame = false;
            my.btnInfo.visible = false;
            my.btnFriend.visible = true;

            my.showLoadingAnimation();
            my.updateBody(function () {
                my.hideLoadingAnimation();
                my.applyLanguage(my.currentlanguageCode);
                my.destroyCurrentCoinAnimation();
                my.showRecentWinnerGroup();
                my.toggleGameMusic();
                my.enableScrollBody();
                my.reloadAchievementNotification();
                my.showTutorial();
                my.removeAllPopupAndDarkLayer();
            });
            my.reloadHeader(false);
            setTimeout(function () {
                LobbyC.MainMenu.reloadHeader(false);
            }, 2000);
            return;
        }
        Lobby.Utils.printConsoleLog("**************************************************************************");
        Lobby.Utils.printConsoleLog("******************* Benchmark: Begin showing main menu *******************");
        Lobby.Utils.printConsoleLog("**************************************************************************");

        my.gameSlotGroup = my.add.group();
        Lobby.PhaserJS.scaleGroupForOptimize(my.gameSlotGroup, true);

        my.loadMiscItem();
        my.initCustomLoader();

        my.currentlanguageCode = my._userData.profile.prefer_language;
        my.applyLanguage(my.currentlanguageCode);

        var groupMainMenu = my.add.group();
        my.groupMainMenu = groupMainMenu;
        //my.world.bringToTop(window.loadingViewInitSession);

        //return;
        my.showBodyNew(groupMainMenu);
        var groupNewHeader = my.showNewHeader(groupMainMenu);
        if (LobbyConfig.isTestStrategy) {
            LobbyC.MainMenu.magicItem.checkAndShowMagicItem();
            my.currentTimeInGameClock = my.addTimerClock(20,10,groupNewHeader,1000,null,100,"#009933");
            my.currentTimeInGameClock.currentStreak = 0;
            my.currentTimeInGameClock.checkUpdate = function(timeObject){
                if(timeObject.day != my.currentTimeInGameClock.currentStreak){
                    my.currentTimeInGameClock.currentStreak = timeObject.day;
                    /**
                     * Reset autoTestLastCollectInfo
                     * @type {null}
                     */
                    LobbyConfig.autoTestLastCollectInfo = null;

                }
            };
        }
        my.showNewFooter(groupMainMenu);

        my.destroyCurrentCoinAnimation();

        window.loadingViewInitSession.visible = false;
//return;
        Lobby.PhaserJS.scaleGroupForOptimize(groupMainMenu, false);
        //groupMainMenu.scale.setTo(LobbyConfig.scaleRatioEntireGame);
        //ManagerForScale.reposition(groupMainMenu);

        my.showTutorial();


        // later
        my.getSpecialOfferInfo();

        my.popupManager = my.add.group();
        ManagerForEvent.setIsBlockBackButton(false);

        my.playBackgroundMusic();

        my.createButtonTest(groupMainMenu);

        // POPUP NEW SIGNUP
        if (my._userData.profile.coin < LobbyConstant.MINIUM_COIN_TO_SHOW_GET_COIN
            && my.numberOFPopupGetMoreCoinShowed < 3
            && my.isCanShowPopupGetMoreCoin === true) {
            my.isCanShowPopupGetMoreCoin = false;
        }

        // 2016-07-22: Phuoc: chỉ trong lần đầu load state mới kiểm tra daily bonus, comeback bonus, init schedule
        if (my.isFirstTimeLoadState) {
            ScheduleManager.startTimer();


            /* Check spin when login */
            //ComebackBonus - waiting for new API
            if (!LobbyUserData.dataTutorial.isCanPlayTutorial) {
                if (!my.showComebackBonusPopup()) {
                    my.checkAndShowPopupBonus();
                }
            }
            //my.checkAndShowPopupBonus();
            //my.repair4ShowSpin();
            ScheduleManager.initScheduleShowNewRecentWinner(my);

            if (LobbyConfig.isTestAlgorithmMode) {
                if (Lobby.Utils.objectIsNull(LobbyConfig.durationFromLastCollectBonusHours)) {
                    LobbyConfig.durationFromLastCollectBonusHours = 0;
                }
                if (Lobby.Utils.objectIsNull(LobbyConfig.durationFromLastWatchVideo)) {
                    LobbyConfig.durationFromLastWatchVideo = 0;
                }
                Manager4DebugTestAlgorithm.addDebug2Log("DOMAIN:" + LobbyConfig.AppDomain);
                var log = "User id:" + my._userData.profile.id;
                console.log(log);
                Manager4DebugTestAlgorithm.addDebug2Log(log);
                LobbyConfig.numberOfCollectBonusHour = 0;
                LobbyConfig.totalCoinOfCollectBonusHour = 0;
                LobbyConfig.totalCoinOfCollectBonusHourWithoutReset = 0;
                LobbyConfig.numberOfCollectAchivement = 0;
                LobbyConfig.achievementCollectedName = [];
                LobbyConfig.totalCoinOfCollectAchivement = 0;
                LobbyConfig.totalCrownOfCollectAchivement = 0;
                LobbyConfig.tsDoNothing = 0;
                LobbyConfig.tsDoNothingSimulate = 0;
                LobbyConfig.tsWatchVideo = 0;
                //Manager4DebugTestAlgorithm.initScheduleGetAndCollectAchievement4Test(my);
                //Manager4DebugTestAlgorithm.initScheduleCollectFreeCoinGift4Test(my);
                //Manager4DebugTestAlgorithm.initScheduleCollectVideoCoinForTest(my);
                //Manager4DebugTestAlgorithm.initGetDailyBonus4Test(my);
                LobbyRequest.User.finishTutorial(function (isSuccess, data) {
                });
                Manager4DebugTestAlgorithm.startSimulateStrategy(my, function(){
                    if (LobbyConfig.isAutoTest === true) {
                        if (LobbyConfig.testGame && my.getSlotCellByName(LobbyConfig.testGame).gameData.is_unlocked) {
                            my.showGame(LobbyConfig.testGame);
                        } else {
                            my.showGame("nezha");
                        }
                    }
                });
            }

            ////Dat cai timer nay khi nao tat :Problem
            //  var interValCallBack = my.time.events.loop( 1000,
            //    function () {
            //      if(my.showPopupsPromotionFromQueue() === false){
            //        //Lobby.PhaserJS
            //      }
            //  },this );

            ScheduleManager.initScheduleGetAdditionalInfo(my);
            ScheduleManager.initScheduleGetRealTimeNotification(my);

        }
    };

    if (LobbyConfig.isDebug) {
        my.render = function () {
            my.game.debug.text("FPS:" + my.time.fps || '--', 2, 14, "#00ff00");
        };
        my.preload = function () {
            my.time.advancedTiming = true;
        };
    }

    /**
     * setup adcolony
     */
    my.adcolonySetupEvents = function () {
        ManagerForAdvertise.setup(my);
    };

    /**
     * show popup which body 'We are working hard to port this function'
     * @param title: title of popup
     */
    my.showUnfinishedJobMessage = function (title) {
        if (Lobby.Utils.objectIsNull(title)) {
            title = "";
        }
        my.showNotificationPopup(
            title,
            "We are working hard to port this function."
        );

    };

    /**
     * check is login with facebook?
     * @returns {boolean}
     */
    my.isLoginWithAccountFacebook = function () {
        if (my._userData.profile.role === 0) {
            return true;
        }
        return false;
    };

    /**
     * stop all scroll event
     */
    my.stopAllScrollEvent = function () {
        my.game.kineticScrolling.stop();
        my.game.pageViewMain.stop();
        my.game.pageViewInfoPopup.stop();

    };

    /**
     * return from game slot to main menu
     * @param showBannerSlot: unuse
     * @param callback: function called after change to state MainMenu
     */
    my.returnToMainMenu = function (showBannerSlot, callback) {
        if (Lobby.Utils.objectIsNull(callback)) callback = function () {
        };

        try {
            my.destroyPopupAfterSwitchState();
            my.stopAllScrollEvent();
            my.playingGame = LobbyConstant.isNotInGame;
        }
        catch (ex) {

        }
        LobbyC.MainMenu.destroyDarkLayer();
        LobbyC.MainMenu.showHeader();

        var currentState = null;
        if (my.state.current == LobbyConstant.stateName.LuckyWheel) {
            currentState = LobbyC.LuckyWheel;
        } else {
            currentState = LobbyC.GameSlot;
        }

        if (LobbyConfig.isTestStrategy && LobbyC.GameSlot.groupEditPayLine != null) LobbyC.GameSlot.groupEditPayLine.destroy();
        LobbyC.MainMenu.forceClosePopupBigWinMegaWin();
        //my.time.events.add(250, function() {
        currentState.state.start(
            "MainMenu",
            //true, // clearWorld
            LobbyConfig.isDestroyWorldFromGameSlot2MainMenu, // clearWorld
            false, // clearCache
            my._userData,
            LobbyConfig.isDestroyWorldFromMainMenu2GameSlot, // isFirstTimeLoadState
            callback
        );
    };

    /**
     * update UI from user info
     * @param data: user info
     * @param callbackFunc: callback after update
     * @param callbackLevelUp: callback level up called after run animation fly coin
     */
    my.updateUserInfoUIFromUserInfo = function (data, callbackFunc, callbackLevelUp) {
        Lobby.Utils.printConsoleLog('Call updateUserInfoUIFromUserInfo', data);
        if (data != null) {
            var previousLevel = my._userData.profile.level;

            //var previousCoin = my._userData.profile.coin;

            var previousCoin = parseFloat(Helper.Number.unFormatNumber(my._userCoinText.text));

            var coinsBonus = 0;
            var crownBonus = 0;
            var previousCrown = my._userData.profile.crown;

            my._userData.profile = data;
            var bonusCoin = my._userData.profile.coin - previousCoin;
            //Toan disable
            var currendDate = new Date();
            var dateToShowPopUp = currendDate - my._userData.profile.ts_created;
            //show popup free to play new


            //download be hide
            if (!Lobby.Utils.isWeb() && ManagerForDownloadGameSlot.enableHidedDownload) {
                for (var t = 0; t < LobbyConfig.listGameInfo.length; t++) {
                    if ((LobbyConfig.listGameInfo[t].min_level <= my._userData.profile.level + 1
                        || (LobbyConfig.listGameInfo[t].min_level - 1 === my._userData.profile.level + 1
                        && my._userData.profile.expBar >= 0.5))
                            //nam trong list available va khong la nezha
                        && LobbyConfig.availableGame.indexOf(LobbyConfig.listGameInfo[t].game_id) > 0
                        && LobbyConfig.downloadGameInfo[LobbyConfig.listGameInfo[t].game_id].isDownloaded === false
                        && LobbyConfig.downloadGameInfo[LobbyConfig.listGameInfo[t].game_id].isDownloading === false
                        && LobbyConfig.downloadGameInfo[LobbyConfig.listGameInfo[t].game_id].isDownloadingBeHide === false
                        && my.isGameSlotOnlyDownloadedBeHide(LobbyConfig.listGameInfo[t].game_id) === false) {
                        var slotGame = {};
                        slotGame.gameData = LobbyConfig.listGameInfo[t];
                        if (LobbyConfig.isDebug) console.log("downloadGameWithSlotCellBeHide: " + slotGame.gameData.game_id);
                        my.downloadGameWithSlotCellBeHide(slotGame);
                    }
                }
            }

//check show popup free to play mới
            if (my._userData.profile.coin < LobbyConstant.MINIUM_COIN_TO_SHOW_GET_COIN &&
                (my.checkPopupF2pAndP2pAppearInGame === 0 && my.playingGame === LobbyConstant.isInGame ||
                checkPopupF2pAndP2pAppearInLobby === 0 && my.playingGame === LobbyConstant.isNotInGame)) {
                LobbyRequest.User.getPurchaseAmount(function (result) {
                    if (Lobby.Utils.objectNotNull(result) &&
                        result.double === 0) {
                        //check show popup free to play mới
                        var isTriedToUnlockACrownPackageBefore
                            = Lobby.Utils.getFromLocalStorage(LobbyConstant.keyForStoringDataPopupsPromotion.triedToUnlockACrownPakageBefore + my._userData.profile.id);
                        if (Lobby.Utils.objectIsNull(isTriedToUnlockACrownPackageBefore)) {
                            Lobby.Utils.setToLocalStorage(LobbyConstant.keyForStoringDataPopupsPromotion.triedToUnlockACrownPakageBefore + my._userData.profile.id, false);
                            isTriedToUnlockACrownPackageBefore = "false";
                        }

                        if (!!JSON.parse(String(isTriedToUnlockACrownPackageBefore).toLowerCase()) === true) {

                            var numberOfShowF2PConsecutiveString =
                                Lobby.Utils.getFromLocalStorage(LobbyConstant.keyForStoringDataPopupsPromotion.numberOfShowF2PConsecutive + my._userData.profile.id);
                            var numberOfShowF2PConsecutive = 0;
                            if (Lobby.Utils.objectNotNull(numberOfShowF2PConsecutiveString)) {
                                numberOfShowF2PConsecutive = parseInt(numberOfShowF2PConsecutiveString);
                            }
                            if (numberOfShowF2PConsecutive >= 2) {
                                var tsLastShowF2PString = Lobby.Utils.getFromLocalStorage(LobbyConstant.keyForStoringDataPopupsPromotion.tsLastShowF2P + my._userData.profile.id);
                                if (Lobby.Utils.objectNotNull(tsLastShowF2PString)) {
                                    var tsLastShowF2P = parseInt(tsLastShowF2PString);
                                    var timespan = new Date() - tsLastShowF2P;
                                    var totalDays = timespan / (3600 * 24 * 1000);
                                    if (totalDays > 3.0) {
                                        numberOfShowF2PConsecutive = 0;
                                    }
                                }
                            }
                        }
                    }
                });
            }

            if (my._userData.profile.coin > LobbyConstant.MINIUM_COIN_TO_SHOW_GET_COIN)
                my.isCanShowPopupGetMoreCoin = true;
            //check show popup getmore coin mới
            // POPUP NEW SIGNUP
            if (my._userData.profile.coin < LobbyConstant.MINIUM_COIN_TO_SHOW_GET_COIN
                && my.numberOFPopupGetMoreCoinShowed < 3
                && my.isCanShowPopupGetMoreCoin === true
                && my.numberOfCurrentPopup < 1) {
                //if (my._userData.profile.facebookUID === null && LobbyUserData.checkLoginNotFacebookAccount === 0) {
                //    my.isCanShowPopupGetMoreCoin = false;
                //    my.callBackShowPopupPromotion.ShowGetMoreCoin = function(){
                //        my.showGetMoreCoinsPopup();
                //    } ;
                //    my.numberOFPopupGetMoreCoinShowed ++;
                //}
                //if (my._userData.profile.facebookUID != null && LobbyUserData.checkLoginSameDay === 0) {
                //    my.isCanShowPopupGetMoreCoin = false;
                //    my.callBackShowPopupPromotion.ShowGetMoreCoin = function(){
                //        my.showGetMoreCoinsPopup();
                //    } ;
                //    my.numberOFPopupGetMoreCoinShowed ++;
                //}
                my.isCanShowPopupGetMoreCoin = false;
            }
            if (my._userData.profile.level > previousLevel) {
                var functionCallBackCompletedCabinetClick = function(){
                    my.checkAndShowPopupFeatureUnlocked(my._userData.profile.level+1,previousLevel+1);
                };
                var levelJump = my._userData.profile.level - previousLevel;
                if (my.playingGame === LobbyConstant.isInGame) {
                    my.numberOfPopupLevelUp++;
                    var reward = Helper.Level.getCoinAndCrownBonusWhenLevelUp(previousLevel, my._userData.profile.level);
                    coinsBonus = reward.coin;
                    crownBonus = reward.crown;

                    if (Lobby.Utils.objectNotNull(LobbyC.GameSlot.userCoinBeforeCollect)) {
                        my._userCoinText.text = Lobby.Utils.formatNumberWithCommas(Math.round(LobbyC.GameSlot.userCoinBeforeCollect));
                    } else {
                        if (bonusCoin > 0) {
                            my.playAnimationCoinForHeader(bonusCoin - coinsBonus, 1000, null);
                        } else {
                            if (Lobby.Utils.objectNotNull(my._userCoinText)
                                && Lobby.Utils.objectNotNull(my.data4RewardCoinPopupLvup.coin)) {

                                var userCoin = my._userData.profile.coin - coinsBonus - my.data4RewardCoinPopupLvup.coin;
                                userCoin = userCoin > 0 ? userCoin : 0;
                                my._userCoinText.text = Lobby.Utils.formatNumberWithCommas(parseFloat(userCoin).toFixed(LobbyConfig.roundNumber));
                            } else if (Lobby.Utils.objectNotNull(my._userCoinText))

                                var userCoin = my._userData.profile.coin - coinsBonus;
                            userCoin = userCoin > 0 ? userCoin : 0;
                            my._userCoinText.text = Lobby.Utils.formatNumberWithCommas(parseFloat(userCoin).toFixed(LobbyConfig.roundNumber));
                        }
                    }
                } else {
                    my.playAnimationCoinForHeader(bonusCoin, 1000, null);
                    if (my._userData.profile.crown != previousCrown) my._userCrownText.text = Lobby.Utils.formatNumberWithCommas(my._userData.profile.crown);
                }

                //Kiet - toi doan comment out
                if (my.playingGame === LobbyConstant.isInGame) {
                    if (my.isCollectedRewardFromPopupLvUp == true) {
                        my.ListGameInfoBeforeShowListPopupLevelUp = LobbyConfig.listGameInfo;
                    }
                    var callBackAfterGetListSlotGame = function (data) {
                        my.hideLoadingAnimation();
                        var arrayGameUnlock = [];
                        Lobby.Utils.sortArrayObjectAscending(
                            data.member,
                            'min_level'
                        );
                        for (var i = 0; i < data.member.length; i++) {
                            //if (data.member[i].min_level <= my._userData.profile.level + 1
                            //    && data.member[i].min_level > previousLevel + 1 && data.member[i].premium_type === 0) {
                            //    if (data.member[i].min_crown > 0) {
                            //        var isFound = false;
                            //        for (var x = 0; x < LobbyConfig.crownGameUnlocked.length; x++) {
                            //            if (LobbyConfig.crownGameUnlocked[x].id === data.member[i].id) {
                            //                isFound = true;
                            //                break;
                            //            }
                            //        }
                            //        if (!isFound)  arrayGameUnlock.push(data.member[i]);
                            //    }
                            //    else arrayGameUnlock.push(data.member[i]);
                            if (data.member[i].min_level <= my._userData.profile.level + 1
                                && data.member[i].premium_type === 0
                                && my.ListGameInfoBeforeShowListPopupLevelUp[i].is_unlocked === false
                                && data.member[i].is_unlocked === true) {
                                if (data.member[i].min_crown > 0) {
                                    var isFound = false;
                                    for (var x = 0; x < LobbyConfig.crownGameUnlocked.length; x++) {
                                        if (LobbyConfig.crownGameUnlocked[x].id === data.member[i].id) {
                                            isFound = true;
                                            break;
                                        }
                                    }
                                    if (!isFound)  arrayGameUnlock.push(data.member[i]);
                                }
                                else arrayGameUnlock.push(data.member[i]);
                            }
                        }
                        Lobby.Utils.printConsoleLog('List slot game unlock ', arrayGameUnlock);

                        if (my.playingGame === LobbyConstant.isInGame) {
                            //if (my.isCollectedRewardFromPopupLvUp === true)
                            //    my.reloadHeader(false);

                            if (arrayGameUnlock != null
                                && arrayGameUnlock.length > 0) {
                                var gameUnlock = arrayGameUnlock[0];
                                my.showUnlockCabinetPopupNew(
                                    my._userData.profile.name,
                                    my._userData.profile.level,
                                    gameUnlock, arrayGameUnlock,
                                    functionCallBackCompletedCabinetClick
                                );
                            }else{
                                functionCallBackCompletedCabinetClick();
                            }
                        }
                        else {
                            my.reloadHeader(false);
                            if (arrayGameUnlock != null
                                && arrayGameUnlock.length > 0) {
                                var gameUnlock = arrayGameUnlock[0];
                                my.showUnlockCabinetPopupNew(
                                    my._userData.profile.name,
                                    my._userData.profile.level,
                                    gameUnlock, arrayGameUnlock,
                                    functionCallBackCompletedCabinetClick
                                );
                            }else{
                                functionCallBackCompletedCabinetClick();
                            }
                        }
                    };
                    var callBackAfterClickCollectPopupLevelUp = function () {
                        LobbyRequest.User.getListSlotsGameAndProcessData(
                            function (data) {
                                callBackAfterGetListSlotGame(data);
                            },
                            my,
                            true,
                            function () {
                                callBackAfterClickCollectPopupLevelUp();
                            }
                        );
                    };
                    LobbyC.GameSlot.getCurrentGame().s_oGame.getFooter().reloadArrayBet();
                    my.showLevelUpNotificationPopup(
                        my._userData.profile.name,
                        previousLevel,
                        levelJump,
                        function () {
                            callBackAfterClickCollectPopupLevelUp();
                            //my.playAllAnimationCoinAndUpdateHeader(coinsBonus, 2000, function () {
                            //    if (Lobby.Utils.objectNotNull(callbackLevelUp)) {
                            //        callbackLevelUp();
                            //    }
                            //});
                        },
                        coinsBonus,
                        crownBonus,
                        callbackLevelUp
                    );
                } else {
                    LobbyRequest.User.getListSlotsGameAndProcessData(
                        function (data) {
                            my.hideLoadingAnimation();
                            var arrayGameUnlock = [];
                            Lobby.Utils.sortArrayObjectAscending(
                                data.member,
                                'min_level'
                            );
                            for (var i = 0; i < data.member.length; i++) {
                                if (data.member[i].min_level <= my._userData.profile.level + 1
                                    && data.member[i].min_level > previousLevel + 1 && data.member[i].premium_type === 0) {
                                    if (data.member[i].min_crown > 0) {
                                        var isFound = false;
                                        for (var x = 0; x < LobbyConfig.crownGameUnlocked.length; x++) {
                                            if (LobbyConfig.crownGameUnlocked[x].id === data.member[i].id) {
                                                isFound = true;
                                                break;
                                            }
                                        }
                                        if (!isFound)  arrayGameUnlock.push(data.member[i]);
                                    }
                                    else arrayGameUnlock.push(data.member[i]);
                                }
                            }
                            Lobby.Utils.printConsoleLog('List slot game unlock ', arrayGameUnlock);
                            my.reloadHeader(false);
                            if (arrayGameUnlock != null
                                && arrayGameUnlock.length > 0) {
                                var gameUnlock = arrayGameUnlock[0];
                                my.showUnlockCabinetPopupNew(
                                    my._userData.profile.name,
                                    my._userData.profile.level,
                                    gameUnlock, arrayGameUnlock,
                                    functionCallBackCompletedCabinetClick
                                );
                            }else{
                                functionCallBackCompletedCabinetClick()
                            }
                        },
                        my,
                        true);
                }
                //Kiet-end
            }
            var runCB = false;
            //my._userLevelText.text = "Lv." + Lobby.Utils.formatNumberWithCommas(my._userData.profile.level + 1);
            //my._userCoinText.text = Lobby.Utils.formatNumberWithCommas(parseFloat(my._userData.profile.coin).toFixed(LobbyConfig.roundNumber));
            if (my._userData.profile.level === previousLevel
                && my.isCollectedRewardFromPopupLvUp === true) {
                if (my._userData.profile.coin - previousCoin > 5) {
                    if (LobbyUserData.dataTutorial.isPlayingTutorial === false
                        || LobbyUserData.dataTutorial.currentStep > LobbyConstant.Constant4Tutorial.StepPickGame) {
                        runCB = true;
                        my.playAnimationCoinForHeader(bonusCoin - coinsBonus, 1000, function () {
                            my.reloadHeader(false);
                            if (!Lobby.Utils.objectIsNull(callbackFunc)) {
                                callbackFunc();
                                callbackFunc = null;
                            }
                        });
                    }
                } else {
                    if (LobbyUserData.dataTutorial.isPlayingTutorial === false
                        || LobbyUserData.dataTutorial.currentStep === LobbyConstant.Constant4Tutorial.StepSpin) {
                        if (Lobby.Utils.objectNotNull(my._userCoinText))
                            var userCoin = my._userData.profile.coin - coinsBonus;
                        userCoin = userCoin > 0 ? userCoin : 0;
                        my._userCoinText.text = Lobby.Utils.formatNumberWithCommas(parseFloat(userCoin).toFixed(LobbyConfig.roundNumber));
                        if (previousLevel === my._userData.profile.level) my.reloadHeader(false);
                    }
                }
                if (my._userData.profile.crown != previousCrown) my._userCrownText.text = Lobby.Utils.formatNumberWithCommas(my._userData.profile.crown);
            }
            my.level.text = my._userData.profile.level + 1;
            my._levelBar.width = my._levelBarMaxWidth * my._userData.profile.expBar;
            my.levelBarText.text = Math.floor(my._userData.profile.expBar * 100) + "%";

            //if (my._userData.profile.role === 2) {
            //    my._hideVip = true;
            //    my._userVipBorder.alpha = 0;
            //    my._userVipIcon.alpha = 0;
            //    my._userVipBackGround.alpha = 0;
            //}
            //else {
            //    if (my._userData.profile.type > 0) {
            //        my._hideVip = false;
            //        my._userVipBorder.alpha = 1;
            //        my._userVipIcon.alpha = 1;
            //        Lobby.PhaserJS.tryLoadTexture(my._userVipBorder, 'header-v5-vip-border-' + my._userData.profile.type, my);
            //        Lobby.PhaserJS.tryLoadTexture(my._userVipIcon, 'header-v5-vip-icon-' + my._userData.profile.type, my);
            //        for (var index = 0; index < my._footerGroupItems.children.length; ++index) {
            //            var item = my._footerGroupItems.children[index];
            //            if (item.isCurrentUser) {
            //                for (var i = 0; i < item.children.length; i++) {
            //                    var child = item.children[i];
            //                    if (i === 4) {
            //                        child.text = Lobby.Utils.formatCoinNumber(my._userData.profile.coin);
            //                    }
            //                    if (my._userData.profile.facebookUID != "") {
            //                        if (child.key.startsWith("footer-background-friend")
            //                            || child.key.startsWith("footer-vip-bg")) {
            //                            Lobby.PhaserJS.tryLoadTexture(child, 'footer-vip-bg-' + my._userData.profile.type, my);
            //                            child.alpha = 1;
            //                        }
            //                        if (child.key.startsWith("footer-vip-border")) {
            //                            Lobby.PhaserJS.tryLoadTexture(child, 'footer-vip-border-' + my._userData.profile.type, my);
            //                            child.alpha = 1;
            //                        }
            //                    }
            //                }
            //            }
            //        }
            //    }
            //    else {
            //        my._hideVip = true;
            //        my._userVipBorder.alpha = 0;
            //        my._userVipIcon.alpha = 0;
            //        my._userVipBackGround.alpha = 0;
            //    }
            //}
        }
        //else {
        //    my.showServerErroPopup(function () {
        //        my.updateUserInfoFromSV(null, null);
        //    });
        //    //location.reload(true);
        //}
        if (!runCB && callbackFunc != null && callbackFunc != undefined) {
            callbackFunc(data != null);
        }
    };

    /**
     * update UI from user info and run animation fly coin
     * @param data: user info
     * @param callbackFunc: callback after run animation fly coin
     * @param isShowCoin: is reload coin?
     * @param pos: first pos to run animation fly coin
     */
    my.updateUserInfoUIFromUserInfoAndShowCoinAnimation = function (data, callbackFunc, isShowCoin, pos) {
        Lobby.Utils.printConsoleLog('Call updateUserInfoUIFromUserInfoAndShowCoinAnimation', data);
        var isShowLevelPopup = false;
        if (Lobby.Utils.objectIsNull(isShowCoin)) {
            isShowCoin = false;
        }
        if (data != null) {
            var previousLevel = my._userData.profile.level;
            var previousCoin = my._userData.profile.coin;
            var previousCrown = my._userData.profile.crown;
            my._userData.profile = data;
            //Toan disable
            var currentDate = new Date();
            var dateToShowPopUp = currentDate - my._userData.profile.ts_created;
            //if ((my._userData.profile.coin < 10000) && (dateToShowPopUp > 3 * 86400 * 1000)) {
            //    if (my._userData.profile.purchase_amount === 0) {
            //        if (checkPopupF2pAndP2pAppearInLobby === 0) {
            //            my.callBackShowPopupPromotion.ShowFreeToPlay = function(){
            //                my.showF2PPopup();
            //            };
            //            checkPopupF2pAndP2pAppearInLobby = 1;
            //        }
            //    }
            //    else {
            //        if (checkPopupF2pAndP2pAppearInLobby === 0) {
            //            my.callBackShowPopupPromotion.ShowPayToPlay = function(){
            //                my.showP2PPopup();
            //            };
            //            checkPopupF2pAndP2pAppearInLobby = 1;
            //        }
            //    }
            //}
            if (isShowLevelPopup && my._userData.profile.level > previousLevel) {
                LobbyRequest.User.getListSlotsGame(
                    function (data) {
                        my.hideLoadingAnimation();
                        var arrayGameUnlock = [];
                        Lobby.Utils.sortArrayObjectAscending(
                            data.member,
                            'min_level'
                        );
                        for (var i = 0; i < data.member.length; i++) {
                            if (data.member[i].min_level === my._userData.profile.level) {
                                arrayGameUnlock.push(data.member[i]);
                            }
                        }
                        Lobby.Utils.printConsoleLog('List slot game unlock ', arrayGameUnlock);
                        var functionCallBackCompletedCabinetClick = function(){
                            my.checkAndShowPopupFeatureUnlocked(my._userData.profile.level+1,previousLevel+1);
                        };
                        my.showLevelUpNotificationPopup(
                            my._userData.profile.name,
                            my._userData.profile.level,
                            my._userData.profile.level - previousLevel,
                            function () {
                                my.reloadHeader(false);

                                if (arrayGameUnlock != null
                                    && arrayGameUnlock.length > 0) {
                                    var gameUnlock = arrayGameUnlock[0];
                                    my.showUnlockCabinetPopupNew(
                                        my._userData.profile.name,
                                        my._userData.profile.level,
                                        gameUnlock, arrayGameUnlock,
                                        functionCallBackCompletedCabinetClick
                                    );
                                }else{
                                    functionCallBackCompletedCabinetClick();
                                }
                            }
                        );
                    }, my
                );
            }
            //my._userLevelText.text = "Lv." + Lobby.Utils.formatNumberWithCommas(my._userData.profile.level + 1);
            //my._userCoinText.text = Lobby.Utils.formatNumberWithCommas(parseFloat(my._userData.profile.coin).toFixed(LobbyConfig.roundNumber));
            if (isShowCoin) {
                if (previousCrown < my._userData.profile.crown) {
                    my.playAnimationFlyingCrown(pos);
                }
                else if (my._userData.profile.coin > previousCoin) {
                    var bonusCoin = my._userData.profile.coin - previousCoin;
                    my.playAllAnimationCoinAndUpdateHeader(bonusCoin, 2000, null, pos);
                }
            } else {
                var userCoin = my._userData.profile.coin;
                my._userData.profile.coin = userCoin > 0 ? userCoin : 0;
                my._userCoinText.text = Lobby.Utils.formatNumberWithCommas(parseFloat(my._userData.profile.coin).toFixed(LobbyConfig.roundNumber));
            }
            my._levelBar.width = my._levelBarMaxWidth * my._userData.profile.expBar;
            //if (my._userData.profile.role === 2) {
            //    my._hideVip = true;
            //    my._userVipBorder.alpha = 0;
            //    my._userVipIcon.alpha = 0;
            //    my._userVipBackGround.alpha = 0;
            //}
            //else {
            //    if (my._userData.profile.type > 0) {
            //        my._hideVip = false;
            //        my._userVipBorder.alpha = 1;
            //        my._userVipIcon.alpha = 1;
            //        Lobby.PhaserJS.tryLoadTexture(my._userVipBorder, 'header-v5-vip-border-' + my._userData.profile.type, my);
            //        Lobby.PhaserJS.tryLoadTexture(my._userVipIcon, 'header-v5-vip-icon-' + my._userData.profile.type, my);
            //        for (var index = 0; index < my._footerGroupItems.children.length; ++index) {
            //            var item = my._footerGroupItems.children[index];
            //            if (item.isCurrentUser) {
            //                for (var i = 0; i < item.children.length; i++) {
            //                    var child = item.children[i];
            //                    if (i === 4) {
            //                        child.text = Lobby.Utils.formatCoinNumber(my._userData.profile.coin);
            //                    }
            //                    if (my._userData.profile.facebookUID != "") {
            //                        if (child.key.startsWith("footer-background-friend")
            //                            || child.key.startsWith("footer-vip-bg")) {
            //                            Lobby.PhaserJS.tryLoadTexture(child, 'footer-vip-bg-' + my._userData.profile.type, my);
            //                            child.alpha = 1;
            //                        }
            //                        if (child.key.startsWith("footer-vip-border")) {
            //                            Lobby.PhaserJS.tryLoadTexture(child, 'footer-vip-border-' + my._userData.profile.type, my);
            //                            child.alpha = 1;
            //                        }
            //                    }
            //                }
            //            }
            //        }
            //    }
            //    else {
            //        my._hideVip = true;
            //        my._userVipBorder.alpha = 0;
            //        my._userVipIcon.alpha = 0;
            //        my._userVipBackGround.alpha = 0;
            //    }
            //}
        }
        //else {
        //    my.showServerErroPopup(function () {
        //        my.updateUserInfoFromSVWithCoinAnim(callbackFunc, pos);
        //    });
        //}
        if (callbackFunc != null && callbackFunc != undefined) {
            callbackFunc(data != null);
        }
    };

    /**
     * update UI header when in game slot
     * @param data: user info
     * @param callbackFunc: callback after update
     */
    my.updateHeaderProfileFromInGame = function (data, callbackFunc) {
        Lobby.Utils.printConsoleLog('Call updateHeaderProfileFromInGame', data);

        if (data != null) {
            var previousLevel = my._userData.profile.level;
            my._userData.profile = data;
            if (my._userData.profile.level > previousLevel) {
                var reward = Helper.Level.getCoinAndCrownBonusWhenLevelUp(previousLevel, my._userData.profile.level);
                var functionCallBackCompletedCabinetClick = function(){
                    my.checkAndShowPopupFeatureUnlocked(my._userData.profile.level+1,previousLevel+1);
                };
                LobbyRequest.User.getListSlotsGame(
                    function (data) {
                        my.hideLoadingAnimation();
                        var arrayGameUnlock = [];
                        for (var i = 0; i < data.member.length; i++) {
                            if (data.member[i].min_level <= my._userData.profile.level + 1
                                && data.member[i].min_level > previousLevel + 1 && data.member[i].premium_type === 0) {
                                if (data.member[i].min_crown > 0) {
                                    var isFound = false;
                                    for (var x = 0; x < LobbyConfig.crownGameUnlocked.length; x++) {
                                        if (LobbyConfig.crownGameUnlocked[x].id === data.member[i].id) {
                                            isFound = true;
                                            break;
                                        }
                                    }
                                    if (!isFound)  arrayGameUnlock.push(data.member[i]);
                                }
                                else arrayGameUnlock.push(data.member[i]);
                            }
                        }
                        Lobby.Utils.printConsoleLog('List slot game unlock ', arrayGameUnlock);
                        my.showPopupLevelUp(previousLevel, my._userData.profile.level, reward.coin, reward.crown, function () {
                            if (callbackFunc != null && callbackFunc != undefined) {
                                callbackFunc(data != null);
                            }
                        }, function () {
                            if (arrayGameUnlock != null
                                && arrayGameUnlock.length > 0) {
                                var gameUnlock = arrayGameUnlock[0];
                                my.showUnlockCabinetPopupNew(
                                    my._userData.profile.name,
                                    my._userData.profile.level,
                                    gameUnlock, arrayGameUnlock,
                                    functionCallBackCompletedCabinetClick
                                );
                            }else{
                                functionCallBackCompletedCabinetClick();
                            }
                        });
                    }, my
                );
            }
        }
        else {
            //my.showServerErroPopup();

        }

    };

    /**
     * update user info from server
     * @param callbackFunc
     * @param callbackLevelUp
     * @param isGetStatisticData
     */
    my.updateUserInfoFromSV = function (callbackFunc, callbackLevelUp, isGetStatisticData) {
        Manager4MyUserInfo.getMyUserInfoFromSV(
            function (data) {
                my.updateUserInfoUIFromUserInfo(
                    data,
                    callbackFunc,
                    callbackLevelUp
                );
            },
            my,
            isGetStatisticData
        );
    };

    /**
     * update user info from local
     * @param callbackFunc
     * @param callbackLevelUp
     */
    my.updateUserInfoUIFromLocal = function (callbackFunc, callbackLevelUp) {
        my.updateUserInfoUIFromUserInfo(
            my._userData.profile,
            callbackFunc,
            callbackLevelUp);
    };

    /**
     * reload profile by call to server
     * @param callbackFunc
     */
    my.reloadProfileInGame = function (callbackFunc) {
        Manager4MyUserInfo.getMyUserInfoFromSV(
            function (data) {
                my.updateHeaderProfileFromInGame(
                    data,
                    callbackFunc
                );
            },
            my
        );
    };

    /**
     * update user info by call to server and run update UI and show anmation fly coin function
     * @param callbackFunc: callback after update UI
     * @param pos: start pos for animation fly coin
     */
    my.updateUserInfoFromSVWithCoinAnim = function (callbackFunc, pos) {
        if (Lobby.Utils.objectIsNull(pos)) {
            pos = null;
        }
        Manager4MyUserInfo.getMyUserInfoFromSV(
            function (data) {
                my.updateUserInfoUIFromUserInfoAndShowCoinAnimation(
                    data,
                    callbackFunc,
                    true,
                    pos
                );
            },
            my
        );
    };

    /**
     * create a new loader
     */
    my.initCustomLoader = function () {
        my.loader = new Phaser.Loader(my);
        my.loader.crossOrigin = "Anonymous";
    };

    /**
     * prepare for show game
     * @param isTexasMahjong: is texasmahjong game
     */
    my.prepare4ShowingGame = function (isTexasMahjong) {
        my.playingGame = LobbyConstant.isInGame;
        my.btnFriend.visible = false;
        my.btnInfo.visible = true;
        if (Lobby.Utils.objectNotNull(isTexasMahjong) && isTexasMahjong) {
            document.body.style.background = "#000000";
        }
        my.hideRecentWinnerGroup();
    };

    /**
     * prepare for hide game
     * @param isToggleMusic: unuse
     */
    my.prepare4HidingGame = function (isToggleMusic) {
        my.playingGame = LobbyConstant.isNotInGame;
        my.numberOfCurrentPopup = 0;
        if (Lobby.Utils.objectNotNull(my.uiBody)) {
            my.uiBody.visible = true;
        }
        my.uiFooter.visible = true;
        my.canDisableGame = false;
        //window.groupUILoading.visible = true;
        //window.loadingViewInitSession.visible = true;
        document.body.style.background = "#333333";
        //my._headerMask.visible = true;
        //document.body.style.background = "#000000";
        my.toggleGameMusic();
        var lobbygame = $("#lobbygame");
        lobbygame.css("pointer-events", "all");
        my.showRecentWinnerGroup();
    };

    /**
     * load dark layer, loading animation, init product, init music
     */
    my.loadMiscItem = function () {
        my._darkLayer = my.add.sprite(0, 0, "popup-dark-layer-login-state");
        my._darkLayer.position.y -= ManagerForScale.doubleIncrementHeight();
        my._darkLayer.scale.setTo(1, 1.5);
        my._darkLayer.alpha = 0.75;
        my._darkLayer.inputEnabled = true;
        my._darkLayer.events.onInputDown.add(
            function () {
            },
            this
        );
        my._transparentLayer = my.add.sprite(0, 0, "popup-transparent-layer");
        my._transparentLayer.inputEnabled = true;
        my._transparentLayer.events.onInputDown.add(function () {
        }, my);
        my._loadingIcon = my.add.sprite(0, 0, "popup-loading-icon");
        Lobby.PhaserJS.centerWorld(my._loadingIcon);
        my._loadingIcon.animations.add('loading-icon-anm', Lobby.PhaserJS.getSpriteSheetIndexArray(0, 10), false);
        my._loadingIcon.animations.play("loading-icon-anm", 100, true, false);
        my.loadingSettingFromLocalStorage();
        MusicManager.initBackgroundMusic(my, my.game, "mini-background-music", 'sound/background.mp3');
        //ManagerForEvent.init(my);
        if (!Lobby.Utils.isIOS()
            && ManagerForPurchase.WasInitPurchase() === false)
            ManagerForPurchase.initProduct(my);


        //my._coinDropSound = ManagerForSound.getSound(my,'coin-drop-sound');
        //my._popUpSound = ManagerForSound.getSound(my,'popup-sound');
        //my._spinSound = ManagerForSound.getSound(my,'spin-sound');
        //my._soundHoverGameInLobby = ManagerForSound.getSound(my,'sound-hover-game-lobby');
        //my._soundIncreaseCoinText = ManagerForSound.getSound(my,'increase-coin-text');
        //my._soundCoinAnimation = ManagerForSound.getSound(my,'animation-receive-coin');
        //my._soundCoinCrownPurchase = ManagerForSound.getSound(my,'coin-crown-purchase');
        var groupUIInit = my.add.group();
        Lobby.PhaserJS.scaleGroupForOptimize(groupUIInit, false);
        //groupUIInit.scale.setTo(LobbyConfig.scaleRatioEntireGame);
        //ManagerForScale.reposition(groupUIInit);
        groupUIInit.add(my._darkLayer);
        groupUIInit.add(my._transparentLayer);
        groupUIInit.add(my._loadingIcon);
        //groupUIInit.visible = false;
        window.groupUILoading = groupUIInit;
        my.groupUILoading = groupUIInit;
        window.groupUILoading.visible = false;
    };

    /**
     * clear data and logout
     * @param isSwitchToFacebook: is from popup switch to facebook?
     */
    my.clearDataAndLogOut = function (isSwitchToFacebook) {
        my.isLogOut = true;
        my.destroyPopupAfterSwitchState();
        if (my.magicItem) {
            my.magicItem.destroyAll();
        }
        if (Lobby.Utils.objectNotNull(my.popupHtml)) {
            my.popupHtml.hideAllPopupCss();
        }
        Manager4MyUserInfo.resetUserData();
        //reset tutorial
        LobbyUserData.dataTutorial = {
            name: "",
            isCanGetPreRewardTutorial: false,
            isCanPlayTutorial: false,
            isCanSpinTutorial: false,
            currentStep: 0,
            isPlayingTutorial: false,
            isFirstLogin: 0,
            isCreateUserFromThisDevice: 0,
            infoSpin: "",
            isClickSpin: false,
            isCompleteSuccessTutorialRequest: 0
        };

        my.isCompleteFirstTimeLoadFriend = false;
        my.isFirstTimeClickShowPopupFriend = false;
        LobbyC.Login.wasShowSpecialOffer = false;
        try {
            if (my.playingGame === LobbyConstant.isInGame) {
                LobbyC.GameSlot.clearDataAndReturnToLobby();
            }
            if (Lobby.Utils.objectNotNull(my.pauseBackgroundMusic)) {
                my.pauseBackgroundMusic();
            }
        } catch (exception) {
            Lobby.Utils.printConsoleLog(exception);
        }
        if (my.freeCoinInterval != null) Lobby.PhaserJS.clearInterval(my.freeCoinInterval);
        if (Lobby.Utils.objectNotNull(my.booster) && my.booster.interval != null) Lobby.PhaserJS.clearInterval(my.booster.interval);
        ManagerForDownloadGameSlot.downloader.cancelAllDownload(null, true);
        //Lobby.Utils.reloadGame();
        if (isSwitchToFacebook === true) {
            LobbyConfig.isFb = true;
            LobbyConfig.loginFrom = "fb";
            my.game.state.start(
                "InitSession",
                true, // clearWorld
                false // clearCache
            );
        } else {
            if (LobbyConfig.enableLoginHtml) {
                LobbyC.Login.LoginHtml.goBackToLoginFromGame();
            }
            else my.game.state.start(
                "Login",
                true, // clearWorld
                false // clearCache
            );
        }
    };

    /**
     * load setting from local storage
     */
    my.loadingSettingFromLocalStorage = function () {
        var backGroundMusic = Lobby.Utils.getFromLocalStorage("backgroundMusic");
        if (backGroundMusic === null) {
            Lobby.Utils.setToLocalStorage("backgroundMusic", "1");
            my._userSetting.backgroundMusic = "1";
        } else {
            my._userSetting.backgroundMusic = backGroundMusic;
        }

        var soundEffectPref = Lobby.Utils.getFromLocalStorage("soundEffect");

        if (soundEffectPref === null) {
            Lobby.Utils.setToLocalStorage("soundEffect", "1");
        }
        else {
            my._userSetting.soundEffect = soundEffectPref;
        }

        var friendRequest = Lobby.Utils.getFromLocalStorage("friendRequest");

        if (friendRequest === null) {
            Lobby.Utils.setToLocalStorage("friendRequest", "1");
        }
        else {
            my._userSetting.friendRequest = friendRequest;
        }

        var imageQuality = Lobby.Utils.getFromLocalStorage("imageQuality");

        if (imageQuality === null) {
            Lobby.Utils.setToLocalStorage("imageQuality", "1");
        }
        else {
            my._userSetting.imageQuality = imageQuality;
        }
        //Lobby.Utils.printConsoleLog('Final Setting: ', my._userSetting);
    };

    /**
     * pause background music
     */
    my.pauseBackgroundMusic = function () {
        MusicManager.stopBackgroundMusic(my);
    };

    /**
     * resume background music
     */
    my.resumeBackGroundMusic = function () {
        MusicManager.playBackgroundMusic(my);
    };

    /**
     * play background music
     */
    my.playBackgroundMusic = function () {
        my.loadingSettingFromLocalStorage();
        if (my._userSetting.backgroundMusic === "1") {
            MusicManager.playBackgroundMusic(my);
        }
    };

    /**
     * toggle music game, mean if game music is playng, it will stop and vice serva
     */
    my.toggleGameMusic = function () {
        if (my.canDisableGame) {
            MusicManager.stopBackgroundMusic(my);
        }
        else {
            my.playBackgroundMusic();
        }
    };

    /**
     * play sound coin drop
     */
    my.playCoinDropSound = function () {
        my.loadingSettingFromLocalStorage();
        if (my._userSetting.soundEffect === "1") {
            ManagerForSound.play(my, 'coin-drop-sound');
        }
    };

    /**
     * play popup sound
     */
    my.playPopUpSound = function () {
        my.loadingSettingFromLocalStorage();
        if (my._userSetting.soundEffect === "1") {
            //my._popUpSound.play();
            ManagerForSound.play(my, 'popup-sound');
        }
    };

    /**
     * play spin sound
     */
    my.playSpinSound = function () {
        my.loadingSettingFromLocalStorage();
        if (my._userSetting.soundEffect === "1") {
            //my._spinSound.play();
            ManagerForSound.play(my, 'spin-sound');
        }
    };

    /**
     * play hover game in lobby sound
     */
    my.playHoverGameInLobbySound = function () {
        my.loadingSettingFromLocalStorage();
        if (my._userSetting.soundEffect === "1") {
            //my._soundHoverGameInLobby.play();
            ManagerForSound.play(my, 'sound-hover-game-lobby');
        }
    };

    /**
     * fix coin profile
     */
    my.roundMoney = function () {
        if (my._userData.profile != null) {
            //my._userData.profile.coin = parseFloat((my._userData.profile.coin).toFixed(LobbyConfig.roundNumber));

            my._userData.profile.coin = Math.round(my._userData.profile.coin);
            var userCoin = my._userData.profile.coin;
            my._userData.profile.coin = userCoin > 0 ? userCoin : 0;
        }
    };

    //my.createCoinAnimation = function () {
    //    var emitter;
    //    var start = {
    //        x: LobbyConfig.width / 2 + 30,
    //        y: LobbyConfig.height - 120,
    //        timeAnimation: 2000
    //    };
    //    /**
    //     * Params :
    //     * @numObjects
    //     * @positions X
    //     * @positions Y
    //     */
    //    emitter = my.add.emitter(start.x, start.y, 30);
    //    emitter.makeParticles('dog-coin');
    //    emitter.setXSpeed(-125, -125);
    //    emitter.setYSpeed(90, 120);
    //    emitter.bringToTop = true;
    //    emitter.setRotation(1, 2);
    //    emitter.setAlpha(0.8, 1, 500);
    //    emitter.setScale(1, 1, 1, 1, 4000);
    //    emitter.gravity = -1000;
    //
    //    emitter.start(false, start.timeAnimation, 50);
    //    emitter.emitX = start.x - 100;
    //
    //    my.add.tween(emitter).to({emitX: 0, emitY: 100},
    //        10000, Phaser.Easing.Back.InOut, false, 0, Number.MAX_VALUE, false)
    //        .interpolation(Phaser.Math.bezierInterpolation);
    //
    //  my.time.events.loop( start.timeAnimation,
    //    function () {
    //        emitter.on = false;
    //    }, this);
    //};

    /**
     * coin hover
     * @param start
     */
    my.coinHover = function (start) {
        my.physics.startSystem(Phaser.Physics.ARCADE);
        var emitter = my.add.emitter(start.x, start.y, start.numberOfCoins);
        emitter.setScale(1, 1, 1, 1, 4000, Phaser.Easing.Sinusoidal.InOut, true);
        emitter.setAlpha(0.7, 1, 300);
        emitter.makeParticles('dog-coin');
        emitter.gravity = 500;
        emitter.setXSpeed(-50, 50);
        emitter.setYSpeed(-150, -200);
        emitter.start(false, start.countdown, null, 10);
    };

    /**
     * Return true if user ip in black list || false
     * @returns {boolean}
     */
    my.checkBlackListIp = function () {
        try {
            if (my._userData.profile.test_user) {
                Lobby.Utils.printConsoleLog("Current profile ", LobbyConfig.currentUserIp, my._userData.profile);
                return false;
            }
            var ipAddress = ipaddr.parse(LobbyConfig.currentUserIp);
            for (var key in my.blackListIp) {
                if (my.blackListIp.hasOwnProperty(key)) {
                    var blackListInfo = my.blackListIp[key];
                    var range = ipaddr.parseCIDR(blackListInfo.cidr_notation);
                    /**
                     * TODO : if blackListInfo.action=="deny"
                     */
                    if (ipAddress.match(range)) {
                        Lobby.Utils.printConsoleLog("Current user has been block", LobbyConfig.currentUserIp, my._userData.profile);
                        return true;
                    }
                }
            }
        }
        catch (ex) {
            Lobby.Utils.printConsoleLog(ex);
        }
        return false;
    };

    /**
     *  not use now
     * @returns {boolean}
     */
    my.showPopupsPromotionFromQueue = function () {
        if (my.numberOfCurrentPopup >= 1)
            return true;
        if (Lobby.Utils.objectNotNull(my.callBackShowPopupPromotion.ShowComebackBonus)) {
            my.callBackShowPopupPromotion.ShowComebackBonus();
            my.callBackShowPopupPromotion.ShowComebackBonus = null;
        } else if (Lobby.Utils.objectNotNull(my.callBackShowPopupPromotion.ShowStarterPack)) {
            my.callBackShowPopupPromotion.ShowStarterPack();
            my.callBackShowPopupPromotion.ShowStarterPack = null;
        } else if (Lobby.Utils.objectNotNull(my.callBackShowPopupPromotion.ShowDailySpin)) {
            my.callBackShowPopupPromotion.ShowDailySpin();
            my.callBackShowPopupPromotion.ShowDailySpin = null;
        } else if (Lobby.Utils.objectNotNull(my.callBackShowPopupPromotion.ShowGetMoreCoin)) {
            my.callBackShowPopupPromotion.ShowGetMoreCoin();
            my.callBackShowPopupPromotion.ShowGetMoreCoin = null;
        } else if (Lobby.Utils.objectNotNull(my.callBackShowPopupPromotion.ShowFreeToPlay)) {
            my.callBackShowPopupPromotion.ShowFreeToPlay();
            my.callBackShowPopupPromotion.ShowFreeToPlay = null;
        } else if (Lobby.Utils.objectNotNull(my.callBackShowPopupPromotion.ShowPayToPlay)) {
            my.callBackShowPopupPromotion.ShowPayToPlay();
            my.callBackShowPopupPromotion.ShowPayToPlay = null;
        } else {
            return false;
        }

        return true;
    };

    return my;
}(LobbyC.MainMenu || {}));
