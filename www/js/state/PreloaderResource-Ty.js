LobbyC.Preloader = (function (my) {
    /**
     * Load popup setting resource, deprecated, using popup HTML now
     */
    my.loadResourcesPopupSettings = function () {
        my.load.image(
            'popup-setting-btn-logout',
            'img/popup/setting/logout.png' + LobbyConfig.resourceVersion
        );
        my.load.image(
            'popup-setting-btn-term-of-service',
            'img/popup/setting/term_of_service_background.png' + LobbyConfig.resourceVersion
        );
        my.load.image(
            'popup-setting-btn-privacy-policy',
            'img/popup/setting/privacy_policy_background.png' + LobbyConfig.resourceVersion
        );
        my.load.image(
            'popup_setting_box_language',
            'img/popup/setting/issue_type.png' + LobbyConfig.resourceVersion
        );

        my.load.atlas('popup-setting-btn-on-off',
            'img/popup/setting/btn-on-off.png' + LobbyConfig.resourceVersion,
            'img/popup/setting/btn-on-off.json' + LobbyConfig.resourceVersion);
    };
    /**
     * Load new header resource
     */
    my.loadNewHeaderResource = function () {
        my.load.image('circleMask100', 'img/new header/circleMask100.png' + LobbyConfig.resourceVersion);
        my.load.image('circleMask255', 'img/new header/circleMask255.png' + LobbyConfig.resourceVersion);
        my.load.image('circleMask320', 'img/new header/circleMask320.png' + LobbyConfig.resourceVersion);

        my.load.image(
            'new_header_buy_coin_background',
            'img/new header/bg-buy-coin.png' + LobbyConfig.resourceVersion
        );
        my.load.image(
            'new_header_buy_crown_background',
            'img/new header/bg-buy-crown.png' + LobbyConfig.resourceVersion
        );
        my.load.image(
            'new-header-btn-buy',
            'img/new header/btn-buy.png' + LobbyConfig.resourceVersion
        );
        my.load.image(
            'new_header_btn_friend',
            'img/new header/friend.png' + LobbyConfig.resourceVersion
        );
        my.load.image(
            'new_header_btn_info',
            'img/new header/info.png' + LobbyConfig.resourceVersion
        );

        my.load.image(
            'new_header_level_background',
            'img/new header/level.png' + LobbyConfig.resourceVersion
        );
        my.load.image(
            'new_header_level_mask',
            'img/new header/level_mask.png' + LobbyConfig.resourceVersion
        );
        my.load.image(
            'new_header_btn_setting',
            'img/new header/setting.png' + LobbyConfig.resourceVersion
        );
        my.load.image(
            'new_header_start_for_level_and_vip',
            'img/new header/star_for_level_and_vip_header.png' + LobbyConfig.resourceVersion
        );

        my.load.image(
            'new_header_back_btn',
            'img/new header/home.png' + LobbyConfig.resourceVersion
        );

        my.load.image(
            'popup_setting_background',
            'img/popup/setting/background-option.png' + LobbyConfig.resourceVersion
        );

        my.load.image(
            'pixel_white',
            'img/popup/spin/pixel_white.png' + LobbyConfig.resourceVersion
        );

        my.load.image(
            'spin-star-yellow',
            'img/popup/spin/star1.jpg' + LobbyConfig.resourceVersion
        );

        my.load.image(
            'spin-star-white',
            'img/popup/spin/starWhileLens.jpg' + LobbyConfig.resourceVersion
        );
    };

    return my;
}(LobbyC.Preloader || {}));
