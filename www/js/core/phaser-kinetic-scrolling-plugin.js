/**
 * Phaser Kinetic Scrolling Plugin
 * @author       Juan Nicholls <jdnichollsc@hotmail.com>
 * @copyright    2015 Juan Nicholls - http://jdnichollsc.github.io/Phaser-Kinetic-Scrolling-Plugin/
 * @license      {@link http://opensource.org/licenses/MIT}
 * @version 1.0.3
 */

(function (Phaser) {
    'use strict';

    /**
     * Kinetic Scrolling is a Phaser plugin that allows vertical and horizontal scrolling with kinetic motion.
     * It works with the Phaser.Camera
     *
     * @class Phaser.Plugin.KineticScrolling
     * @constructor
     * @param {Object} game - The Game object is the instance of the game, where the magic happens.
     * @param {Any} parent  - The object that owns this plugin, usually Phaser.PluginManager.
     */
    Phaser.Plugin.KineticScrolling = function (game, parent) {
        Phaser.Plugin.call(this, game, parent);
        /**
         * Thanh them vao de biet page dang bi scroll
         * @type {boolean}
         */
        this.isMoving = false;
        this.isDisable = false;
        this.thisGame = 0;
        this.dragging = false;
        this.timestamp = 0;
        this.callbackID = -1;

        this.isRunOKBeginMove = false;
        this.targetX = 0;
        this.targetY = 0;

        this.autoScrollX = false;
        this.autoScrollY = false;

        this.startX = 0;
        this.startY = 0;

        this.velocityX = 0;
        this.velocityY = 0;
        this.maxVelocity = 1500;
        this.maximumDelta = 70;

        this.amplitudeX = 0;
        this.amplitudeY = 0;

        //dat for control table view
        this.cellHeight =0;
        this.minYPosition = 0;
        this.tableHeight = 0;
        this.callback4ReuseCell = null;

        this.limit = {
            maxY : 0,
            minY : 0,
            maxX : 0,
            minX : 0
        };

        this.BoxScroll = {
            minX : 0,
            maxX : 0,
            minY : 0,
            maxY : 0
        };

        this.directionWheel = 0;

        this.velocityWheelX = 0;
        this.velocityWheelY = 0;

        this.settings = {
            kineticMovement: true,
            timeConstantScroll: 325, //really mimic iOS
            horizontalScroll: true,
            verticalScroll: false,
            horizontalWheel: true,
            verticalWheel: false,
            deltaWheel: 40
        };

        this.dataPageView = {
            isPageView : false,
            numberOfPageView : 0,
            lengthEachPageView : 0
        };

        this.currentGroupScroll =
        {x : 0,
            y : 0};

        this.callbackWhenAtPercentY = {
            y : 0,
            callBack : 0
        };
        this.stopScrolling = function(){
            //if(Lobby.Utils.objectNotNull(this.currentGroupScroll.children) &&
            //  Lobby.Utils.objectNotNull(this.callback4StopScrolling)){
            //  this.callback4StopScrolling(this.currentGroupScroll.children);
            //}
        };
        this.setVisible = function(){
            //return;

            if(this.isCheckingReuseGroupScroll == true){
                return;
            }
            this.isCheckingReuseGroupScroll=true;
            if(Lobby.Utils.objectIsNull(this.minYPosition)){
                this.minYPosition = this.currentGroupScroll.worldTransform.ty;
            }

            if(Lobby.Utils.objectNotNull(this.currentGroupScroll.children) &&
                Lobby.Utils.objectNotNull(this.callback4ReuseCell)){
                var isMoveCellDown = false;
                //
                //for (var i = 1; i < this.currentGroupScroll.children.length; i++) {
                //  var group = this.currentGroupScroll.children[i];
                //  group.visible = true;
                //}


                for (var i = 1; i < this.currentGroupScroll.children.length; i++) {

                    var group = this.currentGroupScroll.children[i];
                    if (group.worldTransform.ty < (this.minYPosition - this.cellHeight)) {
                        //group.children[0].visible = false;
                        var extraUp = 0;
                        if(this.currentGroupScroll.children[this.currentGroupScroll.children.length - 1].y == 0){
                            extraUp = 20;
                        }
                        //group.visible = false;
                        group.y = Math.floor(this.currentGroupScroll.children[this.currentGroupScroll.children.length - 1].y + this.cellHeight + extraUp);
                        group.cellId = this.currentGroupScroll.children[this.currentGroupScroll.children.length - 1].cellId + 1;
                        this.currentGroupScroll.remove(group);
                        this.currentGroupScroll.add(group);
                        this.callback4ReuseCell(group, true);
                        isMoveCellDown = true;

                        //group.visible = true;
                    } else {
                        break;
                    }
                }

                if(!isMoveCellDown) {
                    for (var i = this.currentGroupScroll.children.length - 1; i > 1; i--) {

                        var group = this.currentGroupScroll.children[i];
                        if (group.worldTransform.ty > (this.minYPosition + this.tableHeight) &&
                            this.currentGroupScroll.children[1].cellId != 0) {
                            //group.children[0].visible = false;
                            //group.visible = false;
                            group.y = Math.floor(this.currentGroupScroll.children[1].y - this.cellHeight);
                            group.cellId = this.currentGroupScroll.children[1].cellId - 1;
                            this.currentGroupScroll.remove(group);
                            this.currentGroupScroll.addChildAt(group, 1);
                            this.callback4ReuseCell(group, false);
                            //group.visible = true;
                        } else {
                            break;
                        }
                    }
                }

            }


            this.isCheckingReuseGroupScroll=false;


        };
    };

    Phaser.Plugin.KineticScrolling.prototype = Object.create(Phaser.Plugin.prototype);
    Phaser.Plugin.KineticScrolling.prototype.constructor = Phaser.Plugin.KineticScrolling;

    /**
     * Change Default Settings of the plugin
     *
     * @method Phaser.Plugin.KineticScrolling#configure
     * @param {Object}  [options] - Object that contain properties to change the behavior of the plugin.
     * @param {number}  [options.timeConstantScroll=325] - The rate of deceleration for the scrolling.
     * @param {boolean} [options.kineticMovement=true]   - Enable or Disable the kinematic motion.
     * @param {boolean} [options.horizontalScroll=true]  - Enable or Disable the horizontal scrolling.
     * @param {boolean} [options.verticalScroll=false]   - Enable or Disable the vertical scrolling.
     * @param {boolean} [options.horizontalWheel=true]   - Enable or Disable the horizontal scrolling with mouse wheel.
     * @param {boolean} [options.verticalWheel=false]    - Enable or Disable the vertical scrolling with mouse wheel.
     * @param {number}  [options.deltaWheel=40]          - Delta increment of the mouse wheel.
     */
    Phaser.Plugin.KineticScrolling.prototype.configure = function (options) {

        if (options) {
            for (var property in options) {
                if (this.settings.hasOwnProperty(property)) {
                    this.settings[property] = options[property];
                }
            }
        }

    };

    /**
     * Start the Plugin.
     *
     * @method Phaser.Plugin.KineticScrolling#start
     */
    Phaser.Plugin.KineticScrolling.prototype.start = function (groupScroll,
                                                               isHorizontalScroll,
                                                               isVerticalScroll,
                                                               maxX,
                                                               minX,
                                                               maxY,
                                                               minY,
                                                               my,

                                                               callBackWhenScrollThanPercentY,
                                                               cellHeight,
                                                               tableWorldPositionY,
                                                               tableHeight,
                                                               callback4ReuseCell //if null doen't use reusable cell
        , limitInputBox,
                                                               callback4StopScrolling) {


        this.isCheckingReuseGroupScroll = false;
        this.resetStatic();

        this.cellHeight = cellHeight;
        //this.minYPosition = 177.75;// * LobbyConfig.scaleRatioEntireGame;
        this.minYPosition = null;
        this.tableHeight = tableHeight * LobbyConfig.scaleRatioEntireGame;
        this.callback4ReuseCell = callback4ReuseCell;
        this.callback4StopScrolling = callback4StopScrolling;

        this.isDisable = false;
        this.settings.horizontalWheel =  this.settings.horizontalScroll = isHorizontalScroll;
        this.settings.verticalWheel =  this.settings.verticalScroll = isVerticalScroll;
        this.currentGroupScroll = groupScroll;
        this.limit.maxX = maxX;
        this.limit.maxY = maxY;// + ManagerForScale.incrementHeight();
        this.limit.minX = minX;
        this.limit.minY = minY;// +  ManagerForScale.incrementHeight();
        limitInputBox.minX *=  LobbyConfig.scaleRatioEntireGame;
        limitInputBox.maxX *=  LobbyConfig.scaleRatioEntireGame;
        limitInputBox.minY *=  LobbyConfig.scaleRatioEntireGame;
        limitInputBox.maxY *=  LobbyConfig.scaleRatioEntireGame;
        this.BoxScroll = limitInputBox;
        this.callbackWhenAtPercentY = {
            y : 0,
            callBack : 0
        };
        this.thisGame = my;
        this.callbackWhenAtPercentY = callBackWhenScrollThanPercentY;
        if(this.callbackID != -1)
            return;

        this.game.input.onDown.add(this.beginMove, this);

        this.callbackID = this.game.input.addMoveCallback(this.moveCamera, this);

        this.game.input.onUp.add(this.endMove, this);

        this.game.input.mouse.mouseWheelCallback = this.mouseWheel.bind(this);

    };

    Phaser.Plugin.KineticScrolling.prototype.resetStatic = function()
    {
        this.thisGame = 0;
        this.dragging = false;
        this.timestamp = 0;

        this.targetX = 0;
        this.targetY = 0;

        this.autoScrollX = false;
        this.autoScrollY = false;

        this.startX = 0;
        this.startY = 0;

        this.velocityX = 0;
        this.velocityY = 0;
        this.maxVelocity = 1000;

        this.amplitudeX = 0;
        this.amplitudeY = 0;

        this.directionWheel = 0;

        this.velocityWheelX = 0;
        this.velocityWheelY = 0;
    };

    /**
     * Event triggered when a pointer is pressed down, resets the value of variables.
     */
    Phaser.Plugin.KineticScrolling.prototype.beginMove = function () {

        //this.startX = this.game.input.x;
        //this.startY = this.game.input.y;
        //
        //this.dragging = true;
        //
        //this.timestamp = Date.now();
        //
        //this.velocityY = this.amplitudeY = this.velocityX = this.amplitudeX = 0;

        if(this.isDisable == true
            || this.currentGroupScroll.visible == false)
            return;

        if(
            this.BoxScroll != null
            &&this.BoxScroll.maxX != undefined
            && (this.BoxScroll.maxX < this.game.input.x
            || this.BoxScroll.minX > this.game.input.x
            || this.BoxScroll.maxY < this.game.input.y
            || this.BoxScroll.minY > this.game.input.y)
        )
        {
            return;
        }
        this.isMoving = true;
        this.startX = this.game.input.x;
        this.startY = this.game.input.y;

        this.isRunOKBeginMove = true;
        this.dragging = true;

        this.timestamp = Date.now();

        this.velocityY = this.amplitudeY = this.velocityX = this.amplitudeX = 0;

    };

    /**
     * Event triggered when the activePointer receives a DOM move event such as a mousemove or touchmove.
     * The camera moves according to the movement of the pointer, calculating the velocity.
     */
    Phaser.Plugin.KineticScrolling.prototype.moveCamera = function (pointer, x, y) {
//console.log(this.currentGroupScroll.y);
        if (!this.dragging) return;

        if(this.isDisable == true
            || this.currentGroupScroll.visible == false)
            return;

        if(
            this.BoxScroll != null
            &&this.BoxScroll.maxX != undefined
            && (this.BoxScroll.maxX < this.game.input.x
            || this.BoxScroll.minX > this.game.input.x
            || this.BoxScroll.maxY < this.game.input.y
            || this.BoxScroll.minY > this.game.input.y)
        )
        {
            return;
        }

        this.now = Date.now();
        var elapsed = this.now - this.timestamp;
        this.timestamp = this.now;


        //if(Lobby.Utils.isOldSchoolDevice()){
        //    this.maximumDelta = 70/4*LobbyConfig.scaleRatioEntireGame ;
        //    this.maxVelocity = 1000/4*LobbyConfig.scaleRatioEntireGame ;
        //}

        if (this.settings.horizontalScroll) {
            var delta = x - this.startX; //Compute move distance
            var deltaABS = Math.abs(delta);
            //if(deltaABS < 10){
            //    this.isDragged = false;
            //    return;
            //}
            //if(delta < -this.maximumDelta){
            //    delta = -this.maximumDelta;
            //}
            //if(delta > this.maximumDelta){
            //    delta = this.maximumDelta;
            //}
            this.startX = x;
            this.velocityX = 0.8 * (1000 * delta / (1 + elapsed)) + 0.2 * this.velocityX;
            //this.game.camera.x -= delta;
            //this.velocityX < 0 move left
            //this.velocityX > 0 move right
            //console.log(this.velocityX);

//dat fix loi scroll ra ngoai group table ngang start
            if(this.velocityX < 0){
                this.velocityX = Math.max(this.velocityX,-this.maxVelocity);
            }
            if(this.velocityX > 0){
                this.velocityX = Math.min(this.velocityX,this.maxVelocity);
            }

            if(this.checkIfAndForceScrollToPercentMaxX(1) &&
                this.velocityX < 0) {
            }else{
                this.currentGroupScroll.x += delta;
            }

            if(this.checkIfAndForceScrollToPercentMinX(0)){
                this.startX = this.currentGroupScroll.x;
                this.velocityX = 0;// this.startY;
            }

            if(this.checkIfAndForceScrollToPercentMaxX(1)){
                //isLimited = true;
                this.velocityX = 0;// this.startY;
            }
//dat fix loi scroll ra ngoai group table ngang end
        }

        if (this.settings.verticalScroll) {

//dat fix loi scroll ra ngoai group table dung start
            var delta = y - this.startY; //Compute move distance
            var deltaABS = Math.abs(delta);
            //if(deltaABS < 10){
            //    this.isDragged = false;
            //    this.setVisible();
            //    return;
            //}
            //if(delta < -this.maximumDelta){
            //    delta = -this.maximumDelta;
            //}
            //if(delta > this.maximumDelta){
            //    delta = this.maximumDelta;
            //}
            y = this.startY + delta;
            this.startY = y;
            this.velocityY = 0.8 * (1000 * delta / (1 + elapsed)) + 0.2 * this.velocityY;
            if(this.velocityY < 0){
                this.velocityY = Math.max(this.velocityY,-this.maxVelocity);
            }
            if(this.velocityY > 0){
                this.velocityY = Math.min(this.velocityY,this.maxVelocity);
            }
            //console.log(this.velocityY);

            //this.velocityY < 0 move up
            //this.velocityY > 0 move down
            //this.game.camera.y -= delta;
            if(this.checkIfAndForceScrollToPercentMaxY(1) &&
                this.velocityY < 0) {
            }else{
                this.currentGroupScroll.y += delta;
            }


            if(this.checkIfAndForceScrollToPercentMinY(0)){
                this.startY = this.currentGroupScroll.y;
                this.velocityY = 0;// this.startY;
            }

            if(this.checkIfAndForceScrollToPercentMaxY(1)){
                //isLimited = true;
                this.velocityY = 0;// this.startY;
            }


//dat fix loi scroll ra ngoai group table dung end

        }

        if(this.callbackWhenAtPercentY != undefined &&
            this.callbackWhenAtPercentY.y != 0){
            var isScrollToPercentY = this.isScrollToPercentMaxY(this.callbackWhenAtPercentY.y);
            if(isScrollToPercentY == true && this.callbackWhenAtPercentY.callBack != 0)
            {
                this.callbackWhenAtPercentY.callBack();
            }
        }

        this.setVisible();
    };

    /**
     * Event triggered when a pointer is released, calculates the automatic scrolling.
     */
    Phaser.Plugin.KineticScrolling.prototype.endMove = function () {

        //if(this.isDisable == true
        //    || this.currentGroupScroll.visible == false
        //    || this.isRunOKBeginMove == false)
        //    return;
           if(this.currentGroupScroll.visible == false
            || this.isRunOKBeginMove == false)
            return;
        this.isRunOKBeginMove = false;
        if(
            this.BoxScroll != null
            &&this.BoxScroll.maxX != undefined
            && (this.BoxScroll.maxX < this.game.input.x
            || this.BoxScroll.minX > this.game.input.x
            || this.BoxScroll.maxY < this.game.input.y
            || this.BoxScroll.minY > this.game.input.y)
        )
        {
            this.setVisible();
            return;
        }
        this.dragging = false;
        this.autoScrollX = false;
        this.autoScrollY = false;

        if (!this.settings.kineticMovement) return;

        this.now = Date.now();

        if (this.game.input.activePointer.withinGame && (this.velocityX > 10 || this.velocityX < -10)) {
            this.amplitudeX = - 0.8 * this.velocityX;
            //this.targetX = Math.round(this.game.camera.x - this.amplitudeX);
            this.targetX = Math.round( this.currentGroupScroll.x - this.amplitudeX);
            this.autoScrollX = true;
        }

        if (this.game.input.activePointer.withinGame && (this.velocityY > 10 || this.velocityY < -10)) {
            this.amplitudeY = - 0.8 * this.velocityY;
            //this.targetX = Math.round(this.game.camera.y - this.amplitudeY);
            this.targetY = Math.round(this.currentGroupScroll.y - this.amplitudeY);
            this.autoScrollY = true;
        }

        if (!this.game.input.activePointer.withinGame) {

            if (this.settings.horizontalScroll) {
                this.autoScrollX = true;
            }
            if (this.settings.verticalScroll) {
                this.autoScrollY = true;
            }
        }
    };

    /**
     * Event called after all the core subsystems and the State have updated, but before the render.
     * Create the deceleration effect.
     */
    Phaser.Plugin.KineticScrolling.prototype.checkValidYTablePosition = function(y){
      return (y <= 0 && y>=-this.limit.maxY);
    };
    Phaser.Plugin.KineticScrolling.prototype.update = function () {

        //if(this.isDisable == true
        //    || this.currentGroupScroll.visible == false)
        //    return;
        if(this.currentGroupScroll.visible == false)
            return;


        this.elapsed = Date.now() - this.timestamp;

        if (this.autoScrollX && this.amplitudeX != 0) {

            var delta = -this.amplitudeX * Math.exp(-this.elapsed / this.settings.timeConstantScroll);
            if (delta > 0.5 || delta < -0.5) {
                //this.game.camera.x = this.targetX - delta;
                this.currentGroupScroll.x = this.targetX - delta;
            }
            else {
                this.autoScrollX = false;
                //this.game.camera.x = this.targetX;
                this.currentGroupScroll.x = this.targetX;
                this.stopScrolling();
            }

            var anm;
            var moveto = 0;
            var isMove = false;
            if(this.currentGroupScroll.x > -this.limit.minX){
                moveto = -this.limit.minX;
                isMove = true;
            }else if (this.currentGroupScroll.x < -this.limit.maxX){
                moveto = -this.limit.maxX;
                isMove = true;
            }
            var anmTimeDuration = 200;
            var anmFunc = function (thatGame, that, moveto) {
                anm = thatGame.add.tween(that.currentGroupScroll);
                anm.to(
                    {x: moveto},
                    anmTimeDuration, Phaser.Easing.Linear.None
                );
                /**
                 * Thanh them vao de biet khi nao scroll xong
                 */
                anm.onComplete.add(function(){
                    that.isMoving = false;
                });
                anm.onUpdateCallback(function(){that.setVisible()});
                anm.start();
            };
            if(isMove)
            {
                anmFunc(this.thisGame, this , moveto);
                this.autoScrollX = false;
            }
        }

        if (this.autoScrollY && this.amplitudeY != 0) {
            this.setVisible();
            //console.log("this.amplitudeY: " + this.amplitudeY);
            //console.log("this.elapsed: " + this.elapsed);
            //console.log("this.settings.timeConstantScroll: " + this.settings.timeConstantScroll);
            var delta = -this.amplitudeY * Math.exp(-this.elapsed / this.settings.timeConstantScroll);
            //console.log("delta: " + delta);
            var newYPosition = this.targetY - delta;

            if (
              (delta > 0.5 || delta < -0.5)
            //  &&
            //    newYPosition <= 0 &&
            //newYPosition >= -this.limit.maxY
            ) {

                //this.game.camera.y = this.targetY - delta;
              if(this.checkValidYTablePosition(newYPosition)) {
                this.currentGroupScroll.y = newYPosition;
              }
            }
            else {
                this.autoScrollY = false;
                if(this.checkValidYTablePosition(this.targetY)) {
                  this.currentGroupScroll.y = this.targetY;
                }
                this.stopScrolling();
                //this.game.camera.y = this.targetY;
            }
            //
            var anm;
            var moveto = 0;
            var isMove = false;
            if(this.currentGroupScroll.y > -this.limit.minY){
                moveto = -this.limit.minY;
                isMove = true;
            }else if (this.currentGroupScroll.y < -this.limit.maxY){
                moveto = -this.limit.maxY;
                isMove = true;
            }
            var anmTimeDuration = 200;
            var anmFunc = function (thatGame, that, moveto) {

                if(!this.checkValidYTablePosition(moveto)) {
                  return;
                }
                anm = thatGame.add.tween(that.currentGroupScroll);
                anm.to(
                    {y: moveto},
                    anmTimeDuration, Phaser.Easing.Linear.None
                );
                /**
                 * Thanh them vao de biet khi nao scroll xong
                 */
                anm.onComplete.add(function(){
                    that.isMoving = false;
                });
                anm.onUpdateCallback(function(){
                    that.setVisible()});
                anm.start();
            };
            if(isMove)
            {
                anmFunc(this.thisGame, this , moveto);
                this.autoScrollY = false;
            }
        }

        if (this.settings.horizontalWheel && (this.velocityWheelX < -0.1 || this.velocityWheelX > 0.1 || !this.game.input.activePointer.withinGame)) {

            //this.game.camera.x -= this.velocityWheelX;
            this.currentGroupScroll.x -= this.velocityWheelX;
            this.velocityWheelX *= 0.95;
        }

        if (this.settings.verticalWheel && this.velocityWheelY!=0 && (this.velocityWheelY < -0.1 || this.velocityWheelY > 0.1 || !this.game.input.activePointer.withinGame)) {
            //this.game.camera.y -= this.velocityWheelY;
            this.setVisible();

            if(this.checkValidYTablePosition(this.currentGroupScroll.y - this.velocityWheelY)) {
              this.currentGroupScroll.y -= this.velocityWheelY;
            }
            this.velocityWheelY *= 0.95;
        }

    };



    /**
     * Event called when the mousewheel is used, affect the direction of scrolling.
     */
    Phaser.Plugin.KineticScrolling.prototype.mouseWheel = function (event) {
        if (!this.settings.horizontalWheel && !this.settings.verticalWheel) return;

        if(this.isDisable == true
            || this.currentGroupScroll.visible == false)
            return;
        event.preventDefault();

        var delta = this.game.input.mouse.wheelDelta * 120 / this.settings.deltaWheel;

        if (this.directionWheel != this.game.input.mouse.wheelDelta) {
            this.velocityWheelX = 0;
            this.velocityWheelY = 0;
            this.directionWheel = this.game.input.mouse.wheelDelta;
        }

        if (this.settings.horizontalWheel) {
            this.autoScrollX = false;

            this.velocityWheelX += delta;
        }

        if (this.settings.verticalWheel) {
            this.autoScrollY = false;

            this.velocityWheelY += delta;
        }

    };

    /**
     * Stop the Plugin.
     *
     * @method Phaser.Plugin.KineticScrolling#stop
     */
    Phaser.Plugin.KineticScrolling.prototype.stop = function () {
        if(Lobby.Utils.isFunction(this.beginMove)) {
            this.game.input.onDown.remove(this.beginMove, this);
        }

        if (this.callbackID) {
            this.game.input.deleteMoveCallback(this.callbackID);
            this.callbackID = -1;
        }
        else {
            this.game.input.deleteMoveCallback(this.moveCamera, this);
            this.callbackID = -1;
        }
        if(Lobby.Utils.isFunction(this.endMove)) {
            this.game.input.onUp.remove(this.endMove, this);
        }
        this.game.input.mouse.mouseWheelCallback = null;

    };

    Phaser.Plugin.KineticScrolling.prototype.isScrollToPercentMaxY = function (percent) {
        if(-this.currentGroupScroll.y >= percent * this.limit.maxY)
            return true;
        return false;
    };

    Phaser.Plugin.KineticScrolling.prototype.checkIfAndForceScrollToPercentMinX = function (percent) {
        if(this.currentGroupScroll.x >= 0) {
            this.currentGroupScroll.x = 0;
            return true;
        }
        return false;
    };

    Phaser.Plugin.KineticScrolling.prototype.checkIfAndForceScrollToPercentMaxX = function (percent) {
        if(-this.currentGroupScroll.x >= percent * this.limit.maxX) {
            this.currentGroupScroll.x = -percent * this.limit.maxX;
            return true;
        }
        return false;
    };

    Phaser.Plugin.KineticScrolling.prototype.checkIfAndForceScrollToPercentMinY = function (percent) {
        if(this.currentGroupScroll.y >= 0) {
            this.currentGroupScroll.y = 0;
            return true;
        }
        return false;
    };

    Phaser.Plugin.KineticScrolling.prototype.checkIfAndForceScrollToPercentMaxY = function (percent) {
        if(-this.currentGroupScroll.y >= percent * this.limit.maxY) {
            this.currentGroupScroll.y = -percent * this.limit.maxY;
            return true;
        }
        return false;
    };
    Phaser.Plugin.KineticScrolling.prototype.setCallBackWhenScrollToPercentY = function(percent, callback)
    {
        this.callbackWhenAtPercentY = {
            y : 0,
            callBack : 0
        };
        this.callbackWhenAtPercentY.y = percent;
        this.callbackWhenAtPercentY.callBack = callback;
    }

} (Phaser));
