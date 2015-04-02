
Math.randomFloat = function(min, max) {

	return Math.random() * (max - min) + min;
}
Math.randomInt = function (min, max) {

	return Math.floor(Math.randomFloat(min, max));
}

THREE.Vector3.prototype.setVector = function (v) {

	this.x = v.x;
	this.y = v.y;
	this.z = v.z;

	return this;
};


THREE.Vector3.generateRandom = function (xMin, xMax, yMin, yMax, zMin, zMax) {

	return new THREE.Vector3(
		Math.randomInt(xMin, xMax),
		Math.randomInt(yMin, yMax),
		Math.randomInt(zMin, zMax)
	);
}


THREE.Vector3.zero = function () {

	return new THREE.Vector3(0, 0, 0);
}