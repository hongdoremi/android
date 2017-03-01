LobbyC.MainMenu = (function (my) {
    my.groupLockPanelList = [];
    my.isCreatingList = false;
    my.mainBodyGroup = null;

    var bodyContainer = null;

    var tableGame = null;
    var slotGameList = null;

    var isScrolling = false;

    var arrayPosXPage = [0, 1300];
    var arrayDot = [];

    /**
     * Check game slot download state to hide/show Lock icon
     */
    my.checkGroupLockPanelList = function () {
        for (var index = 0; index < my.groupLockPanelList.length; ++index) {
            var groupLockPanelList = my.groupLockPanelList[index];
            for (var i = 0; i < LobbyConfig.listGameInfo.length; i++) {
                if (groupLockPanelList.id === LobbyConfig.listGameInfo[i].id) {
                    if (LobbyConfig.listGameInfo[i].is_unlocked) {
                        groupLockPanelList.alpha = 0;
                    } else {
                        groupLockPanelList.alpha = 1;
                    }
                }

            }
        }
    };
    /**
     * Show Lobby Body
     * @param mainMenu: group contains main Lobby
     */
    my.showBodyNew = function (mainMenu) {
        my.groupLockPanelList = [];
        var body = my.add.group();
        mainMenu.add(body);

        my.uiBody = body;
        my.backGroundBody = my.add.sprite(0, 0, "background_red",null, body);

        ManagerForScale.doubleAndRevertImg(my.uiBody,my.backGroundBody,"background_red",null,my);

        bodyContainer = my.add.group();
        my.uiBody.addChild(bodyContainer);

        // 2016-05-18: Phuoc: remove mascot
        //var model = my.add.sprite(0, 140, "model", null, body);
        //model.scale.setTo(0.85, 0.85);
        //body.add(model);

        //showBodyGroup();
        //#NEWVERSION

        var groupTest = my.add.group();
        body.add(groupTest);
        my.createTestButton(100,150,"LuckyWheel",groupTest,function(){
            //if (!Lobby.Utils.isWeb()){
            //    if(cordova.platformId == "android") ManagerForPurchase.buyItem(my, LobbyConfig.ProductManager.Android["LuckyWheelP1"]);
            //    else  ManagerForPurchase.buyItem(my, LobbyConfig.ProductManager.IOs["LuckyWheelP1"]);
            //}
            //else my.showNotificationPopup("Error","Platform not supported.");
            my.prepareToChangeStateFromMainMenu();
            my.state.start(
                LobbyConstant.stateName.LuckyWheel,
                LobbyConfig.isDestroyWorldFromMainMenu2GameSlot,
                false,
                my._userData
            );
        },LobbyConfig.isTestStrategy);
        my.createTestButton(100,50,"LuckyBox",groupTest,function(){
           my.showPopupLuckyBox();
        },LobbyConfig.isTestStrategy);
        showSlotGameList(true);
    };
    /**
     * Deprecated
     */
    var showBodyGroup = function () {
        //my.mainBodyGroup = my.add.group();
        //var background = my.add.sprite(0, 0, "background-popup", null, my.mainBodyGroup);
        //background.scale.setTo(0.8, 0.75);
        //
        //Lobby.PhaserJS.centerWorld(my.mainBodyGroup);
        //
        //var texas_mahjong = Lobby.PhaserJS.createSpriteRectangleExt(
        //    my,
        //    825,
        //    225,
        //    function () {
        //        my.showGame(LobbyConfig.GameList.TexasMahjong,true);
        //    },
        //    function () {
        //        texas_mahjong.alpha = 0.8;
        //        //shadow.visible = true;
        //
        //    },
        //    function () {
        //        texas_mahjong.alpha = 1.0;
        //        //shadow.visible = false;
        //    },
        //    my.mainBodyGroup,
        //    LobbyConfig.isDebug,
        //    'texas-mahjong-icon'
        //);
        //texas_mahjong.anchor.setTo(0.5, 0.5);
        //texas_mahjong.scale.setTo(0.8, 0.8);
        //
        //var table = my.add.group();
        //table.x = 825;
        //table.y = 550;
        //my.mainBodyGroup.add(table);
        //var table_game = Lobby.PhaserJS.createSpriteRectangleExt(
        //    my,
        //    0,
        //    0,
        //    function () {
        //        my.showGroup(2);
        //    },
        //    function () {
        //        table_game.alpha = 0.8;
        //        //shadow.visible = true;
        //
        //    },
        //    function () {
        //        table_game.alpha = 1.0;
        //        //shadow.visible = false;
        //    },
        //    table,
        //    LobbyConfig.isDebug,
        //    'table-game-icon'
        //);
        //table_game.anchor.setTo(0.5, 0.5);
        //table_game.scale.setTo(0.8, 0.8);
        //var tableText = my.add.text(0, 90, "TABLE GAMES", {
        //    font: "60px PassionOne-Regular",
        //    fill: "#FFFFFF",
        //    stroke: '#4e2451',
        //    strokeThickness: 8
        //}, table);
        //tableText.anchor.setTo(0.5, 0.5);
        //
        //var slots = my.add.group();
        //slots.x = 350;
        //slots.y = 550;
        //my.mainBodyGroup.add(slots);
        //var slot_game = Lobby.PhaserJS.createSpriteRectangleExt(
        //    my,
        //    0,
        //    0,
        //    function () {
        //        my.showGroup(3);
        //    },
        //    function () {
        //        slot_game.alpha = 0.8;
        //        //shadow.visible = true;
        //
        //    },
        //    function () {
        //        slot_game.alpha = 1.0;
        //        //shadow.visible = false;
        //    },
        //    slots,
        //    LobbyConfig.isDebug,
        //    'slots-icon'
        //);
        //slot_game.anchor.setTo(0.5, 0.5);
        //slot_game.scale.setTo(0.8, 0.8);
        //var slotText = my.add.text(0, 90, "SLOTS", {
        //    font: "60px PassionOne-Regular",
        //    fill: "#FFFFFF",
        //    stroke: '#4e2451',
        //    strokeThickness: 8
        //}, slots);
        //slotText.anchor.setTo(0.5, 0.5);
        //
        //if (LobbyConfig.gamePromote === null) {
        //    LobbyRequest.User.getListSlotsGameAndProcessData(
        //        function () {
        //            console.log("create cell game feature");
        //            createSlotGameCell(LobbyConfig.gamePromote, 225, 80, my.mainBodyGroup);
        //        },
        //        my,
        //        false);
        //} else {
        //    console.log("create cell game feature");
        //    createSlotGameCell(LobbyConfig.gamePromote, 225, 80, my.mainBodyGroup);
        //}
        //
        //bodyContainer.add(my.mainBodyGroup);
    };
    /**
     * Deprecated
     */
    var showTableGame = function () {
        //tableGame = my.add.group();
        //var background = my.add.sprite(0, 0, "background-popup", null, tableGame);
        //background.scale.setTo(0.8, 0.75);
        //tableGame.add(background);
        //
        //Lobby.PhaserJS.centerWorld(tableGame);
        //var jack_better = Lobby.PhaserJS.createSpriteRectangleExt(
        //    my,
        //    250,
        //    375,
        //    function () {
        //        my.showGame(LobbyConfig.GameList.JackOrBetter);
        //    },
        //    function () {
        //        jack_better.alpha = 0.8;
        //        //shadow.visible = true;
        //
        //    },
        //    function () {
        //        jack_better.alpha = 1.0;
        //        //shadow.visible = false;
        //    },
        //    tableGame,
        //    LobbyConfig.isDebug,
        //    'jack-and-better-icon'
        //);
        //jack_better.anchor.setTo(0.5, 0.5);
        //jack_better.scale.setTo(0.8, 0.8);
        //
        //
        //var black_jack = Lobby.PhaserJS.createSpriteRectangleExt(
        //    my,
        //    600,
        //    375,
        //    function () {
        //        my.showGame(LobbyConfig.GameList.BlackJack);
        //    },
        //    function () {
        //        black_jack.alpha = 0.8;
        //        //shadow.visible = true;
        //
        //    },
        //    function () {
        //        black_jack.alpha = 1.0;
        //        //shadow.visible = false;
        //    },
        //    tableGame,
        //    LobbyConfig.isDebug,
        //    'black-jack-icon'
        //);
        //black_jack.anchor.setTo(0.5, 0.5);
        //black_jack.scale.setTo(0.8, 0.8);
        //
        //var groupEmpty = my.add.group();
        //tableGame.add(groupEmpty);
        //groupEmpty.x = 950;
        //groupEmpty.y = 375;
        //
        //var empty = my.add.sprite(0, 0, "empty-table-icon", null, groupEmpty);
        //empty.anchor.setTo(0.5, 0.5);
        //empty.scale.setTo(0.8, 0.8);
        //
        //var comingSoonText = my.add.text(0, 0, "Coming soon...", {
        //    font: "30px PassionOne-Regular",
        //    fill: "#FFFFFF"
        //}, groupEmpty);
        //comingSoonText.anchor.setTo(0.5, 0.5);
        //
        //bodyContainer.add(tableGame);
    };
    var contentList;
    /**
     * Enable scroll for Body
     */
    my.enableScrollBody = function(){
        my.game.pageViewMain.start(contentList,true, arrayPosXPage, my,{minX : 300, maxX : 1600, minY : 70, maxY : 780},
            function(currentPage){
                setToggleUI(currentPage);
            });
        my.game.pageViewMain.isDisable = false;
    };
    /**
     * Show list slot games UI to Body
     * 2016-05-28: Phuoc: trước khi hiện danh sách sẽ kiểm tra danh sách có rỗng hay không
     * @param isCheckListGameInfo: boolen - để biết có cần thực hiện việc check này hay không
     */
    var showSlotGameList = function (isCheckListGameInfo) {
        if (isCheckListGameInfo && LobbyConfig.listGameInfo.length <= 0) {
            LobbyConfig.listGameInfo = [];
            LobbyRequest.User.getListSlotsGameAndProcessData(
                function () {
                    showSlotGameList(false);
                },
                my,
                true
            );
            return;
        }

        isScrolling = false;
        slotGameList = my.add.group();
        slotGameList.currentPage = 0;

        //Lobby.PhaserJS.centerWorld(slotGameList);


        /*
         Get list game and show
         */
        contentList = my.add.group();
        my.game.pageViewMain.isSpecialConfig = true;
        //my.game.pageViewMain.start(contentList,true, arrayPosXPage, my,{minX : 300, maxX : 1600, minY : 70, maxY : 780},
        //    function(currentPage){
        //        setToggleUI(currentPage);
        //    });
        my.enableScrollBody();
        slotGameList.add(contentList);

        // 2016-05-28: Phuoc: nếu field available trả về false thì không hiển thị game
        var checkAvailableGame = function (beanSlotGameInfo) {
            return (beanSlotGameInfo.available&&(!(LobbyConfig.hiddenGameId.indexOf(beanSlotGameInfo.game_id )>-1)));
        };

        // 2016-05-28: Phuoc: dùng countIndexSlotGameCell thay cho i khi tính tọa độ, fix bug bị lủng lỗ danh sách game
        var countIndexSlotGameCell = 0;
        var numberOfGamePerRow = 4;
        var startRowPosition = 350;
        var numberOfRow = 2;
        var positionList = ["nezha","deepblue","goldenegg","pharaoh",
            "boxing","romanempire","magicquest","candylicious",
            "fruitilicious","bikinibeach","kpop","littlemonsters",
            "mafia","sherlock","4beauties"
        ];
        my.slotCellList = [];
        for (var i = 0; i < positionList.length; i++) {
            var game ;
            for(var t = 0; t <LobbyConfig.listGameInfo.length;t++){
                if(LobbyConfig.listGameInfo[t].game_id === positionList[i]){
                    game = LobbyConfig.listGameInfo[t];
                    break;
                }
            }
            if(game === null) console.error(positionList[i]);
            //var game = LobbyConfig.listGameInfo[i];
            if (!checkAvailableGame(game)) {
                continue;
            }
            checkAndCreateSlotGameCell(
                game,
                startRowPosition + arrayPosXPage[Math.floor(countIndexSlotGameCell / (numberOfGamePerRow*numberOfRow))] + countIndexSlotGameCell % numberOfGamePerRow * 300,
                125 + Math.floor(countIndexSlotGameCell % (numberOfGamePerRow*numberOfRow) / numberOfGamePerRow) * 325 - 10,
                contentList);
            ++countIndexSlotGameCell;
        }

        var numberOfPage = Math.ceil(countIndexSlotGameCell / LobbyConfig.numberOfGameSlotCellPerPage);

        //slotGameList.btnRight = Lobby.PhaserJS.createSpriteRectangleExt(
        //    my,
        //    1550,
        //    425,
        //    function () {
        //        my.resizeButtonAndTextAnimationScaleRatio(slotGameList.btnRight, null, 0.7);
        //        var interval = setInterval(function () {
        //            clearInterval(interval);
        //            changePage(slotGameList.btnRight, contentList, 1, numberOfPage);
        //            my.resizeButtonAndTextAnimationScaleRatio(slotGameList.btnRight, null, 0.8);
        //        }, 150);
        //    },
        //    function () {
        //        my.resizeButtonAndTextAnimationScaleRatio(slotGameList.btnRight, null, 0.8);
        //    },
        //    function () {
        //        my.resizeButtonAndTextAnimationScaleRatio(slotGameList.btnRight, null, 0.8);
        //    },
        //    slotGameList,
        //    LobbyConfig.isDebug,
        //    'right_arrow'
        //);
        //slotGameList.btnRight.anchor.setTo(0.5, 0.5);
        //slotGameList.btnRight.scale.setTo(0.8);
        //slotGameList.add(slotGameList.btnRight);
        //
        //slotGameList.btnLeft = Lobby.PhaserJS.createSpriteRectangleExt(
        //    my,
        //    320,
        //    425,
        //    function () {
        //        my.resizeButtonAndTextAnimationScaleRatio(slotGameList.btnLeft, null, 0.7);
        //        var interval = setInterval(function () {
        //            clearInterval(interval);
        //            changePage(slotGameList.btnLeft, contentList, -1, numberOfPage);
        //            my.resizeButtonAndTextAnimationScaleRatio(slotGameList.btnLeft, null, 0.8);
        //        }, 150);
        //
        //    },
        //    function () {
        //        my.resizeButtonAndTextAnimationScaleRatio(slotGameList.btnLeft, null, 0.8);
        //    },
        //    function () {
        //        my.resizeButtonAndTextAnimationScaleRatio(slotGameList.btnLeft, null, 0.8);
        //    },
        //    slotGameList,
        //    LobbyConfig.isDebug,
        //    'right_arrow'
        //);
        //slotGameList.btnLeft.rotation = Math.PI;
        //slotGameList.btnLeft.anchor.setTo(0.5, 0.5);
        //slotGameList.btnLeft.scale.setTo(0.8);
        //slotGameList.btnLeft.visible = false;
        //slotGameList.add(slotGameList.btnLeft);

        if (numberOfPage <= 1) {
            slotGameList.btnLeft.visible = false;
            slotGameList.btnRight.visible = false;
        }

        var groupDot = my.add.group();
        slotGameList.add(groupDot);

        arrayDot = [];
        //for (i = 0; i < arrayPosXPage.length; i++) {
        for (i = 0; i < numberOfPage; i++) {
            var dot = my.add.sprite(i * 30, 750, "dot", 0, groupDot);
            dot.y+=ManagerForScale.doubleIncrementHeight();
            dot.scale.setTo(0.9, 0.9);
            groupDot.add(dot);
            arrayDot.push(dot);
        }

        Lobby.PhaserJS.centerXItemInBackground(groupDot, {
            x: 0,
            y: 0,
            width: LobbyConfig.width,
            height: LobbyConfig.height
        });

        arrayDot[0].frame = 1;

        //var maskClick = my.add.graphics(0, 0);
        //maskClick.beginFill();
        //maskClick.beginFill(0xffffff);
        //maskClick.drawRect(
        //    0,
        //    0,
        //    350,
        //    900);
        //maskClick.endFill();
        //slotGameList.add(maskClick);
        //maskClick.inputEnabled = true;
        //
        //var myMask = my.add.graphics(0, 0);
        //myMask.beginFill();
        //myMask.beginFill(0xffffff);
        //myMask.drawRect(
        //    350,
        //    50,
        //    1250,
        //    750);
        //myMask.endFill();
        //slotGameList.add(myMask);
        //slotGameList.mask = myMask;
        /**
         * Add mask model
         */
        //var girlMask = my.add.sprite(0,
        //    0,
        //    'body-model-mask',
        //    null,
        //    slotGameList);


        var girlMask = Lobby.PhaserJS.createSpriteRectangle(
            my,
            0,
            0,
            function(){
            },
            function(){
            },
            function(){
            },
            false,
            slotGameList,
            false,
            'body_model_mask',
            function(){
            },
            null
        );

        girlMask.scale.setTo(1);
        ManagerForScale.doubleAndRevertImg(slotGameList,girlMask,'body_model_mask',null,my,1);
        /**
         * Add girl model
         */
        var girl = my.add.sprite(10,
            263,
            'body_model',
            null,
            slotGameList);
        girl.scale.setTo(1.4,1.4);
        girl.y+=ManagerForScale.doubleIncrementHeight();
        bodyContainer.add(slotGameList);

        my.createTestButton(100,250,"Piggy Bank",slotGameList,function(){
            if(my._userData.profile.level+1<LobbyConfig.unlockFeatureByLevelInfo.piggyBank){
                my.showNotificationPopup("More level","You need to reach level " + LobbyConfig.unlockFeatureByLevelInfo.piggyBank +" to unlock this feature." );
            }
            else{
                //my.showNotificationPopup("Coming soon","This feature will comming soon" );
                my.showLoadingAnimation();
                LobbyRequest.User.getAdditionalInfo(function(isSuccess,dataF, response){
                    if(isSuccess) {
                        my.parseAdditionalInfo(dataF);
                        my.showPiggyBankPopup();
                        my.hideLoadingAnimation();
                    }
                });
            }
        },LobbyConfig.isTestStrategy);
        my.createTestButton(100,350,"Daily challenge",slotGameList,function(){
            if(my._userData.profile.level+1<LobbyConfig.unlockFeatureByLevelInfo.dailyChallenge){
                my.showNotificationPopup("More level","You need to reach level " + LobbyConfig.unlockFeatureByLevelInfo.dailyChallenge +" to unlock this feature." );
            }
            else{
                //my.showNotificationPopup("Coming soon","This feature will comming soon" );
                my.showLoadingAnimation();
                LobbyRequest.User.getDailyChallengeInfo(function(data){
                    my.showDailyChallengePopup(data);
                    my.hideLoadingAnimation();
                }, my)
            }
        },LobbyConfig.isTestStrategy);
        my.createTestButton(100,450,"Lucky Spin Daily",slotGameList,function(){
            my.showPopupDailyLuckySpin();
        },LobbyConfig.isTestStrategy);
        my.createTestButton(100,550,"Reference code",slotGameList,function(){
            my.popupHtml.showSumbitReferenceCodePopupHtml();
        },LobbyConfig.isTestStrategy);
        my.createTestButton(100,650,"Test booser",slotGameList,function(){
            my.showNotificationPopupV3("Booster Packages", "Buy booster package test", function () {
                if (!Lobby.Utils.isWeb()) {
                    if (cordova.platformId == "android") ManagerForPurchase.buyItem(my, LobbyConfig.ProductManager.Android["BoosterP1"]);
                    else  ManagerForPurchase.buyItem(my, LobbyConfig.ProductManager.IOs["BoosterP1"]);
                }
                else my.showNotificationPopup("Error", "Platform not supported.");
            }, function () {
                if (!Lobby.Utils.isWeb()) {
                    if (cordova.platformId == "android") ManagerForPurchase.buyItem(my, LobbyConfig.ProductManager.Android["BoosterP2"]);
                    else  ManagerForPurchase.buyItem(my, LobbyConfig.ProductManager.IOs["BoosterP2"]);
                }
                else my.showNotificationPopup("Error", "Platform not supported.");
            }, "Buy BoosterP1", "Buy BoosterP2");
        },LobbyConfig.isTestStrategy);
        my.createTestButton(100,750,"Daily Streak",slotGameList,function(){
            my.showPopupDailyBonusStreak(true);
        },LobbyConfig.isTestStrategy);
        my.createTestButton(100,850,"Comeback Bonus",slotGameList,function(){
            var handleAdditionalInfo = function(isSuccess,data, response){
                if(isSuccess) {
                    LobbyC.MainMenu.parseAdditionalInfo(data);
                }
                my.showComebackBonusPopup();
            };
            LobbyRequest.User.getAdditionalInfo(handleAdditionalInfo);
        },LobbyConfig.isTestStrategy);
        my.createTestButton(500,50,"Test Magic Item",slotGameList,function(){
            var group = my.add.group();
            var background = my.add.sprite(0, 0, "popup_notification_background", null);
            background.width = 1000;
            background.height = 400;
            group.add(background);

            my.createButtonExitPopup(group, 925, -15, null, function(){
                //my.checkAndShowPopupBonus();
            });

            var createButton = function(_package, _packageName, x, y){
                return my.createButtonGreenPopup(
                    group,
                    x - 150,
                    y - 50,
                    _package.alias,
                    1,
                    function () {
                        ManagerForPurchase.buyPackageBasedOnPlatform(_packageName,my);
                    },
                    60
                );
            };
            var buttonDict = {};
            buttonDict[LobbyConstant.MAGIC_ITEM_TYPE_100_PERCENT_WIN] = createButton(LobbyConfig.ProductManager.Android.MagicItem100PercentWin, "MagicItem100PercentWin", 350, background.height / 3);
            buttonDict[LobbyConstant.MAGIC_ITEM_TYPE_LUCKY_SPIN_TYPE_1] = createButton(LobbyConfig.ProductManager.Android.MagicItem10PercentLuckySpin, "MagicItem10PercentLuckySpin", 650, background.height / 3);
            buttonDict[LobbyConstant.MAGIC_ITEM_TYPE_LUCKY_SPIN_TYPE_2] = createButton(LobbyConfig.ProductManager.Android.MagicItem20PercentLuckySpin, "MagicItem20PercentLuckySpin", 200, background.height * 2 / 3);
            buttonDict[LobbyConstant.MAGIC_ITEM_TYPE_DOUBLE_EXP] = createButton(LobbyConfig.ProductManager.Android.MagicItemDoubleExp, "MagicItemDoubleExp", 500, background.height * 2 / 3);
            buttonDict[LobbyConstant.MAGIC_ITEM_TYPE_LUCKY_SYMBOL] = createButton(LobbyConfig.ProductManager.Android.MagicItemLuckySymbol, "MagicItemLuckySymbol", 800, background.height * 2 / 3);
            my.reloadMagicItemBuyBtn = function(){
                if( LobbyConfig.additionalInfo.magicItem.currentActiveItem !== LobbyConstant.MAGIC_ITEM_TYPE_DEFAULT){
                    for(var key in buttonDict){
                        if(buttonDict.hasOwnProperty(key)){
                            if(key != LobbyConfig.additionalInfo.magicItem.currentActiveItem){
                                Helper.Button.disableBtn(buttonDict[key]);
                            }
                        }
                    }
                }
            };
            my.reloadMagicItemBuyBtn();
            Lobby.PhaserJS.centerWorldForPopupWithBackground(group, background);

            Lobby.PhaserJS.scaleGroupForOptimize(group, true);
            if (LobbyConfig.useManagerForPopUp) {
                // pop up queue
                ManagerForPopUp.addPopUpToQueue(
                    ManagerForPopUp.createPopUpData(
                        my,
                        group
                    ),
                    true // isShow
                );
            } else {
                my.openPopupWithAnimateUpNew(group);
            }
        },LobbyConfig.isTestStrategy);
        my.createTestButton(800,50,"Reset Cache",slotGameList,function(){
            my.showLoadingAnimation();
            LobbyRequest.User.getAdditionalInfo(function(isSuccess,dataF, response){
                if(isSuccess) {
                    my.parseAdditionalInfo(dataF);
                    my.hideLoadingAnimation();
                }
            });
        },LobbyConfig.isTestStrategy);
        resumeDownloadAllGameSlot();
    };
    /**
     * Currently not do anything, just call function "createSlotGameCell"
     * @param gameData: slot game Data
     * @param posX: X Position
     * @param posY: Y Position
     * @param parentGroup: group contains slots game
     */
    var checkAndCreateSlotGameCell = function (gameData, posX, posY, parentGroup){

            createSlotGameCell(gameData, posX, posY, parentGroup);

    };
    /**
     * Auto resume download slot game if the download was failed
     */
    var resumeDownloadAllGameSlot = function(){
        var downloadingQueue = ManagerForDownloadGameSlot.getDownloadingQueue();
        if(downloadingQueue === null) return;
        for(var i = 0;i<downloadingQueue.length;i++){
            var gameId = downloadingQueue[i];
            var slotCell;
            for(var y = 0;y<my.slotCellList.length;y++){
                if(gameId === my.slotCellList[y].gameData.game_id){
                    slotCell = my.slotCellList[y];
                    break;
                }
            }
            if(Lobby.Utils.objectNotNull(slotCell.downloadGroup)) slotCell.downloadGame();
        }
    };
    /**
     * Create one slot game UI
     * @param gameData: slot game Data
     * @param posX: X Position
     * @param posY: Y Position
     * @param parentGroup: group contains slot game
     */
    var createSlotGameCell = function (gameData, posX, posY, parentGroup) {
        for (var index = 0; index < LobbyConfig.listGameInfo.length; ++index) {
            if (gameData.id === LobbyConfig.listGameInfo[index].id) {
                gameData = LobbyConfig.listGameInfo[index];
                break;
            }
        }
        var slotCell = my.add.group();
        my.slotCellList.push(slotCell);
        slotCell.gameData = gameData;
        slotCell.x = posX;
        slotCell.y = posY;

        //slotCell.width = 275;
        //slotCell.height = 275;


        //slotCell.add(parentGroup);

        //my.showCrownAnimationOnSlotGame(posX - 18, posY - 36, parentGroup);


        var frame = my.add.sprite(0,
            0,
            "frame_slot",
            null,
            slotCell);
        frame.width = 275;
        frame.height = 275;
        slotCell.add(frame);

        var posXAdd = 135;
        var posYAdd = 135;
        var size = {
            width: 250,
            height: 250
        };
        frame.visible = false;
        //gameData.game_id= "h";
        //gameData.id = 1;
        //game_slot.anchor.setTo(0.5,0.5);


        //------------ 2016-05-12: Toan: show crown animation --------------//
        if (gameData.min_crown > 0) {

            var xCrown = -10;
            var yCrown = -22;
            var xAnimation = 8;
            var yAnimation = 14;

            //switch (gameData.game_id) {
            //    case "kpop":
            //    case "bikinibeach":
            //    case "mafia":
            //    case "4beauties":
            //        xCrown = -11;
            //        yCrown = -23;
            //        xAnimation = 9;
            //        yAnimation = 18;
            //        break;
            //}


            var crownPremium = my.add.sprite(
                    xCrown,
                    yCrown,
                    "crown-vip-border",
                    null,
                    slotCell
                )
                ;
            crownPremium.width = 113;
            crownPremium.height = 113;
            slotCell.add(crownPremium);

            my.showCrownAnimationOnSlotGame(-20 + xAnimation, -35 + yAnimation, slotCell);

            my.showStarAnimationOnSlotGame(-43 + xAnimation, -88 + yAnimation, slotCell);
        }


        //var shadow = Lobby.PhaserJS.createSpriteRectangleExt(
        //    my,
        //    posXAdd,
        //    posYAdd,
        //    function () {
        //    },
        //    function () {
        //    },
        //    function () {
        //    },
        //    slotCell,
        //    LobbyConfig.isDebug,
        //    'gameSlot_' + gameData.id
        //);

        //shadow.anchor = {
        //    x:0.5,
        //    y:0.5
        //        };
        //    shadow.width = size.width;
        //    shadow.height = size.height;
        //    shadow.scale = {
        //        x: 0.7,
        //        y: 0.7
        //    };
        //
        //        shadow.tint = 0xFFFF6F;
        //        shadow.alpha = 0.5;
        //        shadow.blendMode = PIXI.blendModes.ADD;
        //        shadow.visible = false;
        //switch (gameData.game_id) {
        //    case "kpop":
        //    case "bikinibeach":
        //    case "mafia":
        //    case "4beauties":
        //        posYAdd -= 20;
        //        break;
        //}

        slotCell.downloadGame =
        function(){
            my.downloadGameWithSlotCell(slotCell);
        };
        if(!ManagerForDownloadGameSlot.enableHidedDownload){
            slotCell.downloadGame = function() {
                //LobbyConfig.downloadGameInfo[slotCell.gameData.game_id].isDownloading = true;
                ManagerForDownloadGameSlot.saveDownloadingQueue(slotCell.gameData.game_id, true);
                slotCell.downloadGroup.visible = true;
                slotCell.downloadGroup.downloadText.visible = true;
                slotCell.downloadHidedGroup.visible = true;
                ManagerForDownloadGameSlot.downloadBundle(slotCell.gameData.game_id, function () {
                    if (Lobby.Utils.objectNotNull(slotCell)) slotCell.downloadGroup.destroy();
                    ManagerForDownloadGameSlot.saveDownloadingQueue(slotCell.gameData.game_id, false);
                    LobbyConfig.downloadGameInfo[slotCell.gameData.game_id].currentVersion = LobbyConfig.downloadGameInfo[slotCell.gameData.game_id].version;
                }, function (error) {
                    //LobbyConfig.downloadGameInfo[slotCell.gameData.game_id].isDownloading = false;
                    ManagerForDownloadGameSlot.saveDownloadingQueue(slotCell.gameData.game_id, false);
                    slotCell.downloadGroup.reset();
                }, function (progress) {
                    slotCell.downloadGroup.downloadText.text = progress + "%";
                    slotCell.downloadGroup.downloadSlider.scale.setTo((progress / 100) * 0.3, 0.3);
                },
                function(){
                    /**
                     * Call back crc failed
                     */
                },
                function(){
                    /**
                     * Call back memory error
                     */

                    LobbyC.MainMenu.showNotificationPopup(my.selectlanguage.popup_gift_warning.text,my.selectlanguage.not_enough_space.text);
                });
            }
        };

        var game_slot = Lobby.PhaserJS.createSpriteRectangleWithHoldCallBack(
            my,
            posXAdd,
            posYAdd,
            function () {
                slotCell.scale.setTo(0.9);
                game_slot.alpha = 0.8;
                slotCell.x += 275*0.05;
                slotCell.y += 275*0.05;
                my.beforeHoverMousePosition = {x:my.input.activePointer.x,y:my.input.activePointer.y};
            },
            function () {
                //game_slot.alpha = 0.8;
            },
            function () {
                //game_slot.alpha = 1.0;
            },
            true, // useHandCursor
            true, // isPixelPerfectClick
            true, // isPixelPerfectOver
            slotCell,
            LobbyConfig.isDebug,
            "gameSlot_"+gameData.id,
            function () {
                game_slot.alpha = 1.0;
                slotCell.scale.setTo(1.0);
                game_slot.alpha = 1.0;
                slotCell.x = posX;
                slotCell.y = posY;
                var currentMousePosition =  my.input.activePointer;
                if(Phaser.Math.distance(my.beforeHoverMousePosition.x,my.beforeHoverMousePosition.y,currentMousePosition.x,currentMousePosition.y)>10) return;
                //if(!my.game.pageViewMain.isStopped) return;
                for (var index = 0; index < LobbyConfig.listGameInfo.length; ++index) {
                    if (slotCell.gameData.id === LobbyConfig.listGameInfo[index].id) {
                        slotCell.gameData = LobbyConfig.listGameInfo[index];
                        break;
                    }
                }
                if(LobbyConfig.commingSoonGameId.indexOf(slotCell.gameData.game_id)>-1){
                    my.showNotificationPopup(
                        my.selectlanguage.new_game_tile.text,
                        my.selectlanguage.new_game_description.text
                    );
                }else
                //if (slotCell.gameData.is_unlocked || LobbyConfig.isTestAlgorithmMode) {
                if (slotCell.gameData.is_unlocked) {
                    //if(gameData.game_id != "nezha" &&
                    //    gameData.game_id != "deepblue" &&
                    //    gameData.game_id != "goldenegg" &&
                    //    gameData.game_id != "pharaoh") {
                    //    my.showNotificationPopup(
                    //        "Porting game",
                    //        "We are working hard to port this game. Watch this space."
                    //    );
                    //    return;
                    //}

                    var gameName = LobbyConfig.downloadGameInfo[slotCell.gameData.game_id].gameName;
                    if(!Lobby.Utils.isWeb()
                        && LobbyConfig.downloadGameInfo[slotCell.gameData.game_id]
                        &&(!LobbyConfig.downloadGameInfo[slotCell.gameData.game_id].isDownloaded
                        || my.isGameSlotOnlyDownloadedBeHide(slotCell.gameData.game_id) === true)){
                        if(LobbyConfig.downloadGameInfo[slotCell.gameData.game_id].isDownloading
                        || LobbyConfig.downloadGameInfo[slotCell.gameData.game_id].isRuningAnim4DownloadBehide === true){
                            //my.showNotificationPopup("Download",gameName + " is now downloading.",null, null);
                            my.showNotificationPopupV2(my.selectlanguage.download_remove.download,
                                my.selectlanguage.download_remove.downloading +gameName + my.selectlanguage.download_remove.cancle_download,function(){
                                if(LobbyConfig.downloadGameInfo[slotCell.gameData.game_id].isRuningAnim4DownloadBehide === true)
                                {
                                    if(Lobby.Utils.objectNotNull(slotCell.downloadGroup)){
                                        slotCell.downloadGroup.reset();
                                    }
                                }else{
                                    ManagerForDownloadGameSlot.abortDownload(slotCell.gameData.game_id,null);
                                }
                            }, null,my.selectlanguage.download_remove.stop,my.selectlanguage.download_remove.continue);

                        }
                        else{


                            //else{

                                var downloadingQueue = ManagerForDownloadGameSlot.getDownloadingQueueNotFromCache();
                                if(downloadingQueue.length === 0){
                                    my.showNotificationPopup("",gameName + my.selectlanguage.download_remove.message_download,function(){
                                        slotCell.downloadGame();
                                    }, null, my.selectlanguage.download_remove.info_remove, my.selectlanguage.download_remove.download);
                                }else{

                                    my.showNotificationPopup("",my.selectlanguage.download_remove.wait_to_download + gameName + my.selectlanguage.download_remove.download_soon,function(){
                                        slotCell.downloadGame();
                                    }, null);
                                }
                                //my.showNotificationPopup(gameName + " will start downloading shortly.",function(){
                                //    slotCell.downloadGame();
                                //}, null, LobbyConstant.DOWNLOAD_PLAY_OTHER_AVAILABLE_GAME, LobbyConstant.DOWNLOAD_REMOVE_GAME);
                            //}
                        }
                    }
                    else {
                        if(LobbyConfig.downloadGameInfo[gameData.game_id].currentVersion!=""
                            && LobbyConfig.downloadGameInfo[slotCell.gameData.game_id].currentVersion != LobbyConfig.downloadGameInfo[slotCell.gameData.game_id].version
                            && my.isGameSlotOnlyDownloadedBeHide(slotCell.gameData.game_id) === false){

                            my.showNotificationPopup(my.selectlanguage.download_remove.update,
                                my.selectlanguage.download_remove.message_update,function(){
                                ManagerForDownloadGameSlot.deleteBundleGame(gameData.game_id,function(){
                                    LobbyConfig.downloadGameInfo[gameData.game_id].isDownloaded = false;
                                    my.createDownloadGroup(slotCell,true);
                                    slotCell.downloadGame();
                                },function(er){
                                    if(LobbyConfig.isDebug) console.log(er);
                                });
                            }, null);
                        }
                        else my.showGame(gameData.game_id);
                    }
                }
                else {
                    if (gameData.premium_type === 0) {
                        if (gameData.min_crown > 0) {
                            my.showUnlockGameByCrownPopup(
                                my.selectlanguage.popup_user_game_unlock.text6, // "Unlock By Crown",
                                my.selectlanguage.popup_user_game_unlock.text7 + gameData.min_crown + my.selectlanguage.popup_user_game_unlock.text8,//"Unlock this game with " + gameData.min_crown + " crowns?",
                                gameData
                            );
                        }
                        else {
                            my.showNotificationPopup(
                                my.selectlanguage.popup_gift_error_oop.text,
                                my.selectlanguage.popup_need_level_to_play_game.text1 + gameData.min_level + my.selectlanguage.popup_need_level_to_play_game.text2//"You need to reach level " + (gameData.min_level /*+1*/ ) + " to play this game."
                            );
                        }
                    }
                    else {
                        my.showUnlockGameByCrownPopup(
                            my.selectlanguage.popup_user_game_unlock.text6, // "Unlock By Crown",
                            my.selectlanguage.popup_user_game_unlock.text7 + gameData.min_crown + my.selectlanguage.popup_user_game_unlock.text8,//"Unlock this game with " + gameData.min_crown + " crowns?",
                            gameData
                        );
                    }
                }

                // Rule:
                //  prenium = true -> required crown
                //      = false -> required level or crown(=0 thi chi co level)
                //  is_unlock = true -> da unlock
                //      = false -> chua unlock
                // 2016-06-02: Phuoc: cập nhật lại gameData từ LobbyConfig.listGameInfo
            },
            null,
            function() {
                return (!Lobby.Utils.isWeb() &&
                        game_slot.isUnlock &&
                        gameData.game_id != "nezha" &&
                        LobbyConfig.downloadGameInfo[gameData.game_id] &&
                        LobbyConfig.downloadGameInfo[gameData.game_id].isDownloaded &&
                        !my.isGameSlotOnlyDownloadedBeHide(gameData.game_id));
            },
            1000,
            function(){
                game_slot.alpha = 1.0;
                slotCell.scale.setTo(1.0);
                slotCell.x = posX;
                slotCell.y = posY;
                var currentMousePosition =  my.input.activePointer;
                if(Phaser.Math.distance(my.beforeHoverMousePosition.x,my.beforeHoverMousePosition.y,currentMousePosition.x,currentMousePosition.y)>10) return;
                //my.game.pageViewMain.endMove();
                my.showNotificationPopup("", my.selectlanguage.download_remove.message_remove, function(){
                        LobbyConfig.downloadGameInfo[gameData.game_id].isDownloaded = false;
                        LobbyConfig.downloadGameInfo[gameData.game_id].isDownloading = false;
                        my.createDownloadGroup(slotCell);
                    ManagerForDownloadGameSlot.deleteBundleGame(gameData.game_id,function(){
                        if(LobbyConfig.isDebug) console.log("Delete game completed.");
                    },function(er){
                        if(LobbyConfig.isDebug) console.log(er);
                        my.showNotificationPopup("Error",my.selectlanguage.download_remove.delete_failed);
                    });
                },
                null,
                null,
                my.selectlanguage.download_remove.remove);
            }
        );
        //game_slot.width = size.width;
        //game_slot.height = size.height;
        //game_slot.anchor = {
        //    x: 0.5,
        //    y: 0.5
        //};
        game_slot.anchor =  my.calculateAnchor(game_slot.width, game_slot.height-8);
        game_slot.scale.setTo(100/80, 100/80);
        //game_slot.height = 200;
        //game_slot.scale.setTo(0.6, 0.6);
        slotCell.add(game_slot);
        slotCell.game_slot = game_slot;
        game_slot.isUnlock = gameData.is_unlocked;

        var isLockGameSlot = !gameData.is_unlocked;
        if(isLockGameSlot === true && LobbyConfig.availableGame.indexOf(gameData.game_id) > -1)
            ManagerForDownloadGameSlot.saveDownloadingQueue(gameData.game_id, false);
        var isComingSoon = LobbyConfig.commingSoonGameId.indexOf(gameData.game_id)>-1;
        // 2016-05-10: Phuoc: level của user = my._userData.profile.level + 1
        //if ((isLockGameSlot||isComingSoon) && !LobbyConfig.isTestAlgorithmMode) {
        if ((isLockGameSlot||isComingSoon)) {
            var groupLockPanel = my.add.group();
            groupLockPanel.min_level = gameData.min_level;
            groupLockPanel.is_unlocked = gameData.is_unlocked;
            groupLockPanel.id = gameData.id;
            groupLockPanel.x = 15;
            groupLockPanel.y = (frame.height - 40) / 2 + 10;
            var lock = my.add.sprite(
                160,
                80,
                "lock_icon",
                null,
                groupLockPanel);
            lock.width = 80;
            lock.height = 80;

            var lockPanelBG = my.add.graphics(0, 0);
            lockPanelBG.beginFill();
            lockPanelBG.beginFill(0x00000, 0.7);
            lockPanelBG.drawRect(
                2,
                0,
                234,
                40
            );
            lockPanelBG.endFill();
            groupLockPanel.add(lockPanelBG);
            groupLockPanel.lockPanelBG = lockPanelBG;
            var fontSize = 30;
            if(my.selectlanguage === my.arrayLanguage.my ||
                my.selectlanguage === my.arrayLanguage.indo){
                fontSize = 21;
            }
            groupLockPanel.type = 0;
            //var textInLockIcon = "Unlock - Level " + (gameData.min_level);
            var textInLockIcon;
            if(isLockGameSlot){
                textInLockIcon = my.selectlanguage.popup_user_game_unlock.text4 + " - " + my.selectlanguage.popup_user_game_unlock.text1 + " " + (gameData.min_level);
                if (isLockGameSlot && gameData.premium_type === 1) {
                    textInLockIcon = my.selectlanguage.popup_user_game_unlock.text4 + " - " + gameData.min_crown + " " + my.selectlanguage.popup_user_game_unlock.text5;
                }
            }
            if(isComingSoon){
                textInLockIcon = my.selectlanguage.body_slot_game_coming_soon.text;
            }
            groupLockPanel.type = 1;

            var lockText = my.add.text(
                lockPanelBG.width / 2,
                lockPanelBG.height / 2,
                textInLockIcon,
                {
                    font: fontSize + "px PassionOne-Regular",
                    fill: "#FFFFFF"
                },
                groupLockPanel
            );
            if(my.selectlanguage === my.arrayLanguage.trad_cn || my.selectlanguage === my.arrayLanguage.cn){
                lockText.anchor.setTo(0.5, 0.4);
            }
            else lockText.anchor.setTo(0.5, 0.5);
            groupLockPanel.lockText = lockText;
            groupLockPanel.min_level = gameData.min_level;
            groupLockPanel.min_crown =  gameData.min_crown;
            groupLockPanel.game_id = gameData.game_id;
            my.groupLockPanelList.push(groupLockPanel);
            slotCell.add(groupLockPanel);
            slotCell.groupLockPanel = groupLockPanel;
        }else if(!Lobby.Utils.isWeb()
            && (
            (LobbyConfig.downloadGameInfo[gameData.game_id] &&
            !LobbyConfig.downloadGameInfo[gameData.game_id].isDownloaded)
            || my.isGameSlotOnlyDownloadedBeHide(gameData.game_id) === true)){
            my.createDownloadGroup(slotCell,LobbyConfig.downloadGameInfo[gameData.game_id].currentVersion!=""  && LobbyConfig.downloadGameInfo[gameData.game_id].currentVersion != LobbyConfig.downloadGameInfo[gameData.game_id].version);
        }
        slotCell.updateCell = function(){
            for (var index = 0; index < LobbyConfig.listGameInfo.length; ++index) {
                if (gameData.id === LobbyConfig.listGameInfo[index].id) {
                    gameData = LobbyConfig.listGameInfo[index];
                    break;
                }
            }
            slotCell.gameData = gameData;
            if(LobbyConfig.commingSoonGameId.indexOf(slotCell.gameData.game_id)>-1) return;
            game_slot.isUnlock = gameData.is_unlocked;
            var isLockGameSlot = !gameData.is_unlocked;
            //if(!isLockGameSlot || LobbyConfig.isTestAlgorithmMode){
            if(!isLockGameSlot){
                if(slotCell.groupLockPanel){
                    slotCell.groupLockPanel.destroy();
                }

            }
            if(!Lobby.Utils.isWeb() && slotCell.gameData.is_unlocked && Lobby.Utils.objectIsNull(slotCell.downloadGroup)
                && (

                (LobbyConfig.downloadGameInfo[gameData.game_id] &&
                !LobbyConfig.downloadGameInfo[gameData.game_id].isDownloaded)
                || my.isGameSlotOnlyDownloadedBeHide(slotCell.gameData.game_id) === true))  my.createDownloadGroup(slotCell);

        };
        parentGroup.add(slotCell);
    };
    /**
     * Create download UI
     * @param slotCell: slot game group
     * @param isDownloadImmediately: deprecated
     */
    my.createDownloadGroup = function(slotCell, isDownloadImmediately){
        /**
         * Handle download game
         */
        var downloadGroup = my.add.group();
        slotCell.add(downloadGroup);
        slotCell.downloadGroup = downloadGroup;
        downloadGroup.download = my.add.sprite(180,200,"btn_download",null,downloadGroup);
        downloadGroup.download.width = 70;
        downloadGroup.download.height = 70;
        var downloadHidedGroup = my.add.group();
        downloadGroup.add(downloadHidedGroup);
        slotCell.downloadHidedGroup = downloadHidedGroup;
        var downloadSliderBG = my.add.sprite(
            195,
            255,
            'slider_bar_bg',
            null,
            downloadHidedGroup
        );
        downloadGroup.downloadSliderBG = downloadSliderBG;
        downloadSliderBG.anchor.setTo(0,0.5);
        downloadSliderBG.scale.setTo(0.3);

        var downloadSlider = my.add.sprite(
            195,
            255,
            'slider_bar',
            null,
            downloadHidedGroup
        );
        downloadGroup.downloadSlider = downloadSlider;
        downloadSlider.anchor.setTo(0,0.5);
        downloadSlider.scale.setTo(0.3*0,0.3);



        var downloadTextBackground = my.add.sprite(140,150,"progress_bg",null,downloadHidedGroup);
        downloadGroup.downloadTextBackground = downloadTextBackground;
        downloadTextBackground.anchor.setTo(0.5,0.5);
        downloadTextBackground.alpha = 0.75;

        var downloadText = my.add.text(140,130, "0%", {
            //font: "50px ICIEL-KONI-BLACK",
            font: "40px PassionOne-Regular",
            fill: "#FFFFFF",
            align: "center"
        }, downloadHidedGroup);
        downloadGroup.downloadText = downloadText;
        downloadText.anchor.setTo(0.5,0);
        downloadHidedGroup.visible = false;

        downloadGroup.reset = function(){
            downloadGroup.downloadSlider.scale.setTo(0.3*0,0.3);
            downloadGroup.downloadText.text = "0%";
            downloadGroup.download.visible = true;
            slotCell.downloadHidedGroup.visible = false;
            downloadSlider.scale.setTo(0,0.3);
        };
    };
    /**
     * Reload slot games UI after changing language
     */
    my.reloadUIGameSlot = function(){
        for(var i = 0; i < my.groupLockPanelList.length; i++){

            var fontSize = 30;
            if(my.selectlanguage === my.arrayLanguage.my ||
                my.selectlanguage === my.arrayLanguage.indo){
                fontSize = 21;
            }

            var textInLockIcon = my.selectlanguage.popup_user_game_unlock.text4 + " - " + my.selectlanguage.popup_user_game_unlock.text1 + " " + (my.groupLockPanelList[i].min_level);
            if (my.groupLockPanelList[i].premium_type === 1) {
                textInLockIcon = my.selectlanguage.popup_user_game_unlock.text4 + " - " + my.groupLockPanelList[i].min_crown + " " + my.selectlanguage.popup_user_game_unlock.text5;
            }

            var isComingSoon = LobbyConfig.commingSoonGameId.indexOf(my.groupLockPanelList[i].game_id)>-1;
            if(isComingSoon){
                textInLockIcon = my.selectlanguage.body_slot_game_coming_soon.text;
            }

            my.groupLockPanelList[i].lockText.destroy();
            my.groupLockPanelList[i].lockText = my.add.text(
                my.groupLockPanelList[i].lockPanelBG.width / 2,
                my.groupLockPanelList[i].lockPanelBG.height / 2,
                textInLockIcon,
                {
                    font: fontSize + "px PassionOne-Regular",
                    fill: "#FFFFFF"
                },
                my.groupLockPanelList[i]
            );

            if(my.selectlanguage === my.arrayLanguage.trad_cn || my.selectlanguage === my.arrayLanguage.cn){
                my.groupLockPanelList[i].lockText.anchor.setTo(0.5, 0.4);
            }
            else my.groupLockPanelList[i].lockText.anchor.setTo(0.5, 0.5);
        }
    };
    /**
     * Deprecated
     * @param button
     * @param contentList
     * @param type
     * @param numberOfPage
     */
    var changePage = function (button, contentList, type, numberOfPage) {
        slotGameList.currentPage += type;

        // 2016-06-11: Phuoc: fix lỗi nhấn nhanh hiện page rỗng
        if (slotGameList.currentPage < 0 || slotGameList.currentPage >= numberOfPage) {
            return;
        }

        var anm;
        var anmTimeDuration = 300;
        var anmFunc = function () {
            anm = my.add.tween(contentList);
            anm.to(
                {x: -arrayPosXPage[slotGameList.currentPage]},
                anmTimeDuration, Phaser.Easing.Linear.None
            );
            anm.start();
        };
        anmFunc();
        //contentList.position.x += type * 1500;
        //if (slotGameList.currentPage === arrayPosXPage.length - 1) {
        if (slotGameList.currentPage === numberOfPage - 1) {
            slotGameList.btnRight.visible = false;
        } else {
            slotGameList.btnRight.visible = true;
        }

        if (slotGameList.currentPage === 0) {
            slotGameList.btnLeft.visible = false;
        }
        else {
            slotGameList.btnLeft.visible = true;
        }


        setToggleUI(slotGameList.currentPage);
    };
    /**
     * Set Toggle UI when scroll Body
     * @param currentPage: current Page
     */
    var setToggleUI = function (currentPage) {
        for (i = 0; i < arrayDot.length; i++) {
            if (i != currentPage) {
                arrayDot[i].frame = 0;
            }
            else {
                arrayDot[i].frame = 1;
            }
        }
    };
    /**
     * show group Body UI
     * @param groupID: group ID
     */
    my.showGroup = function (groupID) {
        destroy();
        switch (groupID) {
            case 1:
                my._maskBackBtn.visible = false;
                showBodyGroup();
                break;
            case 2:
                my._maskBackBtn.visible = true;
                showTableGame();
                break;
            case 3:
                my._maskBackBtn.visible = true;
                showSlotGameList(true);
                break;
        }
        //my.showPopupFriendNew("friends");
    };
    /**
     * Destroy function
     */
    var destroy = function () {
        if (tableGame != null) {
            tableGame.destroy();
        }
        if (my.mainBodyGroup != null) {
            my.mainBodyGroup.destroy();
        }
        if (slotGameList != null) {
            slotGameList.destroy();
            arrayDot = [];
        }
    };
    /**
     * Show Friend, Leaderboard, Inbox Popup
     * @param type: string - popup type("leaderboard", "friend", "inbox")
     * @param isSwitchTap: boolen - false if want to hide popup to speed up Open Popup process
     * @param isReloadWhenAcceptInbox: deprecated
     */
    my.showPopupFriendNew = function (type,isSwitchTap,leaderBoardType) {


        switch (type) {
            case "leaderboard":
                // later: remove code .frame
                //if(groupPopupParent && groupPopupParent.btnLeaderboard.frame === 1 )return;
                reset();
                my.showLoadingAnimation();
                //if(LobbyConfig.isTestStrategy){
                    LobbyRequest.User.getLeaderboard(
                        leaderBoardType ? leaderBoardType : LobbyConstant.LeaderBoard.SORT_LEADER_BOARD_BY_COIN,
                        function (data) {
                            my.currentLeaderBoardType = leaderBoardType ? leaderBoardType : LobbyConstant.LeaderBoard.SORT_LEADER_BOARD_BY_COIN;
                            if (groupPopupParent === null || groupPopupParent.children.length === 0) {
                                initPopupFriends();

                            }

                            setCategoryUI("leaderboard",leaderBoardType);
                            groupPopupParent.labelText.text = my.selectlanguage.popup_gift_leaderboard.text;
                            my.hideLoadingAnimation();
                            my.showLeaderBoard(groupContainListFriend, data.member,isSwitchTap);
                        },
                        my
                    );
                //}else {
                //    LobbyRequest.User.starDom(
                //        leaderBoardType ? leaderBoardType : LobbyConstant.LeaderBoard.type.bank_roll,
                //        LobbyConstant.LeaderBoard.sort.all,
                //        "",
                //        function (data) {
                //
                //            if (groupPopupParent === null || groupPopupParent.children.length === 0) {
                //                initPopupFriends();
                //            }
                //            setCategoryUI("leaderboard",leaderBoardType);
                //            groupPopupParent.labelText.text = my.selectlanguage.popup_gift_leaderboard.text;
                //            my.hideLoadingAnimation();
                //            my.showLeaderBoard(groupContainListFriend, data.member, isSwitchTap);
                //            //CacheManager.Stardom.cacheData[key_create] = data;
                //            //callbackStarDom(
                //            //    CacheManager.Stardom.cacheData[key_create],
                //            //    my.createStardomTableCellBankroll
                //            //)
                //            //createFriendListView(leaderboardGroup, contentGroup, 100, 125, 4.5, data.member, true);
                //        },
                //        my
                //    );
                //}
                break;
            case "friends":
                // later: remove code .frame
                //if(groupPopupParent && groupPopupParent.btnFriends.frame === 1 )return;
                reset();
                if (my._userData.isFacebookUser) {
                    var timestamp = new Date().getTime();
                    if (!my.isCompleteFirstTimeLoadFriend) {
                        my.showLoadingAnimation();
                        my.time.events.add(1000,
                            function () {
                                my.showPopupFriendNew(type, isSwitchTap);
                            }, this);
                    } else if (my._userData.friendList === null ||
                        (timestamp - my.lastTimeGetFriend) >= LobbyConfig.scheduleReloadFrequency) {

                        my.showLoadingAnimation();
                        LobbyRequest.User.getFriendList(
                            function (isSuccess, data) {
                                if(Lobby.Utils.objectNotNull(LobbyC.MainMenu.isLogOut)&& LobbyC.MainMenu.isLogOut) return;
                                if (!isSuccess) {
                                    Lobby.Utils.printConsoleLog("Get friend list from server failed. Debug info: ", arguments);
                                    my.hideLoadingAnimation();
                                    if (data === LobbyConstant.ERROR_MESSAGE_NOT_LOGIN) {
                                        my.showNotificationPopup(
                                            my.selectlanguage.popup_gift_warning.text,
                                            my.selectlanguage.FB_token_expired.text,
                                            function () {
                                                my.clearDataAndLogOut();
                                            }
                                        );
                                    }
                                    return;
                                }
                                my.lastTimeGetFriend = new Date().getTime();
                                if (groupPopupParent === null || groupPopupParent.children.length === 0) {
                                    initPopupFriends();
                                }
                                setCategoryUI("friends",leaderBoardType);
                                groupPopupParent.labelText.text = my.selectlanguage.popup_gift_friends.text;
                                my._userData.friendList = data.member;
                                my.parseDataFriendListNew(my._userData.friendList);
                                my.showFriendsPopup(groupContainListFriend, data.member,isSwitchTap);
                                my.hideLoadingAnimation();
                            },
                            my
                        );
                    }
                    else {
                        if (groupPopupParent === null || groupPopupParent.children.length === 0) {
                            initPopupFriends();
                        }
                        setCategoryUI("friends",leaderBoardType);
                        groupPopupParent.labelText.text = my.selectlanguage.popup_gift_friends.text;
                        my.showFriendsPopup(groupContainListFriend, my._userData.friendList,isSwitchTap);
                        my.hideLoadingAnimation();
                    }
                }
                else {
                    my.showPopupSwitchToFacebook(my.selectlanguage.popup_gift_error_oop.text, my.selectlanguage.popup_gift_error_message.text);
                }
                break;
            case "inbox":
                // later: remove code .frame
                //if(groupPopupParent && groupPopupParent.btnInbox.frame === 1 && isReloadWhenAcceptInbox != true)return;
                if (my._userData.isFacebookUser
                    //|| LobbyConfig.isTestStrategy
                ) {
                    reset();
                    LobbyRequest.User.getListInbox(
                        function (data) {
                            if (groupPopupParent === null || groupPopupParent.children.length === 0) {
                                initPopupFriends();
                            }
                            setCategoryUI("inbox",leaderBoardType);
                            groupPopupParent.labelText.text = my.selectlanguage.popup_gift_inbox.text;
                            my.hideLoadingAnimation();
                            my.showInbox(groupContainListFriend, data.member,isSwitchTap);
                        },
                        my,
                        false //skipLoadingAnimation
                    );
                }
                else {
                    my.showPopupSwitchToFacebook(my.selectlanguage.popup_gift_error_oop.text, my.selectlanguage.popup_gift_error_message.text);
                }
                break;
        }


    };
    /**
     * INIT POPUP FRIENDS, INBOX, LEADERBOARD
     * @param popupDidAppear: deprecated
     */
    var initPopupFriends = function (popupDidAppear) {
        groupPopupParent = my.add.group();

        groupContainListFriend = my.add.group();
        groupPopupParent.add(groupContainListFriend);

        var background = my.add.sprite(0, 0, "background_popup", null, groupPopupParent);
        //background.anchor.setTo(0.5,0.5);
        background.scale.setTo(1.95); // reduce 50% resolution
        groupPopupParent.add(background);
        var backgroundInside = my.add.sprite(
            background.x + background.width / 2,
            background.y + background.height / 2 + 25,
            "background_inside_popup", null, groupPopupParent);
        backgroundInside.anchor.setTo(0.5, 0.5);
        backgroundInside.scale.setTo(0.85, 0.85);
        groupPopupParent.add(backgroundInside);

        var exitBtn = my.createButtonExitPopup(
            groupPopupParent,
            1200,
            -15,
            999,
            function () {
                if (Lobby.Utils.objectNotNull(groupPopupParent)) {
                    groupPopupParent.destroy();
                }
                groupPopupParent = null;
                //ManagerForPopUp.forceClosePopUp(my, groupPopupParent, function () {
                //});
                //reset();
            }
        );



        groupPopupParent.inboxBorder = my.add.sprite(400,0,"inbox_border",null,groupPopupParent);
        groupPopupParent.leaderBoardBorder = my.add.sprite(400,0,"leader_board_border",null,groupPopupParent);
        //groupPopupParent.leaderBoardBorder.visible = false;

        //groupPopupParent.inboxBorder.visible = false;


        groupPopupParent.labelText = my.add.text(background.x + background.width / 2, 30, my.selectlanguage.popup_gift_friends.text, {
            font: "50px PassionOne-Regular",
            fill: "#eacaf2"
        }, groupPopupParent);

        groupPopupParent.labelText.anchor.setTo(0.5, 0);


        groupPopupParent.topCoinBtn = Lobby.PhaserJS.createSpriteRectangleExt(
            my,
            400,
            125,
            function () {
                if(groupPopupParent.topCoinBtn.isActive) return;
                my.showPopupFriendNew("leaderboard", true, LobbyConstant.LeaderBoard.SORT_LEADER_BOARD_BY_COIN);
                //console.log("abc");
            },
            function () {
            },
            function () {

            },
            groupPopupParent, LobbyConfig.isDebug,
            'leader_board_switch_btn_left'
        );
        groupPopupParent.topCoinBtn.input.priorityID = 100;


        var topCoinText = my.add.text(groupPopupParent.topCoinBtn.width / 2,
            groupPopupParent.topCoinBtn.height / 2, "Coins", {
                font: "45px PassionOne-Bold",
                fill: "#eacaf2"
            }, groupPopupParent);
        topCoinText.anchor.setTo(0.5, 0.5);
        groupPopupParent.topCoinBtn.addChild(topCoinText);
        groupPopupParent.topCoinBtn.textBtn = topCoinText;

        groupPopupParent.topTotalBetBtn = Lobby.PhaserJS.createSpriteRectangleExt(
            my,
            groupPopupParent.topCoinBtn.x+groupPopupParent.topCoinBtn.width,
            groupPopupParent.topCoinBtn.y,
            function () {
                if(groupPopupParent.topTotalBetBtn.isActive) return;
                my.showPopupFriendNew("leaderboard", true, LobbyConstant.LeaderBoard.SORT_LEADER_BOARD_BY_SLOT_TOTAL_BET);
                //groupPopupParent.switchToLeaderboardTab(LobbyConstant.LeaderBoard.SORT_LEADER_BOARD_BY_SLOT_TOTAL_BET);
            },
            function () {
            },
            function () {
            },
            groupPopupParent, LobbyConfig.isDebug,
            'leader_board_switch_btn_right'
        );

        groupPopupParent.topTotalBetBtn.input.priorityID = 100;
        var topTotalBetText = my.add.text(groupPopupParent.topTotalBetBtn.width / 2,
            groupPopupParent.topTotalBetBtn.height / 2, "Total bet", {
                font: "45px PassionOne-Bold",
                fill: "#eacaf2"
            }, groupPopupParent);
        topTotalBetText.anchor.setTo(0.5, 0.5);
        groupPopupParent.topTotalBetBtn.addChild(topTotalBetText);
        groupPopupParent.topTotalBetBtn.textBtn = topTotalBetText;

        groupPopupParent.leaderBoardBorder.position.x = groupPopupParent.topCoinBtn.position.x;
        groupPopupParent.leaderBoardBorder.position.y = groupPopupParent.topCoinBtn.position.y + groupPopupParent.topCoinBtn.height;
        groupPopupParent.inboxBorder.position.x = groupPopupParent.topCoinBtn.position.x;
        groupPopupParent.inboxBorder.position.y = groupPopupParent.topCoinBtn.position.y;


        groupPopupParent.setEnableAButton = function(button, enable){
            //button.input.enable = enable;
            if(enable){
                button.tint = 0xFFFFFF;
                button.textBtn.tint = 0xFFFFFF;
            }else{
                button.tint = 0x666666;
                button.textBtn.tint = 0x471f54;
            }
            button.isActive = enable;

        };
        groupPopupParent.switchToLeaderboardTab = function(type,isStyleOnly){
            if(Lobby.Utils.objectIsNull(isStyleOnly)) isStyleOnly = false;
            if(!type){
                groupPopupParent.topCoinBtn.visible = false;
                groupPopupParent.topTotalBetBtn.visible = false;
                return;
            }else{
                groupPopupParent.topCoinBtn.visible = true;
                groupPopupParent.topTotalBetBtn.visible = true;
            }
            if(type === LobbyConstant.LeaderBoard.SORT_LEADER_BOARD_BY_COIN)  {
                groupPopupParent.setEnableAButton(groupPopupParent.topCoinBtn,true);
                groupPopupParent.setEnableAButton(groupPopupParent.topTotalBetBtn,false);
            }else{
                groupPopupParent.setEnableAButton(groupPopupParent.topTotalBetBtn,true);
                groupPopupParent.setEnableAButton(groupPopupParent.topCoinBtn,false);
            }
            if(!isStyleOnly) my.showPopupFriendNew("leaderboard", true, type);
        };

        groupPopupParent.switchToLeaderboardTab(false,true);

        groupPopupParent.setEnableAButton(groupPopupParent.topCoinBtn,true);
        groupPopupParent.setEnableAButton(groupPopupParent.topTotalBetBtn,false);

        groupPopupParent.btnInbox = Lobby.PhaserJS.createSpriteRectangleExt(
            my,
            50,
            125,
            function () {

                if(
                    Lobby.Utils.objectNotNull(groupPopupParent) &&
                    Lobby.Utils.objectNotNull(groupPopupParent.btnInbox) &&
                    groupPopupParent.btnInbox.frame === 1){
                    return;
                }
                if(groupPopupParent.menuLeaderBoard) {
                    groupPopupParent.menuLeaderBoard.exit();
                }
                if(my.isCreatingList === true)
                    return;
                my.isCreatingList = true;
                my.resizeButtonAndTextAnimationScaleRatio(groupPopupParent.btnInbox, null, 0.7);
                inboxText.x = 0;
                inboxText.y = 0;
                groupPopupParent.btnInbox.noti.x = -groupPopupParent.btnInbox.width + 50;
                groupPopupParent.btnInbox.noti.y = -53;
              my.time.events.add(150,
                function () {
                    my.resizeButtonAndTextAnimationScaleRatio(groupPopupParent.btnInbox, null, 0.9);
                    inboxText.x = 0;
                    inboxText.y = 0;
                    groupPopupParent.btnInbox.noti.x = -groupPopupParent.btnInbox.width + 132;
                    groupPopupParent.btnInbox.noti.y = -53;
                }, this);
                my.showPopupFriendNew("inbox",true);
                my.isCreatingList = false;
            },
            function () {
            },
            function () {
            },
            groupPopupParent, LobbyConfig.isDebug,
            'btn-category'
        );

        var inboxText = my.add.text(groupPopupParent.btnInbox.width / 2,
            groupPopupParent.btnInbox.height / 2, my.selectlanguage.popup_gift_inbox.text, {
                font: "50px PassionOne-Regular",
                fill: "#FFFFFF"
            }, groupPopupParent);
        inboxText.anchor.setTo(0.5, 0.5);
        groupPopupParent.btnInbox.addChild(inboxText);

        groupPopupParent.btnInbox.noti = createNotification(groupPopupParent.btnInbox.width - 50, -20, groupPopupParent.btnInbox);
        updateInboxNotification(parseInt(my._inboxNotificationText.children[1].text));
        groupPopupParent.btnFriends = Lobby.PhaserJS.createSpriteRectangleExt(
            my,
            50,
            225,
            function () {

                if(
                    Lobby.Utils.objectNotNull(groupPopupParent) &&
                    Lobby.Utils.objectNotNull(groupPopupParent.btnFriends) &&
                    groupPopupParent.btnFriends.frame === 1){
                    return;
                }
                if(groupPopupParent.menuLeaderBoard) {
                    groupPopupParent.menuLeaderBoard.exit();
                }
                if(my.isCreatingList === true)
                    return;
                my.isCreatingList = true;
                my.resizeButtonAndTextAnimationScaleRatio(groupPopupParent.btnFriends, null, 0.7);
                friendText.x = 0;
                friendText.y = 0;
              my.time.events.add(150,
                function () {
                    my.resizeButtonAndTextAnimationScaleRatio(groupPopupParent.btnFriends, null, 0.9);
                    friendText.x = 0;
                    friendText.y = 0;
                }, this);
                my.showPopupFriendNew("friends",true);
                my.isCreatingList = false;
            },
            function () {
            },
            function () {
            },
            groupPopupParent, LobbyConfig.isDebug,
            'btn-category'
        );

        var friendText = my.add.text(groupPopupParent.btnFriends.width / 2,
            groupPopupParent.btnFriends.height / 2, my.selectlanguage.popup_gift_friends.text, {
                font: "50px PassionOne-Regular",
                fill: "#FFFFFF"
            }, groupPopupParent);
        friendText.anchor.setTo(0.5, 0.5);
        groupPopupParent.btnFriends.addChild(friendText);

        groupPopupParent.setUIBaseOnSelectedTabNew = function(type,leaderBoardType){

            switch(type){
                case "leaderboard":
                    this.leaderBoardBorder.visible = true;
                    this.switchToLeaderboardTab(leaderBoardType,true);
                    break;
                case "friends":
                    this.inboxBorder.visible = true;
                    break;
                case "inbox":
                    this.inboxBorder.visible = true;
                    break;
            }
        };



        //if(LobbyConfig.isTestStrategy) {
        if(1==2) {
            groupPopupParent.btnLeaderboard = my.add.sprite(0,0,'btn-category');
            var leaderboardText = my.add.text(groupPopupParent.btnLeaderboard.width / 2,
                groupPopupParent.btnLeaderboard.height / 2, my.selectlanguage.popup_gift_leaderboard.text, {
                    font: "50px PassionOne-Regular",
                    fill: "#FFFFFF"
                }, groupPopupParent);
            leaderboardText.anchor.setTo(0.5, 0.5);
            groupPopupParent.btnLeaderboard.addChild(leaderboardText);

            var items = {};
            items.group = my.add.group();
            var button = my.add.sprite(10, 0, 'btn-category', null, items.group);
            button.scale.setTo(0.8);
            var text =  my.add.text(button.position.x + button.width/2,
                button.position.y + button.height/2, "Top Coin", {
                    font: "45px PassionOne-Regular",
                    fill: "#FFFFFF"
                }, items.group);
            text.anchor = {x:0.5,y:0.5};
            items.listItems = [];
            items.listItems.push({
                button: button,
                text:text,
                callback: function () {
                    my.showPopupFriendNew("leaderboard", true, LobbyConstant.LeaderBoard.SORT_LEADER_BOARD_BY_COIN);
                },
                onSelected: function () {
                    items.listItems[0].button.frame = 1;
                },
                onUnSelected: function () {
                    items.listItems[0].button.frame = 0;
                }
            });
            button = my.add.sprite(10, 90, 'btn-category', null, items.group);
            button.scale.setTo(0.8);
            text = my.add.text(button.position.x + button.width/2,
                button.position.y + button.height/2,  "Top Total Bet", {
                    font: "45px PassionOne-Regular",
                    fill: "#FFFFFF"
                }, items.group);
            text.anchor = {x:0.5,y:0.5};
            items.listItems.push({
                button: button,
                text:text ,
                callback: function () {
                    my.showPopupFriendNew("leaderboard", true, LobbyConstant.LeaderBoard.SORT_LEADER_BOARD_BY_SLOT_TOTAL_BET);
                },
                onSelected: function () {
                    items.listItems[1].button.frame = 1;
                },
                onUnSelected: function () {
                    items.listItems[1].button.frame = 0;
                }
            });

            groupPopupParent.menuLeaderBoard = Lobby.PhaserJS.createDropDownList(my,
                50,
                325,
                {
                    group: groupPopupParent.btnLeaderboard,
                    button: groupPopupParent.btnLeaderboard,
                    callback: function(){
                        if(
                            Lobby.Utils.objectNotNull(groupPopupParent) &&
                            Lobby.Utils.objectNotNull(groupPopupParent.btnLeaderboard) &&
                            groupPopupParent.btnLeaderboard.frame === 1){
                            return;
                        }

                        if(my.isCreatingList === true)
                            return;
                        my.isCreatingList = true;
                        my.resizeButtonAndTextAnimationScaleRatio(groupPopupParent.btnLeaderboard, null, 0.7);
                        leaderboardText.x = 0;
                        leaderboardText.y = 0;
                        my.time.events.add(150,
                            function () {
                                my.resizeButtonAndTextAnimationScaleRatio(groupPopupParent.btnLeaderboard, null, 0.9);
                                leaderboardText.x = 0;
                                leaderboardText.y = 0;
                                my.isCreatingList = false;
                            }, this);
                    },
                    iDefault: 0,
                    isUpDown: false
                },
                items,
                groupPopupParent
            );
        }else{
            groupPopupParent.btnLeaderboard = Lobby.PhaserJS.createSpriteRectangleExt(
                my,
                50,
                325,
                function () {
                    if(
                        Lobby.Utils.objectNotNull(groupPopupParent) &&
                        Lobby.Utils.objectNotNull(groupPopupParent.btnLeaderboard) &&
                        groupPopupParent.btnLeaderboard.frame === 1){
                        return;
                    }

                    if(my.isCreatingList === true)
                        return;
                    my.isCreatingList = true;
                    my.resizeButtonAndTextAnimationScaleRatio(groupPopupParent.btnLeaderboard, null, 0.7);
                    leaderboardText.x = 0;
                    leaderboardText.y = 0;
                  my.time.events.add(150,
                    function () {
                        my.resizeButtonAndTextAnimationScaleRatio(groupPopupParent.btnLeaderboard, null, 0.9);
                        leaderboardText.x = 0;
                        leaderboardText.y = 0;
                    }, this);
                    my.showPopupFriendNew("leaderboard",true, LobbyConstant.LeaderBoard.SORT_LEADER_BOARD_BY_COIN);
                    my.isCreatingList = false;
                },
                function () {
                },
                function () {
                },
                groupPopupParent, LobbyConfig.isDebug,
                'btn-category'
            );
            var leaderboardText = my.add.text(groupPopupParent.btnLeaderboard.width / 2,
                groupPopupParent.btnLeaderboard.height / 2, my.selectlanguage.popup_gift_leaderboard.text, {
                    font: "50px PassionOne-Regular",
                    fill: "#FFFFFF"
                }, groupPopupParent);
            leaderboardText.anchor.setTo(0.5, 0.5);
            groupPopupParent.btnLeaderboard.addChild(leaderboardText);
        }


        groupPopupParent.btnInbox.scale.setTo(0.9, 0.9);
        groupPopupParent.btnFriends.scale.setTo(0.9, 0.9);
        groupPopupParent.btnLeaderboard.scale.setTo(0.9, 0.9);

        if (!my._userData.isFacebookUser) {
            //if(LobbyConfig.isTestStrategy) {
            if(1==2) {
                groupPopupParent.menuLeaderBoard.x = groupPopupParent.btnFriends.x;
                groupPopupParent.menuLeaderBoard.y = groupPopupParent.btnFriends.y;

                groupPopupParent.btnFriends.visible = true;
            }else{
                groupPopupParent.btnLeaderboard.x = groupPopupParent.btnFriends.x;
                groupPopupParent.btnLeaderboard.y = groupPopupParent.btnFriends.y;

                //groupPopupParent.switchToLeaderboardTab(false);

                groupPopupParent.btnInbox.visible = true;
                groupPopupParent.btnFriends.visible = false;
            }
        }


        if (friendGroup != null) {
            friendGroup.visible = false;
        }
        if (leaderboardGroup != null) {
            leaderboardGroup.visible = false;
        }
        if (inboxGroup != null) {
            inboxGroup.visible = false;
        }

        groupPopupParent.y += 10;

        Lobby.PhaserJS.centerXWorld(groupPopupParent);
        Lobby.PhaserJS.scaleGroupForOptimize(groupPopupParent,true);
        //ManagerForScale.reposition(group);
        if (LobbyConfig.useManagerForPopUp) {
            // pop up queue special
            var popUpData = ManagerForPopUp.createPopUpData(
                my,
                groupPopupParent,
                function () {
                    if (friendGroup != null) {
                        friendGroup.visible = true;
                        friendGroup.alpha = 0;
                        my.add.tween(friendGroup).to({alpha: 1},500,Phaser.Easing.Linear.None,true);
                    }
                    if (leaderboardGroup != null) {
                        leaderboardGroup.visible = true;
                        leaderboardGroup.alpha = 0;
                        my.add.tween(leaderboardGroup).to({alpha: 1},500,Phaser.Easing.Linear.None,true);
                    }
                    if (inboxGroup != null) {
                        inboxGroup.visible = true;
                        inboxGroup.alpha = 0;
                        my.add.tween(inboxGroup).to({alpha: 1},500,Phaser.Easing.Linear.None,true);
                    }
                }
            );
            ManagerForPopUp.addPopUpToQueue(
                popUpData,
                true // isShow
            );
        } else {
            my.openPopupWithAnimateUpNew(groupPopupParent,null,null,null,function(){
                if (friendGroup != null) {
                    friendGroup.visible = true;
                    friendGroup.alpha = 0;
                    my.add.tween(friendGroup).to({alpha: 1},500,Phaser.Easing.Linear.None,true);
                }
                if (leaderboardGroup != null) {
                    leaderboardGroup.visible = true;
                    leaderboardGroup.alpha = 0;
                    my.add.tween(leaderboardGroup).to({alpha: 1},500,Phaser.Easing.Linear.None,true);
                }
                if (inboxGroup != null) {
                    inboxGroup.visible = true;
                    inboxGroup.alpha = 0;
                    my.add.tween(inboxGroup).to({alpha: 1},500,Phaser.Easing.Linear.None,true);
                }
            });
        }

        groupPopupParent.bringToTop(groupContainListFriend);
    };
    /**
     * Update Catagory UI when User changes category (inbox, friend, leaderboard)
     * @param type: current type (inbox, friend, leaderboard)
     */
    var setCategoryUI = function (type,leaderBoardType) {
        //if(groupPopupParent) groupPopupParent.setUIBaseOnSelectedTabNew(type,leaderBoardType);
        groupPopupParent.inboxBorder.visible = false;
        groupPopupParent.leaderBoardBorder.visible = false;
        groupPopupParent.switchToLeaderboardTab(false,true);
        switch (type) {
            case "inbox":
                groupPopupParent.btnInbox.frame = 1;
                groupPopupParent.btnFriends.frame = 0;
                groupPopupParent.btnLeaderboard.frame = 0;
                groupPopupParent.inboxBorder.visible = true;
                break;
            case "friends":
                groupPopupParent.btnInbox.frame = 0;
                groupPopupParent.btnFriends.frame = 1;
                groupPopupParent.btnLeaderboard.frame = 0;
                groupPopupParent.inboxBorder.visible = true;
                break;
            case "leaderboard":
                groupPopupParent.btnInbox.frame = 0;
                groupPopupParent.btnFriends.frame = 0;
                groupPopupParent.btnLeaderboard.frame = 1;
                //if(groupPopupParent.menuLeaderBoard){
                //    groupPopupParent.menuLeaderBoard.toggleDown();
                //}
                groupPopupParent.leaderBoardBorder.visible = true;
                groupPopupParent.switchToLeaderboardTab(leaderBoardType,true);
                break;
        }
    };

    var groupListView = null;
    var yPosition = 0;
    var currentCell = 0;
    var currentFriend = 0;
    var currentInvitableFriend = 0;
    var numberFriendPerGroup = 100;
    /**
     * Create friend list View
     * @param parentGroup: parent Group
     * @param contentGroup: group contains list view
     * @param x: x Position
     * @param y: y Position
     * @param numberFriendPerShow: number Friend on List per show
     * @param data: friend data (friend, leaderboard users)
     * @param isLeaderboard: boolen - check if this is leaderboard list view
     * @param isUser: boolen - check if this create Playpalace User, not friend on Facebook
     */
    var createFriendListView = function (parentGroup, contentGroup, x, y, numberFriendPerShow, data, isLeaderboard, isUser) {

        //CacheManager.Stardom.cacheData[key_create] = data;
        //callbackStarDom(
        //    CacheManager.Stardom.cacheData[key_create],
        //    my.createStardomTableCellBankroll
        //)

        yPosition = 20;
        var contentHeight;
        groupListView = null;
        var scrollBar = my.add.sprite(
            -3, -3,
            "popup_inbox_scrollbar",
            null,
            parentGroup
        );
        scrollBar.visible = false;
        var scrollButton;

        my.createFriendListView = function (contentGroup, contentHeight, scrollBarPos, isEnd) {
            if (Lobby.Utils.objectNotNull(groupListView)) {
                scrollButton.destroy();
            }
            var posY = 0;
            if (Lobby.Utils.objectNotNull(scrollBarPos)) {
                posY = scrollBarPos * .8;
            }
            scrollButton = my.add.sprite(
                0,
                posY,
                'popup-inbox-scrollButton',
                null,
                parentGroup
            );
            scrollButton.visible = false;
            var callback = null;
            if (!isEnd && Lobby.Utils.objectNotNull(isEnd)) {
                callback = createGroupFriend;
            }
            groupListView = Lobby.PhaserJS.createMoreAwesomeListView(
                my, //context
                parentGroup, //parentGroup
                contentGroup, //groupItems
                x, //groupItemsX
                y, //groupItemsY
                contentGroup.width, //width
                contentHeight * numberFriendPerShow, //height
                scrollBar, //scrollBar
                scrollButton, //scrollButton
                Math.ceil(numberFriendPerShow),
                LobbyConfig.isDebug,
                callback
            );
        };
        var setupPopup = function(dataInput)
        {
            var i = 0;
            var totalCell = Math.min(dataInput.length,numberFriendPerShow+2);
            for (i; i < totalCell;) {
                var cell = createUserCell(contentGroup, dataInput[i], i + 1, isLeaderboard, true);
                cell.cellId = i;
                //cell.visible = false;
                contentGroup.add(cell);
                contentHeight = 150;
                cell.position = {
                    x: 0,
                    y: yPosition
                };
                yPosition += contentHeight;
                ++i;
            }
            my.groupFriendList = [];
            my.createFriendListView(contentGroup, contentHeight);

            if(totalCell < dataInput.length){

                var background = my.add.sprite(
                    0,
                    0,
                    "",
                    null,
                    contentGroup
                );
                //background.width = contentGroup.width;
                //background.height = dataInput.length*contentHeight;
                contentGroup.addChildAt(background,0);
                //contentGroup.add(background);

            }
            //turn off choosed
            for(var indexData = 0; indexData < dataInput.length; indexData++){
                if(Lobby.Utils.objectNotNull(dataInput[indexData].isChoosed))
                    dataInput[indexData].isChoosed = false;
            };

            if(dataInput.length >  numberFriendPerShow) {
                var tableHeight = contentHeight * numberFriendPerShow - 10;
                my.time.events.add(500, function() {
                    my.game.kineticScrolling.start(contentGroup,
                        false,
                        true,
                        0,
                        0,
                        (dataInput.length * contentHeight - tableHeight),
                        0,
                        my,
                        null,
                        contentHeight,  // height of cell
                        145.5,          // position of table in world coordinate
                        tableHeight,     // height of visible part of table
                        function (cell, isMoveDown) {
                            if (cell.cellId >= 0 &&
                                cell.cellId < dataInput.length) {
                                //if(!isMoveDown && cell.cellId === (contentGroup.children.length - 1) * 2){
                                //    cell.y = 2112;
                                //    //console.log("YYYYYYYYYYYYY: " + cell.y);
                                //}
                                updateUserCell(cell, dataInput[cell.cellId], cell.cellId + 1, isLeaderboard, true);
                            }
                        },
                        {
                            minX: 535,
                            minY:  0 ,//103 + ManagerForScale.incrementHeight(),
                            maxX: 1377,
                            maxY: 811 + ManagerForScale.incrementHeight()
                        }
                    );   // just height of visible table
                });
            }
        };
        if (isLeaderboard) {
            //numberFriendPerShow-=0.5;
            setupPopup(data);
            //parentGroup.position.y+=82;
            //parentGroup.position.y+=200;
        } else {
            //my.groupFriendList = [];
            //createGroupFriend(contentGroup, contentHeight);
            //neu la friend
            if(isUser){
                var dataFriendList = [];
                for(var idFriend = 0 ; idFriend < my._userData.friendList.length; idFriend++){
                    dataFriendList.push(my._userData.friendList[idFriend]);
                }

                var showListFriendInPopup = function(){
                    for(var idFriendFromFB = 0 ; idFriendFromFB < my._userData.invitableFriendList.length; idFriendFromFB++){
                        dataFriendList.push(my._userData.invitableFriendList[idFriendFromFB]);
                    }
                    setupPopup(dataFriendList);
                };

                if(Lobby.Utils.objectIsNull(my._userData.invitableFriendList)){
                    my.showLoadingAnimation();
                    var timerCheckGettingFriendFromFB = my.time.events.loop(
                        1000,function(){
                            if(Lobby.Utils.objectIsNull(my._userData.invitableFriendList)){
                                my.showLoadingAnimation();
                            }else{
                                my.hideLoadingAnimation();
                                showListFriendInPopup();
                                Lobby.PhaserJS.clearTimer(my,timerCheckGettingFriendFromFB);
                            }
                        },this);
                }else{
                    showListFriendInPopup();
                }
            }
        }



    };
    /**
     * Create group popup Friend
     * @param contentGroup: popup contain
     * @param contentHeight: height of group content
     * @param scrollBarPos: scroll bar Position
     */
    var createGroupFriend = function (contentGroup, contentHeight, scrollBarPos) {
        currentCell = 0;
        //var groupFriend = my.add.group();
        //my.groupFriendList.push(groupFriend);
        if (currentFriend < my._userData.friendList.length) {
            while (currentFriend < my._userData.friendList.length && currentCell < numberFriendPerGroup) {
                var cell = createUserCell(contentGroup, my._userData.friendList[currentFriend], currentFriend + 1, false, true);
                var parentCell = my.add.group();
                parentCell.add(cell);
                //cell.visible = false;
                contentGroup.add(parentCell);
                contentHeight = 150;
                parentCell.position = {
                    x: 0,
                    y: yPosition
                };
                //parentCell.update = function(){
                //    if(!my.game.kineticScrolling.isMoving) return;
                //    if(this.worldPosition.y<-400||this.worldPosition.y>400){
                //        this.children[0].visible = false;
                //    }else if(!this.children[0].visible){
                //        this.children[0].visible = true;
                //    }
                //};
                yPosition += contentHeight;
                ++currentCell;
                ++currentFriend;
            }
        }
        if (currentInvitableFriend < my._userData.invitableFriendList.length && currentCell < numberFriendPerGroup) {
            //var createGroupInviable = function () {
            while (currentInvitableFriend < my._userData.invitableFriendList.length && currentCell < numberFriendPerGroup) {
                var cell = createUserCell(contentGroup, my._userData.invitableFriendList[currentInvitableFriend], currentInvitableFriend + 1, false, false);
                //cell.visible = false;
                var parentCell = my.add.group();
                parentCell.add(cell);
                contentGroup.add(parentCell);
                contentHeight = 150;
                parentCell.position = {
                    x: 0,
                    y: yPosition
                };
                //parentCell.update = function(){
                //    if(!my.game.kineticScrolling.isMoving) return;
                //    if(this.worldPosition.y<-400||this.worldPosition.y>400){
                //        this.children[0].visible = false;
                //    }else if(!this.children[0].visible){
                //        this.children[0].visible = true;
                //    }
                //};
                yPosition += contentHeight;
                ++currentCell;
                ++currentInvitableFriend;
            }
            //}
        }
        //contentGroup.add(groupFriend);
        //my.game.kineticScrolling.start(contentGroup,
        //    false,
        //    true,
        //    0,
        //    0,
        //    contentGroup.height - 550,
        //    0,
        //    my);
        if (currentFriend >= my._userData.friendList.length &&
            (Lobby.Utils.objectNotNull(my._userData.invitableFriendList.length) && currentInvitableFriend >= my._userData.invitableFriendList.length)) {
            my.createFriendListView(contentGroup, contentHeight, scrollBarPos, true);
        } else {
            my.createFriendListView(contentGroup, contentHeight, scrollBarPos, false);
            //my.game.kineticScrolling.setCallBackWhenScrollToPercentY(0.8, function(){
            //    createGroupFriend(contentGroup);
            //});
        }
    };
    /**
     * Show friends popup UI
     * @param parent: group parent
     * @param data: friend data
     * @param isSwitchTap: boolen - true if want to hide group when create to speed up Open Popup Process
     */
    my.showFriendsPopup = function (parent, data, isSwitchTap) {
        if(Lobby.Utils.objectIsNull(friendGroup)) {
            friendGroup = my.add.group();
            if(!isSwitchTap) {
                friendGroup.visible = false; // an ban dau cho load nhanh
            }
        }else{
            Lobby.PhaserJS.destroyAllChild(friendGroup);
        }
        parent.add(friendGroup);
        friendGroup.x = 300;
        var scrollViewGroup = my.add.group();
        friendGroup.add(scrollViewGroup);

        var contentGroup = my.add.group();

        createFriendListView(scrollViewGroup, contentGroup, 100, 125, 3.6, data, false, true);

        //var btnSendGift = Lobby.PhaserJS.createSpriteRectangleExt(
        //    my,
        //    500,
        //    710,
        //    function () {
        //        my.resizeButtonAndTextAnimationScaleRatio(btnSendGift, null, 0.8);
        //        var interval = setInterval(function () {
        //            clearInterval(interval);
        //            if (listFriendSendGift.length === 0) {
        //                my.showNotificationPopup("", my.selectlanguage.popup_gift_select.text);
        //            }
        //            else {
        //                if (!FacebookController.isInFBCanvas()) {
        //                    my.showNotificationPopup("", my.selectlanguage.popup_warning_switch_to_app_fb_to_send_gift.text);
        //                    return;
        //                }
        //                my.showLoadingAnimation();
        //                FacebookController.sendGiftListFriend(
        //                    listFriendSendGift,
        //                    function (isSuccess, data) {
        //                        if (isSuccess) {
        //                            LobbyRequest.User.sendFreeGiftList(listFriendSendGift, function (isSuccess) {
        //                                my.hideLoadingAnimation();
        //                                if (isSuccess) {
        //                                    my.showNotificationPopup(my.selectlanguage.popup_gift_success.text,
        //                                        my.selectlanguage.popup_gift_send_free_gift_success.text);
        //
        //                                    for (i = 0; i < listFriends.length; i++) {
        //                                        if (listFriendSendGift.indexOf(listFriends[i].fbUID) > -1) {
        //                                            listFriends[i].toggleMark.visible = false;
        //                                            listFriends[i].toggleGroup.visible = false;
        //                                        }
        //                                    }
        //
        //                                    for (j = 0; j < my._userData.friendList.length; j++) {
        //                                        if (listFriendSendGift.indexOf(my._userData.friendList[j].facebookUID) > -1) {
        //                                            my._userData.friendList[j].freeGift = 1;
        //                                        }
        //                                    }
        //
        //                                    listFriendSendGift = [];
        //                                }
        //                                my.updateUserInfoFromSV(
        //                                    function (isSuccess) {
        //                                        if (isSuccess) {
        //                                            my.roundMoney();
        //                                        }
        //                                    }
        //                                );
        //                            }, my);
        //                        }
        //                        else {
        //                            my.hideLoadingAnimation();
        //                        }
        //                    }
        //                );
        //            }
        //        }, 150);
        //
        //    },
        //    function () {
        //        my.resizeButtonAndTextAnimationScaleRatio(btnSendGift, null, 0.9);
        //    },
        //    function () {
        //        my.resizeButtonAndTextAnimationScaleRatio(btnSendGift, null, 0.9);
        //    },
        //    friendGroup,
        //    LobbyConfig.isDebug,
        //    'btn-send-gift'
        //);
        //btnSendGift.scale.setTo(0.9, 0.9);

        var btnSendGift = my.createButtonGreenPopup(friendGroup,
            500,
            715,
            my.selectlanguage.popup_invite_btn_SendGift.text,
            1.1,
            function () {
                if (listFriendSendGift.length === 0) {
                    my.showNotificationPopup("", my.selectlanguage.popup_gift_select.text);
                }
                else {
                    //if (!FacebookController.isInFBCanvas()) {
                    //    my.showUnfinishedJobMessage("");
                    //    return;
                    //}
                    my.showLoadingAnimation();
                    FacebookController.sendGiftListFriend(
                        listFriendSendGiftFBUID,
                        function (isSuccess, data) {
                            if (isSuccess) {
                                LobbyRequest.User.sendGiftToUserList(listFriendSendGift,null, function (isSuccess) {
                                    my.hideLoadingAnimation();
                                    if (isSuccess) {
                                        my.showNotificationPopup(my.selectlanguage.popup_gift_success.text,
                                            my.selectlanguage.popup_gift_send_free_gift_success.text);

                                        for (var i = 0; i < listFriends.length; i++) {
                                            if (listFriends[i].fbUID != null && listFriendSendGiftFBUID.indexOf(listFriends[i].fbUID) > -1) {
                                                listFriends[i].toggleMark.visible = false;
                                                listFriends[i].toggleGroup.visible = false;
                                            }
                                        }

                                        var j = my._userData.friendList.length; while (j--) {
                                            if (listFriendSendGiftFBUID.indexOf(my._userData.friendList[j].facebookUID) > -1) {
                                                my._userData.friendList[j].freeGift = 1;
                                            }
                                        }
                                        //for (j = 0; j < ; j++) {}

                                        listFriendSendGiftFBUID = [];
                                        listFriendSendGift = [];
                                    }
                                    my.updateUserInfoFromSV(
                                        function (isSuccess) {
                                            if (isSuccess) {
                                                my.roundMoney();
                                            }
                                        }
                                    );
                                }, my);
                            }
                            else {
                                my.hideLoadingAnimation();
                            }
                        }
                    );
                }
            },
            50
        );
        //var btnInvite = Lobby.PhaserJS.createSpriteRectangleExt(
        //    my,
        //    175,
        //    710,
        //    function () {
        //        my.resizeButtonAndTextAnimationScaleRatio(btnInvite, null, 0.8);
        //        var interval = setInterval(function () {
        //            clearInterval(interval);
        //            if (listFriendsToInvite.length === 0) {
        //                my.showNotificationPopup("", my.selectlanguage.popup_gift_select.text);
        //            }
        //            else {
        //                // 2016-05-26: Phuoc: chuyển qua dùng method chung của Đạt
        //                if (!FacebookController.isInFBCanvas()) {
        //                    my.showNotificationPopup("", my.selectlanguage.popup_warning_switch_to_app_fb_to_invite.text);
        //                    return;
        //                }
        //                my.showLoadingAnimation();
        //                FacebookController.inviteListFriend(
        //                    listFriendsToInvite,
        //                    function (isSuccess) {
        //                        my.hideLoadingAnimation();
        //                        if (isSuccess) {
        //                            //listFriendsToInvite = [];
        //                            LobbyRequest.User.sendInviteFriend(listFriendsToInvite, function (isSuccess) {
        //                                my.hideLoadingAnimation();
        //                                if (isSuccess) {
        //                                    my.showNotificationPopup(my.selectlanguage.popup_gift_success.text, my.selectlanguage.popup_gift_invite_success.text);
        //                                }
        //                                my.updateUserInfoFromSV(
        //                                    function (isSuccess) {
        //                                        if (isSuccess) {
        //                                            my.roundMoney();
        //                                        }
        //                                    }
        //                                );
        //                            }, my);
        //                        }
        //                    }
        //                );
        //            }
        //        }, 150);
        //
        //
        //    },
        //    function () {
        //        my.resizeButtonAndTextAnimationScaleRatio(btnInvite, null, 0.9);
        //    },
        //    function () {
        //        my.resizeButtonAndTextAnimationScaleRatio(btnInvite, null, 0.9);
        //    },
        //    friendGroup,
        //    LobbyConfig.isDebug,
        //    'btn-invite'
        //);
        //btnInvite.scale.setTo(0.9, 0.9);
        var btnInvite = my.createButtonPurplePopup(
            friendGroup,
            175,
            715,
            my.selectlanguage.popup_invite_btn_Invite.text,
            1.1,
            function(){
                if (listFriendsToInvite.length === 0) {
                    my.showNotificationPopup("", my.selectlanguage.popup_gift_select.text);
                }
                else {
                    // 2016-05-26: Phuoc: chuyển qua dùng method chung của Đạt
                    //if (!FacebookController.isInFBCanvas()) {
                    //    my.showNotificationPopup("", "We are working hard to port this function.");
                    //    return;
                    //}
                    my.showLoadingAnimation();
                    FacebookController.inviteListFriend(
                        listFriendsToInvite,
                        function (isSuccess) {
                            my.hideLoadingAnimation();
                            if (isSuccess) {
                                //listFriendsToInvite = [];
                                LobbyRequest.User.sendInviteFriend(listFriendsToInvite, function (isSuccess) {
                                    my.hideLoadingAnimation();
                                    if (isSuccess) {
                                        my.showNotificationPopup(my.selectlanguage.popup_gift_success.text, my.selectlanguage.popup_gift_invite_success.text);
                                    }
                                    my.updateUserInfoFromSV(
                                        function (isSuccess) {
                                            if (isSuccess) {
                                                my.roundMoney();
                                            }
                                        }
                                    );
                                }, my);
                            }
                        }
                    );
                }
            },
            50
        );

        var infoGroup = my.add.group(friendGroup);
        infoGroup.x = -225;
        infoGroup.y = 740;
        var infoIcon = my.add.sprite(0, 0, "info_icon", null, infoGroup);
        Lobby.PhaserJS.centerY(infoIcon, infoGroup.height);
        var infoText = my.add.text(60, 0, my.selectlanguage.popup_gift_info.text, {
            font: "30px PassionOne-Regular",
            fill: "#ffffff"
        }, infoGroup);
        Lobby.PhaserJS.centerY(infoText, infoGroup.height);
    };
    /**
     * Show leaderboard popup UI
     * @param parent: group parent
     * @param data: leaderboard data
     * @param isSwitchTap: boolen - true if want to hide group when create to speed up Open Popup Process
     */
    my.showLeaderBoard = function (parent, data,isSwitchTap) {
        if(Lobby.Utils.objectIsNull(leaderboardGroup)) {
            leaderboardGroup = my.add.group();
            if(!isSwitchTap) {
                leaderboardGroup.visible = false; // an ban dau cho load nhanh
            }
        }else{
            Lobby.PhaserJS.destroyAllChild(leaderboardGroup);
        }
        parent.add(leaderboardGroup);
        leaderboardGroup.x = 300;
        //leaderboardGroup.y =207;
        var scrollViewGroup = my.add.group();
        leaderboardGroup.add(scrollViewGroup);

        var contentGroup = my.add.group();
        //scrollViewGroup.x = 100;
        //scrollViewGroup.y = 207;
        //numberFriendPerShow-=0.5;
        //parentGroup.position.y+=82;
        //createFriendListView(scrollViewGroup, contentGroup, 100, 125, 4.5, data, true);
        createFriendListView(scrollViewGroup, contentGroup, 100, 207, 3.9, data, true);
    };
    /**
     * Show inbox popup UI
     * @param parent: group parent
     * @param data: inbox data
     * @param isSwitchTap: boolen - true if want to hide group when create to speed up Open Popup Process
     */
    my.showInbox = function (parent, data,isSwitchTap) {
        var numberObjectPerShow = 3.6;
        var tableHeight = contentHeight * numberObjectPerShow - 10;

        my.updateInboxNotification(data.length);
        updateInboxNotification(data.length);
        if (data.length > 0) {
            if(Lobby.Utils.objectIsNull(inboxGroup)) {
                inboxGroup = my.add.group();
                if(!isSwitchTap) {
                    inboxGroup.visible = false; // an ban dau cho load nhanh
                }
            }else{
                Lobby.PhaserJS.destroyAllChild(inboxGroup);
            }
            parent.add(inboxGroup);
            inboxGroup.x = 300;
            var contentGroup = my.add.group();

            var yPosition = 0;
            var contentHeight;
            var groupListView = null;
            var i = 0;
            var listGift = [];
            var listTypeGift = "";
            for (i; i < data.length;) {
                //if (data[i].type === LobbyConfig.MessageList.Type.RequestKey) {
                //    listTypeGift += "1,";
                //} else {
                //    listTypeGift += "0,";
                //}
                //listGift += data[i].id + ",";
                if (data[i].type === LobbyConfig.MessageList.Type.RequestKey) {
                    listTypeGift += "1,";
                } else {
                    listTypeGift += "0,";
                }
                listGift.push(data[i].id);
                //var cell = createInboxCell(contentGroup, data[i]);
                //contentGroup.add(cell);
                //contentHeight = cell.height;
                //cell.position = {
                //    x: 0,
                //    y: yPosition
                //};
                //cell.id = i;
                //yPosition += contentHeight;
                ++i;
            }

            var setupReuseCell = function(dataInput)
            {
                var i = 0;
                var totalCell = Math.min(dataInput.length,numberObjectPerShow+2);
                for (i; i < totalCell;) {
                    //if (dataInput[i].type === LobbyConfig.MessageList.Type.RequestKey) {
                    //    listTypeGift += "1,";
                    //} else {
                    //    listTypeGift += "0,";
                    //}
                    //listGift += dataInput[i].id + ",";
                    var cell = createInboxCell(contentGroup, dataInput[i]);
                    contentGroup.add(cell);
                    contentHeight = 150;
                    cell.position = {
                        x: 0,
                        y: yPosition
                    };
                    cell.cellId = i;
                    yPosition += contentHeight;
                    ++i;
                }

                if(totalCell < dataInput.length){

                    var background = my.add.sprite(
                        0,
                        0,
                        "",
                        null,
                        contentGroup
                    );
                    //background.width = contentGroup.width;
                    //background.height = dataInput.length*contentHeight;
                    contentGroup.addChildAt(background,0);
                    //contentGroup.add(background);

                }
                if(dataInput.length >  numberObjectPerShow) {
                    var tableHeight = contentHeight * numberObjectPerShow - 10;
                    my.time.events.add(500, function() {
                        my.game.kineticScrolling.start(contentGroup,
                            false,
                            true,
                            0,
                            0,
                            (contentHeight * dataInput.length - tableHeight),
                            0,
                            my,
                            null,
                            contentHeight,  // height of cell
                            145.5,          // position of table in world coordinate
                            tableHeight,     // height of visible part of table
                            function (cell) {
                                if (cell.cellId >= 0 &&
                                    cell.cellId < dataInput.length) {
                                    //createInboxCell(contentGroup, dataInput[cell.id]);
                                    updateInboxCell(cell, dataInput[cell.cellId]);
                                }
                            },
                            {
                                minX: 535,
                                minY: 0 ,//103,
                                maxX: 1377,
                                maxY: 811
                            }
                        );   // just height of visible table
                    });
                }
            };
            var scrollBar = my.add.sprite(
                -3, -3,
                "popup_inbox_scrollbar",
                null,
                inboxGroup
            );
            scrollBar.visible = false;

            var scrollButton = my.add.sprite(
                0,
                0,
                'popup-inbox-scrollButton',
                null,
                inboxGroup
            );
            scrollButton.visible = false;

            setupReuseCell(data);


            groupListView = Lobby.PhaserJS.createMoreAwesomeListView(
                my, //context
                inboxGroup, //parentGroup
                contentGroup, //groupItems
                100, //groupItemsX
                125, //groupItemsY
                contentGroup.width, //width
                contentHeight * numberObjectPerShow, //height
                scrollBar, //scrollBar
                scrollButton, //scrollButton
                Math.ceil(numberObjectPerShow),
                LobbyConfig.isDebug
            );

            //groupListView = Lobby.PhaserJS.createMoreAwesomeListView(
            //    my, //context
            //    inboxGroup, //parentGroup
            //    contentGroup, //groupItems
            //    100, //groupItemsX
            //    125, //groupItemsY
            //    contentGroup.width, //width
            //    contentHeight * 3.8, //height
            //    scrollBar, //scrollBar
            //    scrollButton, //scrollButton
            //    4,
            //    LobbyConfig.isDebug
            //);

            //var acceptAll = Lobby.PhaserJS.createSpriteRectangleExt(
            //    my,
            //    500,
            //    710,
            //    function (result) {
            //        my.resizeButtonAndTextAnimationScaleDown(acceptAll);
            //        var interval = setInterval(function () {
            //            clearInterval(interval);
            //            my.showLoadingAnimation();
            //            LobbyRequest.User.acceptGiftList(function (result) {
            //                my.hideLoadingAnimation();
            //                if (result.core_result_code != null &&
            //                    result.core_result_code != 0) {
            //                    my.showNotificationPopup(my.selectlanguage.popup_gift_warning.text, my.selectlanguage.popup_gift_warning_message.text);
            //                }
            //                else {
            //                    my.showNotificationPopup(my.selectlanguage.popup_gift_success.text, my.selectlanguage.popup_gift_accept_success.text);
            //                    my.showPopupFriendNew("inbox");
            //                    my.updateUserInfoFromSV(
            //                        function (isSuccess) {
            //                            if (isSuccess) {
            //                                my.roundMoney();
            //                            }
            //                        }
            //                    );
            //                }
            //            }, my, listGift, listTypeGift);
            //        }, 150);
            //
            //
            //    },
            //    function () {
            //        my.resizeButtonAndTextAnimationScaleUp(acceptAll);
            //    },
            //    function () {
            //        my.resizeButtonAndTextAnimationScaleUp(acceptAll);
            //    },
            //    inboxGroup,
            //    LobbyConfig.isDebug,
            //    'btn-accept-all'
            //);
            var acceptAll = my.createButtonGreenPopup(
                inboxGroup,
                500,
                710,
                my.selectlanguage.popup_inbox_button_accept_all.text,
                1,
                function () {
                    my.showLoadingAnimation();

                    LobbyRequest.User.receiveGiftFromUserList(listGift, function (isSuccess,data,response) {
                        my.hideLoadingAnimation();
                        if (!isSuccess) {
                            my.showNotificationPopup(my.selectlanguage.popup_gift_warning.text, my.selectlanguage.popup_gift_warning_message.text);
                        }
                        else {
                            my.showNotificationPopup(my.selectlanguage.popup_gift_success.text, my.selectlanguage.popup_gift_accept_success.text);
                            my.showPopupFriendNew("inbox",true,true);
                            my.updateUserInfoFromSV(
                                function (isSuccess) {
                                    if (isSuccess) {
                                        my.roundMoney();
                                    }
                                }
                            );
                        }
                    });
                    //LobbyRequest.User.acceptGiftList(function (result) {
                    //    my.hideLoadingAnimation();
                    //    if (result.core_result_code != null &&
                    //        result.core_result_code != 0) {
                    //        my.showNotificationPopup(my.selectlanguage.popup_gift_warning.text, my.selectlanguage.popup_gift_warning_message.text);
                    //    }
                    //    else {
                    //        my.showNotificationPopup(my.selectlanguage.popup_gift_success.text, my.selectlanguage.popup_gift_accept_success.text);
                    //        my.showPopupFriendNew("inbox",true,true);
                    //        my.updateUserInfoFromSV(
                    //            function (isSuccess) {
                    //                if (isSuccess) {
                    //                    my.roundMoney();
                    //                }
                    //            }
                    //        );
                    //    }
                    //}, my, listGift, listTypeGift);
                },
                55
            );


            if (data.length === 0) {
                acceptAll.visible = false;
            }
            else {
                acceptAll.visible = true;
            }
        } else {
            inboxGroup = my.add.group();
            if(!isSwitchTap) {
                inboxGroup.visible = false;
            }

            parent.add(inboxGroup);
            var inboxEmpty = my.add.text(650, 150, my.selectlanguage.popup_gift_inbox_empty.text, {
                font: "50px PassionOne-Regular",
                fill: "#FFFFFF",
                align: "center"
            }, inboxGroup);
        }
    };
    /**
     * Create notification UI for Inbox
     * @param x: x Position
     * @param y: yPosition
     * @param parent: group parent
     * @returns {*} group notification UI for Inbox
     */
    var createNotification = function (x, y, parent) {
        // Notification Group
        var notificationGroup = my.add.group(parent);
        var notificationBackground = my.add.sprite(
            x,
            y,
            "popup-achievement-bg-notification",
            null,
            notificationGroup);
        var notificationText = my.add.text(
            0,
            0,
            "1",
            {
                font: "35px " + ConstantFontName.FONT_NAME_PassionOne_Bold,
                fill: "#ffffff",
                align: "center"
            },
            notificationGroup
        );
        notificationText.anchor.setTo(0.5, 0.5);
        notificationText.position = {
            x: notificationBackground.x +
            notificationBackground.width / 2,
            y: notificationBackground.y + notificationBackground.height / 2
        };

        return notificationGroup;
    };
    /**
     * Update notifications for Inbox
     * @param numberOfNoti: notifications of Inbox
     */
    var updateInboxNotification = function (numberOfNoti) {
        var noti = numberOfNoti;
        if (noti === 0) {
            groupPopupParent.btnInbox.noti.visible = false;
        }
        else {
            groupPopupParent.btnInbox.noti.visible = true;
            groupPopupParent.btnInbox.noti.children[1].text = numberOfNoti;
        }
    };
    /**
     * Create Inbox cell UI
     * @param parent: group parent
     * @param data: inbox data
     * @returns {*} group Inbox cell
     */
    var createInboxCell = function (parent, data) {
        if (data === null) {
            return;
        }

        var inboxCell = my.add.group();
        var background = my.add.sprite(
            0, 0,
            "",
            null, inboxCell
        );
        background.width = 825;
        background.height = 150;
        inboxCell.add(background);

        var groupAvatar = my.add.group();
        inboxCell.add(groupAvatar);
        groupAvatar.x = 50;
        var avatarSize = 120;
        var avatarKey = my.getAvatarKeyBasedOnGiftType(data);
        if (avatarKey !== "" ) {
            var avatar = my.add.sprite(
                0,
                0,
                avatarKey,
                null,
                groupAvatar
            );
            if(avatarKey!="inbox_voucher_icon" ){
                if(!Lobby.PhaserJS.createSpriteWithCircleMask(avatar, avatarKey, 100, my)){
                    Lobby.PhaserJS.maskCircleGroup(groupAvatar, avatarSize, my);
                    groupAvatar.mask.y += 15;
                }
            }

            avatar.width = avatarSize;
            avatar.height = avatarSize;
            Lobby.PhaserJS.centerY(avatar, background.height);
        }
        else {
            var avatarURL = "popup_profile_profile_avatar", valueURL = "";
            var avatar = my.add.sprite(
                0,
                0,
                avatarURL,
                null,
                groupAvatar
            );
            avatar.width = avatarSize;
            avatar.height = avatarSize;
            if (data.from_user_id != null && data.from_user_id != "") {
                avatarURL = 'user-avatar-' + data.from_user_id;
                valueURL = "https://graph.facebook.com/" + my.getFacebookUIDBasedOnId(data.from_user_id) +
                    "/picture?type=normal&width=100&height=100";
            }
            var callbackReloadAvatar = function () {
                try {
                    if(Lobby.Utils.objectIsNull(avatar) ||
                        Lobby.Utils.objectIsNull(avatarURL) ){
                        return;
                    }
                    if(!Lobby.PhaserJS.tryLoadAvatar(avatar, avatarURL, my)){
                        Lobby.PhaserJS.createSpriteWithCircleMask(avatar, avatarURL, 100, my);
                    }
                }catch(ex){

                }
                //Lobby.PhaserJS.scaleAspectSize(avatar, {width: avatarSize, height: avatarSize});
                avatar.width = avatarSize;
                avatar.height = avatarSize;
                Lobby.PhaserJS.centerY(avatar, background.height);
                //Lobby.PhaserJS.maskCircleGroup(groupAvatar, avatarSize, my);
                //groupAvatar.mask.y += 15;

            };
            if(!Lobby.PhaserJS.createSpriteWithCircleMask(avatar, "popup_profile_profile_avatar", 100, my)){
                Lobby.PhaserJS.maskCircleGroup(groupAvatar, avatarSize, my);
                groupAvatar.mask.y += 15;
            }
            //Lobby.PhaserJS.maskCircleGroup(groupAvatar, avatarSize, my);
            if(valueURL != "") {
                ResourceLoader.loadAvatar(avatarURL, valueURL, callbackReloadAvatar, {}, true);
            }
            Lobby.PhaserJS.centerY(avatar, background.height);
        }
        var infoString = my.getStringBasedOnGiftType(data);
        //var infoString;
        //switch (data.type) {
        //    case LobbyConfig.MessageList.Type.Gift: // gift from user
        //        infoString = my.selectlanguage.popup_inbox_Message_Gift.text1 + data.coin + my.selectlanguage.popup_inbox_Message_Gift.text2;
        //        break;
        //    case LobbyConfig.MessageList.Type.FreeGift: // free gift from user
        //        infoString = my.selectlanguage.popup_inbox_Message_FreeGift.text1 + data.coin + my.selectlanguage.popup_inbox_Message_FreeGift.text2;
        //        break;
        //    case LobbyConfig.MessageList.Type.SystemGift: // gift from system
        //        //infoString = my.selectlanguage.popup_inbox_Message_SystemGift.text1 + message.coin + my.selectlanguage.popup_inbox_Message_SystemGift.text2;
        //        infoString = data.info;
        //        break;
        //    case LobbyConfig.MessageList.Type.RequestKey: // request key
        //        infoString = my.selectlanguage.popup_inbox_Message_Requestkey.text;
        //        break;
        //    case LobbyConfig.MessageList.Type.Promote:
        //        infoString = my.selectlanguage.popup_inbox_Message_Promote.text1 + data.coin + my.selectlanguage.popup_inbox_Message_Promote.text2;
        //        break;
        //    case LobbyConfig.MessageList.Type.Vip:
        //        infoString = my.selectlanguage.popup_inbox_Message_Vip.text;
        //        break;
        //    case LobbyConfig.MessageList.Type.VipUp:
        //        infoString = my.selectlanguage.popup_inbox_Message_Vip.text;
        //        break;
        //    case LobbyConfig.MessageList.Type.ReferenceCode:
        //    case LobbyConfig.MessageList.Type.TopPlayerGift:
        //        infoString = my.selectlanguage.popup_inbox_Reference_Code.text;
        //    default :
        //        break;
        //}
        var maxText = 45;
        //if (infoString.length > maxText) {
        //    infoString = infoString.substring(0, maxText) + "...";
        //}
        var tUserName = my.add.text(
            225,
            0,
            infoString,
            {
                font: "36px PassionOne-Regular",
                fill: "#FFFFFF",
                wordWrap: true, wordWrapWidth: 640
            },
            inboxCell
        );
        tUserName.anchor.setTo(0,0.5);

        inboxCell.tUserName = tUserName;
        tUserName.y = (background.height)/2.0 ;
        //inboxCell.tUserName = tUserName;
        //Lobby.PhaserJS.centerYParent(tUserName, background);

        var callBackAccept = function (result,beanData,response) {
            if(!result){
                my.hideLoadingAnimation();
                my.handleFailResultNewStrategy(response,null,true,false);
                return;
            }
            if (data.type != LobbyConfig.MessageList.Type.RequestKey &&
                data.type != LobbyConfig.MessageList.Type.Promote) {
                if (data.name === "Debit") {
                    //my.showNotificationPopup("Successful", 'Accepted successfully');
                }
                else {
                    my.showNotificationPopup(my.selectlanguage.popup_gift_success.text, my.selectlanguage.popup_gift_accept_success.text);
                }
                //my.roundMoney();
                //my._userCoinText.text = Lobby.Utils.formatNumberWithCommas(my._userData.profile.coin);
                my.updateUserInfoFromSV(
                    function (isSuccess) {
                        if (isSuccess) {
                            my.roundMoney();
                        }
                    }
                );
            }
            my.showPopupFriendNew("inbox",true,true);
            //my.decreaseNumberOfInboxMessageText();
        };

        var btnAccept = Lobby.PhaserJS.createSpriteRectangleExt(
            my,
            0,
            0,
            function () {
            },
            function () {
            },
            function () {
            },
            inboxCell,
            LobbyConfig.isDebug,
            '',
            function(){
                my.showLoadingAnimation();
                if (data.type === 3) {
                    LobbyRequest.User.acceptRequestKey(callBackAccept, my, data.id);
                }
                else {
                    //LobbyRequest.User.acceptSingleGift(callBackAccept, my, data.id);
                    LobbyRequest.User.receiveGiftFromUser(data.id,callBackAccept);
                    //LobbyRequest.User.acceptSingleGift(callBackAccept, my, data.id);
                }
            }
        );
        btnAccept.width = background.width - 200;
        btnAccept.height = background.height - 20;

        inboxCell.avatar = avatar;
        inboxCell.tUserName = tUserName;
        inboxCell.groupAvatar = groupAvatar;
        inboxCell.btnAccept = btnAccept;
        inboxCell.background = background;
        return inboxCell;
    };
    my.getAvatarKeyBasedOnGiftType = function(data){
        if(data.from_user_id != -1 && data.from_user_id!=-2)return "";
        var avatarKey = "";
        switch (data.type) {
            //case LobbyConfig.MessageList.Type.Gift: // gift from user
            //    infoString = my.selectlanguage.popup_inbox_Message_Gift.text1 + data.coin_reward + my.selectlanguage.popup_inbox_Message_Gift.text2;
            //    break;
            //case LobbyConfig.MessageList.Type.FreeGift: // free gift from user
            //    infoString = my.selectlanguage.popup_inbox_Message_FreeGift.text1 + data.coin_reward + my.selectlanguage.popup_inbox_Message_FreeGift.text2;
            //    break;
            case LobbyConfig.MessageList.Type.SystemGift:
            case LobbyConfig.MessageList.Type.RequestKey:
            case LobbyConfig.MessageList.Type.Promote1:
            case LobbyConfig.MessageList.Type.Promote2:
            case LobbyConfig.MessageList.Type.Promote3:
            case LobbyConfig.MessageList.Type.VipUp:
            case LobbyConfig.MessageList.Type.TopPlayerGift:
                avatarKey = "popup_inbox_admin_avatar";
                break;
            case LobbyConfig.MessageList.Type.PlayWithFriendWithBenefit:
            case LobbyConfig.MessageList.Type.ReferenceCode:
                avatarKey = "inbox_voucher_icon";
                break;
            case LobbyConfig.MessageList.Type.Gift: // gift from user
            case LobbyConfig.MessageList.Type.FreeGift: // free gift from user
            default :
                avatarKey = "";
                break;
        }
        return avatarKey;
    };
    /**
     * Get string info based on gift type
     * @param data
     */
    my.getStringBasedOnGiftType = function(data){
        var infoString;
        switch (data.type) {
            case LobbyConfig.MessageList.Type.Gift: // gift from user
                infoString = my.selectlanguage.popup_inbox_Message_Gift.text1 + data.coin_reward + my.selectlanguage.popup_inbox_Message_Gift.text2;
                break;
            case LobbyConfig.MessageList.Type.FreeGift: // free gift from user
                infoString = my.selectlanguage.popup_inbox_Message_FreeGift.text1 + data.coin_reward + my.selectlanguage.popup_inbox_Message_FreeGift.text2;
                break;
            case LobbyConfig.MessageList.Type.SystemGift: // gift from system
                //infoString = my.selectlanguage.popup_inbox_Message_SystemGift.text1 + message.coin + my.selectlanguage.popup_inbox_Message_SystemGift.text2;
                infoString = data.info;
                break;
            case LobbyConfig.MessageList.Type.RequestKey: // request key
                infoString = my.selectlanguage.popup_inbox_Message_Requestkey.text;
                break;
            case LobbyConfig.MessageList.Type.Promote1:
            case LobbyConfig.MessageList.Type.Promote2:
            case LobbyConfig.MessageList.Type.Promote3:
                infoString = my.selectlanguage.popup_inbox_Message_Promote.text1 + data.coin_reward + my.selectlanguage.popup_inbox_Message_Promote.text2;
                break;
            case LobbyConfig.MessageList.Type.VipUp:
                infoString = my.selectlanguage.popup_inbox_Message_Vip.text;
                break;
            case LobbyConfig.MessageList.Type.ReferenceCode:
                infoString = my.selectlanguage.popup_inbox_Reference_Code.text;
                break;
            case LobbyConfig.MessageList.Type.TopPlayerGift:
                infoString = my.selectlanguage.popup_inbox_Top_Player_Gift.text;
                break;
            case LobbyConfig.MessageList.Type.PlayWithFriendWithBenefit:
                infoString = my.selectlanguage.popup_inbox_Friend_Benefit.text;
                break;
            default :
                break;
        }
        return infoString;
    };
    /**
     * Update inbox cell UI
     * @param inboxCell: group inbox cell
     * @param data: inbox data
     */
    var updateInboxCell = function(inboxCell,data)
    {
        if (data === null) {
            return;
        }

        //inboxCell.avatar.destroy();
        inboxCell.tUserName.destroy();
        //inboxCell.groupAvatar.destroy();
        inboxCell.btnAccept.destroy();

        var background = inboxCell.background;
        //var groupAvatar = my.add.group();
        //inboxCell.add(groupAvatar);
        //groupAvatar.x = 10;
        var avatarSize = 120;


        var avatarKey = my.getAvatarKeyBasedOnGiftType(data);
        if (avatarKey !== "" ) {
            //var avatar = my.add.sprite(
            //    0,
            //    0,
            //    "popup_inbox_admin_avatar",
            //    null,
            //    groupAvatar
            //);
            //avatar.width = avatarSize;
            //avatar.height = avatarSize;
            inboxCell.avatar.loadTexture(avatarKey);
            if(avatarKey!="inbox_voucher_icon" ){
                if(!Lobby.PhaserJS.createSpriteWithCircleMask(inboxCell.avatar, avatarKey, 100, my)){
                    Lobby.PhaserJS.maskCircleGroup(groupAvatar, avatarSize, my);
                    groupAvatar.mask.y += 15;
                }
            }
            inboxCell.avatar.width = avatarSize;
            inboxCell.avatar.height = avatarSize;
            Lobby.PhaserJS.centerY(inboxCell.avatar, background.height);
        }
        else {
            var avatarURL = "popup_profile_profile_avatar", valueURL = "";
            //var avatar = my.add.sprite(
            //    0,
            //    0,
            //    avatarURL,
            //    null,
            //    groupAvatar
            //);
            //avatar.width = avatarSize;
            //avatar.height = avatarSize;
            if (data.from_user_id != null && data.from_user_id!= -1 && data.from_user_id != "") {
                avatarURL = 'user-avatar-' + data.from_user_id;
                valueURL = "https://graph.facebook.com/" + my.getFacebookUIDBasedOnId(data.from_user_id) +
                    "/picture?type=normal&width=100&height=100";
            }
            var callbackReloadAvatar = function () {
                try {
                    if(Lobby.Utils.objectIsNull(inboxCell.avatar) ||
                        Lobby.Utils.objectIsNull(avatarURL) ){
                        return;
                    }
                    if(!Lobby.PhaserJS.tryLoadAvatar(inboxCell.avatar, avatarURL, my)){
                        Lobby.PhaserJS.createSpriteWithCircleMask(inboxCell.avatar, avatarURL, 100, my);
                    }

                }catch(ex){}
                //Lobby.PhaserJS.scaleAspectSize(avatar, {width: avatarSize, height: avatarSize});
                inboxCell.avatar.width = avatarSize;
                inboxCell.avatar.height = avatarSize;
                Lobby.PhaserJS.centerY(inboxCell.avatar, background.height);

            };
            inboxCell.avatar.loadTexture("popup_profile_profile_avatar");
            if(!Lobby.PhaserJS.createSpriteWithCircleMask(inboxCell.avatar, "popup_profile_profile_avatar", 100, my)){
                //Lobby.PhaserJS.maskCircleGroup(inboxCell.groupAvatar, avatarSize, my);
                //inboxCell.groupAvatar.mask.y += 15;
            }
            inboxCell.avatar.width = avatarSize;
            inboxCell.avatar.height = avatarSize;
            if(valueURL != "") {
                ResourceLoader.loadAvatar(avatarURL, valueURL, callbackReloadAvatar, {}, true);
            }
            Lobby.PhaserJS.centerY(inboxCell.avatar, background.height);
        }
        var infoString = my.getStringBasedOnGiftType(data);
        //switch (data.type) {
        //    case LobbyConfig.MessageList.Type.Gift: // gift from user
        //        infoString = my.selectlanguage.popup_inbox_Message_Gift.text1 + data.coin + my.selectlanguage.popup_inbox_Message_Gift.text2;
        //        break;
        //    case LobbyConfig.MessageList.Type.FreeGift: // free gift from user
        //        infoString = my.selectlanguage.popup_inbox_Message_FreeGift.text1 + data.coin + my.selectlanguage.popup_inbox_Message_FreeGift.text2;
        //        break;
        //    case LobbyConfig.MessageList.Type.SystemGift: // gift from system
        //        //infoString = my.selectlanguage.popup_inbox_Message_SystemGift.text1 + message.coin + my.selectlanguage.popup_inbox_Message_SystemGift.text2;
        //        infoString = data.info;
        //        break;
        //    case LobbyConfig.MessageList.Type.RequestKey: // request key
        //        infoString = my.selectlanguage.popup_inbox_Message_Requestkey.text;
        //        break;
        //    case LobbyConfig.MessageList.Type.Promote:
        //        infoString = my.selectlanguage.popup_inbox_Message_Promote.text1 + data.coin + my.selectlanguage.popup_inbox_Message_Promote.text2;
        //        break;
        //    case LobbyConfig.MessageList.Type.Vip:
        //        infoString = my.selectlanguage.popup_inbox_Message_Vip.text;
        //        break;
        //    case LobbyConfig.MessageList.Type.VipUp:
        //        infoString = my.selectlanguage.popup_inbox_Message_Vip.text;
        //        break;
        //    case LobbyConfig.MessageList.Type.ReferenceCode:
        //    case LobbyConfig.MessageList.Type.TopPlayerGift:
        //        infoString = my.selectlanguage.popup_inbox_Reference_Code.text;
        //    default :
        //        break;
        //}
        var maxText = 45;
        //if (infoString.length > maxText) {
        //    infoString = infoString.substring(0, maxText) + "...";
        //}
        //var tUserName = my.add.text(
        //    175,
        //    0,
        //    infoString,
        //    {
        //        font: "36px PassionOne-Regular",
        //        fill: "#FFFFFF"
        //    },
        //    inboxCell
        //);
        //Lobby.PhaserJS.centerYParent(tUserName, background);
        var tUserName = my.add.text(
            225,
            0,
            infoString,
            {
                font: "36px PassionOne-Regular",
                fill: "#FFFFFF",
                wordWrap: true, wordWrapWidth: 640
            },
            inboxCell
        );
        tUserName.anchor.setTo(0,0.5);

        inboxCell.tUserName = tUserName;
        tUserName.y = (background.height)/2.0 ;

        var callBackAccept = function (result) {
            my.hideLoadingAnimation();
            if (data.type != LobbyConfig.MessageList.Type.RequestKey &&
                data.type != LobbyConfig.MessageList.Type.Promote) {
                if (data.name === "Debit") {

                    //my.showNotificationPopup("Successful", 'Accepted successfully');
                }
                else {
                    my.showNotificationPopup(my.selectlanguage.popup_gift_success.text, my.selectlanguage.popup_gift_accept_success.text);
                }
                //my.roundMoney();
                //my._userCoinText.text = Lobby.Utils.formatNumberWithCommas(my._userData.profile.coin);
                my.updateUserInfoFromSV(
                    function (isSuccess) {
                        if (isSuccess) {
                            my.roundMoney();
                        }
                    }
                );
            }
            my.showPopupFriendNew("inbox",true);
            //my.decreaseNumberOfInboxMessageText();
        };

        var btnAccept = Lobby.PhaserJS.createSpriteRectangleExt(
            my,
            0,
            0,
            function () {
            },
            function () {
            },
            function () {
            },
            inboxCell,
            LobbyConfig.isDebug,
            '',
            function(){
                my.showLoadingAnimation();
                if (data.type === 3) {
                    //LobbyRequest.User.acceptRequestKey(callBackAccept, my, data.id);
                    LobbyRequest.User.receiveGiftFromUser(data.id , callBackAccept);
                }
                else {
                    //LobbyRequest.User.acceptSingleGift(callBackAccept, my, data.id);
                    LobbyRequest.User.receiveGiftFromUser( data.id , callBackAccept);
                }
            }
        );
        btnAccept.width = background.width - 200;
        btnAccept.height = background.height - 20;


        //inboxCell.avatar = avatar;
        //inboxCell.groupAvatar = groupAvatar;
        inboxCell.btnAccept = btnAccept;
    };
    /**
     * Get Info to update UI from profile data
     * @param userData: user data
     * @param isLeaderboard: boolen - check if this is leaderboard
     * @param isUser: boolen - check if this is playpalace user, not friends on facebook
     * @returns {{avatarURL: *, valueURL: *, userName: string, dataLevel: string}}
     */
    var getUIFromProfile = function(userData, isLeaderboard, isUser){

        var avatarURL = null;
        var valueURL = null;
        if(isUser === true){
            if (userData.profile.role != 1) {
                if (userData.profile.name.startsWith("local")) {
                    userData.profile.name = my.selectlanguage.popup_gift_anonymous.text;
                }
                else {
                    if (userData.profile.facebookUID != null && userData.profile.facebookUID != "") {
                        avatarURL = 'user-avatar-' + userData.profile.facebookUID;
                        valueURL = "https://graph.facebook.com/" + userData.profile.facebookUID +
                            "/picture?type=normal&width=100&height=100";
                    } else {
                        avatarURL = 'user-avatar-' + userData.profile.id;
                        valueURL = userData.profile.url_full_avatar;
                    }
                }
            }
            else {
                avatarURL = 'user-avatar-' + userData.profile.id;
                if (userData.profile.url_full_avatar != "" && userData.profile.url_full_avatar != null) {
                    valueURL = LobbyConfig.webServiceFullUrl + "/" + userData.profile.url_full_avatar;
                }
                else {
                    //valueURL = LobbyConfig.botAvatar;
                    valueURL = "";
                }
            }
        }else{
            //facebook
            avatarURL = 'user-avatar-' + userData.profile.id;
            if(userData.profile.picture.data.url != "" && userData.profile.picture.data.url != null)
                valueURL = userData.profile.picture.data.url;
        }

        var userName = userData.profile.name;
        var maxText;
        if(isUser) {
            maxText = 15;
        }else{
            maxText = 20;
        }
        if (userData.profile.name.length > maxText) {
            userName = userData.profile.name.substring(0, maxText - 3) + "...";
        }
        if (userName.trim() === "" || userName.startsWith("local")) {
            userName = LobbyConstant.defaultUserName;
        }
        //console.log("$createUserCell ->username = "+userName);
        var dataLevel = "";
        dataLevel = "Lv." + (userData.profile.level + 1);


        return {avatarURL:avatarURL, valueURL:valueURL,userName:userName,dataLevel:dataLevel};
    };
    /**
     * Update User cell
     * @param userCell: gorup user cell
     * @param userData: user data
     * @param userRank: user rank on (friend list or leaderboard)
     * @param isLeaderboard: boolen - check if this is leaderboard
     * @param isUser: boolen - check if this is playpalace user, not friends on facebook
     */
    var updateUserCell = function (userCell,userData, userRank, isLeaderboard, isUser){

        userData = {
            profile: userData
        };
        if(
            //LobbyConfig.isTestStrategy &&
            Lobby.Utils.objectNotNull(userData.profile.vip_type)){
            userData.profile.type = userData.profile.vip_type;
        }
        if(isUser === true
            && Lobby.Utils.objectIsNull(userData.profile.type)){
            isUser = false;
        }
        var avatar = userCell.avatar;
        var avatarSize = 120;//avatar.avatarSize;
        var background = userCell.background;
        var tUserName = userCell.tUserName;
        var groupAvatar = userCell.groupAvatar;
        var levelText = userCell.levelText;
        var avatarURL;
        var valueURL;

        var callbackReloadAvatar = function  (ud) {
            //return;
            try
            {

                if(Lobby.Utils.objectIsNull(userCell.avatar) ||
                    Lobby.Utils.objectIsNull(avatarURL) ||
                    userCell.cellId != ud.cellId
                //  ||
                //avatar.isDestroy === true
                ){
                    return;
                }
                if(!Lobby.PhaserJS.tryLoadAvatar(userCell.avatar, avatarURL, my)){
                    Lobby.PhaserJS.createSpriteWithCircleMask(userCell.avatar, avatarURL, 100, my);
                }
                userCell.avatar.width = avatarSize;
                userCell.avatar.height = avatarSize;
                Lobby.PhaserJS.centerY(userCell.avatar, background.height);

            }catch(e){}
            //Lobby.PhaserJS.scaleAspectSize(avatar, {width: avatarSize, height: avatarSize});
        };

        var userUIFromProfile = getUIFromProfile(userData, isLeaderboard, isUser);
        avatarURL = userUIFromProfile.avatarURL;
        valueURL = userUIFromProfile.valueURL;
        var userName = userUIFromProfile.userName;

        userCell.avatar.loadTexture("popup_profile_profile_avatar");
        avatarSize = 120;
        if(!Lobby.PhaserJS.createSpriteWithCircleMask(userCell.avatar, "popup_profile_profile_avatar", 100, my)){
            //Lobby.PhaserJS.maskCircleGroup(userCell.groupAvatar, avatarSize, my);
            //userCell.groupAvatar.mask.y += 15;
        }
        userCell.avatar.width = avatarSize;
        userCell.avatar.height = avatarSize;

        Lobby.PhaserJS.centerY(userCell.avatar, background.height);

        if(valueURL != "") {
            ResourceLoader.loadAvatar(avatarURL, valueURL, callbackReloadAvatar, {cellId: userCell.cellId}, true);
        }

        if (isUser) {
            tUserName.fill = "#ffffff";
            var dataLevel = userUIFromProfile.dataLevel;//"Lv." + (userData.profile.level + 1);
            levelText.text = dataLevel;
            Lobby.PhaserJS.centerYParent(levelText, background);
        }
        else {
            levelText.text = " ";
            tUserName.fill = "#534856";
        }

        tUserName.text = userName;
        Lobby.PhaserJS.centerYParent(tUserName, background);


        if(Lobby.Utils.objectNotNull(userCell.rank)){
            userCell.rank.destroy();
            userCell.rank = null;
        }
        if (isLeaderboard) {
            if (userRank <= 3 && userRank > 0) {
                var rank = my.add.sprite(groupAvatar.x-10, -5, "popup_stardom_" + userRank.toString(),null, userCell);
                userCell.rank = rank;
            }
        }
        else if (isUser) {
            if (userData.profile.type != 0) {
                var rank = my.add.sprite(groupAvatar.x-10, -5, "popup_stardom_1", null, userCell);
                userCell.rank = rank;
            }
        }


        if(Lobby.Utils.objectNotNull(userCell.toggleGroup))
        {
            userCell.toggleGroup.destroy();
        }

        var dataCoinText = userData.profile.coin;
        if (isLeaderboard) {
            var info = dataCoinText;
            if(my.currentLeaderBoardType) {
                switch (my.currentLeaderBoardType) {
                    case LobbyConstant.LeaderBoard.SORT_LEADER_BOARD_BY_COIN:
                        info = dataCoinText;
                        break;
                    case LobbyConstant.LeaderBoard.SORT_LEADER_BOARD_BY_SLOT_TOTAL_BET:
                        info = Lobby.Utils.objectNotNull(userData.profile.slot_total_bet) ? userData.profile.slot_total_bet : dataCoinText;
                        break;
                }
            }
            var coinText = userCell.coinText;
            coinText.text = Lobby.Utils.formatCoinNumber(info);
            Lobby.PhaserJS.centerYParent(coinText, background);
        }else{
            var toggleGroup = my.add.group();
            userCell.add(toggleGroup);
            toggleGroup.x = 650;

            var toggleBG = my.add.sprite(0, 0, "toggle_off_friend", null, toggleGroup);
            toggleGroup.add(toggleBG);
            var toggleMark = my.add.sprite(5, 5, "toggle_on_friend", null, toggleGroup);
            toggleGroup.add(toggleMark);
            Lobby.PhaserJS.centerYParent(toggleGroup, background);

            toggleMark.visible = false;

            toggleBG.inputEnabled = true;
            if(userData.profile.isChoosed === true){
                toggleMark.visible = true;
            }else{
                toggleMark.visible = false;
            }
            toggleBG.events.onInputDown.add(function () {
                toggleMark.visible = !toggleMark.visible;
                if (isUser) {
                    if (toggleMark.visible) {
                        userData.profile.isChoosed = true;
                        listFriendSendGift.push(userData.profile.id);
                        listFriendSendGiftFBUID.push(userData.profile.facebookUID);
                    }
                    else {
                        userData.profile.isChoosed = false;
                        Lobby.Utils.removeObjectInArray(userData.profile.id, listFriendSendGift);
                        Lobby.Utils.removeObjectInArray(userData.profile.facebookUID, listFriendSendGiftFBUID);
                    }
                } else {
                    if (toggleMark.visible) {
                        userData.profile.isChoosed = true;
                        listFriendsToInvite.push(userData.profile.id);
                        //listFriendsToInviteFBUID.push(userData.profile.facebookUID);
                    }
                    else {
                        userData.profile.isChoosed = false;
                        Lobby.Utils.removeObjectInArray(userData.profile.id, listFriendsToInvite);
                        //Lobby.Utils.removeObjectInArray(userData.profile.facebookUID, listFriendsToInviteFBUID);
                    }
                }
            });
            if (isUser) {
                if (userData.profile.freeGift === 1) {
                    toggleGroup.visible = false;
                }
                else {
                    toggleGroup.visible = true;
                }

                listFriends.push({
                    fbUID: my.getFacebookUIDBasedOnId(userData.profile.id),
                    id:userData.profile.id,
                    toggleGroup: toggleGroup,
                    toggleMark: toggleMark
                })
            }
            userCell.toggleGroup = toggleGroup;
        }
    };
    /**
     * Create User cell group
     * @param parent: group parent
     * @param userData: user data
     * @param userRank: user rank on (friend list or leaderboard)
     * @param isLeaderboard: boolen - check if this is leaderboard
     * @param isUser: boolen - check if this is playpalace user, not friends on facebook
     * @returns {*} user cell group
     */
    var createUserCell = function (parent, userData, userRank, isLeaderboard, isUser) {
        if (userData === null) {
            userData = {
                profile: {
                    name: "Anonymous",
                    level: 1,
                    coin: 0,
                    maxCoin: 0,
                    rank: 0,
                    ts_created: 1433393887193,
                    currency: "$",
                    biggest_win: 0,
                    user_id: 1,
                    type: 0
                }
            };
        }
        else {
            userData = {
                profile: userData
            };

            if(
                //LobbyConfig.isTestStrategy &&
                Lobby.Utils.objectNotNull(userData.profile.vip_type)){
                userData.profile.type = userData.profile.vip_type;
            }

            if(isUser === true
                && Lobby.Utils.objectIsNull(userData.profile.type)){
                isUser = false;
            };
        }

        var limitY = LobbyConfig.height;

        var stardomCell = my.add.group();
        var background = my.add.sprite(
            0,
            0,
            "",
            null,
            stardomCell
        );
        background.width = 825;
        background.height = 150;
        stardomCell.add(background);
        stardomCell.background = background;
        var rank;

        var dataCoinText = userData.profile.coin;
        var groupAvatar = my.add.group();
        stardomCell.groupAvatar = groupAvatar;
        stardomCell.add(groupAvatar);
        groupAvatar.x = 50;//for crown
        var avatarURL = "popup_profile_profile_avatar", valueURL = "";
        var avatar = my.add.sprite(
            0,
            0,
            avatarURL,
            null,
            groupAvatar
        );
        stardomCell.avatar = avatar;
        var avatarSize = 120;
        //avatar.avatarSize = avatarSize;


        var userUIFromProfile = getUIFromProfile(userData, isLeaderboard, isUser);
        avatarURL = userUIFromProfile.avatarURL;
        valueURL = userUIFromProfile.valueURL;
        var userName = userUIFromProfile.userName;


        var callbackReloadAvatar = function () {
            try {
                if(Lobby.Utils.objectIsNull(avatar) ||
                    Lobby.Utils.objectIsNull(avatarURL) ){
                    return;
                }
                if(!Lobby.PhaserJS.tryLoadAvatar(avatar, avatarURL, my)){
                    Lobby.PhaserJS.createSpriteWithCircleMask(avatar, avatarURL, 100, my)
                }
            }catch(e){

            }
            avatar.width = avatarSize;
            avatar.height = avatarSize;
            //Lobby.PhaserJS.scaleAspectSize(avatar, {width: avatarSize, height: avatarSize});
            Lobby.PhaserJS.centerY(avatar, background.height);
        };
        if(!Lobby.PhaserJS.createSpriteWithCircleMask(avatar, "popup_profile_profile_avatar", 100, my)){
            Lobby.PhaserJS.maskCircleGroup(groupAvatar, avatarSize, my);
            groupAvatar.mask.y += 15;
        }
        //Lobby.PhaserJS.scaleAspectSize(avatar, {width: avatarSize, height: avatarSize});
        avatar.width = avatarSize;
        avatar.height = avatarSize;
        if(valueURL != "") {
            ResourceLoader.loadAvatar(avatarURL, valueURL, callbackReloadAvatar, {}, true);
        }

        Lobby.PhaserJS.centerY(avatar, background.height);
        if (isLeaderboard) {
            if (userRank <= 3 && userRank > 0) {
                rank = my.add.sprite(groupAvatar.x-10, -5, "popup_stardom_"+ userRank.toString() ,null, stardomCell);
                stardomCell.rank = rank;
            }
        }
        else if (isUser) {
            if (userData.profile.type != 0) {
                rank = my.add.sprite(groupAvatar.x-10, -5, "popup_stardom_1",null, stardomCell);
                stardomCell.rank = rank;
            }
        }

        userData.profile.user_id = parseInt(userData.profile.user_id);
        var tUserName = my.add.text(
            groupAvatar.x + 175,
            0,
            userName,
            {
                font: "36px PassionOne-Regular",
                fill: "#FFFFFF"
            },
            stardomCell
        );
        stardomCell.tUserName = tUserName;
        Lobby.PhaserJS.centerYParent(tUserName, background);
        var dataLevel = " ";
        if (isUser) {
            dataLevel = userUIFromProfile.dataLevel;//"Lv." + (userData.profile.level + 1);
        }
        else {
            tUserName.fill = "#534856";
        }
        var levelText = my.add.text(
            500,
            0,
            dataLevel, {
                font: "30px PassionOne-Regular",
                fill: "#FFFFFF"
            },
            stardomCell
        );
        stardomCell.levelText = levelText;
        Lobby.PhaserJS.centerYParent(levelText, background);
        if (isLeaderboard) {
            var info = dataCoinText;
            if(my.currentLeaderBoardType) {
                switch (my.currentLeaderBoardType) {
                    case LobbyConstant.LeaderBoard.SORT_LEADER_BOARD_BY_COIN:
                        info = dataCoinText;
                        break;
                    case LobbyConstant.LeaderBoard.SORT_LEADER_BOARD_BY_SLOT_TOTAL_BET:
                        info = Lobby.Utils.objectNotNull(userData.profile.slot_total_bet) ? userData.profile.slot_total_bet : dataCoinText;
                        break;
                }
            }
            var coinText = my.add.text(
                650,
                0,
                Lobby.Utils.formatCoinNumber(info), {
                    font: "30px PassionOne-Regular",
                    fill: "#FFFFFF"
                },
                stardomCell
            );
            stardomCell.coinText = coinText;
            Lobby.PhaserJS.centerYParent(coinText, background);
        } else {
            var toggleGroup = my.add.group();
            stardomCell.add(toggleGroup);
            toggleGroup.x = 650;

            var toggleBG = my.add.sprite(0, 0, "toggle_off_friend", null, toggleGroup);
            toggleGroup.add(toggleBG);
            var toggleMark = my.add.sprite(5, 5,"toggle_on_friend", null, toggleGroup);
            toggleGroup.add(toggleMark);
            Lobby.PhaserJS.centerYParent(toggleGroup, background);

            toggleMark.visible = false;

            toggleBG.inputEnabled = true;
            toggleBG.events.onInputDown.add(function () {
                toggleMark.visible = !toggleMark.visible;
                if (isUser) {
                    if (toggleMark.visible) {
                        listFriendSendGift.push(userData.profile.id);
                        listFriendSendGiftFBUID.push(userData.profile.facebookUID);
                        userData.profile.isChoosed = true;
                    }
                    else {
                        Lobby.Utils.removeObjectInArray(userData.profile.id, listFriendSendGift);
                        Lobby.Utils.removeObjectInArray(userData.profile.facebookUID, listFriendSendGiftFBUID);
                        userData.profile.isChoosed = false;
                    }
                } else {
                    if (toggleMark.visible) {
                        listFriendsToInvite.push(userData.profile.id);
                        //listFriendsToInviteFBUID.push(userData.profile.facebookUID);
                        userData.profile.isChoosed = true;
                    }
                    else {
                        Lobby.Utils.removeObjectInArray(userData.profile.id, listFriendsToInvite);
                        //Lobby.Utils.removeObjectInArray(userData.profile.facebookUID, listFriendsToInvite);
                        userData.profile.isChoosed = false;
                    }
                }
            });
            if (isUser) {
                if (userData.profile.freeGift === 1) {
                    toggleGroup.visible = false;
                }
                else {
                    toggleGroup.visible = true;
                }

                listFriends.push({
                    fbUID: my.getFacebookUIDBasedOnId(userData.profile.id),
                    id:userData.profile.id,
                    toggleGroup: toggleGroup,
                    toggleMark: toggleMark
                })
            }
            //avatar.events.onOutOfBounds.add(function () {
            //    avatar.visible = false;
            //}, my);
            //toggleBG.events.onOutOfBounds.add(function () {
            //    toggleBG.visible = false;
            //}, my);
            //toggleMark.events.onOutOfBounds.add(function () {
            //    toggleMark.visible = false;
            //}, my);
            //
            //avatar.events.onEnterBounds.add(function () {
            //    avatar.visible = true;
            //}, my);
            //toggleBG.events.onEnterBounds.add(function () {
            //    toggleBG.visible = true;
            //}, my);
            //toggleMark.events.onEnterBounds.add(function () {
            //    toggleMark.visible = true;
            //}, my);
            stardomCell.toggleGroup = toggleGroup;
        }

        return stardomCell;
    };
    /**
     * reset all UI when switch category
     */
    var reset = function () {
        listFriends = [];
        listFriendSendGift = [];
        listFriendsToInvite = [];
        listFriendSendGiftFBUID = [];

        if (friendGroup != null) {
            friendGroup.destroy();
            friendGroup = null;
        }
        if (leaderboardGroup != null) {
            leaderboardGroup.destroy();
            leaderboardGroup = null;
        }
        if (inboxGroup != null) {
            inboxGroup.destroy();
            inboxGroup = null;
        }

        Lobby.PhaserJS.destroyAllChild(groupContainListFriend);

        if (Lobby.Utils.objectNotNull(groupListView)) {
            groupListView.destroy(true);
        }
        yPosition = 0;
        currentCell = 0;
        currentFriend = 0;
        currentInvitableFriend = 0;
    };

    var listFriends = [];
    var listFriendSendGift = [];
    var listFriendSendGiftFBUID = [];
    var listFriendsToInvite = [];
    //var listFriendsToInviteFBUID = [];
    var groupPopupParent = null;
    var groupContainListFriend = null;
    var inboxGroup = null;
    var friendGroup = null;
    var leaderboardGroup = null;
    my.lastTimeGetFriend = 0;

    /**
     * Deprecated
     * @param isShow
     */
    my.checkAndShowDarkLayerInGameSlot = function (isShow) {
        if (my.playingGame === LobbyConstant.isInGame) {
            //var darkLayerInGameSlot = $("#darkLayerInGameSlot");
            //if (isShow) {
            //    darkLayerInGameSlot.css("background-color", "rgba(0,0,0,0.65)");
            //    darkLayerInGameSlot.css("display", "block");
            //} else {
            //    darkLayerInGameSlot.css("display", "none");
            //}
        }
    };
    /**
     * Deprecated
     * @param numberOfDarkLayer
     */
    my.updateColorDarkLayer = function(numberOfDarkLayer) {
        if (my.playingGame === LobbyConstant.isInGame) {
            //var darkLayerInGameSlot = $("#darkLayerInGameSlot");
            //var color = "rgba(0,0,0,0.65)";
            //if (Lobby.Utils.objectNotNull(numberOfDarkLayer) &&
            //    numberOfDarkLayer >= 2) {
            //    color = "rgba(0,0,0,0.87)";
            //}
            //darkLayerInGameSlot.css("background-color", color);
        }
    };
    /**
     * Deprecated
     * @param top
     * @param width
     */
    my.updateDarkLayerInGameSlot = function(top, width){
        if (my.playingGame === LobbyConstant.isInGame) {
            //var darkLayerInGameSlot = $("#darkLayerInGameSlot");
            //darkLayerInGameSlot.css("top", top);
            //darkLayerInGameSlot.css("width", width);
        }
    };
    /**
     * Deprecated
     * @param isShow
     */
    my.checkAndShowDarkLayerLoadingInGameSlot = function (isShow) {
        if (my.playingGame === LobbyConstant.isInGame) {
            //var darkLayerInGameSlotLoading = $('#darkLayerInGameSlotLoading');
            //if (isShow) {
            //    darkLayerInGameSlotLoading.css("background-color", "rgba(0,0,0,0.75)");
            //    darkLayerInGameSlotLoading.css("display", "block");
            //} else {
            //    darkLayerInGameSlotLoading.css("display", "none");
            //}
        }
    };
    /**
     * Deprecated
     * @param top
     * @param width
     */
    my.updateDarkLayerLoadingInGameSlot = function(top, width){
        if (my.playingGame === LobbyConstant.isInGame) {
            //var darkLayerInGameSlot = $("#darkLayerInGameSlotLoading");
            //darkLayerInGameSlot.css("top", top);
            //darkLayerInGameSlot.css("width", width);
        }
    };

    //
    //BAT DAU PHAN DOWNLOAD
    //
    /**
     * Function call when click download slot game
     * @param slotCell: slot game cell group that User click on
     */
    my.downloadGameWithSlotCell = function (slotCell) {
        //download
        var callDownload = function(isForceStart)
        {
            if(Lobby.Utils.objectIsNull(isForceStart))
                isForceStart = false;
            ManagerForDownloadGameSlot.saveDownloadingQueue(slotCell.gameData.game_id, true);
            slotCell.downloadGroup.downloadText.text = "0%";
            slotCell.downloadGroup.downloadSlider.scale.setTo(0, 0.3);
            slotCell.downloadGroup.visible = true;
            slotCell.downloadGroup.downloadText.visible = true;
            slotCell.downloadHidedGroup.visible = true;
            ManagerForDownloadGameSlot.downloadBundle(slotCell.gameData.game_id, function () {
                if (Lobby.Utils.objectNotNull(slotCell)) slotCell.downloadGroup.destroy();
                ManagerForDownloadGameSlot.saveDownloadingQueue(slotCell.gameData.game_id, false);
                LobbyConfig.downloadGameInfo[slotCell.gameData.game_id].currentVersion = LobbyConfig.downloadGameInfo[slotCell.gameData.game_id].version;
            }, function (error) {
                    if(LobbyConfig.isDebug) ("error:" + error +"  " +slotCell.gameData.game_id);
                    ManagerForDownloadGameSlot.saveDownloadingQueueBeHide(slotCell.gameData.game_id, false);
                    ManagerForDownloadGameSlot.saveDownloadingQueue(slotCell.gameData.game_id, false);
                slotCell.downloadGroup.reset();
            }, function (progress) {
                //if(LobbyConfig.isDebug)
                    if(LobbyConfig.isDebug) console.log("process: " + progress + "    " + slotCell.gameData.game_id);
                slotCell.downloadGroup.downloadText.text = progress + "%";
                slotCell.downloadGroup.downloadSlider.scale.setTo((progress / 100) * 0.3, 0.3);
            },
                function(){
                    /**
                     * Call back crc failed
                     */
                },
                function(){
                    /**
                     * Call back memory error
                     */
                    LobbyC.MainMenu.showNotificationPopup(my.selectlanguage.popup_gift_warning.text,my.selectlanguage.not_enough_space.text);
                },
            false,
                isForceStart);
        };
        //neu dang chay animation gia
        if(LobbyConfig.downloadGameInfo[slotCell.gameData.game_id].isRuningAnim4DownloadBehide === true)
            return;
        //neu da dowload ngam xong roi ma chua click download
        if(my.isGameSlotOnlyDownloadedBeHide(slotCell.gameData.game_id)){
            //if(isFirstDownload === true){

            LobbyConfig.downloadGameInfo[slotCell.gameData.game_id].isRuningAnim4DownloadBehide = true;
            slotCell.downloadGroup.visible = true;
            slotCell.downloadGroup.downloadText.visible = true;
            slotCell.downloadHidedGroup.visible = true;

            slotCell.downloadGroup.downloadText.text = "0%";
            slotCell.downloadGroup.downloadSlider.scale.setTo(0, 0.3);

            my.add.tween(slotCell.downloadGroup.downloadSlider.scale).to({x:0.3, y: 0.3}, 1000, Phaser.Easing.Linear.None, true, 0, 0, false);
            var tween = my.add.tween(slotCell.downloadGroup.downloadText).to({
                text: []
            }, 1000, Phaser.Easing.Linear.None, true).interpolation(function (v, k) {
                Phaser.Math.bezierInterpolation(v, k);
                return Lobby.Utils.floatToIntOptimize(k * 100) + "%";
            });
            tween.onComplete.add(function () {
                if (Lobby.Utils.objectNotNull(slotCell)) {
                    slotCell.downloadGroup.destroy();
                }
                LobbyConfig.downloadGameInfo[slotCell.gameData.game_id].currentVersion = LobbyConfig.downloadGameInfo[slotCell.gameData.game_id].version;
                LobbyConfig.downloadGameInfo[slotCell.gameData.game_id].isDownloaded = true;
                LobbyConfig.downloadGameInfo[slotCell.gameData.game_id].isRuningAnim4DownloadBehide = false;
                my.popAndSaveListGameOnlyDownloadedBeHide(slotCell.gameData.game_id);
            });

            setTimeout(function () {
                if (Lobby.Utils.objectNotNull(slotCell)){
                    slotCell.downloadGroup.destroy();
                }
                LobbyConfig.downloadGameInfo[slotCell.gameData.game_id].currentVersion = LobbyConfig.downloadGameInfo[slotCell.gameData.game_id].version;
                LobbyConfig.downloadGameInfo[slotCell.gameData.game_id].isDownloaded = true;
                LobbyConfig.downloadGameInfo[slotCell.gameData.game_id].isRuningAnim4DownloadBehide = false;
                my.popAndSaveListGameOnlyDownloadedBeHide(slotCell.gameData.game_id);
            },2000);
            //}else{
            //    ManagerForDownloadGameSlot.saveDownloadingQueue(slotCell.gameData.game_id, true);
            //}
            return;
        }
        var downloadQueueBeHide = ManagerForDownloadGameSlot.getDownloadingQueueBeHideNotFromCache();
        var downloadQueue = ManagerForDownloadGameSlot.getDownloadingQueueNotFromCache();
        //handle khi click download
        if(Lobby.Utils.objectNotNull(downloadQueueBeHide)
        && downloadQueueBeHide.length > 0){
            if(LobbyConfig.downloadGameInfo[slotCell.gameData.game_id].isDownloadingBeHide === true){
                if(Lobby.Utils.objectNotNull(downloadQueue)
                    && downloadQueue.length > 0){
                    ManagerForDownloadGameSlot.removeDownloadBeHideObjectInQueue(slotCell.gameData.game_id);
                    callDownload();
                }else{
                    if(downloadQueueBeHide[0] === slotCell.gameData.game_id)
                    {
                        ManagerForDownloadGameSlot.swithGameDownloadQueueBeHideToDownloadQueueNormal(slotCell.gameData.game_id);
                        slotCell.downloadGroup.visible = true;
                        slotCell.downloadGroup.downloadText.visible = true;
                        slotCell.downloadHidedGroup.visible = true;
                        LobbyConfig.downloadGameInfo[slotCell.gameData.game_id].downloadGroup = slotCell.downloadGroup;
                        //ManagerForDownloadGameSlot.abortDownloadBeHide(downloadQueueBeHide[0], function(){
                        //    callDownload(true);
                        //}, true);
                    }else{
                        var gameIdPrepareAbort = downloadQueueBeHide[0];
                        ManagerForDownloadGameSlot.abortDownloadBeHide(downloadQueueBeHide[0], function(){
                            ManagerForDownloadGameSlot.removeDownloadBeHideObjectInQueue(slotCell.gameData.game_id);
                            callDownload(true);
                            var gameSlot = {};
                            gameSlot.gameData = {};
                            gameSlot.gameData.game_id = gameIdPrepareAbort;
                            my.downloadGameWithSlotCellBeHide(gameSlot);
                        }, true);
                    }
                }
            }else{
                if(Lobby.Utils.objectIsNull(downloadQueue)
                    || downloadQueue.length === 0)
                {
                    var gameIdPrepareAbort = downloadQueueBeHide[0];
                    ManagerForDownloadGameSlot.abortDownloadBeHide(gameIdPrepareAbort, function(){
                        //ManagerForDownloadGameSlot.removeDownloadBeHideObjectInQueue(slotCell.gameData.game_id);
                        callDownload(true);
                        var gameSlot = {};
                        gameSlot.gameData = {};
                        gameSlot.gameData.game_id = gameIdPrepareAbort;
                        my.downloadGameWithSlotCellBeHide(gameSlot);
                    }, true);
                }else{
                    callDownload()
                }
            }
        }else{
            if(LobbyConfig.downloadGameInfo[slotCell.gameData.game_id].isDownloaded === false)
                callDownload();
        }
    };

    /**
     * Function download game in background
     * @param slotCell: slot game cell
     */
    my.downloadGameWithSlotCellBeHide = function (slotCell) {
        ManagerForDownloadGameSlot.saveDownloadingQueueBeHide(slotCell.gameData.game_id, true);
        ManagerForDownloadGameSlot.downloadBundle(slotCell.gameData.game_id, function () {
                my.pushAndSaveListGameOnlyDownloadedBeHide(slotCell.gameData.game_id);
                ManagerForDownloadGameSlot.saveDownloadingQueueBeHide(slotCell.gameData.game_id, false);
                //LobbyConfig.downloadGameInfo[slotCell.gameData.game_id].currentVersion = LobbyConfig.downloadGameInfo[slotCell.gameData.game_id].version;
                if (Lobby.Utils.objectNotNull(LobbyConfig.downloadGameInfo[slotCell.gameData.game_id].downloadGroup)) {
                    LobbyConfig.downloadGameInfo[slotCell.gameData.game_id].downloadGroup.destroy();
                }
                if(LobbyConfig.downloadGameInfo[slotCell.gameData.game_id].isDownloading){
                    ManagerForDownloadGameSlot.saveDownloadingQueue(slotCell.gameData.game_id, false);
                    LobbyConfig.downloadGameInfo[slotCell.gameData.game_id].isDownloaded = true;
                    my.popAndSaveListGameOnlyDownloadedBeHide(slotCell.gameData.game_id);
                }
            }, function (error) {
                if(LobbyConfig.isDebug) console.log("error:" + error +"  " +slotCell.gameData.game_id);
                ManagerForDownloadGameSlot.saveDownloadingQueueBeHide(slotCell.gameData.game_id, false);
                ManagerForDownloadGameSlot.saveDownloadingQueue(slotCell.gameData.game_id, false);
                if (Lobby.Utils.objectNotNull(LobbyConfig.downloadGameInfo[slotCell.gameData.game_id].downloadGroup)) {
                    LobbyConfig.downloadGameInfo[slotCell.gameData.game_id].downloadGroup.reset();
                }
            }, function (progress) {
                //if(LobbyConfig.isDebug)
                if(LobbyConfig.isDebug) console.log("process: " + progress + "    " + slotCell.gameData.game_id);
                if (Lobby.Utils.objectNotNull(LobbyConfig.downloadGameInfo[slotCell.gameData.game_id].downloadGroup)) {
                    LobbyConfig.downloadGameInfo[slotCell.gameData.game_id].downloadGroup.downloadText.text = progress + "%";
                    LobbyConfig.downloadGameInfo[slotCell.gameData.game_id].downloadGroup.downloadSlider.scale.setTo((progress / 100) * 0.3, 0.3);
                }
            },
            function(){
                /**
                 * Call back crc failed
                 */
            },
            function(){
                /**
                 * Call back memory error
                 */
                if(LobbyConfig.isDebug) console.log("Memory error on hide download queue");
            },
            true);
    };
    /**
     * Push and save to Queue Game that downloaded in background
     * @param gameId: gameID
     */
    my.pushAndSaveListGameOnlyDownloadedBeHide = function (gameId) {
        my.loadListGameOnlyDownloadedBeHide();
        if (Lobby.Utils.objectIsNull(LobbyConfig.listSlotGameDownloadedBeHideButNotYetDownloadFromUser))
            LobbyConfig.listSlotGameDownloadedBeHideButNotYetDownloadFromUser = [];
        LobbyConfig.listSlotGameDownloadedBeHideButNotYetDownloadFromUser.push(gameId);
        Lobby.Utils.setObjToLocalStorage("listSlotGameOnlyDownloadedBeHide", LobbyConfig.listSlotGameDownloadedBeHideButNotYetDownloadFromUser);
    };
    /**
     * Popup and save to Queue Game that downloaded in background
     * @param gameId: gameID
     */
    my.popAndSaveListGameOnlyDownloadedBeHide = function (gameId) {
        my.loadListGameOnlyDownloadedBeHide();
        var newArr = [];
        for (var i = 0; i < LobbyConfig.listSlotGameDownloadedBeHideButNotYetDownloadFromUser.length; i++) {
            if (LobbyConfig.listSlotGameDownloadedBeHideButNotYetDownloadFromUser[i] != gameId)
                newArr.push(LobbyConfig.listSlotGameDownloadedBeHideButNotYetDownloadFromUser[i]);
        }
        Lobby.Utils.setObjToLocalStorage("listSlotGameOnlyDownloadedBeHide", newArr);
    };
    /**
     * Load Queue contains games that download in background
     */
    my.loadListGameOnlyDownloadedBeHide = function () {
        LobbyConfig.listSlotGameDownloadedBeHideButNotYetDownloadFromUser = Lobby.Utils.getObjFromLocalStorage("listSlotGameOnlyDownloadedBeHide");
    };
    /**
     * Check if this game is downloaded in background
     * @param gameId: game ID
     * @returns {boolean} - true if this game is downloaded in background
     */
    my.isGameSlotOnlyDownloadedBeHide = function (gameId) {
        my.loadListGameOnlyDownloadedBeHide();
        if (Lobby.Utils.objectNotNull(LobbyConfig.listSlotGameDownloadedBeHideButNotYetDownloadFromUser)
            && LobbyConfig.listSlotGameDownloadedBeHideButNotYetDownloadFromUser.length > 0
            && LobbyConfig.listSlotGameDownloadedBeHideButNotYetDownloadFromUser.indexOf(gameId) >= 0) {
            return true;
        }
        return false;
    };
    //
    //KET THUC PHAN DOWNLOAD
    //
    /***
     * Show Piggy Bank Popup
     */
    my.showPiggyBankPopup = function(){
        var group = my.add.group();
        var background = my.add.sprite(0, 0, "popup_notification_background", null);
        background.width = 600;
        background.height = 400;
        group.add(background);

        my.createButtonExitPopup(group, 525, -15, null, function(){
            //my.checkAndShowPopupBonus();
        });

        var titleText = my.add.text(
            0,
            -80,
            "Tab to break the piggy bank!",
            {
                font: "60px PassionOne-Bold",
                fill: "#ffffff",
                align: "center"
            },
            group
        );
        Lobby.PhaserJS.centerX(titleText, background.width);

        var messageText = my.add.text(
            0,
            80,
            "You have saved\n\nCoins",
            {
                font: "50px PassionOne-Bold",
                fill: "#ffffff",
                align: "center"
            },
            group
        );
        Lobby.PhaserJS.centerX(messageText, background.width);
        var coin =  LobbyConfig.additionalInfo.piggyBank.coin;

        var bankCoin = my.add.text(
            0,
            120,
            //Lobby.Utils.formatNumberWithCommas("15000"),
            Lobby.Utils.formatNumberWithCommas(coin),
            {
                font: "70px PassionOne-Bold",
                fill: "#FFFFBF"
            },
            group
        );
        my.piggyBankCoin = bankCoin;
        var ruleText = my.add.text(
            0,
            background.height,
            "Here is the instruction",
            {
                font: "45px PassionOne-Bold",
                fill: "#ffffff",
                align: "center"
            },
            group
        );
        Lobby.PhaserJS.centerX(ruleText, background.width);

        Lobby.PhaserJS.centerX(bankCoin, background.width);
        var btnCollect = my.createButtonGreenPopup(
            group,
            0,
            background.height - 140,
            "Break now for $2.99",
            1,
            function () {
                ManagerForPurchase.buyPackageBasedOnPlatform("PiggyBankP1",my);
            },
            60
        );
        Lobby.PhaserJS.centerX(btnCollect, background.width);

        Lobby.PhaserJS.centerWorldForPopupWithBackground(group, background);

        Lobby.PhaserJS.scaleGroupForOptimize(group, true);
        if (LobbyConfig.useManagerForPopUp) {
            // pop up queue
            ManagerForPopUp.addPopUpToQueue(
                ManagerForPopUp.createPopUpData(
                    my,
                    group
                ),
                true // isShow
            );
        } else {
            my.openPopupWithAnimateUpNew(group);
        }
    };
    /***
     * Show Daily Challenge Popup
     */
    my.showDailyChallengePopup = function(data){
        if(data == null){
            return;
        }

        //var dailyChallengeInfo =

        var rewardCoin = data.coin_reward;
        var rewardCrown = data.crown_reward;
        var disableCollect = !data.can_collect;
        var taskList = [];
        var taskListBean = data.daily_challenge_task_list.member;
        for(var i = 0; i < taskListBean.length; ++i){
            if(LobbyConfig.dailyChallengeInfo[taskListBean[i].daily_challenge_task_config_id] &&
                LobbyConfig.dailyChallengeInfo[taskListBean[i].daily_challenge_task_config_id].is_activated) {
               var item = {
                    id: taskListBean[i].daily_challenge_task_config_id,
                    name: taskListBean[i].name,
                    info: taskListBean[i].info,
                    currentProgress: taskListBean[i].current_progress,
                    goal: LobbyConfig.dailyChallengeInfo[taskListBean[i].daily_challenge_task_config_id].goal
                };

                //DEBUG SHOW RIGHT NAME FOR DAILY CHALLENGE
                switch(LobbyConfig.dailyChallengeInfo[taskListBean[i].daily_challenge_task_config_id].type){
                    case LobbyConstant.DAILY_CHALLENGE_TYPE_LEVEL_UP:
                        item.name = "Level Up";
                        break;
                    case LobbyConstant.DAILY_CHALLENGE_TYPE_RECEIVE_GIFT:
                        item.name = "Receive Gift";
                        break;
                    case LobbyConstant.DAILY_CHALLENGE_TYPE_SEND_GIFT:
                        item.name = "Send Gift";
                        break;
                    case LobbyConstant.DAILY_CHALLENGE_TYPE_COLLECT_FREE_COIN_GIFT:
                        item.name = "Collect Free Coin";
                        break;
                    case LobbyConstant.DAILY_CHALLENGE_TYPE_SPIN:
                        item.name = "Spin";
                        break;
                    case LobbyConstant.DAILY_CHALLENGE_TYPE_MAX_BET:
                        item.name = "Max Bet";
                        break;
                    case LobbyConstant.DAILY_CHALLENGE_TYPE_BIG_WIN:
                        item.name = "Big Win";
                        break;
                    case LobbyConstant.DAILY_CHALLENGE_TYPE_MEGA_WIN:
                        item.name = "Mega Win";
                        break;
                    case LobbyConstant.DAILY_CHALLENGE_TYPE_TOTAL_BET:
                        item.name = "Total Bet";
                        break;
                    case LobbyConstant.DAILY_CHALLENGE_TYPE_TOTAL_WIN:
                        item.name = "Total Win";
                        break;
                }

                taskList.push(item);
            }
        }


        var group = my.add.group();
        var background = my.add.sprite(0, 0, "popup_notification_background", null);
        background.width = 900;
        background.height = 600;
        group.add(background);

        my.createButtonExitPopup(group, 825, -15, null, function(){
            //my.checkAndShowPopupBonus();
        });

        var titleText = my.add.text(
            0,
            0,
            "Daily Challenge",
            {
                font: "70px PassionOne-Bold",
                fill: "#ffffff",
                align: "center"
            },
            group
        );
        Lobby.PhaserJS.centerX(titleText, background.width);

        var messageText = my.add.text(
            0,
            80,
            "Complete any 5 tasks and get:",
            {
                font: "30px PassionOne-Bold",
                fill: "#ffffff",
                align: "center"
            },
            group
        );
        Lobby.PhaserJS.centerX(messageText, background.width);

        var rewardCoinText = my.add.text(
            background.width/2 - 200,
            120,
            Lobby.Utils.formatNumberWithCommas(rewardCoin),
            {
                font: "60px PassionOne-Bold",
                fill: "#FFFFBF"
            },
            group
        );

        var rewardCrownText = my.add.text(
            background.width/2 + 200,
            120,
            Lobby.Utils.formatNumberWithCommas(rewardCrown),
            {
                font: "60px PassionOne-Bold",
                fill: "#FFFFBF"
            },
            group
        );
        var btnCollect;
        var setEnableBtnCollect = function(isEnable){
            if(!isEnable){
                btnCollect.tint = 0x777777;
                btnCollect.textBtn.tint = 0x958E8E;
                btnCollect.input.enabled = false;
            }else{
                btnCollect.tint = 0xffffff;
                btnCollect.textBtn.tint = 0xffffff;
                btnCollect.input.enabled = true;
            }
        };

        btnCollect = my.createButtonGreenPopup(
            group,
            0,
            background.height - 140,
            my.selectlanguage.collect.text,
            1,
            function () {
                LobbyRequest.User.collectDailyChallenge(function(isSuccess,data, response){
                    if(!isSuccess){
                        my.handleFailResultNewStrategy(response,null,true,false);
                        return;
                    }
                    setEnableBtnCollect(false);
                    LobbyC.MainMenu.updateUserInfoFromSV();
                });
            },
            60
        );

        setEnableBtnCollect(!disableCollect);

        var createDailyChallengeList = function(info){
            if(Lobby.Utils.objectIsNull(info) || info.length == 0){
                return;
            }
            var groupDailyChallenge = my.add.group();
            group.add(groupDailyChallenge);
            groupDailyChallenge.y = 250;

            var contentGroup = my.add.group();
            groupDailyChallenge.add(contentGroup);

            var yPos = 0;
            var contentHeight = 0;
            for(var i = 0; i < info.length; ++i){
                var item = my.add.group();
                item.x = 50;
                item.y = yPos;
                item.text = my.add.text(0, 0, info[i].name, {
                    font: '30px PassionOne-Bold',
                    fill: '#ffffff',
                    align: "center"
                });
                item.add(item.text);
                item.progress = Lobby.PhaserJS.createProgressBar(my,
                    300,
                    0,
                    null,
                    "popup_achievement_slider",
                    item,
                    info[i].currentProgress,
                    info[i].goal,
                    LobbyConfig.isDebug,
                    true,
                    false
                );

                contentGroup.add(item);
                contentHeight = item.height;
                yPos += 50;
            }

            if(info.length > 4) {
                my.game.kineticScrolling.start(contentGroup,
                    false,
                    true,
                    0,
                    0,
                    groupDailyChallenge.height - contentHeight * 5,
                    0,
                    my,
                    null,
                    null,
                    null,
                    null,
                    null,
                    {
                        minX: 475,
                        minY: 300,
                        maxX: 1388,
                        maxY: 600
                    });
            }
            Lobby.PhaserJS.maskRectangleGroup(my, groupDailyChallenge, 0, 0, /*groupDailyChallenge.width*/ LobbyConfig.width, contentHeight * 5);
        };
        createDailyChallengeList(taskList);
        //var progressBar = Lobby.PhaserJS.createProgressBar(my,
        //    150,
        //    200,
        //    null,
        //    "popup_achievement_slider",
        //    group,
        //    30,
        //    100,
        //    LobbyConfig.isDebug,
        //    true,
        //    false
        //);

        Lobby.PhaserJS.centerX(btnCollect, background.width);
        Lobby.PhaserJS.centerWorldForPopupWithBackground(group, background);
        Lobby.PhaserJS.scaleGroupForOptimize(group, true);
        if (LobbyConfig.useManagerForPopUp) {
            // pop up queue
            ManagerForPopUp.addPopUpToQueue(
                ManagerForPopUp.createPopUpData(
                    my,
                    group
                ),
                true // isShow
            );
        } else {
            my.openPopupWithAnimateUpNew(group);
        }
    };
    /***
     * Show Comeback Bonus Popup
     */
    my.showComebackBonusPopup = function(){

        if (!LobbyConfig.isTestStrategy) return false;
        if(!LobbyConfig.additionalInfo.comebackBonus ||
            !LobbyConfig.additionalInfo.comebackBonus.canCollect){
            return false;
        }
        var group = my.add.group();
        var background = my.add.sprite(0, 0, "popup_notification_background", null);
        background.width = 600;
        background.height = 400;
        group.add(background);

        my.createButtonExitPopup(group, 525, -15, null, function(){
            my.checkAndShowPopupBonus();
        });

        var titleText = my.add.text(
            0,
            -80,
            "Comeback Bonus!",
            {
                font: "60px PassionOne-Bold",
                fill: "#ffffff",
                align: "center"
            },
            group
        );
        Lobby.PhaserJS.centerX(titleText, background.width);

        var coin =  LobbyConfig.additionalInfo.comebackBonus.coin;

        var coinReward = my.add.text(
            0,
            50,
            //Lobby.Utils.formatNumberWithCommas("15000"),
            Lobby.Utils.formatNumberWithCommas(coin),
            {
                font: "70px PassionOne-Bold",
                fill: "#FFFFBF"
            },
            group
        );

        var crown =  LobbyConfig.additionalInfo.comebackBonus.crown;

        var crownReward = my.add.text(
            0,
            120,
            //Lobby.Utils.formatNumberWithCommas("15000"),
            Lobby.Utils.formatNumberWithCommas(crown),
            {
                font: "70px PassionOne-Bold",
                fill: "#FFFFBF"
            },
            group
        );


        Lobby.PhaserJS.centerX(coinReward, background.width);
        Lobby.PhaserJS.centerX(crownReward, background.width);

        var btnCollect = my.createButtonGreenPopup(
            group,
            0,
            background.height - 140,
            my.selectlanguage.collect.text,
            1,
            function () {
                LobbyRequest.User.collectComebackBonus(function(){
                    LobbyC.MainMenu.updateUserInfoFromSV();
                    if (LobbyConfig.useManagerForPopUp) {
                        //ManagerForPopUp.closeCurrentShowingPopUp();
                        ManagerForPopUp.forceClosePopUp(my, group);
                    } else {
                        my.closePopupWithAnimateDownNew(group);
                    }
                    my.checkAndShowPopupBonus();
                }, my);
            },
            60
        );
        Lobby.PhaserJS.centerX(btnCollect, background.width);

        Lobby.PhaserJS.centerWorldForPopupWithBackground(group, background);

        Lobby.PhaserJS.scaleGroupForOptimize(group, true);
        if (LobbyConfig.useManagerForPopUp) {
            // pop up queue
            ManagerForPopUp.addPopUpToQueue(
                ManagerForPopUp.createPopUpData(
                    my,
                    group
                ),
                true // isShow
            );
        } else {
            my.openPopupWithAnimateUpNew(group);
        }

        return true;
    };
    return my;

}(LobbyC.MainMenu || {}));
