LobbyC.MainMenu = (function (my) {

    my.isGoToLobbyCliked = false;
    var arrayPosXPage = [0, 1300, 2600, 3900, 5200];

    /**
     * Show Circle Effect when click header button
     * @param xCoordinate: x Position
     * @param yCoordinate: y Position
     * @param group: group contain
     * @returns {*} group with effect
     */
    my.showHeaderCircleButtonOnclick = function (xCoordinate, yCoordinate, group) {
        var circleAnimation = my.add.sprite(xCoordinate, yCoordinate, 'header_button_circle_onclink');
        group.sprite = circleAnimation;
        circleAnimation.x += circleAnimation.width * (0.75);
        circleAnimation.y += circleAnimation.height * (0.75);
        circleAnimation.anchor = {x: 0.5, y: 0.5};
        circleAnimation.blendMode = PIXI.blendModes.ADD;
        circleAnimation.scale.setTo(0);
        my.add.tween(circleAnimation.scale).to({x: 1.5, y: 1.5}, 1000, Phaser.Easing.Linear.None, true, 0, 0, false);
        my.add.tween(circleAnimation).to({alpha: 0}, 1000, Phaser.Easing.Linear.None, true, 0, 0, false);
        setTimeout(function(){
            circleAnimation.destroy();
        }, 1500);
        //  In the texture atlas the jellyfish uses the frame names blueJellyfish0000 to blueJellyfish0032
        //  So we can use the handy generateFrameNames function to create this for us.
        //circleAnimation.animations.add('shine', Phaser.Animation.generateFrameNames('HeaderCircle', 0, 14, '', 4), 30, true);

        //circleAnimation.animations.play('shine', 20, false, true);
        group.add(circleAnimation);
        return group;
    };
    /**
     * Show crown flare animation on game slot Cell(premium game)
     * @param xCoordinate: x Position
     * @param yCoordinate: y Position
     * @param group: group slot game cell
     */
    my.showCrownAnimationOnSlotGame = function (xCoordinate, yCoordinate, group) {
        var crownAnimation = my.add.sprite(xCoordinate, yCoordinate, 'body-slotgame-crown-animation');

        //  In the texture atlas the jellyfish uses the frame names blueJellyfish0000 to blueJellyfish0032
        //  So we can use the handy generateFrameNames function to create this for us.
        crownAnimation.animations.add('shine', Phaser.Animation.generateFrameNames('CrownAnimation', 0, 19, '', 4), 30, true);
        crownAnimation.blendMode = PIXI.blendModes.ADD;
        crownAnimation.animations.play('shine', 24, true, false);
        group.add(crownAnimation);
    };

    /**
     * Show star animation on game slot Cell(premium game)
     * @param xCoordinate: x Position
     * @param yCoordinate: y Position
     * @param group: group slot game cell
     */
    my.showStarAnimationOnSlotGame = function (xCoordinate, yCoordinate, group) {
        var crownAnimation = my.add.sprite(xCoordinate, yCoordinate, 'body-slotgame-star-animation-on-crown');

        //  In the texture atlas the jellyfish uses the frame names blueJellyfish0000 to blueJellyfish0032
        //  So we can use the handy generateFrameNames function to create this for us.
        crownAnimation.animations.add('shine', Phaser.Animation.generateFrameNames('StarOnCrownAnimation', 0, 35, '', 4), 30, true);
        crownAnimation.blendMode = PIXI.blendModes.ADD;
        crownAnimation.animations.play('shine', 26, true, false);
        group.add(crownAnimation);
    };
    /**
     * #Thanh
     * Use for create popup unlock info,
     * @param title
     * @param spriteKey
     * @param isUseLockButton
     * @param isUseExitButton
     * @param btnOkTitle
     * @param isDynamicOkButton
     * @param spriteScale
     * @returns {{}}
     */
    my.createPopupUnlockInfo = function(title,spriteKey,isUseLockButton,isUseExitButton,btnOkTitle,isDynamicOkButton,spriteScale){
        if(Lobby.Utils.objectIsNull(isUseLockButton)) isUseLockButton = false;
        if(Lobby.Utils.objectIsNull(isUseExitButton)) isUseExitButton = false;
        if(Lobby.Utils.objectIsNull(btnOkTitle)) btnOkTitle = my.selectlanguage.ok.text;
        if(Lobby.Utils.objectIsNull(isDynamicOkButton)) isDynamicOkButton = false;
        if(Lobby.Utils.objectIsNull(spriteScale)) spriteScale = {x:1,y:1};

        var popupUnlockInfo = {};
        popupUnlockInfo.title = title;
        popupUnlockInfo.spriteKey = spriteKey;
        popupUnlockInfo.isUseLockButton = isUseLockButton;
        popupUnlockInfo.isUseExitButton = isUseExitButton;
        popupUnlockInfo.btnOkTitle = btnOkTitle;
        popupUnlockInfo.isDynamicOkButton = isDynamicOkButton;
        popupUnlockInfo.spriteScale = spriteScale;
        return popupUnlockInfo;

    };
    /**
     * #Thanh
     * Show Unlock Slot New for strategy and popup unlock game
     * @param popupUnlockInfoArray: popup containt popup info
     * @param funcCallBackCompleted: call after all item in popup has been show
     */
    //my.showPopupUnlockNew = function (name, level, gameUnlock, arrayGameUnlock, funcCallBackCompleted) {
    my.showPopupUnlockNew = function (popupUnlockInfoArray, funcCallBackCompleted) {
        if(Lobby.Utils.objectIsNull(funcCallBackCompleted)) funcCallBackCompleted = Lobby.Utils.nullFunction;

        //var popupUnlockInfo = {};
        //popupUnlockInfo.title = title;
        //popupUnlockInfo.spriteKey = spriteKey;
        //popupUnlockInfo.isUseLockButton = isUseLockButton;
        //popupUnlockInfo.isUseExitButton = isUseExitButton;
        //popupUnlockInfo.btnOkTitle = btnOkTitle;
        //popupUnlockInfo.isDynamicOkButton = isDynamicOkButton;
        //popupUnlockInfo.spriteScale = spriteScale;

        my.isGoToLobbyCliked = false;

        var popupUnlockInfo = popupUnlockInfoArray.shift();
        if(Lobby.Utils.objectIsNull(popupUnlockInfo)) {
            funcCallBackCompleted();
            return;
        }


        var group = my.add.group();
        var background = my.add.sprite(0, 0, "popup_unlock_game_bg", null);
        group.add(background);
        background.width += 200;
        background.height += 200;

        if(popupUnlockInfo.isUseExitButton){
            var btnExit = my.createButtonExitPopup(
                group,
                background.width - 70,
                -22,
                null,
                function () {
                    console.log("Press exit");
                    my.showPopupUnlockNew(popupUnlockInfoArray,funcCallBackCompleted);
                }
            );
        }


        var lightRay = my.add.sprite(
            0,
            0,
            //"popup_unlock_game_light_ray",
            "popup_unlock_info_light_ray",
            null,
            group
        );
        lightRay.width = background.height;
        lightRay.height = background.height;
        lightRay.anchor.setTo(0.5,0.5);
        lightRay.x =  background.width/2.0;
        lightRay.y =  background.height/2.0;
        group.update = function(){
            lightRay.angle += 1;
        };
        //Lobby.PhaserJS.centerParent(lightRay, background);

        var title = my.add.sprite(
            0,
            -50,
            "popup_unlock_game_title",
            null,
            group
        );
        Lobby.PhaserJS.centerXParent(title, background);


        var game_slot = Lobby.PhaserJS.createSpriteRectangleExt(
            my,
            0,
            140,
            function () {
            },
            function () {
            },
            function () {
            },
            group,
            LobbyConfig.isDebug,
            popupUnlockInfo.spriteKey,
            null,
            null);

        game_slot.scale.setTo(popupUnlockInfo.spriteScale.x, popupUnlockInfo.spriteScale.y);
        //game_slot.anchor = my.calculateAnchor(game_slot.width, game_slot.height-8);

        Lobby.PhaserJS.centerXItemInBackground(game_slot, background);
        if(!popupUnlockInfo.isUseLockButton){
            Lobby.PhaserJS.centerYItemInBackground(game_slot, background);
        }
        var textMessage = my.add.text(
            0,
            100,
            popupUnlockInfo.title,
            {
                font: "50px " + ConstantFontName.FONT_NAME_PassionOne_Bold,
                fill: "#FFFFFF"
            },
            group
        );
        Lobby.PhaserJS.centerX(textMessage, background.width);
        if(popupUnlockInfo.isUseLockButton){
            var game_slot_lock = my.add.sprite(
                game_slot.position.x + 220,
                game_slot.position.y + 250,
                "popup_unlock_game_lock", null,
                group
            );
        }
        //game_slot_lock.anchor = {x: 0.5, y: 0.5};

        var btnOkText = popupUnlockInfo.btnOkTitle;
        var fontSize = 60;
        var posXBtnOk = background.width / 2 - 160;
        if(popupUnlockInfo.isDynamicOkButton){
            if (my.playingGame === LobbyConstant.isInGame && my.isGoToLobbyCliked == false) {
                fontSize = 45;
                btnOkText = my.selectlanguage.goToLobby.text;
                posXBtnOk = background.width / 2 - 145;
            }
        }
        var closePopup = function(){
            if (LobbyConfig.useManagerForPopUp) {
                ManagerForPopUp.forceClosePopUp(my, group);
            } else {
                my.closePopupWithAnimateDownNew(group);
            }
            my.showPopupUnlockNew(popupUnlockInfoArray,funcCallBackCompleted);
        };
        var btnGoToLobby = my.createButtonGreenPopup(group,
            posXBtnOk,
            500,
            btnOkText,
            1,
            function () {
                if(popupUnlockInfo.isDynamicOkButton && my.playingGame === LobbyConstant.isInGame){
                    my.isGoToLobbyCliked = true;
                    if (LobbyConfig.useManagerForPopUp) {
                        ManagerForPopUp.forceClosePopUp(
                            my,
                            group,
                            function () {
                                my.returnToMainMenu(true, function () {
                                    window.setTimeout(function(){

                                        my.showPopupUnlockNew(popupUnlockInfoArray,funcCallBackCompleted);

                                    },1000);
                                });
                            });
                        //ManagerForPopUp.forceClosePopUp(my, group);
                    } else {
                        my.closePopupImmediately(group);
                        //my.closePopupWithAnimateDownNew(group);
                        my.returnToMainMenu(true, function () {
                            window.setTimeout(function(){

                                my.showPopupUnlockNew(popupUnlockInfoArray,funcCallBackCompleted);

                            },1000);

                        });
                    }
                }
                 else {
                    closePopup();
                }
            },
            fontSize
        );
        //btnGoToLobby.scale.setTo(0.9, 0.9);

        Lobby.PhaserJS.centerX(btnGoToLobby, background.width);
        Lobby.PhaserJS.centerWorld(group);
        group.y = group.y + 35;
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
        if(LobbyC.GameSlot.managerForAutoGameSlot){
            LobbyC.GameSlot.managerForAutoGameSlot.autoClosePopupWhenLevelUp(closePopup);
        }
    };
    /**
     * Show Unlock Slot Game Popup
     * @param name: user name
     * @param level: user level
     * @param gameUnlock: unlocked game
     * @param arrayGameUnlock: array new unlocked game
     */
    my.showUnlockCabinetPopupNew = function (name, level, gameUnlock, arrayGameUnlock, funcCallBackCompleted) {

        var arrayGameUnlockInfo = [];
        for(var i = 0;i<arrayGameUnlock.length;i++){
            var gameUnlockT = arrayGameUnlock[i];
            if ( LobbyConfig.commingSoonGameId.indexOf(gameUnlockT.game_id.replace(LobbyConstant.PREFIX_GAME_MOBILE, "")) > -1 ||
            LobbyConfig.hiddenGameId.indexOf(gameUnlockT.game_id.replace(LobbyConstant.PREFIX_GAME_MOBILE, "")) > -1){
                continue;
            }
            var popupUnlockInfo = my.createPopupUnlockInfo(my.selectlanguage.you_have_unlocked_a_new_game.text,'gameSlot_' + gameUnlockT.id,true,true,null,true,{x:1.2,y:1.2});
            arrayGameUnlockInfo.push(popupUnlockInfo);
        }
        my.showPopupUnlockNew(arrayGameUnlockInfo,funcCallBackCompleted);












        /***
         * Old show canbinet popup
         */
/*
        if(Lobby.Utils.objectIsNull(funcCallBackCompleted)) funcCallBackCompleted = Lobby.Utils.nullFunction;
        //if(gameUnlockIte >= arrayGameUnlock.length) return;
        //var gameUnlock = arrayGameUnlock[gameUnlockIte];
        //if(LobbyConfig.commingSoonGameId.indexOf(gameUnlock.game_id.replace(LobbyConstant.PREFIX_GAME_MOBILE,""))>-1) return;

        my.isGoToLobbyCliked = false;

        var tempGameUnlock = null;
        for (var index = 0; index < arrayGameUnlock.length; index++) {
            if (gameUnlock.id == arrayGameUnlock[index].id)
                tempGameUnlock = arrayGameUnlock[index + 1];
        }



        // 2016-07-22: Phuoc: trên server có config game zeus, nhưng trên client không có resource nên sẽ kiểm thử resource
        // hình, nếu không có thì chuyển sang game kế tiếp
        //console.log("check image key: " + gameUnlock.id, my.cache.checkImageKey("gameSlot_" + gameUnlock.id));
        if (
            //!my.cache.checkImageKey("gameSlot_" + gameUnlock.id)
        //&&
        tempGameUnlock !== undefined
        && LobbyConfig.commingSoonGameId.indexOf(gameUnlock.game_id.replace(LobbyConstant.PREFIX_GAME_MOBILE, "")) > -1 ||
        LobbyConfig.hiddenGameId.indexOf(gameUnlock.game_id.replace(LobbyConstant.PREFIX_GAME_MOBILE, "")) > -1) {
            my.showUnlockCabinetPopupNew(name, level, tempGameUnlock, arrayGameUnlock,funcCallBackCompleted);
            return;
        }

        if(LobbyConfig.availableGame.indexOf(gameUnlock.game_id ) <= -1){
            if (tempGameUnlock !== undefined) {
                my.showUnlockCabinetPopupNew(name, level, tempGameUnlock, arrayGameUnlock,funcCallBackCompleted);
            }else{
                funcCallBackCompleted();
            }
            return;
        }

        var group = my.add.group();
        var background = my.add.sprite(0, 0, "popup_unlock_game_bg", null);
        group.add(background);
        background.width += 200;
        background.height += 200;


        var btnExit = my.createButtonExitPopup(
            group,
            background.width - 70,
            -22,
            null,
            function () {
                if (tempGameUnlock !== undefined) {
                    my.showUnlockCabinetPopupNew(name, level, tempGameUnlock, arrayGameUnlock, funcCallBackCompleted);
                }else{
                    funcCallBackCompleted();
                }
            }
        );


        var lightRay = my.add.sprite(
            0,
            0,
            "popup_unlock_game_light_ray",
            null,
            group
        );
        lightRay.width = background.width;
        lightRay.height = background.height;
        Lobby.PhaserJS.centerParent(lightRay, background);

        var title = my.add.sprite(
            0,
            -50,
            "popup_unlock_game_title",
            null,
            group
        );
        Lobby.PhaserJS.centerXParent(title, background);


        var game_slot = Lobby.PhaserJS.createSpriteRectangleExt(
            my,
            0,
            140,
            function () {
            },
            function () {
            },
            function () {
            },
            group,
            LobbyConfig.isDebug,
            'gameSlot_' + gameUnlock.id,
            null,
            null);

        game_slot.scale.setTo(1.2, 1.2);
        //game_slot.anchor = my.calculateAnchor(game_slot.width, game_slot.height-8);

        Lobby.PhaserJS.centerXItemInBackground(game_slot, background);

        var textMessage = my.add.text(
            0,
            100,
            my.selectlanguage.you_have_unlocked_a_new_game.text,
            {
                font: "50px " + ConstantFontName.FONT_NAME_PassionOne_Bold,
                fill: "#FFFFFF"
            },
            group
        );
        Lobby.PhaserJS.centerX(textMessage, background.width);
        var game_slot_lock = my.add.sprite(
            game_slot.position.x + 220,
            game_slot.position.y + 250,
            "popup_unlock_game_lock", null,
            group
        );
        //game_slot_lock.anchor = {x: 0.5, y: 0.5};

        var btnOkText = my.selectlanguage.ok.text;
        var fontSize = 60;
        var posXBtnOk = background.width / 2 - 160;
        if (my.playingGame === LobbyConstant.isInGame && my.isGoToLobbyCliked == false) {
            fontSize = 45;
            btnOkText = my.selectlanguage.goToLobby.text;
            posXBtnOk = background.width / 2 - 145;
        }
        var btnGoToLobby = my.createButtonGreenPopup(group,
            posXBtnOk,
            game_slot.y + my.dHeight + 130,
            btnOkText,
            1,
            function () {
                //my.checkGroupLockPanelList();
                if (my.playingGame === LobbyConstant.isInGame) {
                    my.isGoToLobbyCliked = true;
                    //my.closePopupWithAnimateDownNew(group);
                    //if (tempGameUnlock !== undefined) {
                    //    my.showUnlockCabinetPopupNew(name, level, tempGameUnlock, arrayGameUnlock);
                    //}
                    //group.darklayer.destroy();
                    //group.destroy(true);
                    //my.closePopupImmediately(group);
                    if (LobbyConfig.useManagerForPopUp) {
                        ManagerForPopUp.forceClosePopUp(
                            my,
                            group,
                            function () {
                                my.returnToMainMenu(true, function () {
                                    if (tempGameUnlock !== undefined) {
                                      window.setTimeout(function(){

                                        my.showUnlockCabinetPopupNew(name, level, tempGameUnlock, arrayGameUnlock,funcCallBackCompleted);

                                      },1000);
                                    }else{
                                        funcCallBackCompleted();
                                    }
                                });
                            });
                        //ManagerForPopUp.forceClosePopUp(my, group);
                    } else {
                        my.closePopupImmediately(group);
                        //my.closePopupWithAnimateDownNew(group);
                        my.returnToMainMenu(true, function () {
                            window.setTimeout(function(){
                                if (tempGameUnlock !== undefined) {
                                    my.showUnlockCabinetPopupNew(name, level, tempGameUnlock, arrayGameUnlock,funcCallBackCompleted);
                                }
                                else{
                                    funcCallBackCompleted();
                                }

                            },1000);

                        });
                    }
                } else {
                    if (LobbyConfig.useManagerForPopUp) {
                        ManagerForPopUp.forceClosePopUp(my, group);
                    } else {
                        my.closePopupWithAnimateDownNew(group);
                    }
                    if (tempGameUnlock !== undefined) {
                      //window.setTimeout(function(){
                        my.showUnlockCabinetPopupNew(name, level, tempGameUnlock, arrayGameUnlock,funcCallBackCompleted);

                      //},3000);
                    }else{
                        funcCallBackCompleted();
                    }
                }
            },
            fontSize
        );
        //btnGoToLobby.scale.setTo(0.9, 0.9);

        Lobby.PhaserJS.centerX(btnGoToLobby, background.width);
        Lobby.PhaserJS.centerWorld(group);
        group.y = group.y + 35;
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
        /*

         */
    };

    /**
     * resize button and text on button
     * @param btn: button
     * @param text: text on button
     * @param ratio: scale ratio
     */
    my.resizeButtonAndTextAnimationScaleRatio = function (btn, text, ratio) {

        var scaleRatio = ratio;
        if (Lobby.Utils.objectNotNull(btn)) {
            Lobby.PhaserJS.scaleObjectAtCenter(
                btn,
                {
                    x: scaleRatio,
                    y: scaleRatio
                }
            );
        }
        if (Lobby.Utils.objectNotNull(text)) {
            Lobby.PhaserJS.scaleObjectAtCenter(
                text,
                {
                    x: scaleRatio,
                    y: scaleRatio
                }
            );
        }

    };
    /**
     * Create Exit Poppup Button
     * @param group: popup group
     * @param coordinateX: x Position
     * @param coordinateY: y Position
     * @param animationCloseQuarter: option for close popup animation (down or left:1)
     * @param functionCallBack: callback after close popup
     * @param prepare4ClosePopup: function prepare to close popup
     * @returns {*} Exit Popup Button
     */
    my.createButtonExitPopup = function (group,
                                         coordinateX,
                                         coordinateY,
                                         animationCloseQuarter,
                                         functionCallBack,
                                         prepare4ClosePopup) {
        // later: remove thử isClosePopup và group.isClosingPopup
        var isDelayClickButton = false;
        var btnExit = Lobby.PhaserJS.createSpriteRectangleExt(
            my,
            coordinateX,
            coordinateY,
            function () {
                my.resizeButtonAndTextAnimationScaleDown(btnExit);
            },
            function () {
                //my.resizeButtonAndTextAnimationScaleUp(btnExit);
            },
            function () {
                //my.resizeButtonAndTextAnimationScaleUp(btnExit);
            },
            group, LobbyConfig.isDebug,
            "btn_close_popup",
            function () {


                // later: remove thử isClosePopup và group.isClosingPopup
                if (isDelayClickButton) {
                    return;
                }
                isDelayClickButton = true;
                setTimeout(function(){
                        isDelayClickButton = false;
                },
                150);


                if (Lobby.Utils.objectNotNull(prepare4ClosePopup)) {
                    prepare4ClosePopup();
                }

                my.resizeButtonAndTextAnimationScaleDown(btnExit);
                //btnExit.frame = 0;
                my.time.events.add(0,
                    function () {
                        my.resizeButtonAndTextAnimationScaleUp(btnExit);
                        switch (animationCloseQuarter) {
                            //left
                            case 1:
                                my.closePopupWithAnimateLeftNew(group);
                                break;
                            ////right
                            //case 2:
                            //    my.closePopupWithAnimateRightNew(group);
                            //    break;
                            //up
                            //case 3:
                            //    my.closePopupWithAnimateUpNew();
                            //    break;
                            ////down
                            case 999:
                                if (LobbyConfig.useManagerForPopUp) {
                                    //ManagerForPopUp.closeCurrentShowingPopUp();
                                    ManagerForPopUp.forceClosePopUp(my, group, functionCallBack);
                                } else {
                                    my.closePopupWithAnimateDownNew(group);
                                }
                                break;
                                break;
                            default :
                                if (LobbyConfig.useManagerForPopUp) {
                                    //ManagerForPopUp.closeCurrentShowingPopUp();
                                    ManagerForPopUp.forceClosePopUp(my, group);
                                } else {
                                    my.closePopupWithAnimateDownNew(group);
                                }
                                break;
                        }
                        if (Lobby.Utils.objectNotNull(functionCallBack)
                            && animationCloseQuarter !== 999) {
                            functionCallBack();
                        }

                    }, this);
            },
            null
        );
        return btnExit;
    };

    /**
     * Create Green Button for Popup
     * @param group: popup group
     * @param coordinateX: x position
     * @param coordinateY: y Position
     * @param text: text on button
     * @param ratio: scale ration for button
     * @param functionCallBack: callback after click button
     * @param fontSize: text's font size
     * @param isPlayingHoverGameInLobbySound: boolen - true if it should play hover game in lobby sound
     * @returns {*} Button
     */
    my.createButtonGreenPopup = function (group,
                                          coordinateX,
                                          coordinateY,
                                          text,
                                          ratio,
                                          functionCallBack,
                                          fontSize,
                                          isPlayingHoverGameInLobbySound) {
        var btnGreen = Lobby.PhaserJS.createSpriteRectangleExt(
            my,
            coordinateX,
            coordinateY,
            function () {
                //my.resizeButtonAndTextAnimationScaleRatio(btnGreen, textBtn, ratio - 0.1);
                btnGreen.scale.setTo(ratio - 0.1);
                my.beforeHoverMousePosition = {x: my.input.activePointer.x, y: my.input.activePointer.y};

                //my.resizeButtonAndTextAnimationScaleRatio(btnGreen, textBtn, ratio - 0.1);
                //setTimeout(function(){
                //    my.resizeButtonAndTextAnimationScaleRatio(btnGreen, textBtn, ratio );
                //}, 200);
                //btnGreen.frame = 0;
                //var interval = setInterval(function () {
                //    clearInterval(interval);
                //    if (Lobby.Utils.objectNotNull(functionCallBack)) {
                //        functionCallBack();
                //    }
                //
                //}, 150);
            },
            function () {
                //my.resizeButtonAndTextAnimationScaleRatio(btnGreen, textBtn, ratio);
                if (isPlayingHoverGameInLobbySound)
                    my.playHoverGameInLobbySound();
                btnGreen.frame = 0;
            },
            function () {
                //my.resizeButtonAndTextAnimationScaleRatio(btnGreen, textBtn, ratio);
                btnGreen.frame = 0;
            },
            group, LobbyConfig.isDebug,
            "btn-green-popup",
            function () {
                //my.resizeButtonAndTextAnimationScaleRatio(btnGreen, textBtn, ratio);
                btnGreen.scale.setTo(ratio);
                var currentMousePosition = my.input.activePointer;
                if (Phaser.Math.distance(my.beforeHoverMousePosition.x, my.beforeHoverMousePosition.y, currentMousePosition.x, currentMousePosition.y) > 10) return;
                if (Lobby.Utils.objectNotNull(functionCallBack)) {
                    my.showPopupWithDelay(btnGreen,functionCallBack);
                    //functionCallBack();
                }
            }
        );
        Lobby.PhaserJS.scaleObjectAtCenter(
            btnGreen,
            {
                x: ratio,
                y: ratio
            }
        );

        var textSize = 40;


        if (Lobby.Utils.objectNotNull(fontSize)) {
            textSize = fontSize;
        }

        var textBtn = my.add.text(
            0,
            0,
            text,
            {
                font: textSize + "px PassionOne-Bold",
                fill: "#FFFFFF",
                align: "center"
                //wordWrap: true,
                //wordWrapHeight: textSize,
                //wordWrapWidth: btnGreen.width
            }
        );
        textBtn.anchor.setTo(0.5);
        btnGreen.addChild(textBtn);

        Lobby.PhaserJS.autoFitText(textBtn, btnGreen.width - 50 * ratio);

        //Lobby.PhaserJS.centerItemInBackground(textBtn, btnGreen);

        //Lobby.PhaserJS.scaleObjectAtCenter(
        //    textBtn,
        //    {
        //        x: ratio,
        //        y: ratio
        //    }
        //);
        btnGreen.textBtn = textBtn;

        return btnGreen;
    };


    /**
     * Create Purple Button for Popup
     * @param group: popup group
     * @param coordinateX: x position
     * @param coordinateY: y Position
     * @param text: text on button
     * @param ratio: scale ration for button
     * @param functionCallBack: callback after click button
     * @param fontSize: text's font size
     * @param isPlayingHoverGameInLobbySound: boolen - true if it should play hover game in lobby sound
     * @returns {*} Button
     */
    my.createButtonPurplePopup = function (group,
                                           coordinateX,
                                           coordinateY,
                                           text,
                                           ratio,
                                           functionCallBack,
                                           fontSize,
                                           isPlayingHoverGameInLobbySound) {
        //var btnPurple = Lobby.PhaserJS.createSpriteRectangleExt(
        //    my,
        //    coordinateX,
        //    coordinateY,
        //    function () {
        //        my.resizeButtonAndTextAnimationScaleRatio(btnPurple, textBtn, ratio - 0.1);
        //        //my.resizeButtonAndTextAnimationScaleRatio(btnPurple, textBtn, ratio - 0.1);
        //        //setTimeout(function(){
        //        //    my.resizeButtonAndTextAnimationScaleRatio(btnPurple, textBtn, ratio );
        //        //}, 200);
        //        //btnPurple.frame = 0;
        //        //var interval = setInterval(function () {
        //        //    clearInterval(interval);
        //        //    if (Lobby.Utils.objectNotNull(functionCallBack)) {
        //        //        functionCallBack();
        //        //    }
        //        //
        //        //}, 150);
        //    },
        //    function () {
        //        //my.resizeButtonAndTextAnimationScaleRatio(btnPurple, textBtn, ratio);
        //        if (isPlayingHoverGameInLobbySound)
        //            my.playHoverGameInLobbySound();
        //        btnPurple.frame = 0;
        //    },
        //    function () {
        //        //my.resizeButtonAndTextAnimationScaleRatio(btnPurple, textBtn, ratio);
        //        btnPurple.frame = 0;
        //    },
        //    group, LobbyConfig.isDebug,
        //    "btn-purple-popup",
        //    function () {
        //        my.resizeButtonAndTextAnimationScaleRatio(btnPurple, textBtn, ratio);
        //
        //        if (Lobby.Utils.objectNotNull(functionCallBack)) {
        //            functionCallBack();
        //        }
        //    }
        //);
        //var textSize = "px PassionOne-Bold";
        //
        //
        //if (Lobby.Utils.objectNotNull(fontSize)) {
        //    textSize = fontSize + textSize;
        //}
        //else {
        //    textSize = "40px PassionOne-Bold";
        //}
        //var textBtn = my.add.text(
        //    0,
        //    0,
        //    text,
        //    {
        //        font: textSize,
        //        fill: "#FFFFFF",
        //        wordWrap: false,
        //        wordWrapWidth: 250,
        //        wordWrapHeight: 130
        //    },
        //    group
        //);
        //Lobby.PhaserJS.centerItemInBackground(textBtn, btnPurple);
        //
        //Lobby.PhaserJS.scaleObjectAtCenter(
        //    textBtn,
        //    {
        //        x: ratio,
        //        y: ratio
        //    }
        //);
        //Lobby.PhaserJS.scaleObjectAtCenter(
        //    btnPurple,
        //    {
        //        x: ratio,
        //        y: ratio
        //    }
        //);
        //btnPurple.textBtn = textBtn;
        //
        //return btnPurple;

        var btnPurple = Lobby.PhaserJS.createSpriteRectangleExt(
            my,
            coordinateX,
            coordinateY,
            function () {
                //my.resizeButtonAndTextAnimationScaleRatio(btnPurple, textBtn, ratio - 0.1);
                btnPurple.scale.setTo(ratio - 0.1);
                my.beforeHoverMousePosition = {x: my.input.activePointer.x, y: my.input.activePointer.y};

                //my.resizeButtonAndTextAnimationScaleRatio(btnPurple, textBtn, ratio - 0.1);
                //setTimeout(function(){
                //    my.resizeButtonAndTextAnimationScaleRatio(btnPurple, textBtn, ratio );
                //}, 200);
                //btnPurple.frame = 0;
                //var interval = setInterval(function () {
                //    clearInterval(interval);
                //    if (Lobby.Utils.objectNotNull(functionCallBack)) {
                //        functionCallBack();
                //    }
                //
                //}, 150);
            },
            function () {
                //my.resizeButtonAndTextAnimationScaleRatio(btnPurple, textBtn, ratio);
                if (isPlayingHoverGameInLobbySound)
                    my.playHoverGameInLobbySound();
                btnPurple.frame = 0;
            },
            function () {
                //my.resizeButtonAndTextAnimationScaleRatio(btnPurple, textBtn, ratio);
                btnPurple.frame = 0;
            },
            group, LobbyConfig.isDebug,
            "btn-purple-popup",
            function () {
                //my.resizeButtonAndTextAnimationScaleRatio(btnPurple, textBtn, ratio);
                btnPurple.scale.setTo(ratio);
                var currentMousePosition = my.input.activePointer;
                if (Phaser.Math.distance(my.beforeHoverMousePosition.x, my.beforeHoverMousePosition.y, currentMousePosition.x, currentMousePosition.y) > 10) return;
                if (Lobby.Utils.objectNotNull(functionCallBack)) {
                    functionCallBack();
                }
            }
        );
        Lobby.PhaserJS.scaleObjectAtCenter(
            btnPurple,
            {
                x: ratio,
                y: ratio
            }
        );

        var textSize = 40;


        if (Lobby.Utils.objectNotNull(fontSize)) {
            textSize = fontSize;
        }

        var textBtn = my.add.text(
            0,
            0,
            text,
            {
                font: textSize + "px PassionOne-Bold",
                fill: "#FFFFFF",
                align: "center"
                //wordWrap: true,
                //wordWrapHeight: textSize,
                //wordWrapWidth: btnPurple.width
            }
        );
        textBtn.anchor.setTo(0.5);
        btnPurple.addChild(textBtn);

        Lobby.PhaserJS.autoFitText(textBtn, btnPurple.width - 50 * ratio);

        //Lobby.PhaserJS.centerItemInBackground(textBtn, btnPurple);

        //Lobby.PhaserJS.scaleObjectAtCenter(
        //    textBtn,
        //    {
        //        x: ratio,
        //        y: ratio
        //    }
        //);
        btnPurple.textBtn = textBtn;

        return btnPurple;
    };

    return my;

}(LobbyC.MainMenu || {}));
