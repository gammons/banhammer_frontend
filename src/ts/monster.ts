/// <reference path="entity.ts"/>
/// <reference path="constants.ts"/>
module Crimbo {
  export class Monster extends Crimbo.CrimboEntity {
    potentialDirection: string;

    constructor() {
      super();
      this._speed = 2;
      this.x = 10;
      this.y = 3;
    }

    getMove = () => {
      var rnd = Math.floor(Math.random() * (3 - 0 + 1)) + 0;
      var directions = ['left','right','up','down',null];
      this.potentialDirection = directions[rnd];
    }
  }
}

