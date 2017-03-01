/**
 * CLASS CREATE AND MANAGE FREE SPIN BONUS
 * @param my: Phaser Game Object
 * @param oParentContainer: Group Parent
 * @constructor
 */
function CBonusFreeSpinGE(my, oParentContainer) {
    var _bSpriteLoaded = false;
    var _bButtonClicked;
    var isLoading = false;

    var that = this;

    var _iTotFSWin;
    var _iTotMultyWin;
    var duckFake;
    var freeSpinDuckBtn;
    //var _oTotWinSfx;

    var loaderUI;

    var _oRuleText;
    var _oContainer;
    var _oParentContainer;

    var _oTotalFSTxt;

    var _oTotalMultyTxt;
    var arrayOfSelected = [];
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

        var oBg = my.add.sprite(0,0,'loading_bonus');
        oBg.scale.setTo(100/70);//reduce 70% resolution
        _oContainer.add(oBg);

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
        ManagerForImage.loadSprite(loader,'bg_bonus_fs', 'img/slotgamedata/goldenegg/sprites/bg_bonus_freespin.jpg?' + LobbyConfig.versionDisplay, true);
        ManagerForImage.loadSprite(loader,'text_bonus_fs', 'img/slotgamedata/goldenegg/sprites//bonus_freespin/text_bonus_fs.png?' + LobbyConfig.versionDisplay, true);

        //var numberFrameJellyFish = 30;
        //
        //for(var i = 1; i < numberFrameJellyFish*2; i+=2){
        //    loader.image('jellyFishBonus_' + Math.floor(i/2), 'img/slotgamedata/goldenegg/sprites/bonus_freespin/jellyFish/bonus_jellyfish_idle_00' + i + '.png?' + LobbyConfig.versionDisplay);
        //}
        Helper.Sprite.loadAnimationSprite(loader,'bonus_front_fly_','img/slotgamedata/goldenegg/sprites/bonus_freespin/goose-animation/bonus_front_fly/bonus_front_fly_','.png',0,10,1,2,true);
        Helper.Sprite.loadAnimationSprite(loader,'bonus_side_fly_','img/slotgamedata/goldenegg/sprites/bonus_freespin/goose-animation//bonus_side_fly/bonus_side_fly_','.png',0,13,1,2,true);

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

        var oBg = my.add.sprite(0,0,"bg_bonus_fs");
        oBg.scale.setTo(100 /70);//reduce resolution 70%
        _oContainer.add(oBg);
        var fps = 13;
        var firstXPosition = 450;
        //var firstXPosition = 650;
        var firstYPosition = 350;
        var aPos = [
            {},
            {x: firstXPosition + 850, y: firstYPosition},
            {x: firstXPosition + 500, y: firstYPosition},
            {x: firstXPosition + 350, y: firstYPosition + 450},
            {x: firstXPosition + 200, y: firstYPosition},
            {x: firstXPosition + 750, y: firstYPosition + 450}];


        //if (freeSpinDuckBtn != null)
        //{
        //    for (i = 1; i < freeSpinDuckBtn.length; i++)
        //    {
        //        freeSpinDuckBtn[i].destroy();
        //    }
        //}
        freeSpinDuckBtn = [];

        var scaleFactor = {x: 1, y:1};

        var oBut, i;

        oBut = new SpriteAnimation(my,
        _oContainer,
            aPos[4],
            scaleFactor,
            'bonus_front_fly_',
            0,
            10,
            false,
            function(){
                //freeSpinDuckBtn[3].scale({x:scaleBig.x * 2, y: scaleBig.y *2});
            },
            function(){
                //freeSpinDuckBtn[3].scale(scaleBig);
                if (_bButtonClicked) {
                    return;
                }
                //that._onButJellyFishReleased(4);

            }
        );
        freeSpinDuckBtn[4] = oBut;

        oBut = new SpriteAnimation(my,
            _oContainer,
            aPos[2],
            scaleFactor,
            'bonus_front_fly_',
            0,
            10,
            false,
            function(){
                //freeSpinDuckBtn[1].scale({x:scaleBig.x * 2, y: scaleBig.y *2});
            },
            function(){
                //freeSpinDuckBtn[1].scale(scaleBig);
                if (_bButtonClicked) {
                    return;
                }
                //that._onButJellyFishReleased(2);
            }
        );
        freeSpinDuckBtn[2] = oBut;

        oBut = new SpriteAnimation(my,
            _oContainer,
            aPos[1],
            scaleFactor,
            'bonus_side_fly_',
            0,
            13,
            false,
            function(){
                //freeSpinDuckBtn[0].scale({x:scaleSmall.x * 2, y: scaleSmall.y *2});
            },
            function(){
                //freeSpinDuckBtn[0].scale(scaleSmall);
                if (_bButtonClicked) {
                    return;
                }
                //that._onButJellyFishReleased(1);
            }
        );
        freeSpinDuckBtn[1] = oBut;

        oBut = new SpriteAnimation(my,
            _oContainer,
            aPos[3],
            scaleFactor,
            'bonus_side_fly_',
            0,
            13,
            false,
            function(){
                //freeSpinDuckBtn[2].scale({x:scaleSmall.x * 2, y: scaleSmall.y *2});
            },
            function(){
                //freeSpinDuckBtn[2].scale(scaleSmall);
                if (_bButtonClicked) {
                    return;
                }

                //that._onButJellyFishReleased(3);

            }
        );
        freeSpinDuckBtn[3] = oBut;

        oBut = new SpriteAnimation(my,
            _oContainer,
            aPos[5],
            scaleFactor,
            'bonus_side_fly_',
            0,
            13,
            false,
            function(){
                //freeSpinDuckBtn[4].scale({x:scaleSmall.x * 2, y: scaleSmall.y *2});
            },
            function(){
                //freeSpinDuckBtn[4].scale(scaleSmall);
                if (_bButtonClicked) {
                    return;
                }
                //that._onButJellyFishReleased(5);
            }
        );
        freeSpinDuckBtn[5] = oBut;
        //
        duckFake = [];
        duckFake.push("");
        var createDuck = function(i){
            var spriteName = "bonus_side_fly_0";
            if(i == 2 || i == 4) spriteName = "bonus_front_fly_0";
            var d = my.add.sprite(aPos[i].x,aPos[i].y,spriteName,null,_oContainer);
            d.inputEnabled = true;
            d.events.onInputDown.add(function() {
                if (_bButtonClicked) {
                    return;
                }
                that._onButJellyFishReleased(i);
            }, my);
            d.anchor.setTo(0.5,0.5);
            duckFake.push(d);

        };

        //var i = freeSpinDuckBtn.length-1; while (i--) {}
        for(var i = 1; i<freeSpinDuckBtn.length;i++){
            createDuck(i);
            //freeSpinDuckBtn[i].showFirstFrame();
        }


        _oRuleText = my.add.sprite(settings.CANVAS_WIDTH/2,
            206,
            'text_bonus_fs',
            null,
            _oContainer);
        _oRuleText.anchor.setTo(0.5);

        _oTotalFSTxt =  my.add.text(393, 592, '8', {
            font: '50px Skater-Girls-Rock',
            //font: '70px dinbold',
            fill: '#fffec5',
            stroke: '#874829',
            strokeThickness: 10
        }, _oContainer);
        _oTotalFSTxt.anchor.setTo(0.5);
        _oTotalFSTxt.angle-=15;
        _oTotalMultyTxt = my.add.text(1514, 592, "x2", {
            font: '50px Skater-Girls-Rock',
            //font: '70px dinbold',
            fill: '#fffec5',
            stroke: '#874829',
            strokeThickness: 10
        }, _oContainer);
        _oTotalMultyTxt.anchor.setTo(0.5);
        _oTotalMultyTxt.angle+=15;
        _oContainer.visible = true;

        if (my.currentGameSlot.s_oBonusToRestore !== null && my.currentGameSlot.s_oBonusToRestore.bonus_step > 0) {
            this.restore();
        }
    };
    /**
     * Function called to create bonus egg when User click to duck
     * @param btnPosition: Position
     * @param mul: win amount
     * @param typeBonus: type Win (FreeSpin or Multiplier)
     */
    this.createBonusEgg = function(btnPosition,mul,typeBonus){
        var egg = my.add.sprite(btnPosition.x,btnPosition.y+150,'gold-egg-option',null,_oContainer);
        egg.scale.setTo(0.6,0.6);
        egg.angle+=65;
        egg.anchor.setTo(0.5);
        var mulNumber = my.add.text(btnPosition.x, btnPosition.y, "+"+mul+" "+typeBonus, {
            font: '45px Skater-Girls-Rock',
            //font: '70px dinbold',
            fill: '#fffec5'
        }, _oContainer);
        mulNumber.addColor("#ffffff",mulNumber.text.length - typeBonus.length);
        mulNumber.anchor.setTo(0.5);
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
        if (_bButtonClicked) {
            return;
        }

        _bButtonClicked = true;
        for (var i = 1; i < freeSpinDuckBtn.length; i++) {
            freeSpinDuckBtn[i].disable();
        }
        duckFake[iIndex].visible = false;
        freeSpinDuckBtn[iIndex].play(13,function(){
            my.currentGameSlot.s_oGame.chooseBonusFreeSpin(iIndex);
        },null,function(index){
            //duckFake[index].visbile = false;
        },iIndex);
        //if (LobbyConfig.isDebug) {
        //    console.log("CBonusFreeSpin _onButJellyFishReleased");
        //    for (var i = 1; i < freeSpinDuckBtn.length; i++) {
        //        freeSpinDuckBtn[i].enable();
        //    }
        //    _bButtonClicked = false;
        //    that.createBonusEgg(freeSpinDuckBtn[iIndex],2," FREE SPIN");
        //    return;
        //}

        Manager4Sound.playBtnClicked ();

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
            for (var i = 1; i < freeSpinDuckBtn.length; i++) {
                freeSpinDuckBtn[i].enable();
            }
        }

        var iWin = aWheels[iIndex].win;
        var iSelect = aWheels[iIndex].select;
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

        freeSpinDuckBtn[iSelect].hide();
        duckFake[iSelect].visible = false;

        var typeBonus = "";
        if(type == 3){
            typeBonus = "FREE SPINS";
        }else if(type == 2){
            typeBonus = "MULTIPLIER";
        }
        that.createBonusEgg(freeSpinDuckBtn[iSelect],iWin,typeBonus);
        //



        freeSpinDuckBtn[iSelect].disable();

        if (iFinish === 1) {



            for (var i = 1; i < freeSpinDuckBtn.length; i++) {
                freeSpinDuckBtn[i].disable();
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

        _oTotalFSTxt.text = totalFreeSpins.toFixed(0);

        _oTotalMultyTxt.text = "x"+totalMulty.toFixed(0);




    };
    /**
     * Show final win or exit when finishing FreeSpin
     * @param totalFreeSpins: total FreeSpins won
     * @param totalMulti: total Multiplier won
     */
    this.showFinalWin = function (totalFreeSpins, totalMulti) {
        my.currentGameSlot.s_oGame.showFreeSpinBonusWinPanel("YOU WON", "", totalFreeSpins, totalMulti, function(){
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
        my.currentGameSlot.s_oGame.getContainer().visible = true;
        //_oContainer.removeAll();
        //RESET GAME


        this.destroy();

        Lobby.PhaserJS.destroyAllChild(_oContainer);


        settings.IS_DISABLE_ALL_BUTTON = false;
        settings.IS_PLAYING_WIN_PANEL = false;

        if(isSkipFreeSpin){
            my.currentGameSlot.s_oGame.exitFromBonus();
        }else {
            my.currentGameSlot.s_oGame.exitFromFreeSpin(
                _iTotFSWin,
                _iTotMultyWin
            );
        }


    };
    this.destroy = function(){
        if(Lobby.Utils.objectNotNull(freeSpinDuckBtn)) {
            for (var i = 1; i < freeSpinDuckBtn.length; i++) {
                freeSpinDuckBtn[i].stop();
                freeSpinDuckBtn[i].destroy();
                freeSpinDuckBtn[i] = null;
                //_aJellyFishBut[i].enable();
            }
        }
        freeSpinDuckBtn = null;
    };
    this.createGroup();
    _oParentContainer = oParentContainer;
}