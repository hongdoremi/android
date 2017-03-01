var ManagerForSound = new function () {
    var that = this;
    var webMusicList = {};
    this.loopMediaflag = true;

    var queueSound = [];
    //this.getSound = function(my,soundId){
    //    //if(isWeb){
    //    //    return my.add.audio(soundId);
    //    //}
    //    //return mediaList[soundId];
    //};
    /**
     * Add sound to queue
     * @param soundId id of sound
     * @param soundSrc path of sound
     */
    this.addSoundToQueue = function (soundId, soundSrc){
        queueSound.push({
            soundId: soundId,
            soundSrc: soundSrc
        });
    };
    /**
     * Load sound from queue
     * @param my
     * @param callBack callback when completed
     * @param isFromGame is from game
     */
    this.startLoadSoundFromQueue = function (my, callBack, isFromGame){
        var iCurrentSoundLoaded = 0;
        for(var i = 0; i < queueSound.length; i++){
            this.loadSound(my, queueSound[i].soundId, queueSound[i].soundSrc, isFromGame, function(){
                iCurrentSoundLoaded++;
                if(LobbyConfig.isDebug) {
                    console.log("SOUND REMAIN: " + iCurrentSoundLoaded);
                }
                if(iCurrentSoundLoaded >= queueSound.length){
                    queueSound = [];
                    if(Lobby.Utils.objectNotNull(callBack)){
                        callBack();
                    }
                }
            });
        }
    };
    /**
     * Clear queue
     */
    this.clearQueue = function(){
        queueSound = [];
    };
    /**
     * Load a sound
     * @param my
     * @param soundId if of sound
     * @param soundSrc path to sound
     * @param isFromGame is from game
     * @param callback
     */
    this.loadSound = function (my, soundId, soundSrc, isFromGame, callback) {
        if (isFromGame) {
            Manager4Sound.listSoundInGame.push(soundId);
        }
        if ((typeof cordova === "undefined")) {
            my.load.audio(soundId, soundSrc);
            if(Lobby.Utils.objectNotNull(callback)){
                callback();
            }
            return;
        }
        var prefix = "";
        var path = "";
        if (LobbyC.MainMenu.playingGame === LobbyConstant.isInGame) prefix = LobbyC.GameSlot.getPrefixPathSound();
        if(Lobby.Utils.isIOS()) {
            path = that.getAssetsPath(prefix + soundSrc);
        }else {
            path = prefix + soundSrc;
        }
        window.plugins.NativeAudio.preloadComplex( soundId, path, 1, 1, 0,
            function(msg){
                if(LobbyConfig.isDebug) {
                    console.log(msg);
                }
                if(Lobby.Utils.objectNotNull(callback)){
                    callback();
                }
            },
            function(msg){
                if(Lobby.Utils.objectNotNull(callback)){
                    callback();
                }
            }
        );
    };
    /**
     * Handle media success
     */
    this.mediaSuccess = function () {
        if(LobbyConfig.isDebug) {
            console.log('Media Success');
        }
    };
    /**
     * Handle on load media error
     * @param e
     */
    this.mediaError = function (e) {
        if(LobbyConfig.isDebug) {
            console.log('Media Error');
            console.log(JSON.stringify(e));
        }
    };
    /**
     * Play a sound
     * @param my
     * @param soundId id of sound
     */
    this.play = function (my, soundId) {
        if(LobbyConfig.isTestAlgorithmMode) {
            return;
        }
        if (this.checkCanPlay(soundId)) {

                if ((typeof cordova === "undefined")) {
                    if (Lobby.Utils.objectIsNull(webMusicList[soundId])) webMusicList[soundId] = my.add.audio(soundId);
                    webMusicList[soundId].play();
                    return;
                }
            window.plugins.NativeAudio.play(soundId);
        }
    };
    /**
     * Check if allow to play sound
     * @param soundId id of sound
     * @returns {*|boolean}
     */
    this.checkCanPlay = function (soundId) {
        if (soundId === "background-music" ||
            (Lobby.Utils.objectNotNull(Manager4Sound) &&
            Lobby.Utils.objectNotNull(Manager4Sound.listSoundInGame) &&
            Manager4Sound.listSoundInGame.indexOf(soundId) > -1)) {
            return (Lobby.Utils.objectNotNull(LobbyC.MainMenu._userSetting.backgroundMusic) &&
            LobbyC.MainMenu._userSetting.backgroundMusic === "1");
        } else {
            return ((Lobby.Utils.objectNotNull(LobbyC.MainMenu._userSetting.soundEffect) &&
            LobbyC.MainMenu._userSetting.soundEffect === "1"));
        }
    };
    /**
     * Stop a sound
     * @param my
     * @param soundId id of sound
     */
    this.stop = function (my, soundId) {
        if ((typeof cordova === "undefined")) {
            if (Lobby.Utils.objectIsNull(webMusicList[soundId])) webMusicList[soundId] = my.add.audio(soundId);
            webMusicList[soundId].stop();
            return;
        }
        window.plugins.NativeAudio.stop(soundId);
    };
    /**
     * Loop a sound
     * @param my
     * @param soundId id of sound
     */
    this.loop = function (my, soundId) {
        if(LobbyConfig.isTestAlgorithmMode) {
            return;
        }
        if ((typeof cordova === "undefined")) {
            if (Lobby.Utils.objectIsNull(webMusicList[soundId])) webMusicList[soundId] = my.add.audio(soundId);
            webMusicList[soundId].play("", 0, 1, true, false);
            return;
        }
        window.plugins.NativeAudio.loop(soundId);
    };
    /**
     * Set volume for a sound
     * @param my
     * @param soundId id of sound
     * @param volume volume of sound,  0 - 2
     */
    this.setVolume = function (my, soundId, volume) {
        if ((typeof cordova === "undefined")) {
            if (Lobby.Utils.objectIsNull(webMusicList[soundId])) webMusicList[soundId] = my.add.audio(soundId);
            webMusicList[soundId].volume = volume;
            return;
        }
        window.plugins.NativeAudio.setVolumeForComplexAsset(soundId, volume);
    };
    /**
     * Unload a sound
     * @param my
     * @param soundId  id of sound
     */
    this.unloadSound = function (my, soundId) {
        if (Lobby.Utils.isWeb()) {
            if (Lobby.Utils.objectNotNull(webMusicList[soundId])) {
                webMusicList[soundId].destroy();
                webMusicList[soundId] = null;
            }
            my.cache.removeSound(soundId);
        }
        else {
            window.plugins.NativeAudio.unload(soundId,null,null);
        }
    };
    /**
     * Pause all sound
     */
    this.pauseAll = function () {
        if (!Lobby.Utils.isWeb()) {
            for (var key in webMusicList) {
                if (webMusicList[key] != null) {
                    webMusicList[key].pause();
                }
            }
        }
    };
    /**
     * Resume all sound if was playing
     */
    this.resumeAll = function(){
        if (!Lobby.Utils.isWeb()) {
            for (var key in webMusicList) {
                if (webMusicList[key] != null) {
                    webMusicList[key].resume();
                }
            }
        }
    };
    /**
     * Get sound asset path
     * @param url
     * @returns {*}
     */
    this.getAssetsPath = function(url){
        var path;
        if (cordova.platformId === 'android' && url.indexOf("file:") === -1) {
            path =  "www/" + url;
          return path;
        }
        if(cordova.platformId === 'ios' && url.indexOf(Lobby.Network.getShortDocumentFolder()) === -1){
            path = cordova.file.applicationDirectory + "www/" + url;
            path = path.replace("file://","");
          return path;
        }
        if(cordova.platformId === 'ios' && Lobby.Utils.stringContainString(url, "file://")){
          url = url.replace("file://","");
        }
        return url;
    };
};
/**
 * Cordova media framework, deprecated
 * @param audioSrc
 * @constructor
 */
function MediaPlus(audioSrc) {
    this.allowLoop = false;
    this.stopFlag = false;
    this.isPause = false;
    var url = audioSrc;
    var that = this;
    var media;
    if ((cordova.platformId === 'android' && url.indexOf("file:") === -1) || (cordova.platformId === 'ios' && url.indexOf("/Library/NoCloud/") === -1)) {
        url = cordova.file.applicationDirectory + "www/"+ url;
    }

    var mediaLoop = function (status) {
        if(status === Media.MEDIA_PAUSED){
            that.isPause = true;
        }
        if (status === Media.MEDIA_STOPPED) {
            if (!that.stopFlag && that.allowLoop) {
                media.play();
            }
        }
        //else if (status === Media.MEDIA_RUNNING){
        //    if(!ManagerForSound.loopMediaflag){
        //        media.stop();
        //    }
        //}

    };
    media = new Media(url, null, null, mediaLoop);
    this.resume = function(){
        if(that.isPause){
            that.isPause = false;
            that.play();
        }
    };
    this.setVolume = function (volume) {
        volume /= 2;
        media.setVolume(volume);
    };
    this.play = function () {
        that.stopFlag = false;
        media.play();
    };
    this.stop = function () {
        that.stopFlag = true;
        media.stop();
    };
    this.loop = function () {
        that.allowLoop = true;
        that.stopFlag = false;
        media.play();
    };
    this.destroy = function () {
        media.release();
    };
    this.pause = function () {
        media.pause();
    }

}
