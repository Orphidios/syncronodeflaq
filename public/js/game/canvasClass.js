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

Canvas.prototype.clearCanvas = function(color) {
	console.log(color);
	var ctx = this.context;
	ctx.fillStyle = color || 'white';
	ctx.beginPath();
	ctx.rect(0, 0, this.width, this.height);
	ctx.fill();
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
};

Canvas.prototype.renderMobileEye = function(position) {
	this.drawMobileArrow();
};

Canvas.prototype.drawMobileArrow = function() {
	var param = {
		center : {
			x : this.width/2, 
			y : (2*this.height/3)|0
		},
		cellDim : (this.width/20)|0, 
	};
	var arrows = {
		left : [
			{y:0, x:param.cellDim},
			{y:0, x:2*param.cellDim},
			{y:2*param.cellDim, x:param.cellDim},
			{y:4*param.cellDim, x:2*param.cellDim},
			{y:4*param.cellDim, x:param.cellDim},
			{y:2*param.cellDim, x:0}
		],
		right : [
			{y:0, x:0},
			{y:0, x:param.cellDim},
			{y:2*param.cellDim, x:2*param.cellDim},
			{y:4*param.cellDim, x:param.cellDim},
			{y:4*param.cellDim, x:0},
			{y:2*param.cellDim, x:param.cellDim}
		]
	};
	console.log(arrows);
	var ctx = this.context;

	// Draw Path
	ctx.beginPath();
	for (var i =0; i<3; i++) {
		this.drawArrow({x:param.center.x + (2*i - 8)*param.cellDim,y:param.center.y - 2*param.cellDim},arrows.left);
	}
	for (var i =0; i<3; i++) {
		this.drawArrow({x:param.center.x + (2+i*2)*param.cellDim,y:param.center.y - 2*param.cellDim},arrows.right);
	}
	ctx.closePath();
	ctx.arc(param.center.x, param.center.y, param.cellDim, 0, 2 * Math.PI);
	ctx.closePath();

	// Add a shadow around the object
	ctx.shadowBlur = 100;
	ctx.shadowColor = "#00C";

	// Create fill gradient
	var gradient = ctx.createLinearGradient(0, 0, this.width, 0);
	gradient.addColorStop(0, "transparent");
	gradient.addColorStop(0.425, "#fff");
	gradient.addColorStop(0.425, "#fff");
	gradient.addColorStop(0.575, "#fff");
	gradient.addColorStop(0.575, "#fff");
	gradient.addColorStop(1, "transparent");

	// Fill the path
	ctx.fillStyle = gradient;
	ctx.fill();

	ctx.shadowBlur = 10;
	ctx.shadowColor = "#00F";
	ctx.fill();
};

Canvas.prototype.drawArrow = function(position, type) {
	var ctx = this.context;
	ctx.moveTo(position.x + type[0].x, position.y + type[0].y);
	for (var i=1; i < 6; i++) {
		ctx.lineTo(position.x + type[i].x, position.y + type[i].y)
	}
};