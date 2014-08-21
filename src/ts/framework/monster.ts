/// <reference path="entity.ts"/>
/// <reference path="constants.ts"/>
/// <reference path="overworld.ts"/>
module Crimbo {
  export class Monster extends Crimbo.CrimboEntity {
    private potentialDirection: string;
    private _destination: any;
    private _target: Crimbo.CrimboEntity;

    constructor() {
      super();
      this.speed = 20;
      this.name = "the wraith";
      this.x = 10;
      this.y = 3;
      this.astarMoves = [];
    }

    calculateMove = (overworld: Crimbo.Overworld) => {
      this._target = this.findTarget(overworld)
      if (this._destination) {
        if (this.isAt(this._destination[0], this._destination[1])) {
          console.log("we have arrived at our destination");
          this._destination = null;
          return this.randomWalk(overworld);
        } else {
          console.log("we have a destination and are moving towards it");
          return this.moveTowardsDestination(overworld);
        }
      } else {
        console.log("we do not have a desitnation and are aimlessly walking");
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
      var potentialTargets = []
      fov.compute(this.x, this.y, overworld.brightness(), (x, y, r, visibility) => {
        var entity = overworld.entityAt(x,y)

        if ((entity) && (entity != this)) {
          Crimbo.Message.notify(this.name + " sees something: " + entity.name);
          potentialTargets.push(entity);
        }
      });
      var t = this.pickSuitableTarget(potentialTargets);
      this.setDestinationFromTargetEntity(t);
      return t;
    }

    setDestinationFromTargetEntity = (t) => {
      if (t)
        this._destination = [t.x, t.y];
    }

    pickSuitableTarget = (targets: Crimbo.CrimboEntity[]) => {
      var tar;
      // if any of the targets are the player, return that first
      tar = _.find(targets, (t) => { return t.getType() == "Player" });
      if (tar) return tar;

      // next up is items
      tar = _.find(targets, (t) => { return t.getType() == "CrimboItem" });
      if (tar) return tar;
      return tar;

      // next up is other monsters
      tar = _.find(targets, (t) => { return t.getType() == "Monster" });
      if (tar) return tar;
    }

    private moveTowardsDestination = (overworld: Crimbo.Overworld) => {
      function passableCallback(x: number, y: number) {
        return !overworld.hasSolidTile(x,y);
      }
      var astar = new ROT.Path.AStar(this.x, this.y, passableCallback, {});
      this.astarMoves = [];
      astar.compute(this._destination[0], this._destination[1], (x, y) => {
        this.astarMoves.push([x,y]);
      });
      return this.getNextDirection(this.astarMoves[this.astarMoves.length - 2]);
    }

    private getNextDirection = (nextPosition) => {
      var direction = "";
      if (this.y < nextPosition[1])  {
        direction = "s";
      } else if (this.y > nextPosition[1]) {
        direction = "n";
      }
      if (this.x < nextPosition[0]) {
        direction = direction + "e";
      } else if (this.x > nextPosition[0]) {
        direction = direction + "w";
      }
      return direction;
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

