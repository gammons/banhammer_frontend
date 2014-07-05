/// <reference path="phaser.d.ts"/>
/// <reference path="player.ts"/>
/// <reference path="constants.ts"/>
module Crimbo {
  export class EntityView {
    static MoveSpeed = 4;

    _moving: string;
    game: Phaser.Game;
    entity: Crimbo.CrimboEntity;
    sprite: Phaser.Sprite;

    constructor(game: Phaser.Game, entity: Crimbo.CrimboEntity) {
      this.game = game;
      this.entity = entity;
    }

    create = () => { }

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
          this.sprite.x += EntityView.MoveSpeed;
          if (this.sprite.x % Crimbo.TileSize === 0) this._moving = null;
          break;
        case "left":
          this.sprite.x -= EntityView.MoveSpeed;
          if (this.sprite.x % Crimbo.TileSize === 0) this._moving = null;
          break;
        case "up":
          this.sprite.y -= EntityView.MoveSpeed;
          if (this.sprite.y % Crimbo.TileSize === 0) this._moving = null;
          break;
        case "down":
          this.sprite.y += EntityView.MoveSpeed;
          if (this.sprite.y % Crimbo.TileSize === 0) this._moving = null;
      }
    }
    render = () => { }

    finishedMoving = () => {
      return (this._moving == null)
    }
    
  }
}
