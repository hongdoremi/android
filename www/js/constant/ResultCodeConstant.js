/**
 * Created by Phuoc Tran on 9/11/2015.
 */
(function () {

    var root = this;

    'use strict';

    function define() {

        var ResultCodeConstant = {};
        ResultCodeConstant.RESULT_CODE_VALID = 0;
        ResultCodeConstant.RESULT_CODE_USER_NOT_HAVE_PERMISSION = -1;
        ResultCodeConstant.RESULT_CODE_TOKEN_EXPIRED = -456;
        ResultCodeConstant.RESULT_CODE_EMAIL_POLICY_ERROR = -999;

        ResultCodeConstant.RESULT_CODE_INVALID = -1000;
        ResultCodeConstant.RESULT_CODE_NOT_LOGIN = -1001;
        ResultCodeConstant.RESULT_CODE_NO_PERMISSION = -1002;
        ResultCodeConstant.RESULT_CODE_ACCESS_TOKEN_EXPIRED = -1003;
        ResultCodeConstant.RESULT_CODE_FB_TOKEN_UNAUTHORIZED = -1004;
        ResultCodeConstant.RESULT_CODE_EMPTY_STRING = -1005;
        ResultCodeConstant.RESULT_CODE_INVALID_VERSION = -1006;
        ResultCodeConstant.RESULT_CODE_FUNCTION_DISABLE = -1007;
        ResultCodeConstant.RESULT_CODE_INVALID_COINS = -1008;
        ResultCodeConstant.RESULT_CODE_NOT_TIME_YET = -1009;
        ResultCodeConstant.RESULT_CODE_GIFT_ALREADY_ACCEPTED = -1010;
        ResultCodeConstant.RESULT_CODE_SERVER_FILE_ERROR = -1100;
        ResultCodeConstant.RESULT_CODE_UNAVAILABLE_SERVER_CONFIG = -1050;
        ResultCodeConstant.RESULT_CODE_SEND_GIFT_TYPE_NON_SUPPORT = - 1101;

        /* Chỉ dùng để check các result code đặc biệt */
        ResultCodeConstant.RESULT_CODE_OK = -99999;

        ResultCodeConstant.RESULT_CODE_SERVER_MAINTENANCE = -1200;
        ResultCodeConstant.RESULT_CODE_FORCE_USER_RELOAD = -1300;

        ResultCodeConstant.RESULT_CODE_VOUCHER_EXPIRED = -1400;

        ResultCodeConstant.RESULT_CODE_USER_REJECTED_APP = -1500;

        ResultCodeConstant.RESULT_CODE_USER_REDEEM_VOUCHER_ALREADY = -1600;

        ResultCodeConstant.RESULT_CODE_USER_NOT_EXIST = -4000;
        ResultCodeConstant.RESULT_CODE_USER_BAN = -4001;
        ResultCodeConstant.RESULT_CODE_USER_NOT_ACTIVATE = -4002;
        ResultCodeConstant.RESULT_CODE_USER_EXIST = 4000;
        ResultCodeConstant.RESULT_CODE_USER_ACTIVATED = 4002;
        ResultCodeConstant.RESULT_CODE_USER_NOT_GUEST = 4004;

        ResultCodeConstant.RESULT_CODE_EMAIL_EXIST = 5000;
        ResultCodeConstant.RESULT_CODE_PASSWORD_POLICY_ERROR = -5000;
        ResultCodeConstant.RESULT_CODE_INVALID_PASSWORD = -5001;
        ResultCodeConstant.RESULT_CODE_RESET_PASSWORD_TOKEN_EXPIRED = -5500;

        ResultCodeConstant.RESULT_CODE_USER_LOGIN_IN_ANOTHER_LOCATION = -6000;

        ResultCodeConstant.RESULT_CODE_DEPRECATED_API = -7000;

        ResultCodeConstant.RESULT_CODE_MERCHANT_NOT_ALLOWED = -8000;

        ResultCodeConstant.RESULT_CODE_MERCHANT_IP_INVALID = -8500;

        ResultCodeConstant.RESULT_CODE_FACEBOOK_ERROR = -9000;

        ResultCodeConstant.RESULT_CODE_DATE_INVALID = -9100;
        ResultCodeConstant.RESULT_CODE_TIME_CALL_INVALID = -9101;

        ResultCodeConstant.RESULT_CODE_NON_SUPPORT_START_DATE = -9200;

        ResultCodeConstant.RESULT_CODE_CANT_DECRYPT_TEXT = -10000;
        ResultCodeConstant.RESULT_CODE_PAYMENT_EXIST = -10001;
        ResultCodeConstant.RESULT_CODE_INVALID_PRODUCT_ID = -10002;
        ResultCodeConstant.RESULT_CODE_VERIFY_GOOGLE_RECEIPT_FAIL = -10003;
        ResultCodeConstant.RESULT_CODE_INVALID_APP_ID = -10004;
        ResultCodeConstant.RESULT_CODE_ERROR_CODE_FROM_GOOGLE_SERVER = -10005;
        ResultCodeConstant.RESULT_CODE_ERROR_CODE_FROM_APPLE_SERVER = -10006;
        ResultCodeConstant.RESULT_CODE_INVALID_PACKAGE_TYPE = -10007;
        ResultCodeConstant.RESULT_CODE_INVALID_MOBILE_PLATFORM = -10008;

        ResultCodeConstant.RESULT_CODE_INVALID_CIDR_NOTATION = -11000;
        ResultCodeConstant.RESULT_CODE_INVALID_MERCHANT_ID = -11500;

        ResultCodeConstant.RESULT_CODE_NO_COMEBACK_BONUS = -12000;

        ResultCodeConstant.RESULT_CODE_SPIN_TOO_FAST = -13000;

        // 2015-12-30: Phuoc: dùng khi update name/avatar, chỉ có user loại username/password mới được update name/avatar
        ResultCodeConstant.RESULT_CODE_INVALID_USER_TYPE = -14000;
        ResultCodeConstant.RESULT_CODE_INVALID_FILE_TYPE = -15000;

        ResultCodeConstant.RESULT_CODE_INVALID_IMAGE_DIMENSION = -16000;

        ResultCodeConstant.RESULT_CODE_FORCE_CLIENT_UPDATE_APP_LOBBY = -17000;

        ResultCodeConstant.RESULT_CODE_INVALID_VOUCHER_TOKEN = -18000;

        ResultCodeConstant.RESULT_CODE_NOT_ENOUGH_CROWN_TO_UNLOCK_SLOT_GAME = -19000;
        ResultCodeConstant.RESULT_CODE_NOT_ENOUGH_LEVEL_TO_UNLOCK_SLOT_GAME = -20000;

        ResultCodeConstant.RESULT_CODE_INCOMPLETE_ACHIEVEMENT = -21000;
        ResultCodeConstant.RESULT_CODE_ACHIEVEMENT_IS_ALREADY_COLLECTED = -22000;
        ResultCodeConstant.RESULT_CODE_NOT_GUEST_USER = -23000;
        ResultCodeConstant.RESULT_CODE_LEVEL_EXIST = -24000;

        // 2016-03-05: Ty:
        ResultCodeConstant.RESULT_CODE_EXCEED_MAX_NUMBER_OF_TIME_CHANGE_NAME = -25000;

        // 2016-03-11: Phuoc:
        ResultCodeConstant.RESULT_CODE_TUTORIAL_REWARD_IS_ALREADY_REDEEMED = -26000;

        //03-21-2016: Dac
        ResultCodeConstant.RESULT_CODE_INVALID_RESOURCE_VERSION = -27000;

        // 2016-04-05: Toan
        ResultCodeConstant.RESULT_CODE_FAIL_TO_CHECK_HMAC = -28000;
        ResultCodeConstant.RESULT_CODE_FAIL_TO_SAVE = -29000;
        ResultCodeConstant.RESULT_CODE_INTERNAL_SERVER_ERROR = -30000;
        ResultCodeConstant.RESULT_CODE_FAIL_TO_PARSE_USER_ID = -31000;


        // 2016-04-11: Toan
        ResultCodeConstant.RESULT_CODE_TRANSACTION_ID_EXIST = -32000;
        ResultCodeConstant.RESULT_CODE_PLATFORM_WRONG = -33000;

        // 2016-04-28: Toan
        ResultCodeConstant.RESULT_CODE_NOT_ALLOW_GET_PRE_TUTORIAL_REWARD = -34000;

        ResultCodeConstant.RESULT_CODE_API_TOKEN_INVALID = -41000;
        ResultCodeConstant.RESULT_CODE_API_TOKEN_IS_EXPIRED = -42000;

        ResultCodeConstant.RESULT_CODE_EMAIL_NOT_EXIST = -50001;
        ResultCodeConstant.RESULT_CODE_SLOT_GAME_UNLOCKED = -50002;

        /* -------------------------------------------------- Strategy -------------------------------------------------- */
        ResultCodeConstant.RESULT_CODE_DAILY_BONUS_STREAK_IS_ALREADY_COLLECTED = -60000;

        ResultCodeConstant.RESULT_CODE_FREE_COIN_GIFT_NOT_READY = -60010;

        ResultCodeConstant.RESULT_CODE_ALREADY_SEND_GIFT_FROM_REFERENCE_CODE = -60020;
        ResultCodeConstant.RESULT_CODE_REFERENCE_CODE_NOT_EXIT = -60021;
        ResultCodeConstant.RESULT_CODE_REFERENCE_CODE_MAX_TIME_REFER = -60022;
        ResultCodeConstant.RESULT_CODE_REFERENCE_CODE_YOUR_OWN_CODE = -60023;

        ResultCodeConstant.RESULT_CODE_DAILY_BONUS_LUCKY_SPIN_IS_ALREADY_COLLECTED = -60030;

        ResultCodeConstant.RESULT_CODE_NOT_ENOUGH_LEVEL_TO_USE_THIS_FEATURE = -60040;

        ResultCodeConstant.RESULT_CODE_INVALID_QUANTITY_OF_SPIN_FOR_LUCKY_WHEEL = -60050;
        ResultCodeConstant.RESULT_CODE_NOT_ENOUGH_CROWN_TO_BUY_SPIN_OF_LUCKY_WHEEL = -60051;

        ResultCodeConstant.RESULT_CODE_INVALID_LUCKY_BOX_TYPE = -60060;
        ResultCodeConstant.RESULT_CODE_INVALID_QUANTITY_LUCKY_BOX = -60061;

        ResultCodeConstant.RESULT_CODE_TYPE_LEADERBOARD_NON_SUPPORT = -60070;

        ResultCodeConstant.RESULT_CODE_TYPE_DAILY_CHALLENGE_REWARD_IS_ALREADY_COLLECTED = -60080;
        ResultCodeConstant.RESULT_CODE_TYPE_DAILY_CHALLENGE_IS_INCOMPLETE = -60081;
        /* -------------------------------------------------- Strategy -------------------------------------------------- */






        return ResultCodeConstant;
    }

    if (typeof (ResultCodeConstant) === 'undefined') {
        window.ResultCodeConstant = define();
    }
    else {
        Lobby.Utils.printConsoleLog("ResultCodeConstant already defined.");
    }

})(this);