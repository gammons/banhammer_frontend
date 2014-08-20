/// <reference path="entity.ts"/>
/// <reference path="constants.ts"/>
/// <reference path="overworld.ts"/>
module Crimbo {
  export class Monster extends Crimbo.CrimboEntity {
    private potentialDirection: string;
    private _target: Crimbo.CrimboEntity;

    constructor() {
      super();
      this.speed = 20;
      this.name = "the wraith";
      this.x = 10;
      this.y = 3;
      this._target = null;
    }

    calculateMove = (overworld: Crimbo.Overworld) => {
      this._target = this.findTarget(overworld);
      if (this._target) {
        return this.moveTowardsTarget(overworld);
      } else {
        return this.randomWalk(overworld);
      }
    }

    private findTarget = (overworld: Crimbo.Overworld) => {
      function lightPasses(x: number, y: number) {
        if ((x < 0) || (y < 0))
          return false;
        return !overworld.hasSolidTile(x,y);
      }
      var fov = new ROT.FOV.PreciseShadowcasting(lightPasses, {});
      fov.compute(this.x, this.y, overworld.brightness(), (x, y, r, visibility) => {
        var entity = overworld.entityAt(x,y)

        if ((entity) && (entity != this)) {
          Crimbo.Message.notify(this.name + " sees something: " + entity.name);
          return entity;
        }
      });
      return null;
    }

    private moveTowardsTarget = (overworld: Crimbo.Overworld) => {
      return 'left';
    }

    private randomWalk = (overworld: Crimbo.Overworld) => {
      var directions = ['w','e','n','s','ne','nw','se','sw', null];
      var rnd = Math.floor(Math.random() * (7 - 0 + 1)) + 0;
      var direction = directions[rnd];
      while(!overworld.entityCanMoveTo(this, direction)) {
        rnd = Math.floor(Math.random() * (7 - 0 + 1)) + 0;
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

