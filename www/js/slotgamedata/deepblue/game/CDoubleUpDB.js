/**
 * CLASS CREATE AND MANAGE DOUBLE UP
 * @param my: Phaser Game Object
 * @param oParentContainer: Group Parent
 * @constructor
 */
function CDoubleUpDB(my, oParentContainer) {
  var isLoading = false;
    var _bSpriteLoaded = false;
    var _bButtonClicked;

    var _iCurrentTotWin = 0.;

    var _oSoundtrack = null;

    var loaderUI;

    var _oContainer;
    var _oParentContainer;

    var _oTotalBetTxt;
    var _oTotalWinTxt;

    var _oFinalTotalWinTxt;


    var _winDoubleUpAnimation = null;
    var _loseDoubleUpAnimation = null;

    var _bluefishIdleAnimation = null;
    var _anglerfishIdleLeftAnimation = null;
    var _anglerfishIdleRightAnimation = null;
    var _oTotWinSfx;
    var _aBtn = [];

    var _iFinish = false;

    var _iTotWinRollingId;

    var that = this;
    this.isShowed = false;

    var scale4BigAnimation = 2;
    var defaultFPS = 30;
    var winAnimation = null;
    var loseAnimation = null;
    var anglerFishAnimationLeft = null;
    var anglerFishAnimationRight = null;
    var blueFishAnimation = null;
    var allowPlayWinAnimation = false;
    var allowPlayLoseAnimation = false;

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
        ManagerForImage.loadSprite(loader, 'bottom-bar', 'img/slotgamedata/deepblue/sprites/doubleUp/bottom-bar.png?' + LobbyConfig.versionDisplay, true);
        ManagerForImage.loadSprite(loader, 'btn-escape', 'img/slotgamedata/deepblue/sprites/doubleUp/btn_escape.png?' + LobbyConfig.versionDisplay, true);
        ManagerForImage.loadSprite(loader, 'btn-capture', 'img/slotgamedata/deepblue/sprites/doubleUp/btn_capture.png?' + LobbyConfig.versionDisplay, true);
        ManagerForImage.loadSprite(loader, 'btn-collect', 'img/slotgamedata/deepblue/sprites/doubleUp/btn_collect.png?' + LobbyConfig.versionDisplay, true);

        //2015-09-12: Phuoc
        for (var index = 1; index < 24 + 1; index++) {
            //Win
            ManagerForImage.loadSprite(loader, 'win_ani_sprite_' + index,
                                       'img/slotgamedata/deepblue/sprites/doubleUp/doubleUp_Win_0_25/doubleup_win_' + index + '.png?' + LobbyConfig.versionDisplay, true);
            //Lose
            ManagerForImage.loadSprite(loader, 'lose_ani_sprite_' + index,
                'img/slotgamedata/deepblue/sprites/doubleUp/doubleUp_Lose_0_25/doubleup_lose_' + index + '.png?' + LobbyConfig.versionDisplay, true);
            //Angler fish
            ManagerForImage.loadSprite(loader, 'angler_fish_ani_sprite_' + index,
                'img/slotgamedata/deepblue/sprites/doubleUp/anglerFish_IDLE_0_25/doubleup_anglerfish_' + index + '.png?' + LobbyConfig.versionDisplay, true);
            //Blue fish
            ManagerForImage.loadSprite(loader, 'blue_fish_ani_sprite_' + index,
                'img/slotgamedata/deepblue/sprites/doubleUp/blueFish_Idle_0_25/bluefish_' + index + '.png?' + LobbyConfig.versionDisplay, true);

        }
        //for (var index = 1; index < 24 + 1; index++) {}
        //for (var index = 1; index < 24 + 1; index++) {}
        //for (var index = 1; index < 24 + 1; index++) {}
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
        _bSpriteLoaded = true;

      isLoading = false;
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
        //var oBg = my.add.sprite(0,0,'bg-double-up');
        //_oContainer.add(oBg);


        _oContainer.visible = true;

        if (my.currentGameSlot.s_oBonusToRestore !== null && my.currentGameSlot.s_oBonusToRestore.bonus_step > 0) {
            this.restore();
        }

        scale4BigAnimation = 4;
        defaultFPS = 30;
        winAnimation = new SpriteAnimation(my,
            _oContainer,
            {x:settings.CANVAS_WIDTH / 2.,y:settings.CANVAS_HEIGHT / 2.},
            {x:scale4BigAnimation,y:scale4BigAnimation},
            'win_ani_sprite_',
            1,
            24,
            false);
        //
        loseAnimation = new SpriteAnimation(my,
            _oContainer,
            {x:settings.CANVAS_WIDTH / 2.,y:settings.CANVAS_HEIGHT / 2.},
            {x:scale4BigAnimation,y:scale4BigAnimation},
            'lose_ani_sprite_',
            1,
            24,
            false);
        //
        anglerFishAnimationLeft = new SpriteAnimation(my,
            _oContainer,
            {x:settings.CANVAS_WIDTH / 2. - 350,y:settings.CANVAS_HEIGHT / 2. - 100},
            {x:scale4BigAnimation,y:scale4BigAnimation},
            'angler_fish_ani_sprite_',
            1,
            24,
            true);
        anglerFishAnimationLeft.play(defaultFPS);
        //
        anglerFishAnimationRight = new SpriteAnimation(my,
            _oContainer,
            {x:settings.CANVAS_WIDTH / 2. + 350,y:settings.CANVAS_HEIGHT / 2. - 100},
            {x:-scale4BigAnimation,y:scale4BigAnimation},
            'angler_fish_ani_sprite_',
            1,
            24,
            true);
        anglerFishAnimationRight.play(defaultFPS);
        //
        //
        blueFishAnimation = new SpriteAnimation(my,
            _oContainer,
            {x:settings.CANVAS_WIDTH / 2.,y:settings.CANVAS_HEIGHT / 2. - 140},
            {x:scale4BigAnimation / 2,y:scale4BigAnimation / 2},
            'blue_fish_ani_sprite_',
            1,
            24,
            true);
        blueFishAnimation.play(defaultFPS);

        var bottomBar = my.add.sprite(0,0,'bottom-bar');
        _oContainer.add(bottomBar);
        bottomBar.x = settings.CANVAS_WIDTH / 2.;
        bottomBar.y = settings.CANVAS_HEIGHT - 202 * 2 / 3.;
        bottomBar.anchor.setTo(0.5,0.5);


        if (_aBtn != null) {
            for (var i = 0; i < _aBtn.length; i++) {
                var oBut = _aBtn[i];
                oBut.destroy();
            }
        }
        _aBtn = [];


        var btnEscape = Lobby.PhaserJS.createSpriteRectangle(
            my,
            0,
            0,
            function(){
                btnEscape.scale.setTo(0.9);
            },
            function(){

            },
            function(){

            },
            false,
            _oContainer,
            false,
            'btn-escape',
            function(){
                btnEscape.scale.setTo(1);
                that._btnGamblingClicked(1);
            }
        );
        btnEscape.x = settings.CANVAS_WIDTH / 2. - btnEscape.width / 2. - 60;
        btnEscape.y = settings.CANVAS_HEIGHT - btnEscape.height * 1.8;
        btnEscape.anchor.setTo(0.5);
        _aBtn[0] = btnEscape;

        var btnCapture = Lobby.PhaserJS.createSpriteRectangle(
            my,
            0,
            0,
            function(){
                btnCapture.scale.setTo(0.9);
            },
            function(){

            },
            function(){

            },
            false,
            _oContainer,
            false,
            'btn-capture',
            function(){
                btnCapture.scale.setTo(1);
                that._btnGamblingClicked(2);
            }
        );
        btnCapture.x = settings.CANVAS_WIDTH / 2. + btnCapture.width / 2.;
        btnCapture.y = settings.CANVAS_HEIGHT - btnCapture.height * 1.8;
        btnCapture.anchor.setTo(0.5);
        _aBtn[1] = btnCapture;

        var btnCollect = Lobby.PhaserJS.createSpriteRectangle(
            my,
            0,
            0,
            function(){
                btnCollect.scale.setTo(0.9);
            },
            function(){

            },
            function(){

            },
            false,
            _oContainer,
            false,
            'btn-collect',
            function(){
                btnCollect.scale.setTo(1);
                that._btnGamblingClicked(0);
            }
        );
        btnCollect.x = settings.CANVAS_WIDTH / 2. - btnCollect.width * 2.2;
        btnCollect.y = settings.CANVAS_HEIGHT - btnCollect.height * 4.7;
        btnCollect.anchor.setTo(0.5);
        _aBtn[2] = btnCollect;


        _oTotalBetTxt = my.add.text(btnCollect.x, btnCollect.y + btnCollect.width/3.5, _iCurrentTotWin.toFixed(0), {
            font: '40px ICIEL-KONI-BLACK',
            //font: "40px PassionOne-Regular",
            fill: "#fffec5",
            stroke: '#874829',
            strokeThickness: 8
        }, _oContainer);
        _oTotalBetTxt.anchor.setTo(0.5);
        _oTotalWinTxt = my.add.text(settings.CANVAS_WIDTH - _oTotalBetTxt.x - 10,  _oTotalBetTxt.y, (_iCurrentTotWin * 2).toFixed(0), {
            font: '40px ICIEL-KONI-BLACK',
            //font: "40px PassionOne-Regular",
            fill: "#fffec5",
            stroke: '#874829',
            strokeThickness: 8
        }, _oContainer);
        _oTotalWinTxt.anchor.setTo(0.5);


        this.isShowed = true;
    };
    /**
     * Show Fishes animation after User select
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
        anglerFishAnimationLeft.visible = true;
        anglerFishAnimationRight.visible = true;
        blueFishAnimation.visible = true;

        that.enableAllBtn();

    };
    /**
     * Hide Fish aniamtion
     */
    this.hideFishes = function () {
        if (LobbyConfig.isDebug) {
            console.log('CDoubleUp hideFishes');
        }

        anglerFishAnimationLeft.visible = false;
        anglerFishAnimationRight.visible = false;
        blueFishAnimation.visible = false;

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
    this.destroy = function(){
        if(winAnimation){
            winAnimation.stop();
            winAnimation.destroy();
            winAnimation = null;
        }

        if(loseAnimation){
            loseAnimation.stop();
            loseAnimation.destroy();
            loseAnimation = null;
        }

        if(anglerFishAnimationLeft){
            anglerFishAnimationLeft.stop();
            anglerFishAnimationLeft.destroy();
            anglerFishAnimationLeft = null;
        }

        if(anglerFishAnimationRight){
            anglerFishAnimationRight.stop();
            anglerFishAnimationRight.destroy();
            anglerFishAnimationRight = null;
        }

        if(blueFishAnimation){
            blueFishAnimation.stop();
            blueFishAnimation.destroy();
            blueFishAnimation = null;
        }
    };
    /**
     * Disable button
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
     * Enable button
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
     * Update Win Text
     */
    this.updateTotalWinText = function () {
        if (LobbyConfig.isDebug) {
            console.log('CDoubleUp updateTotalWinText');
        }

        if (_iCurrentTotWin != 0) {
            _oTotalBetTxt.setText(_iCurrentTotWin.toFixed(0));
            var tweenBet = my.add.tween(_oTotalBetTxt.scale).to( { x: 1.5, y: 1.5 }, 100, Phaser.Easing.Bounce.Out, true);
            tweenBet.onComplete.add(function(){
                my.add.tween(_oTotalBetTxt.scale).to( { x: 1, y: 1 }, 100, Phaser.Easing.Cubic.In, true);
            });
            _oTotalWinTxt.setText((_iCurrentTotWin * 2).toFixed(0));
            var tweenWin = my.add.tween(_oTotalWinTxt.scale).to( { x: 1.5, y: 1.5 }, 100, Phaser.Easing.Bounce.Out, true);
            tweenWin.onComplete.add(function(){
                my.add.tween(_oTotalWinTxt.scale).to( { x: 1, y: 1 }, 100, Phaser.Easing.Cubic.In, true);
            });
        }
    };
    /**
     * Callback after finish fish animation
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
        if(iFinish == 0){
            Manager4Sound.turnOffAllBackgroundMusic();
            Manager4Sound.playDoubleUpWin();
            my.time.events.add(800, function(){
                Manager4Sound.playBackgroundMusic();
            });
        }
        else{
            if(iResult != 0 ) {
                Manager4Sound.turnOffAllBackgroundMusic();
                Manager4Sound.playDoubleUpLose();
                my.time.events.add(800, function(){
                    Manager4Sound.playBackgroundMusic();
                });
            }
        }
        if (iResult === 1) {
            allowPlayLoseAnimation = true;
            loseAnimation.play(defaultFPS, that.customCallback, 'lose', this.hideFishes);
            //this.hideFishes();
        } else if (iResult === 2) {
            allowPlayWinAnimation = true;
            winAnimation.play(defaultFPS, that.customCallback, 'win', this.hideFishes);
            //this.hideFishes();
        } else if (_iFinish === 1) {
            this.showFishes();
        }


        this.updateTotalWinText();

        if (_iFinish === 1) {


        } else {
            _bButtonClicked = false;
        }


    };

    this.update = function () {
    };
    this.createGroup();
    _oParentContainer = oParentContainer;
}
