function FDInput() {
    this.onTapCallback = undefined;
}

FDInput.prototype.onTap = function(callback) {
    this.onTapCallback = callback;
}