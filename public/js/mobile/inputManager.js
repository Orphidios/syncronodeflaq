InputManager = function () {
	this.inputDiv = window;
	this.positionX = 0;
	var screenCenter = window.innerWidth/2;	
	var that = this;

	this.inputDiv.addEventListener('touchstart', function (touchEvent) {
		var touchobj = touchEvent.changedTouches[0]; // reference first touch point (ie: first finger)
		that.positionX = (parseInt(touchobj.clientX)-screenCenter)/(2*screenCenter); // get x position of touch point relative to left edge of browser
		touchEvent.preventDefault();
	}, false);

	this.inputDiv.addEventListener('touchmove', function (touchEvent) {
		var touchobj = touchEvent.changedTouches[0]; // reference first touch point for this event
		that.positionX = (parseInt(touchobj.clientX)-screenCenter)/(2*screenCenter);
		touchEvent.preventDefault();
	}, false);

	this.inputDiv.addEventListener('touchend', function (touchEvent) {
		var touchobj = touchEvent.changedTouches[0]; // reference first touch point for this event
		that.positionX = 0;
		touchEvent.preventDefault();
	}, false);
};

InputManager.prototype.getInput = function() {
	return -Math.max(Math.min(this.positionX, 0.5), -0.5);
};