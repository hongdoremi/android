/**
 * CLASS CREATE AND MANAGE FREE SPIN BONUS
 * @param my: Phaser Game Object
 * @param oParentContainer: Group Parent
 * @constructor
 */
function CBonusFreeSpinDB(my, oParentContainer) {
    var _bSpriteLoaded = false;
    var _bButtonClicked;

  var isLoading = false;
    var that = this;

    var _iTotFSWin;
    var _iTotMultyWin;

    var _aJellyFishBut;
    //var _oTotWinSfx;

    var loaderUI;

    var _oRuleText;
    var _oContainer;
    var _oParentContainer;

    var _oTotalFSTxt;

    var _oTotalMultyTxt;
    var arrayOfSelected = [];
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
        //IF RESOURCES FOR THIS BONUS WAS ALREADY LOADED, SIMPLY LAUNCH THE BONUS OTHERWISE LOAD THE RESOURCES
        //if (_bSpriteLoaded) {
        //    this._onAllImagesLoaded();
        //} else {
            this._loadAllResources(_bSpriteLoaded);
        //}

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
        //this.s_oSpriteLibraryFS.addSprite("bg_bonus_fs", "./sprites/bonus_freespin/bg_bonus_freespin.jpg?" + LobbyConfig.versionDisplay);
        ManagerForImage.loadSprite(loader, 'text_bonus_fs', 'img/slotgamedata/deepblue/sprites//bonus_freespin/text_bonus_fs.png?' + LobbyConfig.versionDisplay, true);

        var numberFrameJellyFish = 30;

        var i = numberFrameJellyFish; while (i--) {
            ManagerForImage.loadSprite(loader, 'jellyFishBonus_' + i, 'img/slotgamedata/deepblue/sprites/bonus_freespin/jellyFish/bonus_jellyfish_idle_00' + (i+1) + '.png?' + LobbyConfig.versionDisplay, true);
        }
        //for(var i = 1; i < numberFrameJellyFish*2; i+=2){
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

        var oBg = my.loadBG("bg_bonus_fs",_oContainer);
        //_oContainer.add(oBg);

        var firstXPosition = 450;
        var firstYPosition = 500;
        var aPos = [
            {x: firstXPosition, y: firstYPosition},
            {x: firstXPosition + 250, y: firstYPosition + 200},
            {x: firstXPosition + 500, y: firstYPosition},
            {x: firstXPosition + 750, y: firstYPosition + 200},
            {x: firstXPosition + 1000, y: firstYPosition}];


        if (_aJellyFishBut != null)
        {
            for (i = 0; i < _aJellyFishBut.length; i++)
            {
                _aJellyFishBut[i].destroy();
                _aJellyFishBut[i] = null;
            }
        }
        _aJellyFishBut = [];

        var scaleBig = {x: 1.5, y:1.5};
        var scaleSmall = {x: 1, y:1};

        var oBut, i;

        oBut = new SpriteAnimation(my,
        _oContainer,
            aPos[3],
            scaleBig,
            'jellyFishBonus_',
            0,
            29,
            true,
            function(){
                _aJellyFishBut[3].scale({x:scaleBig.x * 2, y: scaleBig.y *2});
            },
            function(){
                _aJellyFishBut[3].scale(scaleBig);
                that._onButJellyFishReleased(4);
            }
        );
        _aJellyFishBut[3] = oBut;

        oBut = new SpriteAnimation(my,
            _oContainer,
            aPos[1],
            scaleBig,
            'jellyFishBonus_',
            0,
            29,
            true,
            function(){
                _aJellyFishBut[1].scale({x:scaleBig.x * 2, y: scaleBig.y *2});
            },
            function(){
                _aJellyFishBut[1].scale(scaleBig);
                that._onButJellyFishReleased(2);
            }
        );
        _aJellyFishBut[1] = oBut;

        oBut = new SpriteAnimation(my,
            _oContainer,
            aPos[0],
            scaleSmall,
            'jellyFishBonus_',
            0,
            29,
            true,
            function(){
                _aJellyFishBut[0].scale({x:scaleSmall.x * 2, y: scaleSmall.y *2});
            },
            function(){
                _aJellyFishBut[0].scale(scaleSmall);
                that._onButJellyFishReleased(1);
            }
        );
        _aJellyFishBut[0] = oBut;

        oBut = new SpriteAnimation(my,
            _oContainer,
            aPos[2],
            scaleSmall,
            'jellyFishBonus_',
            0,
            29,
            true,
            function(){
                _aJellyFishBut[2].scale({x:scaleSmall.x * 2, y: scaleSmall.y *2});
            },
            function(){
                _aJellyFishBut[2].scale(scaleSmall);
                that._onButJellyFishReleased(3);
            }
        );
        _aJellyFishBut[2] = oBut;

        oBut = new SpriteAnimation(my,
            _oContainer,
            aPos[4],
            scaleSmall,
            'jellyFishBonus_',
            0,
            29,
            true,
            function(){
                _aJellyFishBut[4].scale({x:scaleSmall.x * 2, y: scaleSmall.y *2});
            },
            function(){
                _aJellyFishBut[4].scale(scaleSmall);
                that._onButJellyFishReleased(5);
            }
        );
        _aJellyFishBut[4] = oBut;

        var i = _aJellyFishBut.length; while (i--) {_aJellyFishBut[i].play(30);}
        //for(var i = 0; i<_aJellyFishBut.length;i++){
        //}


        _oRuleText = my.add.sprite(settings.CANVAS_WIDTH/2,
            settings.CANVAS_HEIGHT - 100,
            'text_bonus_fs',
            null,
            _oContainer);
        _oRuleText.anchor.setTo(0.5);

        _oTotalFSTxt =
            my.add.text(
                settings.CANVAS_WIDTH - 300 - ManagerForScale.offsetOutOfBounce_1920,
                150, '8 FREE SPINS', {
            font: '70px ICIEL-KONI-BLACK',
            //font: '70px dinbold',
            fill: '#fffec5',
            stroke: '#874829',
            strokeThickness: 10
        }, _oContainer);
        _oTotalFSTxt.anchor.setTo(0.5);

        _oTotalMultyTxt =
            my.add.text(
                settings.CANVAS_WIDTH - 300 - ManagerForScale.offsetOutOfBounce_1920,
                250, "x2" + " MULTIPLIER", {
            font: '70px ICIEL-KONI-BLACK',
            //font: '70px dinbold',
            fill: '#fffec5',
            stroke: '#874829',
            strokeThickness: 10
        }, _oContainer);
        _oTotalMultyTxt.anchor.setTo(0.5);

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
            this.showResult(my.currentGameSlot.s_oBonusToRestore.finish,
                my.currentGameSlot.s_oBonusToRestore.aTotalFS,
                my.currentGameSlot.s_oBonusToRestore.aTotalMulty,
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

        for (var i = 0; i < _aJellyFishBut.length; i++) {
            _aJellyFishBut[i].disable();
        }

        Manager4Sound.playBtnClicked ();
        my.currentGameSlot.s_oGame.chooseBonusFreeSpin(iIndex);

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
     * @param iFinish: boolen - true if finish FreeSpin
     * @param totalFreeSpins: total Free Spins
     * @param totalMulty: total Multipler
     * @param aWheels: array wheels info
     * @param iIndex: index User selected
     */
    this.showResult = function (iFinish, totalFreeSpins, totalMulty, aWheels, iIndex) {
        if (LobbyConfig.isDebug) {
            console.log("CBonusFreeSpin show");
        }


        if(!LobbyConfig.isTestAlgorithmMode) {
            for (var i = 0; i < _aJellyFishBut.length; i++) {
                _aJellyFishBut[i].enable();
            }
        }
        var iWin = aWheels[iIndex].win;
        var iSelect = aWheels[iIndex].select - 1;
        var type = parseInt(aWheels[iIndex].type);


        if(my.managerForAutoGameSlot.autoPlayBonus || LobbyConfig.isTestAlgorithmMode) {
            arrayOfSelected.push(aWheels[iIndex].select);
            if (LobbyConfig.isTestAlgorithmMode) {
                if (iFinish === 1) {
                    my.currentGameSlot.setCurrentBonus(3);
                }
                return iWin;
            }else{
                my.callAutoPlayBonus(iFinish, arrayOfSelected);
            }
        }




        var centerXBtn = _aJellyFishBut[iSelect].x;//_aJellyFishBut[iSelect].getSprite().image.width/2;
        var centerYBtn = _aJellyFishBut[iSelect].y;//_aJellyFishBut[iSelect].getSprite().image.height/4;

        var typeBonus = "";
        if(type == 3){
            typeBonus = "FREE SPINS";
        }else if(type == 2){
            typeBonus = "MULTIPLIER";
        }

        var oWinText = my.add.text(centerXBtn, centerYBtn, "+" + iWin, {
            font: '70px ICIEL-KONI-BLACK',
            //font: '70px dinbold',
            fill: '#fffec5',
            stroke: '#874829',
            strokeThickness: 10
        }, _oContainer);
        oWinText.anchor.setTo(0.5);

        var oWinTypeText = my.add.text(oWinText.x, oWinText.y + oWinText.height, typeBonus, {
            font: '64px ICIEL-KONI-BLACK',
            //font: '64px dinbold',
            fill: '#fffec5',
            stroke: '#874829',
            strokeThickness: 10
        }, _oContainer);
        oWinTypeText.anchor.setTo(0.5);


        _aJellyFishBut[iSelect].disable();

        if (iFinish === 1) {



            for (var i = 0; i < _aJellyFishBut.length; i++) {
                _aJellyFishBut[i].disable();
            }


            var iTotWin = 0;

            for (var k = 0; k < aWheels.length; k++) {
                iTotWin += aWheels[k].win;
            }

            var oParent = this;


            settings.IS_DISABLE_ALL_BUTTON = true;
            settings.IS_PLAYING_WIN_PANEL = true;

            _oRuleText.visible = false;
            my.time.events.add(2000, function () {


                oParent.showFinalWin(
                    totalFreeSpins,
                    totalMulty);
            });

        } else {
            _bButtonClicked = false;
        }

        _oTotalFSTxt.text = totalFreeSpins + " FREE SPINS";

        _oTotalMultyTxt.text = "x"+totalMulty + " MULTIPLIER";
    };
    /**
     * Show final win or exit when finishing FreeSpin
     * @param totalFreeSpins: total FreeSpins won
     * @param totalMulti: total Multiplier won
     */
    this.showFinalWin = function (totalFreeSpins, totalMulti) {
        my.currentGameSlot.s_oGame.showFreeSpinBonusWinPanel("YOU WON", "\n0 FREE SPINS\n0x MULTIPLIER", totalFreeSpins, totalMulti, function(){
            that._exitFromBonus();
        });
    };
    /**
     * Exit FreeSpin to Main Game
     * @param isSkipFreeSpin: boolen - true if need to skip show Win Text on Footer object
     */
    this._exitFromBonus = function (isSkipFreeSpin) {
        if (LobbyConfig.isDebug) {
            console.log("CBonusFreeSpin _exitFromBonus");
        }

        //_oTotWinSfx.destroy();
        _oContainer.visible = false;
        this.destroy();
        my.currentGameSlot.s_oGame.getContainer().visible = true;
        //_oContainer.removeAll();
        //RESET GAME
        Lobby.PhaserJS.destroyAllChild(_oContainer);

        settings.IS_DISABLE_ALL_BUTTON = false;
        settings.IS_PLAYING_WIN_PANEL = false;

        if(isSkipFreeSpin) {
            my.currentGameSlot.s_oGame.exitFromBonus();
        }else{
            my.currentGameSlot.s_oGame.exitFromFreeSpin(
                _iTotFSWin,
                _iTotMultyWin
            );
        }

    };

    this.destroy = function(){
        if(Lobby.Utils.objectNotNull(_aJellyFishBut)) {
            for (var i = 0; i < _aJellyFishBut.length; i++) {
                _aJellyFishBut[i].stop();
                _aJellyFishBut[i].destroy();
                _aJellyFishBut[i] = null;
                //_aJellyFishBut[i].enable();
            }
        }
        _aJellyFishBut = null;
    };

    this.createGroup();
    _oParentContainer = oParentContainer;
}
