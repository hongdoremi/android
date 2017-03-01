/**
 * Created by Phuoc Tran on 7/20/2015.
 */
var MusicManager = new function () {
    var miniBackgroundMusic = null;
    var fullBackgroundMusic = null;
    var newLoader;
    /**
     * Deprecated
     * @param my
     * @param context
     * @param initResource
     * @param fullResourceLocation
     */
    this.initBackgroundMusic = function (my, context, initResource, fullResourceLocation) {
        //miniBackgroundMusic = context.add.audio(initResource);
        //newLoader = new Phaser.Loader(context);
        //newLoader.audio('background-music', fullResourceLocation);
        //var onLoaded = function () {
        //    fullBackgroundMusic = context.add.audio('background-music');
        //};
        //newLoader.onLoadComplete.addOnce(onLoaded);
        //newLoader.start();
    };
    /**
     * Start looping background music
     * @param my
     */
    this.playBackgroundMusic = function (my) {
        if(!LobbyConfig.isTestAlgorithmMode) {
            ManagerForSound.loop(my, 'background-music');
        }
        //if (fullBackgroundMusic != null) {
        //    fullBackgroundMusic.play("", 0, 1, true, false);
        //} else if (miniBackgroundMusic != null) {
        //    miniBackgroundMusic.onLoop.add(function () {
        //        if (fullBackgroundMusic != null) {
        //            miniBackgroundMusic.stop();
        //            fullBackgroundMusic.play("", 0, 1, true, false);
        //        }
        //    });
        //    miniBackgroundMusic.play("", 0, 1, true, false);
        //}
    };
    /**
     * Stop playing background music
     * @param my
     */
    this.stopBackgroundMusic = function (my) {
        ManagerForSound.stop(my,'background-music');
        //if (fullBackgroundMusic != null) {
        //    fullBackgroundMusic.stop();
        //}
        //if (miniBackgroundMusic != null) {
        //    miniBackgroundMusic.stop();
        //}
    };
};