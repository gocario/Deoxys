
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
	
	this.animate();

	this.speed += 0.1;
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
	if(key.right) {
		this.position.z += this.speed;
		// console.log("droite ---- posZ = " + this.position.z);
	}
	if(key.left) {
		this.position.z -= this.speed;
		// console.log("gauche ---- posZ = " + this.position.z);
	}

	if (key.up) {
		this.position.y += this.speed;
		// console.log("haut ---- posY = " + this.position.y);
	}
	if (key.down) {
		this.position.y -= this.speed;
		// console.log("bas ---- posY = " + this.position.y);
	}
};

