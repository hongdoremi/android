/**
 * Created by Duy on 7/8/2016.
 */
/**
 * CLASS MANAGES ALL NEZHA MODEL'S ANIMATION
 * @param my: Phaser Group Object
 * @param parent: Group parent
 * @constructor
 */
function CAvatarNezha(my, parent){

    var _oContainer;
    var animIdle;
    //var animWin1;
    //var animWin2;
    var animFreeSpin;
    var posIdle = {x: 150 ,y:Lobby.Utils.floatToIntOptimize(settings.CANVAS_HEIGHT/2) + 100};

    var that = this;
    var currentAnim = null;
    /**
     * Initialize all animation for nezha model
     * @private
     */
    this._init = function(){
        _oContainer = my.add.group();
        parent.add(_oContainer);

        //animIdle = new AtlasAnimation(my,
        //    _oContainer,
        //    'nezha_idle',
        //    'nezha_idle',
        //    'Ui_Nezha_idle_',
        //    0,
        //    13,
        //    '',
        //    2
        //);
        var scaleNezha = 1.4/ManagerForScale.getScale();
        animIdle = new SpriteAnimation(my,
            _oContainer,
            {x:0+ManagerForScale.offsetOutOfBounce_1920/2,y:0},
            {x:1,y:1},
            'nezha_idle_',
            0,
            13,
            true);

        //if(!ManagerForScale.is3x4resolution()) {
            animIdle.scale({x: scaleNezha, y: scaleNezha});
        //}

        //animFreeSpin = new AtlasAnimation(my,
        //    _oContainer,
        //    'nezha_freespin',
        //    'nezha_freespin',
        //    'Freespin-Nezha_',
        //    0,
        //    17,
        //    '',
        //    2
        //);
        animFreeSpin = new SpriteAnimation(my,
            _oContainer,
            {x:0+ManagerForScale.offsetOutOfBounce_1920/2,y:0},
            {x:1,y:1},
            'nezha_freespin_',
            0,
            17,
            true);


        animFreeSpin.scale({x: scaleNezha, y: scaleNezha});


    };
    /**
     * Play Idle animation
     */
    this.playIdle = function(){
        if(LobbyConfig.isTestAlgorithmMode){
            return;
        }
        var animationSpeed = 20;
        if(Lobby.Utils.isOldSchoolDevice()){
            animationSpeed = 10;
        }

        animFreeSpin.stop();
        _oContainer.x = posIdle.x;
        _oContainer.y = posIdle.y;
        animIdle.playWithoutTimer();
    };
    /**
     * Play Win animation 1 - deprecated
     */
    this.playAnim1 = function(){
        //    animWin1.play(20, function(){
        //        that.playIdle();
        //    }, null, function() {
        //        _oContainer.x = posIdle.x + 130;
        //        _oContainer.y = posIdle.y - 120;
        //        that.setCurrentAnim(animWin1);
        //    });
    };
    /**
     * Play Win animation 2 - deprecated
     */
    this.playAnim2 = function(){
        //    animWin2.play(20, function(){
        //        that.playIdle();
        //    }, null, function() {
        //        _oContainer.x = posIdle.x + 180;
        //        _oContainer.y = posIdle.y + 10;
        //        that.setCurrentAnim(animWin2)
        //    });
        //
    };
    /**
     * Play FreeSpin animation
     */
    this.playFreespin = function(){
        if(LobbyConfig.isTestAlgorithmMode){
            return;
        }
        var animationSpeed = 20;
        if(Lobby.Utils.isOldSchoolDevice()){
            animationSpeed = 10;
        }

        _oContainer.x = posIdle.x + 180;
        _oContainer.y = posIdle.y - 80;

        animIdle.stop();
        animFreeSpin.playWithoutTimer();
    };
    /**
     * Play random win animation - deprecated
     */
    this.playRandomWinAnim = function(){
        //var index = randomFloatBetween(0,0.4);
        //if(index <= 0.4){
        //    if(index <= 0.2){
        //        this.playAnim1();
        //    }else{
        //        this.playAnim2();
        //    }
        //}
    };
    /**
     * Set current animation - deprecated
     */
    this.setCurrentAnim = function(anim){
        if(Lobby.Utils.objectNotNull(currentAnim)){
            currentAnim.stop();
            //currentAnim.visible = false;
            currentAnim.setVisible(false);
        }
        currentAnim = anim;
        //currentAnim.visible = true;
    };
    /**
     * Update animation frame function
     */
    this.update = function(){
        if(LobbyConfig.isTestAlgorithmMode){
            return;
        }
      if(Lobby.Utils.objectNotNull(animIdle)){
          animIdle.update();
      }
        if(Lobby.Utils.objectNotNull(animFreeSpin)){
            animFreeSpin.update();
        }
    };

    this.destroy = function(){
        if(animIdle){
            animIdle.stop();
            animIdle.destroy();
            animIdle = null;
        }
        if(animFreeSpin){
            animFreeSpin.stop();
            animFreeSpin.destroy();
            animFreeSpin = null;
        }
    };

    this._init();
}
