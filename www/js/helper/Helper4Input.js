/**
 * Created by Kiet on 7/9/2016.
 */
var Helper4Input = {

    Input: {
        groupInputField: 0,
        /**
         * create group input text with blinking animation
         * @param isPassword
         * @param callBackText
         * @param my
         */
        createGroupInputText: function (isPassword, callBackText, my) {
            var group = my.add.group();
            //var background = my.add.sprite(0, 0, "state-login-background", null, group);
            var background = Helper4Input.Input.addBackgroundLogin(0, 0, 0, 0, group, my);
            background.scale.setTo(ManagerForScale.getScale());
            var inputText = my.add.text(
                50,
                50,
                "",
                {
                    font: "35px Helvetica-Medium",
                    fill: "#000000",
                    wordWrap: true,
                    align: "left",
                    wordWrapWidth: 1090
                },
                group
            );

            var focusInputField = function (callBackText) {
                Helper4Input.Input.syncDivElementValueAndPhaserTextV2(
                    group,
                    $('#input-field'),
                    isPassword,
                    inputText,
                    callBackText,
                    my
                );
            };

            focusInputField(callBackText);

            my.inputRegion = Lobby.PhaserJS.createInputRegion(
                my,
                0,
                0,
                LobbyConfig.width*ManagerForScale.getScale(),
                LobbyConfig.height*ManagerForScale.getScale(),
                function () {
                    focusInputField(callBackText);
                },
                function () {
                },
                function () {
                }, group, LobbyConfig.isDebug
            );

            my.groupInputField = group;
        }
        ,
        /**
         * sync between input dom and phaser text
         * @param parentGroup               group contain text
         * @param divElement                input tag
         * @param isPasswordField           is input type == passwork
         * @param phaserText                phaser text
         * @param callbackEnterKey          callback when enter text
         * @param my                        game object
         */
        syncDivElementValueAndPhaserTextV2: function (parentGroup,
                                                      divElement,
                                                      isPasswordField,
                                                      phaserText,
                                                      callbackEnterKey,
                                                      my) {

            phaserText.text = "";
            divElement.val("");
            Helper4Input.Input.createBlinkingAnimation(
                parentGroup,
                phaserText.x + phaserText.width,
                phaserText.y,
                my
            );
            my.focusAndSync = function () {
                divElement.focus();
                divElement.val("");
                divElement.unbind("keyup");
                divElement.unbind("keydown");
                divElement.keyup(function (e) {
                    var isIncreaseText = true;
                    var divElementValue = divElement.val();
                    switch (e.which) {
                        case 13:
                            if (Lobby.Utils.objectNotNull(callbackEnterKey)) {
                                if (isPasswordField) {
                                    callbackEnterKey(Helper.Text.convertToPass(divElementValue));
                                } else {
                                    callbackEnterKey(phaserText.text);
                                }
                            }
                            Helper4Input.Input.unFocusInputField(my);
                            parentGroup.destroy();
                            return;
                        case 27:
                            divElement.val("");
                            break; // Esc: clear entry
                        case 37:
                            //divElement.val(divElementValue.substring(0, divElementValue.length - 1));
                            break; // cursor left
                        default:
                            break;
                    }
                    if (divElementValue.length <= phaserText.text.length) {
                        isIncreaseText = false;
                    }
                    if (isPasswordField) {
                        var displayText = Helper.Text.convertToPass(divElementValue);
                        phaserText.text = displayText;
                    } else {
                        phaserText.text = divElementValue;
                    }
                    if (divElementValue == "") {
                        Helper4Input.Input.createBlinkingAnimation(
                            parentGroup,
                            phaserText.x + phaserText.width,
                            phaserText.y,
                            my
                        );
                    }
                    else {
                        Helper4Input.Input.createBlinkingAnimation(
                            parentGroup,
                            phaserText.x + phaserText.width,
                            phaserText.y,
                            my
                        );
                    }

                    //if (isPasswordField){
                    //    setTimeout(function(){
                    //        phaserText.text = Helper.Text.convertToPass(divElementValue);
                    //    }, 1500);
                    //}
                });

                //divElement.keydown(function (e) {
                //    switch (e.which) {
                //        case 9:
                //            if (my.isWebInLoginScene)
                //                //callbackTabKey();
                //            return;
                //        default:
                //            break;
                //    }
                //});
            };

            setTimeout(function () {
                my.focusAndSync();
            }, 10);

        },

        /* --------------------------------------------- Blinking Animation --------------------------------------------- */
        createBlinkingAnimation: function (parentGroup, xCoordinate, yCoordinate, my) {
            Helper4Input.Input.destroyBlinkingAnimation(my);

            var intervalBlinking = null;

            var loadingTextFontStyle = {
                font: "35px " + ConstantFontName.FONT_NAME_PassionOne_Regular,
                fill: "#000000"
            };
            var blinkingText = my.add.text(xCoordinate, yCoordinate, "_", loadingTextFontStyle);

            var blinkingAnimation = function () {
                var count = true;
                clearInterval(intervalBlinking);
                intervalBlinking = setInterval(function () {
                    if (count) {
                        blinkingText.text = "_";
                        count = false;
                    }
                    else {
                        blinkingText.text = "";
                        count = true;
                    }
                }, 500);
            };

            blinkingAnimation();

            my.intervalBlinkingAndBlinkingText = {
                intervalBlinking: intervalBlinking,
                blinkingText: blinkingText
            };

            return intervalBlinking;
        },

        destroyBlinkingAnimation: function (my) {
            if (my.intervalBlinkingAndBlinkingText != null) {
                clearInterval(my.intervalBlinkingAndBlinkingText.intervalBlinking);
                my.intervalBlinkingAndBlinkingText.blinkingText.destroy(true);
            }
        },
        /**
         * unfocus input text
         * @param my    game object
         */
        unFocusInputField: function (my) {

            $('#input-field').blur();
            Helper4Input.Input.unFocusUI(my);
        },
        /**
         * unfocus ui on phaser
         * @param my    game object
         */
        unFocusUI: function (my) {
            Helper4Input.Input.destroyBlinkingAnimation(my);
            Helper4Input.Input.focusAndSync = function () {
            };
        },
        /**
         * create background gray with circle white
         * @param x
         * @param y
         * @param width
         * @param height
         * @param parent        group contain background
         * @param my            game object
         * @returns {*}
         */
        addBackgroundLogin: function (x, y, width, height, parent, my) {

            if (width == 0 && height == 0) {
                width = LobbyConfig.width;
                height = LobbyConfig.height;
            }

            var background = my.make.bitmapData(width, height);
            var backgroundGroup = background.addToWorld(x, y, 0, 0, 1, 1);

            parent.add(backgroundGroup);

            var center = {x: width / 2, y: height / 2};

            var innerCircle = new Phaser.Circle(center.x, center.y, Math.min(width, height));
            var outerCircle = new Phaser.Circle(center.x, center.y, Math.max(width, height) * 1.2);
            var grd = background.context.createRadialGradient(innerCircle.x, innerCircle.y, innerCircle.radius, outerCircle.x, outerCircle.y, outerCircle.radius);
            grd.addColorStop(0, '#fff');
            grd.addColorStop(1, '#bbb');

            background.cls();
            background.circle(outerCircle.x, outerCircle.y, outerCircle.radius, grd);


            //var background = my.add.sprite(x, y, "state-login-background", null, parent);
            //
            my.backGroundBody = backgroundGroup;
            return backgroundGroup;
        },
    }
}
