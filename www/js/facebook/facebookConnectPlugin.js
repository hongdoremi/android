var facebookConnectPlugin = {
    initCompleted : false,

    init: function(callback){
        var APP_ID = FacebookController.APP_ID;

        window.fbAsyncInit = function () {
            FB.init({
                appId: APP_ID,
                xfbml: true,
                version: 'v2.6',
                frictionlessRequests: true
            });
            facebookConnectPlugin.initCompleted = true;
            if (Lobby.Utils.objectNotNull(callback)) {
                callback();
            }
        };


        (function (d, s, id) {
            var js, fjs = d.getElementsByTagName(s)[0];
            if (d.getElementById(id)) {
                return;
            }
            js = d.createElement(s);
            js.id = id;
            js.src = "//connect.facebook.net/en_US/sdk.js";

            fjs.parentNode.insertBefore(js, fjs);
        }(document, 'script', 'facebook-jssdk'));
    },

    checkPreviousLoginFacebook: function (s, f) {
        // Try will catch errors when SDK has not been init



        var loginResult = LobbyRequest.Utils.getUrlParameterExt("login_result");
        //var browserName = Lobby.Utils.getBrowserName();
        if( loginResult == 'fb'
        //&&
        //browserName == "Explorer"
        ){
            var accessToken = LobbyRequest.Utils.getUrlParameter("access_token",window.location.hash.substring(1));
            var expiredIn = parseInt(LobbyRequest.Utils.getUrlParameter("expires_in",window.location.hash.substring(1)));
            var response = {};
            response.status = 'connected';
            response.authResponse = {
                accessToken:accessToken,
                expiresIn:expiredIn
            };
            s(response,accessToken);
            //facebookConnectPlugin.login(
            //    FacebookController.getPremissionStatic(),
            //    function (userData) {
            //        s(userData);
            //    },
            //    function (error) {
            //        if (!f) {
            //            console.error(error.message);
            //        } else {
            //            f(error.message);
            //        }
            //    }
            //);
        }else{
            s(null);
        }

    },
    getLoginStatus: function (s, f) {
        // Try will catch errors when SDK has not been init


        try {
            FB.getLoginStatus(function (response) {
                var loginResult = LobbyRequest.Utils.getUrlParameterExt("login_result");
                //var browserName = Lobby.Utils.getBrowserName();
                if(Lobby.Utils.objectIsNull(response.authResponse) &&
                loginResult == 'fb'
                    //&&
                    //browserName == "Explorer"
                ){
                    var accessToken = LobbyRequest.Utils.getUrlParameter("access_token",window.location.hash.substring(1));
                    var expiredIn = parseInt(LobbyRequest.Utils.getUrlParameter("expires_in",window.location.hash.substring(1)));
                    response.status = 'connected';
                    response.authResponse = {
                        accessToken:accessToken,
                        expiresIn:expiredIn
                    };
                    s(response,accessToken);
                    //facebookConnectPlugin.login(
                    //    FacebookController.getPremissionStatic(),
                    //    function (userData) {
                    //        s(userData);
                    //    },
                    //    function (error) {
                    //        if (!f) {
                    //            console.error(error.message);
                    //        } else {
                    //            f(error.message);
                    //        }
                    //    }
                    //);
                }else if(Lobby.Utils.objectIsNull(response.authResponse) && FacebookController.isInFBCanvas()) {
                    facebookConnectPlugin.login(
                        FacebookController.getPremissionStatic(),
                        function(response){
                            s(response,response.authResponse.accessToken);

                    },f);
                }else{
                    s(response);
                }
            });
        } catch (error) {
            if (!f) {
                console.error(error.message);
            } else {
                f(error.message);
            }
        }
    },

    showDialog: function (options, s, f) {

        if (!options.name) {
            options.name = "";
        }
        if (!options.message) {
            options.message = "";
        }
        if (!options.caption) {
            options.caption = "";
        }
        if (!options.description) {
            options.description = "";
        }
        if (!options.href) {
            options.href = "";
        }
        if (!options.picture) {
            options.picture = "";
        }

        // Try will catch errors when SDK has not been init
        try {
            FB.ui(options,
                  function (response) {
                      if (response && (response.request || !response.error_code)) {
                          s(response);
                      } else {
                          f(response);
                      }
                  });
        } catch (error) {
            if (!f) {
                console.error(error.message);
            } else {
                f(error.message);
            }
        }
    },

    login: function (permissions, s, f) {
        // JS SDK takes an object here but the native SDKs use array.
        var permissionObj = {};
        if (permissions && permissions.length > 0) {
            permissionObj.scope = permissions.toString();
        }

        FB.login(function (response) {
            if (response.authResponse) {
                s(response);
            } else {
                f(response.status);
            }
        }, permissionObj);
    },

    getAccessToken: function (s, f) {
        var response = FB.getAccessToken();
        if (!response) {
            if (!f) {
                console.error("NO_TOKEN");
            } else {
                f("NO_TOKEN");
            }
        } else {
            s(response);
        }
    },

    logout: function (s, f) {
        // Try will catch errors when SDK has not been init
        try {
            FB.logout( function (response) {
                s(response);
            });
        } catch (error) {
            if (!f) {
                console.error(error.message);
            } else {
                f(error.message);
            }
        }
    },

    api: function (graphPath, permissions, s, f) {
        // JS API does not take additional permissions

        // Try will catch errors when SDK has not been init
        try {
            FB.api(graphPath, function (response) {
                if (response.error) {
                    f(response);
                } else {
                    s(response);
                }
            });
        } catch (error) {
            if (!f) {
                console.error(error.message);
            } else {
                f(error.message);
            }
        }
    }





};