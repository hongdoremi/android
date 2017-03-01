/**
 * Created by Phan on 8/6/2016.
 */
function Downloader(){
    var that = this;
    var downloadQueue = []; // queue download normal
    var downloadQueueBehide = []; //queue download background
    var download = {
        isZip:true,
        onProgressUpdate:null,
        zipProgressCallback:null,
        onCompleteDownload:null,
        onErrorDownload:null,
        onCRCError:null,
        isCheckCRC:false,
        downloadPath:"",
        fileName:"",
        tempPath:"",
        URI:"",
        id:"",
        isAborted:false,
        isCheckMemory:false,
        amountMemoryWarning:5000,
        allowTimeOut:true,
        fileReceived:false
    }; //download object
    this.currentDownload = null;
    this.failTime = 0;
    this.isDownloading = false;

    /**
     * push id game to queue download normal
     * @param download: object download
     */
    this.pushToQueue = function(download){
        downloadQueue.push(download);
    };
    /**
     * push id game to queue download background
     * @param download: object download
     */
    this.pushToQueueBeHide = function(download){
        downloadQueueBehide.push(download);
    };
    /**
     * handle memory error
     * @param download: object download
     */
    this.handleMemoryError = function(download){
        if(download.onMemoryError) download.onMemoryError();
        that.cancelAllDownload(download, true);
    };
    /**
     * start download
     * @param isForceStart: is force start
     */
    this.startDownload = function(isForceStart){
        if(Lobby.Utils.objectIsNull(isForceStart))
            isForceStart = false;
        if(that.isDownloading
        && isForceStart == false) return;
        console.log("startDownload" + "  isForceStart  " + isForceStart);
        var download = downloadQueue.shift();
        if(Lobby.Utils.objectNotNull(download)){
            that.handleDownload(download);
        }
        else {
            var downloadBeHide = downloadQueueBehide.shift();
            if(Lobby.Utils.objectNotNull(downloadBeHide))
                that.handleDownload(downloadBeHide);
            else
                that.handleQueueComplete();
        }
    };
    /**
     * handle checksum CRC error
     * @param download: object download
     */
    this.handleCRCError = function(download){
        download.isAborted = true;
        download.fileTransfer.abort();
        if(download.onCRCError) download.onCRCError();
        that.download(download);
    };
    /**
     * run next download after download finish a game
     */
    this.nextDownload = function(){
        console.log("nextDownload");
        var download = downloadQueue.shift();
        if(Lobby.Utils.objectNotNull(download)){
            that.handleDownload(download);
        }
        else {
            var downloadBeHide = downloadQueueBehide.shift();
            if(Lobby.Utils.objectNotNull(downloadBeHide))
                that.handleDownload(downloadBeHide);
            else
                that.handleQueueComplete();
        }
    };
    /**
     * handle when 2 queue download complete
     */
    this.handleQueueComplete = function(){
        console.log("Queue finished");
        that.isDownloading = false;
    };
    /**
     * handle when complete a game
     * @param callback: callback after download a game
     */
    this.handleCompleteDownload = function(callback){
        that.failTime = 0;
        callback();
        that.nextDownload();
    };
    /**
     * abort download game background
     * @param id: game id
     * @param callback: callback after abort download game
     * @param isNotNextDownload: true if you want not run next download after abort
     */
    this.abortDownloadBeHide = function(id,callback, isNotNextDownload){
        console.log("abortDownloadBeHide");
        if(that.currentDownload && that.currentDownload.id == id){
            that.currentDownload.isAborted = true;
            if(that.currentDownload.fileTransfer) that.currentDownload.fileTransfer.abort();
            that.currentDownload.isDownloading = false;
            //that.isDownloading = false;
            that.currentDownload.onErrorDownload('abort');
            that.currentDownload = null;
            if(callback) callback();
            if(isNotNextDownload != true)
                that.nextDownload();
        }
        //else{
        //    for(var i = 0;i<downloadQueueBehide.length;i++){
        //        if(downloadQueueBehide[i].id == id){
        //            downloadQueueBehide[i].isAborted = true;
        //            if(downloadQueueBehide[i].fileTransfer) downloadQueueBehide[i].fileTransfer.abort();
        //            downloadQueueBehide[i].isDownloading = false;
        //            downloadQueueBehide[i].onErrorDownload();
        //            downloadQueueBehide.slice(i,1);
        //            if(callback) callback();
        //            break;
        //        }
        //    }
        //}
    };
    /**
     * stop timer handle for time out
     * @param download: download object
     */
    this.stopTimer = function(download){
        if (download.downloadTimer) {
            clearTimeout(download.downloadTimer); //cancel the previous timer.
            download.downloadTimer = null;
        }
    };
    /**
     * remove object download in download queue background
     * @param gameId: game id
     */
    this.removeDownloadBeHideObjectInQueue = function(gameId){
        var downloadObjectBeHide;
        if(downloadQueueBehide.length != 0){
            for(var i = 0 ; i < downloadQueueBehide.length; i++){
                if(downloadQueueBehide[i].id == gameId){
                    //downloadObjectBeHide = downloadQueueBehide[i];
                    //Lobby.Utils.bringObjectToFrontInArray(downloadQueueBehide, downloadObjectBeHide);
                    //downloadObjectBeHide.shift();
                    //downloadQueueBehide.splice(i, 1);
                    Lobby.Utils.splice1Item(downloadQueueBehide,i);
                    break;
                }
            }
        }
    };
    /**
     * call this when download time out
     * @param download: object download
     */
    this.handleTimeOut = function(download){
        console.log("$on time out error");
        download.fileTransfer.abort();
    };
    /**
     * abort download game normal
     * @param id: id game
     * @param callback: callback after abort download game
     * @param isNotNextDownload: true if you want not run next download after abort
     */
    this.abortDownload = function(id,callback, isNotNextDownload){
        if(that.currentDownload && that.currentDownload.id == id){
            if(that.currentDownload.fileReceived){
                return;
            }
            that.currentDownload.isAborted = true;
            if(that.currentDownload.fileTransfer) that.currentDownload.fileTransfer.abort();
            that.currentDownload.isDownloading = false;
            that.currentDownload.onErrorDownload();
            that.currentDownload = null;
            if(callback) callback();
            if(isNotNextDownload != true)
                that.nextDownload();
        }
        else{
            for(var i = 0;i<downloadQueue.length;i++){
                if(downloadQueue[i].id == id){
                    downloadQueue[i].isAborted = true;
                    if(downloadQueue[i].fileTransfer) downloadQueue[i].fileTransfer.abort();
                    downloadQueue[i].isDownloading = false;
                    downloadQueue[i].onErrorDownload();
                    //downloadQueue.splice(i,1);
                    Lobby.Utils.splice1Item(downloadQueue,i);
                    if(callback) callback();
                    break;
                }
            }
        }
    };
    /**
     * handle error download ( call this when download error at mid )
     * @param download: download object
     */
    this.handleErrorDownload = function(download){
        that.stopTimer(download);
        if( download.isAborted) {
            download.isAborted = false;
            return;
        }
        //that.isDownloading = false;
        that.failTime++;
        var restartDownload = function(){
            that.download(download);
            //if(Lobby.Utils.objectNotNull(download)
            //&&    Lobby.Utils.objectNotNull(download.startDownload))
            //    download.startDownload();
        };
        var cancel = function(){
            that.cancelAllDownload(download, true);
        };
        if(that.failTime < 5){
            if(!LobbyConfig.downloadGameInfo[download.id].isDownloadingBeHide) LobbyC.MainMenu.showNotificationPopupV2("Download failed","Do you want to retry download?",restartDownload,cancel);
            else{
                cancel();
            }
        }else{
            cancel();
            if(!LobbyConfig.downloadGameInfo[download.id].isDownloadingBeHide) LobbyC.MainMenu.showNotificationPopup("Network error",LobbyLanguageConstant.CANNOT_CONNECT_TO_SERVER);
        }
    };
    /**
     * cancel all download ( 2 queue ), regulary call at logout
     * @param download: current download object
     * @param isStopEntireDownload: is stop entire download?
     */
    this.cancelAllDownload = function(download, isStopEntireDownload){
        //console.log("$Network error, aborting all download.");
        if(Lobby.Utils.objectIsNull(download)) {
            download = that.currentDownload;
        }
        if(Lobby.Utils.objectNotNull(download)){
            download.isAborted = true;
            download.fileTransfer.abort();
            download.onErrorDownload();
        }
        download = downloadQueue.shift();
        while(Lobby.Utils.objectNotNull(download)){
            download.onErrorDownload();
            download = downloadQueue.shift();
        }

        if(isStopEntireDownload) {
            download = downloadQueueBehide.shift();
            while(Lobby.Utils.objectNotNull(download)){
                download.onErrorDownload();
                download = downloadQueueBehide.shift();
            }
            that.isDownloading = false;
        }
    };
    /**
     * call this will download game
     * @param download: download object
     */
    this.download = function(download){

        var fileTransfer = new FileTransfer();
        download.fileTransfer = fileTransfer;

        if(!download.allowTimeOut) {
            download.downloadTimer = null;
        }
        else {
            download.downloadTimer = setTimeout(function () {
                that.handleTimeOut(download);
            }, LobbyConstant.TIMEOUT_4_REQUEST);
        }
        fileTransfer.onprogress = function(progressEvent) {
            if (progressEvent.lengthComputable) {
                download.onProgressUpdate(Lobby.Utils.floatToIntOptimize((progressEvent.loaded / progressEvent.total)*96));
            } else {
            }
            if(download.allowTimeOut){
                that.stopTimer(download);
                download.downloadTimer = setTimeout(function () {
                    that.handleTimeOut(download);
                }, LobbyConstant.TIMEOUT_4_REQUEST);
            }
        };
        fileTransfer.download(
            encodeURI(download.URI),
            download.tempPath+download.fileName,
            function(entry) {
                console.log("$Download completed");
                that.stopTimer(download);
                var afterReceivedFile = function(){
                    download.fileReceived = true;
                    if(download.isZip){
                        zip.unzip(entry.toURL(), download.downloadPath, function(result){
                            if(result === 0) {
                                download.onProgressUpdate(99);
                                entry.remove(function(){
                                    download.onProgressUpdate(100);
                                    that.handleCompleteDownload(download.onCompleteDownload);
                                });
                            }else that.handleErrorDownload(download.onErrorDownload);
                        }, download.zipProgressCallback);
                    }
                    else {
                        that.handleCompleteDownload(download.onCompleteDownload);
                    }
                };
                if(download.isCheckCRC){
                    var crcSuccess = function(md5){
                        console.log(download.id+" : "+md5);
                        //download.onProgressUpdate(98);
                        //afterReceivedFile();
                        //return;
                        if(LobbyConfig.downloadGameInfo[download.id].md5 === md5){
                            download.onProgressUpdate(98);
                            afterReceivedFile();
                        }else{
                            that.handleCRCError(download);
                            console.log(download.id + " 's md5 mismatch");
                        }
                    };
                    var crcFailed = function(er){
                        that.handleCRCError(download);
                    };
                    md5chksum.file(entry, crcSuccess, crcFailed);
                }else{
                    download.onProgressUpdate(98);
                    afterReceivedFile();
                }
            },
            function(error) {
                console.log(error);
                that.handleErrorDownload(download)
            },
            true,
            {
                headers: {
                    "Authorization": "Basic dGVzdHVzZXJuYW1lOnRlc3RwYXNzd29yZA=="
                }
            }
        );
    };
    /**
     * handle before call download
     * @param download: download object
     */
    this.handleDownload = function(download){
        console.log("handleDownload" + download.id);
        that.isDownloading = true;
        var startDownload = function(){
            that.currentDownload = download;
            that.download(download);
        };
        download.startDownload = startDownload;
        if(download.isCheckMemory){
            Lobby.Utils.checkFreeSpace(download.amountMemoryWarning,function(isEnoughSpace){
                if(isEnoughSpace){
                    console.log("Space check success");
                    startDownload();
                }else{
                    that.handleMemoryError(download);
                }
            },function(){
                console.log("Get memory failed");
                startDownload();
            })
        }
        else {
            that.isDownloading = true;
            that.currentDownload = download;
            that.download(download);
        }
    }
}

