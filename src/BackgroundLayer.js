var BackgroundLayer = cc.Layer.extend({
    ctor: function () {
        this._super();
        this.init();
    },

    bg: null,
    
    init: function () {
        this._super();

        this.bg = new ScrollingBG();
        this.addChild(this.bg);
    
        // Add a few stars from the beginning
        var i=0;
        for (ì=0; i<10; i++) {
            var star = new Star();
            star.setStartX(i*40);
            this.addChild(star, 1);
        }
        
        this.scheduleUpdate();
        this.schedule(this.addStar, 1.3);
    },
    update: function(dt){
        this.bg.scroll();
    },   
    addStar: function(event){
        var star = new Star();
        this.addChild(star, 1);
    },
    removeStar: function(star){
        this.removeChild(star);
    }
});

var ScrollingBG = cc.Sprite.extend({
    ctor: function() {
        this._super();
        this.initWithFile(res.GameBackground_png);
    },
    onEnter: function() {
        this.setPosition(480, 160);
    },
    scroll: function(){
        var scrollSpeed = 0.3;
        
        this.setPositionX(this.getPositionX() - scrollSpeed);
        
        if (this.getPositionX() < 0) {
            this.setPositionX(this.getPositionX() + 480);
        }
    }
});


var Star = cc.Sprite.extend({
    ctor: function() {
        this._super();
        this.startX = null;
    
        var seed = Math.floor(Math.random() * 100);
        if (seed < 33) {
            this.initWithFile(res.Star1_png);
        }
        else if (seed < 50) {
            this.initWithFile(res.Star2_png);
        }
        else {
            this.initWithFile(res.Star3_png);
        } 
        
        var scale = 0.2 + Math.random() * 0.4;
        this.setScale(scale);
        var opacity =  20 + Math.random() * 40;
        this.setOpacity(opacity);
        
    },
    setStartX: function(x) {
        this.startX = x;
    },
    onEnter: function() {
        this._super();
        
        var startX = 500;
        if (this.startX)
            startX = this.startX;
        
        var startY = Math.random() * 320;
        this.setPosition(startX, startY);        
        var duration = 13 + Math.random() * 10;
        var moveAction = new cc.MoveBy(duration, new cc.p(-600, 0));
        this.runAction(moveAction);

        this.scheduleUpdate();
    },
    update: function(dt){
        if (this.getPositionX() < -50){
            backgroundLayer.removeStar(this)
        }
    }
});