FDObstacleManager.prototype = new FDElement();

function FDObstacleManager() {
    this.OBSTACLE_RATE = 2 * FDEngine.UPDATES_PER_SECOND; // Every two seconds

    this.obstacles = [];

    this.lastObstacle = 0;
}

FDObstacleManager.prototype.addObstacle = function() {
    var topObstacle = new FDObstacle();
    var bottomObstacle = new FDObstacle();
    // TODO: obstacle.setPos(x, y)

    this.obstacles.push(topObstacle);
    this.obstacles.push(bottomObstacle);
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