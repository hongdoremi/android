/**
 * Created by Duy on 7/26/2016.
 */
/**
 * Create Loader UI (Animation circle + loading text)
 * @param my: Phaser Game Object
 * @param parent: Group parent
 * @constructor
 */
function CLoaderUI(my, parent){
    var _oContainer;
    var _oLoadingText;
    var preLoader;
    var _bUpdate = false;

    /**
     * Create Loader
     * @param posX: x position
     * @param posY: y position
     * @param spriteLoader: image loader circle
     */
    this.createLoader = function(posX, posY, spriteLoader){
        var _oContainer = my.add.group();
        parent.add(_oContainer);
        _oContainer.x = posX;
        _oContainer.y = posY;
        preLoader = my.add.sprite(0, 0, spriteLoader, null, _oContainer);
        preLoader.anchor.setTo(0.5);
        preLoader.scale.setTo(4);

        _oLoadingText = my.add.text(0, 0, '0%', {
            font: "60px PassionOne-Regular",
            fill: '#FFFFFF'
        }, _oContainer);
        _oLoadingText.anchor.setTo(0.5);
        _bUpdate = true;
        my.loaderUI = this;

        this.group = _oContainer;
    };
    /**
     * Set progress Text
     * @param progress: float - progress
     */
    this.setProgressText = function(progress){
        _oLoadingText.text = progress + '%';
    };
    /**
     * Set visible
     * @param isVisible: boolen - true if this is visible
     */
    this.setVisible = function(isVisible){
        _oContainer.visible = isVisible;
    };
    /**
     * Destroy group
     */
    this.destroy = function(){
        this.group.destroy();
        my.loaderUI = null;
    };
    /**
     * Function update - use for rotating loading circle image to create aniamtion
     */
    this.update = function(){
        if(_bUpdate) {
            preLoader.angle += 10;
        }
    };
}