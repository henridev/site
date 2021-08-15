export function handleScroll(solarObjects: THREE.Mesh[], camera: THREE.Camera) {
  const currentPosition = document.body.getBoundingClientRect().top;
  // moon.rotation.x += 0.05;
  // moon.rotation.y += 0.075;
  // moon.rotation.z += 0.05;

  camera.position.z = currentPosition * -0.01;
  camera.position.x = currentPosition * -0.0003;
  camera.position.y = currentPosition * -0.0003;
}
