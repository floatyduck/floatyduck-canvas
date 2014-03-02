FDObstacle.prototype = new FDElement();

function FDObstacle() {
    this.x = 0;
    this.y = 0;
}

FDObstacle.prototype.setPos = function(x, y) {
    this.x = x;
    this.y = y;
}

FDObstacle.prototype.render = function(ctx) {
    // TODO
}