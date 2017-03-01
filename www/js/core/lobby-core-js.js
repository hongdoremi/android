/**
 * Created by Phuoc Tran on 5/19/2015.
 */
var Lobby = {
    Network: {
        gotoPlayStore2UpdateGameAfterDelay: function () {
            var isOpenUpdatePage = false;
            var callback = function () {
                if (isOpenUpdatePage) {
                    return;
                }
                isOpenUpdatePage = true;
                if (Lobby.Utils.isIOS()) {
                    Lobby.Utils.openURLInBrowser("itms-apps://itunes.apple.com/app/id/" + LobbyConfig.appBundleID_IOS, '_system');
                } else {
                    Lobby.Utils.openURLInBrowser("market://details?id=" + LobbyConfig.appBundleID_android, '_system');
                    //android
                }
            };
            if (LobbyC.MainMenu.isInLobby) {
                LobbyC.MainMenu.showNotificationPopup("", "Your version app is out of date. Please update to the lastest version.",
                    function () {
                        callback();
                    },
                    function () {
                        LobbyC.MainMenu.clearDataAndLogOut();
                    }, null, "Update", true);
            }
            setTimeout(function () {
                callback();
            }, LobbyConfig.delaySwitchToInstallPage);
        },
        /**
         * The OS *ANDROID* may clear the contents of this directory whenever it feels it is necessary
         * @returns {string|*|string|string|null} path of that directory
         */
        getTMPFolder: function () {
            return cordova.file.cacheDirectory;
        },
        /**
         * The OS may clear the contents of this directory whenever it feels it is necessary
         * @returns {string|*|string|string|null} path of that directory
         */
        getShortTMPFolder: function () {

            if (Lobby.Utils.isIOS()) {
                return "/Library/Caches/"; // tham khao cordova-plugin-file document phan ios
            }
            return Lobby.Network.getTMPFolder(); // user for android
        },
        /**
         * use for HTML file acess on ANDROID devices
         * @returns {null|string|string|*|string}
         */
        getDocumentFolder: function () {
            return cordova.file.dataDirectory;
        },
        /**
         * use for HTML file acess on devices
         * @returns {null|string|string|*|string}
         */
        getShortDocumentFolder: function () {
            if (Lobby.Utils.isIOS()) {
                return "/Library/NoCloud/";// tham khao cordova-plugin-file document phan ios
            }
            return Lobby.Network.getDocumentFolder();
        },
        /**
         * replace parameter with value
         * @param url                   string
         * @param paramName             string
         * @param paramValue              string
         */
        replaceParameterInURLWithValue: function (url, paramName, paramValue) {

            if (paramValue == null)
                paramValue = '';
            var pattern = new RegExp('\\b(' + paramName + '=).*?(&|$)')
            if (url.search(pattern) >= 0) {
                return url.replace(pattern, '$1' + paramValue + '$2');
            }
            return url + (url.indexOf('?') > 0 ? '&' : '?') + paramName + '=' + paramValue
        },
        /**
         * replace parameter with value
         * @param url                   string
         * @param paramName             string
         * @param paramValue              string
         */
        replaceParameterInCurrentURLWithValue: function (paramName, paramValue) {

            var url = window.location.href;
            if (paramValue == null)
                paramValue = '';
            var pattern = new RegExp('\\b(' + paramName + '=).*?(&|$)')
            if (url.search(pattern) >= 0) {
                return url.replace(pattern, '$1' + paramValue + '$2');
            }
            return url + (url.indexOf('?') > 0 ? '&' : '?') + paramName + '=' + paramValue
        },
        /**
         * get file name from url
         * @param url
         * @returns {string}
         */
        getFileNameFromURL: function (url) {
            var filename = url.substring(url.lastIndexOf('/') + 1);
            return filename;
        },
        /**
         * get function for ios devices
         * @param link: link
         * @param callback: callback after get
         */
        getIOS: function (link, callback) {
            var timeOut = window.setTimeout(function () {
                if (Lobby.Utils.objectNotNull(callback)) {
                    callback(false, LobbyConstant.ERROR_MESSAGE_SERVER_ERROR);
                }
                callback = null;
            }, LobbyConstant.TIMEOUT_4_REQUEST);

            cordovaHTTP.get(link, {}, {Authorization: "OAuth2: token"}, function (response) {

                window.clearTimeout(timeOut);
                response.data = JSON.parse(response.data);
                var errorMessage = Lobby.Network.handleError(link, response.data, callback, false);
                if (errorMessage != null) {
                    if (LobbyConfig.isDebug) {
                        console.log("getIOS Error when get: " + link + " response.data:" + Lobby.Utils.formatJSON(response.data));
                    }
                    if (Lobby.Utils.objectNotNull(callback)) {
                        callback(false, errorMessage, response);
                    }
                } else {
                    if (LobbyConfig.isDebug) {
                        console.log("getIOS success status : " + response.status);
                    }
                }


            }, function (response) {
                window.clearTimeout(timeOut);
                console.error(response.error);
                if (Lobby.Utils.objectNotNull(callback)) {
                    callback(false, LobbyConstant.ERROR_MESSAGE_SERVER_ERROR);
                }
            });
        },
        /**
         * get function for android devices
         * @param link: link
         * @param callback: callback after get
         */
        getANDROID: function (link, callback) {
            $.ajax({
                type: "GET",
                url: link,
                timeout: LobbyConstant.TIMEOUT_4_REQUEST,
                xhrFields: {
                    withCredentials: true
                },
                success: function (response) {
                    var errorMessage = Lobby.Network.handleError(link, response, callback, true);
                    if (errorMessage != null) {
                        if (LobbyConfig.isDebug) {
                            console.log("getANDROID Error when get: " + link + " result Data:" + Lobby.Utils.formatJSON(response));
                        }
                        callback(false, errorMessage, response);
                    } else {
                        if (LobbyConfig.isDebug) {
                            console.log("getIOS success status : " + response.status);
                        }
                    }
                },
                error: function (request, status, error) {
                    if (LobbyConfig.isDebug) {
                        console.log(request, status, error);
                    }
                    callback(false, LobbyConstant.ERROR_MESSAGE_SERVER_ERROR);
                }
            })
                .done(function (data, textStatus, jqXHR) {
                    //console.log( "Ajax done" ,data, textStatus, jqXHR);
                })
                .fail(function (jqXHR, textStatus, errorThrown) {
                    //if (LobbyConfig.isDebug) {
                    //    console.log("Ajax get fail", jqXHR, textStatus, errorThrown);
                    //}
                })
                .always(function (data, textStatus, jqXHR) {
                    //console.log( "Ajax always data",data, textStatus, jqXHR );
                    //callback(false, 'server_error');
                });
        },
        /**
         * get function if device is ios call getIOS, if device is android call getAndroid
         * @param link
         * @param callback
         */
        get: function (link, callback) {

            if (Lobby.Utils.isIOS()) {
                Lobby.Network.getIOS(link, callback);
            } else {
                Lobby.Network.getANDROID(link, callback);
            }

        },
        /**
         * get cookie
         * @param cookie
         * @param cname
         * @returns {*}
         */
        getCookie: function (cookie, cname) {
            var name = cname + "=";
            var ca = cookie.split(';');
            for (var i = 0; i < ca.length; i++) {
                var c = ca[i];
                while (c.charAt(0) == ' ') {
                    c = c.substring(1);
                }
                if (c.indexOf(name) == 0) {
                    return c.substring(name.length, c.length);
                }
            }
            return "";
        },
        /**
         * post function for ios devices
         * @param link: link
         * @param postData: data will post
         * @param callback: callback after post
         */
        postIOS: function (link, postData, callback) {
            var timeOut = window.setTimeout(function () {
                if (Lobby.Utils.objectNotNull(callback)) {
                    callback(false, LobbyConstant.ERROR_MESSAGE_SERVER_ERROR);
                }
                callback = null;
            }, LobbyConstant.TIMEOUT_4_REQUEST);


            cordovaHTTP.post(
                link,
                postData,
                {Authorization: "OAuth2: token"}, function (response) {
                    window.clearTimeout(timeOut);
                    // prints 200
                    try {
                        response.data = JSON.parse(response.data);
                        // prints test

                        //if(Lobby.Utils.stringContainString(link, 'login')){
                        //  var headers = response.headers;
                        //  var setCookie = headers['Set-Cookie'];
                        //  if(Lobby.Utils.objectNotNull(setCookie)){
                        //    var JSESSIONID = Lobby.Network.getCookie(setCookie,"JSESSIONID");
                        //    LobbyConfig.JSESSIONID = JSESSIONID;
                        //  }
                        //}

                        var errorMessage = Lobby.Network.handleError(link, response.data, callback, false);
                        if (errorMessage != null) {
                            if (LobbyConfig.isDebug) {
                                console.log("Error when post: " + link + " data:" + Lobby.Utils.formatJSON(response.data));
                            }
                            if (Lobby.Utils.objectNotNull(callback)) {
                                callback(false, errorMessage, response.data);
                            }
                        } else {
                            if (LobbyConfig.isDebug) {
                                console.log("postIOS success with statuc : " + response.status);
                            }
                        }

                    } catch (e) {
                        console.error("JSON parsing error");
                    }
                }, function (response) { // error
                    window.clearTimeout(timeOut);

                    if (LobbyConfig.isDebug) {
                        // prints 403
                        //prints Permission denied
                        console.log("postIOS error data : " + response.status + " error code:" + response.error);
                    }
                    if (Lobby.Utils.objectNotNull(callback)) {
                        callback(false, LobbyConstant.ERROR_MESSAGE_SERVER_ERROR);
                    }
                });
        },

        /**
         * get function for android devices
         * @param link: link
         * @param callback: callback after get
         */
        postANDROID: function (link, postData, callback) {
            $.ajax({
                type: "POST",
                url: link,
                data: postData,
                timeout: LobbyConstant.TIMEOUT_4_REQUEST,
                xhrFields: {
                    withCredentials: true
                },
                success: function (response) {

                    var errorMessage = Lobby.Network.handleError(link, response, callback, false);
                    if (errorMessage != null) {
                        console.log("postANDROID Error when post: " + link + " data:" + Lobby.Utils.formatJSON(response));
                        callback(false, errorMessage, response);
                    }


                },
                error: function (request, status, error) {
                    console.log("Error post ", request, status, error);
                    callback(false, LobbyConstant.ERROR_MESSAGE_SERVER_ERROR);
                }

            })
                .done(function (data, textStatus, jqXHR) {
                    //console.log( "Ajax done" ,data, textStatus, jqXHR);
                })
                .fail(function (jqXHR, textStatus, errorThrown) {
                    //console.log("Ajax post fail", jqXHR, textStatus, errorThrown);
                    //callback(false, 'server_error');
                })
                .always(function (data, textStatus, jqXHR) {
                    //console.log( "Ajax always data",data, textStatus, jqXHR );
                });
        },

        /**
         * post function if device is ios call postIOS, if device is android call postAndoird
         * @param link
         * @param callback
         */
        post: function (link, postData, callback) {

            if (Lobby.Utils.isIOS()) {
                Lobby.Network.postIOS(link, postData, callback);
            } else {
                Lobby.Network.postANDROID(link, postData, callback);
            }
        },
        //Kiet uploadFileNew
        /**
         * upload file to server
         * @param link: link
         * @param postData: post data (data of file)
         * @param callback: callback after upload
         */
        uploadFileNew: function (link, postData, callback) {
            $.ajax({
                type: "POST",
                url: link,
                data: postData,
                processData: false,
                contentType: false,
                xhrFields: {
                    withCredentials: true
                },
                success: function (response) {

                    var errorMessage = Lobby.Network.handleError(link, response, callback, false);
                    if (errorMessage != null) {
                        console.log("uploadFileNew Error when post: " + link + " response:" + Lobby.Utils.formatJSON(response));
                        callback(false, errorMessage, response);
                    } else {
                        if (LobbyConfig.isDebug) {
                            console.log("uploadFileNew success with statuc : " + response.status);
                        }
                    }


                },
                error: function (request, status, error) {
                    if (LobbyConfig.isDebug) {
                        console.log("uploadFileNew Error post:", request, status, error);
                    }
                    callback(false, LobbyConstant.ERROR_MESSAGE_SERVER_ERROR);
                }

            })
                .done(function (data, textStatus, jqXHR) {
                    //console.log( "Ajax done" ,data, textStatus, jqXHR);
                })
                .fail(function (jqXHR, textStatus, errorThrown) {
                    //console.log("Ajax post fail", jqXHR, textStatus, errorThrown);
                    //callback(false, 'server_error');
                })
                .always(function (data, textStatus, jqXHR) {
                    //console.log( "Ajax always data",data, textStatus, jqXHR );
                });
        },
        //Dat download file ios
        /**
         * download file for ios
         * @param link: link
         * @param filePath: path to save image
         * @param callback: callback after download
         */
        downloadFileIOS: function (link, filePath, callback) {

            //var fileDownload = Lobby.Network.getTMPFolder();
            //var fileName = Lobby.Network.getFileNameFromURL(link);
            //var fullFilePath = fileDownload + fileName;
            ////alert(fullFilePath);

            cordovaHTTP.downloadFile(link, {
                //id: 12,
                //message: "test"
            }, {Authorization: "OAuth2: token"}, filePath, function (entry) {

                // prints the filePath
                var fullPath = entry.fullPath;
                if (LobbyConfig.isDebug) {
                    console.log("downloadFileIOS download file success at path:" + fullPath + " entry.name" + entry.name);
                }

                if (Lobby.Utils.objectNotNull(callback)) {
                    callback(true);
                }
            }, function (response) {
                //console.error(response.error);
                if (LobbyConfig.isDebug) {
                    console.error("error when downloadFileIOS " + response.error);
                }
                callback(false);
            });


        },
        //Dat download file
        /**
         * download file
         * @param link: link
         * @param filePath: path to save image
         * @param callback: callback after download
         */
        downloadFile: function (link, filePath, callback) {
            Lobby.Network.downloadFileIOS(link, filePath, callback);
        },

        ///**
        // * unuse
        // * @param link
        // * @param imageURL
        // * @param postData
        // * @param formdata
        // * @param callback
        // */
        //uploadFile: function (link, imageURL, postData, formdata, callback) {
        //
        //    $.ajax({
        //        type: "POST",
        //        url: LobbyConfig.webServiceFullUrl + "/user/updateAvatar",
        //        data: formdata,
        //        processData: false,
        //        contentType: false,
        //        xhrFields: {
        //            withCredentials: true
        //        },
        //        success: function (response) {
        //            //hide();
        //            my._userData.profile = response.bean;
        //            my.closePopupWithAnimateLeftNew(localGroup, null, function () {
        //                handleResultAvtCode(response.core_result_code);
        //            });
        //            g.busy = false;
        //        },
        //        error: function (request, status, error) {
        //            //hide();
        //            my.closePopupWithAnimateLeftNew(localGroup, null, function () {
        //                my.showNotificationPopup("Change avatar", "Change avatar failed");
        //            });
        //
        //            g.busy = false;
        //        }
        //
        //    })
        //    .done(function (data, textStatus, jqXHR) {
        //        if (LobbyConfig.isDebug) {
        //            console.log("Ajax done", data, textStatus, jqXHR);
        //        }
        //        hide();
        //        g.busy = false;
        //    })
        //    .always(function (data, textStatus, jqXHR) {
        //        if (LobbyConfig.isDebug) {
        //            console.log("Ajax always data", data, textStatus, jqXHR);
        //        }
        //        hide();
        //        g.busy = false;
        //    });
        //},

        /**
         * handle error when get or post
         * @param link: link
         * @param response: response from server
         * @param callback: callback
         * @param isGet: is get function ?
         * @returns {*}
         */
        handleError: function (link, response, callback, isGet) {
            var errorMessage = null;
            var type = "post";
            if (isGet == true)
                type = "get";

            switch (response.core_result_code) {
                case 0:
                    if (Lobby.Utils.objectNotNull(callback)) {
                        callback(true, response.bean, response);
                    }
                    break;
                case LobbyConstant.RESULT_CODE_ERROR_1:
                    if (LobbyConfig.isDebug) {
                        console.log("Error when " + type + ": " + link + " data:" + Lobby.Utils.formatJSON(response));
                    }
                    if (Lobby.Utils.objectNotNull(callback)) {
                        callback(false, response);
                    }
                    break;
                case LobbyConstant.RESULT_CODE_ERROR_NOT_LOGIN:  // not login
                    errorMessage = LobbyConstant.ERROR_MESSAGE_NOT_LOGIN;
                    break;
                case LobbyConstant.RESULT_CODE_FORCE_CLIENT_UPDATE_APP_LOBBY:  // for update new app
                    Lobby.Network.gotoPlayStore2UpdateGameAfterDelay();
                    errorMessage = LobbyConstant.ERROR_CODE_FORCE_CLIENT_UPDATE_APP_LOBBY;
                    break;
                case LobbyConstant.RESULT_CODE_ERROR_TOKEN_EXPIRED:  // facebook token unauthorized
                    errorMessage = LobbyConstant.ERROR_MESSAGE_TOKEN_EXPIRED;
                    break;
                case LobbyConstant.RESULT_CODE_ERROR_INVAILID_VERISON:  // invalid version
                    errorMessage = LobbyConstant.ERROR_MESSAGE_INVALID_VERSION;
                    break;
                case LobbyConstant.RESULT_CODE_ERROR_SERVER_MAINTAIN:
                    errorMessage = LobbyConstant.ERROR_MESSAGE_SERVER_MAINTAIN;
                    break;
                case LobbyConstant.RESULT_CODE_ERROR_USER_REJECTED_APP:
                    errorMessage = LobbyConstant.ERROR_MESSAGE_USER_REJECTED_APP;
                    break;
                case LobbyConstant.RESULT_CODE_USER_EXIST:
                    errorMessage = "";
                    break;
                case LobbyConstant.RESULT_CODE_PASSWORD_POLICY_ERROR:
                    errorMessage = "";
                    break;
                case LobbyConstant.RESULT_CODE_ERROR_LOGIN_SOME_WHERE:
                    errorMessage = LobbyConstant.ERROR_MESSAGE_LOGIN_SOME_WHERE;
                    break;
                case LobbyConstant.RESULT_CODE_ERROR_FACEBOOK_ERROR:
                    errorMessage = LobbyConstant.ERROR_MESSAGE_FACEBOOK_ERROR;
                    break;
                case LobbyConstant.RESULT_CODE_ERROR_REACH_LIMIT_CHANGE_NAME:
                    errorMessage = LobbyConstant.ERROR_MESSAGE_REACH_LIMITE_CHANGE_NAME;
                    break;
                default:
                    if (LobbyConfig.isDebug) {
                        console.log("Error when " + type + ": " + link + " data:" + Lobby.Utils.formatJSON(response));
                    }
                    errorMessage = "";
                    //callback(false, response,response);
                    break;
            }
            return errorMessage;
        }
    },

    Utils: {
        getCharRowByIndexRowInExcel: function (row) {
            var a = parseInt(row / 26);
            if (a > 0) {
                a = String.fromCharCode(64 + a);
            } else {
                a = '';
            }
            var b = String.fromCharCode(64 + row % 26);

            return a + b;
        },
        isNumber: function (number) {
            return !isNaN(number);
        },
        isString: function (stringVar) {
            return ((typeof stringVar === "string") || (stringVar instanceof String));
        },
        nullFunction: function () {
        },
        isProduction: function () {
            return Lobby.Utils.stringContainString(LobbyConfig.AppDomain, "fb.playpalace.com");
        },
        posHTMLToPosLobby: function (pos) {
            var width = LobbyConfig.realExtraWidth;
            var height = LobbyConfig.realExtraHeight;
            var htmlWidth = LobbyConfig.deviceWidth;
            var htmlHeight = LobbyConfig.deviceHeight;
            var xLobby = pos.x * width * (ManagerForScale.is3x4resolution() ? 1 : LobbyConfig.scaleRatioEntireGame) / htmlWidth;
            var yLobby = pos.y * height * (ManagerForScale.is3x4resolution() ? 1 : LobbyConfig.scaleRatioEntireGame) / htmlHeight;
            return {x: xLobby, y: yLobby};
        },
        getPos: function (el) {
            // yay readability
            for (var lx = 0, ly = 0;
                 el != null;
                 lx += el.offsetLeft, ly += el.offsetTop, el = el.offsetParent);
            return {x: lx, y: ly};
        },
        splice1Item: function (a, i) {
            var l = a.length;
            if (l) {
                while (i < l) {
                    a[i++] = a[i];
                }
                --a.length;
            }
        },
        /**
         * KIET - bring object in array to front
         * @param array: array
         * @param object: object want bring to front
         * @returns {*}
         */
        bringObjectToFrontInArray: function (array, object) {
            var newArray = [];
            if (Lobby.Utils.objectIsNull(array)
                || Lobby.Utils.objectIsNull(object)) {
                return newArray;
            }
            var index = array.indexOf(object);
            if (index < 0)
                return array;
            Lobby.Utils.moveArray(array, index, 0);
        },
        /**
         * KIET - move a object in array
         * @param array: array
         * @param old_index: old index
         * @param new_index: new index
         */
        moveArray: function (array, old_index, new_index) {
            if (new_index >= array.length) {
                var k = new_index - array.length;
                while ((k--) + 1) {
                    array.push(undefined);
                }
            }
            Lobby.Utils.splice1Item(array, old_index);
            //array.splice(new_index, 0, array.splice(old_index, 1)[0]);
            array.splice(new_index, 0, array[0]);
            array;
        },
        /**
         * Random number in range
         * @param min: min value
         * @param max: max value
         * @returns {number}: value after random in range
         */
        getRandomInRange: function (min, max) {
            var randomInt = Math.floor((Math.random() * (max - min + 1)) + min);
            return randomInt;
        },
        /**
         * open a url
         * @param url
         */
        openURLInBrowser: function (url) {
            if (Lobby.Utils.isWeb()) {
                //Lobby.Utils.reloadGame();
                window.location.href = url;
            } else {
                cordova.InAppBrowser.open(url, '_system');
            }
        },
        //Format json
        /**
         * Formal JSON to string
         * @param json: json
         */
        formatJSON: function (json) {
            return JSON.stringify(json, null, 4);
        },
        /**
         * clone string
         * @param string
         * @returns {string}
         */
        cloneString: function (string) {
            return String(string);
        },
        /**
         * is app running in web?
         * @returns {boolean}
         */
        isWeb: function () {
            var isWeb = typeof cordova === "undefined" || (cordova.platformId !== "android" && cordova.platformId !== "ios");
            return isWeb;
        },
        /**
         * IS device support web gl?
         * @returns {boolean}
         */
        checkWebGLSupported: function () {
//return true;
            if (!window.WebGLRenderingContext) {
                // the browser doesn't even know what WebGL is
                //alert(" the browser doesn't even know what WebGL is");
                return false;
            } else {
                var canvas = document.createElement("canvas");
                var context = canvas.getContext("webgl") || canvas.getContext("experimental-webgl");
                if (!context) {
                    //alert(" the browser doesn't even no init");
                    return false;
                }
            }

            //alert("web gl supported");
            return true;

        },
        //Callback param: freeSpaces;
        /**
         * check free space devices enough or not enough with minSpace
         * @param minSpace: min space
         * @param callbackSuccess: callback if enough free space
         * @param callbackError: callback if not enough free space or error
         */
        checkFreeSpace: function (minSpace, callbackSuccess, callbackError) {
            if (typeof cordova !== "undefined") {
                if (Lobby.Utils.isIOS()) {
                    cordova.exec(function (fs) {
                        if (LobbyConfig.isDebug) {
                            console.log("checkFreeSpace FREE SPACES: " + fs);
                        }
                        if (Lobby.Utils.objectNotNull(callbackSuccess)) {
                            callbackSuccess(fs >= minSpace);
                        }
                    }, function () {
                        if (LobbyConfig.isDebug) {
                            console.log("checkFreeSpace get Free Space Failed");
                        }
                        if (Lobby.Utils.objectNotNull(callbackError)) {
                            callbackError();
                        }
                    }, "File", "getFreeDiskSpace", []);
                } else {
                    cordova.exec(function (fs) {
                        if (LobbyConfig.isDebug) {
                            console.log("checkFreeSpace FREE SPACES: " + fs);
                        }
                        if (Lobby.Utils.objectNotNull(callbackSuccess)) {
                            callbackSuccess(fs >= minSpace);
                        }
                    }, function () {
                        if (LobbyConfig.isDebug) {
                            console.log("checkFreeSpace get Free Space Failed");
                        }
                        if (Lobby.Utils.objectNotNull(callbackError)) {
                            callbackError();
                        }
                    }, "File", "getFreeInternalDiskSpace", []);
                }
            }
        },
        /**
         * check object is function
         * @param functionToCheck
         * @returns {*|boolean}
         */
        isFunction: function (functionToCheck) {
            if (Lobby.Utils.objectIsNull(functionToCheck)) {
                return false;
            }
            var getType = {};
            return functionToCheck && getType.toString.call(functionToCheck) === '[object Function]';
        },
        /**
         * Remove param from an
         * @param urlNeedRemove
         * @param component component
         * @returns new
         */
        removeComponentInURL: function (urlNeedRemove, component) {
            if (urlNeedRemove.indexOf(component) > -1) {
                if (urlNeedRemove.slice(-1) == "/") {
                    urlNeedRemove = urlNeedRemove.substring(0, urlNeedRemove.length - 1);
                }
                var str = urlNeedRemove.substr(urlNeedRemove.lastIndexOf('/') + 1) + '$';
                urlNeedRemove = urlNeedRemove.replace(new RegExp(str), '');
                if (urlNeedRemove.slice(-1) == "/") {
                    urlNeedRemove = urlNeedRemove.substring(0, urlNeedRemove.length - 1);
                }
            }
            return urlNeedRemove;
        },
        /**
         *
         * @param sourceURL
         * @param key
         * @returns {*}
         */
        removeParam: function (sourceURL, key) {
            var rtn = sourceURL.split("?")[0],
                param,
                params_arr = [],
                queryString = (sourceURL.indexOf("?") !== -1) ? sourceURL.split("?")[1] : "";
            if (queryString !== "") {
                params_arr = queryString.split("&");
                for (var i = params_arr.length - 1; i >= 0; i -= 1) {
                    param = params_arr[i].split("=")[0];
                    if (param === key) {
                        params_arr.splice(i, 1);
                    }
                }
                if (params_arr.length > 0)
                    rtn = rtn + "?" + params_arr.join("&");
            }
            return rtn;
        },
        /**
         * reload all game
         */
        reloadGame: function () {
            //location.reload(true);
            var oldUrl = window.location.href;
            window.location.href = Lobby.Utils.removeParam(oldUrl, LobbyConstant.memoryError);
            //window.location.href = window.location.href.replace( /[\?#].*|$/, "" );
        },
        /**
         * trim text with begin index an number of next characters
         * @param text
         * @param numberCharacter
         * @param begin
         * @returns {string}
         */
        trimTextNoDot: function (text, numberCharacter, begin) {
            return text.substring(begin, numberCharacter);
        },
        /**
         * float to in
         * @param float
         * @returns {number}
         */
        floatToIntOptimize: function (float) {
            var rounded = (0.5 + float) | 0;
            //rounded = ~~(0.5+float);
            //rounded = (0.5+float) << 0;
            return rounded;
        },
        /**
         * is ipad devices?
         * @returns {boolean}
         */
        isIpad: function () {
            // DEBUG:DAT START
            //return false;
            //return true;
            // DEBUG:DAT END
            var is_iPad = navigator.userAgent.match(/iPad/i) != null;
            return is_iPad;
        },
        /**
         * is 3x4 resolution devices?
         * @returns {*|boolean}
         */
        is3x4Device: function () {
            //return true;
            //return false;
            //alert(LobbyConfig.fixRatioBetweenHeightAndWidthDevice );
            //if(Lobby.Utils.isWeb()){
            //    return false;
            //}
            return (Lobby.Utils.isIpad() ||
            LobbyConfig.fixRatioBetweenHeightAndWidthDevice >= 0.625);
        },
        /**
         * is old school devices?
         * @returns {boolean}
         */
        isOldSchoolDevice: function () {
//return false;
            //alert(device.model);
//              alert(device.cordova);
//              alert(device.platform);
//              alert(device.uuid);
//              alert(device.version);
//              alert(device.name);

            if (Lobby.Utils.isWeb()) {
                //test
                //return true;
                return false;
            }

            if (typeof device == "undefined") {
                return false;
            }
            if (Lobby.Utils.objectNotNull(device)
                && Lobby.Utils.isIOS() == false
                && device.platform == "Android"
                && Lobby.Utils.objectNotNull(device.version)
                && device.version != "undefined") {
                var versionArray = device.version.split('.');
                if (Lobby.Utils.objectNotNull(versionArray[0])) {
                    var versionHighest = parseInt(versionArray[0]);
                    if (versionHighest < 5)
                        return true;
                }
            }
            if (
                Lobby.Utils.stringContainString(device.model, "iPad2") ||
                Lobby.Utils.stringContainString(device.model, "iPad1") ||
                Lobby.Utils.stringContainString(device.model, "iPhone5") ||
                Lobby.Utils.stringContainString(device.model, "iPhone4") ||
                Lobby.Utils.stringContainString(device.model, "iPhone3")) {
                return true;
            }

            // DEBUG:DAT START
            //return true;
            // DEBUG:DAT END

            return false;
        },
        /**
         * is IOS devices?
         * @returns {*}
         */
        isIOS: function () {
            if (Lobby.Utils.isWeb()) {
                return false;
            }
            if (typeof device == "undefined") {
                return Lobby.Utils.isIOSCheckWithoutPlugin();
            }
            var devicePlatform = device.platform;
            return (devicePlatform == 'iOS');
        },
        /**
         * if device not ready run this code to check is Android devices?
         * @returns {boolean}
         */
        isAndroidCheckWithoutPlugin: function () {
            if (Lobby.Utils.isWeb()) {
                return false;
            }
            return /Android/i.test(navigator.userAgent);
        },
        /**
         * if device not ready run this code to check is IOS devices?
         * @returns {boolean}
         */
        isIOSCheckWithoutPlugin: function () {
            if (Lobby.Utils.isWeb()) {
                return false;
            }
            return /iPhone|iPad|iPod/i.test(navigator.userAgent);
        },
        /**
         * is string content substring?
         * @param string
         * @param substring
         * @returns {boolean}
         */
        stringContainString: function (string, substring) {
            return (string.indexOf(substring) > -1);
        },
        /**
         * is email?
         * @param email
         * @returns {boolean}
         */
        validateEmail: function (email) {
            var re = /^(([^<>()[\]\\.,;:\s@\"]+(\.[^<>()[\]\\.,;:\s@\"]+)*)|(\".+\"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
            return re.test(email);
        },
        /**
         * print console log
         */
        printConsoleLog: function () {
            if (LobbyConfig.printConsoleLog) {
                // 2016-07-23: Phuoc: đổi cách print log để print được tất cả các param
                //console.log(log);
                if (LobbyConfig.isDebug) {
                    console.log.apply(console, arguments);
                }
            }
        },
        /**
         * get browser name
         * @returns {*|string}
         */
        getBrowserName: function () {
            // 2015-12-12: Phuoc: detect firefox -> chuyen duong link tu .swf -> .html
            var BrowserDetect = {
                init: function () {
                    this.browser = this.searchString(this.dataBrowser) || "Other";
                    this.version = this.searchVersion(navigator.userAgent) || this.searchVersion(navigator.appVersion) || "Unknown";
                },
                searchString: function (data) {

                    var i = data.length;
                    while (i--) {
                        var dataString = data[i].string;
                        this.versionSearchString = data[i].subString;

                        if (dataString.indexOf(data[i].subString) !== -1) {
                            return data[i].identity;
                        }
                    }
                    //for (var i = 0; i < data.length; i++) {
                    //}
                },
                searchVersion: function (dataString) {
                    var index = dataString.indexOf(this.versionSearchString);
                    if (index === -1) {
                        return;
                    }

                    var rv = dataString.indexOf("rv:");
                    if (this.versionSearchString === "Trident" && rv !== -1) {
                        return parseFloat(dataString.substring(rv + 3));
                    } else {
                        return parseFloat(dataString.substring(index + this.versionSearchString.length + 1));
                    }
                },

                dataBrowser: [
                    {string: navigator.userAgent, subString: "Edge", identity: "MS Edge"},
                    {string: navigator.userAgent, subString: "MSIE", identity: "Explorer"},
                    {string: navigator.userAgent, subString: "Trident", identity: "Explorer"},
                    {string: navigator.userAgent, subString: "Firefox", identity: "Firefox"},
                    {string: navigator.userAgent, subString: "Opera", identity: "Opera"},
                    {string: navigator.userAgent, subString: "OPR", identity: "Opera"},

                    {string: navigator.userAgent, subString: "Chrome", identity: "Chrome"},
                    {string: navigator.userAgent, subString: "Safari", identity: "Safari"}
                ]
            };

            BrowserDetect.init();
            return BrowserDetect.browser;
        },
        /**
         * get param from current url
         * @param sParam
         */
        getParameterFromCurrentURL: function (sParam) {
            var getUrlParameter = function getUrlParameter(sParam) {
                var sPageURL = decodeURIComponent(window.location.search.substring(1)),
                    sURLVariables = sPageURL.split('&'),
                    sParameterName,
                    i;

                for (i = 0; i < sURLVariables.length; i++) {
                    sParameterName = sURLVariables[i].split('=');

                    if (sParameterName[0] === sParam) {
                        return sParameterName[1] === undefined ? true : sParameterName[1];
                    }
                }
            };

            return getUrlParameter(sParam);
        },
        /**
         * object is null
         * @param object
         * @returns {boolean}
         */
        objectIsNull: function (object) {
            //return (object == null || object == undefined || (object !== object));
            return (object === null || object === undefined);
        },
        /**
         * object is not null
         * @param object
         * @returns {boolean}
         */
        objectNotNull: function (object) {
            return (!Lobby.Utils.objectIsNull(object));
        },
        /**
         * remove object in array
         * @param object
         * @param array
         */
        removeObjectInArray: function (object, array) {
            var index = array.indexOf(object);
            if (index > -1) {
                Lobby.Utils.splice1Item(array, index);
                //array.splice(index, 1);
            }
        },
        /**
         * remove object in array with key
         * @param object
         * @param key
         * @param array
         */
        removeObjectInArrayWithKey: function (object,
                                              key,
                                              array) {
            var index = -1;
            var i = array.length;
            while (i--) {
                var obj = array[i];
                if (obj[key] == object) {
                    index = i;
                    break;
                }
            }
            //for (var i = 0; i < array.length; i++) {}
            if (index > -1) {
                //array.splice(index, 1);
                Lobby.Utils.splice1Item(array, index);
            }
        },
        /**
         * remove all object in array with key
         * @param object
         * @param key
         * @param array
         */
        removeAllObjectInArrayWithKey: function (object,
                                                 key,
                                                 array) {
            for (var i = 0; i < array.length; i++) {
                var obj = array[i];
                if (obj[key] == object) {
                    //array.splice(i, 1);
                    Lobby.Utils.splice1Item(array, i);
                    i--;
                }
            }
        },
        /**
         *sort array descending
         * @param arrayObject
         * @param property
         * @returns {*}
         */
        sortArrayObjectDescending: function (arrayObject,
                                             property) {
            if (Lobby.Utils.objectIsNull(arrayObject)) {
                return arrayObject;
            }

            function compare(a, b) {
                if (a[property] > b[property])
                    return -1;
                if (a[property] < b[property])
                    return 1;
                return 0;
            }

            arrayObject.sort(compare);
        },
        /**
         *sort array ascending
         * @param arrayObject
         * @param property
         * @returns {*}
         */
        sortArrayObjectAscending: function (arrayObject,
                                            property) {
            if (Lobby.Utils.objectIsNull(arrayObject)) {
                return arrayObject;
            }

            function compare(a, b) {
                if (a[property] < b[property])
                    return -1;
                if (a[property] > b[property])
                    return 1;
                return 0;
            }

            arrayObject.sort(compare);


        },
        /**
         * float to int
         * @param floatvalue
         * @returns {number}
         */
        float2int: function (floatvalue) {
            var intValue = Math.round(floatvalue);
            return intValue;
        },
        /**
         * swap 2 item
         * @param item1
         * @param item2
         */
        swap: function (item1, item2) {
            if (LobbyConfig.isDebug) {
                console.log('swap', item1, item2);
            }
            var temp = item1;
            item1 = item2;
            item2 = temp;
            if (LobbyConfig.isDebug) {
                console.log('swap', item1, item2);
            }
        },
        /**
         * format number with commas
         * @param x
         * @returns {*}
         */
        formatNumberWithCommas: function (x) {
            if (x == undefined || x == null) {
                return "";
            }
            var parts = x.toString().split(".");
            parts[0] = parts[0].replace(/\B(?=(\d{3})+(?!\d))/g, ",");
            return parts.join(".");
        },
        /**
         * format number to k, m, b. Example coin = 100000, return 100k; coin 1000000000, return 1b
         * @param coin
         * @returns {string}
         */
        formatCoinNumber: function (coin) {
            var result = "";
            var isNegative = false;
            var coinValue = parseInt(coin, 10);
            if (coinValue < 0) {
                isNegative = true;
                coinValue = -coinValue;
            }
            if (coinValue < 1000) {
                result += coinValue;
            }
            else if (coinValue < 1000000) {
                var quotient = Math.floor(coinValue / 1000);
                var wtf = coinValue - 1000 * quotient;
                wtf = Math.floor(wtf / 100);
                if (wtf > 0) {
                    result += quotient + "." + wtf + "K";
                } else {
                    result += quotient + "K";
                }
            }
            else if (coinValue < 1000000000) {
                var quotient = Math.floor(coinValue / 1000000);
                var wtf = coinValue - 1000000 * quotient;
                if (wtf > 0) {
                    wtf = Math.floor(wtf / 100000);
                }
                result += quotient + "." + wtf + "M";
            }
            else {
                var quotient = Math.floor(coinValue / 1000000000);
                var wtf = coinValue - 1000000000 * quotient;
                wtf = Math.floor(wtf / 100000000);
                result += quotient + "." + wtf + "B"
            }
            if (isNegative) {
                result = "-" + result;
            }
            return result;
        },
        /**
         * trim text
         * @param text
         * @param numberCharacter
         * @returns {string}
         */
        trimText: function (text, numberCharacter) {
            return text.substring(0, numberCharacter) + "...";
        },
        /**
         * conver date from time stamp
         * @param timestamp
         * @returns {string}
         */
        convertDate: function (timestamp) {
            var d = new Date(timestamp);
            var year = d.getFullYear();
            var month = d.getMonth() + 1;
            month = (month > 9) ? (month) : ("0" + month);
            var date = d.getDate();
            date = (date > 9) ? (date) : ("0" + date);
            return year + "-" + month + "-" + date + "-" + d.getHours() + ":" + d.getMinutes() + ":" + d.getSeconds();
        },
        /**
         * Warning, if time is move than a day, will be wrong, use helper.time instead
         * @param timestamp
         * @param separate
         * @param timeType
         * @returns {*}
         */
        tsToStringByHourMinute: function (timestamp, separate, timeType) {
            if (Lobby.Utils.objectIsNull(separate)) {
                separate = "_";
            }
            var totalSec = timestamp / 1000;
            var hours = parseInt(totalSec / 3600);
            var minutes = parseInt(totalSec / 60) % 60;
            var seconds = Lobby.Utils.floatToIntOptimize(totalSec % 60);

            if (timeType == "h") {
                return hours;
            } else if (timeType == "m") {
                return minutes;
            } else if (timeType == "s") {
                return seconds;
            }

            var result = (hours < 10 ? "0" + hours : hours) + separate + (minutes < 10 ? "0" + minutes : minutes) + separate + (seconds < 10 ? "0" + seconds : seconds);
            return result;
        },
        /**
         * get current timestamp
         */
        getCurrentTimestamp: function () {
            var timestamp = Date.now();
            return timestamp;
        },
        /**
         * get current timestamp
         */
        getCurrentTimestampAndConvert2String: function () {
            var date = new Date();
            return date;
            //return Lobby.Utils.convertDate(Lobby.Utils.getCurrentTimestamp());
        },
        isPositiveInteger: function (n) {
            return n >>> 0 === parseFloat(n);
        },
        /**
         * is string empty?
         * @param str
         * @returns {boolean}
         */
        stringIsEmpty: function (str) {
            return (str.length === 0 || !str.trim());
        },
        /**
         * storing object to local storage
         * @param key: key
         * @param obj: object
         */
        setObjToLocalStorage: function (key, obj) {
            localStorage.setItem(key, JSON.stringify(obj));
        },
        /**
         * load object from local storage
         * @param key: key
         */
        getObjFromLocalStorage: function (key) {
            return JSON.parse(localStorage.getItem(key));
        },
        /**
         * storing value to local storage
         * @param key
         * @param value
         */
        setToLocalStorage: function (key, value) {
            try {
                localStorage.setItem(key, value);
            } catch (ex) {
                console.log("Error in setToCache function: ", ex);
            }
        },
        /**
         * load value from local storage
         * @param key: key
         */
        getFromLocalStorage: function (key) {
            try {
                var object = localStorage.getItem(key);
                return object;
            } catch (ex) {
                console.log("Error in setToCache function: ", ex);
            }
        },
        /**
         * remove a object or value from local storage with key
         * @param key
         */
        removeFromLocalStorage: function (key) {
            try {
                localStorage.removeItem(key);
            } catch (ex) {
                console.log("Error in removeFromCache function: ", ex);
            }
        },

        /**
         * printf log current time
         * @param param
         */
        logCurrentTime: function (param) {
            if (param == null || param == undefined) {
                param = "Log time at : ";
            }
            var currentDate = new Date();
            var datetime = param + currentDate.getDate() + "/"
                + (currentDate.getMonth() + 1) + "/"
                + currentDate.getFullYear() + " @ "
                + currentDate.getHours() + ":"
                + currentDate.getMinutes() + ":"
                + currentDate.getSeconds();
            if (LobbyConfig.isDebug) {
                console.log("logCurrentTime " + datetime);
            }
        },

        /**
         * print stack trace
         */
        printStackTrace: function () {
            if (LobbyConfig.printConsoleLog) {
                console.trace();
            }
        }
    },

    PhaserJS: {
        /**
         * clear timer (timer is my.time.events)
         * @param my
         * @param timer
         */
        clearTimer: function (my, timer) {
            if (Lobby.Utils.objectIsNull(my) ||
                Lobby.Utils.objectIsNull(timer)) {
                return;
            }
            my.time.events.remove(timer);
        },
        /**
         * clear interval
         * @param interval
         */
        clearInterval: function (interval) {
            if (Lobby.Utils.objectIsNull(interval)) {
                return;
            }
            if (interval.isScheduleInterval) {
                ScheduleManager.clearInterval(interval);
            }
            clearInterval(interval);
        },
        /**
         * auto fit text with width + height
         * @param objText
         * @param width
         * @param height
         */
        autoFitText: function (objText, width, height) {
            if (Lobby.Utils.objectIsNull(objText)) {
                return;
            }
            if (width > 0 || height > 0) {
                var size = objText.fontSize;
                while ((objText.width > width || objText.height > height) && objText.fontSize > 10) {
                    objText.fontSize = --size;
                }
            }
        },
        /**
         * scale group for optimize
         * @param group: group
         * @param isChangePosition: is change position?
         * @param customScale: custom scale
         */
        scaleGroupForOptimize: function (group, isChangePosition, customScale) {
            if (Lobby.Utils.objectNotNull(isChangePosition) && isChangePosition) {
                group.position.x *= LobbyConfig.scaleRatioEntireGame;
                group.position.y *= LobbyConfig.scaleRatioEntireGame;
            }
            if (Lobby.Utils.objectIsNull(customScale)) customScale = 1;
            group.scale.setTo(customScale * LobbyConfig.scaleRatioEntireGame);
            ManagerForScale.reposition(group);
        },
        /**
         * scale object at center
         * @param object: object
         * @param ratio: ratio
         */
        scaleObjectAtCenter: function (object, ratio) {
            var scaleRatio = ratio;

            var pBtnX = object.position.x;
            var pBtnY = object.position.y;
            var wBtn = object.width;
            var hBtn = object.height;
            object.scale.setTo(scaleRatio.x, scaleRatio.y);

            var anchorX = 0;
            var anchorY = 0;
            var previousAnchorX = 0;
            var previousAnchorY = 0;
            if (Lobby.Utils.objectNotNull(object.anchor)) {
                previousAnchorX = object.anchor.x;
                previousAnchorY = object.anchor.y;
            }

            object.anchor = {x: 0.5, y: 0.5};

            object.position = {
                //x: pBtnX + wBtn*(1-scaleRatio)*(0.5-anchorX),
                //y: pBtnY + hBtn*(1-scaleRatio)*(0.5-anchorY)
                x: pBtnX + (0.5 - previousAnchorX) * wBtn,
                y: pBtnY + (0.5 - previousAnchorY) * hBtn
            };
        },
        /**
         * clar mask of group
         * @param group
         */
        clearMask: function (group) {
            group.mask = null;
            if (Lobby.Utils.objectNotNull(group.spriteMask)) {
                group.spriteMask.destroy();
            }
        },
        /**
         * create mask rectangle for group with size
         * @param context
         * @param group
         * @param x
         * @param y
         * @param width
         * @param height
         */
        maskRectangleGroup: function (context, group, x, y, width, height) {
            var myMask = context.add.graphics(0, 0);
            myMask.beginFill();
            myMask.beginFill(0xffffff);
            myMask.drawRect(
                x,
                y,
                width,
                height);
            myMask.endFill();
            //Duy, fix error undefine "data"
            var sprite = context.add.sprite(0, 0);
            sprite.addChild(myMask);
            sprite.visible = true;
            group.add(sprite);

            group.mask = myMask;
            group.spriteMask = sprite;
        },
        /**
         * create mask circle for group with size
         * @param group
         * @param size
         * @param my
         */
        maskCircleGroup: function (group, size, my) {
            var myMask = my.add.graphics(0, 0);
            myMask.beginFill();
            myMask.beginFill(0xffffff);
            myMask.drawCircle(
                size / 2,
                size / 2,
                size
            );
            myMask.endFill();
            group.add(myMask);
            //Duy, fix error undefine "data"
            var sprite = my.add.sprite(0, 0);
            sprite.addChild(myMask);
            sprite.visible = true;
            group.add(sprite);
            group.spriteMask = sprite;
            group.mask = myMask;
        },
        createSpriteWithCircleMask: function (sprite, spriteName, size, my) {
            //return false;
            if (Lobby.Utils.isIOS()) {
                return false;
            }
            var frameMask = "circleMask" + sprite.texture.width;
            //Check if frame mask with right resolution exists, if not then create a new one
            if (!my.game.cache.checkImageKey(frameMask)) {
                var bmMask = my.game.add.bitmapData(sprite.texture.width, sprite.texture.width);
                bmMask.draw('circleMask320', 0, 0, sprite.texture.width, sprite.texture.width);
                bmMask.generateTexture("circleMask" + sprite.texture.width);
            }
            if (my.game.cache.checkImageKey(frameMask)) {
                //Check if there masked avatar in cache
                if (my.game.cache.checkImageKey(spriteName + "-masked")) {
                    sprite.loadTexture(spriteName + "-masked");
                } else if (my.game.cache.checkImageKey(spriteName)) {
                    if (sprite.parent.mask) {
                        sprite.parent.mask.destroy();
                        sprite.parent.mask = null;
                    }
                    //Create a new bitmapdata image with alphas circle mask
                    var bmd = my.game.add.bitmapData(sprite.texture.width, sprite.texture.width);
                    bmd.alphaMask(spriteName, frameMask);
                    bmd.generateTexture(spriteName + "-masked");
                    //If this avatar texture size is not equal with expectly size then create a new one to make the avatar look smoothly
                    if (size && size != sprite.texture.width) {
                        var bmAvatar = my.game.add.bitmapData(size, size);
                        bmAvatar.draw(spriteName + "-masked", 0, 0, size, size);
                        bmAvatar.generateTexture(spriteName + "-masked" + size);
                        sprite.loadTexture(spriteName + "-masked" + size);
                    } else {
                        sprite.loadTexture(spriteName + "-masked");
                    }
                    //Remove the texture that has downloaded from cache
                    if (spriteName != "popup_profile_profile_avatar" &&
                        spriteName != "inbox_voucher_icon" &&
                        spriteName != "popup_inbox_admin_avatar") {
                        my.game.cache.removeImage(spriteName);
                    }
                }
                return true;
            } else {
                return false;
            }
        },
        /**
         * create mask rectangle for group
         * @param group
         * @param x: left
         * @param y: top
         * @param width
         * @param height
         * @param my
         */
        maskRectGroup: function (group, x, y, width, height, my) {
            var myMask = my.add.graphics(0, 0);
            myMask.beginFill();
            myMask.beginFill(0xffffff);
            myMask.drawRect(
                x,
                y,
                width,
                height
            );
            myMask.endFill();
            group.add(myMask);
            //Duy, fix error undefine "data"
            var sprite = my.add.sprite(0, 0);
            sprite.addChild(myMask);
            sprite.visible = true;
            group.add(sprite);

            group.mask = myMask;
        },
        /**
         * try load texture from cache with key to object
         * @param object
         * @param key
         * @param my
         * @returns {boolean}
         */
        tryLoadTexture: function (object, key, my) {
            if (my.game.cache.checkImageKey(key)) {
                try {

                    object.loadTexture(key);
                } catch (e) {
                    return false;
                }
                return true;
            } else {
                if (LobbyConfig.isDebug) {
                    console.log("Load texture failed: ", key);
                }
                return false;
            }
        },
        /**
         * try load texture from cache with key to object
         * @param object
         * @param key
         * @param my
         * @returns {boolean}
         */
        tryLoadAvatar: function (object, key, my, isProfile) {
            if (Lobby.Utils.isIOS()) {
                return !Lobby.PhaserJS.tryLoadTexture(object, key, my);
            }
            else if (my.game.cache.checkImageKey(key + "-masked")) {
                try {
                    if (isProfile || !my.game.cache.checkImageKey(key + "-masked" + object.texture.width)) {
                        object.loadTexture(key + "-masked");
                    } else {
                        object.loadTexture(key + "-masked" + object.texture.width);
                    }
                } catch (e) {
                    return false;
                }
                return true;
            } else if (my.game.cache.checkImageKey(key)) {
                object.loadTexture(key);
            }
            return false;
        },
        /**
         * remove all child
         * @param group
         */
        removeAllChild: function (group) {
            while (group.children.length > 0) {
                var firstChild = group.children[0];
                group.remove(firstChild);
            }

        },
        destroyAllChild: function (group) {
            if (Lobby.Utils.objectIsNull(group)) {
                return;
            }
            while (group.children.length > 0) {
                var firstChild = group.children[0];
                firstChild.destroy(true);
            }
        },
        /**
         * stop all animation of group which content animations
         * @param group
         */
        stopGroupAnimation: function (group) {
            var i = group.children.length;
            while (i--) {
                var child = group.children[i];
                if (child.animations != null && child.animations != undefined
                    && child.animations.stop != null && child.animations.stop != undefined) {
                    child.animations.stop(null, true);
                }
            }
            //for (var i = 0, len = group.children.length; i < len; i++) {}

        },
        /**
         * start collision mode for phaser
         * @param my
         */
        startCollisionMode: function (my) {
            if (Lobby.Utils.objectIsNull(my.physics)) {
                return;
            }
            //  Enable P2
            my.physics.startSystem(Phaser.Physics.P2JS);
            //  Turn on impact events for the world, without this we get no collision callbacks
            my.physics.p2.setImpactEvents(true);
            my.physics.p2.restitution = 0.8;

        },
        /**
         * get number of frame of animations
         * @param sprite animation
         * @returns {*}
         */
        getNumberOfFrame: function (sprite) {
            if (Lobby.Utils.objectIsNull(sprite)) {
                return 0;
            }
            var numberOfFrame = sprite.animations._frameData._frames.length;
            if (LobbyConfig.isDebug) {
                console.log("getNumberOfFrame : " + numberOfFrame);
            }
            return numberOfFrame;
        },
        /**
         * center horizontal item with parent width
         * @param item  item need 2 adjust
         * @param parentWidth  width of parent
         */
        centerX: function (item, parentWidth) {
            item.anchor.x = 0.5;
            item.x = parentWidth / 2;
        },
        /**
         * center vertical item with parent width
         * @param item  item need 2 adjust
         * @param parentHeight  height of parent
         */
        centerY: function (item, parentHeight) {
            item.anchor.y = 0.5;
            item.y = parentHeight / 2;
        },
        /**
         * center item with parent width
         * @param item  item need 2 adjust
         * @param parentSize  size of parent
         */
        center: function (item, parentSize) {
            item.anchor = {
                x: 0.5,
                y: 0.5
            };
            item.position = {
                x: parentSize.width / 2,
                y: parentSize.height / 2
            }
        },
        /**
         * Create the wheel to spin
         * @param context       game
         * @param spriteInfo    sprite information (posX, posY, spriteName)
         * @param wheelInfo     wheel information
         * @param easingType    Easing type for wheel (default: Cubic.Out)
         */
        createWheel: function (context,
                               spriteInfo,
                               wheelInfo,
                               easingType) {
            var _oWheel = context.add.sprite(Lobby.Utils.objectNotNull(spriteInfo.posX) ? spriteInfo.posX : 0,
                Lobby.Utils.objectNotNull(spriteInfo.posY) ? spriteInfo.posY : 0,
                Lobby.Utils.objectNotNull(spriteInfo.spriteName) ? spriteInfo.spriteName : "",
                null,
                spriteInfo.parent);
            _oWheel.anchor.setTo(0.5);
            var _aWheelInfo = wheelInfo;
            var _easingType = Lobby.Utils.objectNotNull(easingType) ? easingType : Phaser.Easing.Cubic.Out;
            _oWheel.spinWheel = function (value, onBegin, onComplete, duration) {
                var angle = 0;

                for (var i = 0; i < _aWheelInfo.length; i++) {
                    if (_aWheelInfo[i].value == value) {
                        angle = _aWheelInfo[i].angle;
                        break;
                    }
                }

                angle += 3 * 360;

                if (Lobby.Utils.objectNotNull(onBegin)) {
                    onBegin();
                }

                var tweenRotate = context.add.tween(_oWheel).to({angle: angle}, duration, _easingType, true);
                tweenRotate.onComplete.add(function () {
                    if (Lobby.Utils.objectNotNull(onComplete)) {
                        onComplete();
                    }
                });
            };

            return _oWheel;
        },
        /**
         * Create drop down list
         * @param context       game
         * @param x             x pos
         * @param y             y pos
         * @param menu          menu object{
         *                          group: group contain
         *                          button:
         *                          callback:
         *                          iDefault: index of default item
         *                          isUpDown:
         *                      }
         * @param items         items object{
         *                          group: group contain
         *                          listItems: [object{
         *                              button:
         *                              callback:
         *                              onSelected:
         *                              onUnSelected:
         *                          }]
         *                      }
         * @param group
         * @param yStart        y Start Pos for list item
         * @param yEnd          y End Pos for list item
         * @param easingType    easing type for drop down
         */
        createDropDownList: function (context,
                                      x,
                                      y,
                                      menu,
                                      items,
                                      group,
                                      yStart,
                                      yEnd,
                                      easingType) {
            var container = context.add.group();
            group.add(container);
            container.x = x;
            container.y = y;
            container.menu = menu;
            container.menu.isDroped = false;
            container.menu.currentSelection = container.menu.iDefault ? container.menu.iDefault : 0;
            container.add(container.menu.group);

            container.menu.group.x = 0;
            container.menu.group.y = 0;

            container.itemContainer = context.add.group(container);
            container.items = items;
            container.itemContainer.add(container.items.group);
            container.items.group.x = 0;
            container.items.yStart = yStart ? yStart : -container.items.group.height;
            container.items.yEnd = yEnd ? yEnd : container.menu.group.height;
            container.easingType = easingType ? easingType : Phaser.Easing.Quadratic.Out;

            container.items.group.y = container.items.yStart;

            Lobby.PhaserJS.maskRectangleGroup(context,
                container.itemContainer,
                container.items.group.x,
                container.menu.group.height,
                Math.max(container.menu.group.width, container.items.group.width),
                container.items.group.height);

            container.menu.button.inputEnabled = true;

            container.toggleDown = function () {
                if (container.menu.isDroped) {
                    return
                }
                container.menu.isDroped = true;
                context.add.tween(container.items.group).to({
                    y: container.items.yEnd
                }, 500, container.easingType, true);
                for (var i = 0; i < container.items.listItems.length; ++i) {
                    container.items.listItems[i].button.inputEnabled = true;
                }
                container.updateSelection(container.items.listItems[container.menu.currentSelection]);
            };
            container.toggleUp = function () {
                if (!container.menu.isDroped) {
                    return
                }
                container.menu.isDroped = false;
                context.add.tween(container.items.group).to({
                    y: container.items.yStart
                }, 500, container.easingType, true);
                for (var i = 0; i < container.items.listItems.length; ++i) {
                    container.items.listItems[i].button.inputEnabled = false;
                }
            };

            container.toggle = function () {
                if (container.menu.isUpDown) {
                    if (container.menu.isDroped) {
                        container.toggleUp();
                    } else {
                        container.toggleDown();
                    }
                } else {
                    container.toggleDown();
                }
            };

            container.menu.button.events.onInputDown.add(function () {
                if (container.menu.callback) {
                    container.menu.callback();
                }
                container.toggle();
            }, context);

            container.exit = function () {
                container.menu.isDroped = false;
                container.menu.currentSelection = container.menu.iDefault;
                context.add.tween(container.items.group).to({
                    y: container.items.yStart
                }, 500, container.easingType, true);
                for (var i = 0; i < container.items.listItems.length; ++i) {
                    container.items.listItems[i].button.inputEnabled = false;
                    container.items.listItems[i].isSelected = false;
                }
            };

            container.updateSelection = function (_item) {
                for (var i = 0; i < container.items.listItems.length; ++i) {
                    if (container.items.listItems[i] == _item) {
                        if (container.items.listItems[i].isSelected) {
                            return;
                        }
                        container.menu.currentSelection = i;
                        container.items.listItems[i].isSelected = true;
                        if (container.items.listItems[i].onSelected) {
                            container.items.listItems[i].onSelected();
                        }
                        if (container.items.listItems[i].callback) {
                            container.items.listItems[i].callback();
                        }
                    } else {
                        container.items.listItems[i].isSelected = false;
                        if (container.items.listItems[i].onUnSelected) {
                            container.items.listItems[i].onUnSelected();
                        }
                    }
                }
            };

            var addEventItem = function (index) {
                container.items.listItems[index].button.inputEnabled = false;
                container.items.listItems[index].isSelected = false;
                container.items.listItems[index].button.events.onInputDown.add(function () {
                    if (container.items.listItems[index].isSelected) {
                        return;
                    }
                    container.updateSelection(container.items.listItems[index]);
                }, context);
            };

            for (var i = 0; i < container.items.listItems.length; ++i) {
                addEventItem(i);
            }

            return container;
        },
        /**
         * Create a progress bar
         * @param context           game
         * @param x                 x pos
         * @param y                 y pos
         * @param backgroundSprite  background sprite
         * @param progressSprite    progress sprite
         * @param group             parent group
         * @param currentProgress   current Progress
         * @param totalProgress     total Progress
         * @param isDebug           is in Debug mode
         * @param isShowProgress    is should show Progress text (ex: 4/60)
         * @param isShowPercent     is should show Percent text (ex: 15%)
         * @param onProgressChanged event when progress changed
         * @param onFinished        event when progress finish
         * @param frameName         frame name for progress sprite
         * @returns {*}
         */
        createProgressBar: function (context,
                                     x,
                                     y,
                                     backgroundSprite,
                                     progressSprite,
                                     group,
                                     currentProgress,
                                     totalProgress,
                                     isDebug,
                                     isShowProgress,
                                     isShowPercent,
                                     onProgressChanged,
                                     onFinished,
                                     frameName) {
            var rectangle = context.add.group();
            group.add(rectangle);
            rectangle.x = x;
            rectangle.y = y;

            rectangle.background = context.add.sprite(0, 0, backgroundSprite, frameName, rectangle);

            rectangle.progress = context.add.group();
            rectangle.add(rectangle.progress);

            rectangle.progress.pSprite = context.add.sprite(0, 0, progressSprite, frameName, rectangle.progress);

            rectangle.progress.currentProgress = currentProgress;
            rectangle.progress.totalProgress = totalProgress;
            rectangle.progress.onProgressChanged = onProgressChanged;
            rectangle.progress.onFinished = onFinished;

            rectangle.generateMask = function () {
                if (rectangle.progress.mask) {
                    rectangle.progress.mask.destroy();
                    rectangle.progress.mask = null;
                }
                // tim ty le can scale
                var ratio = rectangle.progress.currentProgress / rectangle.progress.totalProgress;
                ratio = (ratio > 1) ? 1 : ratio;
                // 2016-05-10: Phuoc: nếu ratio khác 0 nhưng quá nhỏ thì sẽ tăng lên, đủ nhìn thấy là có progress
                ratio = (ratio != 0 && ratio < 0.01) ? 0.01 : ratio;
                Lobby.PhaserJS.maskRectangleGroup(context, rectangle.progress, 0, 0, rectangle.progress.pSprite.width * ratio, rectangle.progress.pSprite.height);
            };
            rectangle.updateProgress = function (progress) {

                rectangle.progress.current = progress;
                if (rectangle.progress.currentProgress >= rectangle.progress.totalProgress) {
                    rectangle.progress.currentProgress = rectangle.progress.totalProgress;
                    if (rectangle.progress.onFinished) {
                        rectangle.progress.onFinished();
                    }
                } else {
                    if (rectangle.progress.onProgressChanged) {
                        rectangle.progress.onProgressChanged();
                    }
                }
                rectangle.generateMask();
                if (isShowProgress) {
                    rectangle.text.text = rectangle.progress.currentProgress.toString() + "/" + rectangle.progress.totalProgress.toString();
                }
                else if (isShowPercent) {
                    rectangle.text.text = (rectangle.progress.currentProgress / rectangle.progress.totalProgress) + "%";
                }
            };

            rectangle.text = context.add.text(0, 0, "", {
                font: rectangle.progress.pSprite.height + 'px PassionOne-Bold',
                fill: '#ffffff',
                align: "center"
            });
            rectangle.add(rectangle.text);
            Lobby.PhaserJS.centerX(rectangle.text, rectangle.progress.pSprite.width);

            rectangle.updateProgress(rectangle.progress.currentProgress);

            return rectangle;
        },
        /**
         * create button without color
         * @param context   game
         * @param top       top pos
         * @param left      left pos
         * @param width     width button
         * @param height    height button
         * @param callback  callback when mouse down
         * @param group     group contain button
         * @param isDebug   is in debug mode
         * @param callbackUp    callback when mouse up
         * @returns {*}
         */
        createRectangle: function (context, top, left, width, height, callback, group, isDebug, callbackUp) {
            var rectangle = context.add.graphics(top, left, group);
            rectangle.beginFill(0xFF700B);
            rectangle.fillAlpha = 0.5;
            if (!isDebug) {
                rectangle.fillAlpha = 0;
            }
            rectangle.drawRect(0, 0, width, height);
            rectangle.inputEnabled = true;
            rectangle.input.useHandCursor = true;
            rectangle.events.onInputDown.add(callback, context);
            if (Lobby.Utils.objectNotNull(callbackUp)) {
                rectangle.events.onInputUp.add(callbackUp, context);
            }
            return rectangle;
        },
        /**
         * create rectangle with color
         * @param context       game
         * @param top
         * @param left
         * @param width
         * @param height
         * @param color
         * @param group         parent
         * @param isDebug       is in debug mode
         * @returns {*}
         */
        createRectangleWithColor: function (context, top, left, width, height, color, group, isDebug) {
            var rectangle = context.add.graphics(top, left, group);
            rectangle.beginFill(color);
            rectangle.fillAlpha = 1;
            if (!isDebug) {
                rectangle.fillAlpha = 0;
            }
            rectangle.drawRect(0, 0, width, height);
            return rectangle;
        },
        /**
         * create button with more event
         * @param context                   game
         * @param top
         * @param left
         * @param callback                  touch down
         * @param callbackOver              touch over
         * @param callbackOut               touch out
         * @param group                     parent
         * @param isDebug                   is in debug mode
         * @param pathSprite                sprite of rectangle
         * @param callbackUp                touch up
         * @param frameName                 frame name of sprite
         * @returns {*}
         */
        createSpriteRectangleExt: function (context, top, left, callback, callbackOver, callbackOut, group, isDebug,
                                            pathSprite, callbackUp, frameName) {
            var rectangle = context.add.sprite(top, left, pathSprite, frameName, group);
            rectangle.inputEnabled = true;
            rectangle.input.useHandCursor = true;
            rectangle.events.onInputDown.add(callback, context);
            rectangle.events.onInputOver.add(callbackOver, context);
            rectangle.events.onInputOut.add(callbackOut, context);
            if (Lobby.Utils.objectNotNull(callbackUp)) {
                rectangle.events.onInputUp.add(callbackUp, context);
            }

            return rectangle;
        },
        /**
         * create button with bigger touch
         * @param context               game
         * @param x
         * @param y
         * @param callback              touch down event
         * @param group                 parent
         * @param isDebug               is in debug mode
         * @param pathSprite            sprite name
         * @param callbackUp            touch up event
         * @param anchor                anchor of sprite
         * @param ratio                 ratio to zoom
         * @param customPos             expand position
         * @param frameName             frame name of sprite
         * @returns {*}
         */
        createSpriteRectangleWithBiggerTouchZone: function (context, x, y, callback, group, isDebug,
                                                            pathSprite, callbackUp, anchor, ratio, customPos, frameName) {
            var rectangle = context.add.group();
            group.add(rectangle);
            rectangle.x = x;
            rectangle.y = y;

            rectangle.sprite = context.add.sprite(0, 0, pathSprite, frameName, rectangle);
            rectangle.sprite.anchor = anchor;

            var xOffset = 0;
            var yOffset = 0;
            if (Lobby.Utils.objectNotNull(customPos)) {
                xOffset = customPos.x;
                yOffset = customPos.y;
            }
            rectangle.btn = Lobby.PhaserJS.createRectangle(context,
                rectangle.sprite.x - rectangle.sprite.width * (anchor.x + (ratio.x - 1) / 2) + xOffset,
                rectangle.sprite.y - rectangle.sprite.height * (anchor.y + (ratio.y - 1) / 2) + yOffset,
                rectangle.sprite.width * ratio.x,
                rectangle.sprite.height * ratio.y,
                callback,
                rectangle, isDebug,
                callbackUp);

            return rectangle;
        },
        /**
         * create sprite button
         * @param context               game
         * @param top
         * @param left
         * @param callback              touch down event
         * @param callbackOver          mouse over
         * @param callbackOut           touch out event
         * @param useHandCursor         use Hand Cursor
         * @param group                 parent
         * @param isDebug               is in debug mode
         * @param pathSprite            sprite name
         * @param callbackUp            touch up event
         * @param frameName             frame name
         * @returns {*}
         */
        createSpriteRectangle: function (context,
                                         top,
                                         left,
                                         callback,
                                         callbackOver,
                                         callbackOut,
                                         useHandCursor,
                                         group,
                                         isDebug,
                                         pathSprite,
                                         callbackUp,
                                         frameName) {
            var rectangle = context.add.sprite(top, left, pathSprite, frameName, group);
            rectangle.inputEnabled = true;
            rectangle.input.useHandCursor = useHandCursor;
            rectangle.events.onInputDown.add(callback, context);
            rectangle.events.onInputOver.add(callbackOver, context);
            rectangle.events.onInputOut.add(callbackOut, context);
            if (Lobby.Utils.objectNotNull(callbackUp)) {
                rectangle.events.onInputUp.add(callbackUp, context);
            }

            return rectangle;
        },
        /**
         *
         * @param context
         * @param top
         * @param left
         * @param callback
         * @param callbackOver
         * @param callbackOut
         * @param useHandCursor
         * @param isPixelPerfectClick
         * @param isPixelPerfectOver
         * @param group
         * @param isDebug
         * @param pathSprite
         * @param callbackUp
         * @param frameName
         * @returns {*}
         */
        createSpriteRectangleWithPixelPerfect: function (context,
                                                         top,
                                                         left,
                                                         callback,
                                                         callbackOver,
                                                         callbackOut,
                                                         useHandCursor,
                                                         isPixelPerfectClick,
                                                         isPixelPerfectOver,
                                                         group,
                                                         isDebug,
                                                         pathSprite,
                                                         callbackUp,
                                                         frameName) {
            var rectangle = context.add.sprite(top, left, pathSprite, frameName, group);
            rectangle.inputEnabled = true;
            rectangle.input.useHandCursor = useHandCursor;
            rectangle.input.pixelPerfectClick = isPixelPerfectClick;
            rectangle.input.pixelPerfectOver = isPixelPerfectOver;
            rectangle.events.onInputDown.add(callback, context);
            rectangle.events.onInputOver.add(callbackOver, context);
            rectangle.events.onInputOut.add(callbackOut, context);
            if (Lobby.Utils.objectNotNull(callbackUp)) {
                rectangle.events.onInputUp.add(callbackUp, context);
            }
            return rectangle;
        },
        /**
         * create long click button
         * @param context
         * @param top
         * @param left
         * @param callback
         * @param callbackOver
         * @param callbackOut
         * @param useHandCursor
         * @param isPixelPerfectClick
         * @param isPixelPerfectOver
         * @param group
         * @param isDebug
         * @param pathSprite
         * @param callbackUp
         * @param frameName
         * @param isActiveHoldCallback
         * @param timeHolding
         * @param callbackHold
         * @returns {*}
         */
        createSpriteRectangleWithHoldCallBack: function (context,
                                                         top,
                                                         left,
                                                         callback,
                                                         callbackOver,
                                                         callbackOut,
                                                         useHandCursor,
                                                         isPixelPerfectClick,
                                                         isPixelPerfectOver,
                                                         group,
                                                         isDebug,
                                                         pathSprite,
                                                         callbackUp,
                                                         frameName,
                                                         isActiveHoldCallback, //This has to be a function (for case the condition can be change)
                                                         timeHolding,   //Time holing to trigger callback
                                                         callbackHold) {
            var rectangle = context.add.sprite(top, left, pathSprite, frameName, group);
            rectangle.inputEnabled = true;
            rectangle.input.useHandCursor = useHandCursor;
            rectangle.input.pixelPerfectClick = isPixelPerfectClick;
            rectangle.input.pixelPerfectOver = isPixelPerfectOver;

            var timer;
            var isCallback = false;
            rectangle.events.onInputDown.add(function () {
                callback();
                isCallback = false;
                if (isActiveHoldCallback()) {
                    timer = context.time.events.add(timeHolding, function () {
                        isCallback = true;
                        callbackHold();
                        Lobby.PhaserJS.clearTimer(context, timer);
                    });
                }
            }, context);
            rectangle.events.onInputOver.add(callbackOver, context);
            rectangle.events.onInputOut.add(callbackOut, context);
            rectangle.events.onInputUp.add(function () {
                if (Lobby.Utils.objectNotNull(timer)) {
                    Lobby.PhaserJS.clearTimer(context, timer);
                }
                if (!isCallback || !isActiveHoldCallback()) {
                    callbackUp();
                }
            }, context);

            return rectangle;
        },
        /**
         * create rectangle button
         * @param context           game
         * @param top
         * @param left
         * @param width
         * @param height
         * @param callbackDown      touch down event
         * @param callbackOver      mouse over
         * @param callbackOut       touch out event
         * @param group
         * @param isDebug
         * @returns {*}
         */
        createInputRegion: function (context, top, left, width, height, callbackDown, callbackOver, callbackOut, group,
                                     isDebug) {
            var rectangle = context.add.graphics(top, left, group);
            rectangle.beginFill(0xFF700B);
            rectangle.fillAlpha = 0.5;
            if (!isDebug) {
                rectangle.fillAlpha = 0;
            }
            rectangle.drawRect(0, 0, width, height);
            rectangle.inputEnabled = true;
            rectangle.input.useHandCursor = true;
            rectangle.events.onInputDown.add(callbackDown, context);
            rectangle.events.onInputOver.add(callbackOver, context);
            rectangle.events.onInputOut.add(callbackOut, context);
            return rectangle;
        },
        /**
         * get array of index from 'from' to 'to'
         * @param from
         * @param to
         * @returns {Array}
         */
        getSpriteSheetIndexArray: function (from, to) {
            var result = [];
            for (var index = from; index <= to; ++index) {
                result.push(index);
            }
            return result;
        },
        /**
         * check 2 sprite is lay on each others
         * @param spriteA
         * @param spriteB
         * @returns {*}
         */
        checkOverlap: function (spriteA, spriteB) {
            var boundsA = spriteA.getBounds();
            var boundsB = spriteB.getBounds();

            return Phaser.Rectangle.intersects(boundsA, boundsB);
        },
        /**
         * create list view
         * @param my
         * @param parentGroup
         * @param groupItems
         * @param groupItemsX
         * @param groupItemsY
         * @param width
         * @param height
         * @param scrollBar
         * @param scrollButton
         * @param minNumberItemToUseScroll
         * @param isDebug
         * @param callbackCreateItem
         * @returns {*}
         */
        createMoreAwesomeListView: function (my,
                                             parentGroup,
                                             groupItems,
                                             groupItemsX,
                                             groupItemsY,
                                             width,
                                             height,
                                             scrollBar,
                                             scrollButton,
                                             minNumberItemToUseScroll,
                                             isDebug,
                                             callbackCreateItem) {
            var group = my.add.group();
            group.mouseWheelCallback = null;

            parentGroup.add(group);
            group.add(groupItems);
            group.position = {
                x: groupItemsX,
                y: groupItemsY
            };
            group.add(scrollBar);
            group.add(scrollButton);
            scrollBar.position = {
                x: width + scrollBar.x,
                y: scrollBar.y
            };
            scrollButton.position = {
                x: width + scrollButton.x,
                y: scrollButton.y
            };

            var heightOfMask = (LobbyConfig.height - height) / 2 + 50;
            var obscureMaskDown = Lobby.PhaserJS.createRectangle(
                my,
                0,
                height,
                width,
                heightOfMask,
                function () {
                },
                group,
                LobbyConfig.isDebug);
            var obscureMaskUp = Lobby.PhaserJS.createRectangle(
                my,
                0,
                -heightOfMask,
                width,
                heightOfMask,
                function () {
                },
                group,
                LobbyConfig.isDebug);

            var myMask = my.add.graphics(0, 0);
            //myMask.beginFill();
            myMask.beginFill(0xffffff, 0);
            //myMask.beginFill(0xFF3300);
            myMask.drawRect(0, 1, width + scrollBar.width, height - 2);
            myMask.endFill();
            group.add(myMask);

            //Duy, fix error undefine "data"
            var sprite = my.add.sprite(0, 0);
            sprite.addChild(myMask);
            sprite.visible = true;
            group.add(sprite);

            group.mask = myMask;


            if (groupItems.length >= minNumberItemToUseScroll) {
                scrollButton.inputEnabled = true;
                scrollButton.input.enableDrag();
                scrollButton.input.allowHorizontalDrag = false;
                scrollButton.input.useHandCursor = true;
                scrollButton.input.boundsRect =
                    new Phaser.Rectangle(
                        scrollButton.x,
                        0,
                        scrollButton.width,
                        height);
                var isMoving = false;
                var startY = 0;

                var begin = 0 + scrollButton.height;
                var end = 0 + height;
                var lengthScrollBtn = end - begin;
                var lengthTable = groupItems.height - height;
                var isCreate = false;
                var updateTablePosition = function () {
                    var per = (scrollButton.y - 0) / lengthScrollBtn;
                    groupItems.y = -(lengthTable) * per;

                    if (((per >= 0.8) || (my.game.kineticScrolling.currentGroupScroll.y != 0 && my.game.kineticScrolling.isScrollToPercentMaxY(0.8) == true))
                        && Lobby.Utils.objectNotNull(callbackCreateItem)
                        && !isCreate) {
                        callbackCreateItem(groupItems, height / minNumberItemToUseScroll, scrollButton.y);
                        isCreate = true;
                        isMoving = false;
                        group.destroy();
                    }
                };

                var onMove = function (pointer) {
                    if (isMoving) {
                        updateTablePosition();
                    }
                };
                my.input.addMoveCallback(onMove);
                var indexCallback;
                scrollButton.events.onDragStart.add(function (sprite, pointer) {
                    isMoving = true;
                    startY = pointer.clientY;
                }, my);
                scrollButton.events.onDragStop.add(function (sprite, pointer) {
                    isMoving = false;
                    startY = 0;
                }, my);
                function mouseWheel(event) {
                    var percent = -0.05 * my.input.mouse.wheelDelta;
                    //console.log("Percent " ,percent);
                    //console.log(my.input.mouse.wheelDelta);
                    var newY = scrollButton.y + percent * lengthScrollBtn;
                    if (newY > lengthScrollBtn) {
                        newY = lengthScrollBtn;
                    }
                    if (newY < 0) {
                        newY = 0;
                    }
                    scrollButton.y = newY;

                    updateTablePosition();
                }

                group.mouseWheelCallback = mouseWheel;
                my.input.mouse.mouseWheelCallback = mouseWheel;


                function overThisAwsome(event, sprite) {
                }

                //myMask.inputEnabled = true;
                myMask.events.onInputOver.add(overThisAwsome, this);

            }
            else {
                scrollBar.visible = false;
                scrollBar.alpha = 0;
                scrollButton.visible = false;
                scrollButton.alpha = 0;
            }

            return group;
        },
        /**
         * scale keep ratio between width and height
         * @param sprite
         * @param toSize
         */
        scaleAspectSize: function (sprite, toSize) {
            var scaleX = toSize.width / sprite.width;
            var scaleY = toSize.height / sprite.height;

            sprite.scale.setTo(scaleX, scaleY);
        },
        /**
         * scale object at center o
         * @param o             center
         * @param rationPoint   ratio x,y
         * @param scale         scale
         */
        scaleObjectAtRatioPoint: function (o, rationPoint, scale) {

            var objectAnchor = {x: 0, y: 0};
            //if(Lobby.Utils.objectNotNull(o.anchor)) objectAnchor =  o.anchor;

            o.scale.setTo(scale);

            var translate = {
                x: (rationPoint.x - objectAnchor.x) * o.width * (1 - scale),
                y: (rationPoint.y - objectAnchor.y) * o.height * (1 - scale)
            };
            o.position.x += translate.x;
            o.position.y += translate.y;
        },
        /**
         * center item to world
         * @param item
         */
        centerWorld: function (item) {
            item.position = {
                x: (LobbyConfig.width - item.width) / 2,
                y: (LobbyConfig.height - item.height) / 2
            }
        },
        /**
         * center item to world
         * @param item
         */
        centerWorldForPopupWithBackground: function (popup, background) {
            popup.position = {
                x: (LobbyConfig.width - background.width) / 2,
                y: (LobbyConfig.height - background.height) / 2
            }
        },
        /**
         * center item horizontal to world
         * @param item
         */
        centerXWorld: function (item) {
            item.x = (LobbyConfig.width - item.width) / 2;
        },
        /**
         * center item to vertical
         * @param item
         */
        centerYWorld: function (item) {
            item.y = (LobbyConfig.height - item.height) / 2;
        },
        /**
         * center item in parent
         * @param item
         * @param parent
         */
        centerParent: function (item, parent) {
            item.x = (parent.width - item.width) / 2;
            item.y = (parent.height - item.height) / 2;
        },
        /**
         * center horizontal item in parent at center O(x=0,y=whatever)
         * @param item
         * @param parent
         */
        centerXParentAnchorLeft: function (item, parent) {
            item.x = (parent.width - item.width) / 2;//- item.width/2;
        },
        /**
         * center horizontal item in parent
         * @param item
         * @param parent
         */
        centerXParent: function (item, parent) {
            item.x = (parent.width - item.width) / 2;
        },
        /**
         * center vertical item in parent
         * @param item
         * @param parent
         */
        centerYParent: function (item, parent) {
            item.y = (parent.height - item.height) / 2;
        },
        /**
         * center item in background
         * @param item
         * @param parent
         */
        // new center method
        centerItemInBackground: function (item, background) {
            item.position = {
                x: background.x +
                (background.width - item.width) / 2,
                y: background.y +
                (background.height - item.height) / 2
            }
        },
        /**
         * center vertical item in parent
         * @param item
         * @param parent
         */
        centerYItemInBackground: function (item, background) {
            item.y = background.y + (background.height - item.height) / 2;
        },
        /**
         * center horizontal in parent
         * @param item
         * @param parent
         */
        centerXItemInBackground: function (item, background) {
            item.x = background.x + (background.width - item.width) / 2;
        },
        ///**
        // * create dynamic list view
        // * @param my                game
        // * @param parentGroup       parent
        // * @param groupItems        list view
        // * @param width
        // * @param height
        // * @param isDebug           is in debug mode
        // */
        //createDynamicListView: function (my,
        //                                 parentGroup,
        //                                 groupItems,
        //                                 width,
        //                                 height,
        //                                 isDebug) {
        //    var group = my.add.group();
        //    parentGroup.add(group);
        //    group.position = groupItems.position;
        //    groupItems.position = {
        //        x: 0,
        //        y: 0
        //    };
        //    group.add(groupItems);
        //
        //    var myMask = my.add.graphics(0, 0);
        //    myMask.beginFill();
        //    myMask.beginFill(0xffffff);
        //    myMask.drawRect(
        //        0,
        //        0,
        //        width + 1000,
        //        height);
        //    myMask.endFill();
        //    group.add(myMask);
        //    group.mask = myMask;
        //
        //    //popup-mini-scroll
        //    var scrollButton =
        //        my.add.sprite(
        //            width,
        //            0,
        //            "popup-mini-scroll",
        //            null,
        //            group
        //        );
        //    scrollButton.alpha = 0; // @deprecate function
        //    scrollButton.inputEnabled = true;
        //    scrollButton.input.enableDrag();
        //    scrollButton.input.allowHorizontalDrag = false;
        //    scrollButton.input.useHandCursor = true;
        //    var bound =
        //        new Phaser.Rectangle(
        //            width,
        //            0,
        //            scrollButton.width + 100,
        //            height);
        //    scrollButton.input.boundsRect = bound;
        //    var isMoving = false;
        //    var startY = 0;
        //
        //    var length = height - scrollButton.height;
        //    var onMove = function (pointer) {
        //        if (isMoving) {
        //            //console.log('moving');
        //
        //            var per = scrollButton.y / length;
        //            //console.log(scrollButton.y - top, per);
        //
        //
        //            //var moveDistance = (pointer.clientY - startY);
        //            //moveDistance /= moveDistanceFactor;
        //            groupItems.y = -(groupItems.height - height) * per;
        //            //console.log(per);
        //        }
        //    };
        //    my.input.addMoveCallback(onMove);
        //    var indexCallback;
        //    scrollButton.events.onDragStart.add(function (sprite, pointer) {
        //        isMoving = true;
        //        if (LobbyConfig.isDebug) {
        //            console.log('start drag', pointer);
        //        }
        //        startY = pointer.clientY;
        //        //indexCallback = my.input.addMoveCallback(onMove);
        //    }, my);
        //    scrollButton.events.onDragStop.add(function (sprite, pointer) {
        //        isMoving = false;
        //        startY = 0;
        //    }, my);
        //}
    }
};

//(function () {
//    var cookies;
//
//    function readCookie(name, c, C, i) {
//        if (cookies) {
//            return cookies[name];
//        }
//
//        var c = document.cookie.split('; '), C;
//        ;
//        cookies = {};
//
//        for (var i = c.length - 1; i >= 0; i--) {
//            var C = c[i].split('=');
//            cookies[C[0]] = C[1];
//        }
//
//        return cookies[name];
//    }
//
//    window.readCookie = readCookie; // or expose it however you want
//})();
