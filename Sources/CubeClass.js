import * as THREE from 'three';


export class Cube {
    constructor(color = 0xffff00, x = 1 , y = 1 , z = 1)
    {
        const geometry = new THREE.BoxGeometry(2, 2, 2);
        const material = new THREE.MeshBasicMaterial({color: color});
        this.mesh = new THREE.Mesh(geometry, material);
        this.mesh.position.set(x, y, z);
        this.mesh.cubeReference = this; 
    }
    rotate(x = 0.01, y = 0.01)
    {
        this.mesh.rotation.x += x;
        this.mesh.rotation.y += y;
    }
    printPosition() {
        console.log(`Cube position: x = ${this.mesh.position.x}, y = ${this.mesh.position.y}, z = ${this.mesh.position.z}`);
    }
    getPositionX()
    {
        return this.mesh.position.x;
    }
    getPositionY()
    {
        return this.mesh.position.y;
    }
    getPositionZ()
    {
        return this.mesh.position.z;
    }
}