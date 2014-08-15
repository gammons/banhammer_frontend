/// <reference path="constants.ts"/>
/// <reference path="item.ts"/>
module Crimbo {
  enum EntityState { Awake, Sleeping, Sitting, Confused, FoodPoisoning, Dead};
  enum EntityDemeanor { Friendly, Neutral, Hostile, PissedAtEverything }

  export class CrimboEntity {
    x: number;
    y: number;
    name: string;
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
    hat: Crimbo.Item;
    armor: Crimbo.Item;
    pants: Crimbo.Item;
    shoes: Crimbo.Item;

    // item inventory       
    private inventory: Crimbo.Item[];

    drops: Crimbo.Item[];

    private cash: number;

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

    attack = (entity: Crimbo.CrimboEntity) => {
      var msg = this.name + " attacks " + entity.name + "!"
      Crimbo.Message.notify(msg);
    }
  }
}
