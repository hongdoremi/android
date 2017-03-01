/**
 * Created by Quan Do on 7/14/2015.
 */

var Manager4Product = new function () {

    //"bean_type": "BeanResultWithBeanBasic",
    //    "core_result_code": 0,
    //    "total_page": 0,
    //    "bean": {
    //    "bean_type": "BeanList",
    //        "list_size": 10,
    //        "member": [
    //        {
    //            "bean_type": "BeanItemInfoProduct",
    //            "id": 1,
    //            "ts_created": 1434355592947,
    //            "ts_last_modified": 1437984937985,
    //            "name": "",
    //            "info": "",
    //            "facebook_product_id": 1468607626792468,
    //            "type": "freegift",
    //            "enable": true,
    //            "facebook_product_link": "",
    //            "base_coin": 0,
    //            "additional_percent": 0,
    //            "price": 0,
    //            "currency": ""
    //        }
    //"type": "freeslots",

    var that = this;
    this.listProduct = [];
    var freegiftFacebookProductId = null;
    var freeslotsFacebookProductId = null;
    var freekeyFacebookProductId = null;
    /**
     * Deprecated
     * @param callback
     */
    this.getListProductFromSv =
        function (callback) {
            var postData = {
                loginToken: LobbyConfig.loginToken
            };
            var callbackGetAllProduct = function (isSuccess, data) {
                if (isSuccess) {
                    that.getListProductFromData(data);
                }

                if (!Lobby.Utils.objectIsNull(callback)) {
                    callback(isSuccess);
                }
            };
            LobbyRequest.System.getAllProduct(callbackGetAllProduct);

        };
    /**
     * Init list product from data
     * @param data
     */
    this.getListProductFromData = function(data)
    {
        Lobby.Utils.printConsoleLog("getListProductFromData List product facebook ", data.member);
        that.listProduct = data.member;

        for (var i = 0; i < that.listProduct.length; i++) {
            var beanProduct = that.listProduct[i];
            if (beanProduct.type == "freegift") {
                freegiftFacebookProductId = beanProduct.facebook_product_id;
            } else if (beanProduct.type == "freeslots") {
                freeslotsFacebookProductId = beanProduct.facebook_product_id;
            } else if (beanProduct.type == "freekey") {
                freekeyFacebookProductId = beanProduct.facebook_product_id;
            }

            if (
                freegiftFacebookProductId !== null &&
                freekeyFacebookProductId !== null &&
                freeslotsFacebookProductId !== null) {
                break;
            }
        }
    };
    /**
     * Get free gift facebook product id
     * @returns {*}
     */
    this.getFreegiftFacebookProductId = function () {

        if (FacebookController.APP_ID == '822586904502053') {
            return '1476689462646842';
        }

        if (freegiftFacebookProductId != null) {
            return freegiftFacebookProductId;
        }
        return "1468607626792468";

    };
    /**
     * Deprecated
     * @returns {*}
     */
    this.getFreeslotsFacebookProductId = function () {

        if (FacebookController.APP_ID == '822586904502053') {
            return '440654659470571';
        }

        if (freeslotsFacebookProductId != null) {
            return freeslotsFacebookProductId;
        }
        return "1597163590546696";

    };
    /**
     * Get free key facebook product id
     * @returns {*}
     */
    this.getFreekeyFacebookProductId = function () {

        if (FacebookController.APP_ID == '822586904502053') {
            return '521773871305191';
        }

        if (freekeyFacebookProductId != null) {
            return freekeyFacebookProductId;
        }
        return "683278435137194";

    };

    var those = this;
    this.listProductDynamic = [];
    this.getListProductDynamicFromSv =
        function (callback) {
            var postData = {
                //loginToken: LobbyConfig.loginToken
            };
            var callbackGetAllProductDynamic = function (isSuccess, data) {
                if (isSuccess) {
                    Lobby.Utils.printConsoleLog("getListProductDynamicFromSv List product dynamic ", data.member);
                    those.listProductDynamic = data.member;
                    DynamicProductManager.init(those.listProductDynamic);

                    //for (var i = those.listProductDynamic.length-1; i >=0; i--) {
                    //    var beanProductDynamic = those.listProductDynamic[i];
                    //    if (beanProductDynamic.type == 0) {
                    //        LobbyUserData.productAmountF2P.push(beanProductDynamic.product_amount);
                    //        LobbyUserData.amountBonusF2P.push(beanProductDynamic.amount_bonus);
                    //        LobbyUserData.keyBonusF2P.push(beanProductDynamic.key_bonus);
                    //        LobbyUserData.diamondBonusF2P.push(beanProductDynamic.diamond_bonus);
                    //    }
                    //    else
                    //    {
                    //        LobbyUserData.productAmountP2P.push(beanProductDynamic.product_amount);
                    //        LobbyUserData.amountBonusP2P.push(beanProductDynamic.amount_bonus);
                    //        LobbyUserData.keyBonusP2P.push(beanProductDynamic.key_bonus);
                    //        LobbyUserData.diamondBonusP2P.push(beanProductDynamic.diamond_bonus);
                    //    }
                    //
                    //}
                }

                if (!Lobby.Utils.objectIsNull(callback)) {
                    callback(isSuccess);
                }
            };
            LobbyRequest.System.getAllProductDynamic(callbackGetAllProductDynamic);

        };


};