LobbyC.Preloader = (function (my) {

    my._userData = {
        isFacebookUser: false,
        authResponse: null,
        invitableFriendList: null,
        profile: null,
        friendList: null
    };

    my._avatarList = null;
    /**
     * Init state preloader (load resources)
     * @param userData: user data
     * @param avatarList: avatar list
     */
    my.init = function (userData, avatarList) {
        my._userData = userData;
        my._avatarList = avatarList;
    };
    if (LobbyConfig.isDebug) {
        my.render = function () {
            my.game.debug.text("FPS:" + my.time.fps || '--', 2, 14, "#00ff00");
        };
    }
    /**
     * Preload function for state Preloader
     */
    my.preload = function () {
        if (LobbyConfig.isDebug) {
            my.time.advancedTiming = true;
        }

        Lobby.Utils.printConsoleLog("***************************************************************************");
        Lobby.Utils.printConsoleLog("*********** Benchmark: Begin adding resource to preloader queue ***********");
        Lobby.Utils.printConsoleLog("***************************************************************************");

        my.load.crossOrigin = "Anonymous";
        //my.loadHeaderResource();
        //my.loadMenuResource();
        //my.loadFooterResource();
        my.loadingAnimation();
        my.loadBodyResource();

        my.loadNewFooterResource();
        my.loadNewHeaderResource();

        my.loadCustomAnimation();


        my.loadPopUpResource();

        my.loadMainBodyResources();


        my.load.onLoadStart.add(my.loadStart, my);
        my.load.onFileComplete.add(my.fileComplete, my);
        my.load.onLoadComplete.add(my.loadComplete, my);
    };
    /**
     * Function call when start loading resources
     */
    my.loadStart = function () {
        Lobby.Utils.printConsoleLog('loadStart');
    };
    /**
     * Function call when a resource loaded
     * @param progress: current loading progress
     * @param cacheKey
     * @param success
     * @param totalLoaded
     * @param totalFiles
     */
    my.fileComplete = function (progress, cacheKey, success, totalLoaded, totalFiles) {
        if (progress >= 50) {
            progress -= 50;
            my._loadingTextValue = LobbyLanguageConstant.LOADING_SCENE_MESSAGE_2;
        }
        progress *= 2;

        if (progress > 98) {
            return;
        }

        window.loadingViewInitSession._loadingText.setText(my._loadingTextValue);
        window.loadingViewInitSession._loadingBarBackgroundDone.width = window.loadingViewInitSession._loadingBarBackgroundDone.originalWidth * progress / 100;

    };
    /**
     * Function call when all resources loaded
     */
    my.loadComplete = function () {
        my.state.start(
            "MainMenu",
            true, // clearWorld
            false, // clearCache
            my._userData,
            true // isFirstTimeLoadState
        );
        // test for just play one game slots
        //my.fullScreen();
        //my.state.start('GameSlot', false, false, "goldenegg", my._userData,my.gameSlotGroup);
        //my.state.start('GameSlot', false, false, "nezha", my._userData,my.gameSlotGroup);
        //my.state.start('GameSlot', false, false, "deepblue", my._userData,my.gameSlotGroup);

        //return;
        if(Lobby.Utils.isFunction(my.loadComplete)) {
            my.load.onLoadComplete.remove(my.loadComplete, my);
        }
    };

    my.create = function () {
    };

    return my;
}(LobbyC.Preloader || {}));
