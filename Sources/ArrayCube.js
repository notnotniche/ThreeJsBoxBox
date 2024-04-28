import { Cube } from './CubeClass.js';

export class CubeArray {
    constructor(numberOfCubes, InitialValueOfX = 3, InitialValueOfY = 2, InitialValueOfZ = 0) {
        this.cubes = []; // Array to hold the cubes
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
            const speed = baseSpeed / distance + i / 50; // The further the cube, the slower it rotates
            const newAngle = angle + speed;
            cube.mesh.position.x = centerCube.mesh.position.x + distance * Math.cos(newAngle);
            cube.mesh.position.z = centerCube.mesh.position.z + distance * Math.sin(newAngle);
        }
    }
  printPositions() {
    this.cubes.forEach((cube, index) => {
        cube.printPosition();
    });
}
}