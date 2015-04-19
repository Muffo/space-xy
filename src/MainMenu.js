var MenuLayer = cc.Layer.extend({
    ctor : function(){
        this._super();
    },
    init:function(){
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
        
        var menuStartPos = new cc.p(centerPos.x, centerPos.y - 50)
        var menuStart = new cc.Menu(menuItemStart);
        menuStart.setPosition(menuStartPos);
        this.addChild(menuStart);
        
        var labelStart = new cc.LabelTTF("Start", "Helvetica", 26);
        labelStart.setColor(cc.color(0, 0, 0));
        labelStart.setPosition(centerPos.x, centerPos.y - 50);
        this.addChild(labelStart);
    },

    onStart : function(){
        cc.director.runScene(new PlayScene());
    }
});    

var MainMenuScene = cc.Scene.extend({
    onEnter:function () {
        this._super();
        var layer = new MenuLayer();
        layer.init();
        this.addChild(layer);
    }
});