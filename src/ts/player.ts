/// <reference path="phaser.d.ts"/>
/// <reference path="constants.ts"/>
module Crimbo {
  export class Player {
    x: number;
    y: number;

    constructor() {
      this.x = 1;
      this.y = 1;
    }

    move = (direction: string) => {
      switch(direction) {
        case "left": this.x = this.x - 1; break;
        case "right": this.x += 1; break;
        case "up": this.y = this.y - 1; break;
        case "down": this.y += 1; break;
      }
    }
  }
}

