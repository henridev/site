import * as THREE from "three";

interface Sphere {
  radius: number;
}

interface Position {
  x: number;
  y: number;
  z: number;
}

interface Options {
  moons?: SolarBody[];
  transparent?: boolean;
  side?: THREE.Side;
}

class SolarBody {
  position: Position;
  sphere: Sphere;
  name: string;
  options?: Options;

  constructor(
    name: string,
    radius: number,
    position: Position = { x: 0, y: 0, z: 0 },
    options?: Options
  ) {
    this.name = name;
    this.position = position;
    this.options = options;
    this.sphere = {
      radius,
    };
  }
}

export const solarBodies = [
  new SolarBody(
    "sun",
    15,
    { x: 0, y: 0, z: 0 },
    {
      transparent: true,
      side: THREE.BackSide,
    }
  ),
  new SolarBody("mercury", 2, { x: 0, y: 0, z: 25 }),
  new SolarBody("venus", 3, { x: 0, y: 0, z: 50 }),
  new SolarBody(
    "earth",
    4,
    { x: 0, y: 5, z: 65 },
    {
      moons: [new SolarBody("moon", 1, { x: 0, y: 2, z: 75 })],
    }
  ),
  new SolarBody("mars", 2, { x: 0, y: 6, z: 90 }),
  new SolarBody("jupiter", 7, { x: 0, y: 0, z: 100 }),
  new SolarBody("saturn", 7, { x: 0, y: 0, z: 110 }),
  new SolarBody("uranus", 6, { x: 0, y: 0, z: 120 }),
  new SolarBody("neptune", 5, { x: 0, y: 0, z: 130 }),
];
