/// <reference path="phaser.d.ts"/>
/// <reference path="constants.ts"/>
/// <reference path="player.ts"/>
/// <reference path="monster.ts"/>
/// <reference path="gameinterface.ts"/>
module Crimbo {
  export enum OverworldState { Waiting, PlayerMove, MonsterMove};

  export class Overworld {
    numMonsters: number = 1;
    player:  Crimbo.Player;
    map: Phaser.Tile[][];
    monsters: Crimbo.Monster[];
    state: Crimbo.OverworldState;
    turns: number;

    constructor() {
      this.player = new Crimbo.Player();
      this.monsters = [];
      _.times(3, () => {
        this.monsters.push(new Crimbo.Monster());
      });
      this.turns = 1;
    }

    setMap = (map: Phaser.Tile[][]) => {
      this.map = map;
    }

    monstersCanMove = () => {
      return _.any(this.monsters, (monster) => { return this.canMove(monster); });
    }

    update = (direction: string) => {
      if ((this.canMove(this.player)) && (!direction)) return;
      this.movePlayer(direction);
      this.moveMonsters();
      this.turns++;
      if (this.noOneCanMove()) this.turns++;
    }

    movePlayer = (direction) => {
      if ((direction) && (this.canMove(this.player)) && (this.entityCanMoveTo(this.player, direction))) {
        if (this.entityWillHitAnotherEntity(this.player, direction)) {
          //this.player.attack(this.entityToAttack(this.player, direction));
        } else {
          this.player.move(direction);
        }
      }
    }

    moveMonsters = () => {
      _.each(this.monsters, (monster) => {
        if (this.canMove(monster))  {
          if (this.entityWillHitAnotherEntity(monster, move)) {
            //monster.attack(this.entityToAttack(monster, move));
          } else {
            var move = monster.calculateMove(this);
            monster.move(move);
          }
        }
      });
    }

    noOneCanMove = () => {
      return ((!this.canMove(this.player)) && (_.all(this.monsters, (monster) => { return !this.canMove(monster) })))
    }

    canMove = (entity: Crimbo.CrimboEntity) => {
      if (this.turns < entity.speed()) {
        return (entity.speed() % this.turns === 0)
      } else {
        return (this.turns % entity.speed() === 0)
      }

    }
    entityWillHitAnotherEntity = (entity: Crimbo.CrimboEntity , move: string) => {
      switch(move) { 
        case "right": this.isThereAnEntityAt(entity.x + 1, entity.y);break;
        case "left": this.isThereAnEntityAt(entity.x + 1, entity.y);break;
        case "up": this.isThereAnEntityAt(entity.x + 1, entity.y);break;
        case "down": this.isThereAnEntityAt(entity.x + 1, entity.y);break;
      }
    }

    isThereAnEntityAt = (x: number, y: number)  => {
      return (this.player.isAt(x,y) || _.any(this.monsters, (monster) => { return monster.isAt(x,y) }));
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
      return (this.map[y][x].index > 0);
    }
  }
}

