/**
 * Created by nguyendat on 7/10/15.
 */

//{
//    "bean_type": "BeanResultWithBeanBasic",
//    "core_result_code": 0,
//    "total_page": 0,
//    "bean": {
//    "bean_type": "BeanItemInfoDailyBonus",
//        "id": 0,
//        "ts_created": 1436494973874,
//        "ts_last_modified": 1436494973874,
//        "name": "",
//        "info": "",
//        "factor": 4,
//        "coin": 2000,
//        "level_bonus": 1000,
//        "number_of_friend": 5,
//        "number_of_active_friend": 1,
//        "coin_per_friend": 500,
//        "coin_per_active_friend": 1000,
//        "total_coin": 12500,
//        "box": 1
//        "vip_benefit": 1
//}


//Manager4MyUserInfo.startTimerGetUserInfo(my);
var Manager4Spin = new function () {
    var beanDailyBonus = null;
    var isGetSpinFromSV = false;

    this.getCurrentSpinInfo =
        function(){

        return beanDailyBonus;
    };
    /**
     * Get spin info from server
     * @param resultFunc
     */
    this.getSpinFromSV =
        function(resultFunc){

            if(isGetSpinFromSV){
                return;
            }
            isGetSpinFromSV = true;

            var exit = function(){
                Lobby.Utils.printConsoleLog("getSpinFromSV get spins info done ");
                if(beanDailyBonus !== null){
                    // Lobby.Utils.printConsoleLog(beanDailyBonus.ts_last_modified);
                    Lobby.Utils.printConsoleLog("getSpinFromSV beanDailyBonus: ", convertJSON(beanDailyBonus));
                }else{
                    Lobby.Utils.printConsoleLog("getSpinFromSV NO bean daily bonus");
                }
                if(resultFunc){
                    resultFunc(beanDailyBonus);
                }
                beanDailyBonus = null;
                isGetSpinFromSV = false;
            };
            var callback = function (isSuccess, data) {
                if (isSuccess) {
                    beanDailyBonus = data;
                }
                exit();
            };
            LobbyRequest.User.collectDailyBonusWheel(callback, null);
        };

};