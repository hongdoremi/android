/**
 * Created by Phuoc Tran on 7/16/2015.
 */
//"use strict";
var ResourceLoader = new function () {
    var avatarList;
    var resourceList;
    var callbackList;
    var newLoader;
    var that = this;
    var my = null;
    /**
     * Init a resource loader
     * @param game
     */
    this.init = function (game) {
        avatarList = [];
        resourceList = new Map();
        callbackList = new Map();

        my = game;
        newLoader = new Phaser.Loader(my);
        newLoader.crossOrigin = "anonymous";
        newLoader.maxParallelDownloads = 100;
        Lobby.Utils.printConsoleLog('init resource loader');
        //this.loadAvatar('bot-avatar-for-all', LobbyConfig.botAvatar, null, null);
    };
    /**
     * Clear all avatar in cache
     */
    this.resetAvatarKey = function(){
        var i = avatarList.length; while (i--) {
            //if(Lobby.Utils.isIOS())
            my.cache.removeImage(avatarList[i], false);
            if(!Lobby.Utils.isIOS()) {
                my.cache.removeImage(avatarList[i] + "-masked", false);
            }
            //else
            //    my.cache.removeImage(avatarList[i]);
        }
        //for(var i = 0; i < avatarList.length ; i++){
        //}
        avatarList = [];
    };
    //this.getImageUrl = function(url,callback) {
    //    window.resolveLocalFileSystemURL(url,function(entry){
    //        //that.toDataUrl(entry.toInternalURL(),callback);
    //        callback(entry.toURL());
    //    } ,null);
    //};
    /**
     * Load an avatar img
     * @param key
     * @param value
     * @param callback
     * @param callbackParams
     * @param isJustDownloadOneTime is this avatar only download one time only
     */
    this.loadAvatar = function (key, value, callback, callbackParams, isJustDownloadOneTime) {
        if (my === null) {
            throw "Please init!!!";
        }
        if(my.game.cache.checkImageKey(key + "-masked")){
            callback(callbackParams);
            return;
        }
        isJustDownloadOneTime = true;
        var callbackFuncWithTryCatch = function () {
            try {
                if(isJustDownloadOneTime == true){
                    var arrayCallback = callbackList.get(key);
                    if(Lobby.Utils.objectIsNull(arrayCallback)){
                        arrayCallback = [];
                    }
                    //if(arrayCallback.length == 0){
                    callbackList.remove(key);
                    //  return;
                    //}

                    var i = arrayCallback.length; while (i--) {
                        var callB = arrayCallback[i];
                        if(Lobby.Utils.objectNotNull(callB)) {
                            callB(callB.callbackParams);
                        }
                    }
                    //for (i = 0; i < arrayCallback.length; i++) {}

                    //callbackList.remove(key);

                }else {
                    callback(callbackParams);
                }
            }
            catch (ex) {
            }
        };
        if (!my.cache.checkImageKey(key)) {


            if(Lobby.Utils.objectNotNull(isJustDownloadOneTime)){
                if(isJustDownloadOneTime){
                    //console.log("callbackList.length get avata length :" + callbackList.length);
                    //if(callbackList.length > 10){
                    //  return;
                    //}
                    var arrayCallback = callbackList.get(key);
                    if(Lobby.Utils.objectIsNull(arrayCallback)){
                        arrayCallback = [];
                        callbackList.put(key,arrayCallback);
                    }
                    callback.callbackParams = callbackParams;
                    arrayCallback.push(callback);

                    if(arrayCallback.length > 1){
                        return;
                    }
                }
            }


            //if(value == ""){
            //    value = "forFirefox";
            //}
            var onLoaded = function () {
                avatarList.push(key);
                callbackFuncWithTryCatch();
            };
            var onFileError = function () {
                //Lobby.Utils.printConsoleLog('Load avatar error ! Key: ' + key + " . Value: " + value);
            };

            if(
                Lobby.Utils.isIOS() &&
                (Lobby.Utils.stringContainString(value,LobbyConfig.hostNameOfWebVersion) ||
                Lobby.Utils.stringContainString(value,LobbyConfig.hostNameOfWebVersion2))){
                //alert("cross domain man!");
                var fileDownload = Lobby.Network.getTMPFolder();
                var fileName = Lobby.Network.getFileNameFromURL(value);
                var fullFilePath = fileDownload + fileName;

                //alert('Native URI: ' + fullFilePath);
                //document.getElementById('video').src = nativePath;


                var loadFile2Phaser = function(){
                    value = Lobby.Network.getShortTMPFolder() + fileName;

                    //window.resolveLocalFileSystemURL(
                    // fullFilePath, function(fileSystem){



                    //setTimeout(function(){
                    //  console.log(fileName);
                    //console.log("fileSize :" + fileSize);
                    newLoader.image(key, value);
                    newLoader.onLoadComplete.addOnce(onLoaded);
                    newLoader.onFileError.addOnce(onFileError);
                    //2036-0-b311741d3fa1face5eef439975119530251b94102f42c3e77f33a7bc31f6.jpeg
                    newLoader.start();
                    //}, Lobby.Utils.getRandomInRange(1000,5000));

                };


                //window.resolveLocalFileSystemURL(fullFilePathe, function(){
                //
                //}, function(){
                //
                //});

                window.requestFileSystem(LocalFileSystem.PERSISTENT, 0, function(fileSystem){
                    fileSystem.root.getFile(fullFilePath, { create: false }, function(){
                        //alert("file exist");
                        loadFile2Phaser();
                    }, function(){
                        //alert("file ko exist");
                        Lobby.Network.downloadFile(value,fullFilePath,function(isSuccess,entry){
                            if(isSuccess){

                                //window.resolveLocalFileSystemURL(fullFilePath, function(fileEntry) {
                                //  fileEntry.file(function(fileObj) {
                                loadFile2Phaser();
                                //});
                                //});



                            }
                        });
                    });
                }, function(){}); //of requestFileSystem









            }else {
                //newLoader.crossOrigin = "anonymous";
                newLoader.image(key, value);
                //newLoader.onLoadComplete.addOnce(onLoaded);
                newLoader.onLoadComplete.addOnce(onLoaded);
                newLoader.onFileError.addOnce(onFileError);
                newLoader.start();
            }
        }
        else {
            isJustDownloadOneTime = false;
            callbackFuncWithTryCatch();
        }
    };
    /**
     * Load all avatar and callback when done
     * @param arr avatar array
     * @param callback
     * @param callbackParams
     */
    this.loadAvatarArrayAndCallBackWhenEverythingDone = function (arr, callback, callbackParams) {

        var count = 0;
        var maxThread = arr.length;

        var exit = function () {
            if (count >= maxThread) {

                if (callback != null &&
                    callback != undefined) {
                    callback(callbackParams);
                }
            }
        };
        exit();

        for (var index = 0; index < arr.length; ++index) {
            var item = arr[index];
            that.loadAvatar(
                item.key,
                item.value,
                function () {
                    count++;
                    exit();
                },
                callbackParams);
        }
    };

    /**
     * Deprecated
     * @param key
     * @param valueImage
     * @param valueJson
     * @param callback
     * @param callbackParams
     */
    this.loadResource = function (key, valueImage, valueJson, callback, callbackParams) {
        Lobby.Utils.printConsoleLog("------------------------call loadResource");
        if (my === null) {
            throw "Please init!!!";
        }
        var callbackFuncWithTryCatch = function () {
            try {
                callback(callbackParams);
            }
            catch (ex) {
                Lobby.Utils.printConsoleLog('Exception load resource');
                callback(callbackParams);
            }
        };
        if (!resourceList.contains(key)) {
            newLoader.atlas(key, valueImage, valueJson);
            var onLoaded = function () {
                resourceList.put(key, null);
                callbackFuncWithTryCatch();
            };
            var onFileError = function () {
                Lobby.Utils.printConsoleLog('Load resource error ! Key: ' + key + " . ValueImage: " + valueImage +
                    " . ValueJson: " + valueJson);
            };
            newLoader.onLoadComplete.addOnce(onLoaded);
            newLoader.onFileError.addOnce(onFileError);
            newLoader.start();
            Lobby.Utils.printConsoleLog("Start loader");
        }
        else {
            callbackFuncWithTryCatch();
        }
    };


};
