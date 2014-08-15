/// <reference path="constants.ts"/>
/// <reference path="entity.ts"/>
module Crimbo {
  export class Item extends CrimboEntity {
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

    constructor(attrs: any) {
      this.name = attrs.name;
      this.type = attrs.type;
      this.description = attrs.description;
      this.speedEffect = attrs.speedEffect;
      this.armorClassEffect = attrs.armorClassEffect;
      this.dexterityEffect = attrs.dexterityEffect;
      this.constitutionEffect = attrs.constitutionEffect;
      this.wisdomEffect = attrs.wisdomEffect;
      this.intelligenceEffect = attrs.intelligenceEffect;
      super();
    }
  }
}

