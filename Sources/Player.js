import * as THREE from 'three';
import { Cube } from './CubeClass.js';
import { PointerLockControls } from 'three/examples/jsm/controls/PointerLockControls.js';


export class Player {
	constructor(cube, camera, scene) {
		this.controls = new PointerLockControls(camera, document.body);
		const body = new Cube(0x00ff00, cube.mesh.position.x, cube.mesh.position.y + 2, cube.mesh.position.z, 0.5, 0.5, 0.5);

		scene.add(body.mesh);
		// Add event listener for click event to lock the pointer
		document.addEventListener('click', () => {
		  this.controls.lock();
		}, false);
		document.addEventListener('wheel', (event) => {
			// Check the scroll direction
			if (event.deltaY < 0) {
			  // Zoom in
			  camera.fov = Math.max(1, camera.fov - 1);
			} else if (event.deltaY > 0) {
			  // Zoom out
			  camera.fov = Math.min(75, camera.fov + 1);
			}
		  
			// Update the camera's projection matrix
			camera.updateProjectionMatrix();
		  }, false); 
		// Add event listener for mousemove event
		document.addEventListener('mousemove', (event) => {
		  // Normalize the mouse position from -1 to 1
		  const mouseX = (event.movementX / window.innerWidth) * 2 - 1;
		  const mouseY = -(event.movementY / window.innerHeight) * 2 + 1;
	
		  // Calculate the polar and azimuthal angles
		  const polarAngle = (mouseY + 1) * Math.PI / 2; // Range from 0 to PI
		  const azimuthalAngle = mouseX * Math.PI; // Range from -PI to PI
	
		  // Create a new vector for the direction the camera should look in
		  const direction = new THREE.Vector3(
			Math.sin(polarAngle) * Math.cos(azimuthalAngle),
			Math.cos(polarAngle),
			Math.sin(polarAngle) * Math.sin(azimuthalAngle)
		  );
		  document.addEventListener('keydown', (event) => {
			// Check if the 'W' key was pressed
			if (event.key === 'w' || event.key === 'W') {
			  // Define a speed for the camera movement
			  const speed = 0.1;
		  
			  // Get the camera's direction
			  const direction = new THREE.Vector3();
			  camera.getWorldDirection(direction);
		  
			  // Calculate the target position
			  const targetPosition = direction.clone().multiplyScalar(speed).add(camera.position);
		  
			  // Smoothly transition to the target position
			  camera.position.lerp(targetPosition, 0.05);
			  body.mesh.position.copy(camera.position);
			  body.mesh.position.y -= 0.3; 
			}
		  }, false);
	
		  // Add the camera's position to the direction to get the point the camera should look at
		  const lookAtPosition = new THREE.Vector3().addVectors(camera.position, direction);
	
		  // Update the camera's rotation to look at the calculated point
		}, false);
	
		camera.position.x = cube.mesh.position.x;
		camera.position.y = cube.mesh.position.y;
		camera.position.z = cube.mesh.position.z;
		camera.position.y += 0.3;

		// Update the camera's lookAt to the body's position
		camera.lookAt(body.mesh.position);
		
	  }
  }