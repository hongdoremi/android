/**
 * CLASS CREATE AND MANAGE DOUBLE UP
 * @param my: Phaser Game Object
 * @param oParentContainer: Group Parent
 * @constructor
 */
function CDoubleUpBO(my, oParentContainer) {
    var _bSpriteLoaded = false;
    var _bButtonClicked;
    var isLoading = false;

    var _iCurrentTotWin = 0.;

    var _oSoundtrack = null;

    var loaderUI;

    var _oContainer;
    var _oParentContainer;

    var _oText;

    var _oTotWinSfx;
    var _aChooseCard = [];
    var _aBtn = [];
    var _aBtnPick = [];
    var dealerCard;

    var headerText;
    var iWinText;

    var _iFinish = false;

    var that = this;
    this.isShowed = false;

    /**
     * Create Group function
     */
    this.createGroup = function(){
        _oContainer = my.add.group();
        oParentContainer.add(_oContainer);
        _oContainer.visible = false;
    };
    /**
     * Show function
     * @param currentWin: number - current Win
     */
    this.show = function (currentWin) {
        if (LobbyConfig.isDebug) {
            console.log('CDoubleUp show');
        }
        _oContainer.visible = true;
        _iCurrentTotWin = currentWin;
        _bButtonClicked = false;
        //IF RESOURCES FOR THIS BONUS WAS ALREADY LOADED, SIMPLY LAUNCH THE BONUS OTHERWISE LOAD THE RESOURCES
        //if (_bSpriteLoaded) {
        //    this._onAllImagesLoaded();
        //} else {
            this._loadAllResources(_bSpriteLoaded);
        //}

        Manager4State.setCurrentState(my.currentGameSlot.GameConstant.State.DoubleUp);
        Manager4Sound.playBackgroundMusic();

        //if (settings.DISABLE_SOUND_MOBILE === false || s_bMobile === false) {
        //    _oSoundtrack = createjs.Sound.play('soundtrack_bonus', {loop: -1});
        //}
        //
        //alert('doubleup');


        my.currentGameSlot.s_oGame.getContainer().visible = false;
    };

    /**
     * Load all image resources to cache
     * @param _bSpriteLoaded: boolen - check if the resources was loaded
     * @private
     */
    this._loadAllResources = function (_bSpriteLoaded) {
        if (LobbyConfig.isDebug) {
            console.log('CDoubleUp _loadAllResources');
        }
        if(isLoading == true)
            return;
        isLoading = true;
        my.onBeginLoadingBonus();

        var oBg = my.loadBG('loading_double_up',_oContainer);
        //var oBg = my.add.sprite(0, 0, 'loading_double_up');
        //_oContainer.add(oBg);

        loaderUI = new CLoaderUI(my, _oContainer);
        loaderUI.createLoader(settings.CANVAS_WIDTH/2, 980, 'pre-loader');


        if(_bSpriteLoaded){
            this._onAllImagesLoaded();
            return;
        }

        var loader = new Phaser.Loader(my);
        loader.onFileComplete.addOnce(this._onResourceDoubleUpLoaded);
        loader.onLoadComplete.addOnce(this._onAllImagesLoaded);

        //s_oSpriteLibrary.addSprite('bg-double-up', 'img/slotgamedata/deepblue/sprites/doubleUp/double up bg.jpg?' + VERSION_IMAGE);
        ManagerForImage.loadSprite(loader, 'bg-double-up', 'img/slotgamedata/boxing/sprites/doubleUp/BG-Double-Up.jpg?' + LobbyConfig.versionDisplay, true);
        ManagerForImage.loadSprite(loader, 'text-frame', 'img/slotgamedata/boxing/sprites/doubleUp/text.png?' + LobbyConfig.versionDisplay, true);

        ManagerForImage.loadAtlas(loader,
            'doubleUp_icon', 'img/slotgamedata/boxing/sprites/doubleUp/doubleUp_icon.png?' + LobbyConfig.versionDisplay,
            'img/slotgamedata/boxing/sprites/doubleUp/doubleUp_icon.json?' + LobbyConfig.versionDisplay, true
        );

        ManagerForImage.loadAtlas(loader,
            'button_text', 'img/slotgamedata/boxing/sprites/doubleUp/button_text.png?' + LobbyConfig.versionDisplay,
            'img/slotgamedata/boxing/sprites/doubleUp/button_text.json?' + LobbyConfig.versionDisplay, true
        );
        loader.start();
    };
    /**
     * Event when completing loading an image
     * @param progress: current loading progress
     * @param cacheKey: Deprecated
     * @param success: Deprecated
     * @param totalLoaded: Deprecated
     * @param totalFiles: Deprecated
     * @private
     */
    this._onResourceDoubleUpLoaded = function (progress, cacheKey, success, totalLoaded, totalFiles) {
        loaderUI.setProgressText(progress);
    };
    /**
     * Event when completing loading all image
     * @private
     */
    this._onAllImagesLoaded = function () {
        if (LobbyConfig.isDebug) {
            console.log("CBonusFreeSpin _onAllImagesLoaded");
        }
        loaderUI.setProgressText(99);
        if(my.gameSlotData.receivedBonusData ||
            my.currentGameSlot.s_oBonusToRestore !== null) {
            that._init();
        }
        isLoading = false;
        _bSpriteLoaded = true;
    };
    /**
     * Initialize - Create UI for double UP
     * @private
     */
    this._init = function () {
        if (LobbyConfig.isDebug) {
            console.log('CDoubleUp _init');
        }

        my.onFinishLoadingBonus();

        _oContainer.removeAll();

        var oBg = my.loadBG('bg-double-up',_oContainer);

        var textFrame = my.add.sprite(0,0,'text-frame',null, _oContainer);

        _oContainer.visible = true;

        if(Lobby.Utils.objectNotNull(_aBtn)){
            var i = _aBtn.length; while (i--) {_aBtn[i].destroy();}
            //for(var i = 0; i < _aBtn.length; i++){
            //    _aBtn[i].destroy();
            //}
        }

        _aBtn[0] = Lobby.PhaserJS.createSpriteRectangleExt(my,
        560,
        935,
        function(){
            _aBtn[0].scale.setTo(0.9);
        },
        function(){

        },
        function(){

        },
        _oContainer,
        LobbyConfig.isDebug,
        'button_text',
        function(){
            _aBtn[0].scale.setTo(1);
            that._btnGamblingClicked(0);
        },
        'collect-on');
        _aBtn[0].anchor.setTo(0.5);

        _aBtn[1] = Lobby.PhaserJS.createSpriteRectangleExt(my,
            settings.CANVAS_WIDTH/2,
            935,
            function(){
                _aBtn[1].scale.setTo(0.9);
            },
            function(){

            },
            function(){

            },
            _oContainer,
            LobbyConfig.isDebug,
            'button_text',
            function(){
                _aBtn[1].scale.setTo(1);
                that._btnGamblingClicked(1);
            },
            'doubleHalf-on');
        _aBtn[1].anchor.setTo(0.5);

        _aBtn[2] = Lobby.PhaserJS.createSpriteRectangleExt(my,
            1360,
            935,
            function(){
                _aBtn[2].scale.setTo(0.9);
            },
            function(){

            },
            function(){

            },
            _oContainer,
            LobbyConfig.isDebug,
            'button_text',
            function(){
                _aBtn[2].scale.setTo(1);
                that._btnGamblingClicked(2);
            },
            'double-on');
        _aBtn[2].anchor.setTo(0.5);

        if(Lobby.Utils.objectNotNull(_aBtnPick)){
            var i = _aBtnPick.length; while (i--) {_aBtnPick[i].destroy();}
            //for(var i = 0; i < _aBtnPick.length; i++){
            //    _aBtnPick[i].destroy();
            //}
        }

        var createCardButton = function(x, y, angleCard, angleSprite, angleText, index, xText, yText){
            var card = my.add.group();
            _oContainer.add(card);

            card.btn = Lobby.PhaserJS.createSpriteRectangleWithPixelPerfect(my,
                x,
                y,
                function(){
                    //card.btn.scale.setTo(0.9);
                },
                function(){

                },
                function(){

                },true, true, true,
                card,
                LobbyConfig.isDebug,
                'doubleUp_icon',
                function(){
                    //card.btn.scale.setTo(1);
                    that._btnCardClicked(index);
                },
                "Card");
            card.btn.anchor.setTo(0.5);
            card.btn.angle = angleCard;
            card.btn.scale.setTo(1.2);
            card.btn.scale.x *= index > 2? -1:1;

            card.sprite = my.add.sprite(x, y,"doubleUp_icon", "1", card);
            card.sprite.angle = angleSprite;
            card.sprite.anchor.setTo(0.5);
            card.sprite.scale.setTo(1.2);

            card.text = my.add.sprite(card.btn.x + xText,card.btn.y + yText,"doubleUp_icon", "Player", card);
            card.text.anchor.setTo(0.5);
            card.text.angle = angleText;

            card.sprite.visible = false;
            card.text.visible = false;
            return card;
        };

        var i = _aBtnPick.length; while (i--) {_aBtnPick[i].destroy();}
        //for(var i = 0; i < _aBtnPick.length; i++){
        //    _aBtnPick[i].destroy();
        //}

        var dealerText = my.add.sprite(300, 600,'doubleUp_icon', 'Dealer', _oContainer);
        dealerText.anchor.setTo(0.5);
        dealerText.angle = 28;

        dealerCard = my.add.sprite(400,470,'doubleUp_icon', 'Card', _oContainer);
        dealerCard.scale.setTo(1.2);
        dealerCard.anchor.setTo(0.5);
        dealerCard.angle = 17;

        _aBtnPick[0] = createCardButton(670, 545, 0, 0, 18, 1, -50, 150);
        _aBtnPick[1] = createCardButton(960, 580, -15, 13, 0, 2, 0, 150);
        _aBtnPick[2] = createCardButton(1221, 552, 0, 16, -15, 3, 50, 150);
        _aBtnPick[3] = createCardButton(1480, 473, -17, -16, -28, 4, 100, 125);


        headerText = my.add.sprite(settings.CANVAS_WIDTH/2, 194,'button_text', 'choose', _oContainer);
        headerText.anchor.setTo(0.5);

        iWinText = my.add.text(settings.CANVAS_WIDTH/2 + 50, 194, "", {
            font: '30px AmericanCaptain',
            //font: "40px PassionOne-Regular",
            fill: "#C2C2C2",
            stroke: '#010000',
            strokeThickness: 8
        }, _oContainer);
        iWinText.anchor.setTo(0, 0.5);
        iWinText.visible = false;

        _oText = {};

        _oText.bank = my.add.text(570, 306, _iCurrentTotWin.toFixed(0), {
                font: '40px AmericanCaptain',
                //font: "40px PassionOne-Regular",
                fill: "#ffffff",
                stroke: '#000000',
                strokeThickness: 8
            }, _oContainer);
        _oText.bank.anchor.setTo(0.5);

        _oText.doubleHalf = my.add.text(915, 306, _iCurrentTotWin.toFixed(0), {
            font: '40px AmericanCaptain',
            //font: "40px PassionOne-Regular",
            fill: "#ffffff",
            stroke: '#000000',
            strokeThickness: 8
        }, _oContainer);
        _oText.doubleHalf.anchor.setTo(0.5);

        _oText.double = my.add.text(1268, 306, _iCurrentTotWin.toFixed(0), {
            font: '40px AmericanCaptain',
            //font: "40px PassionOne-Regular",
            fill: "#ffffff",
            stroke: '#000000',
            strokeThickness: 8
        }, _oContainer);
        _oText.double.anchor.setTo(0.5);

        _oText.bet = my.add.text(1000, 135, "", {
            font: '40px AmericanCaptain',
            //font: "40px PassionOne-Regular",
            fill: "#ffffff",
            stroke: '#000000',
            strokeThickness: 8
        }, _oContainer);
        _oText.bet.anchor.setTo(0.5);

        this.updateTotalWinText(0, _iCurrentTotWin, 0, 0);
        this.disablePickBtn();

        this.isShowed = true;

        if (my.currentGameSlot.s_oBonusToRestore !== null && my.currentGameSlot.s_oBonusToRestore.bonus_step > 0) {
            this.restore();
        }
        my.currentGameSlot.s_oBonusToRestore = null;
    };
    /**
     * Call back when user touch button: COLLECT, DOUBLE HALF, DOUBLE
     * @param iIndex: button Index (0: COLLECT, 1: DOUBLE HALF, 2: DOUBLE)
     * @private
     */
    this._btnGamblingClicked = function (iIndex) {
        if (LobbyConfig.isDebug) {
            console.log('CDoubleUp _btnGamblingClicked');
        }
        //if (_bButtonClicked) {
        //    return;
        //}
        //_bButtonClicked = true;

        that.disableChooseBtn();

        Manager4Sound.playBtnClicked ();
        my.currentGameSlot.s_oGame.chooseBonusDoubleUp(iIndex);
    };
    /**
     * Call back when user select card
     * @param iIndex - card index (1,2,3,4)
     * @private
     */
    this._btnCardClicked = function(iIndex){
        this.disablePickBtn();
        Manager4Sound.playBtnClicked ();
        my.currentGameSlot.s_oGame.chooseBonusDoubleUp(iIndex);
    };
    /**
     * Restore last double up that hasn't finished
     */
    this.restore = function () {
        if (LobbyConfig.isDebug) {
            console.log('CDoubleUp restore');
        }
        var aHistory = my.currentGameSlot.s_oBonusToRestore.history;

        if (aHistory === null || aHistory === undefined) {
            return;
        }


        this.showCardToPick(my.currentGameSlot.s_oBonusToRestore.finish,
            aHistory,
            my.currentGameSlot.s_oBonusToRestore.card_dealer);
    };
    /**
     * Show final win or exit when finishing double up
     */
    this.showFinalWin = function () {
        if (LobbyConfig.isDebug) {
            console.log('CDoubleUp showFinalWin');
        }

        if (_iCurrentTotWin === 0) {
            this.exitFromDoubleUp();
            return;
        }


        my.currentGameSlot.s_oGame.showWinPanel('YOU WON', '0', _iCurrentTotWin, function(){
           that.exitFromDoubleUp()
        });
    };
    /**
     * Exit Double Up to Main Game
     * @param isSkipShowWin: boolen - true if need to skip show Win Text on Footer object
     */
    this.exitFromDoubleUp = function (isSkipShowWin) {
        if (LobbyConfig.isDebug) {
            console.log('CDoubleUp exitFromDoubleUp');
        }
        _oContainer.visible = false;
        //_oContainer.removeAll();
        //RESET GAME

        if (_oTotWinSfx != null) {
            _oTotWinSfx.destroy();
        }


        my.currentGameSlot.s_oGame.getContainer().visible = true;

        this.isShowed = false;
        if(Lobby.Utils.objectNotNull(_aBtn)) {
            this.disableChooseBtn();
        }

        Lobby.PhaserJS.destroyAllChild(_oContainer);

        settings.IS_DISABLE_ALL_BUTTON = false;
        settings.IS_PLAYING_WIN_PANEL = false;

        if(isSkipShowWin) {
            my.currentGameSlot.s_oGame.exitFromBonus();
        }else {
            my.currentGameSlot.s_oGame.exitFromDoubleUp(
                _iCurrentTotWin
            );
        }
    };
    /**
     * Disable button (COLLECT, DOUBLE HALF, DOUBLE)
     */
    this.disableChooseBtn = function () {
        if (LobbyConfig.isDebug) {
            console.log('CDoubleUp disableAllBtn');
        }
        for (var i = 0; i < _aBtn.length; i++) {
            _aBtn[i].inputEnabled = false;
            _aBtn[i].frameName = _aBtn[i].frameName.replace("on", "off");
        }
    };
    /**
     * Disable card button
     */
    this.disablePickBtn = function () {
        if (LobbyConfig.isDebug) {
            console.log('CDoubleUp disableAllBtn');
        }
        for (var i = 0; i < _aBtnPick.length; i++) {
            _aBtnPick[i].btn.inputEnabled = false;
        }
    };
    /**
     * Enable card button
     */
    this.enableChooseBtn = function () {
        if (LobbyConfig.isDebug) {
            console.log('CDoubleUp enableAllBtn');
        }
        for (var i = 0; i < _aBtn.length; i++) {
            _aBtn[i].inputEnabled = true;
            _aBtn[i].frameName = _aBtn[i].frameName.replace("off", "on");
        }
    };
    /**
     * Enable button (COLLECT, DOUBLE HALF, DOUBLE)
     */
    this.enablePickBtn = function () {
        if (LobbyConfig.isDebug) {
            console.log('CDoubleUp disableAllBtn');
        }
        for (var i = 0; i < _aBtnPick.length; i++) {
            _aBtnPick[i].btn.inputEnabled = true;
        }
    };
    /**
     * Update texts
     * @param select: selection of User (Double or Double Half)
     * @param bank: current double up's balance of user (not game balance)
     * @param bet: bet amount
     * @param winPot: potential win amount
     */
    this.updateTotalWinText = function(select, bank, bet, winPot){
        switch(select){
            case 0:
                _oText.bank.text = Lobby.Utils.formatNumberWithCommas(bank.toFixed(0));
                _oText.bet.text = "";
                _oText.doubleHalf.text = Lobby.Utils.formatNumberWithCommas((bank * 1.5).toFixed(0));
                _oText.double.text = Lobby.Utils.formatNumberWithCommas((bank * 2).toFixed(0));
                break;
            case 1:
                _oText.bank.text = Lobby.Utils.formatNumberWithCommas(bank.toFixed(0));
                _oText.bet.text = Lobby.Utils.formatNumberWithCommas(bet.toFixed(0));
                _oText.doubleHalf.text = Lobby.Utils.formatNumberWithCommas((winPot).toFixed(0));
                _oText.double.text = "";
                break;
            case 2:
                _oText.bank.text = Lobby.Utils.formatNumberWithCommas(bank.toFixed(0));
                _oText.bet.text = Lobby.Utils.formatNumberWithCommas(bet.toFixed(0));
                _oText.doubleHalf.text = "";
                _oText.double.text = Lobby.Utils.formatNumberWithCommas((winPot).toFixed(0));
                break;
        }
    };
    /**
     * Show CARD UI
     * @param id: card index
     * @param suit: Suit of card
     * @param value: Value of card
     * @param alphaSprite: Sprite's Alpha value
     * @param isDealer: boolen - true if this card is from Dealer(not User)
     */
    this.showCard = function(id, suit, value, alphaSprite, isDealer){
        var iTypeValue = 0;
        var iValue;
        switch (suit) {
            case 1: iTypeValue = 26; break;
            case 2: iTypeValue = 13; break;
            case 3: iTypeValue = 0; break;
            case 4: iTypeValue = 39; break;
        }
        iValue = iTypeValue + value - 1;

        var tween;
        if(isDealer){
            dealerCard.scale.setTo(1.2);
            if(Lobby.Utils.objectIsNull(my.currentGameSlot.s_oBonusToRestore)) {
                tween = my.add.tween(dealerCard.scale).to({x: 1.5, y: 1.5}, 200, Phaser.Easing.Linear.None(), true);
                tween.onComplete.add(function () {
                    dealerCard.frameName = iValue.toString();
                    dealerCard.angle = 0;

                    my.add.tween(dealerCard.scale).to({x: 1.2, y: 1.2}, 100, Phaser.Easing.Linear.None(), true);
                });
            }else{
                dealerCard.frameName = iValue.toString();
                dealerCard.angle = 0;
            }
        }else {
            var show = function() {
                _aBtnPick[id - 1].btn.visible = false;
                _aBtnPick[id - 1].sprite.frameName = iValue.toString();
                _aBtnPick[id - 1].sprite.visible = true;
                _aBtnPick[id - 1].sprite.alpha = alphaSprite;
                _aBtnPick[id - 1].text.visible = (alphaSprite == 1);
            };
            if(Lobby.Utils.objectIsNull(my.currentGameSlot.s_oBonusToRestore)) {
                var i = _aBtnPick[id - 1].btn.scale.x > 0? 1:-1;
                _aBtnPick[id - 1].btn.scale.setTo(1.2*i, 1.2);
                tween = my.add.tween(_aBtnPick[id - 1].btn.scale).to({x: i * 1.5, y: 1.5}, 200, Phaser.Easing.Linear.None(), true);
                tween.onComplete.add(function () {
                    _aBtnPick[id - 1].btn.scale.setTo(1.2*i, 1.2);
                    _aBtnPick[id - 1].sprite.scale.setTo(1.5);
                    show();
                    my.add.tween(_aBtnPick[id - 1].sprite.scale).to({x: 1.2, y: 1.2}, 100, Phaser.Easing.Linear.None(), true);
                });
            }else{
                show();
            }

        }
    };
    /**
     * Show other Card that User didn't select
     * @param listCard
     * @param iSelect
     */
    this.showOtherCard = function(listCard, iSelect){
        for (var i = 1; i < listCard.length; i++) {
            if(i != iSelect){
                this.showCard(listCard[i].id, listCard[i].suit, listCard[i].value, 0.6);
            }
        }
    };
    /**
     * Update UI when User go to step select Card
     * @param iFinish: boolen - true if User select Collect -> Finish Game
     * @param Wheel: Double up Info
     * @param cardDealer: Dealer's card info
     */
    this.showCardToPick = function(iFinish, Wheel, cardDealer){
        _iFinish = iFinish;
        if (iFinish == 1) {
            this.disableChooseBtn();
            this.disablePickBtn();
            this.showFinalWin();
        } else {
            this.disableChooseBtn();
            headerText.frameName = "pick";

            this.updateTotalWinText(Wheel[0].select, Wheel[0].bank, Wheel[0].bet, Wheel[0].winPot);

            this.showCard(cardDealer[0].id, cardDealer[0].suit, cardDealer[0].value, 1, true);
            this.enablePickBtn();
        }
    };
    /**
     * Show Result function : called when User has selected a card and received info from Server
     * @param iFinish: boolen - true if finish Double up
     * @param iResult: info of 5 cards
     * @param iBank: User's new double balance
     * @param iSelect: index of Card that user selected
     * @param iTotWin: win amount
     */
    this.showResult = function (iFinish, iResult, iBank, iSelect, iTotWin) {
        if (LobbyConfig.isDebug) {
            console.log('CDoubleUp showResult');
        }
        _iFinish = iFinish;
        _iCurrentTotWin = iBank;
        var select = iSelect;
        var _oCard = iResult;
        this.showCard(_oCard[select].id, _oCard[select].suit, _oCard[select].value, 1);
        //if (Player_Text_New.Length > 0)
        //{
        //    Player_Text_New[iSelect - 1].sortingOrder = 1;
        //    Player_Text_New[iSelect - 1].enabled = true;
        //}
        //else
        //{
        //    Player_Text[iSelect - 1].gameObject.GetComponent<MeshRenderer>().enabled = true;
        //}
        my.time.events.add(500, function(){
            that.showOtherCard(_oCard, select);
        });

        if (iFinish == 1) {
            headerText.frameName = "dealer_win";
            Manager4Sound.playDoubleUpLose();
            my.time.events.add(4000, function(){
                that.showFinalWin ();
            });
        } else {
            headerText.frameName = "you_win";
            iWinText.text = Lobby.Utils.formatNumberWithCommas(iTotWin.toFixed(0));
            iWinText.visible = true;
            Manager4Sound.playDoubleUpWin();
            //_oWinTxt.text = iTotWin.ToString("n0");
            //_oWinTxt.gameObject.SetActive(true);
            my.time.events.add(4000, function(){
                that.reset();
            });
        }
    };
    /**
     * Reset current round and go to next round
     */
    this.reset = function(){
        headerText.frameName = "choose";
        this.updateTotalWinText(0,_iCurrentTotWin,0,0);

        var i = _aBtnPick.length; while (i--) {
            _aBtnPick[i].btn.visible = true;
            _aBtnPick[i].sprite.visible = false;
            _aBtnPick[i].sprite.alpha = 1;
            _aBtnPick[i].text.visible = false;
        }
        //for(var i = 0; i < _aBtnPick.length; i++){
        //    _aBtnPick[i].btn.visible = true;
        //    _aBtnPick[i].sprite.visible = false;
        //    _aBtnPick[i].sprite.alpha = 1;
        //    _aBtnPick[i].text.visible = false;
        //}

        dealerCard.frameName = "Card";
        dealerCard.angle = 17;
        iWinText.visible = false;

        this.enableChooseBtn();
    };

    this.update = function () {
    };

    this.destroy = function(){
        _aChooseCard = null;
        _aBtn = null;
        _aBtnPick = null;
    };
    this.createGroup();
    _oParentContainer = oParentContainer;
}