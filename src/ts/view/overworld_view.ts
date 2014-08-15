/// <reference path="../framework/constants"/>
/// <reference path="../framework/overworld"/>
/// <reference path="../framework/game"/>
/// <reference path="player_view"/>
/// <reference path="monster_view"/>
module Crimbo {

  export class OverworldView {

    gameModel: Crimbo.Game;
    game: Phaser.Game;
    player: Crimbo.Player;
    map: Phaser.Tilemap;
    layer: Phaser.TilemapLayer;
    entityViews: Crimbo.EntityView[];

    pressedKey: number;


    constructor(game: Phaser.Game, gameModel: Crimbo.Game, player: Crimbo.Player) {
      this.game = game;
      this.gameModel = gameModel;
      this.entityViews = [];
      this.player = player;
      this.entityViews.push(new Crimbo.PlayerView(this.game, this.player));
    }

    preload = () => {
      this.game.load.tilemap('map', this.gameModel.getGameData()['map'], null, Phaser.Tilemap.TILED_JSON);
    }

    createMonsterViews = () => {
      _.each(this.gameModel.getOverworld().getMonsters(), (monster) => {
        console.log("adding monster",monster);
        this.entityViews.push(new Crimbo.MonsterView(this.game, monster));
      });
    }


    create = () => {
      this.map = this.game.add.tilemap('map');
      this.map.addTilesetImage('ground_1x1');
      this.layer =  this.map.createLayer('Tile Layer 1');
      this.layer.debug = true;
      this.layer.resizeWorld();
      this.createMonsterViews();
      _.each(this.entityViews, (entityView) => { entityView.create(); });
    }

    update = (direction: string) => {
      if (this.animationsFinished())
        this.gameModel.getOverworld().update(direction);
      _.each(this.entityViews, (entityView) => { entityView.update(); });
    }
    animationsFinished = () => {
      return _.all(this.entityViews, (entityView) => { return (entityView.finishedMoving() === true) });
    }

    render = () => { }

  }
}

