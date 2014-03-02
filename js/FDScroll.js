FDScroll.prototype = new FDElement();

function FDScroll(width, height) {
    this.width = width;
    this.height = height;
    this.x = 0;


    this.background = new Image();
    this.background.src = 'img/bg.png';     
    
    this.scale = 1;
    this.scaledWidth = width;
    this.scaledHeight = height;
    this.background.onload = function() {
        this.scale = this.height / this.background.height;
        this.scaledWidth = this.background.width * this.scale;
        this.scaledHeight = this.background.height * this.scale;
    }.bind(this);

}

FDScroll.prototype.update = function() {
    this.x--;

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
