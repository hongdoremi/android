"use strict";

/**
 * Deprecated
 * @param json
 */
function convertJSON(json) {
    return JSON.stringify(json, null, 4);
}

/**
 * GLOBAl VARIABLE
 * FacebookController.currentFriendList
 * FacebookController.currentUserInfo
 */


//profuctId list:
//    http://socialcasino.mobile.dev.spiralworks-cloud.com/callback-server-for-facebook/48000000coins.html
//    http://socialcasino.mobile.dev.spiralworks-cloud.com/callback-server-for-facebook/40000000coins.html
//    http://socialcasino.mobile.dev.spiralworks-cloud.com/callback-server-for-facebook/30000000coins.html
//    http://socialcasino.mobile.dev.spiralworks-cloud.com/callback-server-for-facebook/20000000coins.html
//    http://socialcasino.mobile.dev.spiralworks-cloud.com/callback-server-for-facebook/8000000coins.html
//    http://socialcasino.mobile.dev.spiralworks-cloud.com/callback-server-for-facebook/4000000coins.html
//    http://socialcasino.mobile.dev.spiralworks-cloud.com/callback-server-for-facebook/800coins.html
//    http://scmw.spiralworks-cloud.com/callback-server-for-facebook/400coins.html

//dynamic productId List:
//http://scmw.spiralworks-cloud.com/callback-server-for-facebook/dynamic_product.html


//example
//AppPurchasePCControllerController.purchaseItem(
//    productId,
//    function(
//        isSuccess,
//        result){
//
//    });

/**
 * purchase on facebook canvas
 * @type {AppPurchasePCControllerController}
 */
var AppPurchasePCControllerController = new function () {

    var that = this;
    /**
     * get currency to purchase
     * @param resultFunc
     */
    this.getCurrency =
        function (resultFunc) {

            FacebookController.api(
                '/me/?fields=currency',
                null,
                function (response) {
                    Lobby.Utils.printConsoleLog('GetCurrencySuccess');
                    Lobby.Utils.printConsoleLog("UserInfo: ", convertJSON(userData));
                    resultFunc(true, userData);
                },
                function (error) {
                    Lobby.Utils.printConsoleLog('GetCurrencyFail');
                    Lobby.Utils.printConsoleLog("Error: ", convertJSON(error));
                    resultFunc(false, error);
                });


        };

    /**
     * purchase fixed item via facebook account
     * @param productID
     * @param resultFunc
     */
    this.purchaseItem = function (productID, resultFunc) {
        Lobby.Utils.logCurrentTime("Call purchase item at : ");
        if (LobbyC.MainMenu.checkBlackListIp()) {
            resultFunc(false, "block_ip", productID);
        }
        else {
            var options = new Object();
            options.method = "pay";
            options.action = "purchaseitem";
            options.product = productID;
            options.quantity = 1;
            options.redirect_uri = FacebookController.REDIRECT_URI;
            FacebookController.showDialog(
                options,
                function (purchaseResult) {
                    Lobby.Utils.printConsoleLog("PurchaseItem Result: ", purchaseResult);
                    resultFunc(true, purchaseResult, productID);
                },
                function (error) {
                    Lobby.Utils.printConsoleLog("Error purchaseItem: ", error);
                    resultFunc(false, error, productID);
                }
            );
        }
    };

    /**
     * purchase dynamic item(can change price at purchase time)
     * @param productID
     * @param resultFunc
     */
    this.purchaseDynamicItem = function (productID, resultFunc) {
        Lobby.Utils.logCurrentTime("Call purchase dynamic item at : ");
        if (LobbyC.MainMenu.checkBlackListIp()) {
            resultFunc(false, "block_ip", productID);
        }
        else {
            var options = new Object();
            options.method = "pay";
            options.action = "purchaseitem";
            options.product = productID;
            options.quantity = 1;
            options.redirect_uri = FacebookController.REDIRECT_URI;

            FacebookController.showDialog(
                options,
                function (purchaseResult) {
                    Lobby.Utils.printConsoleLog("PurchaseItem Result: ", purchaseResult);
                    resultFunc(true, purchaseResult, productID);
                },
                function (error) {
                    Lobby.Utils.printConsoleLog("Error purchaseItem: ", error);
                    resultFunc(false, error, productID);
                }
            );
        }
    };


    // 2016-05-03: Toan
    /**
     * earn freecoin by do survey trialpay
     * @param sid
     * @param hostUrl
     * @param vendorId
     * @param my
     */
    this.earnCredits = function (sid,hostUrl,vendorId,my) {

        my.showUnfinishedJobMessage("Free coins");
        //return;
        //console.log("TRIALPAY");
        //TRIALPAY.fb.show_overlay(
        //    LobbyConfig.facebookAppID,
        //    "fbdirect", {
        //        tp_vendor_id: vendorId,
        //        callback_url: hostUrl + "/lobby-server-pp/callback/completeOfferWall",
        //        currency_url: hostUrl + "/callback-server-for-facebook/offer-wall-1.html?19",
        //        sid: sid,
        //        zIndex: 100,
        //        onTransact:'my_ontransact'
        //    }
        //);
    };


    // method called when the screen showing your purchase is made visible

};

function my_ontransact() {
}