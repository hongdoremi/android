/**
 * Created by Duy on 7/8/2016.
 */
/**
 * THIS CLASS MANAGES WIN PANEL UI
 * @param my: Phaser Game Object
 * @param parentGroup: Group parent
 * @constructor
 */
function CWinPanelRE(my, parentGroup){
    var group;
    var groupPanel;
    var groupBonusPanel;

    var title;
    var message;

    var textWin1;
    var textWin2;
    var textTotalWin;

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


        var oPanel = my.add.sprite(settings.CANVAS_WIDTH/2,settings.CANVAS_HEIGHT/2,"totalwinning",null,group);
        oPanel.scale.setTo(1.5,1);
        oPanel.anchor.setTo(0.5);
        oPanel.inputEnabled = true;

        groupPanel = my.add.group();
        group.add(groupPanel);

        groupBonusPanel = my.add.group();
        group.add(groupBonusPanel);


        var xCenter = settings.CANVAS_WIDTH / 2. + 15;
        yCenter = settings.CANVAS_HEIGHT/2;

        title = my.add.text(xCenter, yCenter - 75, "", {
            font: "80px Dalek",
            //font: "100px PassionOne-Regular",
            fill: "#fffec5",
            stroke: '#874829',
            strokeThickness: 8,
            align: "center"
        }, groupPanel);
        title.anchor.setTo(0.5);
        message = my.add.text(xCenter, yCenter + 25, "", {
            font: "80px Dalek",
            //font: "100px PassionOne-Regular",
            fill: "#FFFEC5",
            stroke: '#874829',
            strokeThickness: 8,
            align: "center"
        }, groupPanel);
        //message.lineSpacing = -30;
        message.anchor.setTo(0.5);

        textWin1 = my.add.text(xCenter - 250, yCenter - 100, "TOTAL BET\n0", {
            font: "55px Dalek",
            //font: "100px PassionOne-Regular",
            fill: "#FFFEC5",
            stroke: '#874829',
            strokeThickness: 8,
            align: "center"
        }, groupBonusPanel);
        //textWin1.lineSpacing = -30;
        textWin1.anchor.setTo(0.5);

        textWin2= my.add.text(xCenter + 250, yCenter - 100, "MULTIPLIER\n0", {
            font: "55px Dalek",
            //font: "100px PassionOne-Regular",
            fill: "#FFFEC5",
            stroke: '#874829',
            strokeThickness: 8,
            align: "center"
        }, groupBonusPanel);
        //textWin2.lineSpacing = -30;
        textWin2.anchor.setTo(0.5);

        textTotalWin= my.add.text(xCenter, yCenter + 80, "YOU WON\n0", {
            font: "75px Dalek",
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


        var _iTotWinRollingId =  my.time.events.loop(settings.TIMER_INTERVAL_WIN_PANEL, function () {
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
     * Show Bonus Win Panel
     * @param totalWin: win amount
     * @param totalMulty: total multiplier
     * @param callback: callback after show
     */
    this.showBonusWinPanel = function(totalWin, totalMulty , callback){
        this.show();

        groupBonusPanel.visible = true;

        var iCurTotWin = 0;
        var _iBet = (totalWin/totalMulty).toFixed(0);
        textWin1.text = "TOTAL BET\n" + Lobby.Utils.formatNumberWithCommas(_iBet);
        textWin2.text = "MULTIPLIER\n" + Lobby.Utils.formatNumberWithCommas(totalMulty.toFixed(0));
        var _iTotWin = totalWin;

        var _iDeltaTotWin = _iTotWin / (settings.TIMER_RUN_ANIMATION_TEXT_WIN_PANNEL / settings.TIMER_INTERVAL_WIN_PANEL) ; // maximum time to do rolling text effect is 2.5 secs = 2500 ms

        if (_iDeltaTotWin == 0.0)
            _iDeltaTotWin = 1.0; // minimum increment

        var _iTotWinRollingId = my.time.events.loop(settings.TIMER_INTERVAL_WIN_PANEL, function () {
            iCurTotWin += _iDeltaTotWin;


            if (iCurTotWin >= _iTotWin) {
                iCurTotWin = parseFloat(_iTotWin.toFixed(0));

                Lobby.PhaserJS.clearTimer(my, _iTotWinRollingId);

                textTotalWin.text = "YOU WON\n" + Lobby.Utils.formatNumberWithCommas(_iTotWin.toFixed(0));

                my.time.events.add(settings.TIMER_WAITING_TEXT_WIN_PANEL, function () {
                    if(Lobby.Utils.objectNotNull(callback)) {
                        callback();
                    }
                    my.currentGameSlot.s_oGame.hideWinPanel(_iTotWin);
                });
            }
            textTotalWin.text = "YOU WON\n" + Lobby.Utils.formatNumberWithCommas(iCurTotWin.toFixed(0));

        });
    };
    /**
     * Show Panel
     */
    this.show = function(){
        Manager4Sound.turnOffAllBackgroundMusic();
        Manager4Sound.playTotalWin ();
        group.visible = true;
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
        group.visible = false;
        groupPanel.visible = false;
        groupBonusPanel.visible = false;
        _bUpdate = false
    };

    this.init();
}
