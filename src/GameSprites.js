    
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
        
        var engineEmitter = new cc.ParticleSun();
        var emitterTexture = cc.textureCache.addImage(res.EngineParticle_png);
        engineEmitter.setTexture(emitterTexture);
        engineEmitter.setStartSize(2);
        engineEmitter.setEndSize(4);
        engineEmitter.setGravity(new cc.p(-1000, 0));
        this.engineEmitter = engineEmitter;
    },
    onEnter: function() {
        this.respawn(0);
    },
    respawn: function(damage) {
        this.setPosition(60, 200);
        this.invulnerability = 60;
        this.ySpeed = 0;
        this.damage += damage;
                
        if (this.damage >= this.life) {
            cc.audioEngine.playEffect(res.Lose_ogg);
            cc.director.runScene(new FinalScoreScene());
        }
        else if (damage > 0) {
            cc.audioEngine.playEffect(res.ShieldDown_ogg);
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
            this.setOpacity(100);
            this.invulnerability--;
        }
        else {
            this.setOpacity(255);
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
            cc.audioEngine.playEffect(res.Fire_ogg);
        }
    }
});


var Fire = cc.Sprite.extend({
    ctor: function() {
        this._super();
        this.initWithFile(res.Fire_png);
        this.setScale(0.6);
        this.setRotation(90);
        
        var smokeEmitter = new cc.ParticleSmoke();
        var emitterTexture = cc.textureCache.addImage(res.SmokeParticle_png);
        smokeEmitter.setTexture(emitterTexture);
        smokeEmitter.setStartSize(0.5);
        smokeEmitter.setEndSize(1);
        smokeEmitter.setGravity(new cc.p(0, -25));
        this.smokeEmitter = smokeEmitter;
        
        this.isFire = true;
    },
    onEnter: function() {
        this._super();
    
        this.smokeEmitter.setPosition(this.getPositionX() - 15, this.getPositionY());
        
        var moveAction = new cc.MoveBy(3, new cc.p(1000, 0));
        this.runAction(moveAction.clone());
        this.smokeEmitter.runAction(moveAction.clone());
        
        this.scheduleUpdate();
    },
    update: function(dt){
        if (this.getPositionX() > 800){
            animationLayer.removeFire(this)
        }
    }
});

var Meteor = cc.Sprite.extend({
    ctor: function() {
        this._super();
    
        var seed = Math.floor(Math.random() * 100);
        if (seed < 30) {
            this.hits = 1;
            this.points = 5;
            this.speedMult = 1.5;
            if (seed % 2 == 0) 
                this.initWithFile(res.MeteorXS1_png);
            else 
                this.initWithFile(res.MeteorXS2_png);
        }
        else if (seed < 65) {
            this.hits = 2;
            this.points = 10;
            this.speedMult = 1.25;
            if (seed % 2 == 0) 
                this.initWithFile(res.MeteorS1_png);
            else 
                this.initWithFile(res.MeteorS2_png);
        }
        else if (seed < 85) {
            this.hits = 2;
            this.points = 15;
            this.speedMult = 0.9;
            if (seed % 2 == 0) 
                this.initWithFile(res.MeteorM1_png);
            else 
                this.initWithFile(res.MeteorM2_png);
        }
        else {
            this.hits = 4;
            this.points = 25;
            this.speedMult = 0.5;
            if (seed % 2 == 0) 
                this.initWithFile(res.MeteorL1_png);
            else 
                this.initWithFile(res.MeteorL2_png);
        }
        
        // Give a little advantage on the small targets
        this.boBox = this.getBoundingBox();
        this.diameter = Math.min(this.boBox.height, this.boBox.width) * 0.8;
        this.diameter = Math.floor(this.diameter);
        this.diameter = Math.min(this.diameter, 75);
        this.diameter = Math.max(this.diameter, 20);
    },
    onEnter: function() {
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
    checkCollision: function(p) {
        meteorPos = this.getPosition();
        
        var dist = Math.sqrt(Math.pow(p.x - meteorPos.x, 2) + 
                            Math.pow(p.y - meteorPos.y, 2))
        
        return dist < this.diameter;

    },
    update: function(dt){
        
        // Check collision with fires
        var allChildren = animationLayer.getChildren();
        for(var i = 0; i< allChildren.length; i++) {
            if (allChildren[i].isFire) {
                var fire = allChildren[i];
                firePos = fire.getPosition();
                
                if (this.checkCollision(firePos)) {
                    // Show an explosion for the bullet
                    var explosion = new cc.ParticleExplosion();
                    explosion.initWithTotalParticles(30);
                    var texture = cc.textureCache.addImage(res.SmokeParticle_png);
                    explosion.setTexture(texture);
                    explosion.setStartSize(2);
                    explosion.setEndSize(3);
                    explosion.setPosition(firePos);
                    explosion.setStartColor(cc.color(204, 204, 204, 255));
                    explosion.setStartColorVar(cc.color(5, 5, 5, 0));
                    explosion.setEndColor(cc.color(100, 100, 100, 255));
                    explosion.setEndColorVar(cc.color(5, 5, 5, 5));
                    explosion.setLife(1);
                    explosion.setLifeVar(0.5);
                    explosion.setSpeed(20);
                    explosion.setSpeedVar(10);
                    explosion.setGravity(new cc.p(30, 0));
                    animationLayer.addExplosion(explosion);
                    
                    animationLayer.removeFire(fire);
                    this.hits--;
                    if (this.hits <= 0) {
                        statusLayer.increaseScore(this.points);
                        
                        // Show an explosion for the meteor
                        var explosion = new cc.ParticleExplosion();
                        explosion.initWithTotalParticles(this.diameter);
                        var texture = cc.textureCache.addImage(res.MeteorXS2_png);
                        explosion.setTexture(texture);
                        explosion.setStartSize(3);
                        explosion.setEndSize(4);
                        explosion.setPosition(meteorPos);
                        explosion.setStartColor(cc.color(153, 112, 85, 255));
                        explosion.setStartColorVar(cc.color(5, 5, 5, 0));
                        explosion.setEndColor(cc.color(153, 112, 85, 200));
                        explosion.setEndColorVar(cc.color(30, 30, 30, 5));
                        explosion.setLife(3);
                        explosion.setLifeVar(0.5);
                        explosion.setSpeed(20 * Math.sqrt(this.diameter));
                        explosion.setSpeedVar(10);
                        explosion.setGravity(new cc.p(30, 0));
                        animationLayer.addExplosion(explosion);
                        
                        if (this.diameter < 40) {
                            cc.audioEngine.playEffect(res.Explosion2_ogg);
                        }
                        else {
                            cc.audioEngine.playEffect(res.Explosion1_ogg);
                        }
                        animationLayer.removeMeteor(this);
                    }
                }
            }
        }      
        
        // Check collision with ship
        var shipBoBox = ship.getBoundingBox();
        var shipX = ship.getPositionX();
        var shipY = ship.getPositionY();

        var shipFront = new cc.p(cc.rectGetMaxX(shipBoBox) - 5, shipY); 
        var shipTopWing = new cc.p(shipX, cc.rectGetMaxY(shipBoBox) - 5); 
        var shipBotWing = new cc.p(shipX, cc.rectGetMinY(shipBoBox) - 5); 
            
        if ((this.checkCollision(shipFront) 
             || this.checkCollision(shipTopWing) || this.checkCollision(shipBotWing))
                && ship.invulnerability == 0) {
            
            animationLayer.removeMeteor(this);
            ship.respawn(this.points);
        }
        
        // Check if outside the screen
        if (this.getPositionX() < -50){
            animationLayer.removeMeteor(this);
        }
    }
});