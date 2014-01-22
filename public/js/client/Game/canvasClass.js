Canvas = function(width, height, idCanvas) {
	this.width = width;
	this.height = height;
	if (idCanvas) {
		this.idCanvas = idCanvas;
		this.element = document.getElementById(idCanvas);
	} else {
		this.element = document.createElement('canvas');
	}

	this.context = this.element.getContext('2d');

	this.element.width = this.width;
	this.element.height = this.height;
};

Canvas.prototype.clearCanvas = function() {
	this.element.width = this.element.width;
};

Canvas.prototype.drawBox = function(x, y, deltaX, deltaY) {
	var ctx = this.context;
	ctx.strokeStyle = 'green';
	ctx.beginPath();
	ctx.rect(x, y, deltaX, deltaY);
	ctx.stroke();
};

Canvas.prototype.drawCircle = function(x, y, size) {
	var ctx = this.context;
	ctx.strokeStyle = 'green';
	ctx.beginPath();
	ctx.arc(x, y, size, 0, 2 * Math.PI);
	ctx.lineWidth = 3;
	ctx.stroke();
};

Canvas.prototype.drawImg = function(img, x, y, width, height, deltax, deltaY) {
	var ctx = this.context;
	ctx.drawImage(img, deltax, deltaY, width, height, (x - width / 2), (y - height / 2), width, height);
};

Canvas.prototype.renderPlayer = function(player) {
	var dst = 600;
	this.drawCircle(100 + dst*player.position,400, 10);
};

Canvas.prototype.drawText = function(text, position, size, color) {
	var ctx = this.context;
	ctx.fillStyle = color;
	ctx.font = size + "px Arial";
	ctx.textAlign = 'center';
	ctx.fillText(text, position.x, position.y);
}