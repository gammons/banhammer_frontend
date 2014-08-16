/// <reference path="../framework/constants"/>
/// <reference path="../framework/overworld"/>
/// <reference path="../framework/game"/>
/// <reference path="player_view"/>
/// <reference path="monster_view"/>
/// <reference path="item_view"/>
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
      this.entityViews.push(new Crimbo.PlayerView(this.game, player));
      this.createMonsterViews();
      this.createItemViews();
    }

    preload = () => {
      this.game.load.tilemap('map', this.gameModel.getGameData()['map'], null, Phaser.Tilemap.TILED_JSON);
      this.game.load.image('ground_1x1', 'assets/tilemaps/tiles/ground_1x1.png');
      _.each(this.entityViews, (entityView) => { entityView.preload(); });
    }

    createMonsterViews = () => {
      _.each(this.gameModel.getOverworld().getMonsters(), (monster) => {
        console.log("adding monster",monster);
        this.entityViews.push(new Crimbo.MonsterView(this.game, monster));
      });
    }

    createItemViews = () => {
      _.each(this.gameModel.getOverworld().getItems(), (i) => {
        console.log("adding item",i);
        this.entityViews.push(new Crimbo.ItemView(this.game, i));
      });
    }


    create = () => {
      this.map = this.game.add.tilemap('map');
      this.map.addTilesetImage('ground_1x1');
      this.layer =  this.map.createLayer('Tile Layer 1');
      this.layer.debug = true;
      this.layer.resizeWorld();
      _.each(this.entityViews, (entityView) => { entityView.create(); });
    }

    update = (direction: string) => {
      if (this.animationsFinished()) {
        this.gameModel.getOverworld().update(direction);
        this.expireViews();
      } else {
        _.each(this.entityViews, (entityView) => { entityView.update(); });
      }
    }

    animationsFinished = () => {
      return _.all(this.entityViews, (entityView) => { return (entityView.finishedMoving() === true) });
    }

    expireViews = () => {
      _.each(this.entityViews, (entityView) => { entityView.expire(); });
      this.entityViews = _.reject(this.entityViews, (entityView) => { return entityView.isExpired() });
    }

    render = () => { }

  }
}

