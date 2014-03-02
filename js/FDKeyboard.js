FDKeyboard.prototype = new FDInput();

function FDKeyboard() {
    document.body.onkeydown = function(e) {
        switch(e.keyCode) {
            case 40: 
            {
                if(this.onTapCallback != undefined) {
                    this.onTapCallback();
                }
                break;
            }
        }
    }.bind(this);
}