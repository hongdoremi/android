/**
 * Created by Duy on 11/10/2016.
 */
/**
 * THIS CLASS MANAGES THE REEL COLUMN (WITH 3 SYMBOLS)
 * @param my: Phaser Game Object
 * @param iIndex: index of reel
 * @param iXPos: x Position
 * @param iYPos: y Position
 * @param iDelay: Delay for movement - always 0
 * @param aSymbols: array Of 3 Symbols
 * @param oAttachSymbols: Group contains symbol
 * @param oAttachWinFrames: Group contains win frame
 * @constructor
 * @param movingReel
 * @param stopingReel
 * @param callbackInitFrameWin
 * @param scaleSymbol
 * @param delayFrames
 */
function CReelColumnBase(my, iIndex, iXPos, iYPos, iDelay, aSymbols, oAttachSymbols, oAttachWinFrames, movingReel, stopingReel, callbackInitFrameWin, scaleSymbol, delayFrames) {
    var _bUpdate;
    var _bReadyToStop;
    var _bContainsFinalSymbols;
    var _iIndex;
    var _iCol;
    var _iDelay;
    var _iContDelay;
    var _iCurState;
    var _iCntFrames;
    var _iMaxFrames;
    var _iStartY;
    var _iCurStartY;
    var _iFinalY;
    this._aSymbols = [];
    this._aSymbolValues = [];
    this._oWinFrame = null;
    this._oSymbolHighlight = null;
    this._oContainer = null;
    var _oAttachSymbols;
    this._oAttachWinFrames = null;

// for Delay update function
    var currentDelayUpdateValue = 0;
    var maxDelayUpdateValue = delayFrames?delayFrames:0;

    var arrayPositionStart = [];
    var arrayPositionStop = [];

    /**
     * INITIALIZE THE SYMBOL SPRITES AND WIN FRAMES
     * @param iIndex: index of reel
     * @param iXPos: x Position
     * @param iYPos: y Position
     * @param iDelay: Delay for movement - always 0
     * @param aSymbols: array Of 3 Symbols
     * @param oAttachSymbols: Group contains symbol
     * @param oAttachWinFrames: Group contains win frame
     * @private
     */
    this._init = function (iIndex, iXPos, iYPos, iDelay, aSymbols, oAttachSymbols, oAttachWinFrames) {
        _bUpdate = false;
        _bReadyToStop = false;
        _bContainsFinalSymbols = false;
        _iContDelay = 0;
        _iIndex = iIndex;
        _iDelay = iDelay;

        if (_iIndex < settings.NUM_REELS) {
            _iCol = _iIndex;
        } else {
            _iCol = _iIndex - settings.NUM_REELS;
        }

        _iCntFrames = 0;
        _iMaxFrames = settings.MAX_FRAMES_REEL_EASE;
        _iCurState = settings.REEL_STATE_START;
        _iCurStartY = _iStartY = iYPos;
        _iFinalY = _iCurStartY + settings.HEIGHT_REEL;

        _oAttachSymbols = oAttachSymbols;
        this._oAttachWinFrames = oAttachWinFrames;
        this.initContainer(iXPos, iYPos, aSymbols);

        if(callbackInitFrameWin){
            var frameWin = callbackInitFrameWin(this._oAttachWinFrames, _oAttachSymbols);
            this._oSymbolHighlight = frameWin._oSymbolHighlight;
            this._oWinFrame = frameWin._oWinFrame;
        }
    };
    /**
     * Initialize symbol sprite on reel
     * @param iXPos: x Position
     * @param iYPos: y Position
     * @param aSymbols: array of 3 symbols
     */
    this.initContainer = function (iXPos, iYPos, aSymbols) {
        this._oContainer = my.add.group();
        this._oContainer.x = iXPos;
        this._oContainer.y = iYPos;

        scaleSymbol = scaleSymbol?scaleSymbol:1;

        var iX = 0;
        var iY = 0;
        this._aSymbols = [];
        this._aSymbolValues = [];
        for (var i = 0; i < settings.NUM_ROWS; i++) {
            var iSymbol = aSymbols[i];

            var oSymbolData = my.add.sprite(0,0,'static_symbol', 'symbol_' + iSymbol, this._oContainer);
            oSymbolData.x = iX;
            oSymbolData.y = iY;
            oSymbolData.scale.setTo(scaleSymbol);
            this._aSymbols[i] = oSymbolData;
            this._aSymbolValues[i] = iSymbol;

            iY += settings.SYMBOL_HEIGHT + settings.SPACE_HEIGHT_BETWEEN_SYMBOLS;
        }

        _oAttachSymbols.add(this._oContainer);
    };
    /**
     * Unload function
     */
    this.unload = function () {
        _oAttachSymbols.removeChild(this._oContainer);
    };

    /**
     * RESET POSITION FOR REEL
     */
    this.activate = function () {
        if(_bUpdate){
            return;
        }
        _iCurStartY = this._oContainer.y;
        _iFinalY = _iCurStartY + settings.HEIGHT_REEL;

        if(Lobby.Utils.objectNotNull(movingReel)) {
            if (_iCurStartY < settings.REEL_ARRIVAL_Y) {
                arrayPositionStart = movingReel.reel1;
            } else {
                arrayPositionStart = movingReel.reel2;
            }
        }
        _bUpdate = true;
    };

    /**
     * SET THE SYMBOL VALUE FOR EACH SPITE IN REEL
     * @param aSymbols: array of 3 symbols
     */
    this.setSymbol = function (aSymbols) {
        //this._oContainer.removeAll();

        //var iX = 0;
        //var iY = 0;
        var i = aSymbols.length; while (i--) {
            Lobby.PhaserJS.destroyAllChild(this._aSymbols[i]);
            this._aSymbols[i].frameName = 'symbol_' + aSymbols[i];

            //oSymbolData.scale.setTo(2,2);
            //this._aSymbols[i] = oSymbolData;

            this._aSymbolValues[i] = aSymbols[i];

            //iY += settings.SYMBOL_HEIGHT + settings.SPACE_HEIGHT_BETWEEN_SYMBOLS;
        }
        //for (var i = 0; i < aSymbols.length; i++) {}
    };

    /**
     * CALLED WHEN PLAYER CLICK STOP BUTTON DURING SPIN
     * @param aSymbols: array of 3 final symbols
     * @param iYPos: y Position
     */
    this.forceStop = function (aSymbols, iYPos) {
        if (aSymbols !== null) {
            this.setSymbol(aSymbols);
            this.setupLuckySymbol();
        }
        this._oContainer.y = iYPos;
        _bUpdate = false;
        _iCntFrames = 0;
        _iMaxFrames = settings.MAX_FRAMES_REEL_EASE;
        _iCurState = settings.REEL_STATE_START;
        _iContDelay = 0;
        _bReadyToStop = false;
        _bContainsFinalSymbols = false;
    };

    /**
     * HIGHLIGHT SYMBOL WHEN IS INVOLVED IN WINNING COMBO
     * @param iIndex: index of symbol involved
     */
    this.highlightSymbol = function (iIndex) {
        //return;
        if (this._aSymbolValues[iIndex] === settings.WILD_EXPANDED) {
            return;
        }
        this._oSymbolHighlight.frameName =  'symbol_' + this._aSymbolValues[iIndex];
        this._oSymbolHighlight.x = this._oContainer.x + this._aSymbols[iIndex].x;
        this._oSymbolHighlight.y = this._oContainer.y + this._aSymbols[iIndex].y;
        this._oSymbolHighlight.visible = true;
        //_oAttachWinFrames.addChild(_oSymbolHighlight);

        this._oWinFrame.x = this._oContainer.x + this._aSymbols[iIndex].x;
        this._oWinFrame.y = this._oContainer.y + this._aSymbols[iIndex].y;
        this._oWinFrame.visible = true;

        if (this._aSymbolValues[iIndex] === settings.SCATTER_SYMBOL) {
            this._oWinFrame.visible = false;
            this._oSymbolHighlight.visible = false;
        }else{
            this.hideSymbol(iIndex);
        }

    };

    /**
     * SHOW SYMBOL SPRITE ON ROW
     * @param iRow: row need to show
     */
    this.showSymbol = function (iRow) {
        this._aSymbols[iRow].visible = true;
        if (this._oWinFrame.visible) {
            //_oAttachWinFrames.removeChild(_oWinFrame);
            this._oWinFrame.visible = false;
            //_oAttachWinFrames.removeChild(_oSymbolHighlight);
            this._oSymbolHighlight.visible = false;
        }

    };
    /**
     * HIDE SYMBOLS SPRITE ON ROW
     * @param iRow: row need to hide
     */
    this.hideSymbol = function (iRow) {
        this._aSymbols[iRow].visible = false;
    };

    /**
     * RESET Y POSITION OF THE REEL
     * @param aSymbols: array of 3 symbols
     * @param bReadyToStop: boolen - check if it's ready to Stop movement
     */
    this.restart = function (aSymbols, bReadyToStop) {
        this._oContainer.y = _iCurStartY = settings.REEL_START_Y;

        _iFinalY = _iCurStartY + settings.HEIGHT_REEL;
        this.setSymbol(aSymbols);

        _bReadyToStop = bReadyToStop;
        if (_bReadyToStop) {
            _iCntFrames = 0;
            _iMaxFrames = settings.MAX_FRAMES_REEL_EASE;
            _iCurState = settings.REEL_STATE_STOP;

            _bContainsFinalSymbols = true;

            if(Lobby.Utils.objectNotNull(stopingReel)) {
                arrayPositionStop = stopingReel.reel1;
            }

            this.setupLuckySymbol();
        }else{
            _bContainsFinalSymbols = false;

            if(Lobby.Utils.objectNotNull(stopingReel)) {
                arrayPositionStop = stopingReel.reel2;
            }
        }
    };

    this.setupLuckySymbol = function(){
        var numberOfLuckySymbol = 0;
        if(LobbyC.MainMenu.magicItem) {
            for (var i = 0; i < LobbyC.MainMenu.magicItem.LuckySymbol.arrayPosition.length; ++i) {
                if (LobbyC.MainMenu.magicItem.LuckySymbol.arrayPosition[i] > 0 &&
                    LobbyC.MainMenu.magicItem.LuckySymbol.arrayPosition[i] > _iCol * 3 &&
                    LobbyC.MainMenu.magicItem.LuckySymbol.arrayPosition[i] <= (_iCol + 1) * 3) {
                    Lobby.PhaserJS.destroyAllChild(this._aSymbols[index]);
                    var index = LobbyC.MainMenu.magicItem.LuckySymbol.arrayPosition[i] - _iCol * 3 - 1;
                    var luckySymbol = my.add.sprite(0, 0, 'arrow_tutorial', null);
                    luckySymbol.scale.setTo(0.5 / scaleSymbol);
                    this._aSymbols[index].addChild(luckySymbol);
                    numberOfLuckySymbol++;
                }
            }
        }
        if(LobbyConfig.isTestStrategy && _iCol === 4){
            if(Lobby.Utils.objectIsNull(LobbyConfig.numberOfLuckySymbolSpin)){
                LobbyConfig.numberOfLuckySymbolSpin = 1;
            }else{
                LobbyConfig.numberOfLuckySymbolSpin++;
            }
            for (var i = 0; i < LobbyC.MainMenu.magicItem.LuckySymbol.arrayPosition.length; ++i) {
                if (LobbyC.MainMenu.magicItem.LuckySymbol.arrayPosition[i] > 0) {
                    numberOfLuckySymbol++;
                }
            }
            //console.log("lucky symbol " + LobbyConfig.numberOfLuckySymbolSpin + ": " + numberOfLuckySymbol);
        }
    };
    /**
     * SET FLAG STOP TO TRUE
     */
    this.setReadyToStop = function () {
        _iCntFrames = 0;
        _iFinalY = settings.REEL_ARRIVAL_Y;
        _iMaxFrames = settings.MAX_FRAMES_REEL_EASE;
        _iCurState = settings.REEL_STATE_STOP;
    };
    /**
     * Check if reel is ready to stop
     * @returns {*} true if it's ready
     */
    this.isReadyToStop = function () {
        return _bReadyToStop;
    };
    /**
     * Get symbol value on specific row
     * @param iRow: row contains symbol need to get value
     * @returns {*}
     */
    this.getValue = function (iRow) {
        return this._aSymbolValues[iRow];
    };
    /**
     * Get y Position of reel
     * @returns {number|*} y Position
     */
    this.getY = function () {
        return this._oContainer.y;
    };
    /**
     * Deprecated
     * @returns {boolean}
     */
    this.isCurrentlyVisible = function () {
        return (this._oContainer.y < _iFinalY);
    };
    /**
     * Deprecated
     * @param iRow
     * @returns {{x: *, y: *}}
     */
    this.getPosBottomCenter = function (iRow) {
        var iX = this._oContainer.x + (settings.SYMBOL_WIDTH / 2);
        var iY = _iStartY + (settings.SYMBOL_HEIGHT * (iRow + 1));
        return {x: iX, y: iY};
    };
    /**
     * Deprecated
     * @param iRow
     * @returns {{x: *, y: *}}
     */
    this.getPosBottomLeft = function (iRow) {
        var iX = this._oContainer.x;
        var iY = _iStartY + (settings.SYMBOL_HEIGHT * (iRow + 1));
        return {x: iX, y: iY};
    };
    /**
     * Get Position of Reel in Up Left Conner on Specific row
     * @param iRow: specific row
     * @returns {{x: *, y: *}} Position
     */
    this.getPosUpLeft = function (iRow) {
        var iX = this._oContainer.x;
        var iY = _iStartY + (settings.SYMBOL_HEIGHT * iRow) + (settings.SPACE_HEIGHT_BETWEEN_SYMBOLS * iRow);
        return {x: iX, y: iY};
    };
    /**
     * Deprecated
     * @param iRow
     * @returns {{x: *, y: *}}
     */
    this.getPosUpCenter = function (iRow) {
        var iX = this._oContainer.x + (settings.SYMBOL_WIDTH / 2);
        var iY = _iStartY + (settings.SYMBOL_HEIGHT * iRow);
        return {x: iX, y: iY};
    };
    /**
     * Deprecated
     * @param iRow
     * @returns {{x: *, y: *}}
     */
    this.getPosCenterLeft = function (iRow) {
        var iX = this._oContainer.x;
        var iY = _iStartY + (settings.SYMBOL_HEIGHT * iRow) + (settings.SYMBOL_HEIGHT / 2);
        return {x: iX, y: iY};
    };
    /**
     * Deprecated
     * @param iRow
     * @returns {{x: *, y: *}}
     */
    this.getPosCenter = function (iRow) {
        var iX = this._oContainer.x + (settings.SYMBOL_WIDTH / 2);
        var iY = _iStartY + (settings.SYMBOL_HEIGHT * iRow) + (settings.SYMBOL_HEIGHT / 2);
        return {x: iX, y: iY};
    };

    /**
     * UPDATE FUNCTION WHEN REEL STARTS
     * @private
     */
    this._updateStart = function () {
        if(arrayPositionStart.length == 0){
            this._oContainer.y += my.gameSlotData.movingReelSpeed;
        }else {
            if (_iCntFrames > _iMaxFrames * 3 - 1) {
                _iCntFrames = 0;
                _iCurState++;

                this._oContainer.y = arrayPositionStart[25];
                return;
            }
            this._oContainer.y = arrayPositionStart[_iCntFrames];
            _iCntFrames++;
        }
    };

    /**
     * UPDATE FUNCTION WHEN REEL IS MOVING
     * @private
     */
    this._updateMoving = function () {
        this._oContainer.y += my.gameSlotData.movingReelSpeed;
    };

    /**
     * UPDATE FUNCTION WHEN REEL IS STOPPING
     * @private
     */
    this._updateStopping = function () {
        if (_iCntFrames >= _iMaxFrames*2 - 1) {
            _bUpdate = false;
            _iCntFrames = 0;
            _iMaxFrames = settings.MAX_FRAMES_REEL_EASE;
            _iCurState = settings.REEL_STATE_START;
            _iContDelay = 0;
            _bReadyToStop = false;
            if (_bContainsFinalSymbols)
            {
                _bContainsFinalSymbols = false;

                this._oContainer.y = settings.REEL_OFFSET_Y;

                _bContainsFinalSymbols = false;
            }
            else
            {
                _bContainsFinalSymbols = true;

                this._oContainer.y = settings.REEL_ARRIVAL_Y;
            }
            my.currentGameSlot.s_oGame.stopNextReel();
        } else {
            _bReadyToStop = true;

            this._oContainer.y = arrayPositionStop[_iCntFrames];
        }
        _iCntFrames++;
    };
    /**
     * UPDATE FUNCTION
     */
    this.update = function () {

        //if(Lobby.Utils.isOldSchoolDevice()) {
            if (currentDelayUpdateValue < maxDelayUpdateValue) {
                currentDelayUpdateValue++;
                return;
            }
            currentDelayUpdateValue = 0;
        //}
        if (_bUpdate === false) {
            return;
        }

        //_iContDelay++;
        //
        //if (_iContDelay > _iDelay) {

            if (_bReadyToStop === false && (this._oContainer.y > settings.REEL_ARRIVAL_Y)) {
                my.currentGameSlot.s_oGame.reelArrived(_iIndex, _iCol);
            }

            switch (_iCurState) {
                case settings.REEL_STATE_START:
                {
                    this._updateStart();
                    break;
                }
                case settings.REEL_STATE_MOVING:
                {
                    this._updateMoving();
                    break;
                }
                case settings.REEL_STATE_STOP:
                {
                    this._updateStopping();
                    break;
                }
            }
        //}
    };

    this._init(iIndex, iXPos, iYPos, iDelay, aSymbols, oAttachSymbols, oAttachWinFrames);

}
