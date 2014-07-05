/// <reference path="phaser.d.ts"/>
/// <reference path="constants.ts"/>
/// <reference path="player.ts"/>
/// <reference path="player_view.ts"/>
/// <reference path="monster.ts"/>
/// <reference path="monster_view.ts"/>
/// <reference path="gameinterface.ts"/>
module Crimbo {
  export enum OverworldState { Waiting, PlayerMove, MonsterMove};

  export class Overworld {

    game: Phaser.Game;
    map: Phaser.Tilemap;
    layer: Phaser.TilemapLayer;
    player:  Crimbo.Player;
    monster:  Crimbo.Monster;
    playerView:  Crimbo.PlayerView;
    monsterView:  Crimbo.MonsterView;

    state: Crimbo.OverworldState;
    pressedKey: number;


    constructor(game: Phaser.Game) {
      this.game = game;
      this.player = new Crimbo.Player();
      this.monster = new Crimbo.Monster();
      this.playerView = new Crimbo.PlayerView(this.game, this.player);
      this.monsterView = new Crimbo.MonsterView(this.game, this.monster);
      this.state = Crimbo.OverworldState.Waiting;
    }

    create = () => {
      this.map = this.game.add.tilemap('map');
      this.map.addTilesetImage('ground_1x1');
      this.layer =  this.map.createLayer('Tile Layer 1');
      this.layer.debug = true;
      this.layer.resizeWorld();
      this.playerView.create();
      this.monsterView.create();

    }
    update = (direction: string) => {
      switch(this.state) {
        case Crimbo.OverworldState.Waiting:
          if (direction != null) this.movePlayer(direction);
          break;
        case Crimbo.OverworldState.PlayerMove:
          this.playerView.update();
          if (this.playerView.finishedMoving()) {
            this.state = Crimbo.OverworldState.MonsterMove;
          }
          break;
        case Crimbo.OverworldState.MonsterMove:
          if (this.monsterView.finishedMoving()) {
            this.monster.getMove();
            while (!this.entityCanMoveTo(this.monster, this.monster.potentialDirection)) {
              this.monster.getMove();
            }
            this.monsterView.setDirection(this.monster.potentialDirection);
          } else {
            this.monsterView.update();
            if (this.monsterView.finishedMoving()) {
              this.state = Crimbo.OverworldState.Waiting;
            }
          }
          break;
      }
    }

    movePlayer = (direction: string) => {
      if (this.entityCanMoveTo(this.player, direction)) {
        this.player.move(direction);
        this.playerView.setDirection(direction);
      }
      this.state = Crimbo.OverworldState.PlayerMove;
    }

    render = () => { 
      this.playerView.render();
    }

    entityCanMoveTo = (entity: Crimbo.CrimboEntity, direction: string) => {
      switch(direction) {
        case "right":
          return(!this.hasSolidTile((entity.x + 1) * Crimbo.TileSize, entity.y * Crimbo.TileSize));
          break;
        case "left":
          return(!this.hasSolidTile((entity.x - 1) * Crimbo.TileSize, entity.y * Crimbo.TileSize));
          break;
        case "up":
          return(!this.hasSolidTile(entity.x * Crimbo.TileSize, (entity.y - 1) * Crimbo.TileSize));
          break;
        case "down":
          return(!this.hasSolidTile(entity.x * Crimbo.TileSize, (entity.y + 1) * Crimbo.TileSize));
          break;
      }
    }
    hasSolidTile = (x: number, y: number) => {
      return (this.layer.getTiles(x,y,0,0)[0].index > 0);
    }
  }
}

