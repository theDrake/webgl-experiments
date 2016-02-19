var scene, camera, renderer, geometry, material, mesh;
init();
animate();
function init() {
  scene = new THREE.Scene();
  camera = new THREE.PerspectiveCamera(75,
                                       window.innerWidth / window.innerHeight,
                                       1,
                                       1000);
  camera.position.z = 100;
  geometry = new THREE.BoxGeometry(50, 50, 50);
  material = new THREE.MeshBasicMaterial({color:0x00ff});
  mesh = new THREE.Mesh(geometry, material);
  scene.add(mesh);
  renderer = new THREE.WebGLRenderer();
  renderer.setSize(window.innerWidth, window.innerHeight);
  document.body.appendChild(renderer.domElement);
}
function animate() {
  requestAnimationFrame(animate);
  mesh.rotation.x += 0.01;
  mesh.rotation.y += 0.02;
  renderer.render(scene, camera);
}
