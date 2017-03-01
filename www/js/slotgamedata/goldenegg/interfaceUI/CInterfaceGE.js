/**
 * Created by Duy on 7/6/2016.
 */
/**
 * THIS CLASS MANAGES BUTTON UI
 */
function CInterfaceGE(my, parentGroup) {
    var that = new CInterfaceBase(my, parentGroup, true, true, true, function(){
        Manager4State.setCurrentState(my.currentGameSlot.GameConstant.State.Bonus);
        that.hideSpinBtn();
        that.hideStartBonusBut();
        my.currentGameSlot.manager4Network.callBonus(0, 0);

        my.currentGameSlot.s_oGame.getBonus().show();
    }, function(_oContainer){
        return new CFreespinIndicatorGE(my, _oContainer, 340, 30);
    });

    my.currentGameSlot.s_oInterface = that;

    return that;
}