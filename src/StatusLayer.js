var StatusLayer = cc.Layer.extend({
    labelCoin:null,
    labelMeter:null,
    coins:0,

    ctor: function() {
        this._super();
        this.init();
    },

    init: function() {
        this._super();
        this.score = 0;

        var winsize = cc.director.getWinSize();

        this.labelScore = new cc.LabelTTF("Score: 0", "Helvetica", 20);
        this.labelScore.setColor(cc.color(255, 255, 255));
        this.labelScore.setPosition(cc.p(70, winsize.height - 20));
        this.addChild(this.labelScore);
        
        this.labelLife = new cc.LabelTTF("Life: 100/100", "Helvetica", 20);
        this.labelLife.setPosition(cc.p(winsize.width - 70, winsize.height - 20));
        this.addChild(this.labelLife);
        
        this.schedule(this.updateShipStatus, 0.2);
    }, 
    
    increaseScore: function(points) {
        this.score += points;
        this.labelScore.setString("Score: " + this.score);
    },
    
    getScore: function() {
        return this.score;
    },
    
    updateShipStatus: function() {
        this.labelLife.setString("Life: " + (ship.life - ship.damage) + "/" + ship.life);
    }
});