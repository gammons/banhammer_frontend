/// <reference path="phaser.d.ts"/>
/// <reference path="entity_view.ts"/>
/// <reference path="constants.ts"/>
module Crimbo {
  export class MonsterView extends EntityView {
    create = () => {
      this.sprite =  this.game.add.sprite(this.entity.x * Crimbo.TileSize, this.entity.y * Crimbo.TileSize, 'purple_ball');
    }
  }
}

