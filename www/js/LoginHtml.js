function LoginHtml(){
    var loginState;
    var mainState;
    var forgotPasswordState;
    var signUpState;
    var currentState;
    var currentStateName;
    var backBtn;
    var htmlHolder;
    var sceneHolder;
    var lobbyGame;
    var that = this;
    var isShowingErrorPopup;
    var inputFieldList = {};
    var popupIngameHtml;
    this.isCurrentFocus = false;
    /**
     * Switch to a state and set it element to display
     * @param stateName
     */
    var switchTo = function(stateName){
        currentStateName = stateName;
        currentState.style.display =  "none";
        switch(stateName){
            case "login":
                currentState = loginState;
                backBtn.style.display = "block";
                break;
            case "main":
                currentState = mainState;
                backBtn.style.display = "none";
                break;
            case "forgotPassword":
                currentState = forgotPasswordState;
                backBtn.style.display = "block";
                break;
            case "signUp":
                currentState = signUpState;
                backBtn.style.display = "block";
                break;
            default:
                currentState = mainState;
                backBtn.style.display = "none";
                break;
        }
        currentState.style.display =  "block";
    };
    /**
     * Go to login scene from MainMenu, start blank scene and reset input field value
     */
    this.goBackToLoginFromGame = function(){
        that.setActiveHtmlHolder(true);
        var lastLoginUserName = Lobby.Utils.getFromLocalStorage("userName");
        if (Lobby.Utils.objectIsNull(lastLoginUserName)) {
            lastLoginUserName = "";
        }
        $("#pp-login-username").val(lastLoginUserName);
        LobbyC.GameSlot.game.state.start(
            "BlankScene",
            true, // clearWorld
            false // clearCache
        );
    };
    /**
     * Load init session and set html visible false
     */
    var loadInitSession = function(){
        that.setActiveHtmlHolder(false);
        LobbyC.BlankScene.game.state.start(
            "InitSession",
            true, // clearWorld
            false // clearCache
        );
    };
    /**
     * Show dark layer html
     */
    var createDarkLayer = function(){
        $('#darkLayerLoginNew').css('display', 'block');
    };
    /**
     * Hide dark layer html
     */
    var destroyDarkLayer = function(){
        $('#darkLayerLoginNew').css('display', 'none');
    };
    /**
     * Deprecated
     */
    var newUnFocusAllWithOutResetValue = function(){

    };
    /**
     * Reset all input field value
     */
    var newUnFocusAll = function(){
        for(var key in inputFieldList){
            if(inputFieldList.hasOwnProperty(key) && key!="pp-login-username"){
                $("#"+inputFieldList[key]).val("");
            }
        }
    };
    /**
     * move up scene when keyboard show ios
     */
    var moveUpScene = function(){
        if(Lobby.Utils.isIOS() || Lobby.Utils.isWeb()){
            return;
        }
        //if(Lobby.Utils.isIpad()){
        //    if(!Lobby.Utils.isOldSchoolDevice())  return;
        //    sceneHolder.style.marginTop = "-300px";
        //    lobbyGame.style.marginTop = "300px";
        //    popupIngameHtml.style.marginTop = "-300px";
        //}else{
        sceneHolder.style.marginTop = "-200px";
        lobbyGame.style.marginTop = "200px";
        popupIngameHtml.style.marginTop = "-200px";
        //}
    };
    /**
     * Reset scene to it position, android only
     */
    this.moveDownScene = function(){
        //return;
        sceneHolder.style.marginTop = "0px";
        lobbyGame.style.marginTop = "0px";
        popupIngameHtml.style.marginTop = "0px";
    };
    /**
     * Handle when keyboard show, android only
     * @param e
     */
    var onKeyboardShow = function(e){
        if(LobbyConfig.isDebug) {
            console.log("$onKeyboardShow");
        }
        moveUpScene();
        that.isCurrentFocus = true;
    };
    /**
     * Handle when keyboard hide, android only
     * @param e
     */
    var onKeyboardHide = function(e){
        if(LobbyConfig.isDebug) {
            console.log("onKeyboardHide");
        }
        that.moveDownScene();
        that.isCurrentFocus = false;
    };
    /**
     * Add event to move up and down scene, android only
     */
    var addEventForInput = function(){
        //return;

        for(var key in inputFieldList){
            if(inputFieldList.hasOwnProperty(key)){
                var input = document.getElementById(inputFieldList[key]);
                input.onclick = onKeyboardShow;
                input.addEventListener("focusin",onKeyboardShow);
                input.addEventListener("focusout", onKeyboardHide);
            }
        }
        window.addEventListener('native.keyboardshow', onKeyboardShow);
        window.addEventListener('native.keyboardhide', onKeyboardHide);
        document.addEventListener("hidekeyboard", onKeyboardHide, false);
        document.addEventListener("showkeyboard", onKeyboardShow, false);
    };
    /**
     * Show notifcation in login scene
     * @param title
     * @param body
     * @param messageFontSize
     * @param callback
     * @param haveCancelButton
     * @param callBackCancel
     */
    this.showLoginNotification = function(title, body,  messageFontSize, callback, haveCancelButton, callBackCancel) {
        showErrorPopUpNew(title, body,  messageFontSize, callback, haveCancelButton, callBackCancel);
    };
    /**
     * Show error popup in login scene
     * @param title
     * @param body
     * @param messageFontSize
     * @param callback
     * @param haveCancelButton
     * @param callBackCancel
     */
    var showErrorPopUpNew = function(title, body,  messageFontSize, callback, haveCancelButton, callBackCancel) {
        //haveCancelButton = true;
        if (Lobby.Utils.objectIsNull(title)) {
            title = "Error";
        }
        if (Lobby.Utils.objectIsNull(body)) {
            body = "Something went wrong. Please try again later";
        }
        var setVisiblePopup = function(isOpen)
        {
            if(haveCancelButton)
            {
                //$("#summitButtonPopupNotificationLoginScene").css({'margin-left': + -40 +"%"});
                $("#cancelButtonPopupNotificationLoginScene").css('display', '');
            }else{
                //$("#summitButtonPopupNotificationLoginScene").css({'margin-left': + 0 +"%"});
                $("#cancelButtonPopupNotificationLoginScene").css('display', 'none');
            }
            if(isOpen){
                createDarkLayer();
                $('#pp-popup-notification-login-scene').css('display', 'block');
            }else{
                $('#pp-popup-notification-login-scene').css('display', 'none');
                destroyDarkLayer();
            }
        };
        //SETUP TEXT
        $('#titlePopupLoginScene').text(title);
        $('#bodyTextPopupLoginScene').text(body);

        //SETUP CALLBACK FUNC
        $("#summitButtonPopupNotificationLoginScene").unbind( "click" );
        $("#summitButtonPopupNotificationLoginScene").click(function(){
                setVisiblePopup(false);
                if(Lobby.Utils.objectNotNull(callback))
                    callback();
            }
        );
        //SETUP CANCEL
        if(haveCancelButton){
            $("#cancelButtonPopupNotificationLoginScene").unbind( "click" );
            $("#cancelButtonPopupNotificationLoginScene").click(function(){
                    setVisiblePopup(false);
                    if(Lobby.Utils.objectNotNull(callBackCancel))
                        callBackCancel();
                }
            );
        }
        //VISIBLE
        setVisiblePopup(true);


        //alert(body);
        //if(Lobby.Utils.objectNotNull(callback)) callback();
    };
    /**
     * Facebook login section
     * @param callback
     */
    var initFacebook = function(callback){
        FacebookController.init(callback);
    };
    /**
     * login facebook
     */
    var loginFacebook = function(){
        initFacebook(function () {

            if(Lobby.Utils.isIOS()){
                //FacebookController.forceLogin(function(isSuccess,message){
                //    //if(isSuccess){
                //  if(!isSuccess && message.indexOf("User cancelled")>-1) return;
                //
                //  LobbyConfig.isFb = true;
                //  LobbyConfig.loginFrom = "fb";
                //  loadInitSession();
                //    //}
                //});
                FacebookController.login(function(isSuccess,message){
                    //if(isSuccess){
                    if(!isSuccess && message.indexOf("User cancelled")>-1) return;

                    LobbyConfig.isFb = true;
                    LobbyConfig.loginFrom = "fb";
                    loadInitSession();
                    //}
                });

            }else{

                LobbyConfig.isFb = true;
                LobbyConfig.loginFrom = "fb";
                loadInitSession();
            }
        });
    };
    /**
     * End facebook login seciton
     */
    var setupDataTutorial = function (data) {
        LobbyUserData.dataTutorial.name = data.name;

        var isFirstLogin = false;
        if(!LobbyConfig.isTestAlgorithmMode) {
            LobbyUserData.dataTutorial.isCanPlayTutorial = data.allow_play_tutorial;
            LobbyUserData.dataTutorial.isCanGetPreRewardTutorial = data.allow_get_pre_tutorial_reward;
            LobbyUserData.dataTutorial.isCanSpinTutorial = data.allow_get_tutorial_spin_reward;
            isFirstLogin = data.first_login;
        }
        if (isFirstLogin == true) {
            LobbyUserData.dataTutorial.isFirstLogin = 1;
            Lobby.Utils.setToLocalStorage(LobbyConstant.Constant4Tutorial.keyStoringIsCreateUserFromThisDevice + LobbyUserData.dataTutorial.name,
                LobbyUserData.dataTutorial.isFirstLogin);
        }
        Lobby.Utils.setToLocalStorage(LobbyConstant.Constant4Tutorial.keyStoringFirstLogin + LobbyUserData.dataTutorial.name,
            LobbyUserData.dataTutorial.isFirstLogin);
    };


    /**
     * Login guest section
     */
    var loadAccPassLocal = function () {
        var keyAcc = "userNameLocal";
        var keyPass = "passwordLocal";
        var account = Lobby.Utils.getFromLocalStorage(keyAcc);
        var password = Lobby.Utils.getFromLocalStorage(keyPass);
        return {account: account, password: password};
    };
    var storingAccPassLocal = function (acc, pass) {
        var keyAcc = "userNameLocal";
        var keyPass = "passwordLocal";
        var account = Lobby.Utils.setToLocalStorage(keyAcc, acc);
        var password = Lobby.Utils.setToLocalStorage(keyPass, pass);
        return {account: account, password: password};
    };
    var generalAndStoringAccountServerLocal = function () {
        createDarkLayer();
        LobbyRequest.User.generateLocalAccount(
            function (isSuccess, data, resultBean) {
                if (isSuccess) {
                    var account = data.user_name;
                    var password = data.info;
                    storingAccPassLocal(account, password);
                    loginServerLocal(account, password);
                }
                else {
                    destroyDarkLayer();
                    if(Lobby.Utils.objectIsNull(resultBean))
                    {
                        newUnFocusAllWithOutResetValue();
                        showErrorPopUpNew("PlayPalace Login", LobbyLanguageConstant.CANNOT_CONNECT_TO_SERVER);
                        return;
                    }
                    switch (resultBean.core_result_code) {
                        case LobbyConstant.RESULT_CODE_ERROR_USER_NOT_ACTIVE:
                            newUnFocusAllWithOutResetValue();
                            showErrorPopUpNew("PlayPalace Login", "User Not Active");
                            //my.showErrorPopUp("User Not Active");
                            break;
                        case LobbyConstant.RESULT_CODE_ERROR_SERVER_MAINTAIN:
                            //my.showErrorPopUp("Server maintenance for a few minutes. Please check back later ...");
                            newUnFocusAllWithOutResetValue();
                            showErrorPopUpNew("PlayPalace Login", "Server maintenance for a few minutes. Please check back later ...");
                            break;
                        case LobbyConstant.RESULT_CODE_ERROR_WRONG_PASSWORD:
                        case LobbyConstant.RESULT_CODE_ERROR_WRONG_USERNAME:
                            newUnFocusAllWithOutResetValue();
                            //my.showErrorPopUp("Wrong password");
                            showErrorPopUpNew("PlayPalace Login", "Wrong username or password. \nPlease try again.");
                            break;
                        default :
                            newUnFocusAllWithOutResetValue();
                            //my.showErrorPopUp("Error");
                            showErrorPopUpNew("PlayPalace Login", "Error");
                            break;
                    }
                }
            });
    };
    /**
     * Login using guest account
     * @param userNameLocal
     * @param passWordLocal
     */
    var loginServerLocal = function(userNameLocal,passWordLocal){
        if(LobbyConfig.isTestAlgorithmMode){
            //add test account to log file
            Manager4DebugTestAlgorithm.addDebug2Log("Test account");
            Manager4DebugTestAlgorithm.addDebug2Log("UserName:"+userNameLocal);
            Manager4DebugTestAlgorithm.addDebug2Log("Password:"+passWordLocal);
        }
        createDarkLayer();
        LobbyRequest.User.loginServerPPWithLocalAccount(
            userNameLocal,
            passWordLocal,
            function (isSuccess, data, resultBean) {
                destroyDarkLayer();
                if (isSuccess) {
                    newUnFocusAll();
                    LobbyConfig.loginToken = data.ts_login;
                    LobbyUserData.comebackBonus = data.comeback_bonus_gift;
                    LobbyUserData.checkLoginNotFacebookAccount = data.check_loggedin_in_day;

                    setupDataTutorial(data);
                    loadInitSession();
                }
                else {
                    if(Lobby.Utils.objectIsNull(resultBean))
                    {
                        newUnFocusAllWithOutResetValue();
                        showErrorPopUpNew("PlayPalace Login",LobbyLanguageConstant.CANNOT_CONNECT_TO_SERVER);
                        return;
                    }
                    switch (resultBean.core_result_code) {
                        case LobbyConstant.RESULT_CODE_ERROR_USER_NOT_ACTIVE:
                            newUnFocusAllWithOutResetValue();
                            showErrorPopUpNew("PlayPalace Login", "User Not Active");
                            //my.showErrorPopUp("User Not Active");
                            break;
                        case LobbyConstant.RESULT_CODE_ERROR_SERVER_MAINTAIN:
                            //my.showErrorPopUp("Server maintenance for a few minutes. Please check back later ...");
                            newUnFocusAllWithOutResetValue();
                            showErrorPopUpNew("PlayPalace Login", "Server maintenance for a few minutes. Please check back later ...");
                            break;
                        case LobbyConstant.RESULT_CODE_ERROR_WRONG_PASSWORD:
                        case LobbyConstant.RESULT_CODE_ERROR_WRONG_USERNAME:
                            newUnFocusAllWithOutResetValue();
                            ////my.showErrorPopUp("Wrong password");
                            showErrorPopUpNew("PlayPalace Login", "Wrong username or password. \nPlease try again.");
                            break;
                        default :
                            newUnFocusAllWithOutResetValue();
                            ////my.showErrorPopUp("Error");
                            showErrorPopUpNew("PlayPalace Login", "Error");
                            break;
                    }
                }
            });
    };
    /**
     * Create guest or login
     */
    var loginGuestAccount = function(){
        LobbyConfig.loginFrom = "guest";
        if(LobbyConfig.isTestAlgorithmMode) {
            if(LobbyConfig.isAutoLogin === true){
                generalAndStoringAccountServerLocal();
                return;
            }else{
                if (confirm('Do you want create new account?')) {
                    //generalAccount
                    generalAndStoringAccountServerLocal();
                    return;
                } else {
                    // Do nothing!
                }

            }
        }
        var accPassLocal = loadAccPassLocal();
        if (
            Lobby.Utils.objectNotNull(accPassLocal.account)
            && Lobby.Utils.objectNotNull(accPassLocal.password)
            && accPassLocal.account != ""
            && accPassLocal.password != ""
        ) {
            loginServerLocal(accPassLocal.account, accPassLocal.password);
        } else {
            //generalAccount
            generalAndStoringAccountServerLocal();
        }
    };
    /**
     * End login guest section
     */


    /**
     * Login PP section
     */
    var generalPlayPalaceAccount = function(){
        var generateEmail = function(){
            return "testStrategy" + Lobby.Utils.getRandomInRange(0 , 100000) + "@gmail.com";
        };
        var generatePass = function(){
            return "12345678";
        };

        var signUp = function(){
            var email = generateEmail();
            var pass = generatePass();
            signUpPlayPalaceAccount(email, pass, pass, null, function(isSuccess){
                if(isSuccess){
                    loginPlayPalaceAccount(email, pass);
                }else{
                    signUp();
                }
            });
        };
        signUp();
    };
    var loginPlayPalaceAccount = function (email, password) {
        //LobbyRequest.User.logout(function (isSuccess, data) {
        //});
        if (isShowingErrorPopup) {
            return;
        }

        if(LobbyConfig.isTestAlgorithmMode){
            //add test account to log file
            Manager4DebugTestAlgorithm.addDebug2Log("Test account");
            Manager4DebugTestAlgorithm.addDebug2Log("UserName:"+email);
            Manager4DebugTestAlgorithm.addDebug2Log("Password:"+password);
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


        if (emailAccount == ""
            || emailAccount == " ") {
            newUnFocusAllWithOutResetValue();
            showErrorPopUpNew("PlayPalace Login", "Please enter your email");
            return;
        }

        if (passwordAccount == "") {
            newUnFocusAllWithOutResetValue();
            showErrorPopUpNew("PlayPalace Login", "Please enter your password");
            return;
        }

        if (!Lobby.Utils.validateEmail(emailAccount)) {
            //my.showErrorPopUp("Wrong email");
            newUnFocusAllWithOutResetValue();
            showErrorPopUpNew("PlayPalace Login", "Invalid Email");
            //location.href = "";
            return;
        }

        createDarkLayer();
        LobbyRequest.User.loginPlayPalaceAccount(
            emailAccount,
            passwordAccount,
            function (isSuccess, data, resultBean) {
                destroyDarkLayer();
                if (isSuccess) {
                    newUnFocusAll();
                    Lobby.Utils.setToLocalStorage("userName", data.user_name);
                    LobbyConfig.loginToken = data.ts_login;
                    LobbyUserData.comebackBonus = data.comeback_bonus_gift;
                    LobbyUserData.checkLoginNotFacebookAccount = data.check_loggedin_in_day;

                    loadInitSession();
                }
                else {
                    if(Lobby.Utils.objectIsNull(resultBean))
                    {
                        newUnFocusAllWithOutResetValue();
                        showErrorPopUpNew("PlayPalace Login", LobbyLanguageConstant.CANNOT_CONNECT_TO_SERVER);
                        return;
                    }
                    switch (resultBean.core_result_code) {
                        case LobbyConstant.RESULT_CODE_ERROR_USER_NOT_ACTIVE:
                            newUnFocusAllWithOutResetValue();
                            showErrorPopUpNew("PlayPalace Login", "User Not Active");
                            //my.showErrorPopUp("User Not Active");
                            break;
                        case LobbyConstant.RESULT_CODE_ERROR_SERVER_MAINTAIN:
                            //my.showErrorPopUp("Server maintenance for a few minutes. Please check back later ...");
                            newUnFocusAllWithOutResetValue();
                            showErrorPopUpNew("PlayPalace Login", "Server maintenance for a few minutes. Please check back later ...");
                            break;
                        case LobbyConstant.RESULT_CODE_ERROR_WRONG_PASSWORD:
                        case LobbyConstant.RESULT_CODE_ERROR_WRONG_USERNAME:
                            newUnFocusAllWithOutResetValue();
                            showErrorPopUpNew("PlayPalace Login", "Wrong username or password. \nPlease try again.");
                            break;
                        default :
                            newUnFocusAllWithOutResetValue();
                            showErrorPopUpNew("PlayPalace Login", "Error");
                            break;
                    }
                }
            });
    };
    /**
     * Get value from input field and login PP Accout
     */
    var loginPPAccount = function(){
        loginPlayPalaceAccount($("#pp-login-username").val(), $("#pp-login-password").val());
    };

    /**
     * End login PP section
     */

    /**
     * Sign up section
     */
    var signUpPlayPalaceAccount = function (email, password, passwordRetype, referenceCode, callback) {
        if (isShowingErrorPopup) {
            return;
        }

        var emailAccount = email;
        var passwordAccount = password;
        var rePasswordAccount = passwordRetype;

        if (emailAccount == "") {
            newUnFocusAllWithOutResetValue();
            showErrorPopUpNew("PlayPalace SignUp", "Please Enter your email address");
            return;
        }

        if (passwordAccount == "") {
            newUnFocusAllWithOutResetValue();
            showErrorPopUpNew("PlayPalace SignUp", "Please Enter your password");
            return;
        }

        if (rePasswordAccount == "") {
            newUnFocusAllWithOutResetValue();
            showErrorPopUpNew("PlayPalace SignUp", "Please Enter your retype password");
            return;
        }

        if (!Lobby.Utils.validateEmail(emailAccount)) {
            //my.showErrorPopUp("Wrong email...");
            newUnFocusAllWithOutResetValue();
            showErrorPopUpNew("PlayPalace SignUp", "Invalid Email");
            return;
        }

        if (passwordAccount != rePasswordAccount) {
            //my.showErrorPopUp("Please input same password....");
            newUnFocusAllWithOutResetValue();
            showErrorPopUpNew("PlayPalace SignUp", "Password does not match.");
            return;
        }

        createDarkLayer();
        LobbyRequest.User.signUpPlayPalaceAccount(
            emailAccount,
            passwordAccount,
            referenceCode,
            function (isSuccess, data, beanResult) {
                destroyDarkLayer();
                if(callback){
                    callback(isSuccess);
                    return;
                }
                if (isSuccess) {
                    newUnFocusAll();
                    showErrorPopUpNew("Sign Up Successful!", "Congratulation!", null, function () {
                        switchTo("login");
                    });
                    return;
                }
                if(Lobby.Utils.objectIsNull(beanResult))
                {
                    newUnFocusAllWithOutResetValue();
                    showErrorPopUpNew("PlayPalace Login", LobbyLanguageConstant.CANNOT_CONNECT_TO_SERVER);
                    return;
                }
                switch (beanResult.core_result_code) {
                    case LobbyConstant.RESULT_CODE_USER_EXIST:
                        newUnFocusAllWithOutResetValue();
                        showErrorPopUpNew("PlayPalace SignUp", "Username already exists");
                        break;
                    case  LobbyConstant.RESULT_CODE_ERROR_SERVER_MAINTAIN:
                        //my.showErrorPopUp("Server maintenance for a few minutes. Please check back later ...");
                        newUnFocusAllWithOutResetValue();
                        showErrorPopUpNew("PlayPalace SignUp", "Server maintenance for a few minutes. Please check back later ...");
                        break;
                    case LobbyConstant.RESULT_CODE_PASSWORD_POLICY_ERROR:
                        newUnFocusAllWithOutResetValue();
                        showErrorPopUpNew("PlayPalace SignUp", "Password length must be\nat least 8 characters");
                        break;
                    default :
                        //my.showErrorPopUp("Error");
                        newUnFocusAllWithOutResetValue();
                        showErrorPopUpNew("PlayPalace SignUp", "Error");
                        break;
                }
            });
    };
    /**
     * Sign up PP with value from input field
     */
    var signUpPP = function(){
        signUpPlayPalaceAccount($("#pp-sign-up-username").val(), $("#pp-sign-up-password").val(), $("#pp-sign-up-re-password").val(),$("#pp-sign-up-reference-code").val());
    };
    /**
     * End sign up section
     */

    /**
     * Forgot password section
     */
    var sendRequestResetPasswordPlayPalaceAccount = function (emailAddress) {
        if (isShowingErrorPopup) {
            return;
        }
        if (emailAddress == "") {
            newUnFocusAllWithOutResetValue();
            showErrorPopUpNew("PlayPalace Reset Password", "Please Enter your email address");
            return;
        }
        var emailAccount = emailAddress;
        if (!Lobby.Utils.validateEmail(emailAccount)) {
            //my.showErrorPopUp("Wrong email...");
            newUnFocusAllWithOutResetValue();
            showErrorPopUpNew("PlayPalace Reset Password", "Invalid Email");
            return;
        }

        var postData = {
            username: emailAccount
        };
        createDarkLayer();
        Lobby.Network.post(
            LobbyConfig.webServiceFullUrl + "/user/requestResetPassword",
            postData,
            function (isSuccess, data) {
                destroyDarkLayer();
                if (isSuccess) {
                    //my.showErrorPopUp("An email has been sent to " + emailAccount + " with further instructions.");
                    newUnFocusAll();

                    showErrorPopUpNew("PlayPalace ResetPassword", "An email has been sent to \n" + emailAccount + "\n with further instructions.", "28px", function () {
                        switchTo("login");
                    });

                    return;
                }
                switch (data.core_result_code) {
                    case LobbyConstant.RESULT_CODE_ERROR_WRONG_PASSWORD:
                        //my.showErrorPopUp("User is NOT existed!");
                        newUnFocusAllWithOutResetValue();
                        showErrorPopUpNew("PlayPalace ResetPassword", "User is NOT existed!");
                        break;
                    case  LobbyConstant.RESULT_CODE_ERROR_SERVER_MAINTAIN:
                        //my.showErrorPopUp("Server maintenance for a few minutes. Please check back later ...");
                        newUnFocusAllWithOutResetValue();
                        showErrorPopUpNew("PlayPalace ResetPassword", "Server maintenance for a few minutes. Please check back later ...");
                        break;
                    default:
                        //my.showErrorPopUp("Error occurred!");
                        newUnFocusAllWithOutResetValue();
                        showErrorPopUpNew("PlayPalace ResetPassword", "Error occurred!");
                        break;
                }
            });
    };
    /**
     * Handle forgot password click
     */
    var forgotPassword = function(){
        sendRequestResetPasswordPlayPalaceAccount($("#pp-rs-pw-username").val());
    };

    /**
     * End forgot password section
     */

    this.showErrorPopUpNew = function(title, body,  messageFontSize, callback, haveCancelButton, callBackCancel)
    {
        showErrorPopUpNew(title, body,  messageFontSize, callback, haveCancelButton, callBackCancel);
    };
    /**
     * Use for switch between ingame visible and html login visible
     * @param isActive is HTML login should active
     * @param state state to display
     */
    this.setActiveHtmlHolder = function(isActive,state){
        if(Lobby.Utils.objectIsNull(state)) state = "main";
        if(isActive){
            htmlHolder.style.display = "block";
            popupIngameHtml.style.display = "none";
            switchTo(state);
            lobbyGame.style.visibility = "hidden";
        }else{
            lobbyGame.style.visibility = "visible";
            htmlHolder.style.display = "none";
            if(LobbyConfig.enablePopupHtml)
                popupIngameHtml.style.display = "block";
        }

    };
    /**
     * Add focus next input and handle return key for input field
     */
    var handleInputKeyCode = function()
    {
        var divElement = $('.pp-input-field');
        divElement.unbind("keyup");
        divElement.unbind("keydown");
        divElement.keyup(function (e) {
            var divElementValue = divElement.val();
            switch (e.which) {
                case 13:
                    divElement.blur();
                    var current = $("#"+e.currentTarget.id);
                    var next = current.nextAll('input').first();
                    if(next.length>0){
                        next.focus();
                    }else{
                        next = current.nextAll("button").last();
                        if(next.length>0) next.click();
                    }
                    return;
                case 27:
                    break; // Esc: clear entry
                case 37:
                    //divElement.val(divElementValue.substring(0, divElementValue.length - 1));
                    break; // cursor left
                default:
                    break;
            }
        });
    };
    /**
     * Init html login
     */
    var init = function(){
        htmlHolder = document.getElementById("html-holder");
        loginState = document.getElementById("pp-login-state");
        mainState = document.getElementById("pp-main-login");
        signUpState = document.getElementById("pp-new-sign-up");
        forgotPasswordState = document.getElementById("pp-forgot-password");
        currentState = mainState;
        lobbyGame = document.getElementById("lobbygame");
        sceneHolder = document.getElementById("pp-scene-holder");
        popupIngameHtml = document.getElementById("in-game-html-holder");
        /**
         * Input field list
         */
        inputFieldList.loginUsername = ("pp-login-username");
        inputFieldList.loginPassword = ("pp-login-password");
        inputFieldList.signUpUsername = ("pp-sign-up-username");
        inputFieldList.signUpPassword = ("pp-sign-up-password");
        inputFieldList.signUpRepassword = ("pp-sign-up-re-password");
        inputFieldList.forgotPasswordUsername = ("pp-rs-pw-username");
        inputFieldList.changeName = ("popup-change-name-new-name");
        inputFieldList.referenceCode = ("pp-sign-up-reference-code");
        /**
         * Handle strategy
         */
        //var referenceCodeInputForm = document.getElementById("pp-reference-code-input-form");
        //if(!LobbyConfig.isTestStrategy) referenceCodeInputForm.style.display =  "none";
        /**
         * Init button event
         */
        backBtn = document.getElementById("pp-login-back-btn");
        var loginFb = document.getElementById("facebook-logo");
        var loginGuest = document.getElementById("pp-login-as-guest-btn");
        var loginPP = document.getElementById("pp-login-btn");
        var signUp = document.getElementById("pp-sign-up-btn");
        var forgotPw = document.getElementById("pp-forgot-password-btn");

        var showLoginPP = document.getElementById("pp-login-with-acc-btn");
        var showForgotPassword = document.getElementById("pp-forgot-pwd-btn");
        var showSignUp = document.getElementById("pp-new-account-btn");

        showLoginPP.onclick = function(){
            if(LobbyConfig.isTestAlgorithmMode) {
                if (LobbyConfig.isAutoLogin === true) {
                    generalPlayPalaceAccount();
                    return;
                } else {
                    if (confirm('Do you want create new account?')) {
                        //generalAccount
                        generalPlayPalaceAccount();
                        return;
                    } else {
                        // Do nothing!
                    }

                }
            }
            switchTo("login");
        };
        showForgotPassword.onclick = function(){
            switchTo("forgotPassword")
        };
        showSignUp.onclick = function(){
            switchTo("signUp");
        };
        backBtn.onclick = function(){
            if(currentStateName  === "signUp" || currentStateName === "forgotPassword"){
                switchTo("login");
            }  else{
                switchTo("main");
            }
        };

        loginFb.onclick = loginFacebook;
        loginGuest.onclick = loginGuestAccount;
        loginPP.onclick = loginPPAccount;
        signUp.onclick = signUpPP;
        forgotPw.onclick = forgotPassword;

        addEventForInput();
        handleInputKeyCode();


        var lastLoginUserName = Lobby.Utils.getFromLocalStorage("userName");
        if (Lobby.Utils.objectIsNull(lastLoginUserName)) {
            lastLoginUserName = "";
        }
        $("#pp-login-username").val(lastLoginUserName);
        $("#pp-version").html("Test version:"+LobbyConfig.versionDisplay);
        if(Lobby.Utils.isProduction()){
            $("#pp-version").css('display','none');
        }
    };

    /**
     * Use for switch between ingame visible and html login visible
     * @param isActive is HTML login should active
     * @param state state to display
     */
    this.autoLoginGuestAccount = function(){
        loginGuestAccount();
    };

    /**
     * Use for switch between ingame visible and html login visible
     * @param isActive is HTML login should active
     * @param state state to display
     */
    this.autoLoginPPAccount = function(){
        if(LobbyConfig.isTestAlgorithmMode) {
            if (LobbyConfig.isAutoLogin === true) {
                generalPlayPalaceAccount();
                return;
            } else {
                if (confirm('Do you want create new account?')) {
                    //generalAccount
                    generalPlayPalaceAccount();
                    return;
                } else {
                    // Do nothing!
                }

            }
        }
        switchTo("login");
    };
    init();
}
