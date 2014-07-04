/// <reference path="phaser.d.ts"/>
var CrimboGame = (function () {
    function CrimboGame() {
        this.game = new Phaser.Game(800, 600, Phaser.AUTO, 'content', { preload: this.preload, create: this.create, update: this.update });
    }
    CrimboGame.prototype.preload = function () {
        this.game.load.image('mushroom', '/assets/mushroom2.png');
    };

    CrimboGame.prototype.create = function () {
        this.game.physics.startSystem(Phaser.Physics.P2JS);

        //this.game.physics.p2.defaultRestitution = 0.8;
        this.sprite = this.game.add.sprite(0, 0, 'mushroom');
        this.game.physics.p2.enable(this.sprite);
        this.cursors = this.game.input.keyboard.createCursorKeys();
        this.game.add.tween(this.sprite).to({ y: 400 }, 3000, Phaser.Easing.Cubic.InOut, true, 0, Number.MAX_VALUE, true);
    };

    CrimboGame.prototype.update = function () {
        if (this.game.input.keyboard.isDown(Phaser.Keyboard.LEFT)) {
            this.sprite.body.moveLeft(400);
        } else if (this.game.input.keyboard.isDown(Phaser.Keyboard.RIGHT)) {
            this.sprite.body.moveRight(400);
        }

        if (this.game.input.keyboard.isDown(Phaser.Keyboard.UP)) {
            this.sprite.body.moveUp(400);
        } else if (this.game.input.keyboard.isDown(Phaser.Keyboard.DOWN)) {
            this.sprite.body.moveDown(400);
        } else if (this.game.input.keyboard.isDown(69)) {
        }
    };
    return CrimboGame;
})();

window.onload = function () {
    var game = new CrimboGame();
};
