LobbyC.MainMenu = (function (my) {
    var isDebug = LobbyConfig.isDebug;
    var scale = 0.8;
    my.isClickedButtonInHeader = false;
    my._headerMask = null;

    my.currentlanguageCode = 0;
    /**
     * change name in UI
     * @param name
     */
    my.changeName = function (name) {
        my._userName.text = name;
        if (my._userName.text.length > 15) {
            my._userName.text = my._userName.text.substring(0, 15) + "...";
        }
    };
    /**
     * reload header
     * @param isShowAvatar : not use
     */
    my.reloadHeader = function (isShowAvatar) {
        if (isShowAvatar) {
            //alert("Is show avatar");
            //my.reloadHeaderAvatar();
        }
        var currentUser = my._userData.profile;
        // Name
        my.changeName(currentUser.name);

        //Level Bar
        //currentUser.expBar = 0.55;
        my.levelBarText.text = Math.floor(currentUser.expBar * 100) + "%";
        //my._levelBarMaxWidth = my.levelBar.width;
        my.levelBar.width = my._levelBarMaxWidth * currentUser.expBar;
        //my._levelBar = my.levelBar;

        // Level
        my.levelFont = "30px PassionOne-Regular";
        //my.levelFontWidth = 191+3;
        //my.levelFontHeight = 43+3;
        //currentUser.level = 55;
        switch ((currentUser.level + 1).toString().length) {
            case 2:
                //my.levelFontWidth = 185+5;
                //my.levelFontHeight = 43+5;
                break;
            case 3:
                my.levelFont = "26px PassionOne-Regular";
                //my.levelFontWidth = 181+4;
                //my.levelFontHeight = 43+4;
                break;
            case 4:
                my.levelFont = "18px PassionOne-Regular";
                //my.levelFontWidth = 181+3;
                //my.levelFontHeight = 47+3;
                break;
            case 5:
                my.levelFont = "14px PassionOne-Regular";
                //my.levelFontWidth = 181+2;
                //my.levelFontHeight = 51+2;
                break;


        }

        //my.levelFontWidth+=3;
        //my.levelFontHeight+=3;
        //my.level.position.x = my.levelFontWidth;
        //my.level.position.y = my.levelFontHeight;
        my.level.text = currentUser.level + 1;
        my.level.style.font = my.levelFont;

        // Coin
        my.coinFont = "36px PassionOne-Regular";
        //currentUser.coin = 99999999999999;
        switch (Math.round(currentUser.coin).toString().length) {
            case 8:
                my.coinFont = "34px PassionOne-Regular";
                break;
            case 9:
                my.coinFont = "32px PassionOne-Regular";
                break;
            case 10:
                my.coinFont = "30px PassionOne-Regular";
                break;
            case 11:
                my.coinFont = "28px PassionOne-Regular";
                break;
            case 12:
                my.coinFont = "26px PassionOne-Regular";
                break;
            case 13:
                my.coinFont = "24px PassionOne-Regular";
                break;
            case 14:
                my.coinFont = "22px PassionOne-Regular";
                break;
            case 15:
                my.coinFont = "20px PassionOne-Regular";
                break;
            default :
                break;
        }

        var userCoin = currentUser.coin;
        userCoin = userCoin>0?userCoin:0;
        my._userCoinText.text = Lobby.Utils.formatNumberWithCommas(parseFloat(userCoin).toFixed(LobbyConfig.roundNumber));
        my._userCoinText.style.font = my.coinFont;
        my._userCoinText.position.x = my.coinBackground.position.x + my.coinBackground.width / 2;
        my._userCoinText.position.y = 49;
        my._userCoinText.anchor.x = 0.5;
        my._userCoinText.anchor.y = 0.5;

        // Crown
        my.crownFont = "36px PassionOne-Regular";
        //currentUser.crown = 123111111111111;
        switch (currentUser.crown.toString().length) {
            case 8:
                my.crownFont = "34px PassionOne-Regular";
                break;
            case 9:
                my.crownFont = "32px PassionOne-Regular";
                break;
            case 10:
                my.crownFont = "30px PassionOne-Regular";
                break;
            case 11:
                my.crownFont = "28px PassionOne-Regular";
                break;
            case 12:
                my.crownFont = "26px PassionOne-Regular";
                break;
            case 13:
                my.crownFont = "24px PassionOne-Regular";
                break;
            case 14:
                my.crownFont = "22px PassionOne-Regular";
                break;
            case 15:
                my.crownFont = "20px PassionOne-Regular";
                break;
            default :
                break;
        }

        my._userCrownText.style.font = my.crownFont;
        my._userCrownText.text = Lobby.Utils.formatNumberWithCommas(parseFloat(currentUser.crown).toFixed(LobbyConfig.roundNumber));
        my._userCrownText.position.x = my.crownBackground.position.x + my.crownBackground.width / 2 + 10;
        my._userCrownText.position.y = 49;
        my._userCrownText.anchor.x = 0.5;
        my._userCrownText.anchor.y = 0.5;


    };
    /**
     * swich to language with key
     * @param key: 0 = en, 1 = vn, 2 = cn, 3 = trad-cn, 4 = my, 5 = indo
     */
    my.applyLanguage = function (key) {
        switch (key) {
            case 0:
                //my.setting_logged_with_lable.text = "Logged in via : ";
                my.selectlanguage = my.arrayLanguage.en;
                //my.currentFlagText.text = my.arrayLanguageLabel[0];
                break;
            case 1:
                //my.setting_logged_with_lable.text = "??ng nh?p qua : ";
                my.selectlanguage = my.arrayLanguage.vn;
                //my.currentFlagText.text = my.arrayLanguageLabel[1];
                break;
            case 2:
                my.selectlanguage = my.arrayLanguage.cn;
                //my.currentFlagText.text = my.arrayLanguageLabel[2];
                break;
            case 3:
                my.selectlanguage = my.arrayLanguage.trad_cn;
                //my.currentFlagText.text = my.arrayLanguageLabel[3];
                break;
            case 4:
                my.selectlanguage = my.arrayLanguage.my;
                //my.currentFlagText.text = my.arrayLanguageLabel[4];
                break;
            case 5:
                my.selectlanguage = my.arrayLanguage.indo;
                //my.currentFlagText.text = my.arrayLanguageLabel[5];
                break;
        }
        my.currentlanguageCode = key;
    };
    /**
     * show header new
     * @param mainMenu : main menu group
     */
    my.showNewHeader = function (mainMenu) {
        var group = my.add.group();
        mainMenu.add(group);

        my.uiHeader = group;
        var groupAvatar = my.add.group();
        group.add(groupAvatar);
        groupAvatar.x = 50 - 20;
        groupAvatar.y = 3 + 5;
        var avatarLink = "popup_profile_profile_avatar";
        my.userAvatarHeader = Lobby.PhaserJS.createSpriteRectangleExt(
            my,
            0,
            0,
            function () {
                my.showPopupProfile();
                //my.showSpin();
            },
            function () {
            },
            function () {
            },
            groupAvatar, LobbyConfig.isDebug,
            avatarLink
        );
        my.userAvatarHeader.width = 100;
        my.userAvatarHeader.height = 100;
        if(!Lobby.PhaserJS.createSpriteWithCircleMask(my.userAvatarHeader, avatarLink, 100, my)){
            Lobby.PhaserJS.maskCircleGroup(groupAvatar, my.userAvatarHeader.width, my);
        };
        //Lobby.PhaserJS.maskCircleSmooth(groupAvatar, my.userAvatarHeader, my.userAvatarHeader.width, my);
        //if (Lobby.Utils.objectNotNull(my._userData.profile.facebookUID)) {
        //
        //    ResourceLoader.loadAvatar(
        //        avatarLink,
        //        "https://graph.facebook.com/" + my._userData.profile.facebookUID + "/picture?type=normal&width=120&height=120",
        //        function () {
        //            /**
        //             * Reload current user avatar in header & footer
        //             */
        //            Lobby.PhaserJS.tryLoadTexture(my.userAvatarHeader, avatarLink, my);
        //            my.userAvatarHeader.width = 85;
        //            my.userAvatarHeader.height = 85;
        //            //Lobby.PhaserJS.tryLoadTexture(my.userAvatarHeader, avatarLink, my);
        //            //my.userAvatarHeader.width = avatarSize;
        //            //my.userAvatarHeader.width = avatarSize;
        //            //my.userAvatarHeader.height = avatarSize;
        //
        //            //Lobby.PhaserJS.scaleAspectSize(
        //            //    my.userAvatarHeader,
        //            //    {
        //            //        width: 110,
        //            //        height: 110
        //            //    });
        //            //Lobby.PhaserJS.maskCircleGroup(groupAvatar, my.userAvatarHeader.width, my);
        //
        //
        //        },
        //        'current-user-avatar-footer'
        //    );
        //} else {
        //    my.userAvatarHeader.width = 85;
        //    my.userAvatarHeader.height = 85;
        //    //Lobby.PhaserJS.scaleAspectSize(
        //    //    my.userAvatarHeader,
        //    //    {width: 110, height: 110});
        //    //Lobby.PhaserJS.maskCircleGroup(groupAvatar, my.userAvatarHeader.width, my);
        //}
        my.userAvatarHeader.anchor.x = 0;
        my.userAvatarHeader.anchor.y = 0;
        my.reloadHeaderAvatar();
        var user_name = my._userData.profile.name;
        //var user_name = "TranThiKimOanh TranThiKimOanh";
        if (user_name.length > 15) {
            user_name = user_name.substring(0, 15) + "...";
        }
        my._userName = my.add.text(230, 15, user_name, {
            font: "30px PassionOne-Regular",
            fill: "#FFFFFF"
        }, group);

        var levelBackground = my.add.sprite(
            192, 45, "new_header_level_background", null, group
        );
        levelBackground.scale.setTo(scale);
        my.levelBar = my.add.sprite(
            199,
            51,
            'new_header_level_mask',
            null,
            group
        );
        my.levelBar.scale.setTo(scale);
        my.levelBarText = my.add.text(300, 50, Math.floor(my._userData.profile.expBar * 100) + "%", {
            font: "25px PassionOne-Regular",
            fill: "#FFFFFF"
        }, group);

        if (my._userData.profile.expBar == undefined || my._userData.profile.expBar == null) {
            my._userData.profile.expBar = 0;
        }
        my._levelBarMaxWidth = my.levelBar.width;
        my.levelBar.width = my._levelBarMaxWidth * my._userData.profile.expBar;
        my._levelBar = my.levelBar;

        var starLevel = my.add.sprite(
            162, 19, "new_header_start_for_level_and_vip", null, group
        );
        starLevel.scale.setTo(scale);
        my.coinFont = "30px PassionOne-Regular";
        my.levelFontWidth = starLevel.x + starLevel.width * 0.5;
        my.levelFontHeight = starLevel.y + starLevel.height * 0.5 + 6;

        //my._userData.profile.level = 55;
        switch ((my._userData.profile.level + 1).toString().length) {
            case 2:
                //my.levelFontWidth = 185+5;
                //my.levelFontHeight = 43+5;
                break;
            case 3:
                my.coinFont = "26px PassionOne-Regular";
                //my.levelFontWidth = 181+4;
                //my.levelFontHeight = 43+4;
                break;
            case 4:
                my.coinFont = "18px PassionOne-Regular";
                //my.levelFontWidth = 181+3;
                //my.levelFontHeight = 47+3;
                break;
            case 5:
                my.coinFont = "14px PassionOne-Regular";
                //my.levelFontWidth = 181+2;
                //my.levelFontHeight = 51+2;
                break;


        }
        my.level = my.add.text(
            my.levelFontWidth,
            my.levelFontHeight,
            my._userData.profile.level + 1,
            {
                font: my.coinFont,
                fill: "#000000"
            }, group);
        my.level.anchor.setTo(0.5, 0.5);
        my.coinBackground = my.add.sprite(
            490, 16, "new_header_buy_coin_background", null, group
        );
        my.coinBackground.scale.setTo(scale);
        my.coinBackground.inputEnabled = true;
        my.coinBackground.events.onInputDown.add(function () {
            my.animationResize(buyMoreCoin);
            my.showHeaderCoinAnimation({
                x: my.coinBackground.position.x + 30,
                y: my.coinBackground.position.y + 30
            }, group);
            my.showPopupShop();
        });
        //my._userData.profile.coin = 99999999999999;
        my.coinFont = "36px PassionOne-Regular";
        switch (my._userData.profile.coin.toString().length) {
            case 8:
                my.coinFont = "34px PassionOne-Regular";
                break;
            case 9:
                my.coinFont = "32px PassionOne-Regular";
                break;
            case 10:
                my.coinFont = "30px PassionOne-Regular";
                break;
            case 11:
                my.coinFont = "28px PassionOne-Regular";
                break;
            case 12:
                my.coinFont = "26px PassionOne-Regular";
                break;
            case 13:
                my.coinFont = "24px PassionOne-Regular";
                break;
            case 14:
                my.coinFont = "22px PassionOne-Regular";
                break;
            case 15:
                my.coinFont = "20px PassionOne-Regular";
                break;
            default :
                break;
        }
        my._userCoinText = my.add.text(
            590,
            31,
            Lobby.Utils.formatNumberWithCommas(parseFloat(my._userData.profile.coin).toFixed(LobbyConfig.roundNumber)),
            {
                font: my.coinFont,
                fill: "#FFFFFF"
            },
            group
        );
        my._userCoinText.position.x = my.coinBackground.position.x + my.coinBackground.width / 2;
        my._userCoinText.position.y = 49;
        my._userCoinText.anchor.x = 0.5;
        my._userCoinText.anchor.y = 0.5;

        var buyMoreCoin = my.add.sprite(
            734 + 25, 23, 'new-header-btn-buy', null, group
        );
        buyMoreCoin.inputEnabled = true;
        buyMoreCoin.events.onInputDown.add(function () {
            my.animationResize(buyMoreCoin);
            my.showHeaderCoinAnimation({
                x: my.coinBackground.position.x + 30,
                y: my.coinBackground.position.y + 30
            }, group);
            my.showPopupShop();
        });
        buyMoreCoin.scale.setTo(scale);

        my.crownBackground = my.add.sprite(
            880, 16, "new_header_buy_crown_background", null, group
        );
        my.crownBackground.scale.setTo(scale);
        my.crownBackground.inputEnabled = true;
        my.crownBackground.events.onInputDown.add(function () {
            var pos = {x: my.crownBackground.position.x + 47, y: my.crownBackground.position.y + 32};
            my.animationResize(buyMoreCrow);
            my.showHeaderCrownAnimation(pos, group);
            my.showPopupShop(true);
        });
        /**
         * Invoke looping show coin animation on header
         *
         */
        my.time.events.loop(LobbyConfig.delayTimeShowCoinFlareAnimation, function () {
            my.showHeaderCoinAnimation({
                x: my.coinBackground.position.x + 30,
                y: my.coinBackground.position.y + 30
            }, group);

            my.time.events.add(
                LobbyConfig.delayTimeShowCrownAnimAfterCoinAnim - LobbyConfig.delayTimeShowCoinFlareAnimation,
                function () {
                    var pos = {x: my.crownBackground.position.x + 47, y: my.crownBackground.position.y + 32};
                    my.showHeaderCrownAnimation(pos, group);
                }, this);

        }, this);
        /**
         * Invoke looping on crown animation
         */

            //my.time.events.loop(LobbyConfig.delayTimeShowCrownAnimAfterCoinAnim, function () {
            //}, this);


        my.coinFont = "36px PassionOne-Regular";
        switch (my._userData.profile.crown.toString().length) {
            case 8:
                my.coinFont = "34px PassionOne-Regular";
                break;
            case 9:
                my.coinFont = "32px PassionOne-Regular";
                break;
            case 10:
                my.coinFont = "30px PassionOne-Regular";
                break;
            case 11:
                my.coinFont = "28px PassionOne-Regular";
                break;
            case 12:
                my.coinFont = "26px PassionOne-Regular";
                break;
            case 13:
                my.coinFont = "24px PassionOne-Regular";
                break;
            case 14:
                my.coinFont = "22px PassionOne-Regular";
                break;
            case 15:
                my.coinFont = "20px PassionOne-Regular";
                break;
            default :
                break;
        }

        my._userCrownText = my.add.text(
            1035,
            31,
            Lobby.Utils.formatNumberWithCommas(parseFloat(my._userData.profile.crown).toFixed(LobbyConfig.roundNumber)),
            {
                font: my.coinFont,
                fill: "#FFFFFF"
            },
            group
        );
        my.coinFont = "20px PassionOne-Regular";
        my._userCrownText.position.x = my.crownBackground.position.x + my.crownBackground.width / 2 + 10;
        my._userCrownText.position.y = 49;
        my._userCrownText.anchor.x = 0.5;
        my._userCrownText.anchor.y = 0.5;

        var buyMoreCrow = my.add.sprite(
            1133 + 25, 20, 'new-header-btn-buy', null, group
        );
        buyMoreCrow.scale.setTo(scale);

        var ratioNormal = 0.75;
        var ratioScale = 0.65;
        my.btnFriend = Lobby.PhaserJS.createSpriteRectangleWithBiggerTouchZone(my,
            1432,
            13,
            function () {
                if (my.isClickedButtonInHeader == true)
                    return;
                my.currentTab = "";
                my.isClickedButtonInHeader = true;
                my.resizeButtonAndTextAnimationScaleRatio(my.btnFriend.sprite, null, ratioScale);
                my.showHeaderCircleButtonOnclick(my.btnFriend.x - 85, my.btnFriend.y - 85, group);
                my.time.events.add(200,
                    function () {
                        if (my._userData.isFacebookUser) {
                            my.isFirstTimeClickShowPopupFriend = true;
                            my.showPopupFriendNew("friends", false);
                        } else {
                            my.showPopupFriendNew("leaderboard", false,LobbyConstant.LeaderBoard.SORT_LEADER_BOARD_BY_COIN);
                        }
                        my.resizeButtonAndTextAnimationScaleRatio(my.btnFriend.sprite, null, 1);
                    }, this);
                setTimeout(function(){
                    my.isClickedButtonInHeader = false;
                }, 200);
            },
            group,
            isDebug,
            "new_header_btn_friend",
            function () {
            },
            {x: 0, y: 0},
            {x: 2, y: 2},
            {x: -38, y: 0},
            null
        );
        my.btnFriend.scale.setTo(ratioNormal);
        /**
         * Add btn info here
         */

        my.btnInfo = Lobby.PhaserJS.createSpriteRectangleWithBiggerTouchZone(my,
            1432,
            13,
            function () {
                if (my.isClickedButtonInHeader == true)
                    return;
                my.isClickedButtonInHeader = true;
                my.resizeButtonAndTextAnimationScaleRatio(my.btnInfo.sprite, null, ratioScale);
                my.showHeaderCircleButtonOnclick(my.btnInfo.x - 85, my.btnInfo.y - 85, group);
                //var interval = setInterval(function () {
                //    my.resizeButtonAndTextAnimationScaleRatio(my.btnInfo, null, ratioNormal);
                //    clearInterval(interval);
                //    LobbyC.GameSlot.showGameInfo();
                //    my.isClickedButtonInHeader = false;
                //}, 200);
                my.time.events.add(200,
                    function () {
                        my.resizeButtonAndTextAnimationScaleRatio(my.btnInfo.sprite, null, 1);
                        LobbyC.GameSlot.showGameInfo();
                    }, this);
                setTimeout(function(){
                    my.isClickedButtonInHeader = false;
                }, 200);
            },
            group,
            isDebug,
            "new_header_btn_info",
            function () {
            },
            {x: 0, y: 0},
            {x: 1, y: 2},
            null, null);

        my.btnInfo.scale.setTo(ratioNormal);
        my.btnInfo.visible = false;
        var btnSetting = Lobby.PhaserJS.createSpriteRectangleWithBiggerTouchZone(my,
            1516,
            13,
            function () {
                if (my.isClickedButtonInHeader == true)
                    return;
                my.isClickedButtonInHeader = true;
                my.resizeButtonAndTextAnimationScaleRatio(btnSetting.sprite, null, ratioScale);
                my.showHeaderCircleButtonOnclick(btnSetting.x - 85, btnSetting.y - 85, group);
                my.time.events.add(200,
                    function () {
                        my.showNewPopUpSetting();
                        my.resizeButtonAndTextAnimationScaleRatio(btnSetting.sprite, null, 1);
                    }, this);
                setTimeout(function(){
                    my.isClickedButtonInHeader = false;
                }, 200);
            },
            group,
            isDebug,
            "new_header_btn_setting",
            function () {
            },
            {x: 0, y: 0},
            {x: 2, y: 2},
            {x: 38, y: 0},
            null);
        //btnSetting.scale.setTo(0.66);
        btnSetting.scale.setTo(ratioNormal);

        my._maskBackBtn = Lobby.PhaserJS.createSpriteRectangleWithBiggerTouchZone(my,
            1351,
            13,
            function () {
                if(my.playingGame === LobbyConstant.isInGame) {
                    if (my.isClickedButtonInHeader == true)
                        return;
                    my.isClickedButtonInHeader = true;
                    setTimeout(function(){
                        my.isClickedButtonInHeader = false;
                    }, 250);
                    my.resizeButtonAndTextAnimationScaleRatio(my._maskBackBtn.sprite, null, ratioScale);
                    var circleButtonGroup = my.showHeaderCircleButtonOnclick(1265, -75, group);
                    my.time.events.add(250,
                        function () {
                            //my.animationResize(my._maskBackBtn);
                            //my.checkGroupLockPanelList();
                            if (my.canDisableGame) {
                                my.returnToMainMenu(true);
                            } else {
                                my.showGroup(1);
                            }
                            my.resizeButtonAndTextAnimationScaleRatio(my._maskBackBtn.sprite, null, 1);
                            my.isClickedButtonInHeader = false;
                            circleButtonGroup.sprite.destroy();
                        }, this);
                }
            },
            group,
            isDebug,
            "new_header_back_btn",
            function () {
                //my.checkGroupLockPanelList();
                //if (my.canDisableGame) {
                //    my.returnToMainMenu(true);
                //} else {
                //    my.showGroup(1);
                //}
                //my.resizeButtonAndTextAnimationScaleRatio(my._maskBackBtn.sprite, null, ratioNormal);
                //my.isClickedButtonInHeader = false;
            },
            {x: 0, y: 0},
            {x: 2, y: 2},
            {x: -35, y: 0},
            null);

        my._maskBackBtn.scale.setTo(ratioNormal);
        my._maskBackBtn.visible = false;
        my._headerMask = Lobby.PhaserJS.createRectangle(
            my,
            0,
            0,
            22,
            33,
            function () {
            },
            group,
            isDebug);
       if(LobbyConfig.isTestStrategy){
           my.createGroupBoosterPackage(group);
       }
        group.position.y -= ManagerForScale.doubleIncrementHeight();
        my._headerMask.visible = false;
        return group;
    };

    /**
     * hide header
     */
    my.hideHeader = function () {
        if (Lobby.Utils.objectIsNull(my.uiHeader)) {
            return;
        }
        my.uiHeader.visible = false;
    };
    /**
     * not use
     */
    my.showHeader = function () {
        if (Lobby.Utils.objectIsNull(my.uiHeader)) {
            return;
        }
        my.uiHeader.visible = true;
    };
    /**
     * show  new setting popup
     */
    my.showNewPopUpSetting = function () {
        if(LobbyConfig.enablePopupHtml){
            my.popupHtml.showPopupSettingHTML(my);
            //***************RETURN*****************
            return;
        }
        //var group = my.add.group();
        var group;
        if (Lobby.Utils.objectNotNull(my.popupContainer.popupSetting)
            && my.popupContainer.popupSetting != "") {
            group = my.popupContainer.popupSetting;

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

            return;
        } else {
            group = my.add.group();
            group.name = LobbyConfig.popupName.popupSetting;
            my.popupContainer.popupSetting = group;
        }
        Lobby.PhaserJS.scaleGroupForOptimize(group, false);
        var background = my.add.sprite(190, 50, "popup_setting_background");
        background.scale.setTo(2); // reduce resolution game 50%

        group.add(background);
        //var exitBtn = Lobby.PhaserJS.createSpriteRectangleExt(
        //    my,
        //    1347,
        //    40,
        //    function () {
        //        my.resizeButtonAndTextAnimationScaleDown(exitBtn);
        //        exitBtn.frame = 0;
        //        var interval = setInterval(function () {
        //            clearInterval(interval);
        //            my.closePopupWithAnimateDownNew(group);
        //        }, 150);
        //
        //    },
        //    function () {
        //        my.resizeButtonAndTextAnimationScaleUp(exitBtn);
        //        exitBtn.frame = 1;
        //    },
        //    function () {
        //        my.resizeButtonAndTextAnimationScaleUp(exitBtn);
        //        exitBtn.frame = 0;
        //    },
        //    group,
        //    LobbyConfig.isDebug,
        //    'popup-setting-btn-exit'
        //);
        var exitBtn = my.createButtonExitPopup(group, 1347, 40);

        var loggedWith = "Facebook";
        var logoutText = "Logout";
        var accountUID = my._userData.profile.facebookUID;
        var usr_name = my._userData.profile.name;
        if (usr_name.length > 16) {
            usr_name = usr_name.substring(0, 13) + "...";
        }
        //console.log(my._userData.profile);
        if (my._userData.profile.facebookUID == null) {
            accountUID = my._userData.profile.name;
            if (accountUID.length > 16) {
                accountUID = accountUID.substring(0, 13) + "...";
            }
            loggedWith = "PlayPalace";
            logoutText = "Login";
        }
        my.setting_logged_with_lable = my.add.text(
            250,
            105,
            my.selectlanguage.setting_logged_with_lable.text + loggedWith,
            {
                font: "41px PassionOne-Regular",
                fill: "#EACAF2"
            },
            group
        );

        var username = my.add.text(
            250,
            174,
            usr_name,
            {
                font: "32px PassionOne-Regular",
                fill: "#FFFFFF"
            },
            group
        );
        var accText = my.add.text(
            username.x + 275,
            175,
            "Account UID:",
            {
                font: "32px PassionOne-Regular",
                fill: "#FFFFFF"
            },
            group
        );

        var accountUIDText = my.add.text(
            accText.x + 170,
            177,
            accountUID,
            {
                font: "30px PassionOne-Regular",
                fill: "#E673DF"
            },
            group
        );

        // 2016-05-23: Phuoc: luôn add nút logout, khi trong canvas fb thì hide đi
        my.btnLogout = Lobby.PhaserJS.createSpriteRectangleExt(
            my,
            1047,
            131,
            function () {
                my.resizeButtonAndTextAnimationScaleDown(
                    my.btnLogout,
                    my.btnLogoutText,
                    scale,
                    scale
                );

                my.showLoadingAnimation();
                LobbyRequest.User.logout(function (isSuccess, data) {
                    if (!isSuccess) {
                        Lobby.Utils.printConsoleLog("Logout fail: ", data);
                    }
                    //my.clearDataAndLogOut();
                    if (my._userData.profile.facebookUID != null) {
                        FacebookController.getLoginStatus(function (isSuccess, response) {
                            if (response && response.status === 'connected') {
                                FacebookController.logout(function (response) {
                                    //my.game.state.start('Login');
                                    my.clearDataAndLogOut();
                                });
                            } else {
                                my.clearDataAndLogOut();
                                //my.game.state.start('Login');
                            }
                        });
                        //FB.logout( function (response) {
                        //    window.location.href = LobbyConfig.webGameVersionFullUrl;
                        //});
                        //FacebookController.logout(function () {
                        //    window.location.href = LobbyConfig.webGameVersionFullUrl;
                        //});
                    } else {
                        my.clearDataAndLogOut();
                        //my.game.state.start('Login');
                    }
                }, my);
            },
            function () {
            },
            function () {
            },
            group,
            LobbyConfig.isDebug,
            'popup-setting-btn-logout',
            function () {
                my.resizeButtonAndTextAnimationScaleUp(
                    my.btnLogout,
                    my.btnLogoutText,
                    scale,
                    scale
                );
            }
        );
        my.btnLogout.scale.setTo(scale);

        my.btnLogoutText = my.add.text(
            0,
            150,
            my.selectlanguage.setting_logout_lable.text,
            {
                font: "40px PassionOne-Regular",
                fill: "#FFFFFF"
            },
            group
        );
        Lobby.PhaserJS.centerXItemInBackground(my.btnLogoutText, my.btnLogout);
        if (FacebookController.isInFBCanvas()) {
            my.btnLogoutText.alpha = 0;
            my.btnLogout.alpha = 0;
            my.btnLogout.inputEnabled = false;
            my.btnLogout.input.useHandCursor = false;
        }

        //var hostname = window.location.hostname;
        //console.log("hostname", hostname);
        //if (hostname.startsWith("https://apps.facebook.com")) {
        //    my.btnLogoutText.alpha = 0;
        //    my.btnLogout.alpha = 0;
        //    my.btnLogout.inputEnabled = false;
        //    my.btnLogout.input.useHandCursor = false;
        //}

        my.gameOptionText = my.add.text(
            275,
            247,
            my.selectlanguage.setting_game_option_lable.text,
            {
                font: "33px PassionOne-Regular",
                fill: "#EB76E4"
            },
            group
        );
        my.backgroundMusicText = my.add.text(
            270,
            320,
            my.selectlanguage.setting_back_ground_music_lable.text,
            {
                font: "37px PassionOne-Regular",
                fill: "#EACAF2"
            },
            group
        );
        var statusMusic = (my._userSetting.backgroundMusic == "1") ? "on" : "off";
        var btnOnOffBackGroundMusic = Lobby.PhaserJS.createSpriteRectangleExt(
            my,
            1025,
            320,
            function () {

                switch (btnOnOffBackGroundMusic.frame) {
                    case 0:
                        if (my.playingGame === LobbyConstant.isNotInGame) {
                            my.resumeBackGroundMusic();
                        }
                        btnOnOffBackGroundMusic.frame = 1;
                        window.name = "on";
                        my._userSetting.backgroundMusic = "1";
                        Lobby.Utils.setToLocalStorage("backgroundMusic", "1");
                        if (my.playingGame === LobbyConstant.isInGame) {
                            LobbyC.GameSlot.turnOnMusic();
                        }
                        break;
                    case 1:
                        my.pauseBackgroundMusic();
                        window.name = "off";
                        my._userSetting.backgroundMusic = "0";
                        btnOnOffBackGroundMusic.frame = 0;
                        Lobby.Utils.setToLocalStorage("backgroundMusic", "0");
                        if (my.playingGame === LobbyConstant.isInGame) {
                            LobbyC.GameSlot.turnOffMusic();
                        }
                        break;
                }
            },
            function () {
            },
            function () {
            },
            group,
            isDebug,
            'popup-setting-btn-on-off'
        );
        btnOnOffBackGroundMusic.status = statusMusic;
        btnOnOffBackGroundMusic.scale.setTo(0.82);
        btnOnOffBackGroundMusic.frame = parseInt(my._userSetting.backgroundMusic);
        //my.exampleText = my.add.text(
        //    my.backgroundMusicText.x,
        //    my.backgroundMusicText.y + 50,
        //    my.selectlanguage.setting_back_sound_effect_lable.text,
        //    {
        //        font: "37px PassionOne-Regular",
        //        fill: "#EACAF2"
        //    },
        //    group
        //);

        my.soundEffectText = my.add.text(
            my.backgroundMusicText.x,
            my.backgroundMusicText.y + 62.5,
            my.selectlanguage.setting_back_sound_effect_lable.text,
            {
                font: "37px PassionOne-Regular",
                fill: "#EACAF2"
            },
            group
        );

        var btnOnOffSoundEffectMusic = Lobby.PhaserJS.createSpriteRectangleExt(
            my,
            btnOnOffBackGroundMusic.x,
            btnOnOffBackGroundMusic.y + 62.5,
            function () {
                switch (btnOnOffSoundEffectMusic.frame) {
                    case 0:
                        btnOnOffSoundEffectMusic.frame = 1;
                        my._userSetting.soundEffect = "1";
                        Lobby.Utils.setToLocalStorage("soundEffect", "1");
                        break;
                    case 1:
                        btnOnOffSoundEffectMusic.frame = 0;
                        my._userSetting.soundEffect = "0";
                        Lobby.Utils.setToLocalStorage("soundEffect", "0");
                        break;
                }
            },
            function () {
                //btnOnOffBackGroundMusic.frame = 1;
            },
            function () {
                //btnOnOffBackGroundMusic.frame = 1;
            },
            group,
            isDebug,
            'popup-setting-btn-on-off'
        );
        btnOnOffSoundEffectMusic.scale.setTo(0.82);
        btnOnOffSoundEffectMusic.frame = parseInt(my._userSetting.soundEffect);


        my.languageText = my.add.text(
            my.backgroundMusicText.x,
            my.backgroundMusicText.y + 131,
            my.selectlanguage.setting_language.text,
            {
                font: "37px PassionOne-Regular",
                fill: "#EACAF2"
            },
            group
        );
        var show = true;


        my.pushNotificationText = my.add.text(
            my.backgroundMusicText.x + 5,
            my.languageText.y + 71,
            my.selectlanguage.setting_push_notifi_lable.text,
            {
                font: "33px PassionOne-Regular",
                fill: "#EB76E4"
            },
            group
        );

        my.friendRequest = my.add.text(
            my.backgroundMusicText.x,
            my.pushNotificationText.y + 71,
            my.selectlanguage.setting_friend_request_lable.text,
            {
                font: "37px PassionOne-Regular",
                fill: "#EACAF2"
            },
            group
        );
        var language_box = Lobby.PhaserJS.createSpriteRectangleExt(
            my,
            btnOnOffBackGroundMusic.x - 1,
            btnOnOffBackGroundMusic.y + 131,
            function () {
                groupPanelLanguage.visible = !groupPanelLanguage.visible;
            },
            function () {

            },
            function () {

            },
            //group, isDebug, ''
            group, isDebug, 'popup_setting_box_language', null, null
        );
        language_box.alpha = 0;
        language_box.scale.setTo(0.82);
        var arrayLanguageLabel = my.arrayLanguageLabel;
        my.currentFlagText = my.add.text(
            btnOnOffBackGroundMusic.x + 9,
            btnOnOffBackGroundMusic.y + 137,
            //arrayLanguageLabel[my._userData.profile.prefer_language],
            my.selectlanguage.setting_language_lable.text,
            {
                font: "34px PassionOne-Regular",
                fill: "#471F54"
            },
            group
        );
        if (my.currentFlagText.text == my.arrayLanguage.indo.setting_language_lable.text) {
            my.currentFlagText.style.font = "30px PassionOne-Regular";
        }
        else {
            my.currentFlagText.style.font = "34px PassionOne-Regular";
        }
        var btnOnOffFriendRequest = Lobby.PhaserJS.createSpriteRectangleExt(
            my,
            btnOnOffBackGroundMusic.x - 1,
            btnOnOffBackGroundMusic.y + 271,
            function () {
                switch (btnOnOffFriendRequest.frame) {
                    case 0:
                        btnOnOffFriendRequest.frame = 1;
                        my._userSetting.friendRequest = "1";
                        Lobby.Utils.setToLocalStorage("friendRequest", "1");
                        break;
                    case 1:
                        btnOnOffFriendRequest.frame = 0;
                        my._userSetting.friendRequest = "0";
                        Lobby.Utils.setToLocalStorage("friendRequest", "0");
                        break;
                }
            },
            function () {
            },
            function () {
            },
            group,
            isDebug,
            'popup-setting-btn-on-off'
        );
        btnOnOffFriendRequest.scale.setTo(0.82);
        btnOnOffFriendRequest.frame = parseInt(my._userSetting.friendRequest);

        /* ################ Term ################*/
        my.btnTermService = Lobby.PhaserJS.createSpriteRectangleExt(
            my,
            my.friendRequest.x - 18,
            my.friendRequest.y + 95,
            function () {
                //window.open(LobbyConfig.PageTerm);
                my.resizeButtonAndTextAnimationScaleDown(
                    my.btnTermService,
                    my.termServiceText,
                    1,
                    scale
                );
                try {
                    Lobby.Utils.openURLInBrowser(LobbyConfig.PageTerm, '_system');
                } catch (exception) {
                    Lobby.Utils.printConsoleLog(exception);
                }
            },
            function () {
            },
            function () {
            },
            group,
            LobbyConfig.isDebug,
            'popup-setting-btn-term-of-service',
            function () {
                my.resizeButtonAndTextAnimationScaleUp(
                    my.btnTermService,
                    my.termServiceText,
                    1,
                    scale
                );
                my.termServiceText.scale.setTo(1, 1);
            }
        );
        my.btnTermService.scale.setTo(1, scale);
        //var childGroup = my.add.group();
        //group.add(childGroup);
        //childGroup.position = {
        //    x: btnTermService.x + 132,
        //    y: btnTermService.y + 19
        //};

        my.termServiceText = my.add.text(
            0,
            0,
            my.selectlanguage.setting_btn_tearm_lable.text,
            {
                font: "38px PassionOne-Regular",
                fill: "#FFFFFF"
            },
            group
        );
        //my.termServiceText.anchor.x = 0.5;
        Lobby.PhaserJS.centerItemInBackground(my.termServiceText, my.btnTermService);
        /* ################ Term ################*/

        /* ################ Privacy ################*/
        my.btnPrivacyPolicy = Lobby.PhaserJS.createSpriteRectangleExt(
            my,
            my.btnTermService.x + my.btnTermService.width + 10,
            my.btnTermService.y,
            function () {
                //window.open(LobbyConfig.PagePrivacy);
                my.resizeButtonAndTextAnimationScaleDown(
                    my.btnPrivacyPolicy,
                    my.privacyPolicyText,
                    1,
                    scale
                );
                try {
                    Lobby.Utils.openURLInBrowser(LobbyConfig.PagePrivacy, '_system');
                } catch (exception) {
                    Lobby.Utils.printConsoleLog(exception);
                }
            },
            function () {
            },
            function () {
            },
            group,
            LobbyConfig.isDebug,
            'popup-setting-btn-privacy-policy',
            function () {
                my.resizeButtonAndTextAnimationScaleUp(
                    my.btnPrivacyPolicy,
                    my.privacyPolicyText,
                    1,
                    scale
                );
                my.privacyPolicyText.scale.setTo(1, 1);
            }
        );
        my.btnPrivacyPolicy.scale.setTo(1, scale);


        //var childGroup = my.add.group();
        //group.add(childGroup);
        //childGroup.position = {
        //    x: btnTermService.x + 425,
        //    y: btnTermService.y + 19
        //};

        my.privacyPolicyText = my.add.text(
            0,
            0,
            my.selectlanguage.setting_btn_privacy_lable.text,
            {
                font: "38px PassionOne-Regular",
                fill: "#FFFFFF"
            },
            group
        );

        //my.privacyPolicyText.anchor.x = 0.5;
        Lobby.PhaserJS.centerItemInBackground(my.privacyPolicyText, my.btnPrivacyPolicy);
        /* ################ Privacy ################*/

        my.versionText = my.add.text(
            btnOnOffFriendRequest.x + 75,
            btnOnOffFriendRequest.y + 139,
            my.selectlanguage.setting_version_lable.text + " " + LobbyConfig.versionDisplay,
            {
                font: "33px PassionOne-Regular",
                fill: "#EB76E4"
            },
            group
        );
        var numberOfClick = 0;
        var testButton = Lobby.PhaserJS.createRectangle(my,
            my.versionText.x,
            my.versionText.y,
            200,
            50,
            function () {
                numberOfClick++;
                if (numberOfClick == 5) {
                    if (LobbyConfig.useManagerForPopUp) {
                        ManagerForPopUp.forceClosePopUp(my, group);
                    } else {
                        my.closePopupWithAnimateDownNew(group);
                    }
                    my.showPopupTest();
                }
            },
            group,
            LobbyConfig.isDebug
        );

        var groupPanelLanguage;
        my.initNewLanguage = function (parentGroup) {
            var posX = 1025;
            var posY = 502;
            groupPanelLanguage = my.add.group(parentGroup);
            var y = posY;
            var groupLanguage = my.add.group(groupPanelLanguage);


            var createlanguageCell = function (my, posX, indexLanguage) {
                var languageCell = Lobby.PhaserJS.createSpriteRectangleExt(
                    my,
                    posX,
                    y + indexLanguage * 50,
                    function () {
                        my.reloadNewLanguage(indexLanguage);
                        groupPanelLanguage.visible = !groupPanelLanguage.visible;
                        my.applyLanguage(indexLanguage);
                    },
                    function () {
                    },
                    function () {
                    },
                    groupLanguage, isDebug,
                    'popup_setting_box_language',
                    null,
                    null
                );
                my.add.text(
                    posX + 10,
                    y + indexLanguage * 50 + 5,
                    my.arrayLanguageLabel[indexLanguage],
                    {
                        font: "33px PassionOne-Regular",
                        fill: "#FFFFFF"
                    },
                    groupPanelLanguage
                );
                languageCell.scale.setTo(0.82);
            };

            for (var i = 0; i < my.arrayLanguageLabel.length; i++) {
                var key = i;
                createlanguageCell(my, posX, i);
            }
        };
        my.initNewLanguage(group);
        groupPanelLanguage.visible = false;


        my.reloadNewLanguage = function (key) {
            Lobby.Utils.printConsoleLog("Select language", key);
            my.currentFlagText.style.font = "34px PassionOne-Regular";
            switch (key) {
                case 0:
                    my.selectlanguage = my.arrayLanguage.en;
                    my.currentFlagText.text = my.arrayLanguageLabel[0];
                    my.currentlanguageCode = 0;
                    my.applyNewLanguage();
                    break;
                case 1:
                    my.selectlanguage = my.arrayLanguage.vn;
                    my.currentFlagText.text = my.arrayLanguageLabel[1];
                    my.currentlanguageCode = 1;
                    my.applyNewLanguage();
                    break;
                case 2:
                    my.selectlanguage = my.arrayLanguage.cn;
                    my.currentFlagText.text = my.arrayLanguageLabel[2];
                    my.currentlanguageCode = 2;
                    my.applyNewLanguage();
                    break;
                case 3:
                    my.selectlanguage = my.arrayLanguage.trad_cn;
                    my.currentFlagText.text = my.arrayLanguageLabel[3];
                    my.currentlanguageCode = 3;
                    my.applyNewLanguage();
                    break;
                case 4:
                    my.selectlanguage = my.arrayLanguage.my;
                    my.currentFlagText.text = my.arrayLanguageLabel[4];
                    my.currentlanguageCode = 4;
                    my.applyNewLanguage();
                    break;
                case 5:
                    my.selectlanguage = my.arrayLanguage.indo;
                    my.currentFlagText.text = my.arrayLanguageLabel[5];
                    my.currentFlagText.style.font = "30px PassionOne-Regular";
                    my.currentlanguageCode = 5;
                    my.applyNewLanguage();
                    break;
            }

            LobbyRequest.User.setPreferLanguage(my.currentlanguageCode, function (isSuccess, data) {
                Lobby.Utils.printConsoleLog("Set prefer language", isSuccess, data);
            });
            my.showNotificationPopup("", my.selectlanguage.popup_change_language.success);
        };
        my.applyNewLanguage = function () {
            var loggedWith = "Facebook";
            if (my._userData.profile.facebookUID == null) {
                loggedWith = "PlayPalace";
                //my.selectlanguage.setting_logout_lable.text = my.selectlanguage.setting_login_lable.text;
            }
            my.setting_logged_with_lable.text = my.selectlanguage.setting_logged_with_lable.text + loggedWith;

            my.btnLogoutText.text = my.selectlanguage.setting_logout_lable.text;
            Lobby.PhaserJS.centerXItemInBackground(my.btnLogoutText, my.btnLogout);

            my.gameOptionText.text = my.selectlanguage.setting_game_option_lable.text;
            my.backgroundMusicText.text = my.selectlanguage.setting_back_ground_music_lable.text;
            my.soundEffectText.text = my.selectlanguage.setting_back_sound_effect_lable.text;
            my.languageText.text = my.selectlanguage.setting_language.text;
            my.pushNotificationText.text = my.selectlanguage.setting_push_notifi_lable.text;
            my.friendRequest.text = my.selectlanguage.setting_friend_request_lable.text;

            my.termServiceText.text = my.selectlanguage.setting_btn_tearm_lable.text;
            Lobby.PhaserJS.centerItemInBackground(my.termServiceText, my.btnTermService);

            my.privacyPolicyText.text = my.selectlanguage.setting_btn_privacy_lable.text;
            Lobby.PhaserJS.centerItemInBackground(my.privacyPolicyText, my.btnPrivacyPolicy);

            my.versionText.text = my.selectlanguage.setting_version_lable.text + " " + LobbyConfig.versionDisplay;
            my.gifts.text = my.selectlanguage.footer_gift_lable.text;
            my.achievement.text = my.selectlanguage.footer_achievement_lable.text;
            if(my.clock.cancollect === true) my.clock.text = my.selectlanguage.footer_collect_lable.text;

            my.reloadUIGameSlot();

            //my.remainExp.text = my.selectlanguage.
        };

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
    // 2016-5-21: Ty
    /**
     * animation resize sprite
     * @param sprite
     */
    my.animationResize = function (sprite) {
        var positionX = sprite.position.x;
        var positionY = sprite.position.y;
        var width = sprite.width;
        var height = sprite.height;
        var tween = my.add.tween(sprite).to({
            width: width - 10,
            height: height - 10
        }, 100, Phaser.Easing.Quintic.Out, true);
        my.add.tween(sprite.position).to({
            x: positionX + 5,
            y: positionY + 5
        }, 100, Phaser.Easing.Quintic.Out, true);
        tween.onComplete.add(function () {
            my.add.tween(sprite).to({
                width: width,
                height: height
            }, 20, Phaser.Easing.Quintic.Out, true);
            my.add.tween(sprite.position).to({
                x: positionX,
                y: positionY
            }, 20, Phaser.Easing.Quintic.Out, true);
        }, my);
    };

    return my;

}(LobbyC.MainMenu || {}));
