LobbyC.Preloader = (function (my) {
    /**
     * Load footer images
     */
    my.loadNewFooterResource = function (){
        my.load.image(
            'new_footer_background',
            'img/new footer/bottom-bar.png'+LobbyConfig.resourceVersion
        );

        my.load.image(
            'new-footer-time-bonus',
            'img/new footer/time_bonus.png'+LobbyConfig.resourceVersion
        );


        my.load.image(
            'new-footer-time-bonus-loading-bar',
            'img/new footer/time_bonus_loading_bar.png'+LobbyConfig.resourceVersion
        );
        //
        my.load.image(
            'new_footer_bg_notification',
            'img/new footer/bt-notification.png'+LobbyConfig.resourceVersion
        );
    };

    return my;
}(LobbyC.Preloader || {}));
