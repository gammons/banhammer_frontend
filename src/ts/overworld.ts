/// <reference path="phaser.d.ts"/>
/// <reference path="constants.ts"/>
/// <reference path="player.ts"/>
/// <reference path="monster.ts"/>
/// <reference path="gameinterface.ts"/>
module Crimbo {
  export enum OverworldState { Waiting, PlayerMove, MonsterMove};

  export class Overworld {
    numMonsters: number = 3;
    player:  Crimbo.Player;
    map: Phaser.Tilemap;
    monsters: Crimbo.Monster[];
    state: Crimbo.OverworldState;
    turns: number;

    constructor() {
      this.player = new Crimbo.Player();
      this.monsters = [];
      this.turns = 1;
    }

    setMap = (map: Phaser.Tilemap) => {
      console.log("callling setMap", map);
      this.map = map;
    }

    monstersCanMove = () => {
      return _.any(this.monsters, (monster) => { return this.canMove(monster); });
    }

    update = (direction: string) => {
      //move player
      if ((direction) && (this.canMove(this.player)) && (this.entityCanMoveTo(this.player, direction))) {
        this.player.move(direction);

        //move monster
        while (this.monstersCanMove()) {
          _.each(this.monsters, (monster) => {
            if (this.canMove(monster))  {
              monster.move(monster.calculateMove(this));
            }
          });
        }
        this.turns++;
      }


      // apply item effects

      // update the turns if no one can move.
      if (!this.canMove(this.player)) {
        this.turns++;
      }
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
      return (this.map.getTile(x,y, 0, true).index > 0);
    }
  }
}

