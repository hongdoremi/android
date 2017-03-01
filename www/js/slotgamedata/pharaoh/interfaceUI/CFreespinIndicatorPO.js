/**
 * Created by Duy on 7/8/2016.
 */
/**
 * THIS FNCTION CREATES A GRAPHICAL INIDICATOR FOR THE NUMBER OF FREESPINS
 * @param my: Phaser game Object
 * @param parentGroup: Group parent
 * @param iX: x Pos
 * @param iY: y Pos
 * @constructor
 */
function CFreespinIndicatorPO(my, parentGroup, iX, iY) {

    var _oTextNumberFS;
    var _oContainer;

    this._init = function (iX, iY) {
        _oContainer = my.add.group();
        _oContainer.visible = false;
        _oContainer.x = iX;
        _oContainer.y = iY;
        parentGroup.add(_oContainer);

        var oBgFS = my.add.sprite(
            0 + ManagerForScale.offsetOutOfBounce_1920/2,
            0 - ManagerForScale.offsetOutOfBounce_1080/2 ,'box-freespins-bonus', null, _oContainer);
        oBgFS.anchor.setTo(0.5);
        //if(ManagerForScale.is3x4resolution()){
        //    oBgFS.x+=100;
        //    oBgFS.y+=100;
        //}
        var oTextFS = my.add.sprite(oBgFS.x,oBgFS.y + 94,'freespins-en', null, _oContainer);
        oTextFS.anchor.setTo(0.5);
        _oTextNumberFS = my.add.text(oBgFS.x, oBgFS.y, "0", {
            //font: "50px dinbold",
            font: "50px dinbold",
            fill: "#FFFFFF",
            fontWeight:'bold'
        }, _oContainer);
        _oTextNumberFS.anchor.setTo(0.5);

    };

    /**
     * Show Free Spin Indication UI
     * @param szTextNumFS: number Of Free Spin
     * @param szTextMulti: number of Multiplier
     */
    this.show =
        function (
            szTextNumFS,
            szTextMulti) {

            _oTextNumberFS.text = szTextNumFS;
            _oContainer.visible = true;
        };
    /**
     * Hide Free spin Indicator
     */
    this.hide = function () {
        _oContainer.visible = false;
    };
    /**
     * Set Position of Object
     * @param iNewX: x pos
     * @param iNewY: y pos
     */
    this.setPosition = function (iNewX, iNewY) {
        _oContainer.x = iNewX;
        _oContainer.y = iNewY;
    };

    this._init(iX, iY);
}
