/// <reference path="framework/player.ts"/>
/// <reference path="framework/game.ts"/>
/// <reference path="view/game_view.ts"/>
module Crimbo {
  class GameManager {
    player: Crimbo.Player;
    game: Crimbo.Game;
    gameView: Crimbo.GameView;
    turns: number;

    newGame = () => {
      this.turns = 1;
      this.player = new Crimbo.Player();
      this.game = new Crimbo.Game($.getJSON('level1.json'), this.turns);
      this.gameView = new Crimbo.GameView(this.game, this.player);
    }

    loadGame = () => {
    }

    saveGame = () => {
    }
  }
}

