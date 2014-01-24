Eye = function () {

};

Eye.prototype.update = function() {
	this.position = game.inputManager.getInput();
};

Eye.prototype.render = function(canvas) {
	canvas.renderMobileEye(this.position || 0.5);
};