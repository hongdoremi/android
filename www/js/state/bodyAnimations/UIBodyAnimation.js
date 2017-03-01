/**
 * Created by nguyendat on 7/16/15.
 */

var UIBodyAnimation = new function () {

    var that = this;

    this.PATH_TYPE_LINE = 1;
    this.PATH_TYPE_CURVE_BEZIER = 2;
    this.PATH_TYPE_CURVE_CATMULLROM = 2;

    /**
     * create point on circle
     * @param my                game object
     * @param center            center of circle
     * @param r                 radius of circle
     * @param numberOfPoint     number of point on circle
     * @param parentGroup       group contain debug graphic
     * @param isDebug           show test circle in canvas if in debug mode
     * @returns {{x: Array, y: Array}}
     */
    this.createCicle = function (
        my,
        center,
        r,
        numberOfPoint,
        parentGroup,
        isDebug) {

        var resultCircle = {
            'x':[],
            'y':[]
        };

        var graphic = null;

        if(isDebug) {
            graphic =
                my.add.graphics(
                    0,
                    0,
                    parentGroup);
            //graphic.clear();
        }



        var unit = 2.0*Math.PI/numberOfPoint;
        var i = numberOfPoint; while (i--) {

            var x = r*Math.cos(unit*i) + center.x;
            var y = r*Math.sin(unit*i) + center.y;

            resultCircle.x.push(x);
            resultCircle.y.push(y);

            if(graphic) {
                graphic.lineStyle(2, 0x0000FF, 1);
                graphic.drawCircle(x, y, 2);
            }
        }
        //for(var i = 0; i < numberOfPoint; i++){
        //}

        if(graphic) {
            graphic.lineStyle(4, 0xFF0000, 1);
            graphic.drawCircle(center.x, center.y, 4);

        }

        return resultCircle;


    };

    /**
     * create point on path
     * @param my                game object
     * @param pathType          line, curve,..
     * @param controlPoint      control point of curve, or 2 top of line
     * @param numberOfPoint     number of point on path
     * @param parentGroup       group contain debug point graphic
     * @param isDebug           draw point on parentGroup if in debug mode
     * @returns {{x: Array, y: Array}}
     */
        this.createPath = function (
            my,
            pathType,
            controlPoint,
            numberOfPoint,
            parentGroup,
            isDebug) {

        //var
        //switch (pathType){
        //
        //}

        if(controlPoint == null){

            controlPoint = {
                'x': [0, 100, 100, 200, 200],
                'y': [0, 100, -100, 100, -100]
            };

        }

        var resultCurve = {
            'x':[],
            'y':[]
        };


        //var py = my.points.y;
        //
        //for (var i = 0; i < py.length; i++)
        //{
        //    py[i] = my.rnd.between(32, 432);
        //}

        var graphic = null;

        if(isDebug) {
            graphic =
                my.add.graphics(
                    0,
                    0,
                    parentGroup);
            //graphic.clear();
        }

        var x = 1 / numberOfPoint;

        for (var i = 0; i <= 1; i += x){


            var px = 0;
            var py = 0;

            switch (pathType){
                case  that.PATH_TYPE_LINE:{
                    px = my.math.linearInterpolation(controlPoint.x, i);
                    py = my.math.linearInterpolation(controlPoint.y, i);
                    break;
                }
                case that.PATH_TYPE_CURVE_BEZIER:{
                    px = my.math.bezierInterpolation(controlPoint.x, i);
                    py = my.math.bezierInterpolation(controlPoint.y, i);
                    break;
                }
                case that.PATH_TYPE_CURVE_CATMULLROM:{
                    px = my.math.catmullRomInterpolation(controlPoint.x, i);
                    py = my.math.catmullRomInterpolation(controlPoint.y, i);
                    break;
                }
            };

            resultCurve.x.push(px);
            resultCurve.y.push(py);

            if(graphic) {
                graphic.lineStyle(2, 0x0000FF, 1);
                graphic.drawCircle(px, py, 2);
            }
        }

        if(graphic) {
            graphic.lineStyle(4, 0xFF0000, 1);
            for (var p = 0; p < controlPoint.x.length; p++) {
                graphic.drawCircle(controlPoint.x[p], controlPoint.y[p], 4);
            }
        }


        return resultCurve;


    };

    /**
     * draw bulb light on path
     * @param my                    game object
     * @param arrayOfPathPoint      point array
     * @param lightIdentify         sprite key of bulb
     * @param functionAnimation     custom animation for on/off bulb
     * @param isRemoveAllChild      remove all child of group if nessessary
     * @param groupContain          group contain bulb
     * @returns {number}
     */
    this.drawBulbWithPathPoint = function(
        my,
        arrayOfPathPoint,
        lightIdentify,
        functionAnimation,
        isRemoveAllChild,
        groupContain){

//return;
        if(lightIdentify == null ||
            lightIdentify == undefined){
            lightIdentify = 'body_slot_animation_idle_dot';
        }

        var duration = 0;
        if(isRemoveAllChild) {
            Lobby.PhaserJS.removeAllChild(groupContain);
        }

        var i = arrayOfPathPoint.x.length; while (i--) {
            var dotPos = {
                x:arrayOfPathPoint.x[i],
                y:arrayOfPathPoint.y[i]
            };

            var dotIdleAnimation =
                my.add.sprite(
                    dotPos.x,
                    dotPos.y,
                    lightIdentify,
                    0,
                    groupContain);
            dotIdleAnimation.anchor.setTo(0.5, 0.5);

            var tmpDuration =
                functionAnimation(
                    i,
                    dotIdleAnimation,
                    arrayOfPathPoint.x.length);

            if(tmpDuration > duration){
                duration = tmpDuration;
            }

            //dotIdleAnimation.tint = 0x00ff00;
        }
        //for(var i = 0; i < arrayOfPathPoint.x.length; i++ ){
        //}


        return duration;
    };

    /**
     * draw bulb on path with fixed animation
     * @param my                    game object
     * @param arrayOfPathPoint      array of path point
     * @param lightIdentify         key sprite of bulb
     * @param isRemoveAllChild      clear group before add buld on it
     * @param groupContain          group contain bulb
     * @returns {number}
     */
    this.drawDefaultBulbIdleWithPathPoint = function(
        my,
        arrayOfPathPoint,
        lightIdentify,
        isRemoveAllChild,
        groupContain){


        var durationTotal =
            UIBodyAnimation.drawBulbWithPathPoint(
                my,
                arrayOfPathPoint,
                lightIdentify,
                function(
                    index,
                    bulb,
                    numberOfBulb){

                    var starFrame = index%3;

                    var duration = 4;

                    var frames = null;
                    switch (starFrame){
                        case 0:{
                            frames = [0,0,1];
                            break;
                        }
                        case 1:{
                            frames = [1,0,0];
                            break;
                        }
                        case 2:{
                            frames = [0,1,0];
                            break;
                        }
                        default:{
                            frames = [0,1,0];
                            break;

                        }
                    }

                    bulb.animations.add('animate',frames,1,true,true);
                    bulb.animations.play('animate',duration,true);

                    return duration;

                },
                isRemoveAllChild,
                groupContain);

        return durationTotal;



    };

    /**
     * simple light bulb on/off animation
     * @param my                        game object
     * @param arrayOfPathPoint          array of path
     * @param lightIdentify             sprite key of bulb
     * @param isRemoveAllChild          clear group before add bulb
     * @param groupContain              group contain bulb
     * @returns {number}
     */
    this.drawDefaultBulbActiveOnOffWithPathPoint = function(
        my,
        arrayOfPathPoint,
        lightIdentify,
        isRemoveAllChild,
        groupContain){


        if(lightIdentify == null ||
            lightIdentify == undefined){
            lightIdentify = 'body_slot_animation_action_dot_after';
        }


        var duration =
            UIBodyAnimation.drawBulbWithPathPoint(
                my,
                arrayOfPathPoint,
                lightIdentify,
                function(
                    index,
                    bulb,
                    numberOfBulb){

                    bulb.animations.add('animate',[0,1],1,true,true);

                    var indexCenterPoint = Lobby.Utils.float2int(numberOfBulb/2);

                    var frameRatePerSecond = 2;

                    bulb.animations.play('animate',frameRatePerSecond,true);
                    //dotIdleAnimation.tint = 0x00ff00;

                    var duration =
                        1/frameRatePerSecond;
                    return duration;

                },
                isRemoveAllChild,
                groupContain);
        return duration;
    };


    /**
     * draw star animation on line x1y1-x2y2
     * @param my                        game object
     * @param x1                        float
     * @param y1                        float
     * @param x2                        float
     * @param y2                        float
     * @param lightIdentify             key sprite of star
     * @param isRemoveAllChild          clear group before add star
     * @param groupContain              group contain star
     * @returns {number}
     */
    this.drawDefaultStarActiveFromX1ToX2 = function(
        my,
        x1,y1,x2,y2,
        lightIdentify,
        isRemoveAllChild,
        groupContain){


        if(lightIdentify == null ||
            lightIdentify == undefined){
            lightIdentify = 'body_slot_animation_action_star';
        }

        var duration =
            UIBodyAnimation.drawBulbWithPathPoint(
                my,
                {
                    'x':[x1],
                    'y':[y1]
                },
                lightIdentify,
                function(
                    index,
                    bulb,
                    numberOfBulb){

                    var frameRatePerSecond = 10;

                    var randomScaleFrom =
                        my.rnd.realInRange(.3, .7);
                    bulb.scale.setTo(randomScaleFrom,randomScaleFrom);


                    //bulb.frame = 2;
                    my
                        .add
                        .tween(bulb)
                        .to( {
                            alpha:0,
                            x:x2,
                            y:y2}, Phaser.Timer.SECOND*0.8, Phaser.Easing.Quadratic.Out, true)
                        .onComplete.add(
                        function (){

                            groupContain.remove(bulb);

                        },
                        this);

                    randomScaleTo =
                        my.rnd.realInRange(.7, 1.);
                    my
                        .add
                        .tween(bulb.scale)
                        .to( {
                            x:randomScaleTo,
                            y:randomScaleTo}, Phaser.Timer.SECOND*0.8, Phaser.Easing.Quadratic.In, true)
                        .onComplete.add(
                        function (){


                        },
                        this);



                    var duration =
                        1/frameRatePerSecond;
                    return duration;

                },
                isRemoveAllChild,
                groupContain);
        return duration;

    };

    /**
     * slice array of point into 2 array
     * @param arrayPoint             origin array of points
     * @param arrayPointLeft         sub array of points 1
     * @param arrayPointRight        sub array of points 2
     */
    this.sliceArrayOfPointIntoLeftAndRight =
        function(
        arrayPoint,
        arrayPointLeft,
        arrayPointRight){

            var indexCenterPoint = Lobby.Utils.float2int(arrayPoint.x.length/2);

            arrayPointLeft.x = arrayPoint.x.slice(0, indexCenterPoint);
            arrayPointLeft.y = arrayPoint.y.slice(0, indexCenterPoint);

            arrayPointRight.x = arrayPoint.x.slice(indexCenterPoint, arrayPoint.x.length);
            arrayPointRight.y = arrayPoint.y.slice(indexCenterPoint, arrayPoint.y.length);
            arrayPointRight.y.reverse();

    };

    /**
     * add bulb on/off animation at (x,y)
     * @param my            game object
     * @param x             x position
     * @param y             y position
     * @param group         group contain bulb
     */
    this.addPointGraphicAt =
        function(
        my,x,y,
        group){

            var point = null;

            point =
                my.add.sprite(
                    0,
                    0,
                    'body_slot_animation_idle_dot',
                    0,
                    group);
            point.anchor.setTo(0.5, 0.5);

            point.animations.add('idle', [0, 1], 1, true, true);
            point.animations.play('idle', 1, true);
            point.tint = 0x00ff00;

    };

};