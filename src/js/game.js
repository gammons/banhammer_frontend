/// <reference path="phaser.d.ts"/>
var CrimboGame = (function () {
    function CrimboGame() {
        this.game = new Phaser.Game(800, 600, Phaser.AUTO, 'content', {
            preload: this.preload, create: this.create, update: this.update, render: this.render });
    }
    CrimboGame.prototype.preload = function () {
        this.game.load.image('mushroom', '/assets/mushroom32x32.png');
        this.game.load.tilemap('map', 'assets/tilemaps/maps/collision_test.json', null, Phaser.Tilemap.TILED_JSON);
        this.game.load.image('ground_1x1', 'assets/tilemaps/tiles/ground_1x1.png');
        this.game.load.image('phaser', 'assets/sprites/phaser-dude.png');
    };

    CrimboGame.prototype.create = function () {
        // set up tilemap
        var map = this.game.add.tilemap('map');
        map.addTilesetImage('ground_1x1');
        var layer = map.createLayer('Tile Layer 1');
        layer.resizeWorld();

        //set up sprite
        this.sprite = this.game.add.sprite(32, 32, 'mushroom');
        this.game.camera.follow(this.sprite);
    };

    CrimboGame.prototype.update = function () {
        if (this.game.input.keyboard.isDown(Phaser.Keyboard.LEFT)) {
            this.sprite.x = this.sprite.x - +32;
        } else if (this.game.input.keyboard.isDown(Phaser.Keyboard.RIGHT)) {
            this.sprite.x += 32;
        }

        if (this.game.input.keyboard.isDown(Phaser.Keyboard.UP)) {
            this.sprite.y -= 32;
        } else if (this.game.input.keyboard.isDown(Phaser.Keyboard.DOWN)) {
            this.sprite.y += 32;
        } else if (this.game.input.keyboard.isDown(69)) {
        }
    };
    CrimboGame.prototype.render = function () {
        //this.game.debug.cameraInfo(this.game.camera, 32, 32);
        this.game.debug.spriteInfo(this.sprite, 20, 32);
    };
    return CrimboGame;
})();

window.onload = function () {
    var game = new CrimboGame();
};
