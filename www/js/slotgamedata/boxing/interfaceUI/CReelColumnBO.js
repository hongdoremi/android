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
function CReelColumnBO(my, iIndex, iXPos, iYPos, iDelay, aSymbols, oAttachSymbols, oAttachWinFrames) {
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

        var _oWinFrame = my.add.sprite(0,0, 'static_symbol', 'frame_win',_oAttachWinFrames);
        _oWinFrame.anchor.setTo(0.5);
        _oWinFrame.scale.setTo(1.2,1.2);
        _oSymbolHighlight.visible = false;
        _oWinFrame.visible = false;

        return {_oSymbolHighlight: _oSymbolHighlight, _oWinFrame : _oWinFrame};
    });
    that.highlightSymbol = null;
    that.highlightSymbol = function (iIndex) {
        //return;
        if (that._aSymbolValues[iIndex] === settings.WILD_EXPANDED) {
            return;
        }
        that._oSymbolHighlight.frameName =  'symbol_' + that._aSymbolValues[iIndex];
        that._oSymbolHighlight.x = this._oContainer.x + that._aSymbols[iIndex].x;
        that._oSymbolHighlight.y = this._oContainer.y + that._aSymbols[iIndex].y;
        that. _oSymbolHighlight.visible = true;
        //_oAttachWinFrames.addChild(_oSymbolHighlight);

        that._oWinFrame.x = this._oContainer.x + that._aSymbols[iIndex].x + that._oWinFrame.width/2 - 20;
        that._oWinFrame.y = this._oContainer.y + that._aSymbols[iIndex].y + that._oWinFrame.height/2 - 20;
        that._oWinFrame.visible = true;

        //if (_aSymbolValues[iIndex] === settings.SCATTER_SYMBOL) {
        //    //_oWinFrame.visible = false;
        //    //_oSymbolHighlight.visible = false;
        //}else{
        this.hideSymbol(iIndex);
        //}

    };

    return that;
};
