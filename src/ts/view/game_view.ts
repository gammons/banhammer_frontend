/// <reference path="../defs/phaser.d"/>
/// <reference path="../framework/constants.ts"/>
/// <reference path="overworld_view.ts"/>
/// <reference path="../framework/game.ts"/>
/// <reference path="../framework/player.ts"/>

module Crimbo {
  export enum GameStatus { OverworldView, Combat, Pause };

  export class GameView {

    game: Phaser.Game;
    state: GameStatus;
    view: Crimbo.OverworldView;
    player: Crimbo.Player;

    constructor(game: Crimbo.Game, player: Crimbo.Player) {
      this.game = new Phaser.Game(800, 600, Phaser.AUTO, 'crimbo-game', { preload: this.preload, create: this.create, update:
        this.update, render: this.render});
    }

    preload = () => {
      this.view.preload();
    }


    create = () => {
      this.view.create();
    }

    update = () => {
      var inputPressed = this.handleInput()
      this.view.update(inputPressed);
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
      this.view.render();
    }
  }
}
