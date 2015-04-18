

var Ship = cc.Sprite.extend({
    ctor:function() {
        this._super();
        this.initWithFile(res.Ship_png);
        
        this.setRotation(90);
        this.setScale(0.6);
        
        this.ySpeed = 0;
        
        this.engineThrust = 0.15;
        this.engineOn = false;
        
        this.invulnerability = 0;
        
        var emitter = new cc.ParticleSun();
        var emitterTexture = cc.textureCache.addImage(res.Particle_png);
        this.addChild(emitter, 1);
        emitter.setTexture(emitterTexture);
        emitter.setStartSize(2);
        emitter.setEndSize(4);
        emitter.setGravity(new cc.p(-1000, 0));
        this.engineEmitter = emitter;
        
    },
    onEnter:function() {
        this.setPosition(60,260);
    },
    updateY:function() {
        if (this.engineOn){
            this.ySpeed += this.engineThrust;
            this.engineEmitter.setPosition(this.getPosition().x,this.getPosition().y);
            console.log(this.engineEmitter.getPosition());
        }
        else {
            this.engineEmitter.setPosition(this.getPosition().x-250,this.getPosition().y);
        }
        
        if (this.invulnerability>0) {
            this.invulnerability--;
            this.setOpacity(255-this.getOpacity());	
        }
        this.setPosition(this.getPosition().x,this.getPosition().y+this.ySpeed);
        this.ySpeed += gameGravity;
    }
});


var Asteroid = cc.Sprite.extend({
    ctor:function() {
        this._super();
        this.initWithFile(res.asteroid_png);
    },
    onEnter:function() {
        this._super();
        this.setPosition(600,Math.random()*320);
        var moveAction = cc.MoveTo.create(3, new cc.p(-100,Math.random()*320));
        this.runAction(moveAction);
        this.scheduleUpdate();
    },
    update:function(dt){
        var shipBoundingBox = ship.getBoundingBox();
        var asteroidBoundingBox = this.getBoundingBox();
        if(cc.rectIntersectsRect(shipBoundingBox, asteroidBoundingBox) && ship.invulnerability==0){
            gameLayer.removeAsteroid(this);
            restartGame();
        }
        if(this.getPosition().x<-50){
            gameLayer.removeAsteroid(this)
        }
    }
});