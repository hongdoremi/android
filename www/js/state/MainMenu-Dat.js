LobbyC.MainMenu = (function (my) {

  /**
   * Example method
   */
  //from = {x:,y:};
  //to = {x:,y:};
  //durationEachCoin in milisecond]
  var groupCoinAnimation;
  var arrayOfCoinAnimation = [];
  var arrayPointCalculated = {};

  var isDestroy = false;

  /**
   * destroy group contain coin animation
   */
  my.destroyCurrentCoinAnimation = function(){
    isDestroy = true;
    if(Lobby.Utils.objectNotNull(groupCoinAnimation)) {
      groupCoinAnimation.destroy(true);
    }
    groupCoinAnimation = null;
    arrayOfCoinAnimation = [];
    arrayPointCalculated = {};
  };

  /**
   * create and run coin animation
   * @param from   : start position of coin
   * @param to     : destination of coin
   * @param durationEachCoin   : in milisecond
   * @param numberOfCoin
   * @param callback    : call when finish animation, can be null
     * @param parent    : don't use
     */
  my.createCoinAnimation = function (
    from, to,durationEachCoin, numberOfCoin, callback,parent) {
    isDestroy = false;
    if(Lobby.Utils.objectIsNull(groupCoinAnimation)) {
      groupCoinAnimation = my.add.group();
    }
    groupCoinAnimation.visible = true;
    my.game.world.bringToTop(groupCoinAnimation);
    //if(Lobby.Utils.objectNotNull(parent)) {
    //    parent.add(groupCoinAnimation);
    //}

    if(Lobby.Utils.objectIsNull(durationEachCoin)){
      durationEachCoin = 1000;
    }
    //if(Lobby.Utils.objectIsNull(numberOfCoin)){
    numberOfCoin = 10;
    //}

    if(Lobby.Utils.objectIsNull(from)){
      //from = {
      //    x:LobbyConfig.width / 2 + 30,
      //    y:LobbyConfig.height - 120
      //};
      from = {
        x:my.input.activePointer.x,y:my.input.activePointer.y
      };
      if(from.y>LobbyConfig.height-30) from.y-=50;

    }
    if(Lobby.Utils.objectIsNull(to)){
      to = {
        x:(LobbyConfig.width / 2 - 280)*LobbyConfig.scaleRatioEntireGame,
        y:45*LobbyConfig.scaleRatioEntireGame
      };
      //to.y+=ManagerForScale.incrementHeight();
    }

    var numberOfCoinComplete = 0;

    var numberOfCoinStartAnimating = 0;

    var animationOneCoin = function(){
      my.animationOneCoin(from,to,durationEachCoin,parent,function(){
        numberOfCoinComplete++;
        if(numberOfCoinComplete === numberOfCoin){
          ManagerForSound.stop(my,'animation-receive-coin');
          if(Lobby.Utils.objectNotNull(callback)){
            //my._soundCoinAnimation.stop();
            //ManagerForSound.play(my,'animation-receive-coin');
            callback();
          }
        }
      });
    };
    my.playAnimationCoinSound();
    animationOneCoin();
    var time4Rotating = my.time.events.loop(
      100,
      function () {
        numberOfCoinStartAnimating++;
        if(numberOfCoinStartAnimating >= numberOfCoin){
          Lobby.PhaserJS.clearTimer(my,time4Rotating);
          //my.time.events.remove(time4Rotating);
        }
        animationOneCoin();

      },this);
  };

  /**
   * animation flying crown
   * @param from    start position
   * @param to      destination position
   * @param callback    callback when finish animation
   * @param parent      Deprecated
     */
  my.createCrownAnimation = function(from, to, callback,parent) {
    isDestroy = false;
    if(Lobby.Utils.objectIsNull(groupCoinAnimation)) {
      groupCoinAnimation = my.add.group();
    }
    groupCoinAnimation.visible = true;
    my.game.world.bringToTop(groupCoinAnimation);
    //if(Lobby.Utils.objectNotNull(parent)) {
    //    parent.add(groupCoinAnimation);
    //}

    var  durationEachCoin = 1000;
    var numberOfCoin = 10;

    if(Lobby.Utils.objectIsNull(from)){
      from = {
        x:my.input.activePointer.x,y:my.input.activePointer.y
      };
      if(from.y>LobbyConfig.height-30) from.y-=50;
    }
    if(Lobby.Utils.objectIsNull(to)){
      to = {
        x:(LobbyConfig.width / 2 + 125)*LobbyConfig.scaleRatioEntireGame,
        y:45*LobbyConfig.scaleRatioEntireGame
      };
      //to.y+=ManagerForScale.incrementHeight();
    }

    var numberOfCrownComplete = 0;

    var numberOfCrownStartAnimating = 0;
    var arraySize = [0.75, 0.9 , 0.5];
    var arrayTime = [133, 111, 200];
    var createOneCrown = function(callbackC){
        var crownSprite = my.add.sprite(0,0,"popup-shop-crown_icon", null, groupCoinAnimation);
      crownSprite.anchor.setTo(0.5);
        var ramdomSizeValue = arraySize[numberOfCrownStartAnimating % 3];
        crownSprite.scale.setTo(ramdomSizeValue*(100/70)*LobbyConfig.scaleRatioEntireGame);// reduce image resolution 70%

        var delayRatioDuration = 1;
        crownSprite.position = {x: from.x, y: from.y};
        var tween = my.add.tween(crownSprite.position).to({
          x: [from.x + (to.x - from.x) / 3, from.x + (to.x - from.x) *2 / 3, to.x],
          y: [from.y + (to.y - from.y) / 3, from.y + (to.x - from.y) *2 / 3, to.y],
        }, durationEachCoin*delayRatioDuration, Phaser.Easing.Quadratic.Out, true).interpolation(function (v, k) {
          return Phaser.Math.bezierInterpolation(v, k);
        });

        tween.onComplete.add(function (){
          if(Lobby.Utils.objectNotNull(callbackC)){
            callbackC();
            crownSprite.visible = false;
          }
        }, my);
    };

    /**
     * animation flying one coin
     */
    //my.playAnimationCoinSound();
    var animationOneCoin = function(){
      createOneCrown(function(){
        numberOfCrownComplete++;
        if(numberOfCrownComplete == numberOfCoin){
          ManagerForSound.stop(my,'animation-receive-coin');
          if(Lobby.Utils.objectNotNull(callback)){
            callback();
          }
        }
      });
    };
    my.playAnimationCoinSound();
    animationOneCoin();
    var time4Rotating = my.time.events.loop(
        arrayTime[numberOfCrownStartAnimating % 3],
        function () {
          numberOfCrownStartAnimating++;
          if(numberOfCrownStartAnimating >= numberOfCoin){
            Lobby.PhaserJS.clearTimer(my,time4Rotating);
            //my.time.events.remove(time4Rotating);
          }
          animationOneCoin();
        },this);

  };

  /**
   * flying one coin animation
   * @param from     start world position of coin
   * @param to        world destination of coin
   * @param duration    in milisecond
   * @param parent      deprecated
     * @param callback   callback when finish coin animation, can be null
     */
  my.animationOneCoin =function (from,to,duration,parent,callback) {
    if(isDestroy){
      return;
    }
    var start = {
      x: from.x,//LobbyConfig.width / 2 + 30,
      y: from.y + 30,//LobbyConfig.height - 120,
      timeAnimation: duration
    };

    var end = {
      x: to.x,//LobbyConfig.width / 2 - 280,
      y: to.y//45
    };

    var coinAnimation = null;

    var i = arrayOfCoinAnimation.length; while (i--) {
      var coin = arrayOfCoinAnimation[i];
      if(coin.visible === false){
        coinAnimation = coin;
        break;
      }
    }
    //for(var i = 0; i < arrayOfCoinAnimation.length; i++){
    //}

    if(coinAnimation == null) {
      coinAnimation = my.add.sprite(0, 0, "coin-rotation", null, groupCoinAnimation);
      coinAnimation.scale.setTo((100/70)*LobbyConfig.scaleRatioEntireGame);// reduce image resolution 70%
      coinAnimation.animations.add('coin-animation');
      coinAnimation.animations.play('coin-animation', 25, true, false);
      coinAnimation.anchor = {
        x: 0.5,
        y: 0.5
      };
      arrayOfCoinAnimation.push(coinAnimation);
    }else{
      coinAnimation.animations.play('coin-animation', 25, true, false);
      groupCoinAnimation.add(coinAnimation);
    }



    if(Lobby.Utils.objectNotNull(parent)) {
      //from.x+=parent.world.x;
      //from.y+=parent.world.y;
      //to.x+=parent.world.x;
      //to.y+=parent.world.y;
      //parent.add(coinAnimation);
    }


    start.x = Lobby.Utils.floatToIntOptimize(start.x);
    start.y = Lobby.Utils.floatToIntOptimize(start.y);
    end.x = Lobby.Utils.floatToIntOptimize(end.x);
    end.y = Lobby.Utils.floatToIntOptimize(end.y);

    coinAnimation.visible = true;
    coinAnimation.position = {
      x: start.x,
      y: start.y
    };


    //my.add.tween(coinAnimation.position).to(end, 2400, Phaser.Easing.Cubic.In, true);

    var delayRatioDuration = 1;
    if(Lobby.Utils.isOldSchoolDevice()){
      //delayRatioDuration = 4;
    }


    var listGoodPoint = arrayPointCalculated[start.x+"_"+start.y+"_"];
    if(Lobby.Utils.objectIsNull(listGoodPoint)){
      listGoodPoint = my.getGoodControlPointBenzierCurve(end,start, my.DistanceBetween2Point(start, end)/2, [0.75, 0.25]);
      arrayPointCalculated[start.x+"_"+start.y+"_"] = listGoodPoint;
    }

    var tween = my.add.tween(coinAnimation.position).to({
      x: [start.x, listGoodPoint[0].x, listGoodPoint[1].x, end.x],
      y: [start.y, listGoodPoint[0].y, listGoodPoint[1].y, end.y],
    }, duration*delayRatioDuration, Phaser.Easing.Quadratic.Out, true).interpolation(function (v, k) {
      return Phaser.Math.bezierInterpolation(v, k);
    });

    tween.onComplete.add(function (){
      if(Lobby.Utils.objectNotNull(callback)){
        callback();
        coinAnimation.visible = false;
      }
    }, my);


  };

  /**
   * heristic array of middle control point of bezier curve
   * @param pointA    control point start
   * @param pointB    control point end
   * @param distance   distance between A & B
   * @param ratioPositionFromA2B      array contain ratio between distance A to control point i and distance from control point i to B
     * @returns {Array}
     */
  my.getGoodControlPointBenzierCurve = function(pointA, pointB, distance, ratioPositionFromA2B) {
    var result = {x:0,y:0};

    var AB = {x:pointB.x - pointA.x, y:pointB.y - pointA.y};

    //angle in radians
    var angleX = my.getAngleXBetween3Point({x:0, y:0}, AB, {x:0, y:1});

    angleX = AB.x > 0 ? (360- angleX) : angleX;

    result = {x:-1* distance, y:0* distance} ;
    result = my.rotate_point(result.x, result.y, 0,0, angleX);

    var resultList = new Array();
    var centerList = new Array();
    for (var i = 0; i < ratioPositionFromA2B.length; i++)
    {
      if(ratioPositionFromA2B[i] == 0){
        centerList[i] = pointA;
      }else{
        centerList[i] = {x:((pointB.x - pointA.x) * ratioPositionFromA2B[i] + pointA.x),
          y:((pointB.y - pointA.y) * ratioPositionFromA2B[i] + pointA.y)}
      }

      resultList[i] = {x:result.x + centerList[i].x,y:result.y + centerList[i].y};
    }

    return resultList;
  };

  /**
   * get angle p2p1p3
   * @param p1     center
   * @param p2     top
   * @param p3      top
   * @returns {number}
     */
  my.getAngleXBetween3Point = function(p1, p2, p3){
    //var p1={
    //    x:0,
    //    y:0
    //};
    //
    //var p2={
    //    x:0,
    //    y:1
    //};
    //
    //var p3={
    //    x:-1,
    //    y:1
    //};

    var p12 = Math.sqrt(Math.pow((p1.x - p2.x),2) + Math.pow((p1.y - p2.y),2));
    var p13 = Math.sqrt(Math.pow((p1.x - p3.x),2) + Math.pow((p1.y - p3.y),2));
    var p23 = Math.sqrt(Math.pow((p2.x - p3.x),2) + Math.pow((p2.y - p3.y),2));

//angle in radians
    var resultRadian = Math.acos(((Math.pow(p12, 2)) + (Math.pow(p13, 2)) - (Math.pow(p23, 2))) / (2 * p12 * p13));

//angle in degrees
    var resultDegree = Math.acos(((Math.pow(p12, 2)) + (Math.pow(p13, 2)) - (Math.pow(p23, 2))) / (2 * p12 * p13)) * 180 / Math.PI;
    return resultDegree;
  };

  /**
   * rotate point(pointX,pointY) around origin(originX,originY) angle
   * @param pointX
   * @param pointY
   * @param originX
   * @param originY
   * @param angle       rotate angle
   * @returns {{x: *, y: *}}
     */
  my.rotate_point = function(pointX, pointY, originX, originY, angle) {
    angle = angle * Math.PI / 180.0;
    return {
      x: Math.cos(angle) * (pointX-originX) - Math.sin(angle) * (pointY-originY) + originX,
      y: Math.sin(angle) * (pointX-originX) + Math.cos(angle) * (pointY-originY) + originY
    };
  };

  /**
   * get distance between p1 and p2
   * @param p1
   * @param p2
   * @returns {number}
     * @constructor
     */
  my.DistanceBetween2Point = function(p1,p2){
    var a = p1.x - p2.x;
    var b = p1.y - p2.y;

    var s = Math.sqrt( a*a + b*b );
    return s;
  };

  return my;

}(LobbyC.MainMenu || {}));
