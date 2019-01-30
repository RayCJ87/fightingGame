//global variables
var map;
var layer;
var player;
var player2;
var cursors;
var currentHealthStatus;
var socket = io();
var action = '';


socket.on('fromUser', function(data){
  console.log("Game received action: ", data)
  action = data.input;
})



//all the functions are in the PlayState
var PlayState = {

  init: function(){
    this.input.maxPointers =1;
    this.stage.disableVisibilityChange = true;
  },


//debug.body is the green square show the attact range,need to be removed later
//this function can be deleted
  // render: function(){
  //   this.game.debug.body(player)
  //   this.game.debug.body(player2)
  // },


//all the assets will be loaded eg:audio,map,player figures
  preload: function(){
      this.game.load.image('background','assets/BG.png');
      this.game.load.json('level:1', 'assets/level01.json');
      this.game.load.image('ground', 'assets/ground.png');
      this.game.load.image('grass:8x1', 'assets/grass_8x1.png');
      this.game.load.image('grass:6x1', 'assets/grass_6x1.png');
      this.game.load.image('grass:4x1', 'assets/grass_4x1.png');
      this.game.load.image('grass:2x1', 'assets/grass_2x1.png');
      this.game.load.image('grass:1x1', 'assets/grass_1x1.png');


    //  this.game.load.json('level:1', 'assets/test1210pm.json');
    // this.game.load.image('one', 'assets/1.png');
    //   this.game.load.image('two', 'assets/2.png');
    //   this.game.load.image('three', 'assets/3.png');
    //   this.game.load.image('four', 'assets/4.png');
    //   this.game.load.image('five', 'assets/5.png');
    //   this.game.load.image('six', 'assets/6.png');
    //   this.game.load.image('seven', 'assets/7.png');
    //   this.game.load.image('eight', 'assets/8.png');
    //   this.game.load.image('nine', 'assets/9.png');
    //   this.game.load.image('ten', 'assets/10.png');
    //   this.game.load.image('eleven', 'assets/11.png');
    //   this.game.load.image('twelve', 'assets/12.png');
    //   this.game.load.image('thirteen', 'assets/13.png');
    //   this.game.load.image('fourteen', 'assets/14.png');
    //   this.game.load.image('fifteen', 'assets/15.png');
    //   this.game.load.image('sixteen', 'assets/16.png');



    // this.load.tilemap('map','assets/level1.csv');
    // this.load.image('tileset','assets/tileset.png');

    this.game.load.image('bullet', 'assets/bullet.png')
    this.game.load.image('bullet2', 'assets/bullet.png')
    // this.load.spritesheet('player','assets/player.png',24,26)
    this.load.spritesheet('player','assets/dino_red.png',24,24)
    this.load.spritesheet('test','assets/dino_green.png', 24, 24)
    this.game.load.image('health_green', 'assets/health_green.png')
    this.game.load.image('health_red', 'assets/health_red.png')
  },



//
  create: function(){

    this.game.add.image(0,0, 'background');//load the image for background


    // it doesn't have  other level yet, but this one shows all the wall and bricks
    this.loadLevel(this.game.cache.getJSON('level:1'));

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

//load the player's info
    player = this.add.sprite(0,0,'player', 9);//position of the player
    player.anchor.setTo(0.5,0.5);//設定player錨點為中心點
    player.scale.setTo(4,4)//縮放符合視窗的寬度：原影像 400x32，放大 2 倍為 800x64
                                    //all the index needed for this moement//frame per second
    player.animations.add('walking', [0, 1, 2, 3, 4, 5, 6, 7, 8, 9], 9, true);
    player.animations.add('attack', [17,18,19,20,21,22,23, 0],7,true)
    player.animations.add('attack', [17, 0],7,false)
    player.health = 100
    player.maxhealth = 100

    player2 = this.add.sprite(1280,960,'test', 3);//position of the player
    player2.anchor.setTo(0.5,0.5);
    player2.scale.setTo(4,4)
    player2.animations.add('walking2', [0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10], 24, false);
    player2.animations.add('attack2', [17,18,19,20,21,22,23, 0],7,false)
    player2.health = 100
    player2.maxhealth = 100


    this.physics.enable(player, Phaser.Physics.ARCADE)// 启动phaser设定好的物理特性
    this.physics.arcade.enable(player);// 启动phaser设定好的物理特性 on player
    this.camera.follow(player);        //无论地图多大，镜头是跟随player
    player.body.collideWorldBounds = true; //body不能超出边界

    this.physics.enable(player2, Phaser.Physics.ARCADE)// 启动phaser设定好的物理特性 on player2
    this.physics.arcade.enable(player2);
    this.camera.follow(player2);
    player2.body.collideWorldBounds = true;

    bullet.trackSprite(player);
    bullet.bulletSpeed = 500
    // bullet.fireLimit = 10
    bullet2.trackSprite(player2);
    bullet2.bulletSpeed = 500

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
    if (cursors.up.isDown){
       player.body.velocity.y = -250;
       player.play('walking')
       // bullet.fireAngle = -90
       bullet.fireAngle = Phaser.ANGLE_UP
       // bullet.fireAngle = 90
     }
     if (cursors.down.isDown){
       player.body.velocity.y = 250;
       player.play('walking')
       // bullet.fireAngle = 90
       bullet.fireAngle = Phaser.ANGLE_DOWN
       // bullet.fireAngle = -90
     }
     if (fireButton.isDown){
      bullet.fire()
     }
     if (meleeButton.isDown){
      player.play('attack')
      this.playerMelee(player2)
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
  },

  loadLevel: function(data) {
    data.platforms.forEach(this.spawnPlatform, this);
  },

  spawnPlatform: function(platform) {
      this.game.add.sprite(platform.x, platform.y, platform.image);
  }



}




window.onload = function() {
    // let game = new Phaser.Game(1960, 800, Phaser.AUTO, 'game');
    let game = new Phaser.Game(1280, 700, Phaser.AUTO, 'game');
    // ppppp
    game.state.add('play', PlayState);
    // game.state.start('play', true, false, {level: 0});
    game.state.start('play');
};