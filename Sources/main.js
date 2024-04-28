import * as THREE from 'three';
import { Cube } from './CubeClass.js';
import { CubeArray } from './ArrayCube.js';
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls.js';

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
camera.position.set(firstCube.mesh.position.x, firstCube.mesh.position.y, firstCube.mesh.position.z - 5);


// Update the animation loop to rotate the cube
function animate() {
  requestAnimationFrame(animate);

  // Rotate all cubes
  cubeArray.rotateAll();
  controls.update();
  renderer.render(scene, camera);
}
animate();
