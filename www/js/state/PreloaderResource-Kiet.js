LobbyC.Preloader = (function (my) {
    /**
     * Load come back bonus resource
     */
    my.loadComebackBonusResource = function () {
        my.load.image(
            'popup_comeback_bonus_background',
            'img/popup/comeback-bonus/comeback_bonus_bg.png' + LobbyConfig.resourceVersion
        );
    };
    /**
     * Load popup shop resource
     */
    my.loadPopUpShopResource = function () {
        my.load.image('popup_shop_background', 'img/popup/shop/background-shop.png' + LobbyConfig.resourceVersion);

        my.load.image('popup_shop_panel_item', 'img/popup/shop/panel_item.png' + LobbyConfig.resourceVersion);

        my.load.image('popup_shop_coins_1', 'img/popup/shop/shop_coins_1.png' + LobbyConfig.resourceVersion);

        my.load.image('popup_shop_coins_2', 'img/popup/shop/shop_coins_2.png' + LobbyConfig.resourceVersion);

        my.load.image('popup_shop_coins_3', 'img/popup/shop/shop_coins_3.png' + LobbyConfig.resourceVersion);

        my.load.image('popup_shop_crown_1', 'img/popup/shop/shop_crown_1.png' + LobbyConfig.resourceVersion);

        my.load.image('popup_shop_crown_2', 'img/popup/shop/shop_crowns_2.png' + LobbyConfig.resourceVersion);

        my.load.image('popup_shop_crown_3', 'img/popup/shop/shop_crowns_3.png' + LobbyConfig.resourceVersion);

        my.load.image('popup_shop_coin_icon', 'img/popup/shop/coin_icon.png' + LobbyConfig.resourceVersion);

        my.load.image('popup-shop-crown_icon', 'img/popup/shop/crown_icon.png' + LobbyConfig.resourceVersion);

        my.load.image('popup_shop_mask_toggle', 'img/popup/shop/maskToggle.png' + LobbyConfig.resourceVersion);

        my.load.image('popup_shop_trial_pay', 'img/popup/shop/trial_Pay.png' + LobbyConfig.resourceVersion);
    };
    /**
     * Load popup info resource
     */
    my.loadPopupInfoResource = function () {
        my.load.image('popup_info_background', 'img/popup/info/background-info-gameslots.png' + LobbyConfig.resourceVersion);
        my.load.image('popup_info_background_change_totalbet', 'img/popup/info/backgroundChangeBet.png' + LobbyConfig.resourceVersion);
        my.load.image('popup_info_decrease_button', 'img/popup/info/decreaseButton.png' + LobbyConfig.resourceVersion);
    };
    /**
     * Load popup mega win resource
     */
    my.loadPopupMegawinResource = function () {
        my.load.image('win_title', 'img/popup/mega-win/winText.png' + LobbyConfig.resourceVersion);
        my.load.image('mega_title', 'img/popup/mega-win/megaText.png' + LobbyConfig.resourceVersion);
        my.load.image('star-under-megawin-0', 'img/popup/mega-win/StarUnder/starUnder1.png' + LobbyConfig.resourceVersion);
        my.load.image('star-under-megawin-1', 'img/popup/mega-win/StarUnder/starUnder2.png' + LobbyConfig.resourceVersion);
        my.load.image('star-under-megawin-2', 'img/popup/mega-win/StarUnder/starUnder3.png' + LobbyConfig.resourceVersion);
        my.load.image('star-under-megawin-3', 'img/popup/mega-win/StarUnder/starUnder4.png' + LobbyConfig.resourceVersion);
        my.load.image('star-under-megawin-4', 'img/popup/mega-win/StarUnder/starUnder5.png' + LobbyConfig.resourceVersion);
        my.load.image('star-under-megawin-5', 'img/popup/mega-win/StarUnder/starUnder6.png' + LobbyConfig.resourceVersion);

        my.load.image('star-up-megawin-0', 'img/popup/mega-win/StarUp/starUp1.png' + LobbyConfig.resourceVersion);
        my.load.image('star-up-megawin-1', 'img/popup/mega-win/StarUp/starUp2.png' + LobbyConfig.resourceVersion);
        my.load.image('star-up-megawin-2', 'img/popup/mega-win/StarUp/starUp3.png' + LobbyConfig.resourceVersion);
        my.load.image('star-up-megawin-3', 'img/popup/mega-win/StarUp/starUp4.png' + LobbyConfig.resourceVersion);
        my.load.image('star-up-megawin-4', 'img/popup/mega-win/StarUp/starUp5.png' + LobbyConfig.resourceVersion);
        my.load.image('star-up-megawin-5', 'img/popup/mega-win/StarUp/starUp6.png' + LobbyConfig.resourceVersion);
    };
    /**
     * Load popup bigwin resource
     */
    my.loadPopupBigwinResource = function () {
        my.load.image('bigwin_title', 'img/popup/big-win/bigwin.png' + LobbyConfig.resourceVersion);
        my.load.image('starts_bigwin', 'img/popup/big-win/stars.png' + LobbyConfig.resourceVersion);
        my.load.image('star-bigwin-0', 'img/popup/big-win/1.png' + LobbyConfig.resourceVersion);
        my.load.image('star-bigwin-1', 'img/popup/big-win/2.png' + LobbyConfig.resourceVersion);
        my.load.image('star-bigwin-2', 'img/popup/big-win/3.png' + LobbyConfig.resourceVersion);
        my.load.image('star-bigwin-3', 'img/popup/big-win/4.png' + LobbyConfig.resourceVersion);
        my.load.image('star-bigwin-4', 'img/popup/big-win/5.png' + LobbyConfig.resourceVersion);
        my.load.image('star-bigwin-5', 'img/popup/big-win/6.png' + LobbyConfig.resourceVersion);

        my.load.bitmapFont('popup-bigwin-bmp', 'img/popup/big-win/export-export.png' + LobbyConfig.resourceVersion, 'img/popup/big-win/export-export.xml' + LobbyConfig.resourceVersion);
    };
    /**
     * Load tutorial resource
     */
    my.loadTutorialResource = function () {
        my.load.image(
            'collect-welcomeScene',
            'img/general icon/collect.png' + LobbyConfig.resourceVersion
        );

        my.load.image(
            'arrow_tutorial',
            'img/general icon/arrowTutorial.png' + LobbyConfig.resourceVersion
        );
    };
    /**
     * Load popup special offer resource
     */
    my.loadPopupSpecialOfferResource = function () {
        my.load.image('popup_special_offer_background', 'img/popup/special-offer/PromotionBG.png' + LobbyConfig.resourceVersion);
    };

    return my;
}(LobbyC.Preloader || {}));
