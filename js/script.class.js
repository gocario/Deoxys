
window.addEventListener('load', function () {


	var LIGHTCOLOR = 0xFFFFFF;
	var WIREFRAMECOLOR = 0x111111;
	var SHININESS = 1.0;

	var RATIO_RAYON_SOLEIL = 0.0004;
	var RATIO_DISTANCE_SAT = 0.05;

	var RATIO_RAYON = 0.03;
	var RATIO_DISTANCE = 0.00002;
	var RATIO_REVOLUTION = 1/365.25;
	var RATIO_ROTATION = Math.PI * 2;


	var ASTRO = [
		'sun',
		'mercury',
		'venus',
		'earth',
		'mars',
		'moon'
	];

	var RADIUS = {
		'sun': 1.391e6 / 2,
		'mercury': 4.88e3 / 2,
		'venus': 1.21e4 / 2,
		'earth': 1.2756e4 / 2,
		'mars': 6.792e3 / 2,
		'moon': 1.73710e3 / 2,
	};

	var DISTANCE = {
		'sun': 0e1,
		'mercury': 5.8e7,
		'venus': 1.08e8,
		'earth': 1.496e8,
		'mars': 2.28e8,
		'moon': 3.84e5,
	};

	var REVOLUTION = {
		'sun': 0e1,
		'mercury': 8.7969e1,
		'venus': 2.247e2,
		'earth': ((9) / 60 + 6) / 24 + 365,
		'mars': 6.87e2,
		'moon': 2.7321e1,
	};

	var ROTATION = {
		'sun': 0e1,
		'mercury': ((38) / 60 + 15) / 24 + 58,
		'venus': 2.4301e2,
		'earth': (((04) / 60 + 56) / 60 + 23) / 24,
		'mars': ((22.7) / 60 + 37) / 60 + 1,
		'moon': 2.7321e1,
	};

	var CENTER = {
		'sun': undefined,
		'mercury': 'sun',
		'venus': 'sun',
		'earth': 'sun',
		'mars': 'sun',
		'moon': 'earth',
	}

	// var  = {
	// 	'sun': ,
	// 	'mercury': ,
	// 	'venus': ,
	// 	'earth': ,
	// 	'mars': ,
	// 	'moon': ,
	// };

	var SUN_RAYON = 1.391e6 / 2;
	var SUN_DISTANCE = 0e1;
	var SUN_REVOLUTION = 0e1;
	var SUN_ROTATION = 0e1;

	var MERCURY_RAYON = 4.88e3 / 2;
	var MERCURY_DISTANCE = 5.8e7;
	var MERCURY_REVOLUTION = 8.7969e1;
	var MERCURY_ROTATION = ((38) / 60 + 15) / 24 + 58;

	var VENUS_RAYON = 1.21e4 / 2;
	var VENUS_DISTANCE = 1.08e8;
	var VENUS_REVOLUTION = 2.247e2;
	var VENUS_ROTATION = 2.4301e2;

	var EARTH_RAYON = 1.2756e4 / 2;
	var EARTH_DISTANCE = 1.496e8;
	var EARTH_REVOLUTION = ((9) / 60 + 6) / 24 + 365;
	var EARTH_ROTATION = (((04) / 60 + 56) / 60 + 23) / 24;

	var MARS_RAYON = 6.792e3 / 2;
	var MARS_DISTANCE = 2.28e8;
	var MARS_REVOLUTION = 6.87e2;
	var MARS_ROTATION = ((22.7) / 60 + 37) / 60 + 1;


	var MOON_RAYON = 1.7374e3;
	var MOON_DISTANCE = 3.84e5;
	var MOON_REVOLUTION = 2.7321e1;
	var MOON_ROTATION = 2.7321e1;



	Scenary = function () {
		this.objects = [];
		this.utilities = [];
		this.dat = { folders: {}, guis: {} };
	}

	Scenary.prototype.createScene = function () {

		/** Scene **/
		this.scene = new THREE.Scene();

		/** Canvas **/
		this.renderer = new THREE.WebGLRenderer();
		this.renderer.setSize(window.innerWidth, window.innerHeight);
		document.body.appendChild(this.renderer.domElement);

		return this;
	};


	Scenary.prototype.addObject = function (o) {
		this.objects[this.objects.length] = o;
		this.scene.add(o);
		return o;
	}


	Scenary.prototype.createCamera = function () {

		/** Camera **/
		this.camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 1, 10000);

		this.camera.position.set(200, 1000, 200);

		/** OrbitControl **/
		this.controls = new THREE.OrbitControls(this.camera, this.renderer.domElement);

		return this;
	};

	Scenary.prototype.createUsefuls = function () {
		
		/** AxisHelper **/
		this.axisHelper = this.utilities[this.utilities.length] = new THREE.AxisHelper(100);
		this.scene.add(this.axisHelper);

		return this;
	};

	Scenary.prototype.createObjects = function () {
		
		planetary = this.planetary = new Planetary(this.scene);

		/**
		 * speed: 1 <=> Terre
		 * radius: km
		 * distance: km
		 * rotation: jour terrestre
		 */

		// var _RAYON = ;
		// var _DISTANCE = ;
		// var _REVOLUTION = ;
		// var _ROTATION = ;
		// var _RAYON = ;
		// var _DISTANCE = ;
		// var _REVOLUTION = ;
		// var _ROTATION = ;
		// var _RAYON = ;
		// var _DISTANCE = ;
		// var _REVOLUTION = ;
		// var _ROTATION = ;
		// var _RAYON = ;
		// var _DISTANCE = ;
		// var _REVOLUTION = ;
		// var _ROTATION = ;


		var sun = planetary.suns.sun = planetary.addSun({
			name: 'Sun',
			identifier: 'sun',
			speed: 1,
			revolution: REVOLUTION['sun'] * RATIO_REVOLUTION,
			radius: RADIUS['sun'] * RATIO_RAYON_SOLEIL,
			distance: DISTANCE['sun'] * RATIO_DISTANCE,
			rotation: ROTATION['sun'] * RATIO_ROTATION,
			intensity: 4,
			color: 0xFF521E,
			map: THREE.ImageUtils.loadTexture('./res/tex/sunmap.jpg'),
		});

		var mercury = planetary.planets.mercury = planetary.addPlanet({
			name: 'Mercury',
			identifier: 'mercury',
			center: sun,
			speed: 1,
			revolution: REVOLUTION['mercury'] * RATIO_REVOLUTION,
			radius: RADIUS['mercury'] * RATIO_RAYON,
			distance: DISTANCE['mercury'] * RATIO_DISTANCE,
			rotation: ROTATION['mercury'] * RATIO_ROTATION,
			color: 0x1E8BFF,
			map: THREE.ImageUtils.loadTexture('./res/tex/mercurymap.jpg'),
		});

		var venus = planetary.planets.venus = planetary.addPlanet({
			name: 'Venus',
			identifier: 'venus',
			center: sun,
			speed: 1,
			revolution: REVOLUTION['venus'] * RATIO_REVOLUTION,
			radius: RADIUS['venus'] * RATIO_RAYON,
			distance: DISTANCE['venus'] * RATIO_DISTANCE,
			rotation: ROTATION['venus'] * RATIO_ROTATION,
			color: 0x1E8BFF,
			map: THREE.ImageUtils.loadTexture('./res/tex/venusmap.jpg'),
		});

		var earth = planetary.planets.earth = planetary.addPlanet({
			name: 'Earth',
			identifier: 'earth',
			center: sun,
			speed: 1,
			revolution: REVOLUTION['earth'] * RATIO_REVOLUTION,
			radius: RADIUS['earth'] * RATIO_RAYON,
			distance: DISTANCE['earth'] * RATIO_DISTANCE,
			rotation: ROTATION['earth'] * RATIO_ROTATION,
			color: 0x1E8BFF,
			map: THREE.ImageUtils.loadTexture('./res/tex/earthmap1k.jpg'),
		});

		var moon = planetary.planets.moon = planetary.addPlanet({
			name: 'Moon',
			identifier: 'moon',
			center: earth,
			speed: 1,
			revolution: REVOLUTION['moon'] * RATIO_REVOLUTION,
			radius: RADIUS['moon'] * RATIO_RAYON,
			distance: DISTANCE['moon'] * RATIO_DISTANCE_SAT,
			rotation: ROTATION['moon'] * RATIO_ROTATION,
			color: 0x7F7F7F,
			map: THREE.ImageUtils.loadTexture('./res/tex/moonmap1k.jpg'),
		});

		var mars = planetary.planets.mars = planetary.addPlanet({
			name: 'Mars',
			identifier: 'mars',
			center: sun,
			speed: 1,
			revolution: REVOLUTION['mars'] * RATIO_REVOLUTION,
			radius: RADIUS['mars'] * RATIO_RAYON,
			distance: DISTANCE['mars'] * RATIO_DISTANCE,
			rotation: ROTATION['mars'] * RATIO_ROTATION,
			color: 0x7F7F7F,
			map: THREE.ImageUtils.loadTexture('./res/tex/mars_1k_color.jpg'),
		});

		planetary.init();

		this.animating = true;

		document.addEventListener('keydown', function(e) {
			if (e.which === 18)
				this.animating = !this.animating;
		}.bind(this));

		return this;
	};


	Scenary.prototype.createGUI = function () {
		

		this.dat.gui = new dat.GUI();
		this.dat.params = {
			'RATIO_REVOLUTION': RATIO_REVOLUTION,
			'RATIO_RADIUS': RATIO_RAYON,
		};

		this.dat.folders.ratios = this.dat.gui.addFolder('RATIO_*');
		this.dat.folders.camera = this.dat.gui.addFolder('Camera.lookAt');

		this.dat.guis.revolution = this.dat.folders.ratios.add(this.dat.params, 'RATIO_REVOLUTION').min(0).max(RATIO_REVOLUTION * 2).step(0.00001);
		this.dat.guis.revolution.onChange(function (value) {

			RATIO_REVOLUTION = value;

			planetary.suns.sun.revolution = SUN_REVOLUTION * RATIO_REVOLUTION;
			planetary.planets.mercury.revolution = MERCURY_REVOLUTION * RATIO_REVOLUTION;
			planetary.planets.venus.revolution = VENUS_REVOLUTION * RATIO_REVOLUTION;
			planetary.planets.earth.revolution = EARTH_REVOLUTION * RATIO_REVOLUTION;
			planetary.planets.moon.revolution = MOON_REVOLUTION * RATIO_REVOLUTION;
			planetary.planets.mars.revolution = MARS_REVOLUTION * RATIO_REVOLUTION;

		}.bind(this));

		/*
		var length = ASTRO.length;
		for (var i = 0; i < length) {

			(function() {
				this.dat.guis.ballCreate = this.dat.gui.add({
				create: function() {
					this.createBall();
				}.bind(this)
			}, 'create');
			})();
		}
		*/

		return this;
	};

	Scenary.prototype.createAll = function () {
		this.createScene();
		this.createCamera();
		this.createUsefuls();
		this.createObjects();
		this.createGUI();

		return this;
	};

	Scenary.prototype.render = function () {
		
		this.renderer.render(this.scene, this.camera);
	};

	var clock = new THREE.Clock();
	var timeStart = new Date();
	// var lastTime = new Date();
	Scenary.prototype.animate = function () {

		window.requestAnimationFrame(this.animate.bind(this));
		
		var currentTime = new Date();
		var elapsedTime = clock.getElapsedTime();
		// var timeDiff = (currentTime - lastTime);
		// var timeDiffS = (currentTime - timeStart);

		if (this.animating)
			this.planetary.animate(currentTime);

		// lastTime = currentTime;


		this.controls.update();
		this.render();
	}


	scenary = new Scenary().createAll();

	scenary.animate();


});