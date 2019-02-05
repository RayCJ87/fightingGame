

var game = new Phaser.Game(1400, 800, Phaser.AUTO, 'phaser-example', { preload: preload, create: create, update:update,render:render });
var socket = io();

var userInput = {};

var punch = false;
var fire = false;
var left=false;
var right=false;
var duck= false;
var fire=false;
var jump=false;
var id = document.getElementById('userID').innerText;
var token = document.getElementById('token').innerText;

console.log("The token for the controller: ", token);


WebFontConfig = {
    //  'active' means all requested fonts have finished loading
    //  We set a 1 second delay before calling 'createText'.
    //  For some reason if we don't the browser cannot render the text the first time it's created.


    //  The Google Fonts we want to load (specify as many as you like in the array)
    google: {
      // families: ['Revalia']
      families: ['Press Start 2P']
    }
};

function preload() {
    game.load.script('webfont', '//ajax.googleapis.com/ajax/libs/webfont/1.4.7/webfont.js')
    game.load.spritesheet('buttonA', '/images/button-round-a.png',96,96);
    game.load.spritesheet('buttonB', '/images/button-round-b.png',96,96);
    ;


    game.load.spritesheet('gamepad','/assets/gamepad_spritesheet.png', 100, 100);


    // fullscreen setup
    game.scale.scaleMode = Phaser.ScaleManager.SHOW_ALL;
    game.scale.fullScreenScaleMode = Phaser.ScaleManager.EXACT_FIT;
}


 function create() {
    console.log("Connection.  ",socket)
    if (!game.device.desktop){ game.input.onDown.add(gofull, this); } //go fullscreen on mobile devices


    this.stage.backgroundColor = '#bbcfea';


    // create our virtual game controller buttons


    // controller mark

    if (id == 1){
        controllerColor = game.add.text(650, 400, 'Red')
        controllerColor.font = 'Press Start 2P'
        controllerColor.addColor("#B22222", 0);
        controllerColor.fontSize = 70
    }
    else if (id == 2) {
        controllerColor = game.add.text(650, 400, 'Green')
        controllerColor.font = 'Press Start 2P'
        controllerColor.addColor("#228B22", 0);
        controllerColor.fontSize = 70
    }
    else if (id == 3) {
        controllerColor = game.add.text(650, 400, 'Blue')
        controllerColor.font = 'Press Start 2P'
        controllerColor.addColor("#00BFFF", 0);
        controllerColor.fontSize = 70
    }
    else if (id == 4) {
        controllerColor = game.add.text(650, 400, 'Yellow')
        controllerColor.font = 'Press Start 2P'
        controllerColor.addColor("#FFD700", 0);
        controllerColor.fontSize = 70
    }








    buttonB = game.add.button(1100, 300, 'buttonB', null, this, 0, 1, 0, 1);  //game, x, y, key, callback, callbackContext, overFrame, outFrame, downFrame, upFrame
    buttonB.fixedToCamera = true;  //our buttons should stay on the same place
    buttonB.scale.setTo(2, 2); //the size of the button
    buttonB.events.onInputOver.add(function(){punch=true;});
    buttonB.events.onInputOut.add(function(){punch=false;});
    buttonB.events.onInputDown.add(function(){punch=true;});
    buttonB.events.onInputUp.add(function(){punch=false;});

    buttonA = game.add.button(900, 500, 'buttonA', null, this, 0, 1, 0, 1);
    buttonA.fixedToCamera = true;
    buttonA.scale.setTo(2, 2);//the size of the button
    buttonA.events.onInputOver.add(function(){fire=true;});
    buttonA.events.onInputOut.add(function(){fire=false;});
    buttonA.events.onInputDown.add(function(){fire=true;});
    buttonA.events.onInputUp.add(function(){fire=false;});


       // Add the VirtualGamepad plugin to the game
        this.gamepad = this.game.plugins.add(Phaser.Plugin.VirtualGamepad);

        // Add a joystick to the game (only one is allowed right now)
        this.joystick = this.gamepad.addJoystick(251, 420, 3.0, 'gamepad');

        // Add a button to the game (only one is allowed right now)
        //this.buttonA = this.gamepad.addButton(800, 420, 3.0, 'gamepad');




};

function update() {


var s = this.joystick.properties;
var a = punch;
var b = fire;
userInput[id] = s;
userInput[id]['a'] = a;
userInput[id]['b'] = b;
userInput[id]['token'] = token;
socket.emit('userInput',userInput)



    // userInput = '';
    // if (jump){ jump_now(); player.loadTexture('mario', 5);}  //change to another frame of the spritesheet
    // if (fire){fire_now(); player.loadTexture('mario', 8); }
    // if (duck){ player.body.setCircle(16,0,6);}else{ player.body.setCircle(22);}  //when ducking create a smaller hitarea - (radius,offsetx,offsety)
    // if (game.input.currentPointers == 0 && !game.input.activePointer.isMouse){ fire=false; right=false; left=false; duck=false; jump=false;} //this works around a "bug" where a button gets stuck in pressed state

};

function render(){ };

function gofull() { game.scale.startFullScreen(false);}