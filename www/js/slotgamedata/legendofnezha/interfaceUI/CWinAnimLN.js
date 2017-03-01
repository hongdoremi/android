/**
 * THIS CLASS MANAGES THE SYMBOL ANIMATIONS
 * @param my: Phaser Group Object
 * @param oParentContainer: Group parent
 * @constructor
 */
function CWinAnimLN(my, oParentContainer) {
    var _bUpdate;
    var _iSpeedStep;
    var _iScaleToReach;
    var _iScaleFactor;
    var _iCurFrame;
    var _iCurSymbol;
    var _iNumCycles;
    var _iTotAnimCycle;
    var _aSymbolImages;
    var _oCurRegPoint;
    var _oWinTextBg;
    //var _oWinStrokeText;
    var _oWinText;
    var _oWinFrame;
    var _oImageAttach;
    var _oContainer;
    var _oCurWinSound;
    var _oThis;
    var _iMutiplyDelayForAnimWinFreeSpin = 1;

    var tweenAnimation;
    /**
     * Initialize groups, text, sprite
     * @param oParentContainer: group parent
     * @private
     */
    this._init = function (oParentContainer) {
        if (LobbyConfig.isDebug) {
            console.log("CWinAnim _init");
        }

        _bUpdate = false;
        _iSpeedStep = 0;

        _oContainer = my.add.group();
        //_oContainer.scale.setTo(settings.SCALE_SYMBOL);
        _oContainer.visible = false;

        oParentContainer.add(_oContainer);

        _oImageAttach =  my.add.group();
        _oContainer.add(_oImageAttach);

        //ATTACH WIN BG AND TEXT
        _oWinTextBg = my.add.sprite(0,
            0,
            "amount-win",
            null,
            _oContainer);
      _oWinTextBg.body = null;
        _oWinTextBg.anchor.setTo(0.5);
        //_oWinTextBg.scale.setTo(1.5);
        //_oWinTextBg.x += _oWinTextBg.width/6;
        _oWinTextBg.y = 115;
        _oWinText =  my.add.text(_oWinTextBg.x,_oWinTextBg.y, "x0", {
            font: "40px CopperPlates",
            fill: "#ffffcc"
        }, _oContainer);
        _oWinText.anchor.setTo(0.5);
    };

    /**
     * SHOW THE SYMBOL ANIMATION
     * @param iRow: row of symbol
     * @param iCol: col of symbol
     * @param oPos: position of symbol
     * @param iSymbol: value of symbol
     * @param oRegPoint: deprecated
     * @param iAmountWin: win amount
     * @param bFreeSpin: boolen - true if this is in Free Spin state
     * @param bPlayOnce: boolen - true if play animation once (else play three times)
     */
    this.show = function (iRow, iCol, oPos, iSymbol, oRegPoint, iAmountWin, bFreeSpin, bPlayOnce) {
        if (LobbyConfig.isDebug) {
            console.log("CWinAnim show");
        }
        _oImageAttach.removeAll();
        _oContainer.x = Lobby.Utils.floatToIntOptimize(oPos.x);
        _oContainer.y = Lobby.Utils.floatToIntOptimize(oPos.y);

        if (iAmountWin > 0) {
            //_oWinStrokeText.text = "x"+iAmountWin;
            //_oWinStrokeText.visible = true;
            _oWinText.text = "x" + iAmountWin;
            _oWinText.visible = true;
            _oWinTextBg.visible = true;
        } else {
            //_oWinStrokeText.visible = false;
            _oWinText.visible = false;
            _oWinTextBg.visible = false;
        }

        _aSymbolImages = [];

        _iCurSymbol = iSymbol;
        _oCurRegPoint = oRegPoint;

        //CHECK IF ANIMATION IS ALREADY LOADED
        //if (s_oSpriteLibrary.isLoaded("symbol" + iSymbol + "_" + my.slotSettings.s_iSymbolAnims[_iCurSymbol]) === true) {
        this.playAnimation(bFreeSpin, bPlayOnce, iRow, iCol);
        //    return true;
        //} else {
        //
        //    return false;
        //}

    };

    /**
     * PLAY SYMBOL ANIMATION
     * @param bFreeSpin: boolen - true if this is in Free Spin state
     * @param bPlayOnce: boolen - true if play animation once (else play three times)
     */
    this.playAnimation = function (bFreeSpin, bPlayOnce, iRow, iCol) {
        if (LobbyConfig.isDebug) {
            console.log("CWinAnim playAnimation");
        }

        _oCurWinSound = Manager4Sound.playSymbolAnimation(_iCurSymbol);
        Manager4Sound.setVolumeBackgroundMusic(0.2);
        //_oCurWinSound.addEventListener("complete", _oThis.soundComplete);
        for (var i = 0; i < my.slotSettings.s_iSymbolAnims[_iCurSymbol]; i++) {
            var oImage = my.add.sprite(0,0,"symbolLN" + _iCurSymbol + "_" + (i + 1));
          oImage.body = null;
            oImage.anchor.setTo(my.slotSettings.s_oAnimRegPoint[_iCurSymbol].x,
                my.slotSettings.s_oAnimRegPoint[_iCurSymbol].y);
            oImage.scale.setTo(1.7);

            if (i === 0) {
                oImage.visible = true;
            } else {
                oImage.visible = false;
            }
            _oImageAttach.add(oImage);

            _aSymbolImages.push(oImage);
        }

        //_oImageAttach.regX = _oCurRegPoint.x;
        //_oImageAttach.regY = _oCurRegPoint.y;

        _oContainer.visible = true;

        _iScaleToReach = 1;
        _iScaleFactor = 0.05;
        _iCurFrame = 0;
        _iNumCycles = 0;


        if (bPlayOnce
            || bFreeSpin
        ) {
            _iTotAnimCycle = 1;
            //_iMutiplyDelayForAnimWinFreeSpin = 5;
        } else {
            _iTotAnimCycle = 3;
            _iMutiplyDelayForAnimWinFreeSpin = 1;
        }
        _oContainer.x += Math.floor(settings.SYMBOL_WIDTH / 2);
        _oContainer.y += Math.floor(settings.SYMBOL_HEIGHT / 2);

        //tweenAnimation = my.add.tween(_oContainer.scale).to( { x: 1, y: 1 }, 1000, Phaser.Easing.Bounce.Out, true);

        _bUpdate = true;
    };
    /**
     * Deprecated
     */
    this.soundComplete = function () {
        if (LobbyConfig.isDebug) {
            console.log("CWinAnim soundComplete");
        }
        Manager4Sound.playBackgroundMusic();
    };

    /**
     * RESET ANIMATION
     */
    this.reset = function () {
        if (LobbyConfig.isDebug) {
            console.log("CWinAnim reset");
        }
        if (_aSymbolImages === undefined) {
            return;
        }
        _bUpdate = false;

        if (settings.DISABLE_SOUND_MOBILE === false) {
            if (_oCurWinSound) {
                ManagerForSound.stop(my, _oCurWinSound);
            }
        }
        Manager4Sound.playBackgroundMusic();

        //REMOVE ALL IMAGES
        for (var i = 0; i < _aSymbolImages.length; i++) {
            _oImageAttach.removeChild(_aSymbolImages[i]);
        }

        if(Lobby.Utils.objectNotNull(tweenAnimation)){
            tweenAnimation.stop();
        }

        _oImageAttach.removeAll();

        _aSymbolImages = [];
        _oContainer.visible = false;
    };

    /**
     * ITERATE SYMBOL ANIMATION SHOWING THE NEXT FRAME
     */
    this.nextFrame = function () {
        _aSymbolImages[_iCurFrame].visible = false;
        _iCurFrame++;
        _aSymbolImages[_iCurFrame].visible = true;
    };

    /**
     * SET A FRAME FOR THE SYMBOL ANIMATION
     * @param iPrevFrame: previous frame
     * @param iFrame: current frame
     */
    this.setFrame = function (iPrevFrame, iFrame) {
        _aSymbolImages[iPrevFrame].visible = false;
        _iCurFrame = iFrame;
        _aSymbolImages[_iCurFrame].visible = true;
    };


    /**
     * ANIMATION LOOP
     */
    this.update = function () {

        if (_bUpdate === false) {
            return;
        }

        _iSpeedStep++;
        if (_iSpeedStep === settings.ANIM_SYMBOL_STEPS) {
            _iSpeedStep = 0;
            //IF ANIMATION REACHED THE LAST FRAME
            if (_iCurFrame === my.slotSettings.s_iSymbolAnims[_iCurSymbol] - 1) {
                this.setFrame(my.slotSettings.s_iSymbolAnims[_iCurSymbol] - 1, 1);
                _iNumCycles++;

                if (_iNumCycles === _iTotAnimCycle) {
                    //END WHOLE SYMBOL ANIMATION
                    _bUpdate = false;
                    tweenAnimation = my.add.tween(_oContainer.scale).to( { x: settings.SCALE_SYMBOL, y: settings.SCALE_SYMBOL }, 100 * _iMutiplyDelayForAnimWinFreeSpin, Phaser.Easing.Cubic.Out, true);
                    tweenAnimation.onComplete.add(function(){
                        _oThis.reset();
                        my.currentGameSlot.s_oGame.showWin();
                    });
                    //this.reset();
                    //my.currentGameSlot.s_oGame.showWin();
                }
            } else {
                this.nextFrame();
            }
        }
    };

    _oThis = this;

    this._init(oParentContainer);
}
