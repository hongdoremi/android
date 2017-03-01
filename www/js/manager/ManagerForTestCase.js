/**
 * Created by Phan on 12/12/2016.
 */
/**
 * Example
 * @type {ManagerForTestCase}
 */
/**
 *  MethodName,TimeOutInMilliSecond,parameter1,parameter2,....|MethodName,TimeOutInMilliSecond,...
 */


var ManagerForTestCase = new function () {
    if(!LobbyConfig.isUseTestCase ) return null;
    var that = this;
    var testQueue = null;
    var currentCall = null;
    var currentId = 0;
    this.callbackAchievementCollect = {};
    var init = function () {
        that.reset();
        if(!LobbyConfig.isTestStrategy) return;
        //window.setTimeout(that.getTestCase,1000);
    };
    var callNextCall = function () {
        currentCall = testQueue.shift();
        if (Lobby.Utils.objectNotNull(currentCall)) {
            currentId = window.setTimeout(currentCall.call, currentCall.timeOut);
        }
    };
    var createTestQueue = function (methodName, timeOut, parameterList) {
        var callInfo = {};
        callInfo.timeOut = timeOut;
        callInfo.call = function () {
            console.log("$ManagerForTestCase: Calling method " + methodName);
            that[methodName].apply(this, parameterList);
            callNextCall();
        };
        testQueue.push(callInfo);
    };
    var createMiniCallQueue = function (queue, callback, timeOut) {
        var callInfo = {};
        callInfo.call = function () {
            callback();
            var nextCall = queue.shift();
            if (nextCall != null) {
                window.setTimeout(nextCall.call, nextCall.timeOut);
            }
        };
        callInfo.timeOut = timeOut;
        queue.push(callInfo);
    };


    /**
     * Public Method
     */


    this.reset = function () {
        testQueue = [];
    };
    this.start = function () {
        callNextCall();
    };
    this.stop = function () {
        window.clearTimeout(currentId);
        currentId = 0;
        testQueue.unshift(currentCall);
        currentCall = null;
    };
    /**
     * In-game test case method
     */

    /**
     * Switch between Scene login
     */
    this.goToSignUpScene = function(){
        LobbyC.Login.LoginHtml.switchTo("signUp");
    };
    this.goToMainScene = function(){
        LobbyC.Login.LoginHtml.switchTo("main");
    };
    this.goToForgotPasswordScene = function(){
        LobbyC.Login.LoginHtml.switchTo("forgotPassword");
    };
    this.goToLoginScene = function(){
        LobbyC.Login.LoginHtml.switchTo("login");
    };
    /**
     * Enter field input
     */

    this.enterLoginUserName = function(userName){
        $("#pp-login-username").val(userName);
    };
    this.enterLoginPassWord = function(password){
        $("#pp-login-password").val(password);
    };
    this.enterSignUpUserName = function(userName){
        $("#pp-sign-up-username").val(userName);
    };
    this.enterSignUpPassWord = function(password){
        $("#pp-sign-up-password").val(password);
    };
    this.enterReSignUpPassWord = function(rePassword){
        $("#pp-sign-up-re-password").val(rePassword);
    };
    this.enterReferenceCode = function(referenceCode){
        $("#pp-sign-up-reference-code").val(referenceCode);
    };
    /**
     * Click button in scene html
     */
    this.clickLoginFacebookBtn = function(){
        LobbyC.Login.LoginHtml.loginFacebook();
    };

    this.clickLoginAccountButton = function(){
        LobbyC.Login.LoginHtml.loginPPAccount();
    };
    this.clickSignUpAccountButton = function(){
        LobbyC.Login.LoginHtml.signUpPP();
    };
    this.clickLoginGuestButton = function(){
        LobbyC.Login.LoginHtml.loginGuestAccount();
    };
    this.clickOkPopUpHtml = function(){
        LobbyC.Login.LoginHtml.clickOkErrorPopup();
    };
    this.clickCancelPopUpHtml = function(){
        LobbyC.Login.LoginHtml.clickCancelErrorPopup();
    };

    /**
     * In-game
     */
    this.closePopUpAchievement = function(){
        LobbyC.MainMenu.popupAchievement.btnClose.exitCall();
    };
    this.collectPopUpDailyBonusStreak = function(){
        LobbyC.MainMenu.popupDailyBonusStreak.claim();
    };
    this.closePopUpDailyBonusStreak = function(){
        LobbyC.MainMenu.popupDailyBonusStreak.exitBtn.exitCall();
    };
    this.closePopUpShop = function(){
        LobbyC.MainMenu.popupShop.btnExit.exitCall();
    };
    /**
     * Achievement Collect
     */
    this.collectAchievementCompletedTutorial = function(){
        that.collectAchievement("Completed Tutorial");
    };
    this.collectAchievement = function(achievementName){
        that.callbackAchievementCollect[achievementName]();
    };

    /**
     * Step click
     * @param step
     */
    this.playTutorialStep = function (step) {
        LobbyC.MainMenu.processEventClickTutorial(step);
    };
    this.claimRewardWelcomeScene = function(){
        LobbyC.MainMenu.welcomeScene.claim();
    };
    this.tutorialClickIconNezhaGame = function(){
        that.playTutorialStep(LobbyConstant.Constant4Tutorial.StepPickGame);
    };
    this.tutorialClickChangeBet = function(){
        that.playTutorialStep(LobbyConstant.Constant4Tutorial.StepChangeBet);
    };
    this.tutorialClickSpin = function(){
        that.playTutorialStep(LobbyConstant.Constant4Tutorial.StepSpin);
    };
    this.tutorialClickHomeButton = function(){
        that.playTutorialStep(LobbyConstant.Constant4Tutorial.StepClickHomeButton);
    };
    this.tutorialShowAchievement = function(){
        that.playTutorialStep(LobbyConstant.Constant4Tutorial.StepShowAchievementPopup);
    };
    this.tutorialShowPopupShop = function(){
        that.playTutorialStep(LobbyConstant.Constant4Tutorial.StepShowPopupShop);
    };
    this.tutorialClickFreeCoin = function(){
        that.playTutorialStep(LobbyConstant.Constant4Tutorial.StepClickFreeCoin);
    };

    /**
     * Use this for init queue call
     * @param methodName
     * @param timeOut
     */
    this.callMethod = function (methodName, timeOut) {
        var parameterList = Array.from(arguments).slice(2);
        if (that.hasOwnProperty(methodName)) {
            createTestQueue(methodName, timeOut, parameterList);
        } else {
            console.log("$$ManagerForTestCase: Method " + methodName + " not found!");
        }
    };
    this.importCallTestCase = function (testCase) {
        var method = testCase.split('|');
        for (var i = 0; i < method.length; i++) {
            var params = method[i].split(',');
            that.callMethod.apply(this, params);
        }
        that.start();
    };
    this.getTestCase = function () {
        //var testCase = window.prompt("Test Case", "Please parse Test Case here!");
        if(testCase === "") return;
        that.importCallTestCase(testCase);
        that.start();
    };
    init();
};