/// <reference path="phaser.d.ts"/>

class CrimboGame {

  constructor() {
    this.game = new Phaser.Game(800, 600, Phaser.AUTO, 'content', { preload: this.preload, create: this.create, update:
      this.update, render: this.render});
  }

  game: Phaser.Game;
  sprite: Phaser.Sprite;
  moving: String;



  preload() {
    this.game.load.image('mushroom', '/assets/mushroom32x32.png');
    this.game.load.tilemap('map', 'assets/tilemaps/maps/collision_test.json', null, Phaser.Tilemap.TILED_JSON);
    this.game.load.image('ground_1x1', 'assets/tilemaps/tiles/ground_1x1.png');
    this.game.load.image('phaser', 'assets/sprites/phaser-dude.png');
  }

  create() {
    // set up tilemap
    var map = this.game.add.tilemap('map');
    map.addTilesetImage('ground_1x1');
    var layer =  map.createLayer('Tile Layer 1');
    layer.resizeWorld();


    //set up sprite
    this.sprite =  this.game.add.sprite(32, 32, 'mushroom');
    window.sprite = this.sprite;
    this.game.camera.follow(this.sprite);

    // set up physics
    // this.game.physics.startSystem(Phaser.Physics.P2JS);
    // this.game.physics.p2.enable(this.sprite);
    // //this.sprite.body.setZeroDamping();
    // this.sprite.body.damping = 0.5;
    // this.sprite.body.fixedRotation = true;
  }

  update() {
    switch(this.moving) {
      case "right":
        this.sprite.x += 2;
        if (this.sprite.x % 32 === 0) this.moving = null;
        break;
    }

    // while (this.sprite.x % 32 !== 0)
    //   this.sprite.x += 2;
//     if ((this.sprite.body.velocity.x > 0) || (this.sprite.body.velocity.y > 0)) { return; }
//     //this.sprite.body.setZeroVelocity();
//     if (this.game.input.keyboard.isDown(Phaser.Keyboard.LEFT))
//     {
//       this.sprite.body.moveLeft(32);
//     }
    //if (this.moving == null) this.setMoving();
    if (this.game.input.keyboard.isDown(Phaser.Keyboard.RIGHT))
    {
      this.moving = "right";
      //this.sprite.body.moveRight(32);
    }
  }

  setMoving() {
    if (this.game.input.keyboard.isDown(Phaser.Keyboard.RIGHT))
    {
      this.moving = "right";
      //this.sprite.body.moveRight(32);
    }

//     if (this.game.input.keyboard.isDown(Phaser.Keyboard.UP))
//     {
//       this.sprite.body.moveUp(32);
//     }
//     else if (this.game.input.keyboard.isDown(Phaser.Keyboard.DOWN))
//     {
//       this.sprite.body.moveDown(32);
//     }
//     else if (this.game.input.keyboard.isDown(69))
//     {
//
//     }
  }
  render() {
    //this.game.debug.cameraInfo(this.game.camera, 32, 32);
    this.game.debug.spriteInfo(this.sprite, 20, 32);
  }
}

interface Window { 
  game: any; 
  sprite: any;
}
window.onload = () => {

  window.game = new CrimboGame();

};
