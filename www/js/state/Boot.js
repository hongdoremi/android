var LobbyC = {};
LobbyC.Boot = (function (my) {
    /**
     * Preload image for login
     */
    my.preload = function () {

//Dat: test for just 1 game slot
        //return;

        my.load.crossOrigin = "anonymous";

        my.load.image(
            'background-loading',
            'img/loading screen/loading_background.jpg' + LobbyConfig.resourceVersion
        );
        my.load.image(
            'loading-bar-background',
            'img/loading screen/loading-bar-ready.png' + LobbyConfig.resourceVersion
            //'img/loading screen/loading-bar-background.png'+ LobbyConfig.resourceVersion
        );
        my.load.image(
            'loading-bar-background-done',
            'img/loading screen/loading-bar-done.png' + LobbyConfig.resourceVersion
            //'img/loading screen/loading_bar.png' + LobbyConfig.resourceVersion
        );

        ////my.load.atlas(
        ////    'loading-bar-thumb',
        ////    'img/loading screen/loading-bar-thumb.png'+LobbyConfig.resourceVersion,
        ////    'img/loading screen/loading-bar-thumb.json'+LobbyConfig.resourceVersion
        ////);
        //
        my.load.atlas(
            'loading-reload-btn',
            'img/loading screen/btn_reload.png' + LobbyConfig.resourceVersion,
            'img/loading screen/btn_reload.json' + LobbyConfig.resourceVersion
        );


        //my.load.image(
        //    'state-login-background',
        //    'img/login/login_background.jpg' + LobbyConfig.resourceVersion
        //);

        my.load.image(
            'copyright-image',
            'img/login/copyright.png' + LobbyConfig.resourceVersion
        );

        my.load.image(
            'state-login-login-with-fb',
            'img/login/login_with_fb.png' + LobbyConfig.resourceVersion
        );

        my.load.image(
            'state-login-or-text',
            'img/login/or.png' + LobbyConfig.resourceVersion
        );
        my.load.image(
            'state-login-logo',
            'img/login/logo.png' + LobbyConfig.resourceVersion
        );

        my.load.image(
            'state-login-login-with-pp',
            'img/login/login_with_pp.png' + LobbyConfig.resourceVersion
        );

        my.load.image(
            'state-login-back',
            'img/login/back.png' + LobbyConfig.resourceVersion
        );


        my.load.image(
            'state-login-login',
            'img/login/btn_login_pp.png' + LobbyConfig.resourceVersion
        );

        my.load.image(
            'popup-dark-layer-login-state',
            'img/popup/dark-layer.png' + LobbyConfig.resourceVersion
        );

        my.load.image(
            'state-login-login-with-guess',
            'img/login/guess_icon.png' + LobbyConfig.resourceVersion
        );


        var preloadFontSampleTextPassionOne_Regular = my.add.text(0, 0, "", {
            font: "35px " + ConstantFontName.FONT_NAME_PassionOne_Regular
        });

        var preloadFontSampleTextPassionOne_Bold = my.add.text(0, 0, "", {
            font: "35px " + ConstantFontName.FONT_NAME_PassionOne_Bold
        });


    };
    /**
     * Force add event for resume game, pause game
     */
    my.forceResumeGame = function () {

        my.game.onPause.removeAll();
        my.game.onResume.removeAll();
        //my.game.onFocus.removeAll();


        var onGamePause = function () {
            //Lobby.Utils.printConsoleLog('game paused at ' + this.time.now);
            my.game.paused = false;
            my.game.stage.disableVisibilityChange = true;
        };
        var onGameResume = function () {
            //Lobby.Utils.printConsoleLog('game un-paused at ' + my.time.now);
            //Lobby.Utils.printConsoleLog('was paused for ' + my.game.time.pauseDuration);
            my.game.stage.disableVisibilityChange = true;
        };
        //var onGameFocus = function () {
        //    window.navigationbar.hideNavigationBar();
        //};
        my.game.onPause.add(onGamePause, my);
        my.game.onResume.add(onGameResume, my);
        //my.game.onFocus.add(onGameFocus, my);

    };
    /**
     * Add event for canvasGame, init facebook controller and load state login
     */
    my.create = function () {


      my.game.renderer.renderSession.roundPixels = true;

        //my.game.stage.visibilityChange = function(){};
        my.game.stage.disableVisibilityChange = true;
        my.game.stage.backgroundColor = "#333";

        //// Dat test for just play one game slots
        //my.fullScreen();
        //my.state.start('GameSlot', false, false, "goldenegg", my._userData,my.gameSlotGroup);
        ////my.state.start('GameSlot', false, false, "nezha", my._userData,my.gameSlotGroup);
        ////my.state.start('GameSlot', false, false, "pharaoh", my._userData,my.gameSlotGroup);
        ////my.state.start('GameSlot', false, false, "deepblue", my._userData, my.gameSlotGroup);
        //return;


        // 2016-07-27: Phuoc: fix lỗi khi login facebook từ trong lobby
        FacebookController.init(function () {
        });

        var list = document.getElementsByTagName("canvas");
        if (Lobby.Utils.objectNotNull(list) &&
            list.length > 0) {
            var canvasGame = list[0];
            canvasGame.addEventListener("webglcontextlost", function (event) {
                Lobby.Utils.reloadGame();
            }, false);
        }


        my.game.renderer.renderSession.roundPixels = true;

        // set scale options
        my.input.maxPointers = 5;
        my.maxParallelDownloads = 100;

        my.fullScreen();

        my.forceResumeGame();

        //my.resizeGame(my.game);

        ResourceLoader.init(my);

        if(!LobbyConfig.enableLoginHtml){
            my.game.state.start(
                "Login",
                true, // clearWorld
                false // clearCache
            );
        }else{
            my.game.state.start(
                "BlankScene",
                true, // clearWorld
                false // clearCache
            );
        }

    };
    /**
     * Scale game for fitting device
     */
    my.fullScreen = function () {

        //center screen
        my.scale.scaleMode = Phaser.ScaleManager.SHOW_ALL;
        //my.scale.setScreenSize();
        my.scale.pageAlignVertically = true;
        my.scale.pageAlignHorizontally = true;
        my.scale.setShowAll();
        my.scale.refresh();


        //fullscreen
        if (Lobby.Utils.is3x4Device()) {
            my.scale.scaleMode = Phaser.ScaleManager.EXACT_FIT;
        }

    };
    /**
     * Deprecated
     * @param game
     */
    my.resizeGame = function (game) {
        //var height = $(window).height();
        //var width = $(window).width();
        //Lobby.Utils.printConsoleLog(game.width);
        //game.width = width;
        //game.height = height;
        //Lobby.Utils.printConsoleLog(game.width);
        //if (game.renderType === Phaser.WEBGL) {
        //    game.renderer.resize(width, height);
        //}
    };
    return my;
}(LobbyC.Boot || {}));
