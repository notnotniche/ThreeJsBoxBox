import * as THREE from 'three';
import { Cube } from './CubeClass.js';
import { CubeArray } from './ArrayCube.js';
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls.js';
import { handleCubeClick } from './Utils.js';


// Create a scene
const scene = new THREE.Scene();

// Create a camera
const camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 1000);

// Create a renderer
const renderer = new THREE.WebGLRenderer();
renderer.setSize(window.innerWidth, window.innerHeight);
document.body.appendChild(renderer.domElement);

const controls = new OrbitControls(camera, renderer.domElement);

const cubeArray = new CubeArray(10, 0);

for (const cube of cubeArray.cubes)
{
  scene.add(cube.mesh);
}
const firstCube = cubeArray.cubes[0];
camera.position.set(22, 22, 22);
camera.lookAt(0, 0, 0);

cubeArray.cubes[0].printPosition();
// drawLineBetweenFurthestCubes(cubeArray.cubes, scene);


// Update the animation loop to rotate the cube
function animate() {
  requestAnimationFrame(animate);

  // FAKE SOLAR SYSTEM
  // cubeArray.rotateAll();
  controls.update();
  renderer.render(scene, camera);
}
window.addEventListener('click', (event) => handleCubeClick(event, camera, scene, cubeArray), false);
animate();
