/**
 * Created by tuynu on 7/19/2016.
 */
var ManagerForDownloadGameSlot = new function () {
    var that = this;
    this.downloadAndUnZipSuccess = null;
    this.downloadError = null;
    this.progressCallback = null;
    this.downloader = null;
    var downloadingQueue = [];
    var downloadingQueueBehide = [];

    /**
     * Set debug
     * @type {boolean}
     */

    this.isForceNoDownload = false;
    //this.isForceNoDownload = true;

    //this.enableHidedDownload = false;
    this.enableHidedDownload = true;

    //this.isCheckCRC = false;
    this.isCheckCRC = true;

    this.forceUpdateNewVersion = false;
    //this.forceUpdateNewVersion = true;

    //this.isCheckMemory = false;
    this.isCheckMemory = true;

    this.allowTimeOut = true;
    //this.allowTimeOut = false;


    /**
     * Init a downloader
     */
    this.init = function(){

        if(LobbyConfig.isTestAlgorithmMode){
            this.isForceNoDownload = true;
        }

        that.downloader = new Downloader();
        //var d = Lobby.Utils.getObjFromLocalStorage("debug");
        //if(d!=null){
        //    that.isCheckMemory = d.isCheckMemory;
        //    that.forceUpdateNewVersion = d.forceUpdateNewVersion;
        //    that.isCheckCRC = d.isCheckCRC;
        //    that.enableHidedDownload = d.enableHidedDownload;
        //    that.isForceNoDownload = d.isForceNoDownload;
        //    that.allowTimeOut = d.allowTimeOut;
        //}else{
        //    d = {};
        //    d.allowTimeOut = that.allowTimeOut;
        //    d.isCheckMemory = that.isCheckMemory;
        //    d.forceUpdateNewVersion = that.forceUpdateNewVersion;
        //    d.isCheckCRC = that.isCheckCRC;
        //    d.enableHidedDownload = that.enableHidedDownload;
        //    d.isForceNoDownload = that.isForceNoDownload;
        //    Lobby.Utils.setObjToLocalStorage("debug",d);
        //}
    };
    /**
     * Delete a game
     * @param gameId id of game
     * @param callbackSuccess callback delete success
     * @param callbackFail callback delete fail
     */
    this.deleteBundleGame = function(gameId,callbackSuccess,callbackFail){
        window.resolveLocalFileSystemURL(Lobby.Network.getDocumentFolder()  + "img/slotgamedata/" + gameId, function(entry){
            entry.removeRecursively(function() {
                callbackSuccess();
            }, function(er){
                callbackFail(er);
            });
        }, function(){
            callbackFail("Error resource not found");
        });
    };
    /**
     * Check if game exists
     * @param gameId id of game
     * @param callbackExists callback when found with entry file param
     * @param callbackNotFound callback when not found
     */
    this.checkIfGameExists = function(gameId,callbackExists, callbackNotFound){
        if(that.isForceNoDownload){
            callbackExists();
            return;
        }
        if(gameId === 'nezha') {
            callbackExists();
            return;
        }
        if(Lobby.Utils.isWeb()) {
            callbackExists();
            return;
        }
        window.resolveLocalFileSystemURL(Lobby.Network.getDocumentFolder()  + "img/slotgamedata/" + gameId + "/version.txt", callbackExists, callbackNotFound);
    };
    /**
     * Test, un used
     * @param gameId
     * @param callbackSuccess
     * @param callbackFail
     * @param callbackProgress
     */
    this.forceDownload = function (gameId, callbackSuccess, callbackFail, callbackProgress) {
        that.downloadBundle(gameId, callbackSuccess, callbackFail, callbackProgress);
    };
    /**
     * Save a state of whether game is downloading to queue
     * @param gameId id of game
     * @param downloadState state of downloading or not
     * @param isDownloadedBeHide is game downloading behide
     */
    this.saveDownloadingQueue = function(gameId, downloadState, isDownloadedBeHide){
        LobbyConfig.downloadGameInfo[gameId].isDownloading  = downloadState;
        var index = downloadingQueue.indexOf(gameId);
        if(downloadState && index==-1){
            downloadingQueue.push(gameId);
        }
        if(!downloadState && index > -1){
            //downloadingQueue.splice(index,1);
            Lobby.Utils.splice1Item(downloadingQueue,index);
        }
        Lobby.Utils.setObjToLocalStorage("downloadingQueue",downloadingQueue);
    };
    /**
     * Save a state of whether behide queue game is downloading
     * @param gameId
     * @param downloadState
     */
    this.saveDownloadingQueueBeHide = function(gameId, downloadState){
        console.log("saveDownloadingQueueBeHide " + gameId + "    " + downloadState);
        LobbyConfig.downloadGameInfo[gameId].isDownloadingBeHide  = downloadState;
        var indexBehide = downloadingQueueBehide.indexOf(gameId);
        if(downloadState && indexBehide === -1){
            downloadingQueueBehide.push(gameId);
        }
        if(!downloadState && indexBehide > -1){
            //downloadingQueueBehide.splice(indexBehide,1);
            Lobby.Utils.splice1Item(downloadingQueueBehide,indexBehide);
        }
        //Lobby.Utils.setObjToLocalStorage("downloadingQueueBehide",downloadingQueueBehide);
    };
    /**
     * Test, un used
     * @param array
     */
    this.saveDownloadingQueueWithArray = function(array){
        if(Lobby.Utils.objectNotNull(array))
        Lobby.Utils.setObjToLocalStorage("downloadingQueue",downloadingQueue);
    };
    /**
     * Teast, un used
     * @param array
     */
    this.saveDownloadingQueueBeHideWithArray = function(array){
        if(Lobby.Utils.objectNotNull(array))
            downloadingQueueBehide = array;
        //Lobby.Utils.setObjToLocalStorage("downloadingQueueBehide",downloadingQueueBehide);
    };
    /**
     * Cancel all download
     */
    this.cancelAllDownload = function(){
        that.downloader.cancelAllDownload();
    };
    /**
     * Switch a download game in behide queue to normal queue
     * @param gameId
     */
    this.swithGameDownloadQueueBeHideToDownloadQueueNormal = function(gameId)
    {
        this.saveDownloadingQueueBeHide(gameId, false);
        this.saveDownloadingQueue(gameId, true);
    };
    /**
     * Remove a game from behide queue
     * @param gameId
     */
    this.removeDownloadBeHideObjectInQueue = function(gameId){
        if(LobbyConfig.isDebug) {
            console.log("removeDownloadBeHideObjectInQueue:" + gameId);
        }
        that.saveDownloadingQueueBeHide(gameId, false);
        that.downloader.removeDownloadBeHideObjectInQueue(gameId);
        //Lobby.Utils.setObjToLocalStorage("downloadingQueueBehide",downloadingQueueBehide);
    };
    /**
     * Get downloading queue from ram
     * @returns {Array}
     */
    this.getDownloadingQueueNotFromCache = function()
    {
        if(Lobby.Utils.objectIsNull(downloadingQueue))
        if(Lobby.Utils.objectIsNull(downloadingQueue))
            downloadingQueue = [];
        return downloadingQueue;
    };
    /**
     * Get downloading behide queue from ram
     * @returns {Array}
     */
    this.getDownloadingQueueBeHideNotFromCache = function()
    {
        if(Lobby.Utils.objectIsNull(downloadingQueueBehide))
            downloadingQueueBehide = [];
        return downloadingQueueBehide;
    };
    /**
     * Get downloading queue from cache
     * @returns {*}
     */
    this.getDownloadingQueue = function(){
        var queue = Lobby.Utils.getObjFromLocalStorage("downloadingQueue");
        return queue;
    };
    /**
     * Get downloading behind queue from cache, un used
     * @returns {*}
     */
    this.getDownloadingQueueBeHide = function(){
        var queue = Lobby.Utils.getObjFromLocalStorage("downloadingQueueBehide");
        Lobby.Utils.setObjToLocalStorage("downloadingQueueBehide",downloadingQueueBehide);
        return queue;
    };
    /**
     * Abort a download behide
     * @param gameId
     * @param callback
     * @param isNotNextDownLoad is start next download after abort
     */
    this.abortDownloadBeHide = function(gameId, callback, isNotNextDownLoad){
        that.downloader.abortDownloadBeHide(gameId,callback,isNotNextDownLoad);
    };
    /**
     * Abort a download
     * @param gameId
     * @param callback
     * @param isNotNextDownLoad is start next download after abort
     */
    this.abortDownload = function(gameId, callback, isNotNextDownLoad){
        that.downloader.abortDownload(gameId,callback,isNotNextDownLoad);
    };
    /**
     * Download a game
     * @param gameId
     * @param callbackSuccess
     * @param callbackFail
     * @param callbackProgress
     * @param callbackCRCFailed
     * @param callbackMemoryError
     * @param isDownloadBeHide is this a download behide
     * @param isForceStart is force start
     */
    this.downloadBundle = function (gameId, callbackSuccess, callbackFail, callbackProgress, callbackCRCFailed,callbackMemoryError,isDownloadBeHide,isForceStart) {
        if(LobbyConfig.isDebug) {
            console.log("downloadBundle " + gameId);
        }
        var fileName = gameId + ".zip";
        var downloadUri = LobbyConfig.downloadServerUrl + LobbyConfig.downloadGameInfo[gameId].version  + "/" + fileName;

        var uri = encodeURI(downloadUri);

        //resolveLocalFileSystemURL(Lobby.Network.getDocumentFolder(), function (entry) {
            var initAndDownload = function(){
                if(LobbyConfig.isDebug) {
                    console.log("initAndDownload " + gameId);
                }
                var bundlePath = Lobby.Network.getDocumentFolder() + "img/slotgamedata/";
                var download = {
                    isZip:true,
                    onProgressUpdate:callbackProgress,
                    zipProgressCallback:function(){},
                    onCompleteDownload:function(){
                        if(isDownloadBeHide != true)
                            LobbyConfig.downloadGameInfo[gameId].isDownloaded = true;
                        callbackSuccess();
                    },
                    onErrorDownload:callbackFail,
                    downloadPath:bundlePath,
                    onCRCError:callbackCRCFailed,
                    fileName:fileName,
                    tempPath:Lobby.Network.getDocumentFolder(),
                    URI:uri,
                    id:gameId,
                    isAborted:false,
                    isCheckCRC:that.isCheckCRC,
                    isCheckMemory:that.isCheckMemory,
                    amountMemoryWarning:50000,
                    onMemoryError: callbackMemoryError,
                    allowTimeOut:that.allowTimeOut,
                    fileReceived:false
                };
                if(isDownloadBeHide)
                    that.downloader.pushToQueueBeHide(download);
                else
                    that.downloader.pushToQueue(download);
                that.downloader.startDownload(isForceStart);
            };
            var errorGetDir = function(er){
                if(LobbyConfig.isDebug) {
                    console.log("Error while getting dir " + er);
                }
            };

            //entry.getDirectory("img",{create:true}, function(dirEntry){
            //    dirEntry.getDirectory("slotgamedata",{create:true}, function(dataEntry){
                    initAndDownload();
            //    },errorGetDir);
            //},errorGetDir);
        //});

    };
    /**
     * List a dir in path, un used
     * @param path
     */
    this.listDir = function (path) {
        window.resolveLocalFileSystemURL(path,
            function (fileSystem) {
                var reader = fileSystem.createReader();
                reader.readEntries(
                    function (entries) {
                        console.log(entries);
                        //for(var i =0;i<entries.length;i++){
                        //    that.listDir(entries[i].nativeURL)
                        //}
                    },
                    function (err) {
                        console.log(err);
                    }
                );
            }, function (err) {
                console.log(err);
            }
        );
    };
    /**
     * Check for file exists, unsed
     * @param path
     * @param callbackExists
     * @param callbackNotFound
     * @param callbackError
     */
    this.checkIfFileExists = function (path, callbackExists, callbackNotFound, callbackError) {
        try {
            var reader = new FileReader();
            reader.onloadend = function (evt) {

                if (evt.target.result == null) {
                    callbackNotFound();
                } else {
                    callbackExists();
                }
            };
            reader.readAsDataURL(path);
        } catch (ex) {
            if (Lobby.Utils.objectNotNull(callbackError)) callbackError(ex);
        }
    };

    that.init();







};
