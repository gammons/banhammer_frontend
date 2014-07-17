/// <reference path="constants.ts"/>
module Crimbo {
  export class Item {
    name: string;
    type: string;
    description: string;      

    // what effect does this item have on strength?
    speedEffect: number;
    armorClassEffect: number;
    dexterityEffect: number;
    constitutionEffect: number;
    wisdomEffect: number;
    intelligenceEffect: number;

  }
}

