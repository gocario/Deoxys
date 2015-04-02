
var Obstacle = function (data) {

	if (void 0 !== data) {

		this.radius = data.radius;
		this.color = data.color;

		var geometry = new THREE.SphereGeometry(this.radius, 32, 32);
		var material = new THREE.MeshBasicMaterial({ color: this.color });
		this.mesh = new THREE.Mesh(geometry, material);

		this.position = this.mesh.position;
		this.direction = new THREE.Vector3(-1, 0, 0);
		this.speed = 1.0;
	}
};

Obstacle.prototype = new Object;
Object.prototype.constructor = Obstacle;

Obstacle.prototype.animate = function (elapsedTime) {
	
	this.position.add(this.direction.clone().multiplyScalar(this.speed));

};


Obstacle.prototype.update = function (elapsedTime) {
	
	this.animate();
};
