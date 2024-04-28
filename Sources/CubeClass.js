import * as THREE from 'three';


export class Cube {
    constructor(color = 0xffff00, x = 1)
    {
        const geometry = new THREE.BoxGeometry(2, 2, 2);
        const material = new THREE.MeshBasicMaterial({color: color});
        this.mesh = new THREE.Mesh(geometry, material);
        const randomNumberY = Math.random() * (30 - 1) + 1;
        const randomNumberZ = Math.random() * (30 - 1) + 1;
        this.mesh.position.set(x, randomNumberY, randomNumberZ)
    }
    rotate(x = 0.01, y = 0.01)
    {
        this.mesh.rotation.x += x;
        this.mesh.rotation.y += y;
    }
}