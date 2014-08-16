/// <reference path="../defs/phaser.d"/>
/// <reference path="entity_view"/>
/// <reference path="../framework/constants.ts"/>
module Crimbo {
  export class ItemView extends EntityView {
    preload = () => {
      console.log("monster preload");
      this.game.load.image('purple_ball', '/assets/purple_ball.png');
    }
    create = () => {
      console.log("monster create");
      this.sprite =  this.game.add.sprite(this.entity.x * Crimbo.TileSize, this.entity.y * Crimbo.TileSize, 'purple_ball');
    }
  }
}


