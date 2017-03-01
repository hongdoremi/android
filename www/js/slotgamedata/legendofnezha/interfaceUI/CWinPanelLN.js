/**
 * Created by Duy on 7/8/2016.
 */
/**
 * THIS CLASS MANAGES WIN PANEL UI
 * @param my: Phaser Game Object
 * @param parentGroup: Group parent
 * @param groupOfAnimation: aray contains all nezha animation
 * @constructor
 */
function CWinPanelLN(my, parentGroup, groupOfAnimation){
    var groupPanel;

    var title;
    var message;

    var _bUpdate = false;

    var explosion;

    var that = this;
    /**
     * Initialize UI
     */
    this.init = function(my){

        groupPanel = my.add.group();
        parentGroup.add(groupPanel);

        //var oFade = my.add.graphics(0, 0);
        //oFade.beginFill(0xffffff, 1);
        //oFade.drawRect(
        //    0,
        //    0,
        //    settings.CANVAS_WIDTH,
        //    settings.CANVAS_HEIGHT
        //);
        //oFade.endFill();
        //groupPanel.add(oFade);

        var oPanel = my.add.sprite(0,0,"totalwinning",null,groupPanel);
        oPanel.scale.setTo(2);
        oPanel.body = null;
        oPanel.inputEnabled = true;


        //explosion = new AtlasAnimation(my,
        //    groupPanel,
        //    'explosion_effect',
        //    'explode_effect',
        //    'Bonus-01-weaponExplodeEffects_',
        //    1,
        //    15,
        //    '.png',
        //    2);

        explosion= new SpriteAnimation(
            my,
            groupPanel,
            {x:0,y:0},
            {x:1,y:1},
            'explode_effect_',
            0,
            14,
            true);
        //explosion.playWithoutTimer();
        //explosion.need2LoadFirst = true;
        explosion.scale({x:2,y:2});
        groupOfAnimation.push(explosion);



        var xCenter = settings.CANVAS_WIDTH / 2.;
        var yCenter = 450;

        title = my.add.text(xCenter, yCenter - 100, "", {
            font: "100px CopperPlates",
            //font: "100px PassionOne-Regular",
            fill: "#fffec5",
            stroke: '#874829',
            strokeThickness: 8,
            align: "center"
        }, groupPanel);
        title.anchor.setTo(0.5);
        message = my.add.text(xCenter, yCenter, "", {
            font: "100px CopperPlates",
            //font: "100px PassionOne-Regular",
            fill: "#FFEE3E",
            stroke: '#FF0000',
            strokeThickness: 8,
            align: "center"
        }, groupPanel);
        message.anchor.setTo(0.5);

        groupPanel.visible = false;

        my.scaleCenterGroup(groupPanel);
    };
    /**
     * Show Win Panel Function
     * @param text1: Title Text
     * @param text2: Message text
     * @param _iCurrentTotWin: Total Win
     * @param callback: callback after show
     */
    this.showWinPanel = function(text1, text2, _iCurrentTotWin, callback){
        this.show();


        title.text = text1;
        message.text = text2;
        groupPanel.visible = true;

        if(_iCurrentTotWin == null){
          my.time.events.add(settings.TIMER_WAITING_TEXT_WIN_PANEL + 3000,
            function () {
                if(Lobby.Utils.objectNotNull(callback)) {
                    callback();
                }
                my.currentGameSlot.s_oGame.hideWinPanel(_iCurrentTotWin);
            }, this);
            return;
        }

        var _iIncreaseTotWin = 0;


        var _iDeltaIncreaseTotWin = _iCurrentTotWin / (settings.TIMER_RUN_ANIMATION_TEXT_WIN_PANNEL / settings.TIMER_INTERVAL_WIN_PANEL); // maximum time to do rolling text effect is 2.5 secs = 2500 ms

        if (_iDeltaIncreaseTotWin == 0.0)
            _iDeltaIncreaseTotWin = 1.0; // minimum increment




      var _iTotWinRollingId = my.time.events.loop(settings.TIMER_INTERVAL_WIN_PANEL,
        function () {

            _iIncreaseTotWin += _iDeltaIncreaseTotWin;

            if (_iIncreaseTotWin >= _iCurrentTotWin) {
                _iIncreaseTotWin = parseFloat(_iCurrentTotWin.toFixed(0));

              //my.time.events.remove(_iTotWinRollingId);
                Lobby.PhaserJS.clearTimer(my, _iTotWinRollingId);


                message.setText(Lobby.Utils.formatNumberWithCommas(_iIncreaseTotWin.toFixed(0)));



              my.time.events.add(settings.TIMER_WAITING_TEXT_WIN_PANEL,
                function () {
                    if(Lobby.Utils.objectNotNull(callback)) {
                        callback();
                    }
                    my.currentGameSlot.s_oGame.hideWinPanel(_iCurrentTotWin);

                }, this);


            } else {
                message.setText(Lobby.Utils.formatNumberWithCommas(_iIncreaseTotWin.toFixed(0)));
            }

        });



    };
    /**
     * Show Free Spin Bonus Win Panel
     * @param text1: Title Text
     * @param text2: Message text
     * @param totalFreeSpins: total FreeSpin won
     * @param totalMulti: total Multiplier won
     * @param callback: callback after show
     */
    this.showFreeSpinBonusWinPanel = function(text1, text2, totalFreeSpins, totalMulti , callback){
        this.show();

        title.text = text1;
        message.text = text2;
        groupPanel.visible = true;

        //if(totalFreeSpins == null){
        //    return;
        //}

        var _iCurTotFSWin = 0;
        var _iCurTotMultyWin = 0;
        var _iTotFSWin = totalFreeSpins;
        var _iTotMultyWin = totalMulti;

        var _iDeltaFS = _iTotFSWin / (settings.TIMER_RUN_ANIMATION_TEXT_WIN_PANNEL_FAST / settings.TIMER_INTERVAL_WIN_PANEL); // maximum time to do rolling text effect is 2.5 secs = 2500 ms
        var _iDeltaMulty = _iTotMultyWin / (settings.TIMER_RUN_ANIMATION_TEXT_WIN_PANNEL_FAST / settings.TIMER_INTERVAL_WIN_PANEL) ; // maximum time to do rolling text effect is 2.5 secs = 2500 ms

        if (_iDeltaFS == 0.0)
            _iDeltaFS = 1.0; // minimum increment



      var _iTotWinRollingId = my.time.events.loop(settings.TIMER_INTERVAL_WIN_PANEL,
          //my.time.events.loop(settings.TIMER_INTERVAL_WIN_PANEL,
        function () {


          _iCurTotFSWin += _iDeltaFS;
          _iCurTotMultyWin += _iDeltaMulty;


          if (_iCurTotFSWin >= _iTotFSWin) {
            _iCurTotFSWin = parseFloat(_iTotFSWin.toFixed(0));
            _iCurTotMultyWin = parseFloat(_iTotMultyWin.toFixed(0));

            //my.time.events.remove(_iTotWinRollingId);
              Lobby.PhaserJS.clearTimer(my, _iTotWinRollingId);
              //_oTotWinSfx.destroy();

            message.text = "\n" + _iTotFSWin.toFixed(0) + " FREE SPINS" +"\n" + _iTotMultyWin.toFixed(0) + "x MULTIPLIER";


            my.time.events.add(settings.TIMER_WAITING_TEXT_WIN_PANEL_FAST,
              function () {
                if(Lobby.Utils.objectNotNull(callback)) {
                  callback();
                }
                my.currentGameSlot.s_oGame.hideWinPanel();
              }, this);


          }

          message.text = "\n" + _iCurTotFSWin.toFixed(0) + " FREE SPINS" +"\n" + _iCurTotMultyWin.toFixed(0) + "x MULTIPLIER";



        });




    };
    /**
     * Show Panel
     */
    this.show = function(){
        Manager4Sound.turnOffAllBackgroundMusic();
        Manager4Sound.playTotalWin ();
        _bUpdate = true;
        this.playExplosion();
        settings.IS_DISABLE_ALL_BUTTON = false;
        settings.IS_PLAYING_WIN_PANEL = false;
    };
    /**
     * Play explosion animation
     */
    this.playExplosion = function(){
        var posX = Lobby.Utils.floatToIntOptimize(randomFloatBetween(0.1,0.9) * settings.CANVAS_WIDTH);
        var posY = Lobby.Utils.floatToIntOptimize(randomFloatBetween(0.1,0.9) * settings.CANVAS_HEIGHT);
        explosion.setPosition(posX, posY);
        explosion.playWithoutTimer(function(){
            var posX = Lobby.Utils.floatToIntOptimize(randomFloatBetween(0.1,0.9) * settings.CANVAS_WIDTH);
            var posY = Lobby.Utils.floatToIntOptimize(randomFloatBetween(0.1,0.9) * settings.CANVAS_HEIGHT);
            explosion.setPosition(posX, posY);
        });
    };
    /**
     * Hide Panel
     */
    this.hide = function(){
        Manager4Sound.stopTotalWin ();
        settings.IS_DISABLE_ALL_BUTTON = false;
        settings.IS_PLAYING_WIN_PANEL = false;
        groupPanel.visible = false;
        explosion.stop();
        explosion.setVisible(false);
        _bUpdate = false
    };

    this.destroy = function(){
        if(explosion){
            explosion.stop();
            explosion.destroy();
            explosion = null;
        }
    };

    this.update = function(){
    };

    this.init(my);
}
