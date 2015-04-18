var res = {
    MenuBackground_png : "res/SpaceShooterRedux/Backgrounds/blue_480x320.png",
        
    GameBackground_png : "res/SpaceShooterRedux/Backgrounds/purple_960x320.png",
        
    // UI
    ButtonBlue_png : "res/SpaceShooterRedux/PNG/UI/buttonBlue.png",
    ButtonGreen_png : "res/SpaceShooterRedux/PNG/UI/buttonGreen.png",
    
    Kenvector_ttf : "res/SpaceShooterRedux/Bonus/kenvector_future.ttf",
    
    // Game
    Ship_png : "res/SpaceShooterRedux/PNG/playerShip2_orange.png",
    EngineParticle_png : "res/engineParticle.png",
    SmokeParticle_png : "res/smokeParticle.png",
    Fire_png: "res/SpaceShooterRedux/PNG/Effects/fire05.png",
    
    MeteorL1_png :  "res/SpaceShooterRedux/PNG/Meteors/meteorBrown_big3.png",
    MeteorL2_png :  "res/SpaceShooterRedux/PNG/Meteors/meteorBrown_big4.png",
    MeteorM1_png :  "res/SpaceShooterRedux/PNG/Meteors/meteorBrown_med1.png",
    MeteorM2_png :  "res/SpaceShooterRedux/PNG/Meteors/meteorBrown_med3.png",
    MeteorS1_png :  "res/SpaceShooterRedux/PNG/Meteors/meteorBrown_small1.png",
    MeteorS2_png :  "res/SpaceShooterRedux/PNG/Meteors/meteorBrown_small2.png",
    MeteorXS1_png : "res/SpaceShooterRedux/PNG/Meteors/meteorBrown_tiny1.png",
    MeteorXS2_png : "res/SpaceShooterRedux/PNG/Meteors/meteorBrown_tiny2.png",
    
    Star1_png : "res/SpaceShooterRedux/PNG/Effects/star1.png",
    Star2_png : "res/SpaceShooterRedux/PNG/Effects/star2.png",
    Star3_png : "res/SpaceShooterRedux/PNG/Effects/star3.png",
};

// {fontName:"Kenvector", src:[{src:"res/SpaceShooterRedux/Bonus/kenvector_future.ttf", type:"truetype"}]}

var g_resources = [];
for (var i in res) {
    g_resources.push(res[i]);
}