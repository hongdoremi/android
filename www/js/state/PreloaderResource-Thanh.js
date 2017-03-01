LobbyC.Preloader = (function (my) {

    /**
     * load Popup level up's images
     */
    my.loadPopupLevelUpResource = function () {
        my.load.image('popup_levelup_collectshare_btn', 'img/popup/level-up/popup-levelup-collectshare-btn.png' + LobbyConfig.resourceVersion);
        //my.load.image('popup-levelup-collect-btn', 'img/popup/level-up/popup-levelup-collect-btn.png' + LobbyConfig.resourceVersion);
        my.load.image('popup_levelup_bg', 'img/popup/level-up/popup-levelup-bg.png' + LobbyConfig.resourceVersion);
        my.load.image('popup_levelup_lightray', 'img/popup/level-up/lightray.png' + LobbyConfig.resourceVersion);
        //my.load.image('popup-levelup-number', 'img/popup/level-up/popup-levelup-number.png' + LobbyConfig.resourceVersion);
        my.load.bitmapFont('popup-levelup-number-bmp', 'img/popup/level-up/popup-levelup-number-export.png' + LobbyConfig.resourceVersion, 'img/popup/level-up/popup-levelup-number-export.xml' + LobbyConfig.resourceVersion);

    };
    /**
     * load animation on header images
     */
    my.loadHeaderAnimation = function(){
        my.load.atlas('header-coin-animation', 'img/new header/coin-animation.jpg' + LobbyConfig.resourceVersion,'img/new header/coin-animation.json' + LobbyConfig.resourceVersion,Phaser.Loader.TEXTURE_ATLAS_JSON_ARRAY);
        //my.load.atlas('header-crown-flare-animation', 'img/animation/crown-flare-animation.png' + LobbyConfig.resourceVersion,'img/animation/crown-flare-animation.json' + LobbyConfig.resourceVersion,Phaser.Loader.TEXTURE_ATLAS_JSON_ARRAY);
        //my.load.atlas('header-crown-star-animation', 'img/animation/crown-star-animtion.png' + LobbyConfig.resourceVersion,'img/animation/crown-star-animtion.json' + LobbyConfig.resourceVersion,Phaser.Loader.TEXTURE_ATLAS_JSON_ARRAY);
    };
    /**
     * load Popup change name's images
     */
    my.loadPopupChangeName = function(){
        my.load.image('popup_changename_bg', 'img/popup/change-name/popup-changename-bg.png' + LobbyConfig.resourceVersion);
        //my.load.image('popup-confirm-btn', 'img/popup/change-name/confirm-okbutton.png' + LobbyConfig.resourceVersion);
        //my.load.image('popup-cancel-btn', 'img/popup/change-name/confirm-cancelbutton.png' + LobbyConfig.resourceVersion);
    };

    my.loadPopupUnlockFeatureResource = function(){
        my.load.image('popup_unlock_info_pay_line', 'img/popup/unlock-feature/popup-unlock-info-pay-line.png' + LobbyConfig.resourceVersion);
        my.load.image('popup_unlock_info_daily_challenge', 'img/popup/unlock-feature/popup-unlock-info-daily-challenge.png' + LobbyConfig.resourceVersion);
        my.load.image('popup_unlock_info_piggy_bank', 'img/popup/unlock-feature/popup-unlock-info-piggy-bank.png' + LobbyConfig.resourceVersion);
        my.load.image('popup_unlock_info_light_ray', 'img/popup/unlock-feature/popup-unlock-info-light-ray.png' + LobbyConfig.resourceVersion);
    };
    return my;
}(LobbyC.Preloader || {}));
