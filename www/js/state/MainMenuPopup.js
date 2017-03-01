LobbyC.MainMenu = (function (my) {

        var bannerSlotsGroup = null;
        var flagStardomExit = false;
        my._animationMoveGroupUpDurationTime = 300;
        my._animationMoveGroupRightDurationTime = 300;
        my._isMoving = false;
        my._startY = 0;
        my.globalTmpPopup = null;
        my.globalBannerSlotPopup = null;
        my.tableMessageInbox = null;
        //my.isClosingPopup = false;

        my.isShowingConnectionLost = false;
        var emitter = null;
        var emitter2 = null;
        var emitter3 = null;
        var emitter4 = null;

        /**
         * not use
         */
        my.unfocusAll = function () {
            $('#email').blur();
            $('#issue-type').blur();
            $('#support-content').blur();
            $('#search-my-friend').blur();
            $('#sc-title').blur();
            $('#sc-money').blur();
            $('#sc-msg').blur();
            $('#sc-money').val("");
            $('#email').val("");
            $('#issue-type').val("");
            $('#support-content').val("");
            $('#search-my-friend').val("");
            $('#sc-title').val("");
            $('#sc-money').val("");
            $('#sc-msg').val("");
        };

        my.popupContainer = {
            popupProfile: "",
            popupShop: "",
            popupFriend: "",
            popupSetting: "",
            popupAchievement: "",
            popupInfoSlotGame: ""
        };

        /*
            By Dat
         */
        my.showPopupWithDelay = function(
            btnShowPopup,
            openPopup
        ){
            if(btnShowPopup.isClicked === true){
                return;
            }
            btnShowPopup.isClicked = true;
            setTimeout(function(){
                btnShowPopup.isClicked = false;
            },LobbyConfig.timeout4Click1Button);

            if(Lobby.Utils.objectNotNull(openPopup)){
                openPopup();
            }

        };

        /**
         * Loading Animation
         */
        my.showLoadingAnimation = function () {
            my.isShowLoading = true;
            my.game.pageViewMain.isDisable = true;
            my.game.pageViewInfoPopup.isDisable = true;
            my.game.kineticScrolling.isDisable = true;
            my.checkAndShowDarkLayerLoadingInGameSlot(true);
            if (my.playingGame === LobbyConstant.isInGame) {
                my.loadMiscItem();
            }
            if (!Lobby.Utils.objectIsNull(window.groupUILoading)) {
                window.groupUILoading.visible = true;
                my._darkLayer.alpha = 0.75;
                my.game.world.bringToTop(window.groupUILoading);
            }
        };

        /**
         * Hide loading animation
         */
        my.hideLoadingAnimation = function () {
            my.isShowLoading = false;
            if (my.numberOfCurrentPopup == 0)
                my.game.pageViewMain.isDisable = false;
            my.game.pageViewInfoPopup.isDisable = false;
            my.game.kineticScrolling.isDisable = false;
            my.checkAndShowDarkLayerLoadingInGameSlot(false);
            if (!Lobby.Utils.objectIsNull(window.groupUILoading)) {
                window.groupUILoading.visible = false;
                my.game.world.sendToBack(window.groupUILoading);
            }
        };

        /**
         * not use
         * @param title
         * @param body
         * @param funcCallback
         * @param funcCallClose
         * @param infoText
         * @param buttonText
         * @param forceToCloseLastNotiPopup
         * @param textCancel
         * @param isPopupV2
         * @param isPopupV3
         */
        my.showPopupNotificationHTML = function(title, body, funcCallback, funcCallClose, infoText, buttonText, forceToCloseLastNotiPopup, textCancel, isPopupV2 ,isPopupV3)
        {
            if(Lobby.Utils.objectIsNull(title))title = "Error";
            if(Lobby.Utils.objectIsNull(body))body = "Something went wrong. Please try again later";
            if(Lobby.Utils.objectIsNull(buttonText)) buttonText = my.selectlanguage.ok.text;
            if(Lobby.Utils.objectIsNull(isPopupV3)) isPopupV3 = false;
            if (Lobby.Utils.objectIsNull(textCancel)) {
                textCancel = my.selectlanguage.cancel.text;
            }
            if(Lobby.Utils.objectIsNull(isPopupV2))isPopupV2 = false;

            if ( Lobby.Utils.stringContainString(body, LobbyLanguageConstant.CANNOT_CONNECT_TO_SERVER)) {
                if (my.isShowingConnectionLost) {
                    if(forceToCloseLastNotiPopup){
                        my.popupManager.removeAll();
                    }else {
                        return;
                    }
                }
                my.isShowingConnectionLost = true;
            }
            if (Lobby.Utils.objectNotNull(my.game.kineticScrolling)) {
                my.game.kineticScrolling.isDisable = true;
            }
            //RESIZE
            var cw = $('#pop_notification').offsetParent().width();
            $('#pop_notification').css({'height':(cw * 0.38) +'px'});

            $('#titleText').css({'font-size':(cw * 22 / 817) +'px'});
            $('#bodyText').css({'font-size':(cw * 22 / 817) +'px'});
            $('#summitButton').css({'font-size':(cw * 38 / 923) +'px'});
            $('#cancelButton').css({'font-size':(cw * 38 / 923) +'px'});
            $('#infoText').css({'font-size':(cw * 20 / 970) +'px'});

            //SETUP IF IS POPUP V 2
            if(isPopupV2 == true){85
                $('#successButtonDiv').css({'left':10 +'%'});
                $('#cancelButtonDiv').css({'left':55 +'%'});
                $('#cancelButtonDiv').css('display', 'block');
            }else{
                $('#successButtonDiv').css({'left':30 +'%'});
                $('#cancelButtonDiv').css('display', 'none');
            }

            //SETUP POSITON
            if(Lobby.Utils.objectIsNull(title)
                || Lobby.Utils.stringIsEmpty(title)){
                $("#bodyText").css({'top': -70 + '%'});
            }else{
                $("#bodyText").css({'top': -85 + '%'});
            }

            //SET UP FUNC
            $("#closeButton").unbind( "click" );
            $("#successButtonDiv").unbind( "click" );
            $("#cancelButtonDiv").unbind( "click" );

            $("#closeButton").click(function(){
                    //$(".darkLayerNew").fadeOut('slow', function()
                    //{
                    //});
                my.openOrClosePopupNotiCss(false);
                    if(!isPopupV3 && Lobby.Utils.objectNotNull(funcCallClose))
                        funcCallClose();
                }
            );

            $("#cancelButtonDiv").click(function(){
                my.openOrClosePopupNotiCss(false);
                    //$(".darkLayerNew").fadeOut('slow', function()
                    //{
                    //});
                    if(Lobby.Utils.objectNotNull(funcCallClose))
                        funcCallClose();
                }
            );

            $("#successButtonDiv").click(function(){
                my.openOrClosePopupNotiCss(false);
                    //$(".darkLayerNew").fadeOut('slow');
                    if(Lobby.Utils.objectNotNull(funcCallback))
                        funcCallback();
                }
            );

            //SET TEXT
            $("#summitButton").text(buttonText);
            $("#cancelButton").text(textCancel);
            $("#titleText").text(title);
            $("#bodyText").text(body);

            if(Lobby.Utils.objectNotNull(infoText)
                && infoText != ""){
                $("#infoText").text(infoText);
                $("#infoIcon").css('display', 'block');
                $("#infoText").css('display', 'block');
            }else{
                $("#infoIcon").css('display', 'none');
                $("#infoText").css('display', 'none');
            }
            //OPEN POPUP
            //$(".darkLayerNew").fadeIn('slow');
            my.openOrClosePopupNotiCss(true);
        };

        /**
         * not use
         * @param isOpen
         */
        my.openOrClosePopupNotiCss = function(isOpen)
        {
            if(isOpen){
                //$(".darkLayerNew").fadeIn(my._animationMoveGroupUpDurationTime);
                //$("#pop_notification").fadeIn(my._animationMoveGroupUpDurationTime);
                //$("#pop_notification").css({'z-index':1004});
                //$(".darkLayerNew").css({'z-index':1003});
                //var tween = TweenLite.to($("#pop_notification"), 0.5, {
                //    css:{opacity:1},
                //    ease: Power1.easeInOut,
                //    delay: 0
                //});
                $(".darkLayerNew").css({'z-index':1003});
                $("#pop_notification").css({'z-index':1004});
                $("#pop_notification").transition({ opacity: 1,duration: my._animationMoveGroupUpDurationTime });
                //$("#pop_notification").css({'top': 0});
                //$("#pop_notification").velocity({
                //    opacity: 1
                //}, {
                //    duration: 300
                //});

            }else{
                //$(".darkLayerNew").css({'z-index':-1});
                //var tween = TweenLite.to($("#pop_notification"), 0.5, {
                //    css:{opacity:0},
                //    ease: Power1.easeInOut,
                //    delay: 0
                //});
                $(".darkLayerNew").css({'z-index':-1});
                $("#pop_notification").transition({ opacity: 0,duration: my._animationMoveGroupUpDurationTime }, function(){
                    //$("#pop_notification").css({'top': -LobbyConfig.height + 'px'});
                    $("#pop_notification").css({'z-index':-1});
                });
                //$("#pop_notification").velocity({
                //    opacity: 0
                //}, {
                //    duration: 300,
                //    complete: function()
                //    {
                //        //$("#pop_notification").css({'top': -LobbyConfig.height + 'px'});
                //    }
                //});
                //$(".darkLayerNew").fadeOut(my._animationMoveGroupUpDurationTime);
                //$("#pop_notification").fadeOut(my._animationMoveGroupUpDurationTime);
            }
        };
        /**
         * Show in-game notification popup, don't use html popup even if enabled
         * @param title
         * @param body
         * @param funcCallback
         * @param funcCallClose
         * @param infoText
         * @param buttonText
         */
        my.showInGameNotificationPopUp = function(title,body, funcCallback, funcCallClose, buttonText){
            if(Lobby.Utils.objectIsNull(buttonText))
                buttonText = my.selectlanguage.ok.text;
            if (Lobby.Utils.objectNotNull(my.game.kineticScrolling)) {
                my.game.kineticScrolling.isDisable = true;
            }
            var group = my.add.group();

            var background = my.add.sprite(0, 0, "popup_notification_background", null);
            background.scale.setTo(2, 2); // reduce resolution 50%
            group.add(background);
            var textStyle = {
                font: "40px " + ConstantFontName.FONT_NAME_PassionOne_Regular,
                fill: "#fefefe",
                align: "center",
                wordWrap: true,
                wordWrapWidth: 900
            };

            var btnExit = my.createButtonExitPopup(
                group,
                background.width - 70,
                -15,
                undefined,
                function(){
                    if(Lobby.Utils.objectNotNull(funcCallClose)) {
                        funcCallClose();
                    }
                }
            );
            if (title == undefined) {
                title = "Error";
            }
            if (body == undefined) {
                body = "Something went wrong. Please try again later";
            }
            var textTitle = my.add.text(
                0,
                40,
                title,
                textStyle,
                group
            );
            Lobby.PhaserJS.centerX(textTitle, background.width);
            var textMessage = my.add.text(
                0,
                0,
                body,
                textStyle,
                group
            );
            Lobby.PhaserJS.center(textMessage, background);

            var fontsize = 60;
            if(buttonText.length >= 7)
                fontsize = 50;
            var sprite = my.createButtonGreenPopup(group,
                background.width / 2 - 330 / 2,
                350,
                buttonText,
                1.2,
                function () {
                    if (LobbyConfig.useManagerForPopUp) {
                        ManagerForPopUp.forceClosePopUp(my, group);
                    } else {
                        my.closePopupWithAnimateDownNew(group);
                    }
                    if (funcCallback != null &&
                        funcCallback != undefined) {
                        funcCallback();
                    }
                },
                fontsize
            );
            textMessage.y -= sprite.height / 4;
            sprite.position.x = sprite.position.x + 20;
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
        /**
         * show notification popup
         * @param title : title text
         * @param body : body text
         * @param funcCallback : callback when click agree
         * @param funcCallClose : callback when click close
         * @param infoText : info text
         * @param buttonText : text in button agree
         * @param forceToCloseLastNotiPopup : is force to close popup notification? When true, popup manager will be clear and close popup notif (if is popup show can not connect to sv)
         */
        my.showNotificationPopup = function (title, body, funcCallback, funcCallClose, infoText, buttonText, forceToCloseLastNotiPopup) {
            if(LobbyConfig.enablePopupHtml
            && Lobby.Utils.objectNotNull(my.popupHtml)){
                my.popupHtml.showPopupNotificationHTML(title, body, funcCallback, funcCallClose, infoText, buttonText, forceToCloseLastNotiPopup);
                //***************RETURN*****************
                return;
            }
            if (Lobby.Utils.objectIsNull(my.game) ||
                Lobby.Utils.objectIsNull(my.add)) {
                return;
            }
            if(Lobby.Utils.objectIsNull(buttonText))
                buttonText = my.selectlanguage.ok.text;


            if (Lobby.Utils.stringContainString(body,LobbyLanguageConstant.CANNOT_CONNECT_TO_SERVER)) {
                if (my.isShowingConnectionLost) {
                    if(forceToCloseLastNotiPopup){
                        my.popupManager.removeAll();
                    }else {
                        return;
                    }
                }
                my.isShowingConnectionLost = true;
            }
            if (Lobby.Utils.objectNotNull(my.game.kineticScrolling)) {
                my.game.kineticScrolling.isDisable = true;
            }
            var group = my.add.group();

            var background = my.add.sprite(0, 0, "popup_notification_background", null);
            background.scale.setTo(2, 2); // reduce resolution 50%
            group.add(background);
            var textStyle = {
                font: "40px " + ConstantFontName.FONT_NAME_PassionOne_Regular,
                fill: "#fefefe",
                align: "center",
                wordWrap: true,
                wordWrapWidth: 900
            };

            var btnExit = my.createButtonExitPopup(
                group,
                background.width - 70,
                -15,
                undefined,
                function(){
                    if (Lobby.Utils.stringContainString(body,LobbyLanguageConstant.CANNOT_CONNECT_TO_SERVER)) {
                        my.isShowingConnectionLost = false;
                    }
                    if(Lobby.Utils.objectNotNull(funcCallClose)) {
                        funcCallClose();
                    }
                }
            );
            if (title == undefined) {
                title = "Error";
            }
            if (body == undefined) {
                body = "Something went wrong. Please try again later";
            }
            var textTitle = my.add.text(
                0,
                40,
                title,
                textStyle,
                group
            );
            Lobby.PhaserJS.centerX(textTitle, background.width);
            var textMessage = my.add.text(
                0,
                0,
                body,
                textStyle,
                group
            );
            Lobby.PhaserJS.center(textMessage, background);

            var fontsize = 60;
            if(buttonText.length >= 7)
                fontsize = 50;
            var sprite = my.createButtonGreenPopup(group,
                background.width / 2 - 330 / 2,
                350,
                buttonText,
                1.2,
                function () {
                    if (Lobby.Utils.stringContainString(body,LobbyLanguageConstant.CANNOT_CONNECT_TO_SERVER)) {
                        my.isShowingConnectionLost = false;
                    }
                    if (LobbyConfig.useManagerForPopUp) {
                        ManagerForPopUp.forceClosePopUp(my, group);
                    } else {
                        my.closePopupWithAnimateDownNew(group);
                    }
                    if (funcCallback != null &&
                        funcCallback != undefined) {
                        funcCallback();
                    }
                },
                fontsize
            );
            textMessage.y -= sprite.height / 4;
            sprite.position.x = sprite.position.x + 20;
            Lobby.PhaserJS.centerWorld(group);

            if(Lobby.Utils.objectNotNull(infoText)
                && infoText != ""){
                textMessage.y -= 28;
                sprite.y += 10;
                textStyle.font = "34px " + ConstantFontName.FONT_NAME_PassionOne_Regular;
                var infoIcon = my.add.sprite(50, group.height - 110, "info_icon", null, group);

                var infoTextUI = my.add.text(
                    infoIcon.x + 60,
                    infoIcon.y + 10,
                    infoText,
                    textStyle,
                    group
                );
            }

            Lobby.PhaserJS.scaleGroupForOptimize(group, true);

            if (LobbyConfig.useManagerForPopUp) {
                // 2016-08-10: Phuoc: force show pop up
                ManagerForPopUp.forceShowPopUp(my, group);
            } else {
                my.openPopupWithAnimateUpNew(group);
            }
        };

        /**
         * show notification popup v2 ( with cancel button )
         * @param title : title text
         * @param body : body text
         * @param callBackOk : callback when click agree
         * @param callBackCancel : callback when click close and disagree
         * @param textOk : text in button agree
         * @param textCancel : text in button cancel
         */
        my.showNotificationPopupV2 = function (title, body, callBackOk, callBackCancel, textOk, textCancel) {

            if(LobbyConfig.enablePopupHtml
                && Lobby.Utils.objectNotNull(my.popupHtml)){
                my.popupHtml.showPopupNotificationHTML(title, body, callBackOk, callBackCancel, "", textOk, false, textCancel, true);
                //***************RETURN*****************
                return;
            }
            if (Lobby.Utils.objectIsNull(textOk)) {
                textOk = my.selectlanguage.ok.text;
            }
            if (Lobby.Utils.objectIsNull(textCancel)) {
                textCancel = my.selectlanguage.cancel.text;
            }
            var group = my.add.group();
            var background = my.add.sprite(0, 0, "popup_notification_background", null);
            background.scale.setTo(2, 2);
            group.add(background);
            var textStyle = {
                font: "40px " + ConstantFontName.FONT_NAME_PassionOne_Regular,
                fill: "#fefefe",
                align: "center",
                wordWrap: true,
                wordWrapWidth: 900
            };

            var btnExit = my.createButtonExitPopup(group, background.width - 70, -15);
            if (title == undefined) {
                title = "Error";
            }
            if (body == undefined) {
                body = "Something went wrong. Please try again later";
            }
            var textTitle = my.add.text(
                0,
                40,
                title,
                textStyle,
                group
            );
            Lobby.PhaserJS.centerX(textTitle, background.width);
            var textMessage = my.add.text(
                0,
                0,
                body,
                textStyle,
                group
            );
            Lobby.PhaserJS.center(textMessage, background);

            var fontSize = 60;
            if (textOk.length > 6) {
                fontSize = 50;
            }

            var spriteOk = my.createButtonGreenPopup(group,
                background.width / 2 - 350,
                350,
                textOk,
                1.2,
                function () {
                    if (LobbyConfig.useManagerForPopUp) {
                        ManagerForPopUp.forceClosePopUp(my, group);
                    } else {
                        my.closePopupWithAnimateDownNew(group);
                    }
                    if (callBackOk != null &&
                        callBackOk != undefined) {
                        callBackOk();
                    }
                },
                fontSize
            );
            //spriteOk.textBtn.position.x -= 20;
            textMessage.y = textMessage.y - spriteOk.height / 4;

            var fontSize = 60;
            if (textCancel.length > 6) {
                fontSize = 50;
            }
            var spriteCancel = my.createButtonPurplePopup(group,
                background.width / 2 + 80,
                350,
                textCancel,
                1.2,
                function () {
                    if (LobbyConfig.useManagerForPopUp) {
                        ManagerForPopUp.forceClosePopUp(my, group);
                    } else {
                        my.closePopupWithAnimateDownNew(group);
                    }
                    if (callBackCancel != null &&
                        callBackCancel != undefined) {
                        callBackCancel();
                    }
                },
                fontSize
            );


            Lobby.PhaserJS.centerWorld(group);

            if (LobbyConfig.useManagerForPopUp) {
                // 2016-08-10: Phuoc: force show pop up
                ManagerForPopUp.forceShowPopUp(my, group);
            } else {
                my.openPopupWithAnimateUpNew(group);
            }

            Lobby.PhaserJS.scaleGroupForOptimize(group, true);
        };
        /**
         * show notification popup v3 ( with cancel button ), ExitBtn no longer use callbackCancer
         * @param title : title text
         * @param body : body text
         * @param callBackOk : callback when click agree
         * @param callBackCancel : callback when click close and disagree
         * @param textOk : text in button agree
         * @param textCancel : text in button cancel
         */
        my.showNotificationPopupV3 = function (title, body, callBackOk, callBackCancel, textOk, textCancel) {

            if(LobbyConfig.enablePopupHtml
                && Lobby.Utils.objectNotNull(my.popupHtml)){
                my.popupHtml.showPopupNotificationHTML(title, body, callBackOk, callBackCancel, "", textOk, false, textCancel, true, null,true);
                //***************RETURN*****************
                return;
            }
            if (Lobby.Utils.objectIsNull(textOk)) {
                textOk = my.selectlanguage.ok.text;
            }
            if (Lobby.Utils.objectIsNull(textCancel)) {
                textCancel = my.selectlanguage.cancel.text;
            }
            var group = my.add.group();
            var background = my.add.sprite(0, 0, "popup_notification_background", null);
            background.scale.setTo(2, 2);
            group.add(background);
            var textStyle = {
                font: "40px " + ConstantFontName.FONT_NAME_PassionOne_Regular,
                fill: "#fefefe",
                align: "center",
                wordWrap: true,
                wordWrapWidth: 900
            };

            var btnExit = my.createButtonExitPopup(group, background.width - 70, -15);
            if (title == undefined) {
                title = "Error";
            }
            if (body == undefined) {
                body = "Something went wrong. Please try again later";
            }
            var textTitle = my.add.text(
                0,
                40,
                title,
                textStyle,
                group
            );
            Lobby.PhaserJS.centerX(textTitle, background.width);
            var textMessage = my.add.text(
                0,
                0,
                body,
                textStyle,
                group
            );
            Lobby.PhaserJS.center(textMessage, background);

            var fontSize = 60;
            if (textOk.length > 6) {
                fontSize = 50;
            }

            var spriteOk = my.createButtonGreenPopup(group,
                background.width / 2 - 350,
                350,
                textOk,
                1.2,
                function () {
                    if (LobbyConfig.useManagerForPopUp) {
                        ManagerForPopUp.forceClosePopUp(my, group);
                    } else {
                        my.closePopupWithAnimateDownNew(group);
                    }
                    if (callBackOk != null &&
                        callBackOk != undefined) {
                        callBackOk();
                    }
                },
                fontSize
            );
            //spriteOk.textBtn.position.x -= 20;
            textMessage.y = textMessage.y - spriteOk.height / 4;

            var fontSize = 60;
            if (textCancel.length > 6) {
                fontSize = 50;
            }
            var spriteCancel = my.createButtonPurplePopup(group,
                background.width / 2 + 80,
                350,
                textCancel,
                1.2,
                function () {
                    if (LobbyConfig.useManagerForPopUp) {
                        ManagerForPopUp.forceClosePopUp(my, group);
                    } else {
                        my.closePopupWithAnimateDownNew(group);
                    }
                    if (callBackCancel != null &&
                        callBackCancel != undefined) {
                        callBackCancel();
                    }
                },
                fontSize
            );


            Lobby.PhaserJS.centerWorld(group);

            if (LobbyConfig.useManagerForPopUp) {
                // 2016-08-10: Phuoc: force show pop up
                ManagerForPopUp.forceShowPopUp(my, group);
            } else {
                my.openPopupWithAnimateUpNew(group);
            }

            Lobby.PhaserJS.scaleGroupForOptimize(group, true);
        };
        /**
         * show notification popup switch to facebook
         * @param title : title text
         * @param body : body text
         */
        my.showPopupSwitchToFacebook = function (title, body) {
            //var title = my.selectlanguage.popup_gift_error_oop.text;
            //var body = my.selectlanguage.popup_gift_error_message.text;
            if(LobbyConfig.enablePopupHtml
                && Lobby.Utils.objectNotNull(my.popupHtml)){
                my.popupHtml.showPopupNotificationHTML(
                    title,
                    body,
                    function(){
                        my.clearDataAndLogOut(true);
                    },
                    null,
                    null,
                    "Login Facebook"
                    );
                //***************RETURN*****************
                return;
            }
            var group = my.add.group();
            var background = my.add.sprite(0, 0, "popup_notification_background", null);
            background.scale.setTo(2);
            group.add(background);
            var textStyle = {
                font: "40px " + ConstantFontName.FONT_NAME_PassionOne_Regular,
                fill: "#fefefe",
                align: "center",
                wordWrap: true,
                wordWrapWidth: 900
            };
            var btnExit = my.createButtonExitPopup(group, background.width - 70, -15);
            if (title == undefined) {
                title = "Error";
            }
            if (body == undefined) {
                body = "Something went wrong. Please try again later";
            }
            var textTitle = my.add.text(
                0,
                40,
                title,
                textStyle,
                group
            );
            Lobby.PhaserJS.centerX(textTitle, background.width);
            var textMessage = my.add.text(
                0,
                0,
                body,
                textStyle,
                group
            );
            Lobby.PhaserJS.center(textMessage, background);
            var sprite = my.createButtonGreenPopup(group,
                background.width / 2 - 330 / 2,
                350,
                my.selectlanguage.loginFacebook.text,
                1.1,
                function () {
                    //if (LobbyConfig.useManagerForPopUp) {
                    //    ManagerForPopUp.forceClosePopUp(my, group);
                    //} else {
                    //    my.closePopupWithAnimateDownNew(group);
                    //}
                    //my.popupContainer = {
                    //    popupProfile: "",
                    //    popupShop: "",
                    //    popupFriend: "",
                    //    popupSetting: "",
                    //    popupAchievement: "",
                    //    popupInfoSlotGame: ""
                    //};
                    //// 2016-07-27: Phuoc: tắt nhạc nền trước khi về InitSession
                    //try {
                    //    if (my.playingGame === LobbyConstant.isInGame) {
                    //        LobbyC.GameSlot.clearDataAndReturnToLobby();
                    //    }
                    //    if (Lobby.Utils.objectNotNull(my.pauseBackgroundMusic)) {
                    //        my.pauseBackgroundMusic();
                    //    }
                    //} catch (ex) {
                    //
                    //}
                    //LobbyConfig.isFb = true;
                    //LobbyConfig.loginFrom = "fb";
                    //my.game.state.start(
                    //    "InitSession",
                    //    true, // clearWorld
                    //    false // clearCache
                    //);
                    my.clearDataAndLogOut(true);
                }
            );

            textMessage.y -= sprite.height / 4;


            sprite.position.x = sprite.position.x + 20;
            Lobby.PhaserJS.centerWorld(group);

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

            Lobby.PhaserJS.scaleGroupForOptimize(group, true);
        };
        /**
         * show missing coin or crown popup
         * @param missingType : type of missing : LobbyConstant.BUY_MISSING_COIN_OR_CROWN_POPUP_TYPE_COIN and LobbyConstant.BUY_MISSING_COIN_OR_CROWN_POPUP_TYPE_CROWN
         * @param missingQuantity : quantity of missing
         * @param funcCallback : not use
         */
        my.showMissingCoinOrCrownPopUp = function (missingType, missingQuantity, funcCallback) {

            var missingText = "Buy the missing\n";
            var isPlural = false;
            if (missingQuantity > 1) {
                isPlural = true;
            }
            switch (missingType) {
                case LobbyConstant.BUY_MISSING_COIN_OR_CROWN_POPUP_TYPE_COIN:
                    missingText += missingQuantity + " Coin";
                    break;
                case LobbyConstant.BUY_MISSING_COIN_OR_CROWN_POPUP_TYPE_CROWN:
                    missingText += missingQuantity + " Crown";
                    break;
            }
            if (isPlural) {
                missingText += "s";
            }
            missingText += "?";

            my.showNotificationPopupV2("", missingText, function () {
                switch (missingType) {
                    case LobbyConstant.BUY_MISSING_COIN_OR_CROWN_POPUP_TYPE_COIN:
                        my.showPopupShop(false);
                        break;
                    case LobbyConstant.BUY_MISSING_COIN_OR_CROWN_POPUP_TYPE_CROWN:
                        my.showPopupShop(true);
                        break;
                }
            }, null, "GO TO SHOP", "CANCEL");
            //Lobby.PhaserJS.centerWorld(group);
            //my.openPopupWithAnimateUpNew(group);


        };
        /**
         * Custom notification
         */
        my.showUnlockGameByCrownPopup = function (title, body, gameData, funcCallback) {
            if(LobbyConfig.isTestAlgorithmMode){
                return;
            }
            // 2016-06-01: Phuoc: bỏ title cho giống Unity
            title = "";

            //Lobby.Utils.setToLocalStorage(LobbyConstant.keyForStoringDataPopupsPromotion.triedToUnlockACrownPakageBefore + my._userData.profile.id, true);
            var group = my.add.group();
            var background = my.add.sprite(0, 0, "popup_notification_background", null);
            background.scale.setTo(2, 2);
            group.add(background);
            var textStyle = {
                font: "40px " + ConstantFontName.FONT_NAME_PassionOne_Regular,
                fill: "#fefefe",
                align: "center",
                wordWrap: true,
                wordWrapWidth: 900
            };
            var btnExit = my.createButtonExitPopup(
                group,
                background.width - 70,
                -15,
                null,
                funcCallback
            );

            if (title == undefined) {
                title = "Error";
            }
            if (body == undefined) {
                body = "Something went wrong. Please try again later";
            }
            var textTitle = my.add.text(
                0,
                40,
                title,
                textStyle,
                group
            );
            Lobby.PhaserJS.centerX(textTitle, background.width);
            var textMessage = my.add.text(
                0,
                0,
                body,
                textStyle,
                group
            );
            Lobby.PhaserJS.center(textMessage, background);
            textMessage.y -= 50;
            var crownText = my.add.text(
                0,
                0,
                gameData.min_crown + " x",
                textStyle,
                group
            );
            Lobby.PhaserJS.center(crownText, background);
            crownText.anchor = {x: 1, y: 0.5};
            crownText.y = textMessage.y + 50;
            //crownText.x -= 10;
            var crownIcon = my.add.sprite(0, 0, "popup-shop-crown_icon", null);
            group.add(crownIcon);
            //Lobby.PhaserJS.centerX(crownIcon, background);
            crownIcon.anchor = {x: 0, y: 0.5};
            crownIcon.position.x = crownText.position.x;
            crownIcon.position.y = crownText.position.y;

            crownIcon.x += 10;
            crownIcon.y -= 10;

            var groupButton = my.add.group(group);

            var buttonCancelAsSprite = my.createButtonPurplePopup(
                groupButton,
                35,
                140,
                my.selectlanguage.cancel.text,
                1.2,
                function () {
                    if (LobbyConfig.useManagerForPopUp) {
                        ManagerForPopUp.forceClosePopUp(my, group);
                    } else {
                        my.closePopupWithAnimateDownNew(group);
                    }
                },
                60
            );

            var buttonOkAsSprite = my.createButtonGreenPopup(
                groupButton,
                buttonCancelAsSprite.x + buttonCancelAsSprite.width - 80,
                140,
                my.selectlanguage.ok.text,
                1.2,
                function () {
                    if(LobbyConfig.isDebug) {
                        console.log("gameData: ", gameData);
                        console.log("my.getCurrentUserProfileData().crown: ", my.getCurrentUserProfileData().crown);
                    }
                    if (my.getCurrentUserProfileData().crown < gameData.min_crown) {
                        if (LobbyConfig.useManagerForPopUp) {
                            ManagerForPopUp.forceClosePopUp(my, group);
                        } else {
                            my.closePopupWithAnimateDownNew(group);
                        }
                        my.showMissingCoinOrCrownPopUp(
                            LobbyConstant.BUY_MISSING_COIN_OR_CROWN_POPUP_TYPE_CROWN,
                            gameData.min_crown - my.getCurrentUserProfileData().crown
                        );
                        return;
                    }

                    LobbyRequest.User.unlockGameSlotByCrown(gameData.id, function (isSuccess, data) {
                        if (!isSuccess) {
                            if (LobbyConfig.useManagerForPopUp) {
                                ManagerForPopUp.forceClosePopUp(my, group);
                            } else {
                                my.closePopupWithAnimateDownNew(group);
                            }
                            return;
                        }

                        var arrayGameUnlock = [];
                        arrayGameUnlock.push(gameData);
                        my.showUnlockCabinetPopupNew(
                            my._userData.profile.name,
                            my._userData.profile.level,
                            arrayGameUnlock[0],
                            arrayGameUnlock, null
                        );

                        //my.showNotificationPopup(my.selectlanguage.popup_gift_success.text, my.selectlanguage.popup_gift_success.text);

                        //while (LobbyConfig.listGameInfo.length) {
                        //    LobbyConfig.listGameInfo.pop();
                        //}
                        //gameData.is_unlocked = true;
                        LobbyRequest.User.getListSlotsGameAndProcessData(
                            function () {
                                my.checkGroupLockPanelList();
                            },
                            my,
                            true
                        );
                        my.updateUserInfoFromSV();

                        if (LobbyConfig.useManagerForPopUp) {
                            ManagerForPopUp.forceClosePopUp(my, group);
                        } else {
                            my.closePopupWithAnimateDownNew(group);
                        }
                    }, my);
                },
                60
            );

            Lobby.PhaserJS.centerItemInBackground(groupButton, background);

            textMessage.y -= buttonOkAsSprite.height / 4;
            //buttonOkAsSprite.textBtn.position.x -= 20;
            Lobby.PhaserJS.centerWorld(group);
            group.x -= 100;
            group.y -= 50;

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

            Lobby.PhaserJS.scaleGroupForOptimize(group, false);
        };
        /**
         * Reload notification popup
         */
        my.showReloadNotificationPopup = function () {
            ScheduleManager.stopSchedule(my);
            if(LobbyConfig.isDebug) console.log("You are not logged in, auto reconnect in 5 secs");
            my.showNotificationPopup(undefined, "Network Error");
            my.time.events.add(5000,
                function () {
                    my.clearDataAndLogOut();
                }, this);
        };
        /**
         * show sv error popup
         * @param funcReload : function reload
         * @param forceToCloseLastNotiPopup : is force to close all popup
         */
        my.showServerErroPopup = function (funcReload, forceToCloseLastNotiPopup) {
            if(LobbyUserData.dataTutorial.isPlayingTutorial){
                my.showNotificationPopup(
                    undefined,
                    LobbyLanguageConstant.CANNOT_CONNECT_TO_SERVER,
                    function () {
                        my.clearDataAndLogOut();
                    },
                    function () {
                        my.clearDataAndLogOut();
                    },
                    null,
                    null,
                    true
                );
                return;
            }

            my.showNotificationPopup(
                undefined,
                LobbyLanguageConstant.CANNOT_CONNECT_TO_SERVER,
                function () {
                    //my.isShowingConnectionLost = false;
                    if(Lobby.Utils.objectNotNull(funcReload)){
                        funcReload();
                    }
                },
                function () {
                    //my.isShowingConnectionLost = false;
                    if (my.playingGame === LobbyConstant.isInGame) {
                        my.time.events.add(500, function() {
                            my.returnToMainMenu();
                        });
                    } else {
                        my.clearDataAndLogOut();
                    }
                },
                null,
                null,
                forceToCloseLastNotiPopup
            );

            //my.isShowingConnectionLost = true;
            //setInterval(function () {
            //    location.reload(true);
            //}, 5000);
        };
        /**
         * show server maintain popup
         */
        my.showServerMaintainPopup = function () {
            var callback = function () {
                //location.reload(true);
                Lobby.Utils.reloadGame();
            };
            ScheduleManager.stopSchedule(my);
            my.showNotificationPopup("Warning", "Server Maintenance", callback);
        };
        /**
         * caculation coin and crown and prepare to show popup level up
         * @param name : name of user
         * @param level : level
         * @param levelJump : level jump
         * @param callback : callback after click collect
         * @param coinsBonus : number of coin
         * @param crownBonus : number of crown
         */
        my.showLevelUpNotificationPopup = function (name, level, levelJump, callback, coinsBonus, crownBonus,
                                                    callbackLevelUp) {
            if(LobbyConfig.isTestAlgorithmMode){
                my.levelUpRewardCoin = coinsBonus;
                my.levelUpRewardCrown = crownBonus;
                return;
            }
            if (my.isCollectedRewardFromPopupLvUp == false) {
                my.closePopupWithAnimateDownNew(my.globalTmpPopup);
            }
            my.numberOfPopupLevelUp--;
            if (Lobby.Utils.objectNotNull(my.data4RewardCoinPopupLvup)
                && Lobby.Utils.objectNotNull(my.data4RewardCoinPopupLvup.coin)) {
                //if (Lobby.Utils.objectNotNull(my.data4RewardCoinPopupLvup.callback)) {
                //    my.data4RewardCoinPopupLvup.callback();
                //    my.data4RewardCoinPopupLvup.callback = null;
                //}
                my.playAllAnimationCoinAndUpdateHeader(my.data4RewardCoinPopupLvup.coin, 1000, function () {
                }, null, true, false);
            }
            level += 1;
            var checkLevel;
            if (Lobby.Utils.objectIsNull(coinsBonus)) {
                coinsBonus = 0;
                if (levelJump > 1) {
                    for (var i = 0; i < levelJump; i++) {
                        checkLevel = level - i;
                        if (Lobby.Utils.objectNotNull(LobbyConfig.LevelUpBonusCoins[checkLevel])) {
                            coinsBonus += LobbyConfig.LevelUpBonusCoins[checkLevel].coin_reward;
                        }
                        else {
                            coinsBonus += LobbyConfig.bonusCoinPerLevel;
                        }
                    }
                }
                else {
                    if (Lobby.Utils.objectNotNull(LobbyConfig.LevelUpBonusCoins[level])) {
                        coinsBonus = LobbyConfig.LevelUpBonusCoins[level].coin_reward;
                    }
                    else {
                        coinsBonus = LobbyConfig.bonusCoinPerLevel;
                    }
                }
            }
            if (Lobby.Utils.objectIsNull(crownBonus)) {
                crownBonus = 0;
                if (levelJump > 1) {
                    for (var i = 0; i < levelJump; i++) {
                        checkLevel = level - i;
                        if (Lobby.Utils.objectNotNull(LobbyConfig.LevelUpBonusCoins[checkLevel])) {
                            crownBonus += LobbyConfig.LevelUpBonusCoins[checkLevel].crown_reward;
                        }
                        else {
                            crownBonus += LobbyConfig.bonusCrownPerLevel;
                        }
                    }
                }
                else {
                    if (Lobby.Utils.objectNotNull(LobbyConfig.LevelUpBonusCoins[level])) {
                        crownBonus = LobbyConfig.LevelUpBonusCoins[level].crown_reward;
                    }
                    else {
                        crownBonus = LobbyConfig.bonusCrownPerLevel;
                    }
                }
            }
            my.isCollectedRewardFromPopupLvUp = false;
            my.showPopupLevelUp(level, level + levelJump, coinsBonus, crownBonus, callback, callbackLevelUp);
        };
        /**
         * not use
         * @param isSuccess
         * @param result
         * @param productId
         * @param callback
         */
        my.reloadProfileCallbackAfterPurchase = function (isSuccess, result, productId, callback) {
            Lobby.Utils.printConsoleLog("Payment result ", isSuccess, result, productId);
            var shopData = {};
            var packageType = 0;
            var text = my.selectlanguage.coin_purchase_successfully.text;
            if (LobbyConfig.ProductIdForBuyCrown.indexOf(productId) > -1) {
                text = my.selectlanguage.crown_purchase_successfully.text;
            }
            if (isSuccess) {
                if (Lobby.Utils.objectNotNull(result)) {
                    switch (result.status) {
                        case "completed":
                            my.showNotificationPopup(
                                my.selectlanguage.popup_gift_success.text,
                                text
                            );
                            if (Lobby.Utils.objectNotNull(callback)) {
                                callback();
                            }
                            break;
                        default :
                            /**
                             * TODO : track result status
                             */
                            break;
                            shopData.errorCode = 0;
                    }
                }
            }
            else {
                if (Lobby.Utils.objectIsNull(result)) {
                    shopData.errorCode = -1;
                }
                else {
                    if (result == "block_ip") {
                        my.showNotificationPopup( my.selectlanguage.popup_gift_warning.text, my.selectlanguage.main_menu_not_support_region.text);
                        shopData.errorCode = -2;
                    }
                    else {
                        shopData.errorCode = result.error_code;
                    }
                }

            }
            shopData.productId = productId;
            //LobbyRequest.User.trackPayment(
            //    shopData,
            //    function (isSuccess, data) {
            //        Lobby.Utils.printConsoleLog("Callback track payment ", isSuccess, data);
            //    }
            //);
        };
        /**
         * Popup spin & animation
         * @param spinInfo
         * @param closeSpin
         */
        my.showPopupSpin = function (spinInfo, closeSpin) {

            var group = my.add.group();

            var background =
                my.add.sprite(
                    0,
                    -50,
                    "spin_popup_bg",
                    null,
                    group);
            background.scale.setTo(100 / 70);//reduce 70% resolution


            var firstX = background.width / 2;
            var firstY = 240 - 50;
            var miniSpaceVertical = 33;
            var spaceVertical = 53;
            var spaceHorizontal = 264;
            var positions = [
                {
                    x: firstX + 65,
                    y: firstY - 20
                },
                {
                    x: firstX + 110,
                    y: firstY + miniSpaceVertical - 10
                },
                {
                    x: firstX + 115,
                    y: firstY + miniSpaceVertical * 2
                },
                {
                    x: firstX,
                    y: firstY + miniSpaceVertical * 2 + spaceVertical + 10
                },
                {
                    x: firstX,
                    y: firstY + miniSpaceVertical * 2 + spaceVertical * 2 + 20
                },
                {
                    x: firstX + spaceHorizontal,
                    y: firstY
                },
                {
                    x: firstX + spaceHorizontal,
                    y: firstY + spaceVertical
                },
                {
                    x: firstX + spaceHorizontal,
                    y: firstY + spaceVertical * 2
                },
                {
                    x: firstX + spaceHorizontal,
                    y: firstY + spaceVertical * 3
                },
                {
                    x: firstX + spaceHorizontal,
                    y: firstY + spaceVertical * 4
                }
            ];

            var textStyle1 = {
                font: "48px " + ConstantFontName.FONT_NAME_PassionOne_Regular,
                fill: "#feea9d"
            };


            var whiteText = {
                font: "37px " + ConstantFontName.FONT_NAME_PassionOne_Regular,
                fill: "#fefefe"
            };
            var text;


            var textWheelBonus = my.add.text(
                positions[0].x,
                positions[0].y,
                "WHEEL BONUS " + Lobby.Utils.formatNumberWithCommas(spinInfo.coin * spinInfo.factor),
                whiteText,
                group);
            textWheelBonus.anchor.y = 0.5;
            textWheelBonus.anchor.x = 0;
            textWheelBonus.alpha = 0;
            textWheelBonus.addColor("#feea9d", 11);

            Lobby.PhaserJS.centerXParent(textWheelBonus, background);

            var textLevelBonus = my.add.text(
                positions[1].x,
                positions[1].y,
                "LEVEL BONUS x " + Lobby.Utils.formatNumberWithCommas(spinInfo.level_bonus),
                whiteText,
                group);
            textLevelBonus.anchor.y = 0.5;
            textLevelBonus.anchor.x = 0;
            textLevelBonus.alpha = 0;
            textLevelBonus.addColor("#feea9d", 12);
            Lobby.PhaserJS.centerXParent(textLevelBonus, background);

            var textFriendBonus = my.add.text(
                positions[2].x,
                positions[2].y,
                "FRIEND BONUS x " + spinInfo.number_of_friend,
                whiteText,
                group);
            textFriendBonus.anchor.y = 0.5;
            textFriendBonus.anchor.x = 0;
            textFriendBonus.alpha = 0;
            textFriendBonus.addColor("#feea9d", 13);
            Lobby.PhaserJS.centerXParent(textFriendBonus, background);

            // VIP benefit
            if (spinInfo.vip_benefit != 0 &&
                spinInfo.vip_benefit != undefined) {
                // Coin vip percent
                var textVip = my.add.text(
                    positions[3].x,
                    positions[3].y,
                    'x' + Lobby.Utils.float2int(spinInfo.vip_benefit * 100) + "% VIP",
                    textStyle1,
                    group);
                textVip.anchor.y = 0.5;
                textVip.anchor.x = 0.5;
                textVip.alpha = 0;
            }
            //spin info

            var groupFinalCoin = my.add.group(group);
            var sprite = my.add.sprite(0, positions[4].y, 'dailyspin-coin');
            //var sprite =  my.add.sprite(0,0, 'dailyspin-coin',null,background);
            sprite.anchor.y = 0.5;
            sprite.anchor.x = 0;
            groupFinalCoin.add(sprite);

            sprite.visible = false;

            var textDailySpinCoin = my.add.text(
                sprite.x + sprite.width + 10,
                sprite.y,
                Lobby.Utils.formatNumberWithCommas(spinInfo.total_coin),
                textStyle1,
                groupFinalCoin);
            textDailySpinCoin.anchor.y = 0.5;
            textDailySpinCoin.anchor.x = 0;
            textDailySpinCoin.alpha = 0;
            textDailySpinCoin.addColor("#fefefe", 0);
            Lobby.PhaserJS.centerXParent(groupFinalCoin, background);
            groupFinalCoin.x -= 50;


            var btnCollect = my.createButtonGreenPopup(
                group,
                background / 2,
                background.height - 140,
                my.selectlanguage.collect.text,
                1,
                function () {
                    my.playAllAnimationCoinAndUpdateHeader(spinInfo.total_coin, 1000, null);
                    my.updateUserInfoFromSV(
                        function (isSuccess) {
                            if (isSuccess) {
                                //var pos = Helper.Number.toGlobal(btnCollect.position.x, btnCollect.position.y, background, 200);
                                //var pos = {x: my.input.mousePointer.x, y: my.input.mousePointer.y};
                                my.playAllAnimationCoinAndUpdateHeader(spinInfo.total_coin, 2000, null, null, true);
                                //my.playAllAnimationCoinAndUpdateHeader(spinInfo.coin, 1000, null);
                                //my.createCoinAnimation(null, null, null, null, function () {
                                //    my.playAnimationCoinForHeader(spinInfo.total_coin, 2000, function () {
                                //        my.showNewHeader();
                                //    });
                                //}, null);
                            }
                        });
                    closeSpin();

                    if (LobbyConfig.useManagerForPopUp) {
                        //ManagerForPopUp.closeCurrentShowingPopUp();
                        ManagerForPopUp.forceClosePopUp(my, group);
                    } else {
                        my.closePopupWithAnimateDownNew(group);
                    }
                    my.checkAndShowPopupSpecialOffer();
                },
                50
            );
            //btnCollect.anchor.x = 0;
            //btnCollect.anchor.y = 0;
            Lobby.PhaserJS.centerXParent(btnCollect, background);
            btnCollect.position.y = background.height - 155;
            btnCollect.position.x = 385;
            btnCollect.visible = false;
            btnCollect.textBtn.visible = false;

            Lobby.PhaserJS.centerWorld(group);

            if (LobbyConfig.useManagerForPopUp) {
                ManagerForPopUp.forceShowPopUp(my, group);
            } else {
                my.openPopupWithAnimateUpNew(group);
            }

            Lobby.PhaserJS.scaleGroupForOptimize(group, true);
            my.runDailyBonusAnimation(
                textWheelBonus,
                textLevelBonus,
                textFriendBonus,
                textVip, textDailySpinCoin,
                sprite, group, function () {
                    //my.add.tween(btnCollect).to({visible: true}, 700, Phaser.Easing.Quintic.Out, true);
                    //my.add.tween(btnCollect.textBtn).to({visible: true}, 700, Phaser.Easing.Quintic.Out, true);
                    my.time.events.add(700,
                        function () {
                            btnCollect.visible = true;
                            btnCollect.textBtn.visible = true;
                        }, this);
                });
        };
        /**
         * run daily bonus animatios
         * @param textWheelBonus : text wheel bonus
         * @param textLevelBonus : text level bonus
         * @param textFriendBonus : text friend bonus
         * @param textVip : text vip
         * @param textDailySpinCoin : text daily spin coin
         * @param spriteCoin : sprite coin
         * @param groupParent : group parent
         * @param complete : complete
         */
        my.runDailyBonusAnimation = function (textWheelBonus,
                                              textLevelBonus,
                                              textFriendBonus,
                                              textVip, textDailySpinCoin,
                                              spriteCoin, groupParent, complete) {
            var index = 0;
            var disPlay = my.time.events.loop(555,
                function () {
                    index++;
                    switch (index) {
                        case 2:
                            if (Lobby.Utils.objectNotNull(textWheelBonus)) {
                                // Add particle here
                                textWheelBonus.alpha = 1;
                                var emitter1 =
                                    my.particleForPopUpDailySpin(
                                        1,
                                        textWheelBonus.position.x, textWheelBonus.position.y,
                                        textWheelBonus.width, textWheelBonus.height,
                                        groupParent);
                            }
                            break;
                        case 3:
                            // Add particle here
                            //textLevel.alpha = 1;
                            textLevelBonus.alpha = 1;
                            var emitter2 = my.particleForPopUpDailySpin(
                                2,
                                textWheelBonus.position.x, (textWheelBonus.position.y + 43),
                                textWheelBonus.width, textWheelBonus.height,
                                groupParent);
                            break;
                        case 4:
                            // Add particle here
                            //textFriend.alpha = 1;
                            textFriendBonus.alpha = 1;
                            var emitter3 = my.particleForPopUpDailySpin(
                                3,
                                textWheelBonus.position.x, (textWheelBonus.position.y + 86),
                                textWheelBonus.width, textWheelBonus.height,
                                groupParent);
                            break;
                        case 5:
                            // Add particle here
                            textVip.alpha = 1;
                            var emitter4 = my.particleForPopUpDailySpin(
                                4,
                                textWheelBonus.position.x, (textWheelBonus.position.y + 150),
                                textWheelBonus.width, textWheelBonus.height,
                                groupParent);
                            break;
                        case 6:
                            // Add particle here
                            var groupStarYellow = my.add.group();
                            var groupStarWhite = my.add.group();

                            groupParent.add(groupStarYellow);
                            groupStarYellow.position = {
                                x: (spriteCoin.parent.position.x + 30 ),
                                y: spriteCoin.position.y
                            };
                            //groupStarYellow.position.x -= 60;
                            var distance = 30;
                            my.tweenStarForPopUpDailySpin('spin-star-yellow', -distance, -distance, groupStarYellow, complete);
                            my.tweenStarForPopUpDailySpin('spin-star-yellow', 0, distance, groupStarYellow, null);
                            my.tweenStarForPopUpDailySpin('spin-star-yellow', 0, -distance, groupStarYellow, null);
                            my.tweenStarForPopUpDailySpin('spin-star-yellow', distance, distance, groupStarYellow, null);
                            my.tweenStarForPopUpDailySpin('spin-star-yellow', -distance, distance, groupStarYellow, null);
                            my.tweenStarForPopUpDailySpin('spin-star-yellow', distance, -distance, groupStarYellow, null);

                            groupParent.add(groupStarWhite);
                            groupStarWhite.position = {
                                x: (textDailySpinCoin.parent.position.x + 170),
                                y: textDailySpinCoin.position.y
                            };
                            //groupStarWhite.position.x += 30;
                            distance = 20;
                            my.tweenStarForPopUpDailySpin('spin-star-white', -distance * 2, -distance, groupStarWhite, null);
                            my.tweenStarForPopUpDailySpin('spin-star-white', -distance * 2, distance, groupStarWhite, null);
                            my.tweenStarForPopUpDailySpin('spin-star-white', 0, distance, groupStarWhite, null);
                            my.tweenStarForPopUpDailySpin('spin-star-white', 0, -distance, groupStarWhite, null);
                            my.tweenStarForPopUpDailySpin('spin-star-white', distance * 2, distance, groupStarWhite, null);
                            my.tweenStarForPopUpDailySpin('spin-star-white', distance * 2, -distance, groupStarWhite, null);
                            my.tweenStarForPopUpDailySpin('spin-star-white', distance * 4, distance, groupStarWhite, null);
                            my.tweenStarForPopUpDailySpin('spin-star-white', distance * 4, -distance, groupStarWhite, null);
                            spriteCoin.visible = true;
                            textDailySpinCoin.alpha = 1;
                            break;

                    }
                    if (index == 7) {
                        Lobby.PhaserJS.clearTimer(my, disPlay);
                    }
                }, this);

        };
        /**
         * tween star for popup daily spin
         * @param key : key of sprite
         * @param x : position x
         * @param y : position y
         * @param group : group
         * @param onComplete : on complete
         */
        my.tweenStarForPopUpDailySpin = function (key, x, y, group, onComplete) {
            var star = my.add.sprite(x, y, key);
            var duration = 700;
            star.blendMode = PIXI.blendModes.ADD;
            star.scale = {
                x: 0,
                y: 0
            };
            star.anchor = {
                x: 0.5,
                y: 0.5
            };
            //star.scale.x
            //star.scale.y
            star.alpha = 0;
            star.angle = -45;
            my.add.tween(star).to({angle: 135}, duration, Phaser.Easing.Quintic.Out, true);
            var tween = my.add.tween(star).to({alpha: 1}, duration, Phaser.Easing.Quintic.Out, true);
            my.add.tween(star.scale).to({x: 1.5, y: 1.5}, duration, Phaser.Easing.Quintic.Out, true);
            tween.onComplete.add(function () {
                my.add.tween(star.scale).to({x: 0.5, y: 0.5}, duration / 2, Phaser.Easing.Quintic.Out, true);
                my.add.tween(star).to({angle: 90}, duration, Phaser.Easing.Quintic.Out, true);
                my.add.tween(star).to({alpha: 0}, duration / 2, Phaser.Easing.Quintic.Out, true).onComplete.add(function () {
                    if (Lobby.Utils.objectNotNull(onComplete)) {
                        onComplete();
                    }
                }, my);
            }, my);
            group.add(star);


        };
        /**
         * particle for popup daily spin
         * @param int
         * @param x
         * @param y
         * @param width
         * @param height
         * @param groupParent
         */
        my.particleForPopUpDailySpin = function (int, x, y, width, height, groupParent) {

            var numberOfBlockXHalf = 10;
            var numberOfBlockYHalf = 6;
            var halfWidth = width / 2;
            var halfHeight = height / 2;
            var unitX = halfWidth / numberOfBlockXHalf;
            var unitY = halfHeight / numberOfBlockYHalf;
            var pointArray =
                [];

            var randomArray1 = [8, 6, -3, -4, 3, -7, 10, 7, 7, 2, 1, -7, -6, -8, 1, 10, 8, -7, -8, -8];
            var randomArray2 = [-4, -1, 8, 9, -6, 9, 9, -4, -7, 4, 1, 10, 3, -10, -4, 10, 7, -7, 0, -2];
            var randomArray3 = [-2, 10, 7, 8, -1, 1, 6, 2, -5, -6, 3, -4, -2, -3, -6, 6, -1, 5, -5, -2];
            var randomArray4 = [10, 7, -7, 5, -8, 2, 5, -9, -6, 6, -8, -2, 0, 10, 5, -4, -1, -1, 2, -6];
            var randomArray5 = [0, 10, -3, 5, -1, 9, -6, 7, 5, 6, 6, 5, -8, -2, 6, 8, -8, -5, -6, 0];
            var randomArray6 = [4, 3, 2, -2, 7, -4, 5, 10, -7, 10, -8, -4, -2, 3, 4, 4, -10, 0, 3, -8];
            var randomArray7 = [8, 5, -9, -6, 10, 5, -10, 7, 5, -9, -5, 3, 4, -5, 8, -4, -8, 8, 3, 9];

            var randomArray8 = [-1, 8, -7, 7, 3, 3, -4, 4, -10, 3, 10, -8, -5, 7, 5, 2, -5, 10, 5, -1];
            var randomArray9 = [-8, -3, -2, -3, 7, -2, -4, 8, -4, -1, -6, -3, 0, 8, -5, -3, -3, 9, 0, -4];
            var randomArray10 = [-2, -4, -2, 2, 4, -3, 5, 7, -5, -4, -6, 10, -3, 5, 0, -8, -4, -6, 2, 5];
            var randomArray11 = [3, -4, -10, -5, 8, 1, -1, 0, 0, 4, 1, -6, -10, 8, 10, -4, 7, 2, -6, 7];
            var randomArray12 = [0, 10, 8, 5, 4, -1, 9, -3, -6, -7, -3, -1, 0, -1, 5, -4, -7, -6, -5, -1];
            var randomArray13 = [6, -7, 10, -3, -7, 10, -4, 2, -1, -3, 7, -3, 9, -3, -3, 1, 4, 0, -5, 5];
            var randomArray14 = [2, 3, -9, -9, 7, 6, 0, 2, 4, 9, 1, 1, 9, 1, 6, -6, -6, -2, 1, 0];

            //console.log("this is what the people call random and it fucking awsome");
            var randomArray = "";
            for (var i = -(numberOfBlockXHalf+1); i < numberOfBlockXHalf; i++) {
                var xPos = i * unitX;
                var yPos = 0;
                var indexFrom0 = i + numberOfBlockXHalf;

                if(indexFrom0 >= randomArray8.length) indexFrom0 = randomArray8.length - 1;
                else if(indexFrom0 < 0) indexFrom0 = 0;

                //if(i == 0){
                yPos = -unitY;
                pointArray.push({x: xPos + randomArray8[indexFrom0], y: yPos + randomArray1[indexFrom0]});
                yPos = -unitY * 2;
                pointArray.push({x: xPos + randomArray9[indexFrom0], y: yPos + randomArray2[indexFrom0]});
                yPos = -unitY * 4;
                pointArray.push({x: xPos + randomArray10[indexFrom0], y: yPos + randomArray3[indexFrom0]});
                yPos = 0;
                pointArray.push({x: xPos + randomArray11[indexFrom0], y: yPos + randomArray4[indexFrom0]});
                yPos = unitY;
                pointArray.push({x: xPos + randomArray12[indexFrom0], y: yPos + randomArray5[indexFrom0]});
                yPos = unitY * 2;
                pointArray.push({x: xPos + randomArray13[indexFrom0], y: yPos + randomArray6[indexFrom0]});
                yPos = unitY * 4;
                pointArray.push({x: xPos + randomArray14[indexFrom0], y: yPos + randomArray7[indexFrom0]});

                //randomArray += ","+Lobby.Utils.getRandomInRange(-10,10);
                //}
            }
            //console.log(randomArray);


            var bunchOfLight = 80;
            var i = 0;
            var timer = my.time.events.loop(10,
                function () {
                    for (var j = 0; j < bunchOfLight; j++) {

                        if (i >= pointArray.length) {
                            Lobby.PhaserJS.clearTimer(my, timer);
                            return;
                        }
                        var position = pointArray[i];
                        var pixelWhite =
                            my.add.sprite(
                                position.x + x + halfWidth,
                                position.y + y,
                                "pixel_white",
                                null,
                                groupParent
                            );
                        pixelWhite.anchor = {x: 0.5, y: 0.5};
                        pixelWhite.scale.setTo(1.2);
                        //pixelWhite.blendMode = PIXI.blendModes.ADD;

                        var tween = my.add.tween(pixelWhite.scale);
                        tween.object = pixelWhite;
                        tween.to({x: 0.4, y: 0.4}, 300, "Linear", true);
                        tween.onComplete.add(
                            function () {
                                this.destroy();
                            }, pixelWhite);

                        i++;
                    }
                }, this);
            //for(var i = 0; i < pointArray.length; i++) {
            //}
            //return;
            //var tempX = x + 180;
            //var tempY = y + 200 - 80;
            //tempY *= LobbyConfig.scaleRatioEntireGame;
            //var fun = destroyEmitter;
            //var temp = null;
            //
            //var numberOfPartical = 500;//prompt("number of partical","500");
            //if (Lobby.Utils.isOldSchoolDevice()) {
            //    numberOfPartical = 100;
            //}
            //
            //temp = my.add.emitter(my.world.centerX, tempY, numberOfPartical);
            //if (typeof width === 'undefined') {
            //    width = 360 * LobbyConfig.scaleRatioEntireGame;
            //}
            //temp.width = width;
            //temp.height = 5;
            //temp.makeParticles('pixel_white');
            //
            //
            //temp.setRotation(0, 0);
            //temp.setAlpha(0.1, 1, 100);
            //temp.setScale(0.5, 1, 0.5, 1, 60000, Phaser.Easing.Quintic.Out);
            //temp.gravity = 0;
            //
            //temp.start(false, 300, -5000, 500, true);
            //
            //temp.emitX = tempX;
            //
            ////my.add.tween(temp).to( { emitX: tempX+250 }, 100, Phaser.Easing.Linear.None, true, 0, Number.MAX_VALUE, false);
            //switch (int) {
            //    case 1:
            //        emitter = temp;
            //        fun = destroyEmitter;
            //        break;
            //    case 2:
            //        emitter2 = temp;
            //        fun = destroyEmitter2;
            //        break;
            //    case 3:
            //        emitter3 = temp;
            //        fun = destroyEmitter3;
            //        break;
            //    case 4:
            //        emitter4 = temp;
            //        fun = destroyEmitter4;
            //        break;
            //}
            //my.time.events.add(755, fun, this);
        };
        function destroyEmitter() {
            emitter.destroy();
        }

        function destroyEmitter2() {
            emitter2.destroy();
        }

        function destroyEmitter3() {
            emitter3.destroy();
        }

        function destroyEmitter4() {
            emitter4.destroy();
        }

        /**
         * get angle from factor spin
         * @param factor
         * @returns {number}
         */
        my.getAngleFromFactorSpin = function (factor) {
            switch (factor) {
                case 1:
                    return 0;
                case 5:
                    return -30;
                case 4:
                    return -60;
                case 3:
                    return -90;
                case 2:
                    return 30;
                case 6:
                    return 90;
            }
            return 0;
        };

        /**
         * get angle from coin spin
         * @param coin
         * @returns {number}
         */
        my.getAngleFromCoinSpin = function (coin) {
            switch (coin) {
                case 300:
                    return 0;
                    break;
                case 1000:
                    return -30;
                    break;
                case 5000:
                    return -60;
                    break;
                case 800:
                    return -90;
                    break;
                case 2000:
                    return -120;
                    break;
                case 600:
                    return -150;
                    break;
                case 10000:
                    return 180;
                    break;
                case 50000:
                    return 30;
                    break;
                case 500:
                    return 60;
                    break;
                case 50:
                    return 90;
                    break;
                case 200:
                    return 120;
                    break;
                case 100:
                    return 150;
                    break;
                default:
                    return 0;
            }
        };

        /**
         * prepare to show spin popup with info
         * @param spinInfo : spin info
         */
        my.showSpin = function (spinInfo) {

            if (Lobby.Utils.objectIsNull(spinInfo)) {
                //return;
                spinInfo = {
                    coin_per_friend: 100,
                    coin: 40000,
                    factor: 5,
                    level_bonus: 1223,
                    number_of_friend: 100,
                    box: 7,
                    total_coin: 112321312,
                    vip_benefit: 1
                };
            }


            var group = my.add.group();

            var background =
                my.add.sprite(
                    0,
                    0,
                    "spin_bg");
            background.scale.setTo(100 / 70);//reduce 70% resolution
            Lobby.PhaserJS.center(
                background,
                background
            );

            group.add(background);

            var outerActive =
                my.add.sprite(
                    0,
                    0,
                    "spin_round_outer_active", null);
            outerActive.scale.setTo(100 / 70);//reduce 70% resolutions
            outerActive.angle = 11;
            outerActive.alpha = 0;
            Lobby.PhaserJS.center(
                outerActive,
                outerActive
            );
            //
            group.add(outerActive);

            var circleSmall =
                my.add.sprite(
                    0,
                    0,
                    "spin_round_inner", null);
            circleSmall.scale.setTo(100 / 70);//reduce 70% resolution
            group.add(circleSmall);
            Lobby.PhaserJS.center(
                circleSmall,
                background
            );

            circleSmall.anchor = {
                x: 0.5,
                y: 0.5
            };

            //circleSmall.pivot.x = circleSmall.width * .5;
            //circleSmall.pivot.y = circleSmall.height * .5;

            var groupSpinActiveBulbAndLight =
                my.add.group();
            group.add(groupSpinActiveBulbAndLight);

            groupSpinActiveBulbAndLight.alpha = 0;

            var spinVLightActive =
                my.add.sprite(
                    0,
                    -68,
                    "spin_v_light_active",
                    null);
            groupSpinActiveBulbAndLight.add(spinVLightActive);
            spinVLightActive.anchor.setTo(0.5, 1.);

            Lobby.PhaserJS.center(
                groupSpinActiveBulbAndLight,
                background
            );
            //if (LobbyConfig.isDebug) {
            //
            //    UIBodyAnimation.addPointGraphicAt(
            //        my,
            //        0, 0,
            //        groupSpinActiveBulbAndLight
            //    );
            //};

            var arrayOfLightPoint = {
                'x': [],
                'y': []
            };
            var arrayOfPoint =
                UIBodyAnimation.createPath(
                    my,
                    UIBodyAnimation.PATH_TYPE_LINE,
                    {
                        'x': [-22, -68],
                        'y': [-84, -260]
                    },
                    10,
                    groupSpinActiveBulbAndLight,
                    LobbyConfig.isDebug);
            arrayOfLightPoint.x = arrayOfLightPoint.x.concat(arrayOfPoint.x);
            arrayOfLightPoint.y = arrayOfLightPoint.y.concat(arrayOfPoint.y);

            arrayOfPoint =
                UIBodyAnimation.createPath(
                    my,
                    UIBodyAnimation.PATH_TYPE_LINE,
                    {
                        'x': [22, 68],
                        'y': [-84, -260]
                    },
                    10,
                    groupSpinActiveBulbAndLight,
                    LobbyConfig.isDebug);

            arrayOfLightPoint.x = arrayOfLightPoint.x.concat(arrayOfPoint.x);
            arrayOfLightPoint.y = arrayOfLightPoint.y.concat(arrayOfPoint.y);

            arrayOfPoint =
                UIBodyAnimation.createPath(
                    my,
                    UIBodyAnimation.PATH_TYPE_CURVE_BEZIER,
                    {
                        'x': [-22, 0, 22],
                        'y': [-82, -86, -82]
                    },
                    2,
                    groupSpinActiveBulbAndLight,
                    LobbyConfig.isDebug);

            arrayOfLightPoint.x = arrayOfLightPoint.x.concat(arrayOfPoint.x);
            arrayOfLightPoint.y = arrayOfLightPoint.y.concat(arrayOfPoint.y);

            arrayOfPoint =
                UIBodyAnimation.createPath(
                    my,
                    UIBodyAnimation.PATH_TYPE_CURVE_BEZIER,
                    {
                        'x': [-62, 0, 62],
                        'y': [-78 - 190, -98 - 190, -78 - 190]
                    },
                    10,
                    groupSpinActiveBulbAndLight,
                    LobbyConfig.isDebug);

            arrayOfLightPoint.x = arrayOfLightPoint.x.concat(arrayOfPoint.x);
            arrayOfLightPoint.y = arrayOfLightPoint.y.concat(arrayOfPoint.y);


            UIBodyAnimation.drawBulbWithPathPoint(
                my,
                arrayOfLightPoint,
                'spin-star-active',
                function (index,
                          bulb,
                          numberOfBulb) {

                    var duration = 10;

                    var reIndex = index % 3;
                    var frames = [0, 1, 2];
                    if (reIndex == 1) {
                        frames = [1, 2, 0];
                    } else if (reIndex == 2) {
                        frames = [2, 0, 1];
                    }

                    bulb.animations.add('animate', frames, 1, true, true);
                    bulb.animations.play('animate', duration, true);

                    return duration;
                },
                false,
                groupSpinActiveBulbAndLight);


            arrayOfLightPoint =
                UIBodyAnimation.createCicle(
                    my,
                    {x: 0, y: 0},
                    300.0,
                    100,
                    groupSpinActiveBulbAndLight,
                    LobbyConfig.isDebug);
            UIBodyAnimation.drawBulbWithPathPoint(
                my,
                arrayOfLightPoint,
                'spin-bulb-active',
                function (index,
                          bulb,
                          numberOfBulb) {

                    var duration = 5;
                    bulb.animations.add('animate', [index % 2, 1 - index % 2], 1, true, true);
                    bulb.animations.play('animate', duration, true);

                    return duration;
                },
                false,
                groupSpinActiveBulbAndLight);


            UIBodyAnimation.drawBulbWithPathPoint(
                my,
                arrayOfLightPoint,
                'spin-star-active',
                function (index,
                          bulb,
                          numberOfBulb) {

                    var duration = 5;
                    bulb.animations.add('animate', null, 1, true, true);
                    bulb.animations.play('animate', duration, true);

                    return duration;

                },
                false,
                groupSpinActiveBulbAndLight);


            var gear =
                my.add.sprite(
                    0,
                    0,
                    "spin_gear",
                    null);
            group.add(gear);

            gear.anchor = {
                x: 0.5,
                y: 0
            };
            gear.position = {
                x: background.width / 2,
                y: 0
            };


            var groupSpinLightWave =
                my.add.group();
            group.add(groupSpinLightWave);
            var waveAnimation = function (weight,
                                          r,
                                          duration,
                                          finish) {


                //groupSpinLightWave.alpha = 0;

                var lightWave = my.add.graphics(0, 0);
                // graphics.lineStyle(2, 0xffd900, 1);
                lightWave.lineStyle(weight, 0xffffff, 0.2);
                lightWave.drawCircle(0, 0, r);
                my
                    .add
                    .tween(lightWave.scale)
                    .to({x: 1.5, y: 1.5}, Phaser.Timer.SECOND * duration, Phaser.Easing.Quadratic.In, true)
                    .onComplete.add(
                    function () {

                    },
                    this);
                my
                    .add
                    .tween(lightWave)
                    .to({alpha: 0.}, Phaser.Timer.SECOND * duration, Phaser.Easing.Quadratic.In, true)
                    .onComplete.add(
                    function () {
                        lightWave.destroy();
                        if (finish != null &&
                            finish != undefined) {
                            finish();
                        }

                    },
                    this);

                groupSpinLightWave.add(lightWave);


            };

            var groupWaveAnimation = function () {

                waveAnimation(20, 200, 0.5);
                waveAnimation(30, 200, 0.8,
                    function () {
                        waveAnimation(20, 200, 0.5);
                        waveAnimation(30, 200, 0.8);
                    });

                waveAnimation(20, 650, 0.5);
                waveAnimation(30, 650, 0.8,
                    function () {
                        waveAnimation(20, 650, 0.5);
                        waveAnimation(30, 650, 0.8);
                    });
            };

            Lobby.PhaserJS.center(
                groupSpinLightWave,
                background
            );

            var collisionAnimation = function () {

                my
                    .add
                    .tween(gear)
                    .to({angle: -45}, 70, Phaser.Easing.Quadratic.In, true)
                    .onComplete.add(
                    function () {
                        my
                            .add
                            .tween(gear)
                            .to({angle: 10}, 150, Phaser.Easing.Quadratic.Out, true)
                            .onComplete.add(
                            function () {

                                my
                                    .add
                                    .tween(gear)
                                    .to({angle: 0}, 50, Phaser.Easing.Quadratic.Out, true);

                            },
                            this);

                    },
                    this);
            };

            var btnSpin = null;
            var btnSpinClicked = function () {
                groupWaveAnimation();
                //return;
                outerActive.alpha = 1;

                btnSpin.input.enabled = false;
                my.playSpinSound();
                var increase = 8.0;
                background.angle = 11;
                circleSmall.angle = -11;

                var angleStopBackground = 1000;
                var angleStopInner = 1000;

                var delta4MatchingRightValue = 8.0;

                var time4Rotating = my.time.events.loop(
                    10,
                    function () {
                        // wait 20ms (just to be sure) before enabling physics, so that the physics system
                        // doesn't try to erroneously interpolate the movement
                        if (Math.abs(background.angle - angleStopBackground) > delta4MatchingRightValue) {
                            background.angle += increase;
                            background.angle = Math.ceil(background.angle);
                        } else {
                            //background.angle = angleStopBackground;

                            my
                                .add
                                .tween(background)
                                .to({angle: angleStopBackground}, 100, Phaser.Easing.Quadratic.In, true)
                                .onComplete.add(
                                function () {
                                },
                                this);
                        }
                        outerActive.angle = background.angle;

                        if (Math.abs(circleSmall.angle - angleStopInner) > delta4MatchingRightValue) {
                            circleSmall.angle -= increase;
                        } else {
                            //circleSmall.angle = angleStopInner;

                            my
                                .add
                                .tween(circleSmall)
                                .to({angle: angleStopInner}, 100, Phaser.Easing.Quadratic.In, true)
                                .onComplete.add(
                                function () {
                                },
                                this);
                        }

                        if (Math.abs(background.angle - angleStopBackground) <= delta4MatchingRightValue &&
                            Math.abs(circleSmall.angle - angleStopInner) <= delta4MatchingRightValue) {

                            Lobby.Utils.printConsoleLog("STOP ROTATING!");
                            Lobby.PhaserJS.clearTimer(my,time4Rotating);
                            //my.time.events.remove(time4Rotating);

                            my
                                .add
                                .tween(background)
                                .to({angle: angleStopBackground}, 100, Phaser.Easing.Quadratic.In, true)
                                .onComplete.add(
                                function () {
                                },
                                this);
                            my
                                .add
                                .tween(circleSmall)
                                .to({angle: angleStopInner}, 100, Phaser.Easing.Quadratic.In, true)
                                .onComplete.add(
                                function () {
                                },
                                this);


                            groupSpinActiveBulbAndLight.alpha = 1.;
                            outerActive.alpha = 0.;
                            my.time.events.add(
                                Phaser.Timer.SECOND * 1.5,
                                function () {


                                    my.showPopupSpin(
                                        spinInfo,
                                        function () {
                                            if (LobbyConfig.useManagerForPopUp) {
                                                //ManagerForPopUp.closeCurrentShowingPopUp();
                                                ManagerForPopUp.forceClosePopUp(my, group);
                                            } else {
                                                my.closePopupWithAnimateDownNew(group);
                                            }
                                        });

                                },
                                this).autoDestroy = true;

                        }


                        //Lobby.Utils.printConsoleLog(dot.angle);
                        var backgroundAngleInt = Math.ceil(background.angle);
                        if ((backgroundAngleInt - 11) % 30 == 0) {
                            //Lobby.Utils.printConsoleLog(".");
                            //Lobby.Utils.printConsoleLog("collision at " + dot.angle);
                            collisionAnimation();

                            //if(increase < 2.1) {
                            increase -= 0.1;

                            if (increase <= 1) {
                                increase = 1;
                            }
                            //}

                        }

                    }, this);


                var stopRotateSpin = my.time.events.loop(Phaser.Timer.SECOND * 3, function () {


                    angleStopBackground =
                        my.getAngleFromFactorSpin(spinInfo.factor);

                    angleStopInner =
                        my.getAngleFromCoinSpin(spinInfo.coin);


                    //increase = 2.1;

                    Lobby.PhaserJS.clearTimer(my,stopRotateSpin);
                    //my.time.events.remove(stopRotateSpin);
                    stopRotateSpin = null;

                }, this);
                //    }
                //);
            };

            btnSpin = my.add.button(
                0, 0, 'btn-spin',
                function () {
                    //overFrame, outFrame, downFrame, upFrame
                    btnSpinClicked();
                }, null,
                0, 0, 1, 0, group
            );

            var autoRotateSpin = my.time.events.loop(Phaser.Timer.SECOND * 3, function () {
                Lobby.PhaserJS.clearTimer(my,autoRotateSpin);
                //my.time.events.remove(autoRotateSpin);
                if (btnSpin.input.enabled ||
                    btnSpin.input.enabled == undefined) {
                    btnSpinClicked();
                }
                autoRotateSpin = null;

            }, this);

            Lobby.PhaserJS.center(
                btnSpin,
                background);

            Lobby.PhaserJS.centerWorld(group);
            group.position.x += 50;
            Lobby.PhaserJS.scaleGroupForOptimize(group, true);

            if (LobbyConfig.useManagerForPopUp) {
                ManagerForPopUp.addPopUpToQueue(
                    ManagerForPopUp.createPopUpData(
                        my,
                        group
                    ),
                    true // isShow
                );
                //ManagerForPopUp.forceShowPopUp(my, group);
            } else {
                my.openPopupWithAnimateUpNew(group);
            }
        };
        /**
         * Prepare for showing new bonus strategy and old pop up which show at first load to main menu
         */
        my.checkAndShowPopupBonus = function() {


            /**
             * Check and add popup spin to queue
             */
            my.repair4ShowSpin();

            //if (!LobbyConfig.isTestStrategy) return;
            /**
             * Add popup daily streak bonus to queue if can collect
             */

            if (LobbyConfig.isTestAlgorithmMode) return;

            if (LobbyConfig.additionalInfo.dailyStreakBonus.canCollect && !LobbyUserData.dataTutorial.isPlayingTutorial) {
                my.showPopupDailyBonusStreak(false);
            }


        }
        /**
         * call to sv to get spin info and call showSpin
         */
        my.repair4ShowSpin = function () {
            //my.showSpin(null);
            //return;
            if (my._userData.profile.role != 0) {
                return;
            }
            if(LobbyConfig.isTestAlgorithmMode) return;
            Manager4Spin.getSpinFromSV(
                function (spinInfo) {
                    //Lobby.Utils.printConsoleLog("get spin info done!");

                    if (spinInfo != null) {
                        //my.callBackShowPopupPromotion.ShowDailySpin = function(){
                        my.showSpin(spinInfo);
                        //};
                    }else{
                        my.checkAndShowPopupSpecialOffer();
                    }
                }
            );
        };

        /**
         * destroy popups were inited
         */
        my.destroyPopupAfterSwitchState = function () {
            if (Lobby.Utils.objectNotNull(my.popupContainer.popupProfile)
                && my.popupContainer.popupProfile != "") {
                my.popupContainer.popupProfile.destroy();
            }

            if (Lobby.Utils.objectNotNull(my.popupContainer.popupSetting)
                && my.popupContainer.popupSetting != "") {
                my.popupContainer.popupSetting.destroy();
            }

            if (Lobby.Utils.objectNotNull(my.popupContainer.popupShop)
                && my.popupContainer.popupShop != "") {
                my.popupContainer.popupShop.destroy();
            }
            my.popupContainer = {
                popupProfile: "",
                popupShop: "",
                popupFriend: "",
                popupSetting: "",
                popupAchievement: "",
                popupInfoSlotGame: ""
            };
        };
        my.prepareToChangeStateFromMainMenu = function(){
            if (LobbyConfig.stopRequestAjax) {
                if (Lobby.Utils.objectNotNull(my.globalBannerSlotPopup)) {
                    my.closePopupWithAnimateDownNew(my.globalBannerSlotPopup);
                    my.globalBannerSlotPopup = null;
                }
                return;
            }

            if (bannerSlotsGroup != null && bannerSlotsGroup != undefined) {
                my.closePopupWithAnimateDownNew(bannerSlotsGroup);
            }
            my.pauseBackgroundMusic();
            my._maskBackBtn.alpha = 1;
            my._maskBackBtn.visible = true;

            if (Lobby.Utils.objectNotNull(my.uiBody)) {
                my.uiBody.visible = false;
            }
            if (Lobby.Utils.objectNotNull(my.uiFooter)) {
                my.uiFooter.visible = false;
            }
            my.uiHeader.visible = false;
            my.canDisableGame = true;
            document.body.style.background = "#333333";
            window.groupUILoading.visible = false;
            window.loadingViewInitSession.visible = false;
            my.numberOfCurrentPopup = 0;
            my.isShowingPopup = false;
            my.toggleGameMusic();
            my.destroyCurrentCoinAnimation();
            my.destroyDarkLayer();

            my.stopAllScrollEvent();
            my.destroyPopupAfterSwitchState();
            my.destroyDarkLayer();
            my.removeAllPopupAndDarkLayer();

            my.playingGame = LobbyConstant.isInGame;
        };
        /**
         * show game slot with game id
         * @param gameId
         */
        my.showGame = function (gameId) {
            my.prepareToChangeStateFromMainMenu();
            my.prepare4ShowingGame(false);
            Manager4MyUserInfo.startTimerGetUserInfo(
                my,
                function (userInfo) {
                    my.updateUserInfoUIFromUserInfo(userInfo, null);
                }
            );
            var token = my._userData.profile.accessToken;
            Lobby.Utils.printConsoleLog('--------------------------- My token: ' + token);
            my.state.start(
                LobbyConstant.stateName.GameSlot,
                LobbyConfig.isDestroyWorldFromMainMenu2GameSlot,
                false,
                gameId,
                my._userData,
                my.gameSlotGroup
            );
            //my.game.state.start('GameSlot');


            // 2015-12-12: Phuoc: detect firefox -> chuyen duong link tu .swf -> .html
            //var BrowserDetect = {
            //    init: function () {
            //        this.browser = this.searchString(this.dataBrowser) || "Other";
            //        this.version = this.searchVersion(navigator.userAgent) || this.searchVersion(navigator.appVersion) || "Unknown";
            //    },
            //    searchString: function (data) {
            //        for (var i = 0; i < data.length; i++) {
            //            var dataString = data[i].string;
            //            this.versionSearchString = data[i].subString;
            //
            //            if (dataString.indexOf(data[i].subString) !== -1) {
            //                return data[i].identity;
            //            }
            //        }
            //    },
            //    searchVersion: function (dataString) {
            //        var index = dataString.indexOf(this.versionSearchString);
            //        if (index === -1) {
            //            return;
            //        }
            //
            //        var rv = dataString.indexOf("rv:");
            //        if (this.versionSearchString === "Trident" && rv !== -1) {
            //            return parseFloat(dataString.substring(rv + 3));
            //        } else {
            //            return parseFloat(dataString.substring(index + this.versionSearchString.length + 1));
            //        }
            //    },
            //
            //    dataBrowser: [
            //        {string: navigator.userAgent, subString: "Edge", identity: "MS Edge"},
            //        {string: navigator.userAgent, subString: "MSIE", identity: "Explorer"},
            //        {string: navigator.userAgent, subString: "Trident", identity: "Explorer"},
            //        {string: navigator.userAgent, subString: "Firefox", identity: "Firefox"},
            //        {string: navigator.userAgent, subString: "Opera", identity: "Opera"},
            //        {string: navigator.userAgent, subString: "OPR", identity: "Opera"},
            //
            //        {string: navigator.userAgent, subString: "Chrome", identity: "Chrome"},
            //        {string: navigator.userAgent, subString: "Safari", identity: "Safari"}
            //    ]
            //};
            //
            //BrowserDetect.init();
            //Lobby.Utils.printConsoleLog("BrowserDetect.browser: " + BrowserDetect.browser);
            //

            //LobbyRequest.User.trackGamePlay(baseUrl + token, LobbyConfig.TrackGame.Type.Enter, null, my);
            //document.getElementById('iframe-game').src = baseUrl + token + "&lang=" +
            //    my.arrayLanguageISOCodeForGame[my.currentLanguageFlagKeyNumber];
            //document.getElementById('iframe-game').src = "https://scmw.spiralworks-cloud.com/gamehtml5/LobbyGamePlayServer/DeepBlue-v2/index.html?token=proxy@playpalace@5476489a-6676-4bb6-ae52-fb046de78e61";
            //document.getElementById('iframe-game').onload = function () {
            //    Lobby.Utils.printConsoleLog('Done load iframe game with :', baseUrl + token);
            //};
            //}
            //catch (err) {
            //    Lobby.Utils.printConsoleLog("Exception load game ", err);
            //}

        };

        /**
         * remove all popup and dark layer in canvas game
         */
        my.removeAllPopupAndDarkLayer = function(){
            my.popupManager.removeAll();
        };

        /**
         * Web version
         */
        var totalDarkLayer = 0;
        /**
         * create dark layer in game
         * @param isClose : can close popup when click out side popup
         * @returns {*} dark layer
         */
        my.createDarkLayer = function (isClose) {
            if(LobbyConfig.isDebug) console.log("********************************** my.createDarkLayer");
            if (Lobby.Utils.objectNotNull(my._userData)) {
                my.game.pageViewMain.endMove();//kiet add
                my.game.pageViewMain.isDisable = true;
            }
            var darkLayer = my.add.sprite(0, 0, "popup-dark-layer-login-state", null, my.popupManager);

            darkLayer.position.y -= ManagerForScale.doubleIncrementHeight();
            darkLayer.alpha = 0.65;

            darkLayer.inputEnabled = true;
            darkLayer.events.onInputDown.add(function () {
                //Lobby.Utils.printConsoleLog("Dark layer event input down");
                if (Lobby.Utils.objectNotNull(isClose)) {
                    if (Lobby.Utils.objectNotNull(my.globalBannerSlotPopup)) {
                        my.closePopupWithAnimateDownNew(my.globalBannerSlotPopup);
                        my.globalBannerSlotPopup = null;
                    }
                    else {
                        my.closePopupWithAnimateDownNew(my.globalTmpPopup);
                    }
                }
            }, this);
            my.checkAndShowDarkLayerInGameSlot(true);

            darkLayer.scale.setTo(LobbyConfig.scaleRatioEntireGame * ManagerForScale.getScale());
            darkLayer.position.y += ManagerForScale.incrementHeight();
            return darkLayer;
        };
        /**
         * destroy dark layer in game
         * @param darkLayer
         */
        my.destroyDarkLayer = function (darkLayer) {
            if (Lobby.Utils.objectNotNull(darkLayer))
                darkLayer.destroy();
        };
        /**
         * show dark layer
         */
        my.showDarkLayer = function () {
            my.world.bringToTop(my._darkLayer);
            my.checkAndShowDarkLayerInGameSlot(true);
        };
        /**
         * hide dark layer
         */
        my.hideDarkLayer = function () {
            my.game.world.sendToBack(my._darkLayer);
            my.checkAndShowDarkLayerInGameSlot(false);
        };
        /**
         * create close button
         * @param position : position
         * @param size : size button
         * @param group : parent group
         * @param isDebug : not use
         */
        my.createCloseButton = function (position, size, group, isDebug) {
            Lobby.PhaserJS.createRectangle(
                my, position.x, position.y, size.width, size.height,
                function () {
                    if (LobbyConfig.useManagerForPopUp) {
                        ManagerForPopUp.forceClosePopUp(my, group);
                    } else {
                        my.closePopupWithAnimateDownNew(group);
                    }
                },
                group, LobbyConfig.isDebug
            );
        };
        //chuyen thanh alpha khong con move up nua
        /**
         * open popup with animation alpha ( not move up )
         * @param group : parent group
         * @param isClose : is close popup when click out side popup
         * @param isPlayCoinCrownPurchase : is popup shop?
         * @param isPopupLevelUp : is popup level up?
         * @param popupDidAppear : is popup was appear? if not null, after show animation alpha popup, this function will be called
         * @returns {*}
         */
        my.openPopupWithAnimateUpNew = function (group, isClose, isPlayCoinCrownPurchase, isPopupLevelUp, popupDidAppear) {
            var dk = my.createDarkLayer(isClose, isPopupLevelUp);
            dk.scale.setTo(1, 1.5);
            my.popupManager.add(group);
            my.unfocusAll();
            var realGroupYPosition = group.y;
            //group.y = LobbyConfig.realHeight;
            group.alpha = 0;
            group.visible = true;
            my._animationMoveGroupUp = my.add.tween(group);
            //
            if (Lobby.Utils.objectNotNull(popupDidAppear)) {
                my._animationMoveGroupUp.onComplete.add(popupDidAppear);
            }
            //
            my._animationMoveGroupUp.to(
                //{y: realGroupYPosition},
                {alpha: 1},
                my._animationMoveGroupUpDurationTime,
                Phaser.Easing.Linear.None
            );
            my._animationMoveGroupUp.start();

            if (Lobby.Utils.objectNotNull(isPlayCoinCrownPurchase)
                && isPlayCoinCrownPurchase == true) {
                my.playCoinCrownPurchaseSound();
            } else {
                my.playPopUpSound();
            }

            my.game.world.bringToTop(my.popupManager);
            my.popupManager.bringToTop(group);

            my.isShowingPopup = true;
            my.numberOfCurrentPopup++;
            group.darklayer = dk;
            my.globalTmpPopup = group;
            if (group.groupKeyName == "popup_slot") {
                my.globalBannerSlotPopup = group;
            }
            return dk;
        };

        /**
         * close popup with animation alpha
         * @param group : popup
         * @param darkLayer : dark layer
         */
        my.closePopupWithAnimateDownNew = function (group, darkLayer, callback) {
            if(Lobby.Utils.objectIsNull(callback)) callback = Lobby.Utils.nullFunction;
            if (group.isClosingPopup == true)
                return;
            group.isClosingPopup = true;
            my.playPopUpSound();
            //layer handle click nhieu lan
            var dk = my.add.sprite(0, 0, "popup-dark-layer-login-state");
            dk.position.y -= ManagerForScale.doubleIncrementHeight();
            dk.alpha = 0;
            dk.inputEnabled = true;

            if (Lobby.Utils.objectNotNull(group.darklayer)) {
                var animation4DL = my.add.tween(group.darklayer).to({alpha: 0}, my._animationMoveGroupUpDurationTime,
                    Phaser.Easing.Linear.None);
                animation4DL.start();
            }
            my._animationMoveGroupDown = my.add.tween(group);
            my._animationMoveGroupDown.to(
                {
                    //y: LobbyConfig.height
                    alpha: 0
                },
                my._animationMoveGroupUpDurationTime,
                Phaser.Easing.Linear.None);
            my._animationMoveGroupDown.onComplete.add(
                function () {
                    if (group.darklayer != null && group.darklayer != undefined) {
                        group.darklayer.destroy();
                    }
                    dk.destroy();
                    group.visible = false;
                    var isDestroyAllGroup = true;
                    if (Lobby.Utils.objectNotNull(group.name)
                        && (group.name == LobbyConfig.popupName.popupShop
                        || group.name == LobbyConfig.popupName.popupSetting)) {
                        isDestroyAllGroup = false;
                    }
                    if (isDestroyAllGroup) {
                        group.setAll("visible", false);
                        group.setAll("exists", false);
                        group.destroy();
                    } else if (Lobby.Utils.objectNotNull(group.groupWillDestroy)) {
                        group.groupWillDestroy.setAll("visible", false);
                        group.groupWillDestroy.setAll("exists", false);
                        group.groupWillDestroy.destroy();
                    }
                    if (my.numberOfCurrentPopup <= 0)
                        my.checkAndShowDarkLayerInGameSlot(false);
                    if (darkLayer != null && darkLayer != undefined) {
                        my.destroyDarkLayer(darkLayer);
                    }
                    group.isClosingPopup = false;
                    callback();
                },
                my);
            my._animationMoveGroupDown.start();
            //if (group.darklayer != null && group.darklayer != undefined) {
            //    group.darklayer.destroy();
            //}
            //group.setAll("visible", false);
            //group.setAll("exists", false);
            //group.destroy();
            //if(my.numberOfCurrentPopup <= 0)
            //    my.checkAndShowDarkLayerInGameSlot(false);
            //totalDarkLayer--;
            //my.updateColorDarkLayer(totalDarkLayer);
            //if (darkLayer != null && darkLayer != undefined) {
            //    my.destroyDarkLayer(darkLayer);
            //}

            my.numberOfCurrentPopup--;
            if (my.numberOfCurrentPopup == 1)
                my.game.kineticScrolling.isDisable = false;
            if (my.numberOfCurrentPopup <= 0) {
                my.numberOfCurrentPopup = 0;
                my.isShowingPopup = false;
                if (LobbyUserData.dataTutorial.isPlayingTutorial == false) {
                    my.game.pageViewMain.isDisable = false;
                }
                my.game.pageViewInfoPopup.isDisable = true;
                my.currentTab = "undefined";
                if (LobbyUserData.dataTutorial.isPlayingTutorial == true
                    && LobbyUserData.dataTutorial.currentStep == LobbyConstant.Constant4Tutorial.StepShowAchievementPopup) {
                    my.gotoStep(LobbyConstant.Constant4Tutorial.StepShowPopupShop);
                }
            }
        };

        /**
         * close popup withou animation
         * @param group
         * @param darkLayer
         */
        my.closePopupImmediately = function(group, darkLayer){
            if (group.isClosingPopup == true)
                return;
            group.isClosingPopup = true;
            my.playPopUpSound();
            //layer handle click nhieu lan
            //var dk = my.add.sprite(0, 0, "popup-dark-layer-login-state");
            //dk.position.y -= ManagerForScale.doubleIncrementHeight();
            //dk.alpha = 0;
            //dk.inputEnabled = true;

            if (group.darklayer != null && group.darklayer != undefined) {
                group.darklayer.destroy();
            }
            //dk.destroy();
            group.visible = false;
            var isDestroyAllGroup = true;
            if (Lobby.Utils.objectNotNull(group.name)
                && (group.name == LobbyConfig.popupName.popupShop
                || group.name == LobbyConfig.popupName.popupSetting)) {
                isDestroyAllGroup = false;
            }
            if (isDestroyAllGroup) {
                group.setAll("visible", false);
                group.setAll("exists", false);
                group.destroy();
            } else if (Lobby.Utils.objectNotNull(group.groupWillDestroy)) {
                group.groupWillDestroy.setAll("visible", false);
                group.groupWillDestroy.setAll("exists", false);
                group.groupWillDestroy.destroy();
            }
            if (my.numberOfCurrentPopup <= 0)
                my.checkAndShowDarkLayerInGameSlot(false);
            if (darkLayer != null && darkLayer != undefined) {
                my.destroyDarkLayer(darkLayer);
            }
            group.isClosingPopup = false;

            my.numberOfCurrentPopup--;
            if (my.numberOfCurrentPopup == 1)
                my.game.kineticScrolling.isDisable = false;
            if (my.numberOfCurrentPopup <= 0) {
                my.numberOfCurrentPopup = 0;
                my.isShowingPopup = false;
                if (LobbyUserData.dataTutorial.isPlayingTutorial == false) {
                    my.game.pageViewMain.isDisable = false;
                }
                my.game.pageViewInfoPopup.isDisable = true;
                my.currentTab = "undefined";
                if (LobbyUserData.dataTutorial.isPlayingTutorial == true
                    && LobbyUserData.dataTutorial.currentStep == LobbyConstant.Constant4Tutorial.StepShowAchievementPopup) {
                    my.gotoStep(LobbyConstant.Constant4Tutorial.StepShowPopupShop);
                }
            }
        };

        /**
         * open popup with animation right ( use for profile popup )
         * @param group : popup
         * @param isClose : is close popup when click out side popup
         * @returns {*}
         */
        my.openPopupWithAnimateRightNew = function (group, isClose) {
            if(my._animationMoveGroupLeft){
                if(LobbyConfig.isDebug){
                    console.log("STOP LEFT TWEEN");
                }
                try {
                    group.isClosingPopup = false;
                    my._animationMoveGroupLeft.stop();
                }catch(e){

                }
            }
            var dk = my.createDarkLayer(isClose);
            dk.scale.setTo(1, 1.5);
            my.popupManager.add(group);
            my.unfocusAll();
            var realGroupXPosition = group.x;
            group.x = -600;
            group.visible = true;
            if (Lobby.Utils.objectNotNull(group.groupWillDestroy)) {
                group.groupWillDestroy.visible = true;
            }
            my._animationMoveGroupRight = my.add.tween(group);
            my._animationMoveGroupRight.to(
                {x: realGroupXPosition},
                my._animationMoveGroupRightDurationTime,
                Phaser.Easing.Linear.None
            );
            my._animationMoveGroupRight.start();
            my.playPopUpSound();
            my.popupManager.bringToTop(group);
            my.isShowingPopup = true;
            my.numberOfCurrentPopup++;
            group.darklayer = dk;
            my.globalTmpPopup = group;
            if (group.groupKeyName == "popup_slot") {
                my.globalBannerSlotPopup = group;
            }
            return dk;
        };

        /**
         * close popup with animation left
         * @param group : popup
         * @param darkLayer : darklayer
         * @param callback : callback after close
         */
        my.closePopupWithAnimateLeftNew = function (group, darkLayer, callback) {
            if (group.isClosingPopup == true)
                return;
            group.isClosingPopup = true;
            my.playPopUpSound();
            if (group == null) {
                if(LobbyConfig.isDebug) console.log("Error");
            }
            my._animationMoveGroupLeft = my.add.tween(group);
            my._animationMoveGroupLeft.to(
                {
                    x: -600
                },
                my._animationMoveGroupRightDurationTime,
                Phaser.Easing.Linear.None);
            my._animationMoveGroupLeft.onComplete.add(
                function () {
                    if (group.darklayer != null && group.darklayer != undefined) {
                        group.darklayer.destroy();
                    }
                    //group.setAll("visible", false);
                    //group.setAll("exists", false);
                    //group.destroy();
                    if (Lobby.Utils.objectNotNull(group.groupWillDestroy)) {
                        group.groupWillDestroy.setAll("visible", false);
                        group.groupWillDestroy.setAll("exists", false);
                        group.groupWillDestroy.destroy();
                    }
                    my.checkAndShowDarkLayerInGameSlot(false);
                    if (darkLayer != null && darkLayer != undefined) {
                        my.destroyDarkLayer(darkLayer);
                    }
                    if (callback != null && callback != undefined) {
                        callback();
                    }
                    group.isClosingPopup = false;
                },
                my);
            my.getImageFromFile.hideInput();
            my.isShowPopupProfile = false;
            my._animationMoveGroupLeft.start();
            my.numberOfCurrentPopup--;
            if (my.numberOfCurrentPopup <= 0) {
                my.numberOfCurrentPopup = 0;
                my.isShowingPopup = false;
                my.game.pageViewInfoPopup.isDisable = true;
                my.game.pageViewMain.isDisable = false;
            }
        };

        /**
         * not use
         * @param isSuccess
         * @param result
         * @param productId
         */
        my.reloadProfileCallbackAfterPurchaseForP2PAndF2P = function (isSuccess, result, productId) {
            Lobby.Utils.printConsoleLog("Payment result ", isSuccess, result, productId);
            var shopData = {};
            //var chop=parseInt(productId);
            if (isSuccess) {
                if (Lobby.Utils.objectNotNull(result)) {
                    switch (result.status) {
                        case "completed":
                            my.showNotificationPopup(
                                my.selectlanguage.popup_gift_success.text,
                                my.selectlanguage.coin_purchase_successfully.text
                            );
                            break;
                        default :
                            /**
                             * TODO : track result status
                             */
                            break;
                            shopData.errorCode = 0;
                    }
                }
            }
            else {
                if (Lobby.Utils.objectIsNull(result)) {
                    shopData.errorCode = -1;
                }
                else {
                    if (result == "block_ip") {
                        my.showNotificationPopup(my.selectlanguage.popup_gift_warning.text, my.selectlanguage.main_menu_not_support_region.text);
                        shopData.errorCode = -2;
                    }
                    else {
                        shopData.errorCode = result.error_code;
                        shopData.errorMessage = result.error_message;
                    }
                }
            }
            (shopData.productId) = parseInt(productId);

            LobbyRequest.User.trackPayment(
                shopData,
                function (isSuccess, data) {
                    Lobby.Utils.printConsoleLog("Callback track payment ", isSuccess, data, shopData.productId);
                }
            );
        };

        return my;

    }(LobbyC.MainMenu || {})
)
;
