/**
 * Created by Phuoc Tran on 9/16/2015.
 */
"use strict";
/**
 * CLASS MANAGES SOUND
 * @constructor
 */
function Manager4SoundLNClass() {
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
        my.currentGameSlot.s_oSoundTrackDoubleUp = "soundtrack_bonus";
        my.currentGameSlot.s_oSoundTrack = "soundtrack";
        my.currentGameSlot.s_oSoundTrackBonusFreeSpin = "soundtrack_bonus";
    };

    /**
     * Playing Main Game Sound
     */
    this.playStandardBackgroundMusic = function () {
        if (my.currentGameSlot.GameConstant.viewFlowMusicManager) {
            console.log("MusicManager playStandardBackgroundMusic");
        }
        if(settings.DISABLE_SOUND_MOBILE != false){
            return;
        }
        //ManagerForSound.stop(my, my.currentGameSlot.s_oSoundTrackDoubleUp);
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
        if(settings.DISABLE_SOUND_MOBILE != false ){
            return;
        }
        //ManagerForSound.stop(my, my.currentGameSlot.s_oSoundTrackDoubleUp);
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
        if(settings.DISABLE_SOUND_MOBILE != false ){
            return;
        }
        ManagerForSound.stop(my, my.currentGameSlot.s_oSoundTrack);
        //ManagerForSound.stop(my, my.currentGameSlot.s_oSoundTrackBonusFreeSpin);
        ManagerForSound.setVolume(my, my.currentGameSlot.s_oSoundTrackDoubleUp,1);
        if(my.currentSoundTrack != my.currentGameSlot.s_oSoundTrackDoubleUp) {
            ManagerForSound.loop(my, my.currentGameSlot.s_oSoundTrackDoubleUp);
            my.currentSoundTrack = my.currentGameSlot.s_oSoundTrackDoubleUp;
        }
    };

    /**
     * Turn off all background Sound
     */
    this.turnOffAllBackgroundMusic = function () {
        if (my.currentGameSlot.GameConstant.viewFlowMusicManager) {
            console.log("MusicManager turnOffAllBackgroundMusic");
        }
        if(settings.DISABLE_SOUND_MOBILE != false ){
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
            this.playFreeSpinBackgroundMusic();
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
                //ManagerForSound.stop(my, my.currentGameSlot.s_oSoundTrackDoubleUp);
                ManagerForSound.setVolume(my, my.currentGameSlot.s_oSoundTrack, volume);
                ManagerForSound.stop(my, my.currentGameSlot.s_oSoundTrackBonusFreeSpin);
            }
        } else if (Manager4State.getCurrentState() == my.currentGameSlot.GameConstant.State.DoubleUp) {
            if (settings.DISABLE_SOUND_MOBILE === false) {
                ManagerForSound.stop(my, my.currentGameSlot.s_oSoundTrack);
                ManagerForSound.setVolume(my, my.currentGameSlot.s_oSoundTrackDoubleUp, volume);
                //ManagerForSound.stop(my, my.currentGameSlot.s_oSoundTrackBonusFreeSpin);
            }
        }
        else if (Manager4State.getCurrentState() == my.currentGameSlot.GameConstant.State.Bonus) {
            if (settings.DISABLE_SOUND_MOBILE === false) {
                //ManagerForSound.stop(my, my.currentGameSlot.s_oSoundTrackDoubleUp);
                ManagerForSound.stop(my, my.currentGameSlot.s_oSoundTrack);
                ManagerForSound.setVolume(my, my.currentGameSlot.s_oSoundTrackBonusFreeSpin, volume);
            }
        }
        else {
            if (settings.DISABLE_SOUND_MOBILE === false) {
                //ManagerForSound.stop(my, my.currentGameSlot.s_oSoundTrackDoubleUp);
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
    this.playScatterStop = function(){
        if (settings.DISABLE_SOUND_MOBILE === true) {
            return;
        }
        ManagerForSound.stop(my, 'reel_stop');
        ManagerForSound.play(my, "reel_stop");
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
            case 2:{
                _oCurWinSound = "symbol_0_1_2";
                break;
            }
            case 3:
            case 4:{
                _oCurWinSound = "symbol_3_4";
                break;
            }
            case 5:
            case 6:{
                _oCurWinSound = "symbol_5_6";
                break;
            }
            case 7:{
                _oCurWinSound = "symbol_7";
                break;
            }
            case 8:{
                _oCurWinSound = "symbol_8";
                break;
            }
            case 9:{
                _oCurWinSound = "symbol_9";
                break;
            }
            case 10:{
                _oCurWinSound = "symbol_10";
                break;
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

        if(settings.DISABLE_SOUND_MOBILE != false){
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
     * Play Button Clicked in Bonus Palace
     * @returns {null} if it's in disable Sound Mod
     */
    this.playBtnPalaceClicked = function(){

        if(settings.DISABLE_SOUND_MOBILE != false){
            return null;
        }
        ManagerForSound.play(my, "bonuspalace_button_click");

    };
    /**
     * Play Button Clicked in Bonus Battle
     * @returns {null} if it's in disable Sound Mod
     */
    this.playBtnBattleClicked = function(){

        if(settings.DISABLE_SOUND_MOBILE != false){
            return null;
        }
        ManagerForSound.play(my, "bonusbattle_button_click");

    };
};