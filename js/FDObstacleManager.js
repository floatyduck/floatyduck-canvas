FDObstacleManager.prototype = new FDElement();

function FDObstacleManager() {
    this.OBSTACLE_RATE = 240; // Every four seconds
    this.GAP_SIZE = 130;

    this.scale = 1;
    this.scaledObstacleRate = this.OBSTACLE_RATE;
    this.scaledGapSize = this.GAP_SIZE;
    this.canvasWidth = 0;
    this.canvasHeight = 0;

    this.obstacles = [];
    this.lastObstacle = 20000;
}

FDObstacleManager.prototype.setCanvasSize = function(width, height) {
    this.canvasWidth = width;
    this.canvasHeight = height;
}

FDObstacleManager.prototype.setScale = function(scale) {
    this.scale = scale;
    this.scaledObstacleRate = this.OBSTACLE_RATE * scale;
    this.scaledGapSize = this.GAP_SIZE * scale;
}

FDObstacleManager.prototype.addObstacle = function() {
    var startX = this.canvasWidth;
    var gapStart = Math.floor(Math.random() * (this.canvasHeight - this.scaledGapSize));
    var gapEnd = gapStart + this.scaledGapSize;

    var topObstacle = new FDObstacle();
    topObstacle.setScale(this.scale);
    topObstacle.setPos(startX, 0);
    topObstacle.setHeight(gapStart);

    var bottomObstacle = new FDObstacle();
    bottomObstacle.setScale(this.scale);
    bottomObstacle.setPos(startX, gapEnd);
    bottomObstacle.setHeight(this.canvasHeight - gapEnd);

    this.obstacles.push(topObstacle);
    this.obstacles.push(bottomObstacle);

    topObstacle.init();
    bottomObstacle.init();
}

FDObstacleManager.prototype.update = function() {
    this.lastObstacle++;

    if(this.lastObstacle >= this.OBSTACLE_RATE) {
        this.addObstacle();
        this.lastObstacle = 0;
    }

    this.obstacles.forEach(function(obstacle) {
        obstacle.update();
    });
}

FDObstacleManager.prototype.render = function(ctx) {
    this.obstacles.forEach(function(ctx, obstacle) {
        obstacle.render(ctx);
    }.bind(this, ctx));
}