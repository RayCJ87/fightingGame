//global variables

var map;
var layer;
var player;
var player2;
var cursors;
var currentHealthStatus;
var currentHealthStatus1;
var music;
var platforms;
var playerSpeed = 400
var socket = io();
var action={} ;
var restartButton;
var id;
var totalPlayer = [player, player2]
var doDamage1 = 5
var doDamage2 = 5
var doDamage3 = 5
var doDamage4 = 5
var finalScore = 0
var winnerCheck = true;

socket.on('userAction', function(data){
  // console.log("Game received action: ", data)
  action = data;
  // console.log("the action : ---> ", action)
})

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

var PlayState = {

init: function(){
  // this.input.maxPointers =1;
  this.stage.disableVisibilityChange = true;

  const enable_gravity = 3200;
  this.game.physics.arcade.gravity.y = enable_gravity;

  this.game.physics.arcade.OVERLAP_BIAS = 20
},

render: function(){

  // this.game.debug.body(player)
  // this.game.debug.body(player2)
},

preload: function(){

   //Google Fonts
  this.game.load.script('webfont', '//ajax.googleapis.com/ajax/libs/webfont/1.4.7/webfont.js');


  //music
  this.game.load.audio('background_music', '/assets/background_music.ogg')

  //restart button
  this.game.load.image('restart-Button', '/assets/restart.png');

  // this.game.load.json('level:1', 'assets/level00.json');
  this.game.load.image('ground', 'assets/ground.png');
    this.game.load.image('grass:8x1', 'assets/grass_8x1.png');
    this.game.load.image('grass:6x1', 'assets/grass_6x1.png');
    this.game.load.image('grass:4x1', 'assets/grass_4x1.png');
    this.game.load.image('grass:2x1', 'assets/grass_2x1.png');
    this.game.load.image('grass:1x1', 'assets/grass_1x1.png');


 //   this.game.load.json('level:1', 'assets/first_test_340pm.json');
  this.game.load.image('one', 'assets/1.png');
    this.game.load.image('two', 'assets/2.png');
    this.game.load.image('three', 'assets/3.png');
    this.game.load.image('four', 'assets/4.png');
    this.game.load.image('five', 'assets/5.png');
    this.game.load.image('six', 'assets/6.png');
    this.game.load.image('seven', 'assets/7.png');
    this.game.load.image('eight', 'assets/8.png');
    this.game.load.image('nine', 'assets/9.png');
    this.game.load.image('ten', 'assets/10.png');
    this.game.load.image('eleven', 'assets/11.png');
    this.game.load.image('twelve', 'assets/12.png');
    this.game.load.image('thirteen', 'assets/13.png');
    this.game.load.image('fourteen', 'assets/14.png');
    this.game.load.image('fifteen', 'assets/15.png');
    this.game.load.image('sixteen', 'assets/16.png');


  this.game.load.image('tree', 'assets/tree.png');
  this.game.load.image('skeleton', 'assets/skeleton.png');
  this.game.load.image('cactus_one', 'assets/cactus_one.png');
  this.game.load.image('cactus_two', 'assets/cactus_two.png');
  this.game.load.image('cactus_three', 'assets/cactus_three.png');
  this.game.load.image('stone', 'assets/stone.png');
  this.game.load.image('signArrow', 'assets/sign_arrow.png');

 // this.load.tilemap('level:1', 'assets/first_test_340pm.json');
  // this.load.tilemap('map','assets/level1.csv');
  // this.load.image('tileset','assets/tileset.png');

  this.game.load.image('guns', 'assets/edit_gun.png');

  this.game.load.image('bullet', 'assets/fireball.png')
  this.game.load.image('bullet2', 'assets/fireball.png')
  this.game.load.image('bullet3', 'assets/fireball.png')
  this.game.load.image('bullet4', 'assets/fireball.png')
  // this.load.spritesheet('player','assets/player.png',24,26)
  this.load.spritesheet('player','assets/dino_red.png',24,24)
    this.load.spritesheet('player3','assets/dino_blue.png', 24, 24)
  this.load.spritesheet('player4','assets/dino_green.png', 24, 24)
  // this.load.spritesheet('player','assets/dino_red_flipped.png',24,24)
  this.load.spritesheet('test','assets/dino_green.png', 24, 24)
  this.game.load.image('health_green', 'assets/health_green.png')
  this.game.load.image('health_red', 'assets/health_red.png')

  this.game.load.image('powerUp', 'assets/meat_powerUp.png')
  this.game.load.image('powerUp2', 'assets/meat_powerUp.png')

     this.game.load.image('barrel_red', 'assets/barrel_red.png')
   this.game.load.image('barrel_red2', 'assets/barrel_red.png')
   this.game.load.image('barrel_red3', 'assets/barrel_red.png')

  this.game.load.image('explosion', 'assets/explosion.png')

  this.game.load.image('background','assets/BG.png');


},


create: function(){


  music = this.game.add.audio('background_music', 1, true)
  music.play()
  //total time until trigger
        // this.timeInSeconds = 100;
        //make a text field
        // this.timeText = this.add.text(640, 25, "1:00");
        //turn the text white
        // this.timeText.fill = "#ffffff";
        //center the text
        // this.timeText.anchor.set(0.5, 0.5);
        //set up a loop timer
        // this.timer = this.time.events.loop(Phaser.Timer.SECOND, this.tick, this);
          groupPowerUp = this.game.add.group()

  // powerUp = this.game.add.sprite(850, 810, "powerUp")


  groupPlatform = this.game.add.group()

   var backgroundImage = this.game.add.image(0,0, 'background');
   this.game.world.sendToBack(backgroundImage)

  barrel_red = this.game.add.sprite(0, 750, 'barrel_red')
  barrel_red.scale.setTo(0.5, 0.5)

  barrel_red2 = this.game.add.sprite(0, 631, 'barrel_red2')
  barrel_red2.scale.setTo(0.5, 0.5)

  barrel_red3 = this.game.add.sprite(0, 512, 'barrel_red3')
  barrel_red3.scale.setTo(0.5, 0.5)

var platform1 = this.game.add.sprite(1152,867, 'fifteen');
  var platform2 = this.game.add.sprite(1024,867, 'fifteen');
  var platform3 = this.game.add.sprite(896,867, 'fifteen');
  var platform4 = this.game.add.sprite(768,867, 'fifteen');
  var platform5 = this.game.add.sprite(640,867, 'fifteen');
  var platform6 = this.game.add.sprite(512,867, 'fifteen');
  var platform7 = this.game.add.sprite(384,867, 'fifteen');
  var platform8 = this.game.add.sprite(256,867, 'fifteen');
  var platform9 = this.game.add.sprite(128,867, 'fifteen');
  var platform10 = this.game.add.sprite(0,867, 'fifteen');

  var platformTwo1 = this.game.add.sprite(1152,650, 'fifteen');
  var platformTwo2 = this.game.add.sprite(1024,650, 'fourteen');

  var platformThree1 = this.game.add.sprite(756,420, 'sixteen');
  var platformThree2 = this.game.add.sprite(628,420, 'fifteen');
  var platformThree3 = this.game.add.sprite(500,420, 'fourteen');
  // var platform16 = this.game.add.sprite(372,450, 'fourteen');

  var platformFour1 = this.game.add.sprite(478,150, 'sixteen');
  var platformFour2 = this.game.add.sprite(350,150, 'fourteen');

  var platformFive1 = this.game.add.sprite(338,575, 'sixteen');
  var platformFive2 = this.game.add.sprite(210,575, 'fourteen');


  this.game.add.sprite(1050, 390, "tree")
  var skeleton1 = this.game.add.sprite(500, 900, "skeleton")
  // var skeleton2 = this.game.add.sprite(300, 105, "skeleton")
  this.game.add.sprite(600, 755, "cactus_one")
  // this.game.add.sprite(278, 400, "cactus_two")
  this.game.add.sprite(250, 480, "cactus_three")
  this.game.add.sprite(300, 780, "signArrow")
  stone = this.game.add.sprite(210, 815, "stone")
  stone.scale.setTo(0.75,0.75)

  guns = this.game.add.sprite(330, 90, "guns")
  guns.scale.setTo(0.18, 0.18)
  this.game.physics.enable(guns)

  powerUp = this.game.add.sprite("powerUp")
  powerUp2 = this.game.add.sprite("powerUp2")
  this.game.time.events.add(Phaser.Timer.SECOND * 1, this.powerUpDrop, this)
  this.game.time.events.add(Phaser.Timer.SECOND * 2, this.powerUpDrop2, this)

//   this.physics.enable(platform1, Phaser.Physics.ARCADE)
//   this.physics.enable(platform2, Phaser.Physics.ARCADE)
//   this.physics.enable(platform3, Phaser.Physics.ARCADE)
//   this.physics.enable(platform4, Phaser.Physics.ARCADE)
//   this.physics.enable(platform5, Phaser.Physics.ARCADE)
//   this.physics.enable(platform6, Phaser.Physics.ARCADE)
//   this.physics.enable(platform7, Phaser.Physics.ARCADE)
//   this.physics.enable(platform8, Phaser.Physics.ARCADE)
//   this.physics.enable(platform9, Phaser.Physics.ARCADE)
//   this.physics.enable(platform10, Phaser.Physics.ARCADE)
//   this.physics.enable(platform11, Phaser.Physics.ARCADE)
//   this.physics.enable(platform12, Phaser.Physics.ARCADE)
//   this.physics.enable(platform13, Phaser.Physics.ARCADE)
//   this.physics.enable(platform14, Phaser.Physics.ARCADE)
//   this.physics.enable(platform15, Phaser.Physics.ARCADE)
//   this.physics.enable(platform16, Phaser.Physics.ARCADE)
//   this.physics.enable(platform17, Phaser.Physics.ARCADE)
//   this.physics.enable(platform18, Phaser.Physics.ARCADE)
//   this.physics.enable(platform19, Phaser.Physics.ARCADE)



  groupPlatform.add(platform1)
  groupPlatform.add(platform2)
  groupPlatform.add(platform3)
  groupPlatform.add(platform4)
  groupPlatform.add(platform5)
  groupPlatform.add(platform6)
  groupPlatform.add(platform7)
  groupPlatform.add(platform8)
  groupPlatform.add(platform9)
  groupPlatform.add(platform10)
  // groupPlatform.add(platform11)
  // groupPlatform.add(platform12)
  // groupPlatform.add(platform13)
  // groupPlatform.add(platform14)
  // groupPlatform.add(platform15)
  // groupPlatform.add(platform16)

  groupPlatform.add(platformTwo1)
  groupPlatform.add(platformTwo2)

  groupPlatform.add(platformThree1)
  groupPlatform.add(platformThree2)
  groupPlatform.add(platformThree3)

  groupPlatform.add(platformFour1)
  groupPlatform.add(platformFour2)

  groupPlatform.add(platformFive1)
  groupPlatform.add(platformFive2)

  this.game.physics.enable(groupPlatform)
  groupPlatform.setAll('body.allowGravity', false)
  groupPlatform.setAll('body.immovable', true)




  // this.loadLevel(this.game.cache.getJSON('level:1'));

  // this.stage.backgroundColor = '#3A5963';

  // map = this.add.tilemap('map',64,64);
  // map.addTilesetImage('tileset');
  // layer = map.createLayer(0);
  // layer.resizeWorld();

  // map.setCollisionBetween(0,2);

  bullet = this.game.add.weapon(10, 'bullet')
  // bullet.fireLimit = 20
  // var shotsRemain = laser.fireLimit - laser.shots;
  // shotRemainText.text = 'Shots Left ' + shotsRemain;
  bullet2 = this.game.add.weapon(10, 'bullet')

  bullet.bulletGravity.y = -3200;
  bullet2.bulletGravity.y = -3200;
  bullet.bulletKillType = Phaser.Weapon.KILL_DISTANCE
  bullet2.bulletKillType = Phaser.Weapon.KILL_DISTANCE
  bullet.bulletKillDistance = 300
  bullet2.bulletKillDistance = 300

  player = this.add.sprite(550,830,'player', 9);//position of the player
  player.anchor.setTo(0.5,0.5);
  player.scale.setTo(4,4)
  player.animations.add('walking', [0, 1, 2, 3, 4, 5, 6, 7, 8, 9], 9, true);
  // player.animations.add('attack', [17,18,19,20,21,22,23, 0],7,true)
  player.animations.add('attack', [17, 0],7,false)
  player.animations.add('death', [15, 14, 16, 15],4,false)
  player.health = 100
  player.maxhealth = 100

  player2 = this.add.sprite(300,830,'test', 3);//position of the player
  player2.anchor.setTo(0.5,0.5);
  player2.scale.setTo(4,4)
  player2.animations.add('walking2', [0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10], 9, true);
  // player2.animations.add('attack2', [17,18,19,20,21,22,23, 0],7,false)
  player2.animations.add('attack', [17, 0],7,false)
  player2.animations.add('death', [15, 14, 16, 15],4,false)
  player2.health = 100
  player2.maxhealth = 100


  this.physics.enable(player, Phaser.Physics.ARCADE)
  this.physics.arcade.enable(player);
  this.camera.follow(player);
  player.body.collideWorldBounds = true;

  this.physics.enable(player2, Phaser.Physics.ARCADE)
  this.physics.arcade.enable(player2);
  this.camera.follow(player2);
  player2.body.collideWorldBounds = true;

  bullet.trackSprite(player);
  bullet.bulletSpeed = 600
  // bullet.fireLimit = 10
  bullet2.trackSprite(player2);
  bullet2.bulletSpeed = 600

  var totalHealthBar = this.game.add.image(600, 20, 'health_red')
  totalHealthBar.fixedToCamera = true
  currentHealthStatus = this.game.add.image(600, 20, 'health_green')
  currentHealthStatus.fixedToCamera = true
  var healthText = this.game.add.text(510, 20, `${action[2].name.slice(0, 6)}: `, {fontSize: '20px', fill: '#ffffff'})
  healthText.fixedToCamera = true

  var totalHealthBar1 = this.game.add.image(200, 20, 'health_red')
  totalHealthBar1.fixedToCamera = true
  currentHealthStatus1 = this.game.add.image(200, 20, 'health_green')
  currentHealthStatus1.fixedToCamera = true
  var healthText1 = this.game.add.text(110, 20, `${action[1].name.slice(0, 6)}: `, {fontSize: '20px', fill: '#ffffff'})
  healthText1.fixedToCamera = true



  cursors = this.input.keyboard.createCursorKeys()
  aKey = this.game.input.keyboard.addKey(Phaser.Keyboard.A)
  dKey = this.game.input.keyboard.addKey(Phaser.Keyboard.D)
  sKey = this.game.input.keyboard.addKey(Phaser.Keyboard.S)
  wKey = this.game.input.keyboard.addKey(Phaser.Keyboard.W)


  // spacebar = this.game.input.keyboard.addKey(Phaser.Keyboard.SPACEBAR)
  fireButton = this.input.keyboard.addKey(Phaser.KeyCode.SPACEBAR);
  fireButton2 = this.input.keyboard.addKey(Phaser.KeyCode.TILDE);
  meleeButton = this.game.input.keyboard.addKey(Phaser.Keyboard.P)
  meleeButton2 = this.game.input.keyboard.addKey(Phaser.Keyboard.Q)


},



update: function(){

//Barrel 1 to everything
 this.physics.arcade.collide(barrel_red, groupPlatform)
 this.physics.arcade.collide(barrel_red, player)
 this.physics.arcade.collide(barrel_red, player2)
// this.physics.arcade.collide(barrel_red, player3)
 // this.physics.arcade.collide(barrel_red, player4)
 this.game.physics.enable(barrel_red)

//Barrel 2 to everything
 this.physics.arcade.collide(barrel_red2, groupPlatform)
 this.physics.arcade.collide(barrel_red2, player)
 this.physics.arcade.collide(barrel_red2, player2)
// this.physics.arcade.collide(barrel_red2, player3)
 // this.physics.arcade.collide(barrel_red2, player4)
 this.game.physics.enable(barrel_red2)

//Barrel 3 to everything
 this.physics.arcade.collide(barrel_red3, groupPlatform)
 this.physics.arcade.collide(barrel_red3, player)
 this.physics.arcade.collide(barrel_red3, player2)
// this.physics.arcade.collide(barrel_red3, player3)
 // this.physics.arcade.collide(barrel_red3, player4)
 this.game.physics.enable(barrel_red3)

//Barrel to Barrel
this.physics.arcade.collide(barrel_red, barrel_red2)
this.physics.arcade.collide(barrel_red, barrel_red3)
this.physics.arcade.collide(barrel_red2, barrel_red3)


// PowerUp 1 Collision Detectors
 this.physics.arcade.collide(powerUp, groupPlatform)
 this.physics.arcade.overlap(powerUp, player)
 this.physics.arcade.overlap(powerUp, player2)
 this.game.physics.enable(powerUp)

 // Powerup 2 Collision Detectors
 this.physics.arcade.collide(powerUp2, groupPlatform)
 this.physics.arcade.overlap(powerUp2, player)
 this.physics.arcade.overlap(powerUp2, player2)
 this.game.physics.enable(powerUp2)

  this.physics.arcade.collide(guns, groupPlatform)
  this.physics.arcade.overlap(guns, player)
  this.physics.arcade.overlap(guns, player2)

  this.aliveTest();
  this.handleCollisions();
  this.handlePlatformCollisions()
  // this.handlePlatformCollisions2()
  // this.handlePowerUpCollisions()
  this.handlePowerUpCollisions2()
  this.handleGunsCollisions()
  this.physics.arcade.collide(powerUp, groupPlatform)
  this.physics.arcade.overlap(powerUp, player)
  this.physics.arcade.overlap(powerUp, player2)
  // this.handleCollisions()
  // this.game.physics.arcade.collide(player, groupPlatform);
  // groupPlatform.body.immovable = true
  // groupPlatform.body.allowGravity = false

  this.physics.arcade.overlap(player2, bullet.bullets, this.playerHit, null, this)
  this.physics.arcade.overlap(player, bullet2.bullets, this.playerHit2, null, this)

  // this.physics.arcade.overlap(player, player2, this.playerMelee, null, this)
  // this.physics.arcade.overlap(player, bullet2.bullets, this.playerHit2, null, this)

  this.physics.arcade.collide(player,layer)
  this.physics.arcade.collide(player2,layer)

  player.body.velocity.x = 0;
  // player.body.velocity.y = 0;

  player2.body.velocity.x = 0;
  // player2.body.velocity.y = 0;

  player.body.setSize(15,15,7, 7)
  player2.body.setSize(15,15,7, 7)


     // ---------------------------------------------------------------------



     if (action.hasOwnProperty(1)){
           console.log("x:  ", action[1].x)
     console.log("y:  ", action[1].y)
       if (action[1].x > 0){
          player.body.velocity.x = playerSpeed;
          player.scale.setTo(4, 4);
           player.play('walking')
           bullet.fireAngle = Phaser.ANGLE_RIGHT

       }

       if (action[1].x < 0){
          player.body.velocity.x = -playerSpeed;
          player.scale.setTo(-4, 4);
           player.play('walking')
           bullet.fireAngle = Phaser.ANGLE_LEFT
           // bullet.fireAngle = -90
           //bullet.fireAngle = Phaser.ANGLE_UP
           // bullet.fireAngle = 90
           // action = '';
       }

      if (action[1].y < -50){
       // player.body.velocity.y = -250;
       // player.play('walking')
       // bullet.fireAngle = Phaser.ANGLE_UP

         player.play('walking')
         let canJump1 = player.body.touching.down;
         const JUMP_SPEED = 1500;
         if (canJump1) {
            player.body.velocity.y = -JUMP_SPEED;
         }

         // return canJump1;
      }

      if (action[1].a == true){
          player.play('attack')
          this.playerMelee(player2)

       }

       if (action[1].b == true ){
          bullet.fire()
       }
     }


     //------------------------------------------
     //p2 movement test

     if (action.hasOwnProperty(2)){
      console.log("x2:  ", action[2].x)
     console.log("y2:  ", action[2].y)

     if (action[2].x > 0){
        player2.body.velocity.x = playerSpeed;
        player2.scale.setTo(4, 4);
         player2.play('walking2')
         bullet2.fireAngle = Phaser.ANGLE_RIGHT

     }

     if (action[2].x < 0){
        player2.body.velocity.x = -playerSpeed;
        player2.scale.setTo(-4, 4);
         player2.play('walking2')
         bullet2.fireAngle = Phaser.ANGLE_LEFT
         // bullet.fireAngle = -90
         //bullet.fireAngle = Phaser.ANGLE_UP
         // bullet.fireAngle = 90
         // action = '';
     }

    if (action[2].y < -50){
       // player2.body.velocity.y = -250;
       // player2.play('walking2')
       // bullet2.fireAngle = Phaser.ANGLE_UP
       // player2.play('walking2')
       let canJump2 = player2.body.touching.down;
       const JUMP_SPEED = 1500;
       if (canJump2) {
          player2.body.velocity.y = -JUMP_SPEED;
       }

    }


    if (action[2].a == true){
        player2.play('attack')
        this.playerMelee2(player)

     }

     if (action[2].b == true ){
        bullet2.fire()
     }
  }


    this.handleCollisions()
  },

// playerActions: function(playerAction){



// }


handleCollisions: function(){
  this.game.physics.arcade.overlap(player, player2);
},

handlePlatformCollisions: function(){
  this.game.physics.arcade.collide(player, groupPlatform)
  this.game.physics.arcade.collide(player2, groupPlatform)
},

// handlePlatformCollisions2: function(){
//   this.game.physics.arcade.collide(player2, groupPlatform)
// },

playerMelee: function(enemyPlayer){

  if (this.physics.arcade.collide(player, player2)){
    enemyPlayer.damage(5)
  // currentHealthStatus.scale.setTo(player2.health / player2.maxHealth, 1)
  this.player2AnimatedHealthBar()
  console.log(enemyPlayer.health)
  }
},

playerMelee2: function(enemyPlayer){

  if (this.physics.arcade.collide(player, player2)){
    enemyPlayer.damage(5)
  // currentHealthStatus.scale.setTo(player2.health / player2.maxHealth, 1)
  this.player1AnimatedHealthBar()
  console.log(enemyPlayer.health)
  }
},


//P1 attack -> P2 got hit
playerHit: function(enemyPlayer, bullet){
  bullet.kill()
  // enemyPlayer.kill()
  enemyPlayer.damage(doDamage1)
  this.player2AnimatedHealthBar()
  console.log(enemyPlayer.health)

  if (enemyPlayer.health < 90){
     player.animations.add('death', [15, 14, 16, 15],4,true)
  }

  // if (enemyPlayer.health === 0){
  //   enemyPlayer.kill()
  // }
  // else {
  //   return
  // }
},

//P2 attack -> P1 got hit
playerHit2: function(enemyPlayer2, bullet){
  bullet.kill()
  // enemyPlayer.kill()
  enemyPlayer2.damage(doDamage2)
  this.player1AnimatedHealthBar()
  console.log(enemyPlayer2.health)
},

player1AnimatedHealthBar: function(){
  currentHealthStatus1.scale.setTo(player.health / player.maxHealth, 1)
},

// player2AnimatedHealthBar: function(){
//   currentHealthStatus.scale.setTo(player2.health / player2.maxHealth, 1)
// },

// player2AnimatedHealthBar: function(){
//   currentHealthStatus.scale.setTo(player2.health / player2.maxHealth, 1)
// },

player2AnimatedHealthBar: function(){
  currentHealthStatus.scale.setTo(player2.health / player2.maxHealth, 1)
},




tick: function() {
        //subtract a second
        this.timeInSeconds--;
        //find how many complete minutes are left
        var minutes = Math.floor(this.timeInSeconds / 60);
        //find the number of seconds left
        //not counting the minutes
        var seconds = this.timeInSeconds - (minutes * 60);

        //make a string showing the time
        var timeString = this.addZeros(minutes) + ":" + this.addZeros(seconds);
        //display the string in the text field
        this.timeText.text = timeString;
        //check if the time is up
        if (this.timeInSeconds == 0) {
            //remove the timer from the game
            this.game.time.events.remove(this.timer);
            //call your game over or other code here!
            this.timeText.text="Game Over";
            restartButton.visible = true;
            restartButton.events.onInputDown.addOnce(restartGame, this);

            // music.destroy();
            // this.game.state.restart()
        }
    },
    /**
     * add leading zeros to any number less than 10
     * for example turn 1 to 01
     */
addZeros: function(num) {
        if (num < 10) {
            num = "0" + num;
        }
        return num;
    },

    aliveTest: function(){



       if (player.alive === true && player2.alive === false && winnerCheck){
        finalScore = player.health * 10
        this.printFinalScore(action[1].name.slice(0, 6))
         music.destroy()
         //get player score;

         socket.emit("winner", { player: 1, score: finalScore })
         this.game.time.events.add(Phaser.Timer.SECOND * 1, function(){this.restartTextClick()} ,this)
         winnerCheck = false;
         // this.restartTextClick()
         // console.log("The restart button", restartButton)
         // console.log("The restart button visibility --->", restartButton.visible)
         // this.game.state.restart()
       }
       else if (player.alive === false && player2.alive === true && winnerCheck){
                finalScore = player2.health * 10
        // console.log(finalScore)
          this.printFinalScore(action[2].name.slice(0, 6))
        music.destroy()
        socket.emit("winner",  { player: 2, score: finalScore })
        this.game.time.events.add(Phaser.Timer.SECOND * 1, function(){this.restartTextClick()} ,this)
        winnerCheck = false;
         // this.restartTextClick()
         // restartButton.events.onInputDown.add(theListener, this)
         // console.log("The restart button", restartButton)
         // console.log("The restart button visibility --->", restartButton.visible)
         // this.game.state.restart()
       }
    },

    // handlePowerUpCollisions: function(){
    //   if (this.physics.arcade.overlap(player, powerUp)){

    //       (player.health + 25) >100 ?  player.health=100: player.health += 25

    //      powerUp.destroy()


    //     this.player2AnimatedHealthBar()
    //     console.log(player.health)
    //   }
    //   if (this.physics.arcade.overlap(player2, powerUp)){
    //        (player2.health + 25) >100 ?  player2.health=100: player2.health += 25

    //      powerUp.destroy()

    //     // currentHealthStatus.scale.setTo(player2.health / player2.maxHealth, 1)
    //     this.player2AnimatedHealthBar()
    //     console.log(player2.health)
    //   }
    // },

    handlePowerUpCollisions: function(){
       if (this.physics.arcade.overlap(player, powerUp)){
         (player.health + 25) >100 ?  player.health=100: player.health += 25
         powerUp.destroy()
         this.printPowerUp()
      //
       this.player1AnimatedHealthBar()
      //
       console.log(player.health)
       }
       if (this.physics.arcade.overlap(player2, powerUp)){
          (player2.health + 25) >100 ?  player2.health=100: player2.health += 25
          powerUp.destroy()
          this.printPowerUp()
       // currentHealthStatus.scale.setTo(player2.health / player2.maxHealth, 1)
       //
       this.player2AnimatedHealthBar()
       //
       console.log(player2.health)
       }
      },

      handlePowerUpCollisions2: function(){
          if (this.physics.arcade.overlap(player, powerUp2)){
            (player.health + 25) >100 ?  player.health=100: player.health += 25
            powerUp2.destroy()
            this.printPowerUp()

            // Richmond modified line 658 to player1AnimatedHealthBar
            this.player1AnimatedHealthBar()
            console.log(player.health)
          }
          if (this.physics.arcade.overlap(player2, powerUp2)){
            (player2.health + 25) >100 ?  player2.health=100: player2.health += 25
            powerUp2.destroy()
            this.printPowerUp()

          // currentHealthStatus.scale.setTo(player2.health / player2.maxHealth, 1)
          this.player2AnimatedHealthBar()
          console.log(player2.health)
          }
      },

      powerUpDrop: function(){
         powerUp = this.game.add.sprite(this.game.rnd.integerInRange(800, 1230), 10, "powerUp")
          // powerUp = this.game.add.sprite(850, 810, "powerUp")
         powerUp.scale.setTo(0.17,0.17)

         this.physics.arcade.collide(powerUp, groupPlatform)
         this.physics.arcade.overlap(powerUp, player)
         this.physics.arcade.overlap(powerUp, player2)
         this.game.physics.enable(powerUp)
        },

      powerUpDrop2: function(){
         powerUp2 = this.game.add.sprite(this.game.rnd.integerInRange(50, 800), 10, "powerUp2")
          // powerUp = this.game.add.sprite(850, 810, "powerUp")
          powerUp2.scale.setTo(0.17,0.17)

         this.physics.arcade.collide(powerUp2, groupPlatform)
         this.physics.arcade.overlap(powerUp2, player)
         this.physics.arcade.overlap(powerUp2, player2)
         this.game.physics.enable(powerUp2)
        },

      handleGunsCollisions: function(){
          if (this.physics.arcade.overlap(player, guns)){
            doDamage1 = 10
            guns.destroy()
            this.printGun()
          }
          if (this.physics.arcade.overlap(player2, guns)){
           doDamage2 = 10
           guns.destroy()
           this.printGun()
          }
        },

      printGun: function(){
        explosion = this.game.add.text(275,260, "Double Damage!")
        explosion.font = 'Press Start 2P'
        explosion.fontSize = 50
        explosion.addColor("#ff0000", 0);
        this.game.time.events.add(Phaser.Timer.SECOND * 2, function(){explosion.kill()} ,this)
      },

      printPowerUp: function(){
        powerUpText = this.game.add.text(280,220, "Health Up!")
        powerUpText.font = 'Press Start 2P'
        powerUpText.fontSize = 50
        powerUpText.addColor("#0000FF", 0);
        this.game.time.events.add(Phaser.Timer.SECOND * 2, function(){powerUpText.kill()} ,this)
      },

      restartTextClick: function(){
       restartText = this.game.add.text(380, 330, 'Click Here to Restart')
       restartText.font = 'Press Start 2P'
       restartText.fontSize = 30
       restartText.addColor("#0000FF", 0);
       restartText.inputEnabled = true;
       restartText.events.onInputDown.add(this.theListener, this);
       newGameText = this.game.add.text(380, 400, 'New Game')
       newGameText.font = 'Press Start 2P'
       newGameText.fontSize = 30
       newGameText.inputEnabled = true;
       newGameText.addColor("#0000FF", 0);
       newGameText.events.onInputDown.add(function() { window.location.href = "http://localhost:8080/newgame";}, this);
      },

      printFinalScore: function(name){
        finalScoreText = this.game.add.text(130, 240, `Winner:  ${name}  - Your score is ${finalScore}`)
        finalScoreText.font = 'Press Start 2P'
        finalScoreText.fontSize = 30
        finalScoreText.addColor("#0000FF", 0);
      },


      theListener: function() {
        winnerCheck = true;
        this.game.state.restart();
      }
}




window.onload = function() {
    // let game = new Phaser.Game(1960, 800, Phaser.AUTO, 'game');
    let game = new Phaser.Game(1280, 960, Phaser.AUTO, 'game');
    // ppppp
    game.state.add('play', PlayState);
    // game.state.start('play', true, false, {level: 0});
    game.state.start('play');
};