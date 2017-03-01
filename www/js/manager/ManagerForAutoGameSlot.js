/**
 * Created by Phan on 11/26/2016.
 */
function ManagerForAutoGameSlot(my){

    var that = this;
    var currentTimeInGameClock = null;

    var arrayFreeCoinGift = null;
    var timeOutToClosePopupWhenLevelUp = 1000;
    //var modifyCollectTime = 1.0/(60*15); //Debug only
    var modifyCollectTime = 1.0; //Debug only
    var buttonAutoFCGPosition = null;
    var isCollecting = false;
    var nextCollectTimeText = null;

    var buttonCoinGift = [];


    this.onOutOfMoney = function(){
        if(!that.autoCollectFCG){
            return;
        }
        that.manualCollectFreeCoinGift(currentTimeInGameClock,-1,function(){
            that.manualClickAutoSpinButton();
        });
    };

    this.manualClickAutoSpinButton = function(){
          my.currentGameSlot.getGame().onAutoSpin();
    };




    var setNextCollectTimeText = function(currentTimeInMs){
        nextCollectTimeText.text = Helper.Time.milisecondTimeToStringNormalTime(currentTimeInMs,true);
    };
    /**
     * #Thanh
     * Init next collect time text
     * @param group
     * @returns {*}
     */
    var initNextCollectTimeText = function(group){
        var style = {
            font: "50px PassionOne-Regular",
            fill: "#009933"
        };
        var text = my.add.text(200,100,"",style,group);
        return text;
    };

    /**
     * #Thanh
     * Init free coin gift array as hardcode
     * @returns {*[]}
     */
    var initFreeCoinGift = function(){
        var array = [
            {
                coinReward:30000,
                waitingTime:1000*60*60*modifyCollectTime
            },
            {
                coinReward:15000,
                waitingTime:1000*60*30*modifyCollectTime
            },
            {
                coinReward:8000,
                waitingTime:1000*60*15*modifyCollectTime
            }
        ];

        return array;
    };
    /**
     * #Thanh
     * Init last collect info
     * @param currentTimeInMs
     * @param lastCoinGift
     * @returns {{}}
     */
    var initLastCollectInfo = function(currentTimeInMs,lastCoinGift){
        var info = {};
        //if(currentTimeInMs> LobbyConstant.RESET_TIMER){
        //    lastCoinGift = null;
        //}
        info.collectTimeInMs = currentTimeInMs;
        if(lastCoinGift == null){
            info.collectReward = 0;
            info.nextWatingTime = 0;
            info.nextCoinGift = arrayFreeCoinGift[0];
        }else{
            info.collectReward = lastCoinGift.coinReward;
            info.nextWatingTime = lastCoinGift.waitingTime;
            for(var i = 1; i<arrayFreeCoinGift.length;i++){
                info.nextCoinGift = arrayFreeCoinGift[i];
                if(arrayFreeCoinGift[i-1].waitingTime == info.nextWatingTime){
                    break;
                }
            }
        }

        info.nextCollectTime = currentTimeInMs + info.nextWatingTime;
        return info;

    };
    /**
     * Collect free coin gift
     * @param coinGift
     */
    var collectFreeCoinGift = function(currentTimeInMs,coinGift,callback){
        var index = null;
        for(var i = 0;i<arrayFreeCoinGift.length;i++){
            if(arrayFreeCoinGift[i].coinReward === coinGift.coinReward){
                index = i;
                break;
            }
        }
        var resultFunc = function(isSuccess,data,response){
            if(isSuccess){
                console.log("Collecting auto free coin gift at " + Helper.Time.milisecondTimeToStringNormalTime(currentTimeInMs,true) +" success. Received "+ data.coin_reward);
                /**
                 * Phong truong hop bo dem thoi gian reset ve lan collect dau tien khi dang goi ajax. Khi do autoTestLastCollectInfo bi reset ve null
                 */
                if(LobbyConfig.autoTestLastCollectInfo  != null)
                    LobbyConfig.autoTestLastCollectInfo = initLastCollectInfo(currentTimeInMs,coinGift);
                else{
                    LobbyConfig.autoTestLastCollectInfo = initLastCollectInfo(currentTimeInMs,null);
                }
                setNextCollectTimeText(LobbyConfig.autoTestLastCollectInfo.nextCollectTime);
                LobbyC.MainMenu.createCoinAnimation(buttonCoinGift[index], null, null, null, function () {
                }, null);
            }else{
                console.log("Collecting auto free coin gift at " + Helper.Time.milisecondTimeToStringNormalTime(currentTimeInMs,true)  + " failed. Code " + data.core_result_code);
            }
            isCollecting = false;
            if(callback) callback(isSuccess);
        };
        isCollecting = true;
        Manager4DebugTestAlgorithm.callAPIFreeCoinGift(i,
            LobbyC.MainMenu.referenceKey,
            resultFunc);
    };
    /**
     * #THanh
     * Check and collect free coin gift based on last collect info
     * @param currentTimeInMs
     */
    var checkAndCollectFreeCoinGift = function(currentTimeInMs){
        if(!that.autoCollectFCG || isCollecting) return;
        if(LobbyConfig.autoTestLastCollectInfo==null){
            console.log("LobbyConfig.autoTestLastCollectInfo = null, resetting last collect info next gift to first coin gift!");
            LobbyConfig.autoTestLastCollectInfo = initLastCollectInfo(currentTimeInMs,null);
        }
        if( currentTimeInMs >= LobbyConfig.autoTestLastCollectInfo.collectTimeInMs + LobbyConfig.autoTestLastCollectInfo.nextWatingTime){
            collectFreeCoinGift(currentTimeInMs,LobbyConfig.autoTestLastCollectInfo.nextCoinGift);
        }
    };
    /**
     * #Thanh
     * Clear all hook and interval
     */
    var onParentGroupDestroy = function(){
        if(that.autoPlayVideoInterval != null) window.clearInterval(that.autoPlayVideoInterval);
        currentTimeInGameClock.updateFunction = Lobby.Utils.nullFunction;
    };
    /**
     * #Thanh
     * Add time allowing manual collect
     * @param index
     * @param clock
     */
    this.manualCollectFreeCoinGift = function(clock, index, fcallback){
        if(isCollecting) return;
        if(Lobby.Utils.objectIsNull(clock)) clock =  currentTimeInGameClock;
        if(LobbyConfig.autoTestLastCollectInfo==null){
            console.log("LobbyConfig.autoTestLastCollectInfo = null, resetting last collect info next gift to first coin gift!");
            LobbyConfig.autoTestLastCollectInfo = initLastCollectInfo(clock.getTimeInMs(),null);
        }
        if(index!=-1){
            var coinInfo = arrayFreeCoinGift[index];
            LobbyConfig.autoTestLastCollectInfo.nextCoinGift = coinInfo;
            var waitingTime = [60 * 60 * 1000, 30 * 60 * 1000, 15 * 60 * 1000];
            LobbyConfig.autoTestLastCollectInfo.nextWatingTime = waitingTime[index];


            //if(coinInfo.coinReward !== LobbyConfig.autoTestLastCollectInfo.nextCoinGift.coinReward){
            //    console.error("Manual collect wrong. Next coin reward is" + LobbyConfig.autoTestLastCollectInfo.nextCoinGift.coinReward);
            //    return;
            //}
        }

        var previousTime = currentTimeInGameClock.getTimeInMs();
        //LobbyConfig.autoTestLastCollectInfo.collectTimeInMs = LobbyC.MainMenu.currentTimeInGameClock.startTimeMs;
        var nextCollectTime =  LobbyConfig.autoTestLastCollectInfo.collectTimeInMs + LobbyConfig.autoTestLastCollectInfo.nextWatingTime;
        /**
         * Thu reset neu thoi gian collect tiep theo nam o sat ngay hom sau thi reset thoi gian ve 0h 0p roi bat dau collect bonus 1
         */
        currentTimeInGameClock.setTimeInMs(nextCollectTime);
        var callback = function(isSuccess){
            if(isSuccess){

                //if(clock.getTimeInMs()){
                //    clock.setTimeInMs(nextCollectTime)
                //}
                if(Lobby.Utils.objectNotNull(fcallback)){
                    fcallback();
                }
            }else{
            }
        };
        if(LobbyConfig.autoTestLastCollectInfo==null){
            console.log("LobbyConfig.autoTestLastCollectInfo has been reset, re-init now!!!");
            LobbyConfig.autoTestLastCollectInfo = initLastCollectInfo(clock.getTimeInMs(),null);
        }
        collectFreeCoinGift(nextCollectTime,LobbyConfig.autoTestLastCollectInfo.nextCoinGift,callback);

    };
    /**
     * #Thanh
     * Clear all hook and interval
     */
    var onParentGroupDestroy = function(){
        if(that.autoPlayVideoInterval != null) window.clearInterval(that.autoPlayVideoInterval);
        currentTimeInGameClock.updateFunction = Lobby.Utils.nullFunction;
    };
    /**
     * #DAT
     * Auto collect lucky spin
     */
    this.manualCollectLuckySpinDaily = function(){
        Manager4DebugTestAlgorithm.callAPILuckySpinDaily(LobbyC.MainMenu.referenceKey,
            function(isSuccess, data, response){
                if(isSuccess) {
                    LobbyC.MainMenu.createCoinAnimation(null, null, null, null, function () {
                    }, null);
                }
            });
    };
    /**
     * #DAT
     * Auto collect daily bonus streak
     */
    this.manualCollectDailyBonusStreak = function(callback){

        if(Lobby.Utils.objectIsNull(LobbyConfig.SPIN_BY_TESTER_NumOfDayDailyBS)){
            LobbyConfig.SPIN_BY_TESTER_NumOfDayDailyBS = 1;
        }
        Manager4DebugTestAlgorithm.callAPIDailyBonusStreak(
            LobbyConfig.SPIN_BY_TESTER_NumOfDayDailyBS,
            LobbyC.MainMenu.referenceKey,
            function(isSuccess, data, response){
                if(isSuccess) {
                    LobbyConfig.SPIN_BY_TESTER_NumOfDayDailyBS++;
                    if(LobbyConfig.SPIN_BY_TESTER_NumOfDayDailyBS > 7){
                        LobbyConfig.SPIN_BY_TESTER_NumOfDayDailyBS = 1;
                    }
                    if(Lobby.Utils.objectNotNull(callback)){
                        callback();
                    }
                    LobbyC.MainMenu.createCoinAnimation(null, null, null, null, function () {
                    }, null);
                }
            }
        );
    };

    this.autoClosePopupWhenLevelUp = function(closeFunction){
        if(!that.isAutoClosingPopupWhenLevelUp) return;
        window.setTimeout(closeFunction,timeOutToClosePopupWhenLevelUp);
    };


    /**
     * #Thanh
     * Init all button of auto game slot here
     */
    this.init = function(parentGroup){
        if(!LobbyConfig.isTestStrategy) return;
        arrayFreeCoinGift = initFreeCoinGift();
        currentTimeInGameClock = LobbyC.MainMenu.currentTimeInGameClock;
        that.autoChangeBetInfo = {
            isActive: false,
            type: "",
            bet: 0,
            currentBetIndex: 0
        };

        var reloadTextButton = function(){
            if(!that.autoChangeBetInfo.isActive){
                for(var i = 0; i < buttonAuto.length; ++i){
                    buttonAuto[i].deactive();
                }
                return;
            }
            for(var i = 0; i < buttonAuto.length; ++i){
                if(buttonAuto[i].type == that.autoChangeBetInfo.type) {
                    buttonAuto[i].active();
                }else{
                    buttonAuto[i].deactive();
                }
            }
        };

        var createButton = function(x, y, type, name){
            var autoChangeBet = LobbyC.MainMenu.createTestButton(x,y,name + " - Off",parentGroup,function(){
                if(type == "expected"){
                    that.autoChangeBetInfo.currentBetIndex++;
                    if(that.autoChangeBetInfo.currentBetIndex == my.arrayBet.length){
                        that.autoChangeBetInfo.currentBetIndex = 0;
                        that.autoChangeBetInfo.bet = 0;
                        autoChangeBet.isActive = false;
                    }else {
                        that.autoChangeBetInfo.bet = my.arrayBet[that.autoChangeBetInfo.currentBetIndex];
                        autoChangeBet.isActive = true;
                    }
                }else {
                    autoChangeBet.isActive = !autoChangeBet.isActive;
                }
                that.autoChangeBetInfo.isActive = autoChangeBet.isActive;
                that.autoChangeBetInfo.type = type;
                reloadTextButton();
            },LobbyConfig.isTestStrategy);
            autoChangeBet.type = type;
            autoChangeBet.isActive = false;

            autoChangeBet.active = function(){
                if(type == "expected") {
                    autoChangeBet.textBtn.text = name + " - On" + "\n" + (that.autoChangeBetInfo.bet * my.currentGameSlot.s_iLines);
                    autoChangeBet.isActive = true;
                }else {
                    autoChangeBet.textBtn.text = name + " - On";
                    autoChangeBet.isActive = true;
                }
            };

            autoChangeBet.deactive = function(){
                autoChangeBet.textBtn.text = name + " - Off";
                autoChangeBet.isActive = false;
                if(type == "expected") {
                    that.autoChangeBetInfo.currentBetIndex = 0;
                    that.autoChangeBetInfo.bet = 0;
                }
            };

            return autoChangeBet;
        };

        var createButtonAutoGoToFreeSpin = function(x,y,name,callbackActive, callbackDeactive){
            var autoGoToFreeSpin = LobbyC.MainMenu.createTestButton(x,y,name+" - Off",parentGroup,function(){
                if(autoGoToFreeSpin.isActive){
                    autoGoToFreeSpin.deactive();
                }else{
                    autoGoToFreeSpin.active();
                }
            },LobbyConfig.isTestStrategy);
            autoGoToFreeSpin.name = name;
            autoGoToFreeSpin.isActive = false;

            autoGoToFreeSpin.active = function(){
                if(callbackActive){
                    callbackActive();
                }
                autoGoToFreeSpin.isActive = true;
                autoGoToFreeSpin.textBtn.text = autoGoToFreeSpin.name+" - On";
            };

            autoGoToFreeSpin.deactive = function(){
                if(callbackDeactive){
                    callbackDeactive();
                }
                autoGoToFreeSpin.isActive = false;
                autoGoToFreeSpin.textBtn.text = autoGoToFreeSpin.name+" - Off";
            };

            return autoGoToFreeSpin;
        };

        var buttonAuto = [];

        buttonAuto.push(createButton(100, 350, "med", "Auto Med"));
        buttonAuto.push(createButton(100, 450, "max", "Auto Max"));
        buttonAuto.push(createButton(100, 550, "expected", "Auto Expected"));

        createButtonAutoGoToFreeSpin(100,250,"Auto Decrease Bet",function(){
            that.autoDecreaseBet = true;
        }, function(){
            that.autoDecreaseBet = false;
        });
        createButtonAutoGoToFreeSpin(100,650,"Auto Go Bonus",function(){
            that.autoGoToBonus = true;
        }, function(){
            that.autoGoToBonus = false;
        });
        that.autoGoToBonus = false;
        createButtonAutoGoToFreeSpin(100,750,"Auto Play Bonus",function(){
            that.autoPlayBonus = true;
        }, function(){
            that.autoPlayBonus = false;
        });
        that.autoPlayBonus = false;
        that.autoPlayVideoInterval = null;

        var checkAndViewVideo = function(){
            if (!Lobby.Utils.isWeb()) {
                if (window.adcolony.loadedRewardedVideoAd() == true) {
                    my.showVideoAdcolony();
                }
            }
        };

        var setAutoPlayVideo = function(isEnable){
            if(isEnable){
                that.autoPlayVideoInterval = window.setInterval(function(){
                    checkAndViewVideo();
                },1000*15);
            }else{
                if(that.autoPlayVideoInterval != null) {
                    window.clearInterval(that.autoPlayVideoInterval);
                    that.autoPlayVideoInterval = null;
                }
            }
        };
        createButtonAutoGoToFreeSpin(100,850,"Auto Play Video",function(){
            setAutoPlayVideo(true);
        }, function(){
            setAutoPlayVideo(false);
        });
        LobbyC.MainMenu.createTestButton(400,750,"CollectLuckySpinDaily",parentGroup,function(){
            that.manualCollectLuckySpinDaily();

        },LobbyConfig.isTestStrategy);
        var btnDailyBonusStreak =
            LobbyC.MainMenu.createTestButton(700,750,"CDailyBonusStreak\n1",parentGroup,function(){
                that.manualCollectDailyBonusStreak(function(){
                    btnDailyBonusStreak.textBtn.text = "CDailyBonusStreak\n"+LobbyConfig.SPIN_BY_TESTER_NumOfDayDailyBS;
                });

        },LobbyConfig.isTestStrategy);

        LobbyC.MainMenu.createTestButton(1000,750,"ResetDailyStreak",parentGroup,function(){
            LobbyC.MainMenu.popupHtml.showSumbitTestNumberDailyBonusStreak(function(numberOfDay){
                LobbyConfig.SPIN_BY_TESTER_NumOfDayDailyBS = numberOfDay;
                btnDailyBonusStreak.textBtn.text = "CDailyBonusStreak\n"+LobbyConfig.SPIN_BY_TESTER_NumOfDayDailyBS;

            });
        },LobbyConfig.isTestStrategy);
        createButtonAutoGoToFreeSpin(1300,750,"Auto Close PopUp",function(){
            that.isAutoClosingPopupWhenLevelUp = true;
        }, function(){
            that.isAutoClosingPopupWhenLevelUp = false;
        });



        buttonCoinGift.push(LobbyC.MainMenu.createTestButton(400,850,"Free coin gift 1",parentGroup,function(){
            that.manualCollectFreeCoinGift(currentTimeInGameClock,0,null);
        },LobbyConfig.isTestStrategy).worldPosition);
        buttonCoinGift.push(LobbyC.MainMenu.createTestButton(700,850,"Free coin gift 2",parentGroup,function(){
            that.manualCollectFreeCoinGift(currentTimeInGameClock,1,null);
        },LobbyConfig.isTestStrategy).worldPosition);

        buttonCoinGift.push(LobbyC.MainMenu.createTestButton(1000,850,"Free coin gift 3",parentGroup,function(){
            that.manualCollectFreeCoinGift(currentTimeInGameClock,2,null);
            //Manager4DebugTestAlgorithm.callAPIFreeCoinGift(2,
            //    LobbyC.MainMenu.referenceKey,
            //    resultFunc);
        },LobbyConfig.isTestStrategy).worldPosition);


        var resultFunc = function(numberOfGift){
            if(numberOfGift>0){
                numberOfGift--;
                that.manualCollectFreeCoinGift(currentTimeInGameClock,2,function(){
                    resultFunc(numberOfGift);
                });
            }
        };
        LobbyC.MainMenu.createTestButton(1300,850,"Free coin gift 3",parentGroup,function(){
            LobbyC.MainMenu.popupHtml.showSumbitTestFreeCoinGift(resultFunc);
        },LobbyConfig.isTestStrategy);


        LobbyC.MainMenu.createTestButton(1600,850,"Collect FCG",parentGroup,function(){
            that.manualCollectFreeCoinGift(currentTimeInGameClock,-1,null);
        },LobbyConfig.isTestStrategy);

        var buttonAutoFCG = createButtonAutoGoToFreeSpin(1600,750,"Auto Collect FCG",function(){
            that.autoCollectFCG = true;
        }, function(){
            that.autoCollectFCG = false;
        });
        buttonAutoFCGPosition = {
            x:buttonAutoFCG.x,
            y:buttonAutoFCG.y
        };
        /**
         * Modify the update function of game time clock
         */
        currentTimeInGameClock.updateFunction = function(currentTimeInMs){
            checkAndCollectFreeCoinGift(currentTimeInMs);
        };

        nextCollectTimeText = initNextCollectTimeText(parentGroup);
        if(LobbyConfig.autoTestLastCollectInfo != null){
            setNextCollectTimeText(LobbyConfig.autoTestLastCollectInfo.collectTimeInMs + LobbyConfig.autoTestLastCollectInfo.nextWatingTime);
        } else{
            setNextCollectTimeText(0);
        }

        parentGroup.onDestroy.add(onParentGroupDestroy);

    }
}