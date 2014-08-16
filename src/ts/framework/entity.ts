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
    armorClass: number;
    sprite: string;

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

    constructor() {
      this._expired = false;
      this.inventory = [];
    }

    setPosition = (x: number, y: number) => {
      this.x = x;
      this.y = y;
    }

    move = (direction: string) => {
      switch(direction) {
        case "left": this.x = this.x - 1; break;
        case "right": this.x += 1; break;
        case "up": this.y = this.y - 1; break;
        case "down": this.y += 1; break;
      }
    }
    getSpeed = () => {
      return this.speed;
    }
    isAt = (x: number, y: number) => {
      return ((this.x == x) && (this.y == y));
    }

    // getType = () => {
    //   return "entity";
    // }

    attack = (entity: Crimbo.CrimboEntity) => {
      var msg = this.name + " attacks " + entity.name + "!"
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
  }
}
