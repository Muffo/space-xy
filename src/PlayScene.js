var backgroundLayer;
var animationLayer;
var statusLayer;

var PlayScene = cc.Scene.extend({
    onEnter:function () {
        this._super();

        backgroundLayer = new BackgroundLayer();
//        animationLayer = new AnimationLayer();
//        statusLayer = new StatusLayer();
        
        this.addChild(backgroundLayer);
//        this.addChild(animationLayer);
//        this.addChild(statusLayer);
    }
});