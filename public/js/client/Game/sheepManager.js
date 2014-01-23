SheepManager = function () {
	this.sheeps = [];
	for(var i=0; i<10; i++) {
		this.createSheep();
	}
};

SheepManager.prototype.update = function() {
	for (var i = this.sheeps.length - 1; i >= 0; i--) {
		this.sheeps[i].update();
	};
};

SheepManager.prototype.render = function(canvas) {
	for (var i = this.sheeps.length - 1; i >= 0; i--) {
		this.sheeps[i].render(canvas);
	};
};

SheepManager.prototype.createSheep = function() {
	var that = this;
	setTimeout(function() {
		that.sheeps.push(new Sheep());
	}, Math.random()*1000 + 250);
};