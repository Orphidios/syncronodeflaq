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
	// this.element.width = this.element.width;
	var ctx = this.context;
	ctx.globalAlpha = 1;
	this.drawBox(0,0,800,600);
	ctx.globalAlpha = 1;
};

Canvas.prototype.drawBox = function(x, y, deltaX, deltaY, color) {
	var ctx = this.context;
	ctx.fillStyle = color || 'white';
	ctx.beginPath();
	ctx.rect(x, y, deltaX, deltaY);
	ctx.fill();
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

Canvas.prototype.renderRay = function(player) {
	var dst = 800;
	this.drawCircle(dst*player.position,550, 40);
	var ctx = this.context;
	ctx.beginPath();
	ctx.moveTo(400, 50);
	ctx.lineTo(dst*player.position,550);
	ctx.strokeStyle = 'black';
	ctx.lineWidth = 10;
	ctx.stroke();
};

Canvas.prototype.drawText = function(text, position, size, color) {
	var ctx = this.context;
	ctx.fillStyle = color;
	ctx.font = size + "px Arial";
	ctx.textAlign = 'center';
	ctx.fillText(text, position.x, position.y);
}