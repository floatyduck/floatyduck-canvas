function FDEngine(canvas) {
    this.UPDATES_PER_SECOND = 60;
    this.PLATFORM = 'phone'; // Alternatives: 'browser', 'phone'

    this.canvas = canvas;
    this.canvas.width = window.innerWidth;
    this.canvas.height = window.innerHeight;
    this.context = this.canvas.getContext('2d');

    this.elems = [];

    this.Scroll = new FDScroll(this.canvas.width, this.canvas.height);
    this.elems.push(this.Scroll);

    // Center the duck to start
    var centerX = this.canvas.width / 2;
    var centerY = this.canvas.height / 2;
    this.Duck = new FDDuck(centerX, centerY);
    this.elems.push(this.Duck);

    switch(this.PLATFORM) {
        case 'phone':
        {
            this.Input = new FDTouchScreen();
            break;
        }
        default: 
        {
            this.Input = new FDKeyboard();
        }
    }
    this.Input.onTap(function() {
        this.Duck.flap();
    }.bind(this));
}

// Start the run loop
FDEngine.prototype.run = function() {
    var updateEvery = 1000 / this.UPDATES_PER_SECOND;
    this.intervalId = setInterval(function() {
        this.update();
        this.render();
    }.bind(this), updateEvery);
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