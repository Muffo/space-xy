var bg;
var scrollSpeed = -1;

var BackgroundLayer = cc.Layer.extend({
    ctor:function () {
        this._super();
        this.init();
    },

    init:function () {
        this._super();

        bg = new ScrollingBG();
        this.addChild(bg);
    
        this.scheduleUpdate();
    },
    update:function(dt){
        bg.scroll();
    },
});

var ScrollingBG = cc.Sprite.extend({
    ctor:function() {
        this._super();
        this.initWithFile(res.GameBackground_png);
    },
    onEnter:function() {
        this.setPosition(480, 160);
    },
    scroll:function(){
        this.setPositionX(this.getPositionX() - scrollSpeed);
        
        if (this.getPositionX() < 0) {
            this.setPositionX(this.getPositionX() + 480);
        }
    }
});
