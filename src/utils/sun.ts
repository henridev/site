import * as THREE from "three";
import { EffectComposer } from "three/examples/jsm/postprocessing/EffectComposer.js";
import { RenderPass } from "three/examples/jsm/postprocessing/RenderPass.js";
import { UnrealBloomPass } from "three/examples/jsm/postprocessing/UnrealBloomPass.js";

export function addSun(
  scene: THREE.Scene,
  camera: THREE.PerspectiveCamera,
  renderer: THREE.WebGLRenderer
) {
  const renderScene = new RenderPass(scene, camera);

  const bloomPass = new UnrealBloomPass(
    new THREE.Vector2(window.innerWidth, window.innerHeight),
    1.5,
    0.4,
    0.85
  );
  bloomPass.threshold = 0;
  bloomPass.strength = 2; //intensity of glow
  bloomPass.radius = 0;
  const bloomComposer = new EffectComposer(renderer);
  bloomComposer.setSize(window.innerWidth, window.innerHeight);
  bloomComposer.renderToScreen = true;
  bloomComposer.addPass(renderScene);
  bloomComposer.addPass(bloomPass);

  //sun object
  const color = new THREE.Color("#FDB813");
  const geometry = new THREE.IcosahedronGeometry(1, 15);
  const material = new THREE.MeshBasicMaterial({ color: color });
  const sphere = new THREE.Mesh(geometry, material);
  sphere.position.set(0, 0, 0);
  sphere.layers.set(1);
  scene.add(sphere);
}
