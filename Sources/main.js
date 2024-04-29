import * as THREE from 'three';
import { Cube } from './CubeClass.js';
import { CubeArray } from './ArrayCube.js';
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls.js';
import { handleCubeClick } from './Utils.js';
import { Player } from './Player.js';


// Create a scene
const scene = new THREE.Scene();

// Create a renderer
const renderer = new THREE.WebGLRenderer();
renderer.setSize(window.innerWidth, window.innerHeight);
document.body.appendChild(renderer.domElement);

const camera = new THREE.PerspectiveCamera(70, window.innerWidth / window.innerHeight, 0.1, 1000);

// Create a player
const player = new Player(camera, renderer.domElement);

const controls = new OrbitControls(camera, renderer.domElement);

const cubeArray = new CubeArray(4, 10);

for (const cube of cubeArray.cubes)
{
  scene.add(cube.mesh);
}

const firstCube = cubeArray.cubes[0];
const secondCube = cubeArray.cubes[1];
const lastcube = cubeArray.getLastCubeIndex();
camera.position.set(firstCube.mesh.position.x, firstCube.mesh.position.y + 2, firstCube.mesh.position.z);

// Make the camera look at the second cube
controls.target.set(cubeArray.cubes[lastcube].mesh.position.x, cubeArray.cubes[lastcube].mesh.position.y, cubeArray.cubes[lastcube].mesh.position.z);
camera.lookAt(cubeArray.cubes[1].getPositionX(), cubeArray.cubes[1].getPositionY(), cubeArray.cubes[1].getPositionZ());

cubeArray.cubes[0].printPosition();

let lastTime = performance.now();

function animate() {
  const currentTime = performance.now();
  const deltaTime = (currentTime - lastTime) / 1000; // Time since last frame in seconds

  player.update(deltaTime); // Update the player's controls

  lastTime = currentTime;
  requestAnimationFrame(animate);

  if(cubeArray.animationTrigger == 2)
  {
    cubeArray.rotateAll();
  }
  controls.update();
  renderer.render(scene, camera);
}
window.addEventListener('click', (event) => handleCubeClick(event, camera, scene, cubeArray), false);
animate();
