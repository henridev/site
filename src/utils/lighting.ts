import * as THREE from "three";
// import { DirectionalLightShadow } from "three";
import { Lensflare, LensflareElement } from "three/examples/jsm/objects/Lensflare";

const LIGHTING_COLOR = "0xfff";

// emits light in all directions (like adding a light bulb to scene)
const pointLightTop = new THREE.PointLight(LIGHTING_COLOR, 1);
pointLightTop.position.set(0, -10, 0);
// const pointLightTopHelper = new THREE.PointLightHelper(pointLightTop);

const pointLightBottom = new THREE.PointLight(LIGHTING_COLOR, 1);
pointLightBottom.position.set(0, 10, 10);
// const pointLightBottomHelper = new THREE.PointLightHelper(pointLightBottom);

const ambientLight = new THREE.AmbientLight(LIGHTING_COLOR);
ambientLight.position.set(0, 0, 0);

const textureLoader = new THREE.TextureLoader();

const textureFlare0 = textureLoader.load("assets/textures/lensflare/lensflare0.png");
const textureFlare3 = textureLoader.load("assets/textures/lensflare/lensflare3.png");

function createLight(h: number, s: number, l: number, x: number, y: number, z: number) {
  const light = new THREE.PointLight(0xffffff, 1.5, 2000, 10);
  light.color.setHSL(h, s, l);
  light.position.set(x, y, z);

  const lensflare = new Lensflare();
  lensflare.addElement(new LensflareElement(textureFlare0, 700, 0, light.color));
  lensflare.addElement(new LensflareElement(textureFlare3, 700, 0.6));
  lensflare.addElement(new LensflareElement(textureFlare3, 70, 0.7));
  lensflare.addElement(new LensflareElement(textureFlare3, 120, 0.9));
  lensflare.addElement(new LensflareElement(textureFlare3, 70, 1));
  light.add(lensflare);
  return light;
}

function createDirectionalLighting() {
  const dirLight = new THREE.DirectionalLight(0xffffff, 0.5);
  dirLight.position.set(0, 0, 0);
  dirLight.color.setHSL(0.1, 0.7, 0.5);
  return dirLight;
}

export {
  // pointLightTopHelper,
  pointLightTop,
  pointLightBottom,
  // pointLightBottomHelper,
  ambientLight,
  createLight,
  createDirectionalLighting,
};
