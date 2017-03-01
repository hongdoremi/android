/**
 * Created by Duy on 10/3/2016.
 */
/**
 * THIS CLASS MANAGES THE PAYLINES
 * @param my: Phaser Game Object
 * @param oAttachSymbols: Group contains lines
 * @param numberPayline: number of payline
 * @param aLinesTextureName: texture name of lines
 * @constructor
 */
function CLinesBase(my, oAttachSymbols, numberPayline, aLinesTextureName) {

    var _aLines;
    var _oContainer;
    /**
     * Init lines UI
     * @param oAttachSymbols: group contains lines
     * @private
     */
    this._init = function (oAttachSymbols) {
        //ATTACH ALL THE PAYLINES AND HIDE THEM
        _oContainer = my.add.group();
        oAttachSymbols.add(_oContainer);

        _aLines = [];
        var posLine =
            [
                {x:369,y:519},{x:369,y:299},{x:369,y:730},{x:369,y:312},{x:369,y:275},{x:369,y:291},
                {x:369,y:521},{x:369,y:530},{x:369,y:323},{x:369,y:319},{x:369,y:479},{x:369,y:292},
                {x:369,y:503},{x:369,y:283},{x:369,y:543},{x:369,y:312},{x:369,y:532},{x:369,y:305},
                {x:369,y:306},{x:369,y:287},{x:369,y:297},{x:369,y:313},{x:369,y:303},{x:369,y:335},
                {x:369,y:276},{x:369,y:280},{x:369,y:331},{x:369,y:315},{x:369,y:321},{x:369,y:339}
            ];
        var i = 1;
        if(!aLinesTextureName) {
            while (i <= numberPayline) {
                var oLine = my.add.sprite(0, 0, 'line_' + i, null, _oContainer);
                oLine.body = null;
                oLine.x = posLine[i - 1].x;
                oLine.y = posLine[i - 1].y;
                _aLines.push(oLine);
                i++;
            }
        }else{
            while (i <= numberPayline) {
                var oLine = my.add.sprite(0, 0, aLinesTextureName[i - 1], null, _oContainer);
                oLine.body = null;
                oLine.x = posLine[i - 1].x;
                oLine.y = posLine[i - 1].y;
                _aLines.push(oLine);
                i++;
            }
        }

        posLine = [];
        aLinesTextureName = [];

        this.reset();
    };

    /**
     * HIDE ALL PAYLINES
     */
    this.reset = function () {
        var i = _aLines.length; while (i--) {_aLines[i].visible = false;}
    };

    /**
     * SHOW THE CURRENT PAYLINE
     * @param iLine: line index need to show
     */
    this.showLine = function (iLine) {
        if (Lobby.Utils.objectNotNull(_aLines[iLine])) {
            _aLines[iLine].visible = true;
        }
    };

    /**
     * HIDE THE CURRENT PAYLINE
     * @param iLine: line index need to hide
     */
    this.hideLine = function (iLine) {
        if (Lobby.Utils.objectNotNull(_aLines[iLine])) {
            _aLines[iLine].visible = false;
        }
    };

    this._init(oAttachSymbols);
}