

window.addEventListener('load', function () {

	var Game = function () {

		this.ship = null;
		this.obstacles = [];

		this.universeSize = new THREE.Vector3(1000, 500, 500);

		this.scenary = new Scenary();
		this.scenary.createGUI(this);
		this.scenary.lookAtMoveTo(
			new THREE.Vector3(this.universeSize.x / 2, 0 , this.universeSize.z / 2),
			new THREE.Vector3(- this.universeSize.x / 32, this.universeSize.y / 16, this.universeSize.z / 2)
		);


		// Box, for tests
		var geometry = new THREE.BoxGeometry(this.universeSize.x, this.universeSize.y, this.universeSize.z);
		var material = new THREE.MeshBasicMaterial({ color: 0xEEEE88, transparent: true, opacity: 0.1});
		var mesh = new THREE.Mesh(geometry, material);
		this.scenary.add(mesh);
		mesh.position.setVector(new THREE.Vector3(this.universeSize.x / 2, this.universeSize.y / 2, this.universeSize.z / 2));
	};

	Game.prototype = new Object;
	Game.prototype.constructor = Game;

	Game.prototype.start = function () {

		this.generateShip();
		this.update();

		this.isRunning = true;
	};

	Game.prototype.stop = function() {

		this.isRunning = false;

		this.clearShip();
		this.clearObstacles();
	};


	Game.prototype.generateShip = function () {
		
		var data = {
			radius: 10,
			color: 0xEEEE88,
		};

		var ship = new Ship(data);

		ship.position.setVector(new THREE.Vector3(data.radius, data.radius, this.universeSize.z / 2));

		this.ship = ship;

		this.scenary.add(ship.mesh);

		return ship;

	};

	Game.prototype.clearShip = function () {
		
		this.scenary.remove(this.ship.mesh);
		this.ship = null;
	};


	Game.prototype.generateObstacle = function () {
		
		var data = {
			xMin: this.universeSize.x - 10, xMax: this.universeSize.x - 9,
			yMin: 10, yMax: 11,
			zMin: 10, zMax: this.universeSize.y - 10,
			color: 0xFF8800,
			radius: 10,
		};

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


	Game.prototype.over = function () {
		
		this.stop();

		this.start();
	};

	Game.prototype.update = function () {

		window.requestAnimationFrame(this.update.bind(this));
	
		var elapsedTime = clock.getElapsedTime();

		if (this.isRunning) {

			// Mettre à jour le vaisseau et les obstacles

			var ship = this.ship;

			this.ship.update(elapsedTime);


			for (var i = 0; i < this.obstacles.length; i++) {
				var obstacle = this.obstacles[i];

				obstacle.update(elapsedTime);

				// Si hors map, on le décharge
				if (obstacle.position.x < obstacle.radius) {

					this.clearObstacle(i--);
				}

				if (obstacle.position.clone().sub(ship.position).length() < ship.radius + obstacle.radius) {
					// console.log('Collision occured!');

					this.over();
				}
			}

			// Créé des obstacles

			if (Math.random() > 0.90) {
				this.generateObstacle();
			}

			this.scenary.lookAtMoveTo(this.ship.position, this.ship.position.clone().addX(-100).addY(20));

		}

		this.scenary.update(elapsedTime);
	};


	var clock = new THREE.Clock();

	game = new Game();
	game.start();
});