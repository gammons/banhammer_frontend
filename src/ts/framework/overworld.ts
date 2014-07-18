/// <reference path="../defs/phaser.d"/>
/// <reference path="constants"/>
/// <reference path="player"/>
/// <reference path="monster"/>
module Crimbo {
  export enum OverworldState { Waiting, PlayerMove, MonsterMove};

  export class Overworld {
    private _monsters: Crimbo.Monster[];
    private _player:  Crimbo.Player;
    private _map: Phaser.Tile[][];
    private _state: Crimbo.OverworldState;
    private _enterCoords: Phaser.Point;
    private _exitCoords: Phaser.Point;
    private _turns: number;

    constructor(turns: number) {
      this._monsters = [];
      this._monsters.push(new Crimbo.Monster());
      this._player = new Crimbo.Player();
      this._turns = turns;
    }

    setMap = (map: Phaser.Tile[][]) => {
      this._map = map;
    }

    private monstersCanMove = () => {
      return _.any(this._monsters, (monster) => { return this.canMove(monster); });
    }

    update = (currentTurn: number, direction: string) => {
      if ((this.canMove(this._player)) && (!direction)) return;
      this.movePlayer(direction, currentTurn);
      this.moveMonsters(currentTurn);
      //if (this.noOneCanMove()) this.turns++;
    }

    noOneCanMove = () => {
      return ((!this.canMove(this._player)) && _.all(this._monsters, (monster) => { return !this.canMove(monster) }));
    }

    private movePlayer = (direction: string, currentTurn: number) => {
      if ((direction) && (this.canMove(this._player)) && (this.entityCanMoveTo(this._player, direction))) {
        this.moveEntity(this._player, direction);
      }
    }

    private moveMonsters = (turn: number) => {
      _.each(this._monsters, (monster) => {
        if (this.canMove(monster))  {
          var move = monster.calculateMove(this);
          this.moveEntity(monster, move);
        }
      });
    }

    private moveEntity = (entity: Crimbo.CrimboEntity, direction: string) => {
      var entityToAttack = this.entityWillHitAnotherEntity(entity, direction);
      if (entityToAttack) {
        entity.attack(entityToAttack);
      } else {
        entity.move(direction);
      }
    }

    private canMove = (entity: Crimbo.CrimboEntity) => {
      if (this._turns < entity.getSpeed()) {
        return (entity.getSpeed() % this._turns === 0)
      } else {
        return (this._turns % entity.getSpeed() === 0)
      }

    }
    private entityWillHitAnotherEntity = (entity: Crimbo.CrimboEntity , move: string) => {
      switch(move) { 
        case "right": return this.isThereAnEntityAt(entity.x + 1, entity.y);break;
        case "left": return this.isThereAnEntityAt(entity.x - 1, entity.y);break;
        case "up": return this.isThereAnEntityAt(entity.x, entity.y - 1);break;
        case "down": return this.isThereAnEntityAt(entity.x, entity.y + 1);break;
      }
    }

    isThereAnEntityAt = (x: number, y: number)  => {
      if (this._player.isAt(x,y)) return this._player;
      var monster = _.find(this._monsters, (monster) => { return monster.isAt(x,y) });
      return monster;
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

    // I hate this.
    hasSolidTile = (x: number, y: number) => {
      return (this._map[y][x].index > 0);
    }
  }
}

