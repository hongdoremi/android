LobbyC.Preloader = (function (my) {
    /**
     * Load popup unlock game's images
     */
    my.loadPopupUnlockGameResource = function () {
        my.load.image('popup_unlock_game_bg', 'img/popup/unlock-game/popup-unlock-game-bg.png' + LobbyConfig.resourceVersion);
        //my.load.image('popup_unlock_game_light_ray', 'img/popup/unlock-game/light-ray.png' + LobbyConfig.resourceVersion);
        my.load.image('popup_unlock_game_title', 'img/popup/unlock-game/popup-unlock-game-title.png' + LobbyConfig.resourceVersion);
        my.load.image('popup_unlock_game_lock', 'img/popup/unlock-game/popup-unlock-game-lock.png' + LobbyConfig.resourceVersion);

    };
    /**
     * Load custom animation's resources
     */
    my.loadCustomAnimation = function () {
        my.load.atlas('body-slotgame-crown-animation', 'img/body/slotGameIcon/body-slotgame-crown-animation.jpg'
            + LobbyConfig.resourceVersion, 'img/body/slotGameIcon/body-slotgame-crown-animation.json'
            + LobbyConfig.resourceVersion, Phaser.Loader.TEXTURE_ATLAS_JSON_ARRAY);
        //my.load.atlas('header-button-circle-onclink', 'img/new header/header-button-circle-onclick.jpg'
        //    + LobbyConfig.resourceVersion, 'img/new header/header-button-circle-onclick.json'
        //    + LobbyConfig.resourceVersion, Phaser.Loader.TEXTURE_ATLAS_JSON_ARRAY);
        my.load.image('header_button_circle_onclink', 'img/new header/header-animation.jpg' + LobbyConfig.resourceVersion);
        my.load.atlas('body-slotgame-star-animation-on-crown', 'img/body/slotGameIcon/body-slot-game-star-animation-on-crown.jpg'
            + LobbyConfig.resourceVersion, 'img/body/slotGameIcon/body-slot-game-star-animation-on-crown.json'
            + LobbyConfig.resourceVersion, Phaser.Loader.TEXTURE_ATLAS_JSON_ARRAY);

    };
    /**
     * Load popup's button image
     */
    my.loadPopupButton = function(){
        my.load.image('btn_close_popup', 'img/popup button/btn_close.png' + LobbyConfig.resourceVersion);
        my.load.image('btn-green-popup', 'img/popup button/btn_green.png' + LobbyConfig.resourceVersion);
        my.load.image('btn-purple-popup', 'img/popup button/btn_purple.png' + LobbyConfig.resourceVersion);
    };


    return my;
}(LobbyC.Preloader || {}));
