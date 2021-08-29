import { SolarBody } from "../constants/solar-bodies";

let lastScrollTop = 0;

export function handleScroll(solarObjects: SolarBody[], camera: THREE.Camera) {
  const currentPosition = document.body.getBoundingClientRect().top;

  if (currentPosition > lastScrollTop) {
    // up scroll code
    // console.log("up");
    camera.position.z = camera.position.z + 1000 * 0.001;
    camera.position.z = camera.position.x + 1000 * 0.001;
    camera.position.y = camera.position.y + 1000 * 0.001;
  } else {
    // down scroll code
    // console.log("down");
    camera.position.z = camera.position.z - 1000 * 0.001;
    camera.position.x = camera.position.x - 1000 * 0.001;
    // camera.position.y = camera.position.y + 1000 * 0.0003;
  }

  lastScrollTop = currentPosition;

  console.log({ currentPosition, event });

  solarObjects[0].position.x;
}
