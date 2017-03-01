/**
 * Created by Duy on 7/27/2016.
 */
/**
 * CLASS CREATE AND CONTROL AN ANIMATION FROM ATLAS (DEPRECATED)
 * @param my : Phaser Game Object
 * @param parent: Group Parent
 * @param name: name of the animation
 * @param resourceNameAtlas: name of the resources atlas
 * @param resourceNamePrefix: prefix frame name
 * @param resourceStartIndex: start Index
 * @param resourceEndIndex: end Index
 * @param extension: extension for name of frame (ex: ".png" , ".jpg")
 * @param serialNumberLength: number of Digit for serial number (ex: 2 for "01", 3 for "001", ...)
 * @param callbackDown: callback when user touch down
 * @param callbackUp: callback when user touch up
 * @constructor
 */
function AtlasAnimation(my,
                        parent,
                        name,
                        resourceNameAtlas,
                        resourceNamePrefix,
                        resourceStartIndex,
                        resourceEndIndex,
                        extension,
                        serialNumberLength,
                        callbackDown,
                        callbackUp){

    var _oContainer;
    var sprite;
    var animation;

    var currentAnimation;
    /**
     * Initialize
     * @private
     */
    this._init = function(){
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

        var index = resourceStartIndex;

        var iFast = serialNumberLength-1; while (iFast--) {
            index = "0" + index;}
        //for(var i = 1; i < serialNumberLength; i++){
        //    index = "0" + index;
        //}

        sprite = my.add.sprite(0,0, resourceNameAtlas, resourceNamePrefix + index + extension);
        sprite.body = null;

        if(_bParentIsGroup){
            _oContainer.add(sprite);
        }else{
            _oContainer.addChild(sprite);
        }

        if(Lobby.Utils.objectNotNull(callbackDown)){
            sprite.inputEnabled = true;
            sprite.events.onInputDown.add(callbackDown, my);
        }
        if(Lobby.Utils.objectNotNull(callbackUp)){
            sprite.inputEnabled = true;
            sprite.events.onInputUp.add(callbackUp, my);
        }

        sprite.anchor.setTo(0.5);

        animation = sprite.animations.add(name, Phaser.Animation.generateFrameNames(resourceNamePrefix, resourceStartIndex, resourceEndIndex, extension, serialNumberLength));
        //sprite.smoothed = false;

        _oContainer.visible = false;
    };

    /**
     * Add another animation
     * @param name: name of Animation
     * @param resourceNamePrefix: prefix frame name
     * @param resourceStartIndex: start index
     * @param resourceEndIndex: end index
     * @param extension: extension for name of frame (ex: ".png" , ".jpg")
     * @param serialNumberLength: number of Digit for serial number (ex: 2 for "01", 3 for "001", ...)
     */
    this.addAnimation = function(name, resourceNamePrefix, resourceStartIndex, resourceEndIndex, extension, serialNumberLength){
        sprite.animations.add(name, Phaser.Animation.generateFrameNames(resourceNamePrefix, resourceStartIndex, resourceEndIndex, extension, serialNumberLength));
    };
    /**
     * Play specific animation
     * @param name: name of Animation
     * @param fps: FPS
     * @param isLoop: boolen - true if animation need to loop
     * @param onStart: event when start animation
     * @param onLoop: event after finish a loop (for loop animation)
     * @param onComplete: event when completed animation
     */
    this.playSpecificAnimation = function(name, fps, isLoop, onStart, onLoop, onComplete){
        //sprite.animations.destroy();
        this.reset();
        currentAnimation = sprite.animations.getAnimation(name);
        if(Lobby.Utils.objectNotNull(currentAnimation)) {
            _oContainer.visible = true;
            if (Lobby.Utils.objectNotNull(onStart)) {
                currentAnimation.onStart.addOnce(onStart);
            }
            if (Lobby.Utils.objectNotNull(onLoop)) {
                currentAnimation.onLoop.add(onLoop);
            }
            if (Lobby.Utils.objectNotNull(onComplete)) {
                currentAnimation.onComplete.addOnce(onComplete);
            }
            currentAnimation.play(fps, isLoop);
        }
    };
    /**
     * Get current animation that is playing from multi animation atlas
     * @returns {*} object animation
     */
    this.getCurrentAnimation = function(){
        return currentAnimation;
    };
    /**
     * reset all animation
     */
    this.reset = function(){
        animation.onStart.removeAll();
        animation.onLoop.removeAll();
        animation.onComplete.removeAll();
    };
    /**
     * Play animation (use this when this only contain ont animation)
     * @param fps: FPS
     * @param isLoop: boolen - true if animation need to loop
     * @param onStart: event when start animation
     * @param onLoop: event after finish a loop (for loop animation)
     * @param onComplete: event when completed animation
     */
    this.play = function(fps, isLoop, onStart, onLoop, onComplete){
        this.reset();
        _oContainer.visible = true;
        if(Lobby.Utils.objectNotNull(onStart)){
            animation.onStart.addOnce(onStart);
        }
        if(Lobby.Utils.objectNotNull(onLoop)){
            animation.onLoop.add(onLoop);
        }
        if(Lobby.Utils.objectNotNull(onComplete)){
            animation.onComplete.addOnce(onComplete);
        }

        animation.play(fps, isLoop);
    };
    /**
     * Get group that contain this
     * @returns {*} group object
     */
    this.getContainer = function(){
        return _oContainer;
    };
    /**
     * Stop current Animation
     */
    this.stop = function(){
        if(Lobby.Utils.objectNotNull(animation)) {
            animation.stop();
        }
        if(Lobby.Utils.objectNotNull(currentAnimation)) {
            currentAnimation.stop();
        }
    };

    this.destroyAnimation = function(){

    };
    /**
     * Set visible
     * @param isVisible: true if it's visible
     */
    this.setVisible = function(isVisible){
        _oContainer.visible = isVisible;
    };
    /**
     * Disable input Touch
     */
    this.disabled = function(){
        sprite.inputEnabled = false;
    };
    /**
     * Enable input Touch
     */
    this.enabled = function(){
        sprite.inputEnabled = true;
    };
    /**
     * Set position
     * @param x: x position
     * @param y: y position
     */
    this.setPosition = function(x,y){
        _oContainer.position = {x:x,y:y};
    };
    /**
     * Scale function
     * @param x: scale X
     * @param y: scale Y
     */
    this.scale = function(x, y){
        _oContainer.scale.setTo(x,y);
    };
    /**
     * Set anchor
     * @param x: x anchor
     * @param y: y anchor
     */
    this.setAnchor = function(x, y){
        sprite.anchor.setTo(x,y);
    };
    /**
     * Destroy function
     */
    this.destroy = function(){
        this.stop();
        _oContainer.destroy();
    };

    this._init();
}
