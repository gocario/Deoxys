
var Obstacle = function (data) {

	if (void 0 !== data) {

		this.radius = data.radius;
		this.color = data.color;

		var geometry = new THREE.SphereGeometry(this.radius, 32, 32);
		var material = new THREE.MeshBasicMaterial({ color: this.color });
		this.mesh = new THREE.Mesh(geometry, material);

		this.position = this.mesh.position;
		this.direction = new THREE.Vector3(-1, 0, 0);
		this.speed = 4.0;
	}
};

Obstacle.prototype = new Object;
Object.prototype.constructor = Obstacle;

Obstacle.prototype.update = function (elapsedTime) {
	
	this.speed += 0.1;

	this.animate();
};

Obstacle.prototype.animate = function (elapsedTime) {
	
	this.position.add(this.direction.clone().multiplyScalar(this.speed));
};




var Ship = function (data) {

	if (void 0 !== data) {

		this.radius = data.radius;
		this.color = data.color;

		var geometry = new THREE.BoxGeometry(this.radius, this.radius, this.radius);
		var material = new THREE.MeshBasicMaterial({ color: this.color });
		this.mesh = new THREE.Mesh(geometry, material);

		this.position = this.mesh.position;
		this.direction = new THREE.Vector3(0, 0, 0);
		this.speed = 4.0;
	}
}

Ship.prototype = new Object;
Ship.prototype.constructor = Ship;

Ship.prototype.initPosition = function (position) {
	this.position.set(0, 0, 0).add(position);
};

Ship.prototype.setSpeed = function (speed) {
	this.speed = speed;
};

Ship.prototype.update = function (elapsedTime) {

	this.direction.set(0, 0, 0);

	if (key.right) {
		this.direction.z += 1;
	}
	if (key.left) {
		this.direction.z -= 1;
	}

	if (key.up) {
		this.direction.y += 1;
	}
	if (key.down) {
		this.direction.y -= 1;
	}

	this.animate();
};

Ship.prototype.animate = function (elapsedTime) {

	this.position.add(this.direction.clone().multiplyScalar(this.speed));
};
