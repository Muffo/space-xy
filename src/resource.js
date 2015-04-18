var res = {
    MenuBackground_png : "res/SpaceShooterRedux/Backgrounds/blue_480x320.png",
        
    GameBackground_png : "res/SpaceShooterRedux/Backgrounds/purple_960x320.png",
        
    // UI
    ButtonBlue_png : "res/SpaceShooterRedux/PNG/UI/buttonBlue.png",
    ButtonGreen_png : "res/SpaceShooterRedux/PNG/UI/buttonGreen.png",
    
    Kenvector_ttf : "res/SpaceShooterRedux/Bonus/kenvector_future.ttf",
    
    
};

// {fontName:"Kenvector", src:[{src:"res/SpaceShooterRedux/Bonus/kenvector_future.ttf", type:"truetype"}]}

var g_resources = [];
for (var i in res) {
    g_resources.push(res[i]);
}