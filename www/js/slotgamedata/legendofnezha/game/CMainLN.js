/**
 * Created by Duy on 7/6/2016.
 */
/**
 * CLASS CREATE GROUP GAME, MANAGES CALL API AND IT'S THE MAIN CLASS
 * @param my: Phaser Game Object
 * @param oData: SOME CUSTOM DATA
 * @constructor
 */
function CMainLN(my, oData) {

    var _iCurResource = 0;
    var _iCurBonus;
    var RESOURCE_TO_LOAD = 0;
    var _iState = settings.STATE_LOADING;
    //var _iTimeElaps = settings.TIME_REFRESH_JACKPOT;

    var _oData;
    var _oPreloader;
    var _oMenu;
    var _oHelp;
    var _oGame = null;
    var _oBlock;

    var arrayOfSoundLoad = null;

    var textLoading;

    var that = this;


    this.s_aStartingWheel = null;

    this.s_bTablet = false;
    this.s_bAudioActive = true;
    this.s_iCntTime = 0;
    this.s_iTimeElaps = 0;
    this.s_iPrevTime = 0;
    this.s_iCntFps = 0;
    this.s_iCurFps = 0;
    this.s_oSoundTrack = null;
    this.s_oSoundTrackBonusFreeSpin = null;
    this.s_oSoundTrackDoubleUp = null;

    this.s_oStage = null;
    this.s_oAttachSection = null;

    this.s_szFunPlayKey = null;
    this.s_szRealPlayKey = null;
    this.s_iCredit = null;
    this.s_iCoin = null;
    this.s_szCurrency = null;
    this.s_iConversion = null;
    this.s_aMultiply = null;
    this.s_iCurWin = 0;
    this.s_iTotBet = 0;
    this.s_iBet = null;
    this.s_iMp = null;
    this.s_iLines = null;

    this.s_iLottoBall = null;
    this.s_iTid = null;
    this.s_iMultiply = 0;
    this.s_szBonusKey = null;
    this.s_oBonusToRestore = null;
    this.s_bRealPlay = true;
    this.s_iJackPotId = 2;
    this.s_iTimeStamp = 0;
    this.infoPageArray = [];
    this.manager4Network = null;
    this.readyToSpin = false;
    this.loaderSymbol = null;

    this.gameContainer = null;

    var that = this;
    var preLoader;
    /**
     * Initialize - Create Game group and show Loading UI
     */
    this.initContainer = function () {
        this.GameConstant = new GameConstant("Nezha");

        if(LobbyConfig.isTestAlgorithmMode) {
            // use for check graphic game when wrong
            LobbyConfig.isEnterGame = true;
        }
        this.manager4Network = new Manager4Network(my);
        Manager4Sound.init(my);
        this.s_oStage = my.gameSlotGroup;

        this.s_oStage.scale.setTo(LobbyConfig.realWidth*ManagerForScale.getScale()/1920);
        my.adjustGroupPositionAfterScale(this.s_oStage,ManagerForScale.getScale(),{width:LobbyConfig.realWidth,height:LobbyConfig.realHeight},null);

        //INIT SLOT SETTINGS CLASS
        this.gameContainer = my.add.group();
        this.s_oStage.add(this.gameContainer);

        this.s_oAttachSection = my.add.group();
        this.s_oStage.add(this.s_oAttachSection);
        new CSlotSettingsLN(my);
        var background = my.add.sprite(0,0,'bg-loading',null,this.s_oAttachSection);
      background.body = null;
        background.inputEnabled = true;

        preLoader = my.add.sprite(settings.CANVAS_WIDTH/2, 980, 'pre-loader', null, this.s_oAttachSection);
      preLoader.body = null;
        preLoader.anchor.setTo(0.5);
        preLoader.scale.setTo(4);
        textLoading = my.add.text(preLoader.x, preLoader.y, "0%", {
            font: "60px PassionOne-Regular",
            fill: "#FFFFFF"
        }, this.s_oAttachSection);
        textLoading.anchor.setTo(0.5);

        my.scaleCenterGroup(this.s_oAttachSection,1,null);

        this.readyToSpin = false;
        this.loadLinesAndSymbol();
    };
    /**
     * Get current CGAME OBJECT
     * @returns {*} CGAME Object
     */
    this.getGame = function () {
        if (LobbyConfig.isDebug) {
            console.log('CMain getGame');
        }
        return _oGame;
    };

    /**
     * Function called when begin load resources
     */
    this.loadStart = function(){
    };

    /**
     * Function called when all sound has loaded
     */
    this.soundLoaded = function () {
        that.allSoundLoaded = true;
        that.gotoGame();
    };

    /**
     * Set current Bonus Index
     * @param currentBonus: bonus index
     */
    this.setCurrentBonus = function (currentBonus) {
        if (LobbyConfig.isDebug) {
            console.log('CMain setCurrentBonus');
        }
        _iCurBonus = currentBonus;
    };

    /**
     * Load all sound
     * @private
     */
    this._initSounds = function () {
        if (LobbyConfig.isDebug) {
            console.log('CMain _initSounds');
        }
        ManagerForSound.addSoundToQueue('soundtrack','img/slotgamedata/legendofnezha/sounds/soundtrack.mp3');
        ManagerForSound.addSoundToQueue('soundtrack_bonus','img/slotgamedata/legendofnezha/sounds/soundtrack_bonus_freespin.mp3');
        ManagerForSound.addSoundToQueue('reel_stop','img/slotgamedata/legendofnezha/sounds/reelstop.mp3');
        ManagerForSound.addSoundToQueue('spin','img/slotgamedata/legendofnezha/sounds/spin.mp3');
        ManagerForSound.addSoundToQueue('tot_win','img/slotgamedata/legendofnezha/sounds/totalwinning.mp3');
        ManagerForSound.addSoundToQueue('bonuspalace_button_click','img/slotgamedata/legendofnezha/sounds/item_select_bonus_palace.mp3');
        ManagerForSound.addSoundToQueue('bonusbattle_button_click','img/slotgamedata/legendofnezha/sounds/item_select_bonus_battle.mp3');
        ManagerForSound.addSoundToQueue('symbol_0_1_2','img/slotgamedata/legendofnezha/sounds/symbol_0_1_2.mp3');
        ManagerForSound.addSoundToQueue('symbol_3_4','img/slotgamedata/legendofnezha/sounds/symbol_3_4.mp3');
        ManagerForSound.addSoundToQueue('symbol_5_6','img/slotgamedata/legendofnezha/sounds/symbol_5_6.mp3');
        ManagerForSound.addSoundToQueue('symbol_7','img/slotgamedata/legendofnezha/sounds/symbol_7.mp3');
        ManagerForSound.addSoundToQueue('symbol_8','img/slotgamedata/legendofnezha/sounds/symbol_8.mp3');
        ManagerForSound.addSoundToQueue('symbol_9','img/slotgamedata/legendofnezha/sounds/symbol_9.mp3');
        ManagerForSound.addSoundToQueue('symbol_10','img/slotgamedata/legendofnezha/sounds/symbol_10.mp3');

        ManagerForSound.startLoadSoundFromQueue(my, this.soundLoaded, true);
    };

    /**
     * Load all image except lines and animation symbol
     * @private
     */
    this._loadImages = function () {
        if (that.GameConstant.Account.funMode) {
            that.manager4Network.callGetFunPlayKey();
        } else {
            that.manager4Network.callRealPlay();
        }

        if (LobbyConfig.isDebug) {
            console.log('CMain _loadImages');
        }

        for (var i = 0; i < 18; i++) {
            ManagerForImage.loadSprite(my, 'nezha_freespin_' + i, 'img/slotgamedata/legendofnezha/sprites/video/nezha_avatar/nezha_freespin/Freespin-Nezha_' + i + '.png?' + LobbyConfig.versionDisplay);
        }
        for (var i = 0; i < 14; i++) {
            ManagerForImage.loadSprite(my, 'nezha_idle_' + i, 'img/slotgamedata/legendofnezha/sprites/video/nezha_avatar/nezha_idle/Ui_Nezha_idle_' + i + '.png?' + LobbyConfig.versionDisplay);
        }

        ManagerForImage.loadSprite(my, 'game-bg', 'img/slotgamedata/legendofnezha/sprites/game-bg.jpg?' + LobbyConfig.versionDisplay);
        ManagerForImage.loadSprite(my, 'reels', 'img/slotgamedata/legendofnezha/sprites/reel.png?' + LobbyConfig.versionDisplay);

        ManagerForImage.loadSpriteSheet(my,
            'but_spin', 'img/slotgamedata/legendofnezha/sprites/but_spin.png?' + LobbyConfig.versionDisplay, 237, 303, 4
        );
        ManagerForImage.loadSprite(my,
            'start_bonus', 'img/slotgamedata/legendofnezha/sprites/start_bonus.png?' + LobbyConfig.versionDisplay
        );
        ManagerForImage.loadSprite(my,
            'start_freespin', 'img/slotgamedata/legendofnezha/sprites/start_freespin.png?' + LobbyConfig.versionDisplay
        );

        ManagerForImage.loadSprite(my, 'amount-win', 'img/slotgamedata/legendofnezha/sprites/amount-win.png?' + LobbyConfig.versionDisplay);
        ManagerForImage.loadSprite(my, 'box-freespins-bonus', 'img/slotgamedata/legendofnezha/sprites/box-freespins-bonus.png?' + LobbyConfig.versionDisplay);


          for (var i = 0; i <= 12; i++) {
            ManagerForImage.loadSprite(my, 'sea_' + i, 'img/slotgamedata/legendofnezha/sprites/video/sea/BG_HD_' + i + '.png?' + LobbyConfig.versionDisplay);
          }

        ManagerForImage.loadSprite(my, 'totalwinning', 'img/slotgamedata/legendofnezha/sprites/totalwinning.png?' + LobbyConfig.versionDisplay);
        ManagerForImage.loadSprite(my, 'freespins-en', 'img/slotgamedata/legendofnezha/sprites/freespins-en.png?' + LobbyConfig.versionDisplay);


        ManagerForImage.loadAtlas(my,
            'static_symbol', 'img/slotgamedata/legendofnezha/sprites/atlas/static_symbol.png?' + LobbyConfig.versionDisplay,
            'img/slotgamedata/legendofnezha/sprites/atlas/static_symbol.json?' + LobbyConfig.versionDisplay
        );

        this.infoPageArray = [];
        for (var j = 1; j < settings.NUM_INFO_PAGES + 1; j++) {
            ManagerForImage.loadSprite(my, 'info_LN_' + j, 'img/slotgamedata/legendofnezha/sprites/info_' + j + '.jpg?' + LobbyConfig.versionDisplay);
            this.infoPageArray.push('info_LN_' + j);
        }
        ManagerForImage.loadSprite(my, 'dragon_body1', 'img/slotgamedata/legendofnezha/sprites/video/freespin/body/Freespin-DragonBody_07.png?' + LobbyConfig.versionDisplay);

        ManagerForImage.loadSprite(my, 'dragon_body2', 'img/slotgamedata/legendofnezha/sprites/video/freespin/body/Freespin-DragonBody2_07.png?' + LobbyConfig.versionDisplay);

        ManagerForImage.loadSprite(my, 'dragon_head', 'img/slotgamedata/legendofnezha/sprites/video/freespin/head/Freespin-DragonHead_11.png?' + LobbyConfig.versionDisplay);



          for (var i = 0; i <= 13; i++) {
            ManagerForImage.loadSprite(my, 'freespin_wild_expanded_' + i, 'img/slotgamedata/legendofnezha/sprites/video/freespin/wild/expanded/Dragon_ExpandingWild_action_HD_' + i + '.png?' + LobbyConfig.versionDisplay);
          }
          for (var i = 0; i <= 10; i++) {
            ManagerForImage.loadSprite(my, 'freespin_wild_idle_' + i, 'img/slotgamedata/legendofnezha/sprites/video/freespin/wild/idle/Dragon_ExpandingWild_idle_HD_' + i + '.png?' + LobbyConfig.versionDisplay);
          }


        for (var i = 0; i <= 14; i++) {
            ManagerForImage.loadSprite(my, 'explode_effect_' + i, 'img/slotgamedata/legendofnezha/sprites/atlas/explosion_bonus_palace/Bonus-01-weaponExplodeEffects_' + (i+1) + '.png?' + LobbyConfig.versionDisplay);
        }

    };
    /**
     * Load lines and animation symbol
     */
    this.loadLinesAndSymbol = function(){
        this.loaderSymbol = new Phaser.Loader(my);
        this.loaderSymbol.onLoadComplete.addOnce(this._onSymbolLoaded);

        ManagerForImage.loadSprite(this.loaderSymbol, 'line_1_2_3', 'img/slotgamedata/legendofnezha/sprites/lines/line_1_2_3.png?' + LobbyConfig.versionDisplay, true);
        ManagerForImage.loadSprite(this.loaderSymbol, 'line_4', 'img/slotgamedata/legendofnezha/sprites/lines/line_4.png?' + LobbyConfig.versionDisplay, true);
        ManagerForImage.loadSprite(this.loaderSymbol, 'line_5', 'img/slotgamedata/legendofnezha/sprites/lines/line_5.png?' + LobbyConfig.versionDisplay, true);
        ManagerForImage.loadSprite(this.loaderSymbol, 'line_6_15', 'img/slotgamedata/legendofnezha/sprites/lines/line_6_15.png?' + LobbyConfig.versionDisplay, true);
        ManagerForImage.loadSprite(this.loaderSymbol, 'line_7_14', 'img/slotgamedata/legendofnezha/sprites/lines/line_7_14.png?' + LobbyConfig.versionDisplay, true);
        ManagerForImage.loadSprite(this.loaderSymbol, 'line_8_16', 'img/slotgamedata/legendofnezha/sprites/lines/line_8_16.png?' + LobbyConfig.versionDisplay, true);
        ManagerForImage.loadSprite(this.loaderSymbol, 'line_9_17', 'img/slotgamedata/legendofnezha/sprites/lines/line_9_17.png?' + LobbyConfig.versionDisplay, true);
        ManagerForImage.loadSprite(this.loaderSymbol, 'line_10_13', 'img/slotgamedata/legendofnezha/sprites/lines/line_10_13.png?' + LobbyConfig.versionDisplay, true);
        ManagerForImage.loadSprite(this.loaderSymbol, 'line_11_12', 'img/slotgamedata/legendofnezha/sprites/lines/line_11_12.png?' + LobbyConfig.versionDisplay, true);

        for (var i = 18; i <= settings.NUM_PAYLINES; i++) {
            ManagerForImage.loadSprite(this.loaderSymbol, 'line_' + i, 'img/slotgamedata/legendofnezha/sprites/lines/line_' + i + '.png?' + LobbyConfig.versionDisplay, true);
        }

        var i = settings.NUM_SYMBOLS; while (i--) {
            var k = my.slotSettings.s_iSymbolAnims[i]; while (k--) {
                ManagerForImage.loadSprite(this.loaderSymbol, 'symbolLN' + i + '_' + (k + 1),
                    'img/slotgamedata/legendofnezha/sprites/anim_symbol_' + i + '/symbol' + i + '_' + (k + 1) + '.png?' + LobbyConfig.versionDisplay, true);

            }
        }
        //for (var i = 0; i < ; i++) {
        //    for (var k = 0; k < ; k++) { }
        //}

        this.loaderSymbol.start();
    };

    /**
     * Function called when an image loaded
     * @param progress: loading progress value
     * @param cacheKey: deprecated
     * @param success: deprecated
     * @param totalLoaded: deprecated
     * @param totalFiles: deprecated
     * @private
     */
    this._onImagesLoaded = function (progress, cacheKey, success, totalLoaded, totalFiles) {
        textLoading.text = progress + "%";
        if(progress > 98){
            textLoading.text = "99%";
        }
    };

    /**
     * Function called when all image loaded
     */
    this.allResourcesLoaded = function () {
        if(
            Lobby.Utils.objectNotNull(my.currentGameSlot) &&
            Lobby.Utils.isFunction(my.currentGameSlot.allResourcesLoaded)) {
            my.load.onLoadComplete.remove(my.currentGameSlot.allResourcesLoaded, my);
        }
        //SOUND
        Manager4Sound.initializeAllBackgroundSound();
        Manager4Sound.turnOffAllBackgroundMusic();

        that.allImagesLoaded = true;
        that.gotoGame();
    };
    /**
     * Function called when lines and symbol has loaded
     * @private
     */
    this._onSymbolLoaded = function () {
        if (LobbyConfig.isDebug) {
            //console.log('CMain _onSymbolLoaded');
        }
        that.readyToSpin = true;
        if(_oGame != null){
            _oGame.initLines();
        }
    };
    /**
     * Deprecated
     * @private
     */
    this._onAllSymbolLoaded = function () {
        if (LobbyConfig.isDebug) {
            console.log('CMain _onAllSymbolLoaded');
        }

    };
    /**
     * Show block when call API - deprecated
     */
    this.showBlock = function () {
        if (LobbyConfig.isDebug) {
            console.log('CMain showBlock');
        }
        //_oBlock.visible = true;
    };
    /**
     * Hide block when call API - deprecated
     */
    this.hideBlock = function () {

        //_oBlock.visible = false;
    };
    /**
     * Deprecated
     */
    this.gotoMenu = function () {
        this.GameConstant = null;
        this.manager4Network = null;
        _oGame.onExit();
        _oGame = null;
    };
    /**
     * CREATE CGAME OBJECT
     */
    this.gotoGame = function () {
        if(that.allImagesLoaded && that.finishAPI && that.allSoundLoaded) {
            _oGame = new CGameLN(my, this.gameContainer, _oData);
        }
    };
    /**
     * Destroy loading UI
     */
    this.destroyLoading = function(){

        var delayTime = 1000;
        if(Lobby.Utils.isOldSchoolDevice()){
            delayTime = 3000;
        }
        _iState = settings.STATE_PREPARE;
        my.time.events.add(delayTime, function() {
            my.prepareGoToGame();
            my.stopPreloadAnimation();
            _iState = settings.STATE_GAME;

            if(LobbyUserData.dataTutorial.isPlayingTutorial){
                LobbyC.MainMenu.createLayerAndTurnOffScrollForNewPopup();
                if(LobbyUserData.dataTutorial.currentStep > LobbyConstant.Constant4Tutorial.StepChangeBet)
                {
                    LobbyC.GameSlot.getCurrentGame().s_oGame.getFooter().reloadBet(3000);
                }
                if((LobbyUserData.dataTutorial.isCreateUserFromThisDevice == 1
                    || LobbyUserData.dataTutorial.isFirstLogin == 1 && LobbyUserData.dataTutorial.isCompleteSuccessTutorialRequest == 0))
                {
                    LobbyC.MainMenu._userCoinText.text = "100,000";
                }
                LobbyC.MainMenu.gotoStep(LobbyUserData.dataTutorial.currentStep);
            }

            that.s_oAttachSection.removeAll();
        });
    };
    /**
     * Deprecated
     */
    this.gotoHelp = function () {
        if (LobbyConfig.isDebug) {
            console.log('CMain gotoHelp');
        }
        _oHelp = new CHelp();
        _iState = settings.STATE_HELP;
    };

    /**
     * Update function
     * @private
     */
    this._update = function () {
        var iCurTime = my.time.time;
        this.s_iTimeElaps = iCurTime - this.s_iPrevTime;
        this.s_iPrevTime = iCurTime;

        //console.log('call this._update');
        if (_iState === settings.STATE_GAME) {
            //console.log('before call _oGame.update');
            _oGame.update();
        }else if(_iState == settings.STATE_PREPARE){
            _oGame.update();
            preLoader.angle += 10;
        }else{
            preLoader.angle += 10;
        }

    };

    /////////////////API CALLBACKS//////////////////

    /**
     * Deprecated
     * @param szKey
     */
    this.onGetFunPlayKeyReceived = function (szKey) {
        if (LobbyConfig.isDebug) {
            console.log('CMain onGetFunPlayKeyReceived');
        }
        this.s_bRealPlay = false;
        s_szFunPlayKey = szKey;

        this.manager4Network.callGetBalance(s_szFunPlayKey);
    };
    /**
     * Function called when receiving user's key for slot game after request
     * @param szKey
     */
    this.onGetRealPlayKeyReceived = function (szKey) {
        if (LobbyConfig.isDebug) {
            console.log('CMain onGetRealPlayKeyReceived');
        }
        this.s_bRealPlay = true;
        this.s_szRealPlayKey = szKey;
        this.manager4Network.callGetBalance(this.s_szRealPlayKey);
    };
    /**
     * Function called when received user's balance after request
     * @param szCredit: user's credit (balance)
     * @param szCurrency: deprecated
     */
    this.onBalanceReceived = function (szCredit, szCurrency) {
        if (LobbyConfig.isDebug) {
            console.log('CMain onBalanceReceived');
        }
        this.s_iCredit = parseFloat(szCredit);
        this.s_iCoin = 0;

        this.s_szCurrency = szCurrency;

        // 2016-03-24: Phuoc: không hiển thị đơn vị tiền
        this.s_szCurrency = '';

        //this.s_iConversion = parseFloat(szConversion);

        if (this.s_szRealPlayKey !== null) {
            this.manager4Network.callGetBets(this.s_szRealPlayKey);
        } else {
            this.manager4Network.callGetBets(s_szFunPlayKey);
        }

    };

    /**
     * Function called when received Bets Info after request
     * @param oXmlDoc: XML Document received
     */
    this.onBetsReceived = function (oXmlDoc) {
        if (LobbyConfig.isDebug) {
            console.log('CMain onBetsReceived');
        }
        var szVal = null;
        var szWheel = null;
        var szLottoBall = null;
        var szTid = null;

        for (var i = 0; i < oXmlDoc.getElementsByTagName('bets')[0].attributes.length; i++) {
            switch (oXmlDoc.getElementsByTagName('bets')[0].attributes[i].name) {
                case 'multiply':
                {
                    this.s_iMultiply = parseInt(oXmlDoc.getElementsByTagName('bets')[0].attributes[i].value);
                    break;
                }
                case 'wheel':
                {
                    szWheel = oXmlDoc.getElementsByTagName('bets')[0].attributes[i].value;
                    break;
                }
                case 'lottoball':
                {
                    szLottoBall = oXmlDoc.getElementsByTagName('bets')[0].attributes[i].value;
                    break;
                }
                case 'tid':
                {
                    szTid = oXmlDoc.getElementsByTagName('bets')[0].attributes[i].value;
                    break;
                }
                case 'val':
                {
                    szVal = oXmlDoc.getElementsByTagName('bets')[0].attributes[i].value;
                    break;
                }
            }
        }

        var aVals = szVal.split(',');
        this.s_iBet = parseFloat(aVals[0]);

        this.s_aMultiply = [];
        for (i = 0; i < aVals.length; i++) {
            this.s_aMultiply[i] = parseFloat(parseFloat(aVals[i]) * this.s_iMultiply);
        }

        this.s_iMp = this.s_aMultiply[0];
        this.s_iLines = settings.NUM_PAYLINES;

        if(
            Lobby.Utils.objectNotNull(oXmlDoc.getElementsByTagName('last')) &&
            oXmlDoc.getElementsByTagName('last').length != 0){

            var spinXML = oXmlDoc.getElementsByTagName('bets');
            if(spinXML && spinXML.length > 0){
                if(spinXML[0].getAttribute('bet')) {
                    this.s_iMp = parseFloat(spinXML[0].getAttribute('bet'));
                }
            }
        }

        this.s_iTotBet =  this.s_iMp * this.s_iLines;


        if (szWheel !== null) {
            this.s_aStartingWheel = szWheel.split(',');
        }

        if (szLottoBall !== null) {
            this.s_iLottoBall = parseFloat(szLottoBall);
        }

        if (szTid !== null) {
            this.s_iTid = parseFloat(szTid);
        }

        //CHECK IF THERE IS AN OPEN BONUS
        if (oXmlDoc.getElementsByTagName('bonus')[0] !== undefined && oXmlDoc.getElementsByTagName('bonus')[0] !== null) {
            this.s_oBonusToRestore = {};
            this.s_oBonusToRestore.bonus_id = _iCurBonus = parseInt(oXmlDoc.getElementsByTagName('bonus')[0].getAttribute('id'));
            this.s_oBonusToRestore.bonus_step = parseInt(oXmlDoc.getElementsByTagName('bonus')[0].getAttribute('step'));
            if(Lobby.Utils.objectIsNull(this.s_oBonusToRestore.bonus_step)){
                this.s_oBonusToRestore = null;
            }else {
                this.s_szBonusKey = oXmlDoc.getElementsByTagName('bonus')[0].getAttribute('key');
                switch (_iCurBonus) {
                    case 1:
                    {

                        break;
                    }
                    case settings.BONUS_TYPE_PALACE:
                    {

                        // bonus free spin

                        if (this.s_oBonusToRestore.bonus_step > 0) {
                            this.s_oBonusToRestore.counter = parseInt(oXmlDoc.getElementsByTagName('bonus')[1].attributes[0].value);
                        } else {
                            this.s_oBonusToRestore.counter = -1;
                        }

                        this.s_oBonusToRestore.finish = 0;
                        this.s_oBonusToRestore.history = null;
                        if (oXmlDoc.getElementsByTagName('wheels')[0] !== undefined && oXmlDoc.getElementsByTagName('wheels')[0] !== null) {


                            var totalFreeSpins = parseInt(oXmlDoc.getElementsByTagName('wheels')[0].getAttribute('count'));
                            var totalMulty = parseInt(oXmlDoc.getElementsByTagName('wheels')[0].getAttribute('m'));


                            var aHistory = [];
                            for (var j = 0; j < oXmlDoc.getElementsByTagName('wheels')[0].childNodes.length; j++) {
                                if (oXmlDoc.getElementsByTagName('wheels')[0].childNodes[j].nodeType === document.ELEMENT_NODE) {
                                    var iWin = parseFloat(oXmlDoc.getElementsByTagName('wheels')[0].childNodes[j].textContent);
                                    var iType = oXmlDoc.getElementsByTagName('wheels')[0].childNodes[j].getAttribute('t');
                                    var iSelected = parseInt(oXmlDoc.getElementsByTagName('wheels')[0].childNodes[j].getAttribute('id'));

                                    aHistory.push({select: iSelected, win: iWin, type: iType});
                                }
                            }
                            this.s_oBonusToRestore.finish = parseFloat(oXmlDoc.getElementsByTagName('wheels')[0].getAttribute('finish'));
                            this.s_oBonusToRestore.history = aHistory;
                            this.s_oBonusToRestore.aTotalFS = totalFreeSpins;
                            this.s_oBonusToRestore.aTotalMulty = totalMulty;
                        }


                        break;
                    }
                    case settings.BONUS_TYPE_FREESPIN:
                    {


                        // free spin with trigger
                        if (this.s_oBonusToRestore.bonus_step > 0) {
                            this.s_oBonusToRestore.counter = parseInt(oXmlDoc.getElementsByTagName('bonus')[1].getAttribute('counter'));
                            //this.s_oBonusToRestore.freeSpinCount = parseInt(oXmlDoc.getElementsByTagName('step')[0].getAttribute('value'));
                            this.s_oBonusToRestore.freeSpinMulty = parseInt(oXmlDoc.getElementsByTagName('bonus')[1].getAttribute('mp'));
                        } else {
                            this.s_oBonusToRestore.counter = -1;
                        }
                        break;
                    }
                    case settings.BONUS_TYPE_BATTLE:
                    {
                        this.s_oBonusToRestore.finish = 0;
                        this.s_oBonusToRestore.history = null;
                        if (oXmlDoc.getElementsByTagName('wheelsrestore')[0] !== undefined && oXmlDoc.getElementsByTagName('wheelsrestore')[0] !== null) {
                            var aHistory = [];
                            for (var j = 0; j < oXmlDoc.getElementsByTagName('wheelsrestore')[0].childNodes.length; j++) {
                                if (oXmlDoc.getElementsByTagName('wheelsrestore')[0].childNodes[j].nodeType === document.ELEMENT_NODE) {
                                    var iWin = parseFloat(oXmlDoc.getElementsByTagName('wheelsrestore')[0].childNodes[j].textContent);
                                    var iSelected = parseInt(oXmlDoc.getElementsByTagName('wheelsrestore')[0].childNodes[j].getAttribute('selected'));
                                    aHistory.push({select: iSelected, win: iWin});
                                }
                            }
                            this.s_oBonusToRestore.finish = parseFloat(oXmlDoc.getElementsByTagName('wheels')[0].getAttribute('finish'));
                            this.s_oBonusToRestore.history = aHistory;
                        }

                        break;
                    }
                }
            }

        }


        if (!this.finishAPI) {
            this.finishAPI = true;
            this.gotoGame();
        } else {
            _oGame.refreshBet();
        }
    };

    /**
     * Function called when received Spin Info after request
     * @param oXmlDoc: XML Document received
     */
    this.onSpinReceived = function (oXmlDoc) {
        if (LobbyConfig.isDebug) {
            console.log('CMain onSpinReceived');
        }
        var szWild = null;
        var szScatter = null;
        var i, j;
        for (i = 0; i < oXmlDoc.getElementsByTagName('spin')[0].attributes.length; i++) {
            switch (oXmlDoc.getElementsByTagName('spin')[0].attributes[i].name) {
                case 'type':
                {
                    break;
                }
                case 'bet':
                {
                    this.s_iBet = oXmlDoc.getElementsByTagName('spin')[0].attributes[i].value;
                    break;
                }
                case 'lines':
                {
                    this.s_iLines = parseInt(oXmlDoc.getElementsByTagName('spin')[0].attributes[i].value);
                    break;
                }
                case 'tid':
                {
                    if(LobbyConfig.isTestAlgorithmMode) {
                        var tid = oXmlDoc.getElementsByTagName('spin')[0].attributes[i].value;
                        var log = "Spin result success with tid = " + tid;
                        console.log(log);
                        Manager4DebugTestAlgorithm.addDebug2Log(log);
                    }
                    break;
                }
                case 'multiplier':
                {
                    this.s_iMultiply = oXmlDoc.getElementsByTagName('spin')[0].attributes[i].value;
                    break;
                }
                case 'totalbet':
                {
                    this.s_iTotBet = parseFloat(oXmlDoc.getElementsByTagName('spin')[0].attributes[i].value);
                    break;
                }
                case 'wild':
                {
                    szWild = oXmlDoc.getElementsByTagName('spin')[0].attributes[i].value;
                    break;
                }
                case 'scatter':
                {
                    szScatter = oXmlDoc.getElementsByTagName('spin')[0].attributes[i].value;
                    break;
                }
                case 'ts':
                {
                    // this.s_iTimeStamp = oXmlDoc.getElementsByTagName('spin')[0].attributes[i].value;
                    break;
                }

            }
        }

        this.s_iCurWin = parseFloat(oXmlDoc.getElementsByTagName('win')[0].childNodes[0].nodeValue);
        //trace('szWin: '+szWin);

        this.s_iCoin = 0;///CHECK THISSSSSSSSSSSS
        //trace('szConv: '+s_iConversion);
        this.s_iCredit = parseFloat(oXmlDoc.getElementsByTagName('balance')[0].childNodes[0].nodeValue);
        //trace('szCoin: '+s_iCoin);

        //GET WHEEL INFO
        //type='normal' width='5' height='3' val='10,6,0,6,2,8,5,3,4,3,6,4,6,7,1'/>
        var iWidth, iHeight, szWheel;
        for (i = 0; i < oXmlDoc.getElementsByTagName('wheels')[0].attributes.length; i++) {
            switch (oXmlDoc.getElementsByTagName('wheels')[0].attributes[i].name) {
                case 'type':
                {
                    break;
                }
                case 'width':
                {
                    iWidth = parseInt(oXmlDoc.getElementsByTagName('wheels')[0].attributes[i].value);
                    break;
                }
                case 'height':
                {
                    iHeight = parseInt(oXmlDoc.getElementsByTagName('wheels')[0].attributes[i].value);
                    break;
                }
                case 'val':
                {
                    szWheel = oXmlDoc.getElementsByTagName('wheels')[0].attributes[i].value;
                    break;
                }
            }
        }



        if(Lobby.Utils.objectIsNull(szWheel)){

            if(LobbyConfig.isTestAlgorithmMode) {
                var textForLogFile = "" + "spin or bonus result fail missing szWheel" + " -> at " + Lobby.Utils.getCurrentTimestampAndConvert2String();
                Manager4DebugTestAlgorithm.addDebug2Log(textForLogFile);
            }

            this.s_oGame.generateLosingWheel();

            return;
        }

        var aWheels = [];
        var aTmp = szWheel.split(',');

        var i = iHeight; while (i--) {
            aWheels[i] = [];
            var j = iWidth; while (j--) { aWheels[i][j] = parseInt(aTmp[(j * iHeight) + i]);}
        }
        //for (i = 0; i < ; i++) {
        //    for (j = 0; j < ; j++) {
        //
        //    }
        //}

        var aWinPosition = [];
        var szRow;
        if (oXmlDoc.getElementsByTagName('winposition')[0].childNodes.length === 0) {
            for (j = 0; j < oXmlDoc.getElementsByTagName('bonusposition')[0].childNodes.length; j++) {
                if (oXmlDoc.getElementsByTagName('bonusposition')[0].childNodes[j].nodeType === document.ELEMENT_NODE) {
                    szRow = oXmlDoc.getElementsByTagName('bonusposition')[0].childNodes[j].textContent;
                    aWinPosition.push({
                        line: parseInt(oXmlDoc.getElementsByTagName('bonusposition')[0].childNodes[j].getAttribute('line')),
                        win: parseFloat(oXmlDoc.getElementsByTagName('bonusposition')[0].childNodes[j].getAttribute('win')),
                        mul: parseInt(oXmlDoc.getElementsByTagName('bonusposition')[0].childNodes[j].getAttribute('mul')),
                        pos: szRow
                    });
                    //trace('aWinPosition['+j+']: line'+aWinPosition[j].line+' #win:'+aWinPosition[j].win+' #mul: '+aWinPosition[j].mul+ '#row: '+szRow);
                }
            }
        } else {
            for (j = 0; j < oXmlDoc.getElementsByTagName('winposition')[0].childNodes.length; j++) {
                if (oXmlDoc.getElementsByTagName('winposition')[0].childNodes[j].nodeType === document.ELEMENT_NODE) {
                    szRow = oXmlDoc.getElementsByTagName('winposition')[0].childNodes[j].textContent;


                    aWinPosition.push({
                        line: parseInt(oXmlDoc.getElementsByTagName('winposition')[0].childNodes[j].getAttribute('line')),
                        win: parseFloat(oXmlDoc.getElementsByTagName('winposition')[0].childNodes[j].getAttribute('win')),
                        mul: parseInt(oXmlDoc.getElementsByTagName('winposition')[0].childNodes[j].getAttribute('mul')),
                        pos: szRow
                    });
                }

            }
        }

        var aTableWin = [];
        for (var k = 0; k < oXmlDoc.getElementsByTagName('tablewin')[0].childNodes.length; k++) {
            if (oXmlDoc.getElementsByTagName('tablewin')[0].childNodes[k].nodeType === document.ELEMENT_NODE) {
                aTableWin.push({
                    card: parseInt(oXmlDoc.getElementsByTagName('tablewin')[0].childNodes[k].getAttribute('card')),
                    count: parseInt(oXmlDoc.getElementsByTagName('tablewin')[0].childNodes[k].getAttribute('count')),
                    wild: parseInt(oXmlDoc.getElementsByTagName('tablewin')[0].childNodes[k].getAttribute('wild'))
                });
                //trace('aTableWin['+k+']: card'+aTableWin[k].card+' #count:'+aTableWin[k].count+' #wild: '+aTableWin[k].wild);
            }
        }

        _iCurBonus = -1;
        if (oXmlDoc.getElementsByTagName('bonus')[0].attributes.length > 0) {
            _iCurBonus = parseInt(oXmlDoc.getElementsByTagName('bonus')[0].attributes['id'].value);
            this.s_szBonusKey = oXmlDoc.getElementsByTagName('bonus')[0].childNodes[0].nodeValue;
        }

        var aBonusPos = [];
        var iCont = 0;
        for (var t = 0; t < oXmlDoc.getElementsByTagName('bonusposition')[0].childNodes.length; t++) {
            if (oXmlDoc.getElementsByTagName('bonusposition')[0].childNodes[t].nodeType === document.ELEMENT_NODE) {
                szRow = oXmlDoc.getElementsByTagName('bonusposition')[0].childNodes[t].textContent;
                aBonusPos[iCont] = [];
                aTmp = szRow.split(',');
                for (j = 0; j < aTmp.length; j++) {
                    aBonusPos[iCont][j] = parseInt(aTmp[j]);
                }
                iCont++;
            }

        }

        this.s_oGame.onSpinReceived(aWheels, aWinPosition, aTableWin, _iCurBonus, aBonusPos);
    };

    /**
     * Function called when received Bonus Info after request
     * @param oXmlDoc: XML Document received
     */
    this.onBonusReceived = function (oXmlDoc) {
        if (LobbyConfig.isDebug) {
            console.log('CMain onBonusReceived');
        }

        if(LobbyConfig.isTestAlgorithmMode) {

            for (i = 0; i < oXmlDoc.getElementsByTagName('bonus')[0].attributes.length; i++) {
                switch (oXmlDoc.getElementsByTagName('bonus')[0].attributes[i].name) {
                    case 'tid':
                    {
                        if (LobbyConfig.isTestAlgorithmMode) {
                            var tid = oXmlDoc.getElementsByTagName('bonus')[0].attributes[i].value;
                            var log = "Call bonus result success with tid = " + tid;
                            console.log(log);
                            Manager4DebugTestAlgorithm.addDebug2Log(log);
                        }
                        break;
                    }

                }
            }
        }

        if (_iCurBonus == 0) {
            _iCurBonus = 1;
        }
        switch (_iCurBonus) {
            case 1:
            {
                //this._onDoubleUpReceive(oXmlDoc);
                break;
            }
            case settings.BONUS_TYPE_PALACE:
            {
                this._onBonusPalaceReceived(oXmlDoc);
                break;
            }
            case settings.BONUS_TYPE_FREESPIN:
            {
                this._onBonusFreeSpinWithRetriggerReceived(oXmlDoc);
                //this._onBonusBikiniReceived(oXmlDoc);
                break;
            }
            case settings.BONUS_TYPE_BATTLE:
            {
                this._onBonusBattleReceived(oXmlDoc);
                break;
            }
        }
    };
    /**
     * Function called when received Double Up after request
     * @param oXmlDoc: XML Document received
     */
    this._onDoubleUpReceive = function (oXmlDoc) {
        if (LobbyConfig.isDebug) {
            console.log('CMain _onDoubleUpReceive');
        }
        var iStep = this.s_oGame.getStepBonus();


        this.s_iCredit = parseFloat(oXmlDoc.getElementsByTagName('balance')[0].childNodes[0].nodeValue);

        if (iStep === 0) {
            var iTotWin = parseFloat(oXmlDoc.getElementsByTagName('data')[0].getAttribute('gamewin'));
            this.s_oGame.onDoubleUpStep0Received(iTotWin);
        } else {

            var iFinish = parseFloat(oXmlDoc.getElementsByTagName('wheels')[0].getAttribute('finish'));
            var iResult = 0;
            var iTotWin = 0;

            for (var j = 0; j < oXmlDoc.getElementsByTagName('history')[0].childNodes.length; j++) {
                if (oXmlDoc.getElementsByTagName('history')[0].childNodes[j].nodeType === document.ELEMENT_NODE) {
                    iResult = parseInt(oXmlDoc.getElementsByTagName('history')[0].childNodes[j].getAttribute('result'));
                    iTotWin = parseFloat(oXmlDoc.getElementsByTagName('history')[0].childNodes[j].getAttribute('value'));
                }
            }

            if (iResult == 0 && iTotWin == 0) {
                iTotWin = parseFloat(oXmlDoc.getElementsByTagName('data')[0].getAttribute('gamewin'));
            }


            this.s_oGame.onDoubleUpStep1Received(iFinish, iResult, iTotWin);
        }

    };
    /**
     * Function called when received Palace Bonus after request
     * @param oXmlDoc: XML Document received
     */
    this._onBonusPalaceReceived = function (oXmlDoc) {
        if (LobbyConfig.isDebug) {
            console.log('CMain _onBonusPalaceReceived');
        }
        //var iStep = this.s_oGame.getStepBonus();

        var iStep = this.s_oGame.getStepBonus();

        this.s_iCredit = parseFloat(oXmlDoc.getElementsByTagName('balance')[0].childNodes[0].nodeValue);

        if (iStep === 0) {
            this.s_oGame.onBonusPalaceStep0Received();
        } else {

//            s_iCredit = parseFloat(oXmlDoc.getElementsByTagName('balance')[0].childNodes[0].nodeValue);
            var iFinish = parseFloat(oXmlDoc.getElementsByTagName('wheels')[0].getAttribute('finish'));

            var aWheels = [];

            for (var j = 0; j < oXmlDoc.getElementsByTagName('wheels')[0].childNodes.length; j++) {
                if (oXmlDoc.getElementsByTagName('wheels')[0].childNodes[j].nodeType === document.ELEMENT_NODE) {
                    var iWin = parseFloat(oXmlDoc.getElementsByTagName('wheels')[0].childNodes[j].textContent);
                    var iSelected = oXmlDoc.getElementsByTagName('wheels')[0].childNodes[j].getAttribute('selected');

                    aWheels.push({win: iWin, select: iSelected});
                }

            }

            this.s_oGame.onBonusPalaceStep1Received(iFinish, aWheels);
        }

    };
    /**
     * Function called when received Free Spin with Retrigger after request
     * @param oXmlDoc: XML Document received
     */
    this._onBonusFreeSpinWithRetriggerReceived = function (oXmlDoc) {
        if (LobbyConfig.isDebug) {
            console.log('CMain _onBonusFreeSpinWithRetriggerReceived');
        }
        //var iStep = this.s_oGame.getStepBonus();

        this.s_iCredit = parseFloat(oXmlDoc.getElementsByTagName('balance')[0].childNodes[0].nodeValue);
        //<bonus type='fs' tid='481373' counter='3' mp='1' gamewin='0.00' all='4' ts='1429198225'>
        var iRemainingFreeSpin = parseInt(oXmlDoc.getElementsByTagName('bonus')[0].getAttribute('counter'));
        var iMultyFS = parseInt(oXmlDoc.getElementsByTagName('bonus')[0].getAttribute('mp'));

        this.s_iCurWin = parseFloat(oXmlDoc.getElementsByTagName('win')[0].childNodes[0].nodeValue);

        //s_iTotBet = parseFloat(oXmlDoc.getElementsByTagName('spin')[0].attributes[1].value);

        var aWinPosition = [];
        var szRow, j;
        for (j = 0; j < oXmlDoc.getElementsByTagName('winposition')[0].childNodes.length; j++) {
            if (oXmlDoc.getElementsByTagName('winposition')[0].childNodes[j].nodeType === document.ELEMENT_NODE) {
                szRow = oXmlDoc.getElementsByTagName('winposition')[0].childNodes[j].textContent;

                aWinPosition.push({
                    line: parseInt(oXmlDoc.getElementsByTagName('winposition')[0].childNodes[j].getAttribute('line')),
                    win: parseFloat(oXmlDoc.getElementsByTagName('winposition')[0].childNodes[j].getAttribute('win')),
                    mul: parseInt(oXmlDoc.getElementsByTagName('winposition')[0].childNodes[j].getAttribute('mul')),
                    pos: szRow
                });
            }

        }

        szRow = oXmlDoc.getElementsByTagName('wheels')[0].getAttribute('val');
        var iHeight = oXmlDoc.getElementsByTagName('wheels')[0].getAttribute('height');
        var iWidth = oXmlDoc.getElementsByTagName('wheels')[0].getAttribute('width');
        //trace('szRow: '+szRow);

        var aWheels = [];
        var aTmp = szRow.split(',');

        var i = iHeight; while (i--) {
            aWheels[i] = [];
            var j = iWidth; while (j--) {
                aWheels[i][j] = parseInt(aTmp[(j * iHeight) + i]);
                //trace('aWheels['+i+']['+j+']: '+aWheels[i][j]);
            }
        }
        //for (var i = 0; i < ; i++) {
        //    for (j = 0; j < ; j++) {}
        //}


        var aTableWin = [];
        for (var k = 0; k < oXmlDoc.getElementsByTagName('tablewin')[0].childNodes.length; k++) {
            if (oXmlDoc.getElementsByTagName('tablewin')[0].childNodes[k].nodeType === document.ELEMENT_NODE) {
                aTableWin.push({
                    card: parseInt(oXmlDoc.getElementsByTagName('tablewin')[0].childNodes[k].getAttribute('card')),
                    count: parseInt(oXmlDoc.getElementsByTagName('tablewin')[0].childNodes[k].getAttribute('count')),
                    wild: parseInt(oXmlDoc.getElementsByTagName('tablewin')[0].childNodes[k].getAttribute('wild'))
                });
                //trace('aTableWin['+k+']: card'+aTableWin[k].card+' #count:'+aTableWin[k].count+' #wild: '+aTableWin[k].wild);
            }

        }

        var iTotWin = parseFloat(oXmlDoc.getElementsByTagName('data')[0].attributes[0].value);

        this.s_oGame.onBonusFreeSpinStepReceived(iRemainingFreeSpin, iMultyFS, aWinPosition, aWheels, aTableWin, iTotWin);
    };
    /**
     * Deprecated
     */
    this._onBonusBikiniReceived = function (oXmlDoc) {
        if (LobbyConfig.isDebug) {
            console.log('CMain _onBonusBikiniReceived');
        }
        var iStep = this.s_oGame.getStepBonus();

        this.s_iCredit = parseFloat(oXmlDoc.getElementsByTagName('balance')[0].childNodes[0].nodeValue);

        if (iStep === 0) {
            this.s_oGame.onBonusBikiniStep0Received();
        } else {
            var iWin = parseFloat(oXmlDoc.getElementsByTagName('win')[0].childNodes[0].nodeValue);

            this.s_oGame.onBonusBikiniStep1Received(iWin);
        }
    };
    /**
     * Function called when received Battle Bonus after request
     * @param oXmlDoc: XML Document received
     */
    this._onBonusBattleReceived = function (oXmlDoc) {
        if (LobbyConfig.isDebug) {
            console.log('CMain _onBonusBattleReceived');
        }
        var iStep = this.s_oGame.getStepBonus();

        this.s_iCredit = parseFloat(oXmlDoc.getElementsByTagName('balance')[0].childNodes[0].nodeValue);

        if (iStep === 0) {
            this.s_oGame.onBonusBattleStep0Received();
        } else {
            var iFinish = parseFloat(oXmlDoc.getElementsByTagName('wheels')[0].getAttribute('finish'));

            var aWheels = [];
            for (var j = 0; j < oXmlDoc.getElementsByTagName('wheels')[0].childNodes.length; j++) {
                if (oXmlDoc.getElementsByTagName('wheels')[0].childNodes[j].nodeType === document.ELEMENT_NODE) {
                    var iWin = parseFloat(oXmlDoc.getElementsByTagName('wheels')[0].childNodes[j].textContent);
                    var iSelected = oXmlDoc.getElementsByTagName('wheels')[0].childNodes[j].getAttribute('selected');

                    aWheels.push({win: iWin, select: iSelected});
                }

            }

            this.s_oGame.onBonusBattleStep1Received(iFinish, aWheels);
        }
    };
    /**
     * Deprecated
     */
    this._onBonusJackPot = function (oXmlDoc) {
        if (LobbyConfig.isDebug) {
            console.log('CMain _onBonusJackPot');
        }
        var iStep = this.s_oGame.getStepBonus();
        this.s_iCredit = parseFloat(oXmlDoc.getElementsByTagName('balance')[0].childNodes[0].nodeValue);

        var iType = oXmlDoc.getElementsByTagName('bonus')[0].attributes[0].value;
        var iTotWin = parseFloat(oXmlDoc.getElementsByTagName('win')[0].childNodes[0].nodeValue);

        if (iStep > 0) {
            this.s_oGame.onBonusJackpotStep1Received(iType, iTotWin);

            if (this.s_szRealPlayKey !== null) {
                this.manager4Network.callGetBets(this.s_szRealPlayKey);
            } else {
                this.manager4Network.callGetBets(s_szFunPlayKey);
            }
        } else {
            var iMinor = oXmlDoc.getElementsByTagName('minor')[0].childNodes[0].nodeValue;
            var iMajor = oXmlDoc.getElementsByTagName('major')[0].childNodes[0].nodeValue;

            this.s_oGame.onBonusJackpotStep0Received(iMinor, iMajor);
        }
    };
    ///////////////////////////////////////////////
    _oData = oData;

    this.initContainer();
}
