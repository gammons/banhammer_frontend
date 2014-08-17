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

    constructor(gameModel: Crimbo.Game, player: Crimbo.Player) {
      var w = $('#crimbo-game').width();
      var h = $('#crimbo-game').height();
      this.game = new Phaser.Game(w, h, Phaser.AUTO, 'crimbo-game', { preload: this.preload, create: this.create, update:
        this.update, render: this.render});
      this.view = new Crimbo.OverworldView(this.game, gameModel, player);
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
      if (this.game.input.keyboard.isDown(102)) return("e");
      if (this.game.input.keyboard.isDown(100)) return("w");
      if (this.game.input.keyboard.isDown(104)) return("n");
      if (this.game.input.keyboard.isDown(98)) return("s");

      if (this.game.input.keyboard.isDown(97)) return("sw");
      if (this.game.input.keyboard.isDown(99)) return("se");
      if (this.game.input.keyboard.isDown(103)) return("nw");
      if (this.game.input.keyboard.isDown(105)) return("ne");

      if (this.game.input.keyboard.isDown(101)) return("space");
      if (this.game.input.keyboard.isDown(Phaser.Keyboard.SPACEBAR)) return("space");
      return null;
    }

    render = () => {
      this.view.render();
    }
  }
}
