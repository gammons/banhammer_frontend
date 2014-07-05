/// <reference path="phaser.d.ts"/>
/// <reference path="constants.ts"/>
/// <reference path="player.ts"/>
/// <reference path="player_view.ts"/>
/// <reference path="gameinterface.ts"/>
var Crimbo;
(function (Crimbo) {
    (function (OverworldState) {
        OverworldState[OverworldState["Waiting"] = 0] = "Waiting";
        OverworldState[OverworldState["PlayerMove"] = 1] = "PlayerMove";
        OverworldState[OverworldState["MonsterMove"] = 2] = "MonsterMove";
    })(Crimbo.OverworldState || (Crimbo.OverworldState = {}));
    var OverworldState = Crimbo.OverworldState;
    ;

    var Overworld = (function () {
        function Overworld(game) {
            var _this = this;
            this.create = function () {
                _this.map = _this.game.add.tilemap('map');
                _this.map.addTilesetImage('ground_1x1');
                _this.layer = _this.map.createLayer('Tile Layer 1');
                _this.layer.debug = true;
                _this.layer.resizeWorld();
                _this.playerView.create();
            };
            this.update = function (direction) {
                switch (_this.state) {
                    case 0 /* Waiting */:
                        if (direction != null) {
                            if (_this.playerCanMoveTo(direction)) {
                                _this.player.move(direction);
                                _this.playerView.setDirection(direction);
                            }
                            _this.state = 1 /* PlayerMove */;
                        }
                        break;
                    case 1 /* PlayerMove */:
                        _this.playerView.update();
                        if (_this.playerView.finishedMoving()) {
                            _this.state = 2 /* MonsterMove */;
                        }
                        break;
                    case 2 /* MonsterMove */:
                }
            };
            this.render = function () {
                _this.playerView.render();
            };
            this.playerCanMoveTo = function (direction) {
                switch (direction) {
                    case "right":
                        !_this.hasSolidTile((_this.player.x + 1) * Crimbo.TileSize, _this.player.y);
                        break;
                }
            };
            this.hasSolidTile = function (x, y) {
                return (_this.layer.getTiles(x, y, 0, 0)[0].index > 0);
            };
            this.game = game;
            this.player = new Crimbo.Player();
            this.playerView = new Crimbo.PlayerView(this.game, this.player);
        }
        return Overworld;
    })();
    Crimbo.Overworld = Overworld;
})(Crimbo || (Crimbo = {}));
