/// <reference path="phaser.d.ts"/>
/// <reference path="constants.ts"/>
/// <reference path="gameinterface.ts"/>
module Crimbo {
  export class Overworld implements Crimbo.GameInterface{

    game: Phaser.Game;
    map: Phaser.Tilemap;
    layer: Phaser.TilemapLayer;

    constructor(game: Phaser.Game) {
      this.game = game;
    }

    create = () => {
      this.map = this.game.add.tilemap('map');
      this.map.addTilesetImage('ground_1x1');
      this.layer =  this.map.createLayer('Tile Layer 1');
      this.layer.debug = true;
      this.layer.resizeWorld();

    }
    update = () => { }
    render = () => { }

    hasSolidTile = (x: number, y: number) => {
      return (this.layer.getTiles(x,y,0,0)[0].index > 0);
    }
  }
}

