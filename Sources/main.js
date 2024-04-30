import * as THREE from 'three';
import { Cube } from './CubeClass.js';
import { CubeArray } from './ArrayCube.js';
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls.js';
import { handleCubeClick } from './Utils.js';
import { Player } from './Player.js';
import { PointerLockControls } from 'three/examples/jsm/controls/PointerLockControls.js';


// Create a scene
const scene = new THREE.Scene();


// Create a renderer
const renderer = new THREE.WebGLRenderer();
renderer.setSize(window.innerWidth, window.innerHeight);
document.body.appendChild(renderer.domElement);

const camera = new THREE.PerspectiveCamera(103, window.innerWidth / window.innerHeight, 0.1, 1000);
const controls = new PointerLockControls(camera, document.body);

// Lock the pointer when the canvas is clicked
renderer.domElement.addEventListener('click', () => {
	controls.lock();
});
// Create a player


const cubeArray = new CubeArray(100, 10);
const player = new Player(cubeArray.cubes[0], camera);

for (const cube of cubeArray.cubes)
{
  scene.add(cube.mesh);
}


let lastTime = performance.now();

function animate() {
  requestAnimationFrame(animate);
  if(cubeArray.animationTrigger == 2)
  {
	  cubeArray.rotateAll();
	}
//   player.update(camera);
  renderer.render(scene, camera);
}
window.addEventListener('click', (event) => handleCubeClick(event, camera, scene, cubeArray), false);
animate();
