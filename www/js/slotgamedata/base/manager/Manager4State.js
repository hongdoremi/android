/**
 * Created by Phuoc Tran on 9/16/2015.
 */
"use strict";
/**
 * Class manager state for Game Slot (MainGame, DoubleUp, Bonus, FreeSpin)
 * @type {Manager4State}
 */
var Manager4State = new function () {
    var that = this;
    var currentState;

    this.init = function () {
        currentState = 0;
    };

    this.setCurrentState = function (state) {
        currentState = state;
    };

    this.getCurrentState = function () {
        return currentState;
    };
};