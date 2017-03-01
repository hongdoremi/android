/**
 * CLASS CREATES AND MANAGES BONUS PALACE
 * @param my: Phaser Game Object
 * @param oParentContainer: Group parent
 * @param groupOfAnimation: array contains all animation of Nezha
 * @constructor
 */
function CBonusPalaceLN(my, oParentContainer, groupOfAnimation) {
    var _bSpriteLoaded = false;
    var _bButtonClicked;
    var isLoading = false;

    var _oSoundtrack = null;

    var loaderUI;

    var _oContainer;
    var _oParentContainer;

    var iTotWin;

    var _aBtn = [];
    var _aButtonInfo;
    var explosion;

    var _iFinish = false;

    var _oRuleText;


    var that = this;
    this.isShowed = false;

    var arrayOfSelected = [];


    /**
     * Create Group function
     */
    this.createGroup = function(){
        _oContainer = my.add.group();
        oParentContainer.add(_oContainer);
        my.scaleCenterGroup(_oContainer,1,_oContainer);
        _oContainer.visible = false;
    };
    /**
     * Show function
     * @param currentWin: current Win of User
     */
    this.show = function (currentWin) {
        if (LobbyConfig.isDebug) {
            console.log('CDoubleUp show');
        }
        _oContainer.visible = true;
        _bButtonClicked = false;
        //IF RESOURCES FOR THIS BONUS WAS ALREADY LOADED, SIMPLY LAUNCH THE BONUS OTHERWISE LOAD THE RESOURCES
        //if (_bSpriteLoaded) {
        //    this._init();
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

        var oBg = my.add.sprite(0,0,"bg-loading");
      oBg.body = null;
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

        //s_oSpriteLibrary.addSprite('bg-double-up', 'img/slotgamedata/legendofnezha/sprites/doubleUp/double up bg.jpg?' + VERSION_IMAGE);
        ManagerForImage.loadSprite(loader, 'background_bonuspalace', 'img/slotgamedata/legendofnezha/sprites/bonuspalace/bg_bonus_palace.jpg?' + LobbyConfig.versionDisplay, true);
        ManagerForImage.loadSprite(loader, 'bonuspalace_box', 'img/slotgamedata/legendofnezha/sprites/bonuspalace/bonus-box.png?' + LobbyConfig.versionDisplay, true);
        ManagerForImage.loadSprite(loader, 'fenghuolun-normal', 'img/slotgamedata/legendofnezha/sprites/bonuspalace/fenghuolun-normal.jpg?' + LobbyConfig.versionDisplay, true);
        ManagerForImage.loadSprite(loader, 'fenghuolun-mouse-over', 'img/slotgamedata/legendofnezha/sprites/bonuspalace/fenghuolun-mouse-over.jpg?' + LobbyConfig.versionDisplay, true);
        ManagerForImage.loadSprite(loader, 'ring-normal', 'img/slotgamedata/legendofnezha/sprites/bonuspalace/ring-normal.jpg?' + LobbyConfig.versionDisplay, true);
        ManagerForImage.loadSprite(loader, 'ring-mouse-over', 'img/slotgamedata/legendofnezha/sprites/bonuspalace/ring-mouse-over.jpg?' + LobbyConfig.versionDisplay, true);
        ManagerForImage.loadSprite(loader, 'sash-normal', 'img/slotgamedata/legendofnezha/sprites/bonuspalace/sash-normal.jpg?' + LobbyConfig.versionDisplay, true);
        ManagerForImage.loadSprite(loader, 'sash-mouse-over', 'img/slotgamedata/legendofnezha/sprites/bonuspalace/sash-mouse-over.jpg?' + LobbyConfig.versionDisplay, true);
        ManagerForImage.loadSprite(loader, 'spear-normal', 'img/slotgamedata/legendofnezha/sprites/bonuspalace/Spear-Normal.jpg?' + LobbyConfig.versionDisplay, true);
        ManagerForImage.loadSprite(loader, 'spear-mouse-over', 'img/slotgamedata/legendofnezha/sprites/bonuspalace/Spear-mouse-over.jpg?' + LobbyConfig.versionDisplay, true);
        ManagerForImage.loadSprite(loader, 'text-bonus-palace', 'img/slotgamedata/legendofnezha/sprites/bonuspalace/text_bonus_palace.png?' + LobbyConfig.versionDisplay, true);

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

        var oBg = my.add.sprite(0,0,'background_bonuspalace');
      oBg.body = null;
        _oContainer.add(oBg);
        _oContainer.visible = true;

        iTotWin = 0;

        if(_aBtn != null){
            for(var i = 0; i < _aBtn.length; i++){
                _aBtn[i].destroy();
            }
        }

        if(_aButtonInfo == null){
            _aButtonInfo = [
                {posNormal: {x:668,y:818},
                    posClick: {x:686,y:741},
                    nameSpriteClicked: 'spear-mouse-over'},
                {posNormal: {x:1237,y:777},
                    posClick: {x:1285,y:730},
                    nameSpriteClicked: 'fenghuolun-mouse-over'},
                {posNormal: {x:1366,y:210},
                    posClick: {x:1365,y:243},
                    nameSpriteClicked: 'ring-mouse-over'},
                {posNormal: {x:508,y:245},
                    posClick: {x:502,y:245},
                    nameSpriteClicked: 'sash-mouse-over'}
            ];
        }

        _aBtn = [];

        _aBtn[0] = this.createWeaponButton(_oContainer, 'spear-normal', _aButtonInfo[0].posNormal, 1);
        _aBtn[1] = this.createWeaponButton(_oContainer, 'fenghuolun-normal', _aButtonInfo[1].posNormal, 2);
        _aBtn[2] = this.createWeaponButton(_oContainer, 'ring-normal', _aButtonInfo[2].posNormal, 3);
        _aBtn[3] = this.createWeaponButton(_oContainer, 'sash-normal', _aButtonInfo[3].posNormal, 4);

        _oRuleText = my.add.sprite(settings.CANVAS_WIDTH/2,
            settings.CANVAS_HEIGHT - 100 * ManagerForScale.getScale(),
            'text-bonus-palace',
            null,
            _oContainer);
      _oRuleText.body = null;
        _oRuleText.anchor.setTo(0.5);


        explosion= new SpriteAnimation(
            my,
            _oContainer,
            {x:0,y:0},
            {x:1,y:1},
            'explode_effect_',
            0,
            14,
            false);
        //explosion.playWithoutTimer();
        //explosion.need2LoadFirst = true;
        explosion.scale({x:2,y:2});
        groupOfAnimation.push(explosion);


        //explosion.scale(2,2);

        this.isShowed = true;


        if (my.currentGameSlot.s_oBonusToRestore !== null && my.currentGameSlot.s_oBonusToRestore.bonus_step > 0) {
            this.restore();
        }
    };
    /**
     * Create Weapon Group (Sprite + Button) on the Scene and manage its input event
     * @param parent: Group parent
     * @param spriteName: name of Sprite
     * @param pos: Position
     * @param index: index of icon
     * @returns {*} group object
     */
    this.createWeaponButton = function(parent, spriteName, pos, index){
        var btn = my.add.group();
        parent.add(btn);
        btn.oBut = Lobby.PhaserJS.createSpriteRectangleWithPixelPerfect(
            my,
            pos.x,
            pos.y,
            function () {
                that._btnGamblingClicked(index);
            },
            function () {
            },
            function () {
            },
            true,
            true,
            true,
            btn,
            LobbyConfig.isDebug,
            spriteName
        );
        btn.oBut.anchor.setTo(0.5);

        btn.oTextBG = my.add.sprite(btn.oBut.x , (settings.CANVAS_HEIGHT - 180) - Math.floor(index/3)*475,'bonuspalace_box',null,btn);
      btn.oTextBG.body = null;
        btn.oTextBG.anchor.setTo(0.5);
        btn.oTextBG.visible = false;

        btn.text = my.add.text( btn.oTextBG.x,  btn.oTextBG.y, '0', {
            font: '35px CopperPlates',
            fill: '#FBFF00',
            fontWeight: 'bold'
        }, btn);
        btn.text.anchor.setTo(0.5);
        btn.text.visible = false;


        return btn;
    };
    /**
     * Set the sprite and text UI of Weapon icon
     * @param index: index of icon
     * @param iWin: win amount
     * @param bSelected: boolen - check if this is selected by User
     */
    this.setBtnSprite = function(index, iWin, bSelected){
        _aBtn[index].oTextBG.visible = true;
        _aBtn[index].text.visible = true;
        _aBtn[index].text.text = iWin.toFixed(0);
        if(bSelected){
            _aBtn[index].oBut.loadTexture(_aButtonInfo[index].nameSpriteClicked);
            _aBtn[index].oBut.position = _aButtonInfo[index].posClick;
        }else{
            _aBtn[index].text.fill = '#3F3F3F';
        }
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

        explosion.setPosition(_aBtn[iIndex - 1].oBut.x, _aBtn[iIndex - 1].oBut.y);
        explosion.playWithoutTimer();

        Manager4Sound.playBtnPalaceClicked ();
        my.currentGameSlot.s_oGame.chooseBonusDoubleUp(iIndex);
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
            this.showResult(my.currentGameSlot.s_oBonusToRestore.finish,
                aHistory,
                i,
                false);
        }


    };
    /**
     * Show final win or exit when finishing Bonus
     */
    this.showFinalWin = function () {
        if (LobbyConfig.isDebug) {
            console.log('CDoubleUp showFinalWin');
        }
        my.currentGameSlot.s_oGame.showWinPanel('TOTAL WIN', '0', iTotWin, function(){
           that.exitFromBonus();
        });
    };
    /**
     * Exit Bonus to Main Game
     */
    this.exitFromBonus = function () {
        if (LobbyConfig.isDebug) {
            console.log("CBonusFreeSpin _exitFromBonus");
        }
        //_oTotWinSfx.destroy();
        _oContainer.visible = false;
        my.currentGameSlot.s_oGame.getContainer().visible = true;
        //_oContainer.removeAll();
        //RESET GAME


        if(Lobby.Utils.objectNotNull(_aBtn)) {
            this.enableAllBtn();
        }
        this.destroy();
        Lobby.PhaserJS.destroyAllChild(_oContainer);
        settings.IS_DISABLE_ALL_BUTTON = false;
        settings.IS_PLAYING_WIN_PANEL = false;

        //
        my.currentGameSlot.s_oGame.exitFromBonus();


    };
    /**
     * Disable all button
     */
    this.disableAllBtn = function () {
        if (LobbyConfig.isDebug) {
            console.log('CDoubleUp disableAllBtn');
        }
        for (var i = 0; i < _aBtn.length; i++) {
            _aBtn[i].inputEnabled = false;
        }
    };
    /**
     * Enable all button
     */
    this.enableAllBtn = function () {
        if (LobbyConfig.isDebug) {
            console.log('CDoubleUp enableAllBtn');
        }
        for (var i = 0; i < _aBtn.length; i++) {
            _aBtn[i].inputEnabled = true;
        }
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
     * @param aWheels: array wheels info
     * @param iIndex: index User selected
     */
    this.showResult = function (iFinish, aWheels, iIndex) {
        if (LobbyConfig.isDebug) {
            console.log('CDoubleUp showResult');
        }

        _iFinish = iFinish;

        for(var i = 0; i < aWheels.length; i++)
        {
            var iWin = aWheels[i].win;
            var iSelect = aWheels[i].select - 1;
            if(my.managerForAutoGameSlot.autoPlayBonus || LobbyConfig.isTestAlgorithmMode){
                arrayOfSelected.push(aWheels[i].select);
            }
            if (iSelect >= 0)
            {
                iTotWin = iWin;
                if(!LobbyConfig.isTestAlgorithmMode) {
                    this.setBtnSprite(iSelect, iWin, true);
                }
            }
            else
            {
                if(!LobbyConfig.isTestAlgorithmMode) {
                    this.setBtnSprite(i, iWin, false);
                }
            }
        }

        if(my.managerForAutoGameSlot.autoPlayBonus) {
            my.callAutoPlayBonus(iFinish, arrayOfSelected);
        }

        if(LobbyConfig.isTestAlgorithmMode){
            return iTotWin;
        }

        if (iFinish === 1) {

            this.disableAllBtn();

            var oParent = this;


            settings.IS_DISABLE_ALL_BUTTON = true;
            settings.IS_PLAYING_WIN_PANEL = true;

            _oRuleText.visible = false;
          my.time.events.add(4000,
            function () {
                oParent.showFinalWin(
                    iTotWin);
            }, this);

        } else {
          //my.time.events.add(1000,
          //  function () {
          //      _bButtonClicked = false;
          //  }, this);
        }


    };
    this.destroy = function(){
        if(explosion){
            explosion.stop();
            explosion.destroy();
            explosion = null;
        }
    };
    this.update = function () {
    };
    this.createGroup();
    _oParentContainer = oParentContainer;
}
