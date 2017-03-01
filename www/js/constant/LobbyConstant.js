/**
 * Created by Phuoc Tran on 9/11/2015.
 */
(function () {

    var root = this;

    'use strict';

    function define() {

        var LobbyConstant = {};
        /*Login and Sign up*/
        LobbyConstant.TIMEOUT_4_REQUEST = 20000;

        LobbyConstant.RESULT_CODE_USER_EXIST = 4000;
        LobbyConstant.RESULT_CODE_PASSWORD_POLICY_ERROR = -5000;

        LobbyConstant.RESULT_CODE_ERROR_1 = -1000;
        LobbyConstant.RESULT_CODE_ERROR_NOT_LOGIN = -1001;
        LobbyConstant.RESULT_CODE_ERROR_TOKEN_EXPIRED = -1004;
        LobbyConstant.RESULT_CODE_ERROR_INVAILID_VERISON = -1006;
        LobbyConstant.RESULT_CODE_ERROR_SERVER_MAINTAIN = -1200;
        LobbyConstant.RESULT_CODE_ERROR_VOUCHER_EXPIRED = -1400;
        LobbyConstant.RESULT_CODE_ERROR_USER_REJECTED_APP = -1500;
        LobbyConstant.RESULT_CODE_ERROR_VOUCHER_ACCEPTED = -1600;
        LobbyConstant.RESULT_CODE_ERROR_LOGIN_SOME_WHERE = -6000;
        LobbyConstant.RESULT_CODE_ERROR_FACEBOOK_ERROR = -9000;
        LobbyConstant.RESULT_CODE_ERROR_REACH_LIMIT_CHANGE_NAME = -25000;
        LobbyConstant.RESULT_CODE_ERROR_USER_NOT_ACTIVE = -4002;
        LobbyConstant.RESULT_CODE_ERROR_WRONG_PASSWORD = -4000;
        LobbyConstant.RESULT_CODE_ERROR_WRONG_USERNAME = -5001;

        LobbyConstant.RESULT_CODE_FORCE_CLIENT_UPDATE_APP_LOBBY = -17000;

        LobbyConstant.RESULT_CODE_PAYMENT_EXIST = -10001;

        LobbyConstant.MINIUM_COIN_TO_SHOW_GET_COIN = 100000;
        LobbyConstant.PACKAGE_TYPE_UNKNOWN = 0;
        LobbyConstant.PACKAGE_TYPE_COIN = 1;
        LobbyConstant.PACKAGE_TYPE_KEY = 2;
        LobbyConstant.PACKAGE_TYPE_STARTER = 3;
        LobbyConstant.PACKAGE_TYPE_30_DAYS_COIN = 4;

        LobbyConstant.PACKAGE_TYPE_TIER_PLAYER_F2P = 5;
        LobbyConstant.PACKAGE_TYPE_TIER_PLAYER_P2P = 6;

        LobbyConstant.PACKAGE_TYPE_CROWN = 7;
        LobbyConstant.TIME_TO_SHOW_OFFER = 259200000;
        LobbyConstant.COIN_FOR_SHOW_OFFER = 3600000;

        LobbyConstant.BUY_MISSING_COIN_OR_CROWN_POPUP_TYPE_COIN = 0;
        LobbyConstant.BUY_MISSING_COIN_OR_CROWN_POPUP_TYPE_CROWN = 1;


        //ERROR MESSAGE
        LobbyConstant.ERROR_MESSAGE_NOT_LOGIN = 'not_login';
        LobbyConstant.ERROR_MESSAGE_SERVER_ERROR = 'server_error';
        LobbyConstant.ERROR_MESSAGE_SERVER_MAINTAIN = 'server_maintain';
        LobbyConstant.ERROR_MESSAGE_USER_REJECTED_APP = 'user_rejected_app';
        LobbyConstant.ERROR_MESSAGE_LOGIN_SOME_WHERE = 'login_some_where';
        LobbyConstant.ERROR_MESSAGE_FACEBOOK_ERROR = 'facebook_error';
        LobbyConstant.ERROR_MESSAGE_TOKEN_EXPIRED = 'token_expired';
        LobbyConstant.ERROR_MESSAGE_REACH_LIMITE_CHANGE_NAME = 'reach_limit_change_name';
        LobbyConstant.ERROR_MESSAGE_INVALID_VERSION = 'invalid_version';
        LobbyConstant.ERROR_CODE_FORCE_CLIENT_UPDATE_APP_LOBBY = 'force_update_version';

        LobbyConstant.LeaderBoard = {
            sort: {
                all: "all",
                friend: "friends"
            },
            type: {
                bank_roll: "bank_roll",
                slot_total_bet: "slot_total_bet",
                biggest_win: "biggest_win",
                net_profit: "net_profit",
                jackpot: "jackpot"
            },
            SORT_LEADER_BOARD_BY_COIN: 1,
            SORT_LEADER_BOARD_BY_SLOT_TOTAL_BET: 2
        };


        LobbyConstant.LoginFrom = {
            facebook: "fb",
            web: "web",
            guest: "guest",
            playpalace: "playpalace"
        };

        LobbyConstant.isNotInGame = 0;
        LobbyConstant.isInGame = 1;


        LobbyConstant.keyForStoringDataPopupsPromotion = {
            clickedBuyNowPopupStarter: "CLICKED BUY NOW POPUP STARTER",
            numberOfShowF2PConsecutive: "NUMBER OF SHOW F2P CONSECUTIVE",
            tsLastShowF2P: "TS LAST SHOW F2P"
        };
        LobbyConstant.PREFIX_GAME = "game_";
        LobbyConstant.PREFIX_GAME_MOBILE = "mobile_";
        LobbyConstant.Constant4Tutorial = {
            numberOfStep: 10,
            StepWelcomeScene: 0,
            StepPickGame: 1,
            StepChangeBet: 2,
            StepCustomize: 3,
            StepSpin: 4,
            StepClickHomeButton: 5,
            StepShowAchievementPopup: 6,
            StepShowPopupShop: 7,
            StepClickFreeCoin: 8,
            StepEnd: 9,
            keyStoringCurrentStep: "currentStepTutorial",
            keyStoringFirstLogin: "isFirstLogin",
            keyStoringIsCreateUserFromThisDevice: "isCreateUserFromThisDevice",
            keyStoringIsCompleteSuccessTutorialRequest: "IsCompleteSuccessTutorialRequest"
        };

        LobbyConstant.API_COMBINATION_BEAN_NAME_GET_MY_PROFILE = "BeanMyProfile";
        LobbyConstant.API_COMBINATION_BEAN_NAME_CHECK_COLLECT_COIN = "BeanCheckCollectCoin";
        LobbyConstant.API_COMBINATION_BEAN_NAME_GET_SPECIAL_OFFER = "BeanSpecialOffer";
        LobbyConstant.API_COMBINATION_BEAN_NAME_GET_ALL_CONFIG = "BeanAllConfig";
        LobbyConstant.API_COMBINATION_BEAN_NAME_GET_LINK_GAME = "BeanLinkGame";
        LobbyConstant.API_COMBINATION_BEAN_NAME_GET_LEVEL_CONFIG = "BeanLevelConfig";
        LobbyConstant.API_COMBINATION_BEAN_NAME_GET_ALL_LIST_SLOT_GAME_INFO = "BeanAllListSlotGameInfo";
        LobbyConstant.API_COMBINATION_BEAN_NAME_GET_LIST_BET_SIZE_RESTRICTION = "BeanListBetSizeRestriction";

        LobbyConstant.API_BONUS_BEAN_TYPE_DAILY_BONUS_STREAK = "BeanDailyBonusStreak";
        LobbyConstant.API_BONUS_BEAN_TYPE_FREE_COIN_GIFT = "BeanFreeCoinGift";
        LobbyConstant.API_BONUS_BEAN_TYPE_REFERENCE_CODE = "BeanReferenceCode";
        LobbyConstant.API_BONUS_BEAN_TYPE_DAILY_BONUS_LUCKY_SPIN = "BeanDailyBonusLuckySpin";
        LobbyConstant.API_BONUS_BEAN_TYPE_LUCKY_WHEEL = "BeanLuckyWheel";
        LobbyConstant.API_BONUS_BEAN_TYPE_LUCKY_BOX = "BeanLuckyBox";
        LobbyConstant.API_BONUS_BEAN_TYPE_PIGGY_BANK = "BeanPiggyBank";
        LobbyConstant.API_BONUS_BEAN_TYPE_BOOSTER = "BeanBooster";
        LobbyConstant.API_BONUS_BEAN_TYPE_COMEBACK_BONUS = "BeanComebackBonusMobile";
        LobbyConstant.API_BONUS_BEAN_TYPE_MAGIC_ITEM = "BeanMagicItem";

        LobbyConstant.API_FEATURE_BEAN_TYPE_DAILY_BONUS_STREAK = "BeanListDailyBonusStreakConfig";
        LobbyConstant.API_FEATURE_BEAN_TYPE_FREE_COIN_GIFT = "BeanListFreeCoinGiftConfig";
        LobbyConstant.API_FEATURE_BEAN_TYPE_UNLOCK_BY_LEVEL = "BeanListUnlockFeatureByLevelConfig";
        LobbyConstant.API_FEATURE_BEAN_TYPE_LUCKY_WHEEL = "BeanListLuckyWheelConfig";
        LobbyConstant.API_FEATURE_BEAN_TYPE_DAILY_CHALLENGE = "BeanListDailyChallengeConfig";
        LobbyConstant.API_FEATURE_BEAN_TYPE_BOOSTER = "BeanListBoosterLevelUpBonusConfig";
        LobbyConstant.API_FEATURE_BEAN_TYPE_MOBILE_SLOT_GAME_CONFIG = "BeanMobileSlotGameConfig";
        LobbyConstant.API_FEATURE_BEAN_TYPE_MOBILE_SLOT_GAME_PAY_LINE_CONFIG = "BeanMobileSlotGamePaylineConfig";

        LobbyConstant.API_FEATURE_BEAN_TYPE_BOOSTER_FACTOR_1 = "booster_level_up_bonus_multiplication_factor1";
        LobbyConstant.API_FEATURE_BEAN_TYPE_BOOSTER_FACTOR_2 = "booster_level_up_bonus_multiplication_factor2";


        LobbyConstant.UNLOCK_FEATURE_BY_LEVEL_PREFIX = "unlock_feature_by_level_";
        LobbyConstant.API_BONUS_NAME_UFBL_DAILY_CHANLLENGE = LobbyConstant.UNLOCK_FEATURE_BY_LEVEL_PREFIX + "daily_challenge";
        LobbyConstant.API_BONUS_NAME_UFBL_PIGGY_BANK = LobbyConstant.UNLOCK_FEATURE_BY_LEVEL_PREFIX + "piggy_bank";
        LobbyConstant.API_BONUS_NAME_UFBL_CHOOSE_PAY_LINE = LobbyConstant.UNLOCK_FEATURE_BY_LEVEL_PREFIX + "choose_pay_line";


        /* -------------------------------------------- Daily Challenge Type -------------------------------------------- */
        LobbyConstant.DAILY_CHALLENGE_TYPE_LEVEL_UP = 1;
        LobbyConstant.DAILY_CHALLENGE_TYPE_RECEIVE_GIFT = 2;
        LobbyConstant.DAILY_CHALLENGE_TYPE_SEND_GIFT = 3;
        LobbyConstant.DAILY_CHALLENGE_TYPE_COLLECT_FREE_COIN_GIFT = 4;
        LobbyConstant.DAILY_CHALLENGE_TYPE_SPIN = 5;
        LobbyConstant.DAILY_CHALLENGE_TYPE_MAX_BET = 6;
        LobbyConstant.DAILY_CHALLENGE_TYPE_BIG_WIN = 7;
        LobbyConstant.DAILY_CHALLENGE_TYPE_MEGA_WIN = 8;
        LobbyConstant.DAILY_CHALLENGE_TYPE_TOTAL_BET = 9;
        LobbyConstant.DAILY_CHALLENGE_TYPE_TOTAL_WIN = 10;
        /* -------------------------------------------- Daily Challenge Type -------------------------------------------- */


        LobbyConstant.platformMobile = 1;

        LobbyConstant.defaultUserName = "Lion";

        LobbyConstant.stateName = {
            Boot: "Boot",
            Login: "Login",
            InitSession: "InitSession",
            Preloader: "Preloader",
            MainMenu: "MainMenu",
            GameSlot: "GameSlot",
            LuckyWheel: "LuckyWheel",
            BlankScene: "BlankScene"
        };


        /* Download */
        LobbyConstant.DOWNLOAD_PLAY_OTHER_AVAILABLE_GAME = " Meanwhile you can play other available\ngames. A Wi-Fi connection is recommended to\ndownload the slot, 3G/LTE charges may apply.";
        LobbyConstant.DOWNLOAD_REMOVE_GAME = "Remove a game anytime by pressing and holding it down"
        LobbyConstant.memoryError = "memoryError";

        /* Apple package type */
        LobbyConstant.APPLE_PACKAGE_TYPE_UNKNOWN = 0;
        LobbyConstant.APPLE_PACKAGE_TYPE_COIN = 10;
        LobbyConstant.APPLE_PACKAGE_TYPE_COIN_1 = 11; // 400,000
        LobbyConstant.APPLE_PACKAGE_TYPE_COIN_2 = 12; // 880,000
        LobbyConstant.APPLE_PACKAGE_TYPE_COIN_3 = 13; // 2,400,000
        LobbyConstant.APPLE_PACKAGE_TYPE_COIN_4 = 14; // 7,200,000
        LobbyConstant.APPLE_PACKAGE_TYPE_COIN_5 = 15; // 24,000,000
        LobbyConstant.APPLE_PACKAGE_TYPE_COIN_6 = 16; // 70,000,000
        LobbyConstant.APPLE_PACKAGE_TYPE_COIN_7 = 17; // 200,000,000
        LobbyConstant.APPLE_PACKAGE_TYPE_CROWN = 70;
        LobbyConstant.APPLE_PACKAGE_TYPE_CROWN_1 = 71;
        LobbyConstant.APPLE_PACKAGE_TYPE_CROWN_2 = 72;
        LobbyConstant.APPLE_PACKAGE_TYPE_CROWN_3 = 73;
        LobbyConstant.APPLE_PACKAGE_TYPE_SPECIAL_OFFER = 80;
        LobbyConstant.APPLE_PACKAGE_TYPE_BOOSTER_1 = 91;
        LobbyConstant.APPLE_PACKAGE_TYPE_BOOSTER_2 = 92;
        LobbyConstant.APPLE_PACKAGE_TYPE_LUCKY_WHEEL_1 = 101;
        LobbyConstant.APPLE_PACKAGE_TYPE_LUCKY_WHEEL_2 = 102;
        LobbyConstant.APPLE_PACKAGE_TYPE_LUCKY_WHEEL_3 = 103;
        LobbyConstant.APPLE_PACKAGE_TYPE_PIGGY_BANK_1 = 111;
        LobbyConstant.APPLE_PACKAGE_TYPE_MAGIC_ITEM_100_PERCENT_WIN = 121;
        LobbyConstant.APPLE_PACKAGE_TYPE_MAGIC_ITEM_LUCKY_SPIN_10_PERCENT = 122;
        LobbyConstant.APPLE_PACKAGE_TYPE_MAGIC_ITEM_LUCKY_SPIN_20_PERCENT = 123;
        LobbyConstant.APPLE_PACKAGE_TYPE_MAGIC_ITEM_DOUBLE_EXP = 124;
        LobbyConstant.APPLE_PACKAGE_TYPE_MAGIC_ITEM_LUCKY_SYMBOL = 125;
        /* Google package type */
        LobbyConstant.GOOGLE_PACKAGE_TYPE_UNKNOWN = 0;
        LobbyConstant.GOOGLE_PACKAGE_TYPE_COIN = 10;
        LobbyConstant.GOOGLE_PACKAGE_TYPE_COIN_1 = 11; // 400,000
        LobbyConstant.GOOGLE_PACKAGE_TYPE_COIN_2 = 12; // 880,000
        LobbyConstant.GOOGLE_PACKAGE_TYPE_COIN_3 = 13; // 2,400,000
        LobbyConstant.GOOGLE_PACKAGE_TYPE_COIN_4 = 14; // 7,200,000
        LobbyConstant.GOOGLE_PACKAGE_TYPE_COIN_5 = 15; // 24,000,000
        LobbyConstant.GOOGLE_PACKAGE_TYPE_COIN_6 = 16; // 70,000,000
        LobbyConstant.GOOGLE_PACKAGE_TYPE_COIN_7 = 17; // 200,000,000
        LobbyConstant.GOOGLE_PACKAGE_TYPE_CROWN = 70;
        LobbyConstant.GOOGLE_PACKAGE_TYPE_CROWN_1 = 71;
        LobbyConstant.GOOGLE_PACKAGE_TYPE_CROWN_2 = 72;
        LobbyConstant.GOOGLE_PACKAGE_TYPE_CROWN_3 = 73;
        LobbyConstant.GOOGLE_PACKAGE_TYPE_SPECIAL_OFFER = 80;
        LobbyConstant.GOOGLE_PACKAGE_TYPE_BOOSTER_1 = 91;
        LobbyConstant.GOOGLE_PACKAGE_TYPE_BOOSTER_2 = 92;
        LobbyConstant.GOOGLE_PACKAGE_TYPE_LUCKY_WHEEL_1 = 101;
        LobbyConstant.GOOGLE_PACKAGE_TYPE_LUCKY_WHEEL_2 = 102;
        LobbyConstant.GOOGLE_PACKAGE_TYPE_LUCKY_WHEEL_3 = 103;
        LobbyConstant.GOOGLE_PACKAGE_TYPE_PIGGY_BANK_1 = 111;
        LobbyConstant.GOOGLE_PACKAGE_TYPE_MAGIC_ITEM_100_PERCENT_WIN = 121;
        LobbyConstant.GOOGLE_PACKAGE_TYPE_MAGIC_ITEM_LUCKY_SPIN_10_PERCENT = 122;
        LobbyConstant.GOOGLE_PACKAGE_TYPE_MAGIC_ITEM_LUCKY_SPIN_20_PERCENT = 123;
        LobbyConstant.GOOGLE_PACKAGE_TYPE_MAGIC_ITEM_DOUBLE_EXP = 124;
        LobbyConstant.GOOGLE_PACKAGE_TYPE_MAGIC_ITEM_LUCKY_SYMBOL = 125;

        /* ----------------------------------------------- Magic Item ----------------------------------------------- */
        LobbyConstant.MAGIC_ITEM_TYPE_DEFAULT = 0; // normal spin without magic item
        LobbyConstant.MAGIC_ITEM_TYPE_100_PERCENT_WIN = 1;
        LobbyConstant.MAGIC_ITEM_TYPE_LUCKY_SPIN_TYPE_1 = 2;
        LobbyConstant.MAGIC_ITEM_TYPE_LUCKY_SPIN_TYPE_2 = 3;
        LobbyConstant.MAGIC_ITEM_TYPE_DOUBLE_EXP = 4;
        LobbyConstant.MAGIC_ITEM_TYPE_LUCKY_SYMBOL = 5;
        /* ----------------------------------------------- Magic Item ----------------------------------------------- */
        /* ----------------------------------------------- Limit Money for Magic Item ----------------------------------------------- */
        LobbyConstant.MAGIC_ITEM_MONEY_LIMIT = [null,45000,45000,45000,null,null];
        LobbyConstant.MAGIC_ITEM_TYPE_DEFAULT_MONEY_LIMIT = null; // normal spin without magic item
        LobbyConstant.MAGIC_ITEM_TYPE_100_PERCENT_WIN_MONEY_LIMIT = 45000;
        LobbyConstant.MAGIC_ITEM_TYPE_LUCKY_SPIN_TYPE_1_MONEY_LIMIT = 45000;
        LobbyConstant.MAGIC_ITEM_TYPE_LUCKY_SPIN_TYPE_2_MONEY_LIMIT = 45000;
        LobbyConstant.MAGIC_ITEM_TYPE_DOUBLE_EXP_MONEY_LIMIT = null;
        LobbyConstant.MAGIC_ITEM_TYPE_LUCKY_SYMBOL_MONEY_LIMIT = null;
        /* ----------------------------------------------- Limit Money for Magic Item ----------------------------------------------- */



        /* ------------------------------------------- Simulator API Type ------------------------------------------- */
        LobbyConstant.SIMULATOR_API_TYPE_VIEW_VIDEO = 0;
        LobbyConstant.SIMULATOR_API_TYPE_COLLECT_DAILY_BONUS_STREAK_REWARD = 1;
        LobbyConstant.SIMULATOR_API_TYPE_COLLECT_FREE_COIN_GIFT_REWARD = 2;
        LobbyConstant.SIMULATOR_API_TYPE_COLLECT_DAILY_BONUS_LUCKY_SPIN_REWARD = 3;
        LobbyConstant.SIMULATOR_API_TYPE_COLLECT_DAILY_BONUS_WHEEL_REWARD = 4;
        LobbyConstant.SIMULATOR_API_TYPE_RESET_DAILY_CHALLENGE = 5;
        LobbyConstant.SIMULATOR_API_TYPE_BUY_BOOSTER_PACKAGE = 6;
        LobbyConstant.SIMULATOR_API_TYPE_BUY_PIGGY_BANK = 7;
        LobbyConstant.SIMULATOR_API_TYPE_BUY_MAGIC_ITEM = 8;
        LobbyConstant.SIMULATOR_API_TYPE_BUY_LUCKY_WHEEL = 9;
        /* ------------------------------------------- Simulator API Type ------------------------------------------- */


        LobbyConstant.RESET_TIMER = 1000*60*60*24;

        LobbyConstant.MOBILE_PLATFORM = 1;

        LobbyConstant.FREE_COIN_GIFT = {
            NAME_PREFIX: "free_coin_gift_coin_reward_",
            WAITING_TIME_PREFIX: "free_coin_gift_waiting_time_after_collecting_level_"
        };


        return LobbyConstant;
    }

    if (typeof (LobbyConstant) === 'undefined') {
        window.LobbyConstant = define();
    }
    else {
        Lobby.Utils.printConsoleLog("LobbyConstant already defined.");
    }

})(this);