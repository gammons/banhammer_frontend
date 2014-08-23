/// <reference path="../defs/phaser.d.ts"/>
/// <reference path="../framework/player.ts"/>
/// <reference path="../framework/constants.ts"/>
module Crimbo {
  export class EntityView {
    static MoveSpeed = 4;

    game: Phaser.Game;
    entity: Crimbo.CrimboEntity;
    sprite: Phaser.Sprite;
    _expired: boolean;
    x: number
    y: number

    constructor(game: Phaser.Game, entity: Crimbo.CrimboEntity) {
      this.game = game;
      this.entity = entity;
      this._expired = false;
    }

    preload = () => { }
    create = () => { }

    update() {
      this.move();
    }

    turnComplete() { }

    move = () => {
      // move x
      if ((this.x != this.entity.x) || (this.y != this.entity.y)) {
        this.movementStart();
        this.game.add.tween(this.sprite).to(
            {x: this.entity.x * Crimbo.TileSize, y: this.entity.y * Crimbo.TileSize},
            200,
            Phaser.Easing.Quadratic.Out,
            true);
        this.x = this.entity.x;
        this.y = this.entity.y;
      }
    }

    movementStart() { }

    render = () => { }

    expire = () => {
      if (!this.entity.isExpired())
        return ;
      this._expired = true;
      this.sprite.destroy();
    }

    isExpired = () => {
      return this._expired == true;
    }
    
  }
}

