var ship;
var gameGravity = -0.05;
var emitter;

var AnimationLayer = cc.Layer.extend({
    ctor:function () {
        this._super();
        this.init();
    },

    init:function () {
        this._super();
    
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
                if (touch.getLocationX() < 240) {
                    ship.engineOn = true;
                }
                else {
                    ship.fireOn = true;
                }
                return true;
            },
            onTouchEnded: function (touch, event) {
                if (touch.getLocationX() < 240) {
                    ship.engineOn = false;
                }
                else {
                    ship.fireOn = false;
                }
            },
        }, this);
        
        cc.eventManager.addListener({
            event: cc.EventListener.KEYBOARD,
            onKeyPressed:  function(keyCode, event){
                if (keyCode === 32) {
                    ship.fireOn = true;
                }
                else {
                    ship.engineOn = true;
                }
            },
            onKeyReleased: function(keyCode, event){
                if (keyCode === 32) {
                    ship.fireOn = false;   
                }
                else {
                    ship.engineOn = false;
                }
            }
        }, this);    
        
        ship = new Ship();
        this.addChild(ship);
        this.addChild(ship.engineEmitter, 1);
        
        this.scheduleUpdate();
        this.schedule(this.addMeteor, 1);
    },
    update: function(dt){
        ship.updateY();
        ship.updateShield();
        ship.updateFire();
    },
    addMeteor: function(event){
        var meteor = new Meteor();
        this.addChild(meteor, 1);
    },
    removeMeteor: function(meteor){
        this.removeChild(meteor);
    },
    addFire: function(fire){
        this.addChild(fire, 1);
        this.addChild(fire.smokeEmitter, -1);
    },
    removeFire: function(fire){
        this.removeChild(fire);
        this.removeChild(fire.smokeEmitter);
    },
    addExplosion: function(explosion) {
        this.addChild(explosion);
    }
});
