

window.addEventListener('load', function () {

	var Game = function () {

		this.ship = null;
		this.obstacles = [];


		this.universeSize = new THREE.Vector3(500, 500, 500);




		this.scenary = new Scenary();
		this.scenary.createGUI(this);
		this.scenary.lookAtMoveTo(
			new THREE.Vector3(this.universeSize.x / 2, this.universeSize.y / 2, this.universeSize.z / 2),
			new THREE.Vector3(- this.universeSize.x / 2, this.universeSize.y / 2, this.universeSize.z / 2)
		);

		var geometry = new THREE.BoxGeometry(this.universeSize.x, this.universeSize.y, this.universeSize.z);
		var material = new THREE.MeshBasicMaterial({ color: 0xEEEE88, transparent: true, opacity: 0.1});
		var mesh = new THREE.Mesh(geometry, material);
		this.scenary.add(mesh);
		mesh.position.setVector(new THREE.Vector3(this.universeSize.x / 2, this.universeSize.y / 2, this.universeSize.z / 2));

		this.update();
	};

	Game.prototype = new Object;
	Game.prototype.constructor = Game;


	Game.prototype.generateObstacle = function () {
		
		var data = {
			xMin: 10, xMax: this.universeSize.x,
			yMin: 10, yMax: 11,
			zMin: 10, zMax: this.universeSize.z,
			color: 0xFF8800,
			radius: 10,
		}

		var obstacle = new Obstacle(data);

		obstacle.position.setVector(THREE.Vector3.generateRandom(data.xMin, data.xMax, data.yMin, data.yMax, data.zMin, data.zMax));

		this.obstacles[this.obstacles.length] = obstacle;

		this.scenary.add(obstacle.mesh);

		return obstacle;
	};


	Game.prototype.clearObstacle = function (idx) {
		
		this.scenary.remove(this.obstacles[idx].mesh);
		this.obstacles.splice(idx, 1);
	};

	Game.prototype.clearObstacles = function () {

		while (this.obstacles.length > 0) {
			this.clearObstacle(this.obstacles.length - 1);
		}
	};


	Game.prototype.update = function (elapsedTime) {

		window.requestAnimationFrame(this.update.bind(this));
	
		var elapsedTime = clock.getElapsedTime();


		// Mettre à jour les obstacles et le vaisseau

		for (var i = 0; i < this.obstacles.length; i++) {
			var obstacle = this.obstacles[i];

			obstacle.update(elapsedTime);

			if (obstacle.position.x < obstacle.radius) {

				this.clearObstacle(i--);
			}
		}


		this.scenary.update(elapsedTime);
	};


	var clock = new THREE.Clock();

	game = new Game();

});