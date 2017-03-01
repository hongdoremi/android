LobbyC.Preloader = (function (my) {

    /**
     * Load Popup achievement's images
     */
    my.loadPopUpAchievementResource = function () {
        //my.load.image('popup-achievement-background', 'img/popup/achievement/background.png' + LobbyConfig.resourceVersion);
        my.load.image('popup_achievement_bg_category', 'img/popup/achievement/bg-category.png' + LobbyConfig.resourceVersion);
        my.load.image('popup-achievement-bg-group-active', 'img/popup/achievement/bg-group-active.png' + LobbyConfig.resourceVersion);
        my.load.image('popup-achievement-bg-group-inactive', 'img/popup/achievement/bg-group-inactive.png' + LobbyConfig.resourceVersion);
        my.load.image('popup-achievement-bg-notification', 'img/popup/achievement/bg-notification.png' + LobbyConfig.resourceVersion);
        my.load.image('popup_achievement_bg_point', 'img/popup/achievement/bg-point.png' + LobbyConfig.resourceVersion);
        my.load.image('popup_achievement_bg_slide_collect', 'img/popup/achievement/bg-slide-collect.png' + LobbyConfig.resourceVersion);
        my.load.image('popup_achievement_btn_collect', 'img/popup/achievement/btn-collect.png' + LobbyConfig.resourceVersion);
        my.load.image('popup_achievement_facebook_avatar', 'img/popup/achievement/facebook-avatar.png' + LobbyConfig.resourceVersion);
        my.load.image('popup_achievement_icon_coin_reward', 'img/popup/achievement/icon-coin-reward.png' + LobbyConfig.resourceVersion);
        my.load.image('popup_achievement_icon_crown_reward', 'img/popup/achievement/icon-crown-reward.png' + LobbyConfig.resourceVersion);
        my.load.image('popup_achievement_star_with_color', 'img/popup/achievement/star-with-color.png' + LobbyConfig.resourceVersion);
        my.load.image('popup_achievement_star_without_color', 'img/popup/achievement/star-without-color.png' + LobbyConfig.resourceVersion);
        my.load.image('popup_achievement_slider', 'img/popup/achievement/slider.png' + LobbyConfig.resourceVersion);
        my.load.image('popup-achievement-scroll-bar', 'img/popup/achievement/scroll-bar.png' + LobbyConfig.resourceVersion);
        my.load.image('popup-achievement-scroll-button', 'img/popup/achievement/scroll-button.png' + LobbyConfig.resourceVersion);
        my.load.image('popup-achievement-bg-total-achievement-points', 'img/popup/achievement/bg-total-achievement-points.png' + LobbyConfig.resourceVersion);

        //my.load.atlas('header-logo',
        //              'img/header/v5/logo.png' + LobbyConfig.resourceVersion,
        //              'img/header/v5/logo.json' + LobbyConfig.resourceVersion);
    };
    /**
     * Load recent winner resource
     */
    my.loadRecentWinnerResource = function () {
        my.load.image('popup-recent-winner-background', 'img/popup/recent-winner/background-recent-winner.png' + LobbyConfig.resourceVersion);
    };

    return my;
}(LobbyC.Preloader || {}));
