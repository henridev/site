import * as THREE from "three";
import { PLANET_IMAGE_PATH_PREFIX } from "../constants";
import { solarBodies } from "../constants/solar-bodies";

//  CREATE AN OBJECT
// 1. GEOMETRY
// 2. MATERIAL => colloring and texturing
// 3. GEOMETRY + MATERIAL => mesh standard material reacts to light bouncing of off it

export const solarObjects = solarBodies.map(
  ({ name, sphere: { radius }, position: { x, y, z }, options: { transparent, side } = {} }) => {
    const texturePath = `${PLANET_IMAGE_PATH_PREFIX}/${name}-map.jpg`;
    const textureNormalPath = `${PLANET_IMAGE_PATH_PREFIX}/${name}-normal-map.jpg`;

    const object = new THREE.Mesh(
      new THREE.SphereGeometry(radius, 32, 32),
      new THREE.MeshPhongMaterial({
        specular: 0xffffff,
        shininess: 50,
        // side,
        transparent,
        map: new THREE.TextureLoader().load(texturePath),
        normalMap: new THREE.TextureLoader().load(textureNormalPath),
      })
    );

    object.position.set(x, y, z);
    return object;
  }
);

export const createStar = (radius = 15, width = 32, height = 16, color = "0xffffff") => {
  const geometry = new THREE.SphereGeometry(radius, width, height);
  const material = new THREE.MeshBasicMaterial({ color });
  const star = new THREE.Mesh(geometry, material);

  const [x, y] = Array(2)
    .fill(null)
    .map(() => THREE.MathUtils.randFloatSpread(150));
  star.position.set(x, y, THREE.MathUtils.randFloat(-100, 150));
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
