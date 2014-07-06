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

    numMonsters: number = 3;

    game: Phaser.Game;
    map: Phaser.Tilemap;
    layer: Phaser.TilemapLayer;
    player:  Crimbo.Player;
    playerView:  Crimbo.PlayerView;

    monsters: Crimbo.Monster[];
    monsterViews: Crimbo.MonsterView[];

    state: Crimbo.OverworldState;
    pressedKey: number;


    constructor(game: Phaser.Game) {
      this.game = game;
      this.player = new Crimbo.Player();
      this.playerView = new Crimbo.PlayerView(this.game, this.player);
      this.state = Crimbo.OverworldState.Waiting;
      this.monsters = [];
      this.monsterViews = [];

      this.createMonsters();
    }

    createMonsters = () => {
      var n = 0;
      while (n <= this.numMonsters) {
        var monster = new Crimbo.Monster();
        this.monsters.push(monster);
        this.monsterViews.push(new Crimbo.MonsterView(this.game, monster));
        n++;
      }
    }

    create = () => {
      this.map = this.game.add.tilemap('map');
      this.map.addTilesetImage('ground_1x1');
      this.layer =  this.map.createLayer('Tile Layer 1');
      this.layer.debug = true;
      this.layer.resizeWorld();
      this.playerView.create();
      _.each(this.monsterViews, (view) => { view.create(); });


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
          this.moveMonsters();
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

    moveMonsters = () => {
      _.each(this.monsters, (monster, index) => {
        var monsterView = this.monsterViews[index];
        if (monsterView.finishedMoving()) {
          monster.getMove();
          while (!this.entityCanMoveTo(monster, monster.potentialDirection)) {
            monster.getMove();
          }
          monster.move(monster.potentialDirection);
          monsterView.setDirection(monster.potentialDirection);
        } else {
          monsterView.update();
          if (monsterView.finishedMoving()) {
            this.state = Crimbo.OverworldState.Waiting;
          }
        }
      })
    }

    render = () => { 
      this.playerView.render();
    }

    entityCanMoveTo = (entity: Crimbo.CrimboEntity, direction: string) => {
      switch(direction) {
        case "right":
          return(!this.hasSolidTile((entity.x + 1), entity.y));
          break;
        case "left":
          return(!this.hasSolidTile((entity.x - 1), entity.y));
          break;
        case "up":
          return(!this.hasSolidTile(entity.x, (entity.y - 1)));
          break;
        case "down":
          return(!this.hasSolidTile(entity.x, (entity.y + 1)));
          break;
      }
    }
    hasSolidTile = (x: number, y: number) => {
      return (this.map.getTile(x,y, this.layer, true).index > 0);
    }
  }
}

