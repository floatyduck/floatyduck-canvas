FDScroll.prototype = new FDElement();

function FDScroll() {
    this.IMAGE = 'img/bg.png';

    this.width = 300;
    this.height = 600;
    this.x = 0;

    this.background = new Image();
    this.background.src = this.IMAGE;     
    
    this.scale = 1;
    this.scaledWidth = this.width;
    this.scaledHeight = this.height;
}

FDScroll.prototype.setCanvasSize = function(width, height) {
    this.width = width;
    this.height = height;

    this.background.onload = function() {
        this.scale = this.height / this.background.height;
        this.scaledWidth = this.background.width * this.scale;
        this.scaledHeight = this.background.height * this.scale;
    }.bind(this);
}

FDScroll.prototype.update = function() {
    this.x -= this.scale;

    if(Math.abs(this.x) > this.scaledWidth) {
        this.x = 0;
    }
}

FDScroll.prototype.render = function(ctx) {
    // This while is used to tile the background
    var drawn = this.x;
    while(drawn < this.width) {
        ctx.drawImage(this.background, drawn, 0, this.scaledWidth, this.scaledHeight);
        drawn += this.scaledWidth;
    }
    
}

