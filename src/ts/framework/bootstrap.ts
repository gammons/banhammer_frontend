/// <reference path="../game_manager.ts"/>
/// <reference path="../view/game_view.ts"/>
interface Window { 
  gameManager: any; 
}
window.onload = () => {

  var game = new Crimbo.GameManager();
  game.newGame();
  window.gameManager = game;

};

