/// <reference path="phaser.d.ts"/>
var CrimboGame = (function () {
    function CrimboGame() {
        var _this = this;
        this.preload = function () {
            _this.game.load.image('mushroom', '/assets/mushroom32x32.png');
            _this.game.load.tilemap('map', 'assets/tilemaps/maps/collision_test.json', null, Phaser.Tilemap.TILED_JSON);
            _this.game.load.image('ground_1x1', 'assets/tilemaps/tiles/ground_1x1.png');
            _this.game.load.image('phaser', 'assets/sprites/phaser-dude.png');
        };
        this.create = function () {
            // set up tilemap
            _this.map = _this.game.add.tilemap('map');
            _this.map.addTilesetImage('ground_1x1');
            _this.layer = _this.map.createLayer('Tile Layer 1');
            _this.layer.debug = true;
            _this.layer.resizeWorld();

            //set up sprite
            _this.sprite = _this.game.add.sprite(32, 32, 'mushroom');
            window.sprite = _this.sprite;
            _this.game.camera.follow(_this.sprite);
        };
        this.setMoving = function () {
            if ((_this.game.input.keyboard.isDown(Phaser.Keyboard.RIGHT)) && (!_this.hasSolidTile(_this.sprite.x + CrimboGame.SpriteSize, _this.sprite.y)))
                _this.moving = "right";

            if ((_this.game.input.keyboard.isDown(Phaser.Keyboard.LEFT)) && (!_this.hasSolidTile(_this.sprite.x - CrimboGame.SpriteSize, _this.sprite.y)))
                _this.moving = "left";

            if ((_this.game.input.keyboard.isDown(Phaser.Keyboard.UP)) && (!_this.hasSolidTile(_this.sprite.x, _this.sprite.y - CrimboGame.SpriteSize)))
                _this.moving = "up";

            if ((_this.game.input.keyboard.isDown(Phaser.Keyboard.DOWN)) && (!_this.hasSolidTile(_this.sprite.x, _this.sprite.y + CrimboGame.SpriteSize)))
                _this.moving = "down";
        };
        this.update = function () {
            if (_this.moving === null) {
                _this.setMoving();
            } else {
                _this.move();
            }
        };
        this.move = function () {
            switch (_this.moving) {
                case "right":
                    _this.sprite.x += CrimboGame.MoveSpeed;
                    if (_this.sprite.x % CrimboGame.SpriteSize === 0)
                        _this.moving = null;
                    break;
                case "left":
                    _this.sprite.x -= CrimboGame.MoveSpeed;
                    if (_this.sprite.x % CrimboGame.SpriteSize === 0)
                        _this.moving = null;
                    break;
                case "up":
                    _this.sprite.y -= CrimboGame.MoveSpeed;
                    if (_this.sprite.y % CrimboGame.SpriteSize === 0)
                        _this.moving = null;
                    break;
                case "down":
                    _this.sprite.y += CrimboGame.MoveSpeed;
                    if (_this.sprite.y % CrimboGame.SpriteSize === 0)
                        _this.moving = null;
            }
        };
        this.hasSolidTile = function (x, y) {
            return (_this.layer.getTiles(x, y, 0, 0)[0].index > 0);
        };
        this.render = function () {
            _this.game.debug.spriteInfo(_this.sprite, 20, 32);
        };
        this.game = new Phaser.Game(800, 600, Phaser.AUTO, 'content', {
            preload: this.preload, create: this.create, update: this.update, render: this.render });
        this.moving = null;
    }
    CrimboGame.MoveSpeed = 4;
    CrimboGame.SpriteSize = 32;
    return CrimboGame;
})();

window.onload = function () {
    window.game = new CrimboGame();
};
