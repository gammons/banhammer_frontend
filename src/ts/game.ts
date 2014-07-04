/// <reference path="phaser.d.ts"/>

module Phaser {
  class Game {
    crimbo: CrimboGame;
  }
}

class CrimboGame {
  static MoveSpeed = 4;

  game: Phaser.Game;
  sprite: Phaser.Sprite;
  moving: String;

  constructor() {
    this.game = new Phaser.Game(800, 600, Phaser.AUTO, 'content', { preload: this.preload, create: this.create, update:
      this.update, render: this.render});
    this.moving = null;
  }

  preload = () => {
    this.game.load.image('mushroom', '/assets/mushroom32x32.png');
    this.game.load.tilemap('map', 'assets/tilemaps/maps/collision_test.json', null, Phaser.Tilemap.TILED_JSON);
    this.game.load.image('ground_1x1', 'assets/tilemaps/tiles/ground_1x1.png');
    this.game.load.image('phaser', 'assets/sprites/phaser-dude.png');
  }

  create = () => {
    // set up tilemap
    var map = this.game.add.tilemap('map');
    map.addTilesetImage('ground_1x1');
    var layer =  map.createLayer('Tile Layer 1');
    layer.resizeWorld();

    //set up sprite
    this.sprite =  this.game.add.sprite(32, 32, 'mushroom');
    window.sprite = this.sprite;
    this.game.camera.follow(this.sprite);
  }

  setMoving = () => {
    if (this.game.input.keyboard.isDown(Phaser.Keyboard.RIGHT)) { this.moving = "right"; }
    if (this.game.input.keyboard.isDown(Phaser.Keyboard.LEFT)) { this.moving = "left"; }
    if (this.game.input.keyboard.isDown(Phaser.Keyboard.UP)) { this.moving = "up"; }
    if (this.game.input.keyboard.isDown(Phaser.Keyboard.DOWN)) { this.moving = "down"; }
  }

  update = () => {
    if (this.moving === null) { 
      this.setMoving(); 
    } else {
      this.move();
    }
  }

  move = () => {
    switch(this.moving) {
      case "right":
        this.sprite.x += CrimboGame.MoveSpeed;
        if (this.sprite.x % 32 === 0) this.moving = null;
        break;
      case "left":
        this.sprite.x -= CrimboGame.MoveSpeed;
        if (this.sprite.x % 32 === 0) this.moving = null;
        break;
      case "up":
        this.sprite.y -= CrimboGame.MoveSpeed;
        if (this.sprite.y % 32 === 0) this.moving = null;
        break;
      case "down":
        this.sprite.y += CrimboGame.MoveSpeed;
        if (this.sprite.y % 32 === 0) this.moving = null;
    }
  }

  render = () => {
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
