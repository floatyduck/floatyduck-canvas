FDObstacle.prototype = new FDElement();

function FDObstacle() {
    this.IMAGE = 'img/weed.png';
    this.OBSTACLE_WIDTH = 34;

    this.scale = 1;
    this.scaledWidth = this.OBSTACLE_WIDTH;
    this.height = 0;
    this.x = 0;
    this.y = 0;

    this.img = new Image();
}

FDObstacle.prototype.init = function() {
    this.img.src = this.IMAGE;
}

FDObstacle.prototype.setPos = function(x, y) {
    this.x = x;
    this.y = y;
}

FDObstacle.prototype.setScale = function(scale) {
    this.scale = scale;
    this.scaledWidth = this.OBSTACLE_WIDTH * scale;
}

FDObstacle.prototype.setHeight = function(height) {
    this.height = height;
}

FDObstacle.prototype.update = function() {
    this.x--;
}

FDObstacle.prototype.render = function(ctx) {

    var scaledHeight = this.img.height * this.scale;

    if(scaledHeight == 0) {
        return;
    }

    var endY = this.y + this.height;
    var curY = this.y;
    while(curY + scaledHeight <= endY) {
        ctx.drawImage(this.img, this.x, curY, this.scaledWidth, scaledHeight);
        curY += scaledHeight;
    }
    // Clip the last one
    var remY = endY - curY;
    if(remY > 0) {
        ctx.drawImage(this.img, 0, 0, this.img.width, remY, this.x, curY, this.scaledWidth, remY);
    }
}