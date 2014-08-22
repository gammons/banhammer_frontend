/// <reference path="../defs/phaser.d"/>
/// <reference path="entity_view"/>
/// <reference path="../framework/constants.ts"/>
module Crimbo {
  export class MonsterView extends EntityView {
    preload = () => {
      this.game.load.image('mushroom', '/assets/mushroom32x32.png');
      this.game.load.image('leaf', '/assets/particles/leaf1.png');
      this.game
    }
    create = () => {
      this.sprite =  this.game.add.sprite(this.entity.x * Crimbo.TileSize, this.entity.y * Crimbo.TileSize, 'mushroom');
    }

    update()  {
      super.update();
      if ((this.entity.astarMoves) && (this.entity.astarMoves.length > 0)) {

        _.each(this.entity.astarMoves, (m) => {

          var circle = new Phaser.Circle( m[0] * Crimbo.TileSize + (Crimbo.TileSize / 2), m[1] * Crimbo.TileSize +
            (Crimbo.TileSize / 2), Crimbo.TileSize ) ;
          this.game.debug.geom(circle);
        });
      }
    }
  }
}

