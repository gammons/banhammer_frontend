/// <reference path="phaser.d.ts"/>
/// <reference path="constants.ts"/>
/// <reference path="gameinterface.ts"/>
/// <reference path="overworld.ts"/>
/// <reference path="player.ts"/>

module Crimbo {
  export enum GameStatus { Overworld, Combat, Pause };

  export class CrimboGame {

    game: Phaser.Game;
    state: GameStatus;
    overworld: Crimbo.Overworld;

    constructor() {
      this.game = new Phaser.Game(800, 600, Phaser.AUTO, 'content', { preload: this.preload, create: this.create, update:
        this.update, render: this.render});
      this.state = GameStatus.Overworld;
      this.overworld = new Crimbo.Overworld(this.game);
    }

    preload = () => {
      this.game.load.image('mushroom', '/assets/mushroom32x32.png');
      this.game.load.tilemap('map', 'assets/tilemaps/maps/collision_test.json', null, Phaser.Tilemap.TILED_JSON);
      this.game.load.image('ground_1x1', 'assets/tilemaps/tiles/ground_1x1.png');
      this.game.load.image('phaser', 'assets/sprites/phaser-dude.png');
    }

    create = () => {
      this.overworld.create();
    }

    update = () => {
      var inputPressed = this.handleInput()
      this.overworld.update(inputPressed);
    }

    handleInput = () => {
      if (this.game.input.keyboard.isDown(Phaser.Keyboard.RIGHT)) return("right");
      if (this.game.input.keyboard.isDown(Phaser.Keyboard.LEFT)) return("left");
      if (this.game.input.keyboard.isDown(Phaser.Keyboard.UP)) return("up");
      if (this.game.input.keyboard.isDown(Phaser.Keyboard.DOWN)) return("down");
      return null;
    }
    render = () => {
      this.overworld.render();
    }
  }
}

interface Window { 
  game: any; 
  sprite: any;
}
window.onload = () => {

  window.game = new Crimbo.CrimboGame();

};
