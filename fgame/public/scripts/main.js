//global variables

var map;
var layer;
var player;
var player2;
var cursors;
var currentHealthStatus;
var platforms;

var socket = io();
var action = '';


socket.on('fromUser', function(data){
  console.log("Game received action: ", data)
  action = data.input;
})

var PlayState = {

init: function(){
  this.input.maxPointers =1;
  this.stage.disableVisibilityChange = true;

  const enable_gravity = 1200;
  this.game.physics.arcade.gravity.y = enable_gravity;
},

render: function(){

  this.game.debug.body(player)
  this.game.debug.body(player2)
},

preload: function(){

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

 // this.load.tilemap('level:1', 'assets/first_test_340pm.json');
  // this.load.tilemap('map','assets/level1.csv');
  // this.load.image('tileset','assets/tileset.png');

  this.game.load.image('bullet', 'assets/bullet.png')
  this.game.load.image('bullet2', 'assets/bullet.png')
  // this.load.spritesheet('player','assets/player.png',24,26)
  this.load.spritesheet('player','assets/dino_red.png',24,24)
  this.load.spritesheet('test','assets/dino_green.png', 24, 24)
  this.game.load.image('health_green', 'assets/health_green.png')
  this.game.load.image('health_red', 'assets/health_red.png')

  this.game.load.image('background','assets/BG.png');

},

create: function(){

  groupPlatform = this.game.add.group()

   var backgroundImage = this.game.add.image(0,0, 'background');
   this.game.world.sendToBack(backgroundImage)


  // this.game.add.sprite(1152,867, 'fifteen');
  // this.game.add.sprite(1024,867, 'fifteen');
  // this.game.add.sprite(896,867, 'fifteen');
  // this.game.add.sprite(768,867, 'fifteen');
  // this.game.add.sprite(640,867, 'fifteen');
  // this.game.add.sprite(512,867, 'fifteen');
  // this.game.add.sprite(384,867, 'fifteen');
  // this.game.add.sprite(256,867, 'fifteen');
  // this.game.add.sprite(128,867, 'fifteen');
  // this.game.add.sprite(0,867, 'fifteen');


  // this.game.add.sprite(1152,650, 'fifteen');
  // this.game.add.sprite(1024,650, 'fifteen');
  // this.game.add.sprite(896,650, 'fourteen');

  // this.game.add.sprite(628,450, 'sixteen');
  // this.game.add.sprite(500,450, 'fifteen');
  // this.game.add.sprite(372,450, 'fourteen');

  // this.game.add.sprite(900, 390, "tree")
  // this.game.add.sprite(500, 900, "skeleton")
  // this.game.add.sprite(100, 755, "cactus_one")



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

  var platform11 = this.game.add.sprite(1152,650, 'fifteen');
  var platform12 = this.game.add.sprite(1024,650, 'fifteen');
  var platform13 = this.game.add.sprite(896,650, 'fourteen');

  var platform14 = this.game.add.sprite(628,450, 'sixteen');
  var platform15 = this.game.add.sprite(500,450, 'fifteen');
  var platform16 = this.game.add.sprite(372,450, 'fourteen');

  this.game.add.sprite(900, 390, "tree")
  this.game.add.sprite(500, 900, "skeleton")
  this.game.add.sprite(100, 755, "cactus_one")

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
  groupPlatform.add(platform11)
  groupPlatform.add(platform12)
  groupPlatform.add(platform13)
  groupPlatform.add(platform14)
  groupPlatform.add(platform15)
  groupPlatform.add(platform16)

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



  player = this.add.sprite(550,830,'player', 9);//position of the player
  player.anchor.setTo(0.5,0.5);
  player.scale.setTo(4,4)
  player.animations.add('walking', [0, 1, 2, 3, 4, 5, 6, 7, 8, 9], 9, true);
  player.animations.add('attack', [17,18,19,20,21,22,23, 0],7,true)
  player.animations.add('attack', [17, 0],7,false)
  player.health = 100
  player.maxhealth = 100

  player2 = this.add.sprite(300,830,'test', 3);//position of the player
  player2.anchor.setTo(0.5,0.5);
  player2.scale.setTo(4,4)
  player2.animations.add('walking2', [0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10], 24, false);
  player2.animations.add('attack2', [17,18,19,20,21,22,23, 0],7,false)
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
  bullet.bulletSpeed = 1000
  // bullet.fireLimit = 10
  bullet2.trackSprite(player2);
  bullet2.bulletSpeed = 1000

  var totalHealthBar = this.game.add.image(300, 20, 'health_red')
  totalHealthBar.fixedToCamera = true
  currentHealthStatus = this.game.add.image(300, 20, 'health_green')
  currentHealthStatus.fixedToCamera = true
  var healthText = this.game.add.text(210, 20, 'P2 Health', {fontSize: '20px', fill: '#ffffff'})
  healthText.fixedToCamera = true




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

  this.handlePlatformCollisions()
  this.handlePlatformCollisions2()
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
  player.body.velocity.y = 0;

  player2.body.velocity.x = 0;
  player2.body.velocity.y = 0;

  player.body.setSize(15,15,7, 7)
  player2.body.setSize(15,15,7, 7)

    if (action == 'left'){
       player.body.velocity.x = -250;
       player.play('walking')
       // bullet.fireAngle = 180
       bullet.fireAngle = Phaser.ANGLE_LEFT
       // bullet.fireAngle = 0
       action = '';
     }
    if (action == 'right'){
       player.body.velocity.x = 250
       player.play('walking')
       // bullet.fireAngle = 0
       bullet.fireAngle = Phaser.ANGLE_RIGHT
       // bullet.fireAngle = 180
       action = '';
     }
    if (action == 'jump'){
       player.body.velocity.y = -250;
       player.play('walking')
       // bullet.fireAngle = -90
       bullet.fireAngle = Phaser.ANGLE_UP
       // bullet.fireAngle = 90
       action = '';
     }
     if (action == 'duck'){
       player.body.velocity.y = 250;
       player.play('walking')
       // bullet.fireAngle = 90
       bullet.fireAngle = Phaser.ANGLE_DOWN
       // bullet.fireAngle = -90
       action = '';
     }
     if (action == 'fire'){
      bullet.fire()
      action = '';
     }
     if (action == 'punch'){
      player.play('attack')
      this.playerMelee(player2)
      action = '';
     }



    if (aKey.isDown){
       player2.body.velocity.x = -250;
       player2.play('walking2')
       bullet2.fireAngle = Phaser.ANGLE_LEFT
     }
    if (dKey.isDown){
       player2.body.velocity.x = 250
       player2.play('walking2')
       bullet2.fireAngle = Phaser.ANGLE_RIGHT
     }
    if (wKey.isDown){
       player2.body.velocity.y = -250;
       player2.play('walking2')
       bullet2.fireAngle = Phaser.ANGLE_UP
     }
     if (sKey.isDown){
       player2.body.velocity.y = 250;
       player2.play('walking2')
       bullet2.fireAngle = Phaser.ANGLE_DOWN
     }
     if (fireButton2.isDown){
      bullet2.fire()
     }

    this.handleCollisions()
  },

  handleCollisions: function(){
  this.game.physics.arcade.collide(player, player2)

},

handlePlatformCollisions: function(){
  this.game.physics.arcade.collide(player, groupPlatform)
  this.game.physics.arcade.collide(player2, groupPlatform)
},

handlePlatformCollisions2: function(){
  this.game.physics.arcade.collide(player2, groupPlatform)
},

playerMelee: function(enemyPlayer){

  if (this.physics.arcade.collide(player, player2)){
    enemyPlayer.damage(1)
  // currentHealthStatus.scale.setTo(player2.health / player2.maxHealth, 1)
  this.player2AnimatedHealthBar()
  console.log(enemyPlayer.health)
  }
},

playerHit: function(enemyPlayer, bullet){
  bullet.kill()
  // enemyPlayer.kill()
  enemyPlayer.damage(5)
  this.player2AnimatedHealthBar()
  console.log(enemyPlayer.health)

  // if (enemyPlayer.health === 0){
  //   enemyPlayer.kill()
  // }
  // else {
  //   return
  // }
},

playerHit2: function(enemyPlayer2, bullet){
  bullet.kill()
  // enemyPlayer.kill()
  enemyPlayer2.damage(5)
  console.log(enemyPlayer2.health)
},

player2AnimatedHealthBar: function(){
  currentHealthStatus.scale.setTo(player2.health / player2.maxHealth, 1)
}

// loadLevel: function(data) {
//   data.platforms.forEach(this.spawnPlatform, this);
// },

// spawnPlatform: function(platform) {
//     this.game.add.sprite(platform.x, platform.y, platform.image);
// }



}




window.onload = function() {
    // let game = new Phaser.Game(1960, 800, Phaser.AUTO, 'game');
    let game = new Phaser.Game(1280, 960, Phaser.AUTO, 'game');
    // ppppp
    game.state.add('play', PlayState);
    // game.state.start('play', true, false, {level: 0});
    game.state.start('play');
};