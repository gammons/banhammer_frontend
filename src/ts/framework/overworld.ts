/// <reference path="../defs/phaser.d"/>
/// <reference path="constants"/>
/// <reference path="player"/>
/// <reference path="item"/>
/// <reference path="monster"/>
module Crimbo {
  export enum OverworldState { Waiting, PlayerMove, MonsterMove};

  export class Overworld {
    private _monsters: Crimbo.Monster[];
    private _player:  Crimbo.Player;
    private _items:  Crimbo.CrimboItem[];
    private _map: Object;
    private _state: Crimbo.OverworldState;
    private _enterCoords: Phaser.Point;
    private _exitCoords: Phaser.Point;
    private _turns: number;

    constructor(player: Crimbo.Player, turns: number, map: Object) {
      this._monsters = [];
      this._monsters.push(new Crimbo.Monster());
      this._player = player;
      this._turns = turns;
      this._items = [];
      this._map = map;
    }

    addItem = (i: Object) => {
      var _item = new Crimbo.CrimboItem(i);
      this._items.push(_item);
      if (i['placement'] == 'random') {
        var coords = this.randomPlaceforItem();
        _item.x = coords.x;
        _item.y = coords.y;


      } else {
      }
    }

    getMonsters = () => {
      return this._monsters;
    }

    getItems = () => {
      return this._items;
    }

    update = (direction: string) => {
      if ((this.canMove(this._player)) && (!direction)) return;
      this.movePlayer(direction);
      this.moveMonsters();
      this.expireItems();
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

    private monstersCanMove = () => {
      return _.any(this._monsters, (monster) => { return this.canMove(monster); });
    }

    private noOneCanMove = () => {
      return ((!this.canMove(this._player)) && _.all(this._monsters, (monster) => { return !this.canMove(monster) }));
    }

    private movePlayer = (direction: string) => {
      if ((direction) && (this.canMove(this._player)) && (this.entityCanMoveTo(this._player, direction))) {
        this.moveEntity(this._player, direction);
      }
    }

    private moveMonsters = () => {
      _.each(this._monsters, (monster) => {
        if (this.canMove(monster))  {
          var move = monster.calculateMove(this);
          this.moveEntity(monster, move);
        }
      });
    }

    private expireItems = () => {
       this._items = _.reject(this._items, (it) => { return it.isExpired(); });
    }

    private moveEntity = (entity: Crimbo.CrimboEntity, direction: string) => {
      var otherEntity = this.entityWillHitAnotherEntity(entity, direction);
      if (otherEntity) {
        switch(otherEntity.getType()) {
          case "monster": entity.attack(otherEntity); break;
          case "item": 
            entity.move(direction);
            entity.pickupItem(otherEntity); 
            otherEntity.expire();
            break;
        }
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
        case "right": return this.entityAt(entity.x + 1, entity.y);break;
        case "left": return this.entityAt(entity.x - 1, entity.y);break;
        case "up": return this.entityAt(entity.x, entity.y - 1);break;
        case "down": return this.entityAt(entity.x, entity.y + 1);break;
      }
    }

    private mapLengthY = () => {
      return this._map['layers'][0].data.length;
    }

    private mapLengthX = () => {
      return this._map['layers'][0].data[0].length;
    }

    private entityAt = (x: number, y: number)  => {
      if (this._player.isAt(x,y)) return this._player;
      var monster = _.find(this._monsters, (monster) => { return monster.isAt(x,y) });
      if (monster) return monster;
      var i = _.find(this._items, (i) => { return i.isAt(x,y) });
       return i;
    }


    // I hate this.
    private hasSolidTile = (x: number, y: number) => {
      return (this._map['layers'][0].data[y][x].index > 0);
    }

    private randomPlaceforItem = () => {
      var good = false;
      var x: number, y: number;
      while (!good) {
        y = Utility.randInt(this.mapLengthY())
        x = Utility.randInt(this.mapLengthX())
        if (!this.hasSolidTile(x,y)) good = true;
      }
      var p = new Phaser.Point();
      p.set(x,y);
      return p;
    }

  }
}

