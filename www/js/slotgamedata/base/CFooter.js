/**
 * Created by Duy on 7/9/2016.
 */
/**
 * CLASS CREATE AND CONTROL FOOTER OBJECT FOR SLOT GAME
 * @param my: Phaser Game Object
 * @param parent: Group parent
 * @param arraybet: array contains current game's bet info
 * @param numberLine: number of current game's line
 * @param currentBet: current Game's bet
 * @constructor
 */
function CFooter(my, parent, arraybet, numberLine, currentBet){
    var _oContainer;
    var that = this;
    var _oWinText;
    var _animWinText2;

    var changeTotalBet;
    var changePayLine;
    my.arrayBet = [];
    var fullArrayBet;
    /**
     * Function create Group
     */
    this.createGroupFooter = function(){
        _oContainer = my.add.group();
        _oContainer.scale.setTo(1.0/ManagerForScale.getScale());
        _oContainer.x = settings.CANVAS_WIDTH/2;
        _oContainer.y = settings.CANVAS_HEIGHT - 150 + ManagerForScale.incrementHeight()/2;
        parent.add(_oContainer);
        //parent.bringToTop(_oContainer);


        /**
         * Deprecated in the new API
         * @type {*}
         */
        //my.arrayBet = [];
        //fullArrayBet = arraybet;
        //this.reloadArrayBet();


        my.createUsedBet();
        my.arrayBet = my.getGameBetPerLineArray();
        changeTotalBet = my.createGroupChangeTotalBet(my.arrayBet, numberLine, currentBet, function(){
            if(LobbyUserData.dataTutorial.isPlayingTutorial) {
                my.arrayBet.push(currentBet);
            }
        });

        //this.reloadArrayBet();
        _oContainer.add(changeTotalBet);

        var winGroup = this.createGroupWin();
        //winGroup.x = winGroup.width*1.35;

        _oContainer.add(winGroup);
        //if(LobbyConfig.isTestStrategy){
            var payLine = my.getCurrentMaxPayLine();
            if(!my.isLevelAllowToChangePayLine()) payLine = my.getCurrentMinPayLine();
            changePayLine = my.createGroupEditPayLine(payLine);

            _oContainer.add(changePayLine);

            changeTotalBet.x = 50 - changeTotalBet.width/2;
            changePayLine.x = -620 + changeTotalBet.x;
            winGroup.x = 620 + changeTotalBet.x;
        //}else{
        //    changeTotalBet.x = 0;
        //    winGroup.x = winGroup.width*1.35;
        //}
        this.reloadArrayBet();

    };
    /**
     * Show edit payline
     * @returns {*}
     */
    my.createGroupEditPayLine = function(currentPayLine, onChangedValue)
    {
        var group = my.add.group();
        var backgroundtest =  my.add.sprite(0, 0, "popup_info_background_change_totalbet",null);
        backgroundtest.anchor.setTo(0,0.075);
        group.add(backgroundtest);

        var totalPayLineText = my.add.text(0,backgroundtest.height/2, "Pay Line", {
            //font: "50px ICIEL-KONI-BLACK",
            font: "50px PassionOne-Regular",
            fill: "#FFFFFF"
        }, group);
        totalPayLineText.anchor.setTo(0, 0.5);

        var xOffset = 30 + totalPayLineText.width;
        var yOffset = -1;

        backgroundtest.x = xOffset;

        //indexCurrentBet = 0;
        //my.arrayBet = [];
        //TOTAL BET TEXT
        var totalPayLineNumberText = my.add.text(
            backgroundtest.width/2 + xOffset + 2.5,
            backgroundtest.height/2,
            Lobby.Utils.formatNumberWithCommas(currentPayLine),
            {
                font: "53px PassionOne-Regular",
                fill: "#FFFFFF",
                wordWrap: true,
                wordWrapWidth: 100,
                align: "center"
            },
            group
        );
        totalPayLineNumberText.anchor.setTo(0.5);

        group.reloadPayLine = function(payLine){
            var maxPayLine = my.getCurrentMaxPayLine();
            if(Lobby.Utils.objectNotNull(payLine)){
                my.currentGameSlot.s_iLines = payLine;
                totalPayLineNumberText.text = my.currentGameSlot.s_iLines;
            }else{
                payLine = my.currentGameSlot.s_iLines;
            }
            var currentMinPayLine = my.getCurrentMinPayLine();
            that.reloadBet(my.currentGameSlot.s_iMp);
            if(payLine == 1){
                that.disableBtn(decreasePayLineButton);
            }
            else if(  payLine == maxPayLine){
                that.disableBtn(increasePayLineButton);
            }else{
                if(!decreasePayLineButton.btn.inputEnabled) that.enableBtn(decreasePayLineButton);
                if(!increasePayLineButton.btn.inputEnabled) that.enableBtn(increasePayLineButton);
            }
        };
        //CHANGE BET FUNTION
        var changePayLine = function(value){
            if(my.maxPayLineButton && my.maxPayLineButton.isActive){
                return;
            }
            if(LobbyC.MainMenu.getCurrentUserProfileData().level+1 < LobbyConfig.unlockFeatureByLevelInfo.choosePayLine) {
                LobbyC.MainMenu.showNotificationPopup("More level","You need to reach level " + LobbyConfig.unlockFeatureByLevelInfo.choosePayLine +" to unlock this feature.");
                return;
            }
            var payLine = my.currentGameSlot.s_iLines + value;
            var maxPayLine = my.getCurrentMaxPayLine();
            if(payLine<=0||payLine>maxPayLine){
                return;
            }

            my.currentGameSlot.s_iLines = payLine;
            if(onChangedValue){
                onChangedValue();
            }
            group.reloadPayLine(payLine);
        };
        //DECREASE PAYLINE BUTTON
        var decreasePayLineButton = Lobby.PhaserJS.createSpriteRectangleWithBiggerTouchZone(my,
            0,
            0, function () {
                if(my.checkCanChangeBet()) {
                    decreasePayLineButton.sprite.scale.setTo(0.8);
                }
            },
            group, LobbyConfig.isDebug,
            "popup_info_decrease_button",
            function(){
                if(my.checkCanChangeBet()) {
                    decreasePayLineButton.sprite.scale.setTo(1);
                    changePayLine(-1);
                }
            }, {x:0.5,y:0.5}, {x:2,y:2},null, null );
        decreasePayLineButton.x = decreasePayLineButton.sprite.width/2 + xOffset;
        decreasePayLineButton.y = decreasePayLineButton.sprite.height/2 + yOffset;
        //INCREASE PAYLINE BUTTON
        var increasePayLineButton = Lobby.PhaserJS.createSpriteRectangleWithBiggerTouchZone(my,
            0,
            0, function () {
                if(my.checkCanChangeBet()) {
                    increasePayLineButton.sprite.scale.setTo(0.8);
                }
            },
            group, LobbyConfig.isDebug,
            'new-header-btn-buy',
            function(){
                if(my.checkCanChangeBet()) {
                    increasePayLineButton.sprite.scale.setTo(1);
                    changePayLine(1);
                }
            }, {x:0.5,y:0.5}, {x:2,y:2}, null, null);
        increasePayLineButton.x = backgroundtest.width + xOffset - increasePayLineButton.sprite.width/2;
        increasePayLineButton.y = increasePayLineButton.sprite.height/2 + yOffset;

        group.reloadPayLine(currentPayLine);
        return group;
    };
    this.adjustBet = function(value){
        if(!my.currentGameSlot.finishAPI){
            return;
        }
        changeTotalBet.indexCurrentBet = changeTotalBet.indexCurrentBet + value;
        my.math.clamp(changeTotalBet.indexCurrentBet, 0, my.arrayBet.length - 1);

        if(changeTotalBet.indexCurrentBet < 0){
            changeTotalBet.indexCurrentBet = 0;
        }
        that.reloadBet(my.arrayBet[indexCurrentBet]);
    };



    /**
     * Refresh win Text
     * @param szWin: current Win
     * @param bScaleAnimation: boolen - true if playing scale animation when user win big
     */
    this.refreshWin = function(szWin, bScaleAnimation){
        if(Lobby.Utils.objectNotNull(_animWinText2)){
            _oWinText.scale.setTo(1);
            _animWinText2.stop();
        }
        if (szWin != null)
        {
            _oWinText.text = Lobby.Utils.formatNumberWithCommas(szWin.toFixed(0));
        }
        if(bScaleAnimation) {
            _animWinText2 = my.add.tween(_oWinText.scale).to({x: 2, y: 2}, 2000, Phaser.Easing.Elastic.In, true);
            _animWinText2.onComplete.add(function () {
                setTimeout(function () {
                    if(Lobby.Utils.objectNotNull(_oWinText)) {
                        _animWinText2 = my.add.tween(_oWinText.scale).to({
                            x: 1,
                            y: 1
                        }, 2000, Phaser.Easing.Elastic.Out, true);
                    }
                }, 800);
            });
        }
    };
    /**
     * Set position for group
     * @param x
     * @param y
     */
    this.setPosition = function(x,y){
        _oContainer.x = x;
        _oContainer.y = y;// - ManagerForScale.offsetOutOfBounce_1080;
    };
    /**
     * Set position for group
     * @param x
     * @param y
     */
    this.setX = function(x){
        _oContainer.x = x;
    };
    /**
     * Set position for group
     * @param x
     * @param y
     */
    this.setY = function(y){
        _oContainer.y = y;// - ManagerForScale.offsetOutOfBounce_1080;
    };
    /**
     * Create Win Group (contains label Win + win text)
     * @returns {*} group object
     */
    this.createGroupWin = function(){
        var group = my.add.group();
        var backgroundtest =  my.add.sprite(0, 0, "popup_info_background_change_totalbet",null);
        backgroundtest.anchor.setTo(0,0.075);
        group.add(backgroundtest);

        var _oWinLabelText = my.add.text(0,backgroundtest.height/2, "Win", {
            //font: "50px ICIEL-KONI-BLACK",
            font: "50px PassionOne-Regular",
            fill: "#FFFFFF"
        }, group);
        _oWinLabelText.anchor.setTo(0, 0.5);

        var xOffset = 30 + _oWinLabelText.width;

        backgroundtest.x = xOffset;

        _oWinText = my.add.text(xOffset + backgroundtest.width/2,backgroundtest.height/2, "0", {
            //font: "50px ICIEL-KONI-BLACK",
            font: "50px PassionOne-Regular",
            fill: "#FFFFFF",
            align: "center"
        }, group);
        _oWinText.anchor.setTo(0.5, 0.5);
        //group.y+=ManagerForScale.doubleIncrementHeight();
        return group;
    };
    //TRY TO CHANGE BET TO EXPECTED BET
    this.changeBetToExpectdBet = function(expectedBet){
        var index = my.arrayBet.indexOf(expectedBet);
        if(index<0){
            // get max total bet lower than expectedBet if it doens't exist in array of bet
            for(var i = 0; i < my.arrayBet.length ; i++){
                if(my.arrayBet[i]* settings.NUM_PAYLINES > expectedBet){
                    break;
                }
            }
            index = i-1;
            if(index < 0){
                index= 0;
            }
            //that.reloadBet((my.arrayBet[my.arrayBet.length-1]));
        }

        var expectedBet = my.arrayBet[index];
        var maxBet = my.getCurrentMaxBetPerLine();
        expectedBet = Math.min(maxBet,expectedBet);
        that.reloadBet(expectedBet);

    };
    //CHANGE BET to min FUNTION
    this.changeBetToMin = function(){
        that.reloadBet(my.arrayBet[0]);
    };
    //CHANGE BET to max FUNTION
    this.changeBetToMax = function(){
        that.reloadBet(my.getCurrentMaxBetPerLine());
    };
    //CHANGE BET to medium FUNTION
    this.changeBetToMedium = function(){
       var middle = 0;
        var currentBetArray = my.getCurrentGameAvailableBetPerLineArray();
        //TO DO reload here
        middle = Math.floor((currentBetArray.length-1)/2);
        if(middle >= currentBetArray.length){
            middle = currentBetArray.length-1;
            that.reloadBet(currentBetArray[middle]);
            return;
        }
        if(currentBetArray.length%2===0){
            var sum = 0;
            for(var i =0;i<currentBetArray.length;i++){
                sum+=currentBetArray[i];
            }
            var avg = sum/(currentBetArray.length);
            if((avg - currentBetArray[middle])>(currentBetArray[middle+1]-avg)){
                middle+=1;
            }
        }
        that.reloadBet(currentBetArray[middle]);
    };

    /**
     * Create Group Change Bet (contains 2 button (increase and decrease button) + text bet)
     * @param arrayBet: array of current game's bets
     * @param numberLine: number of current game's line
     * @param currentBet: current game's bet
     * @param onChangedValue: call back when change bet
     * @returns {*} group object
     */
    my.createGroupChangeTotalBet = function(arrayBet, numberLine, currentBet, onChangedValue)
    {
        var group = my.add.group();
        var backgroundtest =  my.add.sprite(0, 0, "popup_info_background_change_totalbet",null);
        backgroundtest.anchor.setTo(0,0.075);
        group.add(backgroundtest);

        var totalbetText = my.add.text(0,backgroundtest.height/2, "Total Bet", {
            //font: "50px ICIEL-KONI-BLACK",
            font: "50px PassionOne-Regular",
            fill: "#FFFFFF"
        }, group);
        totalbetText.anchor.setTo(0, 0.5);

        var xOffset = 30 + totalbetText.width;
        var yOffset = -1;

        backgroundtest.x = xOffset;

        group.indexCurrentBet = arrayBet.indexOf(currentBet);
        /**
         * Thanh comment out for too many line
         */
        //for (var i = 0; i < arrayBet.length; i++) {
        //    if (arrayBet[i] == currentBet) {
        //        group.indexCurrentBet = i;
        //        break;
        //    }
        //}

        //TOTAL BET TEXT
        var totalBetText = my.add.text(
            backgroundtest.width/2 + xOffset + 2.5,
            backgroundtest.height/2,
            Lobby.Utils.formatNumberWithCommas(currentBet * numberLine),
            {
                font: "53px PassionOne-Regular",
                fill: "#FFFFFF",
                wordWrap: true,
                wordWrapWidth: 100,
                align: "center"
            },
            group
        );
        totalBetText.anchor.setTo(0.5);
        group.reloadBet = function(_currentBet){
            if(Lobby.Utils.objectNotNull(_currentBet)){
                my.currentGameSlot.s_iMp = _currentBet;
            }
            else{
                _currentBet = my.currentGameSlot.s_iMp;
            }
            my.currentGameSlot.s_iTotBet = _currentBet * my.currentGameSlot.s_iLines;
            totalBetText.text = Lobby.Utils.formatNumberWithCommas(my.currentGameSlot.s_iTotBet);
            var maxCurrentBet = my.getCurrentMaxBetPerLine() ;
            group.indexCurrentBet = arrayBet.indexOf(_currentBet);

            //that.enableBtn(increaseButton);
            //that.enableBtn(decreaseButton);
            if (_currentBet == arrayBet[0]) {
                that.disableBtn(decreaseButton);
            }
            else{
                that.enableBtn(decreaseButton);
            }
            if (_currentBet == maxCurrentBet||_currentBet == arrayBet[arrayBet.length - 1]) {
                that.disableBtn(increaseButton);
            } else {
                that.enableBtn(increaseButton);
            }
        };
        //CHANGE BET FUNTION
        var changeBet = function(value){
            if(!my.currentGameSlot.finishAPI){
                return;
            }
            group.indexCurrentBet = group.indexCurrentBet + value;
            my.math.clamp(group.indexCurrentBet, 0, arrayBet.length - 1);

            if(onChangedValue){
                onChangedValue();
            }

            group.reloadBet(arrayBet[group.indexCurrentBet]);
        };
        //DECREASE BET BUTTON
        var decreaseButton = Lobby.PhaserJS.createSpriteRectangleWithBiggerTouchZone(my,
            0,
            0, function () {
                if(my.checkCanChangeBet()) {
                    decreaseButton.sprite.scale.setTo(0.8);
                }
            },
            group, LobbyConfig.isDebug,
            "popup_info_decrease_button",
            function(){
                if(my.checkCanChangeBet()) {
                    decreaseButton.sprite.scale.setTo(1);
                    changeBet(-1);
                }
            }, {x:0.5,y:0.5}, {x:2,y:2},null, null );
        decreaseButton.x = decreaseButton.sprite.width/2 + xOffset;
        decreaseButton.y = decreaseButton.sprite.height/2 + yOffset;
        //INCREASE BET BUTTON
        var increaseButton = Lobby.PhaserJS.createSpriteRectangleWithBiggerTouchZone(my,
            0,
            0, function () {
                if(my.checkCanChangeBet()) {
                    increaseButton.sprite.scale.setTo(0.8);
                }
            },
            group, LobbyConfig.isDebug,
            'new-header-btn-buy',
            function(){
                if(my.checkCanChangeBet()) {
                    increaseButton.sprite.scale.setTo(1);
                    changeBet(1);
                }
            }, {x:0.5,y:0.5}, {x:2,y:2}, null, null);
        increaseButton.x = backgroundtest.width + xOffset - increaseButton.sprite.width/2;
        increaseButton.y = increaseButton.sprite.height/2 + yOffset;
        group.reloadBet(arrayBet[group.indexCurrentBet]);

        return group;
    };
    this.reloadPayLine = function(payLine){
        if(changePayLine) {
            changePayLine.reloadPayLine(payLine);
        }
    };
    this.reloadBet = function(currentBet){
        changeTotalBet.reloadBet(currentBet);
    };
    this.adjustBet = function(value){
        if(!my.currentGameSlot.finishAPI){
            return;
        }
        var availBet = my.getCurrentGameAvailableBetPerLineArray();
        changeTotalBet.indexCurrentBet = changeTotalBet.indexCurrentBet + value;
        my.math.clamp(changeTotalBet.indexCurrentBet, 0, availBet.length - 1);

        if(changeTotalBet.indexCurrentBet < 0){
            changeTotalBet.indexCurrentBet = 0;
        }
        that.reloadBet(availBet[changeTotalBet.indexCurrentBet]);
    };
    /**
     * decrease bet
     */
    this.decreaseBet = function(){
        if(!LobbyConfig.isFixedBet)
            this.adjustBet(-1);
    };
    /**
     * decrease bet
     */
    this.fixToTestBet = function(){
        this.reloadPayLine(my.getCurrentMaxPayLine());
        if(Lobby.Utils.objectNotNull(LobbyConfig.expectedBet)){
            that.changeBetToExpectdBet(LobbyConfig.expectedBet);
            return;
        }
        if(LobbyConfig.isMaxBet){
            this.changeBetToMax();
        }else if(LobbyConfig.isMediumBet){
            this.changeBetToMedium();
        }else{
            this.changeBetToMin();
        }
    };

    /**
     * Reload bet info
     */
    this.reloadArrayBet = function(isInitArrayBetOnly){
      if(Lobby.Utils.objectIsNull(my._userData)) {
        return;
      }
        if(Lobby.Utils.objectIsNull(isInitArrayBetOnly)){
            isInitArrayBetOnly = false;
        }
        var shouldGetTotalBet4CurrentLevel = true;
        if(isInitArrayBetOnly && Lobby.Utils.objectNotNull(my.arrayBet) &&
        my.arrayBet.length > 0 &&
        LobbyConfig.isTestAlgorithmMode){
            that.fixToTestBet();
            LobbyConfig.TotalBetForCurrentLevel = my.currentGameSlot.s_iTotBet;
            shouldGetTotalBet4CurrentLevel = false;
        }

        //if(LobbyConfig.listBetSlotGame.length > 0) {
        //    fullArrayBet = [];
        //    for (var i = 0; i < LobbyConfig.listBetSlotGame.length; i++) {
        //        if (settings.NUM_PAYLINES == LobbyConfig.listBetSlotGame[i].payLine) {
        //            fullArrayBet.push({
        //                bet: LobbyConfig.listBetSlotGame[i].betSizePerLine,
        //                level: LobbyConfig.listBetSlotGame[i].levelRestriction
        //            });
        //        }
        //    }
        //}
        //LobbyConfig.lastTotalBet = my.arrayBet[my.arrayBet.length-1];
        LobbyConfig.lastTotalBet = my.getCurrentMaxBetPerLine(my._userData.profile)*settings.NUM_PAYLINES;
        //my.arrayBet = [];
        //for (var i = 0; i < fullArrayBet.length; i++) {
        //    if(
        //        my._userData.profile.level + 1 >= fullArrayBet[i].level
        //        //|| LobbyConfig.isTestAlgorithmMode
        //    ){
        //        my.arrayBet.push(fullArrayBet[i].bet);
        //    }
        //}

        if(isInitArrayBetOnly && LobbyConfig.isTestAlgorithmMode){
            if(shouldGetTotalBet4CurrentLevel) {
                LobbyConfig.TotalBetForCurrentLevel = my.currentGameSlot.s_iTotBet;
            }
            if(my._userData.profile.level < 2) {
                that.fixToTestBet();
            }
            //if(LobbyConfig.isMaxBet){
            //    this.changeBetToMax();
            //}else if(LobbyConfig.isMediumBet){
            //    this.changeBetToMedium();
            //}
        }
    };
    /**
     * Enable button
     * @param btn: btn need to enabling
     */
    this.enableBtn = function(btn){
        btn.btn.inputEnabled = true;
        btn.sprite.tint = 0xffffff;
    };
    /**
     * Disable button
     * @param btn: btn need to disabling
     */
    this.disableBtn = function(btn){
        btn.btn.inputEnabled = false;
        btn.sprite.tint = 0x7D7D7D;
    };
    /**
     * Check if user can change bet
     * @returns {boolean} - true if user can change bet
     */
    my.checkCanChangeBet = function(){
        return !((my.currentGameSlot.s_oGame.isAutoSpin() ||
        my.currentGameSlot.s_oGame.getState() == settings.GAME_STATE_SPINNING ||
        my.currentGameSlot.s_oGame.getState() == settings.GAME_STATE_SHOW_WIN ||
                Manager4State.getCurrentState() != my.currentGameSlot.GameConstant.State.MainGame)
        //&& !LobbyConfig.isTestAlgorithmMode
        );
    };

    this.destroy = function(){
        _oContainer.destroy(true);
        my.arrayBet = null;
        fullArrayBet = null;
    };

    this.createGroupFooter();
    this.group = _oContainer;
    my.currentGameSlot._oFooter = this;
}
