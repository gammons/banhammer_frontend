/// <reference path="phaser.d.ts"/>
/// <reference path="player.ts"/>
/// <reference path="constants.ts"/>
module Crimbo {
  export class PlayerView {
    static MoveSpeed = 4;

    _moving: string;
    game: Phaser.Game;
    player: Crimbo.Player;
    playerSprite: Phaser.Sprite;

    constructor(game: Phaser.Game, player: Crimbo.Player) {
      this.game = game;
      this.player = player;
    }

    create = () => {
      this.playerSprite =  this.game.add.sprite(this.player.x * Crimbo.TileSize, this.player.y * Crimbo.TileSize, 'mushroom');
      this.game.camera.follow(this.playerSprite);
    }

    update = () => {
      if (this._moving) {
        this.move();
      }
    }

    setDirection = (inputPressed: string) => {
      this._moving = inputPressed;
    }

    move = () => {
      switch(this._moving) {
        case "right":
          this.playerSprite.x += PlayerView.MoveSpeed;
          if (this.playerSprite.x % Crimbo.TileSize === 0) this._moving = null;
          break;
        case "left":
          this.playerSprite.x -= PlayerView.MoveSpeed;
          if (this.playerSprite.x % Crimbo.TileSize === 0) this._moving = null;
          break;
        case "up":
          this.playerSprite.y -= PlayerView.MoveSpeed;
          if (this.playerSprite.y % Crimbo.TileSize === 0) this._moving = null;
          break;
        case "down":
          this.playerSprite.y += PlayerView.MoveSpeed;
          if (this.playerSprite.y % Crimbo.TileSize === 0) this._moving = null;
      }
    }
    render = () => {
      this.game.debug.spriteInfo(this.playerSprite, 20, 32);
    }

    finishedMoving = () => {
      return (this._moving == null)
    }
    
  }
}
