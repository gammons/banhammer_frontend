/// <reference path="framework/player.ts"/>
/// <reference path="framework/game.ts"/>
module Crimbo {
  class GameManager {
    player: Crimbo.Player;
    game: Crimbo.Game;
    turns: number;

    newGame = () => {
      this.turns = 1;
      this.player = new Crimbo.Player();
      this.game = new Crimbo.Game($.getJSON('level1.json'), this.turns);
    }

    loadGame = () => {
    }

    saveGame = () => {
    }
  }
}

