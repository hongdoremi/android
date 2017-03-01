/**
 * Created by Duy on 9/22/2016.
 */
/**
 * Interface Base Class
 * @param my: Phaser gameObject
 * @param parentGroup: parent group
 * @param isHaveFreeSpin: boolen - check if this game have free spin
 * @param isHaveBonus: boolen - check if this game have bonus
 * @param isHaveDoubleUp: boolen - check if this game have double up
 * @param functionBonus: function call when user press bonus button
 * @param onCreateFPIndicator: function create free spin indicator
 * @param customSpinStateFrameID: custom frame ID of spin state texture
 * @param isCreateFPIndicatorFirst: boolen - check if create FP Indicator first (Nezha)
 * @returns {CInterfaceBase} Interface Object
 * @constructor
 */
function CInterfaceBase(my, parentGroup, isHaveFreeSpin, isHaveBonus, isHaveDoubleUp, functionBonus, onCreateFPIndicator, customSpinStateFrameID, isCreateFPIndicatorFirst) {
    var _oContainer;

    var _pStartPosSpin;
    var _pStartPosStartBut;

    var _oButSpin;
    var _oBtnDoubleUp;
    var _oButStartFreeSpin;
    var _oButStartBonus;
    this._oFreeSpinIndicator;

    //variables for spin button
    var _bUpdate;
    var currentState;
    var _iTimeElaps;
    var that = this;

    this.iCurBonus = 0;
    /**
     * Used for auto call bonus
     */
    this.callFunctionBonus = function(){
        if(functionBonus) {
            functionBonus();
        }
    };
    /**
     * Initialize UI
     */
    this._init = function () {
        _oContainer = my.add.group();
        parentGroup.add(_oContainer);

        _bUpdate = false;
        currentState = settings.SPIN_BUT_STATE_SPIN;
        _iTimeElaps = 0;
        //ATTACH BUTTONS
        _pStartPosSpin = {x: settings.CANVAS_WIDTH - 126 -ManagerForScale.offsetOutOfBounce_1920/ManagerForScale.getScale(), y: 550};
        _pStartPosStartBut = _pStartPosSpin;
        var iScale = 1;



        if(onCreateFPIndicator && isCreateFPIndicatorFirst){
            this._oFreeSpinIndicator = onCreateFPIndicator(_oContainer);
        }

        _oButSpin = Lobby.PhaserJS.createSpriteRectangleExt(
            my,
            _pStartPosSpin.x,
            _pStartPosSpin.y,
            function () {
                if(!LobbyConfig.isTestAlgorithmMode) {
                    _iTimeElaps = 0;
                    _oButSpin.scale.setTo(0.9);
                    _bUpdate = true;
                }
            },
            function () {
            },
            function () {
            },
            _oContainer,
            LobbyConfig.isDebug,
            'but_spin',
            function () {
                if(LobbyConfig.isTestAlgorithmMode) {
                    my.testSpin(null,null,null,true);
                }else {
                    if(!_bUpdate){
                        return;
                    }
                    _bUpdate = false;
                    _oButSpin.scale.setTo(1);
                    that._onSpin(currentState, false);
                }
            }
        );
        _oButSpin.frame = 0;
        _oButSpin.anchor.setTo(0.5);
        _oButSpin.visible = false;

        if(isHaveFreeSpin) {
            _oButStartFreeSpin = Lobby.PhaserJS.createSpriteRectangleExt(
                my,
                _pStartPosStartBut.x,
                _pStartPosStartBut.y,
                function () {
                    _oButStartFreeSpin.scale.setTo(0.9);
                },
                function () {
                },
                function () {
                },
                _oContainer,
                LobbyConfig.isDebug,
                'start_freespin',
                function () {
                    _oButStartFreeSpin.scale.setTo(1);
                    that._onStartFreeSpin();
                }
            );
            _oButStartFreeSpin.anchor.setTo(0.5);
            _oButStartFreeSpin.visible = false;
        }
        if(isHaveBonus) {
            _oButStartBonus = Lobby.PhaserJS.createSpriteRectangleExt(
                my,
                _pStartPosStartBut.x,
                _pStartPosStartBut.y,
                function () {
                    _oButStartBonus.scale.setTo(0.9);
                },
                function () {
                },
                function () {
                },
                _oContainer,
                LobbyConfig.isDebug,
                'start_bonus',
                function () {
                    _oButStartBonus.scale.setTo(1);
                    if(functionBonus){
                        functionBonus();
                    }
                }
            );
            _oButStartBonus.anchor.setTo(0.5);
            _oButStartBonus.visible = false;
        }
        if(isHaveDoubleUp) {
            _oBtnDoubleUp = Lobby.PhaserJS.createSpriteRectangleExt(
                my,
                _pStartPosSpin.x,
                _pStartPosSpin.y + 225,
                function () {
                    _oBtnDoubleUp.scale.setTo(0.9);
                },
                function () {
                },
                function () {
                },
                _oContainer,
                LobbyConfig.isDebug,
                'btn-double-up',
                function () {
                    _oBtnDoubleUp.scale.setTo(1);
                    that._onStartDoubleUp();
                }
            );
            _oBtnDoubleUp.anchor.setTo(0.5);

            this.hideBtnDoubleUp();
        }

        if(onCreateFPIndicator && !isCreateFPIndicatorFirst){
            this._oFreeSpinIndicator = onCreateFPIndicator(_oContainer);
        }

        this.setSpinState(settings.SPIN_BUT_STATE_SPIN);
    };
    /**
     * Unload
     */
    this.unload = function () {
        if(this._oFreeSpinIndicator.destroy){
            this._oFreeSpinIndicator.destroy();
        }
        this._oFreeSpinIndicator = null;
    };
    /**
     * Refresh free spin and multiplier UI on Free Spin
     * @param iNumFreeSpin: number of Free spin
     * @param iMultyFS: number of multiplier
     */
    this.refreshFreeSpin =
        function (
            iNumFreeSpin,
            iMultyFS) {
            this._oFreeSpinIndicator.show(
                iNumFreeSpin,
                iMultyFS);
        };
    /**
     * Hide Free Spin indicator UI
     */
    this.showFreeSpinIndicator = function () {
        try {
            this._oFreeSpinIndicator.showIndicator();
        }catch(e){
            try{
                this._oFreeSpinIndicator.show();
            }catch(e){

            }
        }
    };
    /**
     * Hide Free Spin indicator UI
     */
    this.hideFreeSpinIndicator = function () {
        this._oFreeSpinIndicator.hide();
    };

    /**
     * REFRESH BALANCE TEXT VALUES
     */
    this.refreshBalance = function () {
        //_oCreditText.text = my.currentGameSlot.s_iCredit.formatDecimal(2, '.', ',');
    };

    /**
     * REFRESH BET TEXT VALUES
     * @param szWin: current Win
     * @param szBet: current Bet
     * @returns {number} time duration of Animation zoom text when User win Big (0 if not)
     */
    this.refreshBet = function (szWin, szBet) {

        var duration4Animation = 0;
        var zoomText = false;
        //IF WIN AMOUNT >= TOTAL BET, ZOOM IN THE TEXT
        if ( parseFloat(szWin) > parseFloat(szBet)) {
            zoomText = true;
            duration4Animation = 4000;
        }

        my.currentGameSlot.s_oGame.getFooter().refreshWin(szWin, zoomText)


        return duration4Animation;
    };
    /**
     * Refresh Win Text to 0
     */
    this.refreshBetTo0 = function(){
        my.currentGameSlot.s_oGame.getFooter().refreshWin(0, false);
    };
    /**
     * Stop win text Animation - deprecated
     */
    this.stopWinTextAnimation = function() {

    };
    /**
     * Enable Spin Button
     */
    this.enableSpin = function () {
        _oButSpin.inputEnabled = true;
        //this.showSpinBtn();
    };
    /**
     * Disable Spin Button
     */
    this.disableSpin = function () {
        if(LobbyConfig.isTestAlgorithmMode){ return ;}
        _oButSpin.inputEnabled = false;
    };
    /**
     * Toggle Spin button image between spin and auto spin
     */
    this.toggleAutoSpinImage = function () {
        this.enableSpin();
        if(currentState == settings.SPIN_BUT_STATE_SPIN){
            if(Manager4State.getCurrentState() == my.currentGameSlot.GameConstant.State.MainGame) {
                this.setSpinState(settings.SPIN_BUT_STATE_AUTOSPIN);
            }
        }else{
            this.setSpinState(settings.SPIN_BUT_STATE_SPIN);
        }
    };

    /**
     * SET SPIN BUTTON STATE
     * @param szState: spin button state
     */
    this.setSpinState = function (szState) {
        this.enableSpin();
        currentState = szState;
        var frameID = [0,1,2,3];
        if(customSpinStateFrameID){
            frameID = customSpinStateFrameID;
        }
        var frame;
        switch (szState)
        {
            case settings.SPIN_BUT_STATE_SPIN:
                frame = frameID[0];
                break;
            case settings.SPIN_BUT_STATE_STOP:
                if (my.currentGameSlot.s_oGame.isAutoSpin() &&
                    Manager4State.getCurrentState() == my.currentGameSlot.GameConstant.State.MainGame)
                {
                    frame = frameID[1];
                }
                else
                {
                    frame = frameID[0];
                    this.disableSpin();
                }
                break;
            case settings.SPIN_BUT_STATE_AUTOSPIN:
                frame = frameID[2];
                break;
            case settings.SPIN_BUT_STATE_SKIP:
                frame = frameID[3];
                break;
            default:
                break;
        }
        _oButSpin.frame = frame;
    };

    /**
     * Show GUI
     */
    this.showGui = function () {
        this.enableSpin();
        _oButSpin.visible = true;
    };

    /**
     * Hide GUI
     */
    this.hideGui = function () {
        //_oButHome.setVisible(false);
        //_oButSettings.setVisible(false);
        //_oButExit.setVisible(false);

        this.hideFunds();
    };

    /**
     * Deprecated
     */
    this.hideFunds = function () {
        //if (my.currentGameSlot.s_bRealPlay) {
        //    _oFundsBut.visible = true;
        //} else {
        //    _oRealPlayBut.visible = false;
        //}
    };
    /**
     * Show Button Double Up
     */
    this.showBtnDoubleUp = function () {
        if(_oBtnDoubleUp) {
            _oBtnDoubleUp.visible = true;
            my.onBonusButtonShow("doubleup");
        }
    };
    /**
     * Hide Button Double Up
     */
    this.hideBtnDoubleUp = function () {
        if(_oBtnDoubleUp) {
            _oBtnDoubleUp.visible = false;
            //my.onBonusButtonHide("doubleup",onBonusButtonHide);
        }
    };

    /**
     * Check if is showing start free spin Button
     * */
    this.isShowStartFreeSpinBut = function(){
        return (_oButStartFreeSpin?_oButStartFreeSpin.visible:false);
    };
    /**
     * Show start free Spin Button
     */
    this.showStartFreeSpinBut = function () {
        _oButSpin.visible = false;
        if(_oButStartFreeSpin) {
            _oButStartFreeSpin.visible = true;
            my.onBonusButtonShow("freespin");
        }
    };
    /**
     * Hide start free Spin Button
     */
    this.hideStartFreeSpinBut = function () {
        _oButSpin.visible = true;
        if(_oButStartFreeSpin) {
            _oButStartFreeSpin.visible = false;
            //my.onBonusButtonHide("freespin",_oButStartFreeSpin);
        }
    };
    /**
     * Hide Spin Button
     */
    this.hideSpinBtn = function () {
        _oButSpin.visible = false;
    };
    /**
     * Show Spin Button
     */
    this.showSpinBtn = function () {
        if(this.shouldShowBtnSpin()) {
            _oButSpin.visible = true;
        }
    };
    /**
     * Check if is showing start bonus Button
     * */
    this.isShowStartBonusBut = function(){
        if(LobbyConfig.isTestAlgorithmMode){
            return;
        }
        return (_oButStartBonus?_oButStartBonus.visible:false);
    };
    /**
     * Show Start Bonus Button
     */
    this.showStartBonusBut = function (iCurBonus) {
        if(_oButStartBonus) {
            this.iCurBonus = iCurBonus;
            this.showGui();
            _oButStartBonus.visible = true;
            my.onBonusButtonShow("gamebonus");
        }
    };
    /**
     * Hide Start Bonus Button
     */
    this.hideStartBonusBut = function () {
        if(_oButStartBonus) {
            _oButStartBonus.visible = false;
        }
    };

    //CLICK ON SETTINGS BUTTON - deprecated
    this._onSettings = function () {
        my.currentGameSlot.s_oGame.showSettingPanel();
    };
    /**
     * Deprecated
     * @private
     */
    this._onHome = function () {
        //alert("Home button is pressed");
    };
    /**
     * Deprecated
     * @private
     */
    this._onExit = function () {

    };
    /**
     * Deprecated
     * @private
     */
    this._onFundsRelease = function () {

    };
    /**
     * Deprecated
     * @private
     */
    this._onRealPlayRelease = function () {

    };
    /**
     * Function Hide GUI when clicked Spin button
     */
    this.onSpinStarted = function () {
        this.hideGui();
    };
    /**
     * Function abort spin button
     */
    this.onSpinAborted = function () {
        this.showGui();
    };

    /**
     * FUNCTION CALLED WHEN CLICKED SPIN BUTTON
     * @param szAnimation: spin state
     * @param bAutoSpin: check if it need to be auto spin
     * @private
     */
    this._onSpin = function (szAnimation, bAutoSpin) {
        _oButSpin.scale.setTo(1.0);
        if (bAutoSpin &&
            Manager4State.getCurrentState() != my.currentGameSlot.GameConstant.State.FreeSpin) {

            if (my.currentGameSlot.s_oGame.isAutoSpin()) {
                return;
            }

            my.currentGameSlot.s_oGame.onAutoSpin();

        }
        else if ((szAnimation === settings.SPIN_BUT_STATE_SPIN || szAnimation === settings.SPIN_BUT_STATE_AUTOSPIN) &&
            Manager4State.getCurrentState() != my.currentGameSlot.GameConstant.State.FreeSpin)
        {
            my.currentGameSlot.s_oGame.onSpin();
        }
        else if (szAnimation === settings.SPIN_BUT_STATE_SKIP) {
            //			((SettingsLN)My.settingsSlotGame)._oInterface.refreshWin ();
            my.currentGameSlot.s_oGame.onSkip();
            if (!my.currentGameSlot.s_oGame.isAutoSpin() && Manager4State.getCurrentState() != my.currentGameSlot.GameConstant.State.FreeSpin) {
                this.setSpinState(settings.SPIN_BUT_STATE_SPIN);
            }
        }
        else {
            //			((SettingsLN)My.settingsSlotGame)._oInterface.refreshWin ();
            if (my.currentGameSlot.s_oGame.isAutoSpin() &&
                Manager4State.getCurrentState() != my.currentGameSlot.GameConstant.State.FreeSpin) {
                if(my.currentGameSlot.s_oGame.isReadyToStop()) {
                    my.currentGameSlot.s_oGame.forceStopReel();
                    if (my.currentGameSlot.s_oGame._getCurState() == settings.GAME_STATE_IDLE) {
                        this.setSpinState(settings.SPIN_BUT_STATE_SPIN);
                    }
                }else{
                    my.currentGameSlot.s_oGame.setAutoSpin(false);
                    this.disableSpin();
                }
            }
        }
    };
    /**
     * Check if can show Spin Button
     * @returns {boolean}
     */
    this.shouldShowBtnSpin = function(){
        return (
            (_oButStartFreeSpin?!_oButStartFreeSpin.visible:true) &&
            (_oButStartBonus?!_oButStartBonus.visible:true));
    };
    /**
     * Function called when clicked Start Bonus FreeSpin Button - deprecated
     * @private
     */
    this._onStartBonusFreeSpin = function () {
        this.hideStartFreeSpinBut();
        my.currentGameSlot.manager4Network.callBonus(0, 0);
    };
    /**
     * Function called when clicked Start FreeSpin Button
     * @private
     */
    this._onStartFreeSpin = function () {
        Manager4State.setCurrentState(my.currentGameSlot.GameConstant.State.FreeSpin);
        this.hideSpinBtn();
        this.hideStartFreeSpinBut();
        this.stopWinTextAnimation();
        my.currentGameSlot.s_oGame.startFreeSpinBonus();
    };
    /**
     * Function called when clicked Double Up Button
     * @private
     */
    this._onStartDoubleUp = function () {
        Manager4State.setCurrentState(my.currentGameSlot.GameConstant.State.DoubleUp);
        my.currentGameSlot.s_oGame.isDoubleUpMode = false;
        my.currentGameSlot.manager4Network.callBonus(0, 0);

        this.hideBtnDoubleUp();
        this.hideSpinBtn();
        my.currentGameSlot.s_oGame.resetAnimation();
        my.currentGameSlot.s_oGame.getDoubleUp().show();

    };
    /**
     * Function update for UI
     */
    this.update = function () {
        if (!_bUpdate) {
            return;
        }

        _iTimeElaps += my.currentGameSlot.s_iTimeElaps;
        //MANAGES SPIN/AUTOSPIN IMAGE CHANGING
        if (_iTimeElaps > settings.TIME_SPIN_BUT_CHANGE)
        {
            _bUpdate = false;
            currentState = settings.SPIN_BUT_STATE_AUTOSPIN;
            _oButSpin.scale.setTo(1.0);
            _iTimeElaps = 0;
            this._onSpin(currentState, true);
        }
    };

    this._init();

    return this;
}