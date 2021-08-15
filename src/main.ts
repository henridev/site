import "./style.css";
import * as THREE from "three";
import { OrbitControls } from "three/examples/jsm/controls/OrbitControls";
import { createStar, createSunFlare, solarObjects } from "./utils/shape";
import {
  ambientLight,
  pointLightTopHelper,
  pointLightBottomHelper,
  createLight,
  createDirectionalLighting,
} from "./utils/lighting";
import { gridHelper } from "./utils/grid";
import { STAR_COUNT, ASPECT_RATIO, FOV, STARTING_POSITION } from "./constants";
import { spaceTexture } from "./utils/texture";
import { handleScroll } from "./utils/handle-scroll";
import { onWindowResize } from "./utils/handle-window-resize";
import { addSun } from "./utils/sun";

/**
 * we always require a scene camera and renderer
 * - scene = container holding all object (backgrounds, containers, lights ...)
 * - camera = most common camera is the perspective camera
 * - renderer = renders actual elements to the screen
 */
const scene = new THREE.Scene();
const camera = new THREE.PerspectiveCamera(FOV, ASPECT_RATIO, 0.1, 1000);
const renderer = new THREE.WebGLRenderer({
  canvas: document.querySelector("#bg") as HTMLCanvasElement,
  antialias: true,
});
// renderer.physicallyCorrectLights = true;
// renderer.outputEncoding = THREE.sRGBEncoding;
// renderer.shadowMap.enabled = true;
renderer.autoClear = false;
renderer.setClearColor(0x000000, 0.0);
renderer.setSize(window.innerWidth, window.innerHeight);
renderer.setPixelRatio(window.devicePixelRatio);
camera.position.set(STARTING_POSITION.x, STARTING_POSITION.y, STARTING_POSITION.z);
const controls = new OrbitControls(camera, renderer.domElement);
scene.background = new THREE.Color().setHSL(0.51, 0.4, 0.01);
scene.fog = new THREE.Fog(scene.background, 3500, 15000);
function populateSceneWithHelpers() {
  const axesHelper = new THREE.AxesHelper(100);
  scene.add(axesHelper);
  scene.add(pointLightTopHelper, pointLightBottomHelper);
  scene.add(gridHelper);
}

function populateSceneWithLight() {
  scene.add(ambientLight);
  // scene.add(createLight(0.08, 0.8, 0.5, 0, -15, 0));
  // scene.add(createLight(0.08, 0.8, 0.5, 0, 20, 0));
  scene.add(createLight(0.08, 0.8, 1, 0, 0, 0));

  const directionalLight = createDirectionalLighting();
  const helper = new THREE.DirectionalLightHelper(directionalLight, 20);

  scene.add(directionalLight);
  scene.add(helper);
}

const pivotPoint = new THREE.Object3D();

function populateSceneWithSolarSystem() {
  solarObjects[0].add(pivotPoint);

  pivotPoint.add(solarObjects[1]);
  pivotPoint.add(solarObjects[2]);
  pivotPoint.add(solarObjects[3]);
  pivotPoint.add(solarObjects[4]);

  scene.add(solarObjects[0]);
  scene.add(createSunFlare());
  Array(STAR_COUNT)
    .fill(null)
    .forEach(() => scene.add(createStar(0.1, 10, 5)));
  // scene.background = spaceTexture;
}

function animate() {
  requestAnimationFrame(animate);

  solarObjects[1].rotation.y += 0.005;
  // solarObjects[0].rotation.x += OCTA_ROTATION_DX;
  // solarObjects[0].rotation.z += OCTA_ROTATION_DZ;
  // pivotPoint.rotation.z += 0.0005;
  pivotPoint.rotateY(-0.005);

  controls.update();
  // var time = Date.now() * 0.000005;
  // solarObjects[0].position.x = Math.cos(time * 10) * 5;
  // solarObjects[0].position.y = Math.cos(time * 7) * 3;
  // solarObjects[0].position.z = Math.cos(time * 8) * 4;
  solarObjects[0].rotateY(0.005);
  renderer.render(scene, camera);
}

function init() {
  populateSceneWithHelpers();
  populateSceneWithLight();
  populateSceneWithSolarSystem();
  // addSun(scene, camera, renderer);
  renderer.render(scene, camera);
  window.addEventListener("resize", () => onWindowResize(camera, renderer), false);
  document.body.onscroll = () => handleScroll(solarObjects, camera);
  animate();
}

init();
