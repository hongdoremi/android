/**
 * Created by Phan on 7/8/2016.
 */
var ManagerForEvent = new function () {
    var that = this;
    this.isBlockBackButton = false;
    /**
     * Add pause and resume event
     * @param my
     */
    this.init = function (my) {
        document.addEventListener("pause", function () {
            that.onPause(my);
        }, false);
        document.addEventListener("resume", function () {
            that.onResume(my);
        }, false);
        //document.addEventListener("backbutton", function () {
        //    that.onBackButton(my);
        //}, false);
    };
    /**
     * set block back button when showing exit confirm popup
     * @param isBlock
     */
    this.setIsBlockBackButton = function(isBlock){
        if(Lobby.Utils.objectNotNull(that.isBlockBackButton))
            that.isBlockBackButton = isBlock;
    };
    /**
     * Init backbutton to show exit confirm popup up for login
     * @param my
     */
    this.initInLoginScene = function (my) {
        document.addEventListener("backbutton", function () {
            that.onBackButtonInLoginScene(my);
            that.onBackButton(my);
        }, false);
    };
    /**
     * Handle on resume event
     * @param my
     */
    this.onResume = function (my) {
        if (LobbyConfig.isDebug){
            Lobby.Utils.printConsoleLog("$onResume");
        }
        try {
            ManagerForSound.resumeAll();
            //if (my._userSetting.backgroundMusic == "1" && localStorage.getItem("backgroundMusic") == "1") {
                //my.resumeBackGroundMusic();
            //}

            if(!Lobby.Utils.isIOS() &&
                !Lobby.Utils.isWeb()) {
                window.navigationbar.hideNavigationBar();
            }
            //// 2016-07-22: Phuoc: check thêm điều kiện: chỉ resume background music khi ở lobby
            //if (my._userSetting.backgroundMusic == "1" && localStorage.getItem("backgroundMusic") == "1"
            //    && my.playingGame === LobbyConstant.isNotInGame) {
            //    my.resumeBackGroundMusic();
            //}
            my.game.paused = false;
            my.game.stage.disableVisibilityChange = true;
        }
        catch (err) {
            Lobby.Utils.printConsoleLog("$onResume " + Lobby.Utils.formatJSON(err));
        }
    };
    /**
     * Handle pause event
     * @param my
     */
    this.onPause = function (my) {
        //ManagerForSound.loopMediaflag = false;
        ManagerForSound.pauseAll();
        Lobby.Utils.printConsoleLog("$onPause");

        //my.pauseBackgroundMusic();
    };
    /**
     * Handle back button event
     * @param my
     */
    this.onBackButton = function (my) {
        if (that.isBlockBackButton) return;
        Lobby.Utils.printConsoleLog("$onBackButton");
        if (Lobby.Utils.objectIsNull(my.groupInputField)){
            that.isBlockBackButton = true;

            if(my.state.getCurrentState().key != "Login"
            && my.state.getCurrentState().key != "BlankScene"){
                LobbyC.MainMenu.showNotificationPopupV2(LobbyC.MainMenu.selectlanguage.exit_game.title, LobbyC.MainMenu.selectlanguage.exit_game.message, function(){
                    navigator.app.exitApp();
                }, function () {
                    that.isBlockBackButton = false;
                });
            }else if(LobbyC.Login.LoginHtml.isCurrentFocus)
            {
                if(LobbyConfig.enableLoginHtml){
                    that.isBlockBackButton = false;
                    LobbyC.Login.LoginHtml.moveDownScene();
                }
            }else{
                if(LobbyConfig.enableLoginHtml) {
                    LobbyC.Login.LoginHtml.showErrorPopUpNew(
                        "Exit confirm",
                        "Do you want to stop playing?",
                        null,
                        function () {
                            navigator.app.exitApp();
                        },
                        true,
                        function () {
                            that.isBlockBackButton = false;
                        }
                    );
                }else{
                    LobbyC.Login.showErrorPopUpNew("Exit confirm",
                        "Do you want to stop playing?",
                        null,
                        function () {
                            navigator.app.exitApp();
                        },
                        true,
                        function () {
                            that.isBlockBackButton = false;
                        }
                    );
                }
            }
        }
    };
    /**
     * Handle back button in login scene
     * @param my
     */
    this.onBackButtonInLoginScene = function (my) {
        Lobby.Utils.printConsoleLog("$onBackButton");
        Helper4Input.Input.unFocusInputField(my);
        if (Lobby.Utils.objectNotNull(my.groupInputField)){
            my.groupInputField.destroy();
            my.groupInputField = null;
        }
    };
    /**
     * Handle when memory occured, reload app
     */
    this.onMemoryError = function(){
        Lobby.Utils.printConsoleLog("onMemoryError Memory error occured");
        window.location.href = window.location.href.replace( /[\?#].*|$/, "?memoryError=true" );
        //Lobby.Utils.reloadGame();
    }
};
