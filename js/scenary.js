
var Scenary = function (data) {

	this.createScene();
	this.createCamera();
};

Scenary.prototype = new Object;
Scenary.prototype.constructor = Scenary;



Scenary.prototype.createScene = function () {

	/** Scene **/
	this.scene = new THREE.Scene();

	/** Canvas **/
	this.renderer = new THREE.WebGLRenderer();
	this.renderer.setSize(window.innerWidth - 4, window.innerHeight - 4);
	document.body.appendChild(this.renderer.domElement);

	return this;
};


Scenary.prototype.createCamera = function () {

	/** Camera **/
	this.camera = new THREE.PerspectiveCamera(100, window.innerWidth / window.innerHeight, 1, 10000);

	this.camera.position.set(200, 200, 200);

	/** OrbitControl **/
	// this.controls = new THREE.OrbitControls(this.camera, this.renderer.domElement);

	/** AxisHelper **/
	this.axisHelper = new THREE.AxisHelper(100);
	this.scene.add(this.axisHelper);

	return this;
};


Scenary.prototype.createGUI = function (game) {


	this.dat = {};
	this.dat.gui = new dat.GUI();
	this.dat.params = {
		'.generateObstacle': function() { this.generateObstacle(); }.bind(game),
		'.clearObstacles': function() { this.clearObstacles(); }.bind(game),
	};

	this.dat.folders = {};
	this.dat.folders.game = this.dat.gui.addFolder('Game');

	this.dat.guis = {};
	this.dat.guis.game = this.dat.gui.add(this.dat.params, '.generateObstacle');
	this.dat.guis.game = this.dat.gui.add(this.dat.params, '.clearObstacles');
};


Scenary.prototype.add = function (obj) {

	this.scene.add(obj);
};

Scenary.prototype.remove = function (obj) {

	this.scene.remove(obj);
};


Scenary.prototype.lookAtMoveTo = function (at, to) {
	
	this.camera.position.setVector(to);
	this.camera.lookAt(at);
};


Scenary.prototype.render = function () {
	
	this.renderer.render(this.scene, this.camera);
};


Scenary.prototype.update = function (elapsedTime) {

	// this.controls.update();
	this.render();
};

