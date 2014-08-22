/// <reference path="constants.ts"/>
/// <reference path="item.ts"/>
module Crimbo {
  enum EntityState { Awake, Sleeping, Sitting, Confused, FoodPoisoning, Dead};
  enum EntityDemeanor { Friendly, Neutral, Hostile, PissedAtEverything }

  export class CrimboEntity {
    x: number;
    y: number;
    name: string;
    _expired: boolean;
    speed: number;
    hitPoints: number;
    maxHitPoints: number;
    armorClass: number;
    sprite: string;
    astarMoves: any;

    // attributes
    strength: number;
    dexterity: number;
    constitution: number;
    wisdom: number;
    intelligence: number;

    
    // armor-related things
    hat: Crimbo.CrimboItem;
    armor: Crimbo.CrimboItem;
    pants: Crimbo.CrimboItem;
    shoes: Crimbo.CrimboItem;

    // item inventory       
    private inventory: Crimbo.CrimboEntity[];

    drops: Crimbo.CrimboItem[];

    private cash: number;

    moveDirection: string;

    constructor() {
      this._expired = false;
      this.inventory = [];
    }

    setPosition = (x: number, y: number) => {
      this.x = x;
      this.y = y;
    }

    move = (direction: string) => {
      this.moveDirection = direction;
      switch(direction) {
        case "w": this.x = this.x - 1; break;
        case "e": this.x += 1; break;
        case "n": this.y = this.y - 1; break;
        case "s": this.y += 1; break;

        case "nw":
          this.y = this.y - 1;
          this.x = this.x - 1;
          break;
        case "ne":
          this.y = this.y - 1;
          this.x = this.x + 1;
          break;
        case "se":
          this.y = this.y + 1;
          this.x = this.x + 1;
          break;
        case "sw":
          this.y = this.y + 1;
          this.x = this.x - 1;
          break;
      }
    }
    getSpeed = () => {
      return this.speed;
    }
    isAt = (x: number, y: number) => {
      return ((this.x == x) && (this.y == y));
    }

    attack = (entity: Crimbo.CrimboEntity) => {
      var msg = this.name + " attacks " + entity.name + "!"
      entity.hitPoints -= 2;
      Crimbo.Message.notify(msg);
    }

    pickupItem = (i: Crimbo.CrimboEntity) => {
      var msg = this.name + " picks up " + i.name + ".";
      Crimbo.Message.notify(msg);
      this.inventory.push(i);
    }

    expire = () =>  {
      this._expired = true;
    }
    isExpired = () => {
      return this._expired == true;
    }

    getType = () => {
      return this['constructor']['name'];
    }

    actOn = (otherEntity: Crimbo.CrimboEntity) => { }
  }
}
