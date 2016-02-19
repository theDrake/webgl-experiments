/**
 * @author mrdoob / http://mrdoob.com/
 */

THREE.PointerLockControls = function(camera) {
  var PI_2 = Math.PI / 2;
  var scope = this;
  var pitchObject = new THREE.Object3D();
  var yawObject = new THREE.Object3D();

  camera.rotation.set(0, 0, 0);
  pitchObject.add(camera);
  yawObject.position.y = 10;
  yawObject.add(pitchObject);

  var onMouseMove = function(event) {
    if (scope.enabled === false) return;
    var movementX = event.movementX || event.mozMovementX ||
                    event.webkitMovementX || 0;
    var movementY = event.movementY || event.mozMovementY ||
                    event.webkitMovementY || 0;
    yawObject.rotation.y -= movementX * 0.002;
    pitchObject.rotation.x -= movementY * 0.002;
    pitchObject.rotation.x = Math.max(-PI_2,
                                      Math.min(PI_2, pitchObject.rotation.x));
  };

  document.addEventListener('mousemove', onMouseMove, false);
  this.enabled = true;//false;

  this.getObject = function() {
    return yawObject;
  };

  this.getDirection = function() { // assumes the camera itself is not rotated
    var direction = new THREE.Vector3(0, 0, -1);
    var rotation = new THREE.Euler(0, 0, 0, "YXZ");
    return function(v) {
      rotation.set(pitchObject.rotation.x, yawObject.rotation.y, 0);
      v.copy(direction).applyEuler(rotation);
      return v;
    }
  }();
};
