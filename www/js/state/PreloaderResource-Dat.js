LobbyC.Preloader = (function (my) {
    /**
     * Load aimation resource
     */
    my.loadAnimationResource = function () {
        my.load.spritesheet(
            'coin-rotation', 'img/animation/coin-animation.png', 49, 49, 12
        );
    };
    /**
     * Load come back bonus resource
     */
    my.loadDailyBonusStreakResource = function () {
        //my.load.image(
        //    'daily_bonus_streak_demo',
        //    'img/popup/daily_bonus_streak/daily_bonus_streak_demo.png' + LobbyConfig.resourceVersion
        //);
        my.load.image(
            'daily_bonus_streak_bg',
            'img/popup/daily_bonus_streak/daily_bonus_streak_bg.png' + LobbyConfig.resourceVersion
        );
        my.load.image(
            'daily_bonus_streak_logo',
            'img/popup/daily_bonus_streak/daily_bonus_streak_logo.png' + LobbyConfig.resourceVersion
        );
        my.load.image(
            'day_item_bg',
            'img/popup/daily_bonus_streak/day_item_bg.png' + LobbyConfig.resourceVersion
        );
        my.load.image(
            'day_item_bg_not_pass',
            'img/popup/daily_bonus_streak/day_item_bg_not_pass.png' + LobbyConfig.resourceVersion
        );
        my.load.image(
            'day_item_coin_1',
            'img/popup/daily_bonus_streak/day_item_coin_1.png' + LobbyConfig.resourceVersion
        );
        my.load.image(
            'day_item_coin_2',
            'img/popup/daily_bonus_streak/day_item_coin_2.png' + LobbyConfig.resourceVersion
        );
        my.load.image(
            'day_item_coin_3',
            'img/popup/daily_bonus_streak/day_item_coin_3.png' + LobbyConfig.resourceVersion
        );
        my.load.image(
            'day_item_coin_4',
            'img/popup/daily_bonus_streak/day_item_coin_4.png' + LobbyConfig.resourceVersion
        );
        my.load.image(
            'day_item_coin_5',
            'img/popup/daily_bonus_streak/day_item_coin_5.png' + LobbyConfig.resourceVersion
        );
        my.load.image(
            'day_item_coin_1_not_pass',
            'img/popup/daily_bonus_streak/day_item_coin_1_not_pass.png' + LobbyConfig.resourceVersion
        );
        my.load.image(
            'day_item_coin_2_not_pass',
            'img/popup/daily_bonus_streak/day_item_coin_2_not_pass.png' + LobbyConfig.resourceVersion
        );
        my.load.image(
            'day_item_coin_3_not_pass',
            'img/popup/daily_bonus_streak/day_item_coin_3_not_pass.png' + LobbyConfig.resourceVersion
        );
        my.load.image(
            'day_item_coin_4_not_pass',
            'img/popup/daily_bonus_streak/day_item_coin_4_not_pass.png' + LobbyConfig.resourceVersion
        );
        my.load.image(
            'day_item_coin_5_not_pass',
            'img/popup/daily_bonus_streak/day_item_coin_5_not_pass.png' + LobbyConfig.resourceVersion
        );
        my.load.image(
            'day_item_check',
            'img/popup/daily_bonus_streak/day_item_check.png' + LobbyConfig.resourceVersion
        );
        my.load.image(
            'day_item_shiny',
            'img/popup/daily_bonus_streak/day_item_shiny.png' + LobbyConfig.resourceVersion
        );
        my.load.image(
            'day_item_streak_red',
            'img/popup/daily_bonus_streak/day_item_streak_red.png' + LobbyConfig.resourceVersion
        );
        my.load.spritesheet(
            'day_item_pass_day',
            'img/popup/daily_bonus_streak/pass_day_anim.png' + LobbyConfig.resourceVersion, 106.5, 105
        );
        for (var i = 0; i <= 90; i++) {
            var id = "";
            if(i < 10){
                id += "0" + i;
            }else{
                id += i;
            }
            my.load.image(
                'daily_bonus_streak_title_anim_' + i,
                'img/popup/daily_bonus_streak/star_anim/title' + id + '.png?' + LobbyConfig.versionDisplay);
        }
    };

    return my;
}(LobbyC.Preloader || {}));
