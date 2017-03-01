/**
 * Created by Duy on 7/8/2016.
 */
/**
 * CLASS CREATE AND MANAGE SMALL JELLY FISH ANIMATION ON BACKGROUND
 * @param my: Phaser Game Object
 * @param parent: Group parent
 * @constructor
 */
function CSmallFishAnimation(my, parent){

    var _oContainer;
    var fish;
    var tween;
    var isChangedX;
    var yElement = 0;

    var unit = 3;
    var moveDirection = {x:1, y:1};
    //var shouldMove = false;

    /**
     * Initialize SPRITE, GROUP
     * @private
     */
    this._init = function(){
        if(LobbyConfig.isTestAlgorithmMode){
            return;
        }
        _oContainer = my.add.sprite();
        parent.add(_oContainer);



        fish = new SpriteAnimation(my,
            _oContainer,
            {x:0,y:0},
            {x:1,y:1},
            'jellyfish_small_',
            1,
            48,
            true
        );


        //my.physics.startSystem(Phaser.Physics.ARCADE);

        //my.physics.arcade.enable(_oContainer);
        //_oContainer.body.allowRotation = true;
        _oContainer.angle = Lobby.Utils.float2int(randomFloatBetween(0,1) * 360);
        _oContainer.x = randomFloatBetween(0.25,0.75) * settings.CANVAS_WIDTH;
        _oContainer.y = randomFloatBetween(0.5,0.75) * settings.CANVAS_HEIGHT;

        var currentTimer = null;
        fish.play(60,function(){
            Lobby.PhaserJS.clearTimer(currentTimer);
            unit = 2;
            currentTimer = my.time.events.add(300,function(){
                unit = 3;
            },this);
        });

        isChangedX = false;
        //yElement = 550;

        this.calculateDirectionFish();
    };
    /**
     * Update position and angle for FISH
     * @private
     */
    this._update = function(){
        if(LobbyConfig.isTestAlgorithmMode){
            return;
        }
        //if(!shouldMove){
        //    return;
        //}
        isChangedX = false;
        if(_oContainer.x <= -50){
            _oContainer.angle = Lobby.Utils.float2int(randomFloatBetween(0.3, 1.5) * 100);
            _oContainer.x += 25;
            isChangedX = true;
            this.calculateDirectionFish();
        }else if(_oContainer.x >= settings.CANVAS_WIDTH + 50){
            _oContainer.angle = -Lobby.Utils.float2int(randomFloatBetween(0.3, 1.5) * 100);
            _oContainer.x -= 25;
            isChangedX = true;
            this.calculateDirectionFish();
        }
        if(_oContainer.y <= -50 - yElement){
            _oContainer.angle = isChangedX?_oContainer.angle + 180: -Lobby.Utils.float2int(randomFloatBetween(1.2, 2.4) * 100);
            _oContainer.y += 25;
            this.calculateDirectionFish();
        }else if(_oContainer.y >= settings.CANVAS_HEIGHT + 50 + yElement){
            _oContainer.angle = isChangedX?_oContainer.angle + 180: Lobby.Utils.float2int(randomFloatBetween(-0.6, 0.6) * 100);
            _oContainer.y -= 25;
            this.calculateDirectionFish();
        }

        _oContainer.x += moveDirection.x*unit;
        _oContainer.y += moveDirection.y*unit;
        //my.physics.arcade.velocityFromAngle(_oContainer.angle - 90, 100, _oContainer.body.velocity);
    };
    /**
     * Calculate direction Path for Fish
     */
    this.calculateDirectionFish = function(){
        moveDirection.x = Math.cos(my.game.math.degToRad(_oContainer.angle-90));//*unit;
        moveDirection.y = Math.sin(my.game.math.degToRad(_oContainer.angle-90));//*unit;
        //console.log("moveDirection ", moveDirection.x,moveDirection.y);
    };
    /**
     * Stop animation and destroy
     */
    this.destroy = function(){
        fish.stop();
        fish.destroy();
        fish = null;
    };

    this._init();
}
