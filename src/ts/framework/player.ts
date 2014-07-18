/// <reference path="entity.ts"/>
/// <reference path="constants.ts"/>
module Crimbo {
  export class Player extends Crimbo.CrimboEntity {
    constructor() {
      super();
      this.speed = 5;
      this.name = "Player";
      this.x = 1;
      this.y = 1;
    }
  }
}

