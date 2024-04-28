import * as THREE from 'three';

const raycaster = new THREE.Raycaster();
const mouse = new THREE.Vector2();

function handleCubeClick(event, camera, scene) {
  mouse.x = (event.clientX / window.innerWidth) * 2 - 1;
  mouse.y = -(event.clientY / window.innerHeight) * 2 + 1;

  // Update the picking ray with the camera and mouse position
  raycaster.setFromCamera(mouse, camera);

  // Calculate objects intersecting the picking ray
  const intersects = raycaster.intersectObjects(scene.children);

  for (let i = 0; i < intersects.length; i++) {
    // Check if the intersected object is a cube
    if (intersects[i].object.geometry.type === 'BoxGeometry') {
      console.log('A cube was clicked');
    }
  }
}

// Export the function
export { handleCubeClick };