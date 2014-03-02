FDTouchScreen.prototype = new FDInput();

function FDTouchScreen() {
    document.body.addEventListener('touchstart', function() {
        if(this.onTapCallback != undefined) {
            this.onTapCallback();
        }
    }.bind(this), this);
}