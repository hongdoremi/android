/**
 * Created by Phuoc Tran on 27-07-2016.
 */
var ManagerForPopUp = new function () {
    var that = this;

    //var popUpDataQueue = new Deque();
    //var currentShowingPopUpGroupQueue = new Deque();

    var currentShowingPopUpData = null;
    var popUpDataQueue = [];
    var currentShowingPopUpGroupQueue = [];

    var animationShowPopUp = null;
    var animationHidePopUp = null;
    var animationFadeInDurationTime = 300;
    var animationFadeOutDurationTime = 300;
    var delayBetweenShowingPopUp = 400;

    //var allowShowPopUp = true;

    var idCounter = 0;

    var darkLayer = null;
    /**
     * Init manager for pop up
     */
    this.init = function () {
        //allowShowPopUp = true;
        currentShowingPopUpData = null;

        //popUpDataQueue.clear();
        popUpDataQueue = [];
        currentShowingPopUpGroupQueue = [];
        idCounter = 0;

        darkLayer = null;
    };
    /**
     * Remove group from current showing popup queue
     * @param group
     */
    this.removeGroupFromCurrentShowingPopUpQueue = function (group) {
        var groupId = group.id;
        for (var index = 0; index < currentShowingPopUpGroupQueue.length; ++index) {
            var group = currentShowingPopUpGroupQueue[index];
            if (group.id === groupId) {
                //currentShowingPopUpGroupQueue.splice(index, 1);
                Lobby.Utils.splice1Item(currentShowingPopUpGroupQueue,index);
                //return;
            }
        }
    };
    /**
     * Incrent id counter and return it
     * @returns {number}
     */
    this.getIncrementIdCounter = function () {
        ++idCounter;
        return idCounter;
    };
    /**
     * Force show popup
     * @param my
     * @param group
     */
    this.forceShowPopUp = function (my, group) {
        Lobby.Utils.printConsoleLog("forceShowPopUp: group: ", group);
        if (Lobby.Utils.objectIsNull(my)
            || Lobby.Utils.objectIsNull(group)) {
            Lobby.Utils.printConsoleLog("forceShowPopUp my or group is null!");
            return;
        }

        var popUpDataOption = null;
        if (Lobby.Utils.objectNotNull(currentShowingPopUpData)) {
            popUpDataOption = currentShowingPopUpData.option;
        }
        var callbackAfterShowingPopUp = null;
        if (Lobby.Utils.objectNotNull(popUpDataOption)) {
            callbackAfterShowingPopUp = popUpDataOption.callbackAfterShowingPopUp;
        }

        my.unfocusAll();
        group.alpha = 0;
        group.visible = true;

        //my._animationMoveGroupUp = my.add.tween(group);
        animationShowPopUp = my.add.tween(group);
        animationShowPopUp.onComplete.add(function () {
            console.log("Completed animationShowPopUp");
            if (Lobby.Utils.objectNotNull(callbackAfterShowingPopUp)) {
                console.log("call callbackAfterShowingPopUp");
                callbackAfterShowingPopUp();
            }
        });
        animationShowPopUp.to(
            {
                alpha: 1
            },
            animationFadeInDurationTime,
            Phaser.Easing.Linear.None
        );

        // nếu popup group chưa có id thì sẽ tự tạo id
        if (Lobby.Utils.objectIsNull(group.id)) {
            group.id = this.getIncrementIdCounter();
        }
        currentShowingPopUpGroupQueue.push(group);
        animationShowPopUp.start();

        if (group.isPopUpShopGroup === true) {
            my.playCoinCrownPurchaseSound();
        } else {
            my.playPopUpSound();
        }

        //console.log("darklayer: ", darkLayer);

        if (Lobby.Utils.objectIsNull(darkLayer)) {
            darkLayer = my.createDarkLayer();
            darkLayer.scale.setTo(1, 1.5);
            my.world.bringToTop(group);
        } else {
            my.world.bringToTop(darkLayer);
            my.world.bringToTop(group);
        }
    };
    /**
     * Show first popup in queue
     */
    this.showFirstPopUpInQueue = function () {
        Lobby.Utils.printConsoleLog(
            "showFirstPopUpInQueue: popUpDataQueue.length",
            popUpDataQueue.length,
            "currentShowingPopUpGroupQueue.length: ",
            currentShowingPopUpGroupQueue.length
        );
        //if (!allowShowPopUp || popUpDataQueue.isEmpty() || numberOfPopUp > 0) {
        if (popUpDataQueue.length == 0 || currentShowingPopUpGroupQueue.length > 0) {
            Lobby.Utils.printConsoleLog("++++++++++++++++++++++++++++++++ force return showFirstPopUpInQueue");
            return;
        }
        //console.log("Before shift: ", popUpDataQueue);
        currentShowingPopUpData = popUpDataQueue.shift();
        //allowShowPopUp = false;
        //console.log("After shift: ", popUpDataQueue);
        //console.log("popUpData: ", currentShowingPopUpData);

        var my = currentShowingPopUpData.my;
        var group = currentShowingPopUpData.group;

        this.forceShowPopUp(my, group);
    };
    /**
     * Create popup data
     * @param my
     * @param group
     * @param callbackAfterShowingPopUp
     * @returns {{my: *, group: *, option: {callbackAfterShowingPopUp: *}}}
     */
    this.createPopUpData = function (my,
                                     group,
                                     callbackAfterShowingPopUp) {
        var popUpData = {
            my: my,
            group: group,
            option: {
                callbackAfterShowingPopUp: callbackAfterShowingPopUp
            }
        };
        return popUpData;
    };
    /**
     * Add a popup to queue
     * @param popUpData
     * @param isShow
     */
    this.addPopUpToQueue = function (popUpData,
                                     isShow) {
        if (Lobby.Utils.objectNotNull(popUpData.group)) {
            popUpData.group.alpha = 0;
        }
        popUpDataQueue.push(popUpData);
        //var popUpDataIndexInQueue =
        if (isShow === true) {
            this.showFirstPopUpInQueue();
        }
    };
    /**
     * Force close a popup
     * @param my
     * @param group
     * @param callback
     */
    this.forceClosePopUp = function (my, group, callback) {
        my.playPopUpSound();
        if(Lobby.Utils.objectNotNull(group.isClosingPopup)){
            if(!group.isClosingPopup) return;
        }
        //layer handle click nhieu lan
        //var darkLayerTemp = my.add.sprite(0, 0, "popup-dark-layer-login-state");
        //darkLayerTemp.position.y -= ManagerForScale.doubleIncrementHeight();
        //darkLayerTemp.alpha = 0;
        //darkLayerTemp.inputEnabled = true;

        animationHidePopUp = my.add.tween(group);
        animationHidePopUp.to(
            {
                alpha: 0
            },
            animationFadeOutDurationTime,
            Phaser.Easing.Linear.None);
        animationHidePopUp.onComplete.add(
            function () {
                that.removeGroupFromCurrentShowingPopUpQueue(group);
                console.log(
                    "forceClosePopUp onComplete: currentShowingPopUpGroupQueue.length: ",
                    currentShowingPopUpGroupQueue.length
                );

                if (currentShowingPopUpGroupQueue.length > 0) {
                    var lastGroup = currentShowingPopUpGroupQueue[currentShowingPopUpGroupQueue.length - 1];
                    my.world.bringToTop(darkLayer);
                    my.world.bringToTop(lastGroup);
                }

                if (Lobby.Utils.objectNotNull(darkLayer)
                    && currentShowingPopUpGroupQueue.length <= 0) {
                    console.log("-------------------------------------------------- darkLayer.destroy()");
                    darkLayer.destroy();
                    darkLayer = null;
                }

                //darkLayerTemp.destroy();

                group.visible = false;

                //if (darkLayerTemp !== undefined) {
                //    my.destroyDarkLayer(darkLayerTemp);
                //}


                if (Lobby.Utils.objectNotNull(callback)) {
                    callback();
                }

                // 2016-08-09: Phuoc: mở pop up tiếp theo trong queue
                //allowShowPopUp = true;
                my.time.events.add(delayBetweenShowingPopUp,
                    function () {
                        that.showFirstPopUpInQueue();
                    }, that);
            },
            my);
        Lobby.Utils.printConsoleLog("remove: ", group);
        that.removeGroupFromCurrentShowingPopUpQueue(group);
        group.isClosingPopup = true;
        animationHidePopUp.start();

        if (currentShowingPopUpGroupQueue.length == 1) {
            my.game.kineticScrolling.isDisable = false;
        }
        if (currentShowingPopUpGroupQueue.length <= 0) {
            if (LobbyUserData.dataTutorial.isPlayingTutorial == false) {
                my.game.pageViewMain.isDisable = false;
            }
            my.game.pageViewInfoPopup.isDisable = true;
            // later:  remove my.currentTab
            //my.currentTab = "undefined";
            if (LobbyUserData.dataTutorial.isPlayingTutorial == true
                && LobbyUserData.dataTutorial.currentStep == LobbyConstant.Constant4Tutorial.StepShowAchievementPopup) {
                my.gotoStep(LobbyConstant.Constant4Tutorial.StepShowPopupShop);
            }
        }
    };

    //this.closeCurrentShowingPopUp = function (callback) {
    //    console.log(
    //        "closeCurrentShowingPopUp: currentShowingPopUpGroupQueue.length: ",
    //        //currentShowingPopUpData,
    //        currentShowingPopUpGroupQueue.length
    //    );
    //    if (Lobby.Utils.objectIsNull(currentShowingPopUpData)
    //        || currentShowingPopUpGroupQueue.length <= 0) {
    //        return;
    //    }
    //
    //    var my = currentShowingPopUpData.my;
    //    var group = currentShowingPopUpData.group;
    //
    //    this.forceClosePopUp(my, group, callback);
    //};
};