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
 */
function CReelColumnDB(my, iIndex, iXPos, iYPos, iDelay, aSymbols, oAttachSymbols, oAttachWinFrames) {
    var that = new CReelColumnBase(my,
        iIndex,
        iXPos,
        iYPos,
        iDelay,
        aSymbols,
        oAttachSymbols,
        oAttachWinFrames,
        my.gameSlotData.arrayPositionReelStart.easeInBack,
        my.gameSlotData.arrayPositionReelStop.easeOutBack,
        function(_oAttachWinFrames){
            var _oSymbolHighlight = my.add.sprite(0, 0, 'static_symbol', 'symbol_0', _oAttachWinFrames);
            _oSymbolHighlight.scale.setTo(2);

            var _oWinFrame = my.add.sprite(0,0, 'static_symbol', 'frame_win',_oAttachWinFrames);
            _oWinFrame.anchor.setTo(0.05);
            _oWinFrame.scale.setTo(0.85);

            _oSymbolHighlight.visible = false;
            _oWinFrame.visible = false;

            return {_oSymbolHighlight: _oSymbolHighlight, _oWinFrame : _oWinFrame};
        },
        2);

    return that;

//    var _bUpdate;
//    var _bReadyToStop;
//    var _bContainsFinalSymbols;
//    var _iIndex;
//    var _iCol;
//    var _iDelay;
//    var _iContDelay;
//    var _iCurState;
//    var _iCntFrames;
//    var _iMaxFrames;
//    var _iStartY;
//    var _iCurStartY;
//    var _iFinalY;
//    var _aSymbols;
//    var _aSymbolValues;
//    var _oWinFrame = null;
//    var _oSymbolHighlight;
//    var _oContainer;
//    var _oAttachSymbols;
//    var _oAttachWinFrames;
//
//// for Delay update function
//  var currentDelayUpdateValue = 0;
//  var maxDelayUpdateValue = 0;
//
//    var arrayPositionStart = [];
//    var arrayPositionStop = [];
//
//    /**
//     * INITIALIZE THE SYMBOL SPRITES AND WIN FRAMES
//     * @param iIndex: index of reel
//     * @param iXPos: x Position
//     * @param iYPos: y Position
//     * @param iDelay: Delay for movement - always 0
//     * @param aSymbols: array Of 3 Symbols
//     * @param oAttachSymbols: Group contains symbol
//     * @param oAttachWinFrames: Group contains win frame
//     * @private
//     */
//    this._init = function (iIndex, iXPos, iYPos, iDelay, aSymbols, oAttachSymbols, oAttachWinFrames) {
//        _bUpdate = false;
//        _bReadyToStop = false;
//        _bContainsFinalSymbols = false;
//        _iContDelay = 0;
//        _iIndex = iIndex;
//        _iDelay = iDelay;
//
//        if (_iIndex < settings.NUM_REELS) {
//            _iCol = _iIndex;
//        } else {
//            _iCol = _iIndex - settings.NUM_REELS;
//        }
//
//        _iCntFrames = 0;
//        _iMaxFrames = settings.MAX_FRAMES_REEL_EASE;
//        _iCurState = settings.REEL_STATE_START;
//        _iCurStartY = _iStartY = iYPos;
//        _iFinalY = _iCurStartY + settings.HEIGHT_REEL;
//
//        _oAttachSymbols = oAttachSymbols;
//        _oAttachWinFrames = oAttachWinFrames;
//        this.initContainer(iXPos, iYPos, aSymbols);
//
//        _oSymbolHighlight = my.add.sprite(0, 0, 'static_symbol', 'symbol_0', _oAttachWinFrames);
//        _oSymbolHighlight.scale.setTo(2);
//
//        _oWinFrame = my.add.sprite(0,0, 'static_symbol', 'frame_win',_oAttachWinFrames);
//        _oWinFrame.anchor.setTo(0.05);
//        _oWinFrame.scale.setTo(0.85);
//
//        _oSymbolHighlight.visible = false;
//        _oWinFrame.visible = false;
//    };
//    /**
//     * Initialize symbol sprite on reel
//     * @param iXPos: x Position
//     * @param iYPos: y Position
//     * @param aSymbols: array of 3 symbols
//     */
//    this.initContainer = function (iXPos, iYPos, aSymbols) {
//        _oContainer = my.add.group();
//        _oContainer.x = iXPos;
//        _oContainer.y = iYPos;
//
//        var iX = 0;
//        var iY = 0;
//        _aSymbols = [];
//        _aSymbolValues = [];
//        for (var i = 0; i < settings.NUM_ROWS; i++) {
//            var iSymbol = aSymbols[i];
//
//            var oSymbolData = my.add.sprite(0,0,'static_symbol', 'symbol_' + iSymbol, _oContainer);
//            oSymbolData.x = iX;
//            oSymbolData.y = iY;
//            oSymbolData.scale.setTo(2,2);
//            _aSymbols[i] = oSymbolData;
//            _aSymbolValues[i] = iSymbol;
//
//            iY += settings.SYMBOL_HEIGHT + settings.SPACE_HEIGHT_BETWEEN_SYMBOLS;
//        }
//
//        _oAttachSymbols.add(_oContainer);
//    };
//    /**
//     * Unload function
//     */
//    this.unload = function () {
//        _oAttachSymbols.removeChild(_oContainer);
//    };
//
//    /**
//     * RESET POSITION FOR REEL
//     */
//    this.activate = function () {
//        if(_bUpdate){
//            return;
//        }
//        _iCurStartY = _oContainer.y;
//        _iFinalY = _iCurStartY + settings.HEIGHT_REEL;
//
//        if(_iCurStartY < settings.REEL_ARRIVAL_Y){
//            arrayPositionStart = my.gameSlotData.arrayPositionReelStart.easeInBack.reel1;
//        }else{
//            arrayPositionStart = my.gameSlotData.arrayPositionReelStart.easeInBack.reel2;
//        }
//
//        _bUpdate = true;
//    };
//
//    /**
//     * SET THE SYMBOL VALUE FOR EACH SPITE IN REEL
//     * @param aSymbols: array of 3 symbols
//     */
//    this.setSymbol = function (aSymbols) {
//        //_oContainer.removeAll();
//
//        //var iX = 0;
//        //var iY = 0;
//        var i = aSymbols.length; while (i--) {
//            _aSymbols[i].frameName = 'symbol_' + aSymbols[i];
//
//            //oSymbolData.scale.setTo(2,2);
//            //_aSymbols[i] = oSymbolData;
//
//            _aSymbolValues[i] = aSymbols[i];
//
//            //iY += settings.SYMBOL_HEIGHT + settings.SPACE_HEIGHT_BETWEEN_SYMBOLS;
//        }
//        //for (var i = 0; i < ; i++) {}
//    };
//
//    /**
//     * CALLED WHEN PLAYER CLICK STOP BUTTON DURING SPIN
//     * @param aSymbols: array of 3 final symbols
//     * @param iYPos: y Position
//     */
//    this.forceStop = function (aSymbols, iYPos) {
//        if (aSymbols !== null) {
//            this.setSymbol(aSymbols);
//        }
//        _oContainer.y = iYPos;
//        _bUpdate = false;
//        _iCntFrames = 0;
//        _iMaxFrames = settings.MAX_FRAMES_REEL_EASE;
//        _iCurState = settings.REEL_STATE_START;
//        _iContDelay = 0;
//        _bReadyToStop = false;
//        _bContainsFinalSymbols = false;
//    };
//
//    /**
//     * HIGHLIGHT SYMBOL WHEN IS INVOLVED IN WINNING COMBO
//     * @param iIndex: index of symbol involved
//     */
//    this.highlightSymbol = function (iIndex) {
//        //return;
//        if (_aSymbolValues[iIndex] === settings.WILD_EXPANDED) {
//            return;
//        }
//        _oSymbolHighlight.frameName =  'symbol_' + _aSymbolValues[iIndex];
//        _oSymbolHighlight.x = _oContainer.x + _aSymbols[iIndex].x;
//        _oSymbolHighlight.y = _oContainer.y + _aSymbols[iIndex].y;
//        _oSymbolHighlight.visible = true;
//        //_oAttachWinFrames.addChild(_oSymbolHighlight);
//
//        _oWinFrame.x = _oContainer.x + _aSymbols[iIndex].x;
//        _oWinFrame.y = _oContainer.y + _aSymbols[iIndex].y;
//        _oWinFrame.visible = true;
//
//        if (_aSymbolValues[iIndex] === settings.SCATTER_SYMBOL) {
//            _oWinFrame.visible = false;
//            _oSymbolHighlight.visible = false;
//        }else{
//            this.hideSymbol(iIndex);
//        }
//
//    };
//
//    /**
//     * SHOW SYMBOL SPRITE ON ROW
//     * @param iRow: row need to show
//     */
//    this.showSymbol = function (iRow) {
//        _aSymbols[iRow].visible = true;
//        if (_oWinFrame.visible) {
//            //_oAttachWinFrames.removeChild(_oWinFrame);
//            _oWinFrame.visible = false;
//            //_oAttachWinFrames.removeChild(_oSymbolHighlight);
//            _oSymbolHighlight.visible = false;
//        }
//
//    };
//
//    /**
//     * HIDE SYMBOLS SPRITE ON ROW
//     * @param iRow: row need to hide
//     */
//    this.hideSymbol = function (iRow) {
//        _aSymbols[iRow].visible = false;
//    };
//
//    /**
//     * RESET Y POSITION OF THE REEL
//     * @param aSymbols: array of 3 symbols
//     * @param bReadyToStop: boolen - check if it's ready to Stop movement
//     */
//    this.restart = function (aSymbols, bReadyToStop) {
//        _oContainer.y = _iCurStartY = settings.REEL_START_Y;
//
//        _iFinalY = _iCurStartY + settings.HEIGHT_REEL;
//        this.setSymbol(aSymbols);
//
//        _bReadyToStop = bReadyToStop;
//        if (_bReadyToStop) {
//            _iCntFrames = 0;
//            _iMaxFrames = settings.MAX_FRAMES_REEL_EASE;
//            _iCurState = settings.REEL_STATE_STOP;
//
//            _bContainsFinalSymbols = true;
//
//            arrayPositionStop = my.gameSlotData.arrayPositionReelStop.easeOutBack.reel1;
//
//        }else{
//            _bContainsFinalSymbols = false;
//
//            arrayPositionStop = my.gameSlotData.arrayPositionReelStop.easeOutBack.reel2;
//        }
//    };
//
//    /**
//     * SET FLAG STOP TO TRUE
//     */
//    this.setReadyToStop = function () {
//        _iCntFrames = 0;
//        _iFinalY = settings.REEL_ARRIVAL_Y;
//        _iMaxFrames = settings.MAX_FRAMES_REEL_EASE;
//        _iCurState = settings.REEL_STATE_STOP;
//    };
//    /**
//     * Check if reel is ready to stop
//     * @returns {*} true if it's ready
//     */
//    this.isReadyToStop = function () {
//        return _bReadyToStop;
//    };
//    /**
//     * Get symbol value on specific row
//     * @param iRow: row contains symbol need to get value
//     * @returns {*}
//     */
//    this.getValue = function (iRow) {
//        return _aSymbolValues[iRow];
//    };
//    /**
//     * Get y Position of reel
//     * @returns {number|*} y Position
//     */
//    this.getY = function () {
//        return _oContainer.y;
//    };
//    /**
//     * Deprecated
//     * @returns {boolean}
//     */
//    this.isCurrentlyVisible = function () {
//        return (_oContainer.y >= _iFinalY) ? false : true;
//    };
//    /**
//     * Deprecated
//     * @param iRow
//     * @returns {{x: *, y: *}}
//     */
//    this.getPosBottomCenter = function (iRow) {
//        var iX = _oContainer.x + (settings.SYMBOL_WIDTH / 2);
//        var iY = _iStartY + (settings.SYMBOL_HEIGHT * (iRow + 1));
//        return {x: iX, y: iY};
//    };
//    /**
//     * Deprecated
//     * @param iRow
//     * @returns {{x: *, y: *}}
//     */
//    this.getPosBottomLeft = function (iRow) {
//        var iX = _oContainer.x;
//        var iY = _iStartY + (settings.SYMBOL_HEIGHT * (iRow + 1));
//        return {x: iX, y: iY};
//    };
//    /**
//     * Get Position of Reel in Up Left Conner on Specific row
//     * @param iRow: specific row
//     * @returns {{x: *, y: *}} Position
//     */
//    this.getPosUpLeft = function (iRow) {
//        var iX = _oContainer.x;
//        var iY = _iStartY + (settings.SYMBOL_HEIGHT * iRow) + (settings.SPACE_HEIGHT_BETWEEN_SYMBOLS * iRow);
//        return {x: iX, y: iY};
//    };
//    /**
//     * Deprecated
//     * @param iRow
//     * @returns {{x: *, y: *}}
//     */
//    this.getPosUpCenter = function (iRow) {
//        var iX = _oContainer.x + (settings.SYMBOL_WIDTH / 2);
//        var iY = _iStartY + (settings.SYMBOL_HEIGHT * iRow);
//        return {x: iX, y: iY};
//    };
//    /**
//     * Deprecated
//     * @param iRow
//     * @returns {{x: *, y: *}}
//     */
//    this.getPosCenterLeft = function (iRow) {
//        var iX = _oContainer.x;
//        var iY = _iStartY + (settings.SYMBOL_HEIGHT * iRow) + (settings.SYMBOL_HEIGHT / 2);
//        return {x: iX, y: iY};
//    };
//    /**
//     * Deprecated
//     * @param iRow
//     * @returns {{x: *, y: *}}
//     */
//    this.getPosCenter = function (iRow) {
//        var iX = _oContainer.x + (settings.SYMBOL_WIDTH / 2);
//        var iY = _iStartY + (settings.SYMBOL_HEIGHT * iRow) + (settings.SYMBOL_HEIGHT / 2);
//        return {x: iX, y: iY};
//    };
//
//    /**
//     * UPDATE FUNCTION WHEN REEL STARTS
//     * @private
//     */
//    this._updateStart = function () {
//        if (_iCntFrames > _iMaxFrames*3 - 1) {
//            _iCntFrames = 0;
//            _iCurState++;
//
//            _oContainer.y = arrayPositionStart[25];
//            return;
//        }
//        _oContainer.y = arrayPositionStart[_iCntFrames];
//        _iCntFrames++;
//    };
//
//    /**
//     * UPDATE FUNCTION WHEN REEL IS MOVING
//     * @private
//     */
//    this._updateMoving = function () {
//        _oContainer.y += my.gameSlotData.movingReelSpeed;
//    };
//
//    /**
//     * UPDATE FUNCTION WHEN REEL IS STOPPING
//     * @private
//     */
//    this._updateStopping = function () {
//        if (_iCntFrames >= _iMaxFrames*2 - 1) {
//            _bUpdate = false;
//            _iCntFrames = 0;
//            _iMaxFrames = settings.MAX_FRAMES_REEL_EASE;
//            _iCurState = settings.REEL_STATE_START;
//            _iContDelay = 0;
//            _bReadyToStop = false;
//            if (_bContainsFinalSymbols)
//            {
//                _bContainsFinalSymbols = false;
//
//                _oContainer.y = settings.REEL_OFFSET_Y;
//
//                _bContainsFinalSymbols = false;
//            }
//            else
//            {
//                _bContainsFinalSymbols = true;
//
//                _oContainer.y = settings.REEL_ARRIVAL_Y;
//            }
//            my.currentGameSlot.s_oGame.stopNextReel();
//        } else {
//            _bReadyToStop = true;
//
//            _oContainer.y = arrayPositionStop[_iCntFrames];
//        }
//        _iCntFrames++;
//    };
//    /**
//     * UPDATE FUNCTION
//     */
//    this.update = function () {
//
//        if(Lobby.Utils.isOldSchoolDevice()) {
//            if (currentDelayUpdateValue < maxDelayUpdateValue) {
//                currentDelayUpdateValue++;
//                return;
//            }
//            currentDelayUpdateValue = 0;
//        }
//        if (_bUpdate === false) {
//            return;
//        }
//
//        _iContDelay++;
//
//        if (_iContDelay > _iDelay) {
//
//            if (_bReadyToStop === false && (_oContainer.y > settings.REEL_ARRIVAL_Y)) {
//                my.currentGameSlot.s_oGame.reelArrived(_iIndex, _iCol);
//            }
//
//            switch (_iCurState) {
//                case settings.REEL_STATE_START:
//                {
//                    this._updateStart();
//                    break;
//                }
//                case settings.REEL_STATE_MOVING:
//                {
//                    this._updateMoving();
//                    break;
//                }
//                case settings.REEL_STATE_STOP:
//                {
//                    this._updateStopping();
//                    break;
//                }
//            }
//        }
//    };
//
//    this._init(iIndex, iXPos, iYPos, iDelay, aSymbols, oAttachSymbols, oAttachWinFrames);

};
