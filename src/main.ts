import "./style.css";
import * as THREE from "three";
import { OrbitControls } from "three/examples/jsm/controls/OrbitControls";
import { createStar, solarObjects } from "./utils/shape";
import { createLight } from "./utils/lighting";
// import { gridHelper } from "./utils/grid";
import { STAR_COUNT, ASPECT_RATIO, FOV, STARTING_POSITION } from "./constants";
import { handleScroll } from "./utils/handle-scroll";
import { onWindowResize } from "./utils/handle-window-resize";
import { createSun } from "./utils/sun";

const exploreBtn = document.getElementById("explore-btn") as HTMLButtonElement;

const SUN = solarObjects[0];
const PLANETS = solarObjects.slice(1);

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
renderer.setSize(window.innerWidth, window.innerHeight);
renderer.setPixelRatio(window.devicePixelRatio);
renderer.autoClear = false;
renderer.setClearColor(0x000000, 0.0);

camera.position.set(STARTING_POSITION.x, STARTING_POSITION.y, STARTING_POSITION.z);
const controls = new OrbitControls(camera, renderer.domElement);
// scene.background = spaceTexture;

// function populateSceneWithHelpers() {
//   const axesHelper = new THREE.AxesHelper(100);
//   scene.add(axesHelper);
//   scene.add(pointLightTopHelper, pointLightBottomHelper);
//   scene.add(gridHelper);
// }

// populateSceneWithHelpers();

function populateSceneWithLight() {
  const ambientlight = new THREE.AmbientLight(0xffffff, 0.05);
  scene.add(ambientlight);
  scene.add(createLight(0.08, 0.8, 0.5, 0, 0, 0));
}

function populateSceneWithSolarSystem() {
  for (const solarObject of PLANETS) {
    scene.add(solarObject.pivotPoint);
    if (solarObject.moons) {
      for (const moon of solarObject.moons) {
        solarObject.sphereMesh.add(moon.sphereMesh);
      }
    }
  }
  Array(STAR_COUNT)
    .fill(null)
    .forEach(() => scene.add(createStar(1, 10, 5)));
}

const bloomComposer = createSun(scene, camera, renderer);

function animate() {
  requestAnimationFrame(animate);

  for (const planet of PLANETS) {
    planet.rotateAroundSelf();
    planet.rotateAroundSun();
  }
  controls.update();
  SUN.sphereMesh.rotateY(0.005);
  bloomComposer.render();
}

function init() {
  populateSceneWithLight();
  populateSceneWithSolarSystem();
  renderer.render(scene, camera);
  window.addEventListener("resize", () => onWindowResize(camera, renderer), false);
  document.body.onscroll = () => handleScroll(solarObjects, camera);
  exploreBtn.onclick = () => {
    const main = document.querySelector("main") as HTMLElement;
    main.remove();
  };
  animate();
}

init();
