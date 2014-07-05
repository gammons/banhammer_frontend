/// <reference path="phaser.d.ts"/>
/// <reference path="entity_view.ts"/>
/// <reference path="constants.ts"/>
module Crimbo {
  export class PlayerView extends EntityView {
    static MoveSpeed = 4;

    _moving: string;
    game: Phaser.Game;
    player: Crimbo.Player;
    sprite: Phaser.Sprite;

    create = () => {
      this.sprite =  this.game.add.sprite(this.entity.x * Crimbo.TileSize, this.entity.y * Crimbo.TileSize, 'mushroom');
      this.game.camera.follow(this.sprite);
    }
  }
}
