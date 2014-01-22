InputManager = function () {
	this.inputDiv = window;
	this.positionX = -1;
	var that = this;

	this.inputDiv.addEventListener('touchstart', function (touchEvent) {
		var touchobj = touchEvent.changedTouches[0]; // reference first touch point (ie: first finger)
		that.positionX = Math.max(Math.min(parseInt(touchobj.clientX)/window.innerWidth,1),0); // get x position of touch point relative to left edge of browser
		touchEvent.preventDefault();
	}, false);

	this.inputDiv.addEventListener('touchmove', function (touchEvent) {
		var touchobj = touchEvent.changedTouches[0]; // reference first touch point for this event
		that.positionX = Math.max(Math.min(parseInt(touchobj.clientX)/window.innerWidth,1),0);
		touchEvent.preventDefault();
	}, false);

	this.inputDiv.addEventListener('touchend', function (touchEvent) {
		var touchobj = touchEvent.changedTouches[0]; // reference first touch point for this event
		that.positionX = -1;
		touchEvent.preventDefault();
	}, false);
};

InputManager.prototype.getInput = function() {
	return this.positionX;
};