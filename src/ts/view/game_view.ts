/// <reference path="phaser.d.ts"/>
/// <reference path="constants.ts"/>
/// <reference path="gameinterface.ts"/>
/// <reference path="overworld_view.ts"/>
/// <reference path="player.ts"/>

module Crimbo {
  export enum GameStatus { OverworldView, Combat, Pause };

  export class GameView {

    game: Phaser.Game;
    state: GameStatus;
    view: Crimbo.OverworldView;

    constructor(mapJson: Object) {
      this.game = new Phaser.Game(800, 600, Phaser.AUTO, 'crimbo-game', { preload: this.preload, create: this.create, update:
        this.update, render: this.render});
      this.view = view;
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
