var FinalScoreLayer = cc.Layer.extend({
    ctor: function(){
        this._super();
    },
    init: function(){
        this._super();
        
        var winSize = cc.director.getWinSize();
        var centerPos = cc.p(winSize.width / 2, winSize.height / 2);

        // Create a background image and set it's position at the center of the screen
        var background = new cc.Sprite(res.MainScreen_png);
        background.setPosition(centerPos);
        this.addChild(background);

        var menuItemStart = new cc.MenuItemSprite(
            new cc.Sprite(res.ButtonBlue_png), // normal state image
            new cc.Sprite(res.ButtonGreen_png), // select state image
            this.onStart, this);
        
        var menuStartPos = new cc.p(centerPos.x, centerPos.y - 70)
        var menuStart = new cc.Menu(menuItemStart);
        menuStart.setPosition(menuStartPos);
        this.addChild(menuStart);
        
        var labelStart = new cc.LabelTTF("Play again", "Helvetica", 26);
        labelStart.setColor(cc.color(0, 0, 0));
        labelStart.setPosition(menuStartPos);
        this.addChild(labelStart);
        
        
        var labelScore = new cc.LabelTTF("Final Score: " + statusLayer.getScore(), "Helvetica", 30);
        labelScore.setColor(cc.color(255, 255, 255));
        labelScore.setPosition(centerPos.x, centerPos.y - 10);
        this.addChild(labelScore);
        
    },

    onStart : function(){
        cc.director.runScene(new PlayScene());
    }
});    

var FinalScoreScene = cc.Scene.extend({
    onEnter:function () {
        this._super();
        var layer = new FinalScoreLayer();
        layer.init();
        this.addChild(layer);
    }
});