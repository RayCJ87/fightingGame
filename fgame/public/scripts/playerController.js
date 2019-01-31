

var game = new Phaser.Game(1400, 800, Phaser.AUTO, 'phaser-example', { preload: preload, create: create, update:update,render:render });
var socket = io();

var userInput = '';

var punch = false;
var fire = false;
var left=false;
var right=false;
var duck= false;
var fire=false;
var jump=false;

function preload() {

    //gamepad buttons
    game.load.spritesheet('buttonup', '/images/up.png',220,220);
    game.load.spritesheet('buttondown', '/images/down.png',220,220);
    game.load.spritesheet('buttonleft', '/images/left.png',200,200);
    game.load.spritesheet('buttonright', '/images/right.png',200,200);
    game.load.spritesheet('centre', '/images/centre.png',200,150);



    game.load.spritesheet('buttonA', '/images/buttonA.jpg',200,200);
    game.load.spritesheet('buttonB', '/images/buttonB.jpg',200,200);
    // fullscreen setup
    game.scale.scaleMode = Phaser.ScaleManager.SHOW_ALL;
    game.scale.fullScreenScaleMode = Phaser.ScaleManager.EXACT_FIT;
}


 function create() {
    console.log("Connection.  ",socket)
    if (!game.device.desktop){ game.input.onDown.add(gofull, this); } //go fullscreen on mobile devices


    this.stage.backgroundColor = '#EDF7F6';



    // create our virtual game controller buttons

    buttonB = game.add.button(1100, 300, 'buttonB', null, this, 0, 1, 0, 1);  //game, x, y, key, callback, callbackContext, overFrame, outFrame, downFrame, upFrame
    buttonB.fixedToCamera = true;  //our buttons should stay on the same place
    buttonB.events.onInputOver.add(function(){punch=true;});
    buttonB.events.onInputOut.add(function(){punch=false;});
    buttonB.events.onInputDown.add(function(){punch=true;});
    buttonB.events.onInputUp.add(function(){punch=false;});

    buttonA = game.add.button(900, 500, 'buttonA', null, this, 0, 1, 0, 1);
    buttonA.fixedToCamera = true;
    buttonA.events.onInputOver.add(function(){fire=true;});
    buttonA.events.onInputOut.add(function(){fire=false;});
    buttonA.events.onInputDown.add(function(){fire=true;});
    buttonA.events.onInputUp.add(function(){fire=false;});

    buttonleft = game.add.button(36, 300, 'buttonleft', null, this, 0, 1, 0, 1);
    buttonleft.fixedToCamera = true;
    buttonleft.events.onInputOver.add(function(){left=true;});
    buttonleft.events.onInputOut.add(function(){left=false;});
    buttonleft.events.onInputDown.add(function(){left=true;});
    buttonleft.events.onInputUp.add(function(){left=false;});



    buttonright = game.add.button(436, 300, 'buttonright', null, this, 0, 1, 0, 1);
    buttonright.fixedToCamera = true;
    buttonright.events.onInputOver.add(function(){right=true;});
    buttonright.events.onInputOut.add(function(){right=false;});
    buttonright.events.onInputDown.add(function(){right=true;});
    buttonright.events.onInputUp.add(function(){right=false;});


    buttondown = game.add.button(236, 436, 'buttondown', null, this, 0, 1, 0, 1);
    buttondown.fixedToCamera = true;
    buttondown.events.onInputOver.add(function(){duck=true;});
    buttondown.events.onInputOut.add(function(){duck=false;});
    buttondown.events.onInputDown.add(function(){duck=true;});
    buttondown.events.onInputUp.add(function(){duck=false;});

    buttonup = game.add.button(236, 110, 'buttonup', null, this, 0, 1, 0, 1);
    buttonup.fixedToCamera = true;
    buttonup.events.onInputOver.add(function(){jump=true;});
    buttonup.events.onInputOut.add(function(){jump=false;});
    buttonup.events.onInputDown.add(function(){jump=true;});
    buttonup.events.onInputUp.add(function(){jump=false;});

    buttoncenter = game.add.button(236, 315, 'centre', null, this, 0, 1, 0, 1);

};

function update() {

    if (left && !duck) {
        userInput = 'left';
            // player.scale.x = -1;
            // player.body.moveLeft(500);
            // player.animations.play('walk');
            socket.emit('userInput', userInput)
           console.log("Ready to send ", userInput);
    }
    else if (right && !duck) {
        userInput = 'right';
        // player.scale.x = 1;
        // player.body.moveRight(500);
        // player.animations.play('walk');
        socket.emit('userInput', userInput)
       console.log("Ready to send ", userInput);
    }
    else if (duck && !left && !right) {
        userInput = 'duck';
        socket.emit('userInput', userInput)
       console.log("Ready to send ", userInput);
        // player.body.velocity.x=0;
        // player.animations.play('duck');
    }
    else if (fire) {
        userInput = 'fire';
        socket.emit('userInput', userInput)
       console.log("Ready to send ", userInput);
        // player.scale.x = 1;
        // player.body.moveRight(200);
        // player.animations.play('duckwalk');
    }
    else if (jump) {
        userInput = 'jump'
        socket.emit('userInput', userInput)
       console.log("Ready to send ", userInput);
        // userInput = 'left';
        // player.scale.x = -1;
        // player.body.moveLeft(200);
        // player.animations.play('duckwalk');
    }
    else if (punch) {
        userInput = 'punch'
        socket.emit('userInput', userInput)
       console.log("Ready to send ", userInput);
    }

    userInput = '';
    // if (jump){ jump_now(); player.loadTexture('mario', 5);}  //change to another frame of the spritesheet
    // if (fire){fire_now(); player.loadTexture('mario', 8); }
    // if (duck){ player.body.setCircle(16,0,6);}else{ player.body.setCircle(22);}  //when ducking create a smaller hitarea - (radius,offsetx,offsety)
    // if (game.input.currentPointers == 0 && !game.input.activePointer.isMouse){ fire=false; right=false; left=false; duck=false; jump=false;} //this works around a "bug" where a button gets stuck in pressed state

};

function render(){ };

function gofull() { game.scale.startFullScreen(false);}