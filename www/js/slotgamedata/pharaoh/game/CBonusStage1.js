/**
 * CLASS CREATES AND MANAGES BONUS STAGE 1
 * @param my
 * @param oParentContainer
 * @constructor
 */
function CBonusStage1(my, oParentContainer) {
    var _bSpriteLoaded = false;
    var _bButtonClicked;
    var isLoading = false;

    var that = this;

    var _iTotFSWin;
    var _iTotMultyWin;

    var _aSymbolBut;
    //var _oTotWinSfx;

    var loaderUI;

    var _oRuleText;
    var _oContainer;
    var _oParentContainer;

    var doorLeft;
    var doorRight;

    var _aPosOfSymTop;
    var arrayOfSelected = [];
    var _bGoBonusGame2 = true;

    /**
     * Create Group function
     */
    this.createGroup = function(){
        _oContainer = my.add.group();
        my.scaleCenterGroup(_oContainer);
        oParentContainer.add(_oContainer);
        _oContainer.visible = false;
        _bGoBonusGame2 = true;
    };
    /**
     * Show function
     */
    this.show = function (count) {

        _oContainer.visible = true;
        if (LobbyConfig.isDebug) {
            console.log("CBonusStage1 show");
        }
        Manager4State.setCurrentState(my.currentGameSlot.GameConstant.State.DoubleUp);
        Manager4Sound.playBonus1BackgroundMusic();

        _bButtonClicked = false;
        //IF RESOURCES FOR THIS BONUS WAS ALREADY LOADED, SIMPLY LAUNCH THE BONUS OTHERWISE LOAD THE RESOURCES
        //if (_bSpriteLoaded) {
        //    this._init();
        //} else {
            this._loadAllResources(_bSpriteLoaded);
        //}

        my.currentGameSlot.s_oGame.getContainer().visible = false;
    };

    /**
     * Load all image resources to cache
     * @private
     */
    this._loadAllResources = function () {
        if (LobbyConfig.isDebug) {
            console.log("CBonusFreeSpin _loadAllResources");
        }
        if(isLoading == true)
            return;
        isLoading = true;
        my.onBeginLoadingBonus();

        var oBg = my.loadBG('loading-bonus',_oContainer);
        //var oBg = my.add.sprite(0,0,'loading-bonus');
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

        ManagerForImage.loadSprite(loader, 'bg_bonus_stage1', 'img/slotgamedata/pharaoh/sprites/bonus_game/BG1.jpg?' + LobbyConfig.versionDisplay, true);
        ManagerForImage.loadSprite(loader, 'bg_door', 'img/slotgamedata/pharaoh/sprites/bonus_game/bg_door.png?' + LobbyConfig.versionDisplay, true);
        ManagerForImage.loadSprite(loader, 'text_instruction', 'img/slotgamedata/pharaoh/sprites/bonus_game/instruction.png?' + LobbyConfig.versionDisplay, true);
        ManagerForImage.loadSprite(loader, 'door-left', 'img/slotgamedata/pharaoh/sprites/bonus_game/door-left.png?' + LobbyConfig.versionDisplay, true);
        ManagerForImage.loadSprite(loader, 'door-right', 'img/slotgamedata/pharaoh/sprites/bonus_game/door-right.png?' + LobbyConfig.versionDisplay, true);
        ManagerForImage.loadSprite(loader, 'text_instruction', 'img/slotgamedata/pharaoh/sprites/bonus_game/instruction.png?' + LobbyConfig.versionDisplay, true);

        for(var i = 1; i < 9; i++){
            ManagerForImage.loadSprite(loader, 'symbol_bonusstage1_' + i, 'img/slotgamedata/pharaoh/sprites/bonus_game/symbol/' + i + '.png?' + LobbyConfig.versionDisplay, true);
        }
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
     * Initialize - Create UI for Bonus
     * @private
     */
    this._init = function () {
        if (LobbyConfig.isDebug) {
            console.log("CBonusFreeSpin _init");
        }

        my.onFinishLoadingBonus();

        _oContainer.removeAll();

        var oBg = my.add.sprite(0,0,"bg_bonus_stage1");
        _oContainer.add(oBg);

        doorLeft = my.add.sprite(840, settings.CANVAS_HEIGHT/2 + 120,'door-left', null, _oContainer);
        doorLeft.anchor.setTo(0.5);
        doorRight = my.add.sprite(doorLeft.x +  doorLeft.width - 30, doorLeft.y,'door-right', null, _oContainer);
        doorRight.anchor.setTo(0.5);

        var oDoorBG = my.add.sprite(settings.CANVAS_WIDTH/2,settings.CANVAS_HEIGHT + 80,'bg_door', null, _oContainer);
        oDoorBG.anchor.setTo(0.5, 1);
        //oDoorBG.scale.setTo(0.8);
        _bGoBonusGame2 = true;

        var xOffset = 760;
        var yOffset = 385;

        if (_aSymbolBut != null)
        {
            for (i = 0; i < _aSymbolBut.length; i++)
            {
                _aSymbolBut[i].destroy();
            }
        }
        _aSymbolBut = [];

        for(var i = 0; i < 8; i++){
            _aSymbolBut[i] = this.createSymbolBtn(_oContainer, xOffset, yOffset, i);
        }

        _aPosOfSymTop = [];
        _aPosOfSymTop.push({x: settings.CANVAS_WIDTH / 2 - 255, y: 215},{x: settings.CANVAS_WIDTH / 2, y: 215},{x: settings.CANVAS_WIDTH / 2 + 235, y: 215});


        _oRuleText = my.add.sprite(settings.CANVAS_WIDTH/2,
            settings.CANVAS_HEIGHT - 100,
            'text_instruction',
            null,
            _oContainer);
        _oRuleText.anchor.setTo(0.5);

        _oContainer.visible = true;

        if (my.currentGameSlot.s_oBonusToRestore !== null && my.currentGameSlot.s_oBonusToRestore.bonus_step > 0) {
            this.restore();
        }
    };
    /**
     * Create BUTTON BONUS UI
     * @param parent: group parent
     * @param xOffset: x Offset Position
     * @param yOffset: y Offset Position
     * @param index: button index
     * @returns {*} group Object
     */
    this.createSymbolBtn = function(parent, xOffset, yOffset, index){
        var _oSymBtn = my.add.group();
        parent.add(_oSymBtn);

        _oSymBtn.button = Lobby.PhaserJS.createRectangle(my,
            xOffset + (index%2)* 210 + (index%2 == 0? -1:1)* Math.floor(index/2) * 5,
            yOffset + Math.floor(index/2) * 143,
            190,
            130,
            function(){
                that._onButJellyFishReleased(index + 1);
            },
            _oSymBtn,
            LobbyConfig.isDebug
        );

        _oSymBtn.symbol = my.add.sprite(_oSymBtn.button.x + _oSymBtn.button.width/2,_oSymBtn.button.y + _oSymBtn.button.height/2, '', null, _oSymBtn);
        _oSymBtn.symbol.anchor.setTo(0.5);
        _oSymBtn.symbol.visible = false;

        _oSymBtn.text = my.add.text(_oSymBtn.symbol.x, _oSymBtn.symbol.y + 65, '0', {
            //font: "40px ADONAIS",
            font: '40px ADONAIS',
            fill: '#E8C92E',
            stroke: '#854703',
            strokeThickness: 10
        }, _oSymBtn);
        _oSymBtn.text.anchor.setTo(0.5);

        _oSymBtn.text.visible = false;

        return _oSymBtn;
    };
    /**
     * Show Info Of Button (SPRITE + TEXT WIN)
     * @param index: button index
     * @param symbolPrize: symbol Value
     * @param symbolWin: win amount
     * @param alpha: Sprite's alpha
     */
    this.showSymbolBtnInfo = function(index, symbolPrize, symbolWin, alpha){
        _aSymbolBut[index].symbol.loadTexture('symbol_bonusstage1_' + symbolPrize);
        _aSymbolBut[index].text.text = symbolWin.toFixed(0);
        _aSymbolBut[index].symbol.visible = true;
        _aSymbolBut[index].text.visible = true;
        if(Lobby.Utils.objectNotNull((alpha))){
            _aSymbolBut[index].symbol.alpha = alpha;
            _aSymbolBut[index].text.fill = "#999999";
            _aSymbolBut[index].text.stroke = "#000000";
        }
    };
    /**
     * Restore last Bonus that hasn't finished
     */
    this.restore = function () {
        if (LobbyConfig.isDebug) {
            console.log("CBonusFreeSpin restore");
        }
        var aHistory = my.currentGameSlot.s_oBonusToRestore.history;



        if (Lobby.Utils.objectIsNull(aHistory)) {
            return;
        }

        for (var i = 0; i < aHistory.length; i++) {
            this.showResult(my.currentGameSlot.s_oBonusToRestore.finish,
                aHistory,
                i);
        }

    };
    /**
     * Call back when user touch button
     * @param iIndex: button Index
     * @private
     */
    this._onButJellyFishReleased = function (iIndex) {
        if (LobbyConfig.isDebug) {
            console.log("CBonusFreeSpin _onButJellyFishReleased");
        }
        if (_bButtonClicked) {
            return;
        }
        _bButtonClicked = true;

        for (var i = 0; i < _aSymbolBut.length; i++) {
            _aSymbolBut[i].button.inputEnabled = false;
        }

        Manager4Sound.playBtnClicked ();
        my.currentGameSlot.s_oGame.chooseBonus(iIndex);

    };
    /**
     * get array of selected parameter use for test algorithm
     */
    this.getArrayOfSelected = function(){
        if(!LobbyConfig.isTestAlgorithmMode){
            return [];
        }
        return arrayOfSelected;
    };
    /**
     * reset array chosen bonus param use for test algorithm
     */
    this.resetBonusTest = function(){
        arrayOfSelected = [];
    };
    /**
     * Show Result function : called when User has selected and received info from Server
     * @param iFinish: boolen - true if finish Bonus
     * @param aItem: array items info
     * @param iIndex: index User selected
     */
    this.showResult = function (iFinish, aItem, iIndex) {
        if (LobbyConfig.isDebug) {
            console.log("CBonusFreeSpin show");
        }
        if(Lobby.Utils.objectNotNull(_aSymbolBut)) {
            for (var i = 0; i < _aSymbolBut.length; i++) {
                _aSymbolBut[i].button.inputEnabled = true;
            }
        }

        var iSelect = aItem[iIndex].select - 1;
        if(iSelect < 0 ){
            iSelect = aItem[2].select - 1;
            iIndex = 2;
        }
        var iPrize = parseInt(aItem[iIndex].prize);
        var iWin = aItem[iIndex].win;
        if(iPrize > 3) {
            _bGoBonusGame2 = false;
        }

        if(my.managerForAutoGameSlot.autoPlayBonus || LobbyConfig.isTestAlgorithmMode) {
            arrayOfSelected.push(aItem[iIndex].select);
            if (LobbyConfig.isTestAlgorithmMode) {
                if (iFinish) {
                    if (_bGoBonusGame2) {
                        my.currentGameSlot.s_oBonusToRestore = null;
                        //my.currentGameSlot.manager4Network.callBonus(my.currentGameSlot.getStepBonus(), 1);
                        _bGoBonusGame2 = true;
                        return {bonus2: true, iWin: iWin};
                    }
                    _bGoBonusGame2 = true;
                }
                return iWin;
            }else{
                my.callAutoPlayBonus(iFinish, arrayOfSelected);
            }
        }

        _oRuleText.visible = false;

        if(iPrize <= 3) {
            var prizeSpriteTop = my.add.sprite(_aPosOfSymTop[iIndex].x,_aPosOfSymTop[iIndex].y, 'symbol_bonusstage1_' + iPrize, null, _oContainer);
            prizeSpriteTop.anchor.setTo(0.5);
            prizeSpriteTop.scale.setTo(0.7);
        }

        this.showSymbolBtnInfo(iSelect, iPrize, iWin);

        _aSymbolBut[iSelect].button.visible = false;
        _aSymbolBut[iSelect].button.inputEnabled = false;

        if (iFinish === 1) {

            for (var i = 0; i < _aSymbolBut.length; i++) {
                _aSymbolBut[i].button.inputEnabled = false;
            }


            if(!_bGoBonusGame2) {
                var iTotWin = 0;

                for (var k = 0; k < 3; k++) {
                    iTotWin += aItem[k].win;
                }

                var oParent = this;


                settings.IS_DISABLE_ALL_BUTTON = true;
                settings.IS_PLAYING_WIN_PANEL = true;

                _oRuleText.visible = false;
                my.time.events.add(2000, function () {
                    oParent.showFinalWin(
                        iTotWin);
                });
            }else{
                this.readyToGoToBonus2(aItem);
            }

        } else {
            _bButtonClicked = false;
        }
    };
    /**
     * Show final win when finishing Bonus
     */
    this.showFinalWin = function (totalWin) {
        my.currentGameSlot.s_oGame.showWinPanel("YOU WON", "0", totalWin, function(){
            that._exitFromBonus();
        });
    };
    /**
     * Set UI for Bonus to notify User prepare to go to Bonus stage 2
     * @param aItem: array Items in bonus stage 1
     */
    this.readyToGoToBonus2 = function(aItem){
        for(var i = 3; i < 8; i++){
            var index = -aItem[i].select - 1;
            this.showSymbolBtnInfo(index, aItem[i].prize, aItem[i].win, 0.7);
        }
        var tweenFade;
        for (var i = 0; i < _aSymbolBut.length; i++) {
            if(i == 0){
                tweenFade = my.add.tween(_aSymbolBut[i].symbol).to( { alpha: 0 }, 4000, Phaser.Easing.Linear.None, true);
            }else{
                my.add.tween(_aSymbolBut[i].symbol).to( { alpha: 0 }, 4000, Phaser.Easing.Linear.None, true);
            }
            my.add.tween(_aSymbolBut[i].text).to( { alpha: 0 }, 4000, Phaser.Easing.Linear.None, true);
        }
        tweenFade.onComplete.add(function(){
            for (var i = 0; i < _aSymbolBut.length; i++) {
                _aSymbolBut[i].visible = false;
            }

            Manager4Sound.playBonus1GateOpen();
            var tweenCloseDoor = my.add.tween(doorLeft.position).to({x: doorLeft.x - 215}, 5000, Phaser.Easing.Linear.None, true);
            my.add.tween(doorRight.position).to({x: doorRight.x + 215}, 5000, Phaser.Easing.Linear.None, true);

            tweenCloseDoor.onComplete.add(function(){
                my.time.events.add(1000, function(){
                    that._exitFromBonus();
                });
            })
        })
    };
    /**
     * Exit Bonus
     * @param isSkipShowWin: boolen - true if need to skip show Win Text on Footer object
     */
    this._exitFromBonus = function (isSkipShowWin) {
        if (LobbyConfig.isDebug) {
            console.log("CBonusFreeSpin _exitFromBonus");
        }
        //_oTotWinSfx.destroy();
        _oContainer.visible = false;
        my.currentGameSlot.s_oGame.getContainer().visible = true;
        //_oContainer.removeAll();
        //RESET GAME


        if(Lobby.Utils.objectNotNull(_aSymbolBut)) {
            for (var i = 0; i < _aSymbolBut.length; i++) {
                _aSymbolBut[i].button.inputEnabled = true;
                //_aSymbolBut[i].enable();
            }
        }
        Lobby.PhaserJS.destroyAllChild(_oContainer);

        settings.IS_DISABLE_ALL_BUTTON = false;
        settings.IS_PLAYING_WIN_PANEL = false;

        if(isSkipShowWin){
            my.currentGameSlot.s_oGame.exitFromBonus();
        }else {
            my.currentGameSlot.s_oGame.exitFromBonusStage1(_bGoBonusGame2);
        }
    };
    this.createGroup();
    _oParentContainer = oParentContainer;
}