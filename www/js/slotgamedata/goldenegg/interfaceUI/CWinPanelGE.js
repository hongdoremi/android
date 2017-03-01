/**
 * Created by Duy on 7/8/2016.
 */
/**
 * THIS CLASS MANAGES WIN PANEL UI
 * @param my: Phaser Game Object
 * @param parentGroup: Group parent
 * @constructor
 */
function CWinPanelGE(my, parentGroup){
    var groupPanel;

    var title;
    var message;
    var jellyFishTween;

    var _bUpdate = false;
    /**
     * Initialize UI
     */
    this.init = function(){
        groupPanel = my.add.group();
        my.scaleCenterGroup(groupPanel);
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
        oPanel.scale.setTo(2); //reduce 70% resolution

        oPanel.inputEnabled = true;

        //jellyFishTween = my.add.sprite(settings.CANVAS_WIDTH / 2, settings.CANVAS_HEIGHT / 2,"jelly-fish",null,groupPanel);
        //jellyFishTween.anchor.setTo(0.5);

        var xCenter = settings.CANVAS_WIDTH / 2.;
        var yCenter = 562;

        title = my.add.text(xCenter, 380, "", {
            font: "55px Skater-Girls-Rock",
            //font: "100px PassionOne-Regular",
            fill: "#fffec5",
            stroke: '#874829',
            strokeThickness: 8,
            align: "center"
        }, groupPanel);
        title.anchor.setTo(0.5);
        message = my.add.text(xCenter, 495, "", {
            font: "55px Skater-Girls-Rock",
            //font: "100px PassionOne-Regular",
            fill: "#fffec5",
            stroke: '#874829',
            strokeThickness: 8,
            align: "center"
        }, groupPanel);
        message.anchor.setTo(0.5);

        groupPanel.visible = false;
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
            my.time.events.add(settings.TIMER_WAITING_TEXT_WIN_PANEL, function () {
                if(Lobby.Utils.objectNotNull(callback)) {
                    callback();
                }
                my.currentGameSlot.s_oGame.hideWinPanel();
            });
            return;
        }

        var _iIncreaseTotWin = 0;


        var _iDeltaIncreaseTotWin = _iCurrentTotWin / (settings.TIMER_RUN_ANIMATION_TEXT_WIN_PANNEL / settings.TIMER_INTERVAL_WIN_PANEL); // maximum time to do rolling text effect is 2.5 secs = 2500 ms

        if (_iDeltaIncreaseTotWin == 0.0)
            _iDeltaIncreaseTotWin = 1.0; // minimum increment


        var _iTotWinRollingId = my.time.events.loop(settings.TIMER_INTERVAL_WIN_PANEL, function () {
            _iIncreaseTotWin += _iDeltaIncreaseTotWin;


            if (_iIncreaseTotWin >= _iCurrentTotWin) {
                _iIncreaseTotWin = parseFloat(_iCurrentTotWin.toFixed(0));

                Lobby.PhaserJS.clearTimer(my, _iTotWinRollingId);


                message.setText(Lobby.Utils.formatNumberWithCommas(_iIncreaseTotWin.toFixed(0)));



                my.time.events.add(settings.TIMER_WAITING_TEXT_WIN_PANEL, function () {
                    if(Lobby.Utils.objectNotNull(callback)) {
                        callback();
                    }
                    my.currentGameSlot.s_oGame.hideWinPanel(_iCurrentTotWin);
                });
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

        var _iTotWinRollingId = my.time.events.loop(settings.TIMER_INTERVAL_WIN_PANEL, function () {
            _iCurTotFSWin += _iDeltaFS;
            _iCurTotMultyWin += _iDeltaMulty;


            if (_iCurTotFSWin >= _iTotFSWin) {
                _iCurTotFSWin = parseFloat(_iTotFSWin.toFixed(0));
                _iCurTotMultyWin = parseFloat(_iTotMultyWin.toFixed(0));

                Lobby.PhaserJS.clearTimer(my, _iTotWinRollingId);

                //_oTotWinSfx.destroy();

                message.text = _iTotFSWin.toFixed(0) + " FREE SPINS" +"\n" + _iTotMultyWin.toFixed(0) + "x MULTIPLIER";

                my.time.events.add(settings.TIMER_WAITING_TEXT_WIN_PANEL_FAST, function () {
                    if(Lobby.Utils.objectNotNull(callback)) {
                        callback();
                    }
                    my.currentGameSlot.s_oGame.hideWinPanel();
                });
            }

            message.text = _iCurTotFSWin.toFixed(0) + " FREE SPINS" +"\n" + _iCurTotMultyWin.toFixed(0) + "x MULTIPLIER";

        });
    };
    /**
     * Show Panel
     */
    this.show = function(){
        Manager4Sound.turnOffAllBackgroundMusic();
        Manager4Sound.playTotalWin ();
        //jellyFishTween.angle = 0;
        _bUpdate = true;

        settings.IS_DISABLE_ALL_BUTTON = false;
        settings.IS_PLAYING_WIN_PANEL = false;
    };
    /**
     * Hide Panel
     */
    this.hide = function(){
        Manager4Sound.stopTotalWin ();
        settings.IS_DISABLE_ALL_BUTTON = false;
        settings.IS_PLAYING_WIN_PANEL = false;
        groupPanel.visible = false;
        _bUpdate = false
    };

    this.update = function(){
        //if(_bUpdate) {
        //    jellyFishTween.angle-=0.75;
        //}
    };

    this.init();
}
