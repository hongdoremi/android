/**
 * Created by Phuoc Tran on 9/11/2015.
 * Lưu các message không hỗ trợ đa ngôn ngữ
 */
(function () {

    var root = this;

    'use strict';

    function define() {

        var LobbyLanguageConstant = {};
        LobbyLanguageConstant.CANNOT_CONNECT_TO_SERVER = "Can not connect to server! Please try again later ...";
        LobbyLanguageConstant.SERVER_MAINTENANCE = "Server maintenance. Please check back later ...";
        LobbyLanguageConstant.LOGGED_SOMEWHERE_ELSE = "Your account has been logged in from another location. Please reload the game";
        LobbyLanguageConstant.LOADING_SCENE_MESSAGE_1 = "Loading the lobby";
        LobbyLanguageConstant.LOADING_SCENE_MESSAGE_2 = "Loading slot game";

        return LobbyLanguageConstant;
    }

    if (typeof (LobbyLanguageConstant) === 'undefined') {
        window.LobbyLanguageConstant = define();
    }
    else {
        Lobby.Utils.printConsoleLog("LobbyConstant already defined.");
    }

})(this);