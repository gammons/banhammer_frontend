/// <reference path="../framework/constants"/>
/// <reference path="../framework/overworld"/>
/// <reference path="player_view"/>
/// <reference path="monster_view"/>
module Crimbo {

  export class OverworldView {

    game: Phaser.Game;
    player: Crimbo.Player;
    map: Phaser.Tilemap;
    layer: Phaser.TilemapLayer;
    entityViews: Crimbo.EntityView[];

    pressedKey: number;


    constructor(game: Phaser.Game, player: Crimbo.Player) {
      this.game = game;
      this.entityViews = [];
      this.entityViews.push(new Crimbo.PlayerView(this.game, this.player));
      this.createMonsterViews();
    }

    preload = () => {
      this.game.load.tilemap('map', 'assets/tilemaps/maps/collision_test.json', null, Phaser.Tilemap.TILED_JSON);
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
      if (this.animationsFinished())
        this.overworld.update(direction);
      _.each(this.entityViews, (entityView) => { entityView.update(); });
    }
    animationsFinished = () => {
      return _.all(this.entityViews, (entityView) => { return (entityView.finishedMoving() === true) });
    }

    render = () => { }

  }
}

