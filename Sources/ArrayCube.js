import { Cube } from './CubeClass.js';
import * as THREE from 'three';

export class CubeArray {
    constructor(numberOfCubes, InitialValueOfX = 3, InitialValueOfY = 2, InitialValueOfZ = 0) {
        this.cubes = []; // Array to hold the cubes
        this.lines = [];
        this.selectedCubes = [];
        this.animationTrigger = 0;
        let posx = 0;
        let posy = 0;
        let posz = 0;
        
        for (let i = 0; i < numberOfCubes; i++) {
          const color = Math.random() * 0xffffff; // Generate a random color
          posx += InitialValueOfX + Math.random() * (5 - 1) + 1;
          posy += InitialValueOfY;
          posz -= InitialValueOfZ;

          posx += i / 2;
          posz += i / 2;
          posy += i / 2;
          const cube = new Cube(color, posx, posy, posz); // Create a new cube with the random color
          this.cubes.push(cube); // Add the cube to the array
        }
      }
      //fake solar system
      rotateAll(baseSpeed = 0.01) {
        const centerCube = this.cubes[0];
        for (let i = 1; i < this.cubes.length; i++) {
            const cube = this.cubes[i];
    
            // Calculate the distance and angle between the cube and the center cube
            const dx = cube.mesh.position.x - centerCube.mesh.position.x;
            const dz = cube.mesh.position.z - centerCube.mesh.position.z;
            const distance = Math.sqrt(dx * dx + dz * dz);
            const angle = Math.atan2(dz, dx);
    
            // Calculate the new angle and position
            const speed = baseSpeed / distance + i / 1000; // The further the cube, the slower it rotates
            const newAngle = angle + speed;
            cube.mesh.position.x = centerCube.mesh.position.x + distance * Math.cos(newAngle);
            cube.mesh.position.z = centerCube.mesh.position.z + distance * Math.sin(newAngle);
            if (this.lines[i - 1]) {
              const lineGeometry = this.lines[i - 1].geometry;
              lineGeometry.setFromPoints([
                  new THREE.Vector3(centerCube.mesh.position.x, centerCube.mesh.position.y, centerCube.mesh.position.z),
                  new THREE.Vector3(cube.mesh.position.x, cube.mesh.position.y, cube.mesh.position.z)
              ]);
              lineGeometry.verticesNeedUpdate = true;
          }
        }
    }
    // si un jour sa crash cest parceque ICI je stocke beaucoup trop d instance de cube mais vasi jespere que vous avez pas de processeurs DE PAUVRE
    selectCube(mesh, scene) {
      if(this.animationTrigger < 2)
      {
        this.selectedCubes.push(mesh.cubeReference);
        this.animationTrigger += 1;
      }
      console.log(`${this.selectedCubes.length} number of cube Clicked`);
      if (this.selectedCubes.length === 2) {
        this.drawAllLineFromCenterCube(scene);
     }
      }
  drawLineBetweenCubes(cube1, cube2, scene) {
    // Create a geometry that will hold the vertices
    const geometry = new THREE.BufferGeometry().setFromPoints([
      new THREE.Vector3(cube1.mesh.position.x, cube1.mesh.position.y, cube1.mesh.position.z),
      new THREE.Vector3(cube2.mesh.position.x, cube2.mesh.position.y, cube2.mesh.position.z)
  ]);

  // Create a material for the line
  const material = new THREE.LineBasicMaterial({color: 0xff0000});

  // Create the line
  const line = new THREE.Line(geometry, material);

  // Add the line to the scene
  this.lines.push(line);
  scene.add(line);
}
  drawAllLineFromCenterCube(scene)
  {
    const centerCube = this.cubes[0];
    for (let i = 1; i < this.cubes.length; i++) {
        this.drawLineBetweenCubes(centerCube, this.cubes[i], scene);
    }
  }
  getLastCubeIndex() {
    return this.cubes.length - 1;
}
}
    