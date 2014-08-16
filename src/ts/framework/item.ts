/// <reference path="constants.ts"/>
/// <reference path="entity.ts"/>
module Crimbo {
  export class CrimboItem extends CrimboEntity {
    name: string;
    itemType: string;
    description: string;      

    // what effect does this item have on strength?
    speedEffect: number;
    armorClassEffect: number;
    dexterityEffect: number;
    constitutionEffect: number;
    wisdomEffect: number;
    intelligenceEffect: number;

    getType = () => {
      return "item"
    }

    constructor(attrs: any) {
      super();
      this.name = attrs.name;
      //this.itemType = attrs.type;
      this.description = attrs.description;
      this.speedEffect = attrs.speedEffect;
      this.armorClassEffect = attrs.armorClassEffect;
      this.dexterityEffect = attrs.dexterityEffect;
      this.constitutionEffect = attrs.constitutionEffect;
      this.wisdomEffect = attrs.wisdomEffect;
      this.intelligenceEffect = attrs.intelligenceEffect;
      super();
    }

    isItem = () =>  {
      return true;
    }

  }
}

