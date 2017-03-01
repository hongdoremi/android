LobbyC.Preloader = (function (my) {
    /**
     * Load main Body Lobby images
     */
    my.loadMainBodyResources = function(){
        my.load.image('background_popup', 'img/body/main/background-popup.png' + LobbyConfig.resourceVersion);
        //my.load.image('slots-icon', 'img/body/main/slots.png' + LobbyConfig.resourceVersion);
        //my.load.image('table-game-icon', 'img/body/main/table-game.png' + LobbyConfig.resourceVersion);
        //my.load.image('texas-mahjong-icon', 'img/body/main/texas-mahjong.png' + LobbyConfig.resourceVersion);
        //my.load.image('black-jack-icon', 'img/body/main/table/black-jack.png' + LobbyConfig.resourceVersion);
        //my.load.image('jack-and-better-icon', 'img/body/main/table/jack-and-better.png' + LobbyConfig.resourceVersion);
        //my.load.image('empty-table-icon', 'img/body/main/table/empty.png' + LobbyConfig.resourceVersion);

        my.loadSlotsGameResource();
        my.loadFriendPopupResource();
    };
    /**
     * Load slot games's image and some UI for body
     */
    my.loadSlotsGameResource = function(){
        for(var i = 40 ; i <= 55; i++){
            if(i==54){
                continue;
            }
            my.load.image('gameSlot_' + i, 'img/body/slotGameIcon/WebGame/' + i + ".png" + LobbyConfig.resourceVersion);
        }
        my.load.image('btn_download', 'img/body/btn_download.png' + LobbyConfig.resourceVersion);
        my.load.image('progress_bg', 'img/body/progress_bg.png' + LobbyConfig.resourceVersion);
        my.load.image('slider_bar', 'img/body/slider_bar.png' + LobbyConfig.resourceVersion);
        my.load.image('slider_bar_bg', 'img/body/slider_bar_bg.png' + LobbyConfig.resourceVersion);
        my.load.image('frame_slot', 'img/body/slotGameIcon/circle-Slot.png' + LobbyConfig.resourceVersion);
        my.load.image('lock_icon', 'img/body/slotGameIcon/lock_icon.png' + LobbyConfig.resourceVersion);

        my.load.image('right_arrow', 'img/body/right.png' + LobbyConfig.resourceVersion);

        my.load.atlas('dot',
            'img/body/dot.png' + LobbyConfig.resourceVersion,
            'img/body/dot.json' + LobbyConfig.resourceVersion);
    };
    /**
     * Load popup friend's images
     */
    my.loadFriendPopupResource = function(){
        my.load.image('background_inside_popup', 'img/popup/background-inside-popup.png' + LobbyConfig.resourceVersion);

        my.load.image('toggle_off_friend', 'img/popup/friends/toggle-off-friend.png' + LobbyConfig.resourceVersion);
        my.load.image('toggle_on_friend', 'img/popup/friends/toggle-on-friend.png' + LobbyConfig.resourceVersion);
        my.load.image('inbox_border', 'img/popup/friends/inbox-border.png' + LobbyConfig.resourceVersion);
        my.load.image('leader_board_border', 'img/popup/friends/leaderboard-border.png' + LobbyConfig.resourceVersion);
        my.load.image('inbox_voucher_icon', 'img/popup/friends/inbox-voucher-icon.png' + LobbyConfig.resourceVersion);
        my.load.image('leader_board_switch_btn_left', 'img/popup/friends/leaderboard-switch-button-left.png' + LobbyConfig.resourceVersion)
        my.load.image('leader_board_switch_btn_right', 'img/popup/friends/leaderboard-switch-button-right.png' + LobbyConfig.resourceVersion)
        //my.load.image('btn-send-gift', 'img/popup/friends/btn_send_gift.png' + LobbyConfig.resourceVersion);
        //my.load.image('btn-invite', 'img/popup/friends/btn_invite.png' + LobbyConfig.resourceVersion);

        //my.load.image('btn-accept-all', 'img/popup/friends/btn-accept-all.png' + LobbyConfig.resourceVersion);

        my.load.image('info_icon', 'img/popup/info_icon.png' + LobbyConfig.resourceVersion);

        my.load.atlas('btn-category',
            'img/popup/friends/btn-category.png' + LobbyConfig.resourceVersion,
            'img/popup/friends/btn-category.json' + LobbyConfig.resourceVersion);
    };
    return my;
}(LobbyC.Preloader || {}));
