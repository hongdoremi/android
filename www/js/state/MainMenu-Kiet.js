LobbyC.MainMenu = (function (my) {
    my.usdText = [];
    my.wasShowSpecialOffer = false;

    /**
     * Comeback bonus
     */
    //my.showComebackBonusPopup = function (data, callback) {
    //    if (Lobby.Utils.objectIsNull(LobbyUserData.comebackBonus)) {
    //        return false;
    //    }
    //
    //    var comebackBonusData = LobbyUserData.comebackBonus;
    //    if (comebackBonusData.user_id != my._userData.profile.id) {
    //        return false;
    //    }
    //
    //    var group = my.add.group();
    //    var background = my.add.sprite(0, 0, "popup_comeback_bonus_background", null);
    //    group.add(background);
    //
    //    my.createButtonExitPopup(group, 800, 15, null, function(){
    //        my.checkAndShowPopupBonus();
    //    });
    //
    //    var bonusCoinPerDay = my.add.text(
    //        0,
    //        240,
    //        //Lobby.Utils.formatNumberWithCommas("15000"),
    //        Lobby.Utils.formatNumberWithCommas(comebackBonusData.bonus_coin_per_day),
    //        {
    //            font: "50px PassionOne-Bold",
    //            fill: "#FFFFBF",
    //            wordWrap: true,
    //            wordWrapWidth: 400
    //        },
    //        group
    //    );
    //    bonusCoinPerDay.x = 285 - bonusCoinPerDay.width / 2;
    //    var numberOfInactiveDay = my.add.text(
    //        0,
    //        240,
    //        //Lobby.Utils.formatNumberWithCommas("50"),
    //        Lobby.Utils.formatNumberWithCommas(comebackBonusData.number_of_inactive_day),
    //        {
    //            font: "50px PassionOne-Bold",
    //            fill: "#FFFFBF",
    //            wordWrap: true,
    //            wordWrapWidth: 400
    //        },
    //        group
    //    );
    //    numberOfInactiveDay.x = background.width - 280 - numberOfInactiveDay.width / 2;
    //    var bonusCoin = my.add.text(
    //        0,
    //        395,
    //        //Lobby.Utils.formatNumberWithCommas("50000"),
    //        Lobby.Utils.formatNumberWithCommas(comebackBonusData.bonus_coin),
    //        {
    //            font: "92px PassionOne-Bold",
    //            fill: "#FFFFBF",
    //            wordWrap: true,
    //            wordWrapWidth: 400
    //        },
    //        group
    //    );
    //    bonusCoin.anchor.x = 0;
    //    bonusCoin.x = background.width / 2 - 170;
    //
    //
    //
    //    var btnCollect = my.createButtonGreenPopup(
    //        group,
    //        background.width / 2 - 140,
    //        background.height - 140,
    //        my.selectlanguage.collect.text,
    //        1,
    //        function () {
    //            LobbyRequest.User.collectComebackBonus(comebackBonusData.id,
    //                function () {
    //                    my.updateUserInfoFromSVWithCoinAnim(
    //                        function (isSuccess) {
    //                            if (isSuccess) {
    //                                my.roundMoney();
    //                            }
    //                        },
    //                        {x: LobbyConfig.width / 2, y: 650}
    //                    );
    //
    //                    if (LobbyConfig.useManagerForPopUp) {
    //                        ManagerForPopUp.forceClosePopUp(my, group);
    //                    } else {
    //                        my.closePopupWithAnimateDownNew(group);
    //                    }
    //
    //                    my.checkAndShowPopupBonus();
    //                }, my
    //            );
    //        },
    //        60
    //    );
    //
    //    Lobby.PhaserJS.centerWorld(group);
    //    Lobby.PhaserJS.centerX(btnCollect, background.width);
    //    Lobby.PhaserJS.scaleGroupForOptimize(group, true);
    //    if (LobbyConfig.useManagerForPopUp) {
    //        // pop up queue
    //        ManagerForPopUp.addPopUpToQueue(
    //            ManagerForPopUp.createPopUpData(
    //                my,
    //                group
    //            ),
    //            true // isShow
    //        );
    //    } else {
    //        my.openPopupWithAnimateUpNew(group);
    //    }
    //    return true;
    //};

    /**
     * add item to popup shop
     * @param parentGroup: group parent (coin group or crown group )
     * @param position : position of item
     * @param callback : callback after click buy button
     * @param index : index of product in group
     * @param singleObj : object product, define in LobbyConfig.CoinList and LobbyConfig.CrownList
     */
    my.addMenuShopItemNew = function (parentGroup, position, callback, index, singleObj) {
        var group = my.add.group();
        var panel = my.add.sprite(0, 0, "popup_shop_panel_item", null);
        group.add(panel);

        var coinText = my.add.text(
            0,
            30,
            //Lobby.Utils.formatNumberWithCommas("15000"),
            //Lobby.Utils.formatNumberWithCommas("$"+LobbyUserData.amountBonusF2P[0]),
            singleObj.totalCoin,
            {
                font: "54px PassionOne-Bold",
                fill: "#FFFF00",
                wordWrap: true,
                wordWrapWidth: 300
            },
            group
        );
        coinText.anchor.x = 0;
        coinText.x = 15;


        var xPercentText = 20;
        if (singleObj.percent == "FREE COINS FOR EVERYONE!") {
            xPercentText = 8;
        }
        var percentText = my.add.text(
            0,
            85,
            //Lobby.Utils.formatNumberWithCommas("15000"),
            //Lobby.Utils.formatNumberWithCommas("$"+LobbyUserData.amountBonusF2P[0]),
            singleObj.percent,
            {
                font: "27px PassionOne-Bold",
                fill: "#EACAF2",
                wordWrap: true,
                wordWrapWidth: 500
            },
            group
        );
        percentText.anchor.x = 0;
        percentText.x = xPercentText;

        var purchase = my.createButtonGreenPopup(group,
            0,
            350,
            singleObj.realMoney,
            1,
            function () {
                callback(purchase);
            },
            57);
        Lobby.PhaserJS.centerX(purchase, panel.width);
        //Lobby.PhaserJS.centerX(purchase.textBtn, panel.width);
        //var purchase = my.add.button(
        //    0, 350, 'btn-green-popup', callback, null,
        //    0, 0, 0, 0, group
        //);
        //
        //purchase.onInputDown.add(function () {
        //    my.resizeButtonAndTextAnimationScaleDown(purchase, my.usdText[index]);
        //}, this);
        //purchase.onInputOut.add(function () {
        //    my.resizeButtonAndTextAnimationScaleUp(purchase, my.usdText[index]);
        //
        //}, this);
        //purchase.onInputUp.add(function () {
        //    my.resizeButtonAndTextAnimationScaleUp(purchase, my.usdText[index]);
        //}, this);
        //
        //
        ////purchase.blendMode = PIXI.blendModes.ADD;
        //
        ////purchase.blendMode = PIXI.blendModes.ADD;
        //
        //Lobby.PhaserJS.centerX(purchase, panel.width);
        purchase.index = index;
        //
        //my.usdText[index] = my.add.text(
        //    0,
        //    365,
        //    //Lobby.Utils.formatNumberWithCommas("15000"),
        //    //Lobby.Utils.formatNumberWithCommas("$"+LobbyUserData.amountBonusF2P[0]),
        //    singleObj.realMoney,
        //    {
        //        font: "57px PassionOne-Bold",
        //        fill: "#FFFFFF",
        //        wordWrap: true,
        //        wordWrapWidth: 300
        //    },
        //    group
        //);
        //Lobby.PhaserJS.centerX(my.usdText[index], panel.width);
        //Lobby.PhaserJS.centerItemInBackground(my.usdText[index], purchase);
        //comment out to get normal tryalpay
        if (index == 7) {
            if (!Lobby.Utils.isWeb()) {
                my.popupContainer.popupShop.btnFreeCoin = purchase;
                if (window.adcolony.loadedRewardedVideoAd() == false) {
                    purchase.tint = 0x777777;
                    purchase.textBtn.tint = 0x958E8E;
                }
            }
        }

        var spriteLevelPurchase = my.add.sprite(0, 0, singleObj.spriteName);

        if (singleObj.spriteName == 'popup_shop_trial_pay') {
            spriteLevelPurchase.scale.setTo(0.8);
        }

        if (singleObj.spriteName == 'popup_shop_coins_2' ||
            singleObj.spriteName == 'popup_shop_coins_3' ||
            singleObj.spriteName == 'popup_shop_crown_2' ||
            singleObj.spriteName == 'popup_shop_crown_3') {
            spriteLevelPurchase.scale.setTo(100 / 70); // reduce image resolution 70%
        }
        spriteLevelPurchase.y = panel.height - spriteLevelPurchase.height - purchase.height - 50;
        //spriteLevelPurchase.scale.setTo(0.9, 0.9);
        Lobby.PhaserJS.centerX(spriteLevelPurchase, panel.width);
        spriteLevelPurchase.x = Math.floor(spriteLevelPurchase.x);

        if (singleObj.spriteName == 'popup_shop_trial_pay') {
            spriteLevelPurchase.x -= 40;
            var spriteBonus4Video = my.add.sprite(0, 0, "popup_shop_coins_3");
            spriteLevelPurchase.addChild(spriteBonus4Video);
            spriteBonus4Video.y += 120;
        }
        group.add(spriteLevelPurchase);

        group.position = position;
        parentGroup.add(group);
        return purchase;
    };

    /**
     * show video adcolony
     */
    my.showVideoAdcolony = function(){
       ManagerForAdvertise.showVideo(my);
    };

    /**
     * Shop popup
     */
    my.showPopupShop = function (isCrownTab) {

        //var data = {
        //    expired_time : 1000,
        //    product_amount : 1000,
        //    coin_bonus : 1000,
        //    bonus_percent : 1000,
        //};
        //my.showPopupSpecialOffer(data);
        //return;
        //my.showPopupBigWin(500000);
        //my.showPopupMegaWin(50000000);
        //return;
        //my.showNotificationPopupV2("Download","Downloading resources for "+"Deepblue" + ".\nDo you want to cancel this download?",function(){
        //    //ManagerForDownloadGameSlot.abortDownload(slotCell.gameData.game_id,null);
        //}, null,"Stop","Continue");
        //my.showNotificationPopup("","asd" + " will start downloading shortly.\n" + LobbyConstant.DOWNLOAD_PLAY_OTHER_AVAILABLE_GAME,function(){
        //    //slotCell.downloadGame(true);
        //}, null, LobbyConstant.DOWNLOAD_REMOVE_GAME, "DOWNLOAD");
        //return;
        //my.showNotificationPopup("","" + " will start downloading shortly.\n" + LobbyConstant.DOWNLOAD_PLAY_OTHER_AVAILABLE_GAME,function(){
        //    //slotCell.downloadGame();
        //}, null, LobbyConstant.DOWNLOAD_REMOVE_GAME, "DOWNLOAD");
        //my.showNotificationPopup("", "Game will start deleting shortly.", function(){
        //
        //});
        //return;
        var openPopupFunc = function () {
            var disableBtnFreeCoin = function () {
                if (my.popupContainer.popupShop != ""
                    && Lobby.Utils.objectNotNull(my.popupContainer.popupShop.btnFreeCoin)) {
                    my.popupContainer.popupShop.btnFreeCoin.tint = 0x777777;
                    my.popupContainer.popupShop.btnFreeCoin.textBtn.tint = 0x958E8E;
                }
            };
            var enableBtnFreeCoin = function () {
                if (my.popupContainer.popupShop != ""
                    && Lobby.Utils.objectNotNull(my.popupContainer.popupShop.btnFreeCoin)) {
                    my.popupContainer.popupShop.btnFreeCoin.tint = 0xFFFFFF;
                    my.popupContainer.popupShop.btnFreeCoin.textBtn.tint = 0xFFFFFF;
                }
            };
            if (!Lobby.Utils.isWeb()) {
                if (window.adcolony.loadedRewardedVideoAd() == false) {
                    disableBtnFreeCoin();
                }else{
                    enableBtnFreeCoin();
                }
            }
            if (LobbyConfig.useManagerForPopUp) {
                // pop up queue special
                var popupData = ManagerForPopUp.createPopUpData(
                    my,
                    group,
                    function () {
                        my.game.kineticScrolling.start(group.groupItemShop,
                            true,
                            false,
                            group.groupItemShop.width - 1150,
                            0,
                            0,
                            0,
                            my,
                            null,
                            null,
                            null,
                            null,
                            null,
                            {
                                minX: 226,
                                minY: 312,
                                maxX: 1350,
                                maxY: 773
                            }
                        );
                        if (Lobby.Utils.isOldSchoolDevice()) {
                            //setTimeout(function(){

                            if (isCrownTab)
                                group.gotoCrownTab(true);
                            else {
                                group.gotoCoinTab(true);
                            }

                            group.groupCoinItemShop.alpha = 0;
                            group.groupCrownItemShop.alpha = 0;
                            my.add.tween(group.groupCoinItemShop).to({alpha: 1}, 500, Phaser.Easing.Linear.None, true);
                            my.add.tween(group.groupCrownItemShop).to({alpha: 1}, 500, Phaser.Easing.Linear.None, true);

                            //}, 100);

                        } else {
                            group.groupCrownItemShop.alpha = 1;
                            group.groupCoinItemShop.alpha = 1;
                            if (isCrownTab)
                                group.gotoCrownTab(true);
                            else {
                                group.gotoCoinTab(true);
                            }
                        }
                    }
                );
                ManagerForPopUp.addPopUpToQueue(
                    popupData,
                    true // isShow
                );
            } else {
                my.openPopupWithAnimateUpNew(group, null, true, false, function () {
                    my.game.kineticScrolling.start(group.groupItemShop,
                        true,
                        false,
                        group.groupItemShop.width - 1150,
                        0,
                        0,
                        0,
                        my,
                        null,
                        null,
                        null,
                        null,
                        null,
                        {
                            minX: 226,
                            minY: 312,
                            maxX: 1350,
                            maxY: 773
                        }
                    );
                    if (Lobby.Utils.isOldSchoolDevice()) {
                        //setTimeout(function(){

                        if (isCrownTab)
                            group.gotoCrownTab(true);
                        else {
                            group.gotoCoinTab(true);
                        }

                        group.groupCoinItemShop.alpha = 0;
                        group.groupCrownItemShop.alpha = 0;
                        my.add.tween(group.groupCoinItemShop).to({alpha: 1}, 500, Phaser.Easing.Linear.None, true);
                        my.add.tween(group.groupCrownItemShop).to({alpha: 1}, 500, Phaser.Easing.Linear.None, true);

                        //}, 100);

                    } else {
                        group.groupCrownItemShop.alpha = 1;
                        group.groupCoinItemShop.alpha = 1;
                        if (isCrownTab)
                            group.gotoCrownTab(true);
                        else {
                            group.gotoCoinTab(true);
                        }
                    }
                });
            }
        };

        var group;
        if (Lobby.Utils.objectNotNull(my.popupContainer.popupShop)
            && my.popupContainer.popupShop != "") {
            group = my.popupContainer.popupShop;
            openPopupFunc();
            return;
        } else {
            group = my.add.group();
            group.name = LobbyConfig.popupName.popupShop;
            group.isPopUpShopGroup = true;
            my.popupContainer.popupShop = group;
        }

        //var group = my.add.group();
        var background = my.add.sprite(0, 0, "popup_shop_background", null);
        background.scale.setTo(100 / 70); //size hinh giam 70%

        group.add(background);


        group.position = {
            x: (LobbyConfig.width - background.width) / 2,
            y: LobbyConfig.height - background.height + 10
        };
        Lobby.PhaserJS.scaleGroupForOptimize(group, true);
        //INIT MASK
        var groupMask = my.add.group();
        group.add(groupMask);

        var groupItemShop = my.add.group();
        group.add(groupItemShop);
        group.groupItemShop = groupItemShop;

        var myMask = my.add.graphics(0, 0);
        myMask.beginFill();
        myMask.beginFill(0xFF700B);
        myMask.drawRect(background.x + 60, 250, 1130, 468);
        myMask.endFill();
        group.add(myMask);
        groupMask.add(myMask);
        groupItemShop.mask = myMask;

        myMask.alpha = 0.5;


        //INIT GROUP ITEM COINS
        var firstX = 60;
        var firstY = 250;
        var horizontalSpacing = 10;
        var panelSize = {
            width: 313,
            //width: 213,
            height: 468
        };
        var positions = [
            {
                x: firstX + (panelSize.width + horizontalSpacing) * 7,
                y: firstY
            }, {
                x: firstX + (panelSize.width + horizontalSpacing ) * 6,
                y: firstY
            }, {
                x: firstX + (panelSize.width + horizontalSpacing) * 5,
                y: firstY
            }, {
                x: firstX + (panelSize.width + horizontalSpacing) * 4,
                y: firstY
            }, {
                x: firstX + (panelSize.width + horizontalSpacing) * 3,
                y: firstY
            }, {
                x: firstX + (panelSize.width + horizontalSpacing) * 2,
                y: firstY
            }, {
                x: firstX + panelSize.width + horizontalSpacing,
                y: firstY
            }, {
                x: firstX,
                y: firstY
            }
        ];
        var buttonPurchaseClicked = function (btn) {
            if ((typeof cordova == "undefined")) return;
            //my.resizeButtonAndTextAnimation(btn,my.usdText[btn.index]);
            if (btn.index == 7) {
                //free coin
                if (btn.tint != 0x777777
                && !LobbyUserData.dataTutorial.isPlayingTutorial){
                    my.showVideoAdcolony();
                }

                //my.showUnfinishedJobMessage("Free coins");
                return;
                ////comment out to get normal tryalpay
                //AppPurchasePCControllerController.earnCredits(my._userData.profile.id, LobbyConfig.AppDomain, LobbyConfig.trialPay);
                //return;
            }
            var callBackBuy = function () {
                if (Lobby.Utils.isProduction()) {
                    ManagerForPurchase.buyItem(LobbyConfig.ProductManager.Production["P" + (btn.index + 1)]);
                } else {
                    if (cordova.platformId == "android") ManagerForPurchase.buyItem(my, LobbyConfig.ProductManager.Android["P" + (btn.index + 1)]);
                    else if (cordova.platformId == "ios")ManagerForPurchase.buyItem(my, LobbyConfig.ProductManager.IOs["P" + (btn.index + 1)]);
                }
            };

            callBackBuy();

            //if (my._userData.profile.role == 0) {
            //if (!FacebookController.isInFBCanvas()) {
            //    my.showNotificationPopup("", my.selectlanguage.popup_warning_switch_to_app_fb.text);
            //    return;
            //}
            //ManagerForPurchase.buyItem(my,LobbyConfig.ProductIdForBuyCoin[btn.index], function (isSuccess, purchaseResult, productID) {
            //    if (isSuccess) {
            //        my.reloadProfileCallbackAfterPurchase();
            //    } else {
            //        if(purchaseResult=="block_ip"){
            //            my.showNotificationPopup(
            //                "",
            //                my.selectlanguage.main_menu_not_support_region.text,
            //                function () {
            //                }
            //            );
            //        }
            //        else my.showNotificationPopup(
            //            "",
            //            my.selectlanguage.popup_shop_transaction_cancelled.text,
            //            function () {
            //            }
            //        );
            //    }
            //});
            //AppPurchasePCControllerController.purchaseItem(
            //    LobbyConfig.ProductIdForBuyCoin[btn.index],
            //    function (isSuccess, purchaseResult, productID) {
            //        if (isSuccess) {
            //            my.reloadProfileCallbackAfterPurchase();
            //        } else {
            //            if(purchaseResult=="block_ip"){
            //                my.showNotificationPopup(
            //                    "",
            //                    my.selectlanguage.main_menu_not_support_region.text,
            //                    function () {
            //                    }
            //                );
            //            }
            //            else my.showNotificationPopup(
            //                "",
            //                my.selectlanguage.popup_shop_transaction_cancelled.text,
            //                function () {
            //                }
            //            );
            //        }
            //    }
            //);
            //}
            //else {
            //    my.showNotificationPopup("", my.selectlanguage.popup_warning_switch_to_app_fb.text);
            //}
        };

        var coinListObject = LobbyConfig.CoinList;
        var count = 0;
        for (var singleObj in coinListObject) {
            if (coinListObject.hasOwnProperty(singleObj)) {
                my.addMenuShopItemNew(groupItemShop,
                    positions[count],
                    buttonPurchaseClicked,
                    count,
                    LobbyConfig.CoinList[count]);
                count++;
            }
        }

        var isRightHaveMask = true;
        var anm;
        var anmTimeDuration = 300;
        var anmFunc = function (viewIndex) {
            anm = my.add.tween(groupItemShop);
            var posX = groupItemShop.position.x;
            if ((isRightHaveMask && viewIndex < 0)
                || (!isRightHaveMask && viewIndex > 0)) {
                posX += ((panelSize.width + horizontalSpacing) * viewIndex + (panelSize.width + horizontalSpacing) * 0.5 * viewIndex);
                isRightHaveMask = !isRightHaveMask;
            } else if ((!isRightHaveMask && viewIndex < 0)
                || (isRightHaveMask && viewIndex > 0)) {
                posX += (panelSize.width + horizontalSpacing) * viewIndex;
            }
            if (posX >= 0) {
                btnLeft.visible = false;
                posX = 0;
            } else if (posX <= -(panelSize.width + horizontalSpacing) * 4) {
                btnRight.visible = false;
                posX = (panelSize.width + horizontalSpacing) * 4 * viewIndex + (panelSize.width + horizontalSpacing) * 0.5 * viewIndex;
            }
            anm.to(
                {x: posX},
                anmTimeDuration, Phaser.Easing.Linear.None
            );
            anm.start();
        };

        var rightClick = function () {
            anmFunc(-1);
            btnLeft.visible = true;
        };
        var leftClick = function () {
            anmFunc(1);
            btnRight.visible = true;
        };

        //my.game.kineticScrolling.start(groupItemShop,
        //    true,
        //    false,
        //    groupItemShop.width - 1150,
        //    0,
        //    0,
        //    0,
        //    my,
        //    null,
        //    null,
        //    null,
        //    null,
        //    null,
        //    {
        //        minX :226,
        //        minY :312,
        //        maxX :1350,
        //        maxY :773
        //    }
        //    );

        var btnRight = Lobby.PhaserJS.createSpriteRectangleExt(
            my,
            1260,
            420,
            function () {
                my.resizeButtonAndTextAnimationScaleRatio(btnRight, null, 0.6);
                my.time.events.add(150,
                    function () {
                        my.resizeButtonAndTextAnimationScaleRatio(btnRight, null, 0.8);
                    }, this);
                my.time.events.add(150,
                    function () {
                        Lobby.PhaserJS.clearInterval(interval);
                        rightClick();
                    }, this);
            },
            function () {
                my.resizeButtonAndTextAnimationScaleRatio(btnRight, null, 0.8);
            },
            function () {
                my.resizeButtonAndTextAnimationScaleRatio(btnRight, null, 0.8);
            },
            group,
            LobbyConfig.isDebug,
            'right_arrow',
            null,
            null
        );
        btnRight.anchor.setTo(0.5, 0.5);
        btnRight.scale.setTo(0.8);
        btnRight.visible = false;

        var btnLeft = Lobby.PhaserJS.createSpriteRectangleExt(
            my,
            -10,
            420,
            function () {
                my.resizeButtonAndTextAnimationScaleRatio(btnLeft, null, 0.6);
                my.time.events.add(150,
                    function () {
                        my.resizeButtonAndTextAnimationScaleRatio(btnLeft, null, 0.8);
                    }, this);
                my.time.events.add(150,
                    function () {
                        Lobby.PhaserJS.clearInterval(interval);
                        leftClick();
                    }, this);
            },
            function () {
                my.resizeButtonAndTextAnimationScaleRatio(btnLeft, null, 0.8);
            },
            function () {
                my.resizeButtonAndTextAnimationScaleRatio(btnLeft, null, 0.8);
            },
            group,
            LobbyConfig.isDebug,
            'right_arrow',
            null,
            null
        );
        btnLeft.rotation = Math.PI;
        btnLeft.anchor.setTo(0.5, 0.5);
        btnLeft.scale.setTo(0.8);
        btnLeft.visible = false;
        //END INIT GROUP COINS

        //INIT GROUP CROWN:
        var groupCrownItemShop = my.add.group();
        group.groupCrownItemShop = groupCrownItemShop;
        group.add(groupCrownItemShop);
        var firstPosCrownsX = 120;
        var horizontalSpacingCrowns = 40;
        var positionsCrowns = [
            {
                x: firstPosCrownsX + (panelSize.width + horizontalSpacingCrowns) * 2,
                y: firstY
            },
            {
                x: firstPosCrownsX + panelSize.width + horizontalSpacingCrowns,
                y: firstY
            },
            {
                x: firstPosCrownsX,
                y: firstY
            }
        ];

        var buttonPurchaseClickedCrown = function (btn) {
            if ((typeof cordova == "undefined")) return;
            if (Lobby.Utils.isProduction()) {
                ManagerForPurchase.buyItem(my, LobbyConfig.ProductManager.Production["Crown" + (btn.index + 1)]);
            } else {
                if (cordova.platformId == "android") ManagerForPurchase.buyItem(my, LobbyConfig.ProductManager.Android["Crown" + (btn.index + 1)]);
                else if (cordova.platformId == "ios")ManagerForPurchase.buyItem(my, LobbyConfig.ProductManager.IOs["Crown" + (btn.index + 1)]);
            }
            //my.resizeButtonAndTextAnimation(btn, my.usdText[btn.index]);
            //if (my._userData.profile.role == 0) {
            //    // 2016-05-26: Phuoc: chuyển qua dùng method chung của Đạt
            //    if (!FacebookController.isInFBCanvas()) {
            //        my.showNotificationPopup("", my.selectlanguage.popup_warning_switch_to_app_fb.text);
            //        return;
            //    }
            //    AppPurchasePCControllerController.purchaseItem(
            //        LobbyConfig.ProductIdForBuyCrown[btn.index],
            //        function (isSuccess, purchaseResult, productID) {
            //            if (isSuccess) {
            //                my.reloadProfileCallbackAfterPurchase();
            //            } else {
            //                if(purchaseResult=="block_ip"){
            //                    my.showNotificationPopup(
            //                        "",
            //                        my.selectlanguage.main_menu_not_support_region.text,
            //                        function () {
            //                        }
            //                    );
            //                }
            //                else my.showNotificationPopup(
            //                    "",
            //                    my.selectlanguage.popup_shop_transaction_cancelled.text,
            //                    function () {
            //                    }
            //                );
            //            }
            //        }
            //    );
            //}
            //else {
            //    my.showNotificationPopup("", my.selectlanguage.popup_warning_switch_to_app_fb.text);
            //}
        };

        var crownListObject = LobbyConfig.CrownList;
        count = 0;
        for (var singleObj in crownListObject) {
            if (coinListObject.hasOwnProperty(singleObj)) {
                my.addMenuShopItemNew(groupCrownItemShop,
                    positionsCrowns[count],
                    buttonPurchaseClickedCrown,
                    count,
                    LobbyConfig.CrownList[count]);
                count++;
            }
        }

        //INIT TOGGLE SHOP
        var groupCoinItemShop = my.add.group();
        group.groupCoinItemShop = groupCoinItemShop;
        groupCoinItemShop.add(groupItemShop);
        var myMaskLeft = my.add.graphics(0, 0);
        myMaskLeft.beginFill();
        myMaskLeft.beginFill(0xFF700B);
        myMaskLeft.drawRect(background.x - 250, 250, 300, 468);
        myMaskLeft.endFill();
        myMaskLeft.inputEnabled = true;
        groupCoinItemShop.add(myMaskLeft);

        var myMaskRight = my.add.graphics(0, 0);
        myMaskRight.beginFill();
        myMaskRight.beginFill(0xFF700B);
        myMaskRight.drawRect(background.width - 70, 250, 300, 468);
        myMaskRight.endFill();
        myMaskRight.inputEnabled = true;
        groupCoinItemShop.add(myMaskRight);
        //
        myMaskLeft.alpha = 0;
        myMaskRight.alpha = 0;

        groupCoinItemShop.add(btnLeft);
        groupCoinItemShop.add(btnRight);

        group.add(groupCoinItemShop);


        var btnCoinClick =
            Lobby.PhaserJS.createRectangle(
                my,
                65,
                160,
                550,
                80,
                function () {
                    gotoCoinTab(true);
                },
                group,
                LobbyConfig.isDebug);
        var maskToggleCoin = my.add.sprite(70, 155, "popup_shop_mask_toggle");
        group.add(maskToggleCoin);
        var coinIcon = my.add.sprite(260, 170, "popup_shop_coin_icon", null);
        group.add(coinIcon);
        var coinText = my.add.text(
            340,
            170,
            //Lobby.Utils.formatNumberWithCommas("15000"),
            //Lobby.Utils.formatNumberWithCommas("$"+LobbyUserData.amountBonusF2P[0]),
            "Coins",
            {
                font: "55px PassionOne-Regular",
                fill: "#EACAF2",
                wordWrap: true,
                wordWrapWidth: 300
            },
            group
        );

        var gotoCoinTab = function (isShowContent) {
            if (LobbyUserData.dataTutorial.isPlayingTutorial == false)
                my.game.kineticScrolling.isDisable = false;
            if (isShowContent) {
                groupCoinItemShop.visible = true;
                groupCrownItemShop.visible = false;
            }
            maskToggleCrown.visible = true;
            maskToggleCoin.visible = false;
            crownText.fill = "#471F54";
            coinText.fill = "#EACAF2";
            crownIcon.tint = "0x6C5772";
            coinIcon.tint = "0xFFFFFF";

        };
        group.gotoCoinTab = gotoCoinTab;


        var btnCrownClick =
            Lobby.PhaserJS.createRectangle(
                my,
                630,
                160,
                550,
                80,
                function () {
                    gotoCrownTab(true);
                },
                group,
                LobbyConfig.isDebug);

        var maskToggleCrown = my.add.sprite(625, 155, "popup_shop_mask_toggle");
        group.add(maskToggleCrown);
        var crownIcon = my.add.sprite(790, 170, "popup-shop-crown_icon", null);
        group.add(crownIcon);
        var crownText = my.add.text(
            890,
            170,
            //Lobby.Utils.formatNumberWithCommas("15000"),
            //Lobby.Utils.formatNumberWithCommas("$"+LobbyUserData.amountBonusF2P[0]),
            "Crown",
            {
                font: "55px PassionOne-Regular",
                fill: "#EACAF2",
                wordWrap: true,
                wordWrapWidth: 300
            },
            group
        );

        var gotoCrownTab = function (isShowContent) {
            my.game.kineticScrolling.isDisable = true;
            if (
                Lobby.Utils.objectIsNull(isShowContent) ||
                isShowContent) {
                groupCoinItemShop.visible = false;
                groupCrownItemShop.visible = true;
            }
            maskToggleCrown.visible = false;
            maskToggleCoin.visible = true;
            coinText.fill = "#471F54";
            crownText.fill = "#EACAF2";
            coinIcon.tint = "0x6C5772";
            crownIcon.tint = "0xFFFFFF";

        };
        group.gotoCrownTab = gotoCrownTab;

        if (Lobby.Utils.isOldSchoolDevice()) {
            groupCoinItemShop.visible = false;
            groupCrownItemShop.visible = false;
            if (isCrownTab)
                gotoCrownTab(false);
            else {
                gotoCoinTab(false);
            }
        } else {
            if (isCrownTab)
                gotoCrownTab(true);
            else {
                gotoCoinTab(true);
            }

        }
        //var exitBtnSize = 100;
        //Lobby.PhaserJS.createRectangle(
        //    my,
        //    background.width - exitBtnSize + 15,
        //    -15,
        //    exitBtnSize,
        //    exitBtnSize,
        //    function () {
        //        my.closePopupWithAnimateDownNew(group);
        //    }, group, LobbyConfig.isDebug
        //);

        //var btnExit = Lobby.PhaserJS.createSpriteRectangleExt(
        //    my,
        //    background.width - 87,
        //    -10,
        //    function () {
        //        my.resizeButtonAndTextAnimationScaleDown(btnExit);
        //        btnExit.frame = 0;
        //        var interval = setInterval(function () {
        //            clearInterval(interval);
        //            my.closePopupWithAnimateDownNew(group);
        //        }, 150);
        //    },
        //    function () {
        //        my.resizeButtonAndTextAnimationScaleUp(btnExit);
        //        btnExit.frame = 0;
        //    },
        //    function () {
        //        my.resizeButtonAndTextAnimationScaleUp(btnExit);
        //        btnExit.frame = 0;
        //    },
        //    group, LobbyConfig.isDebug,
        //    "btn-close-new"
        //);

        var btnExit = my.createButtonExitPopup(
            group,
            background.width - 87,
            -10,
            2,
            null,
            function () {

                var tweenCoin = my.add.tween(groupCoinItemShop);
                tweenCoin.to({alpha: 0}, 100, Phaser.Easing.Linear.None, true);
                tweenCoin.onComplete.add(
                    function () {
                        groupCoinItemShop.visible = false;
                        groupCrownItemShop.visible = false;
                        my.resizeButtonAndTextAnimationScaleUp(btnExit);
                    });

                var tweenCrown = my.add.tween(groupCrownItemShop);
                tweenCrown.to({alpha: 0}, 100, Phaser.Easing.Linear.None, true);
                tweenCrown.onComplete.add(
                    function () {
                        groupCoinItemShop.visible = false;
                        groupCrownItemShop.visible = false;
                        my.resizeButtonAndTextAnimationScaleUp(btnExit);
                    });
            });

        group.position.y -= 30;
        //my.openPopupWithAnimateUpNew(group, null, true,false,function(){
        //    if(Lobby.Utils.isOldSchoolDevice()){
        //        //setTimeout(function(){
        //
        //            if (isCrownTab)
        //                gotoCrownTab(true);
        //            else {
        //                gotoCoinTab(true);
        //            }
        //
        //        groupCoinItemShop.alpha = 0;
        //        groupCrownItemShop.alpha = 0;
        //        my.add.tween(groupCoinItemShop).to({alpha: 1},500,Phaser.Easing.Linear.None,true);
        //        my.add.tween(groupCrownItemShop).to({alpha: 1},500,Phaser.Easing.Linear.None,true);
        //
        //        //}, 100);
        //
        //    }
        //});
        openPopupFunc();
    };

    /**
     * Info in game popup
     */
    my.showPopupInfoSlotGame = function (arrayBet, numberLine, currentBet, arrayImage, scale4ReduceResolution) {
        //TEST
        //arrayBet = [
        //    400,
        //    10000,
        //    100000
        //];
        //numberLine = 25;
        //currentBet = 400;
        //arrayImage = LobbyC.GameSlot.getCurrentGame().infoPageArray;


        var group = my.add.group();
        var background = my.add.sprite(0, 0, "popup_info_background", null);
        group.add(background);


        group.position = {
            x: (LobbyConfig.width - background.width) / 2,
            y: LobbyConfig.height - background.height - 50
        };

        var btnExit = my.createButtonExitPopup(group, background.width - 87, -10);

        //init group bet
        var groupBetItems = my.add.group();
        var payLineText = my.add.text(
            370,
            360,
            //Lobby.Utils.formatNumberWithCommas("15000"),
            //Lobby.Utils.formatNumberWithCommas("$"+LobbyUserData.amountBonusF2P[0]),
            "PAYLINES",
            {
                font: "52px PassionOne-Regular",
                fill: "#EACAF2",
                wordWrap: true,
                wordWrapWidth: 300
            },
            groupBetItems
        );
        var numberPayLineText = my.add.text(
            payLineText.x + 70,
            payLineText.y + 55,
            //Lobby.Utils.formatNumberWithCommas("15000"),
            //Lobby.Utils.formatNumberWithCommas("$"+LobbyUserData.amountBonusF2P[0]),
            numberLine,
            {
                font: "52px PassionOne-Regular",
                fill: "#FFFFFF",
                wordWrap: true,
                wordWrapWidth: 300
            },
            groupBetItems
        );

        var berPerLineText = my.add.text(
            payLineText.x + 250,
            payLineText.y,
            //Lobby.Utils.formatNumberWithCommas("15000"),
            //Lobby.Utils.formatNumberWithCommas("$"+LobbyUserData.amountBonusF2P[0]),
            "BET PER LINE",
            {
                font: "52px PassionOne-Regular",
                fill: "#EACAF2",
                wordWrap: true,
                wordWrapWidth: 300
            },
            groupBetItems
        );
        var numberBetPerLineText = my.add.text(
            berPerLineText.x + 122,
            berPerLineText.y + 82,
            //Lobby.Utils.formatNumberWithCommas("15000"),
            //Lobby.Utils.formatNumberWithCommas("$"+LobbyUserData.amountBonusF2P[0]),
            Lobby.Utils.formatNumberWithCommas(currentBet),
            {
                font: "52px PassionOne-Regular",
                fill: "#FFFFFF",
                wordWrap: true,
                wordWrapWidth: 300
            },
            groupBetItems
        );
        numberBetPerLineText.anchor.setTo(0.5);

        //var totalBetText = my.add.text(
        //    payLineText.x - 17,
        //    berPerLineText.y + 250,
        //    //Lobby.Utils.formatNumberWithCommas("15000"),
        //    //Lobby.Utils.formatNumberWithCommas("$"+LobbyUserData.amountBonusF2P[0]),
        //    "Total Bet",
        //    {
        //        font: "47px PassionOne-Regular",
        //        fill: "#FFFFFF",
        //        wordWrap: true,
        //        wordWrapWidth: 300
        //    },
        //    groupBetItems
        //);
        var groupChangeTotalBet = LobbyC.GameSlot.createGroupChangeTotalBet(arrayBet, numberLine, currentBet, function(){
            numberBetPerLineText.text = Lobby.Utils.formatNumberWithCommas(arrayBet[groupChangeTotalBet.indexCurrentBet]);
            LobbyC.GameSlot.getCurrentGame().s_oGame.getFooter().reloadBet(arrayBet[groupChangeTotalBet.indexCurrentBet]);
        });
        groupChangeTotalBet.position.y = LobbyConfig.height - 305;
        Lobby.PhaserJS.centerXItemInBackground(groupChangeTotalBet,background);
        groupChangeTotalBet.position.x += 50;
        groupBetItems.add(groupChangeTotalBet);

        //if(LobbyConfig.isTestStrategy) {
        groupChangeTotalBet.position.y = LobbyConfig.height - 305;
        groupChangeTotalBet.position.x = LobbyConfig.width / 2 - 180;
        groupChangeTotalBet.scale.setTo(0.8);

        var groupChangePayLine = LobbyC.GameSlot.createGroupEditPayLine(numberLine, function () {
            numberPayLineText.text = LobbyC.GameSlot.currentGameSlot.s_iLines;
            groupChangeTotalBet.reloadBet(arrayBet[groupChangeTotalBet.indexCurrentBet]);
            LobbyC.GameSlot.getCurrentGame().s_oGame.getFooter().reloadPayLine(LobbyC.GameSlot.currentGameSlot.s_iLines);
        });

        groupChangePayLine.position.y = LobbyConfig.height - 305;
        groupChangePayLine.position.x = 100;
        groupChangePayLine.scale.setTo(0.8);

        groupBetItems.add(groupChangePayLine);
        //}

        group.add(groupBetItems);
        //INIT GROUP INFO
        var groupMask = my.add.group();
        group.add(groupMask);

        var groupInfoItems = my.add.group();
        group.add(groupInfoItems);

        var myMask = my.add.graphics(0, 0);
        myMask.beginFill();
        myMask.beginFill(0xFF700B);
        myMask.drawRect(background.x + 50, 205, 1100, 475);
        myMask.endFill();
        group.add(myMask);
        groupMask.add(myMask);
        groupInfoItems.mask = myMask;

        myMask.alpha = 0.5;

        var distanceBetween2Image = 30;
        var widthImage = 1200;
        var arrayPosXImages = [];
        for (var i = 0; i < arrayImage.length; i++) {
            arrayPosXImages.push((widthImage + distanceBetween2Image) * i);
            var spriteInfo = my.add.sprite(arrayPosXImages[i], 120, arrayImage[i]);
            if (Lobby.Utils.objectIsNull(scale4ReduceResolution)) {
                scale4ReduceResolution = 100 / 70;//reduce info 70%
            }
            spriteInfo.scale.setTo(0.68 * scale4ReduceResolution);
            groupInfoItems.add(spriteInfo);
        }
        my.game.pageViewInfoPopup.start(groupInfoItems, true, arrayPosXImages, my, {
            minX: 250,
            maxX: 1350,
            minY: 267,
            maxY: 748
        });
        //INIT MASK

        var myMaskLeft = my.add.graphics(0, 0);
        myMaskLeft.beginFill();
        myMaskLeft.beginFill(0xFF700B);
        myMaskLeft.drawRect(background.x - 250, 205, 300, 475);
        myMaskLeft.endFill();
        myMaskLeft.inputEnabled = true;
        groupMask.add(myMaskLeft);

        var myMaskRight = my.add.graphics(0, 0);
        myMaskRight.beginFill();
        myMaskRight.beginFill(0xFF700B);
        myMaskRight.drawRect(background.width - 55, 205, 300, 475);
        myMaskRight.endFill();
        myMaskRight.inputEnabled = true;
        groupMask.add(myMaskRight);

        myMaskLeft.alpha = 0;
        myMaskRight.alpha = 0;


        //INIT TOGGLE
        var btnBetClick =
            Lobby.PhaserJS.createRectangle(
                my,
                67,
                125,
                550,
                80,
                function () {
                    gotoBetTab();
                },
                group,
                LobbyConfig.isDebug);
        var maskToggleBet = my.add.sprite(btnBetClick.x + 5, btnBetClick.y - 5, "popup_shop_mask_toggle");
        maskToggleBet.scale.setTo(0.958, 1);
        group.add(maskToggleBet);
        var betText = my.add.text(
            btnBetClick.x + 245,
            btnBetClick.y + 10,
            //Lobby.Utils.formatNumberWithCommas("15000"),
            //Lobby.Utils.formatNumberWithCommas("$"+LobbyUserData.amountBonusF2P[0]),
            "Bet",
            {
                font: "55px PassionOne-Regular",
                fill: "#EACAF2",
                wordWrap: true,
                wordWrapWidth: 300
            },
            group
        );

        var gotoBetTab = function () {
            my.game.pageViewInfoPopup.isDisable = true;
            groupBetItems.visible = true;
            groupInfoItems.visible = false;
            maskToggleInfo.visible = true;
            maskToggleBet.visible = false;
            infoText.fill = "#471F54";
            betText.fill = "#EACAF2";
        };


        var btnInfoClick =
            Lobby.PhaserJS.createRectangle(
                my,
                btnBetClick.x + 530,//565
                btnBetClick.y,
                550,
                80,
                function () {
                    gotoInfoTab();
                },
                group,
                LobbyConfig.isDebug);

        var maskToggleInfo = my.add.sprite(btnInfoClick.x + 5, btnInfoClick.y - 5, "popup_shop_mask_toggle");
        maskToggleInfo.scale.setTo(0.958, 1);
        group.add(maskToggleInfo);
        var infoText = my.add.text(
            btnInfoClick.x + 245,
            btnInfoClick.y + 10,
            //Lobby.Utils.formatNumberWithCommas("15000"),
            //Lobby.Utils.formatNumberWithCommas("$"+LobbyUserData.amountBonusF2P[0]),
            "Info",
            {
                font: "55px PassionOne-Regular",
                fill: "#EACAF2",
                wordWrap: true,
                wordWrapWidth: 300
            },
            group
        );
        var gotoInfoTab = function () {
            groupBetItems.visible = false;
            groupInfoItems.visible = true;
            maskToggleInfo.visible = false;
            maskToggleBet.visible = true;
            betText.fill = "#471F54";
            infoText.fill = "#EACAF2";
            my.time.events.add(300,
                function () {
                    my.game.pageViewInfoPopup.isDisable = false;
                }, this);
        };


        gotoBetTab();
        Lobby.PhaserJS.scaleGroupForOptimize(group, true);
        group.position.y -= 50;
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
            my.openPopupWithAnimateUpNew(group, null);
        }
    };
    /**
     * play animation coin sound
     */
    my.playAnimationCoinSound = function () {
        my.loadingSettingFromLocalStorage();
        if (my._userSetting.soundEffect == "1") {
            //my._soundCoinAnimation.play();
            ManagerForSound.play(my, 'animation-receive-coin');
        }
    };

    /**
     * play coin text increased sound
     */
    my.playCoinTextIncreaseSound = function () {
        my.loadingSettingFromLocalStorage();
        if (my._userSetting.soundEffect == "1") {
            //my._soundIncreaseCoinText.play();
            ManagerForSound.play(my, 'increase-coin-text');
        }
    };

    /**
     * play coin text decreased sound
     */
    my.playCoinTextDecreaseSound = function () {
        my.loadingSettingFromLocalStorage();
        if (my._userSetting.soundEffect == "1") {
            //my._soundIncreaseCoinText.play();
            ManagerForSound.play(my, 'decrease-coin-text');
        }
    };

    /**
     * play coin crown purchase sound ( sound when open popup shop )
     */
    my.playCoinCrownPurchaseSound = function () {
        my.loadingSettingFromLocalStorage();
        if (my._userSetting.soundEffect == "1") {
            //my._soundCoinCrownPurchase.play();
            ManagerForSound.play(my, 'coin-crown-purchase');
        }
    };

    /**
     * play big, megawin sound
     */
    my.playBigMegawinSound = function () {
        my.loadingSettingFromLocalStorage();
        if (my._userSetting.soundEffect == "1") {
            //my._soundCoinCrownPurchase.play();
            ManagerForSound.play(my, 'mega-big-win-sound');
        }
    };

    /**
     * resize button and text animation (not useful)
     * @param btn: btn
     * @param text: text
     */
    my.resizeButtonAndTextAnimation = function (btn, text) {

        //if(Lobby.Utils.objectNotNull(btn)) {
        //    btn.scale.setTo(0.7, 0.7);
        //}
        //
        //if(Lobby.Utils.objectNotNull(text)) {
        //    text.scale.setTo(0.7, 0.7);
        //}

        var scaleRatio = 0.8;
        Lobby.PhaserJS.scaleObjectAtCenter(
            btn,
            {
                x: scaleRatio,
                y: scaleRatio
            }
        );
        Lobby.PhaserJS.scaleObjectAtCenter(
            text,
            {
                x: scaleRatio,
                y: scaleRatio
            }
        );


        //tween.onComplete.add(function () {
        //    my.add.tween(btn).to({
        //        width: wBtn,
        //        height: hBtn
        //    }, 100, Phaser.Easing.Quintic.Out, true);
        //    my.add.tween(btn.position).to({
        //        x: pBtnX,
        //        y: pBtnY
        //    }, 100, Phaser.Easing.Quintic.Out, true);
        //    if(text!=undefined){
        //        my.add.tween(text.position).to({
        //            x: pTextX ,
        //            y: pTextY
        //        }, 100, Phaser.Easing.Quintic.Out, true);
        //    }
        //}, my);
    };

    // 2016-08-08: Phuoc: thêm param originalScaleRatio, dùng trong trường hợp btn hoặc text có original scale ratio
    // bằng với scaleRatio mặc định trong method, khi đó sẽ không thấy hiệu ứng thu nhỏ / phóng to
    my.resizeButtonAndTextAnimationScaleDown = function (btn,
                                                         text,
                                                         originalScaleRatioX,
                                                         originalScaleRatioY) {
        var scaleRatio = {
            x: 0.8,
            y: 0.8
        };

        if (originalScaleRatioX !== undefined) {
            scaleRatio.x *= originalScaleRatioX;
        }

        if (originalScaleRatioY !== undefined) {
            scaleRatio.y *= originalScaleRatioY;
        }

        if (Lobby.Utils.objectNotNull(btn)) {
            Lobby.PhaserJS.scaleObjectAtCenter(
                btn,
                {
                    x: scaleRatio.x,
                    y: scaleRatio.y
                }
            );
        }
        if (Lobby.Utils.objectNotNull(text)) {
            Lobby.PhaserJS.scaleObjectAtCenter(
                text,
                {
                    x: scaleRatio.x,
                    y: scaleRatio.y
                }
            );
        }
    };
    // 2016-08-08: Phuoc: thêm param originalScaleRatio, dùng trong trường hợp btn hoặc text có original scale ratio
    // bằng với scaleRatio mặc định trong method, khi đó sẽ không thấy hiệu ứng thu nhỏ / phóng to
    my.resizeButtonAndTextAnimationScaleUp = function (btn,
                                                       text,
                                                       originalScaleRatioX,
                                                       originalScaleRatioY) {
        var scaleRatio = {
            x: 1,
            y: 1
        };

        if (originalScaleRatioX !== undefined) {
            scaleRatio.x *= originalScaleRatioX;
        }

        if (originalScaleRatioY !== undefined) {
            scaleRatio.y *= originalScaleRatioY;
        }

        if (Lobby.Utils.objectNotNull(btn)) {
            Lobby.PhaserJS.scaleObjectAtCenter(
                btn,
                {
                    x: scaleRatio.x,
                    y: scaleRatio.y
                }
            );
        }
        if (Lobby.Utils.objectNotNull(text)) {
            Lobby.PhaserJS.scaleObjectAtCenter(
                text,
                {
                    x: scaleRatio.x,
                    y: scaleRatio.y
                }
            );
        }
    };

    my.forceClosePopupBigWinMegaWin = function(){
      if(Lobby.Utils.objectNotNull(my.groupPopupMegaWin)){
          my.groupPopupMegaWin.destroy();
          my.groupPopupMegaWin = null;
      }
        if(Lobby.Utils.objectNotNull(my.groupPopupBigWin)){
            my.groupPopupBigWin.destroy();
            my.groupPopupBigWin = null;
        }
        LobbyC.MainMenu.isClickedButtonInHeader = false;
    };

    /**
     * show mega win popup
     * @param coinWin: number of coin win
     * @param callback: callback after show and hide
     */
    my.showPopupMegaWin = function (coinWin, callback) {
        /**
         * Kiet handle show mega win o day n
         */
        var delayToShootStar = 250;
        var delayBetweenStar = 50;
        var delayShowStartsAnim = delayBetweenStar * 12;
        var delayHidePopup = 1800;
        if(Lobby.Utils.isOldSchoolDevice())
            delayHidePopup *= 1.4;
        var dk = my.createDarkLayer();
        var group = my.add.group();
        my.groupPopupMegaWin = group;


        var coinNumber;
        //COIN WIN TEXT
        my.time.events.add(delayBetweenStar * 2,
            function () {
                coinNumber = my.add.bitmapText(
                    LobbyConfig.width / 2 - 550,
                    250,
                    //"popup-levelup-number-bmp",
                    "popup-bigwin-bmp",
                    "0",
                    50);
                coinNumber.anchor.x = 0.5;
                group.add(coinNumber);
                var tween = my.add.tween(coinNumber).to({
                    text: []
                }, 2 * delayHidePopup - delayBetweenStar * 2, Phaser.Easing.Quadratic.Out, true).interpolation(function (v, k) {
                    Phaser.Math.bezierInterpolation(v, k);

                    return Helper.Number.formatNumber("0" + k * coinWin);
                });
                //CLOSE POPUP
                tween.onComplete.add(function(){
                    my.time.events.add(1000,
                        function () {
                            var tweenIn = my.add.tween(group).to({alpha: 0}, 600, Phaser.Linear, true, 0, 0, false);
                            tweenIn.onComplete.add(
                                function () {
                                    if (Lobby.Utils.objectNotNull(callback)) {
                                        callback();
                                    }
                                    //my.closePopupWithAnimateDownNew(group);
                                    my.groupPopupMegaWin = null;
                                    group.destroy();
                                    my.game.pageViewInfoPopup.isDisable = false;
                                    my.game.kineticScrolling.isDisable = false;
                                    if (Lobby.Utils.objectNotNull(dk))
                                        my.destroyDarkLayer(dk);
                                }, this
                            );
                        }, this);
                });
            }, this);
        var showMegaWin = function () {
            my.playBigMegawinSound();
            //UP STAR
            var firstPosUP = {x: 70, y: 0};
            var heightBetweenUP = 27;
            var widthBetweenUP = 58;
            var posArrUP = [
                firstPosUP,
                {
                    x: firstPosUP.x + 390,
                    y: firstPosUP.y
                },
                {
                    x: firstPosUP.x - 25,
                    y: firstPosUP.y + 86
                },
                {
                    x: firstPosUP.x - 58 + 390,
                    y: firstPosUP.y - 48
                },
                {
                    x: firstPosUP.x + 25 + 390,
                    y: firstPosUP.y + 86
                },
                {
                    x: firstPosUP.x + 58,
                    y: firstPosUP.y - 48
                }
            ];
            var arrayKeyImageUP = [];
            for (var i = 0; i < 6; i++) {
                arrayKeyImageUP.push("star-up-megawin-" + i);
            }

            my.showShootingStars(arrayKeyImageUP, posArrUP, delayToShootStar, delayBetweenStar, group);

            //UNDER STAR
            var firstPosUD = {x: 95, y: 115};
            var heightBetweenUD = 27;
            var widthBetweenUD = 58;
            var posArrUD = [
                firstPosUD,
                {
                    x: firstPosUD.x + 320,
                    y: firstPosUD.y
                },
                {
                    x: firstPosUD.x + widthBetweenUD - 50 + 320,
                    y: firstPosUD.y - heightBetweenUD - 42
                },
                {
                    x: firstPosUD.x + widthBetweenUD,
                    y: firstPosUD.y + heightBetweenUD
                },
                {
                    x: firstPosUD.x - widthBetweenUD + 320,
                    y: firstPosUD.y + heightBetweenUD
                },
                {
                    x: firstPosUD.x - widthBetweenUD + 50,
                    y: firstPosUD.y - heightBetweenUD - 42
                }
            ];
            var arrayKeyImage = [];
            for (var i = 0; i < 6; i++) {
                arrayKeyImage.push("star-under-megawin-" + i);
            }

            my.showShootingStars(arrayKeyImage, posArrUD, delayToShootStar, delayBetweenStar, group);


            //MEGAWIN TITLE
            var winSprite = my.add.sprite(250, 70, "win_title");
            winSprite.scale.setTo(0, 0);
            winSprite.anchor.setTo(0.5, 0.5);
            group.add(winSprite);
            my.time.events.add(delayToShootStar,
                function () {
                    my.add.tween(winSprite.scale).to({x: 1, y: 1}, 400, Phaser.Easing.Back.Out, true, 0, 0, false);
                }, this
            );

            var megaSprite = my.add.sprite(winSprite.x, winSprite.y - 110, "mega_title");
            megaSprite.scale.setTo(0, 0);
            megaSprite.anchor.setTo(0.5, 0.5);
            group.add(megaSprite);
            my.add.tween(megaSprite.scale).to({x: 1, y: 1}, 400, Phaser.Easing.Back.Out, true, 0, 0, false);


            //STARS MINI
            var startsBigwin = my.add.sprite(220, 50, "starts_bigwin");
            startsBigwin.anchor.setTo(0.5, 0.5);
            startsBigwin.scale.setTo(0, 0);
            group.add(startsBigwin);
            my.time.events.add(delayShowStartsAnim,
                function () {
                    my.add.tween(startsBigwin.scale).to({
                        x: 2.2,
                        y: 2.2
                    }, 500, Phaser.Easing.Back.Out, true, 0, 0, false);
                    my.add.tween(startsBigwin).to({alpha: 0}, 800, Phaser.Linear, true, 0, 0, false);
                }, this);

            //add text to front
            group.addChild(coinNumber);
            //CLOSE POPUP
            //my.time.events.add(delayHidePopup,
            //    function () {
            //        var tween = my.add.tween(group).to({alpha: 0}, 600, Phaser.Linear, true, 0, 0, false);
            //        tween.onComplete.add(
            //            function () {
            //                if (Lobby.Utils.objectNotNull(callback)) {
            //                    callback();
            //                }
            //                //my.closePopupWithAnimateDownNew(group);
            //                group.destroy();
            //                my.game.pageViewInfoPopup.isDisable = false;
            //                my.game.kineticScrolling.isDisable = false;
            //                if (Lobby.Utils.objectNotNull(dk))
            //                    my.destroyDarkLayer(dk);
            //            }, this
            //        );
            //    }, this);
        };
        my.showPopupBigWin(coinWin, showMegaWin, true, group, dk);
    };

    /**
     * show big win popup
     * @param coinWin: number of coin win
     * @param callBack: callback after show and hide
     * @param isFromMegawin: is call from show megawin popup
     * @param groupParent: group parent
     * @param darkLayer: not use
     */
    my.showPopupBigWin = function (coinWin, callBack, isFromMegawin, groupParent, darkLayer) {
        if (Lobby.Utils.objectIsNull(isFromMegawin)) isFromMegawin = false;
        var delayToShootStar = 150;
        var delayBetweenStar = 120;
        var delayShowStartsAnim = delayBetweenStar * 5;
        var delayHidePopup = 1800;
        var dk = null;
        if (isFromMegawin == false) {
            dk = LobbyC.MainMenu.createDarkLayer();
        }
        var group = my.add.group();
        my.groupPopupBigWin = group;

        my.game.pageViewInfoPopup.isDisable = true;
        my.game.kineticScrolling.isDisable = true;

        if (!Lobby.Utils.objectIsNull(isFromMegawin) && isFromMegawin) groupParent.add(group);

        my.playBigMegawinSound();

        //6 STAR
        var firstPos = {x: 100, y: -70};
        var heightBetween = 70;
        var widthBetween = 50;
        var posArr = [
            {
                x: firstPos.x - widthBetween - 10,
                y: firstPos.y + heightBetween - 10
            },
            {
                x: firstPos.x + widthBetween + 10 + 320,
                y: firstPos.y + heightBetween - 10
            },
            {
                x: firstPos.x - 2 * widthBetween,
                y: firstPos.y + 2 * heightBetween
            },
            {
                x: firstPos.x + 320,
                y: firstPos.y
            },
            {
                x: firstPos.x + 2 * widthBetween + 320,
                y: firstPos.y + 2 * heightBetween
            },
            firstPos
        ];
        var arrayKeyImage = [];
        for (var i = 0; i < 6; i++) {
            arrayKeyImage.push("star-bigwin-" + (i));
        }

        my.showShootingStars(arrayKeyImage, posArr, delayToShootStar, delayBetweenStar, group);

        //STARS MINI
        var startsBigwin = my.add.sprite(220, 50, "starts_bigwin");
        startsBigwin.anchor.setTo(0.5, 0.5);
        startsBigwin.scale.setTo(0, 0);

        group.add(startsBigwin);
        my.time.events.add(delayShowStartsAnim,
            function () {
                my.add.tween(startsBigwin.scale).to({x: 2.5, y: 2.5}, 500, Phaser.Easing.Back.Out, true, 0, 0, false);
                my.add.tween(startsBigwin).to({alpha: 0}, 800, Phaser.Linear, true, 0, 0, false);
            }, this);

        //BIGWIN TITLE
        var bigWinSprite = my.add.sprite(250, -60, "bigwin_title");
        bigWinSprite.scale.setTo(0, 0);
        bigWinSprite.anchor.setTo(0.5, 0.5);
        group.add(bigWinSprite);
        my.add.tween(bigWinSprite.scale).to({x: 1, y: 1}, 300, Phaser.Easing.Back.Out, true, 0, 0, false);
        //
        //Lobby.PhaserJS.centerWorld(group);
        //Lobby.PhaserJS.scaleGroupForOptimize(group,true);
        //COIN WIN TEXT
        if (isFromMegawin == false) {
            my.time.events.add(delayBetweenStar * 2,
                function () {
                    var coinNumber = my.add.bitmapText(
                        firstPos.x + 140,
                        200,
                        //"popup-levelup-number-bmp",
                        "popup-bigwin-bmp",
                        "0",
                        50);
                    coinNumber.anchor.x = 0.5;
                    group.add(coinNumber);
                    var tween = my.add.tween(coinNumber).to({
                        text: []
                    }, delayHidePopup - delayBetweenStar * 2 - 700, Phaser.Easing.Quadratic.Out, true).interpolation(function (v, k) {
                        Phaser.Math.bezierInterpolation(v, k);

                        return Helper.Number.formatNumber("0" + k * coinWin);
                    });
                    //CLOSE POPUP
                    tween.onComplete.add(
                        function() {
                            my.time.events.add(delayHidePopup,
                                function () {
                                    var tweenIn = my.add.tween(group).to({alpha: 0}, 600, Phaser.Linear, true, 0, 0, false);
                                    tweenIn.onComplete.add(
                                        function () {
                                            if (Lobby.Utils.objectNotNull(callBack)) {
                                                callBack();
                                            }
                                            //my.closePopupWithAnimateDownNew(group);
                                            my.groupPopupBigWin = null;
                                            group.destroy();
                                            if (isFromMegawin == false) {
                                                my.game.pageViewInfoPopup.isDisable = false;
                                                my.game.kineticScrolling.isDisable = false;
                                            }
                                            if (Lobby.Utils.objectNotNull(dk))
                                                my.destroyDarkLayer(dk);
                                        }, this
                                    );
                                }, this);
                        }
                    )
                }, this);

        }

        //CLOSE POPUP
        if(isFromMegawin == true){
            my.time.events.add(delayHidePopup,
                function () {
                    var tween = my.add.tween(group).to({alpha: 0}, 600, Phaser.Linear, true, 0, 0, false);
                    tween.onComplete.add(
                        function () {
                            if (Lobby.Utils.objectNotNull(callBack)) {
                                callBack();
                            }
                            //my.closePopupWithAnimateDownNew(group);
                            group.destroy();
                            if (isFromMegawin == false) {
                                my.game.pageViewInfoPopup.isDisable = false;
                                my.game.kineticScrolling.isDisable = false;
                            }
                            if (Lobby.Utils.objectNotNull(dk))
                                my.destroyDarkLayer(dk);
                        }, this
                    );
                }, this);
        }

        if (Lobby.Utils.objectNotNull(groupParent)) {
            groupParent.scale.setTo(0.8, 0.8);
            Lobby.PhaserJS.centerWorld(groupParent);
            Lobby.PhaserJS.scaleGroupForOptimize(groupParent, true, 0.8);

        } else {
            group.scale.setTo(0.8, 0.8);
            Lobby.PhaserJS.centerWorld(group);
            Lobby.PhaserJS.scaleGroupForOptimize(group, true, 0.8);
        }
    };

    /**
     * show shooting stars for popup megawin and bigwin
     * @param arrayKeyImage: array image key
     * @param arrayPosition: array postion of star
     * @param delayToShootStar: delay to start show shooting star
     * @param delayBetweenStar : delay between stars
     * @param group : group
     */
    my.showShootingStars = function (arrayKeyImage, arrayPosition, delayToShootStar, delayBetweenStar, group) {
        var arrayStarWillShow = [];
        for (var i = 0; i < 6; i++) {
            var starSprite = my.add.sprite(arrayPosition[i].x, arrayPosition[i].y, arrayKeyImage[i]);
            starSprite.scale.setTo(0, 0);
            starSprite.anchor.setTo(0.5, 0.5);
            arrayStarWillShow[i] = starSprite;
            group.add(arrayStarWillShow[i]);
        }
        var numberStarWasShow = 0;
        my.time.events.add(delayToShootStar,
            function () {
                runShootStar();
            }, this);
        var runShootStar = function () {
            my.time.events.add(delayBetweenStar,
                function () {
                    my.add.tween(arrayStarWillShow[numberStarWasShow].scale).to({
                        x: 1,
                        y: 1
                    }, 120, Phaser.Easing.Back.Out, true, 0, 0, false);
                    numberStarWasShow++;
                    if (numberStarWasShow < 6) {
                        runShootStar();
                    }
                }, this);
        };
    };

    /**
     * get special offer info
     */
    my.getSpecialOfferInfo = function(){
        my.specialOfferData = 0;
        my.isGotSpecialOfferInfo = false;
        LobbyRequest.User.checkSpecialOffer(function (isSuccess, data){
            if(my.isGotSpecialOfferInfo){
                return;
            }
            if (isSuccess) {
                if (Lobby.Utils.objectNotNull(data.member)
                    && data.member.length > 0) {
                    var member = data.member;
                    my.specialOfferData = member[0];
                }
            }else{
                my.specialOfferData = null
            }
            my.isGotSpecialOfferInfo = true;
        });
    };

    /**
     * check and show popup special offer
     */
    my.checkAndShowPopupSpecialOffer = function () {
        if (LobbyC.Login.wasShowSpecialOffer || LobbyUserData.dataTutorial.isPlayingTutorial || my.specialOfferData == null) {
            return;
        }
        if(my.specialOfferData == 0){
            LobbyRequest.User.checkSpecialOffer(function (isSuccess, data) {
                my.isGotSpecialOfferInfo = true;
                if (isSuccess) {
                    LobbyC.Login.wasShowSpecialOffer = true;
                    if (Lobby.Utils.objectNotNull(data.member)
                        && data.member.length > 0) {
                        var member = data.member;
                        var specialOfferData = member[0];
                        my.time.events.add(2000,
                            function () {
                                if (my.playingGame === LobbyConstant.isNotInGame) {
                                    my.game.kineticScrolling.isDisable = true;
                                    my.showPopupSpecialOffer(specialOfferData);
                                }
                            }, this);
                    }
                }
            });
        }else{
            my.time.events.add(2000,
                function () {
                    if (my.playingGame === LobbyConstant.isNotInGame) {
                        my.game.kineticScrolling.isDisable = true;
                        my.showPopupSpecialOffer(my.specialOfferData);
                    }
                });
        }
    };

    /**
     * show special offer popup
     * @param data: data
     */
    my.showPopupSpecialOffer = function (data) {
        // 2016-07-27: Phuoc: chỉ hiện special offer khi ở trong lobby
        if(LobbyConfig.isDebug) console.log("Current state name: ", my.game.state.current);
        switch (my.game.state.current) {
            case LobbyConstant.stateName.Boot:
            case LobbyConstant.stateName.Login:
            case LobbyConstant.stateName.InitSession:
            case LobbyConstant.stateName.Preloader:
                return;

            case LobbyConstant.stateName.MainMenu:
            case LobbyConstant.stateName.GameSlot:
                break;
        }

        var expired_time = data.expired_time;
        var product_amount = data.product_amount;
        var coin_reward = data.coin_reward;
        var bonus_percent = data.bonus_percent;
        //expired_time = 178433;
        var formatIntTo2Dig = function (myNumber) {
            return ("0" + myNumber).slice(-2);
        };

        var updateCountDownTime = function () {
            expired_time -= 1;
            var ts = TimeSpan.FromSeconds(expired_time);
            var days = formatIntTo2Dig(ts.days());
            var hours = formatIntTo2Dig(ts.hours());
            var minutes = formatIntTo2Dig(ts.minutes());
            var seconds = formatIntTo2Dig(ts.seconds());
            if (days > 0) {
                textTimeLeft.text = days + ":" + hours + ":" + minutes + ":" + seconds;
            } else {
                textTimeLeft.text = hours + ":" + minutes + ":" + seconds;
            }
            if (expired_time > 0) {
                my.time.events.add(1000,
                    function () {
                        updateCountDownTime();
                    }, this)
            }
        };
        //countDownTime = Mathf.Abs(time) / 1000;
        //updateCountDownTime();
        //offerLeft.text = "Left : "+offer.ToString();
        //bonusCoins.text = My.formatNumberWithComasV2(coinsBonus);
        //_bonusPercent.text = "+" + bonusPercent.ToString("n0") + "%";


        var group = my.add.group();
        var background = my.add.sprite(0, 0, "popup_special_offer_background");
        group.add(background);

        var textTimeLeft = my.add.text(
            830,
            464,
            "",
            {
                font: "30px PassionOne-Regular",
                fill: "#FFFFBF",
                wordWrap: true,
                wordWrapWidth: 200,
                align: "center"
            },
            group
        );

        var textItemLeft = my.add.text(
            textTimeLeft.x,
            textTimeLeft.y + 48,
            "Left : " + product_amount,
            {
                font: "30px PassionOne-Regular",
                fill: "#FFFFBF",
                wordWrap: true,
                wordWrapWidth: 200,
                align: "center"
            },
            group
        );
        var btnExit = my.createButtonExitPopup(group, background.width - 87, -10);
        updateCountDownTime();
        var btnRegularPackage = my.createButtonGreenPopup(
            group,
            LobbyConfig.width / 2 - 400,
            450,
            my.selectlanguage.buyNow.text,
            1,
            function () {
                var callBackBuy = function () {
                    if (Lobby.Utils.isProduction()) {
                        ManagerForPurchase.buyItem(my, LobbyConfig.ProductManager.Production["SpecialOffer"]);
                    } else {
                        if (cordova.platformId == "android") ManagerForPurchase.buyItem(my, LobbyConfig.ProductManager.Android["SpecialOffer"]);
                        else if (cordova.platformId == "ios")ManagerForPurchase.buyItem(my, LobbyConfig.ProductManager.IOs["SpecialOffer"]);
                    }
                };

                callBackBuy();


                if (LobbyConfig.useManagerForPopUp) {
                    ManagerForPopUp.forceClosePopUp(my, group);
                } else {
                    my.closePopupWithAnimateDownNew(group);
                }
            },
            60
        );
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

    return my;

}(LobbyC.MainMenu || {}));
