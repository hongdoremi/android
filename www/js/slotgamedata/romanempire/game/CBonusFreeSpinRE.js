/**
 * CLASS CREATE AND MANAGE FREE SPIN BONUS
 * @param my: Phaser Game Object
 * @param oParentContainer: Group Parent
 * @constructor
 */
function CBonusFreeSpinRE(my, oParentContainer) {
    var _bSpriteLoaded = false;
    var _bButtonClicked;
    var isLoading = false;

    var that = this;

    var _btnSpin;
    var _oWheel;

    var loaderUI;

    var _oRuleText;
    var _oContainer;
    var _oParentContainer;

    var _aWheelInfo;
    /**
     * Create Group function
     */
    this.createGroup = function(){
        _oContainer = my.add.group();
        oParentContainer.add(_oContainer);
        my.scaleCenterGroup(_oContainer);
        _oContainer.visible = false;
    };
    /**
     * Show function
     * @param totalFreeSpins: number - current Free spin
     * @param totalMulti: number - current multiplier
     */
    this.show = function (totalFreeSpins, totalMulti) {

        _oContainer.visible = true;
        if (LobbyConfig.isDebug) {
            console.log("CBonusFreeSpin show");
        }
        Manager4State.setCurrentState(my.currentGameSlot.GameConstant.State.Bonus);
        Manager4Sound.playDoubleUpBackgroundMusic();

        _bButtonClicked = false;

        this._loadAllResources(_bSpriteLoaded);

        my.currentGameSlot.s_oGame.getContainer().visible = false;
    };

    /**
     * Load all image resources to cache
     * @param _bSpriteLoaded: boolen - check if the resources was loaded
     * @private
     */
    this._loadAllResources = function (_bSpriteLoaded) {
        if (LobbyConfig.isDebug) {
            console.log("CBonusFreeSpin _loadAllResources");
        }
        if(isLoading == true)
            return;
        isLoading = true;
        my.onBeginLoadingBonus();

        var oBg =  my.loadBG('loading_bonus',_oContainer);
        //_oContainer.add(oBg);

        loaderUI = new CLoaderUI(my, _oContainer);
        loaderUI.createLoader(settings.CANVAS_WIDTH/2, 980, 'pre-loader');


        if(_bSpriteLoaded){
            this._onAllImagesLoaded();
            return;
        }

        var loader = new Phaser.Loader(my);
        loader.onFileComplete.addOnce(this._onResourceBikiniLoaded);
        loader.onLoadComplete.addOnce(this._onAllImagesLoaded);

        ManagerForImage.loadSprite(loader, 'bg_bonusRE', 'img/slotgamedata/romanempire/sprites/bonus_freespin/bg_bonus_freespin.jpg?' + LobbyConfig.versionDisplay, true);
        ManagerForImage.loadSprite(loader, 'wheel_bonusRE', 'img/slotgamedata/romanempire/sprites/bonus_freespin/wheel.png?' + LobbyConfig.versionDisplay, true);
        ManagerForImage.loadSprite(loader, 'text_bonus_fs', 'img/slotgamedata/romanempire/sprites/bonus_freespin/text_bonus_fs.png?' + LobbyConfig.versionDisplay, true);
        ManagerForImage.loadSprite(loader, 'needle_bonusRE', 'img/slotgamedata/romanempire/sprites/bonus_freespin/needle.png?' + LobbyConfig.versionDisplay, true);
        ManagerForImage.loadSpriteSheet(loader,'btn_spin_bonusRE', 'img/slotgamedata/romanempire/sprites/bonus_freespin/btn_spin.png?' + LobbyConfig.versionDisplay, 141, 80, 2, true);

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
    this._onResourceBikiniLoaded = function (progress, cacheKey, success, totalLoaded, totalFiles) {
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
     * Initialize - Create UI for FreeSpin
     * @private
     */
    this._init = function () {
        if (LobbyConfig.isDebug) {
            console.log("CBonusFreeSpin _init");
        }
        my.onFinishLoadingBonus();

        _oContainer.removeAll();

        var oBg = my.add.sprite(0,0,"bg_bonusRE",null,_oContainer);

        this._initWheelInfo();

        _oWheel = Lobby.PhaserJS.createWheel(my,
            {
                posX: settings.CANVAS_WIDTH/2 + 17,
                posY: settings.CANVAS_HEIGHT/2 - 30,
                spriteName: 'wheel_bonusRE',
                parent: _oContainer

            },
            _aWheelInfo
        );

        var needle = my.add.sprite(settings.CANVAS_WIDTH/2 + 17, settings.CANVAS_HEIGHT/2 - 30, 'needle_bonusRE', null, _oContainer);
        needle.anchor.setTo(0.5);
        _btnSpin = Lobby.PhaserJS.createSpriteRectangleWithBiggerTouchZone(my,
            settings.CANVAS_WIDTH/2 + 17,
            settings.CANVAS_HEIGHT/2 + 20,
            function(){
                _btnSpin.sprite.scale.setTo(0.9);
                _btnSpin.sprite.frame = 1;
            },
            _oContainer,
            LobbyConfig.isDebug,
            "btn_spin_bonusRE",
            function(){
                _btnSpin.sprite.scale.setTo(1);
                _btnSpin.sprite.frame = 0;
                that._onButClicked();
            },
            {x:0.5,y:0.5},
            {x:2,y:2},
            null);
        _btnSpin.sprite.frame = 0;

        _oRuleText = my.add.sprite(settings.CANVAS_WIDTH/2,
            settings.CANVAS_HEIGHT - 100,
            'text_bonus_fs',
            null,
            _oContainer);
        _oRuleText.anchor.setTo(0.5);

        _oContainer.visible = true;

        if (my.currentGameSlot.s_oBonusToRestore !== null && my.currentGameSlot.s_oBonusToRestore.bonus_step > 0) {
            this.restore();
        }
    };
    /**
     * Restore last FreeSpin that hasn't finished
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
            this.showResult(0,
                aHistory[i].mul,
                aHistory[i].win);
        }

    };
    /**
     * Call back when user touch button
     * @param iIndex: button Index
     * @private
     */
    this._onButClicked = function (iIndex) {
        if (LobbyConfig.isDebug) {
            console.log("CBonusFreeSpin _onButJellyFishReleased");
        }
        if (_bButtonClicked) {
            return;
        }
        _bButtonClicked = true;

        _btnSpin.btn.inputEnabled = false;
        Manager4Sound.playBtnClicked ();
        my.currentGameSlot.s_oGame.chooseBonusFreeSpin(1);
    };

    /**
     * Show Result function : called when User has selected and received info from Server
     * @param iFinish: boolen - true if finish FreeSpin
     * @param iMul: multiplier win
     * @param iTotWin: total win
     */
    this.showResult = function (iFinish, iMul, iTotWin) {
        if (LobbyConfig.isDebug) {
            console.log("CBonusFreeSpin show");
        }
        if(LobbyConfig.isTestAlgorithmMode){
            //arrayOfSelected.push(aWheels[iIndex].select);
            return iTotWin;
        }
        _oRuleText.visible = false;
        _btnSpin.btn.inputEnabled = false;
        if(iFinish == 0){
            _oWheel.spinWheel(iMul, function(){
                Manager4Sound.playWheelOfFortune();
            }, function(){
                my.currentGameSlot.s_oGame.chooseBonusFreeSpin(1);
                Manager4Sound.stopWheelOfFortune();
                Manager4Sound.playDoubleUpWin();
            }, 9000);
        }else{
            my.time.events.add(1000, function(){
                that.showFinalWin(iTotWin, iMul);
            });
        }
    };
    /**
     * Show final win or exit when finishing FreeSpin
     * @param totalWin: total Win
     * @param totalMulti: total Multiplier won
     */
    this.showFinalWin = function (totalWin, totalMulti) {
        my.currentGameSlot.s_oGame.showFreeSpinBonusWinPanel(totalWin, totalMulti, function(){
            that._exitFromBonus();
        });
    };
    /**
     * Exit Bonus to Main Game
     * @param isSkipFreeSpin: boolen - true if need to skip show Win Text on Footer object
     */
    this._exitFromBonus = function (isSkipFreeSpin) {
        if (LobbyConfig.isDebug) {
            console.log("CBonusFreeSpin _exitFromBonus");
        }
        //_oTotWinSfx.destroy();
        _oContainer.visible = false;
        my.currentGameSlot.s_oGame.getContainer().visible = true;
        //_oContainer.removeAll();
        //RESET GAME
        Lobby.PhaserJS.destroyAllChild(_oContainer);


        settings.IS_DISABLE_ALL_BUTTON = false;
        settings.IS_PLAYING_WIN_PANEL = false;

        my.currentGameSlot.s_oGame.exitFromBonus();


    };
    /**
     * Initialize wheel info (values, angle for each value)
     * @private
     */
    this._initWheelInfo = function () {
        var aWheelValue = [];

        aWheelValue.push(2);
        aWheelValue.push(5);
        aWheelValue.push(25);
        aWheelValue.push(80);
        aWheelValue.push(30);
        aWheelValue.push(20);
        aWheelValue.push(60);
        aWheelValue.push(50);
        aWheelValue.push(25);
        aWheelValue.push(35);
        aWheelValue.push(12);
        aWheelValue.push(20);
        aWheelValue.push(5);
        aWheelValue.push(15);
        aWheelValue.push(25);
        aWheelValue.push(10);
        aWheelValue.push(8);
        aWheelValue.push(5);
        aWheelValue.push(40);
        aWheelValue.push(15);
        aWheelValue.push(25);
        aWheelValue.push(3);

        _aWheelInfo = [];
        for(var i = 0; i < 22; i++){
            _aWheelInfo.push({
                angle: i * 360/22,
                value: aWheelValue[i]
            });
        }

    };
    this.createGroup();
    _oParentContainer = oParentContainer;
}