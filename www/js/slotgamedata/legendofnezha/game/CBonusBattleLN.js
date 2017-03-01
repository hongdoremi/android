/**
 * CLASS CREATES AND MANAGES BONUS BATTLE
 * @param my
 * @param oParentContainer
 * @constructor
 */
function CBonusBattleLN(my, oParentContainer) {
    var _bSpriteLoaded = false;
    var _bButtonClicked;
    var isLoading = false;

    var that = this;

    var aCircleBut;
    var aRingScore;
    //var _oTotWinSfx;

    var iCounter = 0;

    var loaderUI;

    var _oRuleText;
    var _oContainer;
    var _oLoaderContainer;
    var _oGameContainer;
    var _oParentContainer;

    var animDragonFire;
    var animSpear;
    var animAttack;


    var arrayOfSelected = [];

    /**
     * Create Group function
     */
    this.createGroup = function(){
        _oContainer = my.add.group();
        oParentContainer.add(_oContainer);
        my.scaleCenterGroup(_oContainer,1,_oContainer);

        _oGameContainer = my.add.group();
        _oContainer.add(_oGameContainer);

        _oLoaderContainer = my.add.group();
        _oContainer.add(_oLoaderContainer);

        _oContainer.visible = false;
    };
    /**
     * Show function
     */
    this.show = function () {

        _oContainer.visible = true;
        if (LobbyConfig.isDebug) {
            console.log("CBonusFreeSpin show");
        }
        Manager4State.setCurrentState(my.currentGameSlot.GameConstant.State.Bonus);
        Manager4Sound.playDoubleUpBackgroundMusic();

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
        _oLoaderContainer.removeAll();

        var oBg = my.add.sprite(0,0,"bg-loading");
        oBg.body = null;
        _oLoaderContainer.add(oBg);

        loaderUI = new CLoaderUI(my, _oLoaderContainer);
        loaderUI.createLoader(settings.CANVAS_WIDTH/2, 980, 'pre-loader');

        if(_bSpriteLoaded){
            this._onAllImagesLoaded();
            return;
        }

        var loader = new Phaser.Loader(my);
        loader.onFileComplete.addOnce(this._onResourceBikiniLoaded);
        loader.onLoadComplete.addOnce(this._onAllImagesLoaded);
        //this.s_oSpriteLibraryFS.addSprite("bg_bonus_fs", "./sprites/bonus_freespin/bg_bonus_freespin.jpg?" + LobbyConfig.versionDisplay, true);
        ManagerForImage.loadSprite(loader, 'btn-battle', 'img/slotgamedata/legendofnezha/sprites/bonusbattle/battle_but.png?' + LobbyConfig.versionDisplay, true);
        ManagerForImage.loadSprite(loader, 'miss-bonus', 'img/slotgamedata/legendofnezha/sprites/bonusbattle/miss_bonus_battle.png?' + LobbyConfig.versionDisplay, true);
        ManagerForImage.loadSprite(loader, 'text-instruction', 'img/slotgamedata/legendofnezha/sprites/bonusbattle/text_bonus_battle.png?' + LobbyConfig.versionDisplay, true);
        ManagerForImage.loadSprite(loader, 'universe-ring', 'img/slotgamedata/legendofnezha/sprites/bonusbattle/universe_ring.png?' + LobbyConfig.versionDisplay, true);

        var i = 17; while (i--) {
            if(i<10){
                ManagerForImage.loadSprite(loader, 'dragonfire_' + i, 'img/slotgamedata/legendofnezha/sprites/bonusbattle/dragonfire/Bonus-02-dragon_fireBreath_' + (i < 10? '0' + i: i) + '.png?' + LobbyConfig.versionDisplay, true);
            }
            if(i < 14){
                ManagerForImage.loadSprite(loader, 'spear_' + i, 'img/slotgamedata/legendofnezha/sprites/bonusbattle/explosion/spear/Bonus-02-spearFX_' + (i < 10? '0' + i: i) + '.png?' + LobbyConfig.versionDisplay, true);
            }
            if(i < 9){
                ManagerForImage.loadSprite(loader, 'impact_' + i, 'img/slotgamedata/legendofnezha/sprites/bonusbattle/explosion/impact/Bonus-02-attackImpactFX_' + (i < 10? '0' + i: i) + '.png?' + LobbyConfig.versionDisplay, true);
            }
            ManagerForImage.loadSprite(loader, 'background_bonusbattle_' + i, 'img/slotgamedata/legendofnezha/sprites/bonusbattle/bg/Bonus-02-nezha_idle_' + (i < 10? '0' + i: i) + '.jpg?' + LobbyConfig.versionDisplay, true);
        }
        //for(var i = 0; i < 17; i++){}

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
     * Initialize - Create UI for Bonus
     * @private
     */
    this._init = function () {
        if (LobbyConfig.isDebug) {
            console.log("CBonusFreeSpin _init");
        }
        var delayTime = 1000;
        if(Lobby.Utils.isOldSchoolDevice()){
            delayTime = 3000;
        }
        my.time.events.add(delayTime, function(){
            my.onFinishLoadingBonus();
            _oLoaderContainer.removeAll();
        });

        _oGameContainer.removeAll();
        _oGameContainer.oBg = new SpriteAnimation(my,
                    _oGameContainer,
                    {x:settings.CANVAS_WIDTH/2,y:settings.CANVAS_HEIGHT/2},
                    {x:2,y:2},
                    'background_bonusbattle_',
                    0,
                    16,
                    true);
        _oGameContainer.oBg.play(20);

        animDragonFire = new SpriteAnimation(my,
            _oGameContainer,
            {x:settings.CANVAS_WIDTH/2,y:settings.CANVAS_HEIGHT/2},
            {x:2.92,y:2.92},
            'dragonfire_',
            0,
            9,
            false);
        animSpear = new SpriteAnimation(my,
            _oGameContainer,
            {x:settings.CANVAS_WIDTH/2,y:settings.CANVAS_HEIGHT/2},
            {x:2,y:2},
            'spear_',
            0,
            13,
            false);
        animAttack = new SpriteAnimation(my,
            _oGameContainer,
            {x:settings.CANVAS_WIDTH/2,y:settings.CANVAS_HEIGHT/2},
            {x:2,y:2},
            'impact_',
            0,
            8,
            false);

        iCounter = 0;

        var padY = 50;
        var aPos = [
            {x: 1114, y: 321 + padY},
            {x: 1220, y: 150 + padY},
            {x: 1582, y: 171 + padY},
            {x: 1382, y: 261 + padY},
            {x: 877, y: 457 + padY}];


        if (aCircleBut != null)
        {
            for (i = 0; i < aCircleBut.length; i++)
            {
                aCircleBut[i].destroy();
            }
        }
        aCircleBut = [];

        var scaleBig = {x: 0.6, y:0.6};
        var scaleSmall = {x: 0.4, y:0.4};

        var oBut, i;

        oBut = Lobby.PhaserJS.createSpriteRectangle(
            my,
            aPos[3].x,
            aPos[3].y,
            function () {
                aCircleBut[3].scale.setTo(0.9);
            },
            function () {
            },
            function () {
            },
            false,
            _oGameContainer,
            LobbyConfig.isDebug,
            'btn-battle',
            function () {
                aCircleBut[3].scale.setTo(1);
                that._onButJellyFishReleased(4);
            }
        );
        oBut.anchor.setTo(0.5);
        aCircleBut[3] = oBut;

        oBut = Lobby.PhaserJS.createSpriteRectangle(
            my,
            aPos[1].x,
            aPos[1].y,
            function () {
                aCircleBut[1].scale.setTo(0.9);
            },
            function () {
            },
            function () {
            },
            false,
            _oGameContainer,
            LobbyConfig.isDebug,
            'btn-battle',
            function () {
                aCircleBut[1].scale.setTo(1);
                that._onButJellyFishReleased(2);
            }
        );
        aCircleBut[1] = oBut;

        oBut = Lobby.PhaserJS.createSpriteRectangle(
            my,
            aPos[0].x,
            aPos[0].y,
            function () {
                aCircleBut[0].scale.setTo(0.9);
            },
            function () {
            },
            function () {
            },
            false,
            _oGameContainer,
            LobbyConfig.isDebug,
            'btn-battle',
            function () {
                aCircleBut[0].scale.setTo(1);
                that._onButJellyFishReleased(1);
            }
        );
        aCircleBut[0] = oBut;

        oBut = Lobby.PhaserJS.createSpriteRectangle(
            my,
            aPos[2].x,
            aPos[2].y,
            function () {
                aCircleBut[2].scale.setTo(0.9);
            },
            function () {
            },
            function () {
            },
            false,
            _oGameContainer,
            LobbyConfig.isDebug,
            'btn-battle',
            function () {
                aCircleBut[2].scale.setTo(1);
                that._onButJellyFishReleased(3);
            }
        );
        aCircleBut[2] = oBut;

        oBut = Lobby.PhaserJS.createSpriteRectangle(
            my,
            aPos[4].x,
            aPos[4].y,
            function () {
                aCircleBut[4].scale.setTo(0.9);
            },
            function () {
            },
            function () {
            },
            false,
            _oGameContainer,
            LobbyConfig.isDebug,
            'btn-battle',
            function () {
                aCircleBut[4].scale.setTo(1);
                that._onButJellyFishReleased(5);
            }
        );
        aCircleBut[4] = oBut;

        for(var i = 0; i<aCircleBut.length;i++){
            //aCircleBut[i].scale.setTo(0.9);
            aCircleBut[i].anchor.setTo(0.5);
        }

        if (aRingScore != null)
        {
            for (i = 0; i < aRingScore.length; i++)
            {
                aRingScore[i].destroy();
            }
        }
        aRingScore = [];
        for(var i = 0; i < 3; i++){
            aRingScore[i] = this.createRing(_oGameContainer);
            aRingScore[i].position = {x:(150 + i*200 + ManagerForScale.offsetOutOfBounce_1920 ), y:200};
            aRingScore[i].visible = false;
            //aRingScore[i].x += (aRingScore[i].width*ManagerForScale.getScale()) * (ManagerForScale.getScale() - 1);
        }


        _oRuleText = my.add.sprite(settings.CANVAS_WIDTH/2,
            settings.CANVAS_HEIGHT - 100,//* ManagerForScale.getScale(),
            'text-instruction',
            null,
            _oGameContainer);
      _oRuleText.body = null;
        _oRuleText.anchor.setTo(0.5);
        if(ManagerForScale.is3x4resolution()){
            _oRuleText.scale.setTo(0.8);
        }


        _oGameContainer.visible = true;
        if (my.currentGameSlot.s_oBonusToRestore !== null && my.currentGameSlot.s_oBonusToRestore.bonus_step > 0) {
            this.restore();
        }
    };
    /**
     * Create Ring UI (yellow ring that show result of each step in Bonus)
     * @param parent: Group parent
     * @returns {*} group object
     */
    this.createRing = function(parent){
        var ring = my.add.group();
        parent.add(ring);
        var bg = my.add.sprite(0,
            0,
            'universe-ring',
            null,
            ring);
      bg.body = null;
        bg.anchor.setTo(0.5);

        ring.miss = my.add.sprite(0,
            0,
            'miss-bonus',
            null,
            ring);
      ring.miss.body = null;
        ring.miss.anchor.setTo(0.5);
        ring.miss.visible = false;

        ring.text = my.add.text(0, 0, '0', {
            font: '30px CopperPlates',
            fill: '#FBFF00',
            fontWeight: 'bold',
            stroke: '#FF0000',
            strokeThickness: 8
        }, ring);
        ring.text.visible = false;

        ring.text.anchor.setTo(0.5);

        return ring;
    };
    /**
     * Setup UI and show Result Ring
     * @param win: win amount
     */
    this.showRing = function(win){
        aRingScore[iCounter].visible = true;
        if(win == 0){
            aRingScore[iCounter].miss.visible = true;
            aRingScore[iCounter].text.visible = false;
        }else{
            aRingScore[iCounter].miss.visible = false;
            aRingScore[iCounter].text.visible = true;
            aRingScore[iCounter].text.text = Lobby.Utils.formatNumberWithCommas(win.toFixed(0));
            Lobby.PhaserJS.autoFitText(aRingScore[iCounter].text, 200);
        }
        iCounter = iCounter >= 2?0:iCounter+1;
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
                i,
                false);
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

        for (var i = 0; i < aCircleBut.length; i++) {
            aCircleBut[i].inputEnabled = false;
        }

        animSpear.setPosition(aCircleBut[iIndex - 1].x - 420,
            aCircleBut[iIndex - 1].y + 410);
        animSpear.play(60);

        Manager4Sound.playBtnBattleClicked ();

      my.time.events.add(500,
        function () {
            my.currentGameSlot.s_oGame.chooseBonusFreeSpin(iIndex);
        },this);

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
     * @param bShowAnim: boolen - check if it should show animation (false when this is called from restore function)
     */
    this.showResult = function (iFinish, aWheels, iIndex, bShowAnim) {
        if (LobbyConfig.isDebug) {
            console.log("CBonusFreeSpin show");
        }
        if(Lobby.Utils.objectNotNull(aCircleBut)) {
            for (var i = 0; i < aCircleBut.length; i++) {
                aCircleBut[i].inputEnabled = true;
            }
        }

        var iWin = aWheels[iIndex].win;
        var iSelect = aWheels[iIndex].select - 1;

        if(my.managerForAutoGameSlot.autoPlayBonus || LobbyConfig.isTestAlgorithmMode) {
            arrayOfSelected.push(aWheels[iIndex].select);
            if (LobbyConfig.isTestAlgorithmMode) {
                return iWin;
            }else{
                my.callAutoPlayBonus(iFinish, arrayOfSelected);
            }
        }

        this.showRing(iWin);

        if (bShowAnim)
        {
            if (iWin == 0){
                animDragonFire.play(20);
            }else{
                animAttack.setPosition(aCircleBut[iSelect].x, aCircleBut[iSelect].y);
                animAttack.play(20);
            }
        }


        aCircleBut[iSelect].visible = false;
        aCircleBut[iSelect].inputEnabled = false;

        if (iFinish === 1) {

            for (var i = 0; i < aCircleBut.length; i++) {
                aCircleBut[i].inputEnabled = false;
            }


            var iTotWin = 0;

            for (var k = 0; k < aWheels.length; k++) {
                iTotWin += aWheels[k].win;
            }

            var oParent = this;


            settings.IS_DISABLE_ALL_BUTTON = true;
            settings.IS_PLAYING_WIN_PANEL = true;

            _oRuleText.visible = false;
          my.time.events.add(2000,
            function () {
                oParent.showFinalWin(
                    iTotWin);
            }, this);

        } else {
            my.time.events.add(1000,
              function () {
                _bButtonClicked = false;
            }, this);
        }

    };
    /**
     * Show final win or exit when finishing Bonus
     */
    this.showFinalWin = function (iTotWin) {
        my.currentGameSlot.s_oGame.showWinPanel("TOTAL WIN", "0", iTotWin, function(){
            that._exitFromBonus();
        });
    };
    /**
     * Exit Bonus to Main Game
     */
    this._exitFromBonus = function () {
        if (LobbyConfig.isDebug) {
            console.log("CBonusFreeSpin _exitFromBonus");
        }
        //_oTotWinSfx.destroy();
        _oContainer.visible = false;
        my.currentGameSlot.s_oGame.getContainer().visible = true;
        //_oGameContainer.removeAll();
        //RESET GAME

        if(Lobby.Utils.objectNotNull(aCircleBut)) {
            for (var i = 0; i < aCircleBut.length; i++) {
                //aCircleBut[i].stop();
                aCircleBut[i].visible = true;
                aCircleBut[i].inputEnabled = true;
            }
        }
        this.destroy();
        Lobby.PhaserJS.destroyAllChild(_oGameContainer);


        settings.IS_DISABLE_ALL_BUTTON = false;
        settings.IS_PLAYING_WIN_PANEL = false;

        //
        my.currentGameSlot.s_oGame.exitFromBonus();


    };
    this.destroy = function(){
        if(_oGameContainer.oBg){
            _oGameContainer.oBg.stop();
            _oGameContainer.oBg.destroy();
            _oGameContainer.oBg = null;
        }

        if(animDragonFire){
            animDragonFire.stop();
            animDragonFire.destroy();
            animDragonFire = null;
        }

        if(animSpear){
            animSpear.stop();
            animSpear.destroy();
            animSpear = null;
        }

        if(animAttack){
            animAttack.stop();
            animAttack.destroy();
            animAttack = null;
        }
    };
    this.createGroup();
    _oParentContainer = oParentContainer;
}
