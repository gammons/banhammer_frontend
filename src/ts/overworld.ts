/// <reference path="phaser.d.ts"/>
/// <reference path="constants.ts"/>
/// <reference path="player.ts"/>
/// <reference path="player_view.ts"/>
/// <reference path="gameinterface.ts"/>
module Crimbo {
  export enum OverworldState { Waiting, PlayerMove, MonsterMove};

  export class Overworld {

    game: Phaser.Game;
    map: Phaser.Tilemap;
    layer: Phaser.TilemapLayer;
    player:  Crimbo.Player;
    playerView:  Crimbo.PlayerView;

    state: Crimbo.OverworldState;
    pressedKey: number;


    constructor(game: Phaser.Game) {
      this.game = game;
      this.player = new Crimbo.Player();
      this.playerView = new Crimbo.PlayerView(this.game, this.player);
      this.state = Crimbo.OverworldState.Waiting;
    }

    create = () => {
      this.map = this.game.add.tilemap('map');
      this.map.addTilesetImage('ground_1x1');
      this.layer =  this.map.createLayer('Tile Layer 1');
      this.layer.debug = true;
      this.layer.resizeWorld();
      this.playerView.create();

    }
    update = (direction: string) => {
      switch(this.state) {
        case Crimbo.OverworldState.Waiting:
          if (direction != null)  {
            if (this.playerCanMoveTo(direction)) {
              this.player.move(direction);
              this.playerView.setDirection(direction);
            }
            this.state = Crimbo.OverworldState.PlayerMove;
          }
          break;
        case Crimbo.OverworldState.PlayerMove:
          this.playerView.update();
          if (this.playerView.finishedMoving()) {
            this.state = Crimbo.OverworldState.MonsterMove;
          }
          break;
        case Crimbo.OverworldState.MonsterMove:
          this.state = Crimbo.OverworldState.Waiting;
          //this.monster.update();
          // if (this.monster.finishedMoving()) {
          //   this.state = Crimbo.OverworldState.Waiting;
          // }
          // break;
      }
    }
    render = () => { 
      this.playerView.render();
    }

    playerCanMoveTo = (direction: string) => {
      switch(direction) {
        case "right":
          return(!this.hasSolidTile((this.player.x + 1) * Crimbo.TileSize, this.player.y * Crimbo.TileSize));
          break;
        case "left":
          return(!this.hasSolidTile((this.player.x - 1) * Crimbo.TileSize, this.player.y * Crimbo.TileSize));
          break;
        case "up":
          return(!this.hasSolidTile(this.player.x * Crimbo.TileSize, (this.player.y - 1) * Crimbo.TileSize));
          break;
        case "down":
          return(!this.hasSolidTile(this.player.x * Crimbo.TileSize, (this.player.y + 1) * Crimbo.TileSize));
          break;
      }
    }
    hasSolidTile = (x: number, y: number) => {
      console.log("looking at tile at ", x, y);
      return (this.layer.getTiles(x,y,0,0)[0].index > 0);
    }
  }
}

