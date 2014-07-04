/// <reference path="phaser.d.ts"/>
/// <reference path="constants.ts"/>
/// <reference path="overworld.ts"/>
/// <reference path="gameinterface.ts"/>
module Crimbo {
  export class Player implements Crimbo.GameInterface {
    static MoveSpeed = 4;

    game: Phaser.Game;
    player: Phaser.Sprite;
    overworld: Crimbo.Overworld;
    moving: String;

    constructor(game: Phaser.Game, overworld: Crimbo.Overworld) {
      this.game = game;
      this.overworld = overworld;
      this.moving = null;
    }

    create = () => {
      this.player =  this.game.add.sprite(32, 32, 'mushroom');
      this.game.camera.follow(this.player);
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
          this.player.x += Player.MoveSpeed;
          if (this.player.x % Crimbo.SpriteSize === 0) this.moving = null;
          break;
        case "left":
          this.player.x -= Player.MoveSpeed;
          if (this.player.x % Crimbo.SpriteSize === 0) this.moving = null;
          break;
        case "up":
          this.player.y -= Player.MoveSpeed;
          if (this.player.y % Crimbo.SpriteSize === 0) this.moving = null;
          break;
        case "down":
          this.player.y += Player.MoveSpeed;
          if (this.player.y % Crimbo.SpriteSize === 0) this.moving = null;
      }
    }

    render = () => {
      this.game.debug.spriteInfo(this.player, 20, 32);
    }

    setMoving = () => {
      if ((this.game.input.keyboard.isDown(Phaser.Keyboard.RIGHT)) &&
        (!this.overworld.hasSolidTile(this.player.x + Crimbo.SpriteSize, this.player.y)))
          this.moving = "right"; 

      if ((this.game.input.keyboard.isDown(Phaser.Keyboard.LEFT)) &&
        (!this.overworld.hasSolidTile(this.player.x - Crimbo.SpriteSize, this.player.y)))
          this.moving = "left";

      if ((this.game.input.keyboard.isDown(Phaser.Keyboard.UP)) &&
        (!this.overworld.hasSolidTile(this.player.x, this.player.y - Crimbo.SpriteSize)))
          this.moving = "up";

      if ((this.game.input.keyboard.isDown(Phaser.Keyboard.DOWN)) &&
        (!this.overworld.hasSolidTile(this.player.x, this.player.y + Crimbo.SpriteSize)))
          this.moving = "down";
    }
  }
}

