LobbyC.MainMenu = (function (my) {

    var isDebug = LobbyConfig.isDebug;
    my.backGroundBody = null;
    //my.backGroundBodyHighResolutionTexture = "background-red";
    //my.backGroundBodyLowResolutionTexture = "background-low-red";

    /**
     * Deprecated
    */
    my.getSizeOfBrowser = function () {
        var myWidth = 0, myHeight = 0;
        if (typeof( window.innerWidth ) == 'number') {
            //Non-IE
            myWidth = window.innerWidth;
            myHeight = window.innerHeight;
        }
        else if (document.documentElement && ( document.documentElement.clientWidth || document.documentElement.clientHeight )) {
            //IE 6+ in 'standards compliant mode'
            myWidth = document.documentElement.clientWidth;
            myHeight = document.documentElement.clientHeight;
        }
        else if (document.body && ( document.body.clientWidth || document.body.clientHeight )) {
            //IE 4 compatible
            myWidth = document.body.clientWidth;
            myHeight = document.body.clientHeight;
        }
        return {width: myWidth, height: myHeight};
    };
    /**
     * Deprecated
     */
    my.autoSetTopIframe = function(){
        var sizeOfBrowser = my.getSizeOfBrowser();

        var browserName = Lobby.Utils.getBrowserName();
        var expectRatio = 1;
        var expectRatioWidthChangePhoto = 1;
        if (sizeOfBrowser.width != 0) {
            var expectRatioHeight = 1;
            var expectRatioWidth = 1;

            var xRatio = LobbyConfig.width / sizeOfBrowser.width;
            var lobbyConfigHeightExpect = LobbyConfig.height / xRatio;
            expectRatioHeight = lobbyConfigHeightExpect / sizeOfBrowser.height;

            var yRatio = LobbyConfig.height / sizeOfBrowser.height
            var lobbyConfigWidthExpect = LobbyConfig.width / yRatio;
            expectRatioWidth = lobbyConfigWidthExpect / sizeOfBrowser.width;


            if (browserName == "Explorer") {
                expectRatio = Math.min(1.1, expectRatioHeight);// Math.min(expectRatioHeight,expectRatioWidth);
            } else {
                expectRatio = Math.min(1, expectRatioHeight);// Math.min(expectRatioHeight,expectRatioWidth);
            }

            //expectRatio = Math.max(expectRatioHeight,expectRatioWidth);
            //expectRatio = expectRatioHeight;

            if (browserName == "Explorer") {
                expectRatioWidthChangePhoto = Math.min(1.1, expectRatioWidth);// Math.min(expectRatioHeight,expectRatioWidth);
            } else {
                expectRatioWidthChangePhoto = Math.min(1, expectRatioWidth);// Math.min(expectRatioHeight,expectRatioWidth);
            }

            //expectRatio = Math.max(expectRatioHeight,expectRatioWidth);
            //expectRatio = expectRatioHeight;
        }

        var topValue = 0 * expectRatio;

        //if(
        //    window.innerWidth == screen.width && window.innerHeight == screen.height&&
        //    browserName == "Explorer") {
        //    topValue = 187*expectRatio;
        //
        //}else
        if (my.currentUrlGameSlots == LobbyConfig.GameList.TexasMahjong && browserName != "Explorer") {
            topValue = 79 * expectRatio;
        }else if(browserName == "Explorer"){
            topValue = 90 * expectRatio;
        }
        var iframeGame = $('#iframe-game');
        //top = Math.max(-5,top);
        iframeGame.css("padding-top", topValue + "px");
        //iframeGame.css("padding-top",0+"%");
        //console.log(expectRatioHeight);

    };

    //my.update = function () {
    //
    //    // check for center wheel
    //    if (!Lobby.Utils.objectIsNull(Manager4MouseWheelCallback)) {
    //        Manager4MouseWheelCallback.updateCurrentActiveScrollView(my);
    //    }
    //
    //    var pos = my.input.activePointer.position;
    //
    //    var x = pos.x;
    //    var y = pos.y;
    //    var yCalculateByBrowser = my.yPercentageWebPage * LobbyConfig.height;
    //
    //    y = Math.min(y, yCalculateByBrowser);
    //
    //    var validWithHeader = true;
    //    if (my.uiHeader != null && my.uiHeader != undefined) {
    //
    //        var heightOfHeader = 100;// (my.uiHeader.y + my.uiHeader.height);
    //        //var miny = 0;
    //        //for (var i = 0, len = my.uiHeader.children.length; i < len; i++) {
    //        //    var child = my.uiHeader.children[i];
    //        //    if (child.y + child.height > heightOfHeader) {
    //        //        heightOfHeader = child.y + child.height;
    //        //    }
    //        //    if (child.y < miny) {
    //        //        miny = child.y;
    //        //    }
    //        //}
    //        //heightOfHeader = my.uiHeader.height;
    //        //heightOfHeader += miny;
    //        //
    //        //var extraPercent = 0.0;
    //        //heightOfHeader += (extraPercent * LobbyConfig.height);
    //        //
    //        //heightOfHeader += 20;
    //        validWithHeader = y < heightOfHeader;
    //
    //        //var delta2MoveUp = 0;
    //        //if (LobbyConfig.loginFrom == LobbyConstant.LoginFrom.facebook) {
    //        //    delta2MoveUp = -42;
    //        //}
    //        //else {
    //        //    delta2MoveUp = -48;
    //        //}
    //
    //
    //        var sizeOfBrowser = my.getSizeOfBrowser();
    //
    //        var browserName = Lobby.Utils.getBrowserName();
    //        var expectRatio = 1;
    //        var expectRatioWidthChangePhoto = 1;
    //        if (sizeOfBrowser.width != 0) {
    //            var expectRatioHeight = 1;
    //            var expectRatioWidth = 1;
    //
    //            var xRatio = LobbyConfig.width / sizeOfBrowser.width;
    //            var lobbyConfigHeightExpect = LobbyConfig.height / xRatio;
    //            expectRatioHeight = lobbyConfigHeightExpect / sizeOfBrowser.height;
    //
    //            var yRatio = LobbyConfig.height / sizeOfBrowser.height
    //            var lobbyConfigWidthExpect = LobbyConfig.width / yRatio;
    //            expectRatioWidth = lobbyConfigWidthExpect / sizeOfBrowser.width;
    //
    //
    //            if (browserName == "Explorer") {
    //                expectRatio = Math.min(1.1, expectRatioHeight);// Math.min(expectRatioHeight,expectRatioWidth);
    //            } else {
    //                expectRatio = Math.min(1, expectRatioHeight);// Math.min(expectRatioHeight,expectRatioWidth);
    //            }
    //
    //            //expectRatio = Math.max(expectRatioHeight,expectRatioWidth);
    //            //expectRatio = expectRatioHeight;
    //
    //            if (browserName == "Explorer") {
    //                expectRatioWidthChangePhoto = Math.min(1.1, expectRatioWidth);// Math.min(expectRatioHeight,expectRatioWidth);
    //            } else {
    //                expectRatioWidthChangePhoto = Math.min(1, expectRatioWidth);// Math.min(expectRatioHeight,expectRatioWidth);
    //            }
    //
    //            //expectRatio = Math.max(expectRatioHeight,expectRatioWidth);
    //            //expectRatio = expectRatioHeight;
    //        }
    //
    //
    //        //var percentHeader = expectRatio * (100) * 100.0 / LobbyConfig.height;
    //        //percentHeader -= 2;
    //        //var dragSurface = $("#dragSurface");
    //        //dragSurface.css("height", percentHeader + "%");
    //
    //
    //        var btnChangePhoto = $("#getimage");
    //        var topButtonChangePhoto = expectRatio * (295) * 100.0 / LobbyConfig.height;
    //        if(Lobby.Utils.isIOS()){
    //            topButtonChangePhoto = 50;
    //        }
    //        var leftButtonChangePhoto = expectRatioWidthChangePhoto * (110) * 100/ LobbyConfig.width + (1-expectRatioWidthChangePhoto) / 0.02;
    //        if(Lobby.Utils.isIOS()){
    //            leftButtonChangePhoto = 50;
    //        }
    //        //btnChangePhoto.css("top", topButtonChangePhoto + "%");
    //        //btnChangePhoto.css("left", leftButtonChangePhoto + "%");
    //        /*
    //         //var ratioWidthChangePhoto;
    //         //if (browserName == "Explorer") {
    //         //    ratioWidthChangePhoto = Math.min(1.1, sizeOfBrowser.width /LobbyConfig.width  );
    //         //} else {
    //         //    ratioWidthChangePhoto = Math.min(1,  sizeOfBrowser.width /LobbyConfig.width );
    //         //}
    //         //btnChangePhoto.css("width", ratioWidthChangePhoto * 10+ "%");
    //         //
    //         //var ratioHeightChangePhoto;
    //         //if (browserName == "Explorer") {
    //         //    ratioHeightChangePhoto = Math.min(1.1,  sizeOfBrowser.height /LobbyConfig.height );
    //         //} else {
    //         //    ratioHeightChangePhoto = Math.min(1, sizeOfBrowser.height /LobbyConfig.height );
    //         //}
    //         //btnChangePhoto.css("height", 50 + "%");
    //         //console.log(heightOfHeader + delta2MoveUp);
    //
    //         var topValue = 0 * expectRatio;
    //
    //         //if(
    //         //    window.innerWidth == screen.width && window.innerHeight == screen.height&&
    //         //    browserName == "Explorer") {
    //         //    topValue = 187*expectRatio;
    //         //
    //         //}else
    //         //if (my.currentUrlGameSlots == LobbyConfig.GameList.TexasMahjong && browserName != "Explorer") {
    //         //    topValue = 79 * expectRatio;
    //         //}else if(browserName == "Explorer"){
    //         topValue = 90 * expectRatio;
    //         //}
    //         var iframeGame = $('#iframe-game');
    //         //top = Math.max(-5,top);
    //         iframeGame.css("padding-top", topValue + "px");
    //         //iframeGame.css("padding-top",0+"%");
    //         //console.log(expectRatioHeight);
    //
    //         */
    //
    //    }
    //
    //    /*
    //     var element = document.getElementById('lobbygame'),
    //     style = window.getComputedStyle(element),
    //     pointerEvent = style.getPropertyValue('pointer-events');
    //     var zIndexLobbyGame = style.getPropertyValue('z-index');
    //     var lobbygame = $("#lobbygame");
    //     if (my.canDisableGame && !my.isShowingPopup && !validWithHeader && !my.isShowLoading) {
    //     var browserName = Lobby.Utils.getBrowserName();
    //
    //     if (pointerEvent != "none" ||
    //     (browserName == 'Explorer' && zIndexLobbyGame != "0")
    //     ) {
    //     lobbygame.css("pointer-events", "none");
    //
    //     if (browserName == 'Explorer') {
    //     lobbygame.css("z-index", "0");
    //     }
    //     }
    //     my.updateDarkLayerInGameSlot(topValue + "px", lobbyConfigWidthExpect);
    //     my.updateDarkLayerLoadingInGameSlot(topValue + "px", lobbyConfigWidthExpect);
    //     }
    //     else {
    //     if (pointerEvent != "all") {
    //     lobbygame.css("pointer-events", "all");
    //
    //     lobbygame.css("z-index", "100");
    //     }
    //     my.updateDarkLayerInGameSlot(lobbyConfigHeightExpect + "px", lobbyConfigWidthExpect);
    //     my.updateDarkLayerLoadingInGameSlot(lobbyConfigHeightExpect + "px", lobbyConfigWidthExpect);
    //     }
    //
    //     */
    //};

    return my;
}(LobbyC.MainMenu || {}));
