/**
 * Created by Duy on 7/8/2016.
 */
/**
 * CLASS MANAGE THE EAGLE ANIMATION ON FREESPIN
 * @param my: Phaser Group Object
 * @param parent: Group parent
 * @constructor
 */
function CEagleFreeSpin(my, parent){

    var _oContainer;

    var eagle;
    var symbolEagle;

    /**
     * Initialize UI
     * @private
     */
    this._init = function(){
        _oContainer = my.add.group();
        parent.add(_oContainer);
        var scale = 1;
        //if(ManagerForScale.is3x4resolution()){
        //    scale = ManagerForScale.getScale()*1.05;
        //}

        eagle = new SpriteAnimation(my,
            _oContainer,
            {x:1,y:1},
            {x:scale,y:scale},
            'eagle_freespin_',
            0,
            27,
            false
        );
        symbolEagle = my.add.sprite(0, 0, 'static_symbol', 'symbol_11', _oContainer);
        //symbolEagle.scale.setTo(ManagerForScale.getScale());
        symbolEagle.visible = false;
    };
    /**
     * Play eagle aniamtion
     * @param pos: Position
     */
    this.play = function(pos){
        Manager4Sound.playEagleTravel();
        _oContainer.visible = true;
        _oContainer.position = pos;
        //eagle.setPosition(pos.x, pos.y);
        eagle.play(25, function(){
            //eagle.stop();
            //eagle.hide();
            //symbolEagle.x += settings.SYMBOL_WIDTH;
            symbolEagle.visible = true;
            my.time.events.add(1000, function(){
                symbolEagle.visible = false;
            });
        });
    };
    /**
     * Stop animation
     */
    this.stop = function(){
        eagle.stop();
        eagle.hide();
    };
    /**
     * Hide Group
     */
    this.hide = function(){
        _oContainer.visible = false;
    };
    /**
     * Destroy function
     */
    this.destroy = function(){
        if(eagle){
            eagle.stop();
            eagle.destroy();
            eagle = null;
        }
        symbolEagle.destroy();
        _oContainer.destroy();
    };

    this._init();
}