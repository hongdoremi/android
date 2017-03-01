/**
 * Created by Duy on 7/6/2016.
 */
/**
 * THIS CLASS STORES ALL INFO ABOUT SYMBOLS
 */
function CSlotSettingsGE(my){
    my.slotSettings = {};

    /**
     * Init Slot Settings
     * @private
     */
    this._initSlotSettings = function () {
        _initSymbolAnims();
        _initSymbolsOccurence();
        _initWildExpandedPos();
    };
    /**
     * Init Symbol Animation Settings Info
     * @private
     */
    var _initSymbolAnims = function () {
        //NUMBER OF FRAMES FOR EACH SYMBOL ANIMATION, ite from 0 -> number
        my.slotSettings.s_iSymbolAnims = [];
        my.slotSettings.s_iSymbolAnims[0] = 24;
        my.slotSettings.s_iSymbolAnims[1] = 24;
        my.slotSettings.s_iSymbolAnims[2] = 24;
        my.slotSettings.s_iSymbolAnims[3] = 24;
        my.slotSettings.s_iSymbolAnims[4] = 24;
        my.slotSettings.s_iSymbolAnims[5] = 24;
        my.slotSettings.s_iSymbolAnims[6] = 24;
        my.slotSettings.s_iSymbolAnims[7] = 24;
        my.slotSettings.s_iSymbolAnims[8] = 24;
        my.slotSettings.s_iSymbolAnims[9] = 24;
        my.slotSettings.s_iSymbolAnims[10] = 24;
        my.slotSettings.s_iSymbolAnims[11] = 24;
        my.slotSettings.s_iSymbolAnims[12] = 24;

        my.slotSettings.s_oAnimRegPoint = [];
        my.slotSettings.s_oAnimRegPoint[0] = {x: (settings.SYMBOL_WIDTH_ANIMATE - settings.SYMBOL_WIDTH)/2., y: (settings.SYMBOL_WIDTH_ANIMATE - settings.SYMBOL_WIDTH)/2.};
        my.slotSettings.s_oAnimRegPoint[1] = {x: (settings.SYMBOL_WIDTH_ANIMATE - settings.SYMBOL_WIDTH)/2., y: (settings.SYMBOL_WIDTH_ANIMATE - settings.SYMBOL_WIDTH)/2.};
        my.slotSettings.s_oAnimRegPoint[2] = {x: (settings.SYMBOL_WIDTH_ANIMATE - settings.SYMBOL_WIDTH)/2., y: (settings.SYMBOL_WIDTH_ANIMATE - settings.SYMBOL_WIDTH)/2.};
        my.slotSettings.s_oAnimRegPoint[3] = {x: (settings.SYMBOL_WIDTH_ANIMATE - settings.SYMBOL_WIDTH)/2., y: (settings.SYMBOL_WIDTH_ANIMATE - settings.SYMBOL_WIDTH)/2.};
        my.slotSettings.s_oAnimRegPoint[4] = {x: (settings.SYMBOL_WIDTH_ANIMATE - settings.SYMBOL_WIDTH)/2., y: (settings.SYMBOL_WIDTH_ANIMATE - settings.SYMBOL_WIDTH)/2.};
        my.slotSettings.s_oAnimRegPoint[5] = {x: (settings.SYMBOL_WIDTH_ANIMATE - settings.SYMBOL_WIDTH)/2., y: (settings.SYMBOL_WIDTH_ANIMATE - settings.SYMBOL_WIDTH)/2.};
        my.slotSettings.s_oAnimRegPoint[6] = {x: (settings.SYMBOL_WIDTH_ANIMATE - settings.SYMBOL_WIDTH)/2., y: (settings.SYMBOL_WIDTH_ANIMATE - settings.SYMBOL_WIDTH)/2.};
        my.slotSettings.s_oAnimRegPoint[7] = {x: (settings.SYMBOL_WIDTH_ANIMATE - settings.SYMBOL_WIDTH)/2., y: (settings.SYMBOL_WIDTH_ANIMATE - settings.SYMBOL_WIDTH)/2.};
        my.slotSettings.s_oAnimRegPoint[8] = {x: (settings.SYMBOL_WIDTH_ANIMATE - settings.SYMBOL_WIDTH)/2., y: (settings.SYMBOL_WIDTH_ANIMATE - settings.SYMBOL_WIDTH)/2.};
        my.slotSettings.s_oAnimRegPoint[9] = {x: (settings.SYMBOL_WIDTH_ANIMATE - settings.SYMBOL_WIDTH)/2., y: (settings.SYMBOL_WIDTH_ANIMATE - settings.SYMBOL_WIDTH)/2.};
        my.slotSettings.s_oAnimRegPoint[10] = {x: (settings.SYMBOL_WIDTH_ANIMATE - settings.SYMBOL_WIDTH)/2., y: (settings.SYMBOL_WIDTH_ANIMATE - settings.SYMBOL_WIDTH)/2.};
        my.slotSettings.s_oAnimRegPoint[11] = {x: (settings.SYMBOL_WIDTH_ANIMATE - settings.SYMBOL_WIDTH)/2., y: (settings.SYMBOL_WIDTH_ANIMATE - settings.SYMBOL_WIDTH)/2.};
        my.slotSettings.s_oAnimRegPoint[12] = {x: (settings.SYMBOL_WIDTH_ANIMATE - settings.SYMBOL_WIDTH)/2., y: (settings.SYMBOL_WIDTH_ANIMATE - settings.SYMBOL_WIDTH)/2.};
    };
    /**
     * Init Symbols Occurence - deprecated
     * @private
     */
    var _initSymbolsOccurence = function () {
        my.slotSettings.s_aRandSymbols = [];

        var i;
        //OCCURENCE FOR SYMBOL 0
        for (i = 0; i < 14; i++) {
            my.slotSettings.s_aRandSymbols.push(0);
        }


        //OCCURENCE FOR SYMBOL 1
        for (i = 0; i < 14; i++) {
            my.slotSettings.s_aRandSymbols.push(1);
        }

        //OCCURENCE FOR SYMBOL 2
        for (i = 0; i < 12; i++) {
            my.slotSettings.s_aRandSymbols.push(2);
        }

        //OCCURENCE FOR SYMBOL 3
        for (i = 0; i < 12; i++) {
            my.slotSettings.s_aRandSymbols.push(3);
        }

        //OCCURENCE FOR SYMBOL 4
        for (i = 0; i < 10; i++) {
            my.slotSettings.s_aRandSymbols.push(4);
        }

        //OCCURENCE FOR SYMBOL 5
        for (i = 0; i < 10; i++) {
            my.slotSettings.s_aRandSymbols.push(5);
        }

        //OCCURENCE FOR SYMBOL 6
        for (i = 0; i < 8; i++) {
            my.slotSettings.s_aRandSymbols.push(6);
        }

        //OCCURENCE FOR SYMBOL 7
        for (i = 0; i < 8; i++) {
            my.slotSettings.s_aRandSymbols.push(7);
        }

        //OCCURENCE FOR SYMBOL 8
        for (i = 0; i < 7; i++) {
            my.slotSettings.s_aRandSymbols.push(8);
        }

        //OCCURENCE FOR SYMBOL 9
        for (i = 0; i < 5; i++) {
            my.slotSettings.s_aRandSymbols.push(9);
        }

        //OCCURENCE FOR SYMBOL 10
        for (i = 0; i < 3; i++) {
            my.slotSettings.s_aRandSymbols.push(10);
        }

        //OCCURENCE FOR SYMBOL 11
        for (i = 0; i < 2; i++) {
            my.slotSettings.s_aRandSymbols.push(11);
        }

        //OCCURENCE FOR SYMBOL 12
        for (i = 0; i < 1; i++) {
            my.slotSettings.s_aRandSymbols.push(12);
        }


    };

    /**
     * SET WILD EXPANDED POSITION FOR EACH REEL
     * @private
     */
    var _initWildExpandedPos = function () {
        //s_aPosWildExpanded = [];
        //s_aPosWildExpanded[0] = {x: 558, y: 208};
        //s_aPosWildExpanded[1] = {x: 793, y: 208};
        //s_aPosWildExpanded[2] = {x: 1027, y: 208};
        //s_aPosWildExpanded[3] = {x: 558, y: 208};
    };
    this._initSlotSettings();
};