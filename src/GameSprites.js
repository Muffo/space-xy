    
var Ship = cc.Sprite.extend({
    ctor:function() {
        this._super();
        this.initWithFile(res.Ship_png);
        this.setRotation(90);
        this.setScale(0.5);
        
        this.ySpeed = 0;    
        this.engineThrust = 0.15;
        this.engineOn = false;
        this.engineEmitter = null;

        this.damage = 0;
        this.life = 100;
        
        this.fireDelay = 30;
        this.fireOn = false;
        this.fireLoad = this.fireDelay;

        this.invulnerability = 0;   
    },
    createEngineEmitter: function() {
        var engineEmitter = new cc.ParticleSun();
        var emitterTexture = cc.textureCache.addImage(res.Particle_png);
        engineEmitter.setTexture(emitterTexture);
        engineEmitter.setStartSize(2);
        engineEmitter.setEndSize(4);
        engineEmitter.setGravity(new cc.p(-1000, 0));
        this.engineEmitter = engineEmitter;
        return engineEmitter;
    },
    onEnter: function() {
        this.respawn(0);
    },
    respawn: function(damage) {
        this.setPosition(60, 200);
        this.invulnerability = 60;
        this.ySpeed = 0;
        this.damage += damage;
        
        console.log("Damage: " +  this.damage + " / " + this.life); 
        
        if (this.damage >= this.life) {
            console.log("GAME OVER!");   
        }
        this.fireLoad = this.fireDelay;
    },
    updateY:function() {
        var shipPosition = this.getPosition();
        if (shipPosition.y < 0 || shipPosition.y > 320) {
            this.respawn(20);
            return;
        }
        
        if (this.engineOn) {
            this.ySpeed += this.engineThrust;
            this.engineEmitter.setPosition(shipPosition.x - 25, shipPosition.y);
        }
        else {
            this.engineEmitter.setPosition(shipPosition.x - 250, shipPosition.y);
        }
        
        this.setPosition(shipPosition.x, shipPosition.y + this.ySpeed);
        this.ySpeed += gameGravity;
    },
    updateShield: function() {
        if (this.invulnerability > 0) {
            this.invulnerability--;
            this.setOpacity(255 - this.getOpacity());	
        }
    },
    updateFire: function() {
        if (!this.fireOn || this.fireLoad < this.fireDelay) {
            this.fireLoad = Math.min(this.fireLoad + 1, this.fireDelay);
            return;
        }
        if (this.fireLoad === this.fireDelay) {
            this.fireLoad = 0;
            
            var fire = new Fire();            
            fire.setPosition(this.getPositionX() + 30, this.getPositionY());
            animationLayer.addFire(fire);
            console.log("FIRE!!!");
        }
    }
});


var Fire = cc.Sprite.extend({
    ctor:function() {
        this._super();
        this.initWithFile(res.Fire_png);
        this.setScale(0.6);
        this.setRotation(90);
    },
    onEnter:function() {
        this._super();
        var moveAction = new cc.MoveBy(3, new cc.p(600, 0));
        this.runAction(moveAction);
        this.scheduleUpdate();
    },
    update:function(dt){
        if (this.getPositionX() > 500){
            animationLayer.removeFire(this)
        }
    }
});

var Meteor = cc.Sprite.extend({
    ctor:function() {
        this._super();
    
        var seed = Math.floor(Math.random() * 100);
        if (seed < 30) {
            this.hits = 1;
            this.speedMult = 1.5;
            if (seed % 2 == 0) 
                this.initWithFile(res.MeteorXS1_png);
            else 
                this.initWithFile(res.MeteorXS2_png);
        }
        else if (seed < 65) {
            this.hits = 2;
            this.speedMult = 1.25;
            if (seed % 2 == 0) 
                this.initWithFile(res.MeteorS1_png);
            else 
                this.initWithFile(res.MeteorS2_png);
        }
        else if (seed < 85) {
            this.hits = 3;
            this.speedMult = 0.9;
            if (seed % 2 == 0) 
                this.initWithFile(res.MeteorM1_png);
            else 
                this.initWithFile(res.MeteorM2_png);
        }
        else {
            this.hits = 4;
            this.speedMult = 0.5;
            if (seed % 2 == 0) 
                this.initWithFile(res.MeteorL1_png);
            else 
                this.initWithFile(res.MeteorL2_png);
        }
    },
    onEnter:function() {
        this._super();
        
        var startX = 600;
        var startY = Math.random() * 320;
        this.setPosition(startX, startY);
        
        var endX = -100;
        var endY = Math.random() * 320;
        var duration = (3 + Math.random() * 2) / this.speedMult;
        
        var moveAction = new cc.MoveTo(duration, new cc.p(endX, endY));
        this.runAction(moveAction);
        
        var rotateAction = new cc.RotateBy(duration, 360);
        this.runAction(rotateAction);

        this.scheduleUpdate();
    },
    update:function(dt){
        var shipBoundingBox = ship.getBoundingBox();
        var asteroidBoundingBox = this.getBoundingBox();
        if (cc.rectIntersectsRect(shipBoundingBox, asteroidBoundingBox) && ship.invulnerability==0){
            animationLayer.removeMeteor(this);
            ship.respawn(this.hits * 3);
        }
        if (this.getPositionX() < -50){
            animationLayer.removeMeteor(this)
        }
    }
});