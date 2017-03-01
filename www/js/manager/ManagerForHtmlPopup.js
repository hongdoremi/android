/**
 * Created by Phan on 8/27/2016.
 */
function ManagerForHtmlPopup(context){
    var popupChangeName;
    var popupSetting;
    var fadeOutDuration = 300;
    var zIndex = 1005;
    var isClosingPopup = false;
    //var timestampClickClosePopup = 0;
    var numberClickClosePopupFail = 0;
    /**
     * Move out for quick reference
     * @param newName
     */
    var handleName = function (newName) {
        if (newName === "" || newName === "..." || newName.replace(/ /g, '') === "") {
            context.showNotificationPopup(context.selectlanguage.popup_edit_name.title, context.selectlanguage.popup_edit_name.fail);
            return;
        }
        LobbyRequest.User.updateUserName(context, newName, function(isSuccess, data){
            if (isSuccess) {
                context.showNotificationPopup(context.selectlanguage.popup_edit_name.title, context.selectlanguage.popup_edit_name.success);
                context.changeName(newName);
            } else {
                //switch (data) {
                //    case LobbyConstant.ERROR_MESSAGE_REACH_LIMITE_CHANGE_NAME:
                        context.showNotificationPopup(context.selectlanguage.popup_edit_name.title, context.selectlanguage.popup_edit_name.reachLimit);
                //        break;
                //    default:
                //        //alert("Error occured!");
                //        break;
                //}
            }
        });
    };
    var handleReferenceInput = function (referenceCode) {
        showLoadingAnimation();
        LobbyRequest.User.submitReferenceCode(referenceCode,
            function (isSuccess,data, response) {
                hideLoadingAnimation();
                if (isSuccess) {
                    context.showNotificationPopup("Reference code","Reference code updated");
                } else {
                    context.handleFailResultNewStrategy(response,null,true,false);
                }
            });

    };
    var handleTestFreeCoinGiftInput = function(numberOfGift,resultFunc){
        //showLoadingAnimation();
        resultFunc(numberOfGift);
        //while(numberOfGift>0){
        //    context.managerForAutoGameSlot.manualCollectFreeCoinGift(null,2);
        //    //Manager4DebugTestAlgorithm.callAPIFreeCoinGift(numberOfUsedSend,
        //    //    context.referenceKey,
        //    //    function (isSuccess,data, response) {
        //    //        if(!isSuccess){
        //    //            numberOfGift = 0;
        //    //        }
        //    //        hideLoadingAnimation();
        //    //        //if (isSuccess) {
        //    //        //} else {
        //    //        //    context.handleFailResultNewStrategy(response,null,true,false);
        //    //        //}
        //    //
        //    //        resultFunc(isSuccess,data,response);
        //    //    });
        //    //numberOfGift--;
        //}
    };
    /**
     * Close a popup with specific name
     * @param popupName name of popup to close, id
     * @param callback callback when close animation completed
     * @param pointerEvent pointer event
     */
    var closePopup = function(popupName, callback, pointerEvent){
        if(isClosingPopup)
        {
            numberClickClosePopupFail ++;
            if(numberClickClosePopupFail < 8)
                return;
            //var now = Date.now();
            //var elapsed = now - timestampClickClosePopup;
            //timestampClickClosePopup = now;
            //console.log("elapsed " + elapsed);
            //if(elapsed < fadeOutDuration * 2)
            //    return;
        }
        //console.log('vo ne');
        isClosingPopup = true;
        var popup = $("#"+popupName);
        popup.addClass('fade-out');
        popup.one('animationend',function(){
            popup.css("display","none");
            if(callback) callback(pointerEvent);
            isClosingPopup = false;
            numberClickClosePopupFail = 0;
        });
        destroyDarkLayer(popupName);
        //setTimeout(function(){
        //    popup.css("display","none");
        //    if(callback) callback(pointerEvent);
        //    isClosingPopup = false;
        //},fadeOutDuration);


        //var popup = $("#"+popupName);
        //popup.removeClass('fade-out');
        //popup.removeClass('fade-in');
        //popup.velocity({
        //    opacity: 0
        //}, {
        //    duration: fadeOutDuration,
        //    complete: function()
        //    {
        //        popup.css("display","none");
        //        if(callback) callback(pointerEvent);
        //        isClosingPopup = false;
        //    }
        //});
        ////popup.transition({ opacity: 0,duration: fadeOutDuration }, function(){
        ////    //$("#pop_notification").css({'top': -LobbyConfig.height + 'px'});
        ////    popup.css("display","none");
        ////    if(callback) callback(pointerEvent);
        ////    isClosingPopup = false;
        ////});
        //destroyDarkLayer(popupName);
        LobbyC.MainMenu.playPopUpSound();
    };
    /**
     * Open popup with fade in animation
     * @param popupName id of popup
     */
    var openPopup = function(popupName){
        var popup = $("#"+popupName);
        popup.removeClass('fade-out');
        //popup.css("z-index",zIndex);
        //zIndex+=1;
        popup.addClass('fade-in');
        popup.css("display","block");
        createDarkLayer(popupName);

        //var popup = $("#"+popupName);
        //popup.removeClass('fade-out');
        //popup.removeClass('fade-in');
        //popup.css("display","block");
        //popup.css({'opacity': 0});
        //popup.velocity({
        //    opacity: 1
        //}, {
        //    duration: fadeOutDuration
        //});
        ////popup.transition({ opacity: 1,duration: fadeOutDuration });
        //createDarkLayer(popupName);

        LobbyC.MainMenu.playPopUpSound();
    };
    /**
     * Show LobbyC.MainMenu.showLoadingAnimation
     */
    var showLoadingAnimation = function(){
        context.showLoadingAnimation();
    };
    /**
     * Show LobbyC.MainMenu.hideLoadingAnimation
     */
    var hideLoadingAnimation = function(){
        context.hideLoadingAnimation();
    };
    /**
     * Create dark layer
     * @param popupName id of popup
     */
    var createDarkLayer = function(popupName){
        var dk;
        if(popupName == "popup-notification-container-css"){
            return;
            dk = $("#darkLayerNoti");
        }else{
            dk = $("#darkLayer");
        }
        dk.removeClass('fade-out');
        dk.addClass('fade-in');
        dk.css("display","block");

        //var dk;
        //if(popupName == "popup-notification-css"){
        //    dk = $("#darkLayerNoti");
        //}else{
        //    dk = $("#darkLayer");
        //}
        //dk.removeClass('fade-out');
        //dk.removeClass('fade-in');
        //dk.css("display","block");
        //dk.css({'opacity': 0});
        //dk.velocity({
        //    opacity: 1
        //}, {
        //    duration: fadeOutDuration
        //});
        ////dk.transition({ opacity: 1,duration: fadeOutDuration });

    };
    /**
     * Destroy dark layer
     * @param popupName id of popup
     */
    var destroyDarkLayer = function(popupName){
        var dk;
        if(popupName == "popup-notification-container-css"){
            return;
            dk = $("#darkLayerNoti");
        }else{
            dk = $("#darkLayer");
        }
        dk.addClass('fade-out');
        dk.one('animationend',function(){
            dk.css("display","none");
        });
        //setTimeout(function(){
        //    dk.css("display","none");
        //},fadeOutDuration);


        //var dk;
        //if(popupName == "popup-notification-css"){
        //    dk = $("#darkLayerNoti");
        //}else{
        //    dk = $("#darkLayer");
        //}
        //dk.removeClass('fade-out');
        //dk.removeClass('fade-in');
        //dk.velocity({
        //    opacity: 0
        //}, {
        //    duration: fadeOutDuration,
        //    complete: function()
        //    {
        //        dk.css("display","none");
        //    }
        //});
        ////dk.transition({ opacity: 0,duration: fadeOutDuration }, function(){
        ////    dk.css("display","none");
        ////});

    };
    /**
     * Init popup edit name
     */
    var initPopupEditName = function(){
        popupChangeName = document.getElementById("popup-change-name");
        var closePopupBtn = document.getElementById("close-popup-change-name");
        var okBtn = document.getElementById("popup-change-name-ok-btn");
        var cancelBtn = document.getElementById("popup-change-name-cancel-btn");
        var newNameInput = document.getElementById("popup-change-name-new-name");



        closePopupBtn.onclick = function(){
            closePopup("popup-change-name");
        };
        cancelBtn.onclick = function(){
            closePopup("popup-change-name");
        };
        okBtn.onclick = function(){
            closePopup("popup-change-name",function(){
                handleName(newNameInput.value);
            });

        };
        newNameInput.onclick = function(){
            if(newNameInput.value === "...")
                newNameInput.value = "";
            newNameInput.focus();
        }
    };
    /**
     * Show popup notification html
     * @param title string
     * @param body string
     * @param funcCallback function
     * @param funcCallClose function
     * @param infoText string
     * @param buttonText string
     * @param forceToCloseLastNotiPopup boolean
     * @param textCancel string
     * @param isPopupV2 boolean, check if show popup v2, popup with 2 button
     */
    this.showPopupNotificationHTML = function(title, body, funcCallback, funcCallClose, infoText, buttonText, forceToCloseLastNotiPopup, textCancel, isPopupV2, fontSizeButtonText, isPopupV3)
    {
        if(Lobby.Utils.objectIsNull(title))title = "Error";
        if(Lobby.Utils.objectIsNull(body))body = "Something went wrong. Please try again later";
        if(Lobby.Utils.objectIsNull(buttonText))buttonText = context.selectlanguage.ok.text;
        if(Lobby.Utils.objectIsNull(fontSizeButtonText))fontSizeButtonText = 36;
        if(Lobby.Utils.objectIsNull(isPopupV3)) isPopupV3 = false;
        //buttonText = 'cccccccccccccc';
        if(buttonText.length > 13){
            fontSizeButtonText = 27;
        }
        if (Lobby.Utils.objectIsNull(textCancel)) {
            textCancel = context.selectlanguage.cancel.text;
        }
        if(Lobby.Utils.objectIsNull(isPopupV2))isPopupV2 = false;

        if (Lobby.Utils.stringContainString(body,LobbyLanguageConstant.CANNOT_CONNECT_TO_SERVER)) {
            if(LobbyConfig.isTestAlgorithmMode){
                if (funcCallback) {
                    funcCallback();
                    return;
                }
            }
            if (context.isShowingConnectionLost) {
                if(forceToCloseLastNotiPopup){
                    context.popupManager.removeAll();
                }else {
                    return;
                }
            }
            context.isShowingConnectionLost = true;
        }
        //if (Lobby.Utils.objectNotNull(context.game.kineticScrolling)) {
        //    context.game.kineticScrolling.isDisable = true;
        //}
        var infoTextHTML = $("#popup-notification-info-text");
        var infoIconHTML = $("#popup-notification-info-icon");
        var cancelBtn = document.getElementById('popup-notification-cancel-btn');
        var closePopupBtn = document.getElementById("close-popup-notification");
        var okBtn = document.getElementById("popup-notification-ok-btn");
        //SETUP IF IS POPUP V 2
        if(isPopupV2 == true){
            cancelBtn.style.display= 'inline';
        }else{
            cancelBtn.style.display= 'none';
        }

        //SET UP FUNC
        closePopupBtn.onclick = function(){
            if(isPopupV3) closePopup("popup-notification-container-css", null);
            var isXButton = true;
            closePopup("popup-notification-container-css", funcCallClose,isXButton);
            if (Lobby.Utils.stringContainString(body,LobbyLanguageConstant.CANNOT_CONNECT_TO_SERVER)) {
                context.isShowingConnectionLost = false;
            }
            //if(Lobby.Utils.objectNotNull(funcCallClose))
            //    funcCallClose();
        };

        okBtn.onclick = function(event){
            closePopup("popup-notification-container-css", funcCallback, event);
            if (Lobby.Utils.stringContainString(body,LobbyLanguageConstant.CANNOT_CONNECT_TO_SERVER)) {
                context.isShowingConnectionLost = false;
            }
            //if(Lobby.Utils.objectNotNull(funcCallback))
            //    funcCallback();
        };
        cancelBtn.onclick = function(){
            closePopup("popup-notification-container-css", funcCallClose);
            if (Lobby.Utils.stringContainString(body,LobbyLanguageConstant.CANNOT_CONNECT_TO_SERVER)) {
                context.isShowingConnectionLost = false;
            }
            //if(Lobby.Utils.objectNotNull(funcCallClose))
            //    funcCallClose();
        };


        //SET TEXT
        var textOk = $("#text-ok-popup-notification");
        textOk.text(buttonText);
        textOk.css('font-size', fontSizeButtonText + 'px');
        $("#text-cancel-popup-notification").text(textCancel);
        $("#popup-notification-title").text(title);
        $("#popup-notification-body-span").text(body);

        if(Lobby.Utils.objectNotNull(infoText)
            && infoText != ""){
            infoTextHTML.text(infoText);
            infoIconHTML.css('display', 'block');
            infoTextHTML.css('display', 'block');
        }else{
            infoIconHTML.css('display', 'none');
            infoTextHTML.css('display', 'none');
        }
        openPopup("popup-notification-container-css");
    };
    /**
     * Init popup settings
     */
    var initPopupSettings = function(){
        popupSetting = {};
        var closePopupBtn = document.getElementById("close-popup-setting");

        closePopupBtn.onclick = function(){
            closePopup("popup-setting-css");
        };

        var termBtn = document.getElementById("popup-setting-term-btn");
        termBtn.onclick = function(){
            try {
                Lobby.Utils.openURLInBrowser(LobbyConfig.PageTerm, '_system');
            } catch (exception) {
                Lobby.Utils.printConsoleLog(exception);
            }
        };

        var privacyBtn = document.getElementById("popup-setting-privacy-btn");
        privacyBtn.onclick = function(){
            try {
                Lobby.Utils.openURLInBrowser(LobbyConfig.PagePrivacy, '_system');
            } catch (exception) {
                Lobby.Utils.printConsoleLog(exception);
            }
        };

        var btnLanguage = document.getElementById("btn-language");
        popupSetting.isShowLanguage = false;
        btnLanguage.onclick = function(){
            popupSetting.isShowLanguage = !popupSetting.isShowLanguage;
            if(popupSetting.isShowLanguage){
                $("#groupLanguge").css("display", "block");
            }else{
                $("#groupLanguge").css("display", "none");
            }
        };


        var groupLanguage = document.getElementById("groupLanguge");
        var language = {};
        language.btnEnglish = document.getElementById("english-btn");
        language.btnEnglish.index = 0;
        language.btnVietnamese = document.getElementById("vietnamese-btn");
        language.btnVietnamese.index = 1;
        language.btnChinese = document.getElementById("chinese-btn");
        language.btnChinese.index = 2;
        language.btnTaiwan = document.getElementById("taiwan-btn");
        language.btnTaiwan.index = 3;
        language.btnMalay = document.getElementById("malay-btn");
        language.btnMalay.index = 4;
        language.btnIndo = document.getElementById("indo-btn");
        language.btnIndo.index = 5;
        var createBtnClickEvent = function(btn){
            btn.onclick = function(){
                popupSetting.changeLanguage(btn.index);
                popupSetting.isShowLanguage = false;
                $("#groupLanguge").css("display", "none");
            };
        };
        for(var btn in language){
            createBtnClickEvent(language[btn]);
        }
    };
    /**
     * Init popup edit name
     */
    var initPopupBuySpins = function(){
        var closePopupBtn = document.getElementById("close-popup-buyspins");
        var btn10 = document.getElementById("popup-buyspins-10-btn");
        var btn20 = document.getElementById("popup-buyspins-20-btn");
        var btn30 = document.getElementById("popup-buyspins-30-btn");

        var onBuySpins = function(index){
            if(context._userData.profile.crown < LobbyConfig.LuckyWheelItemsInfo[index].crownRequired){
                context.showPopupShop(true);
            }else{
                var callback =  function(isSuccess,data, response){
                    if(!isSuccess){
                        LobbyC.MainMenu.handleFailResultNewStrategy(response,null,true,false);
                        return;
                    }
                    LobbyConfig.additionalInfo.luckyWheel.coinReward = data.coin_reward;
                    LobbyConfig.additionalInfo.luckyWheel.crownReward = data.crown_reward;
                    LobbyConfig.additionalInfo.luckyWheel.remainingSpin = data.remaining_spin;

                    LobbyC.MainMenu.updateUserInfoFromSV();

                    LobbyC.LuckyWheel.reloadLuckyWheelSpins(LobbyConfig.additionalInfo.luckyWheel.remainingSpin);
                };
                switch (index){
                    case 0:
                        LobbyRequest.User.buyLuckyWheelUsingCrow(LobbyConstant.APPLE_PACKAGE_TYPE_LUCKY_WHEEL_1, callback);
                        break;
                    case 1:
                        LobbyRequest.User.buyLuckyWheelUsingCrow(LobbyConstant.APPLE_PACKAGE_TYPE_LUCKY_WHEEL_2, callback);
                        break;
                    case 2:
                        LobbyRequest.User.buyLuckyWheelUsingCrow(LobbyConstant.APPLE_PACKAGE_TYPE_LUCKY_WHEEL_3, callback);
                        break;
                }
            }
        };

        closePopupBtn.onclick = function(){
            closePopup("popup-buyspins-css");
        };
        btn10.onclick = function(){
            closePopup("popup-buyspins-css",function(){
                onBuySpins(0);
            });
        };
        btn20.onclick = function(){
            closePopup("popup-buyspins-css",function(){
                onBuySpins(1);

            });
        };
        btn30.onclick = function(){
            closePopup("popup-buyspins-css",function(){
                onBuySpins(2);
            });
        }
    };
    /**
     * Show popup setting
     * @param my
     */
    this.showPopupSettingHTML = function(my){
        var reloadText = function() {
            $("#popup-setting-log-text").text(my.selectlanguage.setting_logged_with_lable.text + loggedWith);
            $("#popup-setting-option-text").text(my.selectlanguage.setting_game_option_lable.text);
            $("#popup-setting-music-text").text(my.selectlanguage.setting_back_ground_music_lable.text);
            $("#popup-setting-sound-text").text(my.selectlanguage.setting_back_sound_effect_lable.text);
            $("#popup-setting-friend-text").text(my.selectlanguage.setting_friend_request_lable.text);
            $("#popup-setting-push-text").text(my.selectlanguage.setting_push_notifi_lable.text);
            $("#text-btn-language").text(my.selectlanguage.setting_language_lable.text);
            $("#text-loggout").text(my.selectlanguage.setting_logout_lable.text);
            $("#text-term").text(my.selectlanguage.setting_btn_tearm_lable.text);
            $("#text-privacy").text(my.selectlanguage.setting_btn_privacy_lable.text);
            $("#text-version-test").text(my.selectlanguage.setting_version_lable.text + " " + LobbyConfig.versionDisplay);
            $("#popup-setting-language-text").text(my.selectlanguage.setting_language.text);

            my.gifts.text = my.selectlanguage.footer_gift_lable.text;
            my.achievement.text = my.selectlanguage.footer_achievement_lable.text;
            if(my.clock.cancollect === true) my.clock.text = my.selectlanguage.footer_collect_lable.text;
        };

        var loggedWith = "Facebook";
        var accountUID = my._userData.profile.facebookUID;
        var usr_name = my._userData.profile.name;
        if (usr_name.length > 15) {
            usr_name = usr_name.substring(0, 13) + "...";
        }
        //console.log(my._userData.profile);
        if (my._userData.profile.facebookUID == null) {
            accountUID = my._userData.profile.name;
            if (accountUID.length > 15) {
                accountUID = accountUID.substring(0, 13) + "...";
            }
            loggedWith = "PlayPalace";
        }

        var logoutBtn = document.getElementById("popup-setting-logout-btn");
        logoutBtn.onclick = function(){
            my.showLoadingAnimation();
            var functionCB = function(){
                LobbyRequest.User.logout(function (isSuccess, data) {
                    if (!isSuccess) {
                        Lobby.Utils.printConsoleLog("Logout fail: ", data);
                    }
                    if (my._userData.profile.facebookUID != null) {
                        FacebookController.getLoginStatus(function (isSuccess, response) {
                            if (response && response.status === 'connected') {
                                FacebookController.logout(function (response) {
                                    my.clearDataAndLogOut();
                                });
                            } else {
                                my.clearDataAndLogOut();
                            }
                        });
                    } else {
                        my.clearDataAndLogOut();
                    }
                }, my);
            };
            closePopup("popup-setting-css", functionCB);
        };
        var btnOnOffMusic = document.getElementById("popup-setting-music-switch");
        btnOnOffMusic.checked = (my._userSetting.backgroundMusic == "1");
        btnOnOffMusic.onclick = function(){
            //btnOnOffMusic.checked = !btnOnOffMusic.checked;
            if(btnOnOffMusic.checked) {
                if (my.playingGame === LobbyConstant.isNotInGame) {
                    my.resumeBackGroundMusic();
                }
                my._userSetting.backgroundMusic = "1";
                Lobby.Utils.setToLocalStorage("backgroundMusic", "1");
                if (my.playingGame === LobbyConstant.isInGame) {
                    LobbyC.GameSlot.turnOnMusic();
                }
            }else{
                my.pauseBackgroundMusic();
                my._userSetting.backgroundMusic = "0";
                Lobby.Utils.setToLocalStorage("backgroundMusic", "0");
                if (my.playingGame === LobbyConstant.isInGame) {
                    LobbyC.GameSlot.turnOffMusic();
                }
            }
        };
        var btnOnOffSound = document.getElementById("popup-setting-sound-switch");
        btnOnOffSound.checked = (my._userSetting.soundEffect == "1");
        btnOnOffSound.onclick = function(){
            //btnOnOffSound.checked = !btnOnOffSound.checked;
            if(btnOnOffSound.checked) {
                my._userSetting.soundEffect = "1";
                Lobby.Utils.setToLocalStorage("soundEffect", "1");
            }else{
                my._userSetting.soundEffect = "0";
                Lobby.Utils.setToLocalStorage("soundEffect", "0");
            }
        };
        var btnOnOffFriend = document.getElementById("popup-setting-friend-switch");
        btnOnOffFriend.checked = (my._userSetting.friendRequest == "1");
        btnOnOffFriend.onclick = function(){
            if(btnOnOffFriend.checked) {
                my._userSetting.friendRequest = "1";
                Lobby.Utils.setToLocalStorage("friendRequest", "1");
            }else{
                my._userSetting.friendRequest = "0";
                Lobby.Utils.setToLocalStorage("friendRequest", "0");
            }
        };

        popupSetting.changeLanguage = function(index){
            switch (index){
                case 0:
                    my.selectlanguage = my.arrayLanguage.en;
                    break;
                case 1:
                    my.selectlanguage = my.arrayLanguage.vn;
                    break;
                case 2:
                    my.selectlanguage = my.arrayLanguage.cn;
                    break;
                case 3:
                    my.selectlanguage = my.arrayLanguage.trad_cn;
                    break;
                case 4:
                    my.selectlanguage = my.arrayLanguage.my;
                    break;
                case 5:
                    my.selectlanguage = my.arrayLanguage.indo;
                    break;
            }
            //my.currentFlagText.text = my.arrayLanguageLabel[index];
            my.currentlanguageCode = index;
            reloadText();
            LobbyRequest.User.setPreferLanguage(my.currentlanguageCode, function (isSuccess, data) {
                Lobby.Utils.printConsoleLog("Set prefer language", isSuccess, data);
            });
            my.showNotificationPopup("", my.selectlanguage.popup_change_language.success);
            my.reloadUIGameSlot();
        };

        var numberOfClick = 0;
        var btnLanguage = document.getElementById("btn-test");
        btnLanguage.onclick = function(){
            numberOfClick++;
            if (numberOfClick == 5) {
                if (LobbyConfig.useManagerForPopUp) {
                    ManagerForPopUp.forceClosePopUp(my, group);
                } else {
                    closePopup("popup-setting-css");
                }
                my.showPopupTest();
            }
        };
        popupSetting.isShowLanguage = false;
        $("#groupLanguge").css("display", "none");

        reloadText();
        $("#popup-setting-username-text").text(usr_name);
        $("#popup-setting-uid-text").text(accountUID);
        openPopup("popup-setting-css");
    };
    /**
     * Set up input key code
     */
    var handleInputKeyCode = function()
    {
        var divElement = $('.popup-text');
        divElement.unbind("keyup");
        divElement.unbind("keydown");
        divElement.keyup(function (e) {
            var divElementValue = divElement.val();
            switch (e.which) {
                case 13:
                    divElement.blur();
                    var current = $("#"+e.currentTarget.id);
                    var next = current.nextAll('input').first();
                    if(next.length>0){
                        next.focus();
                    }else{
                        next = current.nextAll("button").last();
                        if(next.length>0) next.click();
                    }
                    return;
                case 27:
                    break; // Esc: clear entry
                case 37:
                    //divElement.val(divElementValue.substring(0, divElementValue.length - 1));
                    break; // cursor left
                default:
                    break;
            }
        });
        //divElement = $('#popup-change-name-new-name');
        //divElement.unbind("keyup");
        //divElement.unbind("keydown");
        //divElement.keyup(function (e) {
        //    switch (e.which) {
        //        case 13:
        //            divElement.blur();
        //            return;
        //        case 27:
        //            break; // Esc: clear entry
        //        case 37:
        //            //divElement.val(divElementValue.substring(0, divElementValue.length - 1));
        //            break; // cursor left
        //        default:
        //            break;
        //    }
        //});

    };
    /**
     * Init popup event and data
     */
    var init = function(){
        initPopupEditName();
        initPopupSettings();
        initPopupBuySpins();
        handleInputKeyCode();
    };
    /**
     * Show popup edit name
     * @param oldName string
     */
    this.showEditNamePopupHtml = function(my, oldName){
        var name = document.getElementById("popup-change-name-user-name");
        var newNameInput = document.getElementById("popup-change-name-new-name");

        $("#popup-change-name-title").text(my.selectlanguage.popup_edit_name.title);
        $("#popup-change-name-cancel-btn-text").text(my.selectlanguage.cancel.text);
        $("#popup-change-name-ok-btn-text").text(my.selectlanguage.send.text);


        name.style.display = "block";
        var nameText = (oldName.length > 20? Lobby.Utils.trimText(oldName,17):oldName);

        name.innerHTML = nameText;
        if(newNameInput.value!= "...") newNameInput.value = "";
        var okBtn = document.getElementById("popup-change-name-ok-btn");
        okBtn.onclick = function(){
            closePopup("popup-change-name",function(){
                handleName(newNameInput.value);
            });

        };
        openPopup("popup-change-name");
    };
    /**
     * Show popup edit name
     * @param oldName string
     */
    this.showBuySpinsPopupHtml = function(){
        //$("#popup-buyspins-title").text(my.selectlanguage.popup_edit_name.title);
        //$("#text-10-popup-buyspins").text(my.selectlanguage.cancel.text);
        //$("#text-20-popup-buyspins").text(my.selectlanguage.cancel.text);
        //$("#text-30-popup-buyspins").text(my.selectlanguage.cancel.text);
        //$("#popup-buyspins-text-info").text(my.selectlanguage.send.text);

        openPopup("popup-buyspins-css");
    };
    /**
     * Show popup sumbit reference code
     * @param oldName string
     */
    this.showSumbitReferenceCodePopupHtml = function(){
        this.showInputTextHTMLPopup(
            LobbyConfig.additionalInfo.referenceCode.code +"\nNumber of used "+LobbyConfig.additionalInfo.referenceCode.numberOfUsed,
            "Reference code",
            "",
            function(input){
                handleReferenceInput(input);
            }
        );
    };
    /**
     * Show popup sumbit free coin gift for testing
     * @param resultFunc function
     */
    this.showSumbitTestFreeCoinGift = function(resultFunc){
        this.showInputTextHTMLPopup(
            "Reward " + 8000,
            "Enter Number Of Gift",
            1,
            function(input){
                handleTestFreeCoinGiftInput( parseInt(input),resultFunc);
            }
        );
    };
    /**
     * Show popup sumbit free coin gift for testing
     * @param resultFunc function
     */
    this.showSumbitTestNumberDailyBonusStreak = function(resultFunc){
        this.showInputTextHTMLPopup(
            "Daily Bonus Streak",
            "Enter Number Of Day Login",
            1,
            function(input){
                handleTestFreeCoinGiftInput( parseInt(input),resultFunc);
            }
        );
    };
    /**
     * By Dat
     * Show popup sumbit free coin gift for testing
     * @param resultFunc function
     */
    this.showInputTextHTMLPopup = function(
        user_name,
        title,
        defaultValue,
        resultFunc){


        if(Lobby.Utils.objectIsNull(user_name)){
            user_name = "";
        }
        if(Lobby.Utils.objectIsNull(title)){
            title = "";
        }
        if(Lobby.Utils.objectIsNull(defaultValue)){
            defaultValue = "";
        }

        $("#popup-change-name-user-name").text(user_name);
        $("#popup-change-name-title").text(title);
        $("#popup-change-name-cancel-btn-text").text(context.selectlanguage.cancel.text);
        $("#popup-change-name-ok-btn-text").text(context.selectlanguage.send.text);


        var referenceInput = document.getElementById("popup-change-name-new-name");
        if(referenceInput.value!= "...") referenceInput.value = defaultValue;
        var okBtn = document.getElementById("popup-change-name-ok-btn");
        okBtn.onclick = function(){
            closePopup("popup-change-name",function(){
                if(Lobby.Utils.objectNotNull(resultFunc)){
                    resultFunc(referenceInput.value);
                }
            });

        };
        openPopup("popup-change-name");
    };
    var handleSecretKeyInput = function(key){
        context.referenceKey = key;
    };

    /**
     * By Thanh
     */
    this.showSumbitTokenKey = function(){
        this.showInputTextHTMLPopup(
            "Secret key",
            "Secret key",
            LobbyC.MainMenu.referenceKey,
            function(input){
                handleSecretKeyInput(input);
            }
        );
    };
    /**
     * Hide all popup, use when go from lobby to login
     */
    this.hideAllPopupCss = function()
    {
        $("#popup-setting-css").css('display', 'none');
        $("#popup-notification-container-css").css('display', 'none');
        $("#popup-change-name").css('display', 'none');
        //$(".darkLayerNew").css('display', 'none');
    };

    init();
}