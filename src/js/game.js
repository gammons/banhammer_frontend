/// <reference path="phaser.d.ts"/>
/// <reference path="constants.ts"/>
/// <reference path="gameinterface.ts"/>
/// <reference path="overworld.ts"/>
/// <reference path="player.ts"/>
var Crimbo;
(function (Crimbo) {
    (function (GameStatus) {
        GameStatus[GameStatus["Overworld"] = 0] = "Overworld";
        GameStatus[GameStatus["Combat"] = 1] = "Combat";
        GameStatus[GameStatus["Pause"] = 2] = "Pause";
    })(Crimbo.GameStatus || (Crimbo.GameStatus = {}));
    var GameStatus = Crimbo.GameStatus;
    ;

    var CrimboGame = (function () {
        function CrimboGame() {
            var _this = this;
            this.preload = function () {
                _this.game.load.image('mushroom', '/assets/mushroom32x32.png');
                _this.game.load.image('purple_ball', '/assets/purple_ball.png');
                _this.game.load.tilemap('map', 'assets/tilemaps/maps/collision_test.json', null, Phaser.Tilemap.TILED_JSON);
                _this.game.load.image('ground_1x1', 'assets/tilemaps/tiles/ground_1x1.png');
                _this.game.load.image('phaser', 'assets/sprites/phaser-dude.png');
            };
            this.create = function () {
                _this.overworld.create();
            };
            this.update = function () {
                var inputPressed = _this.handleInput();
                _this.overworld.update(inputPressed);
            };
            this.handleInput = function () {
                if (_this.game.input.keyboard.isDown(Phaser.Keyboard.RIGHT))
                    return ("right");
                if (_this.game.input.keyboard.isDown(Phaser.Keyboard.LEFT))
                    return ("left");
                if (_this.game.input.keyboard.isDown(Phaser.Keyboard.UP))
                    return ("up");
                if (_this.game.input.keyboard.isDown(Phaser.Keyboard.DOWN))
                    return ("down");
                return null;
            };
            this.render = function () {
                _this.overworld.render();
            };
            this.game = new Phaser.Game(800, 600, Phaser.AUTO, 'content', {
                preload: this.preload, create: this.create, update: this.update, render: this.render });
            this.state = 0 /* Overworld */;
            this.overworld = new Crimbo.Overworld(this.game);
        }
        return CrimboGame;
    })();
    Crimbo.CrimboGame = CrimboGame;
})(Crimbo || (Crimbo = {}));

window.onload = function () {
    window.game = new Crimbo.CrimboGame();
};
