/**
 * Created by Duy on 7/8/2016.
 */
/**
 * THIS CLASS MANAGES WIN PANEL UI
 * @param my: Phaser Game Object
 * @param parentGroup: Group parent
 * @constructor
 */
function CWinPanelBO(my, parentGroup){
    var groupPanel;

    var title;
    var message1;
    var message2;

    var _bUpdate = false;
    var yCenter;
    /**
     * Initialize UI
     */
    this.init = function(){
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

        var oPanel = my.loadBG("totalwinning",groupPanel);
        oPanel.inputEnabled = true;

        var xCenter = settings.CANVAS_WIDTH / 2.;
        yCenter = 562;

        title = my.add.text(xCenter, yCenter - 200, "", {
            font: "100px AmericanCaptain",
            //font: "100px PassionOne-Regular",
            fill: "#FFFFFF",
            stroke: '#000000',
            strokeThickness: 8,
            align: "center"
        }, groupPanel);
        title.anchor.setTo(0.5);
        message1 = my.add.text(xCenter, yCenter - 100, "", {
            font: "100px AmericanCaptain",
            //font: "100px PassionOne-Regular",
            fill: "#FFFA00",
            stroke: '#000000',
            strokeThickness: 8,
            align: "center"
        }, groupPanel);
        message1.anchor.setTo(0.5);

        message2 = my.add.text(xCenter, yCenter, "FREE SPIN", {
            font: "100px AmericanCaptain",
            //font: "100px PassionOne-Regular",
            fill: "#FFFFFF",
            stroke: '#000000',
            strokeThickness: 8,
            align: "center"
        }, groupPanel);
        message2.anchor.setTo(0.5);

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
        message1.text = text2;
        message2.visible = false;

        title.y = yCenter - 125;
        message1.y = yCenter - 25;

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


                message1.setText(Lobby.Utils.formatNumberWithCommas(_iIncreaseTotWin.toFixed(0)));



                my.time.events.add(settings.TIMER_WAITING_TEXT_WIN_PANEL, function () {
                    if(Lobby.Utils.objectNotNull(callback)) {
                        callback();
                    }
                    my.currentGameSlot.s_oGame.hideWinPanel(_iCurrentTotWin);
                });
            } else {
                message1.setText(Lobby.Utils.formatNumberWithCommas(_iIncreaseTotWin.toFixed(0)));
            }

        });
    };
    /**
     * Show Free Spin Win Panel
     * @param totalFreeSpins: total Free Spin won
     * @param callback: callback after show
     */
    this.showFreeSpinBonusWinPanel = function(totalFreeSpins, callback){
        this.show();

        title.text = "YOU WON";
        message1.text = totalFreeSpins;
        message2.visible = true;

        title.y = yCenter - 200;
        message1.y = yCenter - 100;
        message2.y = yCenter;

        groupPanel.visible = true;


        my.time.events.add(settings.TIMER_RUN_ANIMATION_TEXT_WIN_PANNEL, function () {
            if(Lobby.Utils.objectNotNull(callback)) {
                callback();
            }
            my.currentGameSlot.s_oGame.hideWinPanel();
        });
    };
    /**
     * Show Panel
     */
    this.show = function(){
        Manager4Sound.turnOffAllBackgroundMusic();
        Manager4Sound.playTotalWin ();
        _bUpdate = true;

        settings.IS_DISABLE_ALL_BUTTON = false;
        settings.IS_PLAYING_WIN_PANEL = false;
    };
    /**
     * Hide Panel
     */
    this.hide = function(){
        Manager4Sound.stopTotalWin ();
        Manager4Sound.playBackgroundMusic();
        settings.IS_DISABLE_ALL_BUTTON = false;
        settings.IS_PLAYING_WIN_PANEL = false;
        groupPanel.visible = false;
        _bUpdate = false
    };

    this.update = function(){
    };

    this.init();
}
