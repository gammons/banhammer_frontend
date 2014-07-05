/// <reference path="phaser.d.ts"/>
/// <reference path="constants.ts"/>
var Crimbo;
(function (Crimbo) {
    var Player = (function () {
        function Player() {
            var _this = this;
            this.move = function (direction) {
                switch (direction) {
                    case "left":
                        _this.x -= 1;
                    case "right":
                        _this.x += 1;
                    case "up":
                        _this.y -= 1;
                    case "down":
                        _this.y += 1;
                }
            };
        }
        return Player;
    })();
    Crimbo.Player = Player;
})(Crimbo || (Crimbo = {}));
