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
function CFreespinIndicatorBO(my, parentGroup, iX, iY) {

    var _oTextNumberFS;
    var _oTextNumberMulty;
    var _oContainer;

    /**
     * Init UI
     * @param iX: x Position for group
     * @param iY: y Position for group
     * @private
     */
    this._init = function (iX, iY) {
        _oContainer = my.add.group();
        _oContainer.visible = false;
        _oContainer.x = iX;
        _oContainer.y = iY;
        //if(Lobby.Utils.is3x4Device()){
        //    _oContainer.y -= 200;
        //}
        parentGroup.add(_oContainer);

        //var oBgFS = my.add.sprite(-150,100,'box-freespins-bonus', null, _oContainer);
        //oBgFS.y -= ManagerForScale.doubleIncrementHeight();
        var oTextFS = my.add.sprite(
            -100 + ManagerForScale.offsetOutOfBounce_1920/2,
            200 - ManagerForScale.offsetOutOfBounce_1080/2,'freespins-box', null, _oContainer);
        oTextFS.anchor.setTo(0.5);
        oTextFS.scale.setTo(1.2, 1.2);
        _oTextNumberFS = my.add.text(oTextFS.x, oTextFS.y + 25, "0", {
            //font: "50px dinbold",
            font: "40px AmericanCaptain",
            fill: "#FFFA00",
            fontWeight:'bold'
        }, _oContainer);
        _oTextNumberFS.anchor.setTo(0.5);



        //var oBgM = my.add.sprite(1254, 100,'box-freespins-bonus', null, _oContainer);
        //oBgM.y -= ManagerForScale.doubleIncrementHeight();
        var oTextM =
            my.add.sprite(
                1350 - ManagerForScale.offsetOutOfBounce_1920/2,
                oTextFS.y ,'multiplier-box', null, _oContainer);
        oTextM.anchor.setTo(0.5);
        oTextM.scale.setTo(1.2, 1.2);

        _oTextNumberMulty = my.add.text(oTextM.x, oTextM.y + 25, "0", {
            //font: "50px dinbold",
            font: "40px AmericanCaptain",
            fill: "#FFFA00",
            fontWeight: 'bold'
        }, _oContainer);
        _oTextNumberMulty.anchor.setTo(0.5);

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
            _oTextNumberMulty.text = szTextMulti;
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
