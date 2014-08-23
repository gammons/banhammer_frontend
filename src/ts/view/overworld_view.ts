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
    fogTiles:  Phaser.BitmapData[][];

    pressedKey: number;


    constructor(game: Phaser.Game, gameModel: Crimbo.Game, player: Crimbo.Player) {
      this.game = game;
      this.gameModel = gameModel;
      this.entityViews = [];
      this.player = player;
      this.entityViews.push(new Crimbo.PlayerView(this.game, player));
      this.createMonsterViews();
      this.createItemViews();
      this.fogTiles = [];
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

      this.createFogTiles();
    }

    createFogTiles() {
      _.times(this.gameModel.getOverworld().mapLengthY(), (y) => {
        this.fogTiles[y] = [];
        _.times(this.gameModel.getOverworld().mapLengthX(), (x) => {
          var fogTile = this.game.make.bitmapData(Crimbo.TileSize, Crimbo.TileSize);
          fogTile.fill(0,0,0);
          this.fogTiles[y].push(fogTile);
          this.game.add.sprite(Crimbo.TileSize * x, Crimbo.TileSize * y, fogTile);
        });
      });
    }

    update() {
      _.each(this.entityViews, (entityView) => { entityView.update(); });
    }

    updateFogOfWar() {
      var lengthX = this.gameModel.getOverworld().mapLengthX();
      var lengthY = this.gameModel.getOverworld().mapLengthY();

      var lightPasses = (x: number, y: number)  => {
        if ((x >= 0) && (y >= 0) && (x < lengthX) && (y < lengthY)) {
          return !this.gameModel.getOverworld().hasSolidTile(x,y);
        } else {
          return false;
        }
      }


      var fov = new ROT.FOV.PreciseShadowcasting(lightPasses, {});
      var clearTiles = [];
      fov.compute(this.player.x, this.player.y, 5, (x, y, r, visibility) => {
        if ((x >= 0) && (y >= 0) && (x < lengthX) && (y < lengthY)) {
          //this.fogTiles[y][x].fill(10 * r, 10 * r, 10 * r, 0.2);
          this.fogTiles[y][x].clear();
          clearTiles.push(this.fogTiles[y][x]);
        }
          
      });

      // fill in all the other rectangles that should not be clear
      _.times(this.gameModel.getOverworld().mapLengthY(), (y) => {
        _.times(this.gameModel.getOverworld().mapLengthX(), (x) => {
          if (!_.contains(clearTiles, this.fogTiles[y][x])) {
            this.fogTiles[y][x].fill(0,100,0);
          }
        });
      });
    }

    turnComplete() {
      _.each(this.entityViews, (entityView) => { entityView.turnComplete(); });
      this.expireViews();
      this.updateFogOfWar();
    }

    expireViews = () => {
      _.each(this.entityViews, (entityView) => { entityView.expire(); });
      this.entityViews = _.reject(this.entityViews, (entityView) => { return entityView.isExpired() });
    }

    render = () => { }

  }
}

