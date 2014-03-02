FDDuck.prototype = new FDElement();

function FDDuck(x, y) {
    this.LIMIT_Y = 23;
    this.BOUYANCY = -0.4;
    this.FLAP_POWER = 8;

    this.x = x;
    this.y = y;

    this.velocity = 0;

    this.img = new Image();
    this.img.src = 'img/duck.png';
}

FDDuck.prototype.flap = function() {
    this.velocity = this.FLAP_POWER;
}

FDDuck.prototype.update = function() {
    this.velocity += this.BOUYANCY;
    this.y = Math.max(this.y + this.velocity, this.LIMIT_Y);
}

FDDuck.prototype.render = function(ctx) {
    var top = this.y - (this.img.height / 2);
    var left = this.x - (this.img.width / 2);
    ctx.drawImage(this.img, left, top);
}