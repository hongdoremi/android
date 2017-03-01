/**
 * Created by Duy on 7/8/2016.
 */
/**
 * THIS CLASS MANAGES WIN PANEL UI
 * @param my: Phaser Game Object
 * @param parentGroup: Group parent
 * @constructor
 */
function CWinPanelPO(my, parentGroup){
    var group;
    var groupPanel;
    var groupBonusPanel;

    var title;
    var message;

    var textWin1;
    var textWin2;
    var textTotalWin;
    //var jellyFishTween;

    var _bUpdate = false;
    var yCenter;
    /**
     * Initialize UI
     */
    this.init = function(){
        group = my.add.group();
        my.scaleCenterGroup(group);
        //if(ManagerForScale.is3x4resolution()){
        //    group.y-= 10;
        //}
        parentGroup.add(group);


        var oPanel = my.add.sprite(0,0,"totalwinning",null,group);
        oPanel.inputEnabled = true;

        groupPanel = my.add.group();
        group.add(groupPanel);

        groupBonusPanel = my.add.group();
        group.add(groupBonusPanel);

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

        //jellyFishTween = my.add.sprite(settings.CANVAS_WIDTH / 2, settings.CANVAS_HEIGHT / 2,"jelly-fish",null,groupPanel);
        //jellyFishTween.anchor.setTo(0.5);

        var xCenter = settings.CANVAS_WIDTH / 2.;
        yCenter = oPanel.x + oPanel.height/2 + 50;

        title = my.add.text(xCenter, yCenter - 50, "", {
            font: "80px ADONAIS",
            //font: "100px PassionOne-Regular",
            fill: "#fffec5",
            stroke: '#874829',
            strokeThickness: 8,
            align: "center"
        }, groupPanel);
        title.anchor.setTo(0.5);
        message = my.add.text(xCenter, yCenter, "", {
            font: "80px ADONAIS",
            //font: "100px PassionOne-Regular",
            fill: "#FFFEC5",
            stroke: '#874829',
            strokeThickness: 8,
            align: "center",
        }, groupPanel);
        //message.lineSpacing = -30;
        message.anchor.setTo(0.5);

        textWin1 = my.add.text(xCenter - 225, yCenter - 65, "BONUS 1 WON \n 0", {
            font: "45px ADONAIS",
            //font: "100px PassionOne-Regular",
            fill: "#FFFEC5",
            stroke: '#874829',
            strokeThickness: 8,
            align: "center"
        }, groupBonusPanel);
        //textWin1.lineSpacing = -30;
        textWin1.anchor.setTo(0.5);

        textWin2= my.add.text(xCenter + 225, yCenter - 65, "BONUS 2 WON \n 0", {
            font: "45px ADONAIS",
            //font: "100px PassionOne-Regular",
            fill: "#FFFEC5",
            stroke: '#874829',
            strokeThickness: 8,
            align: "center"
        }, groupBonusPanel);
        //textWin2.lineSpacing = -30;
        textWin2.anchor.setTo(0.5);

        textTotalWin= my.add.text(xCenter, yCenter + 60, "TOTAL BONUS WON 0", {
            font: "50px ADONAIS",
            //font: "100px PassionOne-Regular",
            fill: "#FFFEC5",
            stroke: '#874829',
            strokeThickness: 8,
            align: "center"
        }, groupBonusPanel);
        textTotalWin.anchor.setTo(0.5);

        group.visible = false;
        groupPanel.visible = false;
        groupBonusPanel.visible = false;
    };
    /**
     * Show Win Panel Function
     * @param text1: Title Text
     * @param text2: Message text
     * @param _iCurrentTotWin: Total Win
     * @param callback: callback after show
     * @param isFreeSpin: boolen - true if this is Free Spin Win Panel
     */
    this.showWinPanel = function(text1, text2, _iCurrentTotWin, callback, isFreeSpin){
        this.show();


        if(isFreeSpin){
            title.visible = false;
            message.text = text1 + "\n" + text2;
            message.fontSize = 55;
            message.y = yCenter;
        }else{
            title.visible = true;
            title.text = text1;
            message.text = text2;
            message.fontSize = 80;
            message.y = yCenter + 50;
        }
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



                message.text = Lobby.Utils.formatNumberWithCommas(_iIncreaseTotWin.toFixed(0));



                my.time.events.add(settings.TIMER_WAITING_TEXT_WIN_PANEL, function () {
                    if(Lobby.Utils.objectNotNull(callback)) {
                        callback();
                    }
                    my.currentGameSlot.s_oGame.hideWinPanel(_iCurrentTotWin);
                });
            } else {
                message.text = Lobby.Utils.formatNumberWithCommas(_iIncreaseTotWin.toFixed(0));
            }

        });
    };
    /**
     * Show BONUS STAGE 2 WIN PANEL
     * @param totalWin1: total Win on Bonus Stage 1
     * @param totalWin2: total Win on Bonus Stage 2
     * @param callback: callback after show
     */
    this.showBonusWinPanel = function(totalWin1, totalWin2 , callback){
        this.show();

        //title.text = text1;
        //message.text = text2;
        groupBonusPanel.visible = true;

        //if(totalFreeSpins == null){
        //    return;
        //}

        var _iCurWin1 = 0;
        var iCurWin2 = 0;
        var iCurTotWin = 0;
        var _iWin1 = totalWin1;
        var _iWin2 = totalWin2;
        var _iTotWin = totalWin1 + totalWin2;

        var _iDeltaWin1 = _iWin1 / (settings.TIMER_RUN_ANIMATION_TEXT_WIN_PANNEL_FAST / settings.TIMER_INTERVAL_WIN_PANEL); // maximum time to do rolling text effect is 2.5 secs = 2500 ms
        var _iDeltaWin2 = _iWin2 / (settings.TIMER_RUN_ANIMATION_TEXT_WIN_PANNEL_FAST / settings.TIMER_INTERVAL_WIN_PANEL) ; // maximum time to do rolling text effect is 2.5 secs = 2500 ms
        var _iDeltaTotWin = _iTotWin / (settings.TIMER_RUN_ANIMATION_TEXT_WIN_PANNEL_FAST / settings.TIMER_INTERVAL_WIN_PANEL) ; // maximum time to do rolling text effect is 2.5 secs = 2500 ms

        if (_iDeltaWin1 == 0.0)
            _iDeltaWin1 = 1.0; // minimum increment
        if (_iDeltaWin2 == 0.0)
            _iDeltaWin2 = 1.0; // minimum increment
        if (_iDeltaTotWin == 0.0)
            _iDeltaTotWin = 1.0; // minimum increment

        var _iTotWinRollingId = my.time.events.loop(settings.TIMER_INTERVAL_WIN_PANEL, function () {
            _iCurWin1 += _iDeltaWin1;
            iCurWin2 += _iDeltaWin2;
            iCurTotWin += _iDeltaTotWin;


            if (_iCurWin1 >= _iWin1) {
                _iCurWin1 = parseFloat(_iWin1.toFixed(0));
                iCurWin2 = parseFloat(_iWin2.toFixed(0));
                iCurTotWin = parseFloat(_iTotWin.toFixed(0));

                Lobby.PhaserJS.clearTimer(my, _iTotWinRollingId);
                //_oTotWinSfx.destroy();

                textWin1.text = "BONUS 1 WON\n" + Lobby.Utils.formatNumberWithCommas(_iWin1.toFixed(0));
                textWin2.text = "BONUS 2 WON\n" + Lobby.Utils.formatNumberWithCommas(_iWin2.toFixed(0));
                textTotalWin.text = "TOTAL BONUS WON " + Lobby.Utils.formatNumberWithCommas(_iTotWin.toFixed(0));

                my.time.events.add(settings.TIMER_WAITING_TEXT_WIN_PANEL_FAST, function () {
                    if(Lobby.Utils.objectNotNull(callback)) {
                        callback();
                    }
                    my.currentGameSlot.s_oGame.hideWinPanel(_iTotWin);
                });
            }

            textWin1.text = "BONUS 1 WON\n" + Lobby.Utils.formatNumberWithCommas(_iCurWin1.toFixed(0));
            textWin2.text = "BONUS 2 WON\n" + Lobby.Utils.formatNumberWithCommas(iCurWin2.toFixed(0));
            textTotalWin.text = "TOTAL BONUS WON " + Lobby.Utils.formatNumberWithCommas(iCurTotWin.toFixed(0));

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
        group.visible = true;
    };
    /**
     * Hide Panel
     */
    this.hide = function(){
        Manager4Sound.stopTotalWin ();
        settings.IS_DISABLE_ALL_BUTTON = false;
        settings.IS_PLAYING_WIN_PANEL = false;
        group.visible = false;
        groupBonusPanel.visible = false;
        groupPanel.visible = false;
        _bUpdate = false
    };

    this.init();
}
