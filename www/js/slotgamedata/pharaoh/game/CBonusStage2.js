/**
 * CLASS CREATES AND MANAGES BONUS STAGE 2
 * @param my
 * @param oParentContainer
 * @constructor
 */
function CBonusStage2(my, oParentContainer) {
    var _bSpriteLoaded = false;
    var _bButtonClicked;
    var isLoading = false;

    var _iCurrentTotWin = 0.;
    var _iTotMulty;

    var _oSoundtrack = null;

    var loaderUI;

    var _oContainer;
    var _oParentContainer;

    var _oTotWinSfx;

    var that = this;
    this.isShowed = false;

    var _oRuleText;
    var _oWheelBG;
    var _aGems;

    var _oWheel;
    var _aIndicator;

    var aimButton;

    var iModeBonus;

    var _aWheelInfo;

    var _bLocalRotateWheel;

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
     * Show BG loading from Bonus Stage 1
     * @param iMode: deprecated
     */
    this.showWait = function(iMode){
        var oBg = my.add.sprite(0, 0, 'loading-bonus');
        _oContainer.add(oBg);
        _oContainer.visible = true;
    };
    /**
     * Show Bonus
     * @param iMode: Wheel Mode
     */
    this.show = function (iMode) {
        if (LobbyConfig.isDebug) {
            console.log('CBonusStage2 show');
        }
        _oContainer.removeAll();
        _oContainer.visible = true;
        _bButtonClicked = false;
        iModeBonus = iMode;
        //IF RESOURCES FOR THIS BONUS WAS ALREADY LOADED, SIMPLY LAUNCH THE BONUS OTHERWISE LOAD THE RESOURCES
        //if (_bSpriteLoaded) {
        //    this._init();
        //} else {
            this._loadAllResources();
        //}

        Manager4State.setCurrentState(my.currentGameSlot.GameConstant.State.Bonus);
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

        var oBg = my.loadBG('loading-bonus',_oContainer);
        //var oBg = my.add.sprite(0, 0, 'loading-bonus');
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

        ManagerForImage.loadSprite(loader, 'bg-bonusstage2', 'img/slotgamedata/pharaoh/sprites/bonus_game2/BG.jpg?' + LobbyConfig.versionDisplay, true);
        ManagerForImage.loadSprite(loader, 'text_intro_stage2', 'img/slotgamedata/pharaoh/sprites/bonus_game2/instruction.png?' + LobbyConfig.versionDisplay, true);
        ManagerForImage.loadSprite(loader, 'aim', 'img/slotgamedata/pharaoh/sprites/bonus_game2/aim.png?' + LobbyConfig.versionDisplay, true);
        ManagerForImage.loadSprite(loader, 'aim_pressed', 'img/slotgamedata/pharaoh/sprites/bonus_game2/aim-pressed.png?' + LobbyConfig.versionDisplay, true);
        ManagerForImage.loadSprite(loader, 'arrow', 'img/slotgamedata/pharaoh/sprites/bonus_game2/arrow.png?' + LobbyConfig.versionDisplay, true);
        ManagerForImage.loadSprite(loader, 'box_multiplier', 'img/slotgamedata/pharaoh/sprites/bonus_game2/box-multiplier.png?' + LobbyConfig.versionDisplay, true);
        ManagerForImage.loadSprite(loader, 'box_total_bet', 'img/slotgamedata/pharaoh/sprites/bonus_game2/box-total-bet.png?' + LobbyConfig.versionDisplay, true);
        ManagerForImage.loadSprite(loader, 'box_totalWin', 'img/slotgamedata/pharaoh/sprites/bonus_game2/box-totalwin.png?' + LobbyConfig.versionDisplay, true);
        ManagerForImage.loadSprite(loader, 'wheelBg', 'img/slotgamedata/pharaoh/sprites/bonus_game2/wheel bg .png?' + LobbyConfig.versionDisplay, true);
        ManagerForImage.loadSprite(loader, 'gem', 'img/slotgamedata/pharaoh/sprites/bonus_game2/gem.png?' + LobbyConfig.versionDisplay, true);

        for(var i = 1; i < 4; i++){
            ManagerForImage.loadSprite(loader, 'wheel_' + i, 'img/slotgamedata/pharaoh/sprites/bonus_game2/wheel_' + i + '.png?' + LobbyConfig.versionDisplay, true);
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
            console.log('CDoubleUp _init');
        }


        my.onFinishLoadingBonus();

        _oContainer.removeAll();

        var oBg = my.add.sprite(0,0,'bg-bonusstage2');
        _oContainer.add(oBg);

        _oContainer.visible = true;

        _oWheelBG = my.add.sprite(settings.CANVAS_WIDTH/2 + 20,
            settings.CANVAS_HEIGHT/2 + 40, 'wheelBg', null, _oContainer);
        _oWheelBG.anchor.setTo(0.5);

        if(_aGems != null) {
            for (var i = 0; i < _aGems.length; i++) {
                _aGems[i].destroy();
            }
        }
        _aGems = [];

        var posGem = [{x:-360,y:-125},{x:7,y:-380},{x:362,y:-115}];
        var angleGem = [-72, 0, 72];

        for(var i = 0; i < 3; i++){
            _aGems[i] = my.add.sprite(posGem[i].x,
                posGem[i].y, 'gem');
            _aGems[i].angle = angleGem[i];
            _aGems[i].alpha = 0.4;
            _aGems[i].anchor.setTo(0.5);
            _oWheelBG.addChild(_aGems[i]);
        }

        this._initWheelInfo();

        _oWheel = Lobby.PhaserJS.createWheel(my,
            {
                posX: settings.CANVAS_WIDTH/2 + 20,
                posY: settings.CANVAS_HEIGHT/2 + 40,
                spriteName: 'wheel_' + iModeBonus,
                parent: _oContainer

            },
            _aWheelInfo
        );

        var arrow = my.add.sprite(settings.CANVAS_WIDTH/2 + 20,
            260, 'arrow', null, _oContainer);
        arrow.anchor.setTo(0.5);

        if(_aIndicator != null){
            for(var i = 0; i < _aIndicator.length; i++){
                _aIndicator[i].destroy();
            }
        }
        _aIndicator = [];
        _aIndicator[0] = this.createIndicator(_oContainer, 'box_total_bet', {x: settings.CANVAS_WIDTH/2 - 400, y: 275}, my.currentGameSlot.s_iTotBet.toFixed(0), 30);
        _aIndicator[1] = this.createIndicator(_oContainer, 'box_multiplier', {x: settings.CANVAS_WIDTH/2 + 440, y: 275}, "", 30);
        _aIndicator[2] = this.createIndicator(_oContainer, 'box_totalWin', {x: settings.CANVAS_WIDTH/2 + 20, y: settings.CANVAS_HEIGHT - 100}, "", 50);

        aimButton = Lobby.PhaserJS.createSpriteRectangleExt(my,
            settings.CANVAS_WIDTH/2 + 20,
            settings.CANVAS_HEIGHT/2 + 40,
            function(){
                aimButton.loadTexture('aim_pressed');
                that._btnGamblingClicked();
            },
            function(){

            },
            function(){

            },
            _oContainer,
            LobbyConfig.isDebug,
            'aim');
        aimButton.anchor.setTo(0.5);

        _iTotMulty = 0;
        _bLocalRotateWheel = false;

        _oRuleText = my.add.sprite(settings.CANVAS_WIDTH/2,
            settings.CANVAS_HEIGHT - 100,
            'text_intro_stage2',
            null,
            _oContainer);
        _oRuleText.anchor.setTo(0.5);

        this.isShowed = true;

        if (my.currentGameSlot.s_oBonusToRestore !== null && my.currentGameSlot.s_oBonusToRestore.bonus_step > 0) {
            this.restore();
        }
    };
    /**
     * Create box sprite and text UI
     * @param parent: group parent
     * @param boxSprite: sprite name of Box Image
     * @param pos: Position
     * @param text: string - text
     * @param fontSize: text's font size
     * @returns {*} group Object
     */
    this.createIndicator = function(parent, boxSprite, pos, text, fontSize){
        var object = my.add.group();
        parent.add(object);

        object.position = pos;

        object.boxSprite = my.add.sprite(0,0,boxSprite,null,object);
        object.boxSprite.anchor.setTo(0.5);

        object.text = my.add.text(0, object.boxSprite.y + 270/fontSize, text, {
            //font: '30px ADONAIS',
            font: fontSize + 'px ADONAIS',
            fill: '#E8C92E',
            stroke: '#854703',
            strokeThickness: 10
        }, object);
        object.text.anchor.setTo(0.5);

        object.visible = false;

        return object;
    };
    /**
     * Call back when user touch button
     * @param iIndex: button Index
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
        _bLocalRotateWheel = true;

        Manager4Sound.playBonus2WheelSpin ();
        my.currentGameSlot.s_oGame.chooseBonus(1);
    };

    /**
     * Restore last Bonus that hasn't finished
     */
    this.restore = function () {
        if (LobbyConfig.isDebug) {
            console.log('CDoubleUp restore');
        }
        var aHistory = my.currentGameSlot.s_oBonusToRestore.history;

        if (aHistory === null || aHistory === undefined) {
            return;
        }

        for (var i = 0; i < aHistory.length; i++) {
            this.showResult(my.currentGameSlot.s_oBonusToRestore.finish, aHistory, i, true);
        }

    };
    /**
     * Show final win when finishing Bonus
     */
    this.showFinalWin = function (iTotWin1, iTotWin2) {
        if (LobbyConfig.isDebug) {
            console.log('CDoubleUp showFinalWin');
        }

        my.currentGameSlot.s_oGame.showBonusWinPanel(iTotWin1, iTotWin2, function(){
           that.exitFromBonus();
        });
    };
    /**
     * Exit Bonus
     * @param isSkipShowWin: boolen - true if need to skip show Win Text on Footer object
     */
    this.exitFromBonus = function (isSkipShowWin) {
        if (LobbyConfig.isDebug) {
            console.log('CDoubleUp exitFromDoubleUp');
        }
        _oContainer.visible = false;
        //_oContainer.removeAll();
        //RESET GAME


        if (_oTotWinSfx != null) {
            _oTotWinSfx.destroy();
        }

        //my.currentGameSlot.s_oGame.hideWinPanel();

        my.currentGameSlot.s_oGame.getContainer().visible = true;


        settings.IS_DISABLE_ALL_BUTTON = false;
        settings.IS_PLAYING_WIN_PANEL = false;
        this.isShowed = false;
        Lobby.PhaserJS.destroyAllChild(_oContainer);


        if(isSkipShowWin){
            my.currentGameSlot.s_oGame.exitFromBonus();
        }
        my.currentGameSlot.s_oGame.exitFromDoubleUp(
            _iCurrentTotWin
        );


    };
    /**
     * Show Result function : called when User has selected and received info from Server
     * @param iFinish: boolen - true if finish Bonus
     * @param aItem: array items info
     * @param iIndex: index User selected
     * @param bSkipAnim: boolen - check if it should skip animation
     */
    this.showResult = function (iFinish, aItem, iIndex, bSkipAnim) {
        if (LobbyConfig.isDebug) {
            console.log('CDoubleUp showResult');
        }

        var iWin = aItem[iIndex].win;
        var iSelect = aItem[iIndex].select - 1;
        var iPrize = parseInt(aItem[iIndex].prize);
        _iTotMulty += iPrize;

        if(LobbyConfig.isTestAlgorithmMode){
            return iWin;
        }

        _aGems[iIndex].alpha = 1;
        _oRuleText.visible = false;
        if(!bSkipAnim) {

            _oWheel.spinWheel(iPrize, function(){
                _bLocalRotateWheel = false;
            },function(){
                Manager4Sound.stopBonus2WheelSpin();
                Manager4Sound.playBonus2WheelStop();
                if(my.managerForAutoGameSlot.autoPlayBonus){
                    my.callAutoPlayBonus(iFinish, null, 1);
                }
                if (iFinish != 1) {
                    _bButtonClicked = false;
                    aimButton.loadTexture('aim');
                    aimButton.inputEnabled = true;
                }else{
                    aimButton.inputEnabled = false;

                    var iTotWin1 = 0;

                    iTotWin1 += aItem[2].win1;
                    var iTotWin2 = 0;

                    iTotWin2 += aItem[2].win2;

                    iWin = iTotWin2;

                    my.time.events.add(500, function () {
                        that.showFinalWin(
                            iTotWin1, iTotWin2);
                    });
                }
                that.showResultAfterRol(iWin, _iTotMulty);
            }, 9000);
        }
        else{
            that.showResultAfterRol(iWin, _iTotMulty);
        }
    };
    /**
     * Update text Result after Rollong Wheel
     * @param iWin: win amount
     * @param totalMulty: total Multiplier
     */
    this.showResultAfterRol = function(iWin, totalMulty){
        _aIndicator[0].visible = true;
        _aIndicator[1].text.text = totalMulty.toFixed(0);
        _aIndicator[1].visible = true;
        _aIndicator[2].text.text = iWin.toFixed(0);
        _aIndicator[2].visible = true;
    };
    /**
     * Update function for Bonus
     */
    this.update = function(){
        _oWheelBG.angle -= 0.2;
    };
    /**
     * Init Info about Wheel (values, angle for each value)
     * @private
     */
    this._initWheelInfo = function () {
        var aWheelValue = [];

        switch (iModeBonus) {
            case 1:
                aWheelValue =
                    [4,
                        80,
                        8,
                        10,
                        50,
                        5,
                        20,
                        100,
                        15,
                        3];
                break;
            case 2:
                aWheelValue =
                    [4,
                        3,
                        5,
                        60,
                        8,
                        10,
                        15,
                        200,
                        25,
                        100];
                break;
            case 3:
                aWheelValue =
                    [200,
                        100,
                        10,
                        80,
                        5,
                        50,
                        20,
                        300,
                        8,
                        15];
                break;
        }
        _aWheelInfo = [];
        for(var i = 0; i < 10; i++){
            _aWheelInfo.push({
                angle: i * 36,
                value: aWheelValue[i]
            });
        }

    };

    this.createGroup();
    _oParentContainer = oParentContainer;
}