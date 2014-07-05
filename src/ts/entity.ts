/// <reference path="constants.ts"/>
module Crimbo {
  export class CrimboEntity {
    x: number;
    y: number;

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
