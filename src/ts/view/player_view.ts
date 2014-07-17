/// <reference path="phaser.d.ts"/>
/// <reference path="entity_view.ts"/>
/// <reference path="constants.ts"/>
module Crimbo {
  export class PlayerView extends EntityView {

    preload = () => {
      this.game.load.image('player', '/assets/mushroom32x32.png');
      this.game.load.tilemap('map', 'assets/tilemaps/maps/collision_test.json', null, Phaser.Tilemap.TILED_JSON);
    }

    create = () => {
      this.sprite =  this.game.add.sprite(this.entity.x * Crimbo.TileSize, this.entity.y * Crimbo.TileSize, 'mushroom');
      this.game.camera.follow(this.sprite);
    }
  }
}
