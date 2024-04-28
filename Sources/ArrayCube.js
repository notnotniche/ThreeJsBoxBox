import { Cube } from './CubeClass.js';

export class CubeArray {
    constructor(numberOfCubes, InitialValueOfX = 2) {
        this.cubes = []; // Array to hold the cubes
        let pos = 0;
        for (let i = 0; i < numberOfCubes; i++) {
          const color = Math.random() * 0xffffff; // Generate a random color
          pos += InitialValueOfX;
          const cube = new Cube(color, pos); // Create a new cube with the random color
          this.cubes.push(cube); // Add the cube to the array
        }
      }

  rotateAll(x = 0.01, y = 0.01) {
    for (const cube of this.cubes) {
    const randomNumber = Math.random() * 2 - 1;
      cube.rotate(x * randomNumber, y) * randomNumber;
    }
  }
}