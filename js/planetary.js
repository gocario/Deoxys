
var RATIO_RAYON_SOLEIL = 0.0004;
var RATIO_DISTANCE_SAT = 0.05;

var RATIO_RAYON = 0.03;
var RATIO_DISTANCE = 0.00002;
var RATIO_REVOLUTION = 1/365.25;
var RATIO_ROTATION = Math.PI * 2;


/** Planet **/

var Planet = function (data) {

	if (typeof data !== "undefined") {

		console.log('Planet', data);

		this.name = data.name || "";
		this.center = data.center || undefined;

		this.speed = data.speed || 1;
		this.revolution = data.revolution || 1;
		this.radius = data.radius || 1;
		this.distance = data.distance || 1;
		this.rotation = data.rotation || 1;
		
		this.mass = data.mass || 1;
		this.color = data.color || 0xFFFFFF;

		var geometry = new THREE.SphereGeometry(this.radius, 32, 32);
		var material = new THREE.MeshBasicMaterial({ color: this.color, map: data.map || undefined });
		//var material = new THREE.MeshLambertMaterial({ color: this.color, map: data.map || undefined });
		this.mesh = new THREE.Mesh(geometry, material);

		this.pos = this.mesh.position;
	}
};


Planet.prototype = new Object;
Planet.prototype.constructor = Planet;

Planet.prototype.createTorus = function () {

	var geometry = new THREE.TorusGeometry(this.distance, 1, 32, 128);
	var material = new THREE.MeshBasicMaterial({ color: 0xFFFFFF });
	this.torus = new THREE.Mesh(geometry, material);

	return this.torus;
};

Planet.prototype.init = function () {

	if (void 0 !== this.center) {

		this.pos.set(
			this.center.pos.x + this.distance,
			this.center.pos.y,
			this.center.pos.z
		);

	} else {

		this.pos.set(0, 0, 0);

	}

	return this;
};
	
Planet.prototype.animate = function (t) {

	if (void 0 !== this.center) {

		// Move the planet's position
		this.pos.set(
			this.center.pos.x + Math.cos(t * this.speed / this.revolution / 1500) * (this.distance),
			this.center.pos.y,
			this.center.pos.z + Math.sin(t * this.speed / this.revolution / 1500) * (this.distance)
		);

		// Move the planet's torus' position
		this.torus.position.set(
			this.center.pos.x,
			this.center.pos.y,
			this.center.pos.z
		);

		//this.mesh.rotation.y = (t % (2 * Math.PI)) * (Math.PI * 2) / this.rotation;
	}

	return this;
};




/** Sun extends Planet **/

var Sun = function (data) {

	// Sun inherit from Planet
	this.base = Planet.prototype;
	this.base.constructor.call(this, data);


	if (typeof data !== "undefined") {
		
		console.log('Sun', data);

		this.intensity = data.intensity || 1;

		this.mesh.material.transparent = true;


		this.light = new THREE.PointLight(0xFFFFFF, this.intensity);

		this.light.position.set(
			this.pos.x,
			this.pos.y,
			this.pos.z
		);
	}
};

Sun.prototype = new Planet;
Sun.prototype.constructor = Sun;

Sun.prototype.animate = function (t) {

	// Base method \\
	this.base.animate.call(this, t);

	if (this.center !== undefined) {

		this.light.position.set(
			this.pos.x,
			this.pos.y,
			this.pos.z
		);
	}

	return this;
};




/** PLANETARY **/

var Planetary = function (scene) {

	this.scene = scene;

	this.planets = [];
	this.suns = [];

	this.nPlanet = 0;
	this.nSun = 0;
};

Planetary.prototype = new Object;
Planetary.prototype.constructor = Planetary;

Planetary.prototype.addSun = function (data) {

	var sun = new Sun(data);
	this.suns[this.nSun++] = sun;
	this.scene.add(sun.mesh);
	this.scene.add(sun.light);

	return sun;
};

Planetary.prototype.addPlanet = function (data) {
	
	var planet = new Planet(data);
	this.planets[this.nPlanet++] = planet;
	this.scene.add(planet.mesh);

	return planet;
};

Planetary.prototype.getAstro = function (identifier) {
	
	for (var i = 0; i < this.nSun; i++) {
		if (this.suns[i].identifier === identifier)
			return this.suns[i];
	}

	for (var i = 0; i < this.nPlanet; i++) {
		if (this.planets[i].identifier === identifier)
			return this.planets[i];
	}

	return undefined;
};
Planetary.prototype.init = function () {
	
	var planets = this.planets;
	var nPlanet = this.nPlanet;

	for (var i = 0; i < nPlanet; i++) {
		planets[i].init();
	}

	this.createTorus();
};

Planetary.prototype.createTorus = function () {
	
	var planets = this.planets;
	var nPlanet = this.nPlanet;

	for (var i = 0; i < nPlanet; i++) {
		planets[i].createTorus();
		planets[i].torus.rotation.x = Math.PI / 2;
		this.scene.add(planets[i].torus);
	}
};

Planetary.prototype.animate = function (time) {
	
	var planets = this.planets;
	var nPlanet = this.nPlanet;

	for (var i = 0; i < nPlanet; i++) {
		planets[i].animate(time);
	}

	return time;
};

Planetary.prototype.forEachPlanets = function (callback) {
	
	var planets = this.planets;
	var nPlanet = this.nPlanet;

	for (var i = 0; i < nPlanet; i++) {
		callback(planets[i]);
	}
};