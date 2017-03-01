LobbyC.Preloader = (function (my) {

    my.loadingAnimation = function () {
        my._loadingTextValue = LobbyLanguageConstant.LOADING_SCENE_MESSAGE_1;
    };


    my.loadPopupSpin = function () {
        my.load.atlas('btn-spin',
            'img/popup/spin/btn_spin.png' + LobbyConfig.resourceVersion,
            'img/popup/spin/btn_spin.json' + LobbyConfig.resourceVersion);

        my.load.image('spin_bg', 'img/popup/spin/bg_spin.png' + LobbyConfig.resourceVersion);
        my.load.image('spin_round_inner', 'img/popup/spin/spin_round_inner.png' + LobbyConfig.resourceVersion);

        my.load.image('spin_round_outer_active',
            'img/popup/spin/spin_round_outer_active.png' + LobbyConfig.resourceVersion);
        my.load.image('spin_v_light_active', 'img/popup/spin/spin_active_v_light.png' + LobbyConfig.resourceVersion);

        my.load.atlas('spin-star-active',
            'img/popup/spin/spin_star_active.png' + LobbyConfig.resourceVersion,
            'img/popup/spin/spin_star_active.json' + LobbyConfig.resourceVersion);


        my.load.atlas('spin-bulb-active',
            'img/popup/spin/spin_bulb_active.png' + LobbyConfig.resourceVersion,
            'img/popup/spin/spin_bulb_active.json' + LobbyConfig.resourceVersion);


        my.load.image('spin_gear', 'img/popup/spin/spin_icon_gear.png' + LobbyConfig.resourceVersion);
        my.load.image('spin-dot', 'img/popup/spin/bg_spin_dot.png' + LobbyConfig.resourceVersion);

        my.load.image('spin_popup_bg', 'img/popup/spin/bg_popup_spin.png' + LobbyConfig.resourceVersion);
        my.load.image('dailyspin-coin', 'img/popup/spin/dailyspin-coin.png' + LobbyConfig.resourceVersion);
    };

    my.loadBodyResource = function () {
        my.load.image('background_red', 'img/body/background_high.jpg' + LobbyConfig.resourceVersion);

        //my.load.atlas('body-starter-pack-banner',
        //    'img/body/starter_pack_banner.png' + LobbyConfig.resourceVersion,
        //    'img/body/starter_pack_banner.json' + LobbyConfig.resourceVersion);
        my.load.spritesheet(
            'popup-loading-icon', 'img/popup/loading-icon.png', 150, 150
        );
        my.load.image(
            'popup-transparent-layer',
            'img/popup/transparent-layer.png' + LobbyConfig.resourceVersion
        );
        my.load.image(
            'popup-dark-layer',
            'img/popup/dark-layer.png' + LobbyConfig.resourceVersion
        );
        my.load.image(
            'body_model',
            'img/body/model.png' + LobbyConfig.resourceVersion
        );
        my.load.image(
            'body_model_mask',
            'img/body/mask-BG.jpg' + LobbyConfig.resourceVersion
        );
    };

    
    my.loadPopUpResource = function () {
        my.load.image(
            'popup-mini-scroll',
            'img/popup/mini-scroll.png' + LobbyConfig.resourceVersion
        );
        //load popup click vao moi hien
        my.loadPopupUnlockFeatureResource();
        my.loadPopUpProfileResource();
        my.loadPopUpShopResource();
        my.loadPopupInfoResource();
        my.loadTutorialResource();
        my.loadPopupSpecialOfferResource();
        my.loadPopupMegawinResource();
        my.loadPopupBigwinResource();
        my.loadPopUpInboxResource();
        my.loadResourcesPopupSettings();
        my.loadPopupNotificationResource();
        my.loadPopupChangeName();
        my.loadPopUpAchievementResource();

        my.loadHeaderAnimation();

        my.loadSoundResource();

        my.loadPopUpStardomResource();

        my.loadPopupButton();
        //Dat
        my.loadAnimationResource();

        // popup co resource co the load sau: comeback-bonus, level-up, recent-winner, spin, starter-pack,
        // get more coins, f2p, p2p, unlock-game
        my.loadComebackBonusResource();
        my.loadPopupLevelUpResource();
        my.loadRecentWinnerResource();
        my.loadPopupSpin();
        my.loadPopupUnlockGameResource();
        my.loadDailyBonusStreakResource();


    };
    /**
     * Load sound resource
     */
    my.loadSoundResource = function () {
        //my.load.audio('coin-drop-sound', 'sound/coin-drop.mp3');
        //my.load.audio('popup-sound', 'sound/popup.mp3');
        //my.load.audio('spin-sound', 'sound/spin-sound.mp3');
        //my.load.audio('sound-hover-game-lobby', 'sound/sound_hover_game_lobby.mp3');
        //my.load.audio('mini-background-music', 'sound/mini-background.mp3');
        //my.load.audio('increase-coin-text', 'sound/TotalWin.mp3');
        //my.load.audio('animation-receive-coin', 'sound/animationCoinReceive.mp3');
        //my.load.audio('coin-crown-purchase', 'sound/coinCrownPurchase.mp3');
        ManagerForSound.loadSound(my, 'coin-drop-sound', 'sound/coin-drop.mp3');
        ManagerForSound.loadSound(my, 'popup-sound', 'sound/popup.mp3');
        ManagerForSound.loadSound(my, 'spin-sound', 'sound/spin-sound.mp3');
        ManagerForSound.loadSound(my, 'sound-hover-game-lobby', 'sound/sound_hover_game_lobby.mp3');
        ManagerForSound.loadSound(my, 'background-music', 'sound/background.mp3');
        ManagerForSound.loadSound(my, 'increase-coin-text', 'sound/TotalWin.mp3');
        ManagerForSound.loadSound(my, 'decrease-coin-text', 'sound/failedCoin.mp3');
        ManagerForSound.loadSound(my, 'animation-receive-coin', 'sound/animationCoinReceive.mp3');
        ManagerForSound.loadSound(my, 'coin-crown-purchase', 'sound/coinCrownPurchase.mp3');
        ManagerForSound.loadSound(my, 'mega-big-win-sound', 'sound/megaBigWin_creditToLittlerobotsoundfactory.wav');
    };

    /**
     * Profile resource
     */
    my.loadPopUpProfileResource = function () {
        my.load.image('popup_profile_background', 'img/popup/profile/background-profile.png' + LobbyConfig.resourceVersion);
        my.load.image('popup_profile_take_photo', 'img/popup/profile/btn_takephoto.png' + LobbyConfig.resourceVersion);
        my.load.image('popup_profile_edit_name', 'img/popup/profile/btn_username.png' + LobbyConfig.resourceVersion);

        my.load.image('popup_profile_profile_avatar',
            'img/popup/profile/profile-avatar.png' + LobbyConfig.resourceVersion);

        my.load.image('popup_profile_facebook_icon', 'img/popup/profile/facebook_icon.png' + LobbyConfig.resourceVersion);

        //my.load.image('btn-close-new', 'img/popup/profile/btn_close.png' + LobbyConfig.resourceVersion);
        my.load.image('crown-vip-border', 'img/general icon/crown-Slot.png' + LobbyConfig.resourceVersion);
    };
    /**
     * Load popup stardom resource
     */
    my.loadPopUpStardomResource = function () {
        my.load.image('popup_stardom_1',
            'img/popup/stardom/1.png' + LobbyConfig.resourceVersion);
        my.load.image('popup_stardom_2',
            'img/popup/stardom/2.png' + LobbyConfig.resourceVersion);
        my.load.image('popup_stardom_3',
            'img/popup/stardom/3.png' + LobbyConfig.resourceVersion);
    };
    /**
     * Load popup Inbox resource
     */
    my.loadPopUpInboxResource = function () {
        my.load.image(
            'popup_inbox_admin_avatar',
            'img/popup/inbox/admin_avatar.png' + LobbyConfig.resourceVersion);
        //my.load.image(
        //    'popup-inbox-avatar',
        //    'img/general icon/avatar.png' + LobbyConfig.resourceVersion);
        //my.load.image(
        //    'popup-inbox-free-gift-icon',
        //    'img/popup/inbox/gift_icon.png' + LobbyConfig.resourceVersion);
        //my.load.image(
        //    'popup-inbox-gift-icon',
        //    'img/popup/inbox/coin_icon.png' + LobbyConfig.resourceVersion);
        //my.load.image(
        //    'popup-inbox-key-icon',
        //    'img/popup/inbox/key_icon.png' + LobbyConfig.resourceVersion);
        my.load.image(
            'popup_inbox_scrollbar',
            'img/popup/inbox/scrollbar.png' + LobbyConfig.resourceVersion);
        my.load.image(
            'popup-inbox-scrollButton',
            'img/popup/inbox/scrollbarselect.png' + LobbyConfig.resourceVersion);
    };
    /**
     * Load popup notification resource
     */
    my.loadPopupNotificationResource = function () {
        my.load.image(
            'popup_notification_background',
            'img/popup/notification/congrat_bg_small.png' + LobbyConfig.resourceVersion
        );
        //my.load.atlas(
        //    'popup-notification-btn-ok',
        //    'img/popup/notification/btn_ok.png' + LobbyConfig.resourceVersion,
        //    'img/popup/notification/btn_ok.json' + LobbyConfig.resourceVersion
        //);
        //my.load.image(
        //    'popup-notification-btn-cancel',
        //    'img/popup/notification/btn_cancel.png' + LobbyConfig.resourceVersion
        //);
        //my.load.image(
        //    'popup-notification-btn-go-to-shop',
        //    'img/popup/notification/btn_go_to_shop.png' + LobbyConfig.resourceVersion
        //);
        //my.load.image(
        //    'popup-notification-btn-go-to-lobby',
        //    'img/popup/notification/btn_go_to_lobby.png' + LobbyConfig.resourceVersion
        //);
    };

    return my;
}(LobbyC.Preloader || {}));
