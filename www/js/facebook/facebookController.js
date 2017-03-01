"use strict";

function convertJSON(json) {
    return JSON.stringify(json, null, 4);
}

/**
 * GLOBAl VARIABLE
 * FacebookController.currentFriendList
 * FacebookController.currentUserInfo
 * FacebookController.APP_ID
 */
var FacebookController = new function () {

    this.APP_ID = LobbyConfig.facebookAppID;
    this.REDIRECT_URI = LobbyConfig.AppDomain + "/callback-server-for-facebook/fbPopupClose.html";
    var PERMS = [
        //"publish_actions",
        "user_website",
        "user_status",
        "user_about_me",
        "user_friends",
        "public_profile",
        "user_birthday",
        "email"
    ];
    var resultFuncFriend;
    var that = this;
    var allFriendIdsGroup = [];
    var MAX_NUMBER_OF_INVITE_FRIEND = 48;

    this.currentFriendList = [];
    this.currentUserInfo = null;

    /**
     * get image url
     * @param id
     * @param type
     * @returns {string}
     */
    function getImageUrl(id, type) {
        return FacebookURLDefaults.GRAPH_URL +
            "/" +
            id +
            "/picture" +
            (type != null ? '?type=' + type : '');
    }

    // GET NUMBER OF FRIEND
    /**
     * GET NUMBER OF FRIEND
     * @param resultFunc
     */
    this.getNumberOfFriend = function (resultFunc) {

        facebookConnectPlugin.api(
            "/me/friends",
            null,
            function (response) {
                if (typeof response.summary != "undefined" && typeof response.summary.total_count != "undefined") {
                    resultFunc(false, response.summary.total_count);
                } else {
                    resultFunc(false, 0);
                }
            },
            function (error) {
                Lobby.Utils.printConsoleLog('getFriendListFail');
                Lobby.Utils.printConsoleLog("Error: ", convertJSON(error));
                resultFunc(false, 0);
            });

    };

    // GET FRIEND LIST
    /**
     * GET FRIEND LIST
     * @param resultFunc
     * @param accesstoken
     */
    this.getFriendList = function (resultFunc, accesstoken) {

        if (Lobby.Utils.objectNotNull(accesstoken)) {
            accesstoken = "?access_token=" + accesstoken + "&";
        } else {
            accesstoken = "?";
        }


        Lobby.Utils.printConsoleLog("Start get friend list");
        that.currentFriendList = [];
        resultFuncFriend = resultFunc;
        facebookConnectPlugin.api(
            "/me/invitable_friends" + accesstoken + "fields=picture.type(normal).width(100).height(100),name&limit=100",
            null,
            loopForGetAllFriendList,
            function (error) {
                Lobby.Utils.printConsoleLog('getFriendListFail');
                Lobby.Utils.printConsoleLog("Error: ", convertJSON(error));
                resultFunc(false, error);
            });
    };
    var progressWhenStartLoop = 0;

    /**
     * loop for get all friend list
     * @param response
     */
    function loopForGetAllFriendList(response) {
        if (typeof response.paging != "undefined" && typeof response.paging.next != "undefined") {
            if (response != null) {
                if (progressWhenStartLoop <= 90) {
                    progressWhenStartLoop += 10;
                }
                //window.loadingText.setText("Loading friends: " + progressWhenStartLoop + "%");
                window.loadingText.setText("Loading friends");
                window.loadingBarBackgroundDone.width = window.loadingBarBackgroundDone.originalWidth * progressWhenStartLoop / 100;
                //window.loadingBarthumb.x = window.loadingBarBackground.x - 432 / 2 + 426 * progressWhenStartLoop / 100;
                var length = response.data.length;
                for (var index = 0; index < length; ++index) {
                    that.currentFriendList.push(response.data[index]);
                }
            }
            var pagingNext = (response.paging == null ? null : response.paging.next);
            pagingNext = pagingNext.substring(32);
            facebookConnectPlugin.api(
                pagingNext,
                null,
                loopForGetAllFriendList,
                function (error) {
                    Lobby.Utils.printConsoleLog('getFriendListFail');
                    Lobby.Utils.printConsoleLog("Error: ", convertJSON(error));
                    resultFuncFriend(false, error);
                });
        } else {
            var length = response.data.length;
            for (var index = 0; index < length; ++index) {
                that.currentFriendList.push(response.data[index]);
            }
            progressWhenStartLoop = 100;
            //window.loadingText.setText("Loading friends: " + progressWhenStartLoop + "%");
            window.loadingText.setText("Loading friends");
            window.loadingBarBackgroundDone.width = window.loadingBarBackgroundDone.originalWidth * progressWhenStartLoop / 100;
            //window.loadingBarthumb.x = window.loadingBarBackground.x - 432 / 2 + 426 * progressWhenStartLoop / 100;
            resultFuncFriend(true, that.currentFriendList);
        }
    }

    //GET LOGIN STATUS
    /**
     * get login status
     * @param resultFunc
     */
    this.getLoginStatus = function (resultFunc) {
        Lobby.Utils.printConsoleLog('Start getLoginStatus');
        facebookConnectPlugin.getLoginStatus(
            function (response, accessToken) {

                if (response.status === 'connected') {
                    // Logged into your app and Facebook.

                    Lobby.Utils.printConsoleLog('getLoginStatusSuccess');
                    Lobby.Utils.printConsoleLog("LoginStatus: ", convertJSON(response));
                    resultFunc(true, response, accessToken);

                }
                else {
                    Lobby.Utils.printConsoleLog('getLoginStatusFail');
                    Lobby.Utils.printConsoleLog("statusChangeCallback: ", convertJSON(response));
                    resultFunc(false, response, accessToken);
                }
            },
            function (error) {
                Lobby.Utils.printConsoleLog('getLoginStatusFail');
                Lobby.Utils.printConsoleLog("Error login status: ", convertJSON(error));
                resultFunc(false, error);

            }
        );
    };
    /**
     * get permission
     * @param resultFunc
     * @param accesstoken
     */
    this.getPermission = function (resultFunc, accesstoken) {
        if (Lobby.Utils.objectNotNull(accesstoken)) {
            accesstoken = "?access_token=" + accesstoken;
        } else {
            accesstoken = "";
        }

        facebookConnectPlugin.api(
            "/me/permissions" + accesstoken,
            null,
            function (response) {
                resultFunc(true, response);
            },
            function (response) {
                resultFunc(false, response);
            });
    };

    /**
     * get permission static
     * @returns {string[]}
     */
    this.getPremissionStatic = function () {
        return PERMS;
    };

    //LOGIN
    /**
     * login
     * @param resultFunc
     */
    this.login = function (resultFunc) {
        Lobby.Utils.printConsoleLog('Start login facebook with permission:' + PERMS);
        that.getLoginStatus(
            function (isSuccess, userInfo, accessToken) {
                //return;
                if (!isSuccess) {
                    that.forceLogin(resultFunc);
                    return;
                }
                that.getPermission(
                    function (isSuccessPerms, response) {
                        if (!isSuccessPerms) {
                            that.forceLogin(resultFunc);
                            return;
                        }
                        var checkPerms = false;
                        var lengthPerms = response.data.length;
                        for (var i = 0; i < lengthPerms; i++) {
                            if (response.data[i].permission == "email"
                            //&&
                            //response.data[i].status == "granted"
                            ) {
                                checkPerms = true;
                            }
                        }
                        if (checkPerms) {
                            resultFunc(true, userInfo, accessToken);
                        }
                        else {
                            that.forceLogin(resultFunc);
                        }
                    },
                    accessToken
                );
            }
        );
    };

    //this.automateLogin = function (resultFunc) {
    //    Lobby.Utils.printConsoleLog('Start login facebook with permission:' + PERMS);
    //    that.getLoginStatus(
    //        function (isSuccess,
    //                  response) {
    //            if (isSuccess) {
    //                Lobby.Utils.printConsoleLog('LoginSuccess');
    //                resultFunc(true, response);
    //
    //            } else {
    //
    //                Lobby.Utils.printConsoleLog('LoginFail');
    //                resultFunc(false, response);
    //
    //            }
    //
    //        }
    //    );
    //};

    /**
     * force login
     * @param resultFunc
     */
    this.forceLogin = function (resultFunc) {
        //if(LobbyConfig.loginFrom == "fb") {
        //    facebookConnectPlugin.login(
        //        PERMS,
        //        function (userData) {
        //            Lobby.Utils.printConsoleLog('LoginSuccess');
        //            Lobby.Utils.printConsoleLog("UserInfo: ", convertJSON(userData));
        //            resultFunc(true, userData);
        //        },
        //        function (error) {
        //            Lobby.Utils.printConsoleLog('LoginFail');
        //            Lobby.Utils.printConsoleLog("Error login: ", convertJSON(error));
        //            resultFunc(false, error);
        //        }
        //    );
        //}
        //else{
        //    var str = "";
        //    for(var i = 0 ; i< PERMS.length; i++){
        //        if(i == PERMS.length -1){
        //            str+= PERMS[i];
        //        }
        //        else{
        //            str+= (PERMS[i]+',');
        //        }
        //    }
        //
        //    var that = this;
        //    if (that.isInFBCanvas()){
        //        var url = 'https://graph.facebook.com/oauth/authorize?client_id='+that.APP_ID+'&scope='+ str + '&response_type=token' +'&redirect_uri='+window.location.href+"%26login_result=fb";
        //    } else {
        //        var url = 'https://graph.facebook.com/oauth/authorize?client_id=' + that.APP_ID + '&scope=' + str + '&response_type=token' + '&redirect_uri=' + window.location.href + "?login_result=fb";
        //    }
        //    top.location = url;
        //}

        var str = "";
        for (var i = 0; i < PERMS.length; i++) {
            if (i == PERMS.length - 1) {
                str += PERMS[i];
            }
            else {
                str += (PERMS[i] + ',');
            }
        }

        facebookConnectPlugin.login(PERMS, function (userData) {
            resultFunc(true, userData);
            ManagerForOrientation.resetOrientation(true,false,null);
        }, function (error) {
            resultFunc(false, error);
            ManagerForOrientation.resetOrientation(true,false,null);
        });


        //var that = this;
        //if (that.isInFBCanvas()){
        //    var url = 'https://graph.facebook.com/oauth/authorize?client_id='+that.APP_ID+'&scope='+ str + '&response_type=token' +'&redirect_uri='+window.location.href+"%26login_result=fb";
        //} else {
        //    var url = 'https://graph.facebook.com/oauth/authorize?client_id=' + that.APP_ID + '&scope=' + str + '&response_type=token' + '&redirect_uri=' + window.location.href + "?login_result=fb";
        //}
        //window.location.href = url;


    };

    /**
     * is in facebook canvas
     * @returns {boolean}
     */
    this.isInFBCanvas = function () {
        var loginCanvasID = document.getElementById("login_in_browser").valueOf().defaultValue;
        if (loginCanvasID == "canvasfb" ||
            loginCanvasID == "canvasfbindex") {
            return true;
        }
        return false;
    };
    //LOGOUT
    /**
     * logout
     * @param resultFunc
     */
    this.logout = function (resultFunc) {
        Lobby.Utils.printConsoleLog("Start logout");
        facebookConnectPlugin.logout(
            function (response) {
                // divFriendList.html('');
                Lobby.Utils.printConsoleLog("Logout success");
                Lobby.Utils.printConsoleLog(convertJSON(response));
                resultFunc(true, response);
            },
            function (error) {
                Lobby.Utils.printConsoleLog("Logout fail");
                Lobby.Utils.printConsoleLog(convertJSON(error));
                resultFunc(false, error);
            });
    };


    // USER INFO
    /**
     * get User Info
     * @param resultFunc
     */
    this.getUserInfo = function (resultFunc) {
        Lobby.Utils.printConsoleLog("Start get User info");
        facebookConnectPlugin.api(
            "/me",
            null,
            function (response) {
                // divFriendList.html('');
                response.avatar = getImageUrl(response.id, "large");
                // alert(response.avatar);
                Lobby.Utils.printConsoleLog("fbUserInfoSuccess");
                Lobby.Utils.printConsoleLog(convertJSON(response));
                that.currentUserInfo = response;
                resultFunc(true, response);
            },
            function (response) {
                Lobby.Utils.printConsoleLog("fbUserInfoFail");
                Lobby.Utils.printConsoleLog(convertJSON(error));
                resultFunc(false, error);
            });
    };

    // SEND REQUEST FRIENDS AND WAIT 4 NEXT GROUP

    /**
     * SEND REQUEST ALL FRIENDS AND WAIT 4 NEXT GROUP
     * @param requestFriend
     * @param nextFunc
     * @param resultFunc
     */
    function sendRequestAllFriendAndWait4NextGroup(requestFriend,
                                                   nextFunc,
                                                   resultFunc) {
        loopRequestFriendWithGroupAndWait4NextGroup(
            allFriendIdsGroup,
            0,
            requestFriend,
            nextFunc,
            resultFunc
        );
    }

    /**
     * SEND REQUEST LIST FRIENDS AND WAIT 4 NEXT GROUP
     * @param listFriendIds
     * @param requestFriend
     * @param nextFunc
     * @param resultFunc
     */
    function sendRequestListFriendAndWait4NextGroup(listFriendIds,
                                                    requestFriend,
                                                    nextFunc,
                                                    resultFunc) {
        var friendIdsGroup = [];
        var i = 0;
        var groupIdsStr = "";
        while (i < listFriendIds.length) {

            var id = listFriendIds[i];
            groupIdsStr += (id + ",");

            if (i % MAX_NUMBER_OF_INVITE_FRIEND == 0 &&
                i != 0) {
                friendIdsGroup.push(groupIdsStr);
                groupIdsStr = "";
            }

            i++;
        }
        if (listFriendIds.length % MAX_NUMBER_OF_INVITE_FRIEND != 0) {
            friendIdsGroup.push(groupIdsStr);
        }
        loopRequestFriendWithGroupAndWait4NextGroup(
            friendIdsGroup,
            0,
            requestFriend,
            nextFunc,
            resultFunc
        );

    }

    /**
     * loop request friend with group and wait for next group
     * @param groupIds
     * @param index
     * @param requestFriend
     * @param nextFunc
     * @param resultFunc
     */
    function loopRequestFriendWithGroupAndWait4NextGroup(groupIds,
                                                         index,
                                                         requestFriend,
                                                         nextFunc,
                                                         resultFunc) {
        if (index < groupIds.length) {
            var friendIdsStr = groupIds[index];
            requestFriend(
                friendIdsStr,
                function (isSuccess, inviteResult) {

                    if (isSuccess) {

                        var next = function () {
                            loopRequestFriendWithGroup(
                                groupIds,
                                index + 1,
                                requestFriend,
                                resultFunc);
                        };

                        var friendIdsArray = friendIdsStr.split(",");
                        if (friendIdsArray[friendIdsArray.length - 1] == '') {
                            friendIdsArray.pop();
                        }

                        nextFunc(
                            friendIdsArray,
                            next);

                    } else {
                        resultFunc(
                            false,
                            inviteResult);
                    }
                }
            );
        }
        else {
            Lobby.Utils.printConsoleLog('REQUESTALLLLLLLLLLLLFriendSuccess');
            resultFunc(
                true,
                null
            );
        }

    }

    // SEND REQUEST FRIENDS
    /**
     * SEND REQUEST ALL FRIENDS
     * @param requestFriend
     * @param resultFunc
     */
    function sendRequestAllFriend(requestFriend, resultFunc) {
        loopRequestFriendWithGroup(
            allFriendIdsGroup,
            0,
            requestFriend,
            resultFunc
        );
    }

    /**
     * SEND REQUEST LIST FRIENDS
     * @param listFriendIds
     * @param requestFriend
     * @param resultFunc
     */
    function sendRequestListFriend(listFriendIds,
                                   requestFriend,
                                   resultFunc) {
        var friendIdsGroup = [];
        var i = 0;
        var groupIdsStr = "";
        while (i < listFriendIds.length) {

            var id = listFriendIds[i];
            groupIdsStr += (id + ",");

            if (i % MAX_NUMBER_OF_INVITE_FRIEND == 0 &&
                i != 0) {
                friendIdsGroup.push(groupIdsStr);
                groupIdsStr = "";
            }

            i++;
        }
        if (listFriendIds.length % MAX_NUMBER_OF_INVITE_FRIEND != 0) {
            friendIdsGroup.push(groupIdsStr);
        }
        loopRequestFriendWithGroup(
            friendIdsGroup,
            0,
            requestFriend,
            resultFunc);

    }

    /**
     * loop request friend with group
     * @param groupIds
     * @param index
     * @param requestFriend
     * @param resultFunc
     */
    function loopRequestFriendWithGroup(groupIds,
                                        index, requestFriend, resultFunc) {

        if (index < groupIds.length) {
            var friendIdsStr = groupIds[index];
            requestFriend(
                friendIdsStr,
                function (isSuccess, inviteResult) {

                    if (isSuccess) {
                        loopRequestFriendWithGroup(
                            groupIds,
                            index + 1,
                            requestFriend,
                            resultFunc);
                    } else {
                        resultFunc(
                            false,
                            inviteResult);
                    }
                });


        } else {

            Lobby.Utils.printConsoleLog('REQUESTALLLLLLLLLLLLFriendSuccess');
            resultFunc(
                true,
                null);

        }

    }

    /**
     * invite list friend
     * @param listFriendIds
     * @param resultFunc
     */
    this.inviteListFriend = function (listFriendIds, resultFunc) {
        sendRequestListFriend(
            listFriendIds,
            inviteFriend,
            resultFunc
        );
    };


    /**
     * invite friend
     * @param friendIds
     * @param resultFunc
     */
    function inviteFriend(friendIds, resultFunc) {
        Lobby.Utils.printConsoleLog('Start invite friend facebook');
        var options = new Object();
        options.method = "apprequests";
        options.title = "Welcome";
        options.message = "Join PlayPalace with me!";
        ////options.redirect_uri = that.REDIRECT_URI;
        ////if(!Lobby.Utils.isIOS()){
        //    if (friendIds != null) {
        //        options.to = friendIds;
        //    }
        ////}else{
        ////    options.actionType = "";
        ////}
      if(Lobby.Utils.isIOS()){
        if (friendIds != null) {
          options.to = friendIds.split(",");
        }
        options.objectID = Manager4Product.getFreegiftFacebookProductId();
        options.actionType = "send";
      }else{
        if (friendIds != null) {
          options.to = friendIds;
        }
        //options.action_type = "send";
        //options.object_id = Manager4Product.getFreegiftFacebookProductId();
      }
        facebookConnectPlugin.showDialog(
            options,
            function (inviteResult) {
                Lobby.Utils.printConsoleLog('InviteFriendSuccess');
                Lobby.Utils.printConsoleLog("InviteFriendResult: ", convertJSON(inviteResult));
                resultFunc(true, inviteResult);
            },
            function (error) {
                Lobby.Utils.printConsoleLog('InviteFriendFail');
                Lobby.Utils.printConsoleLog("Error Invite Friend: ", convertJSON(error));
                resultFunc(false, error);
            }
        );
    }

    // SEND GIFT FRIEND AND WAIT 4 NEXT GROUP
    /**
     * SEND GIFT ALL FRIEND AND WAIT 4 NEXT GROUP
     * @param nextFunc
     * @param resultFunc
     */
    this.sendGiftAllFriendAndWait4NextGroup = function (nextFunc, resultFunc) {
        sendRequestAllFriendAndWait4NextGroup(
            sendGiftFriend,
            nextFunc,
            resultFunc
        );
    };

    /**
     * SEND GIFT LIST FRIEND AND WAIT 4 NEXT GROUP
     * @param listFriendIds
     * @param nextFunc
     * @param resultFunc
     */
    this.sendGiftListFriendAndWait4NextGroup = function (listFriendIds, nextFunc, resultFunc) {
        sendRequestListFriendAndWait4NextGroup(
            listFriendIds,
            sendGiftFriend,
            nextFunc,
            resultFunc
        );
    };

    // SEND GIFT FRIEND
    /**
     * SEND GIFT ALL FRIEND
     * @param resultFunc
     */
    this.sendGiftAllFriend =
        function (resultFunc) {

            sendRequestAllFriend(
                sendGiftFriend,
                resultFunc);
        };

    /**
     * SEND GIFT LIST FRIEND
     * @param listFriendIds
     * @param resultFunc
     */
    this.sendGiftListFriend =
        function (listFriendIds,
                  resultFunc) {

            sendRequestListFriend(
                listFriendIds,
                sendGiftFriend,
                resultFunc);

        };
    /**
     * check previous login facebook
     * @param s
     * @param f
     */
    this.checkPreviousLoginFacebook = function (s, f) {
        // Try will catch errors when SDK has not been init


        var loginResult = LobbyRequest.Utils.getUrlParameterExt("login_result");
        //var browserName = Lobby.Utils.getBrowserName();
        if (loginResult == 'fb'
        //&&
        //browserName == "Explorer"
        ) {
            var accessToken = LobbyRequest.Utils.getUrlParameter("access_token", window.location.hash.substring(1));
            var expiredIn = parseInt(LobbyRequest.Utils.getUrlParameter("expires_in", window.location.hash.substring(1)));
            var response = {};
            response.status = 'connected';
            response.authResponse = {
                accessToken: accessToken,
                expiresIn: expiredIn
            };
            s(response, accessToken);
            //facebookConnectPlugin.login(
            //    FacebookController.getPremissionStatic(),
            //    function (userData) {
            //        s(userData);
            //    },
            //    function (error) {
            //        if (!f) {
            //            console.error(error.message);
            //        } else {
            //            f(error.message);
            //        }
            //    }
            //);
        } else {
            s(null);
        }
    };
    /**
     * init facebook plugin
     * @param callback
     */
    this.init = function (callback) {
        //if (window.cordova.platformId == "browser") {
        //    var appId = FacebookController.APP_ID;
        //    var version = "v2.6";
        //    facebookConnectPlugin.browserInit(appId, version);
        //    // version is optional. It refers to the version of API you may want to use.
        //}
        //if (!Lobby.Utils.objectNotNull(facebookConnectPlugin.init) && Lobby.Utils.isWeb()) {
        if (!facebookConnectPlugin.initCompleted && Lobby.Utils.isWeb()) {
            facebookConnectPlugin.init(callback);
            return;
        }
        if (Lobby.Utils.objectNotNull(callback)) {
            callback();
        }
    };
    /**
     * send gift friend
     * @param friendIds
     * @param resultFunc
     */
    function sendGiftFriend(friendIds, resultFunc) {
        //Lobby.Utils.printConsoleLog('Start sendGiftFriend facebook');
        var options = new Object();
        options.method = "apprequests";
        options.title = "Welcome";
        options.message = "I send a special gift up to $100,000 to you! Good luck!";
        if(Lobby.Utils.isIOS()){
            if (friendIds != null) {
                options.to = friendIds.split(",");
            }
          options.objectID = Manager4Product.getFreegiftFacebookProductId();
          options.actionType = "send";
        }else{
          if (friendIds != null) {
            options.to = friendIds;
          }
          options.action_type = "send";
          options.object_id = Manager4Product.getFreegiftFacebookProductId();
        }

        options.redirect_uri = that.REDIRECT_URI;

        facebookConnectPlugin.showDialog(
            options,
            function (inviteResult) {
                //if(LobbyConfig.loginFrom != "fb") {
                $("#fb_dialog_loader_close > div").click();
                //}
                //Lobby.Utils.printConsoleLog("SendGiftFriendResult: ", convertJSON(inviteResult));
                resultFunc(true, inviteResult);
            },
            function (error) {
                //top.window.FB.Dialog.remove(top.window.FB.Dialog._active);
                //Lobby.Utils.printConsoleLog('sendGiftFriendFail');
                Lobby.Utils.printConsoleLog("Error Send Gift Friend: ", convertJSON(error));
                resultFunc(false, error);
            }
        );
    }

    /**
     * ask slots list friend and wait for next grouP
     * @param listFriendIds
     * @param nextFunc
     * @param resultFunc
     */
    this.askSlotsListFriendAndWait4NextGroup = function (listFriendIds,
                                                         nextFunc, resultFunc) {
        sendRequestListFriendAndWait4NextGroup(
            listFriendIds,
            askSlotsFriend,
            nextFunc,
            resultFunc
        );
    };

    /**
     * ask slots friend and wait for next grouP
     * @param listFriendIds
     * @param nextFunc
     * @param resultFunc
     */
    function askSlotsFriend(friendIds, resultFunc) {
        var options = new Object();
        options.method = "apprequests";
        options.title = "Send Secretkey";
        options.message = "Dear, Send Me One Key, Please!";
        if (friendIds != null) {
            options.to = friendIds;
        }
        options.action_type = "askfor";
        options.object_id = Manager4Product.getFreekeyFacebookProductId();
        options.redirect_uri = that.REDIRECT_URI;
        facebookConnectPlugin.showDialog(
            options,
            function (inviteResult) {
                if (LobbyConfig.loginFrom != "fb") {
                    $("#fb_dialog_loader_close > div").click();
                }
                resultFunc(true, inviteResult);
            },
            function (error) {
                Lobby.Utils.printConsoleLog("Error askSlots Friend: ", convertJSON(error));
                resultFunc(false, error);
            }
        );
    };

    /**
     * post 2 new feed
     * @param link
     * @param picture
     * @param name
     * @param caption
     * @param description
     * @param resultFunc
     */
    this.post2NewFeed = function (link, picture, name, caption, description, resultFunc) {
        Lobby.Utils.printConsoleLog('Start post2NewFeed facebook');
        var options = new Object();
        options.method = "feed";
        options.redirect_uri = that.REDIRECT_URI;
        options.link = link;
        options.picture = picture;
        options.name = name;
        options.caption = caption;
        options.description = description;
        facebookConnectPlugin.showDialog(
            options,
            function (result) {
                Lobby.Utils.printConsoleLog('post2NewFeed success');
                Lobby.Utils.printConsoleLog("post2NewFeedResult: ", convertJSON(result));
                if (LobbyConfig.loginFrom != "fb") {
                    $("#fb_dialog_loader_close > div").click();
                }
                resultFunc(true, result);
            },
            function (error) {
                Lobby.Utils.printConsoleLog('post2NewFeed failed');
                Lobby.Utils.printConsoleLog("Error post2NewFeed: ", convertJSON(error));
                resultFunc(false, error);
            }
        );

    };
    /**
     * call facebook api
     * @param graphPath
     * @param permissions
     * @param s                 success callback
     * @param f                 fail callback
     */
     this.api = function (graphPath, permissions, s, f) {
         facebookConnectPlugin.api(
             graphPath,
             null,
             s,
             f);
    };

    /**
     * show facebook dialog
     * @param options
     * @param s                 success callback
     * @param f                 fail callback
     */
    this.showDialog = function (options, s, f) {
        facebookConnectPlugin.showDialog(
            options,
            s,
            f
        );
    }
};
