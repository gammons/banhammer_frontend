/// <reference path="../defs/phaser.d"/>
/// <reference path="entity_view"/>
/// <reference path="../framework/constants.ts"/>
module Crimbo {
  export class MonsterView extends EntityView {
    preload = () => {
      this.game.load.image('purple_ball', '/assets/mushroom32x32.png');
    }
    create = () => {
      this.sprite =  this.game.add.sprite(this.entity.x * Crimbo.TileSize, this.entity.y * Crimbo.TileSize, 'purple_ball');
    }
  }
}

