/**
 * Created by Ty Luu Dinh on 5/5/2016.
 */
LobbyC.Login = (function (my) {

    my.wasShowSpecialOffer = false;
    my.backGroundBody = null;
    my.accPassInfo = {
        acc: "",
        pass: "",
        passRetype: ""
    };
    var changePasswordToken = Lobby.Utils.getParameterFromCurrentURL("token");
    my.isWebInLoginScene = false;
    my.intervalBlinkingAndBlinkingText = null;

    my.darklayer = null;

    my.isShowingErrorPopup = false;

    /**
     * Enable/Disable show FPS counter
     */
    if (LobbyConfig.isDebug) {
        my.render = function () {
            my.game.debug.text("FPS:" + my.time.fps || '--', 2, 14, "#00ff00");
        };
        my.preload = function () {
            my.time.advancedTiming = true;
        };
    }
    /**
     * Create white space for background login
     * @param x position x
     * @param y position y
     * @param width
     * @param height
     * @param parent parent group
     * @param isNeedToScale need to scale group for fitting screen
     * @returns group
     */
    my.addBackgroundLogin = function (x, y, width, height, parent, isNeedToScale) {
        if (Lobby.Utils.objectIsNull(isNeedToScale)) isNeedToScale = true;
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
        if (isNeedToScale) ManagerForScale.scaleGroupAndRePositionBackground(backgroundGroup);
        my.backGroundBody = backgroundGroup;


        return backgroundGroup;
    };
    /**
     * Init facebook controller
     * @param callback when completed
     */
    my.initFacebook = function (callback) {
        //kiet cho den return
        FacebookController.init(callback);


        //window.fbAsyncInit = function () {
        //    FacebookController.init();
        //    if (Lobby.Utils.objectNotNull(callback)) {
        //        callback();
        //    }
        //};
        //
        //
        //(function (d, s, id) {
        //    var js, fjs = d.getElementsByTagName(s)[0];
        //    if (d.getElementById(id)) {
        //        return;
        //    }
        //    js = d.createElement(s);
        //    js.id = id;
        //    js.src = "//connect.facebook.net/en_US/sdk.js";
        //
        //    fjs.parentNode.insertBefore(js, fjs);
        //}(document, 'script', 'facebook-jssdk'));

    };
    /**
     * init event and check for FB login
     */
    my.create = function () {

        LobbyConfig.stopRequestAjax = false;
        ScheduleManager.stopSchedule(my);

        if(LobbyConfig.isDebug) {
            console.log("Modernizr.webgl: ", Modernizr.webgl);
            console.log("Modernizr.webglextensions: ", Modernizr.webglextensions);
        }
        if ((typeof cordova == "undefined")) {
            my.isWebInLoginScene = true;
        }
        ManagerForEvent.initInLoginScene(my);
        ManagerForEvent.init(my);
        if (changePasswordToken === undefined || changePasswordToken === "" || changePasswordToken === null) {
            my.checkFBLogin(function (result) {
                if (result) {
                    my.loginFacebookAccount();
                    //my.destroyBlinkingAnimationAndChangeStateToInitSession();
                } else {
                    my.showMainMenu();
                    //my.loginPlayPalaceAccount();
                }
            });
        }


        //my.showLoginPlayPalaceAccountUI();
        //my.showSignUpPlayPalaceAccountUI();
        //my.showResetPasswordPlayPalaceAccountUI();
    };
    /**
     * Deprecated
     */
    my.showPopupQuiteGameLoginScene = function(){

    };
    /**
     * Destroy blinking animation and start init session state
     */
    my.destroyBlinkingAnimationAndChangeStateToInitSession = function () {
        Helper4Input.Input.destroyBlinkingAnimation(my);
        my.newUnFocusAllWithOutResetValue();
        my.game.state.start(
            "InitSession",
            true, // clearWorld
            false // clearCache
        );
    };
    /**
     * Create and show main view for login
     */
    my.showMainMenu = function () {
        // 2016-09-05: Dac: login in facebook apps
        if (FacebookController.isInFBCanvas()) {
            my.loginFacebookAccount();
            return;
        }
        LobbyC.MainMenu.popupManager = my.add.group();
        var group = my.add.group();

        my.addBackgroundLogin(0, 0, 0, 0, group);

        var logo = my.add.sprite(0, 0, "state-login-logo", null, group);
        logo.anchor.x = 0.5;
        logo.x = LobbyConfig.width / 2;
        logo.y = 50;

        var or = my.add.sprite(0, 0, "state-login-or-text", null, group);
        or.anchor.x = 0.5;
        or.x = LobbyConfig.width / 2;
        or.y = 420;

        var loginFacebook = Lobby.PhaserJS.createSpriteRectangleExt(
            my,
            LobbyConfig.width / 2,
            250,
            function () {
                my.loginFacebookAccount();
            },
            function () {
            },
            function () {
            },
            group,
            LobbyConfig.isDebug,
            'state-login-login-with-fb'
        );
        loginFacebook.anchor.x = 0.5;


        var loginPP = Lobby.PhaserJS.createSpriteRectangleExt(
            my,
            LobbyConfig.width / 2.5 + 330,
            470,
            function () {
                //my.or.visible = false;
                //my.loginFacebook.visible = false;
                //my.loginPP.visible = false;
                //my.loginPPText.visible = false;
                //my.text1.visible = false;
                //my.text2.visible = false;
                group.setAll("visible", false);
                group.setAll("exists", false);
                group.destroy();
                //group.alpha = 0;
                my.showLoginPlayPalaceAccountUI();
            },
            function () {
            },
            function () {
            },
            group,
            LobbyConfig.isDebug,
            'state-login-login-with-pp'
        );

        loginPP.anchor.x = 0.5;

        var loginPPText = my.add.text(780 + 330, 535, "Login With\nPlayPalace", {
            font: "34px HelveticaNeue-Thin",
            fill: "#323232",
            align: "center"
        }, group);
        //my.text1.anchor.x = 0.5;

        loginPPText.inputEnabled = true;
        loginPPText.input.enableDrag();

        loginPPText.events.onInputDown.add(function () {
            group.setAll("visible", false);
            group.setAll("exists", false);
            group.destroy();
            my.showLoginPlayPalaceAccountUI();
        }, my);

        var loginGuest = Lobby.PhaserJS.createSpriteRectangleExt(
            my,
            LobbyConfig.width / 2.5 - 200,
            470,
            function () {
                my.loginGuestAccount();
            },
            function () {
            },
            function () {
            },
            group,
            LobbyConfig.isDebug,
            'state-login-login-with-guess'
        );
        loginGuest.anchor.x = 0.5;

        var loginGuestText = my.add.text(780 - 200, 560, "Play as guest", {
            font: "34px HelveticaNeue-Thin",
            fill: "#323232",
            align: "center"
        }, group);
        loginGuestText.inputEnabled = true;
        loginGuestText.input.enableDrag();
        loginGuestText.events.onInputDown.add(function () {
            my.loginGuestAccount();
        }, my);

        var text1 = my.add.text(LobbyConfig.width / 2, 780, "We will never post without your permission.", {
            font: "20px Helvetica-Medium",
            fill: "#323232",
            align: "center"
        }, group);
        text1.anchor.x = 0.5;

        var copyright = my.add.sprite(600, 810, 'copyright-image', null, group);
        copyright.scale.setTo(0.12);
        copyright.alpha = 0.47;

        var text2 = my.add.text(LobbyConfig.width / 2 + 5, 810, "Copyright PlayPalace. All right reserved.", {
            font: "20px Helvetica-Light",
            fill: "#323232",
            align: "center"
        }, group);
        text2.anchor.x = 0.5;

        if (!Lobby.Utils.isProduction()) {
            var versionTestText = my.add.text(100, LobbyConfig.height - 100, "Test version: " + LobbyConfig.versionDisplay, {
                font: "40px Helvetica-Light",
                fill: "#323232B6",
                align: "center"
            }, group);
        }

        Lobby.PhaserJS.scaleGroupForOptimize(group);
    };
    /**
     * login as guest account
     */
    my.loginGuestAccount = function () {
        LobbyConfig.loginFrom = "guest";
        var accPassLocal = my.loadAccPassLocal();
        if (
            Lobby.Utils.objectNotNull(accPassLocal.account)
            && Lobby.Utils.objectNotNull(accPassLocal.password)
            && accPassLocal.account !== ""
            && accPassLocal.password !== ""
        ) {
            my.loginServerLocal(accPassLocal.account, accPassLocal.password);
        } else {
            //generalAccount
            my.generalAndStoringAccountServerLocal();
        }
    };
    /**
     * load local account from local storage
     * @returns {{account: *, password: *}}
     */
    my.loadAccPassLocal = function () {
        var keyAcc = "userNameLocal";
        var keyPass = "passwordLocal";
        var account = Lobby.Utils.getFromLocalStorage(keyAcc);
        var password = Lobby.Utils.getFromLocalStorage(keyPass);
        return {account: account, password: password};
    };
    /**
     * Store local acc to local storage
     * @param acc
     * @param pass
     * @returns {{account: *, password: *}}
     */
    my.storingAccPassLocal = function (acc, pass) {
        var keyAcc = "userNameLocal";
        var keyPass = "passwordLocal";
        var account = Lobby.Utils.setToLocalStorage(keyAcc, acc);
        var password = Lobby.Utils.setToLocalStorage(keyPass, pass);
        return {account: account, password: password};
    };
    /**
     * Start login server with local acc
     * @param userNameLocal
     * @param passWordLocal
     */
    my.loginServerLocal = function (userNameLocal, passWordLocal) {
        my.createDarkLayer();
        LobbyRequest.User.loginServerPPWithLocalAccount(
            userNameLocal,
            passWordLocal,
            function (isSuccess, data, resultBean) {
                my.destroyDarkLayer();
                if (isSuccess) {
                    LobbyConfig.loginToken = data.ts_login;
                    LobbyUserData.comebackBonus = data.comeback_bonus_gift;
                    LobbyUserData.checkLoginNotFacebookAccount = data.check_loggedin_in_day;

                    my.setupDataTutorial(data);
                    my.destroyBlinkingAnimationAndChangeStateToInitSession();
                }
                else {
                    switch (resultBean.core_result_code) {
                        case LobbyConstant.RESULT_CODE_ERROR_USER_NOT_ACTIVE:
                            my.newUnFocusAllWithOutResetValue();
                            my.showErrorPopUpNew("PlayPalace Login", "User Not Active");
                            //my.showErrorPopUp("User Not Active");
                            break;
                        case LobbyConstant.RESULT_CODE_ERROR_WRONG_PASSWORD:
                        case LobbyConstant.RESULT_CODE_ERROR_WRONG_USERNAME:
                            my.newUnFocusAllWithOutResetValue();
                            //my.showErrorPopUp("Wrong password");
                            my.showErrorPopUpNew("PlayPalace Login", "Wrong username or password. \nPlease try again.");
                            break;
                        default :
                            my.newUnFocusAllWithOutResetValue();
                            //my.showErrorPopUp("Error");
                            my.showErrorPopUpNew("PlayPalace Login", "Error");
                            break;
                    }
                }
            });
    };
    /**
     * Create a guest account and login
     */
    my.generalAndStoringAccountServerLocal = function () {
        my.createDarkLayer();
        LobbyRequest.User.generateLocalAccount(
            function (isSuccess, data, resultBean) {
                if (isSuccess) {
                    var account = data.user_name;
                    var password = data.info;
                    my.storingAccPassLocal(account, password);
                    my.loginServerLocal(account, password);
                }
                else {
                    my.destroyDarkLayer();
                    switch (resultBean.core_result_code) {
                        case LobbyConstant.RESULT_CODE_ERROR_USER_NOT_ACTIVE:
                            my.newUnFocusAllWithOutResetValue();
                            my.showErrorPopUpNew("PlayPalace Login", "User Not Active");
                            //my.showErrorPopUp("User Not Active");
                            break;
                        case LobbyConstant.RESULT_CODE_ERROR_WRONG_PASSWORD:
                        case LobbyConstant.RESULT_CODE_ERROR_WRONG_USERNAME:
                            my.newUnFocusAllWithOutResetValue();
                            //my.showErrorPopUp("Wrong password");
                            my.showErrorPopUpNew("PlayPalace Login", "Wrong username or password. \nPlease try again.");
                            break;
                        default :
                            my.newUnFocusAllWithOutResetValue();
                            //my.showErrorPopUp("Error");
                            my.showErrorPopUpNew("PlayPalace Login", "Error");
                            break;
                    }
                }
            });
    };
    /* ------------------------------------------- Login Facebook Account ------------------------------------------- */
    /**
     * Login using facebook acount
     */
    my.loginFacebookAccount = function () {
        //LobbyRequest.User.logout(function (isSuccess, data) {
        //});
        my.initFacebook(function () {
            LobbyConfig.isFb = true;
            LobbyConfig.loginFrom = "fb";
            my.destroyBlinkingAnimationAndChangeStateToInitSession();
        });
    };
    /* ------------------------------------------- Login Facebook Account ------------------------------------------- */

    /* ------------------------------------------------ Login Web UI ------------------------------------------------ */
    /**
     * Login using play palace account
     * @param email
     * @param password
     */
    my.loginPlayPalaceAccount = function (email, password) {
        //LobbyRequest.User.logout(function (isSuccess, data) {
        //});
        if (my.isShowingErrorPopup) {
            return;
        }
        LobbyConfig.isFb = false;
        LobbyConfig.loginFrom = LobbyConstant.LoginFrom.playpalace;
        var emailAccount = email;
        var passwordAccount = password;

        // debug
        //var emailAccount = "duyle@gmail.com";
        //var passwordAccount = "duyle123";
        //var emailAccount = "tuynu@gmail.com";
        //var passwordAccount = "111111111";
        //var emailAccount = "dat@gmail.com";
        //var passwordAccount = "111111111";
        //emailAccount = "kiet@gmail.com";
        //passwordAccount = "12345678";


        if (emailAccount === ""
            || emailAccount === " ") {
            my.newUnFocusAllWithOutResetValue();
            my.showErrorPopUpNew("PlayPalace Login", "Please enter your email");
            return;
        }

        if (passwordAccount === "") {
            my.newUnFocusAllWithOutResetValue();
            my.showErrorPopUpNew("PlayPalace Login", "Please enter your password");
            return;
        }

        if (!Lobby.Utils.validateEmail(emailAccount)) {
            //my.showErrorPopUp("Wrong email");
            my.newUnFocusAllWithOutResetValue();
            my.showErrorPopUpNew("PlayPalace Login", "Invalid Email");
            //location.href = "";
            return;
        }

        my.createDarkLayer();
        LobbyRequest.User.loginPlayPalaceAccount(
            emailAccount,
            passwordAccount,
            function (isSuccess, data, resultBean) {
                my.destroyDarkLayer();
                if (isSuccess) {
                    Lobby.Utils.setToLocalStorage("userName", data.user_name);
                    LobbyConfig.loginToken = data.ts_login;
                    LobbyUserData.comebackBonus = data.comeback_bonus_gift;
                    LobbyUserData.checkLoginNotFacebookAccount = data.check_loggedin_in_day;

                    my.destroyBlinkingAnimationAndChangeStateToInitSession();
                }
                else {
                    switch (resultBean.core_result_code) {
                        case LobbyConstant.RESULT_CODE_ERROR_USER_NOT_ACTIVE:
                            my.newUnFocusAllWithOutResetValue();
                            my.showErrorPopUpNew("PlayPalace Login", "User Not Active");
                            //my.showErrorPopUp("User Not Active");
                            break;
                        case LobbyConstant.RESULT_CODE_ERROR_WRONG_PASSWORD:
                        case LobbyConstant.RESULT_CODE_ERROR_WRONG_USERNAME:
                            my.newUnFocusAllWithOutResetValue();
                            //my.showErrorPopUp("Wrong password");
                            my.showErrorPopUpNew("PlayPalace Login", "Wrong username or password. \nPlease try again.");
                            break;
                        default :
                            my.newUnFocusAllWithOutResetValue();
                            //my.showErrorPopUp("Error");
                            my.showErrorPopUpNew("PlayPalace Login", "Error");
                            break;
                    }
                }
            });
    };
    /**
     * Create and show view login for play palace
     * @param isFromSignUp deprecated
     */
    my.showLoginPlayPalaceAccountUI = function (isFromSignUp) {
        if (Lobby.Utils.objectIsNull(isFromSignUp)) isFromSignUp = false;
        //var emailAccountDiv = $('#email-account');

        my.accPassInfo = {
            acc: "",
            pass: "",
            passRetype: ""
        };
        var group = my.add.group();

        my.addBackgroundLogin(0, 0, 0, 0, group);

        var logo = my.add.sprite(0, 0, "state-login-logo", null, group);
        logo.anchor.x = 0.5;
        logo.x = LobbyConfig.width / 2;
        logo.y = 50;

        var loginText = my.add.text(LobbyConfig.width / 2, 250, "LOGIN", {
            font: "53px Helvetica-Light",
            fill: "#323232B6",
            align: "center"
        }, group);
        loginText.anchor.x = 0.5;


        var emailText = my.add.text(LobbyConfig.width / 4, 400, "Email", {
            font: "33px Helvetica-Light",
            fill: "#323232",
            align: "left"
        }, group);

        var passText = my.add.text(LobbyConfig.width / 4, 480, "Password", {
            font: "33px Helvetica-Light",
            fill: "#323232",
            align: "left"
        }, group);


        var loginBtn = Lobby.PhaserJS.createSpriteRectangleExt(
            my,
            LobbyConfig.width / 2,
            570,
            function () {
                my.loginPlayPalaceAccount(emailAccountText.text, my.accPassInfo.pass);
            },
            function () {
            },
            function () {
            },
            group,
            LobbyConfig.isDebug,
            'state-login-login'
        );
        loginBtn.anchor.x = 0.5;

        var loginBtnText = my.add.text(LobbyConfig.width / 2, 588, "Login", {
            font: "31px Helvetica-Light",
            fill: "#323232",
            align: "center"
        }, group);
        loginBtnText.anchor.x = 0.5;

        var createNewText = my.add.text(LobbyConfig.width / 2, 700, "Create new account", {
            font: "32px Helvetica-Light",
            fill: "#323232",
            align: "center"
        }, group);
        createNewText.anchor.x = 0.5;


        var forgetPassText = my.add.text(LobbyConfig.width / 2, 770, "Forgot your password?", {
            font: "32px Helvetica-Light",
            fill: "#323232",
            align: "center"
        }, group);
        forgetPassText.anchor.x = 0.5;

        var isSkipFirstSyncValue = false;
        //
        var lastLoginUserName = Lobby.Utils.getFromLocalStorage("userName");
        if (Lobby.Utils.objectIsNull(lastLoginUserName)) {
            lastLoginUserName = "";
        }
        var emailAccountText = my.add.text(
            LobbyConfig.width / 2.5,
            396,
            lastLoginUserName,
            {
                font: "35px Helvetica-Medium",
                fill: "#000000",
                wordWrap: true,
                align: "left",
                wordWrapWidth: 1090
            },
            group
        );
        var passwordAccountText = my.add.text(
            LobbyConfig.width / 2.5,
            476,
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

        var emailInputRegion = Lobby.PhaserJS.createInputRegion(
            my,
            emailAccountText.x - 50,
            emailAccountText.y - 50,
            750,
            emailAccountText.height + 50,
            function () {
                Helper4Input.Input.createGroupInputText(false,
                    function (textFromCallBack) {
                        emailAccountText.text = textFromCallBack;
                        my.accPassInfo.acc = textFromCallBack;
                    }, my);
            },
            function () {
            },
            function () {
            }, group, LobbyConfig.isDebug
        );


        var passwordInputRegion = Lobby.PhaserJS.createInputRegion(
            my,
            passwordAccountText.x - 50,
            passwordAccountText.y - 20,
            750,
            passwordAccountText.height + 50,
            function () {
                Helper4Input.Input.createGroupInputText(true,
                    function (textFromCallBack) {
                        passwordAccountText.text = textFromCallBack;
                        my.accPassInfo.pass = $('#input-field').val();
                    }, my);
            },
            function () {
            },
            function () {
            }, group, LobbyConfig.isDebug
        );


        var line1 = my.add.graphics(0, 0);
        line1.lineStyle(1, 0x000000, 1);
        line1.beginFill();
        line1.moveTo(400, 450);
        line1.lineTo(1300, 450);
        line1.endFill();
        //line1.scale.setTo(LobbyConfig.scaleRatioEntireGame);
        Lobby.PhaserJS.scaleGroupForOptimize(line1, true);

        var line2 = my.add.graphics(0, 0);
        line2.lineStyle(1, 0x000000, 1);
        line2.beginFill();
        line2.moveTo(400, 527);
        line2.lineTo(1300, 527);
        line2.endFill();
        //line2.scale.setTo(LobbyConfig.scaleRatioEntireGame);
        Lobby.PhaserJS.scaleGroupForOptimize(line2, true);
        var backBtnToMainLogin = Lobby.PhaserJS.createSpriteRectangleWithBiggerTouchZone(
            my,
            50,
            40,
            function () {
                //group.alpha = 0;
                group.setAll("visible", false);
                group.setAll("exists", false);
                group.destroy();
                my.showMainMenu();
            },
            group,
            LobbyConfig.isDebug,
            'state-login-back',
            null,
            {x: 0.5, y: 0},
            {x: 4, y: 4}
        );
        backBtnToMainLogin.y -= ManagerForScale.incrementHeight();
        //my.backBtnToMainLogin.anchor.x = 0.5;

        createNewText.inputEnabled = true;
        createNewText.input.useHandCursor = true;

        forgetPassText.inputEnabled = true;
        forgetPassText.input.useHandCursor = true;

        createNewText.events.onInputDown.add(function () {
            group.setAll("visible", false);
            group.setAll("exists", false);
            group.destroy();
            my.showSignUpPlayPalaceAccountUI();
        }, my);

        forgetPassText.events.onInputDown.add(function () {
            group.setAll("visible", false);
            group.setAll("exists", false);
            group.destroy();
            my.showResetPasswordPlayPalaceAccountUI();
        }, my);


        Lobby.PhaserJS.scaleGroupForOptimize(group);

    };
    /* ------------------------------------------------ Login Web UI ------------------------------------------------ */

    /* ----------------------------------------------- Sign Up Web UI ----------------------------------------------- */
    /**
     * Sign up with play palace account, check and show popup
     * @param email
     * @param password
     * @param passwordRetype
     */
    my.signUpPlayPalaceAccount = function (email, password, passwordRetype) {
        if (my.isShowingErrorPopup) {
            return;
        }

        var emailAccount = email;
        var passwordAccount = password;
        var rePasswordAccount = passwordRetype;

        if (emailAccount == "") {
            my.newUnFocusAllWithOutResetValue();
            my.showErrorPopUpNew("PlayPalace SignUp", "Please Enter your email address");
            return;
        }

        if (passwordAccount == "") {
            my.newUnFocusAllWithOutResetValue();
            my.showErrorPopUpNew("PlayPalace SignUp", "Please Enter your password");
            return;
        }

        if (rePasswordAccount == "") {
            my.newUnFocusAllWithOutResetValue();
            my.showErrorPopUpNew("PlayPalace SignUp", "Please Enter your retype password");
            return;
        }

        if (!Lobby.Utils.validateEmail(emailAccount)) {
            //my.showErrorPopUp("Wrong email...");
            my.newUnFocusAllWithOutResetValue();
            my.showErrorPopUpNew("PlayPalace SignUp", "Invalid Email");
            return;
        }

        if (passwordAccount != rePasswordAccount) {
            //my.showErrorPopUp("Please input same password....");
            my.newUnFocusAllWithOutResetValue();
            my.showErrorPopUpNew("PlayPalace SignUp", "Password does not match.");
            return;
        }

        my.createDarkLayer();
        LobbyRequest.User.signUpPlayPalaceAccount(
            emailAccount,
            passwordAccount,
            function (isSuccess, data, beanResult) {
                my.destroyDarkLayer();
                if (isSuccess) {
                    my.newUnFocusAll();
                    my.showErrorPopUpNew("Sign Up Successful!", "Congratulation!", null, function () {
                        my.showLoginPlayPalaceAccountUI(true);
                    });
                    return;
                }
                switch (beanResult.core_result_code) {
                    case LobbyConstant.RESULT_CODE_USER_EXIST:
                        my.newUnFocusAllWithOutResetValue();
                        my.showErrorPopUpNew("PlayPalace SignUp", "Username already exists");
                        break;
                    case LobbyConstant.RESULT_CODE_PASSWORD_POLICY_ERROR:
                        my.newUnFocusAllWithOutResetValue();
                        my.showErrorPopUpNew("PlayPalace SignUp", "Password length must be\nat least 8 characters");
                        break;
                    default :
                        //my.showErrorPopUp("Error");
                        my.newUnFocusAllWithOutResetValue();
                        my.showErrorPopUpNew("PlayPalace SignUp", "Error");
                        break;
                }
            });
    };
    /**
     * Create and show sign up view
     */
    my.showSignUpPlayPalaceAccountUI = function () {
        //var intervalFocus, intervalBlinking;
        my.accPassInfo = {
            acc: "",
            pass: "",
            passRetype: ""
        };
        my.newUnFocusAll();
        var group = my.add.group();

        my.addBackgroundLogin(0, 0, 0, 0, group);

        var logo = my.add.sprite(0, 0, "state-login-logo", null, group);
        logo.anchor.x = 0.5;
        logo.x = LobbyConfig.width / 2;
        logo.y = 50;

        var signupText = my.add.text(LobbyConfig.width / 2, 250, "SIGN UP", {
            font: "54px Helvetica-Light",
            fill: "#323232",
            align: "center"
        }, group);
        signupText.anchor.x = 0.5;


        var emailText = my.add.text(LobbyConfig.width / 4, 400, "Email",
            {
                font: "29px Helvetica-Light",
                fill: "#323232",
                align: "left"
            }, group);

        var passText = my.add.text(LobbyConfig.width / 4, 470, "Password", {
            font: "29px Helvetica-Light",
            fill: "#323232",
            align: "left"
        }, group);

        var retypePassText = my.add.text(LobbyConfig.width / 4, 540, "Retype password",
            {
                font: "29px Helvetica-Light",
                fill: "#323232",
                align: "left"
            }, group);


        var signupBtn = Lobby.PhaserJS.createSpriteRectangleExt(
            my,
            LobbyConfig.width / 2,
            630,
            function () {
                my.signUpPlayPalaceAccount(my.accPassInfo.acc, my.accPassInfo.pass, my.accPassInfo.passRetype);
            },
            function () {
            },
            function () {
            },
            group,
            LobbyConfig.isDebug,
            'state-login-login'
        );
        signupBtn.anchor.x = 0.5;

        var signupBtnText = my.add.text(LobbyConfig.width / 2 - 5, 650, "Sign up", {
            font: "32px Helvetica-Light",
            fill: "#000000",
            align: "center"
        }, group);
        signupBtnText.anchor.x = 0.5;

        var emailAccountText = my.add.text(
            LobbyConfig.width / 2.4,
            395,
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

        var passwordAccountText = my.add.text(
            LobbyConfig.width / 2.4,
            475,
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

        var rePasswordAccountText = my.add.text(
            LobbyConfig.width / 2.4,
            545,
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


        var emailInputRegion = Lobby.PhaserJS.createInputRegion(
            my,
            emailAccountText.x,
            emailAccountText.y - 50,
            750,
            emailAccountText.height + 50,
            function () {
                Helper4Input.Input.createGroupInputText(false,
                    function (textFromCallBack) {
                        emailAccountText.text = textFromCallBack;
                        my.accPassInfo.acc = textFromCallBack;
                    }, my);
            },
            function () {
            },
            function () {
            }, group, LobbyConfig.isDebug
        );

        var passwordInputRegion = Lobby.PhaserJS.createInputRegion(
            my,
            passwordAccountText.x,
            passwordAccountText.y - 30,
            750,
            passwordAccountText.height + 30,
            function () {
                Helper4Input.Input.createGroupInputText(true,
                    function (textFromCallBack) {
                        passwordAccountText.text = textFromCallBack;
                        my.accPassInfo.pass = $('#input-field').val();
                    }, my);
            },
            function () {
            },
            function () {
            }, group, LobbyConfig.isDebug
        );

        var rePasswordInputRegion = Lobby.PhaserJS.createInputRegion(
            my,
            rePasswordAccountText.x,
            rePasswordAccountText.y - 20,
            750,
            rePasswordAccountText.height + 50,
            function () {
                Helper4Input.Input.createGroupInputText(true,
                    function (textFromCallBack) {
                        rePasswordAccountText.text = textFromCallBack;
                        my.accPassInfo.passRetype = $('#input-field').val();
                    }, my);
            },
            function () {
            },
            function () {
            }, group, LobbyConfig.isDebug
        );

        var line1 = my.add.graphics(0, 0);
        line1.lineStyle(1, 0x000000, 1);
        line1.moveTo(400, 444);
        line1.lineTo(1300, 444);
        line1.endFill();
        //line1.moveTo(400, 514);
        //line1.lineTo(1300, 514);
        //line1.endFill();
        //line1.moveTo(400, 584);
        //line1.lineTo(1300, 584);
        //line1.endFill();
        //line1.scale.setTo(LobbyConfig.scaleRatioEntireGame);
        Lobby.PhaserJS.scaleGroupForOptimize(line1, true);
        var line2 = my.add.graphics(0, 0);
        line2.lineStyle(1, 0x000000, 1);
        line2.beginFill();
        line2.moveTo(400, 515);
        line2.lineTo(1300, 515);
        line2.endFill();
        //line2.scale.setTo(LobbyConfig.scaleRatioEntireGame);
        Lobby.PhaserJS.scaleGroupForOptimize(line2, true);

        var line3 = my.add.graphics(0, 0);
        line3.lineStyle(1, 0x000000, 1);
        line3.beginFill();
        line3.moveTo(400, 584);
        line3.lineTo(1300, 584);
        line3.endFill();
        //line3.scale.setTo(LobbyConfig.scaleRatioEntireGame);
        Lobby.PhaserJS.scaleGroupForOptimize(line3, true);

        var backBtnToLoginPlayPalaceWeb = Lobby.PhaserJS.createSpriteRectangleWithBiggerTouchZone(
            my,
            50,
            40,
            function () {
                //group.alpha = 0;
                group.setAll("visible", false);
                group.setAll("exists", false);
                group.destroy();
                my.showLoginPlayPalaceAccountUI();
            },
            group,
            LobbyConfig.isDebug,
            'state-login-back',
            null,
            {x: 0.5, y: 0},
            {x: 4, y: 4}
        );
        backBtnToLoginPlayPalaceWeb.y -= ManagerForScale.incrementHeight();
        Lobby.PhaserJS.scaleGroupForOptimize(group);
    };
    /* ----------------------------------------------- Sign Up Web UI ----------------------------------------------- */

    /* --------------------------------------------- Reset password UI --------------------------------------------- */
    /**
     * Send request reset password for playpalace
     * @param emailAddress of account need to reset
     */
    my.sendRequestResetPasswordPlayPalaceAccount = function (emailAddress) {
        if (my.isShowingErrorPopup) {
            return;
        }
        if (emailAddress == "") {
            my.newUnFocusAllWithOutResetValue();
            my.showErrorPopUpNew("PlayPalace Reset Password", "Please Enter your email address");
            return;
        }
        var emailAccount = emailAddress;
        if (!Lobby.Utils.validateEmail(emailAccount)) {
            //my.showErrorPopUp("Wrong email...");
            my.newUnFocusAllWithOutResetValue();
            my.showErrorPopUpNew("PlayPalace Reset Password", "Invalid Email");
            return;
        }

        var postData = {
            username: emailAccount
        };
        my.createDarkLayer();
        Lobby.Network.post(
            LobbyConfig.webServiceFullUrl + "/user/requestResetPassword",
            postData,
            function (isSuccess, data) {
                my.destroyDarkLayer();
                if (isSuccess) {
                    //my.showErrorPopUp("An email has been sent to " + emailAccount + " with further instructions.");
                    my.newUnFocusAll();

                    my.showErrorPopUpNew("PlayPalace ResetPassword", "An email has been sent to \n" + emailAccount + "\n with further instructions.", "28px", function () {
                        my.showLoginPlayPalaceAccountUI();
                    });

                    return;
                }
                switch (data.core_result_code) {
                    case LobbyConstant.RESULT_CODE_ERROR_WRONG_PASSWORD:
                        //my.showErrorPopUp("User is NOT existed!");
                        my.newUnFocusAllWithOutResetValue();
                        my.showErrorPopUpNew("PlayPalace ResetPassword", "User is NOT existed!");
                        break;
                    case -1200:
                        //my.showErrorPopUp("Server maintenance for a few minutes. Please check back later ...");
                        my.newUnFocusAllWithOutResetValue();
                        my.showErrorPopUpNew("PlayPalace ResetPassword", "Server maintenance for a few minutes. Please check back later ...");
                        break;
                    default:
                        //my.showErrorPopUp("Error occurred!");
                        my.newUnFocusAllWithOutResetValue();
                        my.showErrorPopUpNew("PlayPalace ResetPassword", "Error occurred!");
                        break;
                }
            });
    };
    /**
     * Create and show UI for reset password play palace
     */
    my.showResetPasswordPlayPalaceAccountUI = function () {
        //var intervalFocus, intervalBlinking;
        my.accPassInfo = {
            acc: "",
            pass: "",
            passRetype: ""
        };
        my.newUnFocusAll();
        var group = my.add.group();

        my.addBackgroundLogin(0, 0, 0, 0, group);

        var logo = my.add.sprite(0, 0, "state-login-logo", null, group);
        logo.anchor.x = 0.5;
        logo.x = LobbyConfig.width / 2;
        logo.y = 50;

        var resetPassText = my.add.text(LobbyConfig.width / 2, 250, "RESET PASSWORD", {
            font: "52px Helvetica-Medium",
            fill: "#323232",
            align: "center"
        }, group);
        resetPassText.anchor.x = 0.5;


        var emailText = my.add.text(LobbyConfig.width / 4 + 30, 400, "Email address",
            {
                font: "32px Helvetica-Medium",
                fill: "#323232",
                align: "left"
            }, group);

        var resetBtn = Lobby.PhaserJS.createSpriteRectangleExt(
            my,
            LobbyConfig.width / 2,
            500,
            function () {
                my.sendRequestResetPasswordPlayPalaceAccount(emailAccountText.text);
            },
            function () {
            },
            function () {
            },
            group,
            LobbyConfig.isDebug,
            'state-login-login'
        );
        resetBtn.anchor.x = 0.5;


        var resetBtnText = my.add.text(LobbyConfig.width / 2, 510, "Submit", {
            font: "45px Helvetica-Medium",
            fill: "#323232",
            align: "center"
        }, group);
        resetBtnText.anchor.x = 0.5;

        var line1 = my.add.graphics(0, 0);
        line1.lineStyle(1, 0x000000, 1);
        line1.moveTo(430, 443);
        line1.lineTo(1300, 443);
        line1.endFill();
        //line1.scale.setTo(LobbyConfig.scaleRatioEntireGame);
        Lobby.PhaserJS.scaleGroupForOptimize(line1, true);

        var backBtnToLoginPlayPalaceWeb = Lobby.PhaserJS.createSpriteRectangleWithBiggerTouchZone(
            my,
            50,
            40,
            function () {
                //my.signupText.visible = true;
                //my.emailText.visible = true;
                //my.passText.visible = true;
                //my.retypePassText.visible = true;
                //group.alpha = 0;
                group.setAll("visible", false);
                group.setAll("exists", false);
                group.destroy();
                my.showLoginPlayPalaceAccountUI();
            },
            group,
            LobbyConfig.isDebug,
            'state-login-back',
            null,
            {x: 0.5, y: 0},
            {x: 4, y: 4}
        );
        backBtnToLoginPlayPalaceWeb.y -= ManagerForScale.incrementHeight();
        var emailAccountText = my.add.text(
            LobbyConfig.width / 2.3,
            400,
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

        var emailInputRegion = Lobby.PhaserJS.createInputRegion(
            my,
            emailAccountText.x - 30,
            emailAccountText.y - 50,
            800,
            emailAccountText.height + 80,
            function () {
                Helper4Input.Input.createGroupInputText(false,
                    function (textFromCallBack) {
                        emailAccountText.text = textFromCallBack;
                    }, my);
            },
            function () {
            },
            function () {
            }, group, LobbyConfig.isDebug
        );


        Lobby.PhaserJS.scaleGroupForOptimize(group);
    };
    /* --------------------------------------------- Reset password UI --------------------------------------------- */

    /* ------------------------------------------- Change Password Web UI ------------------------------------------- */
    /**
     * Change password for play palace account. Deprecated
     */
    my.changePasswordPlayPalaceAccount = function () {
        if (my.isShowingErrorPopup) {
            return;
        }

        var passwordAccount = $('#password-account-change').val();
        var rePasswordAccount = $('#re-password-account-change').val();

        if (passwordAccount != rePasswordAccount) {
            my.showErrorPopUp("Please input same password....");
            return;
        }
        //if (!Lobby.Utils.validateEmail(emailAccount)) {
        //    my.showErrorPopUp("Wrong email");
        //    //location.href = "";
        //    return;
        //}

        var postData = {
            token: Lobby.Utils.getParameterFromCurrentURL("token"),
            newPassword: passwordAccount
        };
        my.createDarkLayer();
        Lobby.Network.post(
            LobbyConfig.webServiceFullUrl + "/user/resetPassword",
            postData,
            function (isSuccess, data) {
                my.destroyDarkLayer();
                if (isSuccess) {
                    my.showErrorPopUp("Your password has been reset! Auto redirect after 3 seconds ...");
                    my.time.events.add(3000,
                        function () {
                            //location.href = LobbyConfig.webGameVersionFullUrl;
                            my.redirectToLobby();
                        }, this);
                    $('#btn-alert').on('click', function () {
                        //location.href = LobbyConfig.webGameVersionFullUrl;
                        my.redirectToLobby();
                    });

                } else {
                    switch (data.core_result_code) {
                        case -5000:
                            my.showErrorPopUp("Password needs at least 8 characters!");
                            break;
                        default:
                            my.showErrorPopUp("Error occured!");
                            break;
                    }
                }
            });

    };
    /**
     * Redirect to lobby, deprecated
     */
    my.redirectToLobby = function () {
        var browser = Lobby.Utils.getBrowserName();

        if (browser == "Explorer" || browser == "Opera") {
            location.href = LobbyConfig.webGameVersionFullUrl;
        }
        else location.href = LobbyConfig.webGameVersionFullUrlUnity;
    };

    /* ------------------------------------------- Change Password Web UI ------------------------------------------- */

    /* --------------------------------------------- Blinking Animation --------------------------------------------- */
    /**
     * Check for fb login
     * @param callback when completed
     */
    my.checkFBLogin = function (callback) {
        //if (window.location.protocol !== 'https:') {
        //    if (LobbyConfig.usingSSL) {
        //        window.location = 'https://' + window.location.hostname + window.location.pathname + window.location.hash;
        //    }
        //}
        if (!String.prototype.startsWith) {
            String.prototype.startsWith = function (searchString, position) {
                position = position || 0;
                return this.indexOf(searchString, position) === position;
            };
        }

        FacebookController.checkPreviousLoginFacebook(
            function (response, accessToken) {

                if (response != null) {

                    //LobbyConfig.loginFrom = "fb";
                    callback(true);
                }
                else {
                    LobbyConfig.loginFrom = "web";
                    callback(false);
                }
            },
            function (error) {
                LobbyConfig.loginFrom = "web";
                callback(false);

            }
        );
    };
    //
    /**
     * Deprecated
     * @param message
     */
    my.showErrorPopUp = function (message) {
        //alert(message);
    };
    /**
     * Show error popup for login
     * @param title title of popup
     * @param body message of popup
     * @param messageFontSize size of text
     * @param callback callback when click ok
     * @param haveCancelButton is create cancel button
     * @param callBackCancel callback when click cancel
     */
    my.showErrorPopUpNew = function (title, body, messageFontSize, callback, haveCancelButton, callBackCancel) {
        if (my.isShowingErrorPopup) {
            //my.destroyDarkLayer();
            return;
        }
        my.isShowingErrorPopup = true;
        my.createDarkLayer();
        var group = my.add.group();
        group.add(my.darklayer);

        var background = my.addBackgroundLogin(500, 400, 600, 300, group, false);

        var textStyle = {
            font: "33px Helvetica-Light",
            fill: "#000000",
            align: "center"
            //wordWrap: true,
            //wordWrapWidth: 900
        };
        //bodyTag
        //var key1 = my.input.keyboard.addKey(Phaser.Keyboard.ENTER);
        //
        //key1.onUp.add(function(){
        //    if(my.isShowingErrorPopup == true){
        //        my.destroyDarkLayer();
        //        group.destroy();
        //        //
        //        if (Lobby.Utils.objectNotNull(callback)) {
        //            callback();
        //        }
        //        my.isShowingErrorPopup = false;
        //        key1.reset(true);
        //    }
        //}, this);
        //key1.onUpCallback = function(){
        //    key1.enabled = false;
        //    key1.destroy();
        //};
        //$('#bodyTag').keyup(function(e){
        //    switch (e.which)
        //    {
        //        //enter key
        //        case 13:
        //            my.destroyDarkLayer();
        //            group.destroy();
        //            if (Lobby.Utils.objectNotNull(callback)) {
        //                callback();
        //            }
        //            my.isShowingErrorPopup = false;
        //            break;
        //    }
        //});

        if (title == undefined) {
            title = "Error";
        }
        if (body == undefined) {
            body = "Something went wrong. Please try again later";
        }
        var textTitle = my.add.text(
            0,
            430,
            title,
            textStyle,
            group
        );

        var line1 = my.add.graphics(0, 0);
        line1.lineStyle(1, 0x000000, 1);
        line1.moveTo(600, 480);
        line1.lineTo(1000, 480);
        line1.endFill();
        group.add(line1);

        if (Lobby.Utils.objectNotNull(messageFontSize)) {
            textStyle = {
                font: messageFontSize + " Helvetica-Light",
                fill: "#000000",
                align: "center"
                //wordWrap: true,
                //wordWrapWidth: 900
            }
        }

        Lobby.PhaserJS.centerX(textTitle, LobbyConfig.width);
        var textMessage = my.add.text(
            500,
            500,
            body,
            textStyle,
            group
        );


        var btnOk = Lobby.PhaserJS.createSpriteRectangleExt(
            my,
            500,
            610,
            function () {
                my.destroyDarkLayer();
                group.destroy();
                if (Lobby.Utils.objectNotNull(callback)) {
                    callback();
                }
                my.isShowingErrorPopup = false;
            },
            function () {
            },
            function () {
            },
            group,
            LobbyConfig.isDebug,
            'state-login-login'
        );
        btnOk.anchor.x = 0.5;
        group.add(btnOk);

        var btnOkText = my.add.text(0, btnOk.position.y + 20, "OK", {
            font: "31px Helvetica-Light",
            fill: "#323232",
            align: "center"
        }, group);
        btnOkText.anchor.x = 0.5;
        group.add(btnOkText);

        Lobby.PhaserJS.centerX(btnOk, LobbyConfig.width);
        Lobby.PhaserJS.centerX(btnOkText, LobbyConfig.width);
        Lobby.PhaserJS.centerX(textMessage, LobbyConfig.width);

        if(haveCancelButton == true){
            var btnCancel = Lobby.PhaserJS.createSpriteRectangleExt(
                my,
                500,
                610,
                function () {
                    my.destroyDarkLayer();
                    group.destroy();
                    if(Lobby.Utils.objectNotNull(callBackCancel))
                        callBackCancel();
                    my.isShowingErrorPopup = false;
                },
                function () {
                },
                function () {
                },
                group,
                LobbyConfig.isDebug,
                'state-login-login'
            );
            btnCancel.anchor.x = 0.5;
            group.add(btnCancel);

            var btnCancelText = my.add.text(0, btnCancel.position.y + 20, "CANCEL", {
                font: "31px Helvetica-Light",
                fill: "#323232",
                align: "center"
            }, group);
            btnCancelText.anchor.x = 0.5;
            group.add(btnCancelText);

            Lobby.PhaserJS.centerX(btnCancel, LobbyConfig.width);
            Lobby.PhaserJS.centerX(btnCancelText, LobbyConfig.width);

            btnOk.x -= 140;
            btnOkText.x -= 140;

            btnCancel.x += 140;
            btnCancelText.x += 140;
        }


        group.y = (LobbyConfig.height - group.height) / 2;
        //Lobby.PhaserJS.centerWorld(group);
        Lobby.PhaserJS.scaleGroupForOptimize(group, true);
        if (ManagerForScale.is3x4resolution()) {
            group.y += ManagerForScale.doubleIncrementHeight();
        }

    };


    //my.showErrorPopUpNew = function (title, body, funcCallback) {
    //    my.showNotificationPopup("Purchase keys successful", "");
    //    //alert(message);
    //    //var group = my.add.group();
    //    ////var background = my.add.sprite(LobbyConfig.width / 2, LobbyConfig.height / 2, 'state-login-background');
    //    ////group.add(background);
    //    ////
    //    ////group.stage._backgroundColor = "#4488AA";
    //    //var rectangle = my.add.graphics(LobbyConfig.width / 2, LobbyConfig.height / 2, group);
    //    //rectangle.beginFill(0x000000);
    //    //rectangle.fillAlpha = 1;
    //    //if (!LobbyConfig.isDebug) {
    //    //    rectangle.fillAlpha = 0;
    //    //}
    //    //rectangle.drawRect(0, 0, 200, 200);
    //    //
    //    ////var background = my.createRectangleWithColor(my,200,200,200,200,0x000000,group, LobbyConfig.isDebug);
    //    //group.add(rectangle);
    //    ////group.position = {
    //    ////    x: LobbyConfig.width / 2,
    //    ////    y: LobbyConfig.height / 2
    //    ////};
    //    //var textStyle = {
    //    //    font: "32px Helvetica-Light",
    //    //    fill: "#323232",
    //    //    align: "center"
    //    //};
    //    //
    //    //if (title == undefined) {
    //    //    title = "Error";
    //    //}
    //    //if (body == undefined) {
    //    //    body = "Something went wrong. Please try again later";
    //    //}
    //    //var textTitle = my.add.text(
    //    //    0,
    //    //    40,
    //    //    title,
    //    //    textStyle,
    //    //    group
    //    //);
    //    //Lobby.PhaserJS.centerX(textTitle, group.width);
    //    //var textMessage = my.add.text(
    //    //    0,
    //    //    0,
    //    //    body,
    //    //    textStyle,
    //    //    group
    //    //);
    //    //group.alpha = 0;
    //    //var tween =  my.add.tween(group).to( { alpha: 1 }, 1000, Phaser.Easing.Quintic.Out, true);
    //    //tween.onComplete.add(function (){
    //    //        my.add.tween(group).to( { alpha: 1 }, 2000, Phaser.Easing.Quintic.Out, true);
    //    //    }
    //    //  , my);
    //    //my.openPopupWithAnimateUpNew(group);
    //};

    /**
     * Create dark layer for login
     */
    my.createDarkLayer = function () {
        if (my.darklayer == null) {
            my.darklayer = my.add.sprite(0, 0, "popup-dark-layer-login-state");
            my.darklayer.alpha = 0.65;
            my.darklayer.inputEnabled = true;
            my.darklayer.scale.setTo(ManagerForScale.getScale());
            if (Lobby.Utils.is3x4Device()) {
                my.darklayer.y -= 100;
            }
            my.darklayer.events.onInputDown.add(function () {
                //Lobby.Utils.printConsoleLog("Dark layer event input down");
                //if (Lobby.Utils.objectNotNull(isClose)) {
                //    if (Lobby.Utils.objectNotNull(my.globalBannerSlotPopup)) {
                //        my.closePopupWithAnimateDownNew(my.globalBannerSlotPopup);
                //        my.globalBannerSlotPopup = null;
                //    }
                //    else {
                //        my.closePopupWithAnimateDownNew(my.globalTmpPopup);
                //    }
                //}
            }, this);
        }
    };
    /**
     * Destroy dark layer for login
     */
    my.destroyDarkLayer = function () {
        if (my.darklayer != null) {
            my.darklayer.destroy();
            my.darklayer = null;
        }
    };

    /**
     * Stop focus to all input text
     */
    my.newUnFocusAll = function () {
        $('#input-field').blur();
        my.unFocusUI();

        $('#input-field').val("");
    };
    /**
     * Stop focus to all input text with out reset value
     */
    my.newUnFocusAllWithOutResetValue = function () {

        $('#input-field').blur();
        my.unFocusUI();
    };
    /**
     * Stop focus to ui
     */
    my.unFocusUI = function () {
        Helper4Input.Input.destroyBlinkingAnimation(my);
        my.focusAndSync = function () {
        };
    };
    /**
     * Setup tutorial data
     * @param data data from server
     */
    my.setupDataTutorial = function (data) {
        var isFirstLogin = false;
        if(!LobbyConfig.isTestAlgorithmMode) {
            LobbyUserData.dataTutorial.name = data.name;
            LobbyUserData.dataTutorial.isCanPlayTutorial = data.allow_play_tutorial;
            LobbyUserData.dataTutorial.isCanGetPreRewardTutorial = data.allow_get_pre_tutorial_reward;
            LobbyUserData.dataTutorial.isCanSpinTutorial = data.allow_get_tutorial_spin_reward;
            isFirstLogin = data.first_login;
        }
        //LobbyUserData.dataTutorial.name = data.name;
        //LobbyUserData.dataTutorial.isCanPlayTutorial = data.allow_play_tutorial;
        //LobbyUserData.dataTutorial.isCanGetPreRewardTutorial = data.allow_get_pre_tutorial_reward;
        //LobbyUserData.dataTutorial.isCanSpinTutorial = data.allow_get_tutorial_spin_reward;
        //var isFirstLogin = data.first_login;
        if (isFirstLogin == true) {
            LobbyUserData.dataTutorial.isFirstLogin = 1;
            Lobby.Utils.setToLocalStorage(LobbyConstant.Constant4Tutorial.keyStoringIsCreateUserFromThisDevice + LobbyUserData.dataTutorial.name,
                LobbyUserData.dataTutorial.isFirstLogin);
        }
        Lobby.Utils.setToLocalStorage(LobbyConstant.Constant4Tutorial.keyStoringFirstLogin + LobbyUserData.dataTutorial.name,
            LobbyUserData.dataTutorial.isFirstLogin);
    };
    return my;
}(LobbyC.Login || {}));
