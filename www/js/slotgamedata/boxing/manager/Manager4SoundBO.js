/**
 * Created by Phuoc Tran on 9/16/2015.
 */
"use strict";
/**
 * CLASS MANAGES SOUND
 * @constructor
 */
    function Manager4SoundBOClass() {
    var newLoader;
    var that = this;
    var my;

    /**
     * Init Game Object
     * @param game: Phaser game Object
     */
    this.init = function (game) {
        my = game;
    };

    this.unload = function(){


    };
    /**
     * Init all background Sound
     */
    this.initializeAllBackgroundSound = function(){
        my.currentSoundTrack = "";
        my.currentGameSlot.s_oSoundTrackDoubleUp = "soundtrack_dbUp";
        my.currentGameSlot.s_oSoundTrack = "soundtrack";
        my.currentGameSlot.s_oSoundTrackBonusFreeSpin = "soundtrack_bonus";
    };

    /***
     * Playing Main Game Sound
     */
    this.playStandardBackgroundMusic = function () {
        if (my.currentGameSlot.GameConstant.viewFlowMusicManager) {
            console.log("MusicManager playStandardBackgroundMusic");
        }
        if(settings.DISABLE_SOUND_MOBILE != false){
            return;
        }
        ManagerForSound.stop(my, my.currentGameSlot.s_oSoundTrackDoubleUp);
        ManagerForSound.setVolume(my, my.currentGameSlot.s_oSoundTrack,1);
        if(my.currentSoundTrack != my.currentGameSlot.s_oSoundTrack) {
            ManagerForSound.loop(my, my.currentGameSlot.s_oSoundTrack);
            my.currentSoundTrack = my.currentGameSlot.s_oSoundTrack;
        }
        ManagerForSound.stop(my, my.currentGameSlot.s_oSoundTrackBonusFreeSpin);
    };

    /**
     * Play Free Spin Sound
     */
    this.playFreeSpinBackgroundMusic = function () {
        if (my.currentGameSlot.GameConstant.viewFlowMusicManager) {
            console.log("MusicManager playFreeSpinBackgroundMusic");
        }
        if(settings.DISABLE_SOUND_MOBILE != false){
            return;
        }
        ManagerForSound.stop(my, my.currentGameSlot.s_oSoundTrackDoubleUp);
        ManagerForSound.stop(my, my.currentGameSlot.s_oSoundTrack);
        ManagerForSound.setVolume(my, my.currentGameSlot.s_oSoundTrackBonusFreeSpin,1);
        if(my.currentSoundTrack != my.currentGameSlot.s_oSoundTrackBonusFreeSpin) {
            ManagerForSound.loop(my, my.currentGameSlot.s_oSoundTrackBonusFreeSpin);
            my.currentSoundTrack = my.currentGameSlot.s_oSoundTrackBonusFreeSpin;
        }
    };
    /**
     * Play Double Up Sound
     */
    this.playDoubleUpBackgroundMusic = function () {
        if (my.currentGameSlot.GameConstant.viewFlowMusicManager) {
            console.log("MusicManager playFreeSpinBackgroundMusic");
        }
        if(settings.DISABLE_SOUND_MOBILE != false){
            return;
        }
        ManagerForSound.setVolume(my, my.currentGameSlot.s_oSoundTrackDoubleUp,1);
        if(my.currentSoundTrack != my.currentGameSlot.s_oSoundTrackDoubleUp) {
            ManagerForSound.loop(my, my.currentGameSlot.s_oSoundTrackDoubleUp);
            my.currentSoundTrack = my.currentGameSlot.s_oSoundTrackDoubleUp;
        }
        ManagerForSound.stop(my, my.currentGameSlot.s_oSoundTrack);
        ManagerForSound.stop(my, my.currentGameSlot.s_oSoundTrackBonusFreeSpin);
    };

    /**
     * Turn off all background Sound
     */
    this.turnOffAllBackgroundMusic = function () {
        if (my.currentGameSlot.GameConstant.viewFlowMusicManager) {
            console.log("MusicManager turnOffAllBackgroundMusic");
        }
        if(settings.DISABLE_SOUND_MOBILE != false){
            return;
        }
        ManagerForSound.stop(my, my.currentGameSlot.s_oSoundTrackDoubleUp);
        ManagerForSound.stop(my, my.currentGameSlot.s_oSoundTrack);
        ManagerForSound.stop(my, my.currentGameSlot.s_oSoundTrackBonusFreeSpin);
        my.currentSoundTrack = "";
    };
    /**
     * Play current background Sound
     */
    this.playBackgroundMusic = function () {
        
        if(settings.IS_PLAYING_WIN_PANEL){
            return;
        }

        if(settings.DISABLE_SOUND_MOBILE != false){
            return;
        }


        if (Manager4State.getCurrentState() == my.currentGameSlot.GameConstant.State.MainGame) {
            this.playStandardBackgroundMusic();
        } else if(Manager4State.getCurrentState() == my.currentGameSlot.GameConstant.State.DoubleUp){
            this.playDoubleUpBackgroundMusic();
        }else if(Manager4State.getCurrentState() == my.currentGameSlot.GameConstant.State.Bonus){
            this.playDoubleUpBackgroundMusic();
        }
        else{
            this.playFreeSpinBackgroundMusic();
        }
    };
    /**
     * Set volumn for BG Sound
     * @param volume: number of volume
     */
    this.setVolumeBackgroundMusic = function (volume) {
        if (Manager4State.getCurrentState() == my.currentGameSlot.GameConstant.State.MainGame) {
            if (settings.DISABLE_SOUND_MOBILE === false) {
                ManagerForSound.stop(my, my.currentGameSlot.s_oSoundTrackDoubleUp);
                ManagerForSound.setVolume(my, my.currentGameSlot.s_oSoundTrack, volume);
                ManagerForSound.stop(my, my.currentGameSlot.s_oSoundTrackBonusFreeSpin);
            }
        } else if (Manager4State.getCurrentState() == my.currentGameSlot.GameConstant.State.DoubleUp) {
            if (settings.DISABLE_SOUND_MOBILE === false) {
                ManagerForSound.stop(my, my.currentGameSlot.s_oSoundTrack);
                ManagerForSound.setVolume(my, my.currentGameSlot.s_oSoundTrackDoubleUp, volume);
                ManagerForSound.stop(my, my.currentGameSlot.s_oSoundTrackBonusFreeSpin);
            }
        }
        else if (Manager4State.getCurrentState() == my.currentGameSlot.GameConstant.State.Bonus) {
            if (settings.DISABLE_SOUND_MOBILE === false) {
                ManagerForSound.stop(my, my.currentGameSlot.s_oSoundTrackDoubleUp);
                ManagerForSound.stop(my, my.currentGameSlot.s_oSoundTrack);
                ManagerForSound.stop(my, my.currentGameSlot.s_oSoundTrackBonusFreeSpin);
            }
        }
        else {
            if (settings.DISABLE_SOUND_MOBILE === false) {
                ManagerForSound.stop(my, my.currentGameSlot.s_oSoundTrackDoubleUp);
                ManagerForSound.setVolume(my, my.currentGameSlot.s_oSoundTrackBonusFreeSpin, volume);
                ManagerForSound.stop(my, my.currentGameSlot.s_oSoundTrack);
            }
        }

    };

    /**
     * Play Spin Sound
     */
    this.playSpin = function(){
        if (settings.DISABLE_SOUND_MOBILE === false) {
            ManagerForSound.play(my, "spin");
        }
    };
    /**
     * Play Reel Stop Sound
     * @returns {null} if it's in disable Sound Mod
     */
    this.playReelStop = function(){
        if (settings.DISABLE_SOUND_MOBILE === true) {
            return;
        }
        ManagerForSound.play(my, "reel_stop");
        ManagerForSound.play(my, "reel_stop");
    };
    /**
     * Play Reel contains Scatter Stop Sound
     * @returns {null} if it's in disable Sound Mod
     */
    this.playScatterStop = function(){
        if (settings.DISABLE_SOUND_MOBILE === true) {
            return;
        }
        ManagerForSound.play(my, "scatterStop");
        ManagerForSound.play(my, "scatterStop");
    };
    /**
     * Play symbol Animation Sound
     * @param iSymbol: symbol value
     * @returns name of Sound in cache or {null} if it's in disable Sound Mod
     */
    this.playSymbolAnimation = function(iSymbol){

        if(settings.DISABLE_SOUND_MOBILE != false){
            return null;
        }

        var _oCurWinSound = null;
        switch (iSymbol){
            case 0:{
                _oCurWinSound = "symbol-0";
                break;
            }
            case 1:
            case 2:
            case 3:{
                _oCurWinSound = "symbol-1-2-3";
                break;
            }
            case 4:
            case 5:{
                _oCurWinSound = "symbol-4-5";
                break;
            }
            case 6:
            case 7:{
                _oCurWinSound = "symbol-6-7";
                break;
            }
            case 8:{
                _oCurWinSound = "symbol-8";
                break;
            }
            case 9:
            case 10:{
                _oCurWinSound = "symbol-9-10";
                break;
            }
            case 11:{
                _oCurWinSound = "symbol-11";
                break;
            }
            case 12:{
                _oCurWinSound = "symbol-12";
                break;
            }
            default :{
                _oCurWinSound = "symbol-0";
            }

        }
        ManagerForSound.play(my, _oCurWinSound);
        return _oCurWinSound;

    };
    /**
     * Play Total Win Sound
     * @returns {null} if it's in disable Sound Mod
     */
    this.playTotalWin = function(){

        if(settings.DISABLE_SOUND_MOBILE != false ){
            return null;
        }
        ManagerForSound.play(my, "tot_win");
    };
    /**
     * Stop Total Win Sound
     */
    this.stopTotalWin = function(){
        ManagerForSound.stop(my, "tot_win");
    };
    /**
     * Play Button Clicked in Double Sound
     * @returns {null} if it's in disable Sound Mod
     */
    this.playBtnClicked = function(){

        if(settings.DISABLE_SOUND_MOBILE != false ){
            return null;
        }
        this.setVolumeBackgroundMusic(0.5);
        ManagerForSound.setVolume(my, "bonus_button_click", 2);
        ManagerForSound.play(my, "bonus_button_click");
        my.time.events.add(1000, function(){
            that.setVolumeBackgroundMusic(1);
        })
    };
    /**
     * Play Double Up Win Sound
     * @returns {null} if it's in disable Sound Mod
     */
    this.playDoubleUpWin = function(){
        if(settings.DISABLE_SOUND_MOBILE != false ){
            return null;
        }
        ManagerForSound.play(my, "doubleUpWin");
    };
    /**
     * Play Double Up Lose Sound
     * @returns {null} if it's in disable Sound Mod
     */
    this.playDoubleUpLose = function(){
        if(settings.DISABLE_SOUND_MOBILE != false ){
            return null;
        }
        ManagerForSound.play(my, "doubleUpLose");
    }
};