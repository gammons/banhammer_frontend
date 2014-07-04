var Crimbo;
(function (Crimbo) {
    var Overworld = (function () {
        function Overworld(game) {
            var _this = this;
            this.create = function () {
                _this.map = _this.game.add.tilemap('map');
                _this.map.addTilesetImage('ground_1x1');
                _this.layer = _this.map.createLayer('Tile Layer 1');
                _this.layer.debug = true;
                _this.layer.resizeWorld();
            };
            this.update = function () {
                if (_this.moving === null) {
                    _this.setMoving();
                } else {
                    _this.move();
                }
            };
            this.game = game;
            this.moving = null;
        }
        return Overworld;
    })();
    Crimbo.Overworld = Overworld;
})(Crimbo || (Crimbo = {}));
