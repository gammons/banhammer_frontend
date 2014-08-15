/// <reference path="framework/player.ts"/>
/// <reference path="framework/game.ts"/>
/// <reference path="view/game_view.ts"/>
module Crimbo {
  export class GameManager {
    player: Crimbo.Player;
    game: Crimbo.Game;
    gameView: Crimbo.GameView;
    turns: number;

    constructor() {
    }
    newGame = () => {
      this.turns = 1;
      this.player = new Crimbo.Player();
      var data = $.getJSON('assets/level1.json', (data) => {
        this.game = new Crimbo.Game(data, this.player, this.turns);
        console.log("player = ", this.player);
        this.gameView = new Crimbo.GameView(this.game, this.player);
        this.game.run();
      });
    }

    loadGame = () => {
    }

    saveGame = () => {
    }
  }
}

