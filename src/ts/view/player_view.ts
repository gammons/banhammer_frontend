/// <reference path="../defs/phaser.d"/>
/// <reference path="entity_view.ts"/>
/// <reference path="../framework/constants.ts"/>
module Crimbo {
  export class PlayerView extends EntityView {

    preload = () => {
      console.log("player preload");
      this.game.load.image('player', 'assets/mushroom32x32.png');
    }

    create = () => {
      this.sprite =  this.game.add.sprite(this.entity.x * Crimbo.TileSize, this.entity.y * Crimbo.TileSize, 'player');
      this.game.camera.follow(this.sprite);
    }
  }
}
