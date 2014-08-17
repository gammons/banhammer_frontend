/// <reference path="../game_manager.ts"/>
/// <reference path="../defs/angular.d"/>
var banhammerApp = angular.module('banhammer', []);
// var game= new Crimbo.GameManager();
// var name = "bob"

banhammerApp.factory('Game', function() {
  var game = new Crimbo.GameManager();
  game.newGame();
  var f = {
    'game': game,
    'player': game.player
  }

  return f;
});

banhammerApp.controller('GameWindowCtrl', ($scope, Game) => {
  //Game.game.newGame();
});

banhammerApp.controller('StatsCtrl', ($scope, Game) =>  {
  $('body').on('ui-update', () => {
    $scope.player = Game.player;
    $scope.$apply();
  });
  $scope.player = Game.player;
  $scope.debug = true;
});

