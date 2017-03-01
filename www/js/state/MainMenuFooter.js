LobbyC.MainMenu = (function (my) {

    my.functionInterval = null;
    my.reloadFriendInterval = null;

    //my.addTimer = function (timeStamp, clock) {
    //    Lobby.PhaserJS.clearTimer(my,my.functionInterval);
    //    var loop = function () {
    //        if (timeStamp >= 1) {
    //            --timeStamp;
    //            var minute = Math.floor(timeStamp / 60);
    //            var second = timeStamp - (minute * 60);
    //            clock.text = ((minute < 10) ? "0" + minute : minute) + ":" + ((second < 10) ? "0" + second : second);
    //        }
    //        else {
    //            Lobby.PhaserJS.clearTimer(my,my.functionInterval);
    //            my._userData.timeLeftToGetBonus = 0;
    //            clock.setText("Bonus");
    //        }
    //    };
    //    loop();
    //    my.functionInterval = my.time.events.loop( 1000,
    //      loop, this);
    //};

    return my;

}(LobbyC.MainMenu || {}));
