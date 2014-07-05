/// <reference path="phaser.d.ts"/>
/// <reference path="player.ts"/>
/// <reference path="constants.ts"/>
var Crimbo;
(function (Crimbo) {
    var PlayerView = (function () {
        function PlayerView(game, player) {
            var _this = this;
            this.create = function () {
                _this.playerSprite = _this.game.add.sprite(32, 32, 'mushroom');
                _this.game.camera.follow(_this.playerSprite);
            };
            this.update = function () {
                if (_this._moving) {
                    _this.move();
                }
            };
            this.setDirection = function (inputPressed) {
                _this._moving = inputPressed;
            };
            this.move = function () {
                switch (_this._moving) {
                    case "right":
                        _this.playerSprite.x += PlayerView.MoveSpeed;
                        if (_this.playerSprite.x % Crimbo.TileSize === 0)
                            _this._moving = null;
                        break;
                    case "left":
                        _this.playerSprite.x -= PlayerView.MoveSpeed;
                        if (_this.playerSprite.x % Crimbo.TileSize === 0)
                            _this._moving = null;
                        break;
                    case "up":
                        _this.playerSprite.y -= PlayerView.MoveSpeed;
                        if (_this.playerSprite.y % Crimbo.TileSize === 0)
                            _this._moving = null;
                        break;
                    case "down":
                        _this.playerSprite.y += PlayerView.MoveSpeed;
                        if (_this.playerSprite.y % Crimbo.TileSize === 0)
                            _this._moving = null;
                }
            };
            this.render = function () {
                _this.game.debug.spriteInfo(_this.playerSprite, 20, 32);
            };
            this.finishedMoving = function () {
                return (_this._moving == null);
            };
            this.game = game;
            this.player = player;
        }
        PlayerView.MoveSpeed = 4;
        return PlayerView;
    })();
    Crimbo.PlayerView = PlayerView;
})(Crimbo || (Crimbo = {}));
