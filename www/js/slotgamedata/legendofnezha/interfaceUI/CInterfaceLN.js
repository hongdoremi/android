/**
 * Created by Duy on 7/6/2016.
 */
/**
 * THIS CLASS MANAGES BUTTON UI
 */
function CInterfaceLN(my, parentGroup, groupOfAnimation) {
    var that = new CInterfaceBase(my, parentGroup, true, true, false, function(){
        Manager4State.setCurrentState(my.currentGameSlot.GameConstant.State.Bonus);
        that.hideSpinBtn();
        that.hideStartBonusBut();

        my.currentGameSlot.manager4Network.callBonus(0, 0);

        switch (that.iCurBonus){
            case 3:
                my.currentGameSlot.s_oGame.getBonus1().show();
                break;
            case 4:
                my.currentGameSlot.s_oGame.getBonus2().show();
                break;
        }
    }, function(_oContainer){
        return new CFreespinIndicatorLN(my, _oContainer, groupOfAnimation);
    }, [2,3,0,1], true);

    /**
     * Show Wild Dragon
     * @param colAnim: current Col that should show animation
     */
    that.showDragonWild = function(colAnim){
        that._oFreeSpinIndicator.playDragonWild(colAnim);
    };
    /**
     * Hide Wild Dragon
     */
    that.hideDragonWild = function(){
        that._oFreeSpinIndicator.hideDragonWild();
    };

    my.currentGameSlot.s_oInterface = that;
    return that;
}
