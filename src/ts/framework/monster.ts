/// <reference path="entity.ts"/>
/// <reference path="constants.ts"/>
/// <reference path="overworld.ts"/>
module Crimbo {
  export class Monster extends Crimbo.CrimboEntity {
    potentialDirection: string;

    constructor() {
      super();
      this.speed = 20;
      this.name = "the wraith";
      this.x = 10;
      this.y = 3;
    }

    calculateMove = (overworld: Crimbo.Overworld) => {
      var directions = ['left','right','up','down',null];
      var rnd = Math.floor(Math.random() * (3 - 0 + 1)) + 0;
      var direction = directions[rnd];
      while(!overworld.entityCanMoveTo(this, direction)) {
        rnd = Math.floor(Math.random() * (3 - 0 + 1)) + 0;
        direction = directions[rnd];
      }
      return direction;
    }
    actOn = (otherEntity: Crimbo.CrimboEntity) => {
      switch(otherEntity['constructor']['name']) {
        case "Player":
          this.attack(otherEntity);
          break;
        case "Monster":
          Crimbo.Message.notify("The " + this.name + " eyes up the " + otherEntity.name + " suspiciously.");
          break;
        case "CrimboItem":
          this.pickupItem(otherEntity);
          otherEntity.expire();
      }
    }
  }
}

