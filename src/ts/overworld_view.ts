/// <reference path="constants.ts"/>
/// <reference path="overworld.ts"/>
/// <reference path="player_view.ts"/>
/// <reference path="monster_view.ts"/>
/// <reference path="gameinterface.ts"/>
module Crimbo {

  export class OverworldView {


    game: Phaser.Game;
    map: Phaser.Tilemap;
    layer: Phaser.TilemapLayer;
    entityViews: Crimbo.EntityView[];
    overworld: Crimbo.Overworld;

    pressedKey: number;


    constructor(game: Phaser.Game, overworld: Crimbo.Overworld) {
      this.game = game;
      this.overworld = overworld;
      this.entityViews = [];
      this.entityViews.push(new Crimbo.PlayerView(this.game, this.overworld.player));
      this.createMonsterViews();
    }

    createMonsterViews = () => {
      _.each(this.overworld.monsters, (monster) => {
        this.entityViews.push(new Crimbo.MonsterView(this.game, monster));
      });
    }

    create = () => {
      this.map = this.game.add.tilemap('map');
      this.map.addTilesetImage('ground_1x1');
      this.layer =  this.map.createLayer('Tile Layer 1');
      this.layer.debug = true;
      this.layer.resizeWorld();
      this.overworld.setMap(this.map.layers[0]['data']);
      _.each(this.entityViews, (entityView) => { entityView.create(); });
    }

    update = (direction: string) => {
      if (this.animationsFinished())  {
        if (direction != null) {
          this.overworld.update(direction);
          _.each(this.entityViews, (entityView) => { entityView.update(); });
        }
      } else {
        _.each(this.entityViews, (entityView) => { entityView.update(); });
      }
    }
    animationsFinished = () => {
      return _.all(this.entityViews, (entityView) => { return (entityView.finishedMoving() === true) });
    }

    render = () => { }

  }
}
