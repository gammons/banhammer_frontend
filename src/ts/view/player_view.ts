/// <reference path="../defs/phaser.d"/>
/// <reference path="entity_view.ts"/>
/// <reference path="../framework/constants.ts"/>
module Crimbo {
  export class PlayerView extends EntityView {
    private _walking: boolean;
    private _walkDirection: string;

    preload = () => {
      console.log("player preload");
      this.game.load.spritesheet('player', 'assets/rpgsprites1/warrior_m.png',33,36);
    }

    create = () => {
      this.sprite =  this.game.add.sprite(this.entity.x * Crimbo.TileSize, this.entity.y * Crimbo.TileSize, 'player');
      this.game.camera.follow(this.sprite);
      this.sprite.animations.add('walk_n', [0,1]); // up
      this.sprite.animations.add('walk_ne', [0,1]); // up
      this.sprite.animations.add('walk_nw', [0,1]); // up
      this.sprite.animations.add('walk_e', [2,3]); // right
      this.sprite.animations.add('walk_s', [4,5]); //down
      this.sprite.animations.add('walk_se', [4,5]); //down
      this.sprite.animations.add('walk_sw', [4,5]); //down
      this.sprite.animations.add('walk_w', [6,7]); //left
      this._walking = false;
    }

    update() {
      super.update();
      this._walking = true;
    }

    movementStart() {
      console.log("start player movement");
      this._walking = true;
      this.sprite.animations.play("walk_"+this.entity.moveDirection,10,true);
    }

    turnComplete() {
      this.sprite.animations.stop("walk_"+this.entity.moveDirection);
      this._walking = false;
    }
  }
}
