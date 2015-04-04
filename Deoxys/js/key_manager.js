
var KeyManager = function () {

	document.addEventListener('keydown', function (e) { this.updateDown(e); }.bind(this), false);
	document.addEventListener('keyup', function (e) { this.updateUp(e); }.bind(this), false);

	this.up = false;
	this.down = false;
	this.right = false;
	this.left = false;
	this.space = false;
}

KeyManager.prototype = new Object;
KeyManager.prototype.constructor = KeyManager;

KeyManager.prototype.updateDown = function (e) {
	console.log("keyDown:" + e.which);
	switch(e.which) {
		case 38: this.up = true; break;
		case 90: this.up = true; break;
		case 40: this.down = true; break;
		case 83: this.down = true; break;
		case 39: this.right = true; break;
		case 68: this.right = true; break;
		case 37: this.left = true; break;
		case 81: this.left = true; break;
		case 32: this.space = true; break;
		default: break;
	}
};

KeyManager.prototype.updateUp = function (e) {
	console.log("keyUp:" + e.which);
	switch(e.which) {
		case 38: this.up = false; break;
		case 90: this.up = false; break;
		case 40: this.down = false; break;
		case 83: this.down = false; break;
		case 39: this.right = false; break;
		case 68: this.right = false; break;
		case 37: this.left = false; break;
		case 81: this.left = false; break;
		case 32: this.space = false; break;
		default: break;
	}
};

var key = new KeyManager();