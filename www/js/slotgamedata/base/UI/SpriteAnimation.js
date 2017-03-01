/**
 * Created by Phuoc Tran on 9/11/2015.
 */
/**
 * CLASS CREATE AND CONTROL AN ANIMATION FROM MULTIPLE IMAGES
 * @param my: Phaser Game Object
 * @param parent: Group Parent
 * @param pos: Position
 * @param scale: Scale Value
 * @param resourceNamePrefix: prefix name of all Images
 * @param resourceStartIndex: start index
 * @param resourceEndIndex: end index
 * @param isLoop: boolen - true if this animation need to loop
 * @param callbackDown: callback when user touch down
 * @param callbackUp: callback when user touch up
 * @param show: boolen - true if need to show the last frame when finish animation
 * @constructor
 */
function SpriteAnimation(my,
                         parent,
                         pos,
                         scale,
                         resourceNamePrefix,
                         resourceStartIndex,
                         resourceEndIndex,
                         isLoop,
                         callbackDown,
                         callbackUp,
                         show) {

    var _oContainer;
    var that = this;
    this._isLoop = false;
    this.visible = true;
    var anmInterval;
    this.x = 0;
    this.y = 0;
    var currentFrame = -1;

    var currentIndexDelay = 0;
    var maxTimesDelay = 3;
    var isPlaying = false;
    var callbackWhenFinish;

    var showLastFrameWhenFinish;
    var callBackInSpecificFrame = [];

    var btn;
    var totalFrames = 0;
    /**
     * Initialize
     */
    this.init = function () {

        var _bParentIsGroup = true;
        try {
            _oContainer = my.add.group();
            parent.add(_oContainer);
        }
        catch(e){
            _bParentIsGroup = false;
            _oContainer = my.add.sprite();
            parent.addChild(_oContainer);
        }
        for (var index = resourceStartIndex; index <= resourceEndIndex; ++index) {
            var sprite = my.add.sprite(0,0,resourceNamePrefix + index, null);
            sprite.anchor.setTo(0.5);
            sprite.body = null;
            sprite.inputEnabled = false;
            //sprite.visible = true;
            sprite.visible = false;
            if(_bParentIsGroup) {
                _oContainer.add(sprite);
            }else{
                _oContainer.addChild(sprite);
            }
        }
        totalFrames = _oContainer.children.length;
        if(Lobby.Utils.objectNotNull(callbackDown)) {
            btn = Lobby.PhaserJS.createRectangle(my,
                -_oContainer.children[0].width/2,
                -_oContainer.children[0].height/2,
                _oContainer.children[0].width,
                _oContainer.children[0].height,
                function () {
                    callbackDown();
                },
                _oContainer,
                //true,
                LobbyConfig.isDebug,
                function () {
                    if(Lobby.Utils.objectNotNull(callbackUp)) {
                        callbackUp();
                    }
                });
        }

        this._isLoop = isLoop;
        showLastFrameWhenFinish = show;
        this.x = Lobby.Utils.floatToIntOptimize(pos.x);
        this.y = Lobby.Utils.floatToIntOptimize(pos.y);
        _oContainer.position = pos;
        _oContainer.scale.setTo(scale.x,scale.y);
        _oContainer.visible = false;
    };
    /**
     * Hide function
     */
    this.hide = function(){

        var i = totalFrames; while (i--) {
            _oContainer.children[i].visible = false;}
        //for(var i = 0; i < totalFrames; i++){
        //    _oContainer.children[i].visible = false;
        //}
        _oContainer.visible = false;
    };
    /**
     * Set visible
     * @param visible: true if this is visible
     */
    this.setVisible = function(visible){
        _oContainer.visible = visible;
    };
    /**
     * Show First frame without play animation
     */
    this.showFirstFrame = function(){
        _oContainer.visible = true;
        _oContainer.children[0].visible = true;
    };
    /**
     * Set Position
     * @param x: x Pos
     * @param y: y Pos
     */
    this.setPosition = function(x,y){
        _oContainer.position = {x:Lobby.Utils.floatToIntOptimize(x),y:Lobby.Utils.floatToIntOptimize(y)};
    };
    /**
     * Get Group contain this
     * @returns {*} group object
     */
    this.getContainer = function(){
        return _oContainer;
    };
    /**
     * Play the animation in function Update of Phaser
     * @param callbackFinish: callbaack after finishing animation
     */
    this.playWithoutTimer = function (callbackFinish) {
        isPlaying = true;
      _oContainer.visible = true;
      _oContainer.children[0].visible = that.visible;
      currentFrame = 0;

      callbackWhenFinish = callbackFinish;
    };
    /**
     * Play animation without first frame - Deprecated
     * @param fps: FPS
     * @param callback: callback after finishing
     * @param callbackParams: callback parameters
     * @param funcCallInFirstTime: event when start aniamtion
     * @param funcCallInFirstTimeParams: event parameters
     */
    this.playWithoutFirstFrame = function (fps, callback, callbackParams, funcCallInFirstTime, funcCallInFirstTimeParams) {

        //isPlaying = true;
        //currentFrame = 0;
        //_oContainer.visible = true;
        //try {
        //    funcCallInFirstTime(funcCallInFirstTimeParams);
        //} catch (e) {
        //    if(LobbyConfig.isDebug) {
        //        console.log(e);
        //    }
        //}
        //anmInterval = window.setInterval(function () {
        //    that.update(callback,callbackParams, true);
        //}, 1000 / fps);
        //}, 100);
    };
    /**
     * Scale function
     * @param scale: scale value ({x,y})
     */
    this.scale = function(scale){
        _oContainer.scale.setTo(scale.x,scale.y);
    };
    /**
     * Destroy function
     */
    this.destroy = function(){
        if(Lobby.Utils.objectNotNull(anmInterval)){
            Lobby.PhaserJS.clearTimer(my, anmInterval);
        }
        _oContainer.destroy(true);
    };
    /**
     * Play animation with a new created time event
     * @param fps: FPS
     * @param callback: callback after finishing
     * @param callbackParams: callback parameters
     * @param funcCallInFirstTime: event when start aniamtion
     * @param funcCallInFirstTimeParams: event parameters
     */
    this.play = function (fps, callback, callbackParams, funcCallInFirstTime, funcCallInFirstTimeParams) {
        _oContainer.visible = true;
        isPlaying = true;

        if(Lobby.Utils.objectNotNull(funcCallInFirstTime)) {
            try {
                funcCallInFirstTime(funcCallInFirstTimeParams);
            } catch (e) {
                if (LobbyConfig.isDebug) {
                    console.log(e);
                }
            }
        }

        _oContainer.children[0].visible = that.visible;
        currentFrame = 0;

        anmInterval = my.time.events.loop(1000 / fps, function () {
            that.update(callback,callbackParams, true);
        });
        //anmInterval = window.setInterval(, );
        //}, 100);
    };
    /**
     * Enable input touch
     */
    this.enable = function(){
        btn.inputEnabled = true;
    };
    /**
     * Disable input touch
     */
    this.disable = function(){
        btn.inputEnabled = false;
    };
    /**
     * Stop the animation
     */
    this.stop = function(){
        if(Lobby.Utils.objectIsNull(_oContainer) || _oContainer.children.length == 0){
            return;
        }
        if(currentFrame >= 0) {
            if(!this._isLoop && Lobby.Utils.objectNotNull(showLastFrameWhenFinish)) {
                _oContainer.children[totalFrames - 1].visible = showLastFrameWhenFinish;
            }
            _oContainer.children[currentFrame].visible = false;
        }
        isPlaying = false;
        if(Lobby.Utils.objectNotNull(anmInterval)){
            //window.clearInterval(anmInterval);
            Lobby.PhaserJS.clearTimer(my, anmInterval);
        }

        if(Lobby.Utils.objectNotNull(callbackWhenFinish)){
          callbackWhenFinish();
        }
        currentFrame = -1;
    };
    /**
     * Add event when the animation is on a specific frame
     * @param frame: frame that trig the event
     * @param cb: event
     */
    this.setCallBackInSpecificFrame = function(frame, cb){
        callBackInSpecificFrame.push({frame : frame, callback : cb});
    };
    /**
     * Update frame function
     * @param callback: callback when complete
     * @param callbackParams: callback parameters
     * @param isInterval: boolen - true if this function call from created time event (not update)
     */
    this.update = function(callback,callbackParams, isInterval){

        if(isPlaying == false ||
            totalFrames == 0){
            return;
        }

        if(currentIndexDelay < maxTimesDelay && !isInterval){
            currentIndexDelay++;
            return;
        }
        currentIndexDelay = 0;

        if(Lobby.Utils.objectIsNull( _oContainer.children[currentFrame])){
            that.destroy();
            return;
        }

        if(currentFrame >= 0) {
            _oContainer.children[currentFrame].visible = false;
        }
        _oContainer.visible = that.visible;

        if(totalFrames == 0 ||
            Lobby.Utils.objectIsNull(currentFrame)){
            that.stop();
            that.destroy();
            return;
        }

        if(that.visible == false){
            return;
        }

        currentFrame++;


        if (currentFrame >= totalFrames) {

            currentFrame = 0;
            if (that._isLoop == false) {
                that.stop();
            }else{
                if(Lobby.Utils.objectNotNull(callbackWhenFinish)){
                    callbackWhenFinish();
                }
            }

            try {
                if (Lobby.Utils.objectNotNull(callback)) {
                    callback(callbackParams);
                }
            } catch (ex) {
                if(LobbyConfig.isDebug) {
                    console.log(ex);
                }
            }
        }

        if(currentFrame >= 0) {
          _oContainer.children[currentFrame].visible = true;
        }

        var i = callBackInSpecificFrame.length;
        if(i > 0) {
            while (i--) {
                if (Lobby.Utils.objectNotNull(callBackInSpecificFrame[i].frame) &&
                    Lobby.Utils.objectNotNull(callBackInSpecificFrame[i].callback) &&
                    callBackInSpecificFrame[i].frame == currentFrame) {
                    callBackInSpecificFrame[i].callback();
                }
            }
        }
        //if(callBackInSpecificFrame.length > 0){
        //    for(var i = 0; i < callBackInSpecificFrame.length; i++){
        //        if(Lobby.Utils.objectNotNull(callBackInSpecificFrame[i].frame) &&
        //            Lobby.Utils.objectNotNull(callBackInSpecificFrame[i].callback) &&
        //            callBackInSpecificFrame[i].frame == currentFrame){
        //            callBackInSpecificFrame[i].callback();
        //        }
        //    }
        //}

    }
;
    this.init();
}
