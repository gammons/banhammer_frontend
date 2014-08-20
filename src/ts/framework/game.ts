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
    private _items: Crimbo.CrimboItem[];
    private _turns: number;
    private _gameData: Object;
    private _player: Crimbo.CrimboEntity;

    constructor(gameData: Object, player: Crimbo.CrimboEntity, turns: number) {
      this._gameData = gameData;
      this._turns = turns;
      this._player = player;
      this.initializeMap();
      this.initializeItems();
      this.initializeEntities();
    }

    run = () => {
      //this.initializeGame();
    }

    initializeMap = () => {
      $.ajax(this._gameData['map'], {async: false, dataType: "json", success: (data) => {
        this._overworld = new Crimbo.Overworld(this._player, this._turns, Phaser.TilemapParser.parseTiledJSON(data));
      }});
    }

    getOverworld = () => {
      return this._overworld;
    }

    getGameData = () => {
      return this._gameData;
    }

    initializeItems = () =>  {
      _.each(this._gameData['items'], (i) => {
        this._overworld.addItem(i);
      });
    }

    initializeEntities = () => {
      this._player.setPosition(this._gameData['playerStart']['x'], this._gameData['playerStart']['y']);

      _.each(this._gameData['entities'], (i) => {
        //this._overworld.addEntity(i);
      });
    }
  }
}
