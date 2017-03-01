/**
 * Created by Duy on 7/6/2016.
 */
/**
 * THIS CLASS MANAGES BUTTON UI
 */
function CInterfaceBO(my, parentGroup) {
    var that = new CInterfaceBase(my, parentGroup, true, false, true, null, function(_oContainer){
        return new CFreespinIndicatorBO(my, _oContainer, 340, 30);
    });

    my.currentGameSlot.s_oInterface = that;

    return that;
}