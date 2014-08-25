/// <reference path="../framework/constants"/>
/// <reference path="../framework/overworld"/>
/// <reference path="../framework/game"/>
/// <reference path="player_view"/>
/// <reference path="monster_view"/>
/// <reference path="item_view"/>
module Crimbo {
  export var LightRadius = 200;

  export class OverworldView {

    gameModel: Crimbo.Game;
    game: Phaser.Game;
    player: Crimbo.Player;
    map: Phaser.Tilemap;
    layer: Phaser.TilemapLayer;
    entityViews: Crimbo.EntityView[];
    playerView: Crimbo.EntityView;
    private _shadowTexture:  Phaser.BitmapData;
    private _coneTexture:  Phaser.BitmapData;
    private _lightSprite:  Phaser.Sprite;
    private _points: Phaser.Point[];
    pressedKey: number;


    constructor(game: Phaser.Game, gameModel: Crimbo.Game, player: Crimbo.Player) {
      this.game = game;
      this.gameModel = gameModel;
      this.entityViews = [];
      this.player = player;
      this.playerView = new Crimbo.PlayerView(this.game, player);
      this.entityViews.push(this.playerView);
      this.createMonsterViews();
      this.createItemViews();
    }

    preload = () => {
      this.game.load.tilemap('map', this.gameModel.getGameData()['map'], null, Phaser.Tilemap.TILED_JSON);
      this.game.load.image('ground_1x1', 'assets/tilemaps/tiles/ground_1x1.png');
      _.each(this.entityViews, (entityView) => { entityView.preload(); });
    }

    createMonsterViews = () => {
      _.each(this.gameModel.getOverworld().getMonsters(), (monster) => {
        this.entityViews.push(new Crimbo.MonsterView(this.game, monster));
      });
    }

    createItemViews = () => {
      _.each(this.gameModel.getOverworld().getItems(), (i) => {
        this.entityViews.push(new Crimbo.ItemView(this.game, i));
      });
    }

    create = () => {
      this.map = this.game.add.tilemap('map');
      this.map.addTilesetImage('ground_1x1');
      this.layer =  this.map.createLayer('Tile Layer 1');
      this.layer.debug = true;
      this.layer.resizeWorld();
      _.each(this.entityViews, (entityView) => { entityView.create(); });
      this._shadowTexture = this.game.add.bitmapData(Crimbo.TileSize * this.gameModel.getOverworld().mapLengthX(),
          Crimbo.TileSize * this.gameModel.getOverworld().mapLengthY());
      this._coneTexture = this.game.add.bitmapData(Crimbo.TileSize * this.gameModel.getOverworld().mapLengthX(),
          Crimbo.TileSize * this.gameModel.getOverworld().mapLengthY());
      this._lightSprite = this.game.add.sprite(0,0,this._shadowTexture);
      this._lightSprite.blendMode = Phaser['blendModes'].MULTIPLY;

      var lightBitmap = this.game.add.image(0,0, this._coneTexture);
      lightBitmap.blendMode = Phaser['blendModes'].MULTIPLY;
      //this.createFogTiles();
    }

    createFogTiles() {
      _.times(this.gameModel.getOverworld().mapLengthY(), (y) => {
        _.times(this.gameModel.getOverworld().mapLengthX(), (x) => {
          // this._bmd.context.fillStyle = 'rgba(0, 0, 0, 1.0)';
          // this._bmd.context.fillRect(Crimbo.TileSize * x, Crimbo.TileSize * y, 32, 32);
        });
      });
    }

    randColor() {
      var colors = [];
      colors.push(Utility.randInt(100).toString());
      colors.push(Utility.randInt(100).toString());
      colors.push(Utility.randInt(100).toString());
      return "rgba("+colors.join(",")+", 0.5)"
    }

    update() {
      _.each(this.entityViews, (entityView) => { entityView.update(); });
    }

    // updateShadowTexture() {
    //   this._shadowTexture.context.fillStyle = 'rgb(0, 0, 0)';
    //   this._shadowTexture.context.fillRect(0, 0, this.game.width, this.game.height);
    //   var gradient = this._shadowTexture.context.createRadialGradient(
    //     this.player.x * Crimbo.TileSize,
    //     this.player.y * Crimbo.TileSize,
    //     LightRadius * 0.25,
    //     this.player.x * Crimbo.TileSize,
    //     this.player.y * Crimbo.TileSize,
    //     LightRadius);
    //   gradient.addColorStop(0, 'rgba(255, 255, 255, 1.0)');
    //   gradient.addColorStop(1, 'rgba(255, 255, 255, 0.0)');
    //   this._shadowTexture.context.beginPath();
    //   this._shadowTexture.context.fillStyle = gradient;
    //   this._shadowTexture.context.arc(this.player.x * Crimbo.TileSize,
    //       this.player.y * Crimbo.TileSize,
    //       LightRadius, 0, Math.PI*2);
    //   this._shadowTexture.context.fill();
    //   this._shadowTexture.dirty = true;
    // }

    raycastLights() {
      var closestPoints = [];
      var a = 0;
      var visibleTiles = this.getVisibleTiles();
      var playerX = this.playerView.sprite.x + (Crimbo.TileSize / 2);
      var playerY = this.playerView.sprite.y + (Crimbo.TileSize / 2);


      _.each(this._points, (point) => {
        var ray = new Phaser.Line( playerX, playerY, point.x, point.y);


        //console.log("drawing ray");
        // Check if the ray intersected any walls
        var intersect = this.getWallIntersection(ray, visibleTiles);

        // Save the intersection or the end of the ray
        if (intersect) {
          closestPoints.push(intersect);
        } else {
          closestPoints.push(ray.end);
        }
      });

      // this._coneTexture.context.beginPath();
      // this._coneTexture.context.fillStyle = 'rgb(0, 0, 255)';
      // this._coneTexture.context.moveTo(playerX, playerY);
      for(var i = 0; i < closestPoints.length; i++) {
        this.game.debug.geom(new Phaser.Line(playerX, playerY, closestPoints[i].x, closestPoints[i].y));
        //this._coneTexture.context.lineTo(closestPoints[i].x, closestPoints[i].y);
      }
      // this._coneTexture.context.closePath();
      // this._coneTexture.context.fill();
      // this._coneTexture.dirty = true;
    }

    getCenterCoordsOf(num: number) {
      return (num + 1) * Crimbo.TileSize - (Crimbo.TileSize / 2);
    }

    getWallIntersection(ray: Phaser.Line, visibleTiles: Object[]) {
      //visibleTiles = [{x: 3, y: 3}];
      var distanceToWall = Number.POSITIVE_INFINITY;
      var closestIntersection = null;

      // For each of the walls...
      _.each(visibleTiles, (wall) => {
        // Create an array of lines that represent the four edges of each wall
        var wallX = wall['x'] * Crimbo.TileSize;
        var wallY = wall['y'] * Crimbo.TileSize;
        var lines = [
          new Phaser.Line(wallX, wallY, wallX + Crimbo.TileSize, wallY),  // top wall
          new Phaser.Line(wallX, wallY, wallX, wallY + Crimbo.TileSize),  // left wall
          new Phaser.Line(wallX + Crimbo.TileSize, wallY, wallX + Crimbo.TileSize, wallY + Crimbo.TileSize), // right wall
          new Phaser.Line(wallX, wallY + Crimbo.TileSize, wallX + Crimbo.TileSize, wallY + Crimbo.TileSize) // bottom wall
        ];

        // Test each of the edges in this wall against the ray.
        // If the ray intersects any of the edges then the wall must be in the way.
        _.each(lines, (line) => {
          var intersect = Phaser.Line.intersects(line, ray);
          if (intersect) {
            // Find the closest intersection
            var distance = this.game.math['distance'](ray.start.x, ray.start.y, intersect.x, intersect.y);
            // if (isInteresting)
            //   console.log("distance is ", distance);
            if (distance < distanceToWall) {
              distanceToWall = distance;
              closestIntersection = intersect;
            }
          } else {
            //this.game.debug.geom(line, "#ff0000");
          }
        });
        // if (isInteresting)
        //   console.log("The closest intersection is ", closestIntersection);
      });
      return closestIntersection;
    }
//
    getVisibleTiles() {
      var lengthX = this.gameModel.getOverworld().mapLengthX();
      var lengthY = this.gameModel.getOverworld().mapLengthY();

      var allTiles = (x: number, y: number)  => {
        if ((x > 0) && (y > 0) && (x <= lengthX - 1) && (y <= lengthY - 1)) {
          return true;
          return !this.gameModel.getOverworld().hasSolidTile(x,y);
        } else {
          return false;
        }
      }

      // compute the tiles that we should have clear
      var fov = new ROT.FOV.PreciseShadowcasting(allTiles, {});
      var tiles = [];
      fov.compute(this.player.x, this.player.y, 5, (x, y, r, visibility) => {
        if ((x > 0) && (y > 0) && (x < lengthX - 1) && (y < lengthY - 1)) {
          if (this.gameModel.getOverworld().hasSolidTile(x,y)) {
            tiles.push({x: x, y: y, r: r});
          }
        }
      });
      return _.sortBy(tiles, (tile) => { return tile.r; });
    }

//     updateFogOfWar() {
//       // fill in all the other rectangles that should not be clear
//       _.times(this.gameModel.getOverworld().mapLengthY(), (y) => {
//         _.times(this.gameModel.getOverworld().mapLengthX(), (x) => {
//
//           var clear = _.find(clearTiles, (tile) => { return (tile.x == x) && (tile.y == y) });
//           if (!clear) {
//             // this._bmd.context.fillStyle = 'rgba(0, 0, 0, 1.0)';
//             // this._bmd.context.fillRect(Crimbo.TileSize * x, Crimbo.TileSize * y, 32, 32);
//           } else {
//             // clear out the rectangle
//             // var alpha = ((clear.r + 2) * 2) / (DrawDistance * 2);
//             // this._bmd.context.fillStyle = "rgba(0, 0, 0," + alpha + ")";
//             // this._bmd.context.clearRect(Crimbo.TileSize * x, Crimbo.TileSize * y, 32, 32);
//             // this._bmd.context.fillRect(Crimbo.TileSize * x, Crimbo.TileSize * y, 32, 32);
//
//           }
//         });
//       });
//     }

    getPoints() {
      var points = [];
      _.each(this.getVisibleTiles(), (tile) => {
        points.push(new Phaser.Point(tile.x * Crimbo.TileSize, tile.y * Crimbo.TileSize));
        points.push(new Phaser.Point((tile.x + 1) * Crimbo.TileSize, tile.y * Crimbo.TileSize));
        points.push(new Phaser.Point((tile.x) * Crimbo.TileSize, (tile.y + 1) * Crimbo.TileSize));
        points.push(new Phaser.Point((tile.x + 1) * Crimbo.TileSize, (tile.y + 1) * Crimbo.TileSize));
      });

      this.addBoundingBox(points);

      return points;
    }

    addBoundingBox(points: Phaser.Point[]) {
      var playerX = this.playerView.sprite.x + (Crimbo.TileSize / 2);
      var playerY = this.playerView.sprite.y + (Crimbo.TileSize / 2);

      // add 4 points around Player
      var leftX = (playerX < LightRadius) ? 0 : (playerX - LightRadius);
      var mapWidth = this.gameModel.getOverworld().mapLengthX() * Crimbo.TileSize;
      var rightX = (playerX + LightRadius > mapWidth) ? mapWidth : (playerX + LightRadius);

      var topY = (playerY < LightRadius) ? 0 : (playerY - LightRadius);
      var mapHeight = this.gameModel.getOverworld().mapLengthY() * Crimbo.TileSize;
      var bottomY = (playerY + LightRadius > mapHeight) ? mapHeight : (playerY + LightRadius);
      console.log(leftX,rightX,topY,bottomY);
      points.push(new Phaser.Point(leftX, topY));
      points.push(new Phaser.Point(rightX, topY));
      points.push(new Phaser.Point(leftX, bottomY));
      points.push(new Phaser.Point(rightX, bottomY));

      this.game.debug.geom(new Phaser.Line(leftX, topY, rightX, topY));
      this.game.debug.geom(new Phaser.Line(leftX, topY, leftX, bottomY));
      this.game.debug.geom(new Phaser.Line(leftX, bottomY, rightX, bottomY));
      this.game.debug.geom(new Phaser.Line(rightX, topY, rightX, bottomY));

    }

    // this won't work
//     getClosestTiles() {
//       // draw a line to the center of the tiles nearest to me
//       // if that line intersects with the wall of another tile, discard it.  
//       // if that line only intersects one tile, then we know it is facing the player
//      var playerX = this.playerView.sprite.x + (Crimbo.TileSize / 2);
//      var playerY = this.playerView.sprite.y + (Crimbo.TileSize / 2);
//       _.each(this.getVisibleTiles(), (tile) => {
//         // draw a ray to the middle of the tile
//         var tileX = this.getCenterCoordsOf(tile.x);
//         var tileY = this.getCenterCoordsOf(tile.y);
//         var line = new Phaser.Line(playerX, playerY, tileX, tileY);
//         this.game.debug.geom(line);
//       });
//
//     }

//     getClosestWallFaces() {
//       var playerX = this.playerView.sprite.x + (Crimbo.TileSize / 2);
//       var playerY = this.playerView.sprite.y + (Crimbo.TileSize / 2);
//       var walls = [];
//       _.each(this.getVisibleTiles(), (tile) => {
//         var tileX = tile.x * Crimbo.TileSize;
//         var tileY = tile.y * Crimbo.TileSize;
//         walls.push(new Phaser.Line(tileX, tileY, tileX, tileY + Crimbo.TileSize)); // left wall
//         walls.push(new Phaser.Line(tileX, tileY, tileX + Crimbo.TileSize, tileY)); // top wall
//         walls.push(new Phaser.Line(tileX, tileY + Crimbo.TileSize, tileX + Crimbo.TileSize, tileY + Crimbo.TileSize)); // bottom wall
//         walls.push(new Phaser.Line(tileX + Crimbo.TileSize, tileY, tileX + Crimbo.TileSize, tileY + Crimbo.TileSize)); // right wall
//       });
//
//       // now that we have our walls, we can cast 2 rays to each wall.  if we have an intersection, then discard this
//       // wall.
//       console.log("walls length = ", walls.length);
//       var wallsWithoutIntersection;
//       _.each(walls, (wall) => {
//         var nonIntersectingWalls = this.nonIntersectingWalls(playerX, playerY, walls, wall);
//         console.log("non intersecting walls length is", nonIntersectingWalls.length);
//         // if (this.anyWallsDoNotIntersect(playerX, playerY, walls, wall)) {
//         //   wallsWithoutIntersection.push(wall);
//         // }
//       });
//       //console.log("walls without intersection length = ", wallsWithoutIntersection.length);
//       //return wallsWithoutIntersection;
//     }
//
//     nonIntersectingWalls(playerX: number, playerY: number, walls: Phaser.Line[], wall: Phaser.Line) {
//       var nonIntersectingWalls = [];
//
//       _.each(walls, (compareWall) => {
//         var firstLine = new Phaser.Line(playerX, playerY, wall.start.x, wall.start.y);
//         var secondLine = new Phaser.Line(playerX, playerY, wall.end.x, wall.end.y);
//         var intersects1 = Phaser.Line.intersects(firstLine, compareWall);
//         this.game.debug.geom(firstLine, "#0000FF");
//         this.game.debug.geom(secondLine, "#FF0000");
//         this.game.debug.geom(wall, "#00FF00");
//         var intersects2 = Phaser.Line.intersects(secondLine, compareWall);
//         if ((intersects1 == null) && (intersects2 == null)) {
//           nonIntersectingWalls.push(compareWall);
//         }
//       });
//
//       return nonIntersectingWalls;
//     }

    doIt() {
      // get all segments for viewing area
      // shoot a ray at each angle
      // calculate the closest segment for that angle
    }

    turnComplete() {
      _.each(this.entityViews, (entityView) => { entityView.turnComplete(); });
      this.expireViews();
      this._points = this.getPoints();
      this.raycastLights();
      
      //this.getClosestWallFaces();
      //this.updateShadowTexture();
      //this.updateFogOfWar();
    }

    expireViews = () => {
      _.each(this.entityViews, (entityView) => { entityView.expire(); });
      this.entityViews = _.reject(this.entityViews, (entityView) => { return entityView.isExpired() });
    }

    render = () => { }

  }
}

