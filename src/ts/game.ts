/// <reference path="phaser.d.ts"/>
/// <reference path="constants.ts"/>
/// <reference path="gameinterface.ts"/>
/// <reference path="overworld_view.ts"/>
/// <reference path="player.ts"/>

module Crimbo {
  export enum GameStatus { OverworldView, Combat, Pause };

  export class CrimboGame {

    game: Phaser.Game;
    state: GameStatus;
    overworldView: Crimbo.OverworldView;
    overworld: Crimbo.Overworld;

    constructor() {
      this.game = new Phaser.Game(800, 600, Phaser.AUTO, 'content', { preload: this.preload, create: this.create, update:
        this.update, render: this.render});
      this.state = GameStatus.OverworldView;
      this.overworld = new Crimbo.Overworld();
      this.overworldView = new Crimbo.OverworldView(this.game, this.overworld);
      this.overworld.setMap(this.overworldView.map);
    }

    preload = () => {
      this.game.load.image('mushroom', '/assets/mushroom32x32.png');
      this.game.load.image('purple_ball', '/assets/purple_ball.png');
      this.game.load.tilemap('map', 'assets/tilemaps/maps/collision_test.json', null, Phaser.Tilemap.TILED_JSON);
      this.game.load.image('ground_1x1', 'assets/tilemaps/tiles/ground_1x1.png');
      this.game.load.image('phaser', 'assets/sprites/phaser-dude.png');
    }

    create = () => {
      this.overworldView.create();
    }

    update = () => {
      var inputPressed = this.handleInput()
      this.overworldView.update(inputPressed);
    }

    handleInput = () => {
      if (this.game.input.keyboard.isDown(Phaser.Keyboard.RIGHT)) return("right");
      if (this.game.input.keyboard.isDown(Phaser.Keyboard.LEFT)) return("left");
      if (this.game.input.keyboard.isDown(Phaser.Keyboard.UP)) return("up");
      if (this.game.input.keyboard.isDown(Phaser.Keyboard.DOWN)) return("down");
      if (this.game.input.keyboard.isDown(Phaser.Keyboard.SPACEBAR)) return("space");
      return null;
    }
    render = () => {
      this.overworldView.render();
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
