import * as THREE from "three";
import { PLANET_IMAGE_PATH_PREFIX } from "../constants";
import { solarBodies, SolarBody } from "../constants/solar-bodies";

//  CREATE AN OBJECT
// 1. GEOMETRY
// 2. MATERIAL => colloring and texturing
// 3. GEOMETRY + MATERIAL => mesh standard material reacts to light bouncing of off it

const createSolarObject = (body: SolarBody) => {
  const {
    name,
    sphere: { radius },
    position: { x, y, z },
    options: { moons } = {},
  } = body;
  const isSun = name === "sun";
  const texturePath = `${PLANET_IMAGE_PATH_PREFIX}/${name}-map.jpg`;
  const textureNormalPath = `${PLANET_IMAGE_PATH_PREFIX}/${name}-normal-map.jpg`;
  body.pivotPoint = new THREE.Object3D();

  const geometry = new THREE.SphereBufferGeometry(radius, 32, 32);
  const material = new THREE.MeshStandardMaterial({
    map: new THREE.TextureLoader().load(texturePath),
    normalMap: new THREE.TextureLoader().load(textureNormalPath),
  });

  const object = new THREE.Mesh(geometry, material);
  object.position.set(x, y, z);
  if (moons) {
    body.moons = [];
    for (const moon of moons) {
      body.moons.push(createSolarObject(moon));
    }
  }

  if (isSun) {
    object.castShadow = false; //default is false
    object.receiveShadow = false; //default
  } else {
    object.castShadow = true; //default is false
    object.receiveShadow = true; //default
  }

  body.pivotPoint.add(object);
  body.sphereMesh = object;
  return body;
};

export const solarObjects = solarBodies.map(createSolarObject);

export const createStar = (radius = 15, width = 32, height = 16, color = "0xffffff") => {
  const geometry = new THREE.SphereGeometry(radius, width, height);
  const material = new THREE.MeshBasicMaterial({ color });
  const star = new THREE.Mesh(geometry, material);

  star.position.set(
    (Math.random() < 0.5 ? 1 : -1) * THREE.MathUtils.randFloat(0, 200),
    (Math.random() < 0.5 ? 1 : -1) * THREE.MathUtils.randFloat(0, 200),
    (Math.random() < 0.5 ? 1 : -1) * THREE.MathUtils.randFloat(0, 200)
  );
  if (star.position.x < 200 && star.position.y < 200 && star.position.z < 200) {
    const rndm = Math.random();
    const mult = Math.random() < 0.5 ? 1 : -1;
    if (rndm < 0.33) {
      star.position.x = THREE.MathUtils.randFloat(200, 400) * mult;
    } else if (rndm < 0.66) {
      star.position.y = THREE.MathUtils.randFloat(200, 400) * mult;
    } else if (rndm < 1) {
      star.position.z = THREE.MathUtils.randFloat(200, 400) * mult;
    }
  }
  return star;
};

export const createSunFlare = (options: any = {}) => {
  const {
    radiusX = 15,
    radiusY = 20,
    startAngle = 10 * Math.PI,
    enadAngle = 2 * Math.PI,
    color = "0xff0000",
    rotation = 10,
  } = options;
  const curve = new THREE.EllipseCurve(
    0,
    0, // ax, aY
    radiusX,
    radiusY, // xRadius, yRadius
    startAngle,
    enadAngle, // aStartAngle, aEndAngle
    false, // aClockwise
    rotation
  );

  const points = curve.getPoints(50);
  const geometry = new THREE.BufferGeometry().setFromPoints(points);

  const material = new THREE.LineBasicMaterial({ color });

  // Create the final object to add to the scene
  const ellipse = new THREE.Line(geometry, material);
  ellipse.position.x = 0;
  return ellipse;
};
