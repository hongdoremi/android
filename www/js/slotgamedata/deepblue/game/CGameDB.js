/**
 * THIS CLASS MANAGES THE MAIN GAME LOGIC AND ALL PANELS AND BONUSES
 * @param my: Phaser Game Object
 * @param parentGroup: Group parent
 * @param oData: Custom data
 * @constructor
 */
function CGameDB(my, parentGroup, oData) {
    var _bUpdate = false;
    var _bAutoSpin;
    var _bEndFreeSpin = false;
    var _iCurState;
    var _iCurReelLoops;
    var _iNextColToStop;
    var _iNumReelsStopped;
    var _iLastLineActive;
    var _iTimeElaps;
    var _iCurWinShown;
    var _iBonusActive;
    var _iStepBonus;
    var _iTotFreeSpin;
    var _iMultyFreeSpin;
    var _iTotWinFreespin;
    //var _iCurMult;
    var _iCurWildExp;
    var _iJackPotTotWin;
    var _aMovingColumns;
    var _aWinningLine;
    var _aReelSequence;
    var _aFinalSymbolCombo;
    var _aCurWheel;
    var _aBonusPos;
    var _aWildExpanded;

    var _oBg;
    //var _oBgFreeSpin;
    var _oLogo;
    //var _oLogoFreeSpin;
    var _oInterface;
    var _oSettingsPanel;
    var _oAttachWildExp;
    var _oAttachWinAnim;
    var _oAttachSymbols;
    var _oAttachWinFrames;
    var _oWinAnim;
    var _oLines;

    var _oBonusJackPot;
    var _oBonusFreeSpin;
    var _oDoubleUp;

    var _oWinPanel;

    var _oContainer;
    var _bShowTotalWinOnFreeSpin;
    this.isDoubleUpMode = false;
    var that = this;

    var _bStopReel;
    var _bOnSkip = false;
    var jellyFish = [];
    var _oFooter;
    var _isInitLines;
    var _oReelAndAnimation = null;

    var aRandSymbols;
    var iCurRandSymbol;
    /**
     * Initialize objects in game and UI
     * @private
     */
    this._init = function () {
        //INIT PARAMETERS
        _iCurState = settings.GAME_STATE_IDLE;
        _bAutoSpin = false;
        _iCurReelLoops = 0;
        _iNumReelsStopped = 0;
        _iBonusActive = -1;
        _iTimeElaps = 0;
        _iStepBonus = 0;
        _iTotFreeSpin = 0;
        _iMultyFreeSpin = 0;
        _bStopReel = false;
        _bShowTotalWinOnFreeSpin = false;
        _aReelSequence = [0, 1, 2, 3, 4];

        aRandSymbols = [];
        for (var i = 0; i < settings.NUM_ROWS * settings.NUM_REELS; i++) {
            var iRandIndex = Math.floor(Math.random() * my.slotSettings.s_aRandSymbols.length);
            aRandSymbols[i] = my.slotSettings.s_aRandSymbols[iRandIndex];
        }
        iCurRandSymbol = 0;

        _iNextColToStop = _aReelSequence[0];
        _iLastLineActive = settings.NUM_PAYLINES;

        _aFinalSymbolCombo = [];
        for (var i = 0; i < settings.NUM_ROWS; i++) {
            _aFinalSymbolCombo[i] = [];
            for (var j = 0; j < settings.NUM_REELS; j++) {
                _aFinalSymbolCombo[i][j] = 0;
            }
        }
        ////////////////////////
        //CREATE AN INSTANCE FOR TWEEN CONTROLLER THAT MANAGES REEL MOVEMENT
        //s_oTweenController = new CTweenController();

        _oContainer = my.add.group();
        parentGroup.add(_oContainer);


        //INITIALIZE SOME GAME COMPONENTS
        //_oBg = my.add.sprite(0,0,'game-bg', null, _oContainer);
        _oBg = my.loadBG('game-bg',_oContainer);

        //_oBg.scale.setTo(2,2);

        //_oBgFreeSpin =  my.add.sprite(0,0,'game-bg', null, _oContainer);
        //_oBgFreeSpin.visible = false;

        jellyFish = [];
        for(var i = 0; i < 3; i++){
            jellyFish[i] = new CSmallFishAnimation(my, _oContainer);
        }

        _oFooter = new CFooter(my, _oContainer, my.currentGameSlot.s_aMultiply , settings.NUM_PAYLINES, my.currentGameSlot.s_iMp);
        //_oFooter.setPosition(settings.CANVAS_WIDTH/2 - 550, settings.CANVAS_HEIGHT - 150);

        this._initReels();

        if(my.currentGameSlot.readyToSpin) {
            this.initLines();
        }
        //
        //this._initFg();
        this._initWildExtended();

        _oAttachWinAnim = my.add.group();
        my.scaleCenterGroup(_oAttachWinAnim);
        _oContainer.add(_oAttachWinAnim);
        _oWinAnim = new CWinAnimDB(my, _oAttachWinAnim);
        //var oCharacter = new createjs.Bitmap(s_oSpriteLibrary.getSprite('avatar'));
        //oCharacter.x = 27;
        //oCharacter.y = 380;
        //s_oAttachSection.addChild(oCharacter);

        //_oLogo = my.add.sprite(settings.CANVAS_WIDTH/2, 0, 'logo_game', null, _oAttachWinAnim);
        //_oLogo.anchor.setTo(0.5,0);

        _oInterface = new CInterfaceDB(my, _oContainer);
        //
        //_oSettingsPanel = new CSettingsPanel();
        //
        //_oBonusJackPot = new CBonusJackPot(s_oAttachSection);
        _oBonusFreeSpin = new CBonusFreeSpinDB(my, parentGroup);
        _oDoubleUp = new CDoubleUpDB(my, parentGroup);
        /////////////////////
        _oWinPanel = new CWinPanelDB(my, parentGroup);
        //Init state manager
        Manager4State.init();

        //THIS CHECK IF THERE IS ANY BONUS PENDING
        //this.checkLastState();

        _bUpdate = true;

        Manager4Sound.playBackgroundMusic();

        // DEbug
//        var newPanel =
//                WinPanelFreeSpin(526, 264, 10, function (){
//
//                    my.currentGameSlot.manager4Network.callBonus(_iStepBonus, 0);
//
//                    settings.IS_DISABLE_ALL_BUTTON = false;
//                });

        //if(my.currentGameSlot.finishAPI){
            this.setGameReady(my.currentGameSlot.s_iMp);
        //}
        my.currentGameSlot.destroyLoading();
    };
    /**
     * restore previous test bonus result
     */
    this.restorePreviousBonusResult = function(){
        if(!LobbyConfig.isTestAlgorithmMode){
            return;
        }
        if(my.currentGameSlot.s_oBonusToRestore) {
            switch (my.currentGameSlot.s_oBonusToRestore.bonus_id) {
                case 1:
                    break;
                case settings.BONUS_TYPE_FREESPIN:
                    _oBonusFreeSpin.restore();
                    break;
                case settings.BONUS_TYPE_FS_WITH_TRIGGER:
                    break;
                //case settings.BONUS_TYPE_BATTLE:
                    //_oBonusBattle.restore();
                    break;

            }
        }
    };
    /**
     * Set Game ready to play
     * @param currentBet
     */
    this.setGameReady = function(currentBet){
        _oFooter.reloadBet(currentBet);
        _oFooter.reloadPayLine(my.currentGameSlot.s_iLines);
        //if(!LobbyConfig.isTestAlgorithmMode){
            _oInterface.showSpinBtn();
            this.checkLastState();
        //}
        my.currentGameSlot.finishAPI = true;
    };
    this.resetTestBonusResult = function(){
        if(!LobbyConfig.isTestAlgorithmMode && !my.managerForAutoGameSlot.autoPlayBonus){
            return;
        }
        _oBonusFreeSpin.resetBonusTest();
        //_oBonusBattle.resetBonusTest();
    };
    /**
     * Initialize lines UI
     */
    this.initLines = function(){
        if(_isInitLines){
            return;
        }
        _oLines = new CLinesBase(my, _oAttachSymbols, settings.NUM_PAYLINES);
        _isInitLines = true;
    };
    /**
     * Get group
     * @returns {*} group object
     */
    this.getContainer = function () {
        if (LobbyConfig.isDebug) {
            console.log("CGame getContainer");
        }
        return _oContainer;
    };
    /**
     * Get Bonus Object
     * @returns {*}Bonus Object
     */
    this.getBonus = function(){
        return _oBonusFreeSpin;
    };
    /**
     * Get double Up Object
     * @returns {*}Double Up Object
     */
    this.getDoubleUp = function(){
        return _oDoubleUp;
    };

    /**
     * Unload when Exit Game
     */
    this.unload = function () {
        if (LobbyConfig.isDebug) {
            console.log("CGame unload");
        }

        //console.log("//CLEAR THE CANVAS AND STOP THE SOUNDS WHEN EXIT FROM GAME line 158");
        _oContainer.removeChild(_oBg);
        _oInterface.unload();

        var k = _aMovingColumns.length; while (k--) {_aMovingColumns[k].unload();}
        //for (var k = 0; k < _aMovingColumns.length; k++) {
        //}
    };

    /**
     * Initialize Reels
     * @private
     */
    this._initReels = function () {
        if (LobbyConfig.isDebug) {
            console.log("CGame _initReels");
        }
        var oReels = my.add.group();
        oReels.position = {x:10,y:15};
        var bg = my.add.sprite(settings.CANVAS_WIDTH/2, settings.CANVAS_HEIGHT/2, 'reels', null, _oContainer);
        bg.anchor.setTo(0.5);
        //if(ManagerForScale.is3x4resolution()){
        //   bg.scale.setTo(ManagerForScale.getScale());
        //}
        _oContainer.add(oReels);
        _oAttachSymbols = my.add.group();
        oReels.add(_oAttachSymbols);
        _oAttachWinFrames = my.add.group();
        oReels.add(_oAttachWinFrames);



        var iXPos = settings.REEL_OFFSET_X;
        var iYPos = settings.REEL_OFFSET_Y;

        var iCont = 0;
        var iCurDelay = 0;
        _aMovingColumns = [];
        for (var i = 0; i < settings.NUM_REELS; i++) {

            var aSymbols = [my.currentGameSlot.s_aStartingWheel[iCont], my.currentGameSlot.s_aStartingWheel[iCont + 1], my.currentGameSlot.s_aStartingWheel[iCont + 2]];
            _aMovingColumns[i] = new CReelColumnDB(my, i, iXPos, iYPos, iCurDelay, aSymbols, _oAttachSymbols,
                _oAttachWinFrames);
            _aMovingColumns[i + settings.NUM_REELS] = new CReelColumnDB(my, i + settings.NUM_REELS, iXPos,
                iYPos + settings.HEIGHT_REEL,
                iCurDelay, aSymbols, _oAttachSymbols, _oAttachWinFrames);
            iXPos += settings.SYMBOL_WIDTH + settings.SPACE_BETWEEN_SYMBOLS;
            iCurDelay += settings.REEL_DELAY;

            iCont += 3;
        }
        my.scaleCenterGroup(oReels);

        var myMask = my.add.graphics(0, 0);
        myMask.beginFill(0xffffff, 1);

        myMask.drawRect(
            settings.REEL_OFFSET_X,
            settings.REEL_OFFSET_Y,
            settings.REEL_OFFSET_X + (settings.SYMBOL_WIDTH + settings.SPACE_BETWEEN_SYMBOLS) * (settings.NUM_REELS - 1.5),
            settings.REEL_OFFSET_Y + ((settings.SYMBOL_HEIGHT + settings.SPACE_HEIGHT_BETWEEN_SYMBOLS) * (settings.NUM_ROWS - 1.05))
        );
        myMask.endFill();

        oReels.add(myMask);
        oReels.mask = myMask;
    };

    /**
     * Generate Losing Bet
     */
    this.generateLosingBet = function(){
        my.currentGameSlot.s_aStartingWheel =
            [
            2,
            7,
            5,
            9,
            3,
            5,
            1,
            0,
            7,
            4,
            10,
            5,
            0,
            7,
            5];
    };

    //ATTACH AND HIDE WILD EXTENDED SPRITES
    this._initWildExtended = function () {
        if ( LobbyConfig.isDebug
            ) {
            console.log("CGame _initWildExtended");
        }
        _oAttachWildExp = my.add.group();
        _oContainer.add(_oAttachWildExp);


        //ATTACH ALL WILD EXPANDED
        _aWildExpanded = [];
        for (var k = 0; k < 4; k++) {
            //var oWild = new CFreespinExtSymbol(s_aPosWildExpanded[k].x, s_aPosWildExpanded[k].y, _oAttachWildExp);
            //_aWildExpanded.push(oWild);
        }
    };

    /**
     * Check Last State if there is Bonus
     */
    this.checkLastState = function () {
        if ( LobbyConfig.isDebug
            ) {
            console.log("CGame checkLastState");
        }

        //isDebug
        //        _oBonusFreeSpin.show(100);
        //        return;

        //CHECK IF THERE IS AN OPEN BONUS
        if (my.currentGameSlot.s_oBonusToRestore !== null) {
            _iCurState = settings.GAME_STATE_BONUS;
            _oInterface.disableSpin();
            _iStepBonus = my.currentGameSlot.s_oBonusToRestore.bonus_step;
            if ( LobbyConfig.isDebug
                ) {
                console.log("CGame checkLastState my.currentGameSlot.s_oBonusToRestore.bonus_id: " +
                    my.currentGameSlot.s_oBonusToRestore.bonus_id + " _iCurState: " + _iCurState
                    + " _iStepBonus: " + _iStepBonus);
            }
            if(LobbyConfig.isTestAlgorithmMode) {
                // don't show bonus UI when run auto test
                return;
            }
            switch (my.currentGameSlot.s_oBonusToRestore.bonus_id) {
                case settings.BONUS_TYPE_DOUBLE_UP:
                {
                    _oDoubleUp.show(my.currentGameSlot.s_oBonusToRestore.doubleUpCurrentWin);
                    break;
                }
                case settings.BONUS_TYPE_FREESPIN:
                {
                    if (_iStepBonus === 0) {
                        my.currentGameSlot.manager4Network.callBonus(_iStepBonus, 0);
                    } else {

                        Manager4State.setCurrentState (my.currentGameSlot.GameConstant.State.Bonus);
                        _oBonusFreeSpin.show(
                            my.currentGameSlot.s_oBonusToRestore.aTotalFS,
                            my.currentGameSlot.s_oBonusToRestore.aTotalMulty);
                    }

                    break;
                }
                case settings.BONUS_TYPE_FS_WITH_TRIGGER:
                {


                    //BONUS FREESPIN
                    this.changeSpin2FreeSpin(
                        my.currentGameSlot.s_oBonusToRestore.counter,
                        my.currentGameSlot.s_oBonusToRestore.aTotalMulty
                    );

                    //BONUS BIKINI
                    //if (_iStepBonus === 0) {
                    //    my.currentGameSlot.manager4Network.callBonus(_iStepBonus, 0);
                    //} else {
                    //    _oBonusBikini.show();
                    //}
                    break;
                }
                case 4:
                {
                    //BONUS LOTION
                    if (_iStepBonus === 0) {
                        my.currentGameSlot.manager4Network.callBonus(_iStepBonus, 0);
                    } else {
                    }
                    break;
                }
            }
        }
    };

    /**
     * Change to free spin state After check last state
     * @param totalFS: total Freespins
     * @param totalMulty: total Multiplier
     */
    this.changeSpin2FreeSpin = function (totalFS,
                                         totalMulty) {
        if ( LobbyConfig.isDebug
            ) {
            console.log("CGame changeSpin2FreeSpin");
        }
        Manager4State.setCurrentState(my.currentGameSlot.GameConstant.State.FreeSpin);
        Manager4Sound.playBackgroundMusic();

        //BONUS FREESPIN
        _oInterface.hideGui();
        //_oBgFreeSpin.visible = true;
        //_oBg.visible = false;


        //_oLogoFreeSpin.visible = true;
        //_oLogo.visible = false;

        _iCurWildExp = -1;//_iStepBonus - 1;
        _iTotFreeSpin = totalFS;//4 - _iCurWildExp;
        _iMultyFreeSpin = totalMulty;


        my.currentGameSlot.manager4Network.callBonus(_iStepBonus, 0);
    };
    /**
     * GENERATE RANDOM SYMBOLS DURING REEL MOVEMENT
     * @returns {*[]} array contains 3 symbols for a reel
     * @private
     */
    this._generateRandSymbols = function () {
        if ( LobbyConfig.isDebug
            ) {
            //Not important
            //console.log("CGame _generateRandSymbols");
        }
        if(iCurRandSymbol >= aRandSymbols.length - 1){
            iCurRandSymbol = 0;
        }

        return [aRandSymbols[iCurRandSymbol], aRandSymbols[++iCurRandSymbol], aRandSymbols[++iCurRandSymbol]];
    };

    /**
     * THIS FUNCTION IS CALLED WHEN A REEL REACH THE Y BELOW THE MASK SLOT
     * @param iReelIndex: current Reel
     * @param iCol: current Column
     */
    this.reelArrived = function (iReelIndex, iCol) {
        if ( LobbyConfig.isDebug
            ) {
            //Not important
            //console.log("CGame reelArrived");
        }
        //IF THE CURRENCT REEL HAS DONE THE MINIMUM AMOUNT OF LOOPS, IT MUST STOP
        if (my.currentGameSlot.readyToSpin &&
            _bStopReel &&
            _iCurReelLoops > settings.MIN_REEL_LOOPS) {
            //IF THE CURRENT REEL IS THE NEXT ONE THAT MUST STOP...
            if (_iNextColToStop === iCol) {
                //ALERT HIM THAT IT MUST STOP
                if (_aMovingColumns[iReelIndex].isReadyToStop() === false) {
                    var iNewReelInd = iReelIndex;
                    if (iReelIndex < settings.NUM_REELS) {
                        iNewReelInd += settings.NUM_REELS;

                        _aMovingColumns[iNewReelInd].setReadyToStop();
                        _aMovingColumns[iReelIndex].restart([_aFinalSymbolCombo[0][iReelIndex],
                            _aFinalSymbolCombo[1][iReelIndex],
                            _aFinalSymbolCombo[2][iReelIndex]], true);

                    } else {
                        iNewReelInd -= settings.NUM_REELS;
                        _aMovingColumns[iNewReelInd].setReadyToStop();
                        _aMovingColumns[iReelIndex].restart([_aFinalSymbolCombo[0][iNewReelInd],
                            _aFinalSymbolCombo[1][iNewReelInd],
                            _aFinalSymbolCombo[2][iNewReelInd]], true);
                    }

                }
            } else {
                //OTHERWISE CONTINUE LOOPING
                _aMovingColumns[iReelIndex].restart(this._generateRandSymbols(), false);
            }
        } else {
            //...OTHERWISE IT MUST CONTINUE REPOSITIONING ITSELF
            _aMovingColumns[iReelIndex].restart(this._generateRandSymbols(), false);
            if (iReelIndex === 0) {
                _iCurReelLoops++;
            }

        }
    };

    /**
     * THIS FUNCTION IS CALLED WHEN A REEL STOPS
     */
    this.stopNextReel = function () {
        if ( LobbyConfig.isDebug
            ) {
            if ( LobbyConfig.isDebug
                ) {
                //Not important
                //console.log("CGame stopNextReel");
            }
        }
        //INCREASE INDEX OF THE NEXT REEL TO STOP, each reel will stop 2 times, i.e  stop 1st, bounce, and full stop 2nd
        _iNumReelsStopped++;
        if (_iNumReelsStopped % 2 === 0) {

            // If in FreeSpin, and the 4th reel stop, 5th reel about to start, display remaining freeSpin
            if (_iNumReelsStopped == 8 && (_iTotFreeSpin > 0 || _bEndFreeSpin)) {
                _oInterface.refreshFreeSpin(_iTotFreeSpin, _iMultyFreeSpin);
            }

            var shouldPlayScatterStop = false;

            for (var i = 0; i < settings.NUM_ROWS; i++) {
                var symbol =  parseInt(_aCurWheel[i][_iNextColToStop]);
                if(symbol == settings.SCATTER_SYMBOL){
                    shouldPlayScatterStop = true;
                    break;
                }
            }

            if(shouldPlayScatterStop){
                Manager4Sound.playScatterStop();
            }else{
                Manager4Sound.playReelStop();
            }

            _iNextColToStop = _aReelSequence[_iNumReelsStopped / 2];

            if (_iNumReelsStopped === (settings.NUM_REELS * 2)) {
                this._endReelAnimation();
            }
        }
    };

    /**
     * THIS FUNCTION IS CALLED WHEN STOP BUTTON IS CLICKED DURING A SPIN
     */
    this.forceStopReel = function () {
        if ( LobbyConfig.isDebug
            ) {
            console.log("CGame forceStopReel");
        }
        // If current state is main game, then turn off auto spin
        if (Manager4State.getCurrentState() == my.currentGameSlot.GameConstant.State.MainGame) {
            _bAutoSpin = false;
        }


        _iCurState = settings.GAME_STATE_IDLE;
        for (var i = 0; i < settings.NUM_REELS; i++) {
            _aMovingColumns[i].forceStop([_aFinalSymbolCombo[0][i], _aFinalSymbolCombo[1][i],
                _aFinalSymbolCombo[2][i]], settings.REEL_OFFSET_Y);
            _aMovingColumns[i + settings.NUM_REELS].forceStop(null,
                settings.REEL_OFFSET_Y + ((settings.SYMBOL_HEIGHT + settings.SPACE_HEIGHT_BETWEEN_SYMBOLS) * settings.NUM_ROWS));
        }

        this._endReelAnimation();

        // If in FreeSpin, display remaining freeSpin if STOP BUTTON IS CLICKED DURING A SPIN
        if (_iTotFreeSpin > 0 || _bEndFreeSpin) {

            _oInterface.refreshFreeSpin(_iTotFreeSpin, _iMultyFreeSpin);
        }
    };
    /**
     * get Footer Object
     * @returns {*}Footer Object
     */
    this.getFooter = function(){
        return _oFooter;
    };
    /**
     * get Current State
     * @returns {*} current State
     * @private
     */
    this._getCurState = function(){
        return _iCurState;
    };
    /**
     * THIS FUNCTION IS CALLED WHEN ALL REELS ARE STOPPED
     * @private
     */
    this._endReelAnimation = function () {
        if ( LobbyConfig.isDebug
            ) {
            //Not important
            //console.log("CGame _endReelAnimation");
        }
        my.afterSpinHandle(function(){

        _iCurState = settings.GAME_STATE_IDLE;

        //DISABLE GUI IF BONUS MUST BE SHOWN
        if (_iBonusActive > 0) {
            _oInterface.disableSpin();
        }
        _iCurReelLoops = 0;
        _iNumReelsStopped = 0;
        _iNextColToStop = _aReelSequence[0];

        _iCurWinShown = 0;

        //if(_bShowTotalWinOnFreeSpin == false) {
        _oInterface.refreshBet(my.currentGameSlot.s_iCurWin, my.currentGameSlot.s_iTotBet);
        //}


        //iF THERE IS ANY WINNING COMBO
        if (_aWinningLine.length > 0) {
            if (!_bAutoSpin
                && Manager4State.getCurrentState() != my.currentGameSlot.GameConstant.State.FreeSpin) {
                _oInterface.showGui();
            }else {
                //_oInterface.hideFunds();
                _oInterface.hideGui();
            }

            _iTimeElaps = 0;

            _oInterface.setSpinState(settings.SPIN_BUT_STATE_SKIP);
            _iCurState = settings.GAME_STATE_SHOW_WIN;

            that.showWin();
        } else {
            //IF THERE ARE NOT WINNING COMBO
            if (_iTotFreeSpin > 0) {
                //_oInterface.disableSpin();

                //setTimeout(function () {
                //_oInterface.stopWinTextAnimation();
                my.currentGameSlot.manager4Network.callBonus(_iStepBonus, 0);
                //}, 2000);
            } else if (_bEndFreeSpin) {
                _oInterface.disableSpin();
                _iStepBonus = 0;

                that._exitFromFreeSpin();
            }else if (
                _bAutoSpin &&
                Manager4State.getCurrentState() == my.currentGameSlot.GameConstant.State.MainGame) {
                my.time.events.add(500, function() {
                    that.onAutoSpin();
                });

            }else{
                _oInterface.showGui();
            }

            //Manager4Sound.playBackgroundMusic();
        }
    });
        //REFRESH MONEY TEXTS
        //_oInterface.refreshBalance();
    };

    /**
     * SHOW THE SYMBOL ANIMATION
     */
    this.showWin = function () {
        if ( LobbyConfig.isDebug
            ) {
            console.log("CGame showWin");
        }

        //Prevent show Animation when user skip
        if(_bOnSkip || _iCurState == settings.GAME_STATE_SPINNING){
            this.resetAnimation();
            return;
        }

        if (this.isDoubleUpMode) {
            _oInterface.showBtnDoubleUp();
        }

        if (_iCurWinShown == undefined || _iCurWinShown < 0 || _iCurWinShown > _aWinningLine.length) {
            _iCurWinShown = 0;
        }


        //RESET SYMBOLS INVOLVED IN THE PREVIOUS WINNING COMBO (IF ANY)
        if (_iCurWinShown > 0) {
            var i = _aMovingColumns.length; while (i--) {
                var j = settings.NUM_ROWS; while (j--) {_aMovingColumns[i].showSymbol(j);}
                //for (var j = 0; j < settings.NUM_ROWS; j++) {
                //}
            }
            //for (var i = 0; i < _aMovingColumns.length; i++) {}

            if (_aWinningLine[_iCurWinShown - 1] && _aWinningLine[_iCurWinShown - 1].line !== -1) {
                var iLineIndex = _aWinningLine[_iCurWinShown - 1].line;
                if (iLineIndex > 0) {
                    _oLines.hideLine(iLineIndex - 1);
                }

            }
        }
        ////////////////////////////////

        if (_iTotFreeSpin === 0 && _iBonusActive > 0 && _iCurWinShown === (_aWinningLine.length - 1)) {
            _iCurWinShown++;
            this._prepareForBonus();
            return;
        }

        //IF WE MUST PLAY THE LAST SYMBOL ANIMATION
        if (_iCurWinShown === _aWinningLine.length) {
            _iCurWinShown = 0;
            if (_iTotFreeSpin > 0) {
                _oInterface.disableSpin();
                _iCurState = settings.GAME_STATE_IDLE;
                if(_bShowTotalWinOnFreeSpin) {
                    //CHECK LATER
                    setTimeout(function() {Manager4Sound.playBackgroundMusic();
                        my.currentGameSlot.s_oStage.getChildAt(2).visible = true;}, 8000);
                    this.showWinPanelAddFreeSpin()
                }
                else {my.currentGameSlot.manager4Network.callBonus(_iStepBonus, 0);}
            } else if (_iBonusActive > 0) {
                //IF THERE IS ANY ACTIVE BONUS, SHOW IT
                this._launchBonus();
            } else if (_bEndFreeSpin) {
                _oInterface.disableSpin();
                _iStepBonus = 0;

                this._exitFromFreeSpin();
            } else {
                //if (settings.DISABLE_SOUND_MOBILE === false || s_bMobile === false) {
                //    s_oSoundTrack.setVolume(1);
                //}
                Manager4Sound.playBackgroundMusic();

                if (_bAutoSpin&&
                    Manager4State.getCurrentState() == my.currentGameSlot.GameConstant.State.MainGame) {
                    this.onAutoSpin();

                } else {
                    if(Manager4State.getCurrentState() == my.currentGameSlot.GameConstant.State.MainGame) {
                        _oInterface.showGui();
                    }
                    _iCurState = settings.GAME_STATE_SHOW_ALL_WIN;
                }

            }

            return;
        }


        var aList = _aWinningLine[_iCurWinShown].list;

        var iCol = _aWinningLine[_iCurWinShown].col;
        if (iCol >= 0) {
            //SET THE REGISTRATION POINT AND POSITION OF THE WINNING ANIMATION TO ALLOW A CORRECT SCALING
            var oRegPoint = my.slotSettings.s_oAnimRegPoint[_aWinningLine[_iCurWinShown].value];
            var oPos = _aMovingColumns[aList[iCol].col].getPosUpLeft(aList[iCol].row);

            //HIDE THE SYMBOL BEHIND THE ANIMATION
            _aMovingColumns[aList[iCol].col].hideSymbol(aList[iCol].row);
            _aMovingColumns[aList[iCol].col + settings.NUM_REELS].hideSymbol(aList[iCol].row);

            var iAmountWon = _aWinningLine[_iCurWinShown].amount;
            if (_oWinAnim.show(aList[iCol].row, aList[iCol].col, oPos, _aWinningLine[_iCurWinShown].value, oRegPoint, iAmountWon,
                    (_iTotFreeSpin > 0 ? true : false), _bAutoSpin) === false) {
                _iCurWinShown++;
                my.currentGameSlot.s_oGame.showWin();
                return;
            }
        } else {
            my.time.events.add(2000, function () {
                my.currentGameSlot.s_oGame.showWin();
            });
        }

        //HIGHLIGHT OTHER SYMBOLS INVOLVED IN THE WINNING COMBO
        for (var k = 0; k < aList.length; k++) {
            if (aList[k].col !== aList[iCol].col) {
                if (_aMovingColumns[aList[k].col].getY() > settings.CANVAS_HEIGHT / 2) {
                    _aMovingColumns[aList[k].col + settings.NUM_REELS].highlightSymbol(aList[k].row);
                } else {
                    _aMovingColumns[aList[k].col].highlightSymbol(aList[k].row);
                }
            }
        }

        //SHOW WINNING LINE
        var iLineIndex = _aWinningLine[_iCurWinShown].line;
        if (iLineIndex > 0) {
            _oLines.showLine(iLineIndex - 1);
        }

        _iCurWinShown++;
    };

    /**
     * SHOW THE WINNING LINE FOR THE CURRENT COMBO
     * @private
     */
    this._showNextWinPayline = function () {
        if ( LobbyConfig.isDebug
            ) {
            console.log("CGame _showNextWinPayline");
        }
        if(_aWinningLine.length == 0){
            return;
        }
        if (_iCurWinShown > 0) {
            if (_aWinningLine[_iCurWinShown - 1].line > 0) {
                _oLines.hideLine(_aWinningLine[_iCurWinShown - 1].line - 1);
            }

            var i = _aMovingColumns.length; while (i--) {
                var j = settings.NUM_ROWS; while (j--) {_aMovingColumns[i].showSymbol(j);}
                //for (var j = 0; j < ; j++) {
                //}
            }
            //for (var i = 0; i < ; i++) {}
        }

        if (_iCurWinShown === _aWinningLine.length) {
            _iCurWinShown = 0;
            if (_iTotFreeSpin > 0) {
                //my.currentGameSlot.manager4Network.callBonus(_iStepBonus,0);
            } else if (_bAutoSpin&&
                Manager4State.getCurrentState() == my.currentGameSlot.GameConstant.State.MainGame) {
                this.onSpin();
                return;
            }
        }

        var iLineIndex = _aWinningLine[_iCurWinShown].line;
        if (iLineIndex > 0) {
            _oLines.showLine(iLineIndex - 1);
        }

        var aList = _aWinningLine[_iCurWinShown].list;
        //HIGHLIGHT OTHER SYMBOLS INVOLVED IN THE WINNING COMBO
        for (var k = 0; k < aList.length; k++) {
            if (_aMovingColumns[aList[k].col].getY() > settings.CANVAS_HEIGHT / 2) {
                _aMovingColumns[aList[k].col + settings.NUM_REELS].highlightSymbol(aList[k].row);
            } else {
                _aMovingColumns[aList[k].col].highlightSymbol(aList[k].row);
            }
        }

        _iCurWinShown++;
    };

    /**
     * SHOW THE BONUS GAINED BY THE USER
     * @private
     */
    this._launchBonus = function () {
        if ( LobbyConfig.isDebug
            ) {
            console.log("CGame _launchBonus");
        }

        _iCurState = settings.GAME_STATE_BONUS;
        if(!LobbyConfig.isTestAlgorithmMode){
            _oInterface.disableSpin();
        }
        _iStepBonus = 0;
        switch (_iBonusActive) {
            case settings.BONUS_TYPE_FREESPIN:
            {
                //this.showWinPanelAfterWinFreeSpin(function () {
                //alert("freespin2");
                _iBonusActive = -1;

                if(LobbyConfig.isTestAlgorithmMode){
                    my.reloadProfileForTestSpin(true,null,null,2);
                    return;
                }
                //_bAutoSpin = false;
                //if (settings.DISABLE_SOUND_MOBILE === false || s_bMobile === false) {
                //    s_oSoundTrack.setVolume(1);
                //}
                //this.startFreeSpinBonus();
                //this.playBackgroundMusic();
                Manager4State.setCurrentState (my.currentGameSlot.GameConstant.State.Bonus);
                //Manager4Sound.playStandardBackgroundMusic();
                _oInterface.showStartBonusBut();
                _oInterface.hideSpinBtn();
                break;
            }
            case settings.BONUS_TYPE_FS_WITH_TRIGGER:
            {

                Manager4State.setCurrentState (my.currentGameSlot.GameConstant.State.FreeSpin);
                _iBonusActive = -1;

                if(LobbyConfig.isTestAlgorithmMode){
                    my.reloadProfileForTestSpin(true,null,null,3);
                    return;
                }
                _oInterface.showStartBonusBut();
                //my.currentGameSlot.manager4Network.callBonus(_iStepBonus,0);
                break;
            }
            case 4:
            {
                //Manager4State.setCurrentState (my.currentGameSlot.GameConstant.State.Bonus);
                _iBonusActive = -1;

                if(LobbyConfig.isTestAlgorithmMode){
                    my.reloadProfileForTestSpin(true,null,null,4);
                    return;
                }
                _oInterface.showStartBonusBut();
                //my.currentGameSlot.manager4Network.callBonus(_iStepBonus,0);
                break;
            }
        }

    };

    /**
     * THIS FUNCTION IS CALLED WHEN THERE IS A COMBO THAT WILL SHOW A BONUS
     * @private
     */
    this._prepareForBonus = function () {
        if ( LobbyConfig.isDebug
            ) {
            console.log("CGame _prepareForBonus");
        }

        _oInterface.disableSpin();
        var iSymbol;
        switch (_iBonusActive) {
            case settings.BONUS_TYPE_DOUBLE_UP:
            {
                break;
            }
            case settings.BONUS_TYPE_FREESPIN:
            {
                //FREESPINS
                iSymbol = settings.FREESPIN_SYMBOL;
                break;
            }
            case settings.BONUS_TYPE_FS_WITH_TRIGGER:
            {
                //BONUS BIKINI
                //iSymbol = BONUS_BIKINI_SYMBOL;
                iSymbol = settings.FREESPIN_SYMBOL;
                break;
            }
            case 4:
            {
                //iSymbol = BONUS_LOTION_SYMBOL;
                iSymbol = settings.FREESPIN_SYMBOL;
                break;
            }
        }


        for (var i = 0; i < _aBonusPos.length; i++) {
            for (var j = 0; j < _aBonusPos[i].length; j++) {
                if (_aBonusPos[i][j] !== 0) {
                    if (_aMovingColumns[j].getY() > settings.CANVAS_HEIGHT / 2) {
                        _aMovingColumns[j + settings.NUM_REELS].highlightSymbol(_aBonusPos[i][j] - 1);
                    } else {
                        _aMovingColumns[j].highlightSymbol(_aBonusPos[i][j] - 1);
                    }
                }
            }
        }

        //SEARCH COLUMN THAT WILL SHOW THE ANIMATION
        if (_aBonusPos.length > 0) {
            var iRowAnim;
            var iColAnim;
            if (_aBonusPos[0][2] !== 0) {
                iColAnim = 2;
                iRowAnim = _aBonusPos[0][2] - 1;
            } else if (_aBonusPos[0][1] !== 0) {
                iColAnim = 1;
                iRowAnim = _aBonusPos[0][1] - 1;
            } else if (_aBonusPos[0][0] !== 0) {
                iColAnim = 0;
                iRowAnim = _aBonusPos[0][0] - 1;
            } else if (_aBonusPos[0][3] !== 0) {
                iColAnim = 3;
                iRowAnim = _aBonusPos[0][3] - 1;
            } else {
                iColAnim = 4;
                iRowAnim = _aBonusPos[0][4] - 1;
            }

            //HIDE THE SYMBOL BEHIND THE ANIMATION
            _aMovingColumns[iColAnim].hideSymbol(iRowAnim);
            _aMovingColumns[iColAnim + settings.NUM_REELS].hideSymbol(iRowAnim);

            var oRegPoint = my.slotSettings.s_oAnimRegPoint[iSymbol];
            var oPos = _aMovingColumns[iColAnim].getPosUpLeft(iRowAnim);

            var bPlayOnce = false;

            if (_oWinAnim.show(iRowAnim, iColAnim, oPos, iSymbol, oRegPoint, 0, (_iTotFreeSpin > 0 ? true : false),
                    bPlayOnce) === false) {

                this.showWin();
            }
        }

        _iCurState = settings.GAME_STATE_SHOW_WIN;
    };

    /**
     * Function called when begin free spin with retrigger
     */
    this.startFreeSpinBonus = function () {
        if ( LobbyConfig.isDebug
            ) {
            console.log("CGame startFreeSpinBonus");
        }
        _oInterface.hideGui();

        //_oBgFreeSpin.visible = true;
        //_oBg.visible = false;

        //_oLogoFreeSpin.visible = true;
        //_oLogo.visible = false;

        _iCurWildExp = 0;

        _iStepBonus = 1;

        my.currentGameSlot.manager4Network.callBonus(_iStepBonus, 0);

        _iBonusActive = -1;

        Manager4State.setCurrentState(my.currentGameSlot.GameConstant.State.FreeSpin);
        Manager4Sound.playBackgroundMusic();

    };


    /**
     * FUNCTION CALLED WHEN PLAYER CHOOSES THE BIKINI IN THE BONUS BIKINI - Deprecated
     * @param iIndex: index User selected
     */
    this.chooseBikini = function (iIndex) {
        if ( LobbyConfig.isDebug
            ) {
            console.log("CGame chooseBikini");
        }
        my.currentGameSlot.manager4Network.callBonus(_iStepBonus, iIndex);
    };
    /**
     * Set bonus Active index
     * @param bonusActive: bonus index
     */
    this.setBonusActive = function (bonusActive) {
        if ( LobbyConfig.isDebug
            ) {
            console.log("CGame setBonusActive");
        }
        _iBonusActive = bonusActive;
    };
    /**
     * Exit from current Bonus when force User to stop Bonus
     */
    this.forceToCloseBonus = function(){
        switch(Manager4State.getCurrentState()){
            case my.currentGameSlot.GameConstant.State.Bonus:
                _oBonusFreeSpin._exitFromBonus(true);
                break;
            case my.currentGameSlot.GameConstant.State.DoubleUp:
                _oDoubleUp.exitFromDoubleUp(true);
                break;
            case my.currentGameSlot.GameConstant.State.FreeSpin:
                _iTotFreeSpin = 0;
                this.exitFromBonus();
                break;
            default:
                this.exitFromBonus();
                break;
        }
    };

    /**
     * FUNCTION CALLED WHEN PLAYER EXIT FROM BONUS
     */
    this.exitFromBonus = function () {
        if ( LobbyConfig.isDebug
            ) {
            console.log("CGame exitFromBonus");
        }
        my.afterSpinHandle(function() {
            Manager4State.setCurrentState(my.currentGameSlot.GameConstant.State.MainGame);
            Manager4Sound.playBackgroundMusic();

            _iCurState = settings.GAME_STATE_IDLE;
            my.currentGameSlot.s_oBonusToRestore = null;
            _oInterface.enableSpin();
            my.currentGameSlot.setCurrentBonus(-1);
            _iStepBonus = 0;

            if (_bAutoSpin &&
                Manager4State.getCurrentState() == my.currentGameSlot.GameConstant.State.MainGame) {
                that.onAutoSpin();
            }
            else {
                _oInterface.setSpinState(settings.SPIN_BUT_STATE_SPIN); // to reset the state back to ready to Spin
            }

            _iBonusActive = -1;

            _oInterface.hideFreeSpinIndicator();
            //if(_bAutoSpin == false
            //&&
            //Manager4State.getCurrentState() == my.currentGameSlot.GameConstant.State.MainGame
            //) {
            _oInterface.showGui();
            //}

            _oInterface.showSpinBtn();
        }, true);
    };

    /**
     * FUNCTION CALLED WHEN PLAYER EXIT FROM FREE SPIN
     * @private
     */
    this._exitFromFreeSpin = function () {
        if ( LobbyConfig.isDebug
            ) {
            console.log("CGame _exitFromFreeSpin");
        }

        //if (settings.DISABLE_SOUND_MOBILE === false || s_bMobile === false) {
        //    s_oSoundTrack.setVolume(1);
        //}
        //Manager4State.setCurrentState(my.currentGameSlot.GameConstant.State.MainGame);
        //Manager4Sound.playBackgroundMusic();

        //_oBgFreeSpin.visible = false;
        //_oBg.visible = true;
        //_oContainer.visible = false;
        _oInterface.hideFreeSpinIndicator();

        //_oLogoFreeSpin.visible = false;
        //_oLogo.visible = true;
        my.currentGameSlot.s_oBonusToRestore = null;

        _oInterface.showGui();

        _oWinPanel.showWinPanel('YOU WON', '0', _iTotWinFreespin, function(){
            that.exitFromBonus();
        });
    };

    //FUNCTION CALLED WHEN PLAYER EXIT FROM BONUS BIKINI - deprecated
    this.exitFromBonusBikini = function () {
        if ( LobbyConfig.isDebug
            ) {
            console.log("CGame exitFromBonusBikini");
        }
        _iTimeElaps = settings.TIME_SPIN_BUT_CHANGE;
        this.exitFromBonus();
    };

    //FUNCTION CALLED WHEN PLAYER EXIT FROM BONUS LOTION - deprecated
    this.exitFromBonusLotion = function () {
        if ( LobbyConfig.isDebug
            ) {
            console.log("CGame exitFromBonusLotion");
        }
        _iTimeElaps = settings.TIME_SPIN_BUT_CHANGE;
        this.exitFromBonus();
    };

    /**
     * FUNCTION CALLED WHEN PLAYER EXIT FROM BONUS FREE SPIN
     * @param totalFS: total Freespins
     * @param totalMulty: total Multiplier
     */
    this.exitFromFreeSpin = function (totalFS,
                                      totalMulty) {
        if ( LobbyConfig.isDebug
            ) {
            console.log("CGame exitFromFreeSpin");
        }
        //_iTimeElaps = settings.TIME_SPIN_BUT_CHANGE;
        //this.exitFromBonus();


        _iCurState = settings.GAME_STATE_BONUS;
        //_oInterface.disableSpin();

        if(LobbyConfig.isDebug) {
            console.log("******************ExitFromFreeSpin****************");
        }
        my.currentGameSlot.setCurrentBonus(3);
        _iStepBonus = 1;
        if(LobbyConfig.isDebug) {
            console.log(_iStepBonus);
            console.log("******************ExitFromFreeSpin****************");
        }

        Manager4Sound.playStandardBackgroundMusic();

        _iCurState = settings.GAME_STATE_BONUS;
        _iTotFreeSpin = totalFS;


        //this.resetAfterSpin();

        //_oInterface.disableSpin();
        //_bAutoSpin = false;
        _oInterface.showStartFreeSpinBut();
        //this.changeSpin2FreeSpin(
        //    totalFS,
        //    totalMulty);

    };

    /**
     * FUNCTION CALLED WHEN PLAYER EXIT FROM DOUBLE UP
     * @param totalWin: total win
     */
    this.exitFromDoubleUp = function (totalWin) {


        settings.IS_DISABLE_ALL_BUTTON = true;

        var timeOut = _oInterface.refreshBet(totalWin, my.currentGameSlot.s_iTotBet);

        if ( LobbyConfig.isDebug
            ) {
            console.log("CGame exitFromDoubleUp");
        }
        Manager4State.setCurrentState(my.currentGameSlot.GameConstant.State.MainGame);
        Manager4Sound.playBackgroundMusic();

        my.time.events.add(timeOut, function(){



            settings.IS_DISABLE_ALL_BUTTON = false;
            _iTimeElaps = settings.TIME_SPIN_BUT_CHANGE;
            that.exitFromBonus();

        });

    };

    //FUNCTION CALLED WHEN PLAYER EXIT FROM BONUS JACKPOT - deprecated
    this.exitFromBonusJackPot = function () {
        if ( LobbyConfig.isDebug
            ) {
            console.log("CGame exitFromBonusJackPot");
        }
        _iBonusActive = -1;
        this.exitFromBonus();
    };

    //FUNCTION CALLED WHEN PLAYER EXIT FROM WIN BONUS PANEL AFTER FREE SPIN BONUS - deprecated
    this.exitFromWinPanel = function () {
        if ( LobbyConfig.isDebug
            ) {
            console.log("CGame exitFromWinPanel");
        }
        //_iCurState = settings.GAME_STATE_IDLE;
        this.exitFromBonus();


        _oBg.visible = true;
        _oContainer.visible = true;


    };
    /**
     * deprecated
     */
    this.exitFromWinPanel2 = function () {
        if ( LobbyConfig.isDebug
            ) {
            console.log("CGame exitFromWinPanel");
        }
        //_iCurState = settings.GAME_STATE_IDLE;


        _oBg.visible = true;
        _oContainer.visible = true;


    };
    /**
     * deprecated
     */
    this.chooseLotion = function (iIndex) {
        if ( LobbyConfig.isDebug
            ) {
            console.log("CGame chooseLotion");
        }
        my.currentGameSlot.manager4Network.callBonus(_iStepBonus, iIndex);
    };
    /**
     * Call API when User selected in Free Spin Bonus
     * @param iIndex: index user selected
     */
    this.chooseBonusFreeSpin = function (iIndex) {
        if ( LobbyConfig.isDebug
            ) {
            console.log("CGame chooseBonusFreeSpin");
        }
        my.currentGameSlot.manager4Network.callBonus(_iStepBonus, iIndex);
    };
    /**
     * Call API when User selected in Double Up
     * @param iIndex: index user selected
     */
    this.chooseBonusDoubleUp = function (iIndex) {
        if ( LobbyConfig.isDebug
            ) {
            console.log("CGame chooseBonusDoubleUp");
        }
        my.currentGameSlot.manager4Network.callBonus(_iStepBonus, iIndex);
    };
    /**
     * Reset reels after show win animation
     */
    this.removeWinShowing = function () {
        if ( LobbyConfig.isDebug
            ) {
            console.log("CGame removeWinShowing");
        }

        var k = _aMovingColumns.length; while (k--) {_aMovingColumns[k].activate();}
        //for (var k = 0; k < ; k++) {
        //}

        _iCurState = settings.GAME_STATE_IDLE;
    };

    //THIS FUNCTION IS CALLED WHEN SETTINGS BUTTON IS CLICKED - deprecated
    this.showSettingPanel = function () {
        if ( LobbyConfig.isDebug
            ) {
            console.log("CGame showSettingPanel");
        }
        if (_iCurState === settings.GAME_STATE_SPINNING) {
            return;
        }

        if (Helper4Object.objectNotNull(_iTotFreeSpin)) {
            //alert(_iTotFreeSpin);
        }
        if (Helper4Object.objectNotNull(_oInterface.isShowStartBonusBut())) {
            //alert(_oInterface.isShowStartBonusBut());
        }
        //_oInterface.showBtnDoubleUp();

        //if (_oInterface.isShowStartBonusBut()
        //    || _oInterface.isShowStartFreeSpinBut()) {
        //    _oSettingsPanel.disableBetPerLine();
        //} else {
        //    _oSettingsPanel.enableBetPerLine();
        //}
        _oSettingsPanel.show();
    };

    /**
     * THIS FUNCTION SET ALL SYMBOLS TO SHOW IN THE FINAL WHEEL
     * @param aWheel: array wheels Info
     * @param aWinPosition: array win pos
     * @param aTableWin: array table Win
     */
    this.generateFinalSymbols = function (aWheel, aWinPosition, aTableWin) {
        if ( LobbyConfig.isDebug
            ) {
            console.log("CGame generateFinalSymbols");
        }
        _oInterface.refreshBetTo0();
        _oInterface.stopWinTextAnimation();
        //this.showWinPanelAfterWinFreeSpin();
        _aCurWheel = aWheel;

        var i = settings.NUM_ROWS; while (i--) {
            var j = settings.NUM_REELS; while (j--) {
                //STORE FINAL SYMBOLS
                _aFinalSymbolCombo[i][j] = _aCurWheel[i][j];
                /*
                 //CHECK IF THERE IS ANY WILD EXPANDED TO SHOW
                 if(i=== 0 && _aCurWheel[i][j] === settings.WILD_EXPANDED){
                 _aWildExpanded[j].visible = true;
                 }*/
            }
            //for (var j = 0; j < ; j++) { }
        }
        //for (var i = 0; i < ; i++) {}

        //STORE ALL WINNING COMBO INFOS
        _aWinningLine = [];
        for (var k = 0; k < aWinPosition.length; k++) {
            var aCellList = [];
            var aTmp = aWinPosition[k].pos.split(",");
            var szRet = "";
            var col = -1;

            var isHaveScatter = false;
            for (var s = 0; s < aTmp.length; s++) {
                if (aTmp[s] !== "0") {
                    var aReelPos = {row: parseInt(aTmp[s] - 1), col: s};
                    aCellList.push(aReelPos);
                    szRet += s + ": row:" + (parseInt(aTmp[s] - 1)) + "-col:" + s + "##";
                    if (_aCurWheel[aReelPos.row][aReelPos.col] == settings.WILD_SYMBOL) {
                        col = aCellList.length - 1;
                    }

                    if (_aCurWheel[aReelPos.row][aReelPos.col] == settings.SCATTER_SYMBOL) {
                        isHaveScatter = true;
                    }

                }
            }

            if(
                !isHaveScatter &&
                _bShowTotalWinOnFreeSpin){

                continue ;
            }

            var iCont = 0;
            var iValue = 0;
            var row = 0;

            if (col < 0) {
                col = 2;
            }
            if (col >= aCellList.length) {
                col = aCellList.length - 1;
            }

            row = (col < aCellList.length) ? aCellList[col].row : -1;
            iValue = (col > -1 && row > -1) ? _aCurWheel[row][aCellList[col].col] : undefined;


            _aWinningLine.push({
                line: aWinPosition[k].line,
                amount: aWinPosition[k].mul,
                value: iValue,
                list: aCellList,
                col: col
            });
            my.currentGameSlot.manager4Network.trace("WIN_LINE: " + aWinPosition[k].line + "#amount: " + aWinPosition[k].win + "#value:" + iValue + "#list:" + szRet);
        }
    };
    /**
     * Refresh Bet and Win UI
     */
    this.refreshBet = function () {
        if ( LobbyConfig.isDebug
            ) {
            console.log("CGame refreshBet");
        }
        return _oInterface.refreshBet(_iJackPotTotWin, my.currentGameSlot.s_iTotBet);
    };
    /**
     * Reset symbol animation
     */
    this.resetAnimation = function(){
        if(Lobby.Utils.objectNotNull(_aWinningLine)) {
            _aWinningLine = [];
        }

        _bEndFreeSpin = false;
        //RESET SYMBOLS IN REELS
        var i = _aMovingColumns.length; while (i--) {
            var j = settings.NUM_ROWS; while (j--) {_aMovingColumns[i].showSymbol(j);}
            //for (var j = 0; j < ; j++) {
            //
            //}
        }
        //for (var i = 0; i < ; i++) { }

        //RESET WIN ANIMATIONS AND LINES (IF ANY)
        //if(isFromSpin) {
        //    if (_iCurState === settings.GAME_STATE_SHOW_WIN || _iCurState === settings.GAME_STATE_SHOW_ALL_WIN || _iCurState === settings.GAME_STATE_BONUS) {
        //        _oWinAnim.reset();
        //        _oLines.reset();
        //    }
        //}else{
            _oWinAnim.reset();
        if(Lobby.Utils.objectNotNull(_oLines)) {
            _oLines.reset();
        }
        //}

        //RESET WILD EXPANDED SYMBOLS
        for (var k = 0; k < _aWildExpanded.length; k++) {
            _aWildExpanded[k].hide();
        }
    };
    /**
     * FUNCTION CALLED WHEN WE NEED TO RESET THE SLOT AFTER CLICKED SPIN
     */
    this.resetAfterSpin = function () {
        if ( LobbyConfig.isDebug
            ) {
            console.log("CGame resetAfterSpin");
        }
        _bOnSkip = false;
        this.resetAnimation();

        _aBonusPos = [];
        //RESET WIN ANIMATION
        this.removeWinShowing();
    };
    /**
     * restore previous test bonus result
     */
    this.getRandomParamFromPreviousBonusResult = function(){
        if(!LobbyConfig.isTestAlgorithmMode){
            return;
        }
        if(my.currentGameSlot.s_oBonusToRestore) {
            switch (my.currentGameSlot.s_oBonusToRestore.bonus_id) {
                case 1:
                    break;
                case settings.BONUS_TYPE_FREESPIN:
                    return my.getRandomParam(_oBonusFreeSpin.getArrayOfSelected())
                    break;
                case settings.BONUS_TYPE_FS_WITH_TRIGGER:
                    break;
            }
            return 0;
        }
    };
    /**
     * THIS FUNCTION GENERATE A LOOSING COMBO. IT IS USED WHEN API CALL CAN'T BE LOADED OR FAILS
     */
    this.generateLosingWheel = function () {
        if ( LobbyConfig.isDebug
            ) {
            console.log("CGame generateLosingWheel");
        }
        if(LobbyConfig.isTestAlgorithmMode){
            my.testSpin(null,null,null,null,true);
            return;
        }
        _bStopReel = true;
        //this.resetAfterSpin();

        //_oInterface.showGui();

        var aTmp = [1, 3, 7, 10, 5, 5, 2, 7, 2, 1, 9, 4, 1, 2, 2];
        var iCont = 0;

        var i = settings.NUM_ROWS; while (i--) {
            var j = settings.NUM_REELS; while (j--) {
                _aFinalSymbolCombo[i][j] = aTmp[iCont];
                iCont++;
            }
        }
        //for (var i = 0; i < ; i++) {
        //    for (var j = 0; j < ; j++) {}
        //}
        _aWinningLine = [];

        _iCurState = settings.GAME_STATE_SPINNING;
    };

    /**
     * AUTOSPIN BUTTON CLICKED
     */
    this.onAutoSpin = function () {
        if ( LobbyConfig.isDebug
            ) {
            console.log("CGame onAutoSpin");
        }
        _bAutoSpin = true;
        this.onSpin();
    };
    /**
     * Set auto spin state
     * @param isAutoSpin: boolen - true if it's auto spin
     */
    this.setAutoSpin = function(isAutoSpin){
        _bAutoSpin = isAutoSpin;
    };
    /**
     * Set current game state
     * @param state: current state
     */
    this.setState = function(state){
        _iCurState = state;
    };
    /**
     * Check if it's on auto spin state
     * @returns {boolen} true if it's auto spin
     */
    this.isAutoSpin = function(){
        return _bAutoSpin;
    };
    /**
     * Check if it's on bonus
     * @returns {boolean}
     */
    this.isBonus = function(){
        return _iBonusActive > 0;
    };
    /**
     * Check if it's ready to stop the reel
     * @returns {boolen} true if it's ready to stop
     */
    this.isReadyToStop = function(){
        return _bStopReel;
    };
    /**
     * Show Addition Free Spin Won Panel
     */
    this.showWinPanelAddFreeSpin = function(){

        _bShowTotalWinOnFreeSpin = false;
        settings.IS_DISABLE_ALL_BUTTON = true;

        _oInterface.stopWinTextAnimation();
    };
    /**
     * Show Win Panel
     * @param title: string Title
     * @param message: string message
     * @param currentTotWin: total Win
     * @param callback: callback after show
     */
    this.showWinPanel = function(title, message, currentTotWin, callback){
        _oWinPanel.showWinPanel(title, message, currentTotWin, callback);
    };
    /**
     * Show FreeSpin Bonus Win Panel
     * @param title: string Title
     * @param message: string message
     * @param totalFreeSpins: total FreeSpin
     * @param totalMulti: total Multiplier
     * @param callback: callback after show
     */
    this.showFreeSpinBonusWinPanel = function(title, message, totalFreeSpins, totalMulti, callback){
        _oWinPanel.showFreeSpinBonusWinPanel(title, message, totalFreeSpins, totalMulti, callback);
    };
    /**
     * Hide Win Panel Object
     * @param iWin: current Win - to show Win text on Footer
     */
    this.hideWinPanel = function(iWin){
        _oWinPanel.hide();
        if(Lobby.Utils.objectNotNull(iWin)) {
            _oInterface.refreshBet(iWin, my.currentGameSlot.s_iTotBet);
        }
    };
    /**
     * SKIP BUTTON CLICKED
     */
    this.onSkip = function () {
        if ( LobbyConfig.isDebug
            ) {
            console.log("CGame onSkip");
        }
        if (_bAutoSpin &&
            Manager4State.getCurrentState() == my.currentGameSlot.GameConstant.State.MainGame) {

//dat fix loi ko du tien khi click vo play bonus ko duoc
            if (_iBonusActive > 0) {
                this.resetAnimation();
                this._launchBonus();
            }else{
                this.onAutoSpin();
            }


        } else {
            if (_iTotFreeSpin > 0) {
                if(_bShowTotalWinOnFreeSpin) {
                    this.showWinPanelAddFreeSpin();
                }
                else {
                    if(_bOnSkip){
                        return;
                    }
                    _bOnSkip = true;
                    this.resetAnimation();
                    my.currentGameSlot.manager4Network.callBonus(_iStepBonus, 0);
                }
            } else if (_iBonusActive > 0) {
                this.resetAnimation();
                this._launchBonus();
            }
            if (_bEndFreeSpin) {
                this.resetAnimation();
                _oInterface.disableSpin();
                _iStepBonus = 0;

                this._exitFromFreeSpin();
            } else {
                this.resetAnimation();
                _iCurState = settings.GAME_STATE_IDLE;
            }
        }

        //Manager4Sound.playBackgroundMusic();
    };

    /**
     * SPIN BUTTON CLICKED
     */
    this.onSpin = function () {
        if ( LobbyConfig.isDebug
            ) {
            console.log("CGame onSpin");
        }
        if(!my.checkCanSpin()) return;
        _oInterface.onSpinStarted();
        my.beforeSpinHandle();
        if (_iTotFreeSpin > 0) {
            //this.resetAfterSpin();
            _oInterface.disableSpin();
            //my.currentGameSlot.manager4Network.callBonus(_iStepBonus, 0);
        }
        else if (_iBonusActive > 0) {
            this.resetAfterSpin();
            this._launchBonus();
        }
        else {
            my.beforeEnterNormalSpinHandle();
            _oInterface.hideBtnDoubleUp();
            this.localSpin();
            my.currentGameSlot.manager4Network.callGetSpin(my.currentGameSlot.s_szRealPlayKey !== null ? my.currentGameSlot.s_szRealPlayKey : my.currentGameSlot.s_szFunPlayKey,
                function () {
                    _oInterface.onSpinAborted();
                });

            //if (settings.DISABLE_SOUND_MOBILE === false || s_bMobile === false) {
            //    s_oSoundTrack.setVolume(1);
            //}
            Manager4Sound.playBackgroundMusic();
        }
    };
    /**
     * Play Movement for reels while waiting for Server
     */
    this.localSpin = function(){
        Manager4Sound.playSpin();
        _bStopReel = false;
        this.resetAfterSpin();
        if(!LobbyConfig.isTestAlgorithmMode) {
            _iCurState = settings.GAME_STATE_SPINNING;
        }
        _oInterface.refreshBetTo0();
    };
    /**
     * Get interface
     * @returns {*}
     */
    this.getInterface = function(){
        return _oInterface;
    };
    /**
     * FUNCTION CALLED WHEN GAME RECEIVES SPIN INFO FROM THE API
     * @param aWheels: array wheels info
     * @param aWinPosition: array Win pos
     * @param aTableWin: array Table Win
     * @param iBonus: bonus Index
     * @param aBonusPos: array Bonus Pos
     */
    this.onSpinReceived = function (aWheels, aWinPosition, aTableWin, iBonus, aBonusPos) {
        if ( LobbyConfig.isDebug
            ) {
            console.log("CGame onSpinReceived");
        }
        my.onSpinReceived(aWheels, aWinPosition, aTableWin, iBonus, aBonusPos);
        _bStopReel = true;

        //this.resetAfterSpin();

        this.generateFinalSymbols(aWheels, aWinPosition, aTableWin);

        _aBonusPos = aBonusPos;

        if (iBonus != 1) {
            _iBonusActive = iBonus;
            this.isDoubleUpMode = false;
        } else {
            this.isDoubleUpMode = true;
        }

        if(LobbyConfig.isTestAlgorithmMode) {
            if(_iBonusActive > 0){
                //if(_iBonusActive == 2) { // freespin
                //    _iStepBonus = 1;
                //}else{
                //    _iStepBonus = 0;
                //}
                //my.reloadProfileForTestSpin(true);
                this._launchBonus();
            }else{
                my.reloadProfileForTestSpin(false);
            }
            //if(_iBonusActive > 0){
            //    this._launchBonus();
            //    my.afterSpinHandle(null, null, true);
            //}else{
            //    my.afterSpinHandle();
            //}
        }

        //if(iBonus == 2){
        //    Manager4State.setCurrentState (my.currentGameSlot.GameConstant.State.Bonus);
        //}
        //_iCurState = settings.GAME_STATE_SPINNING;
    };

    /**
     * FUNCTION CALLED WHEN FREE SPIN WITH RETRIGGER INFO IS RECEIVED
     * @param iRemainingFreeSpin: number freespin remained
     * @param iMultyFS: number of Multiplier
     * @param aWinPosition: array Win Pos
     * @param aWheels: array Wheels Info
     * @param aTableWin: array Table win
     * @param iTotWin: total Win
     */
    this.onBonusFreeSpinStepReceived =
        function (
            iRemainingFreeSpin,
            iMultyFS,
            aWinPosition,
            aWheels,
            aTableWin,
            iTotWin) {

            if ( LobbyConfig.isDebug
                ) {
                console.log("CGame onBonusFreeSpinStepReceived");
            }
            my.onBonusFreeSpinStepReceived(iRemainingFreeSpin, iMultyFS, aWinPosition, aWheels, aTableWin,iTotWin);
            _oInterface.refreshBalance();


            _bStopReel = true;
            _iStepBonus++;
            this.resetAfterSpin();

            if(_iTotFreeSpin > 0 && _iTotFreeSpin + 2 < iRemainingFreeSpin){
                _bShowTotalWinOnFreeSpin = true;
            }


            this.generateFinalSymbols(aWheels, aWinPosition, aTableWin);

            //_aWildExpanded[_iCurWildExp].show(/*_iTotFreeSpin*/);
            _iCurWildExp++;


            _iTotFreeSpin = iRemainingFreeSpin;


            _iMultyFreeSpin = iMultyFS;
            _iTotWinFreespin = iTotWin;
            if(_bShowTotalWinOnFreeSpin == false) {
                _oInterface.refreshFreeSpin(_iTotFreeSpin + 1, _iMultyFreeSpin); // show current freeSpin, not the remaining
            }
            if (_iTotFreeSpin === 0) {
                _bEndFreeSpin = true;
            }

            if(LobbyConfig.isTestAlgorithmMode) {
                //my.afterSpinHandle();
                my.reloadProfileForTestSpin(!_bEndFreeSpin,0,true,settings.BONUS_TYPE_FS_WITH_TRIGGER,this.getStepBonus()-1,null,"Free spin with trigger");

            }else {
                _iCurState = settings.GAME_STATE_SPINNING;
            }
        };

    /**
     * FUNCTION CALLED WHEN BONUS BIKINI STEP 0 IS RECEIVED - deprecated
     */
    this.onBonusBikiniStep0Received = function () {
        if ( LobbyConfig.isDebug
            ) {
            console.log("CGame onBonusBikiniStep0Received");
        }
        _oInterface.refreshBalance();


        _iStepBonus++;
    };

    /**
     * FUNCTION CALLED WHEN BONUS BIKINI STEP 1 IS RECEIVED - deprecated
     */
    this.onBonusBikiniStep1Received = function (iWin) {
        if ( LobbyConfig.isDebug
            ) {
            console.log("CGame onBonusBikiniStep1Received");
        }
    };

    /**
     * FUNCTION CALLED WHEN DOUBLE UP STEP 0 IS RECEIVED
     * @param currentWin: current win
     */
    this.onDoubleUpStep0Received = function (currentWin) {
        if ( LobbyConfig.isDebug
            ) {
            console.log("CGame onDoubleUpStep0Received");
        }
        _oInterface.refreshBalance();
        _oDoubleUp.show(currentWin);


        _iStepBonus++;
    };

    /**
     * FUNCTION CALLED WHEN DOUBLE UP STEP 1 IS RECEIVED
     * @param iFinish: check if should finish double Up
     * @param iResult: result Info
     * @param iTotWin: Total Win
     */
    this.onDoubleUpStep1Received = function (iFinish, iResult, iTotWin) {
        if ( LobbyConfig.isDebug
            ) {
            console.log("CGame onDoubleUpStep1Received");
        }

        _oDoubleUp.showResult(iFinish, iResult, iTotWin);

        _iStepBonus++;
    };
    /**
     * FUNCTION CALLED WHEN FREE SPIN BONUS STEP 0 IS RECEIVED
     * @param totalFreeSpins: total freespins
     * @param totalMulty: total multiplier
     */
    this.onBonusFreeSpinStep0Received = function (totalFreeSpins, totalMulty) {
        if ( LobbyConfig.isDebug
            ) {
            console.log("CGame onBonusFreeSpinStep0Received");
        }
        _oInterface.refreshBalance();

        if (LobbyConfig.isTestAlgorithmMode) {
            _iStepBonus++;
            my.reloadProfileForTestSpin(true,my.getRandomParam(_oBonusFreeSpin.getArrayOfSelected()),true,settings.BONUS_TYPE_FREESPIN,this.getStepBonus()-1,null,"Free spin");
        }
        else{
            _oBonusFreeSpin.show(totalFreeSpins, totalMulty);
            _iStepBonus++;
        }


    };
    /**
     * FUNCTION CALLED WHEN FREE SPIN BONUS STEP 1 IS RECEIVED
     * @param iFinish: check if should finish FreeSpin
     * @param totalFreeSpins: total freespins won
     * @param totalMulty: total multiplier won
     * @param aWheels: array wheels info
     */
    this.onBonusFreeSpinStep1Received = function (iFinish, totalFreeSpins, totalMulty, aWheels) {
        if ( LobbyConfig.isDebug
            ) {
            console.log("CGame onBonusFreeSpinStep1Received");
        }
        _iStepBonus++;
        if(LobbyConfig.isTestAlgorithmMode) {
            var resultWin = _oBonusFreeSpin.showResult(iFinish,null,null, aWheels, aWheels.length - 1);
            if(!iFinish) my.reloadProfileForTestSpin(true, my.getRandomParam(_oBonusFreeSpin.getArrayOfSelected()), true, settings.BONUS_TYPE_FREESPIN, this.getStepBonus() - 1, resultWin,"Free spin");
            else {
                _iStepBonus = 1;
                my.reloadProfileForTestSpin(true, 0, true, settings.BONUS_TYPE_FS_WITH_TRIGGER, 2, resultWin,"Free spin");
            }
        }else{
            _oBonusFreeSpin.showResult(iFinish, totalFreeSpins, totalMulty, aWheels, aWheels.length - 1);

        }

    };
    /**
     * Deprecated
     */
    this.onBonusLotionStep0Received = function () {
        if ( LobbyConfig.isDebug
            ) {
            console.log("CGame onBonusLotionStep0Received");
        }
        _oInterface.refreshBalance();

        _iStepBonus++;
    };
    /**
     * Deprecated
     */
    this.onBonusLotionStep1Received = function (iFinish, aWheels) {
        if ( LobbyConfig.isDebug
            ) {
            console.log("CGame onBonusLotionStep1Received");
        }
        _iStepBonus++;
    };
    /**
     * Deprecated
     */
    this.onBonusJackpotStep0Received = function (iMinor, iMajor) {
        if ( LobbyConfig.isDebug
            ) {
            console.log("CGame onBonusJackpotStep0Received");
        }
        _oInterface.refreshBalance();

        _iCurState = settings.GAME_STATE_BONUS;
        _oBonusJackPot.show(iMinor, iMajor);
        _oInterface.setJackPot();
        _iStepBonus++;
    };
    /**
     * Deprecated
     */
    this.onBonusJackpotStep1Received = function (iType, iTotWin) {
        if ( LobbyConfig.isDebug
            ) {
            console.log("CGame onBonusJackpotStep1Received");
        }
        _iJackPotTotWin = iTotWin;

        _oInterface.refreshBalance();

        _oInterface.refreshBet(_iJackPotTotWin, my.currentGameSlot.s_iTotBet);
        _oBonusJackPot.showResult(iType, parseFloat(_iJackPotTotWin * my.currentGameSlot.s_iConversion));
    };
    /**
     * Deprecated
     */
    this.onInfoClicked = function () {
        if ( LobbyConfig.isDebug
            ) {
            console.log("CGame onInfoClicked");
        }

    };

    /**
     * FUNCTION CALLED WHEN USER WANT TO EXIT FROM THE GAME
     */
    this.onExit = function () {
        _bUpdate = false;
        _oFooter.destroy();
        _oFooter = null;
        _oWinAnim = null;
        _oWinPanel = null;
        _oBonusFreeSpin.destroy();
        _oBonusFreeSpin = null;
        _oDoubleUp.destroy();
        _oDoubleUp = null;
        _oInterface.unload();
        _oInterface = null;
        _oLines = null;
        var i = _aMovingColumns.length; while (i--) {_aMovingColumns[i].unload(); _aMovingColumns[i] = null;}
        _aMovingColumns = null;
        for(var i = 0; i < 3; i++){
            jellyFish[i].destroy();
            jellyFish[i] = null;
        }
        jellyFish = [];
    };
    /**
     * Get Current Spin State
     * @returns {*} number - current State
     */
    this.getState = function () {
        if ( LobbyConfig.isDebug
            ) {
            console.log("CGame getState");
        }
        return _iCurState;
    };
    /**
     * get total freespins
     * @returns {*}total freespins
     */
    this.getTotalFreeSpin = function(){
        return _iTotFreeSpin;
    };
    /**
     * Get current Step Bonus
     * @returns {*} number - current bonus step
     */
    this.getStepBonus = function () {
        if ( LobbyConfig.isDebug
            ) {
            console.log("CGame getStepBonus");
        }
        return _iStepBonus;
    };

    /**
     * MAIN GAME UPDATE
     */
    this.update = function () {
        if (_bUpdate === false) {
            return;
        }
        for(var i = 0; i < 3; i++){
            jellyFish[i]._update();
        }

        _oWinPanel.update();
        //if (_oDoubleUp.isShowed) {
        //    _oDoubleUp.update();
        //}

        //trace("_iCurState: "+_iCurState);
        switch (_iCurState) {
            case settings.GAME_STATE_IDLE:
            {
                if (_bAutoSpin&&
                    Manager4State.getCurrentState() == my.currentGameSlot.GameConstant.State.MainGame) {
                    return;
                }

                if (_iTotFreeSpin === 0) {
                    _iTimeElaps += my.currentGameSlot.s_iTimeElaps;
                    //MANAGES SPIN/AUTOSPIN IMAGE CHANGING
                    if (_iTimeElaps > settings.TIME_SPIN_BUT_CHANGE) {
                        _iTimeElaps = 0;
                        _oInterface.toggleAutoSpinImage();
                    }
                }
                _oInterface.update();
                break;
            }
            case settings.GAME_STATE_SPINNING:
            {
                if (_iTotFreeSpin > 0) {
                    //_iTimeElaps += s_iTimeElaps;
                    //if(_iTimeElaps > 1000){
                    //  _iTimeElaps = 0;
                    _oInterface.setSpinState(settings.SPIN_BUT_STATE_STOP);
                    //}
                } else {
                    _oInterface.setSpinState(settings.SPIN_BUT_STATE_STOP);
                }

                var i = _aMovingColumns.length; while (i--) {_aMovingColumns[i].update(_iNextColToStop);}
                //for (var i = 0; i < ; i++) {
                //
                //}
                break;
            }
            case settings.GAME_STATE_SHOW_ALL_WIN:
            {
                //THIS STATE SHOWS ALL THE WINNING COMBOS
                _iTimeElaps += my.currentGameSlot.s_iTimeElaps;
                if (_iTimeElaps > settings.TIME_SHOW_ALL_WINS) {
                    _iTimeElaps = 0;
                    this._showNextWinPayline();
                    if (_iTotFreeSpin === 0 && _iBonusActive === -1) {
                        _oInterface.toggleAutoSpinImage();
                    }
                }
                break;
            }
            case settings.GAME_STATE_SHOW_WIN:
            {
                //THIS STATE SHOWS THE CURRENT WINNING COMBO
                _oInterface.setSpinState(settings.SPIN_BUT_STATE_SKIP);
                _oWinAnim.update();
                break;
            }
            case settings.GAME_STATE_BONUS:
            {
                break;
            }
        }


    };

    my.currentGameSlot.s_oGame = this;
    //INIT SOME CUSTOM DATA FROM INDEX.HTML
    settings.MIN_REEL_LOOPS = oData.min_reel_loop;
    settings.REEL_DELAY = oData.reel_delay;
    settings.TIME_SHOW_WIN = oData.time_show_win;
    settings.TIME_SHOW_ALL_WINS = oData.time_show_all_win;

    this._init();
}
