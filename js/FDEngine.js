function FDEngine(canvas) {
    this.UPDATES_PER_SECOND = 60;
    if(isMobile()) {
        this.PLATFORM = 'phone'; // Alternatives: 'browser', 'phone'   
    } else {
        this.PLATFORM = 'browser'; // Alternatives: 'browser', 'phone'
    }
    this.BASE_HEIGHT = 480;

    this.canvas = canvas;
    this.canvas.width = window.innerWidth;
    this.canvas.height = window.innerHeight;
    this.context = this.canvas.getContext('2d');
    this.scale = window.innerHeight / this.BASE_HEIGHT;

    this.elems = [];

    this.Scroll = new FDScroll();
    this.elems.push(this.Scroll);

    this.Duck = new FDDuck();
    this.elems.push(this.Duck);

    switch(this.PLATFORM) {
        case 'phone': this.Input = new FDTouchScreen(); break;
        default: this.Input = new FDKeyboard();
    }
}

// Start the run loop
FDEngine.prototype.run = function() {
    this.init();
    var updateEvery = 1000 / this.UPDATES_PER_SECOND;
    this.intervalId = setInterval(function() {
        this.update();
        // this.render();
    }.bind(this), updateEvery);

    this.animloop = function(){
        requestAnimFrame(this.animloop);
        this.render();
    }.bind(this);
    this.animloop();
}

FDEngine.prototype.init = function() {
    this.Scroll.setCanvasSize(this.canvas.width, this.canvas.height);

    this.Duck.setScale(this.scale);
    // Center the duck to start
    var centerX = this.canvas.width / 2;
    var centerY = this.canvas.height / 2;
    this.Duck.setPos(centerX, centerY);

    this.Input.onTap(function() {
        this.Duck.flap();
    }.bind(this));

    this.elems.forEach(function(elem) {
        elem.init();
    }.bind(this));
}

FDEngine.prototype.update = function() {
    this.elems.forEach(function(elem) {
        elem.update();
    }.bind(this));
}

FDEngine.prototype.render = function() {
    // Clear canvas for redraw
    this.context.clearRect(0, 0, this.canvas.width, this.canvas.height);

    this.elems.forEach(function(elem) {
        elem.render(this.context);
    }.bind(this));
}

/**** Helper Functions ****/
// shim layer with setTimeout fallback
window.requestAnimFrame = (function(){
  return  window.requestAnimationFrame       ||
          window.webkitRequestAnimationFrame ||
          window.mozRequestAnimationFrame    ||
          function( callback ){
            window.setTimeout(callback, 1000 / 60);
          };
})();

function isMobile() {
    return /Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(navigator.userAgent)
}