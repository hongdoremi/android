/**
 * Created by nguyendat on 7/7/15.
 */

var UIBodyKenoAnimation = new function () {

    var my;
    var isIdle = false;

    var arrayOfLightPositionHeaderUp = {
        'x': [],
        'y': []
    };


    var groupHeaderKenoAnimationIdle;

    var groupHeaderKenoAnimationAction;
    var groupHeaderKenoAnimationActionUp;
    var groupHeaderKenoAnimationActionDown;
    var groupHeaderKenoAnimationActionOther;
    var timer4Action = {};




    function createFirstArrayOfKenoBulbPoint(
        isDebug
    ){
        isDebug =false;

        var arrayOfLightTMP = null;


        arrayOfLightTMP =
            UIBodyAnimation.createPath (
                my,
                UIBodyAnimation.PATH_TYPE_CURVE_BEZIER,
                {
                    'x': [  -52,        -146,    -128],
                    'y': [  106,          118,     42]
                },
                10,
                groupHeaderKenoAnimationIdle,
                isDebug);
        arrayOfLightPositionHeaderUp.x = arrayOfLightPositionHeaderUp.x.concat(arrayOfLightTMP.x);
        arrayOfLightPositionHeaderUp.y = arrayOfLightPositionHeaderUp.y.concat(arrayOfLightTMP.y);
        //return;
        arrayOfLightTMP =
            UIBodyAnimation.createPath (
                my,
                UIBodyAnimation.PATH_TYPE_CURVE_BEZIER,
                {
                    'x': [  -126,        -124,    -64],
                    'y': [  32,              8,     16]
                },
                8,
                groupHeaderKenoAnimationIdle,
                isDebug);
        arrayOfLightPositionHeaderUp.x = arrayOfLightPositionHeaderUp.x.concat(arrayOfLightTMP.x);
        arrayOfLightPositionHeaderUp.y = arrayOfLightPositionHeaderUp.y.concat(arrayOfLightTMP.y);



        arrayOfLightTMP =
            UIBodyAnimation.createPath (
                my,
                UIBodyAnimation.PATH_TYPE_CURVE_BEZIER,
                {
                    'x': [-52,     0,    60],
                    'y': [  14,    -14,   20]
                },
                9,
                groupHeaderKenoAnimationIdle,
                isDebug);
        arrayOfLightPositionHeaderUp.x = arrayOfLightPositionHeaderUp.x.concat(arrayOfLightTMP.x);
        arrayOfLightPositionHeaderUp.y = arrayOfLightPositionHeaderUp.y.concat(arrayOfLightTMP.y);


        arrayOfLightTMP =UIBodyAnimation.createPath (
            my,
            UIBodyAnimation.PATH_TYPE_CURVE_BEZIER,
            {
                'x': [  60,        110,    122],
                'y': [  16,       12,    32]
            },
            8,
            groupHeaderKenoAnimationIdle,
            isDebug);
        arrayOfLightPositionHeaderUp.x = arrayOfLightPositionHeaderUp.x.concat(arrayOfLightTMP.x);
        arrayOfLightPositionHeaderUp.y = arrayOfLightPositionHeaderUp.y.concat(arrayOfLightTMP.y);

        arrayOfLightTMP =
            UIBodyAnimation.createPath (
                my,
                UIBodyAnimation.PATH_TYPE_CURVE_BEZIER,
                {
                    'x': [  126,        138,    54],
                    'y': [  44,            116,    106]
                },
                10,
                groupHeaderKenoAnimationIdle,
                isDebug);
        arrayOfLightPositionHeaderUp.x = arrayOfLightPositionHeaderUp.x.concat(arrayOfLightTMP.x);
        arrayOfLightPositionHeaderUp.y = arrayOfLightPositionHeaderUp.y.concat(arrayOfLightTMP.y);



        arrayOfLightTMP =
            UIBodyAnimation.createPath (
                my,
                UIBodyAnimation.PATH_TYPE_CURVE_BEZIER,
                {
                    'x': [  -40,   -30,    0,  30,   44],
                    'y': [  104,     110,   110,  110,   104]
                },
                6,
                groupHeaderKenoAnimationIdle,
                isDebug);
        //arrayOfLightPositionHeaderBottom.x = arrayOfLightPositionHeaderBottom.x.concat(arrayOfLightTMP.x);
        //arrayOfLightPositionHeaderBottom.y = arrayOfLightPositionHeaderBottom.y.concat(arrayOfLightTMP.y);
        arrayOfLightPositionHeaderUp.x = arrayOfLightPositionHeaderUp.x.concat(arrayOfLightTMP.x);
        arrayOfLightPositionHeaderUp.y = arrayOfLightPositionHeaderUp.y.concat(arrayOfLightTMP.y);




    }

    this.createKenoBodyAnimation =
        function(
            game,
            parentGroupBody,
            position){

            var isDebug = LobbyConfig.isDebug;
            //isDebug = true;
            my = game;

            var groupKenoAnimation =
                my.add.group();

            groupHeaderKenoAnimationIdle =
                my.add.group();
            groupKenoAnimation.add(groupHeaderKenoAnimationIdle);

            groupHeaderKenoAnimationAction =
                my.add.group();
            groupKenoAnimation.add(groupHeaderKenoAnimationAction);
            groupHeaderKenoAnimationActionUp =
                my.add.group();
            groupHeaderKenoAnimationAction.add(groupHeaderKenoAnimationActionUp);
            groupHeaderKenoAnimationActionDown =
                my.add.group();
            groupHeaderKenoAnimationAction.add(groupHeaderKenoAnimationActionDown);
            groupHeaderKenoAnimationActionOther =
                my.add.group();
            groupHeaderKenoAnimationAction.add(groupHeaderKenoAnimationActionOther);


            /*
             *
             *    ALL POSITION IS RELATIVE
             *    STANDARD POINT IS centerDotIdleAnimation
             */

            createFirstArrayOfKenoBulbPoint(isDebug);



            /*
             *       GROUP HEADER IDLE
             *   groupHeaderKenoAnimationIdle is parent
             *
             */

            groupHeaderKenoAnimationIdle.position = {
                x:0,
                y:-95
            };



            /*
             *       GROUP HEADER IDLE
             *
             *
             */





            /*
             *       GROUP HEADER ACTION
             *
             *
             */

            groupHeaderKenoAnimationAction.position = {
                x:0,
                y:-95
            };



            /*
             *       GROUP HEADER ACTION
             *
             *
             */






            //slotAnimation.position  = {
            //    x:566,
            //    y:544
            //};
            //slotAnimation.animations.add('walk');
            //slotAnimation.animations.play('walk', 1, true);



            if(isDebug) {

                UIBodyAnimation.addPointGraphicAt(
                    my,
                    0,0,
                    groupKenoAnimation
                );

                UIBodyAnimation.addPointGraphicAt(
                    my,
                    0,0,
                    groupHeaderKenoAnimationIdle
                );


            }


            groupKenoAnimation.position =
                position;

            parentGroupBody.add(groupKenoAnimation);


        };

    function hideIdle(){
        groupHeaderKenoAnimationIdle.alpha = 0;
        Lobby.PhaserJS.stopGroupAnimation(groupHeaderKenoAnimationIdle);
        Lobby.PhaserJS.removeAllChild(groupHeaderKenoAnimationIdle);
    }

    function hideAction(){
        groupHeaderKenoAnimationAction.alpha = 0;
        Lobby.PhaserJS.stopGroupAnimation(groupHeaderKenoAnimationActionUp);
        Lobby.PhaserJS.removeAllChild(groupHeaderKenoAnimationActionUp);

        Lobby.PhaserJS.stopGroupAnimation(groupHeaderKenoAnimationActionDown);
        Lobby.PhaserJS.removeAllChild(groupHeaderKenoAnimationActionDown);

        Lobby.PhaserJS.stopGroupAnimation(groupHeaderKenoAnimationActionOther);
        Lobby.PhaserJS.removeAllChild(groupHeaderKenoAnimationActionOther);




        if(timer4Action.timer1 != null &&
        timer4Action.timer1 != undefined){
            Lobby.PhaserJS.clearTimer(my,timer4Action.timer1);
            //my.time.events.remove();
        }

        if(timer4Action.timer2 != null &&
            timer4Action.timer2 != undefined){
            Lobby.PhaserJS.clearTimer(my,timer4Action.timer2);
            //my.time.events.remove();
        }
    }

    this.runIdle = function(){

        if(isIdle){
            return;
        }
        isIdle = true;
        hideAction();
        groupHeaderKenoAnimationIdle.alpha = 1.0;

        UIBodyAnimation.drawDefaultBulbIdleWithPathPoint(
            my,
            arrayOfLightPositionHeaderUp,
            'body_slot_animation_idle_dot',
            false,
            groupHeaderKenoAnimationIdle);



        //UIBodyAnimation.drawBulbWithPathPoint(
        //    my,
        //    arrayOfLightPositionHeaderBottom,
        //    'body_slot_animation_idle_dot',
        //    function(
        //        index,
        //        bulb,
        //        numberOfBulb){
        //
        //        var starFrame = index%2;
        //        var duration = 3;
        //        bulb.animations.add('animate',[starFrame,1-starFrame],1,true,true);
        //        bulb.animations.play('animate',duration,true);
        //
        //        return duration;
        //
        //    },
        //    false,
        //    groupHeaderKenoAnimationIdle);
    };

    this.runAction = function(){

        if(!isIdle){
            return;
        }
        isIdle = false;
        hideIdle();
        groupHeaderKenoAnimationAction.alpha = 1.0;


        //return;
        //var animation1 = function(){
        //    var duration =
        //        UIBodyAnimation.drawBulbWithPathPoint(
        //            my,
        //            arrayOfLightPositionHeaderUp,
        //            'body_slot_animation_action_dot',
        //            function(
        //                index,
        //                bulb,
        //                numberOfBulb){
        //
        //                bulb.animations.add('animate',[0,1],1,true,true);
        //
        //                var indexCenterPoint = Lobby.Utils.float2int(numberOfBulb/2);
        //
        //                var realIndex = (index < indexCenterPoint)?index:indexCenterPoint - index%indexCenterPoint;
        //                var frameRatePerSecond =
        //                    1.2-(realIndex)*0.04;
        //
        //                bulb.animations.play('animate',frameRatePerSecond,false);
        //                //dotIdleAnimation.tint = 0x00ff00;
        //
        //                var duration =
        //                    1/frameRatePerSecond;
        //                return duration;
        //
        //            },
        //            true,
        //            groupHeaderKenoAnimationActionUp);
        //    return duration;
        //
        //};
        var animation1 = function(){
            var duration =
                UIBodyAnimation.drawDefaultBulbActiveOnOffWithPathPoint(
                    my,
                    arrayOfLightPositionHeaderUp,
                    'body_slot_animation_action_dot_after',
                    true,
                    groupHeaderKenoAnimationActionUp);
            return duration;

        };

        //return;
        var animationStar =
            function(
                x1,y1,
                x2,y2){

            var duration =
                UIBodyAnimation.drawDefaultStarActiveFromX1ToX2(
                    my,
                    x1,y1,x2,y2,
                    'body_slot_animation_action_star',
                    false,
                groupHeaderKenoAnimationActionOther);
            return duration;

        };

        var animation2 = function(){

            // go up
            for(var i = 0; i < 10; i++){
                animationStar(
                    my.rnd.between(-100, 100), my.rnd.between(10, 50),
                    my.rnd.between(-130, 130), my.rnd.between(0, -30));
            }


            // go down
            for(var i = 0; i < 10; i++){
                animationStar(
                    my.rnd.between(-100, 100), my.rnd.between(70, 100),
                    my.rnd.between(-130, 130), my.rnd.between(110, 130));
            }

            // go left
            for(var i = 0; i < 5; i++){
                animationStar(
                    my.rnd.between(-100, -70), my.rnd.between(20, 80),
                    my.rnd.between(-130,-110), my.rnd.between(-10, 110));
            }

            //go right
            for(var i = 0; i < 5; i++){
                animationStar(
                    my.rnd.between(100, 70), my.rnd.between(20, 80),
                    my.rnd.between(130,110), my.rnd.between(-10, 110));
            }


            //for(var i = 0; i < 6; i++){
            //    animationStar(
            //        my.rnd.between(-20, 20), my.rnd.between(0, 50),
            //        my.rnd.between(100, 200), my.rnd.between(-50, -100));
            //}
        };

        //totalAnimation();

        animation1();
        animation2();



        //var timerLoopForAction =
        //    my.time.events.loop(
        //        Phaser.Timer.SECOND * 2.5,
        //        function(){
        //
        //            if(isIdle){
        //                my.time.events.remove(timerLoopForAction);
        //                return;
        //            }
        //            animation2();
        //        },
        //        this);
        //
        //timer4Action.timer1 = timerLoopForAction;



    };

};
