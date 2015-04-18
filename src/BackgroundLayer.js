var BackgroundLayer = cc.Layer.extend({
    ctor:function () {
        this._super();
        this.init();
    },

    bg: null,
    
    init:function () {
        this._super();

        this.bg = new ScrollingBG();
        this.addChild(this.bg);
    
        this.scheduleUpdate();
    },
    update:function(dt){
        this.bg.scroll();
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
        var scrollSpeed = 0.3;
        
        this.setPositionX(this.getPositionX() - scrollSpeed);
        
        if (this.getPositionX() < 0) {
            this.setPositionX(this.getPositionX() + 480);
        }
    }
});
