/**
 * CLASS CREATE AND MANAGE DOUBLE UP
 * @param my: Phaser Game Object
 * @param oParentContainer: Group Parent
 * @constructor
 */
function CDoubleUpRE(my, oParentContainer) {
    var _bSpriteLoaded = false;
    var _bButtonClicked;
    var isLoading = false;

    var _iCurrentTotWin = 0.;

    var _oSoundtrack = null;

    var loaderUI;

    var _oContainer;
    var _oParentContainer;

    var _oCreditTxt;
    var _oDoubleCreditTxt;

    var _oTotWinSfx;
    var _aBtn = [];

    var _iFinish = false;

    var that = this;
    this.isShowed = false;

    var _oBg;

    var resultAnimation;
    var coinHeadAnimation;
    var coinTailAnimation;

    /**
     * Create Group function
     */
    this.createGroup = function(){
        _oContainer = my.add.group();
        oParentContainer.add(_oContainer);
        _oContainer.visible = false;
        my.scaleCenterGroup(_oContainer);
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

        this._loadAllResources(_bSpriteLoaded);

        Manager4State.setCurrentState(my.currentGameSlot.GameConstant.State.DoubleUp);
        Manager4Sound.playBackgroundMusic();

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

        _oBg = my.add.sprite(0,0, 'loading_double_up',null,_oContainer);

        loaderUI = new CLoaderUI(my, _oContainer);
        loaderUI.createLoader(settings.CANVAS_WIDTH/2, 980, 'pre-loader');


        if(_bSpriteLoaded){
            this._onAllImagesLoaded();
            return;
        }

        var loader = new Phaser.Loader(my);
        loader.onFileComplete.addOnce(this._onResourceDoubleUpLoaded);
        loader.onLoadComplete.addOnce(this._onAllImagesLoaded);

        ManagerForImage.loadSprite(loader, 'bg-double-up', 'img/slotgamedata/romanempire/sprites/doubleUp/double-up-bg.jpg?' + LobbyConfig.versionDisplay, true);
        ManagerForImage.loadSprite(loader, 'btn-collect', 'img/slotgamedata/romanempire/sprites/doubleUp/btn_collect.jpg?' + LobbyConfig.versionDisplay, true);

        ManagerForImage.loadAtlas(loader,
            'btn_coin', 'img/slotgamedata/romanempire/sprites/doubleUp/btn_coin.png?' + LobbyConfig.versionDisplay,
            'img/slotgamedata/romanempire/sprites/doubleUp/btn_coin.json?' + LobbyConfig.versionDisplay, true
        );

        for(var i = 1; i < 37; i++){
            if(i < 11){
                ManagerForImage.loadSprite(loader, 'doubleUpRE_result_head_' + i,
                    'img/slotgamedata/romanempire/sprites/doubleUp/animation/head/result_head_' + i + '.jpg?' + LobbyConfig.versionDisplay, true);
                ManagerForImage.loadSprite(loader, 'doubleUpRE_result_tail_' + i,
                    'img/slotgamedata/romanempire/sprites/doubleUp/animation/tail/result_tail_' + i + '.jpg?' + LobbyConfig.versionDisplay, true);
            }

            ManagerForImage.loadSprite(loader, 'doubleUpRE_result_' + i,
                'img/slotgamedata/romanempire/sprites/doubleUp/animation/result_' + i + '.jpg?' + LobbyConfig.versionDisplay, true);
        }

        //for(var i = 1; i < 11; i++){
        //}
        //
        //for(var i = 1; i < 11; i++){
        //}

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

        var oBg = my.add.sprite(0,0, 'bg-double-up', null, _oContainer);

        _oContainer.visible = true;

        var createButtonCoin = function(iIndex, frameName, x){
            var btn = Lobby.PhaserJS.createSpriteRectangleWithBiggerTouchZone(my,
                x,
                440,
                function(){
                    btn.sprite.scale.setTo(0.9);
                    //btn.sprite.frameName = btn.sprite.frameName.replace("normal", "clicked");
                },
                _oContainer,
                LobbyConfig.isDebug,
                'btn_coin',
                function(){
                    btn.sprite.scale.setTo(1);
                    //btn.sprite.frameName = btn.sprite.frameName.replace("clicked", "normal");
                    that._btnGamblingClicked(iIndex);
                },
                {x: 0.5, y:0.5},
                {x: 1, y: 1.35},
                {x: 0, y: 50},
                frameName
            );
            return btn;
        };

        if(Lobby.Utils.objectNotNull(_aBtn)){
            for(var i = 0; i < _aBtn.length; i++){
                _aBtn[i].destroy();
            }
        }

        _aBtn = [];
        _aBtn[0] = createButtonCoin(1, "coin-head-normal", 1135);
        _aBtn[1] = createButtonCoin(2, "coin-tail-normal", 1448);
        _aBtn[2] = Lobby.PhaserJS.createSpriteRectangleExt(my,
            1290,
            740,
            function(){
                _aBtn[2].scale.setTo(1);
            },
            function(){

            },
            function(){

            },
            _oContainer,
            LobbyConfig.isDebug,
            'btn-collect',
            function(){
                _aBtn[2].scale.setTo(1.05);
                that._btnGamblingClicked(0);
            });
        _aBtn[2].scale.setTo(1.05);
        _aBtn[2].anchor.setTo(0.5);

        var scaleValue = 1920/1344;

        resultAnimation = new SpriteAnimation(my,
            _oContainer,
            {x:settings.CANVAS_WIDTH/2,y:settings.CANVAS_HEIGHT/2},
            {x:scaleValue,y:scaleValue},
            'doubleUpRE_result_',
            1,
            36,
            false);

        resultAnimation.setCallBackInSpecificFrame(15, function(){
            Manager4Sound.playCoinSound();
        });
        resultAnimation.setCallBackInSpecificFrame(28, function(){
            Manager4Sound.stopCoinSound();
        });

        coinHeadAnimation = new SpriteAnimation(my,
            _oContainer,
            {x:settings.CANVAS_WIDTH/2,y:settings.CANVAS_HEIGHT/2},
            {x:scaleValue,y:scaleValue},
            'doubleUpRE_result_head_',
            1,
            10,
            false,
            null,
            null,
            true);

        coinTailAnimation = new SpriteAnimation(my,
            _oContainer,
            {x:settings.CANVAS_WIDTH/2,y:settings.CANVAS_HEIGHT/2},
            {x:scaleValue,y:scaleValue},
            'doubleUpRE_result_tail_',
            1,
            10,
            false,
            null,
            null,
            true);

        _oCreditTxt = my.add.text(1503, 260, Lobby.Utils.formatNumberWithCommas(_iCurrentTotWin.toFixed(0)), {
            font: '30px Dalek',
            //font: "40px PassionOne-Regular",
            fill: "#FFFEC5",
            stroke: '#874829',
            strokeThickness: 8
        }, _oContainer);
        _oCreditTxt.anchor.setTo(0.5);
        _oDoubleCreditTxt = my.add.text(1503,  308, Lobby.Utils.formatNumberWithCommas((_iCurrentTotWin * 2).toFixed(0)), {
            font: '30px Dalek',
            //font: "40px PassionOne-Regular",
            fill: "#FFFEC5",
            stroke: '#874829',
            strokeThickness: 8
        }, _oContainer);
        _oDoubleCreditTxt.anchor.setTo(0.5);


        this.isShowed = true;

        if (my.currentGameSlot.s_oBonusToRestore !== null && my.currentGameSlot.s_oBonusToRestore.bonus_step > 0) {
            this.restore();
        }
    };
    /**
     * Deprecated
     */
    this.showFishes = function () {
        if (LobbyConfig.isDebug) {
            console.log('CDoubleUp showFishes');
        }

        that.enableAllBtn();

    };
    /**
     * Disable All Button
     */
    this.hideFishes = function () {
        if (LobbyConfig.isDebug) {
            console.log('CDoubleUp hideFishes');
        }

        that.disableAllBtn();
    };
    /**
     * Call back when user touch button
     * @param iIndex: button Index (0: COLLECT, 1,2)
     * @private
     */
    this._btnGamblingClicked = function (iIndex) {
        if (LobbyConfig.isDebug) {
            console.log('CDoubleUp _btnGamblingClicked');
        }

        if(iIndex > 0) {
            for(var i = 0; i < _aBtn.length - 1; i++){
                if(i == iIndex - 1) {
                    _aBtn[i].sprite.frameName = _aBtn[i].sprite.frameName.replace("normal", "clicked");
                }else{
                    _aBtn[i].sprite.frameName = _aBtn[i].sprite.frameName.replace("normal", "disabled");
                }
            }
        }else{
            _aBtn[0].sprite.frameName = _aBtn[0].sprite.frameName.replace("normal", "disabled");
            _aBtn[1].sprite.frameName = _aBtn[1].sprite.frameName.replace("normal", "disabled");
        }
        that.disableAllBtn();

        Manager4Sound.playBtnClicked ();
        my.currentGameSlot.s_oGame.chooseBonusDoubleUp(iIndex);
    };

    /**
     * Deprecated
     */
    this.restore = function () {
        if (LobbyConfig.isDebug) {
            console.log('CDoubleUp restore');
        }
        //var aHistory = my.currentGameSlot.s_oBonusToRestore.history;

        //if (aHistory === null || aHistory === undefined) {
        //    return;
        //}

        //this.showResult(0,
        //    -1,
        //    my.currentGameSlot.s_oBonusToRestore.iTotWin);


    };
    /**
     * Show final win or exit when finishing double up
     */
    this.showFinalWin = function () {
        if (LobbyConfig.isDebug) {
            console.log('CDoubleUp showFinalWin');
        }

        this.hideFishes();
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

        if(Lobby.Utils.objectNotNull(_aBtn)) {
            this.enableAllBtn();
        }


        if (_oTotWinSfx != null) {
            _oTotWinSfx.destroy();
        }

        //my.currentGameSlot.s_oGame.hideWinPanel();

        my.currentGameSlot.s_oGame.getContainer().visible = true;


        this.isShowed = false;
        if(Lobby.Utils.objectNotNull(_aBtn)) {
            this.hideFishes();
        }

        this.destroy();

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
     * Disable button
     */
    this.disableAllBtn = function () {
        if (LobbyConfig.isDebug) {
            console.log('CDoubleUp disableAllBtn');
        }
        //_aBtn[0].sprite.frameName = _aBtn[0].sprite.frameName.replace("normal", "disabled");
        _aBtn[0].btn.inputEnabled = false;
        //_aBtn[1].sprite.frameName = _aBtn[1].sprite.frameName.replace("normal", "disabled");
        _aBtn[1].btn.inputEnabled = false;
        _aBtn[2].inputEnabled = false;
    };
    /**
     * Enable button
     */
    this.enableAllBtn = function () {
        if (LobbyConfig.isDebug) {
            console.log('CDoubleUp enableAllBtn');
        }
        _aBtn[0].sprite.frameName = "coin-head-normal";
        _aBtn[0].btn.inputEnabled = true;
        _aBtn[1].sprite.frameName = "coin-tail-normal";
        _aBtn[1].btn.inputEnabled = true;
        _aBtn[2].inputEnabled = true;
    };
    /**
     * Show Result function : called when User has selected and received info from Server
     * @param iFinish: boolen - true if finish Double up
     * @param iResult: result info
     * @param iTotWin: win amount
     */
    this.showResult = function (iFinish, iResult, iTotWin) {
        if (LobbyConfig.isDebug) {
            console.log('CDoubleUp showResult');
        }
        _iCurrentTotWin = iTotWin;

        var callbackAfterPlayAnim = function(){
            _oCreditTxt.text = Lobby.Utils.formatNumberWithCommas(_iCurrentTotWin.toFixed(0));
            _oDoubleCreditTxt.text = Lobby.Utils.formatNumberWithCommas((2*_iCurrentTotWin).toFixed(0));
            _oCreditTxt.visible = true;
            _oDoubleCreditTxt.visible = true;
            if(iFinish == 1){
                that.showFinalWin();
            }else{
                that.reset();
            }
        };

        if(iResult == 1){
            resultAnimation.play(15, function(){
                coinHeadAnimation.play(20,function(){
                    if(iFinish == 1){
                        Manager4Sound.playDoubleUpLose();
                    }else {
                        Manager4Sound.playDoubleUpWin();
                    }
                    my.time.events.add(3000,function(){
                        callbackAfterPlayAnim();
                    });
                });
            },null,function(){
                _oBg.visible = false;
                _oCreditTxt.visible = false;
                _oDoubleCreditTxt.visible = false;
            });
        }else if(iResult == 2){
            resultAnimation.play(15, function(){
                coinTailAnimation.play(20,function(){
                    if(iFinish == 1){
                        Manager4Sound.playDoubleUpLose();
                    }else {
                        Manager4Sound.playDoubleUpWin();
                    }
                    my.time.events.add(3000,function(){
                        callbackAfterPlayAnim();
                    });
                })
            },null,function(){
                _oBg.visible = false;
                _oCreditTxt.visible = false;
                _oDoubleCreditTxt.visible = false;
            });
        }else{
            that.showFinalWin();
        }
    };
    /**
     * Reset UI after one round
     */
    this.reset = function(){
        this.enableAllBtn();
        _oBg.visible = true;
        coinHeadAnimation.stop();
        coinHeadAnimation.hide();
        coinTailAnimation.stop();
        coinTailAnimation.hide();
    };

    this.destroy = function(){
        if(resultAnimation){
            resultAnimation.stop();
            resultAnimation.destroy();
            resultAnimation = null;
        }
        if(coinHeadAnimation){
            coinHeadAnimation.stop();
            coinHeadAnimation.destroy();
            coinHeadAnimation = null;
        }
        if(coinTailAnimation){
            coinTailAnimation.stop();
            coinTailAnimation.destroy();
            coinTailAnimation = null;
        }
    };

    this.update = function () {
    };
    this.createGroup();
    _oParentContainer = oParentContainer;
}