/// <reference path="item.ts"/>
/// <reference path="overworld.ts"/>

/*
   This should have nothing to do with phaser or views.  tHis class will do the following:
   * Set up the overworld
   * Set up the items in the overworld
   * Set up the entities and their positions int he world.
   
   There should be a parent class that controls setting up the game, and then the game view.
*/
module Crimbo {
  export class Game {
    private _overworld: Crimbo.Overworld;
    private _items: Crimbo.Item[];
    private _turns: number;
    private _gameData: Object;

    constructor(gameData: Object, turns: number) {
      this._gameData = gameData;
      this._turns = turns;
    }

    run = () => {
      this.initializeMap();
      this.initializeItems();
      this.initializeEntities();
      //this.initializeGame();
    }


    initializeMap = () => {
      this._overworld = new Crimbo.Overworld(this._turns);
    }

    initializeItems = () =>  {
      _.each(this._gameData['items'], (i) => {
        this._overworld.addItem(i);
      });
    }

    initializeEntities = () => {
    }
  }
}
