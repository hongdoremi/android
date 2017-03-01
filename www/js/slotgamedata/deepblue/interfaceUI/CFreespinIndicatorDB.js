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
function CFreespinIndicatorDB(my, parentGroup, iX, iY) {

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
        parentGroup.add(_oContainer);

        var oBgFS =
            my.add.sprite(
                -150 + ManagerForScale.offsetOutOfBounce_1920/2,
                100 - ManagerForScale.offsetOutOfBounce_1080/4,'box-freespins-bonus', null, _oContainer);
        //oBgFS.y -= ManagerForScale.doubleIncrementHeight();
        var oTextFS = my.add.sprite(oBgFS.x - 54,oBgFS.y + 94,'freespins-en', null, _oContainer);

        _oTextNumberFS = my.add.text(
            oBgFS.x + 68, oBgFS.y + 55, "0", {
            //font: "50px dinbold",
            font: "50px dinbold",
            fill: "#FFFFFF",
            fontWeight:'bold'
        }, _oContainer);
        _oTextNumberFS.anchor.setTo(0.5);



        var oBgM =
            my.add.sprite(
                1254 - ManagerForScale.offsetOutOfBounce_1920/2,
                100 - ManagerForScale.offsetOutOfBounce_1080/4 ,'box-freespins-bonus', null, _oContainer);
        //oBgM.y -= ManagerForScale.doubleIncrementHeight();
        var oTextM = my.add.sprite(oBgM.x - 60,oBgM.y + 94,'multiplier-en', null, _oContainer);

        _oTextNumberMulty = my.add.text(oBgM.x + 68, oBgM.y + 55, "0", {
            //font: "50px dinbold",
            font: "50px dinbold",
            fill: "#FFFFFF",
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
            if(LobbyConfig.isTestAlgorithmMode) return;
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
