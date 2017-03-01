/**
 * Created by Duy on 9/22/2016.
 */
/**
 * THIS CLASS CONTAINS CONSTANT VALUE FOR GAME
 * @returns {{}} Object GAMECONSTANT
 * @constructor
 */
function GameConstant(nameGame) {

    var GameConstant = {};
    GameConstant.State = {
        MainGame: 0,
        DoubleUp: 1,
        FreeSpin: 2,
        Bonus: 3
    };

    //GameConstant.domainName = {
    //    gameService: {
    //        authorization: "http://rslotservice.viosl.com/onlinecasino/common/authorization",
    //        getBalance: "http://rslotservice.viosl.com/onlinecasino/common/GetBalance",
    //        getBet: "http://rslotservice.viosl.com/onlinecasino/games/" + nameGame+ "/getbets",
    //        spin: "http://rslotservice.viosl.com/onlinecasino/games/" + nameGame+ "/spin",
    //        bonusGame: "http://rslotservice.viosl.com/onlinecasino/games/" + nameGame+ "/BonusGame"
    //    }
    //};

    GameConstant.domainName = {
        gameService: {
            authorization: LobbyConfig.GamePlayAppDomain+"/lobby-gameplay/gameplay/authorizationByToken",
            getBalance: LobbyConfig.GamePlayAppDomain+"/lobby-gameplay/gameplay/getBalance",
            getBet: LobbyConfig.GamePlayAppDomain+"/lobby-gameplay/gameplay/" + nameGame+ "/getBet",
            spin: LobbyConfig.GamePlayAppDomain+"/lobby-gameplay/gameplay/" + nameGame+ "/spin",
            bonusGame: LobbyConfig.GamePlayAppDomain+"/lobby-gameplay/gameplay/" + nameGame+ "/bonusGame"
        }
    };

    //GameConstant.domainName = {
    //    gameService: {
    //        authorization: "https://mobilegp.playpalace.com/lobby-gameplay/gameplay/authorizationByToken",
    //        getBalance: "https://mobilegp.playpalace.com/lobby-gameplay/gameplay/getBalance",
    //        getBet: "https://mobilegp.playpalace.com/lobby-gameplay/gameplay/" + nameGame+ "/getBet",
    //        spin: "https://mobilegp.playpalace.com/lobby-gameplay/gameplay/" + nameGame+ "/spin",
    //        bonusGame: "https://mobilegp.playpalace.com/lobby-gameplay/gameplay/" + nameGame+ "/bonusGame"
    //    }
    //};

    //GameConstant.domainName = {
    //    gameService: {
    //        authorization: "https://mobilegp.mmcorp.cn/lobby-gameplay/gameplay/authorizationByToken",
    //        getBalance: "https://mobilegp.mmcorp.cn/lobby-gameplay/gameplay/getBalance",
    //        getBet: "https://mobilegp.mmcorp.cn/lobby-gameplay/gameplay/" + nameGame+ "/getBet",
    //        spin: "https://mobilegp.mmcorp.cn/lobby-gameplay/gameplay/" + nameGame+ "/spin",
    //        bonusGame: "https://mobilegp.mmcorp.cn/lobby-gameplay/gameplay/" + nameGame+ "/bonusGame"
    //    }
    //};
    if(LobbyConfig.isTestStrategy){
        GameConstant.gameIdInt = LobbyConfig.slotGameConfig[nameGame];
    }
    else{
        var id = 0;
        switch (nameGame){
            case "DeepBlue":
                id = 1;
                break;
            case "GoldenEggs":
                id = 2;
                break;
            case "RomanEmpire":
                id = 3;
                break;
            case "Pharaoh":
                id = 4;
                break;
            case "Boxing":
                id = 5;
                break;
            case "Nezha":
                id = 6;
                break;
        }
        GameConstant.gameIdInt = id;
    }
    GameConstant.nameGame = nameGame;


    GameConstant.viewFlowCMain = false;
    GameConstant.viewFlowCGame = false;
    GameConstant.viewFlowCWinAnim = false;
    GameConstant.viewFlowCSettingsInfoPanel = false;
    GameConstant.viewFlowCBonusFreeSpin = false;
    GameConstant.viewFlowMusicManager = false;
    GameConstant.viewFlowCWinPanel = false;
    GameConstant.viewFlowCDoubleUp = false;

    //GameConstant.viewNetworkResponseXml = true;
    GameConstant.viewNetworkResponseXml = false;

    GameConstant.Account = {
        //funMode: true
        funMode: false
    };

    return GameConstant;
}

var VERSION_IMAGE = 3;