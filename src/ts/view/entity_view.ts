/// <reference path="../defs/phaser.d.ts"/>
/// <reference path="../framework/player.ts"/>
/// <reference path="../framework/constants.ts"/>
module Crimbo {
  export class EntityView {
    static MoveSpeed = 4;

    game: Phaser.Game;
    entity: Crimbo.CrimboEntity;
    sprite: Phaser.Sprite;
    x: number
    y: number

    constructor(game: Phaser.Game, entity: Crimbo.CrimboEntity) {
      this.game = game;
      this.entity = entity;
    }

    preload = () => { }
    create = () => { }

    update = () => {
      if (!this.finishedMoving()) this.move();
    }

    move = () => {
      // move x
      if (this.x < this.entity.x) {
        this.sprite.x += EntityView.MoveSpeed;
      } else if (this.x > this.entity.x) {
        this.sprite.x -= EntityView.MoveSpeed;
      }
      if (this.sprite.x % Crimbo.TileSize === 0) this.x = this.entity.x;

      // move y
      if (this.y < this.entity.y) {
        this.sprite.y += EntityView.MoveSpeed;
      } else if (this.y > this.entity.y) {
        this.sprite.y -= EntityView.MoveSpeed;
      }
      if (this.sprite.y % Crimbo.TileSize === 0) this.y = this.entity.y;
    }

    render = () => { }

    finishedMoving = () => {
      return ((this.entity.x === this.x) && (this.entity.y == this.y));
    }
    
  }
}

