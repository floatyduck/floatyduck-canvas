FDDuck.prototype = new FDElement();

function FDDuck() {
    this.IMAGE = 'img/duck.png';
    this.LIMIT_Y = 23;
    this.BOUYANCY = -0.4;
    this.FLAP_POWER = 8;

    this.x = 0;
    this.y = 0;
    this.scale = 1;
    this.scaledWidth = 0;
    this.scaledHeight = 0;

    this.velocity = 0;

    this.img = new Image();
    this.img.src = this.IMAGE;
    this.img.onload = function() {
        this.scaledWidth = this.img.width * this.scale;
        this.scaledHeight = this.img.height * this.scale;
    }.bind(this);
}

FDDuck.prototype.setPos = function(x, y) {
    this.x = x;
    this.y = y;
}

FDDuck.prototype.setScale = function(scale) {
    this.scale = scale;
    this.scaledWidth = this.img.width * scale;
    this.scaledHeight = this.img.height * scale;
}

FDDuck.prototype.flap = function() {
    this.velocity = this.FLAP_POWER;
}

FDDuck.prototype.update = function() {
    this.velocity += this.BOUYANCY;
    this.y = Math.max(this.y + this.velocity, this.LIMIT_Y);
}

FDDuck.prototype.render = function(ctx) {
    var left = this.x - (this.scaledWidth / 2);
    var top = this.y - (this.scaledHeight / 2);
    ctx.drawImage(this.img, left, top, this.scaledWidth, this.scaledHeight);
}