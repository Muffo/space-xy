var MenuLayer = cc.Layer.extend({
    ctor : function(){
        //1. call super class's ctor function
        this._super();
    },
    init:function(){
        this._super();
        
        var winsize = cc.director.getWinSize();
        var centerpos = cc.p(winsize.width / 2, winsize.height / 2);

        // Create a background image and set it's position at the center of the screen
        var background = new cc.Sprite(res.MenuBackground_png);
        background.setPosition(centerpos);
        this.addChild(background);


        var menuItemPlay = new cc.MenuItemSprite(
            new cc.Sprite(res.ButtonBlue_png), // normal state image
            new cc.Sprite(res.ButtonGreen_png), // select state image
            this.onPlay, this);
       
        var menu = new cc.Menu(menuItemPlay);
        menu.setPosition(centerpos);
        this.addChild(menu);
        
        var labelStart = new cc.LabelTTF("START", "Helvetica", 30);
        labelStart.setColor(cc.color(0, 0, 0));
        labelStart.setPosition(centerpos);
        this.addChild(labelStart);
    },

    onPlay : function(){
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