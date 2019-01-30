/**
 * @author      Shawn Hymel <@ShawnHymel>
 * @copyright   2016 Shawn Hymel
 * @license     {@link http://choosealicense.com/licenses/no-license/|No License}
 * @description This example demonstrates the VirtualGamepad plugin.
 */

var game = new Phaser.Game(800, 600, Phaser.AUTO);



var PhaserGame = function() {
    this.player = null;
}
var map;
var layer;
var player;

PhaserGame.prototype = {


    preload: function() {

        // Load the gamepad spritesheet. Note that the width must equal height
        // of the sprite.
        this.load.spritesheet('gamepad','/images/gamepad_spritesheet.png', 100, 100);

        this.load.spritesheet('buttonB','/images/button-diagonal.png',125,125);
        this.load.image('laser', '/images/laser.png');


        this.load.spritesheet('mario', '/images/mariospritesheet-small.png',50,50); // key, sourcefile, framesize x, framesize y
        this.load.tilemap('map','/images/livel1.csv');
        this.load.image('tiles','/images/tileset.png');
    },

    create: function() {
//---------------------
        this.stage.backgroundColor = '#3A5963';
        map = game.add.tilemap('map', 64, 64);
        map.addTilesetImage('tiles');
        layer = map.createLayer(0);
        layer.resizeWorld();

       // this.player.body.collideWorldBounds = true;

//---------------------
        game.renderer.roundPixels = true;

        this.scale.scaleMode = Phaser.ScaleManager.SHOW_ALL;
		this.scale.pageAlignHorizontally = true;
		this.scale.pageAlignVertically = true;

        this.physics.startSystem(Phaser.Physics.ARCADE);



        this.lasers = game.add.group();
        this.lasers.enableBody = true;
        this.lasers.physicsBodyType = Phaser.Physics.ARCADE;

        this.lasers.createMultiple(40, 'laser');
        this.lasers.setAll('scale.x', 0.5);
        this.lasers.setAll('scale.y', 0.5);
        this.lasers.setAll('anchor.x', 0.5);
        this.lasers.setAll('anchor.y', 0.5);

        this.laserTime = 0;

        this.player = this.add.sprite(250, 250, 'mario');
        this.player.scale.setTo(0.8, 0.8);
        this.player.anchor.set(0.5);

        game.physics.arcade.enable(this.player);
        this.player.body.drag.set(100);
        this.player.body.maxVelocity.set(300);
        this.player.lastAngle = -90;





        // Add the VirtualGamepad plugin to the game
        this.gamepad = this.game.plugins.add(Phaser.Plugin.VirtualGamepad);

        // Add a joystick to the game (only one is allowed right now)
        this.joystick = this.gamepad.addJoystick(300, 420, 1.0, 'gamepad');

        // Add a button to the game (only one is allowed right now)
        this.buttonA = this.gamepad.addButton(400, 420, 1.0, 'gamepad');
        this.buttonB = game.add.button(600, 360, 'buttonB', null, this, 0, 1, 0, 1);


    },

    update: function() {
       // this.physics.arcade.collide(player,layer)


        this.player.body.acceleration.x =1.1*this.joystick.properties.x;
        this.player.body.acceleration.y = 1.1*this.joystick.properties.y;

        // Fire the lasers!
        if (this.buttonA.isDown) {
            this.fireLaser();
        }


    },

    fireLaser: function() {
        if (game.time.now > this.laserTime) {
            this.laser = this.lasers.getFirstExists(false);
            if (this.laser) {
                this.laser.reset(this.player.body.x + 20,
                    this.player.body.y + 12);
                this.laser.lifespan = 2000;
                this.laser.angle = this.player.angle;
                game.physics.arcade.velocityFromRotation(this.player.rotation,
                    400, this.laser.body.velocity);
                this.laserTime = game.time.now + 100;
            }
        }
    },




};

game.state.add('Game', PhaserGame, true);