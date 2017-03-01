/**
 * Created by Duy on 11/4/2016.
 */
LobbyC.MainMenu = (function (my) {

    my.magicItem = {
        _100PercentWin: {
            name: "100% Win"
        },
        LuckySpin10: {
            name: "Lucky Spin 10%"
        },
        LuckySpin20: {
            name: "Lucky Spin 20%"
        },
        DoubleExp: {
            name: "Double EXP"
        },
        LuckySymbol: {
            name: "Lucky Symbol",
            arrayPosition: [],
            win: 0
        },
        currentWinInfo: null
    };
    /**
     * Callback after Spin when user using Magic Item
     * @param oXmlDoc
     */
    my.handleMagicItemUsed = function(oXmlDoc){
        var magicItem = oXmlDoc.getElementsByTagName('magicitem')[0];
        var magicItemType = Lobby.Utils.objectIsNull(magicItem) ? null: parseInt(magicItem.getAttribute('type'));
        if(LobbyConfig.additionalInfo.magicItem.currentActiveItem !=  LobbyConstant.MAGIC_ITEM_TYPE_DEFAULT && magicItemType != LobbyConfig.additionalInfo.magicItem.currentActiveItem){
           if(my._userData.profile.test_user == true){
               my.showNotificationPopup("Error","Sent magic item type "+ LobbyConfig.additionalInfo.magicItem.currentActiveItem  +" different with received magic item type " + magicItemType);
           }
        }
        if(magicItem==null){
            return;
        }
        my.magicItem.docXml = magicItem;

        var amount = 1;
        switch(magicItemType) {
            case LobbyConstant.MAGIC_ITEM_TYPE_LUCKY_SPIN_TYPE_1:
                break;
            case LobbyConstant.MAGIC_ITEM_TYPE_LUCKY_SPIN_TYPE_2:
                break;
            case LobbyConstant.MAGIC_ITEM_TYPE_100_PERCENT_WIN:
                break;
            case LobbyConstant.MAGIC_ITEM_TYPE_DOUBLE_EXP:
                break;
            case LobbyConstant.MAGIC_ITEM_TYPE_LUCKY_SYMBOL:
                var luckySymbolPos = [];
                var s_SymboolPos = my.magicItem.docXml.getAttribute('luckySymbolPosition');
                luckySymbolPos = s_SymboolPos.split(',');

                for (var i = 0; i < luckySymbolPos.length; ++i) {
                    my.magicItem.LuckySymbol.arrayPosition.push(parseInt(luckySymbolPos[i]));
                }
                break;
        }
        if(magicItemType != LobbyConstant.MAGIC_ITEM_TYPE_DEFAULT){
            //my.magicItem.reloadMagicItemUI();
            my.magicItem.currentWinInfo = {};
            my.magicItem.currentWinInfo.itemType = magicItemType;
            my.magicItem.currentWinInfo.amount = amount;
        }
    };
    my.showWinMagicItemAfterSpin = function(){
        if(Lobby.Utils.objectNotNull(my.magicItem.currentWinInfo)){
            switch(my.magicItem.currentWinInfo.itemType){
                case LobbyConstant.MAGIC_ITEM_TYPE_LUCKY_SPIN_TYPE_1:
                    my.showNotificationPopup("Lucky spin","You won lucky spin!" + (new XMLSerializer().serializeToString(my.magicItem.docXml)) );
                    LobbyConfig.additionalInfo.magicItem.remainItem10LuckySpin = my.magicItem.docXml.getAttribute('remainingMagicItem');
                    break;
                case LobbyConstant.MAGIC_ITEM_TYPE_LUCKY_SPIN_TYPE_2:
                    my.showNotificationPopup("Lucky spin","You won lucky spin!" + (new XMLSerializer().serializeToString(my.magicItem.docXml)) );
                    LobbyConfig.additionalInfo.magicItem.remainItem20LuckySpin = my.magicItem.docXml.getAttribute('remainingMagicItem');
                    break;
                case LobbyConstant.MAGIC_ITEM_TYPE_100_PERCENT_WIN:
                    LobbyConfig.additionalInfo.magicItem.remainItem100Win = my.magicItem.docXml.getAttribute('remainingMagicItem');
                    break;
                case LobbyConstant.MAGIC_ITEM_TYPE_DOUBLE_EXP:
                    break;
                case LobbyConstant.MAGIC_ITEM_TYPE_LUCKY_SYMBOL:
                    //numberOfLuckySymbolWin
                    my.magicItem.LuckySymbol.win = my.magicItem.docXml.getAttribute('win');
                    if(my.magicItem.LuckySymbol.win > 0) {
                        my.showNotificationPopup("Lucky symbol", "You won lucky symbol!" + (new XMLSerializer().serializeToString(my.magicItem.docXml)));
                    }
                    break;
            }
            my.magicItem.reloadMagicItemUI();
            my.magicItem.resetInfo();
        }
    };
    my.magicItem.resetInfo = function(){
        my.magicItem.currentWinInfo = null;
        my.magicItem.LuckySymbol.win = 0;
        my.magicItem.LuckySymbol.arrayPosition = [];
    };
    /**
     * Reload Magic Item Info after received from Server
     * @param info
     */
    my.magicItem.reloadInfo = function(info){
        if(Lobby.Utils.objectNotNull(info)){
            LobbyConfig.additionalInfo.magicItem = {};
            LobbyConfig.additionalInfo.magicItem.remainTimeDoubleExp = info.remaining_time_magic_item_double_exp;
            LobbyConfig.additionalInfo.magicItem.remainItem100Win = info.remaining_magic_item_100_percent_win;
            LobbyConfig.additionalInfo.magicItem.remainItem10LuckySpin = info.remaining_magic_item_lucky_spin_type_1;
            LobbyConfig.additionalInfo.magicItem.remainItem20LuckySpin = info.remaining_magic_item_lucky_spin_type_2;
            LobbyConfig.additionalInfo.magicItem.remainTimeLuckySymbol = info.remaining_time_magic_item_lucky_symbol;
        }

        // 2016-11-29: Phuoc: call method updateUI để tính currentActiveItem sau khi initSession
        /**
         * Why comment out this??
         */
        my.magicItem.updateUI();
    };
    my.magicItem.updateUI = function(){
        if(
            Lobby.Utils.objectIsNull(LobbyConfig.additionalInfo) ||
            Lobby.Utils.objectIsNull(LobbyConfig.additionalInfo.magicItem)){
            return;
        }
        LobbyConfig.additionalInfo.magicItem.currentActiveItem = LobbyConstant.MAGIC_ITEM_TYPE_DEFAULT ;
        if(LobbyConfig.additionalInfo.magicItem.remainTimeDoubleExp > 0){
            my.magicItem.DoubleExp.restart();
            LobbyConfig.additionalInfo.magicItem.currentActiveItem = LobbyConstant.MAGIC_ITEM_TYPE_DOUBLE_EXP ;
        }
        if(LobbyConfig.additionalInfo.magicItem.remainItem100Win > 0){
            LobbyConfig.additionalInfo.magicItem.currentActiveItem = LobbyConstant.MAGIC_ITEM_TYPE_100_PERCENT_WIN ;
        }
        if(LobbyConfig.additionalInfo.magicItem.remainItem10LuckySpin > 0){
            LobbyConfig.additionalInfo.magicItem.currentActiveItem = LobbyConstant.MAGIC_ITEM_TYPE_LUCKY_SPIN_TYPE_1 ;
        }
        if(LobbyConfig.additionalInfo.magicItem.remainItem20LuckySpin > 0){
            LobbyConfig.additionalInfo.magicItem.currentActiveItem = LobbyConstant.MAGIC_ITEM_TYPE_LUCKY_SPIN_TYPE_2 ;
        }
        if(LobbyConfig.additionalInfo.magicItem.remainTimeLuckySymbol > 0){
            my.magicItem.LuckySymbol.restart();
            LobbyConfig.additionalInfo.magicItem.currentActiveItem = LobbyConstant.MAGIC_ITEM_TYPE_LUCKY_SYMBOL ;
        }
    };
    /**
     * Set Position for magic item - Using for Debug
     */
    my.magicItem.setPosDebug = function(){
        if(my.magicItem._100PercentWin.group){
            my.magicItem._100PercentWin.group.x = 50;
            my.magicItem._100PercentWin.group.y = 700;
        }
        if(my.magicItem.LuckySpin10.group){
            my.magicItem.LuckySpin10.group.x = 400;
            my.magicItem.LuckySpin10.group.y = 700;
        }
        if(my.magicItem.LuckySpin20.group){
            my.magicItem.LuckySpin20.group.x = 750;
            my.magicItem.LuckySpin20.group.y = 700;
        }
        if(my.magicItem.LuckySymbol.group){
            my.magicItem.LuckySymbol.group.x = 1100;
            my.magicItem.LuckySymbol.group.y = 700;
        }
    };
    /**
     * Check And Show Right Magic Item that User is using
     * @param parentGroup
     */
    my.magicItem.checkAndShowMagicItem = function(parentGroup){
        if(LobbyConfig.isTestAlgorithmMode){
            return;
        }
        if(LobbyConfig.additionalInfo.magicItem.remainTimeDoubleExp > 0){
            my.magicItem.DoubleExp.show();
        }
        if(Lobby.Utils.objectIsNull(LobbyC.GameSlot.currentGameSlot)){
            return;
        }
        if(Lobby.Utils.objectIsNull(parentGroup)) parentGroup = my.add.group();
        if(LobbyConfig.additionalInfo.magicItem.remainItem100Win > 0){
            my.magicItem._100PercentWin.show(parentGroup, LobbyConfig.additionalInfo.magicItem.remainItem100Win);
        }
        if(LobbyConfig.additionalInfo.magicItem.remainItem10LuckySpin > 0){
            my.magicItem.LuckySpin10.show(parentGroup, LobbyConfig.additionalInfo.magicItem.remainItem10LuckySpin);
        }
        if(LobbyConfig.additionalInfo.magicItem.remainItem20LuckySpin > 0){
            my.magicItem.LuckySpin20.show(parentGroup, LobbyConfig.additionalInfo.magicItem.remainItem20LuckySpin);
        }
        if(LobbyConfig.additionalInfo.magicItem.remainTimeLuckySymbol > 0){
            my.magicItem.LuckySymbol.show(parentGroup);
        }

        my.magicItem.setPosDebug();
    };
    /**
     * Reload magic Item UI
     */
    my.magicItem.reloadMagicItemUI = function(){
        if(LobbyConfig.additionalInfo.magicItem.remainTimeDoubleExp > 0){
            my.magicItem.DoubleExp.show();
        }else{
            if(my.magicItem.DoubleExp.group) {
                my.magicItem.DoubleExp.destroy();
            }
        }
        if(LobbyConfig.additionalInfo.magicItem.remainItem100Win > 0){
            my.magicItem._100PercentWin.show(null, LobbyConfig.additionalInfo.magicItem.remainItem100Win);
        }else{
            if(my.magicItem._100PercentWin.group) {
                my.magicItem._100PercentWin.destroy();
            }
        }
        if(LobbyConfig.additionalInfo.magicItem.remainItem10LuckySpin > 0){
            my.magicItem.LuckySpin10.show(null, LobbyConfig.additionalInfo.magicItem.remainItem10LuckySpin);
        }else{
            if(my.magicItem.LuckySpin10.group) {
                my.magicItem.LuckySpin10.destroy();
            }
        }
        if(LobbyConfig.additionalInfo.magicItem.remainItem20LuckySpin > 0){
            my.magicItem.LuckySpin20.show(null, LobbyConfig.additionalInfo.magicItem.remainItem20LuckySpin);
        }else{
            if(my.magicItem.LuckySpin20.group) {
                my.magicItem.LuckySpin20.destroy();
            }
        }
        if(LobbyConfig.additionalInfo.magicItem.remainTimeLuckySymbol > 0){
            my.magicItem.LuckySymbol.show(null);
        }else{
            if(my.magicItem.LuckySymbol.group) {
                my.magicItem.LuckySymbol.destroy();
            }
        }
        my.magicItem.reloadInfo(null);
    };

    /**
     * Show 100% Win Magic Item
     * @param parentGroup
     * @param amount
     */
    my.magicItem._100PercentWin.show = function(parentGroup, amount){
        if(my.magicItem._100PercentWin.group){
            my.magicItem._100PercentWin.update(amount);
            return;
        }
        my.magicItem.createItemUI(my.magicItem._100PercentWin, parentGroup, true);

        my.magicItem._100PercentWin.update = function(_amount){
            my.magicItem._100PercentWin.infoText.text = "Amount: " + _amount;
        };
        my.magicItem._100PercentWin.update(amount);
    };
    /**
     * Show Lucky Spin 10
     * @param parentGroup
     * @param amount
     */
    my.magicItem.LuckySpin10.show = function(parentGroup, amount){
        if(my.magicItem.LuckySpin10.group){
            my.magicItem.LuckySpin10.update(amount);
            return;
        }
        my.magicItem.createItemUI(my.magicItem.LuckySpin10, parentGroup, true);

        my.magicItem.LuckySpin10.update = function(_amount){
            my.magicItem.LuckySpin10.infoText.text = "Amount: " + _amount;
        };
        my.magicItem.LuckySpin10.update(amount);
    };
    /**
     * Show Lucky Spin 20
     * @param parentGroup
     * @param amount
     */
    my.magicItem.LuckySpin20.show = function(parentGroup, amount){
        if(my.magicItem.LuckySpin20.group){
            my.magicItem.LuckySpin20.update(amount);
            return;
        }
        my.magicItem.createItemUI(my.magicItem.LuckySpin20, parentGroup, true);

        my.magicItem.LuckySpin20.update = function(_amount){
            my.magicItem.LuckySpin20.infoText.text = "Amount: " + _amount;
        };
        my.magicItem.LuckySpin20.update(amount);
    };
    /**
     * Show Double Exp
     */
    my.magicItem.DoubleExp.show = function(){
        if(my.magicItem.DoubleExp.group){
            my.magicItem.DoubleExp.update(LobbyConfig.additionalInfo.magicItem.remainTimeDoubleExp);
            return;
        }
        my.magicItem.createItemUI(my.magicItem.DoubleExp, my.uiHeader, true);

        my.magicItem.DoubleExp.update = function(timeRemaining){
            var time = Helper.Time.milisecondTimeToNormalTime(timeRemaining,true);
            my.magicItem.DoubleExp.infoText.text = time.hour+":"+time.minute+":"+time.second;
        };
        my.magicItem.DoubleExp.update(LobbyConfig.additionalInfo.magicItem.remainTimeDoubleExp);
    };
    /**
     * Start Double EXP timer
     * @param timeRemaining
     */
    my.magicItem.DoubleExp.startTimer = function(timeRemaining){
        my.magicItem.DoubleExp.interval = ScheduleManager.setInterval(function(){
            LobbyConfig.additionalInfo.magicItem.remainTimeDoubleExp -= 1000;
            if(LobbyConfig.additionalInfo.magicItem.remainTimeDoubleExp <= 0){
                my.magicItem.DoubleExp.stopTimer();
                if(Lobby.Utils.objectNotNull(my.levelBar)) my.levelBar.tint = 0xff0000;
                if(my.magicItem.DoubleExp.group){
                    my.magicItem.DoubleExp.destroy();
                }
                return;
            }
            if(my.magicItem.DoubleExp.group){
                my.magicItem.DoubleExp.update(LobbyConfig.additionalInfo.magicItem.remainTimeDoubleExp);
                if(Lobby.Utils.objectNotNull(my.levelBar)) my.levelBar.tint = 0xff0000;
            }
        }, 1000);
    };
    /**
     * Stop Double EXP timer
     */
    my.magicItem.DoubleExp.stopTimer = function(){
        Lobby.PhaserJS.clearInterval(my.magicItem.DoubleExp.interval);
    };

    my.magicItem.DoubleExp.restart = function(){
        my.magicItem.DoubleExp.stopTimer();
        my.magicItem.DoubleExp.startTimer();
    };
    /**
     * Show Lucky Symbol
     * @param parentGroup
     */
    my.magicItem.LuckySymbol.show = function(parentGroup){
        if(my.magicItem.LuckySymbol.group){
            my.magicItem.LuckySymbol.update(LobbyConfig.additionalInfo.magicItem.remainTimeLuckySymbol);
            return;
        }
        my.magicItem.createItemUI(my.magicItem.LuckySymbol, parentGroup, true);

        my.magicItem.LuckySymbol.update = function(timeRemaining){
            var time = Helper.Time.milisecondTimeToNormalTime(timeRemaining,true);
            my.magicItem.LuckySymbol.infoText.text = time.hour+":"+time.minute+":"+time.second;
        };
        my.magicItem.LuckySymbol.update(LobbyConfig.additionalInfo.magicItem.remainTimeLuckySymbol);
    };
    /**
     * Start Lucky Symbol timer
     */
    my.magicItem.LuckySymbol.startTimer = function(){
        my.magicItem.LuckySymbol.interval = ScheduleManager.setInterval(function(){
            LobbyConfig.additionalInfo.magicItem.remainTimeLuckySymbol -= 1000;
            if(LobbyConfig.additionalInfo.magicItem.remainTimeLuckySymbol <= 0){
                my.magicItem.LuckySymbol.stopTimer();
                if(my.magicItem.LuckySymbol.group){
                    my.magicItem.LuckySymbol.destroy();
                }
                return;
            }
            if(my.magicItem.LuckySymbol.group){
                my.magicItem.LuckySymbol.update(LobbyConfig.additionalInfo.magicItem.remainTimeLuckySymbol);
            }
        }, 1000);
    };
    my.magicItem.LuckySymbol.restart = function(){
        my.magicItem.LuckySymbol.stopTimer();
        my.magicItem.LuckySymbol.startTimer();
    };
    /**
     * Stop Lucky Symbol timer
     */
    my.magicItem.LuckySymbol.stopTimer = function(){
        Lobby.PhaserJS.clearInterval(my.magicItem.LuckySymbol.interval);
    };

    /**
     * Create Item Info UI for magic Item
     * @param luckySpinObject
     * @param parentGroup
     * @param isHaveInfo
     */
    my.magicItem.createItemUI = function(luckySpinObject, parentGroup, isHaveInfo){

        luckySpinObject.group = my.add.group();

        if(parentGroup) parentGroup.add(luckySpinObject.group);
        var background = my.add.sprite(0,0, 'background_inside_popup', null, luckySpinObject.group);
        background.width = 300;
        background.height = 200;

        var nameText = my.add.text(0,background.height / 2, luckySpinObject.name, {
            font: "40px PassionOne-Regular",
            fill: "#FFFFFF",
            align: "center"
        }, luckySpinObject.group);
        Lobby.PhaserJS.centerX(nameText, background.width);
        luckySpinObject.nameText = nameText;

        if(isHaveInfo) {
            nameText.y = background.height / 3;
            var infoText = my.add.text(0, background.height * 2 / 3, "", {
                font: "40px PassionOne-Regular",
                fill: "#FFFFFF",
                align: "center"
            }, luckySpinObject.group);
            Lobby.PhaserJS.centerX(infoText, background.width);

            luckySpinObject.infoText = infoText;
        }

        luckySpinObject.destroy = function(){
            luckySpinObject.group.destroy(true);
            luckySpinObject.group = null;
        };
    };
    /**
     * Destroy Magic Item UI In Game Slot after return to main Menu
     */
    my.magicItem.destroyItemInGameSlot = function(){
        if(my.magicItem._100PercentWin.group) {
            my.magicItem._100PercentWin.destroy();
        }
        if(my.magicItem.LuckySpin10.group) {
            my.magicItem.LuckySpin10.destroy();
        }
        if(my.magicItem.LuckySpin20.group) {
            my.magicItem.LuckySpin20.destroy();
        }
        if(my.magicItem.LuckySymbol.group) {
            my.magicItem.LuckySymbol.destroy();
        }
    };

    my.magicItem.destroyAll = function(){
        my.magicItem.resetInfo();
        if(my.magicItem.DoubleExp.group) {
            my.magicItem.DoubleExp.destroy();
        }
        if(my.magicItem._100PercentWin.group) {
            my.magicItem._100PercentWin.destroy();
        }
        if(my.magicItem.LuckySpin10.group) {
            my.magicItem.LuckySpin10.destroy();
        }
        if(my.magicItem.LuckySpin20.group) {
            my.magicItem.LuckySpin20.destroy();
        }
        if(my.magicItem.LuckySymbol.group) {
            my.magicItem.LuckySymbol.destroy();
        }
    };

    return my;
}(LobbyC.MainMenu || {}));