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
    player: Crimbo.Player;

    constructor() {
      this.game = new Phaser.Game(800, 600, Phaser.AUTO, 'content', { preload: this.preload, create: this.create, update:
        this.update, render: this.render});
      this.state = GameStatus.Overworld;
      this.overworld = new Crimbo.Overworld(this.game);
      this.player = new Crimbo.Player(this.game, this.overworld);
    }

    preload = () => {
      this.game.load.image('mushroom', '/assets/mushroom32x32.png');
      this.game.load.tilemap('map', 'assets/tilemaps/maps/collision_test.json', null, Phaser.Tilemap.TILED_JSON);
      this.game.load.image('ground_1x1', 'assets/tilemaps/tiles/ground_1x1.png');
      this.game.load.image('phaser', 'assets/sprites/phaser-dude.png');
    }

    create = () => {
      this.overworld.create();
      this.player.create();
    }

    update = () => {
      this.overworld.update();
      this.player.update();
    }
    render = () => {
      this.overworld.render();
      this.player.render();
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
