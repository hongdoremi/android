/**
 * Created by Phuoc Tran on 9/16/2015.
 */
"use strict";
/**
 * CLASS MANAGES SOUND
 * @constructor
 */
    function Manager4SoundPOClass() {
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
        my.currentGameSlot.s_oSoundTrackBonus1 = "soundtrack_bonus1";
        my.currentGameSlot.s_oSoundTrackBonus2 = "soundtrack_bonus2";
        my.currentGameSlot.s_oSoundTrack = "soundtrack";
        my.currentGameSlot.s_oSoundTrackBonusFreeSpin = "soundtrack_freespin";
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
        ManagerForSound.stop(my, my.currentGameSlot.s_oSoundTrackBonus1);
        ManagerForSound.stop(my, my.currentGameSlot.s_oSoundTrackBonus2);
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
        ManagerForSound.stop(my, my.currentGameSlot.s_oSoundTrackBonus1);
        ManagerForSound.stop(my, my.currentGameSlot.s_oSoundTrackBonus2);
        ManagerForSound.stop(my, my.currentGameSlot.s_oSoundTrack);
        ManagerForSound.setVolume(my, my.currentGameSlot.s_oSoundTrackBonusFreeSpin,1);
        if(my.currentSoundTrack != my.currentGameSlot.s_oSoundTrackBonusFreeSpin) {
            ManagerForSound.loop(my, my.currentGameSlot.s_oSoundTrackBonusFreeSpin);
            my.currentSoundTrack = my.currentGameSlot.s_oSoundTrackBonusFreeSpin;
        }
    };
    /**
     * Play Bonus Stage 1 Sound
     */
    this.playBonus1BackgroundMusic = function () {
        if (my.currentGameSlot.GameConstant.viewFlowMusicManager) {
            console.log("MusicManager playFreeSpinBackgroundMusic");
        }
        if(settings.DISABLE_SOUND_MOBILE != false){
            return;
        }
        ManagerForSound.setVolume(my, my.currentGameSlot.s_oSoundTrackBonus1,1);
        if(my.currentSoundTrack != my.currentGameSlot.s_oSoundTrackBonus1) {
            ManagerForSound.loop(my, my.currentGameSlot.s_oSoundTrackBonus1);
            my.currentSoundTrack = my.currentGameSlot.s_oSoundTrackBonus1;
        }
        ManagerForSound.stop(my, my.currentGameSlot.s_oSoundTrackBonus2);
        ManagerForSound.stop(my, my.currentGameSlot.s_oSoundTrack);
        ManagerForSound.stop(my, my.currentGameSlot.s_oSoundTrackBonusFreeSpin);
    };
    /**
     * Play Bonus Stage 2 Sound
     */
    this.playBonus2BackgroundMusic = function () {
        if (my.currentGameSlot.GameConstant.viewFlowMusicManager) {
            console.log("MusicManager playFreeSpinBackgroundMusic");
        }
        if(settings.DISABLE_SOUND_MOBILE != false){
            return;
        }
        ManagerForSound.setVolume(my, my.currentGameSlot.s_oSoundTrackBonus2,1);
        if(my.currentSoundTrack != my.currentGameSlot.s_oSoundTrackBonus2) {
            ManagerForSound.loop(my, my.currentGameSlot.s_oSoundTrackBonus2);
            my.currentSoundTrack = my.currentGameSlot.s_oSoundTrackBonus2;
        }
        ManagerForSound.stop(my, my.currentGameSlot.s_oSoundTrackBonus1);
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
        ManagerForSound.stop(my, my.currentGameSlot.s_oSoundTrackBonus1);
        ManagerForSound.stop(my, my.currentGameSlot.s_oSoundTrackBonus2);
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
            this.playBonus1BackgroundMusic();
        }else if(Manager4State.getCurrentState() == my.currentGameSlot.GameConstant.State.Bonus){
            this.playBonus2BackgroundMusic();
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
                ManagerForSound.stop(my, my.currentGameSlot.s_oSoundTrackBonus1);
                ManagerForSound.setVolume(my, my.currentGameSlot.s_oSoundTrack, volume);
                ManagerForSound.stop(my, my.currentGameSlot.s_oSoundTrackBonusFreeSpin);
                ManagerForSound.stop(my, my.currentGameSlot.s_oSoundTrackBonus2);
            }
        } else if (Manager4State.getCurrentState() == my.currentGameSlot.GameConstant.State.DoubleUp) {
            if (settings.DISABLE_SOUND_MOBILE === false) {
                ManagerForSound.stop(my, my.currentGameSlot.s_oSoundTrack);
                ManagerForSound.setVolume(my, my.currentGameSlot.s_oSoundTrackBonus1, volume);
                ManagerForSound.stop(my, my.currentGameSlot.s_oSoundTrackBonusFreeSpin);
                ManagerForSound.stop(my, my.currentGameSlot.s_oSoundTrackBonus2);
            }
        }
        else if (Manager4State.getCurrentState() == my.currentGameSlot.GameConstant.State.Bonus) {
            if (settings.DISABLE_SOUND_MOBILE === false) {
                ManagerForSound.stop(my, my.currentGameSlot.s_oSoundTrackBonus1);
                ManagerForSound.stop(my, my.currentGameSlot.s_oSoundTrack);
                ManagerForSound.stop(my, my.currentGameSlot.s_oSoundTrackBonusFreeSpin);
                ManagerForSound.setVolume(my, my.currentGameSlot.s_oSoundTrackBonus2, volume);
            }
        }
        else {
            if (settings.DISABLE_SOUND_MOBILE === false) {
                ManagerForSound.stop(my, my.currentGameSlot.s_oSoundTrackBonus1);
                ManagerForSound.setVolume(my, my.currentGameSlot.s_oSoundTrackBonusFreeSpin, volume);
                ManagerForSound.stop(my, my.currentGameSlot.s_oSoundTrack);
                ManagerForSound.stop(my, my.currentGameSlot.s_oSoundTrackBonus2);
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
     * Play symbol Animation Sound
     * @param iSymbol: symbol value
     * @returns name of Sound in cache or {null} if it's in disable Sound Mod
     */
    this.playSymbolAnimation = function(iSymbol){

        if(settings.DISABLE_SOUND_MOBILE != false ){
            return null;
        }

        var _oCurWinSound = null;
        switch (iSymbol){
            case 0:
            case 1:
            case 2:
            case 3:{
                _oCurWinSound = "symbol-0-1-2-3";
                break;
            }
            case 4:
            case 5:
            case 6:
            case 7:{
                _oCurWinSound = "symbol-4-5-6-7";
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
               return;
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

        if(settings.DISABLE_SOUND_MOBILE != false ){
            return null;
        }
        ManagerForSound.stop(my, "tot_win");
    };
    /**
     * Play Button Clicked in Bonus
     * @returns {null} if it's in disable Sound Mod
     */
    this.playBtnClicked = function(){

        if(settings.DISABLE_SOUND_MOBILE != false ){
            return null;
        }
        ManagerForSound.play(my, "bonus1_select");

    };
    /**
     * Play Opening Gate Sound on Bonus 1
     * @returns {null} if it's in disable Sound Mod
     */
    this.playBonus1GateOpen = function(){

        if(settings.DISABLE_SOUND_MOBILE != false ){
            return null;
        }
        ManagerForSound.play(my, "bonus1_gateOpen");

    };
    /**
     * Play Wheel Spin Sound on Bonus 2
     * @returns {null} if it's in disable Sound Mod
     */
    this.playBonus2WheelSpin = function(){

        if(settings.DISABLE_SOUND_MOBILE != false ){
            return null;
        }
        ManagerForSound.loop(my, "bonus2_wheelSpin");

    };
    /**
     * Stop Wheel Spin Sound on Bonus 2
     */
    this.stopBonus2WheelSpin = function(){
        ManagerForSound.stop(my, "bonus2_wheelSpin");
    };
    /**
     * Play Wheel Stop Sound on Bonus 2
     * @returns {null} if it's in disable Sound Mod
     */
    this.playBonus2WheelStop = function(){

        if(settings.DISABLE_SOUND_MOBILE != false ){
            return null;
        }
        ManagerForSound.play(my, "bonus2_wheelStop");

    };
    /**
     * Play Eagle Flying Sound On FreeSpin
     * @returns {null} if it's in disable Sound Mod
     */
    this.playEagleTravel = function(){

        if(settings.DISABLE_SOUND_MOBILE != false ){
            return null;
        }
        ManagerForSound.play(my, "travel_wild");

    };
};