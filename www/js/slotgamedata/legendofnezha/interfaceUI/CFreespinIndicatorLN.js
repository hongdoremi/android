/**
 * Created by Duy on 7/8/2016.
 */
/**
 * THIS FNCTION CREATES A GRAPHICAL INIDICATOR FOR THE NUMBER OF FREESPINS
 * @param my: Phaser game Object
 * @param parentGroup: Group parent
 * @param groupOfAnimation: array contains all nezha animation
 * @constructor
 */
function CFreespinIndicatorLN(my, parentGroup, groupOfAnimation) {

    var _oTextNumberFS;
    var _oContainerText;

    var _oContainer;
    var dragonAnim = {};

    var dragonWildAnim = {};
    /**
     * Init UI
     * @private
     */
    this._init = function () {
        _oContainer = my.add.group();
        _oContainer.visible = false;
        //_oContainer.x = iX;
        //_oContainer.y = iY;
        parentGroup.add(_oContainer);

        _oContainerText = my.add.group();
        _oContainerText.visible = false;
        //_oContainer.x = iX;
        //_oContainer.y = iY;
        _oContainer.add(_oContainerText);

        var oBgFS =
            my.add.sprite(
                150*ManagerForScale.getScale(),
                settings.CANVAS_HEIGHT - 200 - ManagerForScale.offsetOutOfBounce_1080/2,'box-freespins-bonus', null, _oContainerText);
oBgFS.body = null;
        oBgFS.x += oBgFS.width*(ManagerForScale.getScale() + 0.5) * (ManagerForScale.getScale() - 1);
        //oBgFS.y *= ManagerForScale.getScale();

        var oTextFS = my.add.sprite(oBgFS.x - 54,oBgFS.y + 125,'freespins-en', null, _oContainerText);
        oTextFS.body = null;
        _oTextNumberFS = my.add.text(oBgFS.x + 85, oBgFS.y + 70, "0", {
            //font: "50px dinbold",
            font: "50px dinbold",
            fill: "#FFFFFF",
            fontWeight:'bold'
        }, _oContainerText);
        _oTextNumberFS.anchor.setTo(0.5);
        this.createGroupDragon();
        this._initDragonWild();

        my.scaleCenterGroup(_oContainer,null,_oContainer);
    };
    /**
     * Create Uptop Dragon UI
     */
    this.createGroupDragon = function(){
        dragonAnim.body1 =  my.add.sprite(650,520,'dragon_body1', null, _oContainer);
        dragonAnim.body1.anchor.setTo(0.5);
        dragonAnim.body2 =  my.add.sprite(1590,540,'dragon_body2', null, _oContainer);
        dragonAnim.body2.anchor.setTo(0.5);
        dragonAnim.head =  my.add.sprite(1524,250,'dragon_head', null, _oContainer);
        dragonAnim.head.anchor.setTo(0.5);
      dragonAnim.body1.body = null;
      dragonAnim.body2.body = null;
      dragonAnim.head.body = null;
    };
    /**
     * Create Wild Dragon
     * @private
     */
    this._initDragonWild = function(){
        dragonWildAnim = my.add.group();
        parentGroup.add(dragonWildAnim);
        my.scaleCenterGroup(dragonWildAnim,null,null);

        //dragonWildAnim.wildExpand = new AtlasAnimation(my,
        //    dragonWildAnim,
        //    'dragonwild_expand',
        //    'dragon_wild',
        //    'Dragon_ExpandingWild_action_HD_',
        //    0,
        //    13,
        //    '',
        //    2);
        //
        //dragonWildAnim.wild.addAnimation(
        //    'dragonwild_idle',
        //    'Dragon_ExpandingWild_idle_HD_',
        //    0,
        //    9,
        //    '',
        //    2);
//return;


      dragonWildAnim.wildExpand = new SpriteAnimation(
        my,
        dragonWildAnim,
        {x:0,y:0},
        {x:1,y:1},
        'freespin_wild_expanded_',
        0,
        13,
        false);
      //dragonWildAnim.wildExpand.need2LoadFirst = true;
      dragonWildAnim.wildExpand.scale({x:2.2,y:2.2});
      //dragonWildAnim.wildExpand.playWithoutTimer();

      groupOfAnimation.push(dragonWildAnim.wildExpand);


      dragonWildAnim.wildIdle = new SpriteAnimation(
        my,
        dragonWildAnim,
        {x:0,y:0},
        {x:1,y:1},
        'freespin_wild_idle_',
        0,
        10,
        true);
      //dragonWildAnim.wildIdle.need2LoadFirst = true;
      dragonWildAnim.wildIdle.scale({x:1.1,y:1.1});
      //dragonWildAnim.wildIdle.playWithoutTimer();
      groupOfAnimation.push(dragonWildAnim.wildIdle);


      dragonWildAnim.wildExpand.setPosition(-500,-500);
      dragonWildAnim.wildIdle.setPosition(-500,-500);
    };
    /**
     * Play Wild Dragon animation
     * @param colAnim: current Col that should show animation
     */
    this.playDragonWild = function(colAnim){
        if(LobbyConfig.isTestAlgorithmMode){
            return;
        }
      //return;
        dragonWildAnim.visible = true;
      //colAnim = 1;
        var posX = settings.REEL_OFFSET_X + (settings.SYMBOL_WIDTH + settings.SPACE_BETWEEN_SYMBOLS)*colAnim + settings.SYMBOL_WIDTH/2;
        var posY = settings.REEL_OFFSET_Y + settings.HEIGHT_REEL/2;

        //dragonWildAnim.x =
        //    posX*ManagerForScale.getScale()
        //    - (Lobby.Utils.is3x4Device()?(settings.SYMBOL_WIDTH + settings.SPACE_BETWEEN_SYMBOLS)*(1-ManagerForScale.getScale()):0);
        //my.adjustGroupPositionAfterScale
//alert(ManagerForScale.getScale());
//        if(Lobby.Utils.is3x4Device()){
//            var delta = ManagerForScale.getScale()*LobbyConfig.deviceWidth/18;
//            if(colAnim == 1) {
//                posX -= delta;
//            }else if(colAnim == 3){
//                posX += delta;
//            }
//        }
        dragonWildAnim.x = posX;
        dragonWildAnim.y = posY;


        dragonWildAnim.wildExpand.setPosition(1,-9);
        dragonWildAnim.wildIdle.setPosition(0,0);
      dragonWildAnim.wildExpand.scale({x:2.2,y:2.2});
        dragonWildAnim.wildIdle.scale({x:1.1,y:1.1});

      dragonWildAnim.wildIdle.stop();

        dragonWildAnim.wildExpand.playWithoutTimer(function(){
            dragonWildAnim.wildIdle.stop();
            dragonWildAnim.wildIdle.scale({x:1.1,y:1.1});
            dragonWildAnim.wildIdle.playWithoutTimer();
        });


    };
    /**
     * Hide Wild Dragon
     */
    this.hideDragonWild = function(){
      //return;
        if(!dragonWildAnim.visible){
            return;
        }
        dragonWildAnim.wildIdle.stop();
        dragonWildAnim.visible = false;
    };
    /**
     * Show all FreeSpin Indiactor UI
     */
    this.showIndicator = function(){
        _oContainer.visible = true;
    };
    /**
     * Show box, text Freespin UI and update text
     * @param szTextNumFS
     * @param szTextMulti
     */
    this.show =
        function (
            szTextNumFS,
            szTextMulti) {
            _oTextNumberFS.text = szTextNumFS;
            _oContainerText.visible = true;
        };
    /**
     * Hide Free spin Indicator
     */
    this.hide = function () {
        _oContainerText.visible = false;
        _oContainer.visible = false;
        //dragonAnim.body1.stop();
        //dragonAnim.body2.stop();
        //dragonAnim.head.stop();
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

    this.destroy = function(){
        if(dragonWildAnim){
            if(dragonWildAnim.wildExpand){
                dragonWildAnim.wildExpand.stop();
                dragonWildAnim.wildExpand.destroy();
                dragonWildAnim.wildExpand = null;
            }
            if(dragonWildAnim.wildIdle){
                dragonWildAnim.wildIdle.stop();
                dragonWildAnim.wildIdle.destroy();
                dragonWildAnim.wildIdle = null;
            }
        }
    };

    this._init();
}
