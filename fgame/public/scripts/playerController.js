var game = new Phaser.Game(800, 600, Phaser.AUTO, 'phaser-example', { preload: preload, create: create, update:update,render:render });






function preload() {


    //gamepad buttons
    game.load.spritesheet('buttonvertical', '/images/button-vertical.png',64,64);
    game.load.spritesheet('buttonhorizontal', '/images/button-horizontal.png',96,64);
    game.load.spritesheet('buttondiagonal', '/images/button-diagonal.png',64,64);
    game.load.spritesheet('buttonA', '/images/button-round-a.png',96,96);
    game.load.spritesheet('buttonB', '/images/button-round-b.png',96,96);
    // fullscreen setup
    game.scale.scaleMode = Phaser.ScaleManager.SHOW_ALL;
    game.scale.fullScreenScaleMode = Phaser.ScaleManager.EXACT_FIT;
}

function create() {
    if (!game.device.desktop){ game.input.onDown.add(gofull, this); } //go fullscreen on mobile devices


    this.stage.backgroundColor = '#3A5963';


    // create our virtual game controller buttons
    buttonB = game.add.button(600, 500, 'buttonB', null, this, 0, 1, 0, 1);  //game, x, y, key, callback, callbackContext, overFrame, outFrame, downFrame, upFrame
    buttonB.fixedToCamera = true;  //our buttons should stay on the same place


    buttonA = game.add.button(700, 500, 'buttonA', null, this, 0, 1, 0, 1);
    buttonA.fixedToCamera = true;
    // buttonA.events.onInputOver.add(function(){fire=true;});
    // buttonA.events.onInputOut.add(function(){fire=false;});
    // buttonA.events.onInputDown.add(function(){fire=true;});
    // buttonA.events.onInputUp.add(function(){fire=false;});

    buttonleft = game.add.button(0, 472, 'buttonhorizontal', null, this, 0, 1, 0, 1);
    buttonleft.fixedToCamera = true;
    // buttonleft.events.onInputOver.add(function(){left=true;});
    // buttonleft.events.onInputOut.add(function(){left=false;});
    // buttonleft.events.onInputDown.add(function(){left=true;});
    // buttonleft.events.onInputUp.add(function(){left=false;});



    buttonright = game.add.button(160, 472, 'buttonhorizontal', null, this, 0, 1, 0, 1);
    buttonright.fixedToCamera = true;
    // buttonright.events.onInputOver.add(function(){right=true;});
    // buttonright.events.onInputOut.add(function(){right=false;});
    // buttonright.events.onInputDown.add(function(){right=true;});
    // buttonright.events.onInputUp.add(function(){right=false;});


    buttondown = game.add.button(96, 536, 'buttonvertical', null, this, 0, 1, 0, 1);
    buttondown.fixedToCamera = true;
    // buttondown.events.onInputOver.add(function(){duck=true;});
    // buttondown.events.onInputOut.add(function(){duck=false;});
    // buttondown.events.onInputDown.add(function(){duck=true;});
    // buttondown.events.onInputUp.add(function(){duck=false;});

    buttondown = game.add.button(96, 410, 'buttonvertical', null, this, 0, 1, 0, 1);
    buttondown.fixedToCamera = true;
    // buttondown.events.onInputOver.add(function(){jump=true;});
    // buttondown.events.onInputOut.add(function(){jump=false;});
    // buttondown.events.onInputDown.add(function(){jump=true;});
    // buttondown.events.onInputUp.add(function(){jump=false;});
};

function update() {};

function render(){ };



function gofull() { game.scale.startFullScreen(false);}