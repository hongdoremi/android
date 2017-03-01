/**
 * Created by Phan on 7/8/2016.
 */
var ManagerForScale = new function(){
    var that = this;
    var heightIncrement = 0;
    var widthIncrement = 0;
    var doubleHeightIncrement = 0;
    var tripleHeightIncrement = 0;
    var is3x4 = false;
    this.realWidth = 0;
    this.realHeight = 0;
    this.extraHeight = 0;
    var scaleY = 1;

    this.offsetOutOfBounce_1920 = 0;
    this.offsetOutOfBounce_1080 = 0;
    /**
     * Move down a group after scaled
     * @param group
     */
    this.reposition = function(group){
        if(!is3x4) return;
        group.position={x:group.position.x,y:group.position.y+heightIncrement};
    };
    /**
     * Init manager for scale variable
     * @param extraWidth
     * @param extraHeight
     * @param realWidth
     * @param realHeight
     */
    this.init = function(extraWidth,extraHeight,realWidth,realHeight){
        this.extraHeight = extraHeight;
        heightIncrement=Math.floor(extraHeight*0.5)+1;
        widthIncrement=Math.floor(extraWidth*0.5)+1;
        that.realWidth = realWidth;
        that.realHeight = realHeight;
        scaleY =  (LobbyConfig.realHeight + extraHeight)/LobbyConfig.realHeight;
        doubleHeightIncrement = (heightIncrement*(1)  )/LobbyConfig.scaleRatioEntireGame;
        tripleHeightIncrement = extraHeight*(1)/LobbyConfig.scaleRatioEntireGame;

        this.offsetOutOfBounce_1920 = 1920*(scaleY-1)/2;
        this.offsetOutOfBounce_1080 = 1080*(scaleY-1)/2;
        /**
         * Set if resize group
         */
        is3x4 = true;
    };
    /**
     * Get scale
     * @returns {number}
     */
    this.getScale = function(){
        if(!is3x4) return 1;
        return scaleY;
    };
    /**
     * Scale entire group and re-position after scale
     * @param o group
     * @param isScaleBothSize should scale both height and with
     */
    this.scaleGroupAndRePositionBackground = function(o,isScaleBothSize){
        if(!is3x4) return;
        o.y-=(0.5 - o.anchor.y)*2*that.doubleIncrementHeight();
        if(Lobby.Utils.objectNotNull(isScaleBothSize) && isScaleBothSize ){
            o.scale.setTo(o.scale.x*scaleY, o.scale.y*scaleY);
            o.x-=(0.5 - o.anchor.x)*2*(widthIncrement*(1+LobbyConfig.scaleRatioEntireGame));
        }else{
            o.scale.setTo(o.scale.x, o.scale.y*scaleY);
        }
        //if(isInsideAnotherScaledGroup) o.y-=heightIncrement;
    };
    this.getRealRes = function(){
        if(!is3x4) return {height:LobbyConfig.height,width:LobbyConfig.width};
        return {height:window.innerHeight,width:window.innerWidth};
    };
    /**
     * Use for loading game slot loading background
     * @returns {number}
     */
    this.zeroIncrementHeight = function(originalHeight) {
        //return 0;
        if (!is3x4) return 0;
        return (originalHeight-LobbyConfig.height/2)*(ManagerForScale.getScale()-1);
    };
    /**
     * Increment for img related to body
     * @returns {number}
     */
    this.incrementHeight = function(){
        if(!is3x4) return 0;
        return heightIncrement;
    };
    /**
     * Increment for img in scaled group
     * @returns {number}
     */
    this.doubleIncrementHeight = function(){
        if(!is3x4) return 0;
        return doubleHeightIncrement;
    };
    /**
     * Increment for img related to header, footer
     * @returns {number}
     */
    this.tripleIncrementHeight = function(){
        if(!is3x4) return 0;
        return tripleHeightIncrement;
    };
    /**
     * Check if need to scale
     * @returns {boolean}
     */
    this.is3x4resolution =  function(){
        return is3x4;
    };
    /**
     * Double and revert img for lobby background
     * @param group
     * @param background
     * @param id
     * @param frameName
     * @param context
     * @param customScale
     */
    this.doubleAndRevertImg = function(group,background,id,frameName,context,customScale){
        if(ManagerForScale.is3x4resolution()){
            background.y-=ManagerForScale.doubleIncrementHeight();
            var background2 = context.add.sprite(background.x,background.y+background.height*2,id,frameName);
            if(Lobby.Utils.objectIsNull(customScale)) customScale =1;
            background2.scale.setTo(customScale,-customScale);
            group.add(background2);
        }
    }

};
