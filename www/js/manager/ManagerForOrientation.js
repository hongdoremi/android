/**
 * Created by Phan on 7/8/2016.
 */
var ManagerForOrientation = new function () {
  var that = this;
  var shouldChangeOrientationNextTime = false;
  /**
   * Use to fix orientation problem occur when select image in portrait mode
   */
  document.addEventListener("orientationchange", function(event){
    switch(window.orientation) {
      case -90:
      case 90:
      {
//                window.currentOrientation = screen.orientation;
        /* Device is in landscape mode */
        break;
      }
      default:
      {
        if(Lobby.Utils.isIOS() &&
            shouldChangeOrientationNextTime === false) {
          document.getElementById('bodyTag').style.display = 'none';
        }
        shouldChangeOrientationNextTime = true;
        that.forcePortraitMode();


      }
    }});



  this.forcePortraitMode = function(){

    var orientationBegin = 'portrait';
    screen.lockOrientation(orientationBegin);
    //shouldChangeOrientationNextTime = true;
  };

  this.forceLandscapeMode = function(){

    var orientationBegin = 'landscape-primary';
    if (screen.orientation == 'landscape-secondary') {
      orientationBegin = 'landscape-secondary';
    }
    orientationBegin = 'portrait';
    screen.lockOrientation(orientationBegin);
    shouldChangeOrientationNextTime = true;
  };

  /**
   * flip orientation if game switch to portrait mode unexpectedly
   * @param isUser4Ipad
   * @param isLongTimeDelay
   * @param my
   */
  this.resetOrientation = function (isUser4Ipad, isLongTimeDelay,my) {
    //handle orient station
//          screen.lockOrientation('landscape');
//          window.currentOrientation = screen.orientation;
//          alert(window.currentOrientation);

    /* Device is in portrait mode */
    if (!Lobby.Utils.isIOS()
          //|| (isUser4Ipad == false && Lobby.Utils.isIpad())
        || !shouldChangeOrientationNextTime
    ) {
      shouldChangeOrientationNextTime = false;
      document.getElementById('bodyTag').style.display = 'block';
      return;
    }
    document.getElementById('bodyTag').style.display = 'none';
    var orientationBegin = 'landscape-secondary';
    var orienttationNext = 'portrait';
    if (screen.orientation == 'landscape-primary') {
      orientationBegin = 'landscape-primary';
    }
    //if(orientationBegin == 'landscape-secondary'){
    //  orienttationNext = 'landscape-primary';
    //}else{
    //  orienttationNext = 'landscape-secondary';
    //}

    var timeOrientationDelay1 = 1000;
    var timeOrientationDelay2 = 1000;
    if(isLongTimeDelay === true){
      //timeOrientationDelay1 = 100;
      //timeOrientationDelay2 = 2000;
    }

    if(Lobby.Utils.objectIsNull(my)){

      window.setTimeout(
          function(){
            screen.lockOrientation(orienttationNext);
            window.setTimeout(
                function () {
                  screen.lockOrientation(orientationBegin);
                  window.setTimeout(
                      function () {
                        shouldChangeOrientationNextTime = false;
                        document.getElementById('bodyTag').style.display = 'block';
                      }, 100);
                }, timeOrientationDelay2);

          },timeOrientationDelay1);

    }else{

      my.time.events.add(
          timeOrientationDelay1,
          function(){
            screen.lockOrientation(orienttationNext);
            my.time.events.add(
                timeOrientationDelay2,
                function () {
                  screen.lockOrientation(orientationBegin);
                  my.time.events.add(
                      100,
                      function () {
                        shouldChangeOrientationNextTime = false;
                        document.getElementById('bodyTag').style.display = 'block';
                      }, this);
                }, this);

          },this);
    }




    //my.game.scale.scaleMode = Phaser.ScaleManager.SHOW_ALL;
    //my.game.scale.setShowAll();
    //window.addEventListener('resize', function () {
    //  my.game.scale.refresh();});
    //my.game.scale.refresh();

//              }
//            }
//          });
  };

};
