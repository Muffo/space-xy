var scrollSpeed = 1;
var bg;

var ship;
var gameGravity = -0.05;
var gameThrust = 0.15;
var emitter;

var AnimationLayer = cc.Layer.extend({
    ctor:function () {
        this._super();
        this.init();
    },

    init:function () {
        this._super();
        /*
        var winsize = cc.director.getWinSize();
        //create the background image and position it at the center of screen
        var centerPos = cc.p(winsize.width / 2, winsize.height / 2);
        var spriteBG = new cc.Sprite(res.PlayBG_png);
        spriteBG.setPosition(centerPos);
        this.addChild(spriteBG);
        */
    
        cc.eventManager.addListener({
            event: cc.EventListener.MOUSE,
            onMouseDown: function(event){
                ship.engineOn = true;
            },
            onMouseUp: function(event){
                ship.engineOn = false;
            }
        },this);
        
        cc.eventManager.addListener({
            event: cc.EventListener.TOUCH_ONE_BY_ONE,
            swallowTouches: true,
            onTouchBegan: function (touch, event) {
                ship.engineOn = true;
                console.log("ON");
                return true;
            },
            onTouchMoved: function (touch, event) {
                console.log("Moved");
            },
            onTouchEnded: function (touch, event) {
                ship.engineOn = false;
                console.log("OFF");
            },
        }, this);
        
        cc.eventManager.addListener({
            event: cc.EventListener.KEYBOARD,
            onKeyPressed:  function(keyCode, event){
                ship.engineOn = true;
                console.log("Key " + keyCode.toString() + " was pressed!");
            },
            onKeyReleased: function(keyCode, event){
                ship.engineOn = false;
                console.log("Key " + keyCode.toString() + " was released!");
            }
        }, this);    
        
        ship = new Ship();
        this.addChild(ship);
        this.scheduleUpdate();
        
        emitter = new cc.ParticleSun();
        this.addChild(emitter,1);
        var myTexture = cc.textureCache.addImage(res.particle_png);
        emitter.setTexture(myTexture);
        emitter.setStartSize(2);
        emitter.setEndSize(4);
        emitter.setGravity(new cc.p(-1000, 0));
        this.schedule(this.addAsteroid,0.8);
    },
    update:function(dt){
        bg.scroll();
        ship.updateY();
    },
    addAsteroid:function(event){
        var asteroid = new Asteroid();
        this.addChild(asteroid,1);
    },
    removeAsteroid:function(asteroid){
        this.removeChild(asteroid);
    }
});

var listener = cc.EventListener.create({
    event: cc.EventListener.MOUSE,
    swallowTouches: true,
    onMouseDown: function (event) {
        console.log(event);
        console.log("Mouse Down detected, Key: " + event.getButton())
        var target = event.getCurrentTarget();
        var location =  target.convertToNodeSpace(event.getLocation());
        var targetSize = target.getContentSize();
        var targetRectangle = cc.rect(0, 0, targetSize.width, targetSize.height);
        if (cc.rectContainsPoint(targetRectangle, location)) {
            console.log("I touched the runner!!");
            var newPos = cc.pAdd({x: 5, y: 0}, target.getPosition());
            if (event.getButton() === 0) {
                newPos = cc.pAdd({x: -5, y: 0}, target.getPosition());
            }                
            target.setPosition(newPos);
        }
    }
})

