/**
 * Created by Phuoc Tran on 9/16/2015.
 */
"use strict";
/**
 * CLASS MANAGES SOUND
 * @constructor
 */
    function Manager4SoundREClass() {
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
        ManagerForSound.stop(my, 'reel_stop');
        ManagerForSound.play(my, "reel_stop");
    };
    /**
     * Play Reel contains Scatter Stop Sound
     * @returns {null} if it's in disable Sound Mod
     */
    this.playScatterStop = function(index){
        if (settings.DISABLE_SOUND_MOBILE === true) {
            return;
        }
        ManagerForSound.stop(my, 'bonusStop' + index);
        ManagerForSound.play(my, "bonusStop" + index);
    };
    /**
     * Play Reel contains Wild Stop Sound
     * @returns {null} if it's in disable Sound Mod
     */
    this.playWildStop = function(){
        if (settings.DISABLE_SOUND_MOBILE === true) {
            return;
        }
        ManagerForSound.stop(my, "wildStop");
        ManagerForSound.play(my, "wildStop");
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
            case 0:
            case 1:
            {
                _oCurWinSound = "symbol-0-1";
                break;
            }
            case 2:
            case 3:{
                _oCurWinSound = "symbol-2-3";
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
            case 9:{
                _oCurWinSound = "symbol-9";
                break;
            }
            case 10:{
                _oCurWinSound = "symbol-10";
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
     * Play Button Clicked in Double Up + Bonus Sound
     * @returns {null} if it's in disable Sound Mod
     */
    this.playBtnClicked = function(){

        if(settings.DISABLE_SOUND_MOBILE != false ){
            return null;
        }
        ManagerForSound.play(my, "spin");

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
    },
    /**
     * Play Wheel Of Fortune Sound in Bonus
     * @returns {null} if it's in disable Sound Mod
     */
    this.playWheelOfFortune = function(){
        if(settings.DISABLE_SOUND_MOBILE != false ){
            return null;
        }
        ManagerForSound.loop(my, "wheel-fortune");
    },
    /**
     * Stop Wheel Of Fortune Sound in Bonus
     * @returns {null} if it's in disable Sound Mod
     */
    this.stopWheelOfFortune = function(){
        if(settings.DISABLE_SOUND_MOBILE != false ){
            return null;
        }
        ManagerForSound.stop(my, "wheel-fortune");
    },
    /**
     * Play Coin Sound in Double Up
     * @returns {null} if it's in disable Sound Mod
     */
    this.playCoinSound = function(){
        if(settings.DISABLE_SOUND_MOBILE != false ){
            return null;
        }
        ManagerForSound.play(my, "coin");
    },
    /**
     * Stop Coin Sound in Double Up
     * @returns {null} if it's in disable Sound Mod
     */
    this.stopCoinSound  = function(){
        if(settings.DISABLE_SOUND_MOBILE != false ){
            return null;
        }
        ManagerForSound.stop(my, "coin");
    }
};