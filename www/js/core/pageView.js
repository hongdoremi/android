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
    * @class Phaser.Plugin.PageView
    * @constructor
    * @param {Object} game - The Game object is the instance of the game, where the magic happens.
    * @param {Any} parent  - The object that owns this plugin, usually Phaser.PluginManager.
    */
    Phaser.Plugin.PageView = function (game, parent) {
        Phaser.Plugin.call(this, game, parent);

        this.isSpecialConfig = false;
        this.isDisable = false;
        this.isMoving = false;
        this.dragging = false;
        this.timestamp = 0;
        this.callbackID = -1;

        this.targetX = 0;
        this.targetY = 0;

        this.autoScrollX = false;
        this.autoScrollY = false;

        this.startX = 0;
        this.startY = 0;

        this.velocityX = 0;
        this.velocityY = 0;
        this.isRunOKBeginMove = false;
        this.amplitudeX = 0;
        this.amplitudeY = 0;

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
            currentPage : 0,
            arrayPosPage : []
        };
        this.BoxScroll = {
            minX : 0,
            minY : 0,
            maxX : 0,
            maxY : 0
        };
        this.maximumDelta = 100;

        this.thisGame = 0;
        this.currentGroupScroll =
        {x : 0,
            y : 0,
        isnull:0};
        this.callBackAfterSwitchTab = 0;
    };

    Phaser.Plugin.PageView.prototype = Object.create(Phaser.Plugin.prototype);
    Phaser.Plugin.PageView.prototype.constructor = Phaser.Plugin.PageView;

    /**
    * Change Default Settings of the plugin
    *
    * @method Phaser.Plugin.PageView#configure
    * @param {Object}  [options] - Object that contain properties to change the behavior of the plugin.
    * @param {number}  [options.timeConstantScroll=325] - The rate of deceleration for the scrolling.
    * @param {boolean} [options.kineticMovement=true]   - Enable or Disable the kinematic motion.
    * @param {boolean} [options.horizontalScroll=true]  - Enable or Disable the horizontal scrolling.
    * @param {boolean} [options.verticalScroll=false]   - Enable or Disable the vertical scrolling.
    * @param {boolean} [options.horizontalWheel=true]   - Enable or Disable the horizontal scrolling with mouse wheel.
    * @param {boolean} [options.verticalWheel=false]    - Enable or Disable the vertical scrolling with mouse wheel.
    * @param {number}  [options.deltaWheel=40]          - Delta increment of the mouse wheel.
    */
    Phaser.Plugin.PageView.prototype.configure = function (options) {

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
    * @method Phaser.Plugin.PageView#start
    */

    Phaser.Plugin.PageView.prototype.start = function (groupScroll,
                                                       isHorizontalScroll,
                                                       arrayPosPageView,
                                                       my,
                                                       limitinput,
                                                       callBackAfterSwitchTab) {
        //limitinput: gioi han vi tri scroll (maxX, maxY, minX, minY), gan vao bien BoxScroll
        this.isDisable = false;
        this.thisGame = my;
        this.dataPageView.arrayPosPage = arrayPosPageView;
        this.settings.horizontalScroll = isHorizontalScroll;
        this.settings.verticalScroll = !isHorizontalScroll;
        this.dataPageView.currentPage = 0;
        limitinput.minX *=  LobbyConfig.scaleRatioEntireGame;
        limitinput.maxX *=  LobbyConfig.scaleRatioEntireGame;
        limitinput.minY *=  LobbyConfig.scaleRatioEntireGame;
        limitinput.maxY *=  LobbyConfig.scaleRatioEntireGame;
        limitinput.minY+= ManagerForScale.incrementHeight();
        limitinput.maxY+= ManagerForScale.incrementHeight();
        this.BoxScroll = limitinput;
        this.callBackAfterSwitchTab = callBackAfterSwitchTab;
        this.isMoving = false;

        this.currentGroupScroll = groupScroll;

        if(this.callbackID != -1)
            return;

        this.game.input.onDown.add(this.beginMove, this);

        this.callbackID = this.game.input.addMoveCallback(this.moveCamera, this);

        this.game.input.onUp.add(this.endMove, this);

        this.game.input.mouse.mouseWheelCallback = this.mouseWheel.bind(this);
    };
    /**
    * Event triggered when a pointer is pressed down, resets the value of variables.
    */
    Phaser.Plugin.PageView.prototype.beginMove = function () {

        if(this.thisGame == 0
            || this.currentGroupScroll.isnull == 0)
            return;
        if(this.isDisable == true)
            return;
        //this.startX = this.game.input.x;
        //this.startY = this.game.input.y;
        //
        //this.dragging = true;
        //
        //this.timestamp = Date.now();
        //
        //this.velocityY = this.amplitudeY = this.velocityX = this.amplitudeX = 0;
//nam trong khoang scroll moi move
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
    Phaser.Plugin.PageView.prototype.moveCamera = function (pointer, x, y) {

        if(this.thisGame == 0
            || this.currentGroupScroll.isnull == 0)
            return;
        if(this.isDisable == true)
            return;
        if (!this.dragging) return;
        if(this.isSpecialConfig &&this.dataPageView.currentPage == 0 && this.currentGroupScroll.x-this.dataPageView.arrayPosPage[0]>40){
            this.dragging = false;
            this.isRunOKBeginMove = false;
            this.autoScrollX = false;
            this.autoScrollY = false;
            return;
        }
        if(this.isSpecialConfig && this.dataPageView.currentPage == this.dataPageView.arrayPosPage.length-1 && this.currentGroupScroll.x+this.dataPageView.arrayPosPage[this.dataPageView.currentPage]<-40){
            this.dragging = false;
            this.isRunOKBeginMove = false;
            this.autoScrollX = false;
            this.autoScrollY = false;
            return;
        }
        ////nam trong khoang scroll moi move
        //if(
        //    this.BoxScroll != null
        //    &&this.BoxScroll.maxX != undefined
        //     && (this.BoxScroll.maxX < this.game.input.x
        //    || this.BoxScroll.minX > this.game.input.x
        //    || this.BoxScroll.maxY < this.game.input.y
        //    || this.BoxScroll.minY > this.game.input.y)
        //)
        //{
        //    this.dragging = false;
        //    return;
        //}

        this.now = Date.now();
        var elapsed = this.now - this.timestamp;
        this.timestamp = this.now;

        if (this.settings.horizontalScroll) {
            var delta = x - this.startX; //Compute move distance
            var deltaABS = Math.abs(delta);
            if(deltaABS < 10){
                this.isDragged = false;
                return;
            }
            if(delta > this.maximumDelta)
                delta = this.maximumDelta;
            else if (delta < -this.maximumDelta)
                delta = -this.maximumDelta;
            this.startX = x;
            this.velocityX = 0.8 * (1000 * delta / (1 + elapsed)) + 0.2 * this.velocityX;
            //this.game.camera.x -= delta;
            this.currentGroupScroll.x += delta;
        }

        if (this.settings.verticalScroll) {
            var delta = y - this.startY; //Compute move distance
            var deltaABS = Math.abs(delta);
            if(deltaABS < 10){
                this.isDragged = false;
                return;
            }
            if(delta > this.maximumDelta)
                delta = this.maximumDelta;
            else if (delta < -this.maximumDelta)
                delta = -this.maximumDelta;
            this.startY = y;
            this.velocityY = 0.8 * (1000 * delta / (1 + elapsed)) + 0.2 * this.velocityY;
            //this.game.camera.y -= delta;
            this.currentGroupScroll.y += delta;
        }

    };

    /**
    * Event triggered when a pointer is released, calculates the automatic scrolling.
    */
    Phaser.Plugin.PageView.prototype.endMove = function () {

        if(this.thisGame == 0
            || this.currentGroupScroll.isnull == 0
        || this.isRunOKBeginMove == false)
            return;
        this.isRunOKBeginMove = false;
        if(this.isDisable == true)
            return;
        this.dragging = false;
        this.autoScrollX = false;
        this.autoScrollY = false;

        if (!this.settings.kineticMovement) return;

        this.now = Date.now();



        if (this.game.input.activePointer.withinGame && (this.velocityX > 10 || this.velocityX < -10)
            //&& !(
            //    //nam ngoai box
            //    this.BoxScroll != null
            //    &&this.BoxScroll.maxX != undefined
            //    && (this.BoxScroll.maxX < this.game.input.x
            //    || this.BoxScroll.minX > this.game.input.x
            //    || this.BoxScroll.maxY < this.game.input.y
            //    || this.BoxScroll.minY > this.game.input.y)
            //)
        ) {
            this.amplitudeX = -0.8 * this.velocityX;
            //this.targetX = Math.round(this.game.camera.x - this.amplitudeX);
            this.targetX = Math.round( this.currentGroupScroll.x - this.amplitudeX);
            this.autoScrollX = true;
            //console.log(" end  + this.amplitudeX: " + this.amplitudeX +"   this.targetX: " + this.targetX );
        }

        if (this.game.input.activePointer.withinGame && (this.velocityY > 10 || this.velocityY < -10)) {
            this.amplitudeY = -0.8 * this.velocityY;
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
    Phaser.Plugin.PageView.prototype.update = function () {

        if(this.thisGame == 0
        || this.currentGroupScroll.isnull == 0)
            return;

        //move toi page view củ với horizontalScroll khi lệch vị trí
        if( (this.isDisable == true
             || (
                this.dragging == false
                && this.isReturnToPageX()
                //&& this.autoScrollX == false
                && this.amplitudeX == 0
            )
            )
        && this.isMoving == false
        && this.settings.horizontalScroll == true
        )
        {
            this.isMoving = true;
            var anm;
            var moveto = -this.dataPageView.arrayPosPage[this.dataPageView.currentPage];

            var anmTimeDuration = 200;
            var anmFunc = function (thatGame, that, moveto) {
                anm = thatGame.add.tween(that.currentGroupScroll);
                anm.to(
                    {x: moveto},
                    anmTimeDuration, Phaser.Easing.Linear.None
                );
                anm.start();
                anm.onComplete.add(function(){
                    that.isMoving = false;
                    if(that.callBackAfterSwitchTab != null
                        && that.callBackAfterSwitchTab != 0 ){
                        that.callBackAfterSwitchTab(that.dataPageView.currentPage);
                    }
                });
            };
            anmFunc(this.thisGame, this , moveto);
            //setTimeout(function (){
            //    if(this.isMoving == true)
            //    {
            //        this.isMoving = false;
            //    }
            //}, anmTimeDuration + 50);


            return;
        }
        this.elapsed = Date.now() - this.timestamp;

        //return;
        //move toi vi tri tiep theo khi scroll xong
        if (this.autoScrollX && this.amplitudeX != 0) {
            if(this.settings.horizontalScroll == true){
                var anm;
                var head = (this.amplitudeX > 0) ? 1:-1;
                this.dataPageView.currentPage += head;
                if(this.dataPageView.currentPage < 0){
                    this.dataPageView.currentPage = 0;
                }
                if(this.dataPageView.currentPage >= this.dataPageView.arrayPosPage.length)
                {
                    this.dataPageView.currentPage = this.dataPageView.arrayPosPage.length - 1;
                }
                var moveto = -this.dataPageView.arrayPosPage[this.dataPageView.currentPage];

                var anmTimeDuration = 200;
                var anmFunc = function (thatGame, that, moveto) {
                    anm = thatGame.add.tween(that.currentGroupScroll);
                    anm.to(
                        {x: moveto},
                        anmTimeDuration, Phaser.Easing.Linear.None
                    );
                    anm.start();
                    anm.onComplete.add(function()
                    {
                        if(that.callBackAfterSwitchTab != null
                        && that.callBackAfterSwitchTab != 0 ) {
                            that.callBackAfterSwitchTab(that.dataPageView.currentPage);
                        }
                    })
                };
                anmFunc(this.thisGame, this , moveto);
            }
            this.autoScrollX = false;
        }

        //if (this.autoScrollY && this.amplitudeY != 0) {
        //
        //    var delta = -this.amplitudeY * Math.exp(-this.elapsed / this.settings.timeConstantScroll);
        //    if (delta > 0.5 || delta < -0.5) {
        //        //this.game.camera.y = this.targetY - delta;
        //        this.currentGroupScroll.x -= this.targetY - delta;
        //    }
        //    else {
        //        this.autoScrollY = false;
        //        //this.game.camera.y = this.targetY;
        //        this.currentGroupScroll.x -= this.targetY;
        //    }
        //}
        //
        //if (this.settings.horizontalWheel && (this.velocityWheelX < -0.1 || this.velocityWheelX > 0.1 || !this.game.input.activePointer.withinGame)) {
        //
        //    //this.game.camera.x -= this.velocityWheelX;
        //    this.currentGroupScroll.x = this.velocityWheelX;
        //    this.velocityWheelX *= 0.95;
        //}
        //
        //if (this.settings.verticalWheel && (this.velocityWheelY < -0.1 || this.velocityWheelY > 0.1 || !this.game.input.activePointer.withinGame)) {
        //
        //    //this.game.camera.y -= this.velocityWheelY;
        //    this.currentGroupScroll.y = this.velocityWheelY;
        //    this.velocityWheelY *= 0.95;
        //}

    };

    /**
    * Event called when the mousewheel is used, affect the direction of scrolling.
    */
    Phaser.Plugin.PageView.prototype.mouseWheel = function (event) {
        if (!this.settings.horizontalWheel && !this.settings.verticalWheel) return;

        if(this.isDisable == true)
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
    * @method Phaser.Plugin.PageView#stop
    */
    Phaser.Plugin.PageView.prototype.stop = function () {

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

    //kiem tra co nen move pageview hay khong (page co bi lech vi tri hay khong)
    Phaser.Plugin.PageView.prototype.isReturnToPageX = function(){
        for(var i = 0; i < this.dataPageView.arrayPosPage.length; i++){
            if(this.currentGroupScroll.x % this.dataPageView.arrayPosPage[i] == 0){
                return false;
            }
        }
        return true;
    }
} (Phaser));
