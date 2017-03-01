LobbyC.MainMenu = (function (my) {
    var isDebug = LobbyConfig.isDebug;

    my._userCoinText = null;

    my._v5InboxBtn = null;

    my._numberOfInboxMessage = null;
    my._inboxMessageIndicatorBackground = null;

    my.currentLanguageFlagKeyNumber = null;

    my.arrayLanguageISOCodeForGame = [
        "en-us",
        "vi-vn",
        "zh-cn",
        "zh-cn",
        "en-us",
        "id-id"
    ];

    my.arrayLanguageISOCode = [
        "en-US",
        "vi-VN",
        "zh-CN",
        "zh-TW",
        "ms-MY",
        "id-ID"
    ];

    my.arrayLanguageLabel = [
        "English",
        "Tiếng Việt",
        "简体",
        "繁體",
        "B-Malay",
        "B-Indonesia"
    ];

    my._headerMask = null;

    my._hideVip = false;

    my._isInGame = false;

    my.recentWinnerBarGroupHide = null;
    my.recentWinnerBarGroupItemHide = null;
    my.recentWinnerBarGroupShow = null;
    my.recentWinnerBarGroupItemShow = null;
    my.recentWinnerBarGroupAnimationDuration = 300;
    my.recentWinnerBarGroupIsVisible = true;

    /**
     * Show recent winner Popup
     */
    my.showRecentWinnerGroup = function () {
        if (!my.recentWinnerBarGroupIsVisible) {
            Lobby.Utils.printConsoleLog("Show recent winner bar ");
            my.recentWinnerBarGroupShow.start();
            my.recentWinnerBarGroupItemShow.start();
            my.recentWinnerBarGroupIsVisible = true;
            my.uiHeader.groupNotificationHeader.visible = true;
        }
    };
    /**
     * Hide recent winner Popup
     */
    my.hideRecentWinnerGroup = function () {
        if (my.recentWinnerBarGroupIsVisible && my.canDisableGame) {
            Lobby.Utils.printConsoleLog("Hide recent winner bar ");
            //my.recentWinnerBarGroupHide.start();
            //my.recentWinnerBarGroupItemHide.start();
            //my.recentWinnerBarGroupIsVisible = false;
            //my.uiHeader.groupNotificationHeader.visible = false;
        }
    };
    /**
     * Deprecated
     * @param x
     * @param y
     * @param tooltipText
     * @param tooltipTextStyle
     * @param parentGroup
     * @returns {*}
     */
    my.createToolTip = function (x, y, tooltipText, tooltipTextStyle, parentGroup) {
        var group = my.add.group();
        parentGroup.add(group);
        group.background = my.add.sprite(x, y, "header-tooltip-background", null, group);
        group.tooltip = my.add.text(x, y, tooltipText, tooltipTextStyle, group);
        return group;
    };
    /**
     * Deprecated
     */
    my.decreaseNumberOfInboxMessageText = function () {
        var numberOfInbox = 0;
        try {
            numberOfInbox = parseInt(my._numberOfInboxMessage.text);
            --numberOfInbox;
            my._numberOfInboxMessage.text = numberOfInbox;
        } catch (ex) {
            Lobby.Utils.printConsoleLog(ex);
        }
        my.alignNumberOfInboxMessageText(numberOfInbox);
    };
    /**
     * Deprecated
     */
    my.setNumberOfInboxMessageText = function (numberOfInbox) {
        my._numberOfInboxMessage.text = numberOfInbox;
        my.alignNumberOfInboxMessageText(numberOfInbox);
    };
    /**
     * Deprecated
     */
    my.alignNumberOfInboxMessageText = function (numberOfInbox) {
        if (numberOfInbox <= 0) {
            my._numberOfInboxMessage.alpha = 0;
            my._inboxMessageIndicatorBackground.alpha = 0;
        } else {
            my._numberOfInboxMessage.alpha = 1;
            my._inboxMessageIndicatorBackground.alpha = 1;
        }
        if (numberOfInbox > 9) {
            my._inboxMessageIndicatorBackground.scale.x = 1.2;
        }
        Lobby.PhaserJS.centerX(my._numberOfInboxMessage, my._inboxMessageIndicatorBackground.width);
        my._numberOfInboxMessage.x += my._inboxMessageIndicatorBackground.x;

    };

    return my;

}(LobbyC.MainMenu || {}));
