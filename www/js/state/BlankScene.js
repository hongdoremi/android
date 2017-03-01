
LobbyC.BlankScene = (function (my) {
    my.preload = function () {

    };
    my.create = function () {

        my.game.stage.disableVisibilityChange = true;
        my.game.stage.backgroundColor = "#333";
        LobbyConfig.stopRequestAjax = false;
        Lobby.PhaserJS.clearInterval(LobbyC.MainMenu.functionInterval);
        Lobby.PhaserJS.clearInterval(LobbyC.MainMenu.freeCoinInterval);
        if(LobbyC.MainMenu.booster != null) Lobby.PhaserJS.clearInterval(LobbyC.MainMenu.booster.interval);
        ScheduleManager.stopSchedule(my);

        if ((typeof cordova === "undefined")) {
            my.isWebInLoginScene = true;
        }
        ManagerForEvent.initInLoginScene(my);
        ManagerForEvent.init(my);
    };
    /**
     * Scale game for fitting device
     */

    return my;
}(LobbyC.BlankScene || {}));
