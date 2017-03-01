/**
 * Created by Kiet on 12/7/2016.
 */
LobbyC.MainMenu = (function (my) {

    my.transparentLayerTutorial = 0;
    my.bitmapTransparent = 0;
    my.currentAreaCanClick = {
        iX: 0,
        iY: 0,
        r: 0
    };

    my.currentCircleMask = 0;
    my.currenArrow = 0;
    my.currentText = 0;
    my.currentModelGirl = 0;
    my.fadeTimeTutorial = 600;

    /**
     * create transparent circle
     * @param iX            center x of circle
     * @param iY            center y of circle
     * @param r             radius of circle
     * @param radio         don't use
     * @param color         color outside circle
     * @param alpha         alpha color outside circle
     * @param width         width of canvas
     * @param height        height of canvas
     * @returns {*}
     */
    my.createCircleMask = function (iX, iY, r, radio, color, alpha, width, height) {
        if (Lobby.Utils.objectIsNull(iX)) iX = 300;
        if (Lobby.Utils.objectIsNull(iY)) iY = 300;
        if (Lobby.Utils.objectIsNull(r)) r = 100;
        if (Lobby.Utils.objectIsNull(radio)) radio = 0.93;
        if (Lobby.Utils.objectIsNull(color)) color = 0x000000;
        if (Lobby.Utils.objectIsNull(alpha)) alpha = 0.8;
        if (Lobby.Utils.objectIsNull(width)) width = 2000;
        if (Lobby.Utils.objectIsNull(height)) height = 2000;
        iX = Math.floor(iX);
        iY = Math.floor(iY);
        r = Math.floor(r);
        var graphics = my.add.graphics(0, 0);
        //my.tutorialGroup.add(graphics);
        //CIRCLE 2
        graphics.beginFill(color, alpha);
        graphics.moveTo(iX - r, iY - r);
        graphics.lineTo(iX, iY - r);
        graphics.arc(iX, iY, r, my.game.math.degToRad(-180), my.game.math.degToRad(-90), false);
        graphics.lineTo(iX - r, iY - r);
        graphics.endFill();

        graphics.beginFill(color, alpha);
        graphics.moveTo(iX + r, iY - r);
        graphics.lineTo(iX, iY - r);
        graphics.arc(iX, iY, r, my.game.math.degToRad(-90), my.game.math.degToRad(0), false);
        graphics.lineTo(iX + r, iY - r);
        graphics.endFill();

        graphics.beginFill(color, alpha);
        graphics.moveTo(iX + r, iY + r);
        graphics.lineTo(iX + r, iY);
        graphics.arc(iX, iY, r, my.game.math.degToRad(0), my.game.math.degToRad(90), false);
        graphics.lineTo(iX + r, iY + r);
        graphics.endFill();

        graphics.beginFill(color, alpha);
        graphics.moveTo(iX - r, iY + r);
        graphics.lineTo(iX, iY + r);
        graphics.arc(iX, iY, r, my.game.math.degToRad(90), my.game.math.degToRad(180), false);
        graphics.lineTo(iX - r, iY + r);
        graphics.endFill();


        //CIRCLE
        //graphics.beginFill(color, alpha);
        //graphics.moveTo(iX - r,iY - r);
        //graphics.lineTo(iX, iY - r);
        //graphics.quadraticCurveTo(iX - r * radio, iY - r * radio, iX - r,iY);
        //graphics.lineTo(iX - r,iY - r);
        //graphics.endFill();
        //
        //
        //graphics.beginFill(color, alpha);
        //graphics.moveTo(iX + r,iY - r);
        //graphics.lineTo(iX, iY - r);
        //graphics.quadraticCurveTo(iX + r * radio, iY - r * radio, iX + r,iY);
        //graphics.lineTo(iX + r,iY - r);
        //graphics.endFill();
        //
        //
        //graphics.beginFill(color, alpha);
        //graphics.moveTo(iX - r,iY + r);
        //graphics.lineTo(iX - r, iY);
        //graphics.quadraticCurveTo(iX - r * radio, iY + r * radio, iX, iY + r);
        //graphics.lineTo(iX - r,iY + r);
        //graphics.endFill();
        //
        //
        //graphics.beginFill(color, alpha);
        //graphics.moveTo(iX + r,iY + r);
        //graphics.lineTo(iX, iY + r);
        //graphics.quadraticCurveTo(iX + r * radio,iY + r * radio, iX + r, iY);
        //graphics.lineTo(iX + r,iY + r);
        //graphics.endFill();

        //RETANGLE
        height *= ManagerForScale.getScale();
        width *= ManagerForScale.getScale();
        graphics.beginFill(color, alpha);
        graphics.drawRect(0, 0, iX - r, height);
        graphics.endFill();

        graphics.beginFill(color, alpha);
        graphics.drawRect(iX + r, 0, width - iX + 2 * r, height);
        graphics.endFill();

        graphics.beginFill(color, alpha);
        graphics.drawRect(iX - r, 0, 2 * r, iY - r);
        graphics.endFill();

        graphics.beginFill(color, alpha);
        graphics.drawRect(iX - r, iY + r, 2 * r, height - iY - r);
        graphics.endFill();
        return graphics;
    };

    /**
     * show current step of tutorial
     */
    my.showTutorial = function () {
        //my.tutorialGroup = my.add.group();
        //Lobby.PhaserJS.scaleGroupForOptimize(my.tutorialGroup, true);
        //START TUTORIAL
        var starTutorial = function () {
            LobbyUserData.dataTutorial.isPlayingTutorial = true;
            switch (LobbyUserData.dataTutorial.currentStep) {
                case LobbyConstant.Constant4Tutorial.StepWelcomeScene: //0
                    my.showWelcomeScene(LobbyUserData.dataTutorial.name);
                    break;
                case LobbyConstant.Constant4Tutorial.StepPickGame: // 1
                    my.gotoStep(LobbyConstant.Constant4Tutorial.StepPickGame);
                    break;
                case LobbyConstant.Constant4Tutorial.StepChangeBet:// 2
                    my.showGame("nezha");
                    break;
                case LobbyConstant.Constant4Tutorial.StepCustomize:// 3
                    my.showGame("nezha");
                    break;
                case LobbyConstant.Constant4Tutorial.StepSpin:// 4
                    my.showGame("nezha");
                    break;
                case LobbyConstant.Constant4Tutorial.StepClickHomeButton:// 5
                    LobbyRequest.User.finishTutorial(function (isSuccess, data) {
                        if (isSuccess == true) {
                            Lobby.Utils.setToLocalStorage(LobbyConstant.Constant4Tutorial.keyStoringIsCompleteSuccessTutorialRequest + LobbyUserData.dataTutorial.name, 1);
                        }
                        my.reloadAchievementNotification();
                        my.gotoStep(LobbyConstant.Constant4Tutorial.StepShowAchievementPopup);
                    });
                    break;
                case LobbyConstant.Constant4Tutorial.StepShowAchievementPopup:// 6
                    my.gotoStep(LobbyConstant.Constant4Tutorial.StepShowAchievementPopup);
                    break;
                case LobbyConstant.Constant4Tutorial.StepShowPopupShop:// 7
                    my.gotoStep(LobbyConstant.Constant4Tutorial.StepShowPopupShop);
                    break;
                //case LobbyConstant.Constant4Tutorial.StepClickFreeCoin:// 8
                //    break;
                //case 9:// 9
                //    break;
                //case 10:// 10
                //    break;
                default:
                    my.exitTutorial();
                    break;
            }
        };


        my.loadCurrentStepToUserDaTa();
        my.createLayerAndTurnOffScrollForNewPopup();

        //DEBUG
        //LobbyUserData.dataTutorial.isCanPlayTutorial = true;
        //LobbyUserData.dataTutorial.currentStep = LobbyConstant.Constant4Tutorial.StepWelcomeScene;
        //LobbyUserData.dataTutorial.currentStep = LobbyConstant.Constant4Tutorial.StepChangeBet;


        //SET TEXT COIN
        var numberCoinWillShow = my._userData.profile.coin;
        if (LobbyUserData.dataTutorial.isFirstLogin == 1) {
            numberCoinWillShow = 0;
            LobbyUserData.dataTutorial.currentStep = 0;
            var userCoin = numberCoinWillShow;
            userCoin = userCoin>0?userCoin:0;
            my._userCoinText.text = Lobby.Utils.formatNumberWithCommas(parseFloat(userCoin).toFixed(LobbyConfig.roundNumber))
            starTutorial();
        } else if (LobbyUserData.dataTutorial.isCanGetPreRewardTutorial == true) {
            numberCoinWillShow -= 100000;
            LobbyRequest.User.redeemPreTutorialReward(function (isSuccess, data) {
                if (isSuccess) {
                    LobbyUserData.dataTutorial.currentStep = 0;
                    starTutorial();
                } else {
                    my.exitTutorial(false);
                }
            });
            var userCoin = numberCoinWillShow;
            userCoin = userCoin>0?userCoin:0;
            my._userCoinText.text = Lobby.Utils.formatNumberWithCommas(parseFloat(userCoin).toFixed(LobbyConfig.roundNumber))
        } else if (LobbyUserData.dataTutorial.isCanPlayTutorial == true) {
            if (LobbyUserData.dataTutorial.isCompleteSuccessTutorialRequest == 1) {
                //set allow tutorial in admin tool
                if (LobbyUserData.dataTutorial.currentStep == LobbyConstant.Constant4Tutorial.StepEnd)
                    LobbyUserData.dataTutorial.currentStep = LobbyConstant.Constant4Tutorial.StepPickGame;
            } else {
                if (LobbyUserData.dataTutorial.currentStep == LobbyConstant.Constant4Tutorial.StepEnd) {
                    LobbyRequest.User.finishTutorial(function (isSuccess, data) {
                        if (isSuccess == true) {
                            Lobby.Utils.setToLocalStorage(LobbyConstant.Constant4Tutorial.keyStoringIsCompleteSuccessTutorialRequest + LobbyUserData.dataTutorial.name, 1);
                        }
                    });
                } else {
                    if (LobbyUserData.dataTutorial.isCreateUserFromThisDevice == 1) {
                        switch (LobbyUserData.dataTutorial.currentStep) {
                            case LobbyConstant.Constant4Tutorial.StepWelcomeScene:
                                numberCoinWillShow = 0;
                                break;
                            case LobbyConstant.Constant4Tutorial.StepPickGame: // 1
                            case LobbyConstant.Constant4Tutorial.StepChangeBet:// 2
                            case LobbyConstant.Constant4Tutorial.StepCustomize:// 3
                            case LobbyConstant.Constant4Tutorial.StepSpin:// 4
                            case LobbyConstant.Constant4Tutorial.StepClickHomeButton:// 5
                                numberCoinWillShow = 100000;
                                break;
                            case LobbyConstant.Constant4Tutorial.StepShowAchievementPopup:// 6
                            case LobbyConstant.Constant4Tutorial.StepShowPopupShop:// 7
                            case LobbyConstant.Constant4Tutorial.StepClickFreeCoin:// 8
                                numberCoinWillShow = 250000;
                                break;
                            default:
                                my.exitTutorial();
                                break;
                        }
                    } else {
                        numberCoinWillShow = my._userData.profile.coin;
                    }
                }
            }
            var userCoin = numberCoinWillShow;
            userCoin = userCoin>0?userCoin:0;
            my._userCoinText.text = Lobby.Utils.formatNumberWithCommas(parseFloat(userCoin).toFixed(LobbyConfig.roundNumber));
            starTutorial();
        } else if (LobbyUserData.dataTutorial.currentStep != LobbyConstant.Constant4Tutorial.StepEnd
            && LobbyUserData.dataTutorial.currentStep >= LobbyConstant.Constant4Tutorial.StepClickHomeButton) {
            starTutorial();
        } else {
            my.exitTutorial(false);
        }

    };

    /**
     * create layer avoid click on game, turn of scroll
     */
    my.createLayerAndTurnOffScrollForNewPopup = function () {
        //scroll turn off
        my.game.pageViewMain.isDisable = true;
        my.game.kineticScrolling.isDisable = true;
        //create again darkLayer
        if (my.transparentLayerTutorial != 0
            && Lobby.Utils.objectNotNull(my.transparentLayerTutorial)) {
            my.transparentLayerTutorial.destroy();
        }
        my.transparentLayerTutorial = my.add.sprite(0, 0, "popup-dark-layer-login-state");
        //my.tutorialGroup.add(my.transparentLayerTutorial);
        my.transparentLayerTutorial.alpha = 0;
        my.transparentLayerTutorial.inputEnabled = true;
        my.transparentLayerTutorial.events.onInputUp.add(function () {
            my.processEventClickTutorial();
        });
    };

    /**
     * show welcome scene
     * @param userName      name of user show on welcome scene
     */
    my.showWelcomeScene = function (userName) {
        var group = my.add.group();
        Lobby.PhaserJS.scaleGroupForOptimize(group, true);
        var background = my.add.sprite(0, 0, "background_red", null);
        group.add(background);
        ManagerForScale.doubleAndRevertImg(group, background, "background_red", null, my);
        var darkLayer = my.add.sprite(0, 0, "popup-dark-layer-login-state");
        darkLayer.alpha = 0.5;
        darkLayer.y -= ManagerForScale.doubleIncrementHeight();
        darkLayer.scale.setTo(1, ManagerForScale.getScale());
        group.add(darkLayer);

        var model = my.add.sprite(LobbyConfig.width / 7 - 100, LobbyConfig.height / 4 + 25, "body_model", null);
        model.scale.setTo(100 / 70, 100 / 70);
        model.y += ManagerForScale.doubleIncrementHeight();
        group.add(model);
        var maxText = 16;
        if (userName.length > maxText) {
            userName = userName.substring(0, maxText) + "...";
        }

        var welcomeText = my.add.text(
            LobbyConfig.width / 2 - 380,
            LobbyConfig.height / 2 - 180,
            "WELCOME " + userName + "!",
            {

                font: "85px PassionOne-Bold",
                fill: "#FFD24D",
                wordWrap: true,
                wordWrapWidth: background.width - 100,
                align: "center"
            },
            group
        );


        var infoText = my.add.text(
            welcomeText.x + 150,
            welcomeText.y + 100,
            "Here is 100,000 bonus\n to get you started!",
            {
                font: "50px PassionOne-Bold",
                fill: "#FFFFFF",
                wordWrap: true,
                wordWrapWidth: background.width - 100,
                align: "center"
            },
            group
        );

        var claimButton = Lobby.PhaserJS.createSpriteRectangleExt(
            my,
            infoText.x - 30,
            infoText.y + 170,
            function () {
            },
            function () {
                //my.resizeButtonAndTextAnimationScaleRatio(claimButton, claimText, 0.7);
                //my.resizeButtonAndTextAnimationScaleRatio(btnPurple, textBtn, ratio);
                claimButton.frame = 0;
            },
            function () {
                //my.resizeButtonAndTextAnimationScaleRatio(btnPurple, textBtn, ratio);
                claimButton.frame = 0;
            },
            group,
            LobbyConfig.isDebug,
            "collect-welcomeScene",
            function () {
                my.resizeButtonAndTextAnimationScaleRatio(claimButton, claimText, 0.8);
                group.destroy();
                my._userCoinText.text = "0";
                my.playAllAnimationCoinAndUpdateHeader(100000, 2000,
                    function () {
                        if (LobbyUserData.dataTutorial.isCanPlayTutorial) {
                            my.gotoStep(1);
                        } else {
                            my.exitTutorial();
                        }
                    }, null, null, false);

            },
            null
        );
        var claimText = my.add.text(
            0,
            0,
            "Claim 100,000!",
            {
                font: "65px PassionOne-Bold",
                fill: "#FFFFFF",
                wordWrap: true,
                wordWrapWidth: background.width - 100,
                align: "center"
            },
            group
        );

        Lobby.PhaserJS.centerItemInBackground(claimText, claimButton);

        Lobby.PhaserJS.scaleObjectAtCenter(
            claimText,
            {
                x: 0.9,
                y: 0.9
            }
        );
        Lobby.PhaserJS.scaleObjectAtCenter(
            claimButton,
            {
                x: 0.9,
                y: 0.9
            }
        );
        claimButton.textBtn = claimText;
    };

    /**
     * process for clicking at tutorial point
     */
    my.processEventClickTutorial = function () {
        var x = my.input.activePointer.x;
        var y = my.input.activePointer.y;

        var isClickInCircle = function () {
            if (x < (my.currentAreaCanClick.iX - my.currentAreaCanClick.r)
                || x > my.currentAreaCanClick.iX + my.currentAreaCanClick.r
                || y < my.currentAreaCanClick.iY - my.currentAreaCanClick.r
                || y > my.currentAreaCanClick.iY + my.currentAreaCanClick.r) {
                return false;
            }
            return true;
        };
        //CLICK TRUNG FREE COIN HAY KHONG
        if ((isClickInCircle() == false
            && LobbyUserData.dataTutorial.currentStep != LobbyConstant.Constant4Tutorial.StepClickFreeCoin)
            || LobbyUserData.dataTutorial.currentStep == LobbyConstant.Constant4Tutorial.StepCustomize) {
            return;
        }
        my.destroyAllChildTutorial();
        my.createLayerAndTurnOffScrollForNewPopup();
        switch (LobbyUserData.dataTutorial.currentStep) {
            case LobbyConstant.Constant4Tutorial.StepPickGame: // 1
                my.destroyAllChildTutorial();
                LobbyUserData.dataTutorial.currentStep = LobbyConstant.Constant4Tutorial.StepChangeBet;
                my.showGame("nezha");
                break;
            case LobbyConstant.Constant4Tutorial.StepChangeBet:// 2
                LobbyC.GameSlot.getCurrentGame().s_oGame.getFooter().reloadBet(6000);
                my.gotoStep(LobbyConstant.Constant4Tutorial.StepCustomize);
                break;
            case LobbyConstant.Constant4Tutorial.StepCustomize:// 3
                break;
            case LobbyConstant.Constant4Tutorial.StepSpin:// 4
                LobbyC.GameSlot.getCurrentGame().s_oGame.onSpin();
                if (LobbyUserData.dataTutorial.isCreateUserFromThisDevice == false) {
                    LobbyRequest.User.redeemTutorialReward(
                        function (isSuccess, data) {
                            if (isSuccess) {
                                my.reloadHeader();
                            }
                        });
                }
                break;
            case LobbyConstant.Constant4Tutorial.StepClickHomeButton:// 5
                LobbyRequest.User.finishTutorial(function (isSuccess, data) {
                    //thoat ra main menu
                    my.returnToMainMenu(true);
                    // 2016-07-23: Phuoc: khi call returnToMainMenu thì sẽ start lại state MainMenu, sẽ tự call reloadAchievementNotification
                    // -> comment out my.reloadAchievementNotification() ở dưới
                    //my.reloadAchievementNotification();
                    my.gotoStep(LobbyConstant.Constant4Tutorial.StepShowAchievementPopup);
                    if (isSuccess == true) {
                        Lobby.Utils.setToLocalStorage(LobbyConstant.Constant4Tutorial.keyStoringIsCompleteSuccessTutorialRequest + LobbyUserData.dataTutorial.name, 1);
                    }
                });
                //my.returnToMainMenu(true);
                //my.reloadAchievementNotification();
                break;
            case LobbyConstant.Constant4Tutorial.StepShowAchievementPopup:// 6
                my.showAchievementPopUp();
                break;
            case LobbyConstant.Constant4Tutorial.StepShowPopupShop:// 7
                my.showPopupShop();
                my.createLayerAndTurnOffScrollForNewPopup();
                my.gotoStep(LobbyConstant.Constant4Tutorial.StepClickFreeCoin);
                break;
            case LobbyConstant.Constant4Tutorial.StepClickFreeCoin:// 8
                if (isClickInCircle() == true
                    && !Lobby.Utils.isWeb()) {
                    if (window.adcolony.loadedRewardedVideoAd() == true
                        && my.popupContainer.popupShop.btnFreeCoin != 0x777777) {
                        my.showVideoAdcolony();
                    }
                }
                my.exitTutorial();
                break;
            default:
                my.exitTutorial();
                break;
        }
    };

    /**
     * jump to step i
     * @param i
     */
    my.gotoStep = function (i) {

        LobbyUserData.dataTutorial.currentStep = i;
        LobbyUserData.dataTutorial.isFirstLogin = 0;
        //SAVE STEP
        if (LobbyUserData.dataTutorial.currentStep != LobbyConstant.Constant4Tutorial.StepClickFreeCoin)
            my.saveCurrenStep();

        if (LobbyUserData.dataTutorial.currentStep == LobbyConstant.Constant4Tutorial.StepCustomize) {
            my.time.events.add(3000,
                function () {
                    if (my._userData.profile.coin >= LobbyC.GameSlot.currentGameSlot.s_iTotBet
                        && LobbyUserData.dataTutorial.isCanSpinTutorial) {
                        my.gotoStep(LobbyConstant.Constant4Tutorial.StepSpin);
                    } else {
                        my.gotoStep(LobbyConstant.Constant4Tutorial.StepClickHomeButton);
                    }
                }, this);
        }
        //SET CIRCLE MASK
        my.setupCircleMask();
        //SET ARROW
        my.setupArrow();
        //SET TEXT
        my.setupText();
        //SET MODEL GIRL
        my.setupModelGirl();
        //SHOW WITH ANIMATION
        my.showTutorialWithFadeAnimation();
    };

    /**
     * animation to star tutorial at current step
     */
    my.showTutorialWithFadeAnimation = function () {
        my.currentCircleMask.alpha = 0;
        my.currenArrow.alpha = 0;
        my.currentText.alpha = 0;
        if (my.currentModelGirl != 0
            && Lobby.Utils.objectNotNull(my.currentModelGirl)) {
            my.currentModelGirl.alpha = 0;
            my.add.tween(my.currentModelGirl).to({alpha: 1}, my.fadeTimeTutorial, Phaser.Easing.Linear.None, true, 0, 0, false);
        }
        my.add.tween(my.currentCircleMask).to({alpha: 1}, my.fadeTimeTutorial, Phaser.Easing.Linear.None, true, 0, 0, false);
        my.add.tween(my.currenArrow).to({alpha: 1}, my.fadeTimeTutorial, Phaser.Easing.Linear.None, true, 0, 0, false);
        my.add.tween(my.currentText).to({alpha: 1}, my.fadeTimeTutorial, Phaser.Easing.Linear.None, true, 0, 0, false);

    };

    /**
     * create circle mask lay on tutorial point
     */
    my.setupCircleMask = function () {
        switch (LobbyUserData.dataTutorial.currentStep) {
            case LobbyConstant.Constant4Tutorial.StepPickGame: // 1
                my.currentAreaCanClick.iX = 480;
                my.currentAreaCanClick.iY = 280 + ManagerForScale.doubleIncrementHeight();
                my.currentAreaCanClick.r = 150;
                break;
            case LobbyConstant.Constant4Tutorial.StepChangeBet:// 2
                my.currentAreaCanClick.iX = LobbyConfig.width / 4 + 635;
                my.currentAreaCanClick.iY = LobbyConfig.height - 60 + ManagerForScale.tripleIncrementHeight();
                my.currentAreaCanClick.r = 90;
                break;
            case LobbyConstant.Constant4Tutorial.StepCustomize:// 3
                my.currentAreaCanClick.iX = 77;
                my.currentAreaCanClick.iY = 55;
                my.currentAreaCanClick.r = 50;
                break;
            case LobbyConstant.Constant4Tutorial.StepSpin:// 4
                my.currentAreaCanClick.iX = LobbyConfig.width - 110;
                my.currentAreaCanClick.iY = LobbyConfig.height / 2 + 5 + ManagerForScale.doubleIncrementHeight();
                my.currentAreaCanClick.r = 150 * ManagerForScale.getScale();
                break;
            case LobbyConstant.Constant4Tutorial.StepClickHomeButton:// 5
                my.currentAreaCanClick.iX = LobbyConfig.width / 2 + 585;
                my.currentAreaCanClick.iY = 48;
                my.currentAreaCanClick.r = 50;
                break;
            case LobbyConstant.Constant4Tutorial.StepShowAchievementPopup: // 6
                my.currentAreaCanClick.iX = LobbyConfig.width / 4 + 80;
                my.currentAreaCanClick.iY = LobbyConfig.height + 20 + ManagerForScale.tripleIncrementHeight();
                my.currentAreaCanClick.r = 130;
                break;
            case LobbyConstant.Constant4Tutorial.StepShowPopupShop: // 7
                my.currentAreaCanClick.iX = LobbyConfig.width / 4 + 120;
                my.currentAreaCanClick.iY = 50;
                my.currentAreaCanClick.r = 50;
                break;
            case LobbyConstant.Constant4Tutorial.StepClickFreeCoin: // 8
                my.currentAreaCanClick.iX = LobbyConfig.width / 2 - 435;
                my.currentAreaCanClick.iY = LobbyConfig.height / 2 + 100 + ManagerForScale.doubleIncrementHeight();
                my.currentAreaCanClick.r = 240;

                break;
            default:
                break;
        }

        if (my.currentCircleMask != 0
            && Lobby.Utils.objectNotNull(my.currentCircleMask)) {
            my.currentCircleMask.destroy();
        }
        my.currentAreaCanClick.iX *= LobbyConfig.scaleRatioEntireGame;
        my.currentAreaCanClick.iY *= LobbyConfig.scaleRatioEntireGame;
        my.currentAreaCanClick.r *= LobbyConfig.scaleRatioEntireGame;
        my.currentCircleMask = my.createCircleMask(my.currentAreaCanClick.iX,
            my.currentAreaCanClick.iY,
            my.currentAreaCanClick.r,
            null,
            null,
            0.8,
            LobbyConfig.width,
            LobbyConfig.height);
    };

    /**
     * arrow animation point at tutorial point
     */
    my.setupArrow = function () {
        var angleSprite = 0;
        var posX = 0;
        var posY = 0;
        switch (LobbyUserData.dataTutorial.currentStep) {
            case LobbyConstant.Constant4Tutorial.StepPickGame: // 1
                angleSprite = -50;
                posX = my.currentAreaCanClick.iX + 1.4 * my.currentAreaCanClick.r;
                posY = my.currentAreaCanClick.iY + 1.3 * my.currentAreaCanClick.r;
                break;
            case LobbyConstant.Constant4Tutorial.StepChangeBet:// 2
                angleSprite = 150;
                posX = my.currentAreaCanClick.iX - 1.3 * my.currentAreaCanClick.r;
                posY = my.currentAreaCanClick.iY - 2.3 * my.currentAreaCanClick.r;
                break;
            case LobbyConstant.Constant4Tutorial.StepCustomize:// 3
                angleSprite = -45;
                posX = my.currentAreaCanClick.iX + 2.8 * my.currentAreaCanClick.r;
                posY = my.currentAreaCanClick.iY + 2.8 * my.currentAreaCanClick.r;
                break;
            case LobbyConstant.Constant4Tutorial.StepSpin:// 4
                angleSprite = 90;
                posX = my.currentAreaCanClick.iX - 1.8 * my.currentAreaCanClick.r;
                posY = my.currentAreaCanClick.iY;
                break;
            case LobbyConstant.Constant4Tutorial.StepClickHomeButton:// 5
                angleSprite = 45;
                posX = my.currentAreaCanClick.iX - 2.8 * my.currentAreaCanClick.r;
                posY = my.currentAreaCanClick.iY + 2.8 * my.currentAreaCanClick.r;
                break;
            case LobbyConstant.Constant4Tutorial.StepShowAchievementPopup: // 6
                angleSprite = -145;
                posX = my.currentAreaCanClick.iX + 170 * LobbyConfig.scaleRatioEntireGame;
                posY = my.currentAreaCanClick.iY - 220 * LobbyConfig.scaleRatioEntireGame;
                break;
            case LobbyConstant.Constant4Tutorial.StepShowPopupShop: // 7
                angleSprite = -35;
                posX = my.currentAreaCanClick.iX + 100 * LobbyConfig.scaleRatioEntireGame;
                posY = my.currentAreaCanClick.iY + 150 * LobbyConfig.scaleRatioEntireGame;
                break;
            case LobbyConstant.Constant4Tutorial.StepClickFreeCoin: // 8
                angleSprite = -130;
                posX = my.currentAreaCanClick.iX + 350 * LobbyConfig.scaleRatioEntireGame;
                posY = my.currentAreaCanClick.iY;
                break;
            default:
                break;
        }
        if (my.currenArrow != 0
            && Lobby.Utils.objectNotNull(my.currenArrow)) {
            my.currenArrow.destroy();
        }
        my.currenArrow = my.add.sprite(posX, posY);
        my.currenArrow.angle = angleSprite;
        //my.tutorialGroup.add(my.currenArrow);
        var spriteArrow = my.add.sprite(0, 0, 'arrow_tutorial');
        spriteArrow.scale.setTo(0.8 * LobbyConfig.scaleRatioEntireGame);
        spriteArrow.anchor.x = 0.5;
        spriteArrow.anchor.y = 0.5;
        my.currenArrow.addChild(spriteArrow);
        my.runAnimationArrow(spriteArrow);
    };

    /**
     * create text 4 tutorial at current step
     */
    my.setupText = function () {
        var text = "";
        var iX = 0;
        var iY = 0;

        switch (LobbyUserData.dataTutorial.currentStep) {
            case LobbyConstant.Constant4Tutorial.StepPickGame: // 1
                iX = my.currenArrow.x + 60;
                iY = my.currenArrow.y + 55;
                text = "Hello "
                    + LobbyUserData.dataTutorial.name + "!"
                    + "\nTap the icon to start!";
                break;
            case LobbyConstant.Constant4Tutorial.StepChangeBet:// 2
                iX = my.currenArrow.x - 200;
                iY = my.currenArrow.y - 160;
                text = "Tap to change bet.";
                //text = "Tap to change bet.\n Change bet to 90000.";
                break;
            case LobbyConstant.Constant4Tutorial.StepCustomize:// 3
                iX = my.currenArrow.x + 80;
                iY = my.currenArrow.y + 80;
                text = "This is you, \n" + LobbyUserData.dataTutorial.name + ".\nCustomize by logging in.";
                break;
            case LobbyConstant.Constant4Tutorial.StepSpin:// 4
                iX = my.currenArrow.x - 230;
                iY = my.currenArrow.y - 10;
                text = "Tap to spin!";
                break;
            case LobbyConstant.Constant4Tutorial.StepClickHomeButton:// 5
                iX = my.currenArrow.x - 250;
                iY = my.currenArrow.y + 110;
                text = "This takes you back \nto the lobby.";
                break;
            case LobbyConstant.Constant4Tutorial.StepShowAchievementPopup: // 6
                iX = my.currenArrow.x + 60;
                iY = my.currenArrow.y - 160;
                text = "Tutorial completed! \nClaim your rewards now\nand spin away.";
                break;
            case LobbyConstant.Constant4Tutorial.StepShowPopupShop: // 7
                iX = my.currenArrow.x + 60;
                iY = my.currenArrow.y + 90;
                text = "One more thing...";
                break;
            case LobbyConstant.Constant4Tutorial.StepClickFreeCoin: // 8
                iX = my.currenArrow.x + 60;
                iY = my.currenArrow.y - 120;
                text = "You can always get more\nfree coins by watching a video.";
                break;
            default:
                break;
        }
        if (my.currentText != 0
            && Lobby.Utils.objectNotNull(my.currentText)) {
            my.currentText.destroy();
        }
        my.currentText = my.add.text(
            iX,
            iY,
            text,
            {
                font: "30px PassionOne-Regular",
                fill: "#FFFFFF",
                wordWrap: true,
                wordWrapWidth: 350,
                align: "left"
            }
        );
    };

    /**
     * show girl for tutorial at current steps
     */
    my.setupModelGirl = function () {
        var iX = -1000;
        var iY = LobbyConfig.height / 4 + 25;
        switch (LobbyUserData.dataTutorial.currentStep) {
            case LobbyConstant.Constant4Tutorial.StepPickGame: // 1
                iX = 10;
                break;
            case LobbyConstant.Constant4Tutorial.StepChangeBet:// 2
                iX = 10;
                break;
            case LobbyConstant.Constant4Tutorial.StepCustomize:// 3
                iX = LobbyConfig.width - 300;
                break;
            case LobbyConstant.Constant4Tutorial.StepSpin:// 4
                iX = 10;
                break;
            case LobbyConstant.Constant4Tutorial.StepClickHomeButton:// 5
                iX = 10;
                break;
            case LobbyConstant.Constant4Tutorial.StepShowAchievementPopup: // 6
                iX = 10;
                break;
            case LobbyConstant.Constant4Tutorial.StepShowPopupShop: // 7
                iX = LobbyConfig.width - 300;
                break;
            case LobbyConstant.Constant4Tutorial.StepClickFreeCoin: // 8
                iX = LobbyConfig.width - 300;
                break;
            default:
                break;
        }
        if (my.currentModelGirl != 0
            && Lobby.Utils.objectNotNull(my.currentModelGirl)) {
            my.currentModelGirl.destroy();
        }

        if (iX != -1000) {
            iY += ManagerForScale.tripleIncrementHeight();
            iX *= LobbyConfig.scaleRatioEntireGame;
            iY *= LobbyConfig.scaleRatioEntireGame;
            my.currentModelGirl = my.add.sprite(iX, iY, "body_model", null);
            my.currentModelGirl.scale.setTo(LobbyConfig.scaleRatioEntireGame * 100 / 70, LobbyConfig.scaleRatioEntireGame * 100 / 70);
            //my.currentModelGirl.scale.setTo(100 / 70, 100 / 70);
            //my.tutorialGroup.add(my.currentModelGirl);
        }
    };

    /**
     * finish tutorial
     * @param isEndStep
     */
    my.exitTutorial = function (isEndStep) {
        if (Lobby.Utils.objectIsNull(isEndStep))isEndStep = true;
        LobbyUserData.dataTutorial.isPlayingTutorial = false;
        if (isEndStep == true) {
            LobbyUserData.dataTutorial.currentStep = LobbyConstant.Constant4Tutorial.StepEnd;

            if (!my.showComebackBonusPopup()) {
                my.checkAndShowPopupBonus();
            }
        }else
            my.game.pageViewMain.isDisable = false;
        my.saveCurrenStep();
        //scroll turn on
        my.game.kineticScrolling.isDisable = false;
        LobbyUserData.dataTutorial.isCanPlayTutorial = false;
        LobbyUserData.dataTutorial.isCanGetPreRewardTutorial = false;

        my.destroyAllChildTutorial();
    };

    /**
     * run arrow animation
     * @param arrowSprite
     */
    my.runAnimationArrow = function (arrowSprite) {
        var timeRunAAnimation = 400;
        //if (Lobby.Utils.isOldSchoolDevice()) timeRunAAnimation *= 4;
        var scaleToSmall = function () {
            var tween = my.add.tween(arrowSprite).to({y: arrowSprite.y - 50 * LobbyConfig.scaleRatioEntireGame}, timeRunAAnimation, Phaser.Easing.Linear.None, true, 0, 0, false);
            my.add.tween(arrowSprite.scale).to({y: 0.6 * LobbyConfig.scaleRatioEntireGame}, timeRunAAnimation, Phaser.Easing.Linear.None, true, 0, 0, false);
            tween.onComplete.add(scaleToBig, this);
        };
        var scaleToBig = function () {
            var tween = my.add.tween(arrowSprite).to({y: arrowSprite.y + 50 * LobbyConfig.scaleRatioEntireGame}, timeRunAAnimation, Phaser.Easing.Linear.None, true, 0, 0, false);
            my.add.tween(arrowSprite.scale).to({y: 0.8 * LobbyConfig.scaleRatioEntireGame}, timeRunAAnimation, Phaser.Easing.Linear.None, true, 0, 0, false);
            tween.onComplete.add(scaleToSmall, this);
        };
        scaleToSmall();
    };

    /**
     * save current step info of tutorial to cache
     */
    my.saveCurrenStep = function () {
        Lobby.Utils.setToLocalStorage(LobbyConstant.Constant4Tutorial.keyStoringCurrentStep + LobbyUserData.dataTutorial.name,
            LobbyUserData.dataTutorial.currentStep);
        Lobby.Utils.setToLocalStorage(LobbyConstant.Constant4Tutorial.keyStoringFirstLogin + LobbyUserData.dataTutorial.name,
            LobbyUserData.dataTutorial.isFirstLogin);
    };

    /**
     * get current step info for logined user
     */
    my.loadCurrentStepToUserDaTa = function () {
        var currentStep = Lobby.Utils.getFromLocalStorage(LobbyConstant.Constant4Tutorial.keyStoringCurrentStep + LobbyUserData.dataTutorial.name);
        if (Lobby.Utils.objectNotNull(currentStep)
            && currentStep != ""
            && currentStep != 0) {
            LobbyUserData.dataTutorial.currentStep = parseInt(currentStep);
        }

        var isFirstLogin = Lobby.Utils.getFromLocalStorage(LobbyConstant.Constant4Tutorial.keyStoringFirstLogin + LobbyUserData.dataTutorial.name);
        if (Lobby.Utils.objectNotNull(isFirstLogin)
            && isFirstLogin != ""
            && isFirstLogin != 0) {
            LobbyUserData.dataTutorial.isFirstLogin = isFirstLogin;
        }

        var isCreateAccFromThisDevice = Lobby.Utils.getFromLocalStorage(LobbyConstant.Constant4Tutorial.keyStoringIsCreateUserFromThisDevice + LobbyUserData.dataTutorial.name);
        if (Lobby.Utils.objectNotNull(isCreateAccFromThisDevice)
            && isCreateAccFromThisDevice != ""
            && isCreateAccFromThisDevice != 0) {
            LobbyUserData.dataTutorial.isCreateUserFromThisDevice = isCreateAccFromThisDevice;
        }

        var isCompleteTutorial = Lobby.Utils.getFromLocalStorage(LobbyConstant.Constant4Tutorial.keyStoringIsCompleteSuccessTutorialRequest + LobbyUserData.dataTutorial.name);
        if (Lobby.Utils.objectNotNull(isCompleteTutorial)
            && isCompleteTutorial != ""
            && isCompleteTutorial != 0) {
            LobbyUserData.dataTutorial.isCompleteSuccessTutorialRequest = isCompleteTutorial;
        }
    };

    /**
     * destroy tutorial graphic
     */
    my.destroyAllChildTutorial = function () {
        if (my.currentCircleMask != 0
            && Lobby.Utils.objectNotNull(my.currentCircleMask)) {
            my.currentCircleMask.destroy();
        }
        if (my.transparentLayerTutorial != 0
            && Lobby.Utils.objectNotNull(my.transparentLayerTutorial)) {
            my.transparentLayerTutorial.destroy();
        }
        if (my.currentText != 0
            && Lobby.Utils.objectNotNull(my.currentText)) {
            my.currentText.destroy();
        }
        if (my.currenArrow != 0
            && Lobby.Utils.objectNotNull(my.currenArrow)) {
            my.currenArrow.destroy();
        }
        if (my.currentModelGirl != 0
            && Lobby.Utils.objectNotNull(my.currentModelGirl)) {
            my.currentModelGirl.destroy();
        }
    };

    return my;

}(LobbyC.MainMenu || {}));
