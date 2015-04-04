
var Ship = function () {
	this.position = new THREE.Vector3(0, 0, 0);
	this.speed = 1.0;
}

Ship.prototype = new Object;
Ship.prototype.constructor = Ship;

Ship.prototype.initPosition = function (position) {
	this.position.set(0, 0, 0).add(position);
};

Ship.prototype.setSpeed = function (speed) {
	this.speed = speed;
};

Ship.prototype.update = function () {
	if(key.right) {
		this.position.x += this.speed;
		console.log("droite ---- posX = " + this.position.x);
	}
	if(key.left) {
		this.position.x -= this.speed;
		console.log("gauche ---- posX = " + this.position.x);
	}
};

