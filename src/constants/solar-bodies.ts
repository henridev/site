import * as THREE from "three";
import { REVOLUTION_SPEED, ROTATION_SPEED } from ".";

export const SUN_RADIUS = 15;

interface Sphere {
  radius: number;
}

interface Position {
  x: number;
  y: number;
  z: number;
}

interface Speeds {
  selfRotationY: number;
  sunRotationY: number;
}

interface Options {
  moons?: SolarBody[];
  transparent?: boolean;
  side?: THREE.Side;
  speeds?: Speeds;
  revolutionDays?: number;
  rotationDays?: number;
}

export class SolarBody {
  position: Position;
  sphere: Sphere;
  name: string;
  moons?: SolarBody[];
  options?: Options;
  private _pivotPoint?: THREE.Object3D;
  private _sphereMesh?: THREE.Mesh;

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

  rotateAroundSun() {
    this.pivotPoint.rotateY(REVOLUTION_SPEED / (this.options?.revolutionDays || 1));
  }

  rotateAroundSelf() {
    this.sphereMesh.rotateY(ROTATION_SPEED / (this.options?.rotationDays || 1));
  }

  public set pivotPoint(point: THREE.Object3D) {
    this._pivotPoint = point;
  }
  public get pivotPoint(): THREE.Object3D {
    return this._pivotPoint!;
  }

  public set sphereMesh(mesh: THREE.Mesh) {
    this._sphereMesh = mesh;
  }
  public get sphereMesh(): THREE.Mesh {
    return this._sphereMesh!;
  }
}

export const solarBodies = [
  new SolarBody(
    "sun",
    SUN_RADIUS,
    { x: 0, y: 0, z: 0 },
    {
      transparent: true,
    }
  ),
  new SolarBody(
    "mercury",
    SUN_RADIUS / 10,
    { x: 0, y: 0, z: 30 },
    {
      rotationDays: 58.6,
      revolutionDays: 87.97,
    }
  ),
  new SolarBody(
    "venus",
    SUN_RADIUS / 9,
    { x: 0, y: 0, z: 60 },
    {
      rotationDays: 243,
      revolutionDays: 224.7,
    }
  ),
  new SolarBody(
    "earth",
    SUN_RADIUS / 7,
    { x: 0, y: 5, z: 90 },
    {
      rotationDays: 0.99,
      revolutionDays: 365.26,
      moons: [new SolarBody("moon", 1, { x: 0, y: 2, z: 5 })],
    }
  ),
  new SolarBody(
    "mars",
    SUN_RADIUS / 9,
    { x: 0, y: 6, z: 120 },
    {
      rotationDays: 1.03,
      revolutionDays: 1.88 * 365.26,
    }
  ),
  new SolarBody(
    "jupiter",
    SUN_RADIUS / 4,
    { x: 0, y: 0, z: 150 },
    {
      rotationDays: 0.41,
      revolutionDays: 11.86 * 365.26,
    }
  ),
  new SolarBody(
    "saturn",
    SUN_RADIUS / 4,
    { x: 0, y: 0, z: 180 },
    {
      rotationDays: 0.45,
      revolutionDays: 29.46 * 365.26,
    }
  ),
  new SolarBody(
    "uranus",
    SUN_RADIUS / 6,
    { x: 0, y: 0, z: 210 },
    {
      rotationDays: 0.72,
      revolutionDays: 84.01 * 365.26,
    }
  ),
  new SolarBody(
    "neptune",
    SUN_RADIUS / 7,
    { x: 0, y: 0, z: 240 },
    {
      rotationDays: 0.67,
      revolutionDays: 164.79 * 365.26,
    }
  ),
];
