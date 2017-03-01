/**
 * THIS CLASS MANAGES THE SYMBOL ANIMATIONS
 * @param my: Phaser Group Object
 * @param oParentContainer: Group parent
 * @constructor
 */
function CWinAnimPO(my, oParentContainer) {
    var _iCurSymbol;
    var _iNumCycles;
    var _iTotAnimCycle;
    var _oWinFrame;
    var _oWinTextBg;
    var _oWinText;
    var _oImageAttach;
    var _oContainer;
    var _oCurWinSound;
    var _oThis;
    var _iMutiplyDelayForAnimWinFreeSpin = 1;
    /**
     * Initialize groups, text, sprite
     * @param oParentContainer: group parent
     * @private
     */
    this._init = function (oParentContainer) {
        if (LobbyConfig.isDebug) {
            console.log("CWinAnim _init");
        }

        _oContainer = my.add.group();
        //_oContainer.scale.setTo(settings.SCALE_SYMBOL);
        _oContainer.visible = false;

        oParentContainer.add(_oContainer);

        _oImageAttach =  my.add.group();
        _oContainer.add(_oImageAttach);

        _oImageAttach.symbol = my.add.sprite(0, 0, 'static_symbol', 'symbol_0', _oImageAttach);
        _oImageAttach.symbol.anchor.setTo(0.5);

        _oImageAttach.winFrame = my.add.sprite(0, 0, 'static_symbol', 'symbol-wild-en', _oImageAttach);
        _oImageAttach.winFrame.anchor.setTo(0.5);
        _oImageAttach.winFrame.visible = false;

        _oWinFrame = new SpriteAnimation(my,
            _oContainer,
            {x:0,y:0},
            {x:1,y:1},
            'winFrame_',
            0,
            24,
            true);

        //ATTACH WIN BG AND TEXT
        _oWinTextBg = my.add.sprite(0,
            0,
            "amount-win",
            null,
            _oContainer);
        _oWinTextBg.anchor.setTo(0.5);
        //_oWinTextBg.scale.setTo(1.5);
        //_oWinTextBg.x += _oWinTextBg.width/6;
        _oWinTextBg.y = 100;
        _oWinText =  my.add.text(_oWinTextBg.x,_oWinTextBg.y, "x0", {
            font: "50px ADONAIS",
            //font: "50px PassionOne-Regular",
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
        //_oImageAttach.removeAll();
        _oContainer.x = oPos.x;
        _oContainer.y = oPos.y;

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

        _iCurSymbol = iSymbol;

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
        _oImageAttach.symbol.frameName = 'symbol_' + _iCurSymbol;

        _oContainer.visible = true;

        _iNumCycles = 0;

        switch (_iCurSymbol){
            case settings.WILD_SYMBOL:
            {
                _oImageAttach.winFrame.frameName = 'symbol-wild-en';
                break;
            }
            case settings.BONUS_SYMBOL:
            {
                _oImageAttach.winFrame.frameName = 'symbol-bonus-en';
                break;
            }
            case settings.SCATTER_SYMBOL:
            {
                _oImageAttach.winFrame.frameName = 'symbol-scatter-en';
                break;
            }
        }
        if(_iCurSymbol >= 9){
            _oImageAttach.winFrame.visible = true;
        }


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

        //_oContainer.scaleX = settings.SCALE_SYMBOL;
        //_oContainer.scaleY = settings.SCALE_SYMBOL;


        _oWinFrame.play(25, function(){
            _iNumCycles++;
            if(_iNumCycles > _iTotAnimCycle){
                _oThis.onEndAnimation();
            }
        });
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

        if (settings.DISABLE_SOUND_MOBILE === false) {
            if (_oCurWinSound) {
                ManagerForSound.stop(my, _oCurWinSound);
            }
        }
        Manager4Sound.playBackgroundMusic();

        if(Lobby.Utils.objectNotNull(_oWinFrame)){
            _oWinFrame.stop();
            _oWinFrame.hide();
        }

        _oImageAttach.winFrame.visible = false;

        _oContainer.visible = false;
    };

    this.destroy = function(){
        if(_oWinFrame){
            _oWinFrame.stop();
            _oWinFrame.destroy();
            _oWinFrame = null;
        }
    };


    //ANIMATION LOOP
    this.update = function () {
    };
    /**
     * Function called when animation ended
     */
    this.onEndAnimation = function(){
        _oThis.reset();
        my.currentGameSlot.s_oGame.showWin();
    };

    _oThis = this;

    this._init(oParentContainer);
}