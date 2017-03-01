/**
 * CLASS CREATE AND MANAGE DOUBLE UP
 * @param my: Phaser Game Object
 * @param oParentContainer: Group Parent
 * @constructor
 */
function CDoubleUpGE(my, oParentContainer) {
    var _bSpriteLoaded = false;
    var _bButtonClicked;
    var isLoading = false;

    var _iCurrentTotWin = 0.;

    var _oSoundtrack = null;

    var loaderUI;

    var _oContainer;
    var _oParentContainer;

    var _oTotalBetTxt;
    var _oTotalWinTxt;
    var _oTotWinSfx;
    var _aBtn = [];

    var _iFinish = false;

    var that = this;
    this.isShowed = false;

    var scale4BigAnimation = 2;
    var defaultFPS = 30;
    var allowPlayWinAnimation = false;
    var allowPlayLoseAnimation = false;

    /**
     * Create Group function
     */
    this.createGroup = function(){
        _oContainer = my.add.group();
        my.scaleCenterGroup(_oContainer);
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
    this._loadAllResources = function () {
        if (LobbyConfig.isDebug) {
            console.log('CDoubleUp _loadAllResources');

        }
        if(isLoading == true)
            return;
        isLoading = true;
        my.onBeginLoadingBonus();

        var oBg = my.add.sprite(0, 0, 'loading_double_up');
        _oContainer.add(oBg);

        loaderUI = new CLoaderUI(my, _oContainer);
        loaderUI.createLoader(settings.CANVAS_WIDTH/2, 980, 'pre-loader');

        if(_bSpriteLoaded){
            this._onAllImagesLoaded();
            return;
        }

        var loader = new Phaser.Loader(my);
        loader.onFileComplete.addOnce(this._onResourceDoubleUpLoaded);
        loader.onLoadComplete.addOnce(this._onAllImagesLoaded);

        ManagerForImage.loadSprite(loader,'bg-double-up', 'img/slotgamedata/goldenegg/sprites/doubleUp/double up bg.jpg?' + LobbyConfig.versionDisplay, true);
        ManagerForImage.loadSprite(loader,'normal-egg-option', 'img/slotgamedata/goldenegg/sprites/doubleUp/normal-egg-option.png?' + LobbyConfig.versionDisplay, true);
        ManagerForImage.loadSpriteSheet(loader,'btn_collect', 'img/slotgamedata/goldenegg/sprites/doubleUp/btn_collect.png?' + LobbyConfig.versionDisplay, 358, 138, 2,true);
        ManagerForImage.loadSpriteSheet(loader,'golden-egg-select', 'img/slotgamedata/goldenegg/sprites/doubleUp/golden-egg.png?' + LobbyConfig.versionDisplay, 301, 184, 2,true);
        ManagerForImage.loadSpriteSheet(loader,'normal-egg-select', 'img/slotgamedata/goldenegg/sprites/doubleUp/normal-egg.png?' + LobbyConfig.versionDisplay, 313, 187, 2,true);
        ManagerForImage.loadSprite(loader,'btn_escape', 'img/slotgamedata/goldenegg/sprites/doubleUp/btn_escape.png?' + LobbyConfig.versionDisplay,true);
        ManagerForImage.loadSprite(loader,'guess-the-next-egg-laid', 'img/slotgamedata/goldenegg/sprites/doubleUp/guess-the-next-egg-laid.png?' + LobbyConfig.versionDisplay,true);
        ManagerForImage.loadSprite(loader,'basket', 'img/slotgamedata/goldenegg/sprites/doubleUp/basket.png?' + LobbyConfig.versionDisplay,true);

        ManagerForImage.loadSprite(loader,'current-win', 'img/slotgamedata/goldenegg/sprites/doubleUp/current-win.png?' + LobbyConfig.versionDisplay,true);
        ManagerForImage.loadSprite(loader,'potential-win', 'img/slotgamedata/goldenegg/sprites/doubleUp/potential-win.png?' + LobbyConfig.versionDisplay,true);

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
     * Play result Animation
     * @param resultSprite: result sprite name
     * @param callback: callback after finish animation
     * @param funcCallInFirstTimeAnimation: function called when begin play animation
     * @param result: result index
     */
    this.playWinLoseAnimation = function(resultSprite, callback, funcCallInFirstTimeAnimation,result){
        funcCallInFirstTimeAnimation();
        var egg = my.add.sprite(settings.CANVAS_WIDTH/2,settings.CANVAS_HEIGHT/2 - 100,resultSprite,null,_oContainer);
        egg.angle += 79;
        egg.anchor.setTo(0.5);
        var tween = my.add.tween(egg.position).to({
            x:settings.CANVAS_WIDTH/2,
            y:settings.CANVAS_HEIGHT - 170
            }
        , 2000, Phaser.Easing.Quintic.Out, true);
        tween.onComplete.add(function () {
            egg.destroy();
            callback(result);
        }, my);
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

        var oBg = my.add.sprite(0,0,'bg-double-up');
        _oContainer.add(oBg);


        _oContainer.visible = true;

        if (my.currentGameSlot.s_oBonusToRestore !== null && my.currentGameSlot.s_oBonusToRestore.bonus_step > 0) {
            this.restore();
        }

        scale4BigAnimation = 4;
        defaultFPS = 30;

        if (_aBtn != null) {
            for (var i = 0; i < _aBtn.length; i++) {
                var oBut = _aBtn[i];
                oBut.destroy();
            }
        }
        _aBtn = [];


        var spriteNormalEgg =
            my.add.sprite(
                settings.CANVAS_WIDTH / 2. - 600 + ManagerForScale.offsetOutOfBounce_1920/6,
                settings.CANVAS_HEIGHT / 2. + 100
                , 'normal-egg-select', null, _oContainer);
        spriteNormalEgg.anchor.setTo(0.5);

        var btnNormalEgg = Lobby.PhaserJS.createRectangle(
            my,
            200,
            settings.CANVAS_HEIGHT / 2. - 50 ,
            600,
            300,
            function () {
                if (_bButtonClicked) {
                    return;
                }
                spriteNormalEgg.frame = 1;
            },
            _oContainer,
            LobbyConfig.isDebug,
            //true,
            function () {
                if (_bButtonClicked) {
                    return;
                }
                spriteNormalEgg.frame = 0;
                that._btnGamblingClicked(1);
            }
        );
        //btnNormalEgg.anchor.setTo(0.5);
        _aBtn[0] = btnNormalEgg;

        var spriteGoldEgg = my.add.sprite(
            settings.CANVAS_WIDTH / 2. + 620 - ManagerForScale.offsetOutOfBounce_1920/6,
            settings.CANVAS_HEIGHT / 2. + 100, 'golden-egg-select', null, _oContainer);

        //if(ManagerForScale.is3x4resolution()){
        //    spriteGoldEgg.position.x -= 20;
        //}

        spriteGoldEgg.anchor.setTo(0.5);


        var btnGoldEgg = Lobby.PhaserJS.createRectangle(
            my,
            settings.CANVAS_WIDTH/2 + 200,
            settings.CANVAS_HEIGHT / 2. - 50,
            600,
            300,
            function () {
                if (_bButtonClicked) {
                    return;
                }
                spriteGoldEgg.frame = 1;
            },
            _oContainer,
            LobbyConfig.isDebug,
            //true,
            function () {
                if (_bButtonClicked) {
                    return;
                }
                spriteGoldEgg.frame = 0;
                that._btnGamblingClicked(2);
            }
        );
        //btnGoldEgg.anchor.setTo(0.5);
        _aBtn[1] = btnGoldEgg;


        var btnCollect = Lobby.PhaserJS.createSpriteRectangleExt(
            my,
            0,
            0,
            function () {
                if(_bButtonClicked) return;
                btnCollect.frame = 1;
            },
            function () {

            },
            function () {
                if(_bButtonClicked) return;
                btnCollect.frame = 0;
            },
            _oContainer,
            false,
            'btn_collect',
            function () {
                if(_bButtonClicked) return;
                btnCollect.frame = 0;
                //btnCollect.scale.setTo(1);
                that._btnGamblingClicked(0);
            }
        );
        btnCollect.x = settings.CANVAS_WIDTH / 2. - 450;
        btnCollect.y = settings.CANVAS_HEIGHT / 2 - 140;
        btnCollect.anchor.setTo(0.5);
        _aBtn[2] = btnCollect;
        var totalBetBG = my.add.sprite(settings.CANVAS_WIDTH / 2. - 500, settings.CANVAS_HEIGHT - 180, "current-win", null, _oContainer);
        totalBetBG.anchor.setTo(0.5, 0.35);
        var amountWinBG = my.add.sprite(settings.CANVAS_WIDTH / 2. + 500, settings.CANVAS_HEIGHT - 180, "potential-win", null, _oContainer);
        amountWinBG.anchor.setTo(0.5, 0.35);

        _oTotalBetTxt = my.add.text(totalBetBG.x, totalBetBG.y, _iCurrentTotWin.toFixed(0), {
            font: '40px Skater-Girls-Rock',
            //font: "40px PassionOne-Regular",
            fill: "#fffec5",
            stroke: '#874829',
            strokeThickness: 8
        }, _oContainer);
        _oTotalBetTxt.anchor.setTo(0.5);
        _oTotalWinTxt = my.add.text(amountWinBG.x, amountWinBG.y, (_iCurrentTotWin * 2).toFixed(0), {
            font: '40px Skater-Girls-Rock',
            //font: "40px PassionOne-Regular",
            fill: "#86F021",
            stroke: '#1E2D13',
            strokeThickness: 8
        }, _oContainer);
        _oTotalWinTxt.anchor.setTo(0.5);


        var normalEgg = my.add.sprite(settings.CANVAS_WIDTH / 2. - 400, settings.CANVAS_HEIGHT / 2 - 30, 'normal-egg-option', null, _oContainer);
        var basketNormal = my.add.sprite(normalEgg.x - 15, normalEgg.y + 150, 'basket', null, _oContainer);
        basketNormal.scale.setTo(0.82, 0.82);
        var goldEgg = my.add.sprite(settings.CANVAS_WIDTH / 2. + 220, settings.CANVAS_HEIGHT / 2 - 30, 'gold-egg-option', null, _oContainer);
        goldEgg.scale.setTo(0.95, 0.95);
        var basketGold = my.add.sprite(goldEgg.x - 25, goldEgg.y + 150, 'basket', null, _oContainer);
        basketGold.scale.setTo(0.77, 0.77);
        var guessTheNext =
            my.add.sprite(
                settings.CANVAS_WIDTH / 2 + 40 - ManagerForScale.offsetOutOfBounce_1920/6,
                200, 'guess-the-next-egg-laid', null, _oContainer);
        //if(ManagerForScale.is3x4resolution()){
        //    guessTheNext.x -= 60;
        //    guessTheNext.y -= 60;
        //}

        this.isShowed = true;
    };
    /**
     * Function called to show Final Win or reset button to play another round
     */
    this.showFishes = function () {
        if (LobbyConfig.isDebug) {
            console.log('CDoubleUp showFishes');
        }

        if (_iFinish) {


            settings.IS_DISABLE_ALL_BUTTON = true;
            settings.IS_PLAYING_WIN_PANEL = true;

            var oParent = that;
            my.time.events.add(2000, function () {

                oParent.showFinalWin();
            });

            //return;
        }

        that.enableAllBtn();

    };
    /**
     * Function called to disable Button
     */
    this.hideFishes = function () {
        if (LobbyConfig.isDebug) {
            console.log('CDoubleUp hideFishes');
        }
        //anglerFishAnimationLeft.visible = false;
        //anglerFishAnimationRight.visible = false;
        //blueFishAnimation.visible = false;

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
        if (_bButtonClicked) {
            return;
        }
        _bButtonClicked = true;

        Manager4Sound.playBtnClicked();
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


        this.showResult(my.currentGameSlot.s_oBonusToRestore.finish,
            my.currentGameSlot.s_oBonusToRestore.iResult,
            my.currentGameSlot.s_oBonusToRestore.iTotWin);


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


        my.currentGameSlot.s_oGame.showWinPanel('YOU WON', '0', _iCurrentTotWin, function () {
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

        //this.enableAllBtn();


        if (_oTotWinSfx != null) {
            _oTotWinSfx.destroy();
        }

        //my.currentGameSlot.s_oGame.hideWinPanel();

        my.currentGameSlot.s_oGame.getContainer().visible = true;

        Lobby.PhaserJS.destroyAllChild(_oContainer);

        settings.IS_DISABLE_ALL_BUTTON = false;
        settings.IS_PLAYING_WIN_PANEL = false;

        if(isSkipShowWin){
            my.currentGameSlot.s_oGame.exitFromBonus();
        }else {
            my.currentGameSlot.s_oGame.exitFromDoubleUp(
                _iCurrentTotWin
            );
        }

        this.isShowed = false;
        //this.hideFishes();
    };
    /**
     * Disable button
     */
    this.disableAllBtn = function () {
        if (LobbyConfig.isDebug) {
            console.log('CDoubleUp disableAllBtn');
        }
        for (var i = 0; i < _aBtn.length; i++) {
            _aBtn[i].enabled = false;
        }
    };
    /**
     * Enable button
     */
    this.enableAllBtn = function () {
        if (LobbyConfig.isDebug) {
            console.log('CDoubleUp enableAllBtn');
        }
        for (var i = 0; i < _aBtn.length; i++) {
            _aBtn[i].enabled = true;
        }
    };
    /**
     * Update Win Text
     */
    this.updateTotalWinText = function () {
        if (LobbyConfig.isDebug) {
            console.log('CDoubleUp updateTotalWinText');
        }

        if (_iCurrentTotWin != 0) {
            _oTotalBetTxt.setText(_iCurrentTotWin.toFixed(0));
            var tweenBet = my.add.tween(_oTotalBetTxt.scale).to({x: 1.5, y: 1.5}, 100, Phaser.Easing.Bounce.Out, true);
            tweenBet.onComplete.add(function () {
                my.add.tween(_oTotalBetTxt.scale).to({x: 1, y: 1}, 100, Phaser.Easing.Cubic.In, true);
            });
            _oTotalWinTxt.setText((_iCurrentTotWin * 2).toFixed(0));
            var tweenWin = my.add.tween(_oTotalWinTxt.scale).to({x: 1.5, y: 1.5}, 100, Phaser.Easing.Bounce.Out, true);
            tweenWin.onComplete.add(function () {
                my.add.tween(_oTotalWinTxt.scale).to({x: 1, y: 1}, 100, Phaser.Easing.Cubic.In, true);
            });
        }
    };
    /**
     * Callback after finish play animation
     * @param target
     */
    this.customCallback = function (target) {
        if (LobbyConfig.isDebug) {
            console.log('CDoubleUp customCallback');
        }
        if (target == 'win') {
            that.showFishes();
            //_winDoubleUpAnimation.gotoAndStop('finish');

            that.allowPlayWinAnimation = false;

        } else if (target == 'lose') {

            that.showFishes();
            //_loseDoubleUpAnimation.gotoAndStop('finish');

            that.allowPlayLoseAnimation = false;
        }
    };
    /**
     * Show Result function : called when User has selected and received info from Server
     * @param iFinish: boolen - true if finish Double up
     * @param iResult:  result info
     * @param iTotWin: win amount
     */
    this.showResult = function (iFinish, iResult, iTotWin) {
        if (LobbyConfig.isDebug) {
            console.log('CDoubleUp showResult');
        }

        _iCurrentTotWin = iTotWin;
        _iFinish = iFinish;
        if (iFinish == 0) {
            Manager4Sound.turnOffAllBackgroundMusic();
            Manager4Sound.playDoubleUpWin();
            //setTimeout(function () {
            //    Manager4Sound.playBackgroundMusic();
            //}, 800);
            my.time.events.add(800, function () {
                Manager4Sound.playBackgroundMusic();
            });
        }
        else {
            if (iResult != 0) {
                Manager4Sound.turnOffAllBackgroundMusic();
                Manager4Sound.playDoubleUpLose();
                //setTimeout(function () {
                //    Manager4Sound.playBackgroundMusic();
                //}, 800);
                my.time.events.add(800, function () {
                    Manager4Sound.playBackgroundMusic();
                });
            }
        }
        if (iResult === 1) {
            allowPlayLoseAnimation = true;
            //loseAnimation.play(defaultFPS, that.customCallback, 'lose', this.hideFishes);
            that.playWinLoseAnimation('normal-egg-option',function(r){
                if(_iFinish!=1) _bButtonClicked = false;
                that.customCallback(r);} , this.hideFishes, 'lose');
            //this.hideFishes();
        } else if (iResult === 2) {
            allowPlayWinAnimation = true;
            that.playWinLoseAnimation('gold-egg-option',function(r){
                if(_iFinish!=1) _bButtonClicked = false;
                that.customCallback(r);
            }, this.hideFishes, 'win');
            //winAnimation.play(defaultFPS, that.customCallback, 'win', this.hideFishes);
            //this.hideFishes();
        } else if (_iFinish === 1) {
            this.showFishes();
        }


        this.updateTotalWinText();

        if (_iFinish === 1) {


        } else {
        }


    };

    this.update = function () {
    };
    this.createGroup();
    _oParentContainer = oParentContainer;
}