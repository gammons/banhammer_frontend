/// <reference path="entity.ts"/>
/// <reference path="constants.ts"/>
module Crimbo {
  export class Player extends Crimbo.CrimboEntity {
    constructor() {
      super();
      this.speed = 5;
      this.name = "Playah";
      this.x = 1;
      this.y = 1;
    }
    actOn = (otherEntity: Crimbo.CrimboEntity) => {
      switch(otherEntity['constructor']['name']) {
        case "Monster":
          this.attack(otherEntity);
          break;
        case "CrimboItem":
          this.pickupItem(otherEntity);
          otherEntity.expire();
      }
    }
  }
}

