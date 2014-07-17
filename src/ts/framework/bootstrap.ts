/// <reference path="game.ts"/>
/// <reference path="game_view.ts"/>
interface Window { 
  gameView: any; 
}
window.onload = () => {

  var game = new Crimbo.Game();
  window.gameView = new Crimbo.GameView(game);

};

