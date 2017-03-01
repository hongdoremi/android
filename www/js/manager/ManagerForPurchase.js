/**
 * Created by Phan on 7/8/2016.
 */
var ManagerForPurchase = new function(){
    var that = this;
    var webMusicList = {};
    var isInited = false;
    var myPurchase;
    this.buyPackageBasedOnPlatform = function(packageId,my){
        if (!Lobby.Utils.isWeb()){
            if(cordova.platformId == "android") ManagerForPurchase.buyItem(my, LobbyConfig.ProductManager.Android[packageId]);
            else  ManagerForPurchase.buyItem(my, LobbyConfig.ProductManager.IOs[packageId]);
        }
        else my.showNotificationPopup("Error","Platform not supported.");
    };
    /**
     * Check if inited
     * @returns {boolean}
     * @constructor
     */
    this.WasInitPurchase = function()
    {
        return isInited;
    };
    /**
     * Buy a product
     * @param my
     * @param productName id of product
     */
    this.buyItem = function(my, productName){

        function callBackBuy(){
            //if(Lobby.Utils.isIOS()){
            //    my.showUnfinishedJobMessage("Purchase");
            //    return;
            //}

            if((typeof cordova === "undefined")){
                my.showNotificationPopup(
                    "",
                    my.selectlanguage.popup_shop_transaction_cancelled.text,
                    function () {
                    }
                );
                return;
            }
            //if(my.isDisableButtonBuyInShop) return;
            my.isDisableButtonBuyInShop = true;
            that.purchase(productName);

        };

        // avoid show form input username password for buying
        if (Lobby.Utils.isIOS() &&
            ManagerForPurchase.WasInitPurchase() === false) {
            my.showLoadingAnimation();
            setTimeout(function () {
                my.hideLoadingAnimation();
            }, 10000);
            ManagerForPurchase.initProduct(my, callBackBuy);
        } else {
            callBackBuy();
        }


    };
    /**
     * Init product
     * @param my
     * @param callBack
     */
    this.initProduct = function (my, callBack) {

        if(LobbyConfig.isTestAlgorithmMode){
            return;
        }

        if((typeof cordova === "undefined")) return;
        myPurchase = my;
        my.productListApple = [];
        my.appleStoreState = false;
        my.isDisableButtonBuyInShop = false;

        if(LobbyConfig.isDebug) {
            console.log('Start init product');
        }
        store.verbosity = store.INFO;
        var productList;
        if(Lobby.Utils.isProduction()){
            productList  = LobbyConfig.ProductManager.Production;
        }else{
            if(cordova.platformId === "android") productList  = LobbyConfig.ProductManager.Android;
            else if(cordova.platformId === "ios") productList = LobbyConfig.ProductManager.IOs;
        }
        LobbyConfig.ProductManager.currentProduct = productList;
        /**
         * Remmeber to init for production
         * initProductForIosProduction
         * @type {Array}
         */
        my.listProduct = [];
        for(var key in productList){
            if(productList.hasOwnProperty(key)
                && Lobby.Utils.objectNotNull(productList[key].id)){
                my.listProduct.push({
                    id: productList[key].id,
                    alias: productList[key].alias,
                    type:store.CONSUMABLE

                });
            }

        }
        //{
        //    id: productList.Vip,
        //    alias: "VIP",
        //    type: store.CONSUMABLE
        //},
        //{
        //    id: productList.P1,
        //    alias: "40000000coins",
        //    type: store.CONSUMABLE
        //},
        //{
        //    id: productList.P2,
        //    alias: "20000000coins",
        //    type: store.CONSUMABLE
        //},
        //{
        //    id: "playpalace.product.8000000coins",
        //    alias: "8000000coins",
        //    type: store.CONSUMABLE
        //},
        //{
        //    id: "playpalace.product.4000000coins",
        //    alias: "4000000coins",
        //    type: store.CONSUMABLE
        //},
        //{
        //    id: "playpalace.product.2000000coins",
        //    alias: "2000000coins",
        //    type: store.CONSUMABLE
        //},
        //{
        //    id: "playpalace.product.800000coins",
        //    alias: "800000coins",
        //    type: store.CONSUMABLE
        //},
        //{
        //    id: "playpalace.product.400000coins",
        //    alias: "400000coins",
        //    type: store.CONSUMABLE
        //}

        for(var i=0;i<my.listProduct.length;i++) {
            if(LobbyConfig.isDebug) {
                console.log('Register product', Lobby.Utils.formatJSON(my.listProduct[i]));
            }
            store.register({
                id: my.listProduct[i].id,
                alias: my.listProduct[i].alias,
                type: my.listProduct[i].type
            });
        }
        store.ready(function () {
            that.addEventWhenStoreReady(my);
            if(Lobby.Utils.isIOS()){
                var productFailedArr = [];
                for(var i=0;i<my.listProduct.length;i++) {
                    if(Lobby.Utils.objectNotNull(storekit.transactionForProduct[my.listProduct[i].id])){
                        productFailedArr.push(storekit.transactionForProduct[my.listProduct[i].id]);
                    }
                }
                if(LobbyConfig.isDebug) {
                    console.log("productFailedArr.length: " + productFailedArr.length);
                }
                if(productFailedArr.length == 0){
                    if(Lobby.Utils.objectNotNull(callBack)){
                        if(storekit.transactionForProduct)
                            callBack();
                    }
                }
            }
        });

        store.refresh();
    };
    /**
     * Add event when store is ready
     * @param my
     */
    this.addEventWhenStoreReady = function (my) {

        //if(Lobby.Utils.isIOS()){
        //    return;
        //}
        if(LobbyConfig.isDebug) {
            console.log("\\o/ STORE READY \\o/");
        }
        my.appleStoreState = true;
        for(var i = 0; i< my.listProduct.length;i++) {
            var product = store.get(my.listProduct[i].id);
            my.productListApple.push({
                id : product.id,
                data : product
            });
        }
        if(LobbyConfig.isDebug) {
            console.log('All product list', Lobby.Utils.formatJSON(my.productListApple));
        }
        var oldHandleWhenApprove = function (order) {

            if(LobbyConfig.isDebug) {
                console.log("approved approved: " + order.transaction.id);
            }
            //order.finish();
            my.hideLoadingAnimation();
            if(cordova.platformId == "ios"){
                store.validator = validator;
                function validator( product, callback ) {
                    var callToServer = function(){

                        if(LobbyConfig.isDebug) {
                            console.log("validator order: " + order.transaction.id);
                        }
                        var postData = {
                            //data:JSON.stringify(arrayEncrypt),
                            appStoreReceipt:header,
                            transactionReceipt:tail,
                            mobilePlatform : 1
                        };

                        //if(LobbyConfig.isTestPacketStrategy){
                        //    order.finish();
                        //    return;
                        //}
                        LobbyRequest.User.saveInAppBillingIos(postData,
                            function (isSuccess, data, response) {

                                if(isSuccess) {
                                    //alert(data);
                                    if (order.id == LobbyConfig.ProductManager.Production.SpecialOffer.id
                                        || order.id == LobbyConfig.ProductManager.IOs.SpecialOffer.id) {
                                        if(Lobby.Utils.objectNotNull(data.coin_reward)){
                                            data.coin_reward = 880000;
                                        }
                                    }

                                    that.callBackInAppPurchase(data, false);
                                    console.log(data);
                                    order.finish();
                                    my.reloadProfileCallbackAfterPurchase();
                                }
                                else{
                                    //sau nay phai them ma loi da mua roi thi moi duoc finish
                                    if(response.core_result_code == LobbyConstant.RESULT_CODE_PAYMENT_EXIST)
                                        order.finish();
                                    my.showNotificationPopup(
                                        "",
                                        my.selectlanguage.popup_shop_transaction_cancelled.text + data,
                                        function () {
                                        }
                                    );
                                    /**
                                     * TODO : init schedule refresh
                                     */
                                    //store.refresh();
                                }
                            }
                        );
                    };
                    //order.finish();
                    ////tam thoi chua call len server
                    //return;
                    var header = order.transaction.appStoreReceipt;
                    var tail = order.transaction.transactionReceipt;
                    if(Lobby.Utils.objectIsNull(header)
                        || Lobby.Utils.objectIsNull(tail)){

                        storekit.loadReceipts(function (receipts) {
                            header = receipts.appStoreReceipt; // null or base64 encoded receipt (iOS >= 7)
                            tail = receipts.forTransaction(product.transaction.id); // null or base64 encoded receipt (iOS < 7)
                            callToServer();
                        });
                    }else{
                        callToServer();
                    }
                }
                order.verify();
                return;
            }
            var postData = {
                //data:JSON.stringify(arrayEncrypt),
                data:order.transaction.receipt,
                signatureNew:order.transaction.signature
            };
            //alert(("!!!!!!!!!"+order.transaction.receipt + '@@@@@@@@@@@@'+order.transaction.signature));

            if(LobbyConfig.isDebug) {
                console.log('Send purchase', Lobby.Utils.formatJSON(postData));
            }
            //alert(Lobby.Utils.formatJSON(data));




            LobbyRequest.User.saveInAppBilling(postData,
                function (isSuccess, data, response) {
                    if(isSuccess) {
                        //alert(data);
                        that.callBackInAppPurchase(data,false);
                        console.log(data);
                        order.finish();
                        my.reloadProfileCallbackAfterPurchase();
                    }
                    else{
                        if(data.core_result_code == LobbyConstant.RESULT_CODE_PAYMENT_EXIST)
                            order.finish();
                        my.showNotificationPopup(
                            "",
                            my.selectlanguage.popup_shop_transaction_cancelled.text + data,
                            function () {
                            }
                        );
                        //Test only
                        //order.finish();
                        //my.showNotificationPopup(
                        //    "",
                        //    my.selectlanguage.popup_shop_transaction_cancelled.text + data,
                        //    function () {
                        //    }
                        //);
                        /**
                         test
                         */
                        //order.finish();
                        if(LobbyConfig.isDebug) {
                            console.log("Order failure");
                        }
                        /**
                         * TODO : init schedule refresh
                         */
                        //store.refresh();
                    }
                }
            );
        };
        var newHandleWhenApprove = function (order) {
            var packageType = LobbyConstant.GOOGLE_PACKAGE_TYPE_UNKNOWN;
            for (var key in LobbyConfig.ProductManager.currentProduct) {
                if (LobbyConfig.ProductManager.currentProduct.hasOwnProperty(key) && LobbyConfig.ProductManager.currentProduct[key].id === order.id) {
                    packageType = LobbyConfig.ProductManager.currentProduct[key].type;
                    break;
                }
            }
            if(LobbyConfig.isDebug) {
                console.log("approved approved: " + order.transaction.id);
            }
            //order.finish();
            my.hideLoadingAnimation();
            if(cordova.platformId == "ios"){
                var callToServer = function(){
                    //
                    if (LobbyConfig.isDebug) {
                        console.log("validator order: " + order.transaction.id);
                    }
                    var postData = {
                        //data:JSON.stringify(arrayEncrypt),
                        appStoreReceipt: header,
                        transactionReceipt: tail,
                        mobilePlatform: 1
                    };

                    //if(LobbyConfig.isTestPacketStrategy){
                    //    order.finish();
                    //    return;
                    //}
                    //my.showNotificationPopup("Recept",Lobby.Utils.formatJSON(postData))
                    LobbyRequest.User.saveInAppBillingIOSNew(
                        postData.appStoreReceipt,
                        postData.transactionReceipt,
                        packageType,
                        postData.mobilePlatform ,
                        function (isSuccess, data, response) {
                        if (isSuccess) {
                            //alert(data);
                            if (order.id == LobbyConfig.ProductManager.Production.SpecialOffer.id
                                || order.id == LobbyConfig.ProductManager.IOs.SpecialOffer.id) {
                                if (Lobby.Utils.objectNotNull(data.coin_reward)) {
                                    data.coin_reward = 880000;
                                }
                            }
                            //that.callBackInAppPurchase(data, false);
                            LobbyC.MainMenu.handleResultBuyPackageNew(data, true);
                            console.log(data);
                            order.finish();
                            //my.reloadProfileCallbackAfterPurchase();
                        }
                        else {
                            //sau nay phai them ma loi da mua roi thi moi duoc finish
                            if (response.core_result_code == LobbyConstant.RESULT_CODE_PAYMENT_EXIST)
                                order.finish();
                            my.showNotificationPopup(
                                "",
                                my.selectlanguage.popup_shop_transaction_cancelled.text,
                                function () {
                                }
                            );
                            /**
                             * TODO : init schedule refresh
                             */
                            //store.refresh();
                        }
                    });
                };
                //order.finish();
                ////tam thoi chua call len server
                //return;
                var header = order.transaction.appStoreReceipt;
                var tail = order.transaction.transactionReceipt;
                if (Lobby.Utils.objectIsNull(header)
                    || Lobby.Utils.objectIsNull(tail)) {

                    storekit.loadReceipts(function (receipts) {
                        header = receipts.appStoreReceipt; // null or base64 encoded receipt (iOS >= 7)
                        tail = receipts.forTransaction(order.transaction.id); // null or base64 encoded receipt (iOS < 7)
                        callToServer();
                    });
                } else {
                    callToServer();
                }


                //store.validator = validator;
                //function validator( product, callback ) {
                //    var callToServer = function(){
                //
                //        if(LobbyConfig.isDebug) {
                //            console.log("validator order: " + order.transaction.id);
                //        }
                //        var postData = {
                //            //data:JSON.stringify(arrayEncrypt),
                //            appStoreReceipt:header,
                //            transactionReceipt:tail,
                //            mobilePlatform : 1
                //        };
                //
                //        //if(LobbyConfig.isTestPacketStrategy){
                //        //    order.finish();
                //        //    return;
                //        //}
                //        //my.showNotificationPopup("Recept",Lobby.Utils.formatJSON(postData))
                //        LobbyRequest.User.saveInAppBillingIOSNew(header,tail,packageType,function(isSuccess,data,response){
                //            if(isSuccess) {
                //                //alert(data);
                //                if (order.id == LobbyConfig.ProductManager.Production.SpecialOffer.id
                //                    || order.id == LobbyConfig.ProductManager.IOs.SpecialOffer.id) {
                //                    if(Lobby.Utils.objectNotNull(data.coin_bonus)){
                //                        data.coin_bonus = 880000;
                //                    }
                //                }
                //                //that.callBackInAppPurchase(data, false);
                //                LobbyC.MainMenu.handleResultBuyPackageNew(data,true);
                //                console.log(data);
                //                order.finish();
                //                //my.reloadProfileCallbackAfterPurchase();
                //            }
                //            else{
                //                //sau nay phai them ma loi da mua roi thi moi duoc finish
                //                if(response.core_result_code == LobbyConstant.RESULT_CODE_PAYMENT_EXIST)
                //                    order.finish();
                //                my.showNotificationPopup(
                //                    "",
                //                    my.selectlanguage.popup_shop_transaction_cancelled.text,
                //                    function () {
                //                    }
                //                );
                //                /**
                //                 * TODO : init schedule refresh
                //                 */
                //                //store.refresh();
                //            }
                //        });
                //    };
                //    //order.finish();
                //    ////tam thoi chua call len server
                //    //return;
                //    var header = order.transaction.appStoreReceipt;
                //    var tail = order.transaction.transactionReceipt;
                //    if(Lobby.Utils.objectIsNull(header)
                //        || Lobby.Utils.objectIsNull(tail)){
                //
                //        storekit.loadReceipts(function (receipts) {
                //            header = receipts.appStoreReceipt; // null or base64 encoded receipt (iOS >= 7)
                //            tail = receipts.forTransaction(product.transaction.id); // null or base64 encoded receipt (iOS < 7)
                //            callToServer();
                //        });
                //    }else{
                //        callToServer();
                //    }
                //}
                //order.verify();
                //return;
            } else if (cordova.platformId == "android"){
                var postData = {
                    //data:JSON.stringify(arrayEncrypt),
                    data:order.transaction.receipt,
                    signatureNew:order.transaction.signature
                };
                //alert(("!!!!!!!!!"+order.transaction.receipt + '@@@@@@@@@@@@'+order.transaction.signature));

                if(LobbyConfig.isDebug) {
                    console.log('Send purchase', Lobby.Utils.formatJSON(postData));
                }
                //alert(Lobby.Utils.formatJSON(data));


                //if(LobbyConfig.isTestPacketStrategy){
                //    order.finish();
                //    return;
                //}
                LobbyRequest.User.saveInAppBillingAndroidNew(
                    order.transaction.receipt,
                    order.transaction.signature,
                    packageType,
                    function(isSuccess,data,response){
                    if(isSuccess) {
                        //alert(data);
                        //that.callBackInAppPurchase(data,false);

                        LobbyC.MainMenu.handleResultBuyPackageNew(data,true);
                        console.log(data);
                        order.finish();
                        //my.reloadProfileCallbackAfterPurchase();
                    }
                    else{
                        if(response.core_result_code == LobbyConstant.RESULT_CODE_PAYMENT_EXIST)
                            order.finish();
                        my.showNotificationPopup(
                            "",
                            my.selectlanguage.popup_shop_transaction_cancelled.text,
                            function () {
                            }
                        );
                        //Test only
                        //order.finish();
                        //my.showNotificationPopup(
                        //    "",
                        //    my.selectlanguage.popup_shop_transaction_cancelled.text + data,
                        //    function () {
                        //    }
                        //);
                        /**
                         test
                         */
                        //order.finish();
                        if(LobbyConfig.isDebug) {
                            console.log("Order failure");
                        }
                        /**
                         * TODO : init schedule refresh
                         */
                        //store.refresh();
                    }
                });
            }

        };
        this.initOldProductList();
        for(var j = 0; j <my.productListApple.length; j++) {

            //store.when(my.productListApple[i].id).verified(function(product) {
            //    console.log('Verify product', Lobby.Utils.formatJSON(product));
            //});
            //if(my.productListApple[j].id.indexOf("once")>-1||my.productListApple[j].id.indexOf("test")>-1) {
            if(LobbyConfig.oldProductList.indexOf(my.productListApple[j].id) > -1) {
                store.when(my.productListApple[j].id).approved(
                    oldHandleWhenApprove
                );
            }else{
                store.when(my.productListApple[j].id).approved(
                    newHandleWhenApprove
                );
            }
            store.when(my.productListApple[j].id).updated(
                function (order) {
                    console.log(order);
                    if(Lobby.Utils.isIOS() &&
                        Lobby.Utils.objectNotNull(order) &&
                        order.state === "initiated" &&
                        LobbyConfig.isAutoFinishAllProduct){
                        order.finish();

                    }
                    //if(LobbyConfig.isTestPacketStrategy) order.finish();
                }
            );

        }
        store.refresh();
        isInited = true;
    };
    this.initOldProductList = function(){
        //var productList = LobbyConfig.ProductManager.Android;
        var productList = LobbyConfig.ProductManager.currentProduct;
        if(LobbyConfig.ProductManager.currentProduct == {}){
            if(Lobby.Utils.isProduction()){
                productList  = LobbyConfig.ProductManager.Production;
            }else{
                if(cordova.platformId === "android") productList  = LobbyConfig.ProductManager.Android;
                else if(cordova.platformId === "ios") productList = LobbyConfig.ProductManager.IOs;
            }
            LobbyConfig.ProductManager.currentProduct = productList;
        }
        LobbyConfig.oldProductList = [];
        for(var key in productList){
            if(productList.hasOwnProperty(key)){
                switch(key){
                    case "SpecialOffer":
                    case "Vip":
                    case "P1":
                    case "P2":
                    case "P3":
                    case "P4":
                    case "P5":
                    case "P6":
                    case "P7":
                    case "Crown3":
                    case "Crown2":
                    case "Crown1":
                        LobbyConfig.oldProductList.push(productList[key].id);
                        break;
                }
            }
        }
    };



    /**
     * Callback when purchased a product
     * @param result
     * @param isCallRequestAgain
     * @param isShowPopup
     * @param isSpecialOffer
     * @returns {boolean}
     */
    this.callBackInAppPurchase = function(result,
                                          isCallRequestAgain,
                                          isShowPopup,
                                          isSpecialOffer) {

        //if(Lobby.Utils.isIOS()){
        //    return;
        //}

        var rewardString = "";
        if(Lobby.Utils.objectIsNull(isShowPopup)) isShowPopup = true;
        if(Lobby.Utils.objectIsNull(isSpecialOffer)) isSpecialOffer = false;
        if (result["core_result_code"] == null){
            var packageType = result["package_type"];
            switch(packageType){
                case LobbyConfig.PACKAGE_TYPE.APPLE_PACKAGE_TYPE_BOOSTER_1:
                    rewardString = myPurchase.selectlanguage.purchased.approved;
                    break;
                case LobbyConfig.PACKAGE_TYPE.APPLE_PACKAGE_TYPE_BOOSTER_2:
                    rewardString = myPurchase.selectlanguage.purchased.approved;
                    break;
                default:  //Cac package cu bao gom ca coin va cron
                    // Toan kiem tra xem user mua coin hay crown
                    var coin_reward = (result ["coin_reward"]) == null ? 0 : (result["coin_reward"]);
                    coin_reward = Lobby.Utils.floatToIntOptimize(coin_reward);
                    var crown =(result["crown"]) == null ? 0 : (result["crown"]);
                    var amountBonusToShowInPopup = coin_reward;
                    var  isCrownReward = false;
                    if (amountBonusToShowInPopup == 0)
                    {
                        isCrownReward = true;
                        amountBonusToShowInPopup = crown;
                    }


                    rewardString = myPurchase.selectlanguage.purchased.reward + Lobby.Utils.formatNumberWithCommas(amountBonusToShowInPopup);
                    if (isCrownReward)
                    {
                        rewardString += " " + myPurchase.selectlanguage.popup_user_game_unlock.text5;
                    }
                    if (isSpecialOffer) {
                        rewardString = myPurchase.selectlanguage.purchased.approved + "880,000" + myPurchase.selectlanguage.popup_voucher_description.text2;
                    }
                    break;
            }





            if (isShowPopup) {
                var reloadData = function(){
                    LobbyC.MainMenu.updateUserInfoFromSV(
                        function () {

                        },
                        function () {
                        },
                        false // isGetStatisticData
                    );
                };
                myPurchase.showNotificationPopup(
                    myPurchase.selectlanguage.purchased.approved,
                    rewardString,
                    function ()
                    {
                        reloadData();
                    },
                    function(){
                        reloadData();
                    }
                );
            }


            myPurchase.reloadProfileCallbackAfterPurchase();
            return true;
        }
        else {
            // TODO : switch result code
            if (isCallRequestAgain == true)
                return false;
            var  result_code = (result["core_result_code"]);
            switch (result_code) {
                case LobbyConstant.RESULT_CODE_PAYMENT_EXIST:
                    myPurchase.showNotificationPopup(
                        myPurchase.selectlanguage.purchased.payment_accepted,
                        myPurchase.selectlanguage.purchased.support,
                        null
                    );
                    break;
                default:
                    myPurchase.showNotificationPopup(
                        "Error ",
                        myPurchase.selectlanguage.purchased.support,
                        null
                    );
                    break;
            }
            return false;
        }
    };
    /**
     * Pruchase with object
     * @param purchaseObject
     */
    this.purchase = function (purchaseObject) {

        //if(Lobby.Utils.isIOS()){
        //    my.showUnfinishedJobMessage("Purchase");
        //    return;
        //}
        if(isInited == false)
            return;
        for(var i = 0; i < myPurchase.productListApple.length; i++)
        {
            if(myPurchase.productListApple[i].id == purchaseObject.id){
                if(myPurchase.productListApple[i].data.valid == false){
                    myPurchase.showNotificationPopup(
                        "Error ",
                        myPurchase.selectlanguage.purchased.not_available,
                        null
                    );
                    init();
                    return;
                }
            }
        }

        if(LobbyConfig.isDebug) {
            console.log("START PURCHASE PRODUCT : ", purchaseObject.id);
        }
        store.order(purchaseObject.id);
    };

};
